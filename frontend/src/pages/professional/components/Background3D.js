import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Glass Object Component with animation
const GlassObject = ({ geometry, position, scale, rotationSpeed }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation animation
      meshRef.current.rotation.x += rotationSpeed[0];
      meshRef.current.rotation.y += rotationSpeed[1];

      // Subtle floating motion
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
    }
  });

  // Glass material properties (from ConnectButton3D pattern)
  const glassMaterial = new THREE.MeshPhysicalMaterial({
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

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      material={glassMaterial}
      geometry={geometry}
    />
  );
};

// Scene with lights and objects
const Scene = () => {
  return (
    <>
      {/* Lighting setup (from ContactPage pattern) */}
      <ambientLight intensity={1.2} color={0xffffff} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} color={0xffffff} />
      <pointLight position={[-5, 5, 5]} intensity={1.5} color={0xffffff} />
      <pointLight position={[0, -5, 5]} intensity={1.0} color={0xffffff} />

      {/* 5 Floating Glass Objects */}
      {/* TorusKnot - Large, center-left */}
      <GlassObject
        geometry={new THREE.TorusKnotGeometry(1.5, 0.5, 64, 16)}
        position={[-4, 0, -5]}
        scale={1.2}
        rotationSpeed={[0.005, 0.008]}
      />

      {/* Icosahedron - Medium, top-right */}
      <GlassObject
        geometry={new THREE.IcosahedronGeometry(1.2, 0)}
        position={[4, 3, -3]}
        scale={1.0}
        rotationSpeed={[0.008, 0.01]}
      />

      {/* Octahedron - Small, bottom-right */}
      <GlassObject
        geometry={new THREE.OctahedronGeometry(0.8, 0)}
        position={[3, -3, -2]}
        scale={0.8}
        rotationSpeed={[0.01, 0.012]}
      />

      {/* Torus - Medium, center-right */}
      <GlassObject
        geometry={new THREE.TorusGeometry(1.0, 0.4, 16, 32)}
        position={[5, -1, -4]}
        scale={1.0}
        rotationSpeed={[0.006, 0.007]}
      />

      {/* Dodecahedron - Small, top-left */}
      <GlassObject
        geometry={new THREE.DodecahedronGeometry(0.9, 0)}
        position={[-5, 4, -3]}
        scale={0.9}
        rotationSpeed={[0.007, 0.009]}
      />
    </>
  );
};

// Main Background3D Component
const Background3D = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;
