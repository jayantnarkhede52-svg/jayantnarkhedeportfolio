import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeContent } from '../data/themeContent';
import logo from '../assets/logo.jpg';

const Navbar = () => {
    const { currentTheme, themes } = useTheme();
    const activeTheme = themes.find(t => t.id === currentTheme);
    const hint = themeContent[currentTheme]?.hint;
    const isCreative = currentTheme === 'creative';
    const isLightNav = ['minimal', 'playful'].includes(currentTheme);

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Close menu on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (menuOpen) setMenuOpen(false);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [menuOpen]);

    // Close menu on resize (if going back to desktop)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && menuOpen) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [menuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <nav className={`navbar-container ${isLightNav ? 'nav-light' : ''} ${scrolled ? 'nav-scrolled' : ''}`}>
            <div className="navbar-inner glass">
                <div className="logo-container">
                    <img src={logo} alt="Jayant Lab Logo" className="navbar-logo" />
                    <div className="logo">
                        JAYANT<span className="gradient-text">.LAB</span>
                    </div>
                </div>

                {/* Desktop nav links */}
                <div className="nav-links">
                    <a href="#home" className="nav-link">Home</a>
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#about" className="nav-link">About</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </div>

                <div className="nav-actions">
                    {currentTheme === 'corporate' ? (
                        <a
                            href={`https://wa.me/918885693465?text=${encodeURIComponent("Hi Jayant, I'd like to reach out for a corporate engagement.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary nav-cta-btn"
                            style={{ borderRadius: '4px' }}
                        >
                            <span className="nav-cta-full">Executive Inquiry</span>
                            <span className="nav-cta-short">Inquire</span>
                        </a>
                    ) : (
                        <a href="#contact" className="btn-glass-nav glass">Get Started</a>
                    )}

                    {/* Hamburger button — mobile only */}
                    <button
                        className={`hamburger-btn ${menuOpen ? 'active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>
                </div>
            </div>

            {/* Mobile slide-in menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <a href="#home" className="mobile-menu-link" onClick={handleLinkClick}>Home</a>
                    <a href="#features" className="mobile-menu-link" onClick={handleLinkClick}>Features</a>
                    <a href="#about" className="mobile-menu-link" onClick={handleLinkClick}>About</a>
                    <a href="#contact" className="mobile-menu-link" onClick={handleLinkClick}>Contact</a>

                    <div className="mobile-menu-cta">
                        {currentTheme === 'corporate' ? (
                            <a
                                href={`https://wa.me/918885693465?text=${encodeURIComponent("Hi Jayant, I'd like to reach out for a corporate engagement.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                                onClick={handleLinkClick}
                            >
                                Executive Inquiry
                            </a>
                        ) : (
                            <a href="#contact" className="btn-primary" onClick={handleLinkClick}>
                                Get Started
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay backdrop */}
            {menuOpen && <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />}
        </nav>
    );
};

export default Navbar;
