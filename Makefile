.PHONY: deploy

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "ターゲット一覧:"
	@echo "  deploy       - アプリケーションをデプロイする"
	@echo "  install-deps - ライブラリをインストールする"
	@echo "  ci           - CIで実行されるコマンドを実行する"

deploy:
	@echo "Deploying application"
	cd deploy && ansible-playbook deploy.yml

deploy-dry-run:
	@echo "Dry run deploying application"
	cd deploy && ansible-playbook deploy.yml --check

install-deps:
	pnpm install

ci:
	pnpm lint
