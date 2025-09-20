const mongoose = require("mongoose")

const vehicleSchema = mongoose.Schema({
    vehicleId: { type:Number, default: 0 },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref:"brandModel", default: null,required: true },
    vehicleName: { type: String, default: "" },
    vehicleType: {
    type: String,
    enum: ["SUV", "Sedan", "Hatchback", "MPVs","Van","Electric"], 
    required: true,
  },
    Image : {type: String,default: "no-pic.jpg"},
    status: { type:Boolean , default: true},
    createdAt: { type: Date, default: Date.now() }
})
 
module.exports = new mongoose.model('vehicleModel',vehicleSchema)