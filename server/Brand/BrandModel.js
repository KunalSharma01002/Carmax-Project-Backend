const mongoose = require("mongoose")

const brandSchema = mongoose.Schema({
    brandId: { type:Number, default: 0 },
    brandName: { type: String, default: "" },
    Logo : {type: String,default: "no-pic.jpg"},
    status: { type:Boolean , default: true},
    createdAt: { type: Date, default: Date.now() }
})

module.exports = new mongoose.model('brandModel',brandSchema)