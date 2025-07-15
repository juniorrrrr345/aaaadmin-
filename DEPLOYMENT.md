# Guide de Déploiement - Panel Admin Qencorroe

Ce guide explique comment déployer le panel admin externe sur différentes plateformes.

## 🚀 Déploiement sur Vercel (Recommandé)

### 1. Préparation

1. Assurez-vous que votre code est sur GitHub
2. Créez un compte sur [Vercel](https://vercel.com)

### 2. Configuration

1. Connectez votre repository GitHub à Vercel
2. Sélectionnez le dossier `panel-admin` comme racine du projet
3. Configurez les variables d'environnement :

```env
NEXT_PUBLIC_API_URL=https://votre-boutique.com/api
NEXT_PUBLIC_BOUTIQUE_URL=https://votre-boutique.com
```

### 3. Déploiement

Vercel détectera automatiquement que c'est un projet Next.js et le déploiera.

## 🌐 Déploiement sur Netlify

### 1. Configuration

1. Créez un fichier `netlify.toml` dans le dossier `panel-admin/` :

```toml
[build]
  base = "panel-admin"
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Variables d'environnement

Dans les paramètres Netlify, ajoutez :

```env
NEXT_PUBLIC_API_URL=https://votre-boutique.com/api
NEXT_PUBLIC_BOUTIQUE_URL=https://votre-boutique.com
```

## 🐳 Déploiement avec Docker

### 1. Dockerfile

Créez un fichier `Dockerfile` dans le dossier `panel-admin/` :

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

### 2. Docker Compose

Créez un fichier `docker-compose.yml` à la racine :

```yaml
version: '3.8'

services:
  panel-admin:
    build: ./panel-admin
    ports:
      - "3001:3001"
    environment:
      - NEXT_PUBLIC_API_URL=http://boutique:3000/api
      - NEXT_PUBLIC_BOUTIQUE_URL=http://boutique:3000
    depends_on:
      - boutique

  boutique:
    build: ./boutique
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=your_database_url
```

## 🔧 Configuration des Variables d'Environnement

### Développement local

Créez un fichier `.env.local` dans `panel-admin/` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BOUTIQUE_URL=http://localhost:3000
```

### Production

```env
NEXT_PUBLIC_API_URL=https://votre-boutique.com/api
NEXT_PUBLIC_BOUTIQUE_URL=https://votre-boutique.com
```

## 🔒 Sécurité

### 1. Authentification

Avant la mise en production, ajoutez une authentification :

```bash
npm install next-auth
```

### 2. CORS

Configurez CORS dans votre boutique principale pour autoriser le panel admin :

```javascript
// Dans votre API de la boutique
app.use(cors({
  origin: ['https://votre-panel-admin.com'],
  credentials: true
}));
```

### 3. Rate Limiting

Ajoutez une limitation de taux pour protéger votre API :

```bash
npm install express-rate-limit
```

## 📊 Monitoring

### 1. Vercel Analytics

Si vous utilisez Vercel, activez les analytics dans les paramètres.

### 2. Logs

Configurez la journalisation pour surveiller les erreurs :

```javascript
// Dans panel-admin/app/lib/api.ts
console.log('API Call:', endpoint, response);
```

## 🚨 Troubleshooting

### Problème de CORS

Si vous rencontrez des erreurs CORS :

1. Vérifiez que l'URL de l'API est correcte
2. Configurez CORS sur votre boutique principale
3. Vérifiez les variables d'environnement

### Erreurs de build

1. Vérifiez que toutes les dépendances sont installées
2. Vérifiez la version de Node.js (18+ recommandé)
3. Vérifiez les erreurs TypeScript

### Problèmes de connexion API

1. Vérifiez que votre boutique principale fonctionne
2. Testez les endpoints API directement
3. Vérifiez les logs du serveur

## 📝 Checklist de Déploiement

- [ ] Code testé localement
- [ ] Variables d'environnement configurées
- [ ] Authentification mise en place
- [ ] CORS configuré
- [ ] SSL/HTTPS activé
- [ ] Monitoring configuré
- [ ] Backup de la base de données
- [ ] Documentation mise à jour

## 🔄 Mise à jour

Pour mettre à jour le panel admin :

1. Poussez les changements sur GitHub
2. Vercel/Netlify redéploiera automatiquement
3. Vérifiez que tout fonctionne correctement

## 📞 Support

Pour toute question sur le déploiement :

1. Vérifiez les logs de déploiement
2. Consultez la documentation de la plateforme
3. Ouvrez une issue sur GitHub