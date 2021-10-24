import Koa from 'koa'
import koaConvert from 'koa-convert'
import koaLogger from 'koa-logger'

import config from './config.js'
import routers from './routers/index.js'

// 创建 Koa 主实例
const app = new Koa()

// 配置控制台日志中间件
app.use(koaConvert(koaLogger()))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)
