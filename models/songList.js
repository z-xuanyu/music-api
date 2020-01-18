const mongoose = require("mongoose")
const Schema = mongoose.Schema

let songListSchema = new Schema({
    title:{type:String},
    pic:{type:String},
    desc:{type:String},
    avatar:{type:String},
    nickname:{type:String},
    tags:[{
        id:{type:Number},
        name:{type:String},
        pid:{type:Number}
    }],
    songlist:[{
        albumid:{type:String},
        albummid:{type:String},
        albumname:{type:String},
        singer:[{
            id:{type:Number},
            mid:{type:String},
            name:{type:String}
        }],
        songid:{type:Number},
        songmid:{type:String},
        songname:{type:String},
    }]
})

const songListData = mongoose.model("songlist",songListSchema)

module.exports = songListData