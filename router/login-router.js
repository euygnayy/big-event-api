/*
  拆解独立的路由模块
*/
const express = require('express')
// 产生一个独立的模块  内置API
const router = express.Router()

router.get('/test', (req, res) => {
  res.send('test')
})

router.get('/abc', (req, res) => {
  res.send('abc')
})

module.exports = router