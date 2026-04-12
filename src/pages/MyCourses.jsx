import { Search, Filter, Clock, BarChart2, Star, PlayCircle, Info } from 'lucide-react';
import { useState } from 'react';

const courses = [
  {
    id: 1,
    title: 'Advanced React Patterns',
    instructor: 'Jishnu',
    progress: 68,
    status: 'In Progress',
    lastAccessed: '2 hours ago',
    difficulty: 'Advanced',
    durationLeft: '4h 15m left',
    rating: 4.8,
    image: 'linear-gradient(135deg, #1e3a8a, #3b82f6)'
  },
  {
    id: 2,
    title: 'UI/UX Masterclass: SaaS Design',
    instructor: 'Sarah Jenkins',
    progress: 100,
    status: 'Completed',
    lastAccessed: '2 days ago',
    difficulty: 'Intermediate',
    durationLeft: 'Certificate Earned',
    rating: 4.9,
    image: 'linear-gradient(135deg, #4c1d95, #8b5cf6)'
  },
  {
    id: 3,
    title: 'Three.js Fundamentals',
    instructor: 'David Kim',
    progress: 0,
    status: 'Not Started',
    lastAccessed: 'Never',
    difficulty: 'Beginner',
    durationLeft: '12h total',
    rating: 4.6,
    image: 'linear-gradient(135deg, #831843, #ec4899)'
  }
];

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState('all');
  const [previewCourse, setPreviewCourse] = useState(null);

  const getDifficultyColor = (diff) => {
    switch(diff) {
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
          {courses.map(course => (
            <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', ':hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } }}>
              
              {/* Image Area */}
              <div 
                style={{ height: '160px', background: course.image, position: 'relative' }}
                onClick={() => setPreviewCourse(course)}
              >
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {course.status}
                </div>
                {course.progress > 0 && course.progress < 100 && (
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <PlayCircle fill="var(--primary-color)" color="white" size={42} style={{ position: 'absolute' }} />
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: getDifficultyColor(course.difficulty), background: `${getDifficultyColor(course.difficulty)}15`, padding: '2px 6px', borderRadius: '4px' }}>
                    {course.difficulty}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <Star size={12} fill="#fbbf24" color="#fbbf24" /> {course.rating}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 4px 0', lineHeight: 1.3 }}>{course.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 16px 0' }}>by {course.instructor}</p>
                
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-main)' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} color="var(--text-muted)"/> {course.durationLeft}</span>
                     <span style={{ fontWeight: 600 }}>{course.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
                    <div style={{ width: `${course.progress}%`, height: '100%', background: course.progress === 100 ? '#10b981' : 'var(--primary-color)' }}></div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Last accessed:</span>
                    <span>{course.lastAccessed}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Preview Drawer (Right Side) */}
      {previewCourse && (
        <div style={{ 
          width: '400px', 
          background: 'white', 
          borderLeft: '1px solid var(--border-color)', 
          boxShadow: '-4px 0 15px rgba(0,0,0,0.05)', 
          zIndex: 20, 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Course Preview</h3>
            <button onClick={() => setPreviewCourse(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ width: '100%', height: '180px', background: previewCourse.image, borderRadius: '8px', marginBottom: '20px' }}></div>
            
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 8px 0' }}>{previewCourse.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>Instructor: {previewCourse.instructor}</p>
            
            <button className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem', marginBottom: '24px' }}>
              {previewCourse.progress === 0 ? 'Start Course' : 'Resume Learning'}
            </button>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>Syllabus Highlights</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {[1, 2, 3].map(m => (
                 <div key={m} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ marginTop: '2px' }}><PlayCircle size={16} color={previewCourse.progress > (m*30) ? '#10b981' : 'var(--text-muted)'} /></div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Module {m}: Core Concepts</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>4 videos • 45 mins</div>
                    </div>
                 </div>
               ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
