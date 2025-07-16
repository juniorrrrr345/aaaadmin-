# Qencorroe Admin Panel

Un panel d'administration moderne et complet pour gérer votre boutique en ligne.

## 🚀 Fonctionnalités

### Dashboard
- Vue d'ensemble des statistiques
- Graphiques de ventes et croissance
- Alertes de stock faible
- Commandes récentes
- Actions rapides

### Gestion des Produits
- Ajout/modification/suppression de produits
- Gestion des images et vidéos
- Catégorisation et tags
- Gestion des stocks
- Prix et descriptions

### Gestion des Commandes
- Suivi des commandes en temps réel
- Mise à jour des statuts
- Détails des commandes
- Informations clients
- Historique des commandes

### Gestion des Clients
- Base de données clients
- Historique des achats
- Informations de contact
- Segmentation clients
- Statistiques par client

### Analytics
- Graphiques de ventes
- Analyse de la croissance
- Produits les plus vendus
- Taux de conversion
- Performance du site

### Gestion des Pages
- Création de pages personnalisées
- Éditeur de contenu
- SEO et métadonnées
- Navigation du site

### Gestion des Médias
- Upload d'images et vidéos
- Galerie organisée
- Optimisation automatique
- Gestion des fichiers

### Réseaux Sociaux
- Liens vers les réseaux sociaux
- Intégration des flux
- Partage automatique

### Paramètres
- Configuration du site
- Informations de contact
- Paramètres de paiement
- Configuration SEO

## 🛠️ Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation locale

1. **Cloner le projet**
```bash
git clone [url-du-repo]
cd panel-admin
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration des variables d'environnement**
Créer un fichier `.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. **Lancer en mode développement**
```bash
npm run dev
```

Le panel sera accessible sur `http://localhost:3000`

## 🚀 Déploiement sur Vercel

### Configuration automatique
1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement que c'est un projet Next.js
3. Configurez les variables d'environnement dans Vercel :
   - `NEXT_PUBLIC_API_URL` : URL de votre API

### Configuration manuelle
1. Créez un nouveau projet sur Vercel
2. Importez votre repository
3. Configurez les paramètres :
   - **Framework Preset** : Next.js
   - **Root Directory** : `panel-admin`
   - **Build Command** : `npm run build`
   - **Output Directory** : `.next`

## 📱 Interface Mobile

Le panel est entièrement responsive et optimisé pour mobile :
- Navigation adaptative
- Formulaires optimisés pour tactile
- Upload de fichiers mobile-friendly
- Interface tactile intuitive

## 🔧 Configuration API

Le panel se connecte à votre API via les endpoints suivants :

### Endpoints principaux
- `GET /api/stats` - Statistiques du dashboard
- `GET /api/products` - Liste des produits
- `GET /api/orders` - Liste des commandes
- `GET /api/customers` - Liste des clients
- `GET /api/analytics` - Données analytiques

### Endpoints de gestion
- `POST /api/products` - Créer un produit
- `PUT /api/products/:id` - Modifier un produit
- `DELETE /api/products/:id` - Supprimer un produit
- `POST /api/upload` - Upload de fichiers

## 🎨 Personnalisation

### Couleurs et thème
Modifiez les couleurs dans `tailwind.config.js` :
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        }
      }
    }
  }
}
```

### Logo et branding
Remplacez le logo dans `app/page.tsx` et modifiez le titre "Qencorroe Admin".

## 🔒 Sécurité

- Validation des données côté client et serveur
- Protection CSRF
- Headers de sécurité configurés
- Gestion des erreurs sécurisée

## 📊 Performance

- Optimisation des images
- Lazy loading des composants
- Code splitting automatique
- Cache intelligent

## 🐛 Dépannage

### Erreurs courantes

**Build échoue sur Vercel**
- Vérifiez que le répertoire racine est correct
- Assurez-vous que toutes les dépendances sont installées

**API non accessible**
- Vérifiez l'URL de l'API dans les variables d'environnement
- Testez la connectivité de l'API

**Images ne s'affichent pas**
- Vérifiez les permissions des dossiers uploads
- Assurez-vous que les URLs sont correctes

## 📈 Monitoring

Le panel inclut :
- Logs d'erreurs automatiques
- Métriques de performance
- Alertes de stock
- Notifications en temps réel

## 🤝 Support

Pour toute question ou problème :
1. Consultez la documentation de l'API
2. Vérifiez les logs d'erreur
3. Testez en mode développement
4. Contactez l'équipe technique

## 📝 Changelog

### Version 2.0.0
- Interface complètement redesignée
- Nouvelles fonctionnalités analytics
- Gestion avancée des commandes
- Support mobile amélioré
- Performance optimisée

### Version 1.0.0
- Version initiale
- Fonctionnalités de base
- Interface simple

---

**Qencorroe Admin Panel** - Gestion complète de votre boutique en ligne