"""
Module d'entraînement du modèle de Machine Learning
"""
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score, 
    classification_report, 
    confusion_matrix,
    roc_auc_score,
    precision_recall_fscore_support
)
import joblib
from .etl import load_and_preprocess
from .config import MODEL_PATH, RANDOM_STATE


def train_model(model_type: str = 'logistic'):
    """
    Entraîne un modèle de prédiction des risques de santé
    
    Args:
        model_type: Type de modèle ('logistic' ou 'random_forest')
    
    Returns:
        Modèle entraîné
    """
    print("\n" + "="*60)
    print(f"ENTRAÎNEMENT DU MODÈLE - {model_type.upper()}")
    print("="*60 + "\n")
    
    # 1. Chargement et préparation des données
    X_train, X_test, y_train, y_test = load_and_preprocess(for_training=True)
    
    # 2. Initialisation du modèle
    if model_type == 'logistic':
        model = LogisticRegression(
            random_state=RANDOM_STATE,
            max_iter=1000,
            class_weight='balanced'  # Gère le déséquilibre de classes
        )
        print("✓ Modèle : Logistic Regression")
    elif model_type == 'random_forest':
        model = RandomForestClassifier(
            n_estimators=100,
            random_state=RANDOM_STATE,
            max_depth=10,
            class_weight='balanced'
        )
        print("✓ Modèle : Random Forest Classifier")
    else:
        raise ValueError(f"Type de modèle non supporté : {model_type}")
    
    # 3. Entraînement
    print("\nEntraînement en cours...")
    model.fit(X_train, y_train)
    print("✓ Entraînement terminé\n")
    
    # 4. Évaluation sur l'ensemble de test
    print("="*60)
    print("ÉVALUATION DU MODÈLE")
    print("="*60 + "\n")
    
    # Prédictions
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # Métriques
    accuracy = accuracy_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_pred_proba)
    precision, recall, f1, _ = precision_recall_fscore_support(
        y_test, y_pred, average='binary'
    )
    
    print(f"Accuracy  : {accuracy:.4f} ({accuracy*100:.2f}%)")
    print(f"Precision : {precision:.4f}")
    print(f"Recall    : {recall:.4f}")
    print(f"F1-Score  : {f1:.4f}")
    print(f"ROC-AUC   : {roc_auc:.4f}")
    
    print("\n" + "-"*60)
    print("Classification Report :")
    print("-"*60)
    print(classification_report(y_test, y_pred, target_names=['Sain', 'Malade']))
    
    print("-"*60)
    print("Matrice de confusion :")
    print("-"*60)
    cm = confusion_matrix(y_test, y_pred)
    print(f"TN: {cm[0,0]}  FP: {cm[0,1]}")
    print(f"FN: {cm[1,0]}  TP: {cm[1,1]}")
    
    # Importance des features (si Random Forest)
    if model_type == 'random_forest':
        print("\n" + "-"*60)
        print("Importance des features :")
        print("-"*60)
        from .config import FEATURE_COLUMNS
        feature_importance = sorted(
            zip(FEATURE_COLUMNS, model.feature_importances_),
            key=lambda x: x[1],
            reverse=True
        )
        for feat, imp in feature_importance:
            print(f"  {feat:30s} : {imp:.4f}")
    
    # Coefficients (si Logistic Regression)
    if model_type == 'logistic':
        print("\n" + "-"*60)
        print("Coefficients du modèle :")
        print("-"*60)
        from .config import FEATURE_COLUMNS
        coefficients = sorted(
            zip(FEATURE_COLUMNS, model.coef_[0]),
            key=lambda x: abs(x[1]),
            reverse=True
        )
        for feat, coef in coefficients:
            print(f"  {feat:30s} : {coef:+.4f}")
    
    # 5. Sauvegarde du modèle
    print("\n" + "="*60)
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    print(f"✓ Modèle sauvegardé : {MODEL_PATH}")
    print("="*60 + "\n")
    
    return model


if __name__ == "__main__":
    # Entraînement du modèle
    # Utilise 'logistic' pour Logistic Regression (plus rapide)
    # Utilise 'random_forest' pour Random Forest (souvent plus performant)
    
    model = train_model(model_type='logistic')
    print("\n✅ Entraînement terminé avec succès !")
    print(f"Le modèle est prêt à être utilisé pour les prédictions.")
