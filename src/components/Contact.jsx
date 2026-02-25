import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
    const { currentTheme } = useTheme();

    return (
        <section id="contact" className={`contact-section section-padding ${currentTheme === 'peaceful' ? 'peaceful-contact' : ''}`}>
            <div className="container">
                <div className="contact-wrapper">
                    <div className="section-title-wrap">
                        <h2 className={`${currentTheme === 'peaceful' ? 'about-title' : 'section-title'} ${currentTheme === 'corporate' ? 'corporate-contact-title' : ''}`}>
                            {currentTheme === 'corporate' ? 'STRATEGIC' : 'Connect'} <span className="gradient-text">{currentTheme === 'corporate' ? 'COMMUNICATION' : 'With Me'}</span>
                        </h2>
                        <p className={`${currentTheme === 'peaceful' ? 'hero-subtitle' : 'section-subtitle'} ${currentTheme === 'corporate' ? 'corporate-subtitle' : ''}`} style={{ textAlign: 'center' }}>
                            {currentTheme === 'corporate'
                                ? 'Expert technical consulting and mission-critical strategy available for select enterprise engagements.'
                                : 'Have a project in mind or just want to say hi? I\'m always open to new opportunities.'}
                        </p>
                    </div>

                    <div className="contact-grid">
                        <div className="contact-card glass animate-fade-in">
                            <div className="contact-icon">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className="contact-details">
                                <span className="micro-label">Phone : </span>
                                <a href="tel:+918885693465" className="contact-link">+91 88856 93465</a>
                            </div>
                        </div>

                        <div className="contact-card glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="contact-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="contact-details">
                                <span className="micro-label">Email : </span>
                                <a href="mailto:narkhedejayant6@gmail.com" className="contact-link">narkhedejayant6@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
