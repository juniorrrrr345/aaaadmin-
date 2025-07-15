# Déploiement sur Vercel - Panel Admin

## 🚀 Configuration des variables d'environnement

### Option 1 : Via l'interface Vercel (Recommandé)

1. **Allez sur votre dashboard Vercel :**
   - Connectez-vous à https://vercel.com
   - Sélectionnez votre projet

2. **Configurez les variables d'environnement :**
   - Allez dans "Settings" > "Environment Variables"
   - Ajoutez ces variables :

```
NEXT_PUBLIC_API_URL = https://qencorroezzz.vercel.app/api
NEXT_PUBLIC_ADMIN_TITLE = Panel Admin Qencorroe
NEXT_PUBLIC_ADMIN_VERSION = 1.0.0
```

3. **Redéployez :**
   - Allez dans "Deployments"
   - Cliquez sur "Redeploy" sur votre dernier déploiement

### Option 2 : Via la ligne de commande

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Configurer les variables d'environnement
vercel env add NEXT_PUBLIC_API_URL production
# Entrez : https://qencorroezzz.vercel.app/api

vercel env add NEXT_PUBLIC_ADMIN_TITLE production
# Entrez : Panel Admin Qencorroe

vercel env add NEXT_PUBLIC_ADMIN_VERSION production
# Entrez : 1.0.0

# Redéployer
vercel --prod
```

## 🔧 Vérification

Après le déploiement, vérifiez que :

1. **L'API fonctionne :** https://qencorroezzz.vercel.app/api/health
2. **Le panel admin fonctionne :** Votre URL de déploiement

## 🐛 Résolution des problèmes

### Erreur "cret api-url does not exist"

Cette erreur apparaît quand Vercel cherche des secrets qui n'existent pas.

**Solution :**
1. Supprimez les références aux secrets dans `vercel.json`
2. Utilisez directement les URLs dans les variables d'environnement
3. Redéployez

### Variables d'environnement non prises en compte

**Solution :**
1. Vérifiez que les variables commencent par `NEXT_PUBLIC_`
2. Redéployez après avoir ajouté les variables
3. Vérifiez dans les logs de build

## 📱 Test du panel admin

Une fois déployé, testez :

1. **Pages :** Modifiez le contenu de la page d'accueil
2. **Produits :** Ajoutez un nouveau produit
3. **Médias :** Uploadez une image
4. **Réseaux sociaux :** Configurez vos liens
5. **Paramètres :** Changez les couleurs du site

## 🔒 Sécurité

- Les variables `NEXT_PUBLIC_` sont visibles côté client
- Pour les secrets, utilisez les variables d'environnement Vercel
- Configurez CORS correctement pour votre domaine

---

**Votre panel admin sera accessible à :** Votre URL Vercel