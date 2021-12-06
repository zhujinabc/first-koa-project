//导入node的包
const Koa = require('koa')
const koaBody = require('koa-body')
//引入自定义的包
const userRouter = require('../router/user.route')
const errHandler = require('./errHandler')


const app = new Koa()//创建一个koa app
// const router = new Router()//实例化一个router对象
// const userRouter = new Router()//实例化一个user路由

// router.get('/', (ctx, next)=>{
//     ctx.body = '/'
// })
// userRouter.get('/user', (ctx, next)=>{
//     ctx.body = 'user'
// })


//注册koa-body
app.use(koaBody())
//注册路由到中间件
// app.use(router.routes())
app.use(userRouter.routes())

//统一的错误处理
app.on('error', errHandler)

module.exports = app