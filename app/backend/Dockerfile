FROM node:20-slim AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY . .

WORKDIR /app/app/backend
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM node:20-slim AS runtime

WORKDIR /app

COPY --from=builder /app/app/backend/dist ./dist
COPY --from=builder /app/app/backend/package.json ./
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
