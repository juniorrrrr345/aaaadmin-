# Panel Admin - Qencorroe

Panel d'administration externe pour la boutique Qencorroe.

## 🚀 Installation

1. Cloner le repository :
```bash
git clone <votre-repo>
cd panel-admin
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

Le panel admin sera accessible sur `http://localhost:3001`

## 📁 Structure du projet

```
panel-admin/
├── app/
│   ├── components/     # Composants réutilisables
│   ├── lib/           # Utilitaires et configurations
│   ├── api/           # Routes API
│   ├── globals.css    # Styles globaux
│   ├── layout.tsx     # Layout principal
│   └── page.tsx       # Page principale
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## 🔧 Configuration

### Connexion à la boutique principale

Le panel admin est configuré pour se connecter à la boutique principale via les rewrites dans `next.config.js`. Assurez-vous que votre boutique principale fonctionne sur `http://localhost:3000`.

### Variables d'environnement

Créez un fichier `.env.local` avec les variables suivantes :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BOUTIQUE_URL=http://localhost:3000
```

## 🎨 Fonctionnalités

- **Dashboard** : Vue d'ensemble avec statistiques
- **Gestion des produits** : Ajouter, modifier, supprimer des produits
- **Gestion des commandes** : Suivre et gérer les commandes
- **Gestion des clients** : Gérer la base de clients
- **Paramètres** : Configuration du système

## 🛠️ Développement

### Ajouter une nouvelle page

1. Créer un nouveau dossier dans `app/`
2. Ajouter un fichier `page.tsx`
3. Mettre à jour la navigation dans `app/page.tsx`

### Styles

Le projet utilise Tailwind CSS. Les classes utilitaires sont disponibles dans tous les composants.

### API

Les routes API sont dans le dossier `app/api/`. Elles communiquent avec la boutique principale via les rewrites.

## 🚀 Déploiement

### Build de production

```bash
npm run build
npm start
```

### Variables d'environnement en production

Assurez-vous de configurer les variables d'environnement pour pointer vers votre boutique principale en production.

## 📝 Notes

- Le panel admin fonctionne de manière indépendante mais se connecte à la boutique principale
- Toutes les données sont synchronisées via l'API de la boutique principale
- L'interface est responsive et moderne
- Sécurité : Ajoutez une authentification appropriée avant la mise en production