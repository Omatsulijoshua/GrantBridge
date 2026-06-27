/* src/pages/provider/ProviderDashboard.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Building2, Users, DollarSign, Award, ArrowRight, CheckCircle, Clock, ShieldAlert 
} from 'lucide-react';

export default function ProviderDashboard() {
  const { currentUser, grants, applications } = useApp();

  if (!currentUser) return null;

  // Filter grants owned by this provider
  const myGrants = grants.filter(g => g.providerId === currentUser.id);
  const activeGrants = myGrants.filter(g => g.status === 'Approved');

  // Filter applications submitted to this provider's grants
  const myGrantIds = myGrants.map(g => g.id);
  const myApps = applications.filter(app => myGrantIds.includes(app.grantId));

  // Analytics Calculations
  const totalApplicants = myApps.length;
  const approvedApps = myApps.filter(app => app.status === 'Approved');
  const successRate = totalApplicants > 0 ? Math.round((approvedApps.length / totalApplicants) * 100) : 0;
  
  const totalDisbursed = approvedApps.reduce((acc, app) => {
    const grant = myGrants.find(g => g.id === app.grantId);
    return acc + (grant ? grant.amount : 0);
  }, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Verification Notice */}
      {!currentUser.verified && (
        <div style={{
          padding: '1.25rem',
          backgroundColor: 'var(--accent-warning-light)',
          borderLeft: '4px solid var(--accent-warning)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--accent-warning-dark)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          <ShieldAlert size={24} style={{ flexShrink: 0 }} />
          <div>
            <h5 style={{ fontWeight: 700 }}>Foundation Pending Verification</h5>
            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Your account is currently undergoing verification by our administrators. You can still post grants, but they will remain in a <strong>Pending</strong> state and will not be visible to students until your foundation is verified.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{currentUser.foundationName} Portal</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your active scholarships, review applicant matching scores, and approve awards.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Active Listings</span>
            <span className="stat-value">{activeGrants.length}</span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}>
            <Award size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Applicants</span>
            <span className="stat-value">{totalApplicants}</span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-info-light)', color: 'var(--accent-info)' }}>
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Approval Rate</span>
            <span className="stat-value">{successRate}%</span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-success-light)', color: 'var(--accent-success)' }}>
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Disbursed Funds</span>
            <span className="stat-value">${totalDisbursed.toLocaleString()}</span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-warning-light)', color: 'var(--accent-warning)' }}>
            <DollarSign size={24} />
          </div>
        </div>
      </div>

      {/* Split dashboard layout */}
      <div className="dashboard-grid">
        
        {/* Left: Recent Applicants */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Recent Applicants</h3>
            <Link to="/provider/applicants" className="btn btn-text btn-sm" style={{ fontWeight: 700 }}>Manage All</Link>
          </div>

          {myApps.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-secondary)' }}>
              <Users size={32} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
              <p>No applications received yet. They will appear here once students apply.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {myApps.slice(0, 4).map(app => {
                const grant = myGrants.find(g => g.id === app.grantId);
                return (
                  <div key={app.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{app.studentName}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Applied for <strong>{grant?.title}</strong> &bull; GPA: {app.studentGPA}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className={`badge ${
                        app.status === 'Approved' ? 'badge-success' : 
                        app.status === 'Shortlisted' ? 'badge-warning' : 
                        app.status === 'Rejected' ? 'badge-danger' : 'badge-info'
                      }`}>
                        {app.status}
                      </span>
                      <Link to="/provider/applicants" className="btn btn-secondary btn-sm">
                        Review
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Active Scholarship Listings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Scholarships ({myGrants.length})</h3>
            <Link to="/provider/create" className="btn btn-outline btn-sm">Post New</Link>
          </div>

          {myGrants.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-secondary)' }}>
              <Award size={28} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
              <p style={{ fontSize: '0.85rem' }}>You haven't posted any opportunities yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {myGrants.map(grant => (
                <div key={grant.id} className="card" style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }} className="text-gradient">{grant.category}</h4>
                    <span className={`badge ${grant.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                      {grant.status}
                    </span>
                  </div>
                  <h5 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{grant.title}</h5>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>Amount: <strong>${grant.amount.toLocaleString()}</strong></span>
                    <span>Views: {grant.views}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
