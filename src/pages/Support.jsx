import { useState } from 'react';
import { 
  Search, Book, CreditCard, Monitor, User, 
  MessageSquare, Mail, PhoneCall, Plus, 
  HelpCircle, Clock
} from 'lucide-react';

export default function Support() {
  const [activeTab, setActiveTab] = useState('knowledge-base');

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>How can we help you?</h1>
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <Search size={22} color="var(--text-muted)" style={{ position: 'absolute', left: '20px', top: '18px' }} />
          <input 
            type="text" 
            placeholder="Search for articles, guides or questions..." 
            style={{ 
              width: '100%', 
              padding: '18px 20px 18px 56px', 
              fontSize: '1.1rem', 
              borderRadius: '30px', 
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              outline: 'none'
            }} 
          />
        </div>
      </div>

      <div className="tabs-container" style={{ justifyContent: 'center', marginBottom: '40px' }}>
        <div className={`tab ${activeTab === 'knowledge-base' ? 'active' : ''}`} onClick={() => setActiveTab('knowledge-base')}>Knowledge Base</div>
        <div className={`tab ${activeTab === 'tickets' ? 'active' : ''}`} onClick={() => setActiveTab('tickets')}>My Tickets</div>
        <div className={`tab ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>Contact Us</div>
      </div>

      {activeTab === 'knowledge-base' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          <div className="card" style={{ padding: '30px', cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <User size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Account & Profile</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.5' }}>Manage your login details, passwords, and 2FA security.</p>
            <div style={{ color: 'var(--primary-color)', fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              12 Articles →
            </div>
          </div>

          <div className="card" style={{ padding: '30px', cursor: 'pointer' }}>
            <div style={{ width: '48px', height: '48px', background: '#ecfdf5', color: '#10b981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <CreditCard size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Payments & Billing</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.5' }}>Invoices, subscription changes, and refund policies.</p>
            <div style={{ color: 'var(--primary-color)', fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
               8 Articles →
            </div>
          </div>

          <div className="card" style={{ padding: '30px', cursor: 'pointer' }}>
            <div style={{ width: '48px', height: '48px', background: '#e0f2fe', color: '#0284c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Book size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Course Help</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.5' }}>Troubleshoot video playback, downloads, and progress.</p>
            <div style={{ color: 'var(--primary-color)', fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              24 Articles →
            </div>
          </div>

          <div className="card" style={{ padding: '30px', cursor: 'pointer' }}>
            <div style={{ width: '48px', height: '48px', background: '#fff7ed', color: '#ea580c', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Monitor size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Technical Issues</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.5' }}>Fix browser errors, app bugs, and device compatibility.</p>
            <div style={{ color: 'var(--primary-color)', fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              15 Articles →
            </div>
          </div>

        </div>
      )}

      {activeTab === 'tickets' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Your Support Tickets</h2>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Plus size={18} /> Raise Ticket</button>
          </div>

          <div className="card" style={{ padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <tr>
                  <th style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-muted)' }}>Ticket ID</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-muted)' }}>Subject</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-muted)' }}>Status</th>
                  <th style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-muted)' }}>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', fontSize: '0.9rem' }}>#T-4092</td>
                  <td style={{ padding: '16px 20px', fontWeight: 500 }}>Payment deducted but course not unlocked</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, background: '#fef3c7', color: '#b45309' }}>In Progress</span>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>2 hours ago</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', fontSize: '0.9rem' }}>#T-3814</td>
                  <td style={{ padding: '16px 20px', fontWeight: 500 }}>How to download course offline?</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, background: '#dcfce7', color: '#166534' }}>Resolved</span>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>3 days ago</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={{ marginTop: '30px', background: 'var(--primary-light)', padding: '20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <HelpCircle size={32} color="var(--primary-color)" />
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: 'var(--primary-color)' }}>Have a major issue?</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)' }}>Payment failure or account lock? Add "URGENT:" to your ticket subject for fast-track processing.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contact' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '30px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={20} color="var(--text-main)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Live Chat</div>
                  <div style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Online Now</div>
                </div>
              </div>
              <button className="btn-primary" style={{ width: '100%' }}>Start Chat</button>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} color="var(--text-main)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Email Support</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>support@lms.com</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PhoneCall size={20} color="var(--text-main)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Phone (Emergencies)</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>+91 1800 123 4567</div>
                </div>
              </div>
            </div>
            
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} /> Expected response time: Within 24 hours
            </div>
          </div>

          <div className="card" style={{ padding: '30px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Send us a message</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Issue Category</label>
                <select className="input-field">
                  <option>Payment / Billing</option>
                  <option>Account Access</option>
                  <option>Course Issue</option>
                  <option>Other / Feedback</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Subject</label>
                <input type="text" className="input-field" placeholder="Brief summary of the issue" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Description</label>
                <textarea className="input-field" rows="5" placeholder="Please provide details..."></textarea>
              </div>
              <button type="button" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Submit Message</button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
