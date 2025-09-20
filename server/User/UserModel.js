const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userId: { type:Number, default: 0 },
    email:{ type: String, default: "" },
    password:{type:String,default:""},
    userType:{ type: String, default: 2 },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
    
})
module.exports = new mongoose.model('userModel',userSchema)