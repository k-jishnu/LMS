import { useState } from 'react';
import { MessageSquare, ThumbsUp, CheckCircle, Search, Flame, Award, Hash, Edit3 } from 'lucide-react';

const threads = [
  { id: 1, author: 'Alex Chen', level: 'Lvl 12', avatar: 'AC', title: 'How does hydration work in Next.js?', desc: 'I understand SSR, but I am confused about how React attaches event listeners to the HTML payload returned by the server. Can someone explain?', tags: ['#React', '#Advanced'], upvotes: 42, replies: 5, time: '2 hours ago', hasBestAnswer: true, instructorReplied: true },
  { id: 2, author: 'Sarah Jenkins', badge: 'Top Contributor', avatar: 'SJ', title: 'Feedback on my UI design assignment?', desc: 'Hey guys, I just dropped my Figma link for the week 3 assignment. Would love some aggressive critiquing on my whitespace usage.', tags: ['#UIUX', '#Feedback'], upvotes: 18, replies: 12, time: '5 hours ago', hasBestAnswer: false, instructorReplied: false },
  { id: 3, author: 'David Kim', avatar: 'DK', title: 'Is it normal to feel completely lost in Algo modules?', desc: 'Just started week 4. Big O notation is breaking my brain.', tags: ['#Algorithms', '#General'], upvotes: 156, replies: 45, time: '1 day ago', hasBestAnswer: false, instructorReplied: true }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('latest');

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      
      {/* Left Sidebar Layout - Navigation */}
      <div style={{ width: '250px', background: 'white', borderRight: '1px solid var(--border-color)', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '30px', overflowY: 'auto' }}>
        
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}>
          <Edit3 size={18} /> New Discussion
        </button>

        <div>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '12px' }}>Spaces</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <div style={{ padding: '8px 12px', background: 'var(--primary-light)', color: 'var(--primary-color)', fontWeight: 600, borderRadius: '6px', cursor: 'pointer' }}>Global Feed</div>
             <div style={{ padding: '8px 12px', color: 'var(--text-main)', cursor: 'pointer', ':hover': {background: 'var(--bg-secondary)'} }}>My Courses</div>
             <div style={{ padding: '8px 12px', color: 'var(--text-main)', cursor: 'pointer' }}>Q&A Unanswered</div>
          </div>
        </div>

        <div>
           <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '12px' }}>Trending Tags</h4>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['#React', '#PlacementPrep', '#Java', '#UIUX', '#General'].map(t => (
                <span key={t} style={{ fontSize: '0.8rem', background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
                   {t}
                </span>
              ))}
           </div>
        </div>
      </div>

      {/* Main Thread Feed */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Community Discussions</h2>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Search threads..." style={{ padding: '10px 16px 10px 36px', borderRadius: '20px', border: '1px solid var(--border-color)', outline: 'none', width: '250px' }}/>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
             {['Latest', 'Top / Trending', 'Unanswered'].map(tab => (
               <button 
                 key={tab} 
                 onClick={() => setActiveTab(tab.toLowerCase())}
                 style={{ 
                   background: 'none', 
                   border: 'none', 
                   padding: '4px 8px',
                   fontSize: '0.95rem',
                   fontWeight: activeTab === tab.toLowerCase() ? 600 : 500,
                   color: activeTab === tab.toLowerCase() ? 'var(--primary-color)' : 'var(--text-muted)',
                   cursor: 'pointer'
                 }}
               >
                 {tab}
               </button>
             ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Create Post Widget */}
            <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #f87171, #fca5a5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>K</div>
              <div style={{ flex: 1 }}>
                <input type="text" placeholder="Start a new discussion or ask a doubt..." style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '12px 16px', borderRadius: '8px', outline: 'none', cursor: 'pointer' }} />
              </div>
            </div>

            {/* Render Thread Feed */}
            {threads.map(thread => (
              <div key={thread.id} className="card" style={{ display: 'flex', overflow: 'hidden' }}>
                 
                 {/* Left Voting Column */}
                 <div style={{ width: '60px', background: '#f8fafc', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '8px' }}>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>▲</button>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>{thread.upvotes}</span>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>▼</button>
                 </div>

                 {/* Thread Content */}
                 <div style={{ flex: 1, padding: '20px' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>{thread.avatar}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{thread.author}</span>
                          {thread.badge && <span style={{ fontSize: '0.7rem', background: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '12px', fontWeight: 600, border: '1px solid #fde68a' }}>{thread.badge}</span>}
                          {thread.level && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{thread.level}</span>}
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {thread.time}</span>
                        </div>
                      </div>
                    </div>

                    <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 600 }}>{thread.title}</h3>
                    <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{thread.desc}</p>
                    
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                      {thread.tags.map(t => <span key={t} style={{ fontSize: '0.75rem', color: 'var(--primary-color)', background: 'var(--primary-light)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>{t}</span>)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                         <MessageSquare size={16}/> {thread.replies} Replies
                       </div>
                       {thread.hasBestAnswer && (
                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
                           <CheckCircle size={16}/> Best Answer Selected
                         </div>
                       )}
                       {thread.instructorReplied && (
                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#3b82f6', fontWeight: 600 }}>
                           Instructor Replied
                         </div>
                       )}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Leaderboard / Gamification */}
      <div style={{ width: '280px', background: 'white', borderLeft: '1px solid var(--border-color)', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
         <div className="card" style={{ padding: '20px', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: 'white' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={18} color="#f59e0b" /> Your Stats</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span style={{ opacity: 0.8 }}>Impact Score:</span>
              <span style={{ fontWeight: 600 }}>124</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ opacity: 0.8 }}>Answers Given:</span>
              <span style={{ fontWeight: 600 }}>12</span>
            </div>
         </div>

         <div>
           <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Flame size={18} color="#ef4444" /> Top Contributors</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'Sarah Jenkins', xp: '12.4k' },
                { name: 'Michael O.', xp: '8.2k' },
                { name: 'Amanda P.', xp: '7.1k' }
              ].map((user, i) => (
                <div key={user.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: i === 0 ? '#f59e0b' : 'var(--text-muted)' }}>#{i+1}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user.name}</div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.xp} XP</div>
                </div>
              ))}
           </div>
         </div>
         
         {/* Growth Hook */}
         <div style={{ marginTop: 'auto', background: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px dashed #fca5a5' }}>
           <h4 style={{ margin: '0 0 4px 0', color: '#991b1b', fontSize: '0.9rem' }}>Boost your XP!</h4>
           <p style={{ margin: 0, fontSize: '0.8rem', color: '#b91c1c' }}>There are 4 unanswered questions in React. Be the first to help out!</p>
         </div>
      </div>
    </div>
  );
}
