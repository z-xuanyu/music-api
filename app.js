const mongoose = require("mongoose")
const express = require('express')
const app = express()
// 数据爬取
require("./Crawler/recommendCrawler")
// 数据库连接
mongoose.connect("mongodb://121.42.14.221:27017/music-test", { useUnifiedTopology: true, useNewUrlParser: true }).then(res => {
    console.log("连接成功")
}).catch(res => {
    console.log("连接失败")
})

/***
 * 定义路由
 * 
 * 
 * 
 * */ 

//  监听端口
app.listen(3001, () => {
    console.log(`http://localhost:3001`)
})
// 所有用户名信息路由
app.get("/", require('./router/users'))
// recommend 路由
app.get("/api/recommend",require('./router/recommend'))
