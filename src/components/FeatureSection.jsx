import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeContent } from '../data/themeContent';

const FeatureSection = () => {
    const { currentTheme } = useTheme();
    const [activeWeather, setActiveWeather] = React.useState('clear');

    React.useEffect(() => {
        const handleWeather = (e) => {
            if (e.detail) setActiveWeather(e.detail);
        };
        window.addEventListener('weatherChange', handleWeather);
        return () => window.removeEventListener('weatherChange', handleWeather);
    }, []);

    const performance = themeContent[currentTheme]?.performance;
    const whyChooseMe = themeContent.common.whyChooseMe;
    const atmosphereNarratives = themeContent.atmosphere?.weatherNarratives;

    const isCorporate = currentTheme === 'corporate';
    const isCreative = currentTheme === 'creative';
    const isAtmosphere = currentTheme === 'atmosphere';

    if (isAtmosphere) {
        const currentNarrative = atmosphereNarratives?.[activeWeather] || atmosphereNarratives?.clear;
        return (
            <section id="features" className="features-section atmosphere-features">
                <div className="container">
                    <div className="atmosphere-narrative-box glass animate-fade-in" key={activeWeather}>
                        <span className="micro-label">ENVIRONMENTAL SHIFT</span>
                        <h2 className="section-title">{currentNarrative.title}</h2>
                        <p className="narrative-text">{currentNarrative.text}</p>
                    </div>
                </div>
            </section>
        );
    }

    const services = themeContent[currentTheme]?.services || themeContent.common.whyChooseMe;

    return (
        <section id="features" className={`features-section ${isCorporate ? 'corporate-services' : ''} ${isCreative ? 'creative-services' : ''}`}>
            <div className="container" style={isCreative ? { marginLeft: 0 } : {}}>
                <div className="section-header">
                    <h2 className="section-title">
                        {isCorporate ? (themeContent.corporate.servicesTitle || "Strategic Solutions") : isCreative ? "CAPABILITIES" : (themeContent[currentTheme]?.performance?.title || "Why Choose Me")}
                    </h2>
                </div>
                <div className="why-choose-grid">
                    {services.map((item) => (
                        <div key={item.id} className="why-choose-card">
                            <div className="card-header">
                                <span className="card-number">0{item.id}</span>
                                <h3 className="card-title">{item.title}</h3>
                            </div>
                            <p className="card-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
