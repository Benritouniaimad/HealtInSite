#!/bin/bash
# Script de démarrage complet du projet

echo "🚀 Démarrage de HealthInsight Web..."
echo ""

# Vérification de Python
if ! command -v python &> /dev/null; then
    echo "❌ Python n'est pas installé. Veuillez installer Python 3.12+"
    exit 1
fi

# Vérification de Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 18+"
    exit 1
fi

echo "✓ Python et Node.js détectés"
echo ""

# Installation des dépendances backend si nécessaire
if [ ! -d "backend/venv" ]; then
    echo "📦 Installation des dépendances backend..."
    cd backend
    pip install -r requirements.txt
    cd ..
fi

# Vérification du modèle
if [ ! -f "models/health_risk_model.pkl" ]; then
    echo "🤖 Entraînement du modèle ML..."
    cd backend
    python -m backend.app.train_model
    cd ..
fi

# Installation des dépendances frontend si nécessaire
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installation des dépendances frontend..."
    cd frontend
    npm install
    cd ..
fi

echo ""
echo "✅ Tout est prêt !"
echo ""
echo "Pour lancer l'application :"
echo "  Terminal 1 (Backend) : cd backend && uvicorn backend.app.main:app --reload"
echo "  Terminal 2 (Frontend): cd frontend && npm run dev"
echo ""
echo "Puis ouvrez http://localhost:3000 dans votre navigateur"
