import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { themeContent } from '../data/themeContent';

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const smoothstep = (value) => value * value * (3 - 2 * value);

const featuredProjects = themeContent.common.projects
  .filter((project) =>
    ['egreen-shared', 'salary-shared', 'growth-pilot-shared', 'zinco-shared'].includes(project.id)
  )
  .map((project, index) => ({
    ...project,
    accent: ['#67e8f9', '#fbbf24', '#c084fc', '#86efac'][index] || '#67e8f9',
    tech: [
      ['React', 'Lead Gen', 'SEO'],
      ['Python', 'ML', 'Vercel'],
      ['AI Audit', 'Next.js', 'SEO'],
      ['React', 'Local SEO', 'Speed'],
    ][index] || ['React', 'Web'],
  }));

export default function ProjectGallery({ scrollProgress }) {
  const groupRef = useRef();
  const { size } = useThree();

  useFrame(() => {
    const p = scrollProgress.current;
    const reveal = smoothstep(clamp01((p - 0.82) / 0.15));
    const visible = p > 0.78;
    const viewportScale = size.width < 700 ? 0.45 : 1;

    if (groupRef.current) {
      groupRef.current.visible = visible;
      groupRef.current.scale.setScalar(reveal * viewportScale);
    }
  });

  // Monitor screen center is at ~(0, 2.08, -0.96) in DeskScene local space
  // Screen dimensions are 6.04 x 3.42 units
  // Projects should sit below the "CREATIVE LAB" header (~Y offset 1.45)
  // So project center should be around Y=2.08 (monitor center), shifted down a bit
  return (
    <group ref={groupRef} position={[0, 1.85, -0.96]} visible={false}>
      {featuredProjects.map((project, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        // Keep cards within 6.04 width: max ~±2.5 from center
        const x = (col - 0.5) * 2.8;
        // Keep cards within 3.42 height: max ~±1.3 from center
        const y = (0.5 - row) * 1.5;

        return (
          <group key={project.id} position={[x, y, 0]}>
            <Html
              center
              style={{
                width: '320px',
                pointerEvents: 'auto',
              }}
            >
              <div className="premium-project-card" style={{ '--accent': project.accent }}>
                <div className="premium-card-glass" />
                <div className="premium-card-content">
                  <header>
                    <span className="card-index">0{index + 1}</span>
                    <h3>{project.name}</h3>
                  </header>
                  <p>{project.problem}</p>
                  <footer>
                    <div className="card-tech">
                      {project.tech.slice(0, 2).map(t => <span key={t}>{t}</span>)}
                    </div>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="card-action">
                      View Live
                    </a>
                  </footer>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
