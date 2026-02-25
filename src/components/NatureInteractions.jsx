import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const NatureInteractions = () => {
    const { currentTheme } = useTheme();
    const [ripples, setRipples] = useState([]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [expression, setExpression] = useState('happy'); // happy, surprised, singing

    // Handle Scroll for Tree Growth
    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = winScroll / (height || 1);
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle Mouse Movement for pupils
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5),
                y: (e.clientY / window.innerHeight - 0.5)
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Random Blinking
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 150);
            }
        }, 4000);
        return () => clearInterval(blinkInterval);
    }, []);

    // Random Talking/Singing behavior
    useEffect(() => {
        const talkInterval = setInterval(() => {
            if (Math.random() > 0.8) {
                setIsTalking(true);
                setTimeout(() => setIsTalking(false), 2500);
            }
        }, 6000);
        return () => clearInterval(talkInterval);
    }, []);

    // Handle Global Clicks
    const handleGlobalClick = useCallback((e) => {
        if (currentTheme !== 'peaceful') return;
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

        // Ripples
        const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 2000);

        // Expression
        setExpression('surprised');
        setTimeout(() => setExpression('happy'), 1200);
    }, [currentTheme]);

    useEffect(() => {
        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [handleGlobalClick]);

    if (currentTheme !== 'peaceful') return null;

    const pupilX = mousePos.x * 15;
    const pupilY = mousePos.y * 15;

    return (
        <>
            <div className="nature-interactions-background" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
                {/* Minimal Ripples */}
                {ripples.map(ripple => (
                    <div key={ripple.id} className="ripple" style={{ left: ripple.x, top: ripple.y }} />
                ))}

                {/* Horizon Hill Fallback */}
                <div className="growing-tree-container" style={{ opacity: 0.6 }}>
                    <svg className="tree-svg" width="200" height="300" viewBox="0 0 100 150" style={{ transform: `scale(${0.3 + scrollProgress})` }}>
                        <path d="M50 150 Q50 120 50 80" stroke="#5D4037" strokeWidth="6" fill="none" />
                        <circle cx="50" cy="50" r={10 + scrollProgress * 20} fill="#9BAE93" opacity="0.7" />
                    </svg>
                </div>
            </div>
        </>
    );
};

export default NatureInteractions;
