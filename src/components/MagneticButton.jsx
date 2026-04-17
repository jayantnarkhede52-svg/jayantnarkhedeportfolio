import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className = '', as = 'button', href, target, rel, onClick }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        
        // Calculate distance from center of the button
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        // 0.3 is the magnetic pull factor. Higher = pulls further towards cursor.
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    };

    const reset = () => {
        // Snap back to original position
        setPosition({ x: 0, y: 0 });
    };

    const props = {
        ref,
        onMouseMove: handleMouse,
        onMouseLeave: reset,
        className: `magnetic-target ${className}`,
        onClick,
        animate: { x: position.x, y: position.y },
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
    };

    if (as === 'a') {
        return (
            <motion.a href={href} target={target} rel={rel} {...props}>
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button {...props}>
            {children}
        </motion.button>
    );
};

export default MagneticButton;
