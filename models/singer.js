const mongoose = require("mongoose")
const Schema = mongoose.Schema

let singerSchema = new Schema({
    "singer_id":String,
    "singer_mid":String,
    "singer_name":String,
    "singer_pic":String
})

let singer = mongoose.model("singer",singerSchema)
module.exports = singer