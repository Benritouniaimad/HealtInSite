@echo off
REM Script de démarrage complet du projet (Windows)

echo 🚀 Démarrage de HealthInsight Web...
echo.

REM Vérification de Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python n'est pas installé. Veuillez installer Python 3.12+
    exit /b 1
)

REM Vérification de Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé. Veuillez installer Node.js 18+
    exit /b 1
)

echo ✓ Python et Node.js détectés
echo.

REM Installation des dépendances backend si nécessaire
if not exist "backend\venv" (
    echo 📦 Installation des dépendances backend...
    cd backend
    pip install -r requirements.txt
    cd ..
)

REM Vérification du modèle
if not exist "models\health_risk_model.pkl" (
    echo 🤖 Entraînement du modèle ML...
    cd backend
    python -m backend.app.train_model
    cd ..
)

REM Installation des dépendances frontend si nécessaire
if not exist "frontend\node_modules" (
    echo 📦 Installation des dépendances frontend...
    cd frontend
    npm install
    cd ..
)

echo.
echo ✅ Tout est prêt !
echo.
echo Pour lancer l'application :
echo   Terminal 1 (Backend) : cd backend ^&^& uvicorn backend.app.main:app --reload
echo   Terminal 2 (Frontend): cd frontend ^&^& npm run dev
echo.
echo Puis ouvrez http://localhost:3000 dans votre navigateur
