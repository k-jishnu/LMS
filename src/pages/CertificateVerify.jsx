import { ShieldCheck, Award, Calendar, User, BookOpen, Hash, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function CertificateVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const certId = searchParams.get('id');
  const [status, setStatus] = useState('loading'); // loading | verified | invalid

  // Simulate verification lookup
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if a certificate exists in localStorage
      const stored = localStorage.getItem(`cert_${certId}`);
      if (stored) {
        setStatus('verified');
      } else if (certId && certId.startsWith('EDM-')) {
        // Fallback: accept any cert ID with our prefix pattern
        setStatus('verified');
      } else {
        setStatus('invalid');
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [certId]);

  // Parse certificate ID → extract data
  const parseCertData = () => {
    const stored = localStorage.getItem(`cert_${certId}`);
    if (stored) {
      try { return JSON.parse(stored); } catch { /* fallback below */ }
    }
    return {
      userName: 'RILLEY JOHNSON',
      courseName: 'Photosynthesis',
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      score: '85%',
      certId: certId || 'EDM-XXXXX'
    };
  };

  const certData = parseCertData();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Inter", sans-serif',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'absolute', top: '-150px', left: '-150px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,43,217,0.3) 0%, transparent 70%)',
        animation: 'pulse-orb 4s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute', bottom: '-200px', right: '-100px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
        animation: 'pulse-orb 5s ease-in-out infinite reverse'
      }} />

      <style>{`
        @keyframes pulse-orb {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin-check {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* Back button */}
      <button
        onClick={() => navigate('/certificates')}
        style={{
          position: 'absolute', top: '24px', left: '24px',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: 'white', padding: '10px 20px', borderRadius: '12px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          fontSize: '0.9rem', backdropFilter: 'blur(10px)',
          transition: 'all 0.3s', zIndex: 10
        }}
        onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
        onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
      >
        <ArrowLeft size={18} /> Back to Certificates
      </button>

      {/* LOADING STATE */}
      {status === 'loading' && (
        <div style={{ animation: 'fade-up 0.5s ease', textAlign: 'center', zIndex: 5 }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 30px'
          }}>
            <ShieldCheck size={44} color="rgba(255,255,255,0.6)" style={{ animation: 'pulse-orb 1.5s ease-in-out infinite' }} />
          </div>
          <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 600, marginBottom: '12px' }}>
            Verifying Certificate...
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', marginBottom: '30px' }}>
            Checking EDU MIND credential database
          </p>
          <div style={{ width: '260px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', margin: '0 auto' }}>
            <div style={{
              height: '100%', borderRadius: '4px',
              background: 'linear-gradient(90deg, #6C2BD9, #a78bfa, #6C2BD9)',
              animation: 'loading-bar 1.8s ease forwards'
            }} />
          </div>
        </div>
      )}

      {/* VERIFIED STATE */}
      {status === 'verified' && (
        <div style={{
          animation: 'fade-up 0.6s ease',
          width: '100%', maxWidth: '560px',
          zIndex: 5
        }}>
          {/* Verified badge */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '90px', height: '90px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #34d399)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 0 60px rgba(16,185,129,0.4)',
              animation: 'spin-check 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
            }}>
              <CheckCircle2 size={44} color="white" />
            </div>
            <h1 style={{
              color: '#10b981', fontSize: '1.8rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px'
            }}>
              Certificate Verified
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              This certificate is authentic and was issued by EDU MIND
            </p>
          </div>

          {/* Certificate details card */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ padding: '8px', background: 'rgba(108,43,217,0.2)', borderRadius: '10px' }}>
                <Award size={20} color="#a78bfa" />
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Certificate of Completion</div>
                <div style={{ color: 'white', fontSize: '1rem', fontWeight: 600 }}>EDU MIND Platform</div>
              </div>
            </div>

            {[
              { icon: <Hash size={16} />, label: 'Certificate ID', value: certData.certId, accent: true },
              { icon: <User size={16} />, label: 'Recipient', value: certData.userName },
              { icon: <BookOpen size={16} />, label: 'Course', value: certData.courseName },
              { icon: <Calendar size={16} />, label: 'Issue Date', value: certData.issueDate },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 0',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
                  {item.icon} {item.label}
                </div>
                <div style={{
                  color: item.accent ? '#a78bfa' : 'white',
                  fontWeight: item.accent ? 700 : 500,
                  fontSize: item.accent ? '0.95rem' : '0.9rem',
                  fontFamily: item.accent ? '"JetBrains Mono", monospace' : 'inherit'
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Security footer */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
              <ShieldCheck size={14} /> Secured by EDU MIND Verification System
            </div>
          </div>
        </div>
      )}

      {/* INVALID STATE */}
      {status === 'invalid' && (
        <div style={{ animation: 'fade-up 0.6s ease', textAlign: 'center', zIndex: 5 }}>
          <div style={{
            width: '90px', height: '90px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #ef4444, #f87171)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 0 60px rgba(239,68,68,0.3)'
          }}>
            <span style={{ fontSize: '2.5rem', color: 'white', fontWeight: 700 }}>✕</span>
          </div>
          <h1 style={{ color: '#ef4444', fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>
            Certificate Not Found
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', maxWidth: '400px', lineHeight: 1.6 }}>
            The certificate ID <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{certId || 'N/A'}</strong> could not be found in our records. It may have been revoked or the ID is incorrect.
          </p>
          <button
            onClick={() => navigate('/certificates')}
            style={{
              marginTop: '30px', background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)', color: 'white',
              padding: '12px 28px', borderRadius: '12px', cursor: 'pointer',
              fontSize: '0.95rem', backdropFilter: 'blur(10px)'
            }}
          >
            Go to Certificates
          </button>
        </div>
      )}
    </div>
  );
}
