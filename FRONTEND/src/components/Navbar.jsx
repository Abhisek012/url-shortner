import { IconLink, IconSun, IconMoon, IconSparkles, IconGithub } from './Icons';

export const Navbar = ({ theme, onToggleTheme }) => {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <a href="#" className="brand-logo">
          <div className="logo-icon-wrap">
            <IconLink size={20} className="logo-icon" />
          </div>
          <span className="brand-text">
            <span className="gradient-text">URI</span>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#shortener" className="nav-link">Shorten</a>
          <a href="#recent" className="nav-link">History</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        <div className="nav-actions">
          <a
            href="https://github.com/Abhisek012/url-shortner.git"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-toggle-btn"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <IconGithub size={18} />
          </a>

          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </button>

          <a href="#shortener" className="btn-nav-cta">
            <IconSparkles size={16} />
            <span>Shorten URL</span>
          </a>
        </div>
      </div>
    </header>
  );
};
