/* src/pages/provider/ManageApplicants.jsx */
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, FileText, CheckCircle, XCircle, AlertCircle, Download, ClipboardList } from 'lucide-react';

export default function ManageApplicants() {
  const { currentUser, grants, applications, updateApplicationStatus, users } = useApp();
  const [selectedApp, setSelectedApp] = useState(null);
  
  // --- Form States in Modal ---
  const [reviewStatus, setReviewStatus] = useState('');
  const [reviewFeedback, setReviewFeedback] = useState('');

  if (!currentUser) return null;

  // Filter grants owned by this provider
  const myGrants = grants.filter(g => g.providerId === currentUser.id);
  const myGrantIds = myGrants.map(g => g.id);

  // Filter applications submitted to this provider's grants
  const myApps = applications.filter(app => myGrantIds.includes(app.grantId));

  const handleOpenReview = (app) => {
    const student = users.find(u => u.id === app.studentId) || {};
    setSelectedApp({ app, student });
    setReviewStatus(app.status);
    setReviewFeedback(app.feedback || '');
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    updateApplicationStatus(selectedApp.app.id, reviewStatus, reviewFeedback);
    setSelectedApp(null);
  };

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
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Manage Applicants</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review academic credentials, read essays, and select award recipients.</p>
      </div>

      {myApps.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <Users size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1.25rem' }} />
          <h3>No Applicants Yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Once students apply to your scholarships, their matching profiles will show up here.
          </p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-header-bar">
            <h3 style={{ fontSize: '1.1rem' }}>Review Pipeline ({myApps.length} total)</h3>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Applied Scholarship</th>
                <th>GPA</th>
                <th>Major</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {myApps.map(app => {
                const grant = myGrants.find(g => g.id === app.grantId);
                return (
                  <tr key={app.id}>
                    <td>
                      <strong style={{ color: 'var(--text-primary)' }}>{app.studentName}</strong>
                    </td>
                    <td>{grant?.title || 'Unknown Grant'}</td>
                    <td style={{ fontWeight: 600 }}>{app.studentGPA}</td>
                    <td>{app.studentMajor}</td>
                    <td>{app.appliedDate}</td>
                    <td>{getStatusBadge(app.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => handleOpenReview(app)} 
                        className="btn btn-secondary btn-sm"
                      >
                        Review Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* --- Review Applicant Modal --- */}
      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>Review Application</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Submitted by {selectedApp.app.studentName}
                </span>
              </div>
              <button className="btn btn-text" onClick={() => setSelectedApp(null)}>&times;</button>
            </div>

            <form onSubmit={handleSaveReview}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Applicant Profile Details */}
                <div>
                  <h4 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.375rem', marginBottom: '0.75rem' }}>
                    Student Profile
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>GPA</span>
                      <strong style={{ fontSize: '1rem' }}>{selectedApp.student.gpa || selectedApp.app.studentGPA}</strong>
                    </div>
                    <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>MAJOR</span>
                      <strong style={{ fontSize: '1rem' }}>{selectedApp.student.major || selectedApp.app.studentMajor}</strong>
                    </div>
                    <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>EDUCATION LEVEL</span>
                      <strong style={{ fontSize: '1rem' }}>{selectedApp.student.education || 'Undergraduate'}</strong>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '1rem' }}>
                    "{selectedApp.student.bio || 'No bio provided.'}"
                  </p>

                  {/* Student Documents */}
                  <h5 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Uploaded Attachments:</h5>
                  {(!selectedApp.student.documents || selectedApp.student.documents.length === 0) ? (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No documents uploaded.</span>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {selectedApp.student.documents.map(doc => (
                        <div key={doc.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.4rem 0.8rem',
                          backgroundColor: 'var(--bg-tertiary)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.8rem',
                          border: '1px solid var(--border-color)'
                        }}>
                          <FileText size={14} style={{ color: 'var(--brand-primary)' }} />
                          <span>{doc.name}</span>
                          <a href="#" onClick={(e) => { e.preventDefault(); alert(`Simulated downloading: ${doc.name}`); }} style={{ display: 'flex', marginLeft: '0.5rem', color: 'var(--brand-secondary)' }} title="Download">
                            <Download size={12} />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom Answers */}
                <div>
                  <h4 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.375rem', marginBottom: '0.75rem' }}>
                    Application Essay Answers
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                        Why do you deserve this scholarship?
                      </strong>
                      <p style={{ fontSize: '0.9rem', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', lineHeight: 1.5 }}>
                        {selectedApp.app.answers.whyDeserve}
                      </p>
                    </div>

                    <div>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                        What are your long-term career aspirations?
                      </strong>
                      <p style={{ fontSize: '0.9rem', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', lineHeight: 1.5 }}>
                        {selectedApp.app.answers.futureGoals}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review Panel */}
                <div style={{
                  backgroundColor: 'var(--bg-primary)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <h4 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ClipboardList size={18} style={{ color: 'var(--brand-primary)' }} />
                    <span>Decision & Feedback</span>
                  </h4>

                  <div className="form-group">
                    <label className="form-label">Review Status</label>
                    <select
                      className="form-select"
                      value={reviewStatus}
                      onChange={(e) => setReviewStatus(e.target.value)}
                    >
                      <option value="Applied">Applied (Under Review)</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Approved">Approve & Award Grant</option>
                      <option value="Rejected">Reject Application</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Feedback Notes (Visible to Student)</label>
                    <textarea
                      rows="3"
                      className="form-textarea"
                      placeholder="Add reviewer comments, interview scheduling notes, or reasons for approval/rejection..."
                      value={reviewFeedback}
                      onChange={(e) => setReviewFeedback(e.target.value)}
                    />
                  </div>
                </div>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedApp(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Review Decision</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
