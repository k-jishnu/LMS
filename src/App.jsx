import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import ProfileSettings from './pages/ProfileSettings';
import Payments from './pages/Payments';
import Support from './pages/Support';
import './index.css';

// Generic Placeholder for the 15 sections
const Placeholder = ({ title }) => (
  <div className="empty-state">
    <div style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '20px' }}>
      You have no {title.toLowerCase()} on your platform.
    </div>
  </div>
);

function App() {
  return (
    <Router>
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
              <Route path="/player" element={<Placeholder title="active video player sessions" />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/quizzes" element={<Quizzes />} />

              {/* Performance */}
              <Route path="/progress" element={<Progress />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/community" element={<Community />} />
              <Route path="/reviews" element={<Reviews />} />

              {/* Resources */}
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/support" element={<Support />} />

              {/* Legacy mappings from user screenshots */}
              <Route path="/webinars" element={<Webinars />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/documents" element={<Documents />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
