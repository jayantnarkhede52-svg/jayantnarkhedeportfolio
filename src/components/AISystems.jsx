import React, { useState, useEffect, useRef } from 'react';

export const AIVisual = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="ai-visual-container" style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '1000px',
            transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
            transition: 'transform 0.1s ease-out'
        }}>
            {/* Core Sphere */}
            <div className="ai-core" style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
                boxShadow: '0 0 50px #00D4FF',
                animation: 'pulse 4s ease-in-out infinite'
            }}></div>

            {/* Neural Rings */}
            {[...Array(3)].map((_, i) => (
                <div key={i} className="neural-ring" style={{
                    position: 'absolute',
                    width: `${250 + i * 50}px`,
                    height: `${250 + i * 50}px`,
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '50%',
                    transform: `rotateX(${60 + i * 20}deg) rotateY(${i * 45}deg)`,
                    animation: `rotateRing${i} ${20 + i * 5}s linear infinite`
                }}>
                    <div className="node" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '-5px',
                        width: '10px',
                        height: '10px',
                        background: '#7C3AED',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px #7C3AED'
                    }}></div>
                </div>
            ))}

            <style>{`
                @keyframes rotateRing0 { from { transform: rotateX(60deg) rotate(0deg); } to { transform: rotateX(60deg) rotate(360deg); } }
                @keyframes rotateRing1 { from { transform: rotateX(80deg) rotate(0deg); } to { transform: rotateX(80deg) rotate(-360deg); } }
                @keyframes rotateRing2 { from { transform: rotateX(100deg) rotate(0deg); } to { transform: rotateX(100deg) rotate(360deg); } }
                @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; } }
            `}</style>
        </div>
    );
};

export const AICapabilities = () => {
    const capabilities = [
        "Smart Systems",
        "Predictive Logic",
        "Adaptive Interfaces",
        "Automation",
        "Machine Intelligence"
    ];

    return (
        <section className="capabilities-section container">
            <div className="capabilities-grid">
                {capabilities.map((cap, i) => (
                    <div key={i} className="capability-card" style={{ animationDelay: `${i * 0.2}s` }}>
                        <div className="cap-glow"></div>
                        <span className="cap-text">{cap}</span>
                    </div>
                ))}
            </div>
            <style>{`
                .cap-glow {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(124, 58, 237, 0.1), transparent);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .capability-card:hover .cap-glow {
                    opacity: 1;
                }
                .cap-text {
                    position: relative;
                    z-index: 1;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
            `}</style>
        </section>
    );
};

export const AIScanning = () => {
    const [messages, setMessages] = useState([]);
    const scanningLines = [
        "Scanning Portfolio...",
        "Architecture Found",
        "Systems Stable",
        "Performance Optimal"
    ];

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            if (current < scanningLines.length) {
                setMessages(prev => [...prev, scanningLines[current]]);
                current++;
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="scanning-section">
            <div className="scanning-line"></div>
            <div className="container">
                {messages.map((msg, i) => (
                    <div key={i} className="scanning-text animate-fade-in">
                        {msg}
                    </div>
                ))}
            </div>
        </section>
    );
};

export const AITerminal = () => {
    const [lines, setLines] = useState([]);
    const terminalConfig = [
        "Initializing Jayant.Lab",
        "Loading Systems...",
        "Portfolio Ready"
    ];

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            if (current < terminalConfig.length) {
                setLines(prev => [...prev, terminalConfig[current]]);
                current++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            <div className="terminal-section">
                {lines.map((line, i) => (
                    <div key={i} className="terminal-line animate-fade-in">
                        {line}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const NeuralNetwork = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const nodes = [...Array(40)].map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        }));

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00D4FF';
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';

            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="neural-network-container" style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            background: 'rgba(0, 0, 0, 0.3)',
            marginTop: '5rem',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 212, 255, 0.1)'
        }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '1rem',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                background: 'rgba(2, 6, 23, 0.8)',
                padding: '1rem 2rem',
                border: '1px solid var(--primary)',
                backdropFilter: 'blur(5px)'
            }}>
                Neural Connectivity Established
            </div>
        </div>
    );
};

export const CognitiveCore = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="cognitive-core-container" style={{
            transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
            transition: 'transform 0.1s ease-out'
        }}>
            <div className="core-inner">
                {/* Neural Sphere SVG */}
                <svg viewBox="0 0 400 400" className="neural-sphere-svg">
                    <defs>
                        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" />
                            <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Central Brain/Core */}
                    <circle cx="200" cy="200" r="60" fill="url(#coreGlow)" className="pulse-slow" />

                    {/* Synaptic Rings */}
                    {[80, 110, 140].map((r, i) => (
                        <circle
                            key={i}
                            cx="200"
                            cy="200"
                            r={r}
                            fill="none"
                            stroke="rgba(0, 212, 255, 0.2)"
                            strokeWidth="1"
                            strokeDasharray={`${r * 0.5} ${r * 0.2}`}
                            className={`rotate-ring-${i}`}
                        />
                    ))}

                    {/* Neural Connections */}
                    {[...Array(12)].map((_, i) => (
                        <line
                            key={i}
                            x1="200"
                            y1="200"
                            x2={200 + 130 * Math.cos((i * 30 * Math.PI) / 180)}
                            y2={200 + 130 * Math.sin((i * 30 * Math.PI) / 180)}
                            stroke="rgba(0, 212, 255, 0.1)"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Pulsing Nodes */}
                    {[...Array(12)].map((_, i) => (
                        <circle
                            key={i}
                            cx={200 + 130 * Math.cos((i * 30 * Math.PI) / 180)}
                            cy={200 + 130 * Math.sin((i * 30 * Math.PI) / 180)}
                            r="3"
                            fill="#00D4FF"
                            filter="url(#glow)"
                        >
                            <animate
                                attributeName="r"
                                values="2;4;2"
                                dur={`${2 + i * 0.5}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    ))}
                </svg>

                {/* Glass Orbits */}
                <div className="orbit-glass orbit-1"></div>
                <div className="orbit-glass orbit-2"></div>

                {/* Data Particles */}
                <div className="data-particles">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className={`particle p-${i}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const AICursor = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <div
            className="ai-cursor-glow"
            style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
};
