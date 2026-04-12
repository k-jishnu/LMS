import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, Settings, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const mockNotifications = [
  { id: 1, type: 'academic', title: 'React Quiz Due Soon', desc: 'Your quiz "Hooks Basics" closes in 2 hours.', time: '10m ago', urgent: true },
  { id: 2, type: 'social', title: 'New Reply', desc: 'Sarah replied to your comment in Advanced JS.', time: '1h ago', urgent: false },
  { id: 3, type: 'gamification', title: 'Level Up!', desc: 'You reached Level 13 Explorer. +50 XP', time: '2h ago', urgent: false }
];

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/calendar': return 'Calendar / Schedule';
      case '/notifications': return 'Notifications';
      case '/courses': return 'My Courses';
      case '/player': return 'Course Player';
      case '/assignments': return 'Assignments';
      case '/quizzes': return 'Quizzes & Exams';
      case '/progress': return 'Progress Tracking';
      case '/certificates': return 'Certificates';
      case '/community': return 'Discussions / Community';
      case '/reviews': return 'Reviews & Feedback';
      case '/downloads': return 'Downloads / Resources';
      case '/profile': return 'Profile & Settings';
      case '/payments': return 'Payments / Subscriptions';
      case '/support': return 'Support / Help Center';
      case '/webinars': return 'Upcoming webinars';
      case '/documents': return 'Documents';
      case '/questions': return 'Questions';
      default: return 'Active Courses';
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 30px',
      borderBottom: '1px solid var(--border-color)',
      background: 'var(--bg-primary)',
      width: '100%',
      zIndex: 50,
      position: 'relative'
    }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
        {getPageTitle()}
      </h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        
        {/* Global Search */}
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search anything..." 
            style={{ padding: '8px 16px 8px 36px', borderRadius: '20px', border: '1px solid var(--border-color)', outline: 'none', width: '250px', fontSize: '0.9rem' }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Notification Bell Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}
          >
            <Bell size={20} color="var(--text-main)" />
            <div style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#ef4444', color: 'white', fontSize: '0.65rem', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
              3
            </div>
          </button>

          {/* Panel */}
          {showNotifications && (
            <div style={{ position: 'absolute', top: '50px', right: 0, width: '380px', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Notifications</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Mark all read"><Check size={16} color="var(--text-muted)" /></button>
                  <button onClick={() => { navigate('/notifications'); setShowNotifications(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Settings"><Settings size={16} color="var(--text-muted)" /></button>
                </div>
              </div>

              <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                {mockNotifications.map(n => (
                  <div key={n.id} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '16px', background: n.urgent ? '#fef2f2' : 'white', cursor: 'pointer', transition: 'background 0.2s', ':hover': { background: 'var(--bg-secondary)' } }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: n.urgent ? '#ef4444' : 'var(--primary-color)', marginTop: '6px' }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: n.urgent ? '#991b1b' : 'var(--text-main)' }}>{n.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{n.desc}</p>
                      
                      {n.urgent && (
                        <button className="btn-primary" style={{ marginTop: '12px', padding: '6px 12px', fontSize: '0.8rem', background: '#ef4444' }}>Take Action</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => { navigate('/notifications'); setShowNotifications(false); }}
                style={{ width: '100%', padding: '12px', background: 'white', border: 'none', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', borderTop: '1px solid var(--border-color)' }}
              >
                View full history
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
