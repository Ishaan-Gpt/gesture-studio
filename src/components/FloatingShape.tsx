import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Mesh } from 'three';
import { Float, Environment } from '@react-three/drei';

// Premium geometric shape - no external loading required
const PremiumShape = () => {
  const torusRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);
  const wireframeRef = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.15;
      torusRef.current.rotation.y = t * 0.25;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.2;
      sphereRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.1;
      wireframeRef.current.rotation.x = t * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Main torus knot - hero element */}
        <mesh ref={torusRef} scale={2.2}>
          <torusKnotGeometry args={[1, 0.32, 128, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Inner glowing sphere */}
        <mesh ref={sphereRef} scale={0.8}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.7}
            roughness={0.3}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Outer wireframe icosahedron */}
        <mesh ref={wireframeRef} scale={4}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#ffffff" wireframe opacity={0.06} transparent />
        </mesh>

        {/* Orbiting accent elements */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 5) * 3.5,
              Math.sin((i * Math.PI * 2) / 5) * 0.8,
              Math.sin((i * Math.PI * 2) / 5) * 3.5
            ]}
          >
            <octahedronGeometry args={[0.12]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} emissive="#ffffff" emissiveIntensity={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const FloatingShape = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#ffffff" />
          <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />
          <PremiumShape />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingShape;