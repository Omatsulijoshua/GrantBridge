/* src/pages/student/StudentProfile.jsx */
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, GraduationCap, Award, FileText, Upload, Trash2, CheckCircle } from 'lucide-react';

export default function StudentProfile() {
  const { currentUser, updateProfile } = useApp();

  if (!currentUser) return null;

  // --- Form States ---
  const [name, setName] = useState(currentUser.name || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [gpa, setGpa] = useState(currentUser.gpa || '');
  const [education, setEducation] = useState(currentUser.education || 'Undergraduate');
  const [major, setMajor] = useState(currentUser.major || '');
  const [financialNeed, setFinancialNeed] = useState(currentUser.financialNeed || 'Medium');

  // --- Documents State ---
  const [documents, setDocuments] = useState(currentUser.documents || []);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      bio,
      gpa,
      education,
      major,
      financialNeed,
      documents
    });
  };

  // Simulate document uploading
  const handleMockUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newDoc = {
      id: `d-${Date.now()}`,
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)} KB`,
      type: file.name.endsWith('.pdf') ? 'Transcript/Resume' : 'Other Document',
      date: new Date().toISOString().split('T')[0]
    };

    setDocuments(prev => [...prev, newDoc]);
    // Also save in local context so it persists immediately
    updateProfile({
      documents: [...documents, newDoc]
    });
  };

  const handleDeleteDoc = (docId) => {
    const updatedDocs = documents.filter(doc => doc.id !== docId);
    setDocuments(updatedDocs);
    updateProfile({
      documents: updatedDocs
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>My Profile</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Complete your profile to unlock grant matches and submit applications.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Card: Profile Edit Form */}
        <div className="card" style={{ flex: '2 1 500px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>Academic & Personal Details</span>
          </h3>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    style={{ paddingLeft: '2rem' }}
                  />
                  <Phone size={14} style={{ position: 'absolute', left: '10px', top: '13px', color: 'var(--text-muted)' }} />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Education Level</label>
                <select
                  className="form-select"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                >
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Cumulative GPA</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.00"
                    required
                    className="form-input"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    placeholder="e.g. 3.75"
                    style={{ paddingLeft: '2rem' }}
                  />
                  <Award size={14} style={{ position: 'absolute', left: '10px', top: '13px', color: 'var(--text-muted)' }} />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Academic Major</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="e.g. Computer Science"
                    style={{ paddingLeft: '2rem' }}
                  />
                  <GraduationCap size={14} style={{ position: 'absolute', left: '10px', top: '13px', color: 'var(--text-muted)' }} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Financial Need Status</label>
                <select
                  className="form-select"
                  value={financialNeed}
                  onChange={(e) => setFinancialNeed(e.target.value)}
                >
                  <option value="Low">Low Need</option>
                  <option value="Medium">Medium Need</option>
                  <option value="High">High Need</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Short Bio / Introduction</label>
              <textarea
                rows="3"
                className="form-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about your interests, passions, or background..."
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
              <CheckCircle size={16} />
              <span>Save Profile</span>
            </button>
          </form>
        </div>

        {/* Right Card: Document Upload Area */}
        <div className="card" style={{ flex: '1 1 320px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>My Documents</span>
          </h3>

          {/* Document Upload Area */}
          <div className="upload-zone" style={{ padding: '2rem 1rem', marginBottom: '1.5rem' }}>
            <input
              type="file"
              id="profile-doc-upload"
              onChange={handleMockUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="profile-doc-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Upload size={24} className="upload-icon" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginTop: '0.5rem' }}>Upload Document</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF, DOCX up to 10MB</span>
            </label>
          </div>

          {/* Documents List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Uploaded Files ({documents.length})</h4>
            {documents.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No documents uploaded yet.</p>
            ) : (
              documents.map(doc => (
                <div key={doc.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                    <FileText size={18} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={doc.name}>
                        {doc.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.size} &bull; {doc.date}</span>
                    </div>
                  </div>
                  <button 
                    className="btn btn-text" 
                    onClick={() => handleDeleteDoc(doc.id)} 
                    style={{ padding: '0.25rem', color: 'var(--accent-danger)' }}
                    title="Delete document"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
