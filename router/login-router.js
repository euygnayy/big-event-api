/*
  拆解独立的路由模块
*/
const express = require('express')
const path = require('path')

// 导入数据库通用模块
const db = require(path.join(__dirname,'../common.js'))

// 产生一个独立的模块  内置API
// 拆分路由模块 可以将路由添加到router对象上
// 在入口文件中通过app.use方法把router中的路由配置到全局上
const router = express.Router()


// 注册接口
router.post('/reguser',async(req, res) =>{
    // 1.获取表单数据
    var params = req.body

    // 1.1插入数据库之前 添加用户名重复性判断
    let csql = 'select id from myuser where username = ?'
    let flag = await db.operateDb(csql, params.username)
    if(flag && flag.length > 0){
        // 用户名存在
        res.json({
            status:1,
            message:'用户名已经存在'
        })
        return
    }
    
    // 2.把数据插入数据库
    var sql = 'insert into myuse set ?'
    var ret = await db.operateDb(sql,{params})
    // username: params.username,password:params.password
    // 3.返回一个操作结果
    // 告诉前端插入是否成功
    if(ret && ret.affectedRows > 0){
        // 注册成功
        res.json({
            status:0,
            message:'注册成功'
        })
    }else{
        res.json({
            status:1,
            message:'注册失败'
        })
    }
})



// 测试数据库接口
router.get('/test', async (req, res) => {
    // 执行数据库操作
    let sql = 'select * from myuser'
    let ret = await db.operateDb(sql, null)
    // 表示数据要为真 不可以是空字符串 如果是数组 长度要大于0  
    if (ret && ret.length > 0) {
      res.json({
        status: 0,
        message: '查询数据成功',
        data: ret
      })
    } else {
      res.json({
        status: 1,
        message: '查询数据失败'
      })
    }
  })


module.exports = router