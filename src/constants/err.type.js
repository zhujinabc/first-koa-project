module.exports = {
    userFormatError: {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
    },
    userAlreadyExisted: {
        code: '10002',
        message: '用户信息已存在',
        result: ''
    },
    userRegisterError: {
        code:'10003',
        message: '用户注册错误',
        result: ''
    },
    userNotExist: {
        code:'10004',
        message: '用户不存在',
        result: ''
    },
    userLoginFailed: {
        code:'10005',
        message: '用户登录失败',
        result: ''
    },
    invalidPassword: {
        code:'10006',
        message: '无效密码',
        result: ''
    },
    tokenExpiredError: {
        code:'10101',
        message: 'token已过期',
        result: ''
    },
    invalidTokenError: {
        code:'10102',
        message: '无效token',
        result: ''
    },
    hasNotAdminPermission: {
        code:'10103',
        message: '无管理员权限',
        result: ''
    }
}