import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeContent } from '../data/themeContent';

const LabEffects = () => {
    const { currentTheme } = useTheme();
    const [glitchActive, setGlitchActive] = useState(false);
    const [showScrollMsg, setShowScrollMsg] = useState(false);
    const [typed, setTyped] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            const newTyped = (typed + e.key).slice(-6);
            setTyped(newTyped);

            if (newTyped.toLowerCase() === 'jayant') {
                setGlitchActive(true);
                setTimeout(() => setGlitchActive(false), 2000);
                setTyped('');
            }
        };

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setShowScrollMsg(scrollPercent > 40 && scrollPercent < 90);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [typed]);

    const modeHint = themeContent[currentTheme]?.hint;

    return (
        <>
            {glitchActive && (
                <div className="glitch-overlay">
                    <div className="glitch-text">SYSTEM OVERRIDE</div>
                </div>
            )}

            <div className={`scroll-message ${showScrollMsg ? 'visible' : ''}`}>
                “Still scrolling? Good. That means you’re curious.”
            </div>

            {modeHint && (
                <div className="mode-hint">
                    {modeHint}
                </div>
            )}
        </>
    );
};

export default LabEffects;
