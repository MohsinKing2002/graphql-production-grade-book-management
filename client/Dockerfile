FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_GRAPHQL_API_URL
ENV VITE_GRAPHQL_API_URL=$VITE_GRAPHQL_API_URL

RUN pnpm build

RUN apk add --no-cache nginx

RUN mkdir -p /run/nginx

COPY nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]