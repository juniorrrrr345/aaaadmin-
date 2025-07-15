#!/bin/bash

echo "🚀 Démarrage de l'API Boutique et du Panel Admin..."

# Démarrer l'API boutique
echo "📊 Démarrage de l'API Boutique sur http://localhost:3000..."
cd boutique
npm install
npm run dev &
API_PID=$!

# Attendre que l'API démarre
sleep 5

# Démarrer le panel admin
echo "🖥️  Démarrage du Panel Admin sur http://localhost:3001..."
cd ../panel-admin
npm install
npm run dev &
ADMIN_PID=$!

echo ""
echo "✅ Services démarrés avec succès !"
echo "📊 API Boutique: http://localhost:3000"
echo "🖥️  Panel Admin: http://localhost:3001"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les services"
echo ""

# Attendre que les processus se terminent
wait