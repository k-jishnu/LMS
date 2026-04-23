import { Play, TrendingUp, Clock, Calendar, CheckCircle, Bell, Award, FastForward, Flag, Book, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [name, setName] = useState("User");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const user = data.user;
        const fullName = user?.user_metadata?.full_name || "User";
        setName(fullName);

        // Save user in database
        await supabase.from("users").upsert({
          id: user.id,
          email: user.email,
          name: fullName,
        });
      }
    };
    fetchUser();
  }, []);
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Hello';
    if (hour < 18) return 'Hello';
    return 'Hello';
  };

  return (
    <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px', background: 'var(--bg-secondary)', minHeight: '100%' }}>

      {/* Overview Layer */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #f87171, #fca5a5)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', border: '3px solid white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary-color)', color: 'white', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
              Level 12
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-main)' }}>{getGreeting()}, {name}!</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Global Progress: 42%</span>
              <div style={{ width: '150px', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '42%', height: '100%', background: 'var(--primary-color)' }}></div>
              </div>
              <span style={{ color: '#d97706', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={14} /> 4,250 XP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {[
          { label: 'Enrolled Courses', value: '4', icon: Book, color: '#3b82f6' },
          { label: 'Completed', value: '1', icon: CheckCircle, color: '#10b981' },
          { label: 'Hours Learned', value: '38h', icon: Clock, color: '#8b5cf6' },
          { label: 'Current Streak', value: '14 Days', icon: TrendingUp, color: '#f59e0b', sub: '🔥' },
          { label: 'Weekly Goal', value: '4/5 hrs', icon: Flag, color: '#ef4444' }
        ].map((stat, i) => (
          <div key={i} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ background: `${stat.color}15`, padding: '8px', borderRadius: '8px', color: stat.color }}>
                <stat.icon size={20} />
              </div>
              {stat.sub && <span style={{ fontSize: '1.2rem' }}>{stat.sub}</span>}
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'recap(auto-fit, minmax(300px, 1fr))', gap: '30px', gridTemplateColumns: '2fr 1fr' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

          {/* Smart Continue Learning */}
          <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--primary-color)' }}></div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Jump Back In</span>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '8px', marginBottom: '4px' }}>Advanced JavaScript Concepts</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Module 3: Closures in Depth (14:22)</p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                      <Play size={16} fill="currentColor" /> Resume Video
                    </button>
                    <div style={{ width: '200px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-muted)' }}>
                        <span>Course Progress</span>
                        <span>68%</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: '68%', height: '100%', background: 'var(--primary-color)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ width: '160px', height: '100px', background: '#e5e7eb', borderRadius: '8px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Play size={32} color="var(--primary-color)" opacity={0.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming & Deadlines */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} /> Upcoming Deadlines
              </h2>
              <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.9rem', cursor: 'pointer' }}>View Calendar</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer' }}>
                <div style={{ width: '4px', height: '40px', background: '#ef4444', borderRadius: '2px' }}></div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', margin: '0 0 4px 0', color: '#991b1b' }}>React Project Submission</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#b91c1c' }}>Due in 2 hours • High Urgency</p>
                </div>
                <button className="btn-primary" style={{ background: '#ef4444', fontSize: '0.85rem' }}>Submit</button>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '12px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', cursor: 'pointer' }}>
                <div style={{ width: '4px', height: '40px', background: '#f59e0b', borderRadius: '2px' }}></div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', margin: '0 0 4px 0', color: '#92400e' }}>UX Quiz 1</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#b45309' }}>Tomorrow, 11:59 PM • Medium</p>
                </div>
                <button className="btn-primary" style={{ background: '#f59e0b', fontSize: '0.85rem' }}>Attempt</button>
              </div>
            </div>
          </div>

          {/* Announcements Feed */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Bell size={18} /> Announcements
            </h2>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '12px' }}>Pinned</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Yesterday</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', margin: '0 0 8px 0' }}>System Maintenance Weekend</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                The platform will be down for 2 hours this Sunday at 2 AM EST for critical server upgrades. Plan your study sessions accordingly!
              </p>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

          {/* Quick Actions */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Quick Actions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Join Class', icon: Play },
                { label: 'Submit Code', icon: FastForward },
                { label: 'Take Quiz', icon: CheckCircle },
                { label: 'Get Files', icon: Download }
              ].map((action, i) => (
                <button key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', transition: 'box-shadow 0.2s', ':hover': { boxShadow: '0 2px 5px rgba(0,0,0,0.05)' } }}>
                  <action.icon size={20} color="var(--primary-color)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-main)' }}>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gamification Snapshot */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} /> Daily Missions
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 500 }}>
                <span>Level 12 Explorer</span>
                <span style={{ color: 'var(--primary-color)' }}>250 XP to Level 13</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, var(--primary-color), #8b5cf6)' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { task: 'Watch 2 video lessons', xp: '+50 XP', done: true },
                { task: 'Score 80%+ on a mini-quiz', xp: '+100 XP', done: false },
                { task: 'Post in the community forum', xp: '+25 XP', done: false }
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', opacity: m.done ? 0.7 : 1 }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: m.done ? '#10b981' : 'white', border: `2px solid ${m.done ? '#10b981' : 'var(--border-color)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {m.done && <CheckCircle size={12} color="white" />}
                  </div>
                  <span style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text-main)', textDecoration: m.done ? 'line-through' : 'none' }}>{m.task}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)' }}>{m.xp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
