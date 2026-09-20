# ------ stage 1: Dependencies --------
FROM node:24-alpine AS dependencies

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile


# ------ stage 2: Production dependencies --------
FROM node:24-alpine AS production-dependencies

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile


# ------ stage 3: Runtime --------
FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=production-dependencies /app/node_modules ./node_modules

COPY package.json ./

COPY src ./src

EXPOSE 4000

CMD [ "node", "src/server.js" ]