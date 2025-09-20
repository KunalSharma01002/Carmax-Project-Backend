const mongoose = require("mongoose")

const  bookingSchema =mongoose.Schema({

    bookingId: { type:Number, default: 0 },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref:"vehicleModel", default: null },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref:"serviceModel", default: null },
    cost : { type: Number, default: 0 },
    address:{ type: String, default: null },
    date:{type:String ,default:""},
    time :{ type: String, default: ""},
    status: { type: Number, default: 1 },
    //1 pending,2 approve,3 decline,4 completed,5 cancel
    createdAt: { type: Date, default: Date.now() }

})

module.exports= new mongoose.model('bookingModel',bookingSchema)