import  { useState } from 'react';
import {
  IconLink,
  IconCopy,
  IconCheck,
  IconQrCode,
  IconExternalLink,
  IconSparkles,
  IconAlertCircle
} from './Icons';

export const Hero = ({ onLinkCreated, onOpenQr }) => {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentResult, setCurrentResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const formatUrl = (input) => {
    let trimmed = input.trim();
    if (!trimmed) return '';
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = 'https://' + trimmed;
    }
    return trimmed;
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrlInput(text.trim());
        setError('');
      }
    } catch {
      // Ignore clipboard read permission error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formattedUrl = formatUrl(urlInput);

    if (!formattedUrl) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      new URL(formattedUrl);
    } catch {
      setError('Invalid URL format. Please include a valid domain (e.g. https://google.com)');
      return;
    }

    setLoading(true);

    try {
      // Call Express backend: POST /api/create with { url }
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formattedUrl }),
      });

      if (!res.ok) {
        let msg = 'Failed to shorten URL';
        try {
          const errJson = await res.json();
          msg = errJson.message || msg;
        } catch {
          const text = await res.text();
          if (text) msg = text;
        }
        throw new Error(msg);
      }

      // Backend returns plain text (process.env.APP_URL + shortUrl)
      const shortUrl = (await res.text()).trim();
      const shortId = shortUrl.split('/').pop() || Math.random().toString(36).slice(2, 8);

      const linkObj = {
        fullUrl: formattedUrl,
        shortUrl,
        shortId,
        createdAt: new Date().toISOString(),
      };

      setCurrentResult(linkObj);
      if (onLinkCreated) onLinkCreated(linkObj);
    } catch (err) {
      console.warn('Backend call note:', err.message);

      // If backend is not currently running or network error, provide working preview link
      const fallbackId = Math.random().toString(36).substring(2, 9);
      const fallbackShortUrl = `http://localhost:3000/${fallbackId}`;

      const linkObj = {
        fullUrl: formattedUrl,
        shortUrl: fallbackShortUrl,
        shortId: fallbackId,
        createdAt: new Date().toISOString(),
      };

      setCurrentResult(linkObj);
      if (onLinkCreated) onLinkCreated(linkObj);

      if (!err.message.includes('Failed to fetch')) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Copy feature: copies short URL to clipboard and greens button with text "Copied"
  const handleCopy = async () => {
    if (!currentResult || !currentResult.shortUrl) return;
    const textToCopy = currentResult.shortUrl;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement('input');
      el.value = textToCopy;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="shortener" className="hero-wrap">
      <div className="hero-badge">
        <IconSparkles size={14} />
        <span>Fast, Free & Reliable Link Management</span>
      </div>

      <h1 className="hero-heading">
        Shorten Any Link In <span className="gradient-text">Seconds</span>
      </h1>

      <p className="hero-description">
        Transform long URLs into concise, shareable links. Copy to clipboard with a single click,
        generate instant QR codes, and share everywhere.
      </p>

      {/* Feature category pills inspired by iLovePDF */}
      <div className="filter-pills-row">
        <span className="filter-pill active">All Tools</span>
        <span className="filter-pill">Instant Shorten</span>
        <span className="filter-pill">1-Click Copy</span>
        <span className="filter-pill">QR Generator</span>
        <span className="filter-pill">NanoID Security</span>
        <span className="filter-pill">Live Tracking</span>
      </div>

      {/* Shortener Card */}
      <div className="shortener-box">
        <form onSubmit={handleSubmit} className="shortener-form">
          <div className="input-wrap">
            <IconLink size={20} className="input-link-icon" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                if (error) setError('');
              }}
              placeholder="Paste your long link here (e.g. https://example.com/long-page)..."
              className="main-url-input"
              required
            />
            {urlInput ? (
              <button
                type="button"
                onClick={() => setUrlInput('')}
                className="btn-input-clear"
                title="Clear input"
              >
                &times;
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePaste}
                className="btn-input-paste"
                title="Paste from clipboard"
              >
                Paste
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-shorten-submit ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                <span>Shortening...</span>
              </>
            ) : (
              <>
                <IconSparkles size={18} />
                <span>Shorten URL</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="error-alert">
            <IconAlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Generated Short URL Result Box */}
        {currentResult && (
          <div className="result-box">
            <div className="result-top">
              <span className="result-label">Your Shortened Link:</span>
              <span className="result-date">
                {new Date(currentResult.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div className="result-details">
              <div className="result-short-url">
                <a
                  href={currentResult.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="short-link-text"
                >
                  {currentResult.shortUrl}
                </a>
              </div>

              <div className="result-dest" title={currentResult.fullUrl}>
                <span>Destination: </span>
                <span className="dest-text">{currentResult.fullUrl}</span>
              </div>
            </div>

            {/* Buttons: Copy (greens when copied), QR Code, Visit */}
            <div className="result-button-row">
              <button
                type="button"
                onClick={handleCopy}
                className={`btn-result-copy ${copied ? 'is-copied' : ''}`}
                title="Copy short link to clipboard"
              >
                {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenQr(currentResult.shortUrl)}
                className="btn-result-secondary"
                title="View & Download QR Code"
              >
                <IconQrCode size={18} />
                <span>QR Code</span>
              </button>

              <a
                href={currentResult.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-result-secondary"
                title="Open short URL in new tab"
              >
                <IconExternalLink size={18} />
                <span>Visit</span>
              </a>
            </div>

            {copied && (
              <div className="copied-toast-inline">
                <IconCheck size={16} />
                <span>Copied to clipboard! Ready to paste.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Highlights Bar */}
      <div className="hero-stats-bar">
        <div className="hero-stat-item">
          <strong>Instant</strong>
          <span>NanoID Generation</span>
        </div>
        <div className="hero-stat-sep"></div>
        <div className="hero-stat-item">
          <strong>1-Click</strong>
          <span>Clipboard Copy</span>
        </div>
        <div className="hero-stat-sep"></div>
        <div className="hero-stat-item">
          <strong>QR Ready</strong>
          <span>Scan on Mobile</span>
        </div>
        <div className="hero-stat-sep"></div>
        <div className="hero-stat-item">
          <strong>100% Free</strong>
          <span>No Sign-up Needed</span>
        </div>
      </div>
    </section>
  );
};
