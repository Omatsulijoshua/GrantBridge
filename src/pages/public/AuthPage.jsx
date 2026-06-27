/* src/pages/public/AuthPage.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Building2, Lock, Mail, User, Globe, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const { login, signup, currentUser } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // --- UI States ---
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student'); // 'student' or 'provider'

  // --- Form States ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [foundationName, setFoundationName] = useState('');
  const [website, setWebsite] = useState('');

  // Handle URL search params (e.g., from pricing page or signup CTA)
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'student' || roleParam === 'provider') {
      setRole(roleParam);
      setIsLogin(false); // Assume they want to sign up if they clicked a specific role CTA
    }

    const modeParam = searchParams.get('mode');
    if (modeParam === 'login') {
      setIsLogin(true);
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'student') navigate('/dashboard');
      else if (currentUser.role === 'provider') navigate('/provider');
      else if (currentUser.role === 'admin') navigate('/admin');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const user = login(email, password);
      if (user) {
        if (user.role === 'student') navigate('/dashboard');
        else if (user.role === 'provider') navigate('/provider');
        else if (user.role === 'admin') navigate('/admin');
      }
    } else {
      const extraFields = {};
      if (role === 'provider') {
        extraFields.foundationName = foundationName;
        extraFields.website = website;
      }
      
      const user = signup(name, email, password, role, extraFields);
      if (user) {
        if (user.role === 'student') navigate('/dashboard');
        else if (user.role === 'provider') navigate('/provider');
      }
    }
  };

  return (
    <div className="flex-center" style={{
      minHeight: '85vh',
      padding: '2rem 1.5rem',
      background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.03) 0%, rgba(14, 165, 233, 0.02) 100%)'
    }}>
      <div className="card" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-xl)',
        borderRadius: 'var(--radius-lg)'
      }}>
        {/* Tab Switcher */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: 'var(--bg-tertiary)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              padding: '0.6rem',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.9rem',
              backgroundColor: isLogin ? 'var(--bg-secondary)' : 'transparent',
              color: isLogin ? 'var(--text-primary)' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              padding: '0.6rem',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.9rem',
              backgroundColor: !isLogin ? 'var(--bg-secondary)' : 'transparent',
              color: !isLogin ? 'var(--text-primary)' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            Register
          </button>
        </div>

        {/* Header Text */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isLogin ? 'Enter details to access your GrantBridge account.' : 'Join the leading scholarship network.'}
          </p>
        </div>

        {/* Role Selector (Sign Up Only) */}
        {!isLogin && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div
              onClick={() => setRole('student')}
              style={{
                border: `2px solid ${role === 'student' ? 'var(--brand-primary)' : 'var(--border-color)'}`,
                backgroundColor: role === 'student' ? 'var(--brand-primary-light)' : 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <GraduationCap size={24} style={{ margin: '0 auto 0.5rem', color: role === 'student' ? 'var(--brand-primary)' : 'var(--text-muted)' }} />
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: role === 'student' ? 'var(--brand-primary)' : 'var(--text-primary)' }}>Student</div>
            </div>

            <div
              onClick={() => setRole('provider')}
              style={{
                border: `2px solid ${role === 'provider' ? 'var(--brand-primary)' : 'var(--border-color)'}`,
                backgroundColor: role === 'provider' ? 'var(--brand-primary-light)' : 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Building2 size={24} style={{ margin: '0 auto 0.5rem', color: role === 'provider' ? 'var(--brand-primary)' : 'var(--text-muted)' }} />
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: role === 'provider' ? 'var(--brand-primary)' : 'var(--text-primary)' }}>Foundation</div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Full Name (Sign Up Only) */}
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: '2.25rem' }}
                />
                <User size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '2.25rem' }}
              />
              <Mail size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '2.25rem' }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
            </div>
          </div>

          {/* Foundation Specific Fields (Sign Up Only) */}
          {!isLogin && role === 'provider' && (
            <>
              <div className="form-group">
                <label className="form-label">Foundation / Org Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Apex Technology Foundation"
                    value={foundationName}
                    onChange={(e) => setFoundationName(e.target.value)}
                    style={{ paddingLeft: '2.25rem' }}
                  />
                  <Building2 size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Organization Website</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="url"
                    required
                    className="form-input"
                    placeholder="https://myfoundation.org"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    style={{ paddingLeft: '2.25rem' }}
                  />
                  <Globe size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Credentials Helper */}
        {isLogin && (
          <div style={{
            marginTop: '1.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8rem',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)'
          }}>
            <strong>Demo Accounts (Password: <code>password</code>):</strong>
            <ul style={{ marginTop: '0.25rem', paddingLeft: '1rem', listStyle: 'disc' }}>
              <li>Student: <code>student@grantbridge.com</code></li>
              <li>Provider: <code>provider@grantbridge.com</code></li>
              <li>Super Admin: <code>admin@grantbridge.com</code></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
