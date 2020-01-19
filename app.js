const mongoose = require("mongoose")
const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
//处理前段传过来的数据
app.use(bodyParser.json())
// 解决跨域问题 
app.use(cors())
// 数据爬取
require("./Crawler/recommendCrawler")
require("./Crawler/singerCrawler")
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
// 首页信息路由
app.get("/", function(req,res){
    res.send({
        code:200,
        msg:"QQ音乐aip接口",
        desc:"接口使用文档访问:https://www.zhouxuanyu.com",
        auther:"轩钰：QQ/微信 969718197"
    })
})
// recommend  歌曲推荐页路由
app.get("/api/recommend", require('./router/recommend'))
// singer 歌手列表 路由
app.get("/api/singer",require('./router/singer'))
// 获取歌单歌曲数据列表路由 
app.get("/api/songlist/:id",require('./router/songlist'))
// 歌手详情页api 路由
app.get("/api/singerdata/:id",require('./router/singerData'))