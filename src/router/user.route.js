const Router = require('koa-router')

//接口请求处理函数
const {register, login} = require('../controller/user.controller')
const {userValidator, verifyUser, verifyLogin,  cryptPassword} = require('../middleware/user.middleware')

const router = new Router({prefix:'/users'})

// 注册接口
router.get('/register', userValidator, verifyUser, cryptPassword ,register)
// 登录接口
router.get('/login',userValidator, verifyLogin, login)

//导出router
module.exports = router