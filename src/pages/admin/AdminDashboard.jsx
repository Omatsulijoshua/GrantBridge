/* src/pages/admin/AdminDashboard.jsx */
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, Building2, Award, FileText, Check, X, PlusCircle, Trash2, ShieldAlert 
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    users, grants, applications, categories, 
    approveGrant, rejectGrant, addCategory, deleteCategory 
  } = useApp();

  const [newCat, setNewCat] = useState('');

  // --- Calculations ---
  const studentCount = users.filter(u => u.role === 'student').length;
  const providerCount = users.filter(u => u.role === 'provider').length;
  const verifiedProviders = users.filter(u => u.role === 'provider' && u.verified).length;
  
  const pendingGrants = grants.filter(g => g.status === 'Pending');
  const activeGrantsCount = grants.filter(g => g.status === 'Approved').length;

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    addCategory(newCat.trim());
    setNewCat('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Super Admin Control Panel</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitor platform activity, approve new scholarship listings, and manage global settings.</p>
      </div>

      {/* Admin Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Students</span>
            <span className="stat-value">{studentCount}</span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}>
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Verified Foundations</span>
            <span className="stat-value">{verifiedProviders} / {providerCount}</span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-success-light)', color: 'var(--accent-success)' }}>
            <Building2 size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Pending Approval</span>
            <span className="stat-value" style={{ color: pendingGrants.length > 0 ? 'var(--accent-warning)' : 'var(--text-primary)' }}>
              {pendingGrants.length}
            </span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-warning-light)', color: 'var(--accent-warning)' }}>
            <ShieldAlert size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Applications</span>
            <span className="stat-value">{applications.length}</span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-info-light)', color: 'var(--accent-info)' }}>
            <FileText size={24} />
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="dashboard-grid">
        
        {/* Left: Pending Grants Review Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Grants Awaiting Approval ({pendingGrants.length})</h3>

          {pendingGrants.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-secondary)' }}>
              <Check size={36} style={{ color: 'var(--accent-success)', marginBottom: '0.75rem', margin: '0 auto 0.75rem' }} />
              <h4>Inbox Cleared!</h4>
              <p style={{ fontSize: '0.9rem' }}>All submitted scholarships have been reviewed and approved.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingGrants.map(grant => (
                <div key={grant.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="badge badge-warning" style={{ marginBottom: '0.25rem' }}>{grant.category}</span>
                      <h4 style={{ fontSize: '1.15rem' }}>{grant.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Posted by: <strong>{grant.providerName}</strong></span>
                    </div>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--accent-success)' }}>
                      ${grant.amount.toLocaleString()}
                    </strong>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {grant.description}
                  </p>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <strong>Eligibility:</strong> GPA &ge; {grant.eligibility.minGPA || 'None'} &bull; Education: {grant.eligibility.education} &bull; Major: {grant.eligibility.major}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <button onClick={() => rejectGrant(grant.id)} className="btn btn-outline btn-sm" style={{ color: 'var(--accent-danger)' }}>
                      <X size={14} />
                      <span>Reject</span>
                    </button>
                    <button onClick={() => approveGrant(grant.id)} className="btn btn-success btn-sm">
                      <Check size={14} />
                      <span>Approve & Publish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Category Manager */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Grant Categories</h3>

          <div className="card" style={{ padding: '1.5rem' }}>
            {/* Add Category Form */}
            <form onSubmit={handleAddCategorySubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                required
                className="form-input"
                placeholder="New Category..."
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
              />
              <button type="submit" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center' }}>
                <PlusCircle size={16} />
              </button>
            </form>

            {/* Category List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
              {categories.map(cat => (
                <div key={cat} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)'
                }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{cat}</span>
                  <button 
                    type="button" 
                    className="btn btn-text" 
                    onClick={() => deleteCategory(cat)}
                    style={{ padding: '0.1rem', color: 'var(--accent-danger)' }}
                    title="Delete Category"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
