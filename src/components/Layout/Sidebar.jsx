import { NavLink, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, ChevronUp, LayoutDashboard, Calendar, Bell, 
  BookOpen, PlaySquare, FileText, CheckSquare, 
  TrendingUp, Award, MessageSquare, Star, 
  Download, User, CreditCard, HelpCircle, Store, MoreVertical 
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    learning: true,
    performance: false,
    resources: false,
    main: true,
    account: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="sidebar">
      {/* Logo Area */}
      <div 
        style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <div style={{ width: '30px', height: '30px', background: 'var(--text-main)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
          EB
        </div>
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
              <NavLink to="/quizzes" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <CheckSquare size={18} /> Quizzes & Exams
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
              <NavLink to="/notifications" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '-24px' }}>
                  <Bell size={18} /> Notifications
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
      <div style={{ padding: '20px' }}>
        <button style={{ 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          padding: '12px', 
          background: '#fffbf0', 
          color: '#d97706', 
          border: 'none', 
          borderRadius: '8px', 
          fontWeight: 500, 
          cursor: 'pointer',
          marginBottom: '20px'
        }}>
          <Store size={18} /> Visit Store
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              K
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>K Jishnu</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Student</div>
            </div>
          </div>
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
