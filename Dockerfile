# ── Stage 1: Build React frontend ──────────────────────────────
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ── Stage 2: Production server ─────────────────────────────────
FROM node:18
WORKDIR /app

# Install build tools for better-sqlite3
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY backend/package*.json ./
RUN npm install --omit=dev

COPY backend/ .
COPY --from=frontend-build /app/frontend/build ./public

ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"]