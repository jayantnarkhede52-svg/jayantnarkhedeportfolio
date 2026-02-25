import React, { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
    const { currentTheme, setCurrentTheme, themes } = useTheme();
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -200 : 200,
                behavior: 'smooth'
            });
        }
    };

    const arrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
        zIndex: 10
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            maxWidth: '95vw'
        }}>
            {/* Left Arrow */}
            <button
                onClick={() => scroll('left')}
                style={{ ...arrowStyle, position: 'relative', flexShrink: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                aria-label="Scroll themes left"
            >
                ‹
            </button>

            {/* Theme Pills */}
            <div
                ref={scrollRef}
                className="theme-switcher-pills"
                style={{
                    display: 'flex',
                    gap: '0.5rem',
                    padding: '0.8rem',
                    borderRadius: '50px',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflowX: 'auto',
                    scrollbarWidth: 'none'
                }}
            >
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => setCurrentTheme(theme.id)}
                        title={theme.name}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '25px',
                            border: 'none',
                            background: currentTheme === theme.id ? 'white' : 'transparent',
                            color: currentTheme === theme.id ? 'black' : 'white',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <span>{theme.icon}</span>
                        <span className="theme-name-label">{theme.name}</span>
                    </button>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => scroll('right')}
                style={{ ...arrowStyle, position: 'relative', flexShrink: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                aria-label="Scroll themes right"
            >
                ›
            </button>
        </div>
    );
};

export default ThemeSwitcher;
