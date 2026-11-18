// import React, { useState } from 'react';
import { useState } from 'react';

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const items = [
    {
      q: 'How do I copy the shortened URL?',
      a: 'After clicking "Shorten URL", a result card appears containing your short link. Click the "Copy" button — it immediately turns green with the text "Copied" and copies the short URL straight to your clipboard so you can paste it anywhere.',
    },
    {
      q: 'How does the backend shorten the link?',
      a: 'The frontend sends your destination URL to the Express backend endpoint (/api/create). The backend validates the URL, creates a unique 8-character NanoID, stores it in MongoDB, and returns the shortened link.',
    },
    {
      q: 'Do the short links expire?',
      a: 'No. The shortened URLs are stored in MongoDB and will stay active indefinitely.',
    },
    {
      q: 'Can I download the QR code for my link?',
      a: 'Yes! Click the "QR Code" button on any generated link to open the QR Code modal where you can scan it directly or click "Download PNG".',
    },
  ];

  return (
    <section id="faq" className="faq-section">
      <div className="section-head">
        <span className="section-badge">FAQ</span>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Quick answers to common questions about ShortLink.</p>
      </div>

      <div className="faq-container">
        {items.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className={`faq-row ${isOpen ? 'active' : ''}`}>
              <button
                type="button"
                className="faq-btn"
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-indicator">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="faq-content">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
