FROM node:21.6-slim

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev"]
