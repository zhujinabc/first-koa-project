const fs = require('fs')
const Router = require('koa-router')

const router = new Router()

//通过index.js自动加载路由
fs.readdirSync(__dirname).forEach((item)=>{
    if(item !== 'index.js'){
        const r = require('./' + item)
        router.use(r.routes())
    }
})

module.exports = router