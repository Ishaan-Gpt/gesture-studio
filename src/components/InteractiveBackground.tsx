import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Vector2 } from 'three';
import * as THREE from 'three';

const VertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  // Mouse influence
  float mouseDist = distance(uv, uMouse);
  float mouseInteraction = smoothstep(0.5, 0.0, mouseDist);
  
  // Noise layers
  float n1 = snoise(uv * 3.0 + uTime * 0.1);
  float n2 = snoise(uv * 6.0 - uTime * 0.2 + mouseInteraction * 0.5);
  float n3 = snoise(uv * 12.0 + uTime * 0.15);
  
  // Combine noise
  float finalNoise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
  
  // Color mixing
  vec3 color = mix(uColor1, uColor2, finalNoise + 0.5);
  
  // Vignette
  float vignette = 1.0 - length(uv - 0.5) * 1.5;
  
  // Scanline effect
  float scanline = sin(uv.y * 200.0 + uTime * 5.0) * 0.05;
  
  gl_FragColor = vec4(color * vignette + scanline, 1.0);
}
`;

const BackgroundMesh = () => {
    const mesh = useRef<THREE.Mesh>(null);
    const mousePosition = useRef(new Vector2(0.5, 0.5));

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new Vector2(0.5, 0.5) },
            uColor1: { value: new Color('#050505') }, // Deep black
            uColor2: { value: new Color('#0a0a1a') }, // Dark blue-ish
        }),
        []
    );

    useFrame((state) => {
        if (mesh.current) {
            // Update time
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();

            // Smooth mouse lerp
            const targetX = (state.mouse.x + 1) / 2;
            const targetY = (state.mouse.y + 1) / 2;

            mousePosition.current.x += (targetX - mousePosition.current.x) * 0.1;
            mousePosition.current.y += (targetY - mousePosition.current.y) * 0.1;

            (mesh.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.copy(mousePosition.current);
        }
    });

    return (
        <mesh ref={mesh} scale={[20, 20, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={VertexShader}
                fragmentShader={FragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};

const InteractiveBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <BackgroundMesh />
            </Canvas>
        </div>
    );
};

export default InteractiveBackground;
