import koaRoute from 'koa-router'
import ssqRoute from './ssq.js'

const routers = new koaRoute()

// 双色球相关功能
routers.use('/api/ssq', ssqRoute.routes(), ssqRoute.allowedMethods())

export default routers
