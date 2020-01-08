const mongoose = require("mongoose");
const Schema = mongoose.Schema

let detailSchema = new Schema({
    // 方便后期查询数据, 这个id就是这个专区的id
    id: {
        required: true,
        type: String
    },
    //专区的封面信息
    cover: {
        required: true,
        type: String
    },
    //专区标题 
    title: {
        required: true,
        type: String
    },
    //专区的类型 
    tag: [
        {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ],
    //此专区下具体音乐数据 
    songlist: [
        {
            // 音乐的mid
            mid: {
                required: true,
                type: String
            },
            // 歌曲名称
            name: {
                required: true,
                type: String
            },
            // 歌手
            singer: [
                {
                    // 歌手id
                    id: {
                        required: true,
                        type: String
                    },
                    // 歌手mid
                    mid: {
                        required: true,
                        type: String
                    },
                    // 歌手名称 
                    name: {
                        required: true,
                        type: String
                    },
                    // 歌手名称
                    title: {
                        required: true,
                        type: String
                    }
                }
            ]
        }
    ]
})

let detailData = mongoose.model("detailData",detailSchema)
module.exports = detailData