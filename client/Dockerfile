# ------ stage 1: Build --------
FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_GRAPHQL_API_URL
ENV VITE_GRAPHQL_API_URL=$VITE_GRAPHQL_API_URL

RUN pnpm build


# ------ stage 2: Runtime --------
FROM nginx:alpine
    
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]