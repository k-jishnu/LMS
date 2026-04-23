import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpMode, setIsOtpMode] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session || localStorage.getItem('custom_session') === 'true') {
        navigate('/');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session || localStorage.getItem('custom_session') === 'true') {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (isOtpMode) {
      if (!otpSent) {
        setLoading(true);
        // 🚀 STEP 2: SEND OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // store OTP in supabase (VERY IMPORTANT)
        const { error: dbError } = await supabase.from("otp_codes").upsert(
          {
            email: email.toLowerCase(),
            otp: otpCode,
            expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString()
          },
          { onConflict: "email" }
        );

        if (dbError) {
          setLoading(false);
          setError("Failed to create OTP: " + dbError.message);
          return;
        }

        try {
          // send email
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
              to_email: email,
              otp: otpCode
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );

          setOtpSent(true);
          setError("OTP sent successfully to your email! Please check.");
        } catch (err) {
          setError("Failed to send OTP via EmailJS: " + err.text);
        }
        setLoading(false);
      } else {
        if (!otp) {
          setError("Please enter the OTP");
          return;
        }
        setLoading(true);
        // 🚀 STEP 3: VERIFY OTP
        const cleanEmail = email.trim().toLowerCase();
        const enteredOtp = otp.trim();

        const { data, error: dbError } = await supabase
          .from("otp_codes")
          .select("*")
          .eq("email", cleanEmail)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(); // Safe alternative to .single()

        setLoading(false);

        if (dbError) {
          console.error("OTP Verification Error:", dbError);
          setError("Database error occurred");
          return;
        }

        if (!data) {
          setError("No OTP found for this email");
          return;
        }

        // Add debug logs to help find the issue
        console.log("--- OTP DEBUG LOGS ---");
        console.log("Entered OTP:", enteredOtp, typeof enteredOtp);
        console.log("DB OTP:", data?.otp, typeof data?.otp);
        console.log("Email:", email);
        console.log("DB Email:", data?.email);
        console.log("----------------------");

        // Compare string types safely in case DB stores OTP as integer
        if (String(data.otp) !== enteredOtp) {
          setError("Invalid OTP");
          return;
        }

        if (new Date(data.expires_at) < new Date()) {
          setError("OTP expired");
          return;
        }

        setError("Login success");
        // Create custom session in local storage
        localStorage.setItem('custom_session', 'true');
        localStorage.setItem('custom_session_email', email);
        setTimeout(() => navigate('/'), 1000);
      }
    } else {
      if (!password) {
        setError("Please enter your password");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      setLoading(true);
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      setLoading(false);

      if (authError) {
        setError("Invalid email or password");
      } else {
        navigate('/');
      }
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-logo">
          <div style={{
            width: 40,
            height: 40,
            background: 'var(--primary-color)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <LogIn size={24} />
          </div>
          <h1>EduMind</h1>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>
            Welcome back!
          </h2>

        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                className="login-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isOtpMode && otpSent}
              />
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {!isOtpMode && (
              <motion.div
                key="password"
                className="form-group"
                style={{ marginBottom: 12 }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input
                    type="password"
                    className="login-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {isOtpMode && otpSent && (
              <motion.div
                key="otp"
                className="form-group"
                style={{ marginBottom: 12 }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label>One-Time Password (OTP)</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input
                    type="text"
                    className="login-input"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          <AnimatePresence>
            {error && (
              <motion.div
                className="error-message"
                style={{
                  backgroundColor: error.includes('successful') ? '#f0fdf4' : '#fef2f2',
                  color: error.includes('successful') ? '#15803d' : '#ef4444',
                  padding: '10px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.85rem'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : (
              isOtpMode ? (otpSent ? 'Verify OTP & Login' : 'Send OTP') : 'Login'
            )}
          </button>

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <button
              type="button"
              onClick={() => {
                setIsOtpMode(!isOtpMode);
                setError(null);
                setOtpSent(false);
                setOtp('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-color)',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              {isOtpMode ? 'Login with Password instead' : 'Login with OTP instead'}
            </button>
          </div>
        </form>

        <div className="social-login" style={{ marginTop: '20px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
            <span style={{ padding: '0 10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.79 15.72 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
              <path d="M12 23C14.97 23 17.46 22.01 19.28 20.34L15.72 17.57C14.74 18.23 13.48 18.63 12 18.63C9.13999 18.63 6.70999 16.7 5.84999 14.12H2.16998V16.97C3.97998 20.57 7.69999 23 12 23Z" fill="#34A853" />
              <path d="M5.84999 14.12C5.62999 13.46 5.49999 12.74 5.49999 12C5.49999 11.26 5.62999 10.54 5.84999 9.88V7.03H2.16998C1.42998 8.5 1 10.19 1 12C1 13.81 1.42998 15.5 2.16998 16.97L5.84999 14.12Z" fill="#FBBC05" />
              <path d="M12 5.38C13.62 5.38 15.06 5.94 16.2 7.03L19.36 3.87C17.46 2.09 14.97 1 12 1C7.69999 1 3.97998 3.43 2.16998 7.03L5.84999 9.88C6.70999 7.3 9.13999 5.38 12 5.38Z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="login-footer">
          Don't have an account?{' '}
          <Link to="/signup" className="login-link">
            Create Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
