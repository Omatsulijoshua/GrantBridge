/* src/pages/public/ProviderProfile.jsx */
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Building2, Globe, Phone, Mail, Award, ArrowLeft, ShieldCheck, Calendar } from 'lucide-react';

export default function ProviderProfile() {
  const { id } = useParams();
  const { users, grants } = useApp();
  const navigate = useNavigate();

  // Find the provider user
  const provider = users.find(u => u.id === parseInt(id) && u.role === 'provider');

  if (!provider) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Foundation Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The requested scholarship provider profile does not exist.</p>
        <button onClick={() => navigate('/grants')} className="btn btn-primary">Browse Scholarships</button>
      </div>
    );
  }

  // Find all approved grants posted by this provider
  const providerGrants = grants.filter(g => g.providerId === provider.id && g.status === 'Approved');

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', minHeight: '85vh' }}>
      
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left: Foundation Profile Summary Card */}
        <div className="glass-panel" style={{
          flex: '1 1 350px',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Avatar and Title */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-primary-light)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.75rem'
            }}>
              {provider.avatar}
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{provider.foundationName}</h2>
              {provider.verified ? (
                <span className="badge badge-success" style={{ marginTop: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ShieldCheck size={12} />
                  <span>Verified Provider</span>
                </span>
              ) : (
                <span className="badge badge-warning" style={{ marginTop: '0.25rem' }}>Unverified</span>
              )}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

          {/* Description */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ABOUT THE FOUNDATION</h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {provider.bio || 'This foundation supports student education and development by funding academic scholarships and grants.'}
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>CONTACT INFORMATION</h4>
            
            {provider.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                <Globe size={16} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                <a href={provider.website} target="_blank" rel="noreferrer" style={{ wordBreak: 'break-all', fontWeight: 600 }}>
                  {provider.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
              <Mail size={16} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
              <span style={{ color: 'var(--text-primary)' }}>{provider.email}</span>
            </div>

            {provider.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                <Phone size={16} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-primary)' }}>{provider.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Active Scholarship Listings from this Provider */}
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={24} style={{ color: 'var(--brand-primary)' }} />
            <span>Active Scholarships ({providerGrants.length})</span>
          </h3>

          {providerGrants.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-secondary)' }}>
              <Award size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', margin: '0 auto 0.75rem' }} />
              <h4>No Active Scholarships</h4>
              <p style={{ fontSize: '0.9rem' }}>This provider does not have any publicly active grants at the moment.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {providerGrants.map(grant => (
                <div key={grant.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span className="badge badge-primary" style={{ marginRight: '0.5rem' }}>{grant.category}</span>
                    </div>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-success)' }}>
                      ${grant.amount.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1.2rem' }}>{grant.title}</h4>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    {grant.description}
                  </p>

                  <div className="card-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <Calendar size={14} />
                      Deadline: <strong>{grant.deadline}</strong>
                    </span>
                    <Link to={`/grants?id=${grant.id}`} className="btn btn-primary btn-sm">
                      View details & Apply
                    </Link>
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
