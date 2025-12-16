/**
 * Dashboard.tsx
 * Page principale combinant le formulaire patient et le visualiseur 3D
 * Gestion de l'état global et communication avec l'API
 */
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import PatientForm from '../components/PatientForm';
import { predictRisk } from '../lib/api';
import { PatientFormData, PredictionResponse, BodyRegion, RiskLevel } from '../types/prediction';

// Import dynamique de Risk3DViewer pour éviter les problèmes SSR avec Three.js
const Risk3DViewer = dynamic(
  () => import('../components/Risk3DViewer'),
  { 
    ssr: false,
    loading: () => (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Chargement du visualiseur 3D...</p>
      </div>
    )
  }
);

const Dashboard: React.FC = () => {
  // État pour la prédiction
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Gère la soumission du formulaire et appelle l'API de prédiction
   */
  const handlePredict = async (patientData: PatientFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Appel à l'API backend
      const result = await predictRisk(patientData);
      
      // Mise à jour de l'état avec la réponse
      // Mapper 'moderate' du backend à 'medium' du frontend
      const mappedRiskLevel = result.risk_level === 'moderate' ? 'medium' : result.risk_level;
      
      setPrediction({
        risk_score: result.risk_score,
        risk_level: mappedRiskLevel as RiskLevel,
        disease: result.disease,
        body_region: result.body_region as BodyRegion,
      });
      
      console.log('Prédiction reçue:', result);
    } catch (err: any) {
      // Gestion des erreurs
      let errorMessage = 'Une erreur est survenue lors de la prédiction';
      
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        // Si detail est un tableau (erreurs de validation Pydantic)
        if (Array.isArray(detail)) {
          errorMessage = detail.map((e: any) => `${e.loc?.join('.')}: ${e.msg}`).join(', ');
        } else if (typeof detail === 'string') {
          errorMessage = detail;
        } else if (typeof detail === 'object') {
          errorMessage = JSON.stringify(detail);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('Erreur de prédiction:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Réinitialise la prédiction
   */
  const handleReset = () => {
    setPrediction(null);
    setError(null);
  };

  return (
    <Layout>
      <div style={styles.container}>
        {/* En-tête */}
        <header style={styles.header}>
          <h1 style={styles.title}>Dashboard de Prédiction de Risque</h1>
          <p style={styles.subtitle}>
            Visualisation 3D des zones à risque basée sur vos données de santé
          </p>
        </header>

        {/* Contenu principal : formulaire + visualiseur 3D */}
        <div style={styles.mainContent}>
          {/* Colonne gauche : Formulaire */}
          <div style={styles.leftColumn}>
            <PatientForm 
              onSubmit={handlePredict}
              isLoading={isLoading}
            />

            {/* Affichage des erreurs */}
            {error && (
              <div style={styles.errorBox}>
                <strong>Erreur :</strong> {error}
              </div>
            )}

            {/* Bouton de réinitialisation */}
            {prediction && !isLoading && (
              <button
                onClick={handleReset}
                style={styles.resetButton}
              >
                Nouvelle Prédiction
              </button>
            )}

            {/* Instructions */}
            <div style={styles.instructionsBox}>
              <h3 style={styles.instructionsTitle}>📋 Instructions</h3>
              <ol style={styles.instructionsList}>
                <li>Remplissez tous les champs du formulaire avec les données du patient</li>
                <li>Cliquez sur "Prédire le Risque" pour lancer l&apos;analyse</li>
                <li>Visualisez la zone à risque sur le corps 3D à droite</li>
                <li>Utilisez votre souris pour faire pivoter, zoomer sur le modèle 3D</li>
              </ol>
            </div>
          </div>

          {/* Colonne droite : Visualiseur 3D */}
          <div style={styles.rightColumn}>
            {isLoading ? (
              // État de chargement
              <div style={styles.loadingState}>
                <div style={styles.spinner} />
                <p style={styles.loadingText}>Analyse en cours...</p>
              </div>
            ) : prediction ? (
              // Affichage du résultat 3D
              <Risk3DViewer 
                bodyRegion={prediction.body_region}
                riskLevel={prediction.risk_level}
                disease={prediction.disease}
                riskScore={prediction.risk_score}
              />
            ) : (
              // État initial
              <div style={styles.placeholderState}>
                <div style={styles.placeholderIcon}>🏥</div>
                <h3 style={styles.placeholderTitle}>En attente de prédiction</h3>
                <p style={styles.placeholderText}>
                  Remplissez le formulaire et cliquez sur &quot;Prédire le Risque&quot; 
                  pour visualiser les résultats en 3D
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Styles CSS-in-JS
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    margin: '0',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gap: '24px',
    alignItems: 'start',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  rightColumn: {
    minHeight: '700px',
    height: '700px',
    position: 'sticky',
    top: '20px',
  },
  errorBox: {
    backgroundColor: '#fee2e2',
    border: '1px solid #ef4444',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#991b1b',
    fontSize: '14px',
  },
  resetButton: {
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  instructionsBox: {
    backgroundColor: '#f0f9ff',
    border: '1px solid #bae6fd',
    borderRadius: '8px',
    padding: '16px',
  },
  instructionsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0c4a6e',
    marginTop: '0',
    marginBottom: '12px',
  },
  instructionsList: {
    margin: '0',
    paddingLeft: '20px',
    fontSize: '14px',
    color: '#075985',
    lineHeight: '1.6',
  },
  loadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '700px',
    height: '700px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '500',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '700px',
    height: '700px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
  },
  placeholderState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '700px',
    height: '700px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    textAlign: 'center',
  },
  placeholderIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  placeholderTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '8px',
  },
  placeholderText: {
    fontSize: '14px',
    color: '#64748b',
    maxWidth: '400px',
    lineHeight: '1.6',
  },
};

export default Dashboard;
