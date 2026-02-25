import React from 'react';
import { useTheme } from '../context/ThemeContext';

const AtmosphereControls = () => {
    const { currentTheme } = useTheme();
    const [activeWeather, setActiveWeather] = React.useState('clear');

    const setWeather = (type) => {
        setActiveWeather(type);
        const event = new CustomEvent('weatherChange', { detail: type });
        window.dispatchEvent(event);
    };

    if (currentTheme !== 'atmosphere') return null;

    const weatherOptions = [
        { id: 'clear', name: 'Clear Sky', icon: '☀️' },
        { id: 'snow', name: 'Snow', icon: '❄️' },
        { id: 'rain', name: 'Rain', icon: '🌧️' },
        { id: 'mist', name: 'Mist', icon: '🌫️' },
        { id: 'storm', name: 'Storm', icon: '⛈️' },
        { id: 'night', name: 'Night', icon: '🌙' },
    ];

    return (
        <div className="atmosphere-controls glass">
            {weatherOptions.map((opt) => (
                <button
                    key={opt.id}
                    className={`weather-btn ${activeWeather === opt.id ? 'active' : ''}`}
                    onClick={() => setWeather(opt.id)}
                >
                    <span className="weather-icon">{opt.icon}</span>
                    <span className="weather-label">{opt.name}</span>
                </button>
            ))}
        </div>
    );
};

export default AtmosphereControls;
