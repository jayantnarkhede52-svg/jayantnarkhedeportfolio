import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeContent } from '../data/themeContent';

const Navbar = () => {
    const { currentTheme, themes } = useTheme();
    const activeTheme = themes.find(t => t.id === currentTheme);
    const hint = themeContent[currentTheme]?.hint;
    const isCreative = currentTheme === 'creative';

    const isLightNav = ['minimal', 'playful'].includes(currentTheme);

    return (
        <nav className={`navbar-container ${isLightNav ? 'nav-light' : ''}`}>
            <div className="navbar-inner glass">
                <div className="logo">
                    JAYANT<span className="gradient-text">.LAB</span>
                </div>

                <div className="nav-links">
                    <a href="#home" className="nav-link">Home</a>
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#about" className="nav-link">About</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </div>

                <div className="nav-actions">
                    {currentTheme === 'corporate' ? (
                        <a
                            href={`https://wa.me/91885693465?text=${encodeURIComponent("Hi Jayant, I'd like to reach out for a corporate engagement.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ borderRadius: '4px' }}
                        >
                            Executive Inquiry
                        </a>
                    ) : (
                        <a href="#contact" className="btn-glass-nav glass">Get Started</a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
