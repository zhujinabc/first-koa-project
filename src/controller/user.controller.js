const jwt = require('jsonwebtoken')

const {createUser} = require('../model/user.model')
const {userRegisterError} = require('../constants/err.type')
const { getUserInfo, updateById } = require('../service/user.service')


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
        const {user_name} = ctx.request.body
        //获取用户信息(token的payload中要记录id，user_name, is_admin)
        try {
            const {password, ...res} = await getUserInfo({user_name})
            const {JWT_SECRET} = process.env
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(
                        res,
                        JWT_SECRET,
                        {
                            expiresIn: '1d'
                        }
                    )
                }
            }
        } catch (error) {
            console.error('用户登录失败', error)
            ctx.app.emit('error', userLoginFailed, ctx)
        }
    }

    async changePassword(ctx, next){
        //获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password

        //操作数据库
        try {
            const res = await updateById({id, password})
            if(res){
                ctx.body = {
                    code:0,
                    message:'修改密码成功',
                    result:''
                }
            }else{
                ctx.body = {
                    code:'10007',
                    message:'修改密码失败',
                    result:''
                }
            }
        } catch (error) {
            ctx.body = {
                code:'10007',
                message:'修改密码失败',
                result:''
            }
        }
        //返回数据
    }
}

module.exports = new UserController()