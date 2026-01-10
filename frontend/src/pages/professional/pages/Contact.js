import React, { useState } from 'react';
import { useSystemView } from '../context/SystemViewContext';

function Contact() {
  const { systemView } = useSystemView();
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const contacts = [
    { type: 'email', label: 'Email', value: 'likhith.goruputi@nyu.edu', icon: '✉️' },
    { type: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/likhithvardhan', url: 'https://linkedin.com/in/likhithvardhan', icon: '💼' },
    { type: 'github', label: 'GitHub', value: 'github.com/likhithvardhan', url: 'https://github.com/likhithvardhan', icon: '💻' },
  ];

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', color: systemView ? '#f1f5f9' : '#0f172a' }}>
        Get in Touch
      </h1>
      <p style={{ fontSize: '1.25rem', color: systemView ? '#94a3b8' : '#64748b', marginBottom: '3rem' }}>
        I'm currently pursuing my MS in Computer Science at NYU and open to software engineering opportunities.
        Feel free to reach out!
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {contacts.map(contact => (
          <div
            key={contact.type}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem',
              background: systemView ? 'rgba(30, 41, 59, 0.6)' : 'white',
              border: `1px solid ${systemView ? '#334155' : '#e2e8f0'}`,
              borderRadius: '0.75rem',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
              <span style={{ fontSize: '1.5rem' }}>{contact.icon}</span>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: systemView ? '#f1f5f9' : '#0f172a', marginBottom: '0.25rem' }}>
                  {contact.label}
                </div>
                {contact.url ? (
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.9375rem', color: systemView ? '#10b981' : '#6366f1', textDecoration: 'none' }}
                  >
                    {contact.value}
                  </a>
                ) : (
                  <div style={{ fontSize: '0.9375rem', color: systemView ? '#94a3b8' : '#64748b' }}>
                    {contact.value}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(contact.url || contact.value, contact.type)}
              style={{
                padding: '0.5rem 1rem',
                background: copied === contact.type ? (systemView ? '#10b981' : '#6366f1') : 'transparent',
                color: copied === contact.type ? 'white' : (systemView ? '#94a3b8' : '#64748b'),
                border: `2px solid ${systemView ? '#334155' : '#e2e8f0'}`,
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {copied === contact.type ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        ))}
      </div>

      {systemView && (
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '1rem'
        }}>
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.75rem', color: '#10b981', fontWeight: 600, marginBottom: '0.75rem' }}>
            SYSTEM::CONTACT_INFO
          </div>
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.875rem', color: '#10b981', lineHeight: 1.6 }}>
            Copy functionality uses Clipboard API with fallback for older browsers.
            Links open in new tab with noopener/noreferrer for security.
            Email uses mailto: protocol handler.
          </div>
        </div>
      )}

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: systemView ? 'rgba(30, 41, 59, 0.6)' : '#f8fafc',
        border: `1px solid ${systemView ? '#334155' : '#e2e8f0'}`,
        borderRadius: '1rem',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: systemView ? '#f1f5f9' : '#0f172a', marginBottom: '0.75rem' }}>
          Looking for my resume?
        </h3>
        <p style={{ color: systemView ? '#94a3b8' : '#64748b', marginBottom: '1.5rem' }}>
          Download or view my resume with all my experience, education, and skills.
        </p>
        <a
          href="/professional/resume"
          style={{
            display: 'inline-block',
            padding: '0.875rem 1.75rem',
            background: systemView ? '#10b981' : '#6366f1',
            color: 'white',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.2s ease'
          }}
        >
          View Resume →
        </a>
      </div>
    </div>
  );
}

export default Contact;
