import html2pdf from "html2pdf.js";
import { Download } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Certificate Component
 * 
 * @param {Object} props
 * @param {string} props.name - Student Name
 * @param {string} props.course - Course Title
 * @param {string} props.date - Completion Date
 * @param {string} props.certId - Unique Certificate ID
 */
export default function Certificate({ name, course, date, certId }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      // Account for modal padding and UI elements
      const availableWidth = Math.min(window.innerWidth - 80, 1000); 
      const availableHeight = window.innerHeight - 250; // Leave space for download button
      
      const scaleX = availableWidth / 1000;
      const scaleY = availableHeight / 700;
      
      // Ensure it never scales up beyond 1, and always fits both width and height
      setScale(Math.min(scaleX, scaleY, 1));
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  const downloadPDF = async () => {
    const element = document.getElementById("certificate");
    const wrapper = document.getElementById("certificate-wrapper");
    
    // Temporarily remove scaling for high-quality PDF capture
    const originalTransform = wrapper.style.transform;
    wrapper.style.transform = 'none';
    
    // Wait for DOM to update
    await new Promise(r => setTimeout(r, 50));
    
    // Premium PDF settings
    const opt = {
      margin: 0,
      filename: `${name.replace(/\s+/g, '_')}_Certificate.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 4, // High resolution
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'px', 
        format: [1000, 700], // Match div dimensions
        orientation: 'landscape',
        hotfixes: ['px_scaling']
      }
    };

    // Generate PDF
    await html2pdf().set(opt).from(element).save();
    
    // Restore scaling
    wrapper.style.transform = originalTransform;
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '0', borderRadius: '16px', overflow: 'hidden' }}>
      
      {/* Container that strictly measures available width */}
      <div 
        style={{ 
          width: `${1000 * scale}px`, // Strictly collapse width
          height: `${700 * scale}px`, // Strictly collapse height 
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#e5e7eb', // subtle background for edge detection
          borderBottom: '1px solid var(--border-color)',
          margin: '0 auto' // Center within the card
        }}
      >
        <div 
          id="certificate-wrapper"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${scale})`, 
            transformOrigin: 'top left',
          }}
        >
          {/* Certificate UI - Exactly 1000x700 for the PDF generator */}
          <div
            id="certificate"
          style={{
            position: "relative",
            width: "1000px",
            height: "700px",
            minWidth: "1000px",
            minHeight: "700px",
            maxWidth: "1000px",
            maxHeight: "700px",
            backgroundColor: "#ffffff",
            flexShrink: 0,
          }}
        >
          
          {/* Background Template */}
          <img
            src="/certificate-template.png"
            alt="certificate template"
            style={{ width: "100%", height: "100%", objectFit: "fill", display: "block" }}
          />

          {/* DYNAMIC CONTENT OVERLAYS */}
          
          {/* STUDENT NAME */}
          <div
            style={{
              position: "absolute",
              top: "50%", /* Moved down to avoid overlapping 'This is to certify that' */
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              textAlign: "center"
            }}
          >
            <h1
              style={{
                fontSize: "56px",
                fontWeight: "700",
                color: "#6C2BD9",
                letterSpacing: "4px",
                fontFamily: "'Playfair Display', serif",
                margin: 0,
                textTransform: "uppercase"
              }}
            >
              {name}
            </h1>
          </div>

          {/* COURSE CONTENT */}
          <div
            style={{
              position: "absolute",
              top: "57%", /* Sits perfectly between name and 'successfully completed' text */
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              textAlign: "center"
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#111827",
                letterSpacing: "2px",
                fontFamily: "'Inter', sans-serif",
                margin: 0,
                textTransform: "uppercase"
              }}
            >
              {course}
            </h2>
          </div>

          {/* DATE & SIGNATURE NAME */}
          <div
            style={{
              position: "absolute",
              bottom: "4%", /* Pushed further down to be below Head of Course Management */
              left: "14%", 
              width: "25%",
              textAlign: "center"
            }}
          >
             <p style={{ fontSize: "14px", color: "#6B7280", margin: 0, fontFamily: "sans-serif", fontWeight: "600" }}>
                Date of Issue: {date}
             </p>
          </div>

          {/* CERTIFICATE ID (VERY PRO) */}
          <div
            style={{
              position: "absolute",
              bottom: "4%",
              right: "4%",
              opacity: 0.5
            }}
          >
             <p style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "monospace", margin: 0 }}>
                VERIFY ID: {certId}
             </p>
          </div>

        </div>
        </div>
      </div>

      {/* Download Action Area */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '24px' }}>
        <button 
          onClick={downloadPDF}
          className="btn-primary hover-bounce"
          style={{
            padding: '14px 32px',
            fontSize: '1.1rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 16px rgba(86, 59, 186, 0.2)'
          }}
        >
          <Download size={20} />
          Download PDF
        </button>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, margin: 0 }}>Official Verified Certificate</p>
      </div>
    </div>
  );
}
