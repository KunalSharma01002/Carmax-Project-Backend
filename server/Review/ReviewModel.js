const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref:"bookingModel", default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"userModel", default: null },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref:"serviceModel", default: null },
    rating: { type:Number, default:0},
    feedback: { type: String, default: "" }
    
})

module.exports = new mongoose.model('reviewModel',reviewSchema)