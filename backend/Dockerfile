FROM node:21.6-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install

COPY . .

ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN prisma generate --generator client

EXPOSE 3000

ENTRYPOINT ./docker/entrypoint-development.sh
