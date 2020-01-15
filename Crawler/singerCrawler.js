const request = require("request");
const singerData = require("../models/singer")
request({
    method: "GET",
    url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
    qs: {
        _: "getUCGI0002778148968918259",
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: "json",
        inCharset: "utf8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 0,
        data: `{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}`
    }
}, async function (err, res, body) {
    // 爬取新的数据后先清空数据库再覆盖数据
    await singerData.deleteMany({})
    let singerList = JSON.parse(body).singerList.data.singerlist;
    // 处理爬取的数据
    singerList.forEach((item) => {
        // 把数据添加到数据库中
        singerData.create({
            // 歌手id
            "singer_id": item.singer_id,
            "singer_mid": item.singer_mid,
            "singer_name": item.singer_name,
            "singer_pic": item.singer_pic
        }).then(() => {
            console.log("歌手信息已经添加成功")
        }).catch(() => {
            console.log("歌手信息添加失败")
        })
    })
})