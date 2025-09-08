# ---- Build Stage ----
FROM node:22.19.0-alpine AS builder

RUN npm install -g pnpm@latest-10

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ---- Production Stage ----
FROM nginx:alpine AS runner

# Copy built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default nginx config and use simple config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
