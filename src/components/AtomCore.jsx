import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    OrbitControls
} from "@react-three/drei";
import {
    EffectComposer,
    Bloom
} from "@react-three/postprocessing";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";


// ---------------- ATOM STRUCTURE ----------------

function AtomStructure() {

    const group = useRef();
    const nucleus = useRef();

    const electron1 = useRef();
    const electron2 = useRef();
    const electron3 = useRef();


    useFrame((state) => {

        const t = state.clock.getElapsedTime();

        /* Cursor Interaction */

        group.current.rotation.y =
            THREE.MathUtils.lerp(
                group.current.rotation.y,
                state.mouse.x * 0.4,
                0.05
            );

        group.current.rotation.x =
            THREE.MathUtils.lerp(
                group.current.rotation.x,
                -state.mouse.y * 0.4,
                0.05
            );


        /* Nucleus Pulse */

        const pulse = 1 + Math.sin(t * 2) * 0.05;
        nucleus.current.scale.set(pulse, pulse, pulse);


        /* Electron Motion */

        electron1.current.position.x = Math.sin(t) * 2.4;
        electron1.current.position.z = Math.cos(t) * 2.4;

        electron2.current.position.x = Math.sin(t + 2) * 2.4;
        electron2.current.position.y = Math.cos(t + 2) * 2.4;

        electron3.current.position.z = Math.sin(t + 4) * 2.4;
        electron3.current.position.y = Math.cos(t + 4) * 2.4;

    });


    return (

        <group ref={group} scale={1.5}>


            {/* SHINY METALLIC NUCLEUS */}

            <mesh ref={nucleus}>
                <sphereGeometry args={[0.9, 32, 32]} />

                <meshStandardMaterial
                    color="#E5E4E2"
                    emissive="#C0C0C0"
                    emissiveIntensity={0.5}
                    metalness={1}
                    roughness={0.1}
                />

            </mesh>



            {/* SILVER ORBIT RINGS */}

            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.4, 0.02, 16, 120]} />
                <meshStandardMaterial
                    color="#E5E4E2"
                    emissive="#FFFFFF"
                    emissiveIntensity={0.3}
                    metalness={1}
                />
            </mesh>


            <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[2.4, 0.02, 16, 120]} />
                <meshStandardMaterial
                    color="#E5E4E2"
                    emissive="#FFFFFF"
                    emissiveIntensity={0.3}
                    metalness={1}
                />
            </mesh>


            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                <torusGeometry args={[2.4, 0.02, 32, 200]} />
                <meshStandardMaterial
                    color="#E5E4E2"
                    emissive="#FFFFFF"
                    emissiveIntensity={0.3}
                    metalness={1}
                />
            </mesh>



            {/* ELECTRONS */}

            <mesh ref={electron1}>
                <sphereGeometry args={[0.14, 32, 32]} />

                <meshStandardMaterial
                    emissive="#E5E4E2"
                    emissiveIntensity={2}
                    color="#FFFFFF"
                />

            </mesh>


            <mesh ref={electron2}>
                <sphereGeometry args={[0.14, 32, 32]} />

                <meshStandardMaterial
                    emissive="#E5E4E2"
                    emissiveIntensity={2}
                    color="#FFFFFF"
                />

            </mesh>


            <mesh ref={electron3}>
                <sphereGeometry args={[0.14, 32, 32]} />

                <meshStandardMaterial
                    emissive="#E5E4E2"
                    emissiveIntensity={2}
                    color="#FFFFFF"
                />

            </mesh>

        </group>

    );
}



// ---------------- SCENE ----------------

export default function AtomCore() {
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            {isVisible && (
                <Canvas
                    camera={{ position: [0, 0, 25], fov: 40 }}
                    dpr={[1, 1.5]}

                    gl={{
                        antialias: true,
                        alpha: true
                    }}

                    style={{
                        width: "100%",
                        height: "100%",
                        background: "transparent"
                    }}

                    onCreated={({ gl, scene }) => {

                        gl.setClearColor(0x000000, 0);

                        scene.background = null;

                    }}

                >

                    {/* LIGHTING - COOL SILVER/WHITE */}

                    <ambientLight intensity={0.4} />


                    <pointLight
                        position={[0, 0, 12]}
                        intensity={3}
                        color="#E5E4E2"
                    />


                    <pointLight
                        position={[15, 10, 5]}
                        intensity={0.5}
                        color="#E5E4E2"
                    />

                    {/* VOLUMETRIC LIGHT SPILL */}
                    <pointLight
                        position={[10, 0, -10]}
                        intensity={2}
                        distance={50}
                        color="#E5E4E2"
                    />


                    <Float
                        speed={1}
                        floatIntensity={0.6}
                        rotationIntensity={0.15}
                    >

                        <AtomStructure />

                    </Float>



                    {/* CINEMATIC GLOW */}

                    <EffectComposer>

                        <Bloom
                            intensity={0.8}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                        />

                    </EffectComposer>



                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        makeDefault
                    />

                </Canvas>
            )}
        </div>
    );
}