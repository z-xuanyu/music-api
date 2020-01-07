const recommendDate = require("../models/recommend")

module.exports = async function (req, res) {
    const data = await recommendDate.find({}, {
        __v: false,
        _id: false
    })
    res.send(data)
}