import React, { useState } from 'react';

const GrowthCalculator = () => {
    const [traffic, setTraffic] = useState(10000);
    const [conversion, setConversion] = useState(2);
    const [avgValue, setAvgValue] = useState(100);

    const currentRevenue = traffic * (conversion / 100) * avgValue;
    const optimizedRevenue = traffic * ((conversion * 1.5) / 100) * avgValue;
    const potentialLifting = optimizedRevenue - currentRevenue;

    return (
        <section className="growth-calculator-section container">
            <div className="calculator-wrapper glass animate-fade-in">
                <div className="calculator-header">
                    <h2 className="section-title">ROI <span className="gradient-text">Simulator</span></h2>
                    <p>Calculate the compounding impact of engineered optimization.</p>
                </div>

                <div className="calculator-grid">
                    <div className="calculator-inputs">
                        <div className="simulator-input-card glass">
                            <div className="input-group">
                                <label>Monthly Traffic</label>
                                <input
                                    type="range"
                                    min="1000"
                                    max="500000"
                                    step="1000"
                                    value={traffic}
                                    onChange={(e) => setTraffic(Number(e.target.value))}
                                />
                                <div className="input-value">{traffic.toLocaleString()} Visits</div>
                            </div>

                            <div className="input-group">
                                <label>Current Conversion Rate (%)</label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="20"
                                    step="0.1"
                                    value={conversion}
                                    onChange={(e) => setConversion(Number(e.target.value))}
                                />
                                <div className="input-value">{conversion}%</div>
                            </div>

                            <div className="input-group">
                                <label>Avg. Customer Value (₹)</label>
                                <input
                                    className="dark-input"
                                    type="number"
                                    value={avgValue}
                                    onChange={(e) => setAvgValue(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="calculator-results">
                        <div className="result-card current">
                            <span className="result-label">Base Revenue</span>
                            <span className="result-amount">₹{currentRevenue.toLocaleString()}</span>
                        </div>
                        <div className="result-card optimized highlight-glow">
                            <span className="result-label">Optimized Revenue (x1.5 Conversion)</span>
                            <span className="result-amount highlight">₹{optimizedRevenue.toLocaleString()}</span>
                        </div>
                        <div className="result-card potential">
                            <span className="result-label">Net Growth Opportunity</span>
                            <span className="result-amount positive">+₹{potentialLifting.toLocaleString()}</span>
                        </div>

                        <a
                            href="https://wa.me/91885693465"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary calc-cta"
                        >
                            Engineer This Growth
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthCalculator;
