const { ne } = require("sequelize/dist/lib/operators")

//参数校验
const userValidator = async (ctx, next) => {
    const {user_name, password} = ctx.request.body
    //参数校验：合法性
    if(!user_name || !password){
        console.error('用户名或密码为空', ctx.request.body)//记录错误信息
        ctx.status = 400,
        ctx.body = {
            code: '10001',
            message: '用户名或密码为空',
            result: ''
        }
        return
    }
    //如果没出现错误就交由下个中间件进行处理
    await next()
}

module.exports = {
    userValidator
}