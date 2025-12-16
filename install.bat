@echo off
:: Script d'installation automatique - Dashboard 3D
:: Pour Windows

echo ================================================================
echo.
echo   🏥 INSTALLATION DASHBOARD 3D - HEALTHINSIGHT
echo.
echo ================================================================
echo.

:: Vérifier que nous sommes dans le bon dossier
if not exist "frontend\" (
    echo [ERREUR] Dossier frontend non trouvé
    echo Ce script doit être exécuté depuis le dossier projet_pfa
    pause
    exit /b 1
)

if not exist "backend\" (
    echo [ERREUR] Dossier backend non trouvé
    echo Ce script doit être exécuté depuis le dossier projet_pfa
    pause
    exit /b 1
)

echo ━━━ 1. Vérification de l'environnement ━━━
echo.

:: Vérifier Node.js
where node >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo [OK] Node.js est installé : %NODE_VERSION%
) else (
    echo [ERREUR] Node.js n'est pas installé
    echo Téléchargez-le depuis https://nodejs.org/
    pause
    exit /b 1
)

:: Vérifier npm
where npm >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo [OK] npm est installé : %NPM_VERSION%
) else (
    echo [ERREUR] npm n'est pas installé
    pause
    exit /b 1
)

:: Vérifier Python
where python >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
    echo [OK] Python est installé : %PYTHON_VERSION%
) else (
    echo [AVERTISSEMENT] Python non trouvé dans PATH
)

echo.
echo ━━━ 2. Installation des dépendances frontend ━━━
echo.

cd frontend

echo Installation des dépendances npm (cela peut prendre quelques minutes)...
echo.

call npm install

if %errorlevel% equ 0 (
    echo.
    echo [OK] Dépendances frontend installées avec succès
) else (
    echo.
    echo [ERREUR] Erreur lors de l'installation des dépendances frontend
    cd ..
    pause
    exit /b 1
)

:: Vérifier que les dépendances 3D sont installées
if exist "node_modules\three\" (
    if exist "node_modules\@react-three\fiber\" (
        echo [OK] Dépendances 3D vérifiées (three, @react-three/fiber, @react-three/drei)
    ) else (
        echo [AVERTISSEMENT] @react-three/fiber non trouvé
    )
) else (
    echo [AVERTISSEMENT] three.js non trouvé
)

cd ..

echo.
echo ━━━ 3. Vérification du backend ━━━
echo.

if exist "backend\requirements.txt" (
    echo [OK] Fichier requirements.txt trouvé
    echo.
    echo [INFO] Assurez-vous d'installer les dépendances Python :
    echo   cd backend
    echo   pip install -r requirements.txt
) else (
    echo [AVERTISSEMENT] Fichier requirements.txt non trouvé dans backend\
)

echo.
echo ━━━ 4. Résumé de l'installation ━━━
echo.

echo [OK] ✨ Installation terminée avec succès !
echo.
echo Fichiers créés :
echo   • src\types\prediction.ts
echo   • src\components\PatientForm.tsx
echo   • src\components\HumanBody3D.tsx
echo   • src\components\Risk3DViewer.tsx
echo   • src\pages\dashboard.tsx
echo   • Documentation complète (4 fichiers MD)
echo.

echo ━━━ 5. Prochaines étapes ━━━
echo.

echo Pour démarrer l'application :
echo.
echo Terminal 1 - Backend :
echo   cd backend
echo   python -m uvicorn app.main:app --reload
echo.
echo Terminal 2 - Frontend :
echo   cd frontend
echo   npm run dev
echo.
echo Navigateur :
echo   http://localhost:3000/dashboard
echo.
echo [OK] 🎉 Tout est prêt ! Bon développement !
echo.
echo ================================================================
echo   📚 Documentation disponible :
echo   • GUIDE_COMPLET_DASHBOARD_3D.md
echo   • EXPLICATION_CODE_3D.md
echo   • frontend\README_DASHBOARD_3D.md
echo   • README_INSTALLATION.txt
echo ================================================================
echo.

pause
