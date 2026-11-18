// import React from 'react';
import { IconLink, IconSparkles, IconCopy } from './Icons';

export const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      icon: <IconLink size={24} />,
      title: 'Paste Your Link',
      desc: 'Enter any long, complex URL into the input field above.',
    },
    {
      step: '02',
      icon: <IconSparkles size={24} />,
      title: 'Click Shorten',
      desc: 'The backend creates a concise, high-speed NanoID short URL in MongoDB.',
    },
    {
      step: '03',
      icon: <IconCopy size={24} />,
      title: 'Copy & Share',
      desc: 'Click the copy button (turns green when copied) and share your link anywhere.',
    },
  ];

  return (
    <section id="how-it-works" className="how-section">
      <div className="section-head">
        <span className="section-badge">How It Works</span>
        <h2 className="section-title">Three Easy Steps</h2>
        <p className="section-subtitle">Simplify your long web addresses in seconds.</p>
      </div>

      <div className="steps-grid">
        {steps.map((s, idx) => (
          <div key={idx} className="step-card">
            <span className="step-num">{s.step}</span>
            <div className="step-icon">{s.icon}</div>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
