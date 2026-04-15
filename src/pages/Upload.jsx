import { useState, useCallback } from 'react';
import { Upload as UploadIcon, File, X, CheckCircle, AlertCircle, FileText, Image as ImageIcon, Film, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    handleFiles(newFiles);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    handleFiles(newFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type,
      progress: 0,
      status: 'pending',
      rawFile: file
    }));
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const startUpload = async () => {
    if (files.length === 0) return;
    setUploadStatus('uploading');
    
    const BUCKET_NAME = 'course-files'; 
    let combinedError = false;

    for (const fileObj of files) {
      if (fileObj.status === 'complete') continue;

      try {
        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'uploading' } : f));

        const fileName = Date.now() + "_" + fileObj.name;
        const { data: storageData, error: storageError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(fileName, fileObj.rawFile);

        if (storageError) throw storageError;

        const { data: { publicUrl } } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(fileName);

        const { error: dbError } = await supabase
          .from('resources')
          .insert([
            {
              name: fileObj.name,
              file_path: storageData.path,
              public_url: publicUrl,
              file_type: fileObj.type,
              size: fileObj.size,
              created_at: new Date()
            }
          ]);

        if (dbError) throw dbError;

        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, progress: 100, status: 'complete' } : f));

      } catch (error) {
        console.error('Upload failed:', error);
        combinedError = true;
        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'error' } : f));
      }
    }

    if (combinedError) {
      setUploadStatus('error');
    } else {
      setUploadStatus('success');
    }
    setTimeout(() => setUploadStatus('idle'), 3000);
  };

  const getFileIcon = (type) => {
    if (type.includes('image')) return <ImageIcon size={24} color="#3b82f6" />;
    if (type.includes('video')) return <Film size={24} color="#8b5cf6" />;
    if (type.includes('audio')) return <Music size={24} color="#ec4899" />;
    if (type.includes('pdf') || type.includes('word') || type.includes('text')) return <FileText size={24} color="#10b981" />;
    return <File size={24} color="#6b7280" />;
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Resource Upload</h2>
        <p style={{ color: 'var(--text-muted)' }}>Upload and manage your educational materials in one place.</p>
      </div>

      <div style={{ padding: '0', overflow: 'hidden', border: 'none', background: 'transparent' }}>
        
        {/* Dropzone Area */}
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          style={{ 
            border: '2px dashed var(--border-color)', 
            borderRadius: '24px', 
            padding: '80px 40px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            background: isDragging ? 'var(--primary-light)' : 'white',
            borderColor: isDragging ? 'var(--primary-color)' : 'var(--border-color)'
          }}
        >
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
          />
          
          <div 
            style={{ marginBottom: '24px', display: 'inline-flex', padding: '24px', background: 'var(--primary-light)', borderRadius: '50%', color: 'var(--primary-color)' }}
          >
            <UploadIcon size={48} />
          </div>
          
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '12px' }}>
            {isDragging ? 'Release to Upload' : 'Drag & Drop your files here'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            or <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Browse Files</span> from your computer
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '20px' }}>
            Support for PDF, DOCX, MP4, JPEG, and more (Max 1000MB per file)
          </p>
        </div>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{ marginTop: '30px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Selected Files ({files.length})</h4>
                {uploadStatus === 'idle' && (
                  <button 
                    onClick={startUpload}
                    className="btn-primary" 
                    style={{ padding: '8px 20px', borderRadius: '10px' }}
                  >
                    Upload All
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                {files.map((file) => (
                  <motion.div 
                    key={file.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ 
                      background: 'white', 
                      padding: '16px 20px', 
                      borderRadius: '16px', 
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Progress Background */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      height: '3px', 
                      width: `${file.progress}%`, 
                      background: 'var(--primary-color)',
                      transition: 'width 0.3s ease'
                    }} />

                    <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '12px' }}>
                      {getFileIcon(file.type)}
                    </div>
                    
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {file.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{file.size}</div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: '#f3f4f6', borderRadius: '3px' }}>
                          <div style={{ width: `${file.progress}%`, height: '100%', background: 'var(--primary-color)', borderRadius: '3px', transition: 'width 0.3s ease' }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-color)', minWidth: '35px' }}>{file.progress}%</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {file.status === 'complete' ? (
                        <CheckCircle size={20} color="#10b981" />
                      ) : (
                        <button 
                          onClick={() => removeFile(file.id)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Feedback Overlay */}
        <AnimatePresence>
          {uploadStatus === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              style={{ 
                position: 'fixed', 
                bottom: '40px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                background: '#10b981',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
                zIndex: 1000
              }}
            >
              <CheckCircle size={24} />
              <span style={{ fontWeight: 600 }}>All files uploaded successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
