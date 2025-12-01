"""
Module de prédiction - Chargement du modèle et prédiction de risques
"""
import joblib
import pandas as pd
import numpy as np
from pathlib import Path
from .config import (
    MODEL_PATH, 
    SCALER_PATH, 
    ENCODER_PATH,
    FEATURE_COLUMNS,
    RISK_THRESHOLDS
)


class HealthRiskPredictor:
    """
    Classe pour gérer les prédictions de risque de santé
    """
    
    def __init__(self):
        """Initialise le prédicteur"""
        self.model = None
        self.scaler = None
        self.encoder_info = None
        self.is_loaded = False
    
    def load_model(self):
        """
        Charge le modèle, le scaler et les encodeurs depuis les fichiers
        """
        try:
            # Vérification de l'existence des fichiers
            if not MODEL_PATH.exists():
                raise FileNotFoundError(
                    f"Modèle non trouvé : {MODEL_PATH}\n"
                    "Veuillez d'abord entraîner le modèle avec train_model.py"
                )
            
            if not SCALER_PATH.exists():
                raise FileNotFoundError(f"Scaler non trouvé : {SCALER_PATH}")
            
            if not ENCODER_PATH.exists():
                raise FileNotFoundError(f"Encodeur non trouvé : {ENCODER_PATH}")
            
            # Chargement
            self.model = joblib.load(MODEL_PATH)
            self.scaler = joblib.load(SCALER_PATH)
            self.encoder_info = joblib.load(ENCODER_PATH)
            self.is_loaded = True
            
            print(f"✓ Modèle chargé : {MODEL_PATH}")
            print(f"✓ Scaler chargé : {SCALER_PATH}")
            print(f"✓ Encodeur chargé : {ENCODER_PATH}")
            
        except Exception as e:
            print(f"❌ Erreur lors du chargement du modèle : {e}")
            raise
    
    def preprocess_input(self, patient_data: dict) -> pd.DataFrame:
        """
        Prétraite les données d'entrée d'un patient
        
        Args:
            patient_data: Dictionnaire avec les caractéristiques du patient
        
        Returns:
            DataFrame prêt pour la prédiction
        """
        # Conversion en DataFrame
        df = pd.DataFrame([patient_data])
        
        # Encodage des variables catégorielles (même logique que dans etl.py)
        df['sex'] = df['sex'].map(self.encoder_info['sex'])
        df['smoker'] = df['smoker'].map(self.encoder_info['smoker'])
        df['cholesterol_level'] = df['cholesterol_level'].map(self.encoder_info['cholesterol_level'])
        df['physical_activity_level'] = df['physical_activity_level'].map(
            self.encoder_info['physical_activity_level']
        )
        
        # Vérification que toutes les colonnes sont présentes
        for col in FEATURE_COLUMNS:
            if col not in df.columns:
                raise ValueError(f"Feature manquante : {col}")
        
        # Sélection et ordre des colonnes
        df = df[FEATURE_COLUMNS]
        
        # Normalisation des features numériques
        numeric_features = ['age', 'bmi']
        df[numeric_features] = self.scaler.transform(df[numeric_features])
        
        return df
    
    def predict_risk(self, patient_data: dict) -> dict:
        """
        Prédit le risque de maladie pour un patient
        
        Args:
            patient_data: Dictionnaire avec les caractéristiques du patient
        
        Returns:
            Dictionnaire avec le score de risque et le niveau de risque
        """
        if not self.is_loaded:
            self.load_model()
        
        # Prétraitement
        X = self.preprocess_input(patient_data)
        
        # Prédiction
        risk_proba = self.model.predict_proba(X)[0, 1]  # Probabilité de la classe 1 (malade)
        
        # Détermination du niveau de risque
        if risk_proba < RISK_THRESHOLDS['low']:
            risk_level = 'low'
        elif risk_proba < RISK_THRESHOLDS['moderate']:
            risk_level = 'moderate'
        else:
            risk_level = 'high'
        
        # Calcul de la confiance (distance aux seuils)
        if risk_level == 'low':
            confidence = 1 - (risk_proba / RISK_THRESHOLDS['low'])
        elif risk_level == 'moderate':
            distance_to_low = risk_proba - RISK_THRESHOLDS['low']
            distance_to_high = RISK_THRESHOLDS['moderate'] - risk_proba
            confidence = min(distance_to_low, distance_to_high) / (RISK_THRESHOLDS['moderate'] - RISK_THRESHOLDS['low'])
        else:
            confidence = (risk_proba - RISK_THRESHOLDS['moderate']) / (1 - RISK_THRESHOLDS['moderate'])
        
        confidence = min(max(confidence, 0.5), 0.99)  # Entre 0.5 et 0.99
        
        return {
            'risk_score': float(risk_proba),
            'risk_level': risk_level,
            'confidence': float(confidence)
        }


# Instance globale du prédicteur
predictor = HealthRiskPredictor()


def predict_risk(patient_data: dict) -> dict:
    """
    Fonction utilitaire pour faire une prédiction
    
    Args:
        patient_data: Dictionnaire avec les données du patient
    
    Returns:
        Dictionnaire avec le résultat de prédiction
    """
    return predictor.predict_risk(patient_data)


if __name__ == "__main__":
    # Test du module de prédiction
    print("\n" + "="*60)
    print("TEST DU MODULE DE PRÉDICTION")
    print("="*60 + "\n")
    
    # Exemple de patient à haut risque
    patient_high_risk = {
        'age': 65,
        'sex': 'M',
        'bmi': 32.5,
        'smoker': 'yes',
        'physical_activity_level': 'low',
        'hypertension': 1,
        'cholesterol_level': 'high',
        'family_history': 1
    }
    
    # Exemple de patient à faible risque
    patient_low_risk = {
        'age': 25,
        'sex': 'F',
        'bmi': 22.0,
        'smoker': 'no',
        'physical_activity_level': 'high',
        'hypertension': 0,
        'cholesterol_level': 'normal',
        'family_history': 0
    }
    
    try:
        print("Patient à HAUT RISQUE :")
        result_high = predict_risk(patient_high_risk)
        print(f"  Score de risque : {result_high['risk_score']:.2%}")
        print(f"  Niveau de risque : {result_high['risk_level']}")
        print(f"  Confiance : {result_high['confidence']:.2%}")
        
        print("\nPatient à FAIBLE RISQUE :")
        result_low = predict_risk(patient_low_risk)
        print(f"  Score de risque : {result_low['risk_score']:.2%}")
        print(f"  Niveau de risque : {result_low['risk_level']}")
        print(f"  Confiance : {result_low['confidence']:.2%}")
        
        print("\n✅ Module de prédiction fonctionnel !")
        
    except FileNotFoundError as e:
        print(f"\n⚠ {e}")
        print("\nVeuillez d'abord entraîner le modèle avec :")
        print("  python -m backend.app.train_model")
