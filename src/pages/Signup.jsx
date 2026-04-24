import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, UserPlus, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpMode, setIsOtpMode] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0); 
  const [expiryTime, setExpiryTime] = useState(null); // 🚀 Source of truth for timer

  // 🚀 OTP Countdown Logic (Synced with Expiry Time)
  useEffect(() => {
    let timer;
    if (expiryTime) {
      timer = setInterval(() => {
        const diff = Math.floor((new Date(expiryTime).getTime() - Date.now()) / 1000);
        if (diff <= 0) {
          setCountdown(0);
          setExpiryTime(null);
          clearInterval(timer);
        } else {
          setCountdown(diff);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [expiryTime]);

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

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !fullName) {
      setError("Please fill required fields");
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
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

        // store OTP in supabase (VERY IMPORTANT)
        const { data: otpData, error: dbError } = await supabase.from("otp_codes").upsert(
          {
            email: email.toLowerCase(),
            otp: generatedOtp,
            expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 min
          },
          {
            onConflict: "email"
          }
        ).select().single(); // 🚀 Get server-confirmed data back

        if (dbError) {
          setLoading(false);
          setError("Failed to create OTP: " + dbError.message);
          return;
        }

        try {
          // send email
          const res = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
              to_email: email,
              otp: generatedOtp
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );

          console.log("SUCCESS:", res);
          setOtpSent(true);
          setExpiryTime(otpData.expires_at); // 🚀 Set source of truth
          setError("OTP sent successfully to your email! Please check.");
        } catch (err) {
          console.error("FULL ERROR:", err);
          setError("Failed to send OTP via EmailJS: " + (err.text || err.message || "Unknown error"));
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
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        setLoading(false);

        if (dbError || !data) {
          setError("No OTP found for this email");
          return;
        }

        // 🧪 DEBUG (copy paste)
        console.log("Entered:", enteredOtp);
        console.log("Stored:", data?.otp);
        console.log("Now:", Date.now());
        console.log("Expiry:", new Date(data.expires_at).getTime());

        if (String(data.otp) !== enteredOtp) {
          setError("Invalid OTP");
          return;
        }

        if (Date.now() > new Date(data.expires_at).getTime()) {
          setError("OTP expired");
          return;
        }

        setError("Signup successful! Redirecting...");

        // 🔥 When user signs up:
        await supabase.from("profiles").insert({
          id: email.toLowerCase(),
          name: fullName,
        });

        // Create custom session in local storage
        localStorage.setItem('custom_session', 'true');
        localStorage.setItem('custom_session_email', email);
        localStorage.setItem('custom_session_name', fullName);
        setTimeout(() => navigate('/'), 2000);
      }
    } else {
      if (!password) {
        setError("Please enter a password");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      setLoading(true);

      const { data, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      setLoading(false);

      if (authError) {
        setError(authError.message);
      } else {
        // 🔥 When user signs up:
        if (data.user) {
          await supabase.from("profiles").insert({
            id: data.user.id,
            name: fullName,
          });
        }
        
        setError("Signup successful! Check your email.");
        setTimeout(() => navigate('/login'), 2000);
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
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
            <UserPlus size={24} />
          </div>
          <h1>EduMind</h1>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>
            Create an Account
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Join our community of learners today
          </p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input
                type="text"
                className="login-input"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isOtpMode && otpSent}
              />
            </div>
          </div>

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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ margin: 0 }}>One-Time Password (OTP)</label>
                  {countdown > 0 && (
                    <span style={{ fontSize: '0.8rem', color: countdown < 60 ? '#ef4444' : 'var(--text-muted)', fontWeight: 600 }}>
                      Expires in: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
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
              isOtpMode ? (otpSent ? 'Verify OTP & Sign Up' : 'Send OTP') : 'Sign Up'
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
              {isOtpMode ? 'Sign Up with Password instead' : 'Sign Up with OTP instead'}
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
            Sign up with Google
          </button>
        </div>

        <div className="login-footer">
          Already have an account?{' '}
          <Link to="/login" className="login-link">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
