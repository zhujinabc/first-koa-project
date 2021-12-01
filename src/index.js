//导入node的包
const Koa = require('koa')
//导入三方包

//导入自定义的模块
const {APP_PORT} = require('./config/config.default')
const userRouter = require('./router/user.route')

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


app.listen(APP_PORT,()=>{
    console.log(`server is running on http://localhost:${APP_PORT}`)
})

app.use((ctx, next) => {
    ctx.body = 'hello api'
})