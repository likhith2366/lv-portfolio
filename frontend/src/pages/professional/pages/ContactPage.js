import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ContactPage.css';

const ContactPage = () => {
  const fluidGlassRef = useRef(null);

  useEffect(() => {
    if (!fluidGlassRef.current) return;

    const container = fluidGlassRef.current;
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting - Enhanced for better white glass visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(0, -5, 5);
    scene.add(pointLight2);

    // Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0,
      transmission: 0.7,
      thickness: 2,
      ior: 1.15,
      clearcoat: 1,
      clearcoatRoughness: 0,
      emissive: 0xffffff,
      emissiveIntensity: 0.1,
    });

    // Geometry - Larger Torus Knot
    const geometry = new THREE.TorusKnotGeometry(2.1, 0.7, 100, 16);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const handleBackClick = () => {
    window.location.href = '/professional';
  };

  return (
    <div className="contact-wrapper" id="contact">
      <div className="contact-grid-container">
        {/* Header Bar */}
        <div className="contact-header-bar">
          <button onClick={handleBackClick} className="back-button" aria-label="Back to Home">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        </div>

        {/* Hero Title */}
        <div className="contact-hero-title">
          <h1>Let's Connect</h1>
        </div>

        {/* Name Card */}
        <div className="contact-grid-item contact-detail-card">
          <div className="contact-label-row">
            <span>Name</span>
            <span className="contact-arrow">&rarr;</span>
          </div>
          <div className="contact-content-main">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 9.6H22L15.8 14.4L18.2 22L12 17.2L5.8 22L8.2 14.4L2 9.6H9.6L12 2Z" />
            </svg>
            <p className="contact-detail-text" style={{ fontSize: '1.43rem' }}>Likhith Vardhan G</p>
          </div>
        </div>

        {/* Email Card */}
        <div className="contact-grid-item contact-detail-card">
          <div className="contact-label-row">
            <span>Email</span>
            <span className="contact-arrow">&rarr;</span>
          </div>
          <div className="contact-content-main">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <p className="contact-detail-text" style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>
              g.likhithvardhan@gmail.com
            </p>
            <p className="contact-sub-text">For professional correspondence, kindly reach out via email.</p>
          </div>
        </div>

        {/* Phone Card */}
        <div className="contact-grid-item contact-detail-card">
          <div className="contact-label-row">
            <span>Phone</span>
            <span className="contact-arrow">&rarr;</span>
          </div>
          <div className="contact-content-main">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="5" height="5"></rect>
              <rect x="9.5" y="3" width="5" height="5"></rect>
              <rect x="16" y="3" width="5" height="5"></rect>
              <rect x="3" y="9.5" width="5" height="5"></rect>
              <rect x="9.5" y="9.5" width="5" height="5"></rect>
              <rect x="16" y="9.5" width="5" height="5"></rect>
              <rect x="3" y="16" width="5" height="5"></rect>
              <rect x="9.5" y="16" width="5" height="5"></rect>
              <rect x="16" y="16" width="5" height="5"></rect>
            </svg>
            <p className="contact-detail-text">+1 929-791-1358</p>
            <p className="contact-sub-text">Call availability is minimal; email remains the primary channel.</p>
          </div>
        </div>

        {/* Location Card */}
        <div className="contact-grid-item contact-detail-card">
          <div className="contact-label-row">
            <span>Location</span>
            <span className="contact-arrow">&rarr;</span>
          </div>
          <div className="contact-content-main">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <p className="contact-sub-text" style={{ marginTop: '2rem' }}>
              New York, NY, USA
            </p>
          </div>
        </div>

        {/* Bottom Left (Socials) */}
        <div className="contact-grid-item contact-bottom-left">
          <span className="contact-section-title">SOCIALS</span>
          <div className="contact-social-list">
            <span style={{ fontSize: '0.6rem', color: '#888', marginBottom: '0.5rem' }}>FEBRUARY 2026</span>
            <a href="https://www.linkedin.com/in/likhithvardhangoruputi" className="contact-social-link" target="_blank" rel="noopener noreferrer">
              LINKEDIN: <span>/in/likhithvardhangoruputi</span>
            </a>
            <a href="https://github.com/likhith2366" className="contact-social-link" target="_blank" rel="noopener noreferrer">
              GITHUB: <span>/likhith2366</span>
            </a>
            <a href="https://www.instagram.com/alsolikhith" className="contact-social-link" target="_blank" rel="noopener noreferrer">
              INSTAGRAM: <span>@alsolikhith</span>
            </a>
          </div>
        </div>

        {/* Bottom Right (3D Glass Object) */}
        <div className="contact-grid-item contact-bottom-right">
          <div style={{ maxWidth: '200px' }}>
            <p className="contact-section-title" style={{ marginBottom: '0.5rem' }}>Recently added</p>
            <p style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>PORTFOLIO: likhithvardhan.com</p>
          </div>

          <div className="contact-address-block">
            <p style={{ fontSize: '0.6rem', textAlign: 'right', marginBottom: '0.5rem', color: '#888' }}>
              05 02 2026
            </p>
            <div className="contact-serif-display">
              Building the <br />
              Future Together
            </div>
            <div className="contact-footer-credits">
              <span>Designed by<br />Likhith</span>
              <span>Software Developer</span>
            </div>
          </div>

          {/* Fluid Glass Container */}
          <div ref={fluidGlassRef} className="fluid-glass-container"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
