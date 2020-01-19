const mongoose = require("mongoose")
const Schema = mongoose.Schema

let singerDataSchema = new Schema({
    singerMid:{type:String},
    songList:[{
        songId:{type:Number},
        songMid:{type:String},
        songName:{type:String},
        songTitle:{type:String},
        songSubTitle:{type:String},
        singer:[{
            id:{type:Number},
            mid:{type:String},
            name:{type:String},
            title:{type:String},
            type:{type:Number},
            uin:{type:Number}
        }],
        album:[{
            id:{type:Number},
            mid:{type:String},
            name:{type:String},
            title:{type:String},
            subtitle:{type:String},
            time_public:{type:String},
            pmid:{type:String}
        }],
        mv:[{
            id:{type:Number},
            vid:{type:String},
            name:{type:String},
            title:{type:String},
            vt:{type:Number}
        }],
    }]
})

const singerData = mongoose.model("singerData",singerDataSchema)

module.exports = singerData