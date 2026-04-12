import { useState } from 'react';
import { 
  CreditCard, CheckCircle, Clock, FileText, 
  ChevronRight, AlertCircle, ShieldCheck
} from 'lucide-react';

export default function Payments() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: '0 0 8px 0' }}>Payments & Subscriptions</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage your billing, plans, and invoices securely.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', background: '#ecfdf5', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500 }}>
          <ShieldCheck size={16} /> 256-bit SSL Secure
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container" style={{ margin: '0 -30px 30px -30px' }}>
        <div className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Overview & Plans</div>
        <div className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Transaction History</div>
      </div>

      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
          
          {/* Current Subscription Card */}
          <div style={{ flex: '1' }}>
            <div className="card" style={{ padding: '30px', borderLeft: '4px solid var(--primary-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '8px' }}>Current Plan</h2>
                  <div style={{ fontSize: '2rem', fontWeight: 700 }}>Pro Yearly</div>
                </div>
                <div style={{ background: 'var(--primary-light)', color: 'var(--primary-color)', padding: '6px 12px', borderRadius: '4px', fontWeight: 600, fontSize: '0.9rem' }}>
                  Active
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Price</div>
                  <div style={{ fontWeight: 600 }}>₹4,999 / year</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Renewal Date</div>
                  <div style={{ fontWeight: 600 }}>Dec 15, 2026</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', gap: '16px' }}>
                <button className="btn-primary">Upgrade Plan</button>
                <button className="btn-outline">Cancel Subscription</button>
              </div>
            </div>

            <div className="card" style={{ padding: '30px', marginTop: '30px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Payment Methods</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '32px', background: '#f3f4f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
                    <CreditCard size={20} color="var(--text-muted)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500 }}>Visa ending in 4242</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Expires 12/28</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.85rem', background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>Default</span>
              </div>
              <button className="btn-outline" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>+ Add New Method</button>
            </div>
          </div>

          {/* Pricing Models (Upsell / Dummy checkout focus) */}
          <div style={{ flex: '1' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Available Plans</h3>
            
            <div className="card" style={{ padding: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '2px solid transparent', cursor: 'pointer', transition: 'border 0.2s' }} 
                 onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                 onMouseOut={e => e.currentTarget.style.borderColor = 'transparent'}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>Monthly Pass</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full access to all courses, billed monthly.</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>₹499<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span></div>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '2px solid var(--primary-color)', background: 'var(--primary-light)', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-10px', right: '20px', background: 'var(--primary-color)', color: 'white', fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: '10px' }}>RECOMMENDED</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px', color: 'var(--primary-color)' }}>Yearly Pro</div>
                <div style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Save 20% on the monthly plan.</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary-color)' }}>₹4,999<span style={{ fontSize: '0.85rem', fontWeight: 400 }}>/yr</span></div>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.05rem', marginTop: '10px' }}>Pay Now via Secure Checkout <ChevronRight size={18} style={{ verticalAlign: 'text-bottom' }} /></button>
            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
               <AlertCircle size={14} /> Supports UPI, Cards & Net Banking
            </div>
          </div>

        </div>
      )}

      {activeTab === 'history' && (
        <div className="card" style={{ padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Date</th>
                <th style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Description</th>
                <th style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Amount</th>
                <th style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Status</th>
                <th style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Dec 15, 2025', desc: 'Pro Yearly Subscription', amount: '₹4,999.00', status: 'Success' },
                { date: 'Nov 12, 2025', desc: 'Advanced Masterclass (One-time)', amount: '₹1,299.00', status: 'Success' },
                { date: 'Oct 05, 2025', desc: 'Monthly Pass', amount: '₹499.00', status: 'Refunded' },
                { date: 'Oct 02, 2025', desc: 'Monthly Pass', amount: '₹499.00', status: 'Failed' },
              ].map((tx, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', fontSize: '0.95rem' }}>{tx.date}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 500 }}>{tx.desc}</td>
                  <td style={{ padding: '16px 20px', fontSize: '0.95rem' }}>{tx.amount}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem', 
                      fontWeight: 600,
                      background: tx.status === 'Success' ? '#dcfce7' : (tx.status === 'Failed' ? '#fee2e2' : '#f3f4f6'),
                      color: tx.status === 'Success' ? '#166534' : (tx.status === 'Failed' ? '#991b1b' : '#374151')
                    }}>
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {tx.status === 'Success' ? (
                      <button style={{ color: 'var(--primary-color)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                        <FileText size={16} /> PDF
                      </button>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Need a refund for a recent purchase?</p>
            <button className="btn-outline" style={{ margin: '0 auto' }}>Request Refund</button>
          </div>
        </div>
      )}

    </div>
  );
}
