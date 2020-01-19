const singerData = require("../models/singerData")
const request = require('request')

module.exports = async function(req,res){
    const singerId = req.params.id  //歌手id
    const songNum = req.query.num   //歌手歌曲的数量
    request({
        method:"GET",
        url:"https://u.y.qq.com/cgi-bin/musicu.fcg",
        qs:{
            _:"getSingerSong6033311761301252",
        g_tk:1168794039,
        format:"json",
        inCharset:"utf8",
        outCharset:"utf-8",
        notice:0,
        platform:"yqq.json",
        needNewCode:0,
        data:`{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"${singerId}","begin":0,"num":${songNum}},"module":"musichall.song_list_server"}}`
        }
    },async function(err,req,body){
        let obj = {} //存储歌手详细信息对象
        const data = JSON.parse(body).singerSongList.data
        obj.singerMid = data.singerMid  //歌手mid
        let songList = [] //歌手的预存歌曲信息
        data.songList.forEach(item => {
            let songObj ={
                songId:item.songInfo.id,     //歌曲id
                songMid:item.songInfo.mid,   //歌曲的mid
                songName:item.songInfo.name, //歌曲的名称
                songTitle:item.songInfo.title, //歌曲的标题
                songSubTitle:item.songInfo.subtitle, //歌曲的副标题
                singer:item.songInfo.singer,    //歌曲歌手信息
                album:item.songInfo.album,     //歌手所属于专辑
                mv:item.songInfo.mv   //歌曲mv
            }
            songList.push(songObj)
        });
        obj.songList = songList
        await singerData.deleteMany({})
        await singerData.create(obj)
        const result = await singerData.find()
        res.send(result)
    })
}   