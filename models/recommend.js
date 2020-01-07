const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let recommendShema = new Schema({
    category: {
        required: true,
        type: String
    },
    categoryList: [
        {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            cover: {
                type: String,
                required: true
            }
        }
    ]

})

let recommendDate = mongoose.model("recommendDate", recommendShema);
module.exports = recommendDate