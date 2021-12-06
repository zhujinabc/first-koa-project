const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')
const {tokenExpiredError, invalidTokenError, hasNotAdminPermission} = require('../constants/err.type')

//认证中间件
const auth = async (ctx, next) => {
    const {authorization} = ctx.request.header
    const token = authorization.replace('Bearer', '')

    try {
        //user中包含了payload中的信息（id, user_name, is_admin）
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (error) {
        switch(error.name){
            case 'TokenExpiredError':
               console.error('token已过期', error) 
               return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效token', error)
                return ctx.app.emit('error', invalidTokenError, ctx)
        }
    }
    await next()
}

//是否授权中间件
const hadAdminPermission = async (ctx, next) => {
    const {is_admin} = ctx.state.user
    if(!is_admin){
        console.error('该用户没有管理员权限', ctx.state.user)
        return ctx.app.emit('error', hasNotAdminPermission , ctx)
    }
    await next()
}

module.exports = {
    auth,
    hadAdminPermission
}