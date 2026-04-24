import { useState, useEffect, useRef } from 'react';
import { Search, Send, Hash, Users, Circle, MoreVertical, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Community() {
  const [courses, setCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const messagesEndRef = useRef(null);

  // 1. Fetch current authenticated user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setCurrentUser(user);
      } else {
        // Fallback for custom OTP session
        const customEmail = localStorage.getItem('custom_session_email');
        const customName = localStorage.getItem('custom_session_name');
        if (customEmail) {
          setCurrentUser({
            id: customEmail,
            user_metadata: { full_name: customName }
          });
        }
      }
    });
  }, []);

  // 2. Fetch enrolled courses
  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    const { data } = await supabase.from('courses').select('*');
    if (data && data.length > 0) {
      setCourses(data);
      setActiveCourse(data[0]); // auto select first
    }
  }

  // 3. Fetch messages and subscribe to realtime for active course
  useEffect(() => {
    if (!activeCourse) return;

    fetchMessages(activeCourse.id);

    const channel = supabase
      .channel('chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `course_id=eq.${activeCourse.id}`
        },
        async (payload) => {
          // Re-fetch to get profile name (Realtime payload is raw)
          const { data } = await supabase
            .from('messages')
            .select('*, profiles(name, avatar_url)')
            .eq('id', payload.new.id)
            .single();
            
          if (data) {
            setMessages((prev) => {
              // PREVENT DUPLICATES: Only add if not already in state (from handleSendMessage)
              if (prev.some(m => m.id === data.id)) return prev;
              return [...prev, data];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeCourse]);

  async function fetchMessages(courseId) {
    setLoadingMessages(true);

    // Initial fetch from Supabase with join to profiles
    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles(
          name,
          avatar_url
        )
      `)
      .eq('course_id', courseId)
      .order('created_at', { ascending: true });
      
    console.log("MESSAGES DATA:", data);

    if (error) {
      console.error("Error fetching messages:", error);
    }
    
    setMessages(data || []);
    setLoadingMessages(false);
  }

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim() || !activeCourse || !currentUser) return;

    const text = newMessage;
    setNewMessage(''); // Clear input instantly for good UX

    // Insert and select with profiles join for instant display
    const { data, error } = await supabase
      .from('messages')
      .insert({
        course_id: activeCourse.id,
        user_id: currentUser.id,
        content: text
      })
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles(name, avatar_url)
      `)
      .single();

    if (error) {
      console.error("Send error:", error);
      return;
    }

    console.log("Inserted message:", data);

    // 🔥 THIS IS THE MISSING PART: Update state manually for instant feedback
    setMessages((prev) => [...prev, data]);
  }

  // Helper to format time
  const formatTime = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper to get display name
  const getDisplayName = (msg) => {
    return msg.profiles?.name || 'Anonymous Learner';
  };

  // Helper to check if message is from current user
  const isCurrentUser = (msg) => {
    return currentUser && msg.user_id === currentUser.id;
  };

  // Calculate Real-Time Participants from message history
  const uniqueUsers = new Map();
  messages.forEach(m => {
    if (m.user_id) {
      uniqueUsers.set(m.user_id, {
        id: m.user_id,
        name: getDisplayName(m)
      });
    }
  });
  const allParticipants = Array.from(uniqueUsers.values());
  const others = currentUser ? allParticipants.filter(p => p.id !== currentUser.id) : allParticipants;
  const me = currentUser ? { id: currentUser.id, name: currentUser?.user_metadata?.full_name || 'You' } : null;

  return (
    <div style={{ display: 'flex', height: '100%', background: '#ffffff', overflow: 'hidden' }}>

      {/* 1. LEFT SIDEBAR: Courses (Channels) */}
      <div style={{ width: '280px', background: '#f8fafc', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>My Communities</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Course-based discussions</p>
        </div>

        <div style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h4 style={{ padding: '0 8px', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '8px' }}>Enrolled Courses</h4>

          {courses.map(course => (
            <button
              key={course.id}
              onClick={() => setActiveCourse(course)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 12px',
                background: activeCourse?.id === course.id ? '#e0e7ff' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <Hash size={18} color={activeCourse?.id === course.id ? 'var(--primary-color)' : 'var(--text-muted)'} />
              <span style={{
                flex: 1,
                fontWeight: activeCourse?.id === course.id ? 600 : 500,
                color: activeCourse?.id === course.id ? 'var(--primary-color)' : 'var(--text-main)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {course.title || 'Untitled Course'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. CENTER PANEL: Chat Interface */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', position: 'relative' }}>

        {/* Chat Header */}
        <div style={{ height: '70px', padding: '0 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Hash size={24} color="var(--text-muted)" />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {activeCourse ? activeCourse.title : 'Select a Course'}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time discussion</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
            <Search size={20} style={{ cursor: 'pointer' }} />
            <MoreVertical size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Chat Messages Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {loadingMessages ? (
            <div style={{ margin: 'auto', color: 'var(--text-muted)' }}>Loading messages...</div>
          ) : messages.length === 0 ? (
            <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)', textAlign: 'center' }}>
              <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-main)' }}>Start the discussion for this course</h3>
              <p style={{ margin: 0, maxWidth: '400px' }}>This is the beginning of your course community. Say hi to your peers and instructors.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwn = currentUser && msg.user_id === currentUser.id;

              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: isOwn ? "flex-end" : "flex-start",
                    marginBottom: "10px"
                  }}
                >
                  <div style={{ maxWidth: "65%" }}>
                    
                    {/* USER NAME */}
                    {!isOwn && (
                      <p style={{ fontSize: "12px", marginBottom: "2px", color: "#666", paddingLeft: "4px" }}>
                        {msg.profiles?.name || "Anonymous"}
                      </p>
                    )}

                    {/* MESSAGE BUBBLE */}
                    <div
                      style={{
                        background: isOwn ? "#6C5CE7" : "#E5E7EB",
                        color: isOwn ? "white" : "black",
                        padding: "10px 14px",
                        borderRadius: "16px",
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        wordBreak: 'break-word'
                      }}
                    >
                      {msg.content}
                    </div>
                    
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px', textAlign: isOwn ? 'right' : 'left', padding: '0 4px' }}>
                      {formatTime(msg.created_at)}
                    </span>
                  </div>
                </div>
              );
            })
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Bar */}
        <div style={{ padding: '20px 24px', background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
          <form onSubmit={handleSendMessage} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message #${activeCourse?.title || 'community'}...`}
              disabled={!activeCourse || !currentUser}
              style={{
                width: '100%',
                padding: '16px 60px 16px 20px',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                background: '#f8fafc',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'var(--text-main)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
              }}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || !activeCourse || !currentUser}
              style={{
                position: 'absolute',
                right: '8px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: newMessage.trim() ? 'var(--primary-color)' : '#e2e8f0',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s'
              }}
            >
              <Send size={18} style={{ marginLeft: '2px' }} />
            </button>
          </form>
        </div>
      </div>

      {/* 3. RIGHT SIDEBAR: Participants */}
      <div style={{ width: '250px', background: '#f8fafc', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>Participants</h3>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {me && (
            <div>
              <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '12px' }}>
                Online — 1
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {me.name.charAt(0).toUpperCase()}
                    </div>
                    <Circle size={10} fill="#10b981" color="#10b981" style={{ position: 'absolute', bottom: -2, right: -2, border: '2px solid white', borderRadius: '50%' }} />
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>{me.name} (You)</span>
                </div>
              </div>
            </div>
          )}

          {others.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '12px', marginTop: '16px' }}>
                Course Members — {others.length}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {others.map(user => (
                  <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
