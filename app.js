const mongoose = require("mongoose")
const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(bodyParser.json())
// 解决跨域问题 
app.use(cors())
// 数据爬取
require("./Crawler/recommendCrawler")
require("./Crawler/detailCrawler")
const detail = require("./Crawler/detailCrawler")
require("./Crawler/singerCrawler")
const { getLyric } = require("./Crawler/lyricCrawler")
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
// recommend  歌曲推荐页路由
app.get("/api/recommend", require('./router/recommend'))
// detail  歌曲详情页 路由
app.use("/api/detail/:id", detail(), require('./router/detail'))
// singer 歌手列表 路由
app.get("/api/singer",require('./router/singer'))
// 获取歌词
app.post("/api/lyric",getLyric)
// 获取歌单歌曲数据列表路由 
app.get("/api/songlist/:id",require('./router/songlist'))