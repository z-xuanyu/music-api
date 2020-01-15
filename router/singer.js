const singerData = require("../models/singer")

module.exports = async function (req, res) {
    await singerData.find({}, {
        _id: false,
        __v: false
    }).then((data) => {
        res.send(JSON.stringify(data))
    })

}