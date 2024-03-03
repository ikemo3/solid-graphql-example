#!/bin/bash -eu

npx solidui-cli add "$1"
prettier --write src/shared/ui/"$1".tsx
eslint --fix src/shared/ui/"$1".tsx
