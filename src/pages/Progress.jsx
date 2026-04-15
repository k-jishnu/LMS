import { Target, TrendingUp, Clock, AlertTriangle, HelpCircle, Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Progress() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Simulated real-time metrics that would ideally come from a 'study_sessions' table
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

  useEffect(() => {
    fetchRealTimeData();
  }, []);

  async function fetchRealTimeData() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*');
      
      if (error) {
        console.error('Error fetching progress data:', error);
      } else if (data) {
        setCourses(data);
      }
    } catch (err) {
      console.error('Unexpected error in progress fetch:', err);
    } finally {
      setLoading(false);
    }
  }
  
  // Calculating total hours learned based on courses duration and progress (mock logic)
  const totalHoursLearned = courses.reduce((acc, c) => acc + ((c.progress || 0) / 100 * 40), 122).toFixed(1);
  
  // Multi-day streak logic (simulated current streak)
  const streakDays = 14; 
  const longestStreak = 21;
  const streakInProgress = courses.some(c => c.progress > 0 && c.lastAccessed === 'Today');

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
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 4px 0' }}>Weekly Target</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--primary-color)' }}>85%</h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 4px 0' }}>Total Hours Learned</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{totalHoursLearned}h</h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 4px 0' }}>Courses Enrolled</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{courses.length} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 10</span></h2>
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

        {/* Streak System */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '1px solid #fcd34d', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#92400e', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={22} /> {streakDays}-Day Streak
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#b45309', margin: '0 0 24px 0', fontWeight: 500 }}>
              Longest streak: {longestStreak} Days
            </p>
            
            {!streakInProgress && (
              <div style={{ background: 'white', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #ef4444', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
                  <AlertTriangle size={16} /> Streak Break Warning
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#b91c1c', lineHeight: 1.4 }}>
                  You haven't visited or studied today! Complete a module now to maintain your current streak.
                </p>
                <button 
                  onClick={() => navigate('/courses')}
                  style={{ marginTop: '12px', background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Study Now
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        
        {/* Course Breakdown */}
        <div className="card" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px' }}>Course Breakdown</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Synching real-time course data...</p>
            ) : courses.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No courses enrolled yet.</p>
            ) : (
              courses.map(course => (
                <div key={course.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px', border: course.title?.toLowerCase().includes('photosynthesis') ? '1px solid var(--primary-color)' : '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>{course.title}</span>
                    <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>{course.progress || 0}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${course.progress || 0}%`, height: '100%', background: 'var(--primary-color)' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>{course.progress === 100 ? 'Completed' : 'In Progress'}</span>
                    <span>{course.durationLeft || 'Estimated 4h remaining'}</span>
                  </div>
                  
                  <div style={{ background: course.title?.toLowerCase().includes('photosynthesis') ? 'var(--primary-light)' : 'transparent', padding: (course.title?.toLowerCase().includes('photosynthesis')) ? '16px' : '0', borderRadius: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {course.title?.toLowerCase().includes('photosynthesis') && (
                      <span style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 500 }}>Live track: Photosynthesis active</span>
                    )}
                    <button 
                      className={course.title?.toLowerCase().includes('photosynthesis') ? "btn-primary" : "btn-outline"}
                      onClick={() => navigate('/player', { state: { courseId: course.id } })}
                      style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', marginLeft: course.title?.toLowerCase().includes('photosynthesis') ? '0' : 'auto' }}
                    >
                      {course.progress === 100 ? 'Review Course' : 'Resume Now'} <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
