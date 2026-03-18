# Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Telepítjük a függőségeket
COPY package*.json .
RUN npm ci

# Másoljuk a kódot és buildelünk
COPY . .
RUN npm run build

# Runtime stage
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/index.js"]
