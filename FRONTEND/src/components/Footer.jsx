// import React from 'react';
import { IconLink } from './Icons';

export const Footer = () => {
  return (
    <footer className="footer-wrap">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo-icon-wrap-sm">
            <IconLink size={18} className="logo-icon" />
          </div>
          <span className="brand-text">
            Short<span className="gradient-text">Link</span>
          </span>
        </div>
        <p className="footer-desc">
          A fast, simple URL Shortener with instant clipboard copy and QR code generation.
        </p>
      </div>

      <div className="footer-bottom-bar">
        <p>&copy; {new Date().getFullYear()} ShortLink. All rights reserved.</p>
        <a href="#shortener" className="footer-top-link">Back to top &uarr;</a>
      </div>
    </footer>
  );
};
