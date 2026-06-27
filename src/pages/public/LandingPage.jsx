/* src/pages/public/LandingPage.jsx */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, Award, ArrowRight, ShieldCheck, GraduationCap, Building2 } from 'lucide-react';

export default function LandingPage() {
  const { grants } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/grants?search=${encodeURIComponent(searchQuery)}`);
  };

  // Get approved and active grants (limit to 3 for featured)
  const featuredGrants = grants
    .filter(g => g.status === 'Approved')
    .slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(14, 165, 233, 0.05) 100%)',
        padding: '5rem 2rem 6rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative background circles */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          top: '-10%',
          left: '10%',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          bottom: '-10%',
          right: '5%',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '1.5rem', padding: '0.4rem 1rem' }}>
            <Sparkles size={14} />
            <span>Bridging Dreams and Education</span>
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 850,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            lineHeight: 1.15
          }}>
            Empowering Students,<br />
            <span className="text-gradient">Funding Futures</span>
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            GrantBridge connects ambitious students with foundations and providers. Discover personalized scholarship matches and apply in minutes.
          </p>

          {/* Hero Search Bar */}
          <form onSubmit={handleSearchSubmit} className="glass-panel" style={{
            display: 'flex',
            padding: '0.5rem',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <Search size={22} style={{ color: 'var(--text-muted)', marginLeft: '1rem' }} />
            <input
              type="text"
              placeholder="Search major, category, or provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: '1.05rem',
                outline: 'none',
                color: 'var(--text-primary)',
                padding: '0.5rem 0'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-lg)' }}>
              Find Grants
            </button>
          </form>

          {/* Quick Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }}>
            <div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-primary)' }}>$12M+</h3>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Total Funding Available</p>
            </div>
            <div style={{ width: '1px', backgroundColor: 'var(--border-color)', height: '40px' }} className="desktop-only" />
            <div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-secondary)' }}>5,000+</h3>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Active Students</p>
            </div>
            <div style={{ width: '1px', backgroundColor: 'var(--border-color)', height: '40px' }} className="desktop-only" />
            <div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-success)' }}>150+</h3>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Verified Foundations</p>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Opportunities Section */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Featured Opportunities</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Explore recently added and high-value scholarship programs.</p>
            </div>
            <Link to="/grants" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>View All Grants</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-cols-3">
            {featuredGrants.map(grant => (
              <div key={grant.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header">
                  <span className="badge badge-primary">{grant.category}</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-success)' }}>
                    ${grant.amount.toLocaleString()}
                  </span>
                </div>
                <h3 className="card-title" style={{ marginTop: '0.5rem' }}>{grant.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  By {grant.providerName}
                </p>
                <p className="card-body" style={{ flex: 1 }}>
                  {grant.description.substring(0, 120)}...
                </p>
                <div className="card-footer">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Deadline: <strong>{grant.deadline}</strong>
                  </span>
                  <Link to={`/grants?id=${grant.id}`} className="btn btn-secondary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>How GrantBridge Works</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
            A streamlined digital ecosystem designed to connect scholarship seekers with funding foundations.
          </p>

          <div className="grid-cols-3">
            <div className="card" style={{ padding: '2rem 1.5rem' }}>
              <div className="flex-center" style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--brand-primary-light)',
                color: 'var(--brand-primary)',
                margin: '0 auto 1.5rem'
              }}>
                <GraduationCap size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>1. Create Your Profile</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Students input their academic achievements, financial status, and upload resumes or essays to build a rich application profile.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem 1.5rem' }}>
              <div className="flex-center" style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-info-light)',
                color: 'var(--accent-info)',
                margin: '0 auto 1.5rem'
              }}>
                <Award size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>2. Match & Apply</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Our matching algorithm recommends grants based on student criteria. Apply for multiple scholarships with a single click.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem 1.5rem' }}>
              <div className="flex-center" style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-success-light)',
                color: 'var(--accent-success)',
                margin: '0 auto 1.5rem'
              }}>
                <Building2 size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>3. Secure Funding</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Foundations review matches, shortlist candidates, and award funds securely through our digital portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Verification Section */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1 1 400px' }}>
              <div className="badge badge-success" style={{ marginBottom: '1rem' }}>
                <ShieldCheck size={14} />
                <span>Verified Foundations</span>
              </div>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '1.25rem' }}>A Trusted Platform for Educational Funding</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                At GrantBridge, security and legitimacy are our highest priorities. All foundations undergo a strict verification process by our platform administrators before they can post grants.
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                We protect student data, verify provider credentials, and ensure that funds are dispersed to legitimate educational needs.
              </p>
              <Link to="/auth" className="btn btn-primary">Join as a Foundation</Link>
            </div>
            <div style={{ flex: '1 1 350px', display: 'flex', justifyContent: 'center' }}>
              {/* Decorative graphic panel */}
              <div className="glass-panel" style={{
                padding: '2.5rem',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '400px',
                width: '100%',
                position: 'relative',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-xl)'
              }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'var(--brand-primary)', color: '#fff', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 'bold' }}>A</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem' }}>Apex Tech Foundation</h4>
                    <span className="badge badge-success" style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem' }}>Verified Provider</span>
                  </div>
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                  <strong>Active Grants:</strong> 3 ($30,000 total)
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Disbursed: $185,000</span>
                  <span>Joined: June 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section style={{
        background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-hover) 100%)',
        color: '#ffffff',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '1rem' }}>Unlock Your Potential Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Whether you are a student looking for financial support or a foundation looking to disburse scholarships, GrantBridge makes it simple.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/auth?role=student" className="btn btn-lg" style={{ backgroundColor: '#ffffff', color: 'var(--brand-primary)' }}>
              Sign Up as Student
            </Link>
            <Link to="/auth?role=provider" className="btn btn-lg btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}>
              Register Foundation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--bg-primary)',
        padding: '3rem 2rem',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} style={{ color: 'var(--brand-primary)' }} />
              <span>GrantBridge</span>
            </h4>
            <p style={{ maxWidth: '250px', fontSize: '0.8rem' }}>
              Connecting ambition with opportunity. Safe, secure, and smart educational funding.
            </p>
          </div>
          <div>
            <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Platform</h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/grants">Browse Scholarships</Link></li>
              <li><Link to="/pricing">Pricing Plans</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Support</h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#terms">Terms & Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="container" style={{
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          &copy; {new Date().getFullYear()} GrantBridge. All rights reserved. Built for future leaders.
        </div>
      </footer>
    </div>
  );
}
