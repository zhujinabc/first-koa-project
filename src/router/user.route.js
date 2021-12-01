const Router = require('koa-router')

//接口请求处理函数
const {register, login} = require('../controller/user.controller')

const router = new Router({prefix:'/users'})

// 注册接口
router.get('/register',register)
// 登录接口
router.get('/login',login)

//导出router
module.exports = router