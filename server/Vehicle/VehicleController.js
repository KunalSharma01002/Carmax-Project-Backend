const vehicleModel = require("./VehicleModel");

addVehicle = async (req, res) => {
  let validation = [];

  if (!req.body.brandId) validation.push("Brand Id is required!");
  if (!req.body.vehicleName) validation.push("Vehicle name is required!");
  if (!req.body.vehicleType) validation.push("Vehicle type is required!");
  if (!req.body.Variant || req.body.Variant.length === 0)
    validation.push("At least one Variant is required!");
  if (!req.file) validation.push("Image is required!");

  if (validation.length > 0) {
    return res.json({
      success: false,
      status: 422,
      message: validation,
    });
  }

  try {
    let total = await vehicleModel.countDocuments().exec();
    let vehicleObj = new vehicleModel();

    vehicleObj.vehicleId = total + 1;
    vehicleObj.brandId = req.body.brandId;
    vehicleObj.vehicleName = req.body.vehicleName;
    vehicleObj.vehicleType = req.body.vehicleType;
    vehicleObj.Variant = req.body.Variant; // ✅ array from frontend
    vehicleObj.Image = "vehicleImage/" + req.file.filename;

    let vehicleData = await vehicleObj.save();

    res.json({
      status: 200,
      success: true,
      message: "Vehicle added successfully!",
      data: vehicleData,
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};





allVehicle = async (req, res) => {
  try {
    let { currentPage = 0, limit = 0, vehicleType, brandId } = req.body; // ✅ get brandId

    let filter = {};

  
    if (vehicleType && vehicleType !== "") {
      filter.vehicleType = vehicleType;
    }

    if (brandId && brandId !== "") {
      filter.brandId = brandId;
    }
    
    let total = await vehicleModel.countDocuments(filter);

    let data = await vehicleModel
      .find(filter)
      .populate("brandId")
      .skip(currentPage * limit)
      .limit(Number(limit))
      .exec();

    res.json({
      success: true,
      status: 200,
      total,
      data,
    });
  } catch (err) {
    res.json({
      success: false,
      status: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
};




  getSingleVehicle=(req,res)=>{
    let validation=[]
    if(!req.body._id){
        validation.push("_id is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        vehicleModel.findOne({_id:req.body._id})
        .then((vehicleData)=>{
            if(!vehicleData){
                res.json({
                    status:404,
                    success:false,
                    message:"Vehicle not found on given Id"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"vehicle exists",
                    data:vehicleData
                })
            }
        }).catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err
            })
        })
    }
  }
updateVehicle=(req,res)=>{
      let validation=[]
      if(!req.body._id){
        validation.push("_id is Requried")
      }
      if(validation.length>0){
        res.json({
          status:404,
          success:false,
          message:"Validation Error"
        })
      }
      else{
      vehicleModel.findOne({_id:req.body._id})
      .then((vehicleData)=>{
        if(!vehicleData){
         res.json({
          status:404,
          success:false,
          message:"No Vehicle found!"
         })
       }else{
        if(!!req.body.vehicleName){
          vehicleData.vehicleName=req.body.vehicleName 
        }
        if(!!req.file){
          vehicleData.Image=req.body.file
        }
    
        vehicleData.save()
        .then((updateData)=>{
         res.json({
             success:true,
             status:200,
             message:"Vehicle updated!",
             data:updateData
           })
        })
        .catch((err)=>{
          res.json({
             status:500,
             success:false,
             message:"Internal Server error"
           })
         })
       }
     })
      .catch((err)=>{
        res.json({
          status:500,
          success:false,
          message:"Internal Server error"
      })
     })
    }

}
vehicleChangeStatus=(req,res)=>{
  let validation=[]
  if(!req.body._id){
      validation.push("_id is required")
  }
  if(validation.length>0){
      res.json({
          status:422,
          success:false,
          message:validation
      })
  }else{
     vehicleModel.findOne({_id:req.body._id})
     .then((vehicleData)=>{
          if(!vehicleData){
              res.json({
                  status:404,
                  success:false,
                  message:"No vehicle found!"
              })
          }else{
              if(!!req.body.status){
                  vehicleData.status=req.body.status 
              }
             
              vehicleData.save()
              .then((updateData)=>{
                  res.json({
                      success:true,
                      status:200,
                      message:"Vehicle status changed!",
                      data:updateData
                  })
              })
              .catch((err)=>{
                  res.json({
                      status:500,
                      success:false,
                      message:"Internal server error"
                  })
              })
          }
     })
     .catch((err)=>{
      res.json({
          status:500,
          success:false,
          message:"Internal server error"
      })
     })
  }

}
deleteVehicle=(req,res)=>{
    let validation=[]
    if(!req.body._id){
        validation.push("_id is required")
    }
    if(validation.length>0){
        res.status(422).json({
            status:422,
            success:false,
            message:validation
        })
    }else{
       vehicleModel.findOne({_id:req.body._id})
      
       .then((vehicleData)=>{
            if(!vehicleData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Vehicle found!"
                })
            }else{
                vehicleModel.deleteOne({_id:req.body._id})
                .then((deleteData)=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"Deleted successfully",
                        data:deleteData,
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error"
                    })
                })
            }
       })
       .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error"
        })
       })
    }
}

module.exports={addVehicle,allVehicle,getSingleVehicle,updateVehicle,vehicleChangeStatus,deleteVehicle}  