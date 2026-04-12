import { useState } from 'react';
import { Bell, Lock, Mail, Smartphone, VolumeX, ShieldAlert, Award, FileText, CheckSquare, MessageSquare } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Notifications', count: 12 },
  { id: 'academic', label: 'Academic Alerts', count: 4 },
  { id: 'social', label: 'Social & Community', count: 5 },
  { id: 'gamification', label: 'Gamification', count: 2 },
  { id: 'system', label: 'System & Security', count: 1 }
];

const mockHistory = [
  { id: 1, type: 'academic', icon: FileText, title: 'React Project Due Soon', desc: 'Your final project for Advanced React is due in exactly 4 hours.', time: 'Today at 10:00 AM', status: 'unread', urgent: true },
  { id: 2, type: 'academic', icon: CheckSquare, title: 'Grade Released', desc: 'Instructor Sarah Jenkins has graded your "State Management UX" assignment. Score: 95/100.', time: 'Yesterday at 4:30 PM', status: 'read', urgent: false },
  { id: 3, type: 'gamification', icon: Award, title: '7-Day Streak Maintained', desc: 'You logged in for 7 days straight! +100 XP bonus awarded.', time: 'Yesterday at 9:00 AM', status: 'read', urgent: false },
  { id: 4, type: 'social', icon: MessageSquare, title: 'New Question in Forum', desc: 'Alex triggered a new discussion: "How does hydration work in Next.js?"', time: 'Monday at 2:15 PM', status: 'unread', urgent: false },
  { id: 5, type: 'system', icon: ShieldAlert, title: 'New Login Detected', desc: 'We noticed a login from an unrecognized device (Mac OS, Chrome) in New York. If this was you, ignore this message.', time: 'Oct 12 at 1:00 PM', status: 'read', urgent: false }
];

export default function Notifications() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [settingsView, setSettingsView] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
      
      {/* Left Sidebar - Categories & Settings Toggle */}
      <div style={{ width: '260px', borderRight: '1px solid var(--border-color)', background: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setSettingsView(false)}
            className="btn-primary" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: !settingsView ? 'var(--primary-color)' : 'white', color: !settingsView ? 'white' : 'var(--text-main)', border: settingsView ? '1px solid var(--border-color)' : 'none' }}>
            <Bell size={16} /> Notification History
          </button>
          <button 
            onClick={() => setSettingsView(true)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', marginTop: '12px', background: settingsView ? 'var(--primary-light)' : 'transparent', color: settingsView ? 'var(--primary-color)' : 'var(--text-main)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>
            <Lock size={16} /> Preferences Focus
          </button>
        </div>


      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '30px', background: 'var(--bg-secondary)' }}>
        
        {!settingsView ? (
          /* History View */
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Notification History</h2>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', fontWeight: 500, cursor: 'pointer' }}>Mark all as read</button>
            </div>
            
            {mockHistory.filter(n => activeCategory === 'all' || n.type === activeCategory).map(n => (
              <div key={n.id} className="card" style={{ padding: '24px', display: 'flex', gap: '20px', borderLeft: n.urgent ? '4px solid #ef4444' : n.status === 'unread' ? '4px solid var(--primary-color)' : '1px solid var(--border-color)' }}>
                 <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: n.urgent ? '#fef2f2' : 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: n.urgent ? '#ef4444' : 'var(--primary-color)' }}>
                   <n.icon size={24} />
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                     <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>{n.title}</h3>
                     <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{n.time}</span>
                   </div>
                   <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: '0 0 16px 0', lineHeight: 1.5 }}>{n.desc}</p>
                   {n.urgent && (
                     <button className="btn-primary" style={{ background: '#ef4444' }}>Resolve Task</button>
                   )}
                   {!n.urgent && n.status === 'unread' && (
                     <button className="btn-outline">View Details</button>
                   )}
                 </div>
              </div>
            ))}
          </div>
        ) : (
          /* Settings/Preferences View */
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '1.4rem', fontWeight: 600 }}>Attention Control Matrix</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '30px' }}>Customize exactly how and when the system alerts you to prevent notification fatigue.</p>
            
            <div className="card" style={{ marginBottom: '24px' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ padding: '12px', background: '#fef2f2', borderRadius: '8px', color: '#ef4444' }}><VolumeX size={24} /></div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>Global "Do Not Disturb"</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mute all push and interface notifications (excluding critical security).</p>
                  </div>
                </div>
                {/* Toggle switch mock */}
                <div style={{ width: '44px', height: '24px', background: '#e5e7eb', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}></div>
                </div>
              </div>

              <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ padding: '12px', background: 'var(--primary-light)', borderRadius: '8px', color: 'var(--primary-color)' }}><Smartphone size={24} /></div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>Quiet Hours Schedule</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Currently bypassing notifications between 11:00 PM and 7:00 AM.</p>
                  </div>
                </div>
                <button className="btn-outline">Configure</button>
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '40px 0 20px 0' }}>Channel Routing</h3>
            <div className="card" style={{ padding: '0 20px' }}>
              {['Academic Alerts', 'Social Mentions', 'Gamification Rewards', 'System Receipts'].map((opt, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none' }}>
                  <span style={{ fontWeight: 500 }}>{opt}</span>
                  <div style={{ display: 'flex', gap: '30px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={i!==2} /> <Mail size={16} color="var(--text-muted)"/> Email
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked /> <Smartphone size={16} color="var(--text-muted)"/> Push
                    </label>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
