const request = require("request")
const recommendDate = require("../models/recommend")

module.exports = request({
    method: "GET",
    url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
    headers: {
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
    },
    qs: {
        cgiKey: "GetHomePage",
        _: "1578423143403",
        data: `{"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}`
    }
}, async (err, req, body) => {
    await recommendDate.deleteMany({}) //爬取新的数据后先清空数据库再覆盖数据
    // 处理爬取过来新数据
    let data = JSON.parse(body).MusicHallHomePage.data.v_shelf;
    data.forEach(item => {
        let category = item.title_template; //分类名
        let categoryList = item.v_niche[0].v_card; //分类下列表数据
        let arr = []
        categoryList.forEach(list => {
            if (list.time) {
                arr.push({
                    id: list.time,
                    title: list.title,
                    cover: list.cover
                })
            } else {
                arr.push({
                    id: list.id,
                    title: list.title,
                    cover: list.cover
                })
            }
        })
        // 数据存储到数据库
        recommendDate.create({
            category: category,
            categoryList: arr
        }).then(() => {
            console.log("数据库存储成功")
        }).catch(() => {
            console.log("数据库存储失败")
        })
    })
})