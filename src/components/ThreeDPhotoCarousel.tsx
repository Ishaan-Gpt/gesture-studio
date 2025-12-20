"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState, useRef } from "react"
import {
    AnimatePresence,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
    defaultValue?: boolean
    initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
    query: string,
    {
        defaultValue = false,
        initializeWithValue = true,
    }: UseMediaQueryOptions = {}
): boolean {
    const getMatches = (query: string): boolean => {
        if (IS_SERVER) {
            return defaultValue
        }
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState<boolean>(() => {
        if (initializeWithValue) {
            return getMatches(query)
        }
        return defaultValue
    })

    const handleChange = () => {
        setMatches(getMatches(query))
    }

    useIsomorphicLayoutEffect(() => {
        const matchMedia = window.matchMedia(query)
        handleChange()

        matchMedia.addEventListener("change", handleChange)

        return () => {
            matchMedia.removeEventListener("change", handleChange)
        }
    }, [query])

    return matches
}

const keywords = [
    "night",
    "city",
    "sky",
    "sunset",
    "sunrise",
    "winter",
    "skyscraper",
    "building",
    "cityscape",
    "architecture",
    "street",
    "lights",
    "downtown",
    "bridge",
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
    ({
        handleClick,
        controls,
        cards,
        isCarouselActive,
        gestureRotationY = 0,
    }: {
        handleClick: (imgUrl: string, index: number) => void
        controls: any
        cards: string[]
        isCarouselActive: boolean
        gestureRotationY?: number
    }) => {
        const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
        const cylinderWidth = isScreenSizeSm ? 1100 : 1800
        const faceCount = cards.length
        const faceWidth = cylinderWidth / faceCount
        const radius = cylinderWidth / (2 * Math.PI)
        const rotation = useMotionValue(0)
        const transform = useTransform(
            rotation,
            (value) => `rotate3d(0, 1, 0, ${value}deg)`
        )

        // Sync gesture rotation
        useEffect(() => {
            if (isCarouselActive) {
                // Auto-rotate if no gesture or not interacting (handled by parent passing 0 or specific value)
                // But here we receive gestureRotationY which is mapped from hand position.
                // If the user says "maintain default state of rotating slowly", we need an interval or animation loop.
                // Since we are in a component, we can use useAnimation or just a simple interval if not using R3F.

                // However, the parent passes `gestureRotationY` which is based on hand position.
                // If gestureRotationY is 0 (center), we might want to auto rotate?
                // Actually, let's just add the gesture offset to a base rotation that increments.

                // Let's use a ref to track base rotation
            }
        }, [isCarouselActive])

        // We need a frame loop for auto-rotation
        const autoRotateRef = useRef(0);

        useEffect(() => {
            let animationFrameId: number;

            const animate = () => {
                if (isCarouselActive) {
                    // Auto rotate slowly
                    autoRotateRef.current += 0.002;

                    // Apply gesture offset
                    // gestureRotationY is roughly -5 to 5
                    // Sensitivity reduced: multiply by 2 instead of 5
                    const targetRotation = autoRotateRef.current + (gestureRotationY * 1.5);

                    rotation.set(targetRotation);
                }
                animationFrameId = requestAnimationFrame(animate);
            };

            animate();

            return () => cancelAnimationFrame(animationFrameId);
        }, [isCarouselActive, gestureRotationY, rotation]);

        return (
            <div
                className="flex h-full items-center justify-center bg-transparent"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                <motion.div
                    drag={isCarouselActive ? "x" : false}
                    className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
                    style={{
                        transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d",
                    }}
                    onDrag={(_, info) =>
                        isCarouselActive &&
                        rotation.set(rotation.get() + info.offset.x * 0.05)
                    }
                    onDragEnd={(_, info) =>
                        isCarouselActive &&
                        controls.start({
                            rotateY: rotation.get() + info.velocity.x * 0.05,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 30,
                                mass: 0.1,
                            },
                        })
                    }
                    animate={controls}
                >
                    {cards.map((imgUrl, i) => (
                        <motion.div
                            key={`key-${imgUrl}-${i}`}
                            className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-transparent p-2"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${i * (360 / faceCount)
                                    }deg) translateZ(${radius}px)`,
                            }}
                            onClick={() => handleClick(imgUrl, i)}
                        >
                            <motion.img
                                src={imgUrl}
                                alt={`keyword_${i} ${imgUrl}`}
                                layoutId={`img-${imgUrl}`}
                                className="pointer-events-none w-full rounded-xl object-cover aspect-square hover:brightness-110 transition-all"
                                initial={{ filter: "blur(4px)" }}
                                layout="position"
                                animate={{ filter: "blur(0px)" }}
                                transition={transition}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        )
    }
)

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`

export function ThreeDPhotoCarousel({ gestureRotationY, gestureState }: { gestureRotationY?: number, gestureState?: any }) {
    const [activeImg, setActiveImg] = useState<string | null>(null)
    const [isCarouselActive, setIsCarouselActive] = useState(true)
    const controls = useAnimation()
    const cards = useMemo(
        () => keywords.map((keyword) => `https://picsum.photos/200/300?${keyword}`),
        []
    )

    // Handle pinch gesture to open/close
    useEffect(() => {
        if (gestureState?.gesture === 'pinch' && gestureState?.confidence > 0.8) {
            // If we want to open the center card, we need to know which one it is.
            // For now, let's just close if open, or maybe not interfere too much.
            // Actually, let's map 'pinch' to closing the active image if one is active.
            if (activeImg) {
                handleClose();
            }
        }
    }, [gestureState, activeImg])

    const handleClick = (imgUrl: string) => {
        setActiveImg(imgUrl)
        setIsCarouselActive(false)
        controls.stop()
    }

    const handleClose = () => {
        setActiveImg(null)
        setIsCarouselActive(true)
    }

    return (
        <motion.div layout className="relative w-full h-full">
            <AnimatePresence mode="sync">
                {activeImg && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        layoutId={`img-container-${activeImg}`}
                        layout="position"
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-10"
                        style={{ willChange: "opacity" }}
                        transition={transitionOverlay}
                    >
                        <motion.img
                            layoutId={`img-${activeImg}`}
                            src={activeImg}
                            className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.5,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            style={{
                                willChange: "transform",
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="relative h-full w-full overflow-hidden">
                <Carousel
                    handleClick={handleClick}
                    controls={controls}
                    cards={cards}
                    isCarouselActive={isCarouselActive}
                    gestureRotationY={gestureRotationY}
                />
            </div>
        </motion.div>
    )
}
