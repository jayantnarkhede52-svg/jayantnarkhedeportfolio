import React, { useState } from 'react';


const GrowthCalculator = () => {
    const [investment, setInvestment] = useState(50000);

    const generatedRevenue = investment * 3;
    const netProfit = generatedRevenue - investment;

    const investmentPercent = ((investment - 10000) / (1000000 - 10000)) * 100;

    return (
        <section className="growth-calculator-section container" id="roi-simulator">
            <div className="calc-wrapper">
                <div className="calc-header">
                    <span className="calc-badge">💰 ROI Simulator</span>
                    <h2 className="calc-title">Calculate Your <span className="calc-highlight">Growth Potential</span></h2>
                    <p className="calc-subtitle">Input your project budget below to see the baseline revenue we aim to generate for your business.</p>
                </div>

                <div className="calc-body">
                    <div className="calc-controls">
                        <div className="calc-input-group">
                            <div className="calc-input-header">
                                <label>Your Investment (Project Budget)</label>
                                <span className="calc-input-display">₹{investment.toLocaleString()}</span>
                            </div>
                            <div className="calc-slider-track">
                                <div className="calc-slider-fill" style={{ width: `${investmentPercent}%` }}></div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="1000000"
                                    step="10000"
                                    value={investment}
                                    onChange={(e) => setInvestment(Number(e.target.value))}
                                />
                            </div>
                            <div className="calc-slider-labels">
                                <span>₹10K</span>
                                <span>₹10L+</span>
                            </div>
                        </div>

                        <div className="calc-info-box">
                            <p className="calc-info-text">
                                <strong>The 3x Rule:</strong> My baseline objective for any project is to architect a digital system that generates at least 3x your initial investment in new pipeline revenue within the first year.
                            </p>
                        </div>
                    </div>

                    <div className="calc-results">
                        <div className="calc-result-card">
                            <div className="calc-result-icon">🎯</div>
                            <div className="calc-result-info">
                                <span className="calc-result-label">Initial Investment</span>
                                <span className="calc-result-value">₹{investment.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="calc-result-card calc-result-optimized">
                            <div className="calc-result-icon">🚀</div>
                            <div className="calc-result-info">
                                <span className="calc-result-label">Target Revenue Generated (3x)</span>
                                <span className="calc-result-value calc-value-highlight">₹{generatedRevenue.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="calc-result-card calc-result-growth">
                            <div className="calc-result-icon">✨</div>
                            <div className="calc-result-info">
                                <span className="calc-result-label">Net Profit</span>
                                <span className="calc-result-value calc-value-positive">+₹{netProfit.toLocaleString()}</span>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/918885693465"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="calc-cta-btn"
                        >
                            Let's Build It →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthCalculator;
