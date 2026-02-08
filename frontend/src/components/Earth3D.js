import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Rotating Earth Sphere (simplified without drei dependency)
const Earth = () => {
  const meshRef = useRef();
  const geometry = new THREE.SphereGeometry(3, 64, 64);

  // Create gradient material
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1e3a8a'),
    emissive: new THREE.Color('#3b82f6'),
    emissiveIntensity: 0.3,
    roughness: 0.5,
    metalness: 0.8,
  });

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation animation
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;

      // Subtle floating motion
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, 0]} />
  );
};

// Scene with lights
const Scene = () => {
  return (
    <>
      {/* Lighting setup - increased intensity */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={2} color="#4facfe" />
      <pointLight position={[10, -10, -5]} intensity={2} color="#00f2fe" />
      <pointLight position={[0, 10, 10]} intensity={1.5} color="#60a5fa" />

      {/* Earth */}
      <Earth />

      {/* Stars background */}
      <Stars />
    </>
  );
};

// Starfield background
const Stars = () => {
  const starsRef = useRef();

  // Generate random star positions
  const starPositions = React.useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

// Main Earth3D Component
const Earth3D = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      opacity: 0.6
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Earth3D;
