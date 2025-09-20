const ServiceModel = require("../Service/ServiceModel")
const UserModel = require("../User/UserModel")
const VehicleModel = require("../Vehicle/VehicleModel")

dashBoard= async(req,res)=>{

    let serviceTotal=await ServiceModel.countDocuments().exec()
    let vehicleTotal=await VehicleModel.countDocuments().exec()
    let userTotal=await UserModel.countDocuments().exec()
    UserModel.find().sort({createdAt:-1}).limit(5)

    .then((userData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded",
            totalservice:serviceTotal,
            totalvehicle:vehicleTotal,
            totaluser:userTotal,
            data:userData

        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            error:err
        })
    })
}
module.exports={dashBoard}