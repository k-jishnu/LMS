import { Download, Share2, ShieldCheck, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const mockCertificates = [
  { id: 'CERT-89241', title: 'Advanced React Patterns', date: 'October 12, 2026', instructor: 'Jishnu', skill: 'React' },
  { id: 'CERT-33019', title: 'UI/UX Masterclass', date: 'August 04, 2026', instructor: 'Sarah Jenkins', skill: 'Design' }
];


export default function Certificates() {
  const [activeCert, setActiveCert] = useState(mockCertificates[0]);

  return (
    <div style={{ padding: '30px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Credentials & Achievements</h2>
      </div>

      <div style={{ display: 'flex', gap: '30px', flex: 1 }}>
        
        {/* Certificate Timeline Sidebar */}
        <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 8px 0', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Certificate Vault</h3>
          
          {mockCertificates.map(cert => (
            <div 
              key={cert.id} 
              onClick={() => setActiveCert(cert)}
              className="card"
              style={{ 
                padding: '16px', 
                cursor: 'pointer', 
                border: activeCert.id === cert.id ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                background: activeCert.id === cert.id ? 'var(--primary-light)' : 'white'
              }}
            >
              <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: 'var(--text-main)' }}>{cert.title}</h4>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{cert.date}</span>
                <span style={{ fontWeight: 600 }}>{cert.skill}</span>
              </div>
            </div>
          ))}

        </div>

        {/* Massive Certificate Preview & Actions */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 600, fontSize: '0.9rem' }}>
                <ShieldCheck size={18} /> Authenticity Verified
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-outline"><Share2 size={16} /> Share to LinkedIn</button>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Download size={16}/> Download PDF</button>
              </div>
            </div>

            {/* Premium Certificate Visual MOCK */}
            <div style={{ flex: 1, padding: '40px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ 
                width: '100%', 
                maxWidth: '800px', 
                aspectRatio: '1.414', // A4 Landscape roughly
                background: 'white', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: '12px solid var(--primary-color)',
                outline: '4px solid white',
                outlineOffset: '-16px',
                padding: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
              }}>
                 {/* Branding watermark mock */}
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03, fontSize: '14rem', fontWeight: 900, pointerEvents: 'none' }}>
                   EB
                 </div>

                 <div style={{ width: '60px', height: '60px', background: 'var(--text-main)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
                   EB
                 </div>
                 
                 <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', color: 'var(--text-muted)', margin: '0 0 20px 0', fontSize: '0.9rem' }}>Certificate of Completion</h4>
                 <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 20px 0', color: 'var(--text-main)', fontFamily: 'serif' }}>K Jishnu</h1>
                 <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: '0 0 10px 0' }}>has successfully completed the instructional requirements for</p>
                 <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--primary-color)', margin: '0 0 40px 0' }}>{activeCert.title}</h2>

                 <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontFamily: 'cursive', color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '10px', minWidth: '150px' }}>
                        {activeCert.instructor}
                      </div>
                      <div style={{ fontSize: '0.8.rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Lead Instructor</div>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '10px', minWidth: '150px' }}>
                        {activeCert.date}
                      </div>
                      <div style={{ fontSize: '0.8.rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date Issued</div>
                    </div>
                 </div>

                 <div style={{ position: 'absolute', bottom: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                   Credential ID: {activeCert.id} 
                 </div>
              </div>
            </div>
          </div>
          
          {/* Career Integration Panel */}
          <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--primary-light)', border: '1px solid var(--primary-color)' }}>
             <div>
               <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: 'var(--primary-color)' }}>Career Integration</h3>
               <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)' }}>Add this verified credential directly to your professional resume or public learning portfolio.</p>
             </div>
             <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <ExternalLink size={16} /> Add to Profile
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
