# Etapa 1: Build de Angular
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:app

# Etapa 2: Servidor NGINX para servir la app
FROM nginx:alpine

COPY --from=build /app/dist/b2b-take-home-app/browser/* /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]