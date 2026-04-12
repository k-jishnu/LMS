import { Search, RotateCcw, Info } from 'lucide-react';

export default function Questions() {
  return (
    <div style={{ padding: '30px' }}>
      {/* Search Header Area */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '40px' }}>
        <button style={{ 
          padding: '10px 16px', 
          background: 'white', 
          border: '1px solid var(--border-color)', 
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-main)',
          fontSize: '0.9rem',
          cursor: 'pointer'
        }}>
          Add Filters <span style={{ fontSize: '0.7rem' }}>▼</span>
        </button>
        
        <input 
          type="text" 
          placeholder="Search by Quiz Title" 
          style={{
            flex: 1,
            padding: '10px 16px',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            outline: 'none',
            fontSize: '0.95rem'
          }}
        />
        
        <button className="btn-outline">
          <RotateCcw size={16} /> Reset
        </button>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Search size={16} /> Search
        </button>
      </div>

      {/* Empty State Area */}
      <div className="empty-state" style={{ padding: '80px 20px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          border: '1.5px solid var(--primary-color)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--primary-color)',
          marginBottom: '16px'
        }}>
          <Info size={16} />
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>
          You have no bookmarks on your platform.
        </p>
      </div>
    </div>
  );
}
