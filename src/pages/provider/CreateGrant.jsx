/* src/pages/provider/CreateGrant.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PlusCircle, ArrowLeft, Award, HelpCircle } from 'lucide-react';

export default function CreateGrant() {
  const { createGrant, categories, currentUser } = useApp();
  const navigate = useNavigate();

  // --- Form States ---
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Technology');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  
  // Eligibility States
  const [minGPA, setMinGPA] = useState('');
  const [education, setEducation] = useState('Undergraduate');
  const [major, setMajor] = useState('');
  const [otherEligibility, setOtherEligibility] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGrantData = {
      title,
      amount: parseInt(amount),
      category,
      deadline,
      description,
      eligibility: {
        minGPA: minGPA || null,
        education,
        major: major || 'Any',
        other: otherEligibility || null
      }
    };

    const success = createGrant(newGrantData);
    if (success) {
      navigate('/provider');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => navigate('/provider')} className="btn btn-outline btn-sm" style={{ padding: '0.5rem' }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Post a New Scholarship</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Provide scholarship details and set eligibility requirements.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="card" style={{ padding: '2.5rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            1. Basic Information
          </h3>

          <div className="form-group">
            <label className="form-label">Scholarship Title *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Future Innovators in STEM Scholarship"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Award Amount ($) *</label>
              <input
                type="number"
                required
                min="1"
                className="form-input"
                placeholder="e.g. 5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group" style={{ gridColumn: 'span 1' }}>
              <label className="form-label">Application Deadline *</label>
              <input
                type="date"
                required
                className="form-input"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description & Scope *</label>
            <textarea
              required
              rows="5"
              className="form-textarea"
              placeholder="Describe the purpose of this scholarship, what it covers, and the history of the fund..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginTop: '1rem' }}>
            2. Eligibility Criteria
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Minimum GPA (Optional)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="4.0"
                className="form-input"
                placeholder="e.g. 3.2"
                value={minGPA}
                onChange={(e) => setMinGPA(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Education Level *</label>
              <select
                className="form-select"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value="Any">Any Level</option>
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Target Major / Field (Optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Computer Science, Mechanical Engineering (or leave empty for 'Any')"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Other Eligibility Requirements (Optional)</label>
            <textarea
              rows="2"
              className="form-textarea"
              placeholder="e.g. Must demonstrate financial need, belong to a minority group, or be a resident of Massachusetts..."
              value={otherEligibility}
              onChange={(e) => setOtherEligibility(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary">
              <PlusCircle size={18} />
              <span>Post Scholarship</span>
            </button>
            <button type="button" onClick={() => navigate('/provider')} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
