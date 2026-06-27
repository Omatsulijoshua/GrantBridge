/* src/components/Sidebar.jsx */
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, User, FileText, Search, PlusCircle, Users, CheckSquare, ListPlus, 
  Home, LogOut, Sun, Moon, Sparkles 
} from 'lucide-react';

export default function Sidebar() {
  const { currentUser, logout, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getLinks = () => {
    switch (currentUser.role) {
      case 'student':
        return [
          { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
          { to: '/dashboard/profile', label: 'My Profile', icon: <User size={18} /> },
          { to: '/dashboard/applications', label: 'Applications', icon: <FileText size={18} /> },
          { to: '/grants', label: 'Browse Grants', icon: <Search size={18} /> }
        ];
      case 'provider':
        return [
          { to: '/provider', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
          { to: '/provider/create', label: 'Post a Grant', icon: <PlusCircle size={18} /> },
          { to: '/provider/applicants', label: 'Applicants', icon: <Users size={18} /> }
        ];
      case 'admin':
        return [
          { to: '/admin', label: 'Overview', icon: <LayoutDashboard size={18} />, end: true },
          { to: '/admin/users', label: 'Manage Users', icon: <Users size={18} /> },
          { to: '/admin/verify-providers', label: 'Verify Providers', icon: <CheckSquare size={18} /> },
          { to: '/admin/grants', label: 'Manage Grants', icon: <ListPlus size={18} /> }
        ];
      default:
        return [];
    }
  };

  const menuLinks = getLinks();

  return (
    <aside className="dashboard-sidebar">
      {/* Sidebar Logo */}
      <Link to="/" className="sidebar-logo">
        <Sparkles size={22} style={{ color: 'var(--brand-primary)' }} />
        <span>Grant<span className="text-gradient">Bridge</span></span>
      </Link>

      {/* Navigation Menu */}
      <nav className="sidebar-menu">
        {menuLinks.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {/* Navigation Helper to Public Home */}
        <Link to="/" className="sidebar-link" style={{ border: '1px solid var(--border-color)', justifyContent: 'center', fontSize: '0.85rem' }}>
          <Home size={16} />
          <span>View Public Site</span>
        </Link>

        {/* Theme Toggle & Logout */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={toggleTheme} 
            className="btn btn-outline" 
            style={{ flex: 1, padding: '0.5rem', display: 'flex', justifyContent: 'center' }}
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button 
            onClick={handleLogout} 
            className="btn btn-danger" 
            style={{ flex: 1, padding: '0.5rem', display: 'flex', justifyContent: 'center' }}
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* User Info Card */}
        <div className="user-profile-summary" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <div className="avatar">
            {currentUser.avatar}
          </div>
          <div className="user-info">
            <span className="user-name" title={currentUser.name}>{currentUser.name}</span>
            <span className="user-role" style={{ textTransform: 'capitalize' }}>
              {currentUser.role === 'provider' ? currentUser.foundationName : currentUser.role}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
