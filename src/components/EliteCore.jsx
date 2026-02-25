import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    OrbitControls,
    Points,
    PointMaterial,
    Environment,
} from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function CoreStructure() {
    const group = useRef();
    const outerRing = useRef();
    const innerRing = useRef();
    const core = useRef();

    useFrame((state) => {
        const { mouse } = state;
        if (group.current) {
            group.current.rotation.y += 0.002;
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.2, 0.1);
            group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, mouse.x * 0.2, 0.1);
        }
        if (outerRing.current) outerRing.current.rotation.y += 0.003;
        if (innerRing.current) innerRing.current.rotation.y -= 0.004;
        if (core.current) core.current.rotation.y += 0.002;
    });

    return (
        <group ref={group}>
            {/* OUTER GOLD RING */}
            <mesh ref={outerRing}>
                <torusGeometry args={[2.5, 0.05, 32, 120]} />
                <meshStandardMaterial
                    color="#D4AF37"
                    emissive="#D4AF37"
                    emissiveIntensity={0.2}
                    metalness={1}
                    roughness={0.2}
                />
            </mesh>

            {/* INNER DARK RING */}
            <mesh ref={innerRing}>
                <torusGeometry args={[1.8, 0.08, 32, 120]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    emissive="#1a1a1a"
                    emissiveIntensity={0.5}
                    metalness={1}
                    roughness={0.3}
                />
            </mesh>

            {/* CORE SHIELD */}
            <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.15}
                    metalness={1}
                    roughness={0}
                />
            </mesh>

            {/* AI CORE */}
            <mesh ref={core}>
                <icosahedronGeometry args={[0.6, 2]} />
                <meshStandardMaterial
                    color="#D4AF37"
                    emissive="#D4AF37"
                    emissiveIntensity={1}
                    metalness={1}
                    roughness={0.1}
                />
            </mesh>
        </group>
    );
}

function ParticleField() {
    const particles = useMemo(() => {
        const positions = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, []);

    return (
        <Points positions={particles} stride={3}>
            <PointMaterial color="#D4AF37" size={0.03} sizeAttenuation depthWrite={false} transparent opacity={0.4} />
        </Points>
    );
}

export default function EliteCore() {
    return (
        <div className="elite-core-canvas-container" style={{
            width: '100%',
            height: '600px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Suspense fallback={<div style={{ color: '#D4AF37', textAlign: 'center' }}>INITIALIZING...</div>}>
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 40 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <color attach="background" args={['#000000']} />
                    <Environment preset="studio" environmentIntensity={0.5} />

                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, 10]} intensity={0.5} color="#D4AF37" />

                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <group scale={1.2}>
                            <CoreStructure />
                        </group>
                    </Float>

                    <ParticleField />

                    <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
            </Suspense>
        </div>
    );
}
