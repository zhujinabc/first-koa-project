const bcrypt = require('bcryptjs')

const {getUserInfo} = require('../service/user.service')
const {userFormatError, userAlreadyExisted, userNotExist, userLoginFailed, invalidPassword} = require('../constants/err.type')
//参数校验
const userValidator = async (ctx, next) => {
    const {user_name, password} = ctx.request.body
    //参数校验：合法性
    if(!user_name || !password){
        console.error('用户名或密码为空', ctx.request.body)//记录错误信息
        //发送错误信息给前段
        ctx.app.emit('error', userAlreadyExisted, ctx)
        return
    }
    //如果没出现错误就交由下个中间件进行处理
    await next()
}

const verifyUser = async (ctx, next)=>{
    const {user_name}  = ctx.request.body
    //参数校验：合理性
    if(await getUserInfo({user_name})){
        ctx.app.emit('error', userFormatError, ctx)
        return
    }
    await next()
}

//校验登录
const verifyLogin = (ctx, next) => {
    //根据用户名判断是否存在
    try {
        const {user_name, password} = ctx.request.body
        const res = await getUserInfo({user_name})
        if(!res){
            console.error('用户名不存在', {user_name})
            ctx.app.emit('error', userNotExist ,ctx)
            return
        }
        //密码是否匹配
        if(bcrypt.compareSync(password, res.password)){
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (error) {
        console.error(error)
        ctx.app.emit('error', userLoginFailed, ctx)
        return
    }
    
    await next()
}

//加密密码中间件
const cryptPassword = (ctx, next) => {
    const {password} = ctx.request.body
    const salt = bcrypt.genSaltSync(10);
    //hash保存的就是加密后的密码
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash

    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
}