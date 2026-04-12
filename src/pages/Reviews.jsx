import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, AlertCircle, ShieldCheck, TrendingUp, Bug, Lightbulb } from 'lucide-react';

const reviewsData = [
  { id: 1, user: 'Maria G.', avatar: 'MG', rating: 5, date: 'October 10, 2026', verified: true, title: 'Incredible depth and clarity', content: 'This course completely changed my approach to component architecture. The instructor explains state machines flawlessly.', helpful: 124, instructorReplied: true },
  { id: 2, user: 'James T.', avatar: 'JT', rating: 4, date: 'October 8, 2026', verified: true, title: 'Great but fast-paced', content: 'Pros: Amazing real-world projects. Cons: The week 3 module moves too quickly if you are new to array methods.', helpful: 45, instructorReplied: false },
  { id: 3, user: 'Anonymous Learner', avatar: 'AL', rating: 5, date: 'October 1, 2026', verified: true, title: 'Worth every penny', content: 'Highly recommend taking the capstone seriously. The provided rubric acts like a real PR review.', helpful: 89, instructorReplied: false }
];

export default function Reviews() {
  const [tab, setTab] = useState('public');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-secondary)', overflowY: 'auto' }}>
      
      {/* Dynamic Header */}
      <div style={{ background: 'var(--primary-color)', color: 'white', padding: '40px 30px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: '0 0 10px 0', fontWeight: 700 }}>Reviews & Quality Control</h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '1.1rem' }}>Transparent feedback directly from verified learners.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '20px 30px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px' }}>
             <div style={{ textAlign: 'center' }}>
               <div style={{ fontSize: '2.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>4.8 <Star fill="#fcd34d" color="#fcd34d" size={28}/></div>
               <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>from 12,401 students</div>
             </div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
               {[5, 4, 3, 2, 1].map(star => (
                 <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span style={{ width: '12px' }}>{star}</span><Star size={10} fill="#fcd34d" color="#fcd34d"/>
                   <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                     <div style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '2%', height: '100%', background: '#fcd34d' }}></div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '30px' }}>
        
        {/* Toggle Public vs Private Feedback */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <button 
             onClick={() => setTab('public')}
             style={{ background: 'none', border: 'none', fontSize: '1rem', fontWeight: tab === 'public' ? 600 : 500, color: tab === 'public' ? 'var(--primary-color)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
             <MessageSquare size={18}/> Public Course Reviews
          </button>
          <button 
             onClick={() => setTab('private')}
             style={{ background: 'none', border: 'none', fontSize: '1rem', fontWeight: tab === 'private' ? 600 : 500, color: tab === 'private' ? '#ef4444' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
             <AlertCircle size={18}/> Internal Feedback & Issues
          </button>
        </div>

        {tab === 'public' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
            
            {/* Review List Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <select style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'white', color: 'var(--text-main)', outline: 'none' }}>
                   <option>Most Helpful</option>
                   <option>Latest</option>
                   <option>Highest Rated</option>
                 </select>
                 <button className="btn-primary">Write a Review</button>
               </div>

               {reviewsData.map(review => (
                 <div key={review.id} className="card" style={{ padding: '24px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <div style={{ width: '40px', height: '40px', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 700 }}>{review.avatar}</div>
                       <div>
                         <div style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                           {review.user} {review.verified && <ShieldCheck size={14} color="#10b981" title="Verified Learner"/>}
                         </div>
                         <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{review.date}</div>
                       </div>
                     </div>
                     <div style={{ display: 'flex', gap: '2px' }}>
                       {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= review.rating ? '#f59e0b' : 'none'} color={s <= review.rating ? '#f59e0b' : 'var(--border-color)'} />)}
                     </div>
                   </div>

                   <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 600 }}>"{review.title}"</h3>
                   <p style={{ margin: '0 0 20px 0', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>{review.content}</p>

                   {/* Instructor Response Mock */}
                   {review.instructorReplied && (
                     <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)', marginBottom: '20px' }}>
                       <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '4px' }}>Instructor Response</div>
                       <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)' }}>Thank you Maria! I am thrilled the state machine logic finally clicked for you. Keep up the excellent work.</p>
                     </div>
                   )}

                   <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                     <button style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}><ThumbsUp size={14}/> Helpful ({review.helpful})</button>
                     <button style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}><MessageSquare size={14}/> Reply</button>
                   </div>
                 </div>
               ))}
            </div>

            {/* AI Insights & Alerts */}
            <div>
              <div className="card" style={{ padding: '20px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
                 <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#065f46', display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={18}/> Sentiment Analytics</h4>
                 <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#064e3b' }}>Course sentiment is overwhelmingly <strong>positive</strong> over the last 30 days.</p>
                 <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>↑ +0.2 Rating Increase this week</div>
              </div>
            </div>

          </div>
        ) : (
          
          /* Private Internal Feedback Flow */
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
             <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 8px 0' }}>Submit Internal Feedback</h2>
             <p style={{ margin: '0 0 24px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>This is securely routed directly to the Instructors or Platform Admins. It will not be publicly visible.</p>

             <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
               <label style={{ flex: 1, padding: '16px', border: '1px solid var(--primary-color)', background: 'var(--primary-light)', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>
                 <input type="radio" name="ftype" defaultChecked style={{ accentColor: 'var(--primary-color)' }} />
                 <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-color)' }}><Bug size={16} style={{ marginBottom: '-3px' }}/> Report Bug</span>
               </label>
               <label style={{ flex: 1, padding: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>
                 <input type="radio" name="ftype" style={{ accentColor: 'var(--primary-color)' }} />
                 <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}><Lightbulb size={16} style={{ marginBottom: '-3px' }}/> Suggest Feature</span>
               </label>
             </div>

             <div style={{ marginBottom: '20px' }}>
               <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Description</label>
               <textarea rows={6} placeholder="Provide reproducible steps or detailed suggestions..." style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', outline: 'none', resize: 'vertical' }}></textarea>
             </div>

             <button className="btn-primary" style={{ width: '100%', padding: '12px' }}>Submit Secure Feedback</button>
          </div>
        )}
      </div>
    </div>
  );
}
