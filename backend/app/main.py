"""
API FastAPI - HealthInsight Web
Application principale avec endpoints pour la prédiction des risques de santé
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from .schemas import (
    PatientInput, 
    PredictionOutput, 
    HealthStatus,
    DatasetStatistics
)
from .predict import predictor
from .etl import get_dataset_statistics
from .config import MODEL_PATH


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gestion du cycle de vie de l'application
    Charge le modèle au démarrage
    """
    print("\n" + "="*60)
    print("DÉMARRAGE DE L'API HEALTHINSIGHT")
    print("="*60 + "\n")
    
    # Chargement du modèle au démarrage
    try:
        predictor.load_model()
        print("\n✅ API prête à recevoir des requêtes\n")
    except Exception as e:
        print(f"\n⚠ Avertissement : Impossible de charger le modèle")
        print(f"   Erreur : {e}")
        print(f"   L'API démarrera mais /predict ne fonctionnera pas.")
        print(f"   Veuillez entraîner le modèle avec : python -m backend.app.train_model\n")
    
    yield
    
    # Nettoyage lors de l'arrêt (si nécessaire)
    print("\n" + "="*60)
    print("ARRÊT DE L'API")
    print("="*60 + "\n")


# Création de l'application FastAPI
app = FastAPI(
    title="HealthInsight Web API",
    description="API de prédiction des risques de santé basée sur les données de santé",
    version="1.0.0",
    lifespan=lifespan
)

# Configuration CORS pour autoriser le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Frontend Next.js en développement
        "http://localhost:3001",  # Port alternatif Next.js
        "http://localhost:3002",  # Port alternatif Next.js
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],  # Autorise tous les headers
)


@app.get("/", tags=["General"])
async def root():
    """
    Endpoint racine - Message de bienvenue
    """
    return {
        "message": "Bienvenue sur HealthInsight Web API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "predict": "/predict (POST)",
            "dataset_summary": "/dataset-summary"
        }
    }


@app.get("/health", response_model=HealthStatus, tags=["General"])
async def health_check():
    """
    Vérifie l'état de santé de l'API et du modèle
    """
    model_loaded = predictor.is_loaded
    
    if model_loaded:
        status = "ok"
        message = "API opérationnelle - Modèle chargé"
    else:
        status = "warning"
        message = "API opérationnelle - Modèle non chargé"
    
    return {
        "status": status,
        "message": message,
        "model_loaded": model_loaded
    }


@app.post("/predict", response_model=PredictionOutput, tags=["Prediction"])
async def predict_health_risk(patient: PatientInput):
    """
    Prédit le risque de maladie pour un patient donné
    
    Args:
        patient: Données du patient (âge, sexe, BMI, etc.)
    
    Returns:
        Score de risque et niveau de risque (low, moderate, high)
    
    Raises:
        HTTPException: Si le modèle n'est pas chargé ou en cas d'erreur
    """
    # Vérification que le modèle est chargé
    if not predictor.is_loaded:
        raise HTTPException(
            status_code=503,
            detail="Modèle non disponible. Veuillez entraîner le modèle d'abord."
        )
    
    try:
        # Conversion du modèle Pydantic en dictionnaire
        patient_data = patient.dict()
        
        # Prédiction
        result = predictor.predict_risk(patient_data)
        
        return PredictionOutput(**result)
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Erreur de validation : {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur de prédiction : {str(e)}")


@app.get("/dataset-summary", response_model=DatasetStatistics, tags=["Data"])
async def get_dataset_summary():
    """
    Retourne des statistiques sur le dataset de santé
    
    Returns:
        Statistiques descriptives du dataset
    """
    try:
        stats = get_dataset_statistics()
        return DatasetStatistics(**stats)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors du calcul des statistiques : {str(e)}"
        )


@app.get("/model-info", tags=["Model"])
async def get_model_info():
    """
    Retourne des informations sur le modèle ML utilisé
    """
    if not predictor.is_loaded:
        raise HTTPException(
            status_code=503,
            detail="Modèle non chargé"
        )
    
    model_type = type(predictor.model).__name__
    
    info = {
        "model_type": model_type,
        "model_path": str(MODEL_PATH),
        "features": [
            "age",
            "sex",
            "bmi",
            "smoker",
            "physical_activity_level",
            "hypertension",
            "cholesterol_level",
            "family_history"
        ],
        "risk_thresholds": {
            "low": "< 30%",
            "moderate": "30% - 60%",
            "high": "> 60%"
        },
        "disclaimer": "Ce modèle est à usage pédagogique uniquement. Ne pas utiliser pour des décisions médicales réelles."
    }
    
    return info


if __name__ == "__main__":
    # Lancement du serveur en mode développement
    uvicorn.run(
        "backend.app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
