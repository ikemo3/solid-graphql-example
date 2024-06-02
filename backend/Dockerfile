# ベースイメージをビルド段階で使用
FROM node:20.14.0-slim

# OpenSSLのインストール
RUN apt-get update -y && apt-get install -y openssl

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# pnpmを有効にして依存関係をインストール
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install

# アプリケーションのソースコードをコピー
COPY . .

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Prismaクライアントの生成
RUN prisma generate --generator client

# コンテナがリッスンするポートを指定
EXPOSE 3000

# コンテナ起動時に実行されるスクリプトを設定
ENTRYPOINT ./docker/entrypoint.sh
