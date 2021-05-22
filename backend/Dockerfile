FROM node:16.0-buster-slim AS builder
WORKDIR /usr/src/contagem
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

FROM node:16.0-buster-slim
ENV NODE_ENV=production
WORKDIR /contagem
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY --from=builder /usr/src/contagem/dist/ dist/
EXPOSE 4000
CMD ["pm2-runtime","dist/server.js"]
