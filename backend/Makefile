.PHONY: usage

usage:
	@echo "Usage: make [target]"
	@echo ""
	@echo "ターゲット一覧:"
	@echo "  install-deps - ライブラリをインストールする"
	@echo "  lint         - Lintを実行する"
	@echo "  test         - テストを実行する"

install-deps:
	pnpm install

lint:
	# Prismaのコードを生成する必要がある
	pnpm codegen:prisma
	pnpm lint

test:
	pnpm coverage
