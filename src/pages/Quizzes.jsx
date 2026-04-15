import { useState, useEffect } from 'react';
import { HelpCircle, Clock, Award, ChevronLeft, Target, AlertTriangle, CheckCircle, XCircle, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    
    const currentQ = quizData.find(q => q.id === questionId);
    if (!currentQ) return;

    const selectedOption = currentQ.options.find(o => o.id === optionId);
    
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
           <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto', position: 'relative' }}>

              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                {isLoadingQuiz ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>Loading Quiz Questions...</div>
                ) : quizData.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No questions found for this quiz.</div>
                ) : showResults ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card" style={{ padding: '40px', textAlign: 'center', marginBottom: '30px' }}
                  >
                     <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-main)', fontWeight: 800 }}>Quiz Completed!</h2>
                     <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>You scored <strong style={{ color: 'var(--primary-color)' }}>{score}</strong> out of {quizData.length}</p>
                     <div style={{ marginTop: '30px', fontSize: '1rem', color: 'var(--text-main)' }}>Select a question block on the right to review your answers.</div>
                  </motion.div>
                ) : null}

                <AnimatePresence mode="wait">
                  {(currentQ && !showResults) && (
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
                        <div>
                          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 500, margin: 0 }}>Question {currentQuestion} of {activeQuiz.questions_count}</h3>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '20px' }}><Zap size={14} color="#f59e0b" fill="#f59e0b"/> High Precision Mode</span>
                      </div>

                      <div className="card" style={{ padding: '40px', marginBottom: '30px', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
                        <p style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.4, margin: '0 0 40px 0', color: 'var(--text-main)' }}>
                          {currentQ.question}
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {currentQ.options.map((opt, idx) => {
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
                              <motion.label 
                                key={opt.id}
                                whileHover={{ scale: showResults ? 1 : 1.01 }}
                                whileTap={{ scale: showResults ? 1 : 0.99 }}
                                style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '20px', 
                                  padding: '20px 24px', 
                                  border: `2px solid ${borderColor}`, 
                                  borderRadius: '16px', 
                                  cursor: showResults ? 'default' : 'pointer', 
                                  transition: 'all 0.2s', 
                                  background: bgColor,
                                  boxShadow: isSelected ? '0 10px 15px -3px rgba(86, 59, 186, 0.1)' : 'none'
                                }}
                              >
                                <div style={{ 
                                  width: '32px', 
                                  height: '32px', 
                                  borderRadius: '50%', 
                                  border: `2px solid ${isSelected ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.9rem',
                                  fontWeight: 700,
                                  color: isSelected ? 'var(--primary-color)' : 'var(--text-muted)',
                                  background: isSelected ? 'white' : 'transparent'
                                }}>
                                  {String.fromCharCode(65 + idx)}
                                </div>
                                <input 
                                  type="radio" 
                                  name={`q-${currentQ.id}`} 
                                  checked={isSelected}
                                  onChange={() => handleSelectOption(currentQ.id, opt.id)}
                                  disabled={showResults}
                                  style={{ display: 'none' }} 
                                />
                                <span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-main)' }}>{opt.option_text}</span>
                                {showResults && opt.is_correct && <CheckCircle size={24} color="#10b981" style={{ marginLeft: 'auto' }} />}
                                {showResults && isSelected && !opt.is_correct && <XCircle size={24} color="#ef4444" style={{ marginLeft: 'auto' }} />}
                              </motion.label>
                            )
                          })}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button 
                          className="btn-outline" 
                          style={{ padding: '14px 28px', borderRadius: '12px', fontSize: '1rem' }} 
                          onClick={() => setCurrentQuestion(q => Math.max(q-1, 1))}
                          disabled={currentQuestion === 1}
                        >Previous</button>
                        
                        <button 
                          className="btn-primary" 
                          style={{ padding: '14px 32px', borderRadius: '12px', fontSize: '1rem', boxShadow: '0 10px 15px -3px rgba(86, 59, 186, 0.4)' }} 
                          onClick={() => setCurrentQuestion(q => Math.min(q+1, activeQuiz.questions_count))}
                          disabled={currentQuestion === activeQuiz.questions_count}
                        >{showResults ? 'Next' : 'Save & Next'}</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
           {quizzes.map((quiz, idx) => (
            <motion.div 
              key={quiz.id} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="quiz-card" 
              style={{ padding: '32px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
            >
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                 <div style={{ background: 'var(--primary-light)', padding: '16px', borderRadius: '16px', color: 'var(--primary-color)' }}>
                   <Zap size={28} fill="var(--primary-color)" />
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                   <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '4px 12px', borderRadius: '20px', background: `#10b98115`, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified</span>
                   <div style={{ display: 'flex', gap: '2px' }}>
                     {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                   </div>
                 </div>
               </div>

               <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 12px 0', lineHeight: 1.2, color: 'var(--text-main)' }}>{quiz.title}</h3>
               <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>Master the core concepts of {quiz.title.toLowerCase()} with our database-verified evaluation system.</p>
               
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '8px' }}><Clock size={14}/> 45 Mins</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '8px' }}><Target size={14}/> Pro Grade</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '8px' }}><Award size={14}/> Certifiable</span>
               </div>

               <button 
                onClick={() => handleStartQuiz(quiz)} 
                className="btn-primary" 
                style={{ 
                  marginTop: 'auto', 
                  width: '100%', 
                  padding: '14px', 
                  fontSize: '1rem', 
                  fontWeight: 600, 
                  borderRadius: '12px',
                  boxShadow: '0 8px 15px -3px rgba(86, 59, 186, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
               >
                 Start Assessment <Zap size={18} />
               </button>
            </motion.div>
          ))}
        </div>
      )}
      
    </div>
  );
}
