const express = require('express')
const cors = require('cors')
const path = require('path')
const jwt = require('express-jwt');
const app = express()

// 导入路由文件
const loginRouter = require(path.join(__dirname,'router/login-router.js'))
const userRouter = require(path.join(__dirname,'router/user-router.js'))


// 解析token并验证token的合法性 如果解析失败 直接返回错误状态 401没有权限  secret为解密钥匙 
// unless凡是以/app开头的路径不需要验证token的有效性
// 从token中反解出用户id 然后以user属性的方式添加到了req对象中
// req.user = {id：17}
app.use(jwt({ secret: 'bigevent' }).unless({ path: /^\/api/ }));

// 配置跨域
app.use(cors())


// 处理客户端请求post参数
// for parsing application/json
app.use(express.json()) 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

app.listen(8888, () => {
  console.log('running...')
})

// 导入路由模块
// 配置路由模块  api/abc
// app.use函数的参数一表示在路由的前面统一添加一层路径
// app.use函数的参数二表示独立的路由模块
app.use('api',loginRouter)
app.use('/my',userRouter)

// app.get('/data', (req, res) => {
//   res.send('hello')
// })
app.use((err,req,res,next)=>{
  if(err){
    res.status(401).json({
      status:401,
      message:'没有权限获取数据'
    })
  }
})