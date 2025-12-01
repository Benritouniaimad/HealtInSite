/**
 * Layout - Composant de mise en page commun
 */
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>🏥 HealthInsight Web</h1>
          <nav style={styles.nav}>
            <Link href="/" style={styles.navLink}>Accueil</Link>
            <Link href="/predict" style={styles.navLink}>Prédiction</Link>
            <Link href="/explore" style={styles.navLink}>Exploration</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {children}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          HealthInsight Web - Projet de Fin d&apos;Études
        </p>
        <p style={styles.disclaimer}>
          ⚠️ Ce modèle est à usage pédagogique uniquement. Ne pas utiliser pour des décisions médicales réelles.
        </p>
      </footer>
    </div>
  );
};

// Styles en ligne (thème médical moderne)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #F0F8FF 0%, #FFFFFF 100%)',
  },
  header: {
    background: 'linear-gradient(135deg, #2E7DD2 0%, #4A90E2 100%)',
    color: 'white',
    padding: '1.2rem 0',
    boxShadow: '0 4px 12px rgba(46, 125, 210, 0.2)',
    position: 'relative',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  nav: {
    display: 'flex',
    gap: '2.5rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    padding: '0.5rem 0',
    borderBottom: '2px solid transparent',
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '2.5rem 2rem',
  },
  footer: {
    background: 'linear-gradient(135deg, #1E5BA8 0%, #2E7DD2 100%)',
    color: 'white',
    padding: '2rem 0',
    textAlign: 'center',
    boxShadow: '0 -4px 12px rgba(46, 125, 210, 0.1)',
  },
  footerText: {
    margin: '0.5rem 0',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  disclaimer: {
    margin: '0.5rem 0',
    fontSize: '0.85rem',
    opacity: '0.9',
    fontStyle: 'italic',
  },
};

export default Layout;
