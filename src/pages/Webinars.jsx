export default function Webinars() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Subheader Navigation */}
      <div className="tabs-container" style={{ padding: '0 30px' }}>
        <div className="tab active" style={{ color: 'var(--text-muted)', borderBottom: 'none', paddingBottom: '16px', fontSize: '0.9rem' }}>
          Join webinar
        </div>
      </div>

      {/* Empty State */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '100px' }}>
        <div style={{ 
          width: '200px', 
          height: '160px', 
          marginBottom: '30px', 
          position: 'relative',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* Simple Illustration Mock matching the lamp image */}
          <svg viewBox="0 0 200 150" width="100%" height="100%">
            {/* Lamp base */}
            <rect x="120" y="80" width="30" height="40" fill="#1e1b4b" />
            <rect x="150" y="90" width="10" height="10" fill="#1e1b4b" />
            {/* Arm */}
            <line x1="135" y1="80" x2="110" y2="40" stroke="#1e1b4b" strokeWidth="4" />
            <line x1="110" y1="40" x2="80" y2="50" stroke="#1e1b4b" strokeWidth="4" />
            <circle cx="110" cy="40" r="5" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
            <circle cx="135" cy="80" r="5" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2" />
            {/* Lamp head */}
            <path d="M 60 40 Q 80 20 100 40 L 95 60 L 65 60 Z" fill="#ffffff" stroke="#1e1b4b" strokeWidth="3" />
            
            {/* Light beam */}
            <path d="M 60 65 L 10 140 L 90 140 L 90 65 Z" fill="#e0e7ff" opacity="0.5" />
            
            {/* Sparkles */}
            <polygon points="40,90 43,83 50,80 43,77 40,70 37,77 30,80 37,83" fill="#1e1b4b" />
            <polygon points="80,110 82,105 87,103 82,101 80,96 78,101 73,103 78,105" fill="#1e1b4b" />
          </svg>
        </div>
        
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e1b4b', marginBottom: '24px', maxWidth: '300px', textAlign: 'center', lineHeight: 1.4 }}>
          It's a good time to explore all the webinars in store for you
        </h3>
        
        <button style={{ 
          background: '#1e1b4b', 
          color: 'white', 
          border: 'none', 
          padding: '12px 24px', 
          borderRadius: '4px', 
          fontWeight: 500, 
          fontSize: '0.95rem',
          cursor: 'pointer',
          width: '240px'
        }}>
          Explore webinars
        </button>
      </div>
    </div>
  );
}
