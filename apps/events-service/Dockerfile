FROM node:18-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY package.json ./package.json

COPY apps/events-service/package.json ./apps/events-service/package.json

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/apps/events-service
RUN pnpm run build

EXPOSE 3001

CMD ["pnpm", "run", "start:dev"]
