import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Mesh, Group } from 'three';
import { Float, Environment, useGLTF } from '@react-three/drei';

// Coca-Cola Can Model from online CDN
const CocaColaCan = () => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/can-coca-cola/model.gltf');

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={12} position={[0, -0.5, 0]}>
        <primitive object={scene.clone()} />
      </group>
    </Float>
  );
};

// Fallback geometric shape if GLTF fails
const GeometricShape = () => {
  const meshRef = useRef<Mesh>(null);
  const wireframeRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Main torus knot */}
        <mesh ref={meshRef} scale={2}>
          <torusKnotGeometry args={[1, 0.35, 128, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Outer wireframe sphere */}
        <mesh ref={wireframeRef} scale={3.5}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#ffffff" wireframe opacity={0.08} transparent />
        </mesh>

        {/* Orbiting elements */}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 4) * 3,
              Math.sin((i * Math.PI * 2) / 4) * 0.5,
              Math.sin((i * Math.PI * 2) / 4) * 3
            ]}
          >
            <octahedronGeometry args={[0.15]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const FloatingShape = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<GeometricShape />}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#ffffff" />
          <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />
          <CocaColaCan />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the model
useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/can-coca-cola/model.gltf');

export default FloatingShape;