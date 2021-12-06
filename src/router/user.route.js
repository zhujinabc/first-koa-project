const Router = require('koa-router')

//接口请求处理函数
const {register, login, changePassword} = require('../controller/user.controller')
const {auth} = require('../middleware/auth.middleware')
const {userValidator, verifyUser, verifyLogin,  cryptPassword} = require('../middleware/user.middleware')

const router = new Router({prefix:'/users'})

// 注册接口
router.get('/register', userValidator, verifyUser, cryptPassword ,register)
// 登录接口
router.get('/login',userValidator, verifyLogin, login)
//修改密码接口
router.patch('/', auth, cryptPassword, changePassword)

//导出router
module.exports = router