import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ConnectButton3D.css';

const ConnectButton3D = ({ onClick }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Enhanced lighting for better white glass visibility
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

    // Torus Knot for that "liquid" complex look
    const geometry = new THREE.TorusKnotGeometry(0.95, 0.32, 128, 32);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    meshRef.current = mesh;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.015;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const handleClick = () => {
    if (meshRef.current) {
      // Flash effect
      meshRef.current.material.emissive.setHex(0x333333);
      setTimeout(() => {
        meshRef.current.material.emissive.setHex(0x000000);
        if (onClick) onClick();
      }, 100);
    }
  };

  return (
    <div className="connect-button-3d-container" onClick={handleClick}>
      <div ref={containerRef} className="canvas-container" />
      <span className="connect-button-text">Connect</span>
    </div>
  );
};

export default ConnectButton3D;
