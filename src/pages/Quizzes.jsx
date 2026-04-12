import { useState } from 'react';
import { HelpCircle, Clock, Award, ChevronLeft, Target, AlertTriangle } from 'lucide-react';

const mockQuizzes = [
  { id: 1, title: 'UX Fundamentals Check', type: 'Practice Quiz', duration: '15 mins', questions: 10, attempts: '∞', color: '#10b981' },
  { id: 2, title: 'React Hooks Midterm', type: 'Graded Exam', duration: '45 mins', questions: 20, attempts: '1 left', color: '#ef4444' },
  { id: 3, title: 'Design Systems Architecture', type: 'Graded Quiz', duration: '30 mins', questions: 15, attempts: '2 left', color: '#f59e0b' }
];

export default function Quizzes() {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  if (activeQuiz) {
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
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 700, fontSize: '1.2rem', background: '#fef2f2', padding: '8px 16px', borderRadius: '4px', border: '1px solid #fecaca' }}>
               <Clock size={20} /> 42:15
             </div>
             <button className="btn-primary" style={{ background: 'var(--primary-color)', padding: '10px 24px', fontSize: '1rem', fontWeight: 600 }}>Submit Exam</button>
          </div>
        </div>

        {/* High Focus Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
           
           {/* Question Rendering Space */}
           <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 500, margin: 0 }}>Question {currentQuestion} of {activeQuiz.questions}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={14}/> Auto-saved</span>
                </div>

                <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.6, margin: '0 0 30px 0', color: 'var(--text-main)' }}>
                    When utilizing `useEffect` in React, what happens if the dependency array is completely omitted?
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {['It runs exactly once after the initial render.', 'It runs after every single render of the component.', 'It throws a compilation error.', 'It causes an infinite loop by default.'].map((opt, i) => (
                      <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', ':hover': { background: 'var(--bg-secondary)' } }}>
                        <input type="radio" name="mcq" style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button className="btn-outline" style={{ padding: '12px 24px' }}>Previous</button>
                  <button className="btn-primary" style={{ padding: '12px 24px' }} onClick={() => setCurrentQuestion(q => Math.min(q+1, activeQuiz.questions))}>Save & Next</button>
                </div>
              </div>
           </div>

           {/* Navigation Tracker Sidebar */}
           <div style={{ width: '300px', background: 'white', borderLeft: '1px solid var(--border-color)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
             <h4 style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Progress Tracker</h4>
             
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
               {Array.from({length: activeQuiz.questions}).map((_, i) => (
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
                     background: currentQuestion === i+1 ? 'var(--primary-color)' : i < 4 ? '#10b981' : 'var(--bg-secondary)',
                     color: currentQuestion === i+1 || i < 4 ? 'white' : 'var(--text-main)',
                     border: `1px solid ${currentQuestion === i+1 ? 'var(--primary-color)' : i < 4 ? '#10b981' : 'var(--border-color)'}`
                   }}
                 >
                   {i+1}
                 </div>
               ))}
             </div>

             <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px' }}></div> Answered</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '2px' }}></div> Not Visited</div>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {mockQuizzes.map(quiz => (
          <div key={quiz.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
               <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', color: 'var(--text-main)' }}>
                 <HelpCircle size={24} />
               </div>
               <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', background: `${quiz.color}15`, color: quiz.color, textTransform: 'uppercase' }}>{quiz.type}</span>
             </div>

             <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 8px 0', lineHeight: 1.3 }}>{quiz.title}</h3>
             
             <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14}/> {quiz.duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Target size={14}/> {quiz.questions} Q's</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={14}/> {quiz.attempts}</span>
             </div>

             <button onClick={() => setActiveQuiz(quiz)} className="btn-primary" style={{ marginTop: 'auto', width: '100%', padding: '10px' }}>Start {quiz.type.split(' ')[1]}</button>
          </div>
        ))}
      </div>
      
    </div>
  );
}
