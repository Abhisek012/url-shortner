import { useState } from 'react';
import { IconClose, IconDownload, IconCopy, IconCheck, IconExternalLink } from './Icons';

export const QrModal = ({ url, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !url) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(url)}&margin=10`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `qrcode-${url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Failed to download QR code', err);
      window.open(qrImageUrl, '_blank');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">QR Code</h3>
            <p className="modal-subtitle">Scan to visit the shortened link on any device</p>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            <IconClose size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="qr-box">
            <img
              src={qrImageUrl}
              alt={`QR Code for ${url}`}
              className="qr-img"
              width="240"
              height="240"
            />
          </div>

          <div className="qr-url-pill">
            <span className="qr-url-text">{url}</span>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className={`btn-modal-action btn-copy-action ${copied ? 'is-copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              className="btn-modal-action btn-download-action"
              onClick={handleDownload}
            >
              <IconDownload size={18} />
              <span>Download PNG</span>
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modal-action btn-visit-action"
            >
              <IconExternalLink size={18} />
              <span>Visit Link</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
