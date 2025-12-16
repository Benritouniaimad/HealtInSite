/**
 * HumanBody3D.tsx
 * Modèle 3D simplifié du corps humain avec zones anatomiques séparées
 * Utilise des primitives géométriques (sphères, cylindres, boîtes)
 */
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BodyRegion, RiskLevel, RISK_COLORS } from '../types/prediction';

interface HumanBody3DProps {
  bodyRegion: BodyRegion;
  riskLevel: RiskLevel;
  autoRotate?: boolean;
}

const HumanBody3D: React.FC<HumanBody3DProps> = ({ 
  bodyRegion, 
  riskLevel,
  autoRotate = true 
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Animation de rotation automatique
  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Fonction pour obtenir la couleur d'une région
  const getRegionColor = (region: BodyRegion): string => {
    if (region === bodyRegion && riskLevel) {
      return RISK_COLORS[riskLevel];
    }
    return RISK_COLORS.default;
  };

  return (
    <group ref={groupRef}>
      {/* TÊTE */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial 
          color={getRegionColor('head')} 
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* COU */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
        <meshStandardMaterial 
          color={RISK_COLORS.default} 
          roughness={0.5}
        />
      </mesh>

      {/* POITRINE (CHEST) */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.25]} />
        <meshStandardMaterial 
          color={getRegionColor('chest')} 
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* ABDOMEN */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.35, 0.4, 0.22]} />
        <meshStandardMaterial 
          color={getRegionColor('abdomen')} 
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* BASSIN */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.4, 0.15, 0.25]} />
        <meshStandardMaterial 
          color={RISK_COLORS.default} 
          roughness={0.5}
        />
      </mesh>

      {/* BRAS GAUCHE (LEFT_ARM) */}
      <group position={[-0.3, 1.0, 0]}>
        {/* Épaule */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('left_arm')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Bras supérieur */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 0.4, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('left_arm')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Coude */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('left_arm')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Avant-bras */}
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.05, 0.04, 0.4, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('left_arm')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Main */}
        <mesh position={[0, -1.0, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.05]} />
          <meshStandardMaterial 
            color={getRegionColor('left_arm')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* BRAS DROIT (RIGHT_ARM) */}
      <group position={[0.3, 1.0, 0]}>
        {/* Épaule */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('right_arm')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Bras supérieur */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 0.4, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('right_arm')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Coude */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('right_arm')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Avant-bras */}
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.05, 0.04, 0.4, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('right_arm')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Main */}
        <mesh position={[0, -1.0, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.05]} />
          <meshStandardMaterial 
            color={getRegionColor('right_arm')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* JAMBE GAUCHE (LEFT_LEG) */}
      <group position={[-0.12, 0.1, 0]}>
        {/* Cuisse */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.5, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('left_leg')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Genou */}
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('left_leg')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Mollet */}
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 0.5, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('left_leg')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Pied */}
        <mesh position={[0, -1.15, 0.05]}>
          <boxGeometry args={[0.08, 0.06, 0.15]} />
          <meshStandardMaterial 
            color={getRegionColor('left_leg')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* JAMBE DROITE (RIGHT_LEG) */}
      <group position={[0.12, 0.1, 0]}>
        {/* Cuisse */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.5, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('right_leg')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Genou */}
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('right_leg')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Mollet */}
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 0.5, 16]} />
          <meshStandardMaterial 
            color={getRegionColor('right_leg')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {/* Pied */}
        <mesh position={[0, -1.15, 0.05]}>
          <boxGeometry args={[0.08, 0.06, 0.15]} />
          <meshStandardMaterial 
            color={getRegionColor('right_leg')} 
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};

export default HumanBody3D;
