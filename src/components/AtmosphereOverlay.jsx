import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const AtmosphereOverlay = () => {
    const { currentTheme } = useTheme();
    const [weather, setWeather] = useState('clear'); // clear, snow, rain, mist, storm, night

    // Sync weather with external state or buttons (to be implemented)
    useEffect(() => {
        const handleWeatherChange = (e) => {
            if (e.detail) setWeather(e.detail);
        };
        window.addEventListener('weatherChange', handleWeatherChange);
        return () => window.removeEventListener('weatherChange', handleWeatherChange);
    }, []);

    if (currentTheme !== 'atmosphere') return null;

    return (
        <div className={`atmosphere-root weather-${weather}`}>
            <div className="atmosphere-vignette"></div>

            {/* Clear Sky Glow */}
            {weather === 'clear' && <div className="clear-sky-glow"></div>}

            {/* Snow Effect */}
            {weather === 'snow' && (
                <div className="weather-snow-container">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="snowflake" style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: Math.random() * 0.7 + 0.3
                        }}></div>
                    ))}
                </div>
            )}

            {/* Rain Effect */}
            {weather === 'rain' && (
                <div className="weather-rain-container">
                    {[...Array(80)].map((_, i) => (
                        <div key={i} className="rain-streak" style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                            animationDelay: `${Math.random() * 1}s`
                        }}></div>
                    ))}
                </div>
            )}

            {/* Mist Effect */}
            {weather === 'mist' && (
                <div className="weather-mist-container">
                    <div className="mist-layer mist-1"></div>
                    <div className="mist-layer mist-2"></div>
                    <div className="mist-layer mist-3"></div>
                </div>
            )}

            {/* Storm Effect */}
            {weather === 'storm' && (
                <div className="weather-storm-container">
                    <div className="storm-lightning"></div>
                    <div className="storm-rain">
                        {[...Array(100)].map((_, i) => (
                            <div key={i} className="rain-streak storm" style={{
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${Math.random() * 0.3 + 0.2}s`
                            }}></div>
                        ))}
                    </div>
                </div>
            )}

            {/* Night Effect */}
            {weather === 'night' && (
                <div className="weather-night-container">
                    <div className="stars-field">
                        {[...Array(100)].map((_, i) => (
                            <div key={i} className="star" style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`
                            }}></div>
                        ))}
                    </div>
                </div>
            )}

            <div className="atmosphere-lighting-overlay"></div>
        </div>
    );
};

export default AtmosphereOverlay;
