/* src/pages/admin/ManageGrants.jsx */
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Check, X, Search } from 'lucide-react';

export default function ManageGrants() {
  const { grants, approveGrant, rejectGrant } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredGrants = grants.filter(g => {
    const matchesSearch = 
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      g.providerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || g.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="badge badge-success">Approved</span>;
      case 'Pending':
        return <span className="badge badge-warning">Pending</span>;
      case 'Rejected':
        return <span className="badge badge-danger">Rejected</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Scholarship & Grant Directory</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Audit all posted opportunities, review requirements, and toggle approval status.</p>
      </div>

      <div className="table-container">
        {/* Table Filters */}
        <div className="table-header-bar">
          <div style={{ display: 'flex', gap: '1rem', width: '100%', flexWrap: 'wrap' }}>
            
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search grant title or provider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2.25rem', fontSize: '0.9rem' }}
              />
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
            </div>

            {/* Status Filter */}
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '180px', fontSize: '0.9rem' }}
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Grants Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Scholarship Opportunity</th>
              <th>Provider / Foundation</th>
              <th>Category</th>
              <th>Award Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrants.map(grant => (
              <tr key={grant.id}>
                <td>
                  <strong style={{ color: 'var(--text-primary)' }}>{grant.title}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Deadline: {grant.deadline}</span>
                </td>
                <td>{grant.providerName}</td>
                <td>
                  <span className="badge badge-primary">{grant.category}</span>
                </td>
                <td style={{ fontWeight: 700, color: 'var(--accent-success)' }}>
                  ${grant.amount.toLocaleString()}
                </td>
                <td>{getStatusBadge(grant.status)}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    {grant.status !== 'Approved' && (
                      <button 
                        onClick={() => approveGrant(grant.id)} 
                        className="btn btn-success btn-sm"
                        title="Approve and Publish"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    {grant.status !== 'Rejected' && (
                      <button 
                        onClick={() => rejectGrant(grant.id)} 
                        className="btn btn-outline btn-sm"
                        style={{ color: 'var(--accent-danger)', borderColor: 'var(--accent-danger)' }}
                        title="Reject / Take Down"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
