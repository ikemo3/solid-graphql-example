FROM node:20.14.0-slim

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev"]
