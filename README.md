# Cat73-Tools
二喵的小工具们

## 功能列表
| 名称 | 子功能 | 说明 |
| ---- | ------ | ---- |
| TODO | TODO | TODO |

## 运行
### 服务端
> 项目在 service 目录

#### 环境准备
```sh
pnpm i
```

#### 运行
```sh
pnpm run start
```

### 前端
> 项目在 ui 目录

#### 环境准备
```sh
pnpm i
```

#### 运行
```sh
pnpm run serve
```

## 部署
### 服务端
参照运行中的教程启动即可，用 nohup 或 screen 保持运行

### 前端
```sh
pnpm run build
```

### 反代
建议使用 Nginx 进行反代，将服务端和前端统一到一个端口，配置参考:

```conf
server	{
    listen 80;

    root /var/www/cat73-tools;

    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    client_max_body_size 10M;
}
```

## TODO
* 前端项目
* Nginx 配置的前端 Url 重写规则
* 定时任务支持
* 数据库支持
* 随机双色球号码并分析
