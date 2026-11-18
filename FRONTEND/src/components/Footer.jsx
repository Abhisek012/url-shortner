import { IconLink, IconGithub, IconTwitter, IconMail } from './Icons';

export const Footer = () => {
  return (
    <footer className="footer-wrap">
      <div className="footer-content">
        <div className="footer-brand-section">
          <div className="footer-brand">
            <div className="logo-icon-wrap-sm">
              <IconLink size={18} className="logo-icon" />
            </div>
            <span className="brand-text">
              <span className="gradient-text">URI</span>
            </span>
          </div>
          <p className="footer-desc">
            A fast, simple URL Shortener with instant clipboard copy and QR code generation.
          </p>
        </div>

        {/* Developer & Social Links */}
        <div className="footer-social-section">
          <span className="footer-social-label">Connect & Project</span>
          <div className="footer-social-links">
            <a
              href="https://github.com/Abhisek012/url-shortner.git"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="GitHub Repository"
              aria-label="GitHub Repository"
            >
              <IconGithub size={18} />
              <span>GitHub</span>
            </a>

            <a
              href="https://x.com/Abhip44"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="Twitter / X Profile"
              aria-label="Twitter / X Profile"
            >
              <IconTwitter size={16} />
              <span>Twitter / X</span>
            </a>

            <a
              href="mailto:abhisekprusty018@gmail.com"
              className="social-btn"
              title="Send an email to abhisekprusty018@gmail.com"
              aria-label="Email"
            >
              <IconMail size={18} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>&copy; {new Date().getFullYear()} URI. Crafted by Abhisek. All rights reserved.</p>
        <a href="#shortener" className="footer-top-link">Back to top &uarr;</a>
      </div>
    </footer>
  );
};
