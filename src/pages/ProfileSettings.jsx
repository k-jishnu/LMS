import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  User, Shield, Settings, Book, Database, Link as LinkIcon, 
  Camera, CheckCircle, Mail, Phone, Lock, Smartphone, Globe, 
  Bell, Eye, Download, Trash2, Award, Zap
} from 'lucide-react';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('account');
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const fullName = data.user?.user_metadata?.full_name || "User";
        setName(fullName);
        setEmail(data.user.email);
      }
    };
    fetchUser();
  }, []);

  const tabs = [
    { id: 'account', label: 'Account & Security', icon: <Shield size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <Settings size={18} /> },
    { id: 'identity', label: 'Learning Identity', icon: <Book size={18} /> },
    { id: 'privacy', label: 'Data & Privacy', icon: <Database size={18} /> },
    { id: 'integrations', label: 'Integrations', icon: <LinkIcon size={18} /> },
  ];

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Profile Overview Header */}
      <div className="card" style={{ padding: '30px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '30px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 'bold' }}>
            {name.charAt(0).toUpperCase()}
          </div>
          <button style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid white' }}>
            <Camera size={16} />
          </button>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', margin: 0 }}>{name}</h1>
            <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={12} /> Verified
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', margin: '0 0 16px 0' }}>{email} • Aspiring Developer & Lifelong Learner</p>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <Award size={16} color="#eab308" /> <span>Level 12 Scholar</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <Zap size={16} color="#f97316" /> <span>14 Day Streak</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <Star size={16} color="#8b5cf6" /> <span>2,450 XP</span>
            </div>
          </div>
        </div>
        
        <div>
          <button className="btn-outline">View Public Profile</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Settings Sidebar */}
        <div style={{ width: '250px', flexShrink: 0 }}>
          <div className="card" style={{ padding: '10px' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  border: 'none',
                  background: activeTab === tab.id ? 'var(--primary-light)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--primary-color)' : 'var(--text-main)',
                  borderRadius: '6px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginBottom: '4px',
                  transition: 'all 0.2s'
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content Area */}
        <div style={{ flex: 1 }}>
          {activeTab === 'account' && (
            <div className="card" style={{ padding: '30px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={20} /> Account & Security
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Email Address</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Mail size={18} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
                      <input type="email" className="input-field" value={email} style={{ paddingLeft: '40px' }} readOnly />
                    </div>
                    <button className="btn-outline">Update</button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Phone Number</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Phone size={18} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
                      <input type="tel" className="input-field" placeholder="Add phone number" style={{ paddingLeft: '40px' }} />
                    </div>
                    <button className="btn-outline">Add</button>
                  </div>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '10px 0' }} />

                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Password & Authentication</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: '4px' }}>Change Password</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Last changed 3 months ago</div>
                    </div>
                    <button className="btn-outline"><Lock size={16} /> Update</button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: '4px' }}>Two-Factor Authentication (2FA)</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add an extra layer of security to your account.</div>
                    </div>
                    <button className="btn-primary">Enable 2FA</button>
                  </div>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '10px 0' }} />

                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Login Activity</h3>
                  <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Smartphone size={24} color="var(--text-muted)" />
                      <div>
                        <div style={{ fontWeight: 500 }}>Windows PC - Chrome</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mumbai, India • Active Now</div>
                      </div>
                    </div>
                    <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 500 }}>Current Device</span>
                  </div>
                  <button className="btn-outline" style={{ marginTop: '16px', color: '#ef4444', borderColor: '#fca5a5' }}>
                    Logout from all other devices
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="card" style={{ padding: '30px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Settings size={20} /> Preferences
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>UI Controls</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Theme</label>
                      <select className="input-field">
                        <option>Light Mode</option>
                        <option>Dark Mode</option>
                        <option>System Default</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Language</label>
                      <select className="input-field">
                        <option>English (US)</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)' }} />

                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Learning Preferences</h3>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Daily Study Goal</label>
                    <select className="input-field" defaultValue="60">
                      <option value="30">30 mins / day</option>
                      <option value="60">60 mins / day</option>
                      <option value="120">2 hours / day</option>
                    </select>
                  </div>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)' }} />

                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Notifications</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { label: "New course announcements", defaultChecked: true },
                      { label: "Assignment deadlines", defaultChecked: true },
                      { label: "Community mentions & replies", defaultChecked: true },
                      { label: "Daily study reminders", defaultChecked: false },
                    ].map((item, idx) => (
                      <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked={item.defaultChecked} style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color)' }} />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="card" style={{ padding: '30px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Database size={20} /> Data & Privacy
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Globe size={18} /> Public Profile Visibility
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Allow others to see your profile and achievements.</div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Eye size={18} /> Activity Status
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Show when you are currently online taking a course.</div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)' }} />

                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Your Data</h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-outline"><Download size={16} /> Download Personal Data</button>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Get a copy of your learning history, certificates, and account data (GDPR-compliant).
                  </p>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)' }} />

                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: '#ef4444' }}>Danger Zone</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }}>
                    <Trash2 size={16} /> Delete Account
                  </button>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'identity' && (
            <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
              <Book size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
              <h3 style={{ marginBottom: '8px' }}>Learning Identity</h3>
              <p style={{ color: 'var(--text-muted)' }}>Your skills map and timeline features are currently being built.</p>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
              <LinkIcon size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
              <h3 style={{ marginBottom: '8px' }}>Integrations</h3>
              <p style={{ color: 'var(--text-muted)' }}>Connect with Google and LinkedIn coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Quick component for a star icon since it wasn't imported from lucide
function Star(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke={props.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  );
}
