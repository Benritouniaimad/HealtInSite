"""
Script de test rapide pour l'API de prédiction
"""
import requests
import json

# URL de l'API
API_URL = "http://localhost:8000"

# Données de test
test_patient = {
    "age": 65,
    "sex": "M",
    "bmi": 32.5,
    "smoker": "yes",
    "physical_activity_level": "low",
    "hypertension": 1,
    "cholesterol_level": "high",
    "family_history": 1
}

print("=" * 60)
print("TEST DE L'API - PRÉDICTION DE RISQUE")
print("=" * 60)
print()

# Test 1: Health check
print("1. Vérification de l'état de l'API...")
try:
    response = requests.get(f"{API_URL}/health")
    if response.status_code == 200:
        data = response.json()
        print(f"   ✓ API Status: {data['status']}")
        print(f"   ✓ Message: {data['message']}")
        print(f"   ✓ Modèle chargé: {data['model_loaded']}")
    else:
        print(f"   ✗ Erreur: {response.status_code}")
except Exception as e:
    print(f"   ✗ Erreur de connexion: {e}")

print()

# Test 2: Prédiction
print("2. Test de prédiction avec un patient à risque élevé...")
print(f"   Patient: {test_patient}")
print()

try:
    response = requests.post(f"{API_URL}/predict", json=test_patient)
    
    if response.status_code == 200:
        result = response.json()
        print("   ✓ RÉSULTAT DE LA PRÉDICTION:")
        print(f"      - Score de risque: {result['risk_score']:.2%}")
        print(f"      - Niveau de risque: {result['risk_level'].upper()}")
        print(f"      - Confiance: {result['confidence']:.2%}")
        print(f"      - Maladie: {result.get('disease', 'N/A')}")
        print(f"      - Région du corps: {result.get('body_region', 'N/A')}")
        print()
        print(f"   📋 JSON complet:")
        print(f"   {json.dumps(result, indent=2)}")
    else:
        print(f"   ✗ Erreur: {response.status_code}")
        print(f"   {response.text}")
        
except Exception as e:
    print(f"   ✗ Erreur: {e}")

print()
print("=" * 60)
print("FIN DU TEST")
print("=" * 60)
