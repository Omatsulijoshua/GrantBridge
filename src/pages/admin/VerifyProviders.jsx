/* src/pages/admin/VerifyProviders.jsx */
import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, XCircle, Building, ExternalLink } from 'lucide-react';

export default function VerifyProviders() {
  const { users, verifyProvider } = useApp();

  // Filter only foundation providers
  const providers = users.filter(u => u.role === 'provider');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Verify Scholarship Foundations</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review organization credentials, website legitimacy, and approve provider verification status.</p>
      </div>

      <div className="table-container">
        <div className="table-header-bar">
          <h3 style={{ fontSize: '1.1rem' }}>Foundation Verification Queue ({providers.length})</h3>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Foundation Name</th>
              <th>Representative</th>
              <th>Contact Phone</th>
              <th>Website</th>
              <th>Verification Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {providers.map(provider => (
              <tr key={provider.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="avatar" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                      <Building size={18} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{provider.foundationName}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered: June 2026</span>
                    </div>
                  </div>
                </td>
                <td>{provider.name}</td>
                <td>{provider.phone || 'N/A'}</td>
                <td>
                  {provider.website ? (
                    <a 
                      href={provider.website} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}
                    >
                      <span>Visit Site</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : 'N/A'}
                </td>
                <td>
                  {provider.verified ? (
                    <span className="badge badge-success">Verified</span>
                  ) : (
                    <span className="badge badge-warning">Unverified</span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {provider.verified ? (
                    <button 
                      onClick={() => verifyProvider(provider.id, false)} 
                      className="btn btn-outline btn-sm"
                      style={{ color: 'var(--accent-danger)' }}
                    >
                      <XCircle size={14} />
                      <span>Revoke</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => verifyProvider(provider.id, true)} 
                      className="btn btn-success btn-sm"
                    >
                      <CheckCircle size={14} />
                      <span>Verify Foundation</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
