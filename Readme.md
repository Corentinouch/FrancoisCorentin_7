# Groupomania

P7-Groupomania : un projet React.js
Ce projet constitue un réseau social de l'entreprise Groupomania. Il permet à chaque utilisateur disposant d'un compte de poster des messages avec support multimédia. Chaque utilisateur visualise tous les posts. Les utilisateurs peuvent liker les posts, modifier leurs posts et supprimer leurs posts.
L'admin peux faire toutes ces actions sur tous les posts.

La structure
Le projet est constitué de deux dossiers :
-backend
-frontend("groupomania")

La base de données
Il s'agit d'une base de données relationnelle sql

Le frontend
Utilisation du framework React.js. Le projet fonctionne avec React-router pour la navigation.

Installation
Clôner le dépôt git

Installation de la base de données
Connexion avec ces paramètres:
host: 'localhost',
user: 'root',
database: 'groupomania'


Télécharger, installer et configurer un serveur mysql (Utilisation de DBeaver pour ma part)

Installation du backend
Dans le dossier backend, installer npm et les dépendences avec la commande :

npm install

Puis, installer le serveur nodemon avec :

npm install nodemon

Créer un base de données sql :

Ajouter le fichier .sql à votre BDD

Installation du frontend
Dans le dossier frontend, installer les dependences avec la commande :

npm install

Lancement de l'application

Démarrer le frontend
Dans le dossier groupomania, saisir la commande :

npm start

Cliquer sur un des deux liens pour accéder à l'application

- Local:   http://localhost:3000/ 
- Network: http://192.168.1.15:3000/


Démarrer le backend
Dans le dossier frontend, saisir la commande

nodemon app


Affichage de : "Listening on port 3001"