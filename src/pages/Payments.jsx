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
        <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div className="empty-state" style={{ background: 'transparent', margin: 0 }}>
            <AlertCircle size={48} color="var(--text-muted)" style={{ marginBottom: '16px', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No Current Plans</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
              You don't have any active subscriptions or plans at the moment. Browse our catalog to get started.
            </p>
            <button className="btn-primary" style={{ marginTop: '24px' }}>Browse Courses</button>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div className="empty-state" style={{ background: 'transparent', margin: 0 }}>
            <FileText size={48} color="var(--text-muted)" style={{ marginBottom: '16px', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No Courses Enrolled</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
              Your transaction history is empty because you haven't enrolled in any courses or subscriptions yet.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
