/* src/pages/student/StudentApplications.jsx */
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Calendar, DollarSign, Eye, Award, CheckCircle2, Clock, XCircle, ChevronRight } from 'lucide-react';

export default function StudentApplications() {
  const { currentUser, applications, grants } = useApp();
  const [selectedApp, setSelectedApp] = useState(null);

  if (!currentUser) return null;

  // Filter applications for this student
  const myApps = applications.filter(app => app.studentId === currentUser.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applied':
        return <span className="badge badge-info">Applied</span>;
      case 'Shortlisted':
        return <span className="badge badge-warning">Shortlisted</span>;
      case 'Approved':
        return <span className="badge badge-success">Approved</span>;
      case 'Rejected':
        return <span className="badge badge-danger">Rejected</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>My Applications</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track the real-time review status of your submitted applications.</p>
      </div>

      {myApps.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <FileText size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1.25rem' }} />
          <h3>No Applications Yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            You haven't applied for any scholarships. Head over to the browse page to find opportunities.
          </p>
          <a href="/grants" className="btn btn-primary" style={{ width: 'fit-content', margin: '0 auto' }}>Browse Grants</a>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-header-bar">
            <h3 style={{ fontSize: '1.1rem' }}>Submitted Applications ({myApps.length})</h3>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Scholarship / Grant</th>
                <th>Provider</th>
                <th>Applied Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {myApps.map(app => {
                const grant = grants.find(g => g.id === app.grantId);
                return (
                  <tr key={app.id}>
                    <td>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{grant?.title || 'Unknown Grant'}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: #{app.id}</span>
                    </td>
                    <td>{grant?.providerName || 'N/A'}</td>
                    <td>{app.appliedDate}</td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-success)' }}>
                      ${grant?.amount.toLocaleString() || '0'}
                    </td>
                    <td>{getStatusBadge(app.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => setSelectedApp({ app, grant })}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <Eye size={14} />
                        <span>Track Status</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* --- Detailed Tracking Modal --- */}
      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>Application Status Tracking</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedApp.grant?.title}</span>
              </div>
              <button className="btn btn-text" onClick={() => setSelectedApp(null)}>&times;</button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Timeline Tracker */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.5rem 0' }}>
                <h4 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Review Progress</h4>
                
                <div className="timeline">
                  {/* Step 1: Applied */}
                  <div className="timeline-item success">
                    <div className="timeline-marker" />
                    <div className="timeline-title">Application Submitted</div>
                    <div className="timeline-desc">Your application was received on {selectedApp.app.appliedDate}.</div>
                  </div>

                  {/* Step 2: Under Review */}
                  <div className={`timeline-item ${selectedApp.app.status !== 'Applied' ? 'success' : 'active'}`}>
                    <div className="timeline-marker" />
                    <div className="timeline-title">Under Review</div>
                    <div className="timeline-desc">
                      {selectedApp.app.status === 'Applied' 
                        ? 'The provider is currently reviewing applicant profiles.' 
                        : 'The foundation has reviewed your application details.'}
                    </div>
                  </div>

                  {/* Step 3: Shortlist (Conditional) */}
                  {(selectedApp.app.status === 'Shortlisted' || selectedApp.app.status === 'Approved' || selectedApp.app.status === 'Rejected') && (
                    <div className={`timeline-item ${selectedApp.app.status === 'Approved' || selectedApp.app.status === 'Rejected' || selectedApp.app.status === 'Shortlisted' ? 'success' : 'active'}`}>
                      <div className="timeline-marker" />
                      <div className="timeline-title">Shortlisted for Final Review</div>
                      <div className="timeline-desc">Congratulations! You were shortlisted for the final selection round.</div>
                    </div>
                  )}

                  {/* Step 4: Decision */}
                  <div className={`timeline-item ${selectedApp.app.status === 'Approved' ? 'success' : selectedApp.app.status === 'Rejected' ? 'timeline-item active' : ''}`} style={{ paddingBottom: 0 }}>
                    <div className="timeline-marker" style={{
                      backgroundColor: selectedApp.app.status === 'Approved' ? 'var(--accent-success)' : selectedApp.app.status === 'Rejected' ? 'var(--accent-danger)' : 'var(--border-color)'
                    }} />
                    <div className="timeline-title">Final Decision</div>
                    <div className="timeline-desc">
                      {selectedApp.app.status === 'Approved' && (
                        <strong style={{ color: 'var(--accent-success)' }}>Approved & Awarded!</strong>
                      )}
                      {selectedApp.app.status === 'Rejected' && (
                        <strong style={{ color: 'var(--accent-danger)' }}>Not Selected</strong>
                      )}
                      {selectedApp.app.status !== 'Approved' && selectedApp.app.status !== 'Rejected' && (
                        <span>Pending final decision.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Congratulatory Alert or Rejection note */}
              {selectedApp.app.status === 'Approved' && (
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--accent-success-light)',
                  borderLeft: '4px solid var(--accent-success)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent-success-dark)',
                  display: 'flex',
                  gap: '0.75rem'
                }}>
                  <CheckCircle2 size={24} style={{ flexShrink: 0 }} />
                  <div>
                    <h5 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Congratulations!</h5>
                    <p style={{ fontSize: '0.85rem' }}>
                      Your application has been approved. The foundation will disburse the award of <strong>${selectedApp.grant?.amount.toLocaleString()}</strong> to your registrar office. Check your email for paperwork instructions.
                    </p>
                  </div>
                </div>
              )}

              {/* Feedback from Provider */}
              {selectedApp.app.feedback && (
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px dashed var(--border-color)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <h5 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Feedback from Foundation:</h5>
                  <blockquote style={{
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    borderLeft: '3px solid var(--brand-primary)',
                    paddingLeft: '0.75rem',
                    margin: 0
                  }}>
                    "{selectedApp.app.feedback}"
                  </blockquote>
                </div>
              )}

              {/* Submitted Answers */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Submitted Answers</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      Why do you deserve this scholarship?
                    </strong>
                    <p style={{ fontSize: '0.9rem', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                      {selectedApp.app.answers.whyDeserve}
                    </p>
                  </div>
                  
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      What are your long-term career aspirations?
                    </strong>
                    <p style={{ fontSize: '0.9rem', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                      {selectedApp.app.answers.futureGoals}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedApp(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
