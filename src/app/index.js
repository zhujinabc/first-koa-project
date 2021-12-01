//导入node的包
const Koa = require('koa')
//引入自定义的包
const userRouter = require('../router/user.route')

const app = new Koa()//创建一个koa app
// const router = new Router()//实例化一个router对象
// const userRouter = new Router()//实例化一个user路由

// router.get('/', (ctx, next)=>{
//     ctx.body = '/'
// })
// userRouter.get('/user', (ctx, next)=>{
//     ctx.body = 'user'
// })

//注册路由到中间件
// app.use(router.routes())
app.use(userRouter.routes())

module.exports = app