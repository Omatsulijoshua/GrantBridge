/* src/pages/student/StudentDashboard.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Award, Bookmark, FileText, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';

export default function StudentDashboard() {
  const { currentUser, grants, applications } = useApp();

  if (!currentUser) return null;

  // Calculate statistics
  const savedCount = currentUser.savedGrants?.length || 0;
  const myApps = applications.filter(app => app.studentId === currentUser.id);
  const appliedCount = myApps.length;

  // Calculate matched grants
  const matchedGrants = grants.filter(grant => {
    if (grant.status !== 'Approved') return false;
    
    // Simple matching criteria
    if (!currentUser.profileCompleted) return false;
    
    const studentGpa = parseFloat(currentUser.gpa || 0);
    const minGpa = parseFloat(grant.eligibility.minGPA || 0);
    if (studentGpa < minGpa) return false;

    if (grant.eligibility.education && grant.eligibility.education !== 'Any') {
      if (currentUser.education.toLowerCase() !== grant.eligibility.education.toLowerCase()) return false;
    }

    return true;
  });

  // Calculate profile completion percentage
  const calculateProfileProgress = () => {
    let fields = ['name', 'phone', 'gpa', 'education', 'major', 'financialNeed', 'bio'];
    let filled = fields.filter(f => currentUser[f] && currentUser[f] !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  const profileProgress = calculateProfileProgress();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-primary-light) 0%, rgba(99, 102, 241, 0.02) 100%)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Welcome, {currentUser.name}!</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track your applications, manage matches, and secure your educational funding.</p>
        </div>

        {/* Profile Completion Widget */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '250px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
            <span>Profile Completion</span>
            <span>{profileProgress}%</span>
          </div>
          <div style={{ height: '8px', backgroundColor: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${profileProgress}%`, backgroundColor: profileProgress === 100 ? 'var(--accent-success)' : 'var(--brand-primary)', transition: 'width 0.5s ease' }} />
          </div>
          {profileProgress < 100 && (
            <Link to="/dashboard/profile" style={{ fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>Complete Profile</span>
              <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Applications</span>
            <span className="stat-value">{appliedCount}</span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}>
            <FileText size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Saved Grants</span>
            <span className="stat-value">{savedCount}</span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-warning-light)', color: 'var(--accent-warning)' }}>
            <Bookmark size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Matched Grants</span>
            <span className="stat-value">{matchedGrants.length}</span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-success-light)', color: 'var(--accent-success)' }}>
            <Award size={24} />
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout Split */}
      <div className="dashboard-grid">
        {/* Left: Matched Opportunities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Recommended Matched Grants</h3>
            <Link to="/grants" className="btn btn-text btn-sm" style={{ fontWeight: 700 }}>Browse All</Link>
          </div>

          {!currentUser.profileCompleted ? (
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
              <AlertTriangle size={36} style={{ color: 'var(--accent-warning)', margin: '0 auto 1rem' }} />
              <h4>Complete Your Profile</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
                Fill out your academic details (GPA, major, and education level) to enable smart matching.
              </p>
              <Link to="/dashboard/profile" className="btn btn-primary btn-sm">Complete Profile</Link>
            </div>
          ) : matchedGrants.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
              <Award size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
              <h4>No Exact Matches Found</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Try updating your profile details, or browse all opportunities directly.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {matchedGrants.slice(0, 3).map(grant => (
                <div key={grant.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span className="badge badge-primary">{grant.category}</span>
                      <span className="badge badge-success">High Match</span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem' }}>{grant.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>By {grant.providerName}</p>
                  </div>
                  
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-success)' }}>
                      ${grant.amount.toLocaleString()}
                    </span>
                    <Link to={`/grants?id=${grant.id}`} className="btn btn-secondary btn-sm">
                      View & Apply
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Saved Opportunities Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Saved Opportunities</h3>

          {savedCount === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-secondary)' }}>
              <Bookmark size={28} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem' }} />
              <p style={{ fontSize: '0.85rem' }}>Saved scholarships will appear here for quick access.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentUser.savedGrants.map(grantId => {
                const grant = grants.find(g => g.id === grantId);
                if (!grant) return null;
                return (
                  <div key={grant.id} className="card" style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }} className="text-gradient">{grant.category}</h4>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--accent-success)' }}>${grant.amount.toLocaleString()}</strong>
                    </div>
                    <h5 style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>{grant.title}</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due: {grant.deadline}</span>
                      <Link to={`/grants?id=${grant.id}`} style={{ fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span>Apply</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
