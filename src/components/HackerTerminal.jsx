import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeContent } from '../data/themeContent';
import './HackerTerminal.css';

const HackerTerminal = () => {
    const { currentTheme } = useTheme();
    const [history, setHistory] = useState([
        { type: 'system', content: '>>> INITIALIZING VORTEK-OS V2.0.4...' },
        { type: 'system', content: '>>> LOADING NEURAL KERNEL... [OK]' },
        { type: 'system', content: '>>> ESTABLISHING ENCRYPTED LINK... [SECURE]' },
        { type: 'system', content: '>>> WELCOME, SUPERUSER.' },
        { type: 'info', content: 'Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const [isBooted, setIsBooted] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    const themeData = themeContent.hacker;

    useEffect(() => {
        const timer = setTimeout(() => setIsBooted(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', content: `guest@jayant.lab:~$ ${input}` }];

            processCommand(cmd, newHistory);
            setInput('');
        }
    };

    const processCommand = (cmd, currentHistory) => {
        const parts = cmd.split(' ');
        const baseCmd = parts[0];

        switch (baseCmd) {
            case 'help':
                currentHistory.push({ type: 'system', content: '>>> SYSTEM DIRECTORY HELP' });
                currentHistory.push({ type: 'info', content: '----------------------------------------' });
                currentHistory.push({ type: 'info', content: 'LS       - List directory contents' });
                currentHistory.push({ type: 'info', content: 'CAT      - Display file contents (e.g., cat profile.txt)' });
                currentHistory.push({ type: 'info', content: 'NEOFETCH - Display system summary' });
                currentHistory.push({ type: 'info', content: 'CONTACT  - View communication channels' });
                currentHistory.push({ type: 'info', content: 'SKILLS   - Show technical proficiencies' });
                currentHistory.push({ type: 'info', content: 'SOCIALS  - External network links' });
                currentHistory.push({ type: 'info', content: 'CLEAR    - Clear terminal buffer' });
                currentHistory.push({ type: 'info', content: 'STATUS   - System health check' });
                currentHistory.push({ type: 'info', content: 'EXIT     - Terminate session' });
                currentHistory.push({ type: 'info', content: '----------------------------------------' });
                break;
            case 'ls':
                currentHistory.push({ type: 'system', content: 'DIRECTORY: /jayant.lab/' });
                currentHistory.push({ type: 'info', content: 'profile.txt  contact.txt  skills.md  projects/  kernel/' });
                break;
            case 'whoami':
                currentHistory.push({ type: 'info', content: 'USER: SUPERUSER [JAYANT]' });
                currentHistory.push({ type: 'info', content: 'ROLE: FULL-STACK GROWTH ENGINEER' });
                break;
            case 'neofetch':
                currentHistory.push({ type: 'custom', content: <NeofetchOutput /> });
                break;
            case 'contact':
                currentHistory.push({ type: 'system', content: 'EXTRACTING CONTACT DATA...' });
                currentHistory.push({ type: 'info', content: 'PHONE: +91 88569 34651' });
                currentHistory.push({ type: 'info', content: 'EMAIL: jayantsali@gmail.com' });
                currentHistory.push({ type: 'info', content: 'WA: https://wa.me/918856934651' });
                break;
            case 'socials':
                currentHistory.push({ type: 'system', content: 'SCANNING EXTERNAL NETWORKS...' });
                currentHistory.push({ type: 'info', content: 'LINKEDIN: https://linkedin.com/in/jayantsali' });
                currentHistory.push({ type: 'info', content: 'INSTAGRAM: https://instagram.com/jayantsali_codes' });
                break;
            case 'skills':
                currentHistory.push({ type: 'system', content: 'QUERYING TECH STACK...' });
                currentHistory.push({ type: 'info', content: 'CORE: React, Node.js, Next.js, Vite' });
                currentHistory.push({ type: 'info', content: '3D/VISUAL: Three.js, R3F, Canvas API' });
                currentHistory.push({ type: 'info', content: 'GROWTH: Technical SEO, Schema Automation, Core Web Vitals' });
                currentHistory.push({ type: 'info', content: 'OPS: Vercel, Railway, CI/CD, Git' });
                break;
            case 'cat':
                if (parts[1] === 'profile.txt' || parts[1] === 'about') {
                    currentHistory.push({ type: 'system', content: 'READING: profile.txt...' });
                    currentHistory.push({ type: 'info', content: themeData.about.mission });
                } else if (parts[1] === 'projects') {
                    currentHistory.push({ type: 'system', content: 'LISTING ACTIVE MISSION FILES:' });
                    themeData.projects.items.forEach(p => {
                        currentHistory.push({ type: 'info', content: `- [${p.id}]: ${p.name}` });
                    });
                } else if (parts[1] === 'skills.md' || parts[1] === 'skills') {
                    currentHistory.push({ type: 'system', content: 'READING: skills.md...' });
                    themeData.about.approach.forEach(a => {
                        currentHistory.push({ type: 'info', content: `[X] ${a}` });
                    });
                } else {
                    currentHistory.push({ type: 'error', content: 'ERROR: FILE NOT FOUND or ACCESS DENIED' });
                }
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'status':
                currentHistory.push({ type: 'system', content: 'SYSTEM STATUS: OPTIMAL' });
                currentHistory.push({ type: 'system', content: 'CPU: 12% | MEM: 1.2GB/16GB | NET: SECURE' });
                break;
            case 'exit':
                currentHistory.push({ type: 'system', content: 'TERMINATING SESSION...' });
                setTimeout(() => window.location.reload(), 1000);
                break;
            case '':
                break;
            default:
                currentHistory.push({ type: 'error', content: `COMMAND NOT FOUND: ${baseCmd}` });
        }
        setHistory(currentHistory);
    };

    if (currentTheme !== 'hacker') return null;

    return (
        <div className="terminal-fullscreen animate-fade-in" onClick={() => inputRef.current?.focus()}>
            <div className="crt-overlay"></div>
            <div className="terminal-scanlines"></div>

            <div className="terminal-header">
                <span className="terminal-title">VORTEK-OS | SESSION: ALPHA-7</span>
                <div className="header-lights">
                    <div className="light green"></div>
                    <div className="light red pulse"></div>
                </div>
            </div>

            <div className="terminal-body" ref={scrollRef}>
                {!isBooted ? (
                    <div className="boot-sequence">
                        <p>BIOS Version: v2.0.4 r102</p>
                        <p>Memory Check: 16777216KB OK</p>
                        <p>Disk Check: /dev/sda1 status healthy</p>
                        <p className="flash">LOADING MODULES...</p>
                    </div>
                ) : (
                    <>
                        {history.map((line, i) => (
                            <div key={i} className={`terminal-line line-${line.type}`}>
                                {line.content}
                            </div>
                        ))}
                        <div className="input-wrapper">
                            <span className="prompt">guest@jayant.lab:~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleCommand}
                                autoFocus
                                spellCheck="false"
                            />
                            <span className="cursor">_</span>
                        </div>
                    </>
                )}
            </div>

            <DigitalRain />
        </div>
    );
};

const DigitalRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="matrix-canvas" />;
};

export default HackerTerminal;

const NeofetchOutput = () => {
    return (
        <div className="neofetch-wrapper">
            <div className="neofetch-ascii">
                {`   ________
  /        \\
 /  /\\  /\\  \\
|  |  ||  |  |
|  \\__/  \\__/|
 \\          /
  \\________/
  JAYANT.LAB`}
            </div>
            <div className="neofetch-info">
                <div className="neofetch-item"><span className="neofetch-label">OS:</span> <span className="neofetch-value">Jayant-Lab OS</span></div>
                <div className="neofetch-item"><span className="neofetch-label">Host:</span> <span className="neofetch-value">Portfolio-V2</span></div>
                <div className="neofetch-item"><span className="neofetch-label">Kernel:</span> <span className="neofetch-value">Vortek-Core-2.0</span></div>
                <div className="neofetch-item"><span className="neofetch-label">Uptime:</span> <span className="neofetch-value">Infinite</span></div>
                <div className="neofetch-item"><span className="neofetch-label">Shell:</span> <span className="neofetch-value">vortek-sh</span></div>
                <div className="neofetch-item"><span className="neofetch-label">Resolution:</span> <span className="neofetch-value">1920x1080</span></div>
                <div className="neofetch-item"><span className="neofetch-label">CPU:</span> <span className="neofetch-value">Neural-Engine-S1</span></div>
                <div className="neofetch-item"><span className="neofetch-label">GPU:</span> <span className="neofetch-value">R3F-Acceleration</span></div>
                <div className="neofetch-item"><span className="neofetch-label">Memory:</span> <span className="neofetch-value">1.2GB / 16GB</span></div>
            </div>
        </div>
    );
};
