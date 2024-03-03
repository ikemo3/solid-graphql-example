#!/bin/sh -eu

# バケットの作成
tsx ./tools/create-bucket.ts "${S3_BUCKET_NAME}"

# データベースの初期化
prisma db push --skip-generate
prisma db seed

# サーバの起動
npm run start
