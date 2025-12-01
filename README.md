# 🏥 HealthInsight Web

**Plateforme web de prédiction des risques de santé basée sur les données StatCan**

Projet de Fin d'Études - Application Full-Stack avec Machine Learning et UI Moderne

[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

---

## 📋 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Statut du Projet](#-statut-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies & Stack](#-technologies--stack)
- [Architecture](#-architecture)
- [Guide de Démarrage Rapide](#-guide-de-démarrage-rapide)
- [Installation Complète](#-installation-complète)
- [Structure du Projet](#-structure-du-projet)
- [Design UI](#-design-ui)
- [API Documentation](#-api-documentation)
- [Machine Learning](#-machine-learning)
- [Tests & Résultats](#-tests--résultats)
- [Dépannage](#-dépannage)
- [Avertissement](#%EF%B8%8F-avertissement)

---

## 🎯 Vue d'ensemble

HealthInsight Web est une **application complète de bout en bout** qui combine Machine Learning, développement web moderne et design UI professionnel pour prédire les risques de santé. Le projet démontre :

- ✅ **Pipeline ETL complet** (Extract, Transform, Load)
- ✅ **Modèle ML entraîné** (Logistic Regression - 82.50% accuracy)
- ✅ **API REST moderne** avec FastAPI et documentation Swagger
- ✅ **Interface web professionnelle** avec Next.js, React et TypeScript
- ✅ **Design UI médical** moderne avec thème bleu/blanc professionnel
- ✅ **Visualisation de données** interactive avec Recharts
- ✅ **Tests complets** et validation

---

## ✅ Statut du Projet

**Date de dernière mise à jour :** 1 Décembre 2025  
**Statut :** 🟢 **PROJET FONCTIONNEL ET TESTÉ**

| Composant | Statut | Port | Performance |
|-----------|--------|------|-------------|
| Backend API | ✅ Opérationnel | 8000 | Réponse < 100ms |
| Modèle ML | ✅ Entraîné | - | Accuracy: 82.50% |
| Frontend | ✅ Opérationnel | 3001 | Build: 1.7s |
| Dataset | ✅ Généré | - | 1000 échantillons |
| UI Moderne | ✅ Complété | - | Thème médical bleu |

---

## ✨ Fonctionnalités

### 🔍 Prédiction de Risque de Santé
- **Formulaire interactif** moderne avec validation en temps réel
- **Analyse instantanée** via l'API FastAPI
- **Score de risque visuel** (0-100%) avec cercle animé
- **Classification intelligente** en 3 niveaux : Faible, Modéré, Élevé
- **Barre de progression** animée avec gradients
- **Recommandations personnalisées** selon le niveau de risque
- **Indicateur de confiance** du modèle ML

### 📊 Exploration des Données
- **Statistiques descriptives** complètes du dataset
- **Graphiques interactifs** (distribution d'âge, IMC, sexe, etc.)
- **Visualisation des facteurs de risque** avec Recharts
- **Analyse des corrélations** entre variables
- **Détails des distributions** statistiques

### 🤖 Modèle de Machine Learning
- **Algorithme** : Logistic Regression avec régularisation
- **Dataset** : 1000 échantillons (80/20 train/test split)
- **Features** : 8 variables (âge, sexe, IMC, tabagisme, activité physique, hypertension, cholestérol, antécédents familiaux)
- **Performance** : 
  - Accuracy: 82.50%
  - Precision: 57.58%
  - Recall: 84.44%
  - F1-Score: 68.47%
  - ROC-AUC: 90.78%

### 🎨 Interface Utilisateur Moderne
- **Thème médical professionnel** bleu/blanc
- **Gradients élégants** et ombres douces
- **Animations fluides** sur hover et interactions
- **Design responsive** (Mobile, Tablet, Desktop)
- **Typographie optimisée** pour la lisibilité
- **Accessibilité** (contraste WCAG AA)

---

## 🛠 Technologies & Stack

### Backend (Python 3.12)
| Technologie | Version | Rôle |
|-------------|---------|------|
| **FastAPI** | 0.109.0 | Framework web moderne et rapide |
| **Uvicorn** | 0.27.0 | Serveur ASGI haute performance |
| **scikit-learn** | 1.4.0 | Machine Learning (Logistic Regression) |
| **pandas** | 2.2.0 | Manipulation et analyse de données |
| **numpy** | 1.26.3 | Calculs numériques |
| **joblib** | 1.3.2 | Sérialisation du modèle ML |
| **Pydantic** | 2.5.3 | Validation des données |
| **SQLAlchemy** | 2.0.25 | ORM (optionnel pour logging) |

### Frontend (Node.js 23.9)
| Technologie | Version | Rôle |
|-------------|---------|------|
| **Next.js** | 14.2.33 | Framework React avec SSR |
| **React** | 18 | Bibliothèque UI |
| **TypeScript** | 5.0 | Typage statique |
| **Axios** | 1.6.5 | Client HTTP |
| **Recharts** | 2.10.3 | Visualisation de données |

### Design & UI
- **CSS Variables** pour thème cohérent
- **Gradients CSS** pour effets modernes
- **Transitions** fluides avec cubic-bezier
- **Responsive Grid** avec auto-fit
- **Custom Scrollbar** stylisée

---

## 🏗 Architecture

### Architecture Système
```
┌─────────────────┐         HTTP/REST        ┌─────────────────┐
│                 │ ◄────────────────────────► │                 │
│  Next.js        │      JSON API Calls       │   FastAPI       │
│  Frontend       │                           │   Backend       │
│  (Port 3001)    │                           │   (Port 8000)   │
│                 │                           │                 │
└─────────────────┘                           └────────┬────────┘
                                                       │
                                                       │ Loads
                                                       ▼
                                              ┌─────────────────┐
                                              │  ML Model       │
                                              │  (.pkl files)   │
                                              │  - Model        │
                                              │  - Scaler       │
                                              │  - Encoder      │
                                              └─────────────────┘
```

### Pipeline ETL
```
Raw Data Generation → Data Cleaning → Feature Engineering → Normalization → Model Training
     (CSV)              (Pandas)         (Encoding)         (StandardScaler)   (scikit-learn)
        │                   │                 │                    │                │
        ▼                   ▼                 ▼                    ▼                ▼
  health_raw.csv    Remove NaN/Outliers   Label Encode      Normalize Age/BMI   Save Model
  (1000 samples)    Handle Missing Values  Categories       StandardScaler      (.pkl files)
```

### API Flow
```
User Input (Form) → Frontend Validation → API Request → Data Transformation → ML Prediction → Response
     │                    │                    │              │                      │            │
     ▼                    ▼                    ▼              ▼                      ▼            ▼
  React Form         TypeScript Types      Axios POST     Apply Scaler         model.predict()  JSON
  (8 fields)         PatientData          /predict       Apply Encoder        risk_score       Result
```

---

## 🚀 Guide de Démarrage Rapide

**Temps total : ~3 minutes**

### Prérequis
- ✅ Python 3.12+ installé
- ✅ Node.js 18+ et npm installés
- ✅ Git installé

### Étapes

#### 1️⃣ Installer le Backend (1 min)
```bash
cd backend
pip install -r requirements.txt
```

**Résultat attendu :** Modèle entraîné avec métriques affichées

#### 2️⃣ Installer le Frontend (1 min)
```bash
cd frontend
npm install
```

#### 3️⃣ Lancer l'Application (1 min)

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### 4️⃣ Accéder à l'Application
- **Interface Web**: http://localhost:3001
- **API Docs (Swagger)**: http://localhost:8000/docs
- **Backend Health**: http://localhost:8000/health

---

## 📦 Installation Complète

### 1. Backend Setup

```bash
cd backend

# Installer les dépendances
pip install -r requirements.txt

# Générer le dataset et entraîner le modèle
cd ..  # Retour à la racine
python -m backend.app.train_model
```

**Ce qui se passe :**
- ✅ Génération de 1000 échantillons de données de santé
- ✅ Nettoyage et prétraitement (normalisation, encodage)
- ✅ Split 80/20 (800 train / 200 test)
- ✅ Entraînement Logistic Regression
- ✅ Sauvegarde du modèle et des transformers
- ✅ Affichage des métriques de performance

### 2. Frontend Setup

```bash
cd frontend

# Installer les dépendances
npm install

# Optionnel: Lancer en mode développement
npm run dev
```

### 3. Vérification

**Test Backend:**
```bash
curl http://localhost:8000/health
# Réponse attendue: {"status":"ok","model_loaded":true}
```

**Test Frontend:**
Ouvrir http://localhost:3001 dans le navigateur

---

## 📂 Structure du Projet

```
healthinsight-web/
│
├── 📄 README.md                    ⭐ Documentation principale (ce fichier)
├── 📄 .gitignore                   🔒 Fichiers à ignorer
│
├── 📁 backend/                     🐍 API FastAPI + ML
│   ├── app/
│   │   ├── __init__.py            
│   │   ├── main.py                ⭐ Application FastAPI
│   │   ├── config.py              ⚙️ Configuration
│   │   ├── schemas.py             📝 Modèles Pydantic
│   │   ├── etl.py                 🔄 Pipeline ETL
│   │   ├── train_model.py         🤖 Entraînement ML
│   │   ├── predict.py             🎯 Prédiction
│   │   └── db.py                  💾 Logging (optionnel)
│   └── requirements.txt           📦 Dépendances Python
│
├── 📁 frontend/                    ⚛️ Application Next.js
│   ├── src/
│   │   ├── pages/
│   │   │   ├── _app.tsx           🔧 Config App
│   │   │   ├── index.tsx          🏠 Page d'accueil
│   │   │   ├── predict.tsx        🔍 Page prédiction
│   │   │   └── explore.tsx        📊 Page exploration
│   │   ├── components/
│   │   │   ├── Layout.tsx         🎨 Layout commun
│   │   │   ├── PredictionForm.tsx 📝 Formulaire
│   │   │   └── RiskResultCard.tsx 📋 Résultat
│   │   ├── lib/
│   │   │   └── api.ts             📡 Client API
│   │   └── styles/
│   │       └── globals.css        🎨 Styles globaux
│   ├── package.json               📦 Dépendances npm
│   ├── tsconfig.json              ⚙️ Config TypeScript
│   ├── next.config.mjs            ⚙️ Config Next.js
│   └── .eslintrc.json             📏 Config ESLint
│
├── 📁 data/                        💾 Datasets
│   ├── raw/
│   │   └── health_raw.csv         📊 Dataset brut (généré)
│   └── processed/
│       └── health_clean.csv       📊 Dataset nettoyé
│
├── 📁 models/                      🤖 Modèles ML
│   ├── health_risk_model.pkl      🎯 Modèle entraîné
│   ├── scaler.pkl                 📏 StandardScaler
│   └── encoder.pkl                🔤 Encodeurs
│
└── 📁 notebooks/                   📓 Jupyter notebooks
    └── exploratory_analysis.ipynb 🔬 Analyse exploratoire
```

---

## 🎨 Design UI

### Palette de Couleurs Médicale

**Couleurs Principales:**
- Primary Blue: `#2E7DD2` - Bleu médical principal
- Primary Blue Dark: `#1E5BA8` - Titres et headers
- Accent Blue: `#4A90E2` - Boutons et CTAs
- Light Blue: `#E8F4FD` - Backgrounds clairs

**Couleurs de Statut:**
- Success Green: `#27AE60` - Risque faible
- Warning Orange: `#F39C12` - Risque modéré  
- Danger Red: `#E74C3C` - Risque élevé

### Éléments Visuels

**Gradients:**
```css
/* Background gradient */
background: linear-gradient(135deg, #F0F8FF 0%, #FFFFFF 100%);

/* Button gradient */
background: linear-gradient(135deg, #2E7DD2 0%, #4A90E2 100%);
```

**Cards avec bordure gauche:**
```css
border-left: 4px solid #2E7DD2;
border-radius: 16px;
box-shadow: 0 8px 24px rgba(46, 125, 210, 0.15);
```

**Animations:**
- Hover effects avec `transform: translateY(-4px)`
- Transitions fluides avec `cubic-bezier(0.4, 0, 0.2, 1)`
- Progress bars animées sur 1s

---

## 📡 API Documentation

### Endpoints Disponibles

#### 1. Health Check
```http
GET /health
```

**Réponse:**
```json
{
  "status": "ok",
  "message": "API opérationnelle - Modèle chargé",
  "model_loaded": true
}
```

#### 2. Prédiction de Risque
```http
POST /predict
Content-Type: application/json
```

**Requête:**
```json
{
  "age": 45,
  "sex": "M",
  "bmi": 28.5,
  "smoker": "yes",
  "physical_activity_level": "low",
  "hypertension": 1,
  "cholesterol_level": "high",
  "family_history": 1
}
```

**Réponse:**
```json
{
  "risk_score": 0.989,
  "risk_level": "high",
  "confidence": 0.989
}
```

#### 3. Statistiques du Dataset
```http
GET /dataset-summary
```

**Réponse:**
```json
{
  "total_samples": 1000,
  "disease_rate": 0.224,
  "age_distribution": {
    "mean": 51.2,
    "std": 18.5,
    "min": 18,
    "max": 80
  }
}
```

#### 4. Informations sur le Modèle
```http
GET /model-info
```

**Réponse:**
```json
{
  "model_type": "LogisticRegression",
  "features": 8,
  "accuracy": 0.825
}
```

### Documentation Interactive

Swagger UI disponible sur: **http://localhost:8000/docs**

### Exemples cURL

**Test simple:**
```bash
curl http://localhost:8000/health
```

**Prédiction:**
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 50,
    "sex": "M",
    "bmi": 28,
    "smoker": "yes",
    "physical_activity_level": "low",
    "hypertension": 1,
    "cholesterol_level": "high",
    "family_history": 1
  }'
```

---

## 🤖 Machine Learning

### Dataset

**Source:** Données générées automatiquement inspirées des statistiques de santé de StatCan

**Caractéristiques:**
- **Taille:** 1000 échantillons
- **Features:** 8 variables indépendantes
- **Target:** has_disease (binaire: 0/1)
- **Split:** 80% train (800) / 20% test (200)
- **Balance:** ~22% positifs, ~78% négatifs

**Variables:**
1. `age` (int) - Âge en années (18-80)
2. `sex` (str) - Sexe (M/F)
3. `bmi` (float) - Indice de masse corporelle (15-50)
4. `smoker` (str) - Fumeur (yes/no)
5. `physical_activity_level` (str) - Niveau d'activité (low/moderate/high)
6. `hypertension` (int) - Hypertension (0/1)
7. `cholesterol_level` (str) - Cholestérol (normal/high)
8. `family_history` (int) - Antécédents familiaux (0/1)

### Preprocessing

**1. Normalisation (StandardScaler):**
- Variables continues: `age`, `bmi`
- Formule: `(x - mean) / std`

**2. Encodage (Label Encoding):**
- `sex`: M→1, F→0
- `smoker`: yes→1, no→0
- `physical_activity_level`: low→0, moderate→1, high→2
- `cholesterol_level`: normal→0, high→1

### Modèle: Logistic Regression

**Hyperparamètres:**
```python
LogisticRegression(
    max_iter=1000,
    random_state=42,
    class_weight='balanced'
)
```

**Performance:**
```
Accuracy:  82.50%
Precision: 57.58%
Recall:    84.44%
F1-Score:  68.47%
ROC-AUC:   90.78%
```

**Matrice de Confusion:**
```
              Prédiction
              Neg    Pos
Réel  Neg    127     28
      Pos      7     38
```

**Coefficients (Importance des Features):**
1. `smoker`: +2.79 (Plus forte influence positive)
2. `hypertension`: +2.52
3. `cholesterol_level`: +1.88
4. `family_history`: +1.20
5. `age`: +1.14
6. `bmi`: +0.31
7. `sex`: -0.50
8. `physical_activity_level`: -0.23 (Influence négative)

**Interprétation:**
- Le tabagisme est le facteur de risque le plus important
- L'hypertension et le cholestérol élevé augmentent significativement le risque
- Une activité physique élevée réduit le risque

### Fichiers Générés

**Models:**
- `models/health_risk_model.pkl` - Modèle Logistic Regression
- `models/scaler.pkl` - StandardScaler pour normalisation
- `models/encoder.pkl` - Dictionnaires d'encodage

**Data:**
- `data/raw/health_raw.csv` - Dataset brut lisible
- `data/processed/health_clean.csv` - Dataset prétraité pour ML

---

## ✅ Tests & Résultats

### Tests Backend

**1. Dépendances installées:**
```bash
✅ FastAPI 0.109.0
✅ Uvicorn 0.27.0
✅ scikit-learn 1.4.0
✅ pandas 2.2.0
✅ numpy 1.26.3
✅ Pydantic 2.5.3
✅ joblib 1.3.2
```

**2. Dataset généré:**
```
✅ 1000 échantillons dans health_raw.csv
✅ Taux de maladie: 22.40%
✅ Pas de valeurs manquantes
```

**3. Modèle entraîné:**
```
✅ Accuracy: 82.50%
✅ ROC-AUC: 90.78%
✅ Modèle sauvegardé dans models/
```

**4. API testée:**
```bash
✅ GET /health → 200 OK
✅ POST /predict → 200 OK
✅ GET /dataset-summary → 200 OK
✅ GET /model-info → 200 OK
```

### Tests Frontend

**1. Dépendances installées:**
```
✅ 371 packages npm installés
✅ Next.js 14.2.33
✅ React 18
✅ TypeScript 5.0
```

**2. Build réussi:**
```
✅ Compilation sans erreur
✅ Ready in 1.7s
✅ Running on http://localhost:3001
```

**3. Pages fonctionnelles:**
```
✅ Page d'accueil (/) - Affiche statut API
✅ Page prédiction (/predict) - Formulaire fonctionnel
✅ Page exploration (/explore) - Graphiques affichés
```

### Tests d'Intégration

**1. Connexion Frontend ↔ Backend:**
```
✅ API accessible depuis le frontend
✅ CORS configuré correctement
✅ Requêtes POST /predict fonctionnelles
✅ Affichage des résultats correct
```

**2. Test de prédiction complète:**
```
✅ Remplissage formulaire → Soumission → Résultat affiché
✅ Score de risque calculé
✅ Niveau de risque déterminé
✅ Recommandations affichées
✅ Animation du score circulaire
```

---

## 🔧 Dépannage

### Problème: "Network Error" dans le frontend

**Cause:** Backend non démarré

**Solution:**
```bash
cd backend
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

Vérifier: http://localhost:8000/health

### Problème: "Module not found" lors du train_model

**Cause:** Commande exécutée depuis le mauvais dossier

**Solution:**
```bash
# Toujours exécuter depuis la RACINE du projet
cd /path/to/projet_pfa
python -m backend.app.train_model
```

### Problème: "Model file not found"

**Cause:** Modèle pas encore entraîné

**Solution:**
```bash
cd /path/to/projet_pfa
python -m backend.app.train_model
```

### Problème: Port 8000 ou 3001 déjà utilisé

**Windows:**
```bash
# Trouver le processus
netstat -ano | findstr :8000

# Tuer le processus
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Trouver et tuer
lsof -ti:8000 | xargs kill -9
```

### Problème: CORS Error

**Vérification:**
Le fichier `backend/app/main.py` doit contenir:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Problème: Frontend ne compile pas

**Solution:**
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

---

## 🎓 Pour la Présentation

### Points Clés à Mentionner

**1. Architecture Full-Stack:**
- Backend Python avec FastAPI (moderne, rapide)
- Frontend React/Next.js avec TypeScript (typage fort)
- Communication REST API avec JSON

**2. Machine Learning:**
- Logistic Regression (simple mais efficace: 82.5% accuracy)
- Pipeline ETL complet (génération → nettoyage → entraînement)
- Features engineering (normalisation, encodage)

**3. UI/UX Moderne:**
- Design médical professionnel bleu/blanc
- Gradients, animations, responsive
- Expérience utilisateur fluide

**4. Bonnes Pratiques:**
- Code structuré et modulaire
- Documentation complète
- Validation des données (Pydantic)
- Type safety (TypeScript)
- Tests fonctionnels

### Démonstration Suggérée

1. **Montrer le backend** (1-2 min)
   - Terminal avec uvicorn running
   - Swagger docs (http://localhost:8000/docs)
   - Tester /health endpoint

2. **Montrer le frontend** (2-3 min)
   - Page d'accueil avec statut API
   - Formulaire de prédiction
   - Faire une prédiction en direct
   - Montrer le résultat avec score et recommandations

3. **Expliquer le ML** (2-3 min)
   - Dataset généré (1000 samples)
   - 8 features importantes
   - Performance du modèle (82.5% accuracy)
   - Montrer les coefficients des features

4. **Montrer le code** (2-3 min)
   - Structure du projet
   - Pipeline ETL (etl.py)
   - Entraînement (train_model.py)
   - API endpoints (main.py)

### Questions Probables

**Q: Pourquoi Logistic Regression ?**
R: Simple, interprétable, performant pour classification binaire, et suffisant pour ce projet pédagogique.

**Q: D'où viennent les données ?**
R: Données simulées inspirées des statistiques de santé de StatCan, générées automatiquement avec des corrélations réalistes.

**Q: Pourquoi FastAPI ?**
R: Moderne, rapide, documentation auto-générée (Swagger), validation automatique avec Pydantic.

**Q: Pourquoi Next.js ?**
R: SSR (meilleure performance), TypeScript intégré, routing simple, écosystème React.

**Q: Comment améliorer le modèle ?**
R: Plus de données, feature engineering avancé, essayer d'autres algorithmes (Random Forest, XGBoost), hyperparameter tuning.

---

## ⚠️ Avertissement

**IMPORTANT:** Ce modèle de Machine Learning est créé à des fins **pédagogiques uniquement**.

❌ **NE PAS utiliser** pour de vraies décisions médicales  
❌ **NE PAS** remplacer l'avis d'un professionnel de santé  
❌ **NE PAS** utiliser en production sans validation médicale

✅ **Utiliser** pour apprendre le ML et le développement full-stack  
✅ **Utiliser** comme base de projet académique  
✅ **Utiliser** pour comprendre les concepts d'IA en santé

**En cas de préoccupation médicale réelle, consultez toujours un médecin qualifié.**

---

## 📞 Contact & Support

**Projet créé par:** [Votre Nom]  
**Date:** Décembre 2025  
**Contexte:** Projet de Fin d'Études

---

## 📄 Licence

Ce projet est à usage académique uniquement.

---

**🎉 Merci d'utiliser HealthInsight Web !**
     ├── predict.tsx (Formulaire + Résultat)
     └── explore.tsx (Visualisation)
```

### Pipeline ML

```
1. ETL (etl.py)
   ├── Génération/Chargement du dataset
   ├── Nettoyage (valeurs manquantes, outliers)
   ├── Encodage (variables catégorielles)
   └── Normalisation (StandardScaler)

2. Training (train_model.py)
   ├── Split train/test (80/20)
   ├── Entraînement Logistic Regression
   ├── Évaluation (accuracy, precision, recall, ROC-AUC)
   └── Sauvegarde du modèle

3. Prediction (predict.py)
   ├── Chargement du modèle
   ├── Prétraitement des données d'entrée
   ├── Prédiction (probabilité 0-1)
   └── Classification (low/moderate/high)
```

---

## 📊 Détails du Modèle

### Features utilisées

| Feature | Type | Description |
|---------|------|-------------|
| `age` | Numérique | Âge du patient (18-100 ans) |
| `sex` | Catégoriel | Sexe (M/F) |
| `bmi` | Numérique | Indice de Masse Corporelle (15-50) |
| `smoker` | Binaire | Fumeur (yes/no) |
| `physical_activity_level` | Ordinal | Niveau d'activité (low/moderate/high) |
| `hypertension` | Binaire | Hypertension (0/1) |
| `cholesterol_level` | Binaire | Cholestérol (normal/high) |
| `family_history` | Binaire | Antécédents familiaux (0/1) |

### Target

- `has_disease` : 0 = Sain, 1 = Malade

### Seuils de classification

- **Risque Faible** : score < 30%
- **Risque Modéré** : 30% ≤ score < 60%
- **Risque Élevé** : score ≥ 60%

---

## ⚠️ Avertissement

**IMPORTANT : Ce projet est à usage pédagogique uniquement.**

- ❌ Ne PAS utiliser pour des décisions médicales réelles
- ❌ Ne remplace PAS l'avis d'un professionnel de santé
- ✅ Démonstration technique de ML appliqué à la santé
- ✅ Projet académique pour apprentissage

En cas de préoccupation pour votre santé, consultez un médecin qualifié.

---

## 🎓 Contexte académique

Ce projet a été développé dans le cadre d'un **Projet de Fin d'Études (PFA)** pour démontrer :

1. Maîtrise du développement Full-Stack (Python + TypeScript)
2. Application du Machine Learning à un problème réel
3. Création d'un pipeline complet : données → modèle → API → interface
4. Bonnes pratiques de développement (code propre, documentation, organisation)

---

## 📝 Licence

Ce projet est à usage éducatif uniquement.

---

## 👤 Auteur

Projet de Fin d'Études - HealthInsight Web

---

**Bon test ! 🚀**
