import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeContent } from '../data/themeContent';
import './SEOAnalytics.css';

const SEOAnalytics = () => {
    const { currentTheme } = useTheme();
    if (currentTheme !== 'seo') return null;

    const data = themeContent.seo.analytics;

    return (
        <div className="seo-dashboard animate-fade-in">
            <div className="dashboard-header">
                <h2>Live Growth Feed</h2>
                <div className="status-badge pulse">Real-time Data Active</div>
            </div>

            <div className="metrics-grid">
                {data.metrics.map(m => (
                    <div key={m.id} className="metric-card">
                        <span className="metric-label">{m.label}</span>
                        <div className="metric-value-row">
                            <span className="metric-value">{m.value}</span>
                            <span className={`metric-growth ${m.trend}`}>{m.growth}</span>
                        </div>
                        <div className="metric-indicator-bar">
                            <div className="indicator-fill" style={{ width: '70%', background: m.trend === 'up' ? '#00ffa3' : '#ff4d4d' }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="charts-container">
                <div className="chart-wrapper line-chart">
                    <h3>Organic Traffic Momentum</h3>
                    <LineChart data={data.charts.trafficGrowth} color="#00ffa3" />
                </div>
                <div className="chart-wrapper revenue-chart">
                    <h3>Conversion Synergy</h3>
                    <LineChart data={data.charts.revenueCorrelation} color="#00e5ff" />
                </div>
            </div>

            <div className="keywords-section">
                <h3>Dominant Search Vectors</h3>
                <div className="keywords-grid">
                    {data.keywords.map((k, i) => (
                        <div key={i} className="keyword-item">
                            <span className="kw-word">{k.word}</span>
                            <div className="kw-stats">
                                <span className="kw-pos">Pos: #{k.pos}</span>
                                <span className="kw-vol">{k.volume} vol</span>
                                <span className={`kw-diff ${k.difficulty.toLowerCase()}`}>{k.difficulty}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const LineChart = ({ data, color }) => {
    const points = useMemo(() => {
        const max = Math.max(...data);
        const width = 1000;
        const height = 200;
        const xStep = width / (data.length - 1);

        return data.map((val, i) => {
            const x = i * xStep;
            const y = height - (val / max) * height;
            return `${x},${y}`;
        }).join(' ');
    }, [data]);

    return (
        <div className="svg-chart-container">
            <svg viewBox="0 0 1000 200" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    points={points}
                    className="line-path"
                />
                <polygon
                    fill={`url(#grad-${color})`}
                    points={`0,200 ${points} 1000,200`}
                />
            </svg>
        </div>
    );
};

export default SEOAnalytics;
