/**
 * Page de prédiction - Formulaire et résultat
 */
import React, { useState } from 'react';
import Layout from '../components/Layout';
import PredictionForm from '../components/PredictionForm';
import RiskResultCard from '../components/RiskResultCard';
import { PredictionResult } from '../lib/api';

const PredictPage: React.FC = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResult = (newResult: PredictionResult) => {
    setResult(newResult);
    setError(null);
    // Scroll vers le résultat
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setResult(null);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🔍 Analyse de Risque de Santé</h1>
          <p style={styles.subtitle}>
            Remplissez le formulaire ci-dessous avec vos informations de santé
            pour obtenir une estimation de votre niveau de risque.
          </p>
        </div>

        {/* Formulaire */}
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>Informations du Patient</h2>
          <PredictionForm onResult={handleResult} onError={handleError} />
        </div>

        {/* Affichage des erreurs */}
        {error && (
          <div style={styles.errorCard}>
            <span style={styles.errorIcon}>❌</span>
            <div>
              <h3 style={styles.errorTitle}>Erreur</h3>
              <p style={styles.errorMessage}>{error}</p>
            </div>
          </div>
        )}

        {/* Affichage du résultat */}
        {result && (
          <div style={styles.resultSection}>
            <RiskResultCard result={result} />
            <button onClick={handleReset} style={styles.resetButton}>
              Faire une nouvelle analyse
            </button>
          </div>
        )}

        {/* Informations complémentaires */}
        {!result && !error && (
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>Comment fonctionne l&apos;analyse ?</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoCard}>
                <div style={styles.infoIcon}>1️⃣</div>
                <h4 style={styles.infoCardTitle}>Saisie des données</h4>
                <p style={styles.infoCardText}>
                  Renseignez vos informations de santé dans le formulaire ci-dessus.
                </p>
              </div>
              
              <div style={styles.infoCard}>
                <div style={styles.infoIcon}>2️⃣</div>
                <h4 style={styles.infoCardTitle}>Analyse par IA</h4>
                <p style={styles.infoCardText}>
                  Notre modèle de Machine Learning analyse votre profil et calcule un score de risque.
                </p>
              </div>
              
              <div style={styles.infoCard}>
                <div style={styles.infoIcon}>3️⃣</div>
                <h4 style={styles.infoCardTitle}>Résultat personnalisé</h4>
                <p style={styles.infoCardText}>
                  Vous obtenez un niveau de risque (faible, modéré, élevé) avec des recommandations.
                </p>
              </div>
            </div>

            <div style={styles.disclaimer}>
              <strong>⚠️ Important :</strong> Cette analyse est basée sur un modèle statistique
              à usage pédagogique. Elle ne remplace en aucun cas l&apos;avis d&apos;un professionnel
              de santé. En cas de préoccupation, consultez votre médecin.
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, #E8F4FD 0%, #FFFFFF 100%)',
    borderRadius: '16px',
    border: '1px solid #E1E8ED',
  },
  title: {
    fontSize: '2.8rem',
    background: 'linear-gradient(135deg, #2E7DD2 0%, #4A90E2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 1rem 0',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.15rem',
    color: '#657786',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.7',
  },
  formSection: {
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FA 100%)',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(46, 125, 210, 0.12)',
    marginBottom: '2.5rem',
    border: '1px solid #E1E8ED',
  },
  sectionTitle: {
    fontSize: '1.6rem',
    color: '#1E5BA8',
    margin: '0 0 2rem 0',
    paddingBottom: '1rem',
    borderBottom: '3px solid #2E7DD2',
    fontWeight: '600',
  },
  errorCard: {
    background: 'linear-gradient(135deg, #FEE 0%, #FDD 100%)',
    border: '2px solid #E74C3C',
    borderLeft: '4px solid #E74C3C',
    borderRadius: '12px',
    padding: '1.5rem 2rem',
    marginBottom: '2rem',
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
    boxShadow: '0 4px 12px rgba(231, 76, 60, 0.15)',
  },
  errorIcon: {
    fontSize: '2.5rem',
  },
  errorTitle: {
    color: '#E74C3C',
    margin: '0 0 0.5rem 0',
    fontSize: '1.3rem',
    fontWeight: '600',
  },
  errorMessage: {
    color: '#721C24',
    margin: 0,
    fontSize: '1.05rem',
  },
  resultSection: {
    marginBottom: '2.5rem',
  },
  resetButton: {
    width: '100%',
    padding: '1.2rem',
    background: 'linear-gradient(135deg, #95A5A6 0%, #7F8C8D 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '2rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(149, 165, 166, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  infoSection: {
    background: 'linear-gradient(135deg, #FFFFFF 0%, #E8F4FD 100%)',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(46, 125, 210, 0.12)',
    border: '1px solid #E1E8ED',
  },
  infoTitle: {
    fontSize: '1.8rem',
    color: '#1E5BA8',
    margin: '0 0 2rem 0',
    textAlign: 'center',
    fontWeight: '600',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  infoCard: {
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FA 100%)',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    borderLeft: '3px solid #4A90E2',
    boxShadow: '0 4px 12px rgba(46, 125, 210, 0.08)',
    transition: 'all 0.3s ease',
  },
  infoIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    filter: 'drop-shadow(0 2px 4px rgba(46, 125, 210, 0.2))',
  },
  infoCardTitle: {
    fontSize: '1.2rem',
    color: '#2E7DD2',
    margin: '0 0 0.75rem 0',
    fontWeight: '600',
  },
  infoCardText: {
    fontSize: '1rem',
    color: '#657786',
    margin: 0,
    lineHeight: '1.6',
  },
  disclaimer: {
    background: 'linear-gradient(135deg, #FFF3CD 0%, #FFE8A1 100%)',
    border: '2px solid #F39C12',
    borderLeft: '4px solid #F39C12',
    borderRadius: '12px',
    padding: '1.5rem 2rem',
    color: '#856404',
    fontSize: '1rem',
    lineHeight: '1.7',
    boxShadow: '0 4px 12px rgba(243, 156, 18, 0.15)',
  },
};

export default PredictPage;
