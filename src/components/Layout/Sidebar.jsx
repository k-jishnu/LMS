import { NavLink, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, ChevronUp, LayoutDashboard, Calendar, Bell, 
  BookOpen, PlaySquare, FileText, CheckSquare, 
  TrendingUp, Award, MessageSquare, Star, 
  Download, User, CreditCard, HelpCircle, Store, MoreVertical, Upload, LogOut 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    learning: true,
    performance: false,
    resources: false,
    main: true,
    account: false
  });
  const [name, setName] = useState('User');

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const fullName = data.user?.user_metadata?.full_name || "User";
        setName(fullName);
      }
    };
    fetchUser();
  }, []);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const confirmLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <>
    <aside className="sidebar">
      {/* Logo Area */}
      <div 
        style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <div style={{ 
          width: '32px', 
          height: '32px', 
          background: 'linear-gradient(135deg, var(--primary-color), #8b5cf6)', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white', 
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(86, 59, 186, 0.2)'
        }}>
          EM
        </div>
        <span style={{ marginLeft: '12px', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
          EduMind
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
        
        {/* Learning Section */}
        <div>
          <button className="sidebar-menu-btn" onClick={() => toggleSection('learning')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              Learning
            </span>
            {openSections.learning ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {openSections.learning && (
            <div className="sidebar-submenu">
              <NavLink to="/courses" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <BookOpen size={18} /> My Courses
                </span>
              </NavLink>

              <NavLink to="/assignments" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <FileText size={18} /> Assignments
                </span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Performance & Social */}
        <div style={{ marginTop: '10px' }}>
          <button className="sidebar-menu-btn" onClick={() => toggleSection('performance')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              Performance & Social
            </span>
            {openSections.performance ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {openSections.performance && (
            <div className="sidebar-submenu">
              <NavLink to="/progress" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <TrendingUp size={18} /> Progress
                </span>
              </NavLink>
              <NavLink to="/certificates" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <Award size={18} /> Certificates
                </span>
              </NavLink>
              <NavLink to="/community" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <MessageSquare size={18} /> Community
                </span>
              </NavLink>
              <NavLink to="/reviews" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <Star size={18} /> Reviews
                </span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Library & Resources */}
        <div style={{ marginTop: '10px' }}>
          <button className="sidebar-menu-btn" onClick={() => toggleSection('resources')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
               Resources
            </span>
            {openSections.resources ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {openSections.resources && (
            <div className="sidebar-submenu">
              <NavLink to="/downloads" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <Download size={18} /> Downloads
                </span>
              </NavLink>

              <NavLink to="/upload" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <Upload size={18} /> Upload
                </span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <div style={{ marginTop: '10px' }}>
          <button className="sidebar-menu-btn" onClick={() => toggleSection('main')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              Main Navigation
            </span>
            {openSections.main ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {openSections.main && (
            <div className="sidebar-submenu">
              <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <LayoutDashboard size={18} /> Dashboard
                </span>
              </NavLink>
              <NavLink to="/calendar" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <Calendar size={18} /> Calendar
                </span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div style={{ marginTop: '10px' }}>
          <button className="sidebar-menu-btn" onClick={() => toggleSection('account')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              Settings
            </span>
            {openSections.account ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {openSections.account && (
            <div className="sidebar-submenu">
              <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <User size={18} /> Profile
                </span>
              </NavLink>
              <NavLink to="/notifications" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <Bell size={18} /> Notifications
                </span>
              </NavLink>
              <NavLink to="/payments" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <CreditCard size={18} /> Payments
                </span>
              </NavLink>
              <NavLink to="/support" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <HelpCircle size={18} /> Support
                </span>
              </NavLink>
            </div>
          )}
        </div>

      </nav>

      {/* Bottom Actions */}
      <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #f87171, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Student Participant</div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setShowLogoutConfirm(true)}
          style={{ 
            width: '100%', 
            padding: '10px', 
            borderRadius: '8px', 
            border: '1px solid #fee2e2', 
            background: '#fff5f5', 
            color: '#ef4444', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px', 
            fontSize: '0.85rem', 
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#fecaca'}
          onMouseOut={(e) => e.currentTarget.style.background = '#fff5f5'}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>

    <AnimatePresence>
      {showLogoutConfirm && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            style={{ background: 'var(--bg-primary)', padding: '30px', borderRadius: '16px', width: '340px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                <LogOut size={24} />
              </div>
            </div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', textAlign: 'center', color: 'var(--text-main)' }}>Sign Out</h3>
            <p style={{ margin: '0 0 24px 0', color: 'var(--text-muted)', fontSize: '0.95rem', textAlign: 'center', lineHeight: 1.5 }}>
              Are you sure you want to sign out of your account? You will need to log back in to access your courses.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutConfirm(false)} className="btn-outline" style={{ flex: 1, padding: '12px', borderRadius: '8px' }}>Cancel</button>
              <button onClick={confirmLogout} className="btn-primary" style={{ flex: 1, background: '#ef4444', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600 }}>Sign Out</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

