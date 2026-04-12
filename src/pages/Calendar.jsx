import { ChevronLeft, ChevronRight, Video, FileText, CheckSquare, Settings, Book } from 'lucide-react';
import { useState } from 'react';

const mockEvents = [
  { id: 1, type: 'live', label: 'Advanced UI Class', time: '10:00 AM - 11:30 AM', color: '#3b82f6', bg: '#eff6ff' },
  { id: 2, type: 'assignment', label: 'React Project Due', time: '1:00 PM (Deadline)', color: '#f59e0b', bg: '#fffbeb' },
  { id: 3, type: 'study', label: 'AI Study Block', time: '3:00 PM - 5:00 PM', color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 4, type: 'quiz', label: 'UX Quiz Module 4', time: 'Tomorrow 11:59 PM', color: '#ef4444', bg: '#fef2f2' }
];

export default function Calendar() {
  const [view, setView] = useState('week');

  const getEventIcon = (type) => {
    switch(type) {
      case 'live': return <Video size={14} />;
      case 'assignment': return <FileText size={14} />;
      case 'study': return <Book size={14} />;
      case 'quiz': return <CheckSquare size={14} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg-secondary)' }}>
      
      {/* Time Intelligence Sidebar */}
      <div style={{ width: '320px', background: 'white', padding: '24px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '30px', overflowY: 'auto' }}>
        
        {/* Simple Mini Calendar Mock */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 600 }}>April 2026</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <ChevronLeft size={20} color="var(--text-muted)" cursor="pointer"/>
              <ChevronRight size={20} color="var(--text-muted)" cursor="pointer"/>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=><div key={d}>{d}</div>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontSize: '0.9rem' }}>
            {Array.from({length: 30}).map((_, i) => (
               <div key={i} style={{ 
                 padding: '6px 0', 
                 cursor: 'pointer', 
                 background: i === 10 ? 'var(--primary-color)' : 'transparent', 
                 color: i === 10 ? 'white' : 'var(--text-main)', 
                 borderRadius: '50%',
                 fontWeight: i === 10 ? 600 : 400
               }}>
                 {i+1}
               </div>
            ))}
          </div>
        </div>

        {/* Action Engine: Focus Urgent */}
        <div>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             Required Focus <span style={{ background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '0.65rem' }}>URGENT</span>
          </h4>
          <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#991b1b', fontWeight: 600 }}><FileText size={14}/> Assignment</span>
              <span style={{ fontSize: '0.75rem', background: '#991b1b', color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>2h 45m</span>
            </div>
            <h3 style={{ fontSize: '1rem', margin: '0 0 4px 0', color: '#7f1d1d' }}>React Project Hook</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#991b1b' }}>Drop your zip files before closure.</p>
          </div>
        </div>

        {/* AI Smart Scheduling Suggestion */}
        <div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
             <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', margin: 0 }}>Smart Engine</h4>
             <Settings size={14} color="var(--text-muted)" cursor="pointer" />
           </div>
           
           <div style={{ padding: '16px', background: 'var(--primary-light)', border: '1px dashed var(--primary-color)', borderRadius: '8px' }}>
             <h3 style={{ fontSize: '0.95rem', margin: '0 0 8px 0', color: 'var(--primary-color)' }}>AI Suggested Block</h3>
             <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
               You usually study well between 3 PM and 5 PM. Should I schedule a focus block to prepare for tomorrow's UX Quiz?
             </p>
             <div style={{ display: 'flex', gap: '8px' }}>
               <button className="btn-primary" style={{ flex: 1, padding: '8px' }}>Yes, Book it</button>
               <button className="btn-outline" style={{ padding: '8px' }}>Ignore</button>
             </div>
           </div>
        </div>

      </div>

      {/* Main Calendar View Area */}
      <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Toggle & Header Grid */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Time Intelligence Matrix</h2>
          
          <div style={{ display: 'flex', background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
            {['Month', 'Week', 'Day'].map(v => (
              <button 
                key={v}
                onClick={() => setView(v.toLowerCase())}
                style={{
                  padding: '8px 24px',
                  background: view === v.toLowerCase() ? 'var(--primary-light)' : 'transparent',
                  color: view === v.toLowerCase() ? 'var(--primary-color)' : 'var(--text-main)',
                  border: 'none',
                  borderRight: v !== 'Day' ? '1px solid var(--border-color)' : 'none',
                  fontSize: '0.9rem',
                  fontWeight: view === v.toLowerCase() ? 600 : 500,
                  cursor: 'pointer'
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly View Rendering (As requested "Most Important Timeline") */}
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
          {/* Day Headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(5, 1fr)', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ padding: '16px', borderRight: '1px solid var(--border-color)' }}></div>
            {['Mon 10', 'Tue 11', 'Wed 12', 'Thu 13', 'Fri 14'].map(day => (
              <div key={day} style={{ padding: '16px', textAlign: 'center', borderRight: '1px solid var(--border-color)', fontSize: '0.9rem', fontWeight: day==='Tue 11' ? 700 : 500, color: day==='Tue 11' ? 'var(--primary-color)' : 'var(--text-main)' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Time Grid Wrapper */}
          <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
            {/* Hour lines */}
            {[8,9,10,11,12,1,2,3,4,5].map(time => (
              <div key={time} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', height: '80px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ padding: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', borderRight: '1px solid var(--border-color)' }}>
                  {time} {time >= 8 && time <=11 ? 'AM' : 'PM'}
                </div>
                <div style={{ position: 'relative' }}>
                  {/* Event Rendering Logic (Mock coordinates mapping onto the grid) */}
                  {time === 10 && (
                    <div style={{ position: 'absolute', top: '10px', left: '2%', width: '18%', height: '120px', background: '#eff6ff', border: '1px solid #bfdbfe', borderLeft: '4px solid #3b82f6', borderRadius: '4px', padding: '8px', zIndex: 10, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', color: '#1d4ed8', fontSize: '0.7rem', fontWeight: 600, marginBottom: '4px' }}>
                         <Video size={12}/> Live Class
                      </div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#1e3a8a' }}>Advanced UI</h4>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#2563eb' }}>10:00 - 11:30 AM</p>
                    </div>
                  )}
                  {time === 1 && (
                    <div style={{ position: 'absolute', top: '0px', left: '22%', width: '18%', height: '40px', background: '#fffbeb', border: '1px solid #fde68a', borderLeft: '4px solid #f59e0b', borderRadius: '4px', padding: '8px', zIndex: 10, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', color: '#b45309', fontSize: '0.7rem', fontWeight: 600 }}>
                         <FileText size={12}/> Due: React Proj
                      </div>
                    </div>
                  )}
                  {time === 3 && (
                     <div style={{ position: 'absolute', top: '10px', left: '22%', width: '18%', height: '150px', background: '#f5f3ff', border: '1px dashed #c4b5fd', borderLeft: '4px solid #8b5cf6', borderRadius: '4px', padding: '8px', zIndex: 10, cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', color: '#6d28d9', fontSize: '0.7rem', fontWeight: 600, marginBottom: '4px' }}>
                         <Book size={12}/> Auto Focus Block
                        </div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#4c1d95' }}>AI Study Mapped</h4>
                        <button style={{ marginTop: 'auto', border: 'none', background: '#8b5cf6', color: 'white', borderRadius: '4px', padding: '4px', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer' }}>Start Session</button>
                     </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
