/* src/pages/public/PricingPage.jsx */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Check, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or annual
  const { currentUser, showToast, updateProfile } = useApp();
  const navigate = useNavigate();

  const handleSelectPlan = (planName) => {
    if (!currentUser) {
      navigate(`/auth?role=provider&plan=${planName}`);
      return;
    }

    if (currentUser.role !== 'provider') {
      showToast('Only foundation/provider accounts can subscribe to these plans.', 'error');
      return;
    }

    updateProfile({ subscription: planName });
    showToast(`Successfully subscribed to the ${planName} plan!`);
  };

  const faqItems = [
    {
      q: 'How does the student matching work?',
      a: 'We automatically match students to your grant based on their profile criteria (GPA, major, education level, financial need). This reduces the volume of unqualified applications you receive.'
    },
    {
      q: 'Can we customize our application questions?',
      a: 'Yes! The Pro and Enterprise plans allow you to add custom text-based questions or file upload requirements (e.g., portfolio links or video essays) to your application forms.'
    },
    {
      q: 'Is there a contract or commitment?',
      a: 'No. Our monthly plans can be cancelled at any time. Billed annually plans offer a 20% discount but are committed for 12 months.'
    },
    {
      q: 'How do we verify our foundation?',
      a: 'After signing up, you will upload verification documents (like 501(c)(3) status or institutional credentials) in your dashboard. Our admin team typically reviews and approves accounts within 24 hours.'
    }
  ];

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
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Simple, Transparent <span className="text-gradient">Pricing</span></h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Choose the right plan to manage and distribute your scholarship funds. Reach the most qualified applicants efficiently.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex-center" style={{ gap: '1rem' }}>
            <span style={{ fontWeight: billingCycle === 'monthly' ? 700 : 500, color: billingCycle === 'monthly' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Monthly Billed</span>
            <button
              onClick={() => setBillingCycle(prev => (prev === 'monthly' ? 'annual' : 'monthly'))}
              style={{
                width: '56px',
                height: '28px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--brand-primary)',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                padding: '2px',
                transition: 'background-color var(--transition-normal)'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                transition: 'transform var(--transition-normal)',
                transform: billingCycle === 'annual' ? 'translateX(28px)' : 'translateX(0)'
              }} />
            </button>
            <span style={{ fontWeight: billingCycle === 'annual' ? 700 : 500, color: billingCycle === 'annual' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              Annually Billed <span className="badge badge-success" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>Save 20%</span>
            </span>
          </div>
        </div>
      </header>

      {/* Pricing Cards Grid */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-cols-3" style={{ alignItems: 'stretch' }}>
            
            {/* Free Plan */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Starter</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>For small family foundations and local trusts.</p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>$0</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}> / forever</span>
              </div>
              
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', marginBottom: '1.5rem' }} />

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, marginBottom: '2rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>1 Active Grant Listing</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>Standard Application Form</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>Basic Applicant Review Table</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>Standard Support</span>
                </li>
              </ul>

              <button 
                onClick={() => handleSelectPlan('Free')}
                className="btn btn-outline" 
                style={{ width: '100%' }}
              >
                {currentUser?.subscription === 'Free' ? 'Current Plan' : 'Get Started'}
              </button>
            </div>

            {/* Pro Plan */}
            <div className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              borderColor: 'var(--brand-primary)',
              borderWidth: '2px',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                <span className="badge badge-primary">Most Popular</span>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pro Growth</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>For active educational trusts and corporate sponsors.</p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {billingCycle === 'monthly' ? '$99' : '$79'}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}> / month</span>
                {billingCycle === 'annual' && <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-success)', fontWeight: 600 }}>Billed annually ($948/yr)</span>}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', marginBottom: '1.5rem' }} />

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, marginBottom: '2rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <strong>Unlimited Active Listings</strong>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>Custom Application Questions</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>Advanced Match Score Filtering</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>Bulk Status Updates & Feedback Notes</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>Priority Email & Chat Support</span>
                </li>
              </ul>

              <button 
                onClick={() => handleSelectPlan('Pro')}
                className="btn btn-primary" 
                style={{ width: '100%' }}
              >
                {currentUser?.subscription === 'Pro' ? 'Current Plan' : 'Subscribe Pro'}
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Enterprise</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>For university systems and global scholarship funds.</p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {billingCycle === 'monthly' ? '$299' : '$239'}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}> / month</span>
                {billingCycle === 'annual' && <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-success)', fontWeight: 600 }}>Billed annually ($2,868/yr)</span>}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', marginBottom: '1.5rem' }} />

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, marginBottom: '2rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>Everything in Pro Plan</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <strong>Dedicated Account Manager</strong>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>Custom Analytics & Export Formats</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>API access for Student CRM integration</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Check size={18} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
                  <span>99.9% Uptime SLA Guarantee</span>
                </li>
              </ul>

              <button 
                onClick={() => handleSelectPlan('Enterprise')}
                className="btn btn-outline" 
                style={{ width: '100%' }}
              >
                {currentUser?.subscription === 'Enterprise' ? 'Current Plan' : 'Subscribe Enterprise'}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.25rem', textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqItems.map((faq, index) => (
              <div key={index} className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  <HelpCircle size={18} style={{ color: 'var(--brand-primary)' }} />
                  <span>{faq.q}</span>
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: '1.75rem', lineHeight: 1.5 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
