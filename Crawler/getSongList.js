const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs")
const path = require("path")
request({
    method: "GET",
    url: "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",
    qs: {
        type: 1,
        json: 'json',
        utf8: 1,
        onlysong: 0,
        ew_format: 1,
        disstid: 7256912512,
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
    referer:"https://y.qq.com/n/yqq/playlist/7256912512.html"
}
},function(err,req,body){
    fs.writeFile(__dirname + "/json/getDate.json",body,{
        encoding:"utf8"
    },(err)=>{
        if(err) throw err
        console.log("写入成功")
    })
})