import React, { useEffect, useRef } from 'react';

const SEOVisual = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const particleCount = 100;
        const connectors = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 100,
                baseY: canvas.height - (Math.random() * canvas.height * 0.6),
                speed: 0.5 + Math.random() * 1.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                angle: Math.random() * Math.PI * 2
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const time = Date.now() * 0.001;

            // Draw data landscape (grid)
            ctx.strokeStyle = 'rgba(0, 255, 163, 0.05)';
            ctx.lineWidth = 1;
            const step = 40;
            for (let x = 0; x < canvas.width; x += step) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += step) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Draw particles (data nodes)
            particles.forEach((p, i) => {
                // Movement: rising upwards then floating
                if (p.y > p.baseY) {
                    p.y -= p.speed * 2;
                } else {
                    p.y = p.baseY + Math.sin(time + p.angle) * 10;
                }

                ctx.fillStyle = `rgba(0, 255, 163, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.strokeStyle = `rgba(0, 229, 255, ${0.1 * (1 - dist / 100)})`;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            // Draw growth wave
            ctx.strokeStyle = 'rgba(0, 255, 163, 0.2)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x += 5) {
                const y = canvas.height * 0.7 + Math.sin(x * 0.01 + time) * 30 + Math.cos(x * 0.02 + time * 0.5) * 20;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="seo-visual-canvas"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                opacity: 0.6
            }}
        />
    );
};

export default SEOVisual;
