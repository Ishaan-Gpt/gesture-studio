/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { Button } from '@/components/ui/button';
import { Camera as CameraIcon, Hand, RotateCcw, Loader2, VideoOff, MousePointer2 } from 'lucide-react';
import * as THREE from 'three';
import { ThreeDPhotoCarousel } from './ThreeDPhotoCarousel';
import { useGesture } from '@/context/GestureContext';

interface GestureState {
  gesture: 'none' | 'open' | 'pinch' | 'point' | 'fist' | 'thumbsUp' | 'peace';
  position: { x: number; y: number };
  confidence: number;
}

// Future Car Model
const FutureCarModel = ({ rotation, zoom, gestureEffect, position = { x: 0, y: 0, z: 0 } }: { rotation: { x: number; y: number }; zoom: number; gestureEffect: { pulse: number; shake: number; glow: number }; position?: { x: number; y: number; z: number } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/future_car.glb');

  // Clone scene to avoid mutation issues if reused
  const clonedScene = useRef<THREE.Group>(null);
  useEffect(() => {
    if (scene) {
      clonedScene.current = scene.clone();
    }
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation
      groupRef.current.rotation.x += (rotation.x * 0.08 - groupRef.current.rotation.x) * 0.15;
      groupRef.current.rotation.y += (rotation.y * 0.08 - groupRef.current.rotation.y) * 0.15;

      // Smooth position (Grab gesture)
      groupRef.current.position.x += (position.x - groupRef.current.position.x) * 0.1;
      groupRef.current.position.y += (position.y - groupRef.current.position.y) * 0.1;
      groupRef.current.position.z += (position.z - groupRef.current.position.z) * 0.1;

      // Shake effect
      if (gestureEffect.shake > 0) {
        groupRef.current.position.x += (Math.sin(state.clock.elapsedTime * 20) * gestureEffect.shake * 0.1);
        groupRef.current.position.y += (Math.cos(state.clock.elapsedTime * 15) * gestureEffect.shake * 0.1);
      }

      // Pulse effect (scale)
      const baseScale = zoom * (1 + gestureEffect.pulse * 0.2);
      groupRef.current.scale.setScalar(baseScale);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {clonedScene.current && (
          <primitive
            object={clonedScene.current}
            scale={0.015} // Adjusted scale for car model
            rotation={[0, Math.PI / 4, 0]} // Initial rotation
            position={[0, -1, 0]}
          />
        )}
        {/* Add a subtle glow light when gesture active */}
        <pointLight
          position={[0, 2, 0]}
          intensity={gestureEffect.glow * 5}
          color="#00ffff"
          distance={5}
        />
      </group>
    </Float>
  );
};

// Card Gallery Model - Stacked cards
const CardGalleryModel = ({ rotation, zoom, gestureEffect }: { rotation: { x: number; y: number }; zoom: number; gestureEffect: { pulse: number; shake: number; glow: number } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cardsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (rotation.x * 0.06 - groupRef.current.rotation.x) * 0.12;
      groupRef.current.rotation.y += (rotation.y * 0.06 - groupRef.current.rotation.y) * 0.12;

      // Shake effect
      if (gestureEffect.shake > 0) {
        groupRef.current.position.x = (Math.sin(state.clock.elapsedTime * 20) * gestureEffect.shake * 0.1);
        groupRef.current.position.y = (Math.cos(state.clock.elapsedTime * 15) * gestureEffect.shake * 0.1);
      }
    }

    // Card fan effect with pulse
    cardsRef.current.forEach((card, i) => {
      if (card) {
        const offset = gestureEffect.pulse * 0.3;
        card.position.z = (i * -0.4) + offset;
        card.rotation.y = (i * 0.1) + (gestureEffect.pulse * 0.2);
      }
    });
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={zoom}>
        {[-1, 0, 1].map((i) => (
          <mesh
            key={i}
            ref={(el) => { if (el) cardsRef.current[i + 1] = el; }}
            position={[i * 0.8, i * 0.15, i * -0.4]}
            rotation={[0, i * 0.1, 0]}
            castShadow
          >
            <boxGeometry args={[2, 2.8, 0.08]} />
            <meshStandardMaterial
              color="#ffffff"
              metalness={0.8}
              roughness={0.2}
              emissive="#ffffff"
              emissiveIntensity={gestureEffect.glow * 0.2}
            />
          </mesh>
        ))}
        <mesh position={[0, 0, 1]}>
          <ringGeometry args={[0.6, 0.8, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={1}
            roughness={0}
            emissive="#ffffff"
            emissiveIntensity={gestureEffect.glow * 0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Data Visualization Model - 3D bars
const DataVizModel = ({ rotation, zoom, gestureEffect }: { rotation: { x: number; y: number }; zoom: number; gestureEffect: { pulse: number; shake: number; glow: number } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (rotation.x * 0.05 - groupRef.current.rotation.x) * 0.1;
      groupRef.current.rotation.y += (rotation.y * 0.05 - groupRef.current.rotation.y) * 0.1;

      // Shake effect
      if (gestureEffect.shake > 0) {
        groupRef.current.position.x = (Math.sin(state.clock.elapsedTime * 20) * gestureEffect.shake * 0.1);
        groupRef.current.position.y = (Math.cos(state.clock.elapsedTime * 15) * gestureEffect.shake * 0.1);
      }
    }
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        const baseHeight = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5;
        const pulseBoost = 1 + (gestureEffect.pulse * 0.5);
        const height = baseHeight * pulseBoost;
        bar.scale.y = height;
        bar.position.y = height / 2;
      }
    });
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} scale={zoom}>
        {[...Array(9)].map((_, i) => {
          const x = (i % 3 - 1) * 0.8;
          const z = (Math.floor(i / 3) - 1) * 0.8;
          return (
            <mesh
              key={i}
              ref={(el) => { if (el) barsRef.current[i] = el; }}
              position={[x, 0.5, z]}
              castShadow
            >
              <boxGeometry args={[0.5, 1, 0.5]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.9}
                roughness={0.1}
                emissive="#ffffff"
                emissiveIntensity={gestureEffect.glow * 0.2}
              />
            </mesh>
          );
        })}
        <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.5}
            opacity={0.3 + (gestureEffect.glow * 0.1)}
            transparent
          />
        </mesh>
      </group>
    </Float>
  );
};

// Gesture Indicator
const GestureIndicator = ({ gesture, confidence }: { gesture: string; confidence: number }) => {
  const labels: Record<string, string> = {
    none: 'AWAITING',
    open: 'ROTATING',
    pinch: 'ZOOMING',
    point: 'SELECTING',
    fist: 'GRABBING',
    thumbsUp: 'BOOSTING',
    peace: 'SPARKLING',
  };

  return (
    <motion.div
      className="absolute top-4 left-4 glass-card rounded-lg px-4 py-2.5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center gap-3">
        <Hand className="w-4 h-4" />
        <span className="text-xs font-mono uppercase tracking-wider">{labels[gesture]}</span>
        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full bg-foreground rounded-full" animate={{ width: `${confidence * 100}%` }} />
        </div>
      </div>
    </motion.div>
  );
};

interface GestureDemoProps {
  title: string;
  description: string;
  modelType?: 'product' | 'cards' | 'dataviz';
}

const GestureDemo = ({ title, description, modelType = 'product' }: GestureDemoProps) => {
  const { gestureState, isEnabled, isInteracting: globalIsInteracting, setIsInteracting: setGlobalIsInteracting } = useGesture();
  // We can use local state for immediate UI feedback, but we must sync with global
  const [isLocalInteracting, setIsLocalInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [gestureEffect, setGestureEffect] = useState({ pulse: 0, shake: 0, glow: 0 });

  // Sync local to global
  useEffect(() => {
    if (isLocalInteracting) {
      setGlobalIsInteracting(true);
    } else {
      // Only set false if WE were the ones interacting? 
      // Actually, if we click outside, we set local false, which sets global false.
      // But if another demo is active? 
      // For simplicity, let's assume one demo active at a time.
      // If we are not interacting locally, we shouldn't force global to false unless we were just interacting.
      // But the click outside handler handles the "stop interacting" event.
    }
  }, [isLocalInteracting, setGlobalIsInteracting]);

  // Handle click outside - this needs to be robust
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isLocalInteracting) {
          setIsLocalInteracting(false);
          setGlobalIsInteracting(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLocalInteracting, setGlobalIsInteracting]);

  const handleInteractionStart = () => {
    setIsLocalInteracting(true);
    setGlobalIsInteracting(true);
  };

  // Update model based on GLOBAL gesture state, BUT ONLY IF INTERACTING LOCALLY
  useEffect(() => {
    if (!isLocalInteracting || !isEnabled) return;

    // Map global gestures to local controls
    // gestureState.position is in screen pixels. We need to normalize or use relative movement.
    // Actually, GestureControl provides screen coordinates. 
    // We might want to use relative movement from the center of the demo container?
    // Or just map the normalized 0-1 position if we had it. 
    // Since we only have screen pixels, let's normalize by window size.

    const normX = gestureState.position.x / window.innerWidth;
    const normY = gestureState.position.y / window.innerHeight;

    if (gestureState.gesture === 'grab' || gestureState.gesture === 'fist') {
      // Rotate
      setRotation({
        x: (normY - 0.5) * 10,
        y: (normX - 0.5) * 10
      });
      setGestureEffect({ pulse: 0, shake: 0, glow: 0 });
    } else if (gestureState.gesture === 'click' || gestureState.gesture === 'pinch') {
      // Zoom
      // setZoom((prev) => Math.min(3, Math.max(0.5, prev + 0.01))); // Simple increment
      // Better: Map Y position to zoom
      setZoom(0.5 + (1 - normY) * 2);
      setGestureEffect({ pulse: 0.5, shake: 0, glow: 0.5 });
    } else {
      setGestureEffect({ pulse: 0, shake: 0, glow: 0 });
    }

  }, [gestureState, isLocalInteracting, isEnabled]);

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
    setPosition({ x: 0, y: 0, z: 0 });
    setGestureEffect({ pulse: 0, shake: 0, glow: 0 });
  };

  // Use FutureCarModel for 'product' type
  const ModelComponent = modelType === 'dataviz' ? DataVizModel : FutureCarModel;

  return (
    <div ref={containerRef} className="relative w-full h-full glass-card rounded-lg overflow-hidden flex flex-col justify-between group">
      {/* Interaction Overlay */}
      {!isLocalInteracting && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-opacity duration-300 hover:bg-black/30"
          onClick={handleInteractionStart}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-lg backdrop-blur-md">
              <MousePointer2 className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-mono uppercase tracking-widest text-white font-bold">Touch to Interact</p>
          </motion.div>
        </div>
      )}
      {/* Header */}
      <div className="relative z-20 p-5 bg-gradient-to-b from-background/90 to-transparent">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Live Demo</span>
        </div>
        <h3 className="text-lg font-display font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground font-mono">{description}</p>
      </div>

      {/* 3D Canvas or Carousel */}
      <div className="absolute inset-0 z-0 pt-24 pb-20 px-4">
        {modelType === 'cards' ? (
          <ThreeDPhotoCarousel gestureRotationY={rotation.y} gestureState={gestureState} />
        ) : (
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} />
              {/* Pass position to ModelComponent */}
              {modelType === 'product' ? (
                <FutureCarModel rotation={rotation} zoom={zoom} gestureEffect={gestureEffect} position={position} />
              ) : (
                <ModelComponent rotation={rotation} zoom={zoom} gestureEffect={gestureEffect} />
              )}
              <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={15} blur={2.5} />
              <Environment preset="studio" />
              {!isLocalInteracting && <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.5} />}
              {isLocalInteracting && <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />}
            </Suspense>
          </Canvas>
        )}
      </div>



      {isLocalInteracting && isEnabled && <GestureIndicator gesture={gestureState.gesture} confidence={gestureState.confidence} />}

      {/* Controls */}
      <div className="relative z-20 p-5 flex justify-end gap-2">
        <Button variant="outline" size="default" onClick={resetView} className="font-mono text-xs">
          <RotateCcw className="w-4 h-4 mr-2" /> Reset
        </Button>
      </div>

    </div>
  );
};

export default GestureDemo;
