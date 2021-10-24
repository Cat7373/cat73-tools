import koaRoute from 'koa-router'
import ssqController from '../controller/ssq.js'

const routers = new koaRoute()

// 双色球相关功能
routers.get('/random', ssqController.random)

export default routers
