FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache postgresql-client curl netcat-openbsd
RUN apk add --no-cache redis

COPY pnpm-lock.yaml ./
COPY package.json ./

COPY apps/api-gateway/package.json ./apps/api-gateway/package.json

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

WORKDIR /usr/src/app/apps/api-gateway
RUN pnpm run build

COPY apps/api-gateway/start.sh ./apps/api-gateway/start.sh
RUN chmod +x ./start.sh

EXPOSE 3000

ENTRYPOINT ["./start.sh"]
