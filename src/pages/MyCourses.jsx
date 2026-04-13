import { Search, Filter, Clock, BarChart2, Star, PlayCircle, Info, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*');

      if (error) {
        console.error('Error fetching courses from Supabase:', error);
      } else if (data) {
        setCourses(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  }

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '30px', overflowY: 'auto' }}>

        {/* Filters Toolbar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                className="input-field"
                placeholder="Search by course name or instructor..."
                style={{ paddingLeft: '40px' }}
              />
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button className="btn-outline">
              <Filter size={16} /> All Filters
            </button>
            <select className="input-field" style={{ width: '200px', cursor: 'pointer' }}>
              <option>Sort by: Recently Accessed</option>
              <option>Sort by: Progress</option>
              <option>Sort by: Popularity</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {['All Courses', 'In Progress', 'Not Started', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: `1px solid ${activeTab === tab.toLowerCase() ? 'var(--primary-color)' : 'var(--border-color)'}`,
                  background: activeTab === tab.toLowerCase() ? 'var(--primary-light)' : 'white',
                  color: activeTab === tab.toLowerCase() ? 'var(--primary-color)' : 'var(--text-main)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1' }}>Loading courses please wait...</div>
          ) : courses.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>
              No courses found. Create some in your Supabase "courses" table!
            </div>
          ) : (
            courses.map(course => (
              <div 
                key={course.id} 
                className="card" 
                onClick={() => navigate('/player', { state: { courseId: course.id } })}
                style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', ':hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } }}
              >

                {/* Image Area */}
                <div
                  style={{ height: '160px', background: course.thumbnail ? `url(${course.thumbnail}) center/cover` : (course.image || 'linear-gradient(135deg, #e2e8f0, #cbd5e1)'), position: 'relative' }}
                >
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {course.status || 'New Course'}
                  </div>
                  {(course.progress || 0) > 0 && (course.progress || 0) < 100 && (
                    <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                      <PlayCircle fill="var(--primary-color)" color="white" size={42} style={{ position: 'absolute' }} />
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: getDifficultyColor(course.difficulty || 'Beginner'), background: `${getDifficultyColor(course.difficulty || 'Beginner')}15`, padding: '2px 6px', borderRadius: '4px' }}>
                      {course.difficulty || 'All Levels'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      <Star size={12} fill="#fbbf24" color="#fbbf24" /> {course.rating || '4.5'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 4px 0', lineHeight: 1.3 }}>{course.title || 'Untitled Course'}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 16px 0' }}>by {course.instructor || 'LMS Instructor'}</p>

                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-main)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} color="var(--text-muted)" /> {course.durationLeft || `${course.price ? '₹' + course.price : 'Free'}`}</span>
                      <span style={{ fontWeight: 600 }}>{course.progress || 0}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
                      <div style={{ width: `${course.progress || 0}%`, height: '100%', background: course.progress === 100 ? '#10b981' : 'var(--primary-color)' }}></div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Last accessed:</span>
                      <span>{course.lastAccessed || 'Not started'}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
