/* src/App.jsx */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// --- Stylesheets ---
import './css/main.css';
import './css/components.css';
import './css/dashboards.css';

// --- Components ---
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ToastContainer from './components/Toast';

// --- Pages ---
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import BrowseGrants from './pages/public/BrowseGrants';
import PricingPage from './pages/public/PricingPage';
import ContactPage from './pages/public/ContactPage';
import AuthPage from './pages/public/AuthPage';

// Student
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import StudentApplications from './pages/student/StudentApplications';

// Provider
import ProviderDashboard from './pages/provider/ProviderDashboard';
import CreateGrant from './pages/provider/CreateGrant';
import ManageApplicants from './pages/provider/ManageApplicants';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import VerifyProviders from './pages/admin/VerifyProviders';
import ManageGrants from './pages/admin/ManageGrants';

// --- Protected Route Wrapper ---
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useApp();
  
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to their respective dashboard if they have the wrong role
    if (currentUser.role === 'student') return <Navigate to="/dashboard" replace />;
    if (currentUser.role === 'provider') return <Navigate to="/provider" replace />;
    if (currentUser.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

// --- Layout Wrapper ---
const AppLayout = ({ children }) => {
  const { currentUser } = useApp();
  const location = useLocation();

  // Determine if it's a dashboard route
  const isDashboard = location.pathname.startsWith('/dashboard') || 
                      location.pathname.startsWith('/provider') || 
                      location.pathname.startsWith('/admin');

  if (isDashboard && currentUser) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <header className="dashboard-header">
            <h2 className="header-title" style={{ textTransform: 'capitalize' }}>
              {location.pathname.split('/').pop() === 'dashboard' ? 'Overview' : 
               location.pathname.split('/').pop()?.replace('-', ' ')}
            </h2>
            <div className="header-actions">
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Role: <strong style={{ color: 'var(--brand-primary)', textTransform: 'capitalize' }}>{currentUser.role}</strong>
              </span>
            </div>
          </header>
          <div className="dashboard-content">
            {children}
          </div>
        </main>
      </div>
    );
  }

  // Public Layout
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
};

function AppContent() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/grants" element={<BrowseGrants />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Student Dashboard (Protected) */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/profile" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentProfile />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/applications" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentApplications />
            </ProtectedRoute>
          } />

          {/* Provider Dashboard (Protected) */}
          <Route path="/provider" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderDashboard />
            </ProtectedRoute>
          } />
          <Route path="/provider/create" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <CreateGrant />
            </ProtectedRoute>
          } />
          <Route path="/provider/applicants" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ManageApplicants />
            </ProtectedRoute>
          } />

          {/* Super Admin Dashboard (Protected) */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/verify-providers" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <VerifyProviders />
            </ProtectedRoute>
          } />
          <Route path="/admin/grants" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageGrants />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
      <ToastContainer />
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
