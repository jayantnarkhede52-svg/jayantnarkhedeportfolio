import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeContent } from '../data/themeContent';

const Projects = () => {
    const { currentTheme } = useTheme();
    const [activeCase, setActiveCase] = useState(null);

    const isHacker = currentTheme === 'hacker';
    const content = isHacker ? themeContent.hacker?.projects : themeContent.common.projects;
    const projectList = isHacker ? content?.items : themeContent.common.projects;

    const displayTitle = isHacker ? content?.title : "Proof Over Promises.";
    const displaySubtitle = isHacker ? content?.subtitle : "Selected Strategic Work";

    const isStartup = currentTheme === 'startup';
    const isCreative = currentTheme === 'creative';

    return (
        <section id="projects" className={`projects-container container ${isStartup ? 'startup-projects' : ''} ${isCreative ? 'creative-projects' : ''}`}>
            <div className="section-title-wrapper">
                <h2 className="projects-title section-title">
                    {displayTitle.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{displayTitle.split(' ').slice(-1)}</span>
                </h2>
            </div>
            {content?.subtitle && (
                <p className="hero-subtitle" style={{ margin: '-2rem auto 3rem', textAlign: isCreative ? 'left' : 'center', marginLeft: isCreative ? '0' : 'auto' }}>
                    {content.subtitle}
                </p>
            )}

            {isCreative ? (
                <div className="creative-editorial-list">
                    {projectList.map((p, idx) => (
                        <div key={p.id} className="editorial-row animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div className="row-id-section">
                                <span className="row-number">{(idx + 1).toString().padStart(2, '0')}</span>
                            </div>
                            <div className="row-content-section">
                                <span className="project-category">{p.category}</span>
                                <h3 className="project-name">{p.name}</h3>
                            </div>
                            <div className="row-actions-section">
                                <button
                                    className="btn-editorial"
                                    onClick={() => setActiveCase(p)}
                                >
                                    EXPLORE CASE ↗
                                </button>
                                {p.url && (
                                    <a
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="creative-live-link"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`projects-grid ${isCreative ? 'modular-grid' : ''}`}>
                    {projectList.map((p, idx) => (
                        <div
                            key={p.id}
                            className={`project-card glass animate-fade-in ${isStartup ? 'pitch-deck-card' : ''} ${isCreative ? `creative-modular-card card-${idx % 3}` : ''}`}
                        >
                            <div className="project-info">
                                <span className="project-category">{p.category}</span>
                                <h3 className="project-name">{p.name}</h3>
                                {(currentTheme === 'minimal' || isStartup || isCreative) && (
                                    <p className="project-meta">{p.problem}</p>
                                )}
                            </div>
                            <div className="project-actions">
                                <button
                                    className={`btn-glass glass open-file-btn ${isCreative ? 'btn-creative' : ''}`}
                                    onClick={() => setActiveCase(p)}
                                >
                                    {isStartup ? 'Review Pitch Deck ↗' : isCreative ? 'VIEW CASE' : 'Open Case File'}
                                </button>
                                {p.url && (
                                    <a
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`live-link ${isStartup ? 'startup-link' : ''} ${isCreative ? 'creative-link' : ''}`}
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeCase && (
                <div className="case-file-overlay" onClick={() => setActiveCase(null)}>
                    <div className={`case-file-modal glass ${isStartup ? 'pitch-deck-modal' : ''}`} onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setActiveCase(null)}>×</button>

                        <div className="modal-header">
                            <span className="micro-label">{isStartup ? 'INVESTOR READY' : 'Classified'}: {isStartup ? 'PROJECT DECK' : `Case File #${activeCase.id}`}</span>
                            <h2>{activeCase.name}</h2>
                        </div>

                        <div className="modal-body">
                            <div className="case-section">
                                <h3>🎯 The Problem</h3>
                                <p>{activeCase.problem}</p>
                            </div>
                            <div className="case-section">
                                <h3>🧠 The Strategy</h3>
                                <p>{activeCase.strategy}</p>
                            </div>
                            <div className="case-section">
                                <h3>⚙ The Execution</h3>
                                <p>{activeCase.execution}</p>
                            </div>
                            <div className="case-section">
                                <h3>📈 The Outcome</h3>
                                <p>{activeCase.outcome}</p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <p>{content?.footer || "End of file. Secure connection active."}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
