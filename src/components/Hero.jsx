import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeContent } from '../data/themeContent';
import StartupDashboard from './StartupDashboard';
import AtomCore from './AtomCore';
import { CognitiveCore } from './AISystems';
import SEOVisual from './SEOVisual';

const Hero = () => {
    const { currentTheme } = useTheme();
    const themeData = themeContent[currentTheme] || themeContent.minimal;
    const content = themeData.hero;
    const metrics = themeData.metrics;

    const [weather, setWeather] = useState('clear');

    useEffect(() => {
        const handleWeatherChange = (e) => {
            if (e.detail) setWeather(e.detail);
        };
        window.addEventListener('weatherChange', handleWeatherChange);
        return () => window.removeEventListener('weatherChange', handleWeatherChange);
    }, []);

    const cycleWeather = () => {
        const weatherCycle = ['clear', 'snow', 'rain', 'mist', 'storm', 'night'];
        const currentIndex = weatherCycle.indexOf(weather);
        const nextIndex = (currentIndex + 1) % weatherCycle.length;
        const nextWeather = weatherCycle[nextIndex];
        setWeather(nextWeather);
        window.dispatchEvent(new CustomEvent('weatherChange', { detail: nextWeather }));
    };

    const renderTitle = (title) => {
        if (!title) return null;
        const lines = title.split('\n');
        return lines.map((line, lineIdx) => (
            <React.Fragment key={lineIdx}>
                {line.split(' ').map((word, i) => {
                    const excludedThemes = ['peaceful', 'minimal', 'startup'];
                    if (excludedThemes.includes(currentTheme)) {
                        return word + ' ';
                    }
                    const keywords = ["Atmosphere", "Shift", "Sky", "Normal", "Portfolio", "Lies", "Clean", "Logical", "Fast", "Neural", "Interface", "Scale", "Win", "Global", "Bold", "Loud", "Desi", "Roots", "Code", "Access", "Refinement", "100", "Stories", "Break", "Rules", "Data"];
                    const cleanWord = word.replace(/[\u201C\u201D".,?]/g, '');
                    const highlight = keywords.some(kw => cleanWord.includes(kw));
                    return highlight ? <span key={i} className="gradient-text">{word} </span> : word + ' ';
                })}
                {lineIdx < lines.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <section id="home" className={`hero-container container ${currentTheme}-theme-hero ${currentTheme === 'startup' ? 'startup-mode-hero' : ''}`}>
            {currentTheme === 'startup' && (
                <div className="startup-crazy-visuals">
                    <svg className="particle-mist" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                        <defs>
                            <filter id="glowEffect">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        {[...Array(50)].map((_, i) => (
                            <circle
                                key={i}
                                className="mist-particle"
                                cx={Math.random() * 1000}
                                cy={Math.random() * 1000}
                                r={Math.random() * 3 + 1}
                                fill={i % 2 === 0 ? "var(--primary)" : "var(--secondary)"}
                                filter="url(#glowEffect)"
                            >
                                <animate attributeName="opacity" values="0;0.7;0" dur={`${Math.random() * 4 + 2}s`} repeatCount="indefinite" begin={`${Math.random() * 5}s`} />
                                <animateTransform attributeName="transform" type="translate" from="0 0" to={`${Math.random() * 150 - 75} ${Math.random() * 150 - 75}`} dur={`${Math.random() * 12 + 8}s`} repeatCount="indefinite" />
                            </circle>
                        ))}
                    </svg>
                    <div className="volumetric-light"></div>
                </div>
            )}

            {currentTheme === 'ai' && (
                <div className="ai-background-effects">
                    <div className="ai-particles">
                        {[...Array(30)].map((_, i) => (
                            <div key={i} className="ai-particle" style={{
                                position: 'absolute',
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: '2px',
                                height: '2px',
                                background: '#00D4FF',
                                borderRadius: '50%',
                                opacity: Math.random() * 0.5 + 0.2,
                                animation: `blink ${Math.random() * 3 + 2}s infinite ${Math.random() * 5}s`
                            }}></div>
                        ))}
                    </div>
                </div>
            )}

            {currentTheme === 'seo' && <SEOVisual />}

            <div className={`hero-layout-wrapper ${currentTheme}-layout ${currentTheme === 'ai' || currentTheme === 'seo' ? 'ai-layout' : ''}`}>
                <div className="hero-content animate-fade-in">
                    {currentTheme === 'corporate' && <span className="hero-label">{content.label}</span>}

                    {currentTheme === 'playful' && content.badges && (
                        <div className="playful-badges animate-fade-in">
                            {content.badges.map(badge => (
                                <span key={badge.id} className="sticker-badge" style={{ backgroundColor: badge.color }}>
                                    {badge.text}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="hero-text-block">
                        <h1 className="hero-title">
                            {renderTitle(content.title)}
                        </h1>
                        <p className="hero-subtitle">
                            {content.subtitle}
                        </p>
                        {content.description && (
                            <p className="hero-description animate-fade-in" style={{
                                marginTop: '1.5rem',
                                opacity: 0.8,
                                maxWidth: '600px',
                                lineHeight: '1.6',
                                fontSize: '1.1rem'
                            }}>
                                {content.description}
                            </p>
                        )}
                    </div>

                    <div className="hero-actions-container">
                        {currentTheme === 'startup' ? (
                            <div className="startup-hero-actions">
                                <div className="hero-actions">
                                    <a
                                        href={`https://wa.me/91885693465?text=${encodeURIComponent("Hi Jayant, I've seen the traction. Let's discuss a growth strategy.")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary"
                                    >
                                        {content.cta}
                                    </a>
                                    <a href="#projects" className="btn-glass glass">
                                        {content.ctaSecondary}
                                    </a>
                                </div>
                                <StartupDashboard metrics={metrics} />
                            </div>
                        ) : (currentTheme === 'ai') ? (
                            <div className="hero-actions">
                                <a
                                    href={`https://wa.me/91885693465?text=${encodeURIComponent("Hi Jayant, System Initialized. Let's collaborate.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    {content.cta}
                                </a>
                                <a href="#projects" className="btn-glass glass">
                                    {content.ctaSecondary}
                                </a>
                            </div>
                        ) : (currentTheme === 'atmosphere') ? (
                            <div className="hero-actions">
                                <button onClick={cycleWeather} className="btn-primary">
                                    {content.cta}
                                </button>
                                <a href="#projects" className="btn-glass glass">
                                    {content.ctaSecondary}
                                </a>
                            </div>
                        ) : (currentTheme === 'luxury') ? (
                            <div className="hero-actions">
                                <a
                                    href={`https://wa.me/91885693465?text=${encodeURIComponent("Hi Jayant, I'd like to get started with your services.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    {content.cta}
                                </a>
                                <a href="#projects" className="btn-glass glass">
                                    {content.ctaSecondary}
                                </a>
                            </div>
                        ) : (
                            <div className="hero-actions">
                                <a
                                    href={`https://wa.me/91885693465?text=${encodeURIComponent("Hi Jayant, I'd like to get started with your services.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    {content.cta}
                                </a>

                                {content.ctaSecondary && (
                                    <a href="tel:+91885693465" className="btn-glass glass">
                                        {content.ctaSecondary}
                                    </a>
                                )}
                            </div>
                        )}
                    </div>


                    {currentTheme === 'luxury' && metrics && (
                        <div className="luxury-stats animate-fade-in">
                            {metrics.map(metric => (
                                <div key={metric.id} className="stat-card glass">
                                    <span className="stat-value" style={{ color: metric.color }}>
                                        {metric.prefix}{metric.value}{metric.suffix}
                                    </span>
                                    <span className="stat-label">{metric.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {currentTheme === 'luxury' && (
                    <div className="hero-visual" key={currentTheme}>
                        <AtomCore />
                    </div>
                )}

                {currentTheme === 'ai' && (
                    <div className="hero-visual">
                        <CognitiveCore />
                    </div>
                )}

                {currentTheme === 'seo' && (
                    <div className="hero-visual">
                        <div className="seo-centerpiece animate-float">
                            <div className="pulse-ring"></div>
                            <div className="pulse-ring delay-1"></div>
                            <div className="pulse-ring delay-2"></div>
                            <div className="data-core">
                                <span>GROWTH</span>
                            </div>
                        </div>
                    </div>
                )}

                {((content.heroVideo || content.heroImage) && (currentTheme === 'playful' || currentTheme === 'startup' || currentTheme === 'creative')) && (
                    <div className="hero-centerpiece-wrapper">
                        {content.heroVideo ? (
                            <video
                                src={content.heroVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster={content.heroImage}
                                className={`hero-centerpiece hero-centerpiece-${currentTheme}`}
                            />
                        ) : (
                            <img
                                src={content.heroImage}
                                alt="Hero Centerpiece"
                                className={`hero-centerpiece hero-centerpiece-${currentTheme}`}
                            />
                        )}
                    </div>
                )}
            </div>

            {currentTheme === 'startup' && (
                <div className={`hero-visual-container startup-visual env-${weather}`}>
                    <div className="monolith-scaler">
                        <div className={`css-monolith monolith-${weather}`}>
                            <div className="monolith-face front"></div>
                            <div className="monolith-face back"></div>
                            <div className="monolith-face right"></div>
                            <div className="monolith-face left"></div>
                            <div className="monolith-face top"></div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Hero;
