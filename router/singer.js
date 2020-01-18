const singerData = require("../models/singer")
const request = require("request");
module.exports = async function (req, res) {
    await singerData.find({}, {
        _id: false,
        __v: false
    }).then((data) => {
        res.send(JSON.stringify(data))
    })

}