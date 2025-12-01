/**
 * RiskResultCard - Affichage du résultat de prédiction
 */
import React from 'react';
import { PredictionResult } from '../lib/api';

interface RiskResultCardProps {
  result: PredictionResult;
}

const RiskResultCard: React.FC<RiskResultCardProps> = ({ result }) => {
  const { risk_score, risk_level, confidence } = result;

  // Configuration des couleurs et messages selon le niveau de risque
  const riskConfig = {
    low: {
      color: '#27ae60',
      bgColor: '#d4edda',
      borderColor: '#27ae60',
      title: 'Risque Faible',
      icon: '✓',
      message: 'Votre profil de santé indique un risque faible. Continuez vos bonnes habitudes !',
    },
    moderate: {
      color: '#f39c12',
      bgColor: '#fff3cd',
      borderColor: '#f39c12',
      title: 'Risque Modéré',
      icon: '⚠',
      message: 'Votre profil de santé indique un risque modéré. Consultez un professionnel de santé pour des conseils personnalisés.',
    },
    high: {
      color: '#e74c3c',
      bgColor: '#f8d7da',
      borderColor: '#e74c3c',
      title: 'Risque Élevé',
      icon: '⚠',
      message: 'Votre profil de santé indique un risque élevé. Nous vous recommandons de consulter un médecin rapidement.',
    },
  };

  const config = riskConfig[risk_level];
  const riskPercentage = Math.round(risk_score * 100);
  const confidencePercentage = Math.round(confidence * 100);

  return (
    <div style={{ ...styles.card, backgroundColor: config.bgColor, borderColor: config.borderColor }}>
      {/* Icône et titre */}
      <div style={styles.header}>
        <span style={{ ...styles.icon, color: config.color }}>{config.icon}</span>
        <h2 style={{ ...styles.title, color: config.color }}>{config.title}</h2>
      </div>

      {/* Score de risque */}
      <div style={styles.scoreContainer}>
        <div style={styles.scoreCircle}>
          <span style={{ ...styles.scoreText, color: config.color }}>
            {riskPercentage}%
          </span>
          <span style={styles.scoreLabel}>Score de risque</span>
        </div>
      </div>

      {/* Barre de progression */}
      <div style={styles.progressBarContainer}>
        <div style={styles.progressBarBg}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${riskPercentage}%`,
              backgroundColor: config.color,
            }}
          />
        </div>
        <div style={styles.progressLabels}>
          <span style={styles.progressLabel}>0%</span>
          <span style={styles.progressLabel}>50%</span>
          <span style={styles.progressLabel}>100%</span>
        </div>
      </div>

      {/* Message */}
      <p style={{ ...styles.message, color: config.color }}>
        {config.message}
      </p>

      {/* Confiance */}
      <div style={styles.confidence}>
        <span style={styles.confidenceLabel}>Confiance du modèle :</span>
        <span style={{ ...styles.confidenceValue, color: config.color }}>
          {confidencePercentage}%
        </span>
      </div>

      {/* Recommandations */}
      <div style={styles.recommendations}>
        <h3 style={styles.recommendationsTitle}>Recommandations générales :</h3>
        <ul style={styles.recommendationsList}>
          <li>Maintenez une alimentation équilibrée</li>
          <li>Pratiquez une activité physique régulière</li>
          <li>Effectuez des contrôles médicaux réguliers</li>
          <li>Évitez le tabac et limitez l&apos;alcool</li>
        </ul>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: '1px solid',
    borderLeft: '5px solid',
    borderRadius: '16px',
    padding: '2.5rem',
    marginTop: '2.5rem',
    boxShadow: '0 8px 24px rgba(46, 125, 210, 0.2)',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FA 100%)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '2px solid #E1E8ED',
  },
  icon: {
    fontSize: '3rem',
    fontWeight: 'bold',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  },
  title: {
    margin: 0,
    fontSize: '2.2rem',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  scoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2.5rem 0',
  },
  scoreCircle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 8px 24px rgba(46, 125, 210, 0.2), inset 0 2px 4px rgba(0,0,0,0.05)',
    border: '3px solid #E1E8ED',
  },
  scoreText: {
    fontSize: '3.5rem',
    fontWeight: '800',
    margin: 0,
    letterSpacing: '-1px',
  },
  scoreLabel: {
    fontSize: '0.95rem',
    color: '#657786',
    marginTop: '0.5rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  progressBarContainer: {
    margin: '2rem 0',
  },
  progressBarBg: {
    width: '100%',
    height: '24px',
    background: 'linear-gradient(135deg, #E8F4FD 0%, #F5F8FA 100%)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: 'inset 0 2px 4px rgba(46, 125, 210, 0.1)',
    border: '1px solid #E1E8ED',
  },
  progressBarFill: {
    height: '100%',
    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '12px',
    position: 'relative',
    boxShadow: '0 2px 8px rgba(46, 125, 210, 0.3)',
  },
  progressLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.75rem',
    fontSize: '0.85rem',
    color: '#657786',
    fontWeight: '500',
  },
  progressLabel: {},
  message: {
    fontSize: '1.15rem',
    lineHeight: '1.7',
    margin: '2rem 0',
    fontWeight: '500',
    padding: '1.5rem',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(46, 125, 210, 0.08)',
  },
  confidence: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    background: 'linear-gradient(135deg, #E8F4FD 0%, #FFFFFF 100%)',
    borderRadius: '12px',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(46, 125, 210, 0.1)',
    border: '1px solid #E1E8ED',
  },
  confidenceLabel: {
    fontSize: '1.05rem',
    color: '#1E5BA8',
    fontWeight: '600',
  },
  confidenceValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  recommendations: {
    background: 'linear-gradient(135deg, #FFFFFF 0%, #E8F4FD 100%)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(46, 125, 210, 0.1)',
    border: '1px solid #E1E8ED',
  },
  recommendationsTitle: {
    margin: '0 0 1.5rem 0',
    fontSize: '1.3rem',
    color: '#1E5BA8',
    fontWeight: '600',
  },
  recommendationsList: {
    margin: 0,
    paddingLeft: '1.5rem',
    color: '#14171A',
    lineHeight: '2',
    fontSize: '1.05rem',
  },
};

export default RiskResultCard;
