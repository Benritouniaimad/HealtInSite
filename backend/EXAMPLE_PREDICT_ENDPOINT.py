"""
Exemple de Backend - Endpoint /api/predict avec body_region

Ce fichier montre comment adapter votre endpoint FastAPI
pour retourner le body_region nécessaire au frontend 3D.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Literal
import random

app = FastAPI()

# Modèle de données d'entrée
class PatientData(BaseModel):
    age: int
    sex: Literal['M', 'F']
    bmi: float
    smoker: Literal['yes', 'no']
    physical_activity_level: Literal['low', 'medium', 'high']
    hypertension: Literal[0, 1]
    cholesterol_level: Literal['normal', 'high']
    family_history: Literal[0, 1]

# Modèle de données de sortie
class PredictionResponse(BaseModel):
    risk_score: float
    risk_level: Literal['low', 'medium', 'high']
    disease: str
    body_region: Literal['head', 'chest', 'abdomen', 'left_arm', 'right_arm', 'left_leg', 'right_leg']

# Mapping des maladies aux régions du corps
DISEASE_TO_REGION = {
    'cardiovascular': 'chest',
    'diabetes': 'abdomen',
    'hypertension': 'head',
    'stroke': 'head',
    'heart_disease': 'chest',
    'liver_disease': 'abdomen',
    'kidney_disease': 'abdomen',
    'arthritis': 'left_leg',  # ou right_leg
    'respiratory': 'chest',
}

@app.post("/api/predict", response_model=PredictionResponse)
async def predict_risk(patient: PatientData):
    """
    Endpoint de prédiction avec body_region
    
    IMPORTANT: Adaptez cette fonction pour utiliser votre vrai modèle ML
    """
    try:
        # ============================================
        # EXEMPLE - REMPLACEZ PAR VOTRE VRAI MODÈLE
        # ============================================
        
        # 1. Préparer les features pour votre modèle
        features = prepare_features(patient)
        
        # 2. Faire la prédiction avec votre modèle
        # risk_score = model.predict_proba(features)[0][1]
        # predicted_class = model.predict(features)[0]
        
        # Pour cet exemple, on simule une prédiction
        risk_score = calculate_risk_score(patient)
        predicted_disease = predict_disease(patient, risk_score)
        
        # 3. Déterminer le niveau de risque
        if risk_score < 0.3:
            risk_level = 'low'
        elif risk_score < 0.7:
            risk_level = 'medium'
        else:
            risk_level = 'high'
        
        # 4. Mapper la maladie à une région du corps
        body_region = get_body_region(predicted_disease, patient)
        
        return PredictionResponse(
            risk_score=round(risk_score, 4),
            risk_level=risk_level,
            disease=predicted_disease,
            body_region=body_region
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def prepare_features(patient: PatientData):
    """
    Prépare les features pour le modèle ML
    
    Adaptez selon votre preprocessing
    """
    # Encoder les variables catégorielles
    sex_encoded = 1 if patient.sex == 'M' else 0
    smoker_encoded = 1 if patient.smoker == 'yes' else 0
    cholesterol_encoded = 1 if patient.cholesterol_level == 'high' else 0
    
    activity_map = {'low': 0, 'medium': 1, 'high': 2}
    activity_encoded = activity_map[patient.physical_activity_level]
    
    # Créer le vecteur de features
    features = [
        patient.age,
        sex_encoded,
        patient.bmi,
        smoker_encoded,
        activity_encoded,
        patient.hypertension,
        cholesterol_encoded,
        patient.family_history
    ]
    
    return features


def calculate_risk_score(patient: PatientData) -> float:
    """
    EXEMPLE de calcul de score de risque
    
    REMPLACEZ par votre vraie prédiction de modèle !
    """
    score = 0.0
    
    # Facteurs de risque (exemple simpliste)
    if patient.age > 50:
        score += 0.2
    if patient.age > 65:
        score += 0.2
        
    if patient.bmi > 30:
        score += 0.15
    if patient.bmi > 35:
        score += 0.1
        
    if patient.smoker == 'yes':
        score += 0.2
        
    if patient.hypertension == 1:
        score += 0.15
        
    if patient.cholesterol_level == 'high':
        score += 0.15
        
    if patient.family_history == 1:
        score += 0.1
        
    if patient.physical_activity_level == 'low':
        score += 0.1
    
    # Normaliser entre 0 et 1
    return min(score, 1.0)


def predict_disease(patient: PatientData, risk_score: float) -> str:
    """
    EXEMPLE de prédiction de maladie
    
    REMPLACEZ par votre vraie logique de classification !
    """
    # Logique simplifiée basée sur les facteurs de risque
    if patient.hypertension == 1 and risk_score > 0.5:
        return 'cardiovascular'
    elif patient.bmi > 30 and patient.physical_activity_level == 'low':
        return 'diabetes'
    elif patient.smoker == 'yes' and patient.age > 50:
        return 'respiratory'
    elif patient.cholesterol_level == 'high':
        return 'heart_disease'
    else:
        return 'cardiovascular'  # par défaut


def get_body_region(disease: str, patient: PatientData) -> str:
    """
    Mappe une maladie prédite à une région du corps
    
    Personnalisez ce mapping selon votre domaine médical
    """
    # Utiliser le mapping par défaut
    if disease in DISEASE_TO_REGION:
        return DISEASE_TO_REGION[disease]
    
    # Logique additionnelle si nécessaire
    # Par exemple, pour l'arthrite, choisir aléatoirement une jambe
    if disease == 'arthritis':
        return random.choice(['left_leg', 'right_leg'])
    
    # Régions cardiovasculaires peuvent varier
    if disease in ['cardiovascular', 'heart_disease']:
        # Possibilité d'irradiation dans le bras gauche
        if patient.age > 60:
            return random.choice(['chest', 'left_arm'])
        return 'chest'
    
    # Par défaut, retourner la poitrine
    return 'chest'


@app.get("/health")
async def health_check():
    """Endpoint de vérification de santé"""
    return {
        "status": "healthy",
        "message": "API is running",
        "model_loaded": True
    }


# ============================================
# EXEMPLE D'INTÉGRATION AVEC UN VRAI MODÈLE
# ============================================

"""
import joblib
import numpy as np

# Charger votre modèle
model = joblib.load('models/risk_model.pkl')
scaler = joblib.load('models/scaler.pkl')
label_encoder = joblib.load('models/disease_encoder.pkl')

@app.post("/api/predict", response_model=PredictionResponse)
async def predict_risk(patient: PatientData):
    try:
        # Préparer les features
        features = prepare_features(patient)
        features_array = np.array(features).reshape(1, -1)
        
        # Normaliser si nécessaire
        features_scaled = scaler.transform(features_array)
        
        # Prédiction du risque
        risk_score = model.predict_proba(features_scaled)[0][1]
        
        # Prédiction de la maladie (si vous avez un modèle multi-classe)
        disease_pred = disease_model.predict(features_scaled)[0]
        disease = label_encoder.inverse_transform([disease_pred])[0]
        
        # Niveau de risque
        if risk_score < 0.3:
            risk_level = 'low'
        elif risk_score < 0.7:
            risk_level = 'medium'
        else:
            risk_level = 'high'
        
        # Région du corps
        body_region = get_body_region(disease, patient)
        
        return PredictionResponse(
            risk_score=float(risk_score),
            risk_level=risk_level,
            disease=disease,
            body_region=body_region
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
"""

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
