const Router = require('koa-router')

const router = new Router({prefix:'/users'})

// get请求，请求/users/
router.get('/',(ctx, next)=>{
    ctx.body = 'hello users'
})

//导出router
module.exports = router