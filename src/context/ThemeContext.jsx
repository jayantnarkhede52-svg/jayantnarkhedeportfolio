import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
    { id: 'luxury', name: 'Dark Luxury', icon: '🌙' },
    { id: 'atmosphere', name: 'Atmosphere', icon: '☁️' },
    { id: 'peaceful', name: 'Peaceful Zen', icon: '🌿' },
    { id: 'minimal', name: 'Minimal Dev', icon: '🧠' },
    { id: 'startup', name: 'Startup Pitch', icon: '🚀' },
    { id: 'corporate', name: 'Corporate CEO', icon: '🏢' },
    { id: 'creative', name: 'Creative Agency', icon: '🎨' },
    { id: 'ai', name: 'AI Futuristic', icon: '🤖' },
    { id: 'hacker', name: 'Hacker Terminal', icon: '💻' },
    { id: 'seo', name: 'SEO Analytics', icon: '📊' },
];

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('luxury');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
