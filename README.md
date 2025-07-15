# Qencorroe - Boutique et Panel Admin

Ce repository contient la boutique Qencorroe et son panel d'administration externe.

## 📁 Structure du projet

```
workspace/
├── boutique/          # Boutique principale (Next.js)
│   ├── app/
│   │   ├── admin/     # Panel admin intégré
│   │   └── ...
│   └── ...
└── panel-admin/       # Panel admin externe (Next.js)
    ├── app/
    └── ...
```

## 🚀 Installation et démarrage

### 1. Boutique principale

```bash
cd boutique
npm install
npm run dev
```

La boutique sera accessible sur `http://localhost:3000`

### 2. Panel Admin externe

```bash
cd panel-admin
npm install
npm run dev
```

Le panel admin sera accessible sur `http://localhost:3001`

## 🔧 Configuration

### Variables d'environnement

#### Boutique principale
Créez un fichier `.env.local` dans le dossier `boutique/` :

```env
# Configuration de la base de données
DATABASE_URL=your_database_url

# Configuration de l'authentification
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

#### Panel Admin
Créez un fichier `.env.local` dans le dossier `panel-admin/` :

```env
# URL de l'API de la boutique principale
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BOUTIQUE_URL=http://localhost:3000
```

## 🎨 Fonctionnalités

### Boutique principale
- Catalogue de produits
- Système de commandes
- Gestion des clients
- Panel admin intégré

### Panel Admin externe
- Dashboard avec statistiques
- Gestion des produits (CRUD)
- Gestion des commandes
- Gestion des clients
- Interface moderne et responsive

## 🔗 Communication entre les applications

Le panel admin externe communique avec la boutique principale via :
- **API REST** : Appels HTTP vers les endpoints de la boutique
- **Rewrites Next.js** : Redirection automatique des requêtes API
- **Variables d'environnement** : Configuration des URLs

## 🛠️ Développement

### Ajouter une nouvelle fonctionnalité au panel admin

1. Créer un nouveau composant dans `panel-admin/app/components/`
2. Ajouter la méthode correspondante dans `panel-admin/app/lib/api.ts`
3. Intégrer le composant dans la navigation

### Modifier l'API de la boutique

1. Modifier les endpoints dans `boutique/app/api/`
2. Mettre à jour les méthodes dans `panel-admin/app/lib/api.ts`
3. Tester la communication entre les applications

## 🚀 Déploiement

### Boutique principale
```bash
cd boutique
npm run build
npm start
```

### Panel Admin
```bash
cd panel-admin
npm run build
npm start
```

### Variables d'environnement en production

Assurez-vous de configurer les variables d'environnement pour pointer vers vos URLs de production :

```env
# Panel Admin - Production
NEXT_PUBLIC_API_URL=https://votre-boutique.com/api
NEXT_PUBLIC_BOUTIQUE_URL=https://votre-boutique.com
```

## 📝 Notes importantes

- Le panel admin externe fonctionne de manière indépendante
- Toutes les données sont synchronisées via l'API de la boutique principale
- L'interface est responsive et moderne
- Sécurité : Ajoutez une authentification appropriée avant la mise en production
- Les deux applications peuvent être déployées séparément

## 🤝 Contribution

1. Fork le repository
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.