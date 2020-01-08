const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const detailData = require("../models/detail")

// 定义动态路由 中间件爬取数据

module.exports = options => {
    return async function (req, res, next) {
        // 爬取数据
        request({
            method: "GET",
            url: "https://i.y.qq.com/n2/m/share/details/taoge.html",
            qs: {
                ADTAG: "newyqq.taoge",
                id: req.params.id
            }
        }, function (error, response, body) {
            const dom = new JSDOM(body, { runScripts: "dangerously" });
            let songlist = dom.window.firstPageData;
            // 查询是否已存在数据
            detailData.find({
                id: req.params.id
            }).then((data) => {
                console.log(Number(data))
                if (Number(data) === 0) {
                    console.log("此时数据库中无数据");
                    // 存储数据, 并返回数据
                    let finalData = {};
                    finalData.id = req.params.id;
                    // 设置封面
                    finalData.cover = songlist.taogeData.picurl || songlist.taogeData.picurl2;
                    //设置专辑标题, 注意!!! 因为接口的变化,导致这个数据鸡儿出问题了, 哈哈, 有些能正确显示, 有些不能  
                    finalData.title = songlist.taogeData.title;
                    // 预设一个空的数据,存储专辑类型
                    finalData.tag = [];
                    //预设一个空的数据,存储专辑歌曲列表
                    finalData.songlist = [];
                    songlist.taogeData.songlist.forEach(item => {
                        // 预设一个空的数据,存储歌曲列表 
                        let singer = [];
                        item.singer.forEach(singerList => {
                            singer.push(singerList)
                        })
                        // 存储到定义 finalData中
                        finalData.songlist.push(
                            {
                                mid: item.mid,
                                name: item.name,
                                singer: singer
                            }
                        )
                    })
                    // 添加到数据库中 
                    detailData.create(finalData).then(() => {
                        console.log("歌曲详情页数据添加成功")
                    }).catch(() => {
                        console.log("歌曲详情页添加失败")
                    })
                } else {
                    console.log("此时数据库中有数据");
                }
            })
        })

        await next()
    }
}
