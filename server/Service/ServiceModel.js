const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema({
   
    serviceId: { type: Number , default: 0 },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref:"vehicleModel", default: null,required: true },
    serviceName: { type: String, default: "" },
    serviceCategory: {
    type: String,
    enum: ["Car Services", "Denting Painting", "Mechanical Repairs", "Car AC Services","Car Cleaning"], 
    required: true,
    },
     variant: { 
    type: String,
    enum: ["Petrol", "Diesel", "CNG"],
    required: true,  // ✅ this links to vehicle variant
    },
    Image : {type: String,default: "no-pic.jpg"},
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    additionalInformation:{ type: String, default: ""},
    status: { type:Boolean , default: true},
    createdAt: { type: Date, default: Date.now() },
  
     


})

module.exports = new mongoose.model('serviceModel',serviceSchema)