/**
 * Page d'accueil - HealthInsight Web
 */
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { checkHealth, HealthStatus } from '../lib/api';

const Home: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'état de l'API au chargement de la page
    const fetchApiStatus = async () => {
      try {
        const status = await checkHealth();
        setApiStatus(status);
      } catch (error) {
        console.error('Erreur de connexion à l\'API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApiStatus();
  }, []);

  return (
    <Layout>
      <div style={styles.container}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Bienvenue sur HealthInsight Web
          </h1>
          <p style={styles.heroSubtitle}>
            Plateforme web de prédiction des risques de santé basée sur les données StatCan
          </p>
          
          {/* Statut de l'API */}
          <div style={styles.statusCard}>
            {loading ? (
              <p style={styles.statusText}>Connexion à l&apos;API...</p>
            ) : apiStatus?.model_loaded ? (
              <div style={styles.statusSuccess}>
                <span style={styles.statusIcon}>✓</span>
                <span style={styles.statusText}>API opérationnelle - Modèle chargé</span>
              </div>
            ) : (
              <div style={styles.statusWarning}>
                <span style={styles.statusIcon}>⚠</span>
                <span style={styles.statusText}>
                  {apiStatus?.message || 'Impossible de se connecter à l\'API'}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section style={styles.features}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔍</div>
            <h2 style={styles.featureTitle}>Prédiction de Risque</h2>
            <p style={styles.featureDescription}>
              Analysez votre profil de santé et obtenez une estimation de votre niveau de risque
              basée sur un modèle de Machine Learning.
            </p>
            <Link href="/predict" style={styles.featureLink}>
              Commencer l&apos;analyse →
            </Link>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h2 style={styles.featureTitle}>Exploration des Données</h2>
            <p style={styles.featureDescription}>
              Visualisez les statistiques et les tendances du dataset de santé utilisé
              pour entraîner notre modèle.
            </p>
            <Link href="/explore" style={styles.featureLink}>
              Explorer les données →
            </Link>
          </div>
        </section>

        {/* Info Section */}
        <section style={styles.infoSection}>
          <h2 style={styles.infoTitle}>À propos du projet</h2>
          <div style={styles.infoContent}>
            <div style={styles.infoBlock}>
              <h3 style={styles.infoBlockTitle}>🎓 Projet de Fin d&apos;Études</h3>
              <p style={styles.infoText}>
                HealthInsight Web est un projet académique démontrant l&apos;application
                du Machine Learning à la prédiction des risques de santé.
              </p>
            </div>
            
            <div style={styles.infoBlock}>
              <h3 style={styles.infoBlockTitle}>🤖 Technologies Utilisées</h3>
              <p style={styles.infoText}>
                <strong>Backend :</strong> Python, FastAPI, scikit-learn<br/>
                <strong>Frontend :</strong> Next.js, React, TypeScript<br/>
                <strong>ML :</strong> Logistic Regression, pandas, numpy
              </p>
            </div>

            <div style={styles.infoBlock}>
              <h3 style={styles.infoBlockTitle}>⚠️ Avertissement Important</h3>
              <p style={styles.infoText}>
                Ce modèle est à usage pédagogique uniquement. Les prédictions ne doivent
                <strong> pas être utilisées pour des décisions médicales réelles</strong>.
                Consultez toujours un professionnel de santé qualifié.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Prêt à analyser votre profil de santé ?</h2>
          <Link href="/predict" style={styles.ctaButton}>
            Commencer maintenant
          </Link>
        </section>
      </div>
    </Layout>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #E8F4FD 100%)',
    borderRadius: '16px',
    marginBottom: '3rem',
    boxShadow: '0 8px 24px rgba(46, 125, 210, 0.15)',
    border: '1px solid #E1E8ED',
    position: 'relative',
    overflow: 'hidden',
  },
  heroTitle: {
    fontSize: '3rem',
    background: 'linear-gradient(135deg, #2E7DD2 0%, #4A90E2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 1rem 0',
    fontWeight: '700',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#657786',
    margin: '0 0 2.5rem 0',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  statusCard: {
    display: 'inline-block',
    padding: '1.2rem 2.5rem',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #E8F4FD 0%, #FFFFFF 100%)',
    border: '2px solid #2E7DD2',
    boxShadow: '0 4px 12px rgba(46, 125, 210, 0.1)',
  },
  statusSuccess: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#27AE60',
  },
  statusWarning: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#F39C12',
  },
  statusIcon: {
    fontSize: '1.8rem',
  },
  statusText: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem',
    marginBottom: '3rem',
  },
  featureCard: {
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FA 100%)',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(46, 125, 210, 0.1)',
    transition: 'all 0.3s ease',
    borderLeft: '4px solid #2E7DD2',
    position: 'relative',
    overflow: 'hidden',
  },
  featureIcon: {
    fontSize: '3.5rem',
    marginBottom: '1.5rem',
    filter: 'drop-shadow(0 2px 4px rgba(46, 125, 210, 0.2))',
  },
  featureTitle: {
    fontSize: '1.6rem',
    color: '#1E5BA8',
    margin: '0 0 1rem 0',
    fontWeight: '600',
  },
  featureDescription: {
    fontSize: '1.05rem',
    color: '#657786',
    lineHeight: '1.7',
    marginBottom: '1.5rem',
  },
  featureLink: {
    color: '#2E7DD2',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.05rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
  },
  infoSection: {
    background: 'linear-gradient(135deg, #FFFFFF 0%, #E8F4FD 100%)',
    padding: '3rem 2.5rem',
    borderRadius: '16px',
    marginBottom: '3rem',
    boxShadow: '0 8px 24px rgba(46, 125, 210, 0.15)',
    border: '1px solid #E1E8ED',
  },
  infoTitle: {
    fontSize: '2.2rem',
    color: '#1E5BA8',
    margin: '0 0 2rem 0',
    textAlign: 'center',
    fontWeight: '700',
  },
  infoContent: {
    display: 'grid',
    gap: '2rem',
  },
  infoBlock: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FA 100%)',
    borderRadius: '12px',
    borderLeft: '3px solid #4A90E2',
    boxShadow: '0 2px 8px rgba(46, 125, 210, 0.08)',
  },
  infoBlockTitle: {
    fontSize: '1.3rem',
    color: '#2E7DD2',
    margin: '0 0 1rem 0',
    fontWeight: '600',
  },
  infoText: {
    fontSize: '1.05rem',
    color: '#14171A',
    lineHeight: '1.7',
    margin: 0,
  },
  ctaSection: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, #2E7DD2 0%, #4A90E2 100%)',
    borderRadius: '16px',
    color: 'white',
    boxShadow: '0 8px 24px rgba(46, 125, 210, 0.3)',
  },
  ctaTitle: {
    fontSize: '2rem',
    margin: '0 0 2rem 0',
    fontWeight: '700',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  ctaButton: {
    display: 'inline-block',
    padding: '1.2rem 3rem',
    background: 'white',
    color: '#2E7DD2',
    textDecoration: 'none',
    borderRadius: '12px',
    fontSize: '1.15rem',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
};

export default Home;
