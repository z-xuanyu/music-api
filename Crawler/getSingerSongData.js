const request = require("request")
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
        data:`{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"001fNHEf1SFEFN","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    }

},function(err,req,body){
    const data = JSON.parse(body).singerSongList.data.songList


    console.log(data)
})