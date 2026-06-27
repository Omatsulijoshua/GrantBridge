/* src/components/Navbar.jsx */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Sparkles, LogIn, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { currentUser, theme, toggleTheme, logout, setCurrentUser, users } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to switch roles instantly for evaluation
  const handleQuickRoleSwitch = (role) => {
    if (role === 'guest') {
      setCurrentUser(null);
      navigate('/');
    } else {
      const user = users.find(u => u.role === role);
      if (user) {
        setCurrentUser(user);
        if (role === 'student') navigate('/dashboard');
        else if (role === 'provider') navigate('/provider');
        else if (role === 'admin') navigate('/admin');
      }
    }
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 500,
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      justifyContent: 'space-between',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: 0
    }}>
      {/* Brand Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-primary)' }}>
        <Sparkles size={24} style={{ color: 'var(--brand-primary)' }} />
        <span>Grant<span className="text-gradient">Bridge</span></span>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ color: isActive('/') ? 'var(--brand-primary)' : 'var(--text-secondary)', fontWeight: 600 }}>Home</Link>
        <Link to="/grants" style={{ color: isActive('/grants') ? 'var(--brand-primary)' : 'var(--text-secondary)', fontWeight: 600 }}>Grants</Link>
        <Link to="/pricing" style={{ color: isActive('/pricing') ? 'var(--brand-primary)' : 'var(--text-secondary)', fontWeight: 600 }}>Pricing</Link>
        <Link to="/about" style={{ color: isActive('/about') ? 'var(--brand-primary)' : 'var(--text-secondary)', fontWeight: 600 }}>About</Link>
        <Link to="/contact" style={{ color: isActive('/contact') ? 'var(--brand-primary)' : 'var(--text-secondary)', fontWeight: 600 }}>Contact</Link>
      </div>

      {/* Right Controls */}
      <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Quick Role Switcher (For Demo purposes) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-tertiary)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-color)',
          fontSize: '0.8rem'
        }}>
          <span style={{ padding: '0 0.5rem', fontWeight: 700, color: 'var(--text-muted)' }}>Demo As:</span>
          <button 
            onClick={() => handleQuickRoleSwitch('guest')} 
            className={`btn btn-sm ${!currentUser ? 'btn-primary' : 'btn-text'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.2rem 0.6rem' }}
          >
            Guest
          </button>
          <button 
            onClick={() => handleQuickRoleSwitch('student')} 
            className={`btn btn-sm ${currentUser?.role === 'student' ? 'btn-primary' : 'btn-text'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.2rem 0.6rem' }}
          >
            Student
          </button>
          <button 
            onClick={() => handleQuickRoleSwitch('provider')} 
            className={`btn btn-sm ${currentUser?.role === 'provider' ? 'btn-primary' : 'btn-text'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.2rem 0.6rem' }}
          >
            Provider
          </button>
          <button 
            onClick={() => handleQuickRoleSwitch('admin')} 
            className={`btn btn-sm ${currentUser?.role === 'admin' ? 'btn-primary' : 'btn-text'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.2rem 0.6rem' }}
          >
            Admin
          </button>
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn btn-text" style={{ padding: '0.5rem', display: 'flex', borderRadius: 'var(--radius-full)' }}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Auth Actions */}
        {currentUser ? (
          <>
            <Link to={currentUser.role === 'student' ? '/dashboard' : currentUser.role === 'provider' ? '/provider' : '/admin'} className="btn btn-secondary btn-sm">
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </Link>
            <button onClick={logout} className="btn btn-outline btn-sm">
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <Link to="/auth" className="btn btn-primary btn-sm">
            <LogIn size={16} />
            <span>Login</span>
          </Link>
        )}
      </div>

      {/* Mobile Hamburger Menu Toggle */}
      <button 
        className="mobile-only btn btn-text" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{ display: 'none' }} /* Adjusted in CSS or inline style */
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Styling helpers for mobile vs desktop */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="glass-panel" style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
          gap: '1rem',
          borderTop: '1px solid var(--border-color)',
          borderLeft: 'none',
          borderRight: 'none',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 499
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Home</Link>
          <Link to="/grants" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Grants</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Pricing</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600 }}>About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Contact</Link>
          
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>DEMO SWITCHER</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button onClick={() => handleQuickRoleSwitch('guest')} className="btn btn-sm btn-secondary">Guest</button>
              <button onClick={() => handleQuickRoleSwitch('student')} className="btn btn-sm btn-secondary">Student</button>
              <button onClick={() => handleQuickRoleSwitch('provider')} className="btn btn-sm btn-secondary">Provider</button>
              <button onClick={() => handleQuickRoleSwitch('admin')} className="btn btn-sm btn-secondary">Admin</button>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={toggleTheme} className="btn btn-outline btn-sm">
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>

            {currentUser ? (
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn btn-danger btn-sm">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-sm">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
