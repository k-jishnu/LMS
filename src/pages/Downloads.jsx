import { useState } from 'react';
import { Search, Folder, Video, FileText, Download, CheckCircle, Database, AlertCircle, HardDrive, MoreVertical, Bookmark } from 'lucide-react';

const mockFiles = [
  { id: 1, name: 'React Hooks Deep Dive - Module 4.mp4', course: 'Advanced React Patterns', type: 'video', size: '1.2 GB', date: 'Oct 12, 10:45 AM', status: 'downloaded', bookmarked: true },
  { id: 2, name: 'UI Components Reference Logic.pdf', course: 'UI/UX Masterclass', type: 'pdf', size: '14.5 MB', date: 'Oct 11, 2:30 PM', status: 'downloading', bookmarked: false, progress: 68 },
  { id: 3, name: 'Assignment 2 - Dataset.zip', course: 'Data Structures', type: 'zip', size: '450 MB', date: 'Oct 09, 9:00 AM', status: 'cloud', bookmarked: false },
  { id: 4, name: 'State Management Cheatsheet.pdf', course: 'Advanced React Patterns', type: 'pdf', size: '2.1 MB', date: 'Oct 08, 4:15 PM', status: 'downloaded', bookmarked: true, isUpdate: true }
];

export default function Downloads() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  
  const getFileIcon = (type) => {
    switch(type) {
      case 'video': return <Video size={24} color="#3b82f6" />;
      case 'pdf': return <FileText size={24} color="#ef4444" />;
      case 'zip': return <Folder size={24} color="#f59e0b" />;
      default: return <FileText size={24} />;
    }
  };

  const getStatusAction = (file) => {
    if (file.status === 'downloaded') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.8rem', fontWeight: 600 }}>
          <CheckCircle size={16} /> Available Offline
        </div>
      );
    }
    if (file.status === 'downloading') {
      return (
         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-color)' }}>
              <span>Downloading</span> <span>{file.progress}%</span>
           </div>
           <div style={{ width: '100%', height: '4px', background: 'var(--bg-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${file.progress}%`, height: '100%', background: 'var(--primary-color)' }}></div>
           </div>
         </div>
      );
    }
    return (
      <button style={{ border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-main)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Download size={14} /> Fetch File
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      
      {/* Left Sidebar - Organization Vault */}
      <div style={{ width: '260px', background: 'white', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 20px', overflowY: 'auto' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Database size={20} color="var(--primary-color)"/> Resource Vault
        </h2>

        <div>
          <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '12px' }}>Categories</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
             {[
               { id: 'all', label: 'All Resources' },
               { id: 'course', label: 'Course Materials' },
               { id: 'offline', label: 'Offline Videos' },
               { id: 'assignments', label: 'Assignment Files' },
               { id: 'saved', label: 'Bookmarked' }
             ].map(cat => (
                <div 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)}
                  style={{ 
                    padding: '10px 12px', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontWeight: activeCategory === cat.id ? 600 : 500,
                    color: activeCategory === cat.id ? 'var(--primary-color)' : 'var(--text-main)',
                    background: activeCategory === cat.id ? 'var(--primary-light)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {cat.id === 'saved' && <Bookmark size={14} />} {cat.label}
                </div>
             ))}
          </div>
        </div>

        {/* Local Storage Insight Panel */}
        <div style={{ marginTop: 'auto', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
           <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}><HardDrive size={16}/> Local Storage</h4>
           
           <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', overflow: 'hidden', marginBottom: '12px' }}>
              <div style={{ width: '60%', background: '#3b82f6' }} title="Videos"></div>
              <div style={{ width: '15%', background: '#f59e0b' }} title="Documents"></div>
              <div style={{ width: '5%', background: '#10b981' }} title="Other"></div>
           </div>
           
           <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <span><strong>8.2 GB</strong> used</span>
              <span>1.8 GB free</span>
           </div>

           <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '4px', color: '#b91c1c', fontSize: '0.75rem', borderLeft: '3px solid #ef4444' }}>
             <AlertCircle size={12} style={{ marginBottom: '-2px' }}/> Storage almost full. Suggest clearing old cached videos.
           </div>
        </div>
      </div>

      {/* Main Vault Workspace */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Header & Tooling */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Search knowledge vault..." style={{ padding: '10px 16px 10px 36px', borderRadius: '20px', border: '1px solid var(--border-color)', outline: 'none', width: '300px' }}/>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <select style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', outline: 'none' }}>
                 <option>All Types</option>
                 <option>Videos (.mp4)</option>
                 <option>Documents (.pdf)</option>
               </select>

               <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <button onClick={() => setViewMode('grid')} style={{ padding: '8px 12px', border: 'none', background: viewMode === 'grid' ? 'var(--bg-secondary)' : 'white', cursor: 'pointer' }}>G</button>
                  <button onClick={() => setViewMode('list')} style={{ padding: '8px 12px', border: 'none', borderLeft: '1px solid var(--border-color)', background: viewMode === 'list' ? 'var(--bg-secondary)' : 'white', cursor: 'pointer' }}>L</button>
               </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
             <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>All Files</h3>
             <button style={{ color: 'var(--primary-color)', border: 'none', background: 'none', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Download Course Bulk (.zip)</button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr', 
            gap: '20px' 
          }}>
            {mockFiles.map(file => (
               <div key={file.id} className="card" style={{ padding: '20px', display: 'flex', flexDirection: viewMode === 'grid' ? 'column' : 'row', alignItems: viewMode === 'grid' ? 'flex-start' : 'center', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                 
                 {/* File Icon Layout */}
                 <div style={{ width: '48px', height: '48px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getFileIcon(file.type)}
                 </div>

                 {/* File Metadata */}
                 <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                       <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.4 }}>{file.name}</h4>
                       {file.isUpdate && <span style={{ background: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>NEW VERSION</span>}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{file.course}</div>
                    
                    {/* View List inline sizing details mapping */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                       <span>{file.size}</span>
                       <span>• {file.type.toUpperCase()}</span>
                    </div>
                 </div>

                 {/* Download Logic / States */}
                 <div style={{ marginTop: viewMode === 'grid' ? 'auto' : 0, width: viewMode === 'grid' ? '100%' : 'auto', display: 'flex', justifyContent: viewMode === 'grid' ? 'space-between' : 'flex-end', alignItems: 'center', paddingTop: viewMode === 'grid' ? '16px' : 0, borderTop: viewMode === 'grid' ? '1px solid var(--border-color)' : 'none', gap: '20px' }}>
                    {getStatusAction(file)}
                    <button style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Actions">
                      <MoreVertical size={16}/>
                    </button>
                 </div>
                 
                 {/* Bookmark absolute pin */}
                 {file.bookmarked && (
                   <div style={{ position: 'absolute', top: 0, right: '20px', color: '#f59e0b' }}>
                      <Bookmark size={20} fill="#f59e0b" />
                   </div>
                 )}
               </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
