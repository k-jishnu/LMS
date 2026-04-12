import { useState } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, UploadCloud, ChevronLeft, Calendar } from 'lucide-react';

const mockAssignments = [
  { id: 1, title: 'Build a React Dashboard', course: 'Advanced React Patterns', instructor: 'Jishnu', status: 'In Progress', deadline: 'Today, 11:59 PM', urgency: 'critical', xp: 50 },
  { id: 2, title: 'UX Research Case Study', course: 'UI/UX Masterclass', instructor: 'Sarah Jenkins', status: 'Not Started', deadline: 'Tomorrow, 5:00 PM', urgency: 'near', xp: 75 },
  { id: 3, title: 'Three.js Initial Setup', course: 'Three.js Fundamentals', instructor: 'David Kim', status: 'Submitted', deadline: 'Last Friday', urgency: 'safe', xp: 20 },
  { id: 4, title: 'Javascript Closures Lab', course: 'JavaScript Deep Dive', instructor: 'Jishnu', status: 'Graded', deadline: 'Oct 15', urgency: 'safe', xp: 100 }
];

export default function Assignments() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const getUrgencyColor = (u) => {
    switch(u) {
      case 'critical': return '#ef4444';
      case 'near': return '#f59e0b';
      case 'safe': return '#10b981';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusBadge = (status) => {
    let bg = '#e5e7eb'; let color = 'var(--text-main)';
    if (status === 'Submitted') { bg = '#dcfce7'; color = '#15803d'; }
    else if (status === 'Graded') { bg = '#f3e8ff'; color = '#7e22ce'; }
    else if (status === 'In Progress') { bg = '#dbeafe'; color = '#1d4ed8'; }
    else if (status === 'Late') { bg = '#fee2e2'; color = '#b91c1c'; }

    return <span style={{ background: bg, color: color, padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{status}</span>;
  };

  if (selectedAssignment) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
        {/* Detail View Header */}
        <div style={{ background: 'white', padding: '20px 30px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setSelectedAssignment(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronLeft size={24} color="var(--text-muted)"/></button>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{selectedAssignment.title}</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedAssignment.course} • Inst: {selectedAssignment.instructor}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Deadline Countdown</div>
              <div style={{ color: getUrgencyColor(selectedAssignment.urgency), fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16}/> 14h 22m 10s left
              </div>
            </div>
          </div>
        </div>

        {/* Split Deep Work Zone */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Left Panel: Content & Rubric */}
          <div style={{ flex: 2, padding: '30px', overflowY: 'auto', borderRight: '1px solid var(--border-color)', background: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>Problem Statement</h3>
            <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
              You are tasked with building a fully responsive React Dashboard navigating mock data arrays. You must use hooks (`useState`, `useEffect`) and context where appropriate. Focus strictly on component separation.
            </p>
            <ul style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, paddingLeft: '20px', marginBottom: '30px' }}>
              <li>Ensure 0 console errors during runtime.</li>
              <li>Include at least one complex data chart (or styled placeholder).</li>
              <li>Must perfectly match the provided Figma constraints.</li>
            </ul>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px', marginTop: '40px' }}>Evaluation Rubric</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               <div style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                 <div><span style={{ fontWeight: 600 }}>1. Logic & Architecture</span><p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Proper use of React Hooks, component splitting, state cleanliness.</p></div>
                 <div style={{ fontWeight: 700, color: 'var(--primary-color)' }}>40%</div>
               </div>
               <div style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                 <div><span style={{ fontWeight: 600 }}>2. Presentation & CSS</span><p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pixel-perfect implementation of layout specifications.</p></div>
                 <div style={{ fontWeight: 700, color: 'var(--primary-color)' }}>30%</div>
               </div>
               <div style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                 <div><span style={{ fontWeight: 600 }}>3. Interaction & Edge-cases</span><p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Handling empty states, hover delays, and loading mimics.</p></div>
                 <div style={{ fontWeight: 700, color: 'var(--primary-color)' }}>30%</div>
               </div>
            </div>
          </div>

          {/* Right Panel: Submission Engine */}
          <div style={{ flex: 1, padding: '30px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Submission Center</h3>
            
            <div style={{ 
              border: '2px dashed var(--primary-color)', 
              background: 'var(--primary-light)', 
              borderRadius: '8px', 
              padding: '40px 20px', 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              cursor: 'pointer'
            }}>
               <UploadCloud size={40} color="var(--primary-color)" style={{ marginBottom: '16px' }} />
               <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: 'var(--primary-color)' }}>Drag & Drop your files here</h4>
               <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supports .ZIP, .PDF, .JS (Max 50MB)</p>
               <button className="btn-primary" style={{ marginTop: '20px', padding: '8px 24px' }}>Browse Files</button>
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 16px 0' }}>Version History</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>dashboard_v2.zip</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Today, 9:24 AM</div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', background: 'var(--primary-light)', padding: '2px 8px', borderRadius: '10px' }}>Draft Saved</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>dashboard_v1.zip</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Yesterday, 8:00 PM</div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Overwritten</span>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1rem', marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={18} /> Finalize Submission
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Master Content Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--border-color)', width: '100%' }}>
          {['Active', 'Submitted', 'Graded'].map(tab => (
            <div 
              key={tab} 
              onClick={() => setActiveTab(tab.toLowerCase())}
              style={{ 
                padding: '12px 0', 
                marginRight: '30px', 
                fontWeight: activeTab === tab.toLowerCase() ? 600 : 500, 
                color: activeTab === tab.toLowerCase() ? 'var(--primary-color)' : 'var(--text-muted)', 
                borderBottom: activeTab === tab.toLowerCase() ? '2px solid var(--primary-color)' : '2px solid transparent', 
                cursor: 'pointer' 
              }}>
              {tab} Assignments
            </div>
          ))}
        </div>
      </div>

      {/* Grid List View */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
        {mockAssignments.map(assignment => (
          <div 
            key={assignment.id} 
            className="card" 
            onClick={() => setSelectedAssignment(assignment)}
            style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer', transition: 'border 0.2s', borderLeft: `4px solid ${getUrgencyColor(assignment.urgency)}`, ':hover': { border: '1px solid var(--primary-color)' } }}
          >
            <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', color: 'var(--text-main)' }}>
              <FileText size={24} />
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 4px 0', color: 'var(--text-main)' }}>{assignment.title}</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{assignment.course} • Instructor: {assignment.instructor}</p>
            </div>

            <div style={{ width: '150px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: getUrgencyColor(assignment.urgency), fontWeight: 600, marginBottom: '6px' }}>
                <Clock size={14} /> {assignment.deadline}
              </div>
              {getStatusBadge(assignment.status)}
            </div>

            <div style={{ width: '80px', textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#d97706', background: '#fffbeb', padding: '4px 8px', borderRadius: '4px' }}>+{assignment.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
