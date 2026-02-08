import React from 'react';
import './AboutFooter.css';

const AboutFooter = () => {
  return (
    <section className="profile-about-footer" id="about-footer">
      <div className="footer-about-details footer-about-left">
        <h3>Education</h3>
        <ul>
          <li>New York University — MS in Computer Science</li>
          <li>Bachelor's in Computer Engineering</li>
        </ul>

        <h3>Experience</h3>
        <ul>
          <li>Full-Stack Developer</li>
          <li>GraphQL & Node.js Specialist</li>
          <li>React Developer</li>
        </ul>

        <h3>Achievements</h3>
        <ul>
          <li>Built scalable systems with GraphQL</li>
          <li>Innovative technology solutions</li>
        </ul>
      </div>

      <div className="footer-profile-image-container">
        <img src="/Assets/personal_footer_portrait.png" alt="Likhith Vardhan" />
      </div>

      <div className="footer-about-details footer-about-right">
        <h3>Languages</h3>
        <ul>
          <li>JavaScript / TypeScript</li>
          <li>Python</li>
          <li>Node.js</li>
        </ul>

        <h3>Technologies</h3>
        <ul>
          <li>React, GraphQL, MongoDB</li>
          <li>Express, Apollo Client</li>
          <li>Three.js, Framer Motion</li>
        </ul>

        <h3>Contact</h3>
        <p>Visit the <span className="contact-link" onClick={() => window.location.href = '/professional-v2/contact'}>Connect page</span></p>

        <h3>Interests</h3>
        <p>Innovation, Technology, Design</p>
      </div>
    </section>
  );
};

export default AboutFooter;
