/**
 * Risk3DViewer.tsx
 * Canvas 3D pour afficher le corps humain avec la zone à risque mise en évidence
 */
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import HumanBody3D from './HumanBody3D';
import { BodyRegion, RiskLevel, RISK_COLORS } from '../types/prediction';

interface Risk3DViewerProps {
  bodyRegion: BodyRegion;
  riskLevel: RiskLevel;
  disease?: string;
  riskScore?: number;
}

const Risk3DViewer: React.FC<Risk3DViewerProps> = ({ 
  bodyRegion, 
  riskLevel,
  disease,
  riskScore
}) => {
  // Composant de chargement pendant l'initialisation du 3D
  const LoadingIndicator = () => (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#60a5fa" />
    </mesh>
  );

  return (
    <div style={styles.container}>
      {/* Canvas 3D */}
      <div style={styles.canvasWrapper}>
        <Canvas
          shadows
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          {/* Caméra avec perspective */}
          <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={50} />

          {/* Lumières */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={0.8} 
            castShadow 
          />
          <directionalLight 
            position={[-5, 3, -5]} 
            intensity={0.4} 
          />
          <pointLight position={[0, 2, 0]} intensity={0.3} />

          {/* Environnement pour les réflexions */}
          <Environment preset="studio" />

          {/* Modèle 3D du corps humain avec Suspense pour le chargement */}
          <Suspense fallback={<LoadingIndicator />}>
            <HumanBody3D 
              bodyRegion={bodyRegion} 
              riskLevel={riskLevel}
              autoRotate={true}
            />
          </Suspense>

          {/* Contrôles de la caméra (rotation, zoom, pan) */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={6}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
        </Canvas>
      </div>

      {/* Informations sur la prédiction */}
      {riskLevel && bodyRegion && (
        <div style={styles.infoPanel}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Région :</span>
            <span style={styles.infoValue}>{formatBodyRegion(bodyRegion)}</span>
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Niveau de risque :</span>
            <span 
              style={{
                ...styles.riskBadge,
                backgroundColor: RISK_COLORS[riskLevel],
              }}
            >
              {formatRiskLevel(riskLevel)}
            </span>
          </div>

          {riskScore !== undefined && (
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Score :</span>
              <span style={styles.infoValue}>{(riskScore * 100).toFixed(1)}%</span>
            </div>
          )}

          {disease && (
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Maladie :</span>
              <span style={styles.infoValue}>{disease}</span>
            </div>
          )}
        </div>
      )}

      {/* Légende des couleurs */}
      <div style={styles.legend}>
        <h4 style={styles.legendTitle}>Légende</h4>
        <div style={styles.legendItem}>
          <div style={{ ...styles.colorBox, backgroundColor: RISK_COLORS.low }} />
          <span style={styles.legendText}>Risque faible</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.colorBox, backgroundColor: RISK_COLORS.medium }} />
          <span style={styles.legendText}>Risque moyen</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.colorBox, backgroundColor: RISK_COLORS.high }} />
          <span style={styles.legendText}>Risque élevé</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.colorBox, backgroundColor: RISK_COLORS.default }} />
          <span style={styles.legendText}>Normal</span>
        </div>
      </div>
    </div>
  );
};

// Fonction helper pour formater le nom de la région
const formatBodyRegion = (region: BodyRegion): string => {
  const regionNames: Record<string, string> = {
    head: 'Tête',
    chest: 'Poitrine',
    abdomen: 'Abdomen',
    left_arm: 'Bras gauche',
    right_arm: 'Bras droit',
    left_leg: 'Jambe gauche',
    right_leg: 'Jambe droite',
  };
  return region ? regionNames[region] || region : 'Non défini';
};

// Fonction helper pour formater le niveau de risque
const formatRiskLevel = (level: RiskLevel): string => {
  const levelNames: Record<string, string> = {
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé',
  };
  return level ? levelNames[level] || level : 'Non défini';
};

// Styles CSS-in-JS
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: '700px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  canvasWrapper: {
    flex: 1,
    position: 'relative',
    minHeight: '500px',
    height: '500px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  infoPanel: {
    padding: '16px 20px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  infoLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#64748b',
  },
  infoValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
  },
  riskBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  legend: {
    padding: '12px 20px',
    backgroundColor: '#f1f5f9',
    borderTop: '1px solid #e2e8f0',
  },
  legendTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
    marginTop: '0',
    marginBottom: '8px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '6px',
  },
  colorBox: {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    marginRight: '8px',
  },
  legendText: {
    fontSize: '12px',
    color: '#64748b',
  },
};

export default Risk3DViewer;
