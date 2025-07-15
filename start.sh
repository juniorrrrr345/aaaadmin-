#!/bin/bash

echo "🚀 Démarrage de Qencorroe - Boutique et Panel Admin"
echo ""

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "📦 Installation des dépendances..."

# Installer les dépendances de la boutique
echo "Installing boutique dependencies..."
cd boutique
npm install
cd ..

# Installer les dépendances du panel admin
echo "Installing panel-admin dependencies..."
cd panel-admin
npm install
cd ..

echo ""
echo "✅ Dépendances installées avec succès!"
echo ""

echo "🌐 Démarrage des applications..."
echo ""

# Démarrer la boutique en arrière-plan
echo "Starting boutique on http://localhost:3000"
cd boutique
npm run dev &
BOUTIQUE_PID=$!
cd ..

# Attendre un peu que la boutique démarre
sleep 3

# Démarrer le panel admin en arrière-plan
echo "Starting panel admin on http://localhost:3001"
cd panel-admin
npm run dev &
PANEL_PID=$!
cd ..

echo ""
echo "🎉 Applications démarrées avec succès!"
echo ""
echo "📍 URLs:"
echo "   Boutique: http://localhost:3000"
echo "   Panel Admin: http://localhost:3001"
echo ""
echo "⏹️  Pour arrêter les applications, appuyez sur Ctrl+C"
echo ""

# Fonction pour nettoyer les processus
cleanup() {
    echo ""
    echo "🛑 Arrêt des applications..."
    kill $BOUTIQUE_PID 2>/dev/null
    kill $PANEL_PID 2>/dev/null
    echo "✅ Applications arrêtées"
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre que les processus se terminent
wait