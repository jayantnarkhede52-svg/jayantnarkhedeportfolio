import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeContent } from '../data/themeContent';

const About = () => {
    const { currentTheme } = useTheme();
    
    // Unify content for all modes except hacker
    const isHacker = currentTheme === 'hacker';
    const content = isHacker ? themeContent.hacker?.about : themeContent.common.about;
    const skills = isHacker ? themeContent.hacker?.skills : themeContent.common.skills;

    if (!content && !skills) return null;

    const renderMission = (text) => {
        const highlights = ["clarity", "structure", "performance", "architecture", "scalable", "growth", "intentional", "refined", "usability", "attention", "traffic", "conversions", "ROI", "precision", "TTFB", "CLS", "logic", "efficiency", "intelligence", "scale", "dominance", "trust", "pixels", "speed", "stories", "chaos"].map(h => h.toLowerCase());

        return text.split(' ').map((word, i) => {
            const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
            return highlights.includes(cleanWord) ? <b key={i} className="highlight-word">{word} </b> : word + ' ';
        });
    };

    const renderTitle = (title) => {
        if (currentTheme === 'corporate') return title;
        if (title.includes(':')) {
            return <>{title.split(':')[0]}: <span className="gradient-text">{title.split(':')[1]}</span></>;
        }
        return <>{title.split(' ').slice(0, -2).join(' ')} <span className="gradient-text">{title.split(' ').slice(-2).join(' ')}</span></>;
    };

    return (
        <section id="about" className={`about-container container ${currentTheme === 'corporate' ? 'corporate-about' : ''} ${currentTheme === 'creative' ? 'creative-about' : ''}`}>
            {currentTheme === 'creative' ? (
                <div className="about-wrapper creative-manifesto-container animate-fade-in">
                    <div className="about-manifesto-section">
                        <h2 className="about-title">{themeContent.creative.about.title}</h2>
                        <p className="about-intro">{themeContent.creative.about.intro}</p>
                        <p className="manifesto-text">{themeContent.creative.about.mission}</p>
                        <div className="philosophy-approach">
                            {themeContent.creative.about.approach.map((item, i) => (
                                <span key={i} className="approach-tag">{item}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="about-wrapper">
                    {content && (
                        <div className="about-main-section animate-fade-in">
                            {currentTheme === 'corporate' && <span className="about-intro-label">{content.label}</span>}
                            <h2 className="about-title section-title">
                                {renderTitle(content.title)}
                            </h2>

                            <div className="about-text-content">
                                <p className="about-intro">{content.intro}</p>

                                <div className="about-narrative-group">
                                    <h3 className="group-label">{currentTheme === 'corporate' ? 'THE CORE MISSION' : 'The Mission'}</h3>
                                    <p className="about-mission">
                                        {renderMission(content.mission)}
                                    </p>
                                </div>

                                {currentTheme === 'corporate' && content.stats && (
                                    <div className="about-stats-container">
                                        {content.stats.map((stat, idx) => (
                                            <div key={idx} className="stat-item">
                                                <span className="stat-value">{stat.value}</span>
                                                <span className="stat-label">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {content.details && (
                                    <div className="about-narrative-group Technical Strategy-group">
                                        <h3 className="group-label">Technical Strategy</h3>
                                        <p className="about-details">
                                            {content.details}
                                        </p>
                                    </div>
                                )}

                                <div className="approach-section">
                                    <p className="approach-label">Approach Strategy:</p>
                                    <ul className="approach-list">
                                        {content.approach.map((item, index) => (
                                            <li key={index}>
                                                <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {content.process && (
                                    <div className="process-section">
                                        <h3 className="group-label">Operational Protocol</h3>
                                        <p className="process-text">{content.process}</p>
                                    </div>
                                )}

                                <p className="about-footer-cta">
                                    “{content.footer}”
                                </p>
                            </div>
                        </div>
                    )}

                    {skills && (
                        <div className="skills-grid-section animate-fade-in">
                            <h2 className="about-title section-title">
                                {skills.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{skills.title.split(' ').slice(-1)}</span>
                            </h2>
                            <div className="skills-container">
                                {skills.categories.map((cat, idx) => (
                                    <div key={idx} className="skill-category-card">
                                        <h3 className="category-header">{cat.name}</h3>
                                        <div className="skill-pill-container">
                                            {cat.items.map((skill, sIdx) => (
                                                <span key={sIdx} className="skill-pill">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default About;
