import { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Environment, ContactShadows, Text } from '@react-three/drei';
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

// 3D Product Component
const Product3D = ({ rotation, zoom }: { rotation: { x: number; y: number }; zoom: number }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += (rotation.x * 0.02 - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (rotation.y * 0.02 - meshRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} scale={zoom}>
        {/* Futuristic Device - stylized phone/device */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 2.4, 0.15]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[1.05, 2.2, 0.01]} />
          <meshStandardMaterial 
            color="#00f0ff" 
            emissive="#00f0ff"
            emissiveIntensity={0.3}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        {/* Camera bump */}
        <mesh position={[0.3, 0.9, -0.1]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
          <meshStandardMaterial color="#0a0a0f" metalness={1} roughness={0} />
        </mesh>
        {/* Button */}
        <mesh position={[-0.65, 0, 0]}>
          <boxGeometry args={[0.03, 0.3, 0.08]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

// Gesture Indicator Overlay
const GestureIndicator = ({ gesture, confidence }: { gesture: string; confidence: number }) => {
  const gestureLabels: Record<string, string> = {
    none: 'Show hand to control',
    open: '✋ Rotating...',
    pinch: '🤏 Zooming...',
    point: '👆 Pointing...',
    fist: '✊ Paused',
  };

  return (
    <motion.div
      className="absolute top-4 left-4 glass-card p-3 flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center gap-2">
        <Hand className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium">{gestureLabels[gesture] || gesture}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${confidence * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{Math.round(confidence * 100)}%</span>
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
    <div className="absolute bottom-4 left-4 glass-card px-3 py-2">
      <span className="text-xs font-mono">
        <span className={fps >= 50 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
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
    const wrist = hand[0];
    const indexMcp = hand[5];

    // Calculate palm center
    const palmX = (hand[0].x + hand[5].x + hand[17].x) / 3;
    const palmY = (hand[0].y + hand[5].y + hand[17].y) / 3;

    // Pinch detection
    const thumbIndexDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
    if (thumbIndexDist < 0.05) {
      return { gesture: 'pinch', position: { x: palmX, y: palmY }, confidence: 1 - thumbIndexDist / 0.05 };
    }

    // Open hand detection (all fingers extended)
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

    // Point detection (only index extended)
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

        // Update rotation based on hand position
        if (gesture.gesture === 'open') {
          setRotation({
            x: (gesture.position.y - 0.5) * 10,
            y: (gesture.position.x - 0.5) * 10,
          });
        }

        // Update zoom on pinch
        if (gesture.gesture === 'pinch') {
          const pinchStrength = gesture.confidence;
          setZoom((prev) => Math.max(0.5, Math.min(2, prev + (pinchStrength - 0.5) * 0.02)));
        }

        // Draw hand landmarks
        results.multiHandLandmarks.forEach((landmarks) => {
          // Draw connections
          const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4],
            [0, 5], [5, 6], [6, 7], [7, 8],
            [5, 9], [9, 10], [10, 11], [11, 12],
            [9, 13], [13, 14], [14, 15], [15, 16],
            [13, 17], [17, 18], [18, 19], [19, 20],
            [0, 17],
          ];

          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2;
          connections.forEach(([start, end]) => {
            ctx.beginPath();
            ctx.moveTo(landmarks[start].x * canvas.width, landmarks[start].y * canvas.height);
            ctx.lineTo(landmarks[end].x * canvas.width, landmarks[end].y * canvas.height);
            ctx.stroke();
          });

          // Draw landmarks
          landmarks.forEach((landmark, index) => {
            ctx.beginPath();
            ctx.arc(
              landmark.x * canvas.width,
              landmark.y * canvas.height,
              index === 4 || index === 8 ? 6 : 4,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = index === 4 || index === 8 ? '#8b5cf6' : '#00f0ff';
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
    } catch (error) {
      console.error('Failed to enable camera:', error);
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
    <div className="relative w-full h-full min-h-[500px] glass-card overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-background/80 to-transparent">
        <h3 className="text-xl font-display font-bold gradient-text">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              color="#00f0ff"
            />
            <spotLight
              position={[-10, -10, -10]}
              angle={0.15}
              penumbra={1}
              intensity={0.5}
              color="#8b5cf6"
            />
            <Product3D rotation={rotation} zoom={zoom} />
            <ContactShadows
              position={[0, -2, 0]}
              opacity={0.4}
              scale={10}
              blur={2}
              far={4}
            />
            <Environment preset="city" />
            {!cameraEnabled && <OrbitControls enableZoom enablePan={false} />}
          </Suspense>
        </Canvas>
      </div>

      {/* Camera Feed (hidden video, visible canvas) */}
      <video ref={videoRef} className="hidden" playsInline />
      
      <AnimatePresence>
        {cameraEnabled && (
          <motion.div
            className="absolute bottom-20 right-4 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="relative rounded-xl overflow-hidden border-2 border-primary/30 shadow-glow">
              <canvas
                ref={canvasRef}
                className="w-48 h-36 object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium">LIVE</span>
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
            variant="glow"
            size="lg"
            onClick={enableCamera}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Initializing...
              </>
            ) : (
              <>
                <CameraIcon className="w-5 h-5" />
                Enable Gesture Control
              </>
            )}
          </Button>
        ) : (
          <Button variant="glass" size="default" onClick={resetView} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset View
          </Button>
        )}
      </div>

      {/* FPS Counter */}
      {cameraEnabled && <FPSCounter />}

      {/* Gesture Instructions */}
      <AnimatePresence>
        {cameraEnabled && (
          <motion.div
            className="absolute top-20 right-4 z-10 glass-card p-4 max-w-xs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h4 className="text-sm font-semibold mb-3">Gesture Controls</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">✋</span>
                <span className="text-muted-foreground">Open hand to rotate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🤏</span>
                <span className="text-muted-foreground">Pinch to zoom</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">✊</span>
                <span className="text-muted-foreground">Fist to pause</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GestureDemo;
