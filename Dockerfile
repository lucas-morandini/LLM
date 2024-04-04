# Utilisez une image Node.js comme base
FROM node:14

# Créez le répertoire de travail de l'application
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tout le reste des fichiers de l'application
COPY . .

# Démarrez l'application en exécutant le fichier index.js
CMD ["node", "index.js"]
