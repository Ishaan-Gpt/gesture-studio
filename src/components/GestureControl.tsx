/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback } from 'react';
import { MousePointer2, Hand, Grab, MousePointerClick } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from '@/context/GestureContext';

// Global types for MediaPipe (since we're using CDN)
declare global {
    interface Window {
        Hands: any;
        Camera: any;
    }
}

// Fixed pointer ID for consistent pointer capture
const GESTURE_POINTER_ID = 9999;

const GestureControl = () => {
    const { isEnabled, setGestureState } = useGesture();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [hasError, setHasError] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const handsRef = useRef<any | null>(null);
    const cameraRef = useRef<any | null>(null);

    // Physics-based smoothing system (Spring-Damper)
    const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const currentPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const velocity = useRef({ x: 0, y: 0 });
    const lastRawPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const animFrameId = useRef<number>(0);

    // Gesture state
    const gesture = useRef<'none' | 'point' | 'click' | 'grab' | 'scroll'>('none');
    const clickCooldown = useRef(false);
    const scrollSpeed = useRef(1);
    const scrollDir = useRef<'up' | 'down' | null>(null);
    const grabbing = useRef(false);
    const grabTarget = useRef<Element | null>(null);
    const lastHovered = useRef<Element | null>(null);
    const landmarks = useRef<any[] | null>(null);

    // Initialize MediaPipe with ANTI-CRASH HARD VERSION LOCK
    useEffect(() => {
        if (isEnabled && !handsRef.current) {
            try {
                const HandsLib = (window as any).Hands;
                if (!HandsLib) throw new Error("MediaPipe Hands library not loaded from CDN");

                const hands = new HandsLib({
                    locateFile: (file: string) => `https://unpkg.com/@mediapipe/hands@0.4.1646424915/${file}`,
                });
                hands.setOptions({
                    maxNumHands: 1,
                    modelComplexity: 0,
                    minDetectionConfidence: 0.5,
                    minTrackingConfidence: 0.5,
                    selfieMode: true,
                });
                hands.onResults(onMediaPipe);
                handsRef.current = hands;
            } catch (error) {
                console.error("Critical MediaPipe Initialization Error:", error);
                setHasError(true);
            }
        }
    }, [isEnabled]);

    // Camera with HIGH-PERFORMANCE LOOP
    useEffect(() => {
        if (isEnabled && videoRef.current && handsRef.current && !hasError) {
            const CameraLib = (window as any).Camera;
            if (!CameraLib) {
                setHasError(true);
                return;
            }

            const camera = new CameraLib(videoRef.current, {
                onFrame: async () => {
                    if (handsRef.current && videoRef.current) {
                        try {
                            await handsRef.current.send({ image: videoRef.current });
                        } catch (e) {
                            console.error("Gesture Recognition Crash Prevented:", e);
                        }
                    }
                },
                width: 640, // Higher resolution for better tracking precision
                height: 480,
            });
            cameraRef.current = camera;
            camera.start().then(() => setIsCameraReady(true)).catch(() => setHasError(true));
        } else {
            cameraRef.current?.stop();
            cameraRef.current = null;
            setIsCameraReady(false);
        }
        return () => { cameraRef.current?.stop(); };
    }, [isEnabled, hasError]);

    // Create PointerEvent - Optimized for high frequency
    const createPointerEvent = (type: string, x: number, y: number, pressure: number = 0.5) => {
        return new PointerEvent(type, {
            view: window, bubbles: true, cancelable: true,
            clientX: x, clientY: y, screenX: x, screenY: y,
            pointerId: GESTURE_POINTER_ID, pointerType: 'touch',
            isPrimary: true, width: 20, height: 20, pressure,
            button: type.includes('down') ? 0 : -1,
            buttons: type.includes('down') || type.includes('move') ? 1 : 0,
        });
    };

    // HYPER-SMOOTH PHYSICS LOOP (Spring-Damper + Velocity Projection)
    useEffect(() => {
        if (!isEnabled || hasError) {
            cancelAnimationFrame(animFrameId.current);
            return;
        }

        const loop = () => {
            try {
                // Constants for the physics feel
                const stiffness = 0.15; // How fast it snaps
                const damping = 0.75; // How much it slides/overshoots (1 = no slide, 0.5 = slippery)
                const projection = 1.8; // Offset WASM latency by projecting current velocity forward

                // 1. Calculate Force
                const fx = (targetPos.current.x - currentPos.current.x) * stiffness;
                const fy = (targetPos.current.y - currentPos.current.y) * stiffness;

                // 2. Apply Acceleration to Velocity
                velocity.current.x = (velocity.current.x + fx) * damping;
                velocity.current.y = (velocity.current.y + fy) * damping;

                // 3. Update Current Position
                currentPos.current.x += velocity.current.x;
                currentPos.current.y += velocity.current.y;

                // 4. Projected Position for Interaction (Compensate for 50-80ms processing delay)
                const px = currentPos.current.x + (velocity.current.x * projection);
                const py = currentPos.current.y + (velocity.current.y * projection);

                const g = gesture.current;

                // Interaction Processing
                if (g === 'point' || g === 'none') {
                    processHover(px, py);
                } else if (g === 'grab') {
                    processGrab(px, py);
                } else if (g === 'scroll') {
                    processScroll();
                }

                // Batch state updates to prevent unnecessary React renders
                // We only update the public state at a slightly lower frequency or only when changed significantly
                setGestureState({ gesture: g, position: { x: px, y: py }, confidence: 0.9 });

                if (landmarks.current) drawHand(landmarks.current, px, py);

                animFrameId.current = requestAnimationFrame(loop);
            } catch (e) {
                animFrameId.current = requestAnimationFrame(loop);
            }
        };

        animFrameId.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animFrameId.current);
    }, [isEnabled, setGestureState, hasError]);

    // Hover processing
    const processHover = (x: number, y: number) => {
        const el = document.elementFromPoint(x, y);
        const last = lastHovered.current;

        if (el !== last) {
            if (last) {
                last.dispatchEvent(createPointerEvent('pointerleave', x, y, 0));
                last.dispatchEvent(createPointerEvent('pointerout', x, y, 0));
            }
            if (el) {
                el.dispatchEvent(createPointerEvent('pointerenter', x, y, 0));
                el.dispatchEvent(createPointerEvent('pointerover', x, y, 0));
            }
            lastHovered.current = el;
        }
        if (el) {
            el.dispatchEvent(createPointerEvent('pointermove', x, y, 0));
        }
    };

    // Grab processing - UNIVERSAL COMPATIBILITY
    const processGrab = (x: number, y: number) => {
        if (!grabbing.current) {
            // START GRAB
            const el = document.elementFromPoint(x, y);
            if (el) {
                grabTarget.current = el;

                // Fire BOTH PointerEvent and MouseEvent for universal compatibility
                el.dispatchEvent(createPointerEvent('pointerdown', x, y, 1));
                el.dispatchEvent(new MouseEvent('mousedown', {
                    view: window, bubbles: true, cancelable: true,
                    clientX: x, clientY: y, button: 0, buttons: 1
                }));

                // Try pointer capture for Framer Motion
                try {
                    (el as HTMLElement).setPointerCapture?.(GESTURE_POINTER_ID);
                } catch (e) { }

                grabbing.current = true;
            }
        } else if (grabTarget.current) {
            // CONTINUE DRAG - fire on element AND document
            grabTarget.current.dispatchEvent(createPointerEvent('pointermove', x, y, 1));
            grabTarget.current.dispatchEvent(new MouseEvent('mousemove', {
                view: window, bubbles: true, cancelable: true,
                clientX: x, clientY: y, button: 0, buttons: 1
            }));

            // Also document-level for libraries
            document.dispatchEvent(createPointerEvent('pointermove', x, y, 1));
            document.dispatchEvent(new MouseEvent('mousemove', {
                view: window, bubbles: true, cancelable: true,
                clientX: x, clientY: y, button: 0, buttons: 1
            }));
            document.dispatchEvent(createPointerEvent('pointermove', x, y, 1));
        }
    };

    // Release grab
    const releaseGrab = () => {
        if (grabbing.current && grabTarget.current) {
            const x = currentPos.current.x;
            const y = currentPos.current.y;

            // Release pointer capture
            try {
                (grabTarget.current as HTMLElement).releasePointerCapture?.(GESTURE_POINTER_ID);
            } catch (e) { }

            // Fire BOTH pointerup and mouseup
            grabTarget.current.dispatchEvent(createPointerEvent('pointerup', x, y, 0));
            grabTarget.current.dispatchEvent(new MouseEvent('mouseup', {
                view: window, bubbles: true, cancelable: true,
                clientX: x, clientY: y, button: 0, buttons: 0
            }));
            document.dispatchEvent(createPointerEvent('pointerup', x, y, 0));
            document.dispatchEvent(new MouseEvent('mouseup', {
                view: window, bubbles: true, cancelable: true,
                clientX: x, clientY: y, button: 0, buttons: 0
            }));

            grabbing.current = false;
            grabTarget.current = null;
        }
    };

    // Scroll processing - using WheelEvent
    const processScroll = () => {
        const y = currentPos.current.y;
        const dir = y < window.innerHeight * 0.5 ? 'up' : 'down';

        if (dir === scrollDir.current) {
            scrollSpeed.current = Math.min(scrollSpeed.current + 0.3, 12);
        } else {
            scrollSpeed.current = 1;
        }
        scrollDir.current = dir;

        const delta = dir === 'up' ? -scrollSpeed.current * 6 : scrollSpeed.current * 6;
        window.dispatchEvent(new WheelEvent('wheel', {
            deltaY: delta,
            deltaMode: 0,
            bubbles: true,
        }));
    };

    // MediaPipe results
    const onMediaPipe = useCallback((results: any) => {
        if (!results.multiHandLandmarks?.[0]) {
            gesture.current = 'none';
            landmarks.current = null;
            scrollSpeed.current = 1;
            scrollDir.current = null;
            releaseGrab();
            return;
        }

        const lm = results.multiHandLandmarks[0];
        landmarks.current = lm;

        // Gesture detection
        const indexUp = lm[8].y < lm[5].y;
        const middleUp = lm[12].y < lm[9].y;
        const ringUp = lm[16].y < lm[13].y;
        const pinkyUp = lm[20].y < lm[17].y;

        const isIndex = indexUp && !middleUp && !ringUp && !pinkyUp;
        const isOpenPalm = indexUp && middleUp && ringUp && pinkyUp;
        const isFist = !indexUp && !middleUp && !ringUp && !pinkyUp;

        // RELAXED PINCH: Increased threshold from 0.04 to 0.08 for easier clicking
        const isPinch = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y) < 0.08;

        // Update target position
        targetPos.current.x = lm[8].x * window.innerWidth;
        targetPos.current.y = lm[8].y * window.innerHeight;

        // Determine gesture
        if (isPinch && !clickCooldown.current) {
            gesture.current = 'click';
            const x = currentPos.current.x;
            const y = currentPos.current.y;

            // FUZZY CLICK: Search in a small radius to catch nearby buttons
            const getFuzzyTarget = (x: number, y: number) => {
                const offsets = [
                    [0, 0], [10, 0], [-10, 0], [0, 10], [0, -10],
                    [7, 7], [-7, -7], [7, -7], [-7, 7]
                ];
                for (const [ox, oy] of offsets) {
                    const el = document.elementFromPoint(x + ox, y + oy);
                    if (el && (el.tagName === 'BUTTON' || el.tagName === 'A' || el.closest('button') || el.closest('a'))) {
                        return el;
                    }
                }
                return document.elementFromPoint(x, y);
            };

            const el = getFuzzyTarget(x, y);
            if (el) {
                el.dispatchEvent(createPointerEvent('pointerdown', x, y, 1));
                el.dispatchEvent(createPointerEvent('pointerup', x, y, 0));
                el.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: x, clientY: y }));
            }
            clickCooldown.current = true;
            setTimeout(() => { clickCooldown.current = false; }, 400); // Slightly longer cooldown for stability
        } else if (isOpenPalm) {
            gesture.current = 'grab';
            scrollSpeed.current = 1;
            scrollDir.current = null;
        } else if (isFist) {
            gesture.current = 'scroll';
            releaseGrab();
        } else if (isIndex) {
            gesture.current = 'point';
            releaseGrab();
            scrollSpeed.current = 1;
            scrollDir.current = null;
        } else {
            releaseGrab();
        }
    }, []);

    // Optimized Hand drawing
    const drawHand = (lm: any[], px: number, py: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pts = lm.map(p => ({ x: p.x * canvas.width, y: p.y * canvas.height }));

        ctx.save();

        // Dynamic Glow based on gesture
        const isAction = gesture.current !== 'none' && gesture.current !== 'point';
        const glowColor = isAction ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)';

        // 1. Draw Connection Lines (Neural Style)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 2;
        [[0, 1, 2, 3, 4], [0, 5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16], [17, 18, 19, 20], [5, 9, 13, 17], [0, 17]].forEach(chain => {
            ctx.moveTo(pts[chain[0]].x, pts[chain[0]].y);
            chain.slice(1).forEach(i => ctx.lineTo(pts[i].x, pts[i].y));
        });
        ctx.stroke();

        // 2. Focused Aura around the interaction point (Projected position)
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 150);
        grad.addColorStop(0, glowColor);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.filter = 'blur(10px)';
        ctx.beginPath();
        ctx.arc(px, py, 100, 0, Math.PI * 2);
        ctx.fill();

        // 3. Fingertip Nodes
        ctx.filter = 'none';
        ctx.fillStyle = '#fff';
        [4, 8, 12, 16, 20].forEach(i => {
            ctx.beginPath();
            ctx.arc(pts[i].x, pts[i].y, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    };

    return (
        <>
            <AnimatePresence>
                {isEnabled && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed top-24 right-5 z-[9999] rounded-xl p-4 w-48 border border-white/20 backdrop-blur-xl bg-black/60"
                    >
                        <h4 className="text-[10px] uppercase tracking-wider text-white/60 mb-3 border-b border-white/10 pb-2">
                            Gestures
                        </h4>
                        <div className="space-y-2">
                            {[
                                { icon: MousePointer2, label: 'Cursor', hint: 'Index' },
                                { icon: MousePointerClick, label: 'Click', hint: 'Pinch' },
                                { icon: Hand, label: 'Grab', hint: 'Palm' },
                                { icon: Grab, label: 'Scroll', hint: 'Fist' },
                            ].map(({ icon: Icon, label, hint }) => (
                                <div key={label} className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                                        <Icon className="w-3 h-3 text-white/70" />
                                    </div>
                                    <span className="text-xs text-white">{label}</span>
                                    <span className="text-xs text-white/40 ml-auto">{hint}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <canvas
                ref={canvasRef}
                className={`fixed inset-0 z-[9997] pointer-events-none transition-opacity duration-200 ${isEnabled && isCameraReady ? 'opacity-100' : 'opacity-0'}`}
            />

            <video ref={videoRef} className="hidden" playsInline />

            <AnimatePresence>
                {isEnabled && !isCameraReady && !hasError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center"
                    >
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Hand className="w-6 h-6 text-white/80" />
                            </div>
                        </div>
                        <h3 className="text-xl font-display font-medium text-white mb-2">Starting Camera</h3>
                        <p className="text-sm text-white/50">Getting things ready...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {hasError && (
                <div className="fixed bottom-8 right-8 z-[10000] bg-red-900/90 backdrop-blur px-6 py-4 rounded-lg border border-red-500/50 flex items-center gap-4 max-w-md">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                        <span className="text-red-200 text-xl">!</span>
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-1">Gesture System Unavailable</h4>
                        <p className="text-sm text-white/60">Could not identify camera or load AI models. Please reload or check permissions.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default GestureControl;
