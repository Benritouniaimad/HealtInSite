"""
Module optionnel de logging des prédictions en SQLite
Permet de garder un historique des prédictions effectuées
"""
from sqlalchemy import create_engine, Column, Integer, Float, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from pathlib import Path

from .config import BASE_DIR

# Configuration de la base de données
DB_PATH = BASE_DIR / "predictions.db"
DATABASE_URL = f"sqlite:///{DB_PATH}"

# Création de la base
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class PredictionLog(Base):
    """
    Modèle pour logger les prédictions
    """
    __tablename__ = "predictions"
    
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Features du patient
    age = Column(Integer)
    sex = Column(String)
    bmi = Column(Float)
    smoker = Column(String)
    physical_activity_level = Column(String)
    hypertension = Column(Integer)
    cholesterol_level = Column(String)
    family_history = Column(Integer)
    
    # Résultat de prédiction
    risk_score = Column(Float)
    risk_level = Column(String)
    confidence = Column(Float)


def init_db():
    """
    Initialise la base de données (crée les tables)
    """
    Base.metadata.create_all(bind=engine)
    print(f"✓ Base de données initialisée : {DB_PATH}")


def log_prediction(patient_data: dict, prediction_result: dict):
    """
    Enregistre une prédiction dans la base de données
    
    Args:
        patient_data: Données du patient
        prediction_result: Résultat de la prédiction
    """
    db = SessionLocal()
    try:
        log_entry = PredictionLog(
            age=patient_data['age'],
            sex=patient_data['sex'],
            bmi=patient_data['bmi'],
            smoker=patient_data['smoker'],
            physical_activity_level=patient_data['physical_activity_level'],
            hypertension=patient_data['hypertension'],
            cholesterol_level=patient_data['cholesterol_level'],
            family_history=patient_data['family_history'],
            risk_score=prediction_result['risk_score'],
            risk_level=prediction_result['risk_level'],
            confidence=prediction_result['confidence']
        )
        db.add(log_entry)
        db.commit()
    except Exception as e:
        print(f"Erreur lors du logging : {e}")
        db.rollback()
    finally:
        db.close()


def get_prediction_history(limit: int = 100):
    """
    Récupère l'historique des prédictions
    
    Args:
        limit: Nombre maximum de prédictions à retourner
    
    Returns:
        Liste des prédictions
    """
    db = SessionLocal()
    try:
        predictions = db.query(PredictionLog).order_by(
            PredictionLog.timestamp.desc()
        ).limit(limit).all()
        return predictions
    finally:
        db.close()


if __name__ == "__main__":
    # Initialiser la base de données
    init_db()
    print("Base de données prête pour le logging des prédictions.")
