"""
Schémas Pydantic pour validation des entrées/sorties de l'API
"""
from pydantic import BaseModel, Field, validator
from typing import Literal


class PatientInput(BaseModel):
    """
    Schéma pour les données d'un patient en entrée
    """
    age: int = Field(..., ge=18, le=100, description="Âge du patient (18-100 ans)")
    sex: Literal['M', 'F'] = Field(..., description="Sexe du patient (M ou F)")
    bmi: float = Field(..., ge=15.0, le=50.0, description="Indice de Masse Corporelle (15-50)")
    smoker: Literal['yes', 'no'] = Field(..., description="Fumeur (yes ou no)")
    physical_activity_level: Literal['low', 'moderate', 'high'] = Field(
        ..., 
        description="Niveau d'activité physique (low, moderate, high)"
    )
    hypertension: Literal[0, 1] = Field(..., description="Hypertension (0=non, 1=oui)")
    cholesterol_level: Literal['normal', 'high'] = Field(
        ..., 
        description="Niveau de cholestérol (normal ou high)"
    )
    family_history: Literal[0, 1] = Field(
        ..., 
        description="Antécédents familiaux de maladie (0=non, 1=oui)"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "age": 45,
                "sex": "M",
                "bmi": 28.5,
                "smoker": "no",
                "physical_activity_level": "moderate",
                "hypertension": 0,
                "cholesterol_level": "normal",
                "family_history": 1
            }
        }


class PredictionOutput(BaseModel):
    """
    Schéma pour la sortie de prédiction
    """
    risk_score: float = Field(..., ge=0.0, le=1.0, description="Score de risque (0-1)")
    risk_level: Literal['low', 'moderate', 'high'] = Field(
        ..., 
        description="Niveau de risque (low, moderate, high)"
    )
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confiance du modèle")
    disease: str = Field(..., description="Type de maladie prédite")
    body_region: str = Field(..., description="Région du corps affectée")
    
    class Config:
        json_schema_extra = {
            "example": {
                "risk_score": 0.73,
                "risk_level": "high",
                "confidence": 0.85,
                "disease": "cardiovascular",
                "body_region": "chest"
            }
        }


class HealthStatus(BaseModel):
    """
    Schéma pour le statut de santé de l'API
    """
    status: str
    message: str
    model_loaded: bool
    
    class Config:
        protected_namespaces = ()


class DatasetStatistics(BaseModel):
    """
    Schéma pour les statistiques du dataset
    """
    total_samples: int
    disease_rate: float
    age_distribution: dict
    bmi_distribution: dict
    sex_distribution: dict
    smoker_rate: float
    hypertension_rate: float
