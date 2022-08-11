const mongoose = require("mongoose");


const shortURLSchema = mongoose.Schema({
    fullURL : {
        type: String,
        required:true
    },
    shortURL : {
        type: String,
        required:true,
    },
    click : {
        type: Number,
        required:true,
        default : 0
    }
})

module.exports = mongoose.model("shortURL",shortURLSchema);