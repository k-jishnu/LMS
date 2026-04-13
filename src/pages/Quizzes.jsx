import { useState, useEffect } from 'react';
import { HelpCircle, Clock, Award, ChevronLeft, Target, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('quizzes').select('*');
        if (data) setQuizzes(data);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  async function handleStartQuiz(quiz) {
    setIsLoadingQuiz(true);
    // Fetch questions
    const { data: qData } = await supabase.from('questions').select('*').eq('quiz_id', quiz.id);
    if (qData && qData.length > 0) {
      // Fetch options
      const qIds = qData.map(q => q.id);
      const { data: optData } = await supabase.from('options').select('*').in('question_id', qIds);
      
      const structuredQs = qData.map(q => ({
        ...q,
        options: optData ? optData.filter(o => o.question_id === q.id) : []
      }));
      setQuizData(structuredQs);
      setActiveQuiz({ ...quiz, questions_count: structuredQs.length, color: '#10b981', type: 'Quiz' });
    } else {
      setQuizData([]);
      setActiveQuiz({ ...quiz, questions_count: 0, color: '#10b981', type: 'Quiz' });
    }
    setCurrentQuestion(1);
    setSelectedAnswers({});
    setShowResults(false);
    setIsLoadingQuiz(false);
  }

  function handleSelectOption(questionId, optionId) {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
  }

  function handleSubmit() {
    setShowResults(true);
  }

  if (activeQuiz) {
    const currentQ = quizData[currentQuestion - 1];

    // Compute Score
    let score = 0;
    if (showResults) {
      quizData.forEach(q => {
        const selectedOptId = selectedAnswers[q.id];
        const correctOpt = q.options.find(o => o.is_correct);
        if (correctOpt && selectedOptId === correctOpt.id) score++;
      });
    }

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'var(--bg-secondary)', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
        
        {/* Exam Focus Topbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 30px', background: 'white', borderBottom: '1px solid var(--border-color)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setActiveQuiz(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}><ChevronLeft size={24}/></button>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{activeQuiz.title}</h2>
            <span style={{ background: `${activeQuiz.color}15`, color: activeQuiz.color, padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>{activeQuiz.type}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
             {!showResults && (
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 700, fontSize: '1.2rem', background: '#fef2f2', padding: '8px 16px', borderRadius: '4px', border: '1px solid #fecaca' }}>
                 <Clock size={20} /> --:--
               </div>
             )}
             {!showResults && (
               <button onClick={handleSubmit} className="btn-primary" style={{ background: 'var(--primary-color)', padding: '10px 24px', fontSize: '1rem', fontWeight: 600 }}>Submit Exam</button>
             )}
          </div>
        </div>

        {/* High Focus Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
           
           {/* Question Rendering Space */}
           <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                {isLoadingQuiz ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>Loading Quiz Questions...</div>
                ) : quizData.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No questions found for this quiz.</div>
                ) : showResults ? (
                  <div className="card" style={{ padding: '40px', textAlign: 'center', marginBottom: '30px' }}>
                     <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--text-main)' }}>Quiz Completed!</h2>
                     <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>You scored <strong style={{ color: 'var(--primary-color)' }}>{score}</strong> out of {quizData.length}</p>
                     <div style={{ marginTop: '30px', fontSize: '1rem', color: 'var(--text-main)' }}>Select a question block on the right to review your answers.</div>
                  </div>
                ) : null}

                {(currentQ) && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 500, margin: 0 }}>Question {currentQuestion} of {activeQuiz.questions_count}</h3>
                      {!showResults && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={14}/> Auto-saved</span>}
                    </div>

                    <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
                      <p style={{ fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.6, margin: '0 0 30px 0', color: 'var(--text-main)' }}>
                        {currentQ.question}
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {currentQ.options.map((opt) => {
                          const isSelected = selectedAnswers[currentQ.id] === opt.id;
                          let bgColor = isSelected ? 'var(--primary-light)' : 'white';
                          let borderColor = isSelected ? 'var(--primary-color)' : 'var(--border-color)';
                          
                          if (showResults) {
                            if (opt.is_correct) {
                               bgColor = '#dcfce7'; borderColor = '#10b981';
                            } else if (isSelected && !opt.is_correct) {
                               bgColor = '#fee2e2'; borderColor = '#ef4444';
                            } else {
                               bgColor = 'white'; borderColor = 'var(--border-color)';
                            }
                          }

                          return (
                            <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', border: `1px solid ${borderColor}`, borderRadius: '8px', cursor: showResults ? 'default' : 'pointer', transition: 'background 0.2s', background: bgColor }}>
                              <input 
                                type="radio" 
                                name={`q-${currentQ.id}`} 
                                checked={isSelected}
                                onChange={() => handleSelectOption(currentQ.id, opt.id)}
                                disabled={showResults}
                                style={{ width: '18px', height: '18px', accentColor: showResults ? (opt.is_correct ? '#10b981' : '#ef4444') : 'var(--primary-color)' }} 
                              />
                              <span style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{opt.option_text}</span>
                              {showResults && opt.is_correct && <CheckCircle size={20} color="#10b981" style={{ marginLeft: 'auto' }} />}
                              {showResults && isSelected && !opt.is_correct && <XCircle size={20} color="#ef4444" style={{ marginLeft: 'auto' }} />}
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button 
                        className="btn-outline" 
                        style={{ padding: '12px 24px' }} 
                        onClick={() => setCurrentQuestion(q => Math.max(q-1, 1))}
                        disabled={currentQuestion === 1}
                      >Previous</button>
                      
                      <button 
                        className="btn-primary" 
                        style={{ padding: '12px 24px' }} 
                        onClick={() => setCurrentQuestion(q => Math.min(q+1, activeQuiz.questions_count))}
                        disabled={currentQuestion === activeQuiz.questions_count}
                      >{showResults ? 'Next' : 'Save & Next'}</button>
                    </div>
                  </>
                )}
              </div>
           </div>

           {/* Navigation Tracker Sidebar */}
           <div style={{ width: '300px', background: 'white', borderLeft: '1px solid var(--border-color)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
             <h4 style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Progress Tracker</h4>
             
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
               {!isLoadingQuiz && quizData.map((q, idx) => {
                 const i = idx;
                 const isAnswered = !!selectedAnswers[q.id];
                 let bg = currentQuestion === i+1 ? 'var(--primary-color)' : isAnswered ? '#10b981' : 'var(--bg-secondary)';
                 let col = currentQuestion === i+1 || isAnswered ? 'white' : 'var(--text-main)';
                 let bor = `1px solid ${currentQuestion === i+1 ? 'var(--primary-color)' : isAnswered ? '#10b981' : 'var(--border-color)'}`;
                 
                 if (showResults) {
                    const correctOpt = q.options.find(o => o.is_correct);
                    const isCorrect = correctOpt && selectedAnswers[q.id] === correctOpt.id;
                    if (isCorrect) {
                      bg = '#10b981'; bor = '1px solid #10b981'; col = 'white';
                    } else {
                      bg = '#ef4444'; bor = '1px solid #ef4444'; col = 'white';
                    }
                    if (currentQuestion === i+1) { bor = '2px solid var(--text-main)'; }
                 }

                 return (
                   <div 
                     key={i} 
                     onClick={() => setCurrentQuestion(i+1)}
                     style={{
                       aspectRatio: '1',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       fontSize: '0.9rem',
                       fontWeight: 600,
                       borderRadius: '4px',
                       cursor: 'pointer',
                       background: bg,
                       color: col,
                       border: bor
                     }}
                   >
                     {i+1}
                   </div>
                 );
               })}
             </div>

             <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px' }}></div> {showResults ? 'Correct' : 'Answered'}</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: showResults ? '#ef4444' : 'var(--bg-secondary)', border: showResults ? 'none' : '1px solid var(--border-color)',  borderRadius: '2px' }}></div> {showResults ? 'Incorrect' : 'Not Visited'}</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: 'var(--primary-color)', borderRadius: '2px' }}></div> Current</div>
             </div>
           </div>

        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Evaluation Center</h2>
      </div>

      {loading ? (
         <div style={{ color: 'var(--text-muted)' }}>Loading available quizzes...</div>
      ) : quizzes.length === 0 ? (
         <div style={{ color: 'var(--text-muted)' }}>No quizzes found in the database.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {quizzes.map(quiz => (
            <div key={quiz.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                 <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', color: 'var(--text-main)' }}>
                   <HelpCircle size={24} />
                 </div>
                 <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', background: `#10b98115`, color: '#10b981', textTransform: 'uppercase' }}>Quiz</span>
               </div>

               <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 8px 0', lineHeight: 1.3 }}>{quiz.title}</h3>
               
               <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14}/> Unlimited Time</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Target size={14}/> Database Powered</span>
               </div>

               <button onClick={() => handleStartQuiz(quiz)} className="btn-primary" style={{ marginTop: 'auto', width: '100%', padding: '10px' }}>Start Quiz</button>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}
