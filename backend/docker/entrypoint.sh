#!/bin/sh -eu

# バケットの作成(developmentのみ)
if [ "${NODE_ENV}" = "development" ]; then
  tsx ./tools/create-bucket.ts "${S3_BUCKET_NAME}"
fi

# データベースの初期化
prisma db push --skip-generate
prisma db seed

# サーバの起動
npm run start
