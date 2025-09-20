const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    customerId: { type: Number, default: 0 },
    address:{ type: String, default: "" },
    contact:{type:Number, default:""},
    pincode: { type: Number, default: null },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
    
})

module.exports = new mongoose.model('customerModel',customerSchema)