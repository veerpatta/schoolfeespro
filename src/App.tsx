import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import DirectorDashboard from './pages/DirectorDashboard';
import StaffDashboard from './pages/StaffDashboard';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';
import FeeSetup from './pages/FeeSetup';
import PromoRequests from './pages/PromoRequests';
import Reports from './pages/Reports';
import './App.css';

function App() {
  return (
    <HashRouter>
      <nav style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <strong style={{ marginRight: '20px' }}>SchoolFeesPro</strong>
        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/director" style={{ marginRight: '10px' }}>Director</Link>
        <Link to="/staff" style={{ marginRight: '10px' }}>Staff</Link>
        <Link to="/students" style={{ marginRight: '10px' }}>Students</Link>
        <Link to="/feesetup" style={{ marginRight: '10px' }}>Fee Setup</Link>
        <Link to="/promos" style={{ marginRight: '10px' }}>Promos</Link>
        <Link to="/reports" style={{ marginRight: '10px' }}>Reports</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/director" element={<DirectorDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:studentId" element={<StudentProfile />} />
        <Route path="/feesetup" element={<FeeSetup />} />
        <Route path="/promos" element={<PromoRequests />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

