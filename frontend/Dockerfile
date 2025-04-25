# Étape 1 : Construire le frontend
FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Construire les fichiers statiques
RUN npm run build


FROM caddy:2.7.4-alpine

COPY --from=builder /app/dist /usr/share/caddy

COPY Caddyfile /etc/caddy/Caddyfile

# Exposer le port 80
EXPOSE 80

# Démarrer Caddy 
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
