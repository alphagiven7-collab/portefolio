# portefolio

## Installation et lancement

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Copiez le fichier `.env.example` vers `.env` si vous avez besoin de définir une URL de l’API ou une origine autorisée :
   ```bash
   cp .env.example .env
   ```
3. Pour le développement :
   ```bash
   npm run dev
   ```
4. Pour un déploiement local en production :
   ```bash
   npm run serve
   ```

> Ne pas ouvrir `main.html` directement dans le navigateur : l’application React fonctionne à partir de `http://localhost:4000/` après `npm run serve`.

## Routes

- Frontend : `http://localhost:4000`
- API de contact : `POST http://localhost:4000/api/messages`
- Liste des messages : `GET http://localhost:4000/api/messages`

## Notes

- Le backend sert maintenant l’application React construite avec Vite.
- Les messages de contact sont sauvegardés dans `database.sqlite`.
- `dist/` est ignoré et généré lors du build.


## Backend de stockage des messages

Cette version ajoute un backend Node.js avec SQLite pour enregistrer les messages du formulaire de contact.

### Démarrage

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Lancez le serveur :
   ```bash
   npm start
   ```
3. Assurez-vous que le serveur tourne sur `http://localhost:4000`.

## Déploiement sur GitHub Pages

Le site peut être déployé automatiquement sur GitHub Pages en utilisant le workflow GitHub Actions présent dans `.github/workflows/gh-pages.yml`.

1. Poussez votre branche `main` vers GitHub.
2. Activez GitHub Pages dans les paramètres du dépôt :
   - Source : `gh-pages` branch
   - Dossier : `/`
3. Le workflow va construire le site et publier le dossier `dist/` sur la branche `gh-pages`.

> Note : cette configuration publie uniquement le frontend statique. Le backend Express/SQLite n’est pas hébergé par GitHub Pages.

### Fonctionnement

- Le formulaire de contact de `main.html` envoie les messages à `/api/messages`.
- Les messages sont sauvegardés dans `database.sqlite`.
- Vous pouvez consulter tous les messages via `GET /api/messages`.
