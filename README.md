# solid-graphql-example

[![ROOT](../../actions/workflows/ci-root.yml/badge.svg)](../../actions/workflows/ci-root.yml)
[![backend](../../actions/workflows/ci-backend.yml/badge.svg)](../../actions/workflows/ci-backend.yml)
[![frontend](../../actions/workflows/ci-frontend.yml/badge.svg)](../../actions/workflows/ci-frontend.yml)

## 技術スタック

- アーキテクチャ
  - [Feature-Sliced Design](https://feature-sliced.design/): フロントエンドアーキテクチャ
  - [Dependency Cruiser](https://github.com/sverweij/dependency-cruiser): アーキテクチャ保護
- データベース
  - [PostgreSQL](https://www.postgresql.org/): データベース(SSL対応)
  - [Prisma](https://www.prisma.io/): バックエンドのORM
- ストレージ(S3互換)
  - [Minio](https://min.io/download): ローカル開発用S3互換ストレージ
  - [AWS SDK for JavaScript v3](https://github.com/aws/aws-sdk-js-v3): S3クライアント
- Pub/Sub
  - [Redis](https://redis.io/): メッセージブローカー
  - [ioredis](https://github.com/redis/ioredis): Redisクライアント
- バックエンド
  - [TypeScript](https://www.typescriptlang.org/): バックエンド言語
  - [pnpm](https://pnpm.io/): パッケージマネージャ
  - [Express](https://expressjs.com/): バックエンドフレームワーク
- API(GraphQL)
  - [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server): バックエンドのGraphQLサーバー
  - [Pothos GraphQL](https://pothos-graphql.dev/): バックエンドのGraphQLスキーマ
  - [GraphQL Scalars](https://the-guild.dev/graphql/scalars): カスタムスカラー
  - [GraphQL Code Generator](https://the-guild.dev/graphql/codegen): GraphQLコード生成
  - [GraphQL Armor](https://escape.tech/graphql-armor/): GraphQLの保護
- 認証
  - [Auth0](https://auth0.com/): 認証サービス
  - [auth0-spa-js](https://github.com/auth0/auth0-spa-js): 認証クライアント
- フロントエンド
  - [TypeScript](https://www.typescriptlang.org/): フロントエンド言語
  - [pnpm](https://pnpm.io/): パッケージマネージャ
  - [Vite](https://vitejs.dev/): ビルドツール
- フロントエンドフレームワーク
  - [SolidJS](https://www.solidjs.com/): フロントエンドフレームワーク
  - [generouted](https://github.com/oedotme/generouted): ルーティング
- UIコンポーネントとスタイル
  - [solid-ui](https://www.solid-ui.com/): UIコンポーネント
  - [Tailwind CSS](https://tailwindcss.com/): CSSフレームワーク
- フォーム管理
  - [Felte](https://felte.dev/): フォーム管理ライブラリ
  - [zod](https://zod.dev/): バリデーション
- 開発ツール
  - [VSCode](https://code.visualstudio.com/): IDE
- フォーマッタ、リンタ
  - [ESLint](https://eslint.org/): TypeScriptのリンタ
  - [Prettier](https://prettier.io/): コードフォーマッタ
  - [sort-package-json](https://github.com/keithamus/sort-package-json): package.jsonのソート
  - [CSpell](https://cspell.org/): スペルチェック
- テスト
  - [Vitest](https://vitest.dev/): テストランナー
  - [Testcontainers for NodeJS](https://node.testcontainers.org/): テスト用コンテナ
  - [Solid Testing Library](https://github.com/solidjs/solid-testing-library): テストユーティリティ
- テストカバレッジ
  - [Istanbul](https://istanbul.js.org/): カバレッジ計測
  - [Octocov](https://github.com/k1LoW/octocov): カバレッジレポート
- CI・CD
  - [GitHub Actions](https://docs.github.com/actions): CI・CD
  - [Ansible](https://www.ansible.com/): デプロイ
- インフラ
  - [Docker](https://www.docker.com/): コンテナ
  - [Docker Compose](https://docs.docker.com/compose/): ローカル開発およびデプロイ
  - [Traefik](https://traefik.io/traefik/): リバースプロキシ
  - [Fluentd](https://www.fluentd.org/): ログ収集
