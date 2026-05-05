import React from 'react';
import logo from '../assets/logo.jpg';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="container footer-content">
                <div className="logo-container footer-logo-container">
                    <img src={logo} alt="Jayant Lab Logo" className="footer-logo-img" />
                    <div className="logo footer-logo">
                        JAYANT<span className="gradient-text">.LAB</span>
                    </div>
                </div>
                <p className="footer-tagline">
                    Building the digital future with passion and precision. 2026 © Jayant.Lab
                </p>
                <div className="footer-socials">
                    <a href="https://wa.me/918885693465" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    <a href="tel:+918885693465">Call Me</a>
                    <a href="https://www.linkedin.com/in/jayant-narkhede-6a56b21a1/">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
