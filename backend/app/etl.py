"""
Module ETL - Extract, Transform, Load
Gestion du chargement, nettoyage et préparation des données de santé
"""
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
import joblib
from pathlib import Path
from .config import (
    RAW_DATA_PATH, 
    PROCESSED_DATA_PATH, 
    FEATURE_COLUMNS, 
    TARGET_COLUMN,
    SCALER_PATH,
    ENCODER_PATH,
    RANDOM_STATE,
    TEST_SIZE,
    DATA_DIR
)


def generate_sample_health_data(n_samples: int = 1000, save: bool = True) -> pd.DataFrame:
    """
    Génère un dataset de santé réaliste pour la simulation
    
    Args:
        n_samples: Nombre d'échantillons à générer
        save: Si True, sauvegarde le fichier dans data/raw/
    
    Returns:
        DataFrame contenant les données de santé simulées
    """
    np.random.seed(RANDOM_STATE)
    
    # Génération des features
    data = {
        'age': np.random.randint(18, 85, n_samples),
        'sex': np.random.choice(['M', 'F'], n_samples),
        'bmi': np.random.normal(27, 5, n_samples).clip(15, 50),
        'smoker': np.random.choice(['yes', 'no'], n_samples, p=[0.25, 0.75]),
        'physical_activity_level': np.random.choice(['low', 'moderate', 'high'], n_samples, p=[0.3, 0.5, 0.2]),
        'hypertension': np.random.choice([0, 1], n_samples, p=[0.7, 0.3]),
        'cholesterol_level': np.random.choice(['normal', 'high'], n_samples, p=[0.6, 0.4]),
        'family_history': np.random.choice([0, 1], n_samples, p=[0.65, 0.35])
    }
    
    df = pd.DataFrame(data)
    
    # Génération du target avec des corrélations réalistes
    # Plus de risque si : âge élevé, BMI élevé, fumeur, hypertension, etc.
    risk_score = (
        (df['age'] - 18) / 67 * 0.25 +  # âge contribue 25%
        (df['bmi'] - 15) / 35 * 0.20 +   # BMI contribue 20%
        (df['smoker'] == 'yes').astype(int) * 0.15 +  # tabagisme 15%
        df['hypertension'] * 0.15 +  # hypertension 15%
        (df['cholesterol_level'] == 'high').astype(int) * 0.10 +  # cholestérol 10%
        df['family_history'] * 0.10 +  # antécédents familiaux 10%
        (df['physical_activity_level'] == 'low').astype(int) * 0.05  # activité 5%
    )
    
    # Ajout de bruit et conversion en binaire
    risk_score += np.random.normal(0, 0.1, n_samples)
    df['has_disease'] = (risk_score > 0.5).astype(int)
    
    if save:
        # Créer le dossier si nécessaire
        RAW_DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
        df.to_csv(RAW_DATA_PATH, index=False)
        print(f"✓ Dataset généré et sauvegardé : {RAW_DATA_PATH}")
        print(f"  - Nombre d'échantillons : {n_samples}")
        print(f"  - Taux de maladie : {df['has_disease'].mean():.2%}")
    
    return df


def load_raw_data() -> pd.DataFrame:
    """
    Charge les données brutes depuis le fichier CSV
    Génère le dataset si le fichier n'existe pas
    
    Returns:
        DataFrame avec les données brutes
    """
    if not RAW_DATA_PATH.exists():
        print(f"⚠ Fichier {RAW_DATA_PATH} non trouvé. Génération du dataset...")
        return generate_sample_health_data()
    
    df = pd.read_csv(RAW_DATA_PATH)
    print(f"✓ Données brutes chargées : {df.shape[0]} lignes, {df.shape[1]} colonnes")
    return df


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Nettoie les données : gestion des valeurs manquantes, outliers, etc.
    
    Args:
        df: DataFrame brut
    
    Returns:
        DataFrame nettoyé
    """
    df_clean = df.copy()
    
    # Gestion des valeurs manquantes
    # Pour les numériques : imputation par la médiane
    numeric_cols = ['age', 'bmi']
    for col in numeric_cols:
        if df_clean[col].isnull().any():
            median_val = df_clean[col].median()
            df_clean[col].fillna(median_val, inplace=True)
            print(f"  - {col} : {df_clean[col].isnull().sum()} valeurs manquantes imputées")
    
    # Pour les catégorielles : imputation par le mode
    categorical_cols = ['sex', 'smoker', 'physical_activity_level', 'cholesterol_level']
    for col in categorical_cols:
        if df_clean[col].isnull().any():
            mode_val = df_clean[col].mode()[0]
            df_clean[col].fillna(mode_val, inplace=True)
    
    # Gestion des outliers pour BMI (bornes réalistes)
    df_clean['bmi'] = df_clean['bmi'].clip(15, 50)
    
    # Gestion de l'âge
    df_clean['age'] = df_clean['age'].clip(18, 100)
    
    print(f"✓ Données nettoyées : {df_clean.shape[0]} lignes conservées")
    return df_clean


def encode_features(df: pd.DataFrame, fit: bool = True) -> pd.DataFrame:
    """
    Encode les variables catégorielles
    
    Args:
        df: DataFrame à encoder
        fit: Si True, créer et sauvegarder les encodeurs. Si False, charger les encodeurs existants
    
    Returns:
        DataFrame avec features encodées
    """
    df_encoded = df.copy()
    
    # Mapping manuel pour certaines variables binaires
    df_encoded['sex'] = df_encoded['sex'].map({'M': 1, 'F': 0})
    df_encoded['smoker'] = df_encoded['smoker'].map({'yes': 1, 'no': 0})
    df_encoded['cholesterol_level'] = df_encoded['cholesterol_level'].map({'high': 1, 'normal': 0})
    
    # Label encoding pour physical_activity_level (ordinal)
    activity_mapping = {'low': 0, 'moderate': 1, 'high': 2}
    df_encoded['physical_activity_level'] = df_encoded['physical_activity_level'].map(activity_mapping)
    
    if fit:
        # Sauvegarder les mappings si nécessaire (pour la prédiction)
        encoding_info = {
            'sex': {'M': 1, 'F': 0},
            'smoker': {'yes': 1, 'no': 0},
            'cholesterol_level': {'high': 1, 'normal': 0},
            'physical_activity_level': activity_mapping
        }
        ENCODER_PATH.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump(encoding_info, ENCODER_PATH)
        print(f"✓ Encodeurs sauvegardés : {ENCODER_PATH}")
    
    return df_encoded


def scale_features(X: pd.DataFrame, fit: bool = True) -> pd.DataFrame:
    """
    Normalise les features numériques
    
    Args:
        X: Features à normaliser
        fit: Si True, entraîner et sauvegarder le scaler. Si False, charger le scaler existant
    
    Returns:
        Features normalisées
    """
    numeric_features = ['age', 'bmi']
    
    if fit:
        scaler = StandardScaler()
        X_scaled = X.copy()
        X_scaled[numeric_features] = scaler.fit_transform(X[numeric_features])
        
        # Sauvegarder le scaler
        SCALER_PATH.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump(scaler, SCALER_PATH)
        print(f"✓ Scaler sauvegardé : {SCALER_PATH}")
    else:
        scaler = joblib.load(SCALER_PATH)
        X_scaled = X.copy()
        X_scaled[numeric_features] = scaler.transform(X[numeric_features])
    
    return X_scaled


def load_and_preprocess(for_training: bool = True):
    """
    Pipeline complet de chargement et préparation des données
    
    Args:
        for_training: Si True, prépare pour l'entraînement (train/test split)
                     Si False, retourne tout le dataset (pour l'analyse)
    
    Returns:
        Si for_training=True : X_train, X_test, y_train, y_test
        Si for_training=False : X, y, df_processed
    """
    print("\n" + "="*60)
    print("PIPELINE ETL - Chargement et préparation des données")
    print("="*60 + "\n")
    
    # 1. Chargement
    df = load_raw_data()
    
    # 2. Nettoyage
    df_clean = clean_data(df)
    
    # 3. Encodage
    df_encoded = encode_features(df_clean, fit=for_training)
    
    # 4. Séparation X / y
    X = df_encoded[FEATURE_COLUMNS]
    y = df_encoded[TARGET_COLUMN]
    
    # 5. Normalisation
    X_scaled = scale_features(X, fit=for_training)
    
    # 6. Sauvegarde des données processées
    df_processed = df_encoded.copy()
    df_processed[FEATURE_COLUMNS] = X_scaled
    PROCESSED_DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    df_processed.to_csv(PROCESSED_DATA_PATH, index=False)
    print(f"✓ Données processées sauvegardées : {PROCESSED_DATA_PATH}")
    
    if for_training:
        # Split train/test
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, 
            test_size=TEST_SIZE, 
            random_state=RANDOM_STATE,
            stratify=y
        )
        
        print(f"\n✓ Split train/test effectué :")
        print(f"  - Train : {X_train.shape[0]} échantillons")
        print(f"  - Test  : {X_test.shape[0]} échantillons")
        print("="*60 + "\n")
        
        return X_train, X_test, y_train, y_test
    else:
        print("="*60 + "\n")
        return X_scaled, y, df_processed


def get_dataset_statistics() -> dict:
    """
    Calcule des statistiques de base sur le dataset pour l'API
    
    Returns:
        Dictionnaire avec les statistiques
    """
    if not PROCESSED_DATA_PATH.exists():
        load_and_preprocess(for_training=False)
    
    df = pd.read_csv(PROCESSED_DATA_PATH)
    
    stats = {
        'total_samples': int(df.shape[0]),
        'disease_rate': float(df['has_disease'].mean()),
        'age_distribution': {
            'mean': float(df['age'].mean()),
            'std': float(df['age'].std()),
            'min': int(df['age'].min()),
            'max': int(df['age'].max())
        },
        'bmi_distribution': {
            'mean': float(df['bmi'].mean()),
            'std': float(df['bmi'].std()),
            'min': float(df['bmi'].min()),
            'max': float(df['bmi'].max())
        },
        'sex_distribution': {
            'male': int((df['sex'] == 1).sum()),
            'female': int((df['sex'] == 0).sum())
        },
        'smoker_rate': float((df['smoker'] == 1).mean()),
        'hypertension_rate': float(df['hypertension'].mean())
    }
    
    return stats


if __name__ == "__main__":
    # Test du module ETL
    X_train, X_test, y_train, y_test = load_and_preprocess(for_training=True)
    print(f"Pipeline ETL terminé avec succès !")
    print(f"Dataset d'entraînement : {X_train.shape}")
    print(f"Dataset de test : {X_test.shape}")
