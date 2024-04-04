# Utilisez une image Node.js comme base
FROM node:14

# Créez le répertoire de travail de l'application
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Installez Chromium pour Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Définissez la variable d'environnement pour Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

# Copiez tout le reste des fichiers de l'application
COPY . .

# Démarrez l'application en exécutant le fichier index.js avec node
CMD ["node", "index.js"]
