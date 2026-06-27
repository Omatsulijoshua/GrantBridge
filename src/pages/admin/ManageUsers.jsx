/* src/pages/admin/ManageUsers.jsx */
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, ShieldCheck, UserMinus, UserPlus, Search } from 'lucide-react';

export default function ManageUsers() {
  const { users, toggleUserBlock, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredUsers = users.filter(u => {
    // Prevent blocking oneself
    if (u.id === currentUser?.id) return false;

    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.foundationName && u.foundationName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'All' || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>User Account Management</h1>
        <p style={{ color: 'var(--text-secondary)' }}>View details, audit roles, and temporarily block or unblock user accounts.</p>
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
                placeholder="Search user name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2.25rem', fontSize: '0.9rem' }}
              />
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
            </div>

            {/* Role Filter */}
            <select
              className="form-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{ width: '180px', fontSize: '0.9rem' }}
            >
              <option value="All">All Roles</option>
              <option value="student">Students</option>
              <option value="provider">Foundations</option>
              <option value="admin">Administrators</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>User Details</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Specifics</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                      {user.avatar}
                    </div>
                    <strong style={{ color: 'var(--text-primary)' }}>{user.name}</strong>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span style={{ textTransform: 'capitalize' }} className={`badge ${
                    user.role === 'admin' ? 'badge-primary' : 
                    user.role === 'provider' ? 'badge-info' : 'badge-success'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.role === 'provider' && (
                    <span style={{ fontSize: '0.85rem' }}>{user.foundationName}</span>
                  )}
                  {user.role === 'student' && (
                    <span style={{ fontSize: '0.85rem' }}>GPA: {user.gpa || 'N/A'} &bull; {user.major || 'No Major'}</span>
                  )}
                  {user.role === 'admin' && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>System Staff</span>
                  )}
                </td>
                <td>
                  {user.blocked ? (
                    <span className="badge badge-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ShieldAlert size={12} />
                      <span>Suspended</span>
                    </span>
                  ) : (
                    <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ShieldCheck size={12} />
                      <span>Active</span>
                    </span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {user.blocked ? (
                    <button 
                      onClick={() => toggleUserBlock(user.id)} 
                      className="btn btn-outline btn-sm"
                      style={{ color: 'var(--accent-success)', borderColor: 'var(--accent-success)' }}
                    >
                      <UserPlus size={14} />
                      <span>Unblock</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => toggleUserBlock(user.id)} 
                      className="btn btn-outline btn-sm"
                      style={{ color: 'var(--accent-danger)', borderColor: 'var(--accent-danger)' }}
                    >
                      <UserMinus size={14} />
                      <span>Suspend</span>
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
