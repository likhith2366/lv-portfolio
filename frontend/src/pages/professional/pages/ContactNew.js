import React, { useState } from 'react';
import './ContactNew.css';

function ContactNew() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      // Save message to database
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Also create mailto link
      const mailtoLink = `mailto:likhith.goruputi@nyu.edu?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      window.location.href = mailtoLink;

      setSent(true);
      setTimeout(() => {
        setSent(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: '✉️',
      value: 'likhith.goruputi@nyu.edu',
      url: 'mailto:likhith.goruputi@nyu.edu',
      color: '#6366f1'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      value: 'likhithvardhan',
      url: 'https://linkedin.com/in/likhithvardhan',
      color: '#0077b5'
    },
    {
      name: 'GitHub',
      icon: '💻',
      value: 'likhithvardhan',
      url: 'https://github.com/likhithvardhan',
      color: '#ffffff'
    },
    {
      name: 'Instagram',
      icon: '📸',
      value: '@alsolikhith',
      url: 'https://instagram.com/alsolikhith',
      color: '#E4405F'
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="page-title">
            Let's Connect
            <span className="title-glow"></span>
          </h1>
          <p className="page-subtitle">
            Have a project in mind or just want to chat? Drop me a message!
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-card">
              <div className="form-header">
                <span className="form-icon">💌</span>
                <h2>Send me a message</h2>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Let's work together"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button
                  type="submit"
                  className={`submit-btn ${sending ? 'sending' : ''} ${sent ? 'sent' : ''}`}
                  disabled={sending || sent}
                >
                  {sent ? (
                    <>
                      <span className="btn-icon">✓</span>
                      Sent!
                    </>
                  ) : sending ? (
                    <>
                      <span className="btn-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social Links */}
          <div className="contact-info-section">
            <div className="info-card">
              <div className="info-header">
                <span className="info-icon">🌐</span>
                <h3>Connect with me</h3>
              </div>
              <p className="info-description">
                Feel free to reach out through any of these platforms. I'm always open to discussing new opportunities, collaborations, or just having a chat!
              </p>

              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--social-color': social.color }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <div className="social-content">
                      <div className="social-name">{social.name}</div>
                      <div className="social-value">{social.value}</div>
                    </div>
                    <span className="link-arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="availability-card">
              <div className="availability-header">
                <span className="status-dot"></span>
                <h4>Currently Available</h4>
              </div>
              <p>
                I'm currently pursuing my MS in Computer Science at NYU and actively seeking full-time software engineering opportunities starting May 2025.
              </p>
            </div>

            <div className="response-card">
              <span className="response-icon">⚡</span>
              <div className="response-content">
                <h4>Quick Response</h4>
                <p>I typically respond within 24-48 hours during business days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="contact-stats">
          <div className="stat-item">
            <span className="stat-icon">📍</span>
            <div className="stat-content">
              <div className="stat-label">Location</div>
              <div className="stat-value">New York, NY</div>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-icon">🎓</span>
            <div className="stat-content">
              <div className="stat-label">Education</div>
              <div className="stat-value">NYU • MS CS</div>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-icon">💼</span>
            <div className="stat-content">
              <div className="stat-label">Status</div>
              <div className="stat-value">Open to Work</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactNew;
