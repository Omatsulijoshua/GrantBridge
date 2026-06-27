/* src/pages/public/ContactPage.jsx */
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending message
    setTimeout(() => {
      showToast('Your message has been sent! We will get back to you shortly.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSending(false);
    }, 1000);
  };

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
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Contact <span className="text-gradient">Our Team</span></h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Have questions about applying, hosting a scholarship, or enterprise integrations? We are here to help.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'stretch' }}>
            
            {/* Contact Info Cards */}
            <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Get in Touch</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                Fill out the form, or reach out directly using the information below. Our support team responds within 1 business day.
              </p>

              <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.25rem' }}>
                <div className="flex-center" style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Email Us</h4>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>support@grantbridge.com</span>
                </div>
              </div>

              <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.25rem' }}>
                <div className="flex-center" style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--accent-info-light)', color: 'var(--accent-info)' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Call Us</h4>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>+1 (800) 555-0199</span>
                </div>
              </div>

              <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.25rem' }}>
                <div className="flex-center" style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--accent-success-light)', color: 'var(--accent-success)' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Headquarters</h4>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>100 Innovation Way, Boston, MA</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card" style={{ flex: '2 1 500px', padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={20} style={{ color: 'var(--brand-primary)' }} />
                <span>Send a Message</span>
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    required
                    rows="4"
                    className="form-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message details here..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }} disabled={isSending}>
                  <Send size={16} />
                  <span>{isSending ? 'Sending...' : 'Submit Form'}</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
