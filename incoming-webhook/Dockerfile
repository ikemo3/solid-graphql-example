FROM node:21.6-slim

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install

COPY . .

ENV PATH /usr/src/app/node_modules/.bin:$PATH

EXPOSE 3000

ENTRYPOINT ./docker/entrypoint.sh
