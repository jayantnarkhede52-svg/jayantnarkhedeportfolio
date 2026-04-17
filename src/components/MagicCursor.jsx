import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagicCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Core cursor coordinates
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Spring physics for the outer ring trailing effect
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only run on desktop/devices with a real pointer
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            // Detect if element is clickable to trigger hover state
            const isClickable = e.target.closest('a, button, input, textarea, .magnetic-target, .skill-pill, .theme-btn');
            setIsHovered(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // If on mobile (touch device), don't render the custom cursor to save battery/performance
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
        return null; 
    }

    return (
        <>
            <motion.div
                className="magic-cursor-dot"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />
            <motion.div
                className={`magic-cursor-ring ${isHovered ? 'hovered' : ''}`}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            />
        </>
    );
};

export default MagicCursor;
