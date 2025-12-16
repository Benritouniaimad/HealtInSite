/**
 * Types TypeScript pour la prédiction de risque avec visualisation 3D
 */

// Types de régions du corps humain
export type BodyRegion = 
  | "head" 
  | "chest" 
  | "abdomen" 
  | "left_arm" 
  | "right_arm" 
  | "left_leg" 
  | "right_leg"
  | null;

// Niveaux de risque
export type RiskLevel = "low" | "medium" | "high" | null;

// Données du formulaire patient
export interface PatientFormData {
  age: number;
  sex: "M" | "F";
  bmi: number;
  smoker: "yes" | "no";
  physical_activity_level: "low" | "medium" | "high";
  hypertension: 0 | 1;
  cholesterol_level: "normal" | "high";
  family_history: 0 | 1;
}

// Résultat de la prédiction de l'API
export interface PredictionResponse {
  risk_score: number;
  risk_level: RiskLevel;
  disease: string;
  body_region: BodyRegion;
}

// État de la prédiction dans le composant
export interface PredictionState extends PredictionResponse {
  isLoading: boolean;
  error: string | null;
}

// Couleurs pour les niveaux de risque
export const RISK_COLORS = {
  low: "#22c55e",      // vert
  medium: "#f97316",   // orange
  high: "#ef4444",     // rouge
  default: "#60a5fa"   // bleu clair (couleur par défaut du corps)
} as const;
