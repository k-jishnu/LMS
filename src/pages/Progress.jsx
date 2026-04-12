import { Target, TrendingUp, Clock, AlertTriangle, HelpCircle, Activity } from 'lucide-react';

export default function Progress() {
  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 4.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 5.0 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 6.0 },
    { day: 'Sun', hours: 2.0 }
  ];
  const maxHours = 6.0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-secondary)', overflowY: 'auto', padding: '30px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Learning Intelligence Overview</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '30px', marginBottom: '30px' }}>
        
        {/* Main Metrics Graph Block */}
        <div className="card" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} /> Weekly Velocity
          </h3>
          
          <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 4px 0' }}>Overall Completion</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--primary-color)' }}>78%</h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 4px 0' }}>Total Hours Learned</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>142h</h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 4px 0' }}>Courses</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>3 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 5</span></h2>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '16px', height: '200px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            {weeklyData.map(d => (
              <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-color)' }}>{d.hours}h</span>
                <div style={{ 
                  width: '100%', 
                  height: `${(d.hours / maxHours) * 150}px`, 
                  background: d.day === 'Sat' ? 'var(--primary-color)' : 'var(--primary-light)', 
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.4s ease'
                }}></div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Psychological Motivation Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Streak System */}
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '1px solid #fcd34d' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#92400e', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <TrendingUp size={20} /> 14-Day Streak 🔥
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#b45309', margin: '0 0 16px 0' }}>Longest streak: 21 Days</p>
            
            <div style={{ background: 'white', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                <AlertTriangle size={14} /> Streak Break Warning
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#b91c1c' }}>You haven't studied today! You will lose your 14-day streak in exactly 3h 15m.</p>
            </div>
          </div>

          {/* AI Behavioral Analytics */}
          <div className="card" style={{ padding: '24px', flex: 1 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Target size={16} /> Behavioral AI Insights
            </h3>
            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>You consume <strong>70%</strong> more content when you study between <strong>9:00 PM - 11:00 PM</strong> at night.</li>
              <li><span style={{ color: '#ef4444', fontWeight: 500 }}>Warning:</span> You historically drop-off around the 18th minute of long video lectures. Consider utilizing the 15-minute break rule.</li>
              <li>You learn best when attempting quizzes <em>before</em> watching the recap module.</li>
            </ul>
          </div>

        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* In-Depth Course Progress Tracking */}
        <div className="card" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px' }}>Course Breakdown</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Advanced React Patterns</span>
                <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>72%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '72%', height: '100%', background: 'var(--primary-color)' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>6 / 8 Modules</span>
                <span>Est. 4h 15m remaining</span>
              </div>
              
              {/* Smart CTA */}
              <div style={{ background: 'var(--primary-light)', padding: '12px 16px', borderRadius: '4px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 500 }}>You're closing in! Finish today?</span>
                <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Resume Now</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.8, paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Three.js Fundamentals</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>0%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '0%', height: '100%', background: 'var(--primary-color)' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>0 / 12 Modules</span>
                <span>Est. 12h 00m remaining</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Intelligence Mapping (Mock Radar Base) */}
        <div className="card" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Skill Intelligence Map</h3>
             <HelpCircle size={16} color="var(--text-muted)" />
           </div>
           
           <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {/* Basic Mock of a Radar Graph Representation */}
              <div style={{ width: '220px', height: '220px', border: '1px solid var(--border-color)', borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ width: '150px', height: '150px', border: '1px solid var(--border-color)', borderRadius: '50%', position: 'absolute' }}></div>
                 <div style={{ width: '80px', height: '80px', border: '1px solid var(--border-color)', borderRadius: '50%', position: 'absolute' }}></div>
                 
                 {/* Crosshairs */}
                 <div style={{ width: '100%', height: '1px', background: 'var(--border-color)', position: 'absolute' }}></div>
                 <div style={{ width: '1px', height: '100%', background: 'var(--border-color)', position: 'absolute' }}></div>

                 {/* Polygon Overlay (Mock Data) */}
                 <div style={{ 
                   position: 'absolute', 
                   width: '140px', height: '160px', 
                   background: 'var(--primary-color)', 
                   opacity: 0.2,
                   clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
                 }}></div>
                 <div style={{ 
                   position: 'absolute', 
                   width: '140px', height: '160px', 
                   border: '2px solid var(--primary-color)',
                   clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
                 }}></div>
                 
                 {/* Labels */}
                 <span style={{ position: 'absolute', top: '-20px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-color)' }}>React (Lvl 5)</span>
                 <span style={{ position: 'absolute', right: '-40px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>UX Design</span>
                 <span style={{ position: 'absolute', bottom: '-20px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>Backend</span>
                 <span style={{ position: 'absolute', left: '-50px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Algorithms</span>
              </div>
           </div>

           <div style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
             Your React engineering skills are reaching <strong>Advanced</strong> metrics across the platform. AI suggests balancing out your Backend fundamentals.
           </div>
        </div>

      </div>
    </div>
  );
}
