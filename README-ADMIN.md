# Panel Administrateur - Boutique Qencorroe

Un panel administrateur simple et fonctionnel pour gérer tout le contenu de votre boutique.

## 🚀 Démarrage rapide

1. **Démarrer les services :**
```bash
./start-simple.sh
```

2. **Accéder au panel admin :**
   - Ouvrez votre navigateur
   - Allez sur : http://localhost:3001

## 📋 Fonctionnalités

### 1. **Pages** 📄
- Modifier le contenu de la page d'accueil
- Modifier le contenu de la page "À propos"
- Modifier les informations de contact
- Changer les titres, descriptions et textes

### 2. **Produits** 🛍️
- Ajouter de nouveaux produits
- Modifier les informations des produits existants
- Gérer les images et vidéos des produits
- Ajouter des descriptions détaillées
- Gérer les caractéristiques et spécifications

### 3. **Médias** 📸
- Upload d'images et vidéos depuis votre téléphone
- Glisser-déposer pour upload facile
- Visualiser et copier les URLs des médias
- Gérer tous vos fichiers en un endroit

### 4. **Réseaux sociaux** 🌐
- Configurer les liens vers vos réseaux sociaux
- Facebook, Instagram, Twitter, LinkedIn, YouTube, TikTok, Snapchat
- Aperçu en temps réel des liens
- Copier les URLs facilement

### 5. **Paramètres** ⚙️
- Modifier le nom et la description du site
- Changer les couleurs du site
- Configurer le logo et favicon
- Optimiser le SEO (titre, description, mots-clés)
- Personnaliser le footer

## 📱 Utilisation mobile

Le panel admin est entièrement responsive et fonctionne parfaitement sur mobile :

- **Upload depuis votre téléphone :** Prenez des photos/vidéos et uploadez-les directement
- **Interface tactile :** Boutons et formulaires optimisés pour le tactile
- **Navigation simple :** Menu latéral accessible sur mobile

## 🔧 Utilisation

### Modifier une page
1. Cliquez sur "Pages" dans le menu
2. Cliquez sur "Modifier" pour la page souhaitée
3. Modifiez les champs
4. Cliquez sur "Sauvegarder"

### Ajouter un produit
1. Cliquez sur "Produits" dans le menu
2. Cliquez sur "Ajouter un produit"
3. Remplissez les informations
4. Ajoutez des images/vidéos via la section "Médias"
5. Cliquez sur "Ajouter"

### Upload de médias
1. Cliquez sur "Médias" dans le menu
2. Glissez-déposez vos fichiers ou cliquez pour sélectionner
3. Les fichiers sont automatiquement uploadés
4. Copiez l'URL pour l'utiliser dans vos produits

### Configurer les réseaux sociaux
1. Cliquez sur "Réseaux sociaux" dans le menu
2. Ajoutez les URLs de vos comptes
3. Cliquez sur "Sauvegarder"

## 🎨 Personnalisation

### Couleurs du site
- Allez dans "Paramètres"
- Utilisez les sélecteurs de couleur pour changer les couleurs
- Les changements s'appliquent immédiatement

### SEO
- Configurez le titre SEO de votre site
- Ajoutez une description pour les moteurs de recherche
- Définissez les mots-clés importants

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifiez que les services sont démarrés :**
   - API : http://localhost:3000/api/health
   - Panel admin : http://localhost:3001

2. **Redémarrez les services :**
   ```bash
   ./start-simple.sh
   ```

3. **Vérifiez les logs dans le terminal**

## 🔒 Sécurité

- Le panel admin est protégé par CORS
- Upload de fichiers sécurisé avec validation
- Rate limiting pour éviter les abus
- Validation des données côté serveur

## 🚀 Déploiement

Pour déployer en production :

1. Configurez les variables d'environnement
2. Utilisez une vraie base de données
3. Configurez HTTPS
4. Mettez en place l'authentification

---

**Panel Admin Qencorroe** - Simple, fonctionnel, mobile-friendly ✨