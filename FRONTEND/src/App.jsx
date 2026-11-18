import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RecentLinks } from './components/RecentLinks';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { QrModal } from './components/QrModal';
import './App.css';

const STORAGE_KEY = 'shortlink_recent_links';
const THEME_KEY = 'shortlink_theme';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'light';
  });

  const [recentLinks, setRecentLinks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [qrModalUrl, setQrModalUrl] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentLinks));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [recentLinks]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLinkCreated = (newLink) => {
    setRecentLinks((prev) => {
      const filtered = prev.filter((item) => item.shortUrl !== newLink.shortUrl);
      return [newLink, ...filtered].slice(0, 50);
    });
  };

  const handleDeleteLink = (idOrIndex) => {
    setRecentLinks((prev) =>
      prev.filter((item, idx) => item.shortId !== idOrIndex && idx !== idOrIndex)
    );
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all your saved link history?')) {
      setRecentLinks([]);
    }
  };

  return (
    <div className="page-shell">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="page-main">
        <Hero
          onLinkCreated={handleLinkCreated}
          onOpenQr={(url) => setQrModalUrl(url)}
        />

        <RecentLinks
          links={recentLinks}
          onOpenQr={(url) => setQrModalUrl(url)}
          onDeleteLink={handleDeleteLink}
          onClearAll={handleClearAll}
        />

        <Features />
        <HowItWorks />
        <FAQ />
      </main>

      <Footer />

      <QrModal
        url={qrModalUrl}
        isOpen={Boolean(qrModalUrl)}
        onClose={() => setQrModalUrl(null)}
      />
    </div>
  );
}

export default App;
