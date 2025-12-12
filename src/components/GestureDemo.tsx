import { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { Button } from '@/components/ui/button';
import { Camera as CameraIcon, Hand, RotateCcw, Loader2 } from 'lucide-react';
import * as THREE from 'three';

interface GestureState {
  gesture: 'none' | 'open' | 'pinch' | 'point' | 'fist';
  position: { x: number; y: number };
  confidence: number;
}

// Fallback 3D Product - Geometric Abstract Shape
const AbstractProduct = ({ rotation, zoom }: { rotation: { x: number; y: number }; zoom: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = rotation.x * 0.02;
      const targetY = rotation.y * 0.02;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={zoom}>
        {/* Main torus */}
        <mesh castShadow>
          <torusGeometry args={[1.5, 0.4, 32, 64]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Inner sphere */}
        <mesh castShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1}
          />
        </mesh>

        {/* Outer wireframe */}
        <mesh scale={1.1}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe opacity={0.15} transparent />
        </mesh>

        {/* Orbiting elements */}
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 3) * 2.2,
              0,
              Math.sin((i * Math.PI * 2) / 3) * 2.2
            ]}
          >
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// GLTF Model Component
const GLTFProduct = ({ rotation, zoom, url }: { rotation: { x: number; y: number }; zoom: number; url: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  useFrame(() => {
    if (groupRef.current) {
      const targetX = rotation.x * 0.02;
      const targetY = rotation.y * 0.02;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
    }
  });

  // Clone and apply white material to all meshes
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#ffffff',
          metalness: 0.8,
          roughness: 0.2,
        });
        child.castShadow = true;
      }
    });
  }, [scene]);

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={zoom * 2}>
        <primitive object={scene} />
      </group>
    </Float>
  );
};

// Gesture Indicator Overlay
const GestureIndicator = ({ gesture, confidence }: { gesture: string; confidence: number }) => {
  const gestureLabels: Record<string, string> = {
    none: 'AWAITING INPUT',
    open: 'ROTATING',
    pinch: 'ZOOMING',
    point: 'POINTING',
    fist: 'PAUSED',
  };

  return (
    <motion.div
      className="absolute top-4 left-4 glass-card rounded-lg p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Hand className="w-4 h-4 text-foreground" />
          <span className="text-xs font-mono uppercase tracking-wider">{gestureLabels[gesture]}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-foreground rounded-full"
              animate={{ width: `${confidence * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground">{Math.round(confidence * 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

// FPS Counter
const FPSCounter = () => {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const updateFPS = () => {
      frameCount.current++;
      const now = performance.now();
      if (now - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = now;
      }
      requestAnimationFrame(updateFPS);
    };
    const id = requestAnimationFrame(updateFPS);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="absolute bottom-4 left-4 glass-card rounded px-3 py-2">
      <span className="text-xs font-mono uppercase tracking-wider">
        <span className={fps >= 50 ? 'text-foreground' : 'text-muted-foreground'}>
          {fps} FPS
        </span>
      </span>
    </div>
  );
};

interface GestureDemoProps {
  title: string;
  description: string;
}

const GestureDemo = ({ title, description }: GestureDemoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gestureState, setGestureState] = useState<GestureState>({
    gesture: 'none',
    position: { x: 0, y: 0 },
    confidence: 0,
  });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  const detectGesture = useCallback((landmarks: any[]): GestureState => {
    if (!landmarks || landmarks.length === 0) {
      return { gesture: 'none', position: { x: 0, y: 0 }, confidence: 0 };
    }

    const hand = landmarks[0];
    const thumbTip = hand[4];
    const indexTip = hand[8];
    const middleTip = hand[12];
    const ringTip = hand[16];
    const pinkyTip = hand[20];
    const indexMcp = hand[5];

    const palmX = (hand[0].x + hand[5].x + hand[17].x) / 3;
    const palmY = (hand[0].y + hand[5].y + hand[17].y) / 3;

    // Pinch detection
    const thumbIndexDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
    if (thumbIndexDist < 0.06) {
      return { gesture: 'pinch', position: { x: palmX, y: palmY }, confidence: Math.min(1, 1 - thumbIndexDist / 0.06) };
    }

    // Open hand detection
    const fingersExtended = [
      indexTip.y < indexMcp.y,
      middleTip.y < hand[9].y,
      ringTip.y < hand[13].y,
      pinkyTip.y < hand[17].y,
    ].filter(Boolean).length;

    if (fingersExtended >= 3) {
      return { gesture: 'open', position: { x: palmX, y: palmY }, confidence: fingersExtended / 4 };
    }

    // Fist detection
    if (fingersExtended === 0) {
      return { gesture: 'fist', position: { x: palmX, y: palmY }, confidence: 0.9 };
    }

    // Point detection
    if (indexTip.y < indexMcp.y && fingersExtended <= 1) {
      return { gesture: 'point', position: { x: indexTip.x, y: indexTip.y }, confidence: 0.85 };
    }

    return { gesture: 'none', position: { x: palmX, y: palmY }, confidence: 0.5 };
  }, []);

  const onResults = useCallback((results: Results) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (canvas && ctx && videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const gesture = detectGesture(results.multiHandLandmarks);
        setGestureState(gesture);

        if (gesture.gesture === 'open') {
          setRotation({
            x: (gesture.position.y - 0.5) * 15,
            y: (gesture.position.x - 0.5) * 15,
          });
        }

        if (gesture.gesture === 'pinch') {
          setZoom((prev) => Math.max(0.5, Math.min(2.5, prev + (gesture.confidence - 0.5) * 0.03)));
        }

        // Draw hand skeleton
        results.multiHandLandmarks.forEach((landmarks) => {
          const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4],
            [0, 5], [5, 6], [6, 7], [7, 8],
            [5, 9], [9, 10], [10, 11], [11, 12],
            [9, 13], [13, 14], [14, 15], [15, 16],
            [13, 17], [17, 18], [18, 19], [19, 20],
            [0, 17],
          ];

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 2;
          connections.forEach(([start, end]) => {
            ctx.beginPath();
            ctx.moveTo(landmarks[start].x * canvas.width, landmarks[start].y * canvas.height);
            ctx.lineTo(landmarks[end].x * canvas.width, landmarks[end].y * canvas.height);
            ctx.stroke();
          });

          landmarks.forEach((landmark, index) => {
            ctx.beginPath();
            ctx.arc(
              landmark.x * canvas.width,
              landmark.y * canvas.height,
              index === 4 || index === 8 ? 5 : 3,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = index === 4 || index === 8 ? '#ffffff' : 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
          });
        });
      } else {
        setGestureState({ gesture: 'none', position: { x: 0, y: 0 }, confidence: 0 });
      }

      ctx.restore();
    }
  }, [detectGesture]);

  const enableCamera = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResults);
      handsRef.current = hands;

      if (videoRef.current) {
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (handsRef.current && videoRef.current) {
              await handsRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });

        cameraRef.current = camera;
        await camera.start();
        setCameraEnabled(true);
      }
    } catch (err) {
      console.error('Failed to enable camera:', err);
      setError('Camera access denied or unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
  };

  useEffect(() => {
    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] glass-card rounded-lg overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-background/90 to-transparent">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Live Demo</span>
        </div>
        <h3 className="text-xl font-display font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1 font-mono">{description}</p>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
            <AbstractProduct rotation={rotation} zoom={zoom} />
            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={0.3}
              scale={15}
              blur={2.5}
              far={4}
              color="#000000"
            />
            <Environment preset="studio" />
            {!cameraEnabled && <OrbitControls enableZoom enablePan={false} />}
          </Suspense>
        </Canvas>
      </div>

      {/* Camera Feed */}
      <video ref={videoRef} className="hidden" playsInline />
      
      <AnimatePresence>
        {cameraEnabled && (
          <motion.div
            className="absolute bottom-20 right-4 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="relative rounded-lg overflow-hidden border border-foreground/20">
              <canvas
                ref={canvasRef}
                className="w-48 h-36 object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Live</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gesture Indicator */}
      {cameraEnabled && (
        <GestureIndicator
          gesture={gestureState.gesture}
          confidence={gestureState.confidence}
        />
      )}

      {/* Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        {!cameraEnabled ? (
          <Button
            variant="tech"
            size="lg"
            onClick={enableCamera}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Initializing
              </>
            ) : (
              <>
                <CameraIcon className="w-4 h-4" />
                Enable Gesture Control
              </>
            )}
          </Button>
        ) : (
          <Button variant="outline" size="default" onClick={resetView}>
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="absolute bottom-4 left-4 z-20 glass-card rounded px-4 py-2">
          <span className="text-xs font-mono text-muted-foreground">{error}</span>
        </div>
      )}

      {/* FPS Counter */}
      {cameraEnabled && <FPSCounter />}

      {/* Gesture Instructions */}
      <AnimatePresence>
        {cameraEnabled && (
          <motion.div
            className="absolute top-24 right-4 z-10 glass-card rounded-lg p-4 max-w-[200px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h4 className="text-xs font-mono uppercase tracking-wider mb-3 text-muted-foreground">Controls</h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-lg">✋</span>
                <span className="text-muted-foreground">Open → Rotate</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">🤏</span>
                <span className="text-muted-foreground">Pinch → Zoom</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">✊</span>
                <span className="text-muted-foreground">Fist → Pause</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GestureDemo;