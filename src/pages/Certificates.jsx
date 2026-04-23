import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Award, Lock, CheckCircle, Search, X } from 'lucide-react';
import Certificate from '../components/Certificate';

export default function Certificates() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCert, setActiveCert] = useState(null); // Controls the Certificate Modal

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // 1. Get User Info
      const { data: { user } } = await supabase.auth.getUser();
      // Fallback for custom OTP flow where Supabase session might be null
      const userName = user?.user_metadata?.full_name
        || localStorage.getItem('custom_session_name')
        || 'Dedicated Learner';

      // 2. Fetch Courses
      const { data: courseData, error } = await supabase.from('courses').select('*');

      if (courseData) {
        setCourses(courseData.map(c => {
          // Fallback to local storage in case the DB update failed due to custom OTP/RLS
          let localProgress = null;
          if (c.title?.toLowerCase().includes('photosynthesis')) {
            const scoreStr = localStorage.getItem('quiz_score_photosynthesis');
            if (scoreStr) localProgress = parseInt(scoreStr, 10);
          }

          return {
            ...c,
            progress: localProgress !== null ? localProgress : (c.progress || 0),
            userName
          };
        }));
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleUnlockCertificate = async (course) => {
    // 🥇 3. UNLOCK LOGIC (CORE)
    if ((course.progress || 0) < 60) {
      alert("You must score at least 60% to unlock your certificate");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      // Fallback ID for custom session
      const userId = user?.id || localStorage.getItem('custom_session_email') || 'anonymous';

      // 🥇 6. PREVENT DUPLICATES (IMPORTANT)
      const { data: existingCert } = await supabase
        .from("certificates")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", course.id)
        .maybeSingle();

      let certId = existingCert?.certificate_id;
      let issueDate = existingCert?.issued_at;

      // 🥇 5. GENERATE CERTIFICATE (WHEN 100%)
      if (!existingCert) {
        certId = 'CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        issueDate = new Date().toISOString();

        // Save in Supabase
        await supabase.from("certificates").upsert({
          user_id: userId,
          course_id: course.id,
          certificate_id: certId,
          issued_at: issueDate
        });
      }

      // Show the certificate modal
      setActiveCert({
        ...course,
        certId,
        issueDate
      });

    } catch (err) {
      console.error("Error handling certificate:", err);
      alert("Something went wrong verifying your certificate.");
    }
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'var(--bg-secondary)', padding: '40px' }}>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div style={{ width: '60px', height: '60px', background: '#e0e7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
            <Award size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>My Certificates</h1>
            <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>Manage and download your verified course certificates.</p>
          </div>
        </div>

        <div className="card" style={{ padding: '30px', borderRadius: '24px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Course Achievements</h2>
            <div style={{ position: 'relative', width: '250px' }}>
              <input type="text" className="input-field" placeholder="Search courses..." style={{ paddingLeft: '40px' }} />
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: 600 }}>Course</th>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: 600 }}>Progress</th>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>Certificate</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" style={{ padding: '40px', textAlign: 'center' }}>Loading courses...</td></tr>
              ) : courses.map(course => {
                const progress = course.progress || 0;
                const isUnlocked = progress >= 60;

                return (
                  <tr key={course.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', ':hover': { background: 'var(--bg-secondary)' } }}>
                    <td style={{ padding: '20px 16px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{course.title || 'Untitled Course'}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>By {course.instructor || 'EduMind'}</div>
                    </td>
                    <td style={{ padding: '20px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '100px', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${progress}%`, height: '100%', background: isUnlocked ? '#10b981' : 'var(--primary-color)' }}></div>
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem', color: isUnlocked ? '#10b981' : 'var(--text-main)' }}>{progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '20px 16px', textAlign: 'right' }}>
                      {/* 🥇 4. FRONTEND LOGIC (VERY IMPORTANT) */}
                      {isUnlocked ? (
                        <button
                          onClick={() => handleUnlockCertificate(course)}
                          style={{
                            padding: '10px 20px',
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)'
                          }}
                        >
                          <CheckCircle size={16} /> Download
                        </button>
                      ) : (
                        <button
                          disabled
                          style={{
                            padding: '10px 20px',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            fontWeight: 500,
                            cursor: 'not-allowed',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <Lock size={16} /> Locked
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      </div>

      {/* Certificate Generator Modal */}
      {activeCert && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px', // Reduced padding for better edge-to-edge fit
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{ position: 'relative', maxWidth: '1000px', width: '100%', animation: 'zoom-in 0.3s ease-out' }}>
            <button
              onClick={() => setActiveCert(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                zIndex: 10
              }}
            >
              <X size={20} color="#ef4444" />
            </button>

            <Certificate
              name={activeCert.userName}
              course={activeCert.title || 'Untitled Course'}
              date={new Date(activeCert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              certId={activeCert.certId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
