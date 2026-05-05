import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeContent } from '../data/themeContent';
import logo from '../assets/logo.jpg';

const CreativeSidebar = () => {
    const { currentTheme } = useTheme();
    const content = themeContent.creative.sidebar;

    if (currentTheme !== 'creative') return null;

    return (
        <aside className="creative-sidebar">
            <div className="sidebar-top">
                <div className="logo-container sidebar-logo-container" style={{ marginBottom: '2rem' }}>
                    <img src={logo} alt="Jayant Lab Logo" className="sidebar-logo-img" style={{ height: '50px', width: 'auto', borderRadius: '8px' }} />
                    <div className="logo" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-2px' }}>
                        JAYANT<span className="accent-dot" style={{ color: 'var(--accent)' }}>.</span>
                    </div>
                </div>
                <p className="sidebar-intro" style={{ marginTop: '2rem', opacity: 0.8, lineHeight: 1.6 }}>
                    {content.intro}
                </p>
            </div>

            <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="#home" className="sidebar-link">WORK</a>
                <a href="#about" className="sidebar-link">PROCESS</a>
                <a href="#contact" className="sidebar-link">CONNECT</a>
            </nav>

            <div className="sidebar-bottom">
                <div className="social-links" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    {content.socials.map(social => (
                        <a key={social.name} href={social.url} className="social-icon" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                            {social.name.toUpperCase()}
                        </a>
                    ))}
                </div>
                <a
                    href={`https://wa.me/918885693465?text=${encodeURIComponent("Hi Jayant, I'd like to work with your agency.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ width: '100%', textAlign: 'center', display: 'block' }}
                >
                    {content.cta}
                </a>
            </div>
        </aside>
    );
};

export default CreativeSidebar;
