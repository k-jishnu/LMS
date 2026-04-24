import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { PlayCircle, FileText, CheckCircle, ArrowLeft, ArrowRight, Check, Lock, HelpCircle, Target, Award } from 'lucide-react';

export default function CoursePlayer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  
  // Quiz states
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const courseId = location.state?.courseId || 'default_course';
  const currentIndex = lessons.findIndex(l => l.id === currentLesson?.id);

  async function markAsCompleted(lessonId) {
    if (completedLessons.includes(lessonId)) return;
    setCompletedLessons(prev => [...prev, lessonId]);
    try {
      await supabase.from("user_progress").insert([{ course_id: courseId, lesson_id: lessonId, completed: true }]);
    } catch (e) { console.log('Error', e); }
  }

  function handleNextOrFinish() {
    if (isQuizActive) {
      if (!quizSubmitted) {
        alert("Please submit your quiz before finishing.");
        return;
      }
      navigate('/certificates');
      return;
    }

    if (currentLesson) markAsCompleted(currentLesson.id);
    
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    } else {
      setIsQuizActive(true);
      setCurrentLesson(null);
    }
  }

  function goToPrev() {
    if (isQuizActive) {
      setIsQuizActive(false);
      setCurrentLesson(lessons[lessons.length - 1]);
      return;
    }
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  }

  useEffect(() => {
    fetchLessons();
    fetchCompleted();
  }, [courseId]);

  async function fetchLessons() {
    try {
      setLoading(true);
      const { data } = await supabase.from("modules").select("*");
      if (data && data.length > 0) {
        setLessons(data);
        setCurrentLesson(data[0]);
      } else {
        const { data: alt } = await supabase.from("lessons").select("*");
        if (alt && alt.length > 0) {
          setLessons(alt);
          setCurrentLesson(alt[0]);
        }
      }
      
      // Fetch Quiz Questions for 'React Basics Quiz'
      const { data: quiz } = await supabase.from('quizzes').select('id').ilike('title', '%react basics%').single();
      if (quiz) {
        const { data: questions } = await supabase.from('questions').select('*, options(*)').eq('quiz_id', quiz.id);
        if (questions) setQuizQuestions(questions);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  }

  async function fetchCompleted() {
    try {
      const { data } = await supabase.from("user_progress").select("lesson_id").eq("course_id", courseId);
      if (data) setCompletedLessons(data.map(i => i.lesson_id));
    } catch (err) { console.error(err); }
  }

  const submitQuiz = async () => {
    let finalScore = 0;
    quizQuestions.forEach(q => {
      const correctOpt = (q.options || []).find(o => o.is_correct);
      if (selectedAnswers[q.id] === correctOpt?.id) finalScore++;
    });
    
    const percentage = Math.round((finalScore / quizQuestions.length) * 100);
    setScore(percentage);
    setQuizSubmitted(true);

    // Save to DB: update the specific course with this score
    try {
      localStorage.setItem('quiz_score_photosynthesis', percentage.toString());
      if (courseId && courseId !== 'default_course') {
        const { error } = await supabase
          .from('courses')
          .update({ 
            progress: percentage, 
            status: percentage >= 60 ? 'Completed' : 'Failed' 
          })
          .eq('id', courseId);
          
        if (error) throw error;
      } else {
        // Fallback to title search if courseId is missing
        await supabase
          .from('courses')
          .update({ progress: percentage, status: percentage >= 60 ? 'Completed' : 'Failed' })
          .ilike('title', '%photosynthesis%');
      }
    } catch (e) {
      console.error('Error saving quiz score:', e);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: 'var(--bg-primary)' }}>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Syncing learning environment...</div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: isQuizActive ? '40px' : '0' }}>
               {isQuizActive ? (
                 <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', padding: '20px', background: 'var(--primary-light)', borderRadius: '16px', border: '1px solid rgba(86, 59, 186, 0.1)' }}>
                       <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', boxShadow: '0 8px 16px rgba(86, 59, 186, 0.1)' }}>
                         <Target size={32} />
                       </div>
                       <div>
                         <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, color: '#1e293b' }}>React Basics Quiz</h1>
                         <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontWeight: 500 }}>Final Evaluation Stage</p>
                       </div>
                    </div>

                    {!quizSubmitted ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {quizQuestions.map((q, idx) => (
                          <div key={q.id} className="premium-card" style={{ padding: '40px' }}>
                             <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                                <div style={{ background: 'var(--primary-light)', color: 'var(--primary-color)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                                  {idx + 1}
                                </div>
                                <p style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: '#1e293b', lineHeight: '1.5' }}>{q.question}</p>
                             </div>
                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                {(q.options || []).map(opt => {
                                  const isSelected = selectedAnswers[q.id] === opt.id;
                                  return (
                                    <label 
                                      key={opt.id} 
                                      style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '16px', 
                                        padding: '20px', 
                                        border: `2px solid ${isSelected ? 'var(--primary-color)' : 'var(--border-color)'}`, 
                                        borderRadius: '16px', 
                                        cursor: 'pointer', 
                                        background: isSelected ? 'var(--primary-light)' : 'white',
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: isSelected ? '0 10px 15px -3px rgba(86, 59, 186, 0.1)' : 'none'
                                      }}
                                    >
                                       <div style={{ 
                                         width: '24px', 
                                         height: '24px', 
                                         borderRadius: '50%', 
                                         border: `2px solid ${isSelected ? 'var(--primary-color)' : '#cbd5e1'}`, 
                                         display: 'flex', 
                                         alignItems: 'center', 
                                         justifyContent: 'center',
                                         background: 'white'
                                       }}>
                                          {isSelected && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary-color)' }} />}
                                       </div>
                                       <input 
                                         type="radio" 
                                         name={`q-${q.id}`} 
                                         checked={isSelected}
                                         onChange={() => setSelectedAnswers(prev => ({...prev, [q.id]: opt.id}))}
                                         style={{ display: 'none' }}
                                       />
                                       <span style={{ fontSize: '1.05rem', fontWeight: 500, color: isSelected ? 'var(--primary-color)' : 'var(--text-main)' }}>{opt.option_text}</span>
                                    </label>
                                  );
                                })}
                             </div>
                          </div>
                        ))}
                        <button 
                          className="btn-primary" 
                          onClick={submitQuiz} 
                          style={{ padding: '20px', fontSize: '1.25rem', borderRadius: '20px', marginTop: '20px', boxShadow: '0 20px 40px rgba(86, 59, 186, 0.2)' }}
                        >
                          Submit Final Evaluation
                        </button>
                      </div>
                    ) : (
                      <div className="premium-card" style={{ textAlign: 'center', maxWidth: '650px', margin: '40px auto' }}>
                         <div style={{ width: '96px', height: '96px', background: '#f0fdf4', color: '#10b981', borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.2)' }}>
                           <Award size={56} />
                         </div>
                         <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>Course Completed!</h2>
                         <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px', lineHeight: '1.6' }}>
                           Incredible work! You scored <strong style={{ color: 'var(--primary-color)', fontSize: '1.25rem' }}>{score}%</strong> and have officially mastered the concepts of this program.
                         </p>
                         
                         <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                           <button 
                             onClick={() => navigate('/certificates')}
                             className="btn-primary"
                             style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '16px' }}
                           >
                              <Award size={24} /> Get My Certificate
                           </button>
                           <button 
                             onClick={() => setIsQuizActive(false)}
                             className="btn-outline"
                             style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '16px' }}
                           >
                              Review Lessons
                           </button>
                         </div>
                      </div>
                    )}
                 </div>
               ) : (
                 <>
                   {currentLesson?.type === 'video' ? (
                     <div style={{ width: '100%', background: '#000', aspectRatio: '16/9' }}>
                        <iframe src={currentLesson.video_url} width="100%" height="100%" style={{ border: 'none' }} allow="autoplay; fullscreen"></iframe>
                     </div>
                   ) : null}
                   <div style={{ padding: '40px', flex: 1 }}>
                      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{currentLesson?.title}</h1>
                      <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-main)', whiteSpace: 'pre-wrap', borderTop: '1px solid var(--border-color)', paddingTop: '30px', marginTop: '20px' }}>
                        {currentLesson?.content || currentLesson?.description || "Loading content..."}
                      </div>
                   </div>
                 </>
               )}
            </div>

            <div style={{ padding: '20px 40px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
              <button className="btn-outline" onClick={goToPrev} disabled={currentIndex === 0 && !isQuizActive} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <ArrowLeft size={18} /> Previous
              </button>
              
              {(isQuizActive || (lessons.length > 0 && currentIndex === lessons.length - 1 && !isQuizActive)) ? (
                <button className="btn-primary" onClick={handleNextOrFinish} style={{ background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 30px' }}>
                   {isQuizActive ? 'Finish' : (currentIndex === lessons.length - 1 ? 'Start Quiz' : 'Next')} <Check size={18} />
                </button>
              ) : (
                <button className="btn-primary" onClick={handleNextOrFinish} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   Next <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ width: '350px', background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', background: 'white' }}>
          <h2 style={{ fontSize: '1.25rem', margin: '0' }}>Course Syllabus</h2>
          <div style={{ marginTop: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lessons.length + 1} Modules total</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {lessons.map((lesson, idx) => {
            const isActive = !isQuizActive && currentLesson?.id === lesson.id;
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <button key={lesson.id} onClick={() => { setCurrentLesson(lesson); setIsQuizActive(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: isActive ? 'var(--primary-light)' : 'white', border: isActive ? '1px solid var(--primary-color)' : '1px solid var(--border-color)', borderRadius: '12px', marginBottom: '12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                {lesson.type === 'video' ? <PlayCircle size={20} color={isActive ? 'var(--primary-color)' : 'var(--text-muted)'} /> : <FileText size={20} color={isActive ? 'var(--primary-color)' : 'var(--text-muted)'} />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: isActive ? 'var(--primary-color)' : 'var(--text-main)', fontSize: '0.95rem' }}>{lesson.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{lesson.type === 'video' ? 'Video Lesson' : 'Text Content'}</div>
                </div>
                {isCompleted ? <CheckCircle size={16} color="#2563eb" /> : <CheckCircle size={16} color="var(--border-color)" />}
              </button>
            );
          })}

          <button onClick={() => { setIsQuizActive(true); setCurrentLesson(null); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: isQuizActive ? 'var(--primary-light)' : 'white', border: isQuizActive ? '1px solid var(--primary-color)' : '1px dashed var(--border-color)', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
            <HelpCircle size={20} color={isQuizActive ? 'var(--primary-color)' : 'var(--text-muted)'} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: isQuizActive ? 'var(--primary-color)' : 'var(--text-main)', fontSize: '0.95rem' }}>React Basics Quiz</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Evaluation Section</div>
            </div>
            {quizSubmitted ? <CheckCircle size={16} color="#2563eb" /> : <ArrowRight size={16} color={isQuizActive ? 'var(--primary-color)' : 'var(--border-color)'} />}
          </button>
        </div>
      </div>
    </div>
  );
}
