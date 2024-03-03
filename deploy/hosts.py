#!/usr/bin/env python3

import json
import os

# 環境変数からホスト情報を取得
ansible_host = os.environ.get('ANSIBLE_HOST')
ansible_user = os.environ.get('ANSIBLE_USER')

# 動的インベントリデータ
inventory_data = {
    "all": {
        "children": [
            "ungrouped"
        ]
    },
    "ungrouped": {
        "hosts": [
            "compute"
        ]
    },
    "_meta": {
        "hostvars": {
            "compute": {
                "ansible_host": ansible_host,
                "ansible_user": ansible_user,
            }
        }
    }
}

# インベントリデータをJSON形式で出力
print(json.dumps(inventory_data, indent=4))
