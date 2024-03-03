#!/bin/bash -eu

# 証明書は root もしくは postgres ユーザーが所有している必要がある
cp /etc/server.crt /var/lib/postgresql/server.crt
chmod 0600 /var/lib/postgresql/server.crt
chown postgres:postgres /var/lib/postgresql/server.crt

cp /etc/server.key /var/lib/postgresql/server.key
chmod 0600 /var/lib/postgresql/server.key
chown postgres:postgres /var/lib/postgresql/server.key

# 元の entrypoint.sh をSSL対応オプションをつけて実行
/usr/local/bin/docker-entrypoint.sh \
  -c ssl=on \
  -c ssl_cert_file=/var/lib/postgresql/server.crt \
  -c ssl_key_file=/var/lib/postgresql/server.key
