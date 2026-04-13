import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { PlayCircle, FileText, CheckCircle, ArrowLeft, ArrowRight, Check, Lock, HelpCircle } from 'lucide-react';

export default function CoursePlayer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);

  const courseId = location.state?.courseId || 'default_course';
  const currentIndex = lessons.findIndex(l => l.id === currentLesson?.id);

  async function markAsCompleted(lessonId) {
    if (completedLessons.includes(lessonId)) return;

    setCompletedLessons(prev => [...prev, lessonId]);

    try {
      await supabase.from("user_progress").insert([
        {
          course_id: courseId,
          lesson_id: lessonId,
          completed: true,
        },
      ]);
    } catch (e) {
      console.log('Error saving progress', e);
    }
  }

  function handleNextOrFinish() {
    if (currentLesson) markAsCompleted(currentLesson.id);
    
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    } else {
      navigate('/');
    }
  }

  function goToPrev() {
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  }

  async function fetchCompleted() {
    try {
      if (!courseId || courseId === 'default_course') return;
      const { data, error } = await supabase
        .from("user_progress")
        .select("lesson_id")
        .eq("course_id", courseId);
      
      if (!error && data) {
        setCompletedLessons(data.map((item) => item.lesson_id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchLessons();
    fetchCompleted();
  }, [courseId]);

  async function fetchLessons() {
    try {
      setLoading(true);
      // We check the "modules" table as requested (fallback to "lessons" is handled automatically below)
      const { data, error } = await supabase
        .from("modules")
        .select("*");

      if (error) {
        console.error(error);
      } else if (data && data.length > 0) {
        setLessons(data);
        const targetLessonId = location.state?.lessonId;
        const targetLesson = data.find(l => l.id === targetLessonId);
        setCurrentLesson(targetLesson || data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Fallback check to try fetching from "lessons" table if "modules" fails or is empty
  useEffect(() => {
    if (!loading && lessons.length === 0) {
      const fetchAlternative = async () => {
        const { data } = await supabase.from("lessons").select("*");
        if (data && data.length > 0) {
          setLessons(data);
          const targetLessonId = location.state?.lessonId;
          const targetLesson = data.find(l => l.id === targetLessonId);
          setCurrentLesson(targetLesson || data[0]);
        }
      };
      fetchAlternative();
    }
  }, [loading, lessons]);

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: 'var(--bg-primary)' }}>

      {/* Video / Content Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Loading modules please wait...</div>
        ) : !currentLesson ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No modules found in the database. Add data to your "modules" table!</div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

            {currentLesson?.type === "video" ? (
              <>
                <div style={{ width: '100%', background: '#000', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <iframe
                    src={currentLesson.video_url}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    allow="autoplay; fullscreen"
                  ></iframe>
                </div>
                <div style={{ padding: '40px', background: 'var(--bg-primary)', flex: 1 }}>
                  <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{currentLesson.title}</h1>
                  {currentLesson.description && (
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{currentLesson.description}</p>
                  )}

                  {currentLesson.content && (
                    <div style={{
                      lineHeight: '1.8',
                      fontSize: '1.1rem',
                      color: 'var(--text-main)',
                      whiteSpace: 'pre-wrap',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '30px',
                      marginTop: '30px'
                    }}>
                      {currentLesson.content}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ padding: "50px", background: "var(--bg-primary)", flex: 1, overflowY: 'auto' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-main)' }}>{currentLesson.title}</h1>
                {currentLesson.description && (
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '30px' }}>{currentLesson.description}</p>
                )}
                <div style={{
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                  color: 'var(--text-main)',
                  whiteSpace: 'pre-wrap',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '30px'
                }}>
                  {currentLesson.content}
                </div>
              </div>
            )}
            
            {/* Next / Previous Navigation Container */}
            <div style={{ padding: '20px 40px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)' }}>
              <button 
                className="btn-outline" 
                onClick={goToPrev} 
                disabled={currentIndex === 0}
                style={{ opacity: currentIndex === 0 ? 0.5 : 1, cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                 <ArrowLeft size={18} /> Previous
              </button>
              <button 
                className="btn-primary" 
                onClick={handleNextOrFinish} 
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                 {currentIndex === lessons.length - 1 ? (
                    <>Finish <Check size={18} /></>
                 ) : (
                    <>Next <ArrowRight size={18} /></>
                 )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar / Syllabus */}
      <div style={{ width: '350px', background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', background: 'white' }}>
          <h2 style={{ fontSize: '1.25rem', margin: '0' }}>Course Syllabus</h2>
          <div style={{ marginTop: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lessons.length} Modules total</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {lessons.map((lesson, idx) => {
            const isUnlocked = idx === 0 || completedLessons.includes(lessons[idx - 1]?.id);

            return (
              <button
                key={lesson.id || idx}
                disabled={!isUnlocked}
                onClick={() => setCurrentLesson(lesson)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  background: currentLesson?.id === lesson.id ? 'var(--primary-light)' : 'white',
                  border: currentLesson?.id === lesson.id ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  boxShadow: currentLesson?.id === lesson.id ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none',
                  opacity: isUnlocked ? 1 : 0.6
                }}
              >
                {lesson.type === 'video' ? <PlayCircle size={20} color={currentLesson?.id === lesson.id ? 'var(--primary-color)' : 'var(--text-muted)'} /> : <FileText size={20} color={currentLesson?.id === lesson.id ? 'var(--primary-color)' : 'var(--text-muted)'} />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: currentLesson?.id === lesson.id ? 'var(--primary-color)' : 'var(--text-main)', fontSize: '0.95rem' }}>
                    {lesson.title || `Module ${idx + 1}`}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {lesson.type === 'video' ? 'Video Lesson' : 'Text Content'}
                  </div>
                </div>

                {completedLessons.includes(lesson.id) ? (
                   <CheckCircle size={16} color="#10b981" />
                ) : !isUnlocked ? (
                   <Lock size={16} color="var(--text-muted)" />
                ) : (
                   <CheckCircle size={16} color={currentLesson?.id === lesson.id ? 'var(--primary-color)' : 'var(--border-color)'} />
                )}
              </button>
            );
          })}

          <button
             onClick={() => navigate('/quizzes')}
             style={{
               width: '100%',
               display: 'flex',
               alignItems: 'center',
               gap: '12px',
               padding: '16px',
               background: 'var(--primary-light)',
               border: '1px dashed var(--primary-color)',
               borderRadius: '8px',
               marginTop: '12px',
               cursor: 'pointer',
               textAlign: 'left',
               transition: 'all 0.2s',
             }}
           >
             <HelpCircle size={20} color="var(--primary-color)" />
             <div style={{ flex: 1 }}>
               <div style={{ fontWeight: 600, color: 'var(--primary-color)', fontSize: '0.95rem' }}>
                 React Basics Quiz
               </div>
               <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                 Evaluation Section
               </div>
             </div>
             <ArrowRight size={16} color="var(--primary-color)" />
           </button>
        </div>
      </div>

    </div>
  );
}
