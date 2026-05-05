import React, { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(progress * end);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        if (num % 1 !== 0) return num.toFixed(1);
        return Math.floor(num);
    };

       

    return (
        <span className="count-up">
            {prefix}{formatNumber(count)}{suffix}
        </span>
    );
};

const StartupDashboard = ({ metrics }) => {
    if (!metrics) return null;

    return (
        <div className="startup-dashboard animate-fade-in">
            <div className="dashboard-header" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: '800' }}>
                <span className="live-indicator">LIVE PERFORMANCE STREAM</span>
                <span className="dashboard-status" style={{ opacity: 0.5 }}>STATUS: SCALING</span>
            </div>
            <div className="metrics-grid">
                {metrics.map((metric) => (
                    <div key={metric.id} className="metric-card" style={{ '--metric-color': metric.color }}>
                        <span className="metric-label">{metric.label}</span>
                        <div className="metric-value">
                            <CountUp
                                end={metric.value}
                                prefix={metric.prefix}
                                suffix={metric.suffix}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default StartupDashboard;
