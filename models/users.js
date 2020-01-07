const mongoose = require("mongoose")
const Schema = mongoose.Schema

let userSchema = new Schema({
    username:{type:String},
    password:{type:String}
})

const Users =  mongoose.model("users",userSchema)

module.exports = Users