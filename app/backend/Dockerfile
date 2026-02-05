+++ app/backend/Dockerfile
+FROM node:20-slim AS builder
+
+RUN corepack enable && corepack prepare pnpm@latest --activate
+
+WORKDIR /app
+
+# Monorepo kökünü kopyala
+COPY . .
+
+# Bağımlılık manifestleri (cache için kritik)
+COPY package.json ./
+COPY app/backend/package.json app/backend/
+
+# Eğer pnpm kullanıyorsan:
+# COPY pnpm-lock.yaml ./
+# RUN pnpm install --frozen-lockfile
+
+# Eğer npm kullanıyorsan:
+RUN npm install
+
+WORKDIR /app/app/backend
+RUN npm run build
+
+FROM node:20-slim AS runtime
+
+WORKDIR /app
+
+COPY --from=builder /app/app/backend/dist ./dist
+COPY --from=builder /app/app/backend/package.json ./
+COPY --from=builder /app/node_modules ./node_modules
+
+ENV NODE_ENV=production
+EXPOSE 3000
+
+CMD ["node", "dist/index.js"]
