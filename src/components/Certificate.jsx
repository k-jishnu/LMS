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
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      // Calculate scale to fit within 90% of screen width and 70% of screen height
      const scaleX = (screenWidth * 0.9) / 1000;
      const scaleY = (screenHeight * 0.7) / 700;
      setScale(Math.min(scaleX, scaleY, 1)); // Max scale is 1
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', borderRadius: '32px' }}>
      
      {/* Scaled wrapper for complete visibility */}
      <div 
        style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          height: `${700 * scale}px`, // Dynamically reserve height based on scale
          marginBottom: '20px'
        }}
      >
        <div 
          id="certificate-wrapper"
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top center',
            transition: 'transform 0.1s'
          }}
        >
          {/* Certificate UI - Exactly 1000x700 for the PDF generator */}
          <div
            id="certificate"
          style={{
            position: "relative",
            width: "1000px",
            height: "700px",
            backgroundColor: "#ffffff",
            flexShrink: 0,
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
          }}
        >
          
          {/* Background Template */}
          <img
            src="/certificate-template.png"
            alt="certificate template"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={downloadPDF}
          className="btn-primary hover-bounce"
          style={{
            padding: '16px 40px',
            fontSize: '1.2rem',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 20px rgba(86, 59, 186, 0.2)'
          }}
        >
          <Download size={24} />
          Download Official Certificate
        </button>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Valid for professional portfolios and LinkedIn</p>
      </div>
    </div>
  );
}
