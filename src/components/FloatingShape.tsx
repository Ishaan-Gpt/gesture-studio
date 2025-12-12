import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#00f0ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const OrbitingRing = ({ delay = 0 }: { delay?: number }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + delay;
    }
  });

  return (
    <mesh ref={meshRef} scale={1}>
      <torusGeometry args={[2.5, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#8b5cf6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

const FloatingShape = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <AnimatedSphere />
          <OrbitingRing delay={0} />
          <OrbitingRing delay={Math.PI / 2} />
          <OrbitingRing delay={Math.PI} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingShape;
