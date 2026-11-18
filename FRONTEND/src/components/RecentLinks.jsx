import  { useState } from 'react';

import {
  IconCopy,
  IconCheck,
  IconExternalLink,
  IconQrCode,
  IconTrash,
  IconClock,
  IconLink
} from './Icons';

export const RecentLinks = ({ links, onOpenQr, onDeleteLink, onClearAll }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [search, setSearch] = useState('');

  if (!links || links.length === 0) {
    return null;
  }

  const handleCopy = async (id, shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = shortUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredLinks = links.filter((item) => {
    const q = search.toLowerCase();
    return (
      (item.shortUrl && item.shortUrl.toLowerCase().includes(q)) ||
      (item.fullUrl && item.fullUrl.toLowerCase().includes(q))
    );
  });

  return (
    <section className="recent-section" id="recent">
      <div className="recent-header">
        <div className="recent-title-wrap">
          <div className="badge-pill">
            <IconClock size={14} />
            <span>Recent Activity</span>
          </div>
          <h2 className="recent-heading">Your Shortened Links ({links.length})</h2>
          <p className="recent-sub">Saved locally in your browser for quick access and copying</p>
        </div>

        <div className="recent-actions-bar">
          <input
            type="text"
            placeholder="Search links..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="recent-search-input"
          />
          <button
            onClick={onClearAll}
            className="btn-clear-all"
            title="Clear all saved links"
          >
            <IconTrash size={15} />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      <div className="recent-list">
        {filteredLinks.length === 0 ? (
          <div className="recent-empty">
            <p>No links matched your search "{search}".</p>
          </div>
        ) : (
          filteredLinks.map((item, index) => {
            const isCopied = copiedId === (item.shortId || index);
            return (
              <div key={item.shortId || index} className="recent-item">
                <div className="recent-item-main">
                  <div className="recent-short-row">
                    <IconLink size={16} className="recent-link-icon" />
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="recent-short-anchor"
                    >
                      {item.shortUrl}
                    </a>
                  </div>
                  <div className="recent-full-url" title={item.fullUrl}>
                    {item.fullUrl}
                  </div>
                  <div className="recent-meta-row">
                    <span className="recent-time">
                      {new Date(item.createdAt || new Date()).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className="recent-item-actions">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.shortId || index, item.shortUrl)}
                    className={`btn-table-copy ${isCopied ? 'is-copied' : ''}`}
                    title="Copy short URL to clipboard"
                  >
                    {isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenQr(item.shortUrl)}
                    className="btn-table-icon"
                    title="View QR Code"
                  >
                    <IconQrCode size={16} />
                  </button>

                  <a
                    href={item.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-table-icon"
                    title="Open in new tab"
                  >
                    <IconExternalLink size={16} />
                  </a>

                  <button
                    type="button"
                    onClick={() => onDeleteLink(item.shortId || index)}
                    className="btn-table-icon btn-table-delete"
                    title="Delete link"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
