/* src/pages/public/AboutPage.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart, Cpu, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(14, 165, 233, 0.03) 100%)',
        padding: '4rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>About <span className="text-gradient">GrantBridge</span></h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            We believe that financial constraints should never stand in the way of academic excellence. Discover our journey and the vision driving us forward.
          </p>
        </div>
      </header>

      {/* Mission & Vision */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--brand-primary)' }}>Our Mission</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                To democratize access to higher education funding by providing a transparent, efficient, and intelligent matching platform. We connect students with verified foundations to make the application process seamless, stress-free, and successful.
              </p>
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--brand-secondary)' }}>Our Vision</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                A world where every student can easily secure the financial support they need to fulfill their educational dreams. We aim to become the global standard for educational scholarship management and distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <h2 style={{ textContent: 'center', fontSize: '2.25rem', marginBottom: '3rem', textAlign: 'center' }}>Our Core Values</h2>
          
          <div className="grid-cols-3">
            <div className="card">
              <div className="flex-center" style={{
                width: '50px',
                height: '50px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-success-light)',
                color: 'var(--accent-success)',
                marginBottom: '1.25rem'
              }}>
                <Shield size={24} />
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Absolute Trust</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                We strictly verify every foundation and opportunity on our platform. Students can apply with absolute peace of mind knowing all listings are 100% legitimate.
              </p>
            </div>

            <div className="card">
              <div className="flex-center" style={{
                width: '50px',
                height: '50px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--brand-primary-light)',
                color: 'var(--brand-primary)',
                marginBottom: '1.25rem'
              }}>
                <Heart size={24} />
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Student First</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Our platform is designed around the student experience. From matching algorithms to application tracking, we make the process intuitive and transparent.
              </p>
            </div>

            <div className="card">
              <div className="flex-center" style={{
                width: '50px',
                height: '50px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-info-light)',
                color: 'var(--accent-info)',
                marginBottom: '1.25rem'
              }}>
                <Cpu size={24} />
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Innovative Technology</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                We leverage smart criteria-matching to ensure students see opportunities they are highly qualified for, maximizing success rates for both applicants and providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>How We Started</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            GrantBridge was founded in 2026 by a team of educators and tech enthusiasts who saw how fragmented the scholarship landscape was. Students spent hundreds of hours digging through outdated forums, while foundations struggled to reach qualified candidates from diverse backgrounds.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
            We set out to build a bridge. A modern, automated ecosystem that simplifies scholarship management and makes funding accessible to all.
          </p>
          <Link to="/auth" className="btn btn-primary">
            <span>Get Started Today</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
