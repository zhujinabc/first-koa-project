const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

//创建模型
const User = seq.define('koa_user', {
    //id会被自动创建，自增主键
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment:'是否为管理员， 0不是管理员'
    }
})

//同步模型和数据库，其实就相当于创建一个表
User.sync({
    force: true
})

module.exports = User