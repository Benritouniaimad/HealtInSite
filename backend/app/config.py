"""
Configuration du projet
Chemins des fichiers et variables globales
"""
from pathlib import Path

# Chemins racine
BASE_DIR = Path(__file__).resolve().parent.parent.parent
BACKEND_DIR = BASE_DIR / "backend"
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"

# Chemins des données
RAW_DATA_PATH = DATA_DIR / "raw" / "health_raw.csv"
PROCESSED_DATA_PATH = DATA_DIR / "processed" / "health_clean.csv"

# Chemin du modèle
MODEL_PATH = MODELS_DIR / "health_risk_model.pkl"
SCALER_PATH = MODELS_DIR / "scaler.pkl"
ENCODER_PATH = MODELS_DIR / "encoder.pkl"

# Configuration du modèle
RANDOM_STATE = 42
TEST_SIZE = 0.2

# Features du dataset
FEATURE_COLUMNS = [
    'age',
    'sex',
    'bmi',
    'smoker',
    'physical_activity_level',
    'hypertension',
    'cholesterol_level',
    'family_history'
]

TARGET_COLUMN = 'has_disease'

# Seuils de risque
RISK_THRESHOLDS = {
    'low': 0.3,
    'moderate': 0.6,
    'high': 1.0
}
