import { Download, Share2, ShieldCheck, Award, Lock, CheckCircle, X, Search, ZoomIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Certificates() {
  const navigate = useNavigate();
  const [photoCourse, setPhotoCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchCourseProgress();
  }, []);

  async function fetchCourseProgress() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('courses').select('*');
      if (data) {
        const match = data.find(c => c.title?.toLowerCase().includes('photosynthesis'));
        if (match) setPhotoCourse(match);
        else {
          const anyCompleted = data.find(c => c.progress >= 60 || c.status?.toLowerCase() === 'completed');
          if (anyCompleted) setPhotoCourse(anyCompleted);
        }
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  }

  const localScore = parseInt(localStorage.getItem('quiz_score_photosynthesis') || '0');
  const dbScore = photoCourse?.progress || 0;
  const finalScore = Math.max(dbScore, localScore);
  const isCompleted = finalScore >= 60;

  // Use Riley Johnson as default if no profile name found
  const userName = "RILLEY JOHNSON"; 

  const CertificateContent = ({ isModal = false }) => (
    <div style={{ 
      width: '100%', 
      maxWidth: isModal ? '1100px' : '850px', 
      aspectRatio: '16/9',
      background: 'white', 
      boxShadow: isModal ? '0 50px 100px -20px rgba(0,0,0,0.4)' : '0 30px 60px -12px rgba(0,0,0,0.15)',
      position: 'relative',
      padding: isModal ? '80px' : '60px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#1a1a1a',
      overflow: 'hidden',
      fontFamily: '"Inter", sans-serif',
      border: '1px solid #f0f0f0'
    }}>
       {/* PREMIUM DESIGN ACCENTS */}
       {/* Top Left Ribbon */}
       <div style={{ position: 'absolute', top: 0, left: 0, width: '180px', height: '180px', background: 'linear-gradient(135deg, #6C2BD9, #9D66FF)', clipPath: 'polygon(0 0, 100% 0, 0 100%)', opacity: 0.9 }}></div>
       {/* Bottom Right Ribbon */}
       <div style={{ position: 'absolute', bottom: 0, right: 0, width: '180px', height: '180px', background: 'linear-gradient(-45deg, #6C2BD9, #9D66FF)', clipPath: 'polygon(100% 100%, 0 100%, 100% 0%)', opacity: 0.9 }}></div>
       
       {/* Border Lines */}
       <div style={{ position: 'absolute', top: '40px', left: '120px', right: '40px', height: '1px', background: '#6C2BD9', opacity: 0.4 }}></div>
       <div style={{ position: 'absolute', right: '40px', top: '40px', bottom: '120px', width: '1px', background: '#6C2BD9', opacity: 0.4 }}></div>
       <div style={{ position: 'absolute', left: '40px', top: '120px', bottom: '40px', width: '1px', background: '#6C2BD9', opacity: 0.4 }}></div>
       <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '120px', height: '1px', background: '#6C2BD9', opacity: 0.4 }}></div>

       {/* LOGO SECTION */}
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', zIndex: 10 }}>
          <div style={{ width: '44px', height: '44px', position: 'relative', marginBottom: '12px' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid #1a1a1a', transform: 'rotate(45deg)' }}></div>
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid #1a1a1a', transform: 'rotate(45deg)', top: '4px', left: '4px' }}></div>
          </div>
          <span style={{ fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.4em', color: '#1a1a1a' }}>EDU MIND</span>
       </div>

       {/* HEADER */}
       <h3 style={{ 
         textTransform: 'uppercase', 
         letterSpacing: '0.6rem', 
         fontSize: isModal ? '1.8rem' : '1.4rem', 
         fontWeight: 400, 
         margin: '0 0 16px 0',
         fontFamily: '"Cinzel", serif',
         textAlign: 'center'
       }}>Certificate of Completion</h3>
       
       <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '40px', fontWeight: 300 }}>This to certify that</p>
       
       {/* RECIPIENT */}
       <h1 style={{ 
         fontSize: isModal ? '5.5rem' : '4rem', 
         fontWeight: 800, 
         color: '#6C2BD9', 
         margin: '0 0 32px 0', 
         fontFamily: '"Spectral", serif',
         letterSpacing: '0.1em'
       }}>{userName}</h1>
       
       {/* DESCRIPTION */}
       <p style={{ fontSize: isModal ? '1.3rem' : '1.1rem', maxWidth: '700px', lineHeight: 1.7, textAlign: 'center', margin: '0 0 60px 0', fontWeight: 300 }}>
         successfully completed the <strong>{photoCourse?.title || 'Photosynthesis'}</strong> program and can confidently apply the learned concepts in real-world situations.
       </p>

       {/* SIGNATURE SECTION */}
       <div style={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'space-between', padding: isModal ? '0 100px' : '0 60px', zIndex: 10 }}>
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 500, fontFamily: '"Cinzel", serif' }}>AMIRAH</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', letterSpacing: '0.05em' }}>Head of Course Management</p>
          </div>
          
          <div style={{ textAlign: 'center', position: 'relative' }}>
            {/* Stamp Outline */}
            <div style={{ 
              position: 'absolute', 
              top: '-45px', 
              right: '20px', 
              width: '100px', 
              height: '100px', 
              border: '1px solid #e0e0e0', 
              borderRadius: '50%',
              zIndex: 1
            }}></div>
            <div style={{ 
              fontFamily: '"Birthstone", cursive', 
              fontSize: '3rem', 
              position: 'absolute', 
              top: '-50px', 
              right: '30px', 
              zIndex: 2,
              color: '#1a1a1a',
              opacity: 0.9
            }}>Amirah.</div>
            <div style={{ width: '220px', height: '1px', background: '#1a1a1a', marginTop: '20px' }}></div>
          </div>
       </div>
    </div>
  );

  return (
    <div style={{ padding: '30px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Credentials & Achievements</h2>
      </div>

      <div style={{ display: 'flex', gap: '30px', flex: 1 }}>
        <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 8px 0', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Certificate Vault</h3>
          
          {!loading && isCompleted ? (
            <div className="card" style={{ padding: '16px', border: '2px solid #6C2BD9', background: '#f5f3ff', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', background: '#6C2BD9', borderRadius: '8px', color: 'white' }}><Award size={20} /></div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 700 }}>{photoCourse?.title}</h4>
                <div style={{ fontSize: '0.75rem', color: '#6C2BD9', fontWeight: 600 }}>Achieved</div>
              </div>
              <CheckCircle size={18} color="#10b981" />
            </div>
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', background: 'white', borderRadius: '16px', border: '1px dashed var(--border-color)' }}>
              <Lock size={24} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                Quiz Score: {finalScore}%<br />
                Complete evaluation to unlock.
              </p>
            </div>
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {isCompleted ? (
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white', overflow: 'hidden', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px', borderBottom: '1px solid var(--border-color)', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: 700, fontSize: '0.95rem' }}>
                  <ShieldCheck size={20} /> Verified by EDU MIND
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-outline" onClick={() => setShowPreview(true)} style={{ borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}><ZoomIn size={16} /> Preview Formal</button>
                  <button className="btn-primary" style={{ background: '#6C2BD9', borderRadius: '10px' }}><Download size={16}/> Download PDF</button>
                </div>
              </div>

              <div 
                onClick={() => setShowPreview(true)}
                style={{ flex: 1, padding: '40px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-in' }}
              >
                  <div style={{ transform: 'scale(0.8)', transition: 'transform 0.3s ease' }}>
                    <CertificateContent />
                  </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', padding: '40px', borderRadius: '24px' }}>
              <div style={{ padding: '30px', background: '#f5f3ff', borderRadius: '50%', color: '#6C2BD9', marginBottom: '24px' }}><Award size={64} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px' }}>Certificate Locked</h3>
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '400px', lineHeight: 1.6 }}>Our records show a quiz score of {finalScore}% for <strong>Photosynthesis</strong>. A minimum score of <strong>60%</strong> is required.</p>
              <button className="btn-primary" style={{ marginTop: '24px', background: '#6C2BD9', borderRadius: '12px' }} onClick={() => navigate('/player')}>Continue Assessment</button>
            </div>
          )}
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
           <button onClick={() => setShowPreview(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '15px', borderRadius: '50%', cursor: 'pointer' }}>
             <X size={32} />
           </button>
           <div style={{ transform: 'scale(1)', maxHeight: '90vh', width: '90vw', display: 'flex', justifyContent: 'center' }}>
              <CertificateContent isModal={true} />
           </div>
        </div>
      )}
    </div>
  );
}
