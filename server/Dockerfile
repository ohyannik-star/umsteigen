# Baut den Umsteigen-Server. Build-Kontext ist der Projektordner, damit die App-Inhalte (Kategorien, Techniken, Argumente) mit ins Image kommen.
FROM node:24-alpine
WORKDIR /srv
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --omit=dev && npm cache clean --force
COPY server/src ./server/src
COPY app/data/techniken.js app/data/argumente.js ./app/data/
RUN mkdir /data && chown node:node /data
USER node
ENV NODE_ENV=production PORT=8787 DATA_DIR=/data APP_DATA_DIR=/srv/app/data
VOLUME /data
EXPOSE 8787
HEALTHCHECK --interval=60s --timeout=5s CMD wget -qO- http://127.0.0.1:8787/api/status || exit 1
CMD ["node", "server/src/server.js"]
