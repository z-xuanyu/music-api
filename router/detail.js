const detailData = require("../models/detail")

module.exports = async function(req,res){
     const data  = await detailData.find()
     res.send(data)
}