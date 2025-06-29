FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache postgresql-client curl

RUN apk add --no-cache redis

COPY pnpm-lock.yaml ./
COPY package.json ./

COPY apps/fans-service/package.json ./apps/fans-service/package.json

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

WORKDIR /usr/src/app/apps/fans-service
RUN pnpm run build

EXPOSE 3002

CMD ["pnpm", "run", "start:dev"]

