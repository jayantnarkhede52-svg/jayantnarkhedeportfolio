import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Text,
  Float,
  Sparkles,
  Html,
  MeshReflectorMaterial,
  ContactShadows,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import ProjectGallery from './ProjectGallery';

const PROJECTS = [
  { id: 1, name: 'Zinco Roofing', role: 'React + SEO', color: '#c084fc', desc: 'Industrial platform dominating local search.' },
  { id: 2, name: 'E Green Solution', role: 'Lead Gen', color: '#67e8f9', desc: 'High-converting solar energy landing pages.' },
  { id: 3, name: 'Growth Pilot', role: 'AI + Next.js', color: '#86efac', desc: 'LLM-powered technical SEO audit tool.' },
  { id: 4, name: 'Salary Predictor', role: 'Python ML', color: '#fbbf24', desc: 'Machine learning salary projection engine.' },
];

const SKILLS = [
  { name: 'React/Vite', val: 95 },
  { name: 'Three.js', val: 80 },
  { name: 'Technical SEO', val: 95 },
  { name: 'Next.js', val: 85 },
];

const SCROLL_SEGMENTS = [
  { label: 'INTRO', hint: 'Wide establishing shot' },
  { label: 'MORNING', hint: 'Coffee & Greenery' },
  { label: 'STATION', hint: 'The MacBook Setup' },
  { label: 'PERIPHERALS', hint: 'Keyboard & Mouse' },
  { label: 'GEAR', hint: 'Headphones & Lighting' },
  { label: 'PROJECTS', hint: 'Monitor gallery opens' },
];

const CAMERA_STOPS = [
  {
    at: 0,
    pos: new THREE.Vector3(0, 4.5, 9.5), // Slightly higher camera
    look: new THREE.Vector3(0, 1.8, 0),
  },
  {
    at: 0.12,
    pos: new THREE.Vector3(-2.8, 1.8, 3.8), 
    look: new THREE.Vector3(-3.2, 0.6, 2.0),
  },
  {
    at: 0.25,
    pos: new THREE.Vector3(-3.5, 2.2, 1.5), 
    look: new THREE.Vector3(-2.95, 1.0, 0.48),
  },
  {
    at: 0.4,
    pos: new THREE.Vector3(0, 2.2, 3.8), 
    look: new THREE.Vector3(0, 0.8, 2.1),
  },
  {
    at: 0.52,
    pos: new THREE.Vector3(2.8, 2.0, 2.8), 
    look: new THREE.Vector3(2.2, 0.7, 1.8),
  },
  {
    at: 0.65,
    pos: new THREE.Vector3(4.5, 2.6, 1.5), 
    look: new THREE.Vector3(3.65, 1.4, 1.0),
  },
  {
    at: 0.8,
    pos: new THREE.Vector3(0, 2.8, 3.8), 
    look: new THREE.Vector3(0, 1.8, -0.5),
  },
  {
    at: 1,
    pos: new THREE.Vector3(0, 2.8, 3.8), 
    look: new THREE.Vector3(0, 1.8, -0.5),
  },
];

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const easeInOut = (value) => value * value * (3 - 2 * value);
const getCanvasDpr = () => (typeof window !== 'undefined' ? Math.min(2, window.devicePixelRatio) : 1);

function CameraRig({ scrollProgress }) {
  const { camera, size } = useThree();
  const targetPos = useRef(CAMERA_STOPS[0].pos.clone());
  const targetLook = useRef(CAMERA_STOPS[0].look.clone());

  useEffect(() => {
    camera.fov = size.width < 700 ? 55 : 42;
    camera.near = 0.1;
    camera.far = 60;
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  useFrame(({ clock }) => {
    const p = scrollProgress.current;
    const currentIndex = CAMERA_STOPS.findIndex((stop, index) => {
      const nextStop = CAMERA_STOPS[index + 1];
      return nextStop && p >= stop.at && p <= nextStop.at;
    });
    const start = CAMERA_STOPS[Math.max(0, currentIndex)];
    const end = CAMERA_STOPS[Math.max(1, currentIndex + 1)];
    const localProgress = easeInOut(clamp01((p - start.at) / (end.at - start.at)));

    const pos = new THREE.Vector3().lerpVectors(start.pos, end.pos, localProgress);
    const look = new THREE.Vector3().lerpVectors(start.look, end.look, localProgress);

    if (size.width < 700) {
      const mobilePullback = 1.85 * (1 - p * 0.35);
      pos.z += mobilePullback;
      pos.y += 0.32;
      look.y += 0.14;
    }

    const breathing = Math.sin(clock.elapsedTime * 0.35) * 0.035;
    pos.x += breathing;
    pos.y += breathing * 0.45;

    targetPos.current.lerp(pos, 0.04);
    targetLook.current.lerp(look, 0.045);
    camera.position.copy(targetPos.current);
    camera.lookAt(targetLook.current);
  });

  return null;
}

function RoomShell() {
  return (
    <group>
      <mesh position={[0, -0.035, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 14, 18, 14]} />
        <MeshReflectorMaterial
          color="#05050a"
          roughness={0.72}
          metalness={0.2}
          blur={[320, 80]}
          resolution={512}
          mixBlur={0.7}
          mixStrength={0.18}
          mirror={0.18}
        />
      </mesh>

      <mesh position={[0, 3.2, -4.7]}>
        <planeGeometry args={[18, 6.5]} />
        <meshStandardMaterial color="#070912" roughness={0.85} metalness={0.05} />
      </mesh>

      <mesh position={[-7.6, 3.2, 0.6]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10.6, 6.5]} />
        <meshStandardMaterial color="#05060d" roughness={0.9} metalness={0.05} />
      </mesh>

      <mesh position={[7.6, 3.2, 0.6]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10.6, 6.5]} />
        <meshStandardMaterial color="#05060d" roughness={0.9} metalness={0.05} />
      </mesh>

      <mesh position={[0, 0.02, -4.68]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 0.08]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function AcousticFoamWall() {
  const tiles = useMemo(() => {
    const cells = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 18; col++) {
        const x = (col - 8.5) * 0.56;
        const y = 1.15 + row * 0.46;
        const isSignZone = x > -5.25 && x < -2.25 && y > 2.05;
        const isWindowZone = x > 2.4 && x < 5.2 && y > 1.6;
        if (isSignZone || isWindowZone) continue;

        cells.push({
          id: `${row}-${col}`,
          x,
          y,
          depth: 0.028 + ((row + col) % 2) * 0.032,
          shade: (row + col) % 3,
        });
      }
    }
    return cells;
  }, []);

  return (
    <group position={[0, 0, -4.57]}>
      {tiles.map((tile) => (
        <mesh key={tile.id} position={[tile.x, tile.y, tile.depth * 0.5]} castShadow>
          <boxGeometry args={[0.5, 0.38, tile.depth]} />
          <meshStandardMaterial
            color={tile.shade === 0 ? '#0b0d16' : tile.shade === 1 ? '#101321' : '#070911'}
            roughness={0.94}
            metalness={0.02}
          />
        </mesh>
      ))}
    </group>
  );
}

function NeonSign() {
  return (
    <group position={[-3.75, 2.85, -4.58]} rotation={[0, 0.04, 0]}>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.75, 0.85]} />
        <meshBasicMaterial color="#090714" transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0, 0.08, 0.02]}
        fontSize={0.42}
        color="#f5f3ff"
        anchorX="center"
        anchorY="middle"
        glyphGeometryDetail={8}
        material-toneMapped={false}
      >
        J.LAB
      </Text>
      <Text
        position={[0, -0.32, 0.02]}
        fontSize={0.095}
        color="#67e8f9"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.22}
        glyphGeometryDetail={6}
        material-toneMapped={false}
      >
        BUILD MODE ACTIVE
      </Text>
      <mesh position={[-1.12, 0.42, 0.03]}>
        <boxGeometry args={[0.58, 0.18, 0.025]} />
        <meshBasicMaterial color="#ef4444" toneMapped={false} />
      </mesh>
      <Text
        position={[-1.12, 0.42, 0.055]}
        fontSize={0.07}
        color="#fff7ed"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        material-toneMapped={false}
      >
        ON AIR
      </Text>
      <mesh position={[0, -0.5, 0.02]}>
        <boxGeometry args={[2.2, 0.025, 0.025]} />
        <meshBasicMaterial color="#c084fc" toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0, 0.45]} color="#c084fc" intensity={2.1} distance={5.5} />
      <pointLight position={[0.75, -0.3, 0.5]} color="#67e8f9" intensity={1.2} distance={4} />
    </group>
  );
}

function WindowPanel() {
  return (
    <group position={[3.9, 2.55, -4.56]}>
      <mesh>
        <planeGeometry args={[2.5, 1.75]} />
        <meshStandardMaterial color="#07101d" roughness={0.28} metalness={0.2} emissive="#061226" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[2.22, 1.42]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.075} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[2.58, 0.035, 0.035]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.78, 0.035, 0.035]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.35} />
      </mesh>
      <Sparkles count={28} scale={[2, 1.2, 0.2]} size={1.5} speed={0.12} color="#67e8f9" opacity={0.45} />
    </group>
  );
}

function DeskSurface() {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[10.6, 5.15, 0.14]} />
        <meshPhysicalMaterial
          color="#090812"
          roughness={0.45}
          metalness={0.35}
          clearcoat={0.35}
          clearcoatRoughness={0.55}
        />
      </mesh>

      <mesh position={[0, 0.085, 1.22]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8.4, 3.6]} />
        <meshPhysicalMaterial color="#070707" roughness={0.82} metalness={0.04} clearcoat={0.18} clearcoatRoughness={0.72} />
      </mesh>

      <mesh position={[0, 0.092, 1.22]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.5, 3.7]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.1} />
      </mesh>

      {[
        [0, 0.104, -0.62, 8.08, 0.018],
        [0, 0.104, 3.06, 8.08, 0.018],
        [-4.14, 0.104, 1.22, 0.018, 3.24],
        [4.14, 0.104, 1.22, 0.018, 3.24],
      ].map(([x, y, z, width, depth]) => (
        <mesh key={`${x}-${z}`} position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width, depth]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.24} />
        </mesh>
      ))}
    </group>
  );
}

function Key({ pos, color, width }) {
  const [active, setActive] = useState(false);
  const glowIntensity = active ? 2.5 : color === '#14141d' ? 0.02 : 0.45;

  return (
    <mesh 
      position={pos} 
      castShadow 
      onClick={(e) => {
        e.stopPropagation();
        setActive(true);
        setTimeout(() => setActive(false), 250);
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <boxGeometry args={[width, 0.075, 0.19]} />
      <meshStandardMaterial
        color={active ? '#fff' : color}
        emissive={active ? '#67e8f9' : color}
        emissiveIntensity={glowIntensity}
        roughness={0.25}
        metalness={0.55}
      />
    </mesh>
  );
}

function Keyboard() {
  const keys = useMemo(() => {
    const accents = new Set(['0-1', '0-10', '1-3', '2-8', '3-2', '4-11']);

    return Array.from({ length: 5 }).flatMap((_, row) =>
      Array.from({ length: 13 }).map((__, col) => {
        const isWide = row === 4 && (col === 4 || col === 5 || col === 6 || col === 7);
        const width = isWide ? 0.42 : 0.2;
        const x = (col - 6) * 0.24 + (isWide ? 0.03 : 0);
        const z = (row - 2) * 0.24;
        const accent = accents.has(`${row}-${col}`);
        const color = accent ? (col % 2 ? '#c084fc' : '#67e8f9') : '#14141d';

        return { id: `${row}-${col}`, pos: [x, 0, z], color, width };
      })
    );
  }, []);

  return (
    <group position={[0, 0.18, 2.1]} rotation={[0.04, 0, 0]} castShadow>
      <mesh position={[0, -0.07, 0]}>
        <boxGeometry args={[3.45, 0.12, 1.5]} />
        <meshPhysicalMaterial color="#06060a" metalness={0.82} roughness={0.28} clearcoat={0.45} />
      </mesh>
      <mesh position={[0, -0.13, 0]}>
        <boxGeometry args={[3.58, 0.024, 1.62]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.28} toneMapped={false} />
      </mesh>

      {keys.map((key) => (
        <Key key={key.id} {...key} />
      ))}

      <Text position={[-1.58, 0.08, -0.9]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.09} color="#67e8f9" anchorX="left">
        CTRL ALT CREATE
      </Text>
    </group>
  );
}

function Mouse() {
  const glowRef = useRef();

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.opacity = 0.38 + Math.sin(clock.elapsedTime * 2.2) * 0.18;
    }
  });

  return (
    <group position={[2.55, 0.17, 2.12]} rotation={[0, -0.22, 0]}>
      <mesh position={[0, 0.08, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.42, 16, 32]} />
        <meshPhysicalMaterial color="#08080d" metalness={0.82} roughness={0.24} clearcoat={0.5} />
      </mesh>
      <mesh position={[0, -0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.72, 1.08]} />
        <meshBasicMaterial ref={glowRef} color="#67e8f9" transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.33, -0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 0.05, 16]} />
        <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={0.55} />
      </mesh>
    </group>
  );
}

function Monitor({ scrollProgress, monitorContentRef }) {
  const screenGroup = useRef();

  useFrame(({ clock }) => {
    const p = scrollProgress.current;

    if (screenGroup.current) {
      screenGroup.current.position.y = Math.sin(p * Math.PI) * 0.08 + Math.sin(clock.elapsedTime * 0.8) * 0.015;
      screenGroup.current.rotation.z = Math.sin(clock.elapsedTime * 0.45) * 0.002;
    }
  });

  return (
    <group position={[0, 0.08, -1.05]}>
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.58, 0.76, 0.1, 40]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.2} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.92, -0.18]} rotation={[-0.18, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 1.8, 0.12]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.1} roughness={0.4} />
      </mesh>

      <group position={[0, 2, 0]} rotation={[-0.045, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[6.32, 3.7, 0.12]} />
          <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.2} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[6.04, 3.42]} />
          <meshBasicMaterial color="#010103" />
        </mesh>

        <group ref={screenGroup} position={[0, 0, 0.09]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[6.02, 3.4]} />
            <meshBasicMaterial color="#02020a" />
          </mesh>
          <group ref={monitorContentRef}>
            <group position={[0, 1.45, 0.035]}>
              <Text position={[0, 0, 0]} fontSize={0.22} color="#ffffff" anchorX="center" glyphGeometryDetail={8}>
                CREATIVE LAB
              </Text>
              <Text position={[0, -0.2, 0]} fontSize={0.08} color="#c084fc" anchorX="center" letterSpacing={0.2} material-toneMapped={false} glyphGeometryDetail={6}>
                CREATIVE DEVELOPER
              </Text>
            </group>
          </group>
        </group>

        <pointLight position={[0, 0, 0.45]} color="#67e8f9" intensity={2.2} distance={7} />
        <pointLight position={[1.4, -0.2, 0.65]} color="#c084fc" intensity={0.75} distance={4} />
      </group>
    </group>
  );
}

function Laptop() {
  return (
    <group position={[-2.95, 0.17, 0.48]} rotation={[0, 0.32, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.28, 0.065, 1.38]} />
        <meshPhysicalMaterial color="#c7ccd4" metalness={0.72} roughness={0.26} clearcoat={0.36} />
      </mesh>
      <mesh position={[0, 0.045, 0.08]}>
        <planeGeometry args={[1.68, 0.88]} />
        <meshBasicMaterial color="#111827" transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0.052, 0.46]}>
        <planeGeometry args={[0.46, 0.18]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.8} />
      </mesh>

      <group position={[0, 0.08, -0.66]} rotation={[-1.03, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.24, 1.28, 0.07]} />
          <meshPhysicalMaterial color="#d1d5db" metalness={0.7} roughness={0.24} clearcoat={0.52} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.0, 1.06]} />
          <meshBasicMaterial color="#020617" />
        </mesh>
        <Text position={[-0.88, 0.4, 0.052]} fontSize={0.075} color="#67e8f9" anchorX="left" material-toneMapped={false} glyphGeometryDetail={6}>
          secondary.dashboard
        </Text>
        <Text position={[-0.88, 0.2, 0.052]} fontSize={0.05} color="#86efac" anchorX="left" glyphGeometryDetail={2}>
          {"> SYSTEM_STABLE_V1.0"}
        </Text>
        <Text position={[-0.88, -0.22, 0.052]} fontSize={0.065} color="#c084fc" anchorX="left" material-toneMapped={false} glyphGeometryDetail={4}>
          seo crawl: clean
        </Text>
        {[-0.46, -0.18, 0.1, 0.38].map((x, index) => (
          <mesh key={x} position={[x, -0.43, 0.055]}>
            <planeGeometry args={[0.18, 0.34 + index * 0.04]} />
            <meshBasicMaterial color={index % 2 ? '#c084fc' : '#67e8f9'} transparent opacity={0.45} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <pointLight position={[0.2, 0.68, -0.2]} color="#67e8f9" intensity={0.6} distance={2.5} />
    </group>
  );
}

function Headphones() {
  return (
    <group position={[3.65, 0.12, 0.42]} rotation={[0, -0.32, 0]}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.34, 0.4, 0.045, 32]} />
        <meshStandardMaterial color="#0a0a0f" metalness={0.65} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.18, 16]} />
        <meshStandardMaterial color="#242432" metalness={0.78} roughness={0.24} />
      </mesh>
      <mesh position={[0, 1.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.95, 16]} />
        <meshStandardMaterial color="#242432" metalness={0.78} roughness={0.24} />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <torusGeometry args={[0.47, 0.035, 12, 36, Math.PI]} />
        <meshStandardMaterial color="#0d0d12" metalness={0.82} roughness={0.22} />
      </mesh>
      <mesh position={[-0.5, 0.78, 0]} rotation={[0, 0, 0.12]} castShadow>
        <capsuleGeometry args={[0.16, 0.2, 12, 22]} />
        <meshStandardMaterial color="#101018" emissive="#c084fc" emissiveIntensity={0.08} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.5, 0.78, 0]} rotation={[0, 0, -0.12]} castShadow>
        <capsuleGeometry args={[0.16, 0.2, 12, 22]} />
        <meshStandardMaterial color="#101018" emissive="#67e8f9" emissiveIntensity={0.08} metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

function DeskLamp({ lampOn, setLampOn }) {
  return (
    <group position={[3.65, 0.12, 1.62]} rotation={[0, -0.36, 0]}>
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.42, 0.08, 32]} />
        <meshStandardMaterial color={lampOn ? "#101014" : "#050508"} metalness={0.72} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.56, 0]} rotation={[0.2, 0, -0.24]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.04, 16]} />
        <meshStandardMaterial color="#262633" metalness={0.78} roughness={0.22} />
      </mesh>
      <mesh position={[-0.2, 1.03, -0.16]} rotation={[0.88, 0.18, -0.18]} castShadow>
        <cylinderGeometry args={[0.2, 0.34, 0.38, 32, 1, true]} />
        <meshStandardMaterial color="#0b0b10" metalness={0.72} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.29, 0.86, -0.28]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 32]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={lampOn ? 0.42 : 0} toneMapped={false} />
      </mesh>
      
      {lampOn && <pointLight position={[-0.35, 0.74, -0.34]} color="#fbbf24" intensity={2.2} distance={4} />}

      <Html position={[0, 1.1, 0.45]} center>
        <button 
          onClick={() => setLampOn(!lampOn)}
          className="workspace-lamp-toggle"
          style={{
            background: lampOn ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            border: `1px solid ${lampOn ? '#fbbf24' : 'rgba(255, 255, 255, 0.3)'}`,
            color: lampOn ? '#fbbf24' : '#fff',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s'
          }}
        >
          {lampOn ? 'TURN OFF' : 'TURN ON'}
        </button>
      </Html>
    </group>
  );
}

function DeskPlant() {
  const leaves = useMemo(
    () => [
      [-0.28, 0.58, 0.02, 0.35, 0.48, -0.72],
      [0.28, 0.6, 0.02, 0.34, 0.5, 0.72],
      [0.02, 0.72, -0.08, 0.4, 0.58, 0],
      [-0.13, 0.76, 0.16, 0.32, 0.46, -0.3],
      [0.18, 0.78, 0.16, 0.32, 0.46, 0.3],
    ],
    []
  );

  return (
    <group position={[-4.08, 0.12, 1.75]} rotation={[0, -0.18, 0]}>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.33, 0.25, 0.36, 24]} />
        <meshStandardMaterial color="#1f172a" roughness={0.55} metalness={0.18} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.08, 24]} />
        <meshStandardMaterial color="#1a120d" roughness={0.9} />
      </mesh>
      {leaves.map(([x, y, z, width, height, rotation], index) => (
        <group key={index} position={[x, y, z]} rotation={[0.68, rotation, index % 2 ? -0.2 : 0.2]}>
          <mesh position={[0, -0.18, -0.02]} rotation={[0, 0, index % 2 ? 0.32 : -0.32]}>
            <cylinderGeometry args={[0.012, 0.016, 0.44, 8]} />
            <meshStandardMaterial color="#166534" roughness={0.7} />
          </mesh>
          <mesh scale={[width, height, 1]} castShadow>
            <circleGeometry args={[0.5, 32]} />
            <meshStandardMaterial color={index % 2 ? '#22c55e' : '#34d399'} roughness={0.62} metalness={0.05} side={THREE.DoubleSide} />
          </mesh>
          {[[-0.12, 0.05], [0.12, 0.06], [-0.05, -0.12], [0.08, -0.16]].map(([holeX, holeY]) => (
            <mesh key={`${holeX}-${holeY}`} position={[holeX, holeY, 0.01]} scale={[0.07, 0.11, 1]}>
              <circleGeometry args={[0.5, 14]} />
              <meshBasicMaterial color="#07120a" transparent opacity={0.72} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function NotebookStack() {
  const books = [
    { color: '#111827', y: 0.06, size: [1.18, 0.11, 0.78], offset: [0, 0] },
    { color: '#312e81', y: 0.18, size: [1.06, 0.12, 0.72], offset: [0.05, -0.03] },
    { color: '#164e63', y: 0.31, size: [0.94, 0.12, 0.68], offset: [-0.03, 0.04] },
  ];

  return (
    <group position={[-4.85, 0.1, -0.15]} rotation={[0, 0.45, 0]}>
      {books.map((book, index) => (
        <group key={book.color} position={[book.offset[0], book.y, book.offset[1]]}>
          <mesh castShadow>
            <boxGeometry args={book.size} />
            <meshStandardMaterial color={book.color} roughness={0.5} metalness={0.18} />
          </mesh>
          <mesh position={[0, book.size[1] / 2 + 0.004, 0.03]}>
            <planeGeometry args={[book.size[0] * 0.74, 0.02]} />
            <meshBasicMaterial color={index === 2 ? '#67e8f9' : '#cbd5e1'} transparent opacity={0.75} />
          </mesh>
        </group>
      ))}
      <Text position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.09} color="#f8fafc" anchorX="center" anchorY="middle">
        sprint notes
      </Text>
    </group>
  );
}

function CoffeeMug() {
  return (
    <group position={[-2.2, 0.12, 2.15]}>
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.27, 0.3, 0.74, 32]} />
        <meshPhysicalMaterial color="#f8fafc" metalness={0.08} roughness={0.18} clearcoat={0.6} />
      </mesh>
      <mesh position={[0.32, 0.42, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.16, 0.035, 10, 24]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.18} />
      </mesh>
      <mesh position={[0, 0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.23, 32]} />
        <meshStandardMaterial color="#1b0f08" roughness={0.82} />
      </mesh>
      <group position={[0, 0.82, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sparkles count={5} scale={[0.15, 0.4, 0.15]} size={0.6} speed={0.3} opacity={0.3} color="#fff" />
        </Float>
      </group>
      <Float speed={2.5} floatIntensity={0.65} position={[0, 1.08, 0]}>
        <Sparkles count={8} scale={[0.42, 0.7, 0.42]} size={1.6} speed={0.3} color="#d4d4d8" opacity={0.24} />
      </Float>
    </group>
  );
}

function FloatingPopups({ scrollProgress }) {
  const contactRef = useRef();
  const skillsGroupRef = useRef();

  useFrame(({ clock }) => {
    const p = scrollProgress.current;

    if (contactRef.current) {
      const t = clamp01((p - 0.5) * 6);
      const exit = 1 - clamp01((p - 0.66) * 10);
      const scale = 0.001 + (1 - Math.pow(1 - t, 3)) * 0.5 * exit;
      contactRef.current.scale.setScalar(scale);
      contactRef.current.visible = scale > 0.01;
    }

    if (skillsGroupRef.current) {
      const startP = 0.25; 
      const endP = 0.55; 
      const progress = clamp01((p - startP) / (endP - startP));
      const easeProgress = 1 - Math.pow(1 - progress, 3); 

      skillsGroupRef.current.visible = progress > 0.01;

      skillsGroupRef.current.children.forEach((child, i) => {
        const angle = (i / SKILLS.length) * Math.PI * 2 + clock.elapsedTime * 0.05;
        const radius = 5.5; 
        const targetX = Math.cos(angle) * radius;
        const targetY = Math.sin(angle) * radius * 0.45;

        child.position.x = targetX * easeProgress;
        child.position.y = targetY * easeProgress;
        
        // Directly update the Html overlay opacity via ref if possible, 
        // or just rely on group visibility and parent alpha.
        // For now, let's use the group scale as a proxy for visibility.
        child.scale.setScalar(easeProgress > 0.01 ? 1 : 0);
      });
    }
  });

  return (
    <group>
      <group ref={skillsGroupRef} position={[0, 2.5, 0]}>
        {SKILLS.map((skill) => (
          <group key={skill.name}>
            <Html center style={{ pointerEvents: 'none' }}>
              <div className="workspace-skill-button">
                {skill.name} <span style={{ opacity: 0.6, fontSize: '0.7rem', marginLeft: '0.5rem' }}>{skill.val}%</span>
              </div>
            </Html>
          </group>
        ))}
      </group>

      <group ref={contactRef} position={[0, 2.22, -0.72]}>
        <Html transform center style={{ pointerEvents: 'auto' }}>
          <a className="workspace-collab-pill" href="mailto:portfolio@lab.local">
            <span>LET'S COLLABORATE</span>
            <small>CONTACT ME</small>
          </a>
        </Html>
      </group>
    </group>
  );
}

function DeskScene({ scrollProgress, lampOn, setLampOn }) {
  const monitorContentRef = useRef();
  
  useFrame(({ clock }) => {
    const p = scrollProgress.current;
    if (monitorContentRef.current) {
      const fade = 1 - clamp01((p - 0.88) * 12);
      // Safe digital flicker using visibility toggle
      const flicker = Math.random() > 0.02;
      monitorContentRef.current.visible = (fade > 0.01) && flicker;
      monitorContentRef.current.scale.setScalar(0.001 + fade * 0.999);
    }
  });

  return (
    <group position={[0, -0.15, 0]} scale={0.88}>
      <CameraRig scrollProgress={scrollProgress} />

      <ambientLight intensity={lampOn ? 0.38 : 0.05} />
      <hemisphereLight args={['#c7d2fe', '#020205', lampOn ? 0.65 : 0.15]} />
      <spotLight position={[0, 7.6, 4.8]} angle={0.74} penumbra={1} intensity={lampOn ? 3.8 : 0.2} color="#ffffff" castShadow />
      <pointLight position={[-5, 3.2, -2.8]} color="#c084fc" intensity={lampOn ? 1.8 : 0.3} distance={15} />
      <pointLight position={[5, 3.2, -2.4]} color="#67e8f9" intensity={lampOn ? 1.65 : 0.3} distance={15} />
      <pointLight position={[0, 1.3, 3.2]} color="#86efac" intensity={lampOn ? 0.32 : 0.1} distance={6} />

      <Monitor scrollProgress={scrollProgress} monitorContentRef={monitorContentRef} />
      {/* Monitor Glow mapping to desk when lamp is off */}
      <pointLight 
        position={[0, 1.5, -0.5]} 
        color="#67e8f9" 
        intensity={lampOn ? 0.2 : 2.8} 
        distance={6} 
      />

      <Laptop />
      <Keyboard scrollProgress={scrollProgress} />
      <Mouse />
      <Headphones />
      <DeskLamp lampOn={lampOn} setLampOn={setLampOn} />
      <DeskPlant />
      <NotebookStack />
      <CoffeeMug />

      <Sparkles count={60} scale={10} size={0.6} speed={0.4} opacity={0.12} color="#fff" />
      <ContactShadows position={[0, 0.08, 0]} opacity={0.45} scale={10} blur={2.4} far={4.5} />
      <ProjectGallery scrollProgress={scrollProgress} />
      <FloatingPopups scrollProgress={scrollProgress} />
    </group>
  );
}

function WorkspaceHUD({ progress }) {
  const activeIndex = Math.min(SCROLL_SEGMENTS.length - 1, Math.floor(progress * SCROLL_SEGMENTS.length));
  const activeSegment = SCROLL_SEGMENTS[activeIndex];

  return (
    <div className="workspace-hud">
      <header className="workspace-hud-header">
        <h1>
          JAYANT<span>.LAB</span>
        </h1>
        <p>INTERACTIVE WORKSPACE</p>
        <div className="workspace-hud-current">
          <span>[{activeSegment.label}]</span>
          <strong>{activeSegment.hint}</strong>
        </div>
      </header>

      <aside className="workspace-sequence" aria-label="Scroll sequence progress">
        <span className="workspace-sequence-kicker">SCROLL SEQUENCE</span>
        <div className="workspace-sequence-track">
          <div className="workspace-sequence-fill" style={{ height: `${progress * 100}%` }} />
          {SCROLL_SEGMENTS.map((segment, index) => (
            <div
              key={segment.label}
              className={`workspace-sequence-step${index <= activeIndex ? ' is-active' : ''}`}
              style={{ top: `${index * 25}%` }}
            >
              <span />
              <strong>{segment.label}</strong>
              <small>{segment.hint}</small>
            </div>
          ))}
        </div>
        <b>{Math.round(progress * 100)}%</b>
      </aside>

      <div className={`workspace-scroll-prompt${progress < 0.05 ? ' is-visible' : ''}`}>
        <span />
        <p>SCROLL TO DIVE IN</p>
      </div>
    </div>
  );
}

export default function Workspace3D() {
  const containerRef = useRef();
  const scrollRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [lampOn, setLampOn] = useState(true);
  const [canvasDpr, setCanvasDpr] = useState(getCanvasDpr);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const scrollable = Math.max(1, el.scrollHeight - window.innerHeight);
      const clamped = clamp01(window.scrollY / scrollable);

      scrollRef.current = clamped;
      setProgress(clamped);
    };

    const handleResize = () => {
      handleScroll();
      setCanvasDpr(getCanvasDpr());
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="workspace-scroll-container">
      <div className="workspace-stage">
        <Canvas
          className="workspace-canvas"
          gl={{ 
            antialias: true, 
            alpha: false, 
            powerPreference: 'high-performance',
            stencil: false,
            depth: true 
          }}
          dpr={canvasDpr}
          shadows
        >
          <color attach="background" args={['#020205']} />
          <fog attach="fog" args={['#020205', 9, 24]} />
          <DeskScene scrollProgress={scrollRef} lampOn={lampOn} setLampOn={setLampOn} />
          <EffectComposer multisampling={0} disableNormalPass>
            <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.3} intensity={0.45} mipmapBlur />
            <Vignette offset={0.3} darkness={0.8} />
          </EffectComposer>
        </Canvas>
        <WorkspaceHUD progress={progress} />
      </div>
    </div>
  );
}
