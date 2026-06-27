/* src/pages/public/BrowseGrants.jsx */
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Calendar, Award, CheckCircle, FileText, Upload, AlertCircle } from 'lucide-react';

export default function BrowseGrants() {
  const { grants, categories, currentUser, applyForGrant, toggleSaveGrant } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // --- Filter States ---
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minAmount, setMinAmount] = useState('All');
  const [educationLevel, setEducationLevel] = useState('All');
  const [gpaFilter, setGpaFilter] = useState('');

  // --- Modal States ---
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // --- Application Form States ---
  const [whyDeserve, setWhyDeserve] = useState('');
  const [futureGoals, setFutureGoals] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deep Link Detail Modal (if ?id=X is in URL)
  useEffect(() => {
    const grantId = searchParams.get('id');
    if (grantId) {
      const grant = grants.find(g => g.id === parseInt(grantId));
      if (grant && grant.status === 'Approved') {
        setSelectedGrant(grant);
      }
    }
  }, [searchParams, grants]);

  // --- Match Score Calculator (for Students) ---
  const calculateMatchScore = (grant) => {
    if (!currentUser || currentUser.role !== 'student' || !currentUser.profileCompleted) {
      return null;
    }

    let score = 100;
    let deductions = 0;

    // 1. GPA check
    if (grant.eligibility.minGPA) {
      const studentGpa = parseFloat(currentUser.gpa);
      const reqGpa = parseFloat(grant.eligibility.minGPA);
      if (studentGpa < reqGpa) {
        deductions += 35;
      }
    }

    // 2. Education level check
    if (grant.eligibility.education && grant.eligibility.education !== 'Any') {
      if (currentUser.education.toLowerCase() !== grant.eligibility.education.toLowerCase()) {
        deductions += 35;
      }
    }

    // 3. Major check
    if (grant.eligibility.major && grant.eligibility.major !== 'Any') {
      const majorMatches = currentUser.major.toLowerCase().includes(grant.eligibility.major.toLowerCase()) || 
                           grant.eligibility.major.toLowerCase().includes(currentUser.major.toLowerCase());
      if (!majorMatches) {
        deductions += 30;
      }
    }

    return Math.max(0, score - deductions);
  };

  // --- Filter Logic ---
  const filteredGrants = grants.filter(grant => {
    // Only show Approved grants in browse page
    if (grant.status !== 'Approved') return false;

    // Search query check
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      grant.title.toLowerCase().includes(query) ||
      grant.description.toLowerCase().includes(query) ||
      grant.providerName.toLowerCase().includes(query);

    // Category check
    const matchesCategory = selectedCategory === 'All' || grant.category === selectedCategory;

    // Amount check
    let matchesAmount = true;
    if (minAmount !== 'All') {
      const val = parseInt(minAmount);
      if (val === 10000) matchesAmount = grant.amount >= 10000;
      else if (val === 5000) matchesAmount = grant.amount >= 5000 && grant.amount < 10000;
      else if (val === 0) matchesAmount = grant.amount < 5000;
    }

    // Education check
    const matchesEducation = 
      educationLevel === 'All' || 
      grant.eligibility.education === 'Any' ||
      grant.eligibility.education.toLowerCase().includes(educationLevel.toLowerCase());

    // GPA check
    let matchesGpa = true;
    if (gpaFilter) {
      const filterVal = parseFloat(gpaFilter);
      if (grant.eligibility.minGPA) {
        matchesGpa = parseFloat(grant.eligibility.minGPA) <= filterVal;
      }
    }

    return matchesSearch && matchesCategory && matchesAmount && matchesEducation && matchesGpa;
  });

  // --- Application Submit Handler ---
  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);

    // Simulate small network delay
    setTimeout(() => {
      const success = applyForGrant(selectedGrant.id, { whyDeserve, futureGoals }, uploadedFiles);
      setIsSubmitting(false);
      if (success) {
        setShowApplyModal(false);
        setWhyDeserve('');
        setFutureGoals('');
        setUploadedFiles([]);
        setSelectedGrant(null);
      }
    }, 1000);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeUploadedFile = (idx) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '90vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Browse Scholarships</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Find and apply for funding programs tailored to your profile.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Filters Sidebar */}
        <div className="glass-panel" style={{
          flex: '1 1 280px',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          position: 'sticky',
          top: '90px',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <Filter size={18} style={{ color: 'var(--brand-primary)' }} />
            <h3 style={{ fontSize: '1.1rem' }}>Search Filters</h3>
          </div>

          {/* Search Input */}
          <div className="form-group">
            <label className="form-label">Keywords</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.25rem' }}
              />
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
            </div>
          </div>

          {/* Category Filter */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Amount Filter */}
          <div className="form-group">
            <label className="form-label">Funding Amount</label>
            <select
              className="form-select"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            >
              <option value="All">Any Amount</option>
              <option value="10000">$10,000 +</option>
              <option value="5000">$5,000 - $10,000</option>
              <option value="0">Under $5,000</option>
            </select>
          </div>

          {/* Education Level */}
          <div className="form-group">
            <label className="form-label">Education Level</label>
            <select
              className="form-select"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          {/* GPA Eligibility */}
          <div className="form-group">
            <label className="form-label">Your GPA (Filter eligible)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="4.0"
              placeholder="e.g. 3.5"
              className="form-input"
              value={gpaFilter}
              onChange={(e) => setGpaFilter(e.target.value)}
            />
          </div>

          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setMinAmount('All');
              setEducationLevel('All');
              setGpaFilter('');
            }}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Clear All Filters
          </button>
        </div>

        {/* Opportunities List */}
        <div style={{ flex: '3 1 600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{filteredGrants.length}</strong> opportunities
            </span>
          </div>

          {filteredGrants.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <AlertCircle size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
              <h3>No Scholarships Found</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Try adjusting your filters or search keywords.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {filteredGrants.map(grant => {
                const matchScore = calculateMatchScore(grant);
                const isSaved = currentUser?.savedGrants?.includes(grant.id);

                return (
                  <div key={grant.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <span className="badge badge-primary" style={{ marginRight: '0.5rem' }}>{grant.category}</span>
                        {matchScore !== null && (
                          <span className={`badge ${matchScore >= 70 ? 'badge-success' : 'badge-warning'}`}>
                            {matchScore}% Match
                          </span>
                        )}
                        {currentUser?.role === 'student' && !currentUser.profileCompleted && (
                          <Link to="/dashboard/profile" className="badge badge-info" style={{ textDecoration: 'underline' }}>
                            Complete profile to see match %
                          </Link>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 850, color: 'var(--accent-success)' }}>
                          ${grant.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.35rem', cursor: 'pointer' }} onClick={() => setSelectedGrant(grant)}>
                        {grant.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Posted by <strong>{grant.providerName}</strong>
                      </p>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      {grant.description.substring(0, 200)}...
                    </p>

                    <div className="card-footer" style={{ marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Calendar size={14} />
                          Deadline: <strong>{grant.deadline}</strong>
                        </span>
                        <span>
                          GPA Req: <strong>{grant.eligibility.minGPA || 'None'}</strong>
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {currentUser?.role === 'student' && (
                          <button 
                            className={`btn ${isSaved ? 'btn-secondary' : 'btn-outline'} btn-sm`}
                            onClick={() => toggleSaveGrant(grant.id)}
                          >
                            {isSaved ? 'Saved' : 'Save'}
                          </button>
                        )}
                        <button className="btn btn-primary btn-sm" onClick={() => setSelectedGrant(grant)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* --- Opportunity Details Modal --- */}
      {selectedGrant && (
        <div className="modal-overlay" onClick={() => setSelectedGrant(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <div>
                <span className="badge badge-primary">{selectedGrant.category}</span>
                <h2 style={{ marginTop: '0.5rem', fontSize: '1.5rem' }}>{selectedGrant.title}</h2>
              </div>
              <button className="btn btn-text" onClick={() => setSelectedGrant(null)}>&times;</button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Top Meta Details */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>FUNDING AMOUNT</span>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--accent-success)' }}>${selectedGrant.amount.toLocaleString()}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>APPLICATION DEADLINE</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{selectedGrant.deadline}</strong>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Program Description</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {selectedGrant.description}
                </p>
              </div>

              {/* Eligibility Criteria */}
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Eligibility Requirements</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                  <li>GPA: <strong>{selectedGrant.eligibility.minGPA ? `Minimum ${selectedGrant.eligibility.minGPA}` : 'No GPA requirement'}</strong></li>
                  <li>Education Level: <strong>{selectedGrant.eligibility.education || 'Any'}</strong></li>
                  <li>Academic Major: <strong>{selectedGrant.eligibility.major || 'Any'}</strong></li>
                  {selectedGrant.eligibility.other && (
                    <li>Other criteria: <span>{selectedGrant.eligibility.other}</span></li>
                  )}
                </ul>
              </div>

              {/* Provider Information */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Provider Details</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  This grant is offered by <strong>{selectedGrant.providerName}</strong>. 
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedGrant(null)}>Close</button>
              
              {/* Action Button based on auth state */}
              {!currentUser ? (
                <Link to="/auth" className="btn btn-primary">
                  Sign In to Apply
                </Link>
              ) : currentUser.role === 'student' ? (
                <button 
                  className="btn btn-primary" 
                  onClick={() => setShowApplyModal(true)}
                >
                  Apply Now
                </button>
              ) : (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                  Logged in as {currentUser.role}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- Application Submission Modal --- */}
      {showApplyModal && selectedGrant && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>Apply for Scholarship</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedGrant.title}</span>
              </div>
              <button className="btn btn-text" onClick={() => setShowApplyModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleApplySubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--brand-primary-light)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Award size={16} style={{ color: 'var(--brand-primary)' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                    Profile details (GPA, Major) will be submitted automatically.
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Why do you deserve this scholarship? *</label>
                  <textarea
                    required
                    className="form-textarea"
                    placeholder="Describe your academic goals, financial need, and how this scholarship will impact you..."
                    value={whyDeserve}
                    onChange={(e) => setWhyDeserve(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">What are your long-term career aspirations? *</label>
                  <textarea
                    required
                    className="form-textarea"
                    placeholder="Describe where you see yourself in 5-10 years..."
                    value={futureGoals}
                    onChange={(e) => setFutureGoals(e.target.value)}
                  />
                </div>

                {/* Simulated Document Upload */}
                <div className="form-group">
                  <label className="form-label">Additional Documents (Optional)</label>
                  <div className="upload-zone" style={{ padding: '1.5rem 1rem' }}>
                    <input
                      type="file"
                      id="grant-apply-files"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="grant-apply-files" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Upload size={24} className="upload-icon" />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Click to upload files</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Resume, transcripts, or recommendation letters</span>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                            <FileText size={16} style={{ color: 'var(--brand-primary)' }} />
                            <span style={{ fontSize: '0.85rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              {file.name}
                            </span>
                          </div>
                          <button type="button" className="btn btn-text" onClick={() => removeUploadedFile(idx)} style={{ padding: '0 0.25rem', color: 'var(--accent-danger)' }}>
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowApplyModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
