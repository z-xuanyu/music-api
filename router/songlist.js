const songListData = require("../models/songList")
const request = require("request");
module.exports = async function (req, res) {
    const songListId = req.params.id
    request({
        method: "GET",
        url: "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",
        qs: {
            type: 1,
            json: 'json',
            utf8: 1,
            onlysong: 0,
            ew_format: 1,
            disstid: songListId,
            g_tk: 5381,
            format: "json",
            inCharset: "utf8",
            outCharset: "utf-8",
            notice: 0,
            platform: "yqq.json",
            needNewCod: 0
        },
        headers:{
        "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
        referer:`https://y.qq.com/n/yqq/playlist/${songListId}.html`
    }
    }, async function(err,req,body){
        const data = JSON.parse(body).cdlist[0]
        let obj = {} //预存歌单列表数据对象
        obj.title = data.dissname   //歌单标题
        obj.pic = data.logo         //歌单图片
        obj.desc = data.desc        //歌单描述
        obj.avatar = data.headurl   //歌单用户头像
        obj.nickname = data.nickname //歌单作者昵称
        obj.tags = data.tags         //歌单类型tag
    
        let songListArr = []        //预存歌单列表数据
    
        data.songlist.forEach(item => {
            let songObj = {
                albumid:item.albumid,
                albummid:item.albummid,
                albumname:item.albumname,
                singer:item.singer,
                songmid:item.songmid,
                songname:item.songname,
            }
            songListArr.push(songObj)
        });
        obj.songlist = songListArr
        await songListData.deleteMany({})
        await songListData.create(obj).then(()=>{
            console.log("歌单列表数据已经添加到数据库")
        }).catch(()=>{
            console.log("歌单数据添加失败")
        })
        const songData = await songListData.find({})
        res.send(songData)
    })
}