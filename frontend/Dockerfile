FROM node:20-slim AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY . .

WORKDIR /app/frontend
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:stable-alpine AS runtime

COPY --from=builder /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
