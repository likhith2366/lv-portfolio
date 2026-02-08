import React, { Suspense, useRef, Component } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGL Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Don't render anything if WebGL fails
    }
    return this.props.children;
  }
}

function Model() {
  const gltf = useLoader(GLTFLoader, '/models/genkub_greeting_robot.gltf');
  const meshRef = useRef();
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Extremely responsive mouse tracking - follows cursor very fast
      const targetRotationY = mouse.x * 2.5; // Ultra high sensitivity
      const targetRotationX = -mouse.y * 1.8; // Negative for natural up/down

      // Direct assignment for instant movement (no smoothing)
      meshRef.current.rotation.y = targetRotationY;
      meshRef.current.rotation.x = targetRotationX;

      // Very subtle breathing effect
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.03;
      meshRef.current.scale.setScalar(2.0 + breathe); // Larger base scale
    }
  });

  // Position and rotate to face forward
  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      scale={2.0}
      rotation={[0, 0, 0]}
      position={[0, -1, 0]}
    />
  );
}

function ModelViewer() {
  return (
    <ErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }} // Adjusted camera position and FOV
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
      >
        <Suspense fallback={null}>
          {/* Enhanced lighting for more colorful appearance */}
          <ambientLight intensity={0.6} color="#ffffff" />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-5, 5, 5]} intensity={0.8} color="#4a90ff" />
          <directionalLight position={[5, -5, 5]} intensity={0.6} color="#ff6b6b" />
          <directionalLight position={[-5, -5, 5]} intensity={0.4} color="#ffd93d" />
          <pointLight position={[0, 0, 10]} intensity={0.5} color="#00ff88" />
          <pointLight position={[0, 0, -10]} intensity={0.3} color="#ff0088" />
          <Model />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}

export default ModelViewer;
