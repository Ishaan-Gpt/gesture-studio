import { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { Button } from '@/components/ui/button';
import { Camera as CameraIcon, Hand, RotateCcw, Loader2 } from 'lucide-react';
import * as THREE from 'three';

interface GestureState {
  gesture: 'none' | 'open' | 'pinch' | 'point' | 'fist' | 'thumbsUp' | 'peace';
  position: { x: number; y: number };
  confidence: number;
}

// Product Showcase Model - Torus composition
const ProductModel = ({ rotation, zoom }: { rotation: { x: number; y: number }; zoom: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (rotation.x * 0.08 - groupRef.current.rotation.x) * 0.15;
      groupRef.current.rotation.y += (rotation.y * 0.08 - groupRef.current.rotation.y) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} scale={zoom}>
        <mesh castShadow>
          <torusGeometry args={[1.8, 0.5, 32, 64]} />
          <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.05} envMapIntensity={2} />
        </mesh>
        <mesh ref={innerRef} castShadow>
          <dodecahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh scale={1.3}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe opacity={0.12} transparent />
        </mesh>
      </group>
    </Float>
  );
};

// Card Gallery Model - Stacked cards
const CardGalleryModel = ({ rotation, zoom }: { rotation: { x: number; y: number }; zoom: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (rotation.x * 0.06 - groupRef.current.rotation.x) * 0.12;
      groupRef.current.rotation.y += (rotation.y * 0.06 - groupRef.current.rotation.y) * 0.12;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={zoom}>
        {[-1, 0, 1].map((i) => (
          <mesh key={i} position={[i * 0.8, i * 0.15, i * -0.4]} rotation={[0, i * 0.1, 0]} castShadow>
            <boxGeometry args={[2, 2.8, 0.08]} />
            <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        <mesh position={[0, 0, 1]}>
          <ringGeometry args={[0.6, 0.8, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
        </mesh>
      </group>
    </Float>
  );
};

// Data Visualization Model - 3D bars
const DataVizModel = ({ rotation, zoom }: { rotation: { x: number; y: number }; zoom: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (rotation.x * 0.05 - groupRef.current.rotation.x) * 0.1;
      groupRef.current.rotation.y += (rotation.y * 0.05 - groupRef.current.rotation.y) * 0.1;
    }
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        const height = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5;
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
              <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
            </mesh>
          );
        })}
        <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} opacity={0.3} transparent />
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
    point: 'POINTING',
    fist: 'PAUSED',
    thumbsUp: 'APPROVED',
    peace: 'PEACE MODE',
  };

  return (
    <motion.div
      className="absolute top-4 left-4 glass-card rounded-lg px-3 py-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center gap-3">
        <Hand className="w-3 h-3" />
        <span className="text-[10px] font-mono uppercase tracking-wider">{labels[gesture]}</span>
        <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
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
    const thumbIp = hand[3];
    const indexTip = hand[8];
    const indexPip = hand[6];
    const middleTip = hand[12];
    const middlePip = hand[10];
    const ringTip = hand[16];
    const ringPip = hand[14];
    const pinkyTip = hand[20];
    const pinkyPip = hand[18];
    const wrist = hand[0];
    const indexMcp = hand[5];

    const palmX = (wrist.x + hand[5].x + hand[17].x) / 3;
    const palmY = (wrist.y + hand[5].y + hand[17].y) / 3;

    // Pinch
    const thumbIndexDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
    if (thumbIndexDist < 0.06) {
      return { gesture: 'pinch', position: { x: palmX, y: palmY }, confidence: 1 - thumbIndexDist / 0.06 };
    }

    // Finger extension checks
    const indexExtended = indexTip.y < indexPip.y;
    const middleExtended = middleTip.y < middlePip.y;
    const ringExtended = ringTip.y < ringPip.y;
    const pinkyExtended = pinkyTip.y < pinkyPip.y;
    const thumbExtended = thumbTip.x < thumbIp.x || thumbTip.y < thumbIp.y;

    // Peace sign (V)
    if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
      return { gesture: 'peace', position: { x: palmX, y: palmY }, confidence: 0.9 };
    }

    // Thumbs up
    if (thumbExtended && !indexExtended && !middleExtended && !ringExtended && !pinkyExtended && thumbTip.y < wrist.y) {
      return { gesture: 'thumbsUp', position: { x: palmX, y: palmY }, confidence: 0.9 };
    }

    // Point
    if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
      return { gesture: 'point', position: { x: indexTip.x, y: indexTip.y }, confidence: 0.85 };
    }

    // Fist
    if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
      return { gesture: 'fist', position: { x: palmX, y: palmY }, confidence: 0.9 };
    }

    // Open hand
    const extendedCount = [indexExtended, middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;
    if (extendedCount >= 3) {
      return { gesture: 'open', position: { x: palmX, y: palmY }, confidence: extendedCount / 4 };
    }

    return { gesture: 'none', position: { x: palmX, y: palmY }, confidence: 0.5 };
  }, []);

  const onResults = useCallback((results: Results) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (canvas && ctx && videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const gesture = detectGesture(results.multiHandLandmarks);
        setGestureState(gesture);

        if (gesture.gesture === 'open') {
          setRotation({
            x: (gesture.position.y - 0.5) * 50,
            y: (gesture.position.x - 0.5) * 50,
          });
        }

        if (gesture.gesture === 'pinch') {
          setZoom((prev) => Math.max(0.3, Math.min(3, prev + (gesture.confidence - 0.5) * 0.15)));
        }

        // Draw skeleton
        results.multiHandLandmarks.forEach((landmarks) => {
          const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4],
            [0, 5], [5, 6], [6, 7], [7, 8],
            [5, 9], [9, 10], [10, 11], [11, 12],
            [9, 13], [13, 14], [14, 15], [15, 16],
            [13, 17], [17, 18], [18, 19], [19, 20],
            [0, 17],
          ];

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 2;
          connections.forEach(([start, end]) => {
            ctx.beginPath();
            ctx.moveTo(landmarks[start].x * canvas.width, landmarks[start].y * canvas.height);
            ctx.lineTo(landmarks[end].x * canvas.width, landmarks[end].y * canvas.height);
            ctx.stroke();
          });

          landmarks.forEach((landmark, index) => {
            ctx.beginPath();
            ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, [4, 8, 12, 16, 20].includes(index) ? 4 : 2, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          });
        });
      } else {
        setGestureState({ gesture: 'none', position: { x: 0, y: 0 }, confidence: 0 });
      }
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
    } catch (err: any) {
      console.error('Camera error:', err);
      if (err?.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera access in your browser settings.');
      } else if (err?.name === 'NotFoundError') {
        setError('No camera found. Please connect a camera.');
      } else {
        setError('Camera error: ' + (err?.message || 'Unknown error'));
      }
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
      cameraRef.current?.stop();
      handsRef.current?.close();
    };
  }, []);

  const ModelComponent = modelType === 'cards' ? CardGalleryModel : modelType === 'dataviz' ? DataVizModel : ProductModel;

  return (
    <div className="relative w-full h-full min-h-[450px] glass-card rounded-lg overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-background/80 to-transparent">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Live Demo</span>
        </div>
        <h3 className="text-base font-display font-bold">{title}</h3>
        <p className="text-xs text-muted-foreground font-mono">{description}</p>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <ModelComponent rotation={rotation} zoom={zoom} />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={15} blur={2.5} />
            <Environment preset="studio" />
            {!cameraEnabled && <OrbitControls enableZoom enablePan={false} />}
          </Suspense>
        </Canvas>
      </div>

      <video ref={videoRef} className="hidden" playsInline />
      
      <AnimatePresence>
        {cameraEnabled && (
          <motion.div
            className="absolute bottom-16 right-4 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="relative rounded-lg overflow-hidden border border-foreground/20">
              <canvas ref={canvasRef} className="w-36 h-28 object-cover" style={{ transform: 'scaleX(-1)' }} />
              <div className="absolute top-1 left-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse" />
                <span className="text-[8px] font-mono uppercase">Live</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {cameraEnabled && <GestureIndicator gesture={gestureState.gesture} confidence={gestureState.confidence} />}

      {/* Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        {!cameraEnabled ? (
          <Button variant="tech" size="sm" onClick={enableCamera} disabled={isLoading}>
            {isLoading ? <><Loader2 className="w-3 h-3 animate-spin" /> Init...</> : <><CameraIcon className="w-3 h-3" /> Enable Gestures</>}
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={resetView}>
            <RotateCcw className="w-3 h-3" /> Reset
          </Button>
        )}
      </div>

      {error && (
        <div className="absolute bottom-4 left-4 z-20 glass-card rounded px-3 py-1.5">
          <span className="text-[10px] font-mono text-muted-foreground">{error}</span>
        </div>
      )}

      {/* Gesture Instructions */}
      <AnimatePresence>
        {cameraEnabled && (
          <motion.div
            className="absolute top-20 right-4 z-10 glass-card rounded-lg p-3 max-w-[160px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h4 className="text-[10px] font-mono uppercase tracking-wider mb-2 text-muted-foreground">6 Gestures</h4>
            <div className="space-y-1 text-[10px] font-mono">
              <div className="flex items-center gap-2"><span>✋</span><span className="text-muted-foreground">Open → Rotate</span></div>
              <div className="flex items-center gap-2"><span>🤏</span><span className="text-muted-foreground">Pinch → Zoom</span></div>
              <div className="flex items-center gap-2"><span>☝️</span><span className="text-muted-foreground">Point → Select</span></div>
              <div className="flex items-center gap-2"><span>✊</span><span className="text-muted-foreground">Fist → Pause</span></div>
              <div className="flex items-center gap-2"><span>👍</span><span className="text-muted-foreground">Thumb → Approve</span></div>
              <div className="flex items-center gap-2"><span>✌️</span><span className="text-muted-foreground">Peace → Mode</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GestureDemo;
