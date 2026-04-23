import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Sidebar from './components/Layout/Sidebar';
import Topbar from './components/Layout/Topbar';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import Calendar from './pages/Calendar';
import Notifications from './pages/Notifications';
import Assignments from './pages/Assignments';
import Quizzes from './pages/Quizzes';
import Progress from './pages/Progress';
import Certificates from './pages/Certificates';
import Community from './pages/Community';
import Reviews from './pages/Reviews';
import Downloads from './pages/Downloads';
import Documents from './pages/Documents';
import Questions from './pages/Questions';
import Webinars from './pages/Webinars';
import CoursePlayer from './pages/CoursePlayer';
import ProfileSettings from './pages/ProfileSettings';
import Payments from './pages/Payments';
import Support from './pages/Support';
import Upload from './pages/Upload';
import CertificateVerify from './pages/CertificateVerify';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css';

// Generic Placeholder for the 15 sections
const Placeholder = ({ title }) => (
  <div className="empty-state">
    <div style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '20px' }}>
      You have no {title.toLowerCase()} on your platform.
    </div>
  </div>
);

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    
    const logout = async () => {
      await supabase.auth.signOut();
      localStorage.removeItem('custom_session');
      localStorage.removeItem('custom_session_email');
      localStorage.removeItem('custom_session_name');
      navigate('/login');
    };

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 5 * 60 * 1000); // 5 minutes
    };

    const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];
    
    resetTimeout();

    events.forEach(event => window.addEventListener(event, resetTimeout));

    return () => {
      clearTimeout(timeout);
      events.forEach(event => window.removeEventListener(event, resetTimeout));
    };
  }, [navigate]);

  return null;
};

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [customSession, setCustomSession] = useState(localStorage.getItem('custom_session') === 'true');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // If there is no session yet but we have an access_token in the URL (Magic Link),
      // keep loading=true so we don't redirect and destroy the URL hash.
      if (!session && window.location.hash.includes('access_token')) {
        return;
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Check custom session periodically or listen to storage events
    const handleStorageChange = () => {
      setCustomSession(localStorage.getItem('custom_session') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: 'var(--bg-primary)' }}>Authenticating...</div>;
  }

  if (!session && !customSession) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AutoLogout />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/*" element={
          <ProtectedRoute>
            <div className="app-container">
              <Sidebar />
            <div className="main-content">
              <Topbar />
              <div className="page-content" style={{ flex: 1, overflowY: 'auto' }}>
                <Routes>
                  {/* Main Routing */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/notifications" element={<Notifications />} />

                  {/* Learning */}
                  <Route path="/courses" element={<MyCourses />} />
                  <Route path="/player" element={<CoursePlayer />} />
                  <Route path="/assignments" element={<Assignments />} />

                  {/* Performance */}
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/certificates" element={<Certificates />} />
                  <Route path="/verify" element={<CertificateVerify />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/reviews" element={<Reviews />} />

                  {/* Resources */}
                  <Route path="/downloads" element={<Downloads />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/quizzes" element={<Quizzes />} />
                  <Route path="/profile" element={<ProfileSettings />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/support" element={<Support />} />

                  {/* Legacy mappings */}
                  <Route path="/webinars" element={<Webinars />} />
                  <Route path="/questions" element={<Questions />} />
                </Routes>
              </div>
            </div>
          </div>
        </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
