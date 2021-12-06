const {createUser} = require('../model/user.model')
const {userRegisterError} = require('../constants/err.type')
class UserController {
    async register(ctx, next){
        try {
            //获取数据
            const {user_name, password} = ctx.request.body
            
            //操作数据库
            const res  = await createUser(user_name, password)

            //返回结果
            ctx.body = {
                code:0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch (error) {
            console.log(error)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    };
    async login(ctx, next){
        ctx.body = '用户登录成功'
    }
}

module.exports = new UserController()