const serviceModel=require("./ServiceModel")

addService=(req,res)=>{
    var validation=[]
     if(!req.body.vehicleId){
        validation.push("Vehicle ID is Requried!")
    }
    if (!req.body.serviceName){
        validation.push("Service Name is Requried!")
      }
    
    if(!req.file){
        validation.push("Image is required!") 
     }
    if(!req.body.description){
        validation.push("Description is Required!")
      }
    if(!req.body.serviceCategory){
        validation.push("Service Category is required!")
      }
    if(!req.body.price){
        validation.push("Price is Required!")
      }
   
    if(!req.body.additionalInformation){
        validation.push("Additional Information is requried!")
      }
  


    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            Message:"validationerror",
            error:validation
        })
    }
    else{
        serviceModel.findOne({serviceName:req.body.serviceName})
        .then(async(serviceData)=>{
            if(!serviceData){
                let total=await serviceModel.countDocuments().exec()      
                let serviceObj = new serviceModel()
                serviceObj.serviceId=total+1;
                serviceObj.vehicleId = req.body.vehicleId;
                serviceObj.serviceName=req.body.serviceName;
                serviceObj.description=req.body.description;
                serviceObj.serviceCategory=req.body.serviceCategory;
                serviceObj.price=Number(req.body.price);
                serviceObj.additionalInformation=req.body.additionalInformation;
                serviceObj.Image="serviceImage/"+req.file.filename;
                serviceObj.save()
                .then((serviceData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Service Add Successfully ",
                        data:serviceData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err.message  
                    })
                })
            }
            else{
                res.json({
                  status:200,
                  success:false,
                  message:"Service already exists with same name",
                  data:serviceData
                 })
                }
            
        })

    }
    
}

allService = async (req, res) => {
  try {
    let { serviceName, status, vehicleId, limit, currentPage } = req.body;

    // Build filter object dynamically
    let filter = {};
    if (serviceName) filter.serviceName = serviceName;
    if (status) filter.status = status;
    if (vehicleId) filter.vehicleId = vehicleId;  // 👈 filter by vehicleId

    limit = parseInt(limit) || 0;
    currentPage = parseInt(currentPage) || 0;

    // Count total matching documents
    let total = await serviceModel.countDocuments(filter).exec();

    // Fetch services with filter + pagination
    let serviceData = await serviceModel
      .find(filter)
      .sort({ createdAt: -1 })
      .populate("vehicleId")
      .limit(limit)
      .skip(currentPage * limit);

    if (serviceData.length > 0) {
      res.json({
        status: 200,
        success: true,
        message: "Services fetched successfully",
        total: total,
        data: serviceData,
      });
    } else {
      res.json({
        status: 200,
        success: false,
        message: "No services found",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "Error in Server",
      data: err.message,
    });
  }
};

getSingleService=(req,res)=>{
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
      serviceModel.findOne({_id:req.body._id})
      .then((serviceData)=>{
          if(!serviceData){
              res.json({
                  status:404,
                  success:false,
                  message:"Service not found on given Id"
              })
          }else{
              res.json({
                  status:200,
                  success:true,
                  message:"Service exists",
                  data:serviceData
              })
          }
      }).catch((err)=>{
          res.json({
              status:500,
              success:false,
              message:"Internal server error"
          })
      })
  }
}
updateService=(req,res)=>{
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
     serviceModel.findOne({_id:req.body._id})
     .then((serviceData)=>{
          if(!serviceData){
              res.json({
                  status:404,
                  success:false,
                  message:"No service found!"
              })
          }else{
            if (!!req.body.serviceName){
              serviceData.serviceName=req.body.serviceName 
            }
          if(!!req.body.description){
            serviceData.description=req.body.description 
            }
          if(!!req.body.price){
            serviceData.price=req.body.price 
            }
          if(!!req.body.time){
            serviceData.time=req.body.time 
            }
          if(!!req.body.additionalInformation){
            serviceData.additionalInformation=req.body.additionalInformation 
            }
            if(!!req.body.rating){
              serviceData.rating=req.body.rating
              }
          if(!!req.body.vehicleTypeId){
            serviceData.vehicleTypeId=req.body.vehicleTypeId 
          }
              serviceData.save()
              .then((updateData)=>{
                  res.json({
                      success:true,
                      status:200,
                      message:"Service updated!",
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
deleteService=(req,res)=>{
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
       serviceModel.findOne({_id:req.body._id})
      
       .then((serviceData)=>{
            if(!serviceData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Service found!"
                })
            }else{
                serviceModel.deleteOne({_id:req.body._id})
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

  
module.exports={addService,allService,getSingleService,updateService,deleteService}

   