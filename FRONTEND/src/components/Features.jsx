// import React from 'react';
import { IconZap, IconCopy, IconQrCode, IconShield, IconGlobe, IconClock } from './Icons';

export const Features = () => {
  const features = [
    {
      icon: <IconZap size={24} />,
      title: 'Lightning Fast Redirection',
      desc: 'Optimized routing and low latency redirect visitors to the destination in milliseconds.',
    },
    {
      icon: <IconCopy size={24} />,
      title: 'One-Click Clipboard Copy',
      desc: 'Copy your shortened URL instantly with real-time green visual feedback and reliable fallback.',
    },
    {
      icon: <IconQrCode size={24} />,
      title: 'Instant QR Code Generation',
      desc: 'Generate, preview, and download crisp QR codes for mobile users and offline prints.',
    },
    {
      icon: <IconShield size={24} />,
      title: 'Secure NanoID Generation',
      desc: 'Collision-resistant NanoID slugs ensure every short URL is unique and tamper-proof.',
    },
    {
      icon: <IconGlobe size={24} />,
      title: 'Universal Device Support',
      desc: 'Responsive, mobile-first design with smooth dark and light themes for any screen.',
    },
    {
      icon: <IconClock size={24} />,
      title: 'Click Analytics & Tracking',
      desc: 'Track audience visits and redirects in real-time as users engage with your short links.',
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="section-head">
        <span className="section-badge">Features</span>
        <h2 className="section-title">Everything You Need In A URL Shortener</h2>
        <p className="section-subtitle">
          Built for speed, simplicity, and a seamless link sharing experience.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feat, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">{feat.icon}</div>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-desc">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
