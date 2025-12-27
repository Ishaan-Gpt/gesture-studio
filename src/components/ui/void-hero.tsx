"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Geometry, Base, Subtraction } from '@react-three/csg'
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { useRef } from "react";
import { Mesh } from "three";

function Shape() {
    const meshRef = useRef<Mesh>(null);
    const innerSphereRef = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.5;
            meshRef.current.rotation.y += delta * 0.3;
            meshRef.current.rotation.z += delta * 0.2;
        }
        if (innerSphereRef.current) {
            innerSphereRef.current.rotation.x += delta * 0.3;
            innerSphereRef.current.rotation.y += delta * 0.5;
            innerSphereRef.current.rotation.z += delta * 0.1;
        }
    });

    return (
        <>
            <mesh ref={meshRef}>
                <meshPhysicalMaterial
                    roughness={0}
                    metalness={0.95}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    color="#000000"
                />

                <Geometry>
                    <Base>
                        <primitive
                            object={new RoundedBoxGeometry(2, 2, 2, 7, 0.2)}
                        />
                    </Base>

                    <Subtraction>
                        <sphereGeometry args={[1.25, 64, 64]} />
                    </Subtraction>
                </Geometry>
            </mesh>

            <mesh ref={innerSphereRef}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    emissive={"white"}
                    emissiveIntensity={1}
                />
            </mesh>
        </>
    );
}

function Environment() {
    return (
        <>
            <directionalLight position={[-5, 5, -5]} intensity={0.2} color="#e6f3ff" />
            <directionalLight position={[0, -5, 10]} intensity={0.4} color="#fff5e6" />
            <ambientLight intensity={0.8} color="#404040" />
            <pointLight position={[8, 3, 8]} intensity={0.2} color="#ffeecc" distance={20} />
            <pointLight position={[-8, 3, -8]} intensity={0.2} color="#ccf0ff" distance={20} />
            <directionalLight position={[0, -10, 0]} intensity={0.2} color="#f0f0f0" />
        </>
    );
}

function Scene() {
    return (
        <Canvas
            className="w-full h-full"
            camera={{ position: [5, 5, 5], fov: 50 }}
        >
            <Environment />
            <Shape />
        </Canvas>
    );
}

interface HeroProps {
    title: string;
    description: string;
}

export const VoidHero: React.FC<HeroProps> = ({ title, description }) => {
    return (
        <div className="h-screen w-full relative bg-[#0A0A0A]">
            {/* 3D Scene */}
            <div className="absolute inset-0">
                <Scene />
            </div>

            {/* Radial white light layers covering the whole hero */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.03) 40%, transparent 60%)'
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 55% 45%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 15%, transparent 35%)'
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 10%, transparent 25%)'
                }}
            />

            {/* Content */}
            {title && (
                <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 z-20 max-w-md">
                    <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-3 text-white">
                        {title}
                    </h1>
                    <p className="text-xs md:text-sm leading-relaxed font-light tracking-tight text-white/50">
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
}
