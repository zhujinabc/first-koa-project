const {createUser, getUserInfo} = require('../model/user.model')
class UserController {
    async register(ctx, next){
        ctx.body = '用户注册成功'
        //获取数据
        const {user_name, password} = ctx.request.body
        //参数校验：合理性
        if(getUserInfo({user_name})){
            ctx.status = 409,//409：conflict冲突
            ctx.body = {
                code: '10002',
                message: '用户已经存在',
                result: ''
            }
            return
        }
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
    };
    async login(ctx, next){
        ctx.body = '用户登录成功'
    }
}

module.exports = new UserController()