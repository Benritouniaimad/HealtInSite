#!/bin/bash
# Script d'installation automatique - Dashboard 3D
# Exécutez ce script dans Git Bash ou WSL

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║  🏥 INSTALLATION DASHBOARD 3D - HEALTHINSIGHT                 ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher un message de succès
success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Fonction pour afficher un message d'erreur
error() {
    echo -e "${RED}✗${NC} $1"
}

# Fonction pour afficher un message d'information
info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Fonction pour afficher un titre de section
section() {
    echo ""
    echo -e "${YELLOW}━━━ $1 ━━━${NC}"
    echo ""
}

# Vérifier que nous sommes dans le bon dossier
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    error "Ce script doit être exécuté depuis le dossier projet_pfa"
    exit 1
fi

section "1. Vérification de l'environnement"

# Vérifier Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    success "Node.js est installé : $NODE_VERSION"
else
    error "Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

# Vérifier npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    success "npm est installé : $NPM_VERSION"
else
    error "npm n'est pas installé"
    exit 1
fi

# Vérifier Python
if command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version)
    success "Python est installé : $PYTHON_VERSION"
elif command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    success "Python est installé : $PYTHON_VERSION"
else
    error "Python n'est pas installé"
    exit 1
fi

section "2. Installation des dépendances frontend"

cd frontend

info "Installation des dépendances npm..."
npm install

if [ $? -eq 0 ]; then
    success "Dépendances frontend installées avec succès"
else
    error "Erreur lors de l'installation des dépendances frontend"
    exit 1
fi

# Vérifier que les dépendances 3D sont bien installées
if [ -d "node_modules/three" ] && [ -d "node_modules/@react-three/fiber" ]; then
    success "Dépendances 3D vérifiées (three, @react-three/fiber, @react-three/drei)"
else
    error "Les dépendances 3D ne sont pas installées correctement"
    exit 1
fi

cd ..

section "3. Vérification du backend"

if [ -f "backend/requirements.txt" ]; then
    info "Backend trouvé. Assurez-vous que les dépendances Python sont installées :"
    echo "  cd backend"
    echo "  pip install -r requirements.txt"
    success "Fichier requirements.txt trouvé"
else
    error "Fichier requirements.txt non trouvé dans backend/"
fi

section "4. Résumé de l'installation"

success "✨ Installation terminée avec succès !"
echo ""
info "Fichiers créés :"
echo "  • src/types/prediction.ts"
echo "  • src/components/PatientForm.tsx"
echo "  • src/components/HumanBody3D.tsx"
echo "  • src/components/Risk3DViewer.tsx"
echo "  • src/pages/dashboard.tsx"
echo "  • Documentation complète (4 fichiers MD)"
echo ""

section "5. Prochaines étapes"

echo "Pour démarrer l'application :"
echo ""
echo -e "${YELLOW}Terminal 1 - Backend :${NC}"
echo "  cd backend"
echo "  python -m uvicorn app.main:app --reload"
echo ""
echo -e "${YELLOW}Terminal 2 - Frontend :${NC}"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo -e "${YELLOW}Navigateur :${NC}"
echo "  http://localhost:3000/dashboard"
echo ""

success "🎉 Tout est prêt ! Bon développement !"
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  📚 Documentation disponible :                                ║"
echo "║  • GUIDE_COMPLET_DASHBOARD_3D.md                              ║"
echo "║  • EXPLICATION_CODE_3D.md                                     ║"
echo "║  • frontend/README_DASHBOARD_3D.md                            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
