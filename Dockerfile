FROM node:22.19.0-alpine AS builder

RUN npm install -g pnpm@latest-10

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build


FROM node:22.19.0-alpine AS runner

RUN npm install -g pnpm@latest-10

WORKDIR /app

# Copy built app and package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Install vite even if it's a devDependency
RUN pnpm add -D vite

EXPOSE 4173

CMD ["pnpm", "vite", "preview", "--host", "0.0.0.0"]
