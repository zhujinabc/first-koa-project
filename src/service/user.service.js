const User = require('../model/user.model')

//service层，单独抽离一层处理数据
//sequelize数据 orm数据库工具
//orm：对象关系映射，数据库映射为一个对象
class UserModel {
    async createUser(user_name, password){
        const res = await User.create({
            //表的字段
            user_name,
            password
        })
        return res.dataValues
    }
    async getUserInfo({id, user_name, password, is_admin}){
        const whereOpt = {}

        id && Object.assign(whereOpt, {id})
        user_name && Object.assign(whereOpt, {user_name})
        password && Object.assign(whereOpt, {password})
        is_admin && Object.assign(whereOpt, {is_admin})

        const res =  await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt
        })

        return res ? res.dataValues : ''
    }
}

//将数据层实例化并导出
module.exports = new UserModel()