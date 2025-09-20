
const bookingModel = require("./BookingModel")

addBooking=async(req,res)=>{
    var validation=[]
     if(!req.body.vehicleId){
        validation.push("Vehicle Id is Required")
    }
    if(!req.body.serviceId){
        validation.push("booking Id is Required")
    }
    if(!req.body.cost){
        validation.push("cost is Required")
    }if(!req.body.address){
        validation.push("address is Required")
    }if(!req.body.date){
        validation.push("Date is Required")
    }if(!req.body.time){
        validation.push("time is Required")
    }

    if(validation.length>0){
       res.json({
         status:422,
         success:false,
         message:validation 

       })
    }
    else{
     
               let total = await bookingModel.countDocuments().exec()
               let bookingObj= new bookingModel()
               bookingObj.bookingId=total+1
               bookingObj.vehicleId=req.decoded.vehicleId
               bookingObj.serviceId=req.body.serviceId
               bookingObj.cost=req.body.cost
               bookingObj.address=req.body.address
               bookingObj.date=req.body.date
               bookingObj.time=req.body.time
               bookingObj.save()
              
               .then((bookingData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Booking Add SuccessFully",
                    data:bookingData
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
 

}
const allBooking = async (req, res) => {
    try {
        let limit = parseInt(req.query.limit) || 0; // 0 means no limit
        let skip = parseInt(req.query.skip) || 0;

        const bookings = await bookingModel.find(req.body)
            .populate("serviceId","vehicleId") 
            .limit(limit)
            .skip(skip);

        res.json({
            success: true,
            message: "Data fetched successfully",
            data: bookings
        });

    } catch (err) {
        res.json({
            success: false,
            message: err.message
        });
    }
};

getSingleBooking=(req,res)=>{
 let validation=[]
 if(!req.body._id){
    validation.push("_id is required")
 }
 if(validation.length>0){
    res.json({
        status:422,
        success:false,
        message:"validation Error"
    })
 }else{
        bookingModel.findOne({_id:req.body._id})
       .then((bookingData)=>{
          if(!bookingData){
                res.json({
                status:404,
                success:false,
                message:"Booking not found on given Id"
                })
            }else{
                res.json({
                status:200,
                success:true,
                message:"Booking exists",
                data:bookingData
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
updateBooking=(req,res)=>{
 let validation=[]
 if(!req.body._id){
    validation.push("_id is Requried")
 }
 if(validation.length>0){
    res.json({
        status:422,
        success:false,
        message:validation
    })
 }else{
    bookingModel.findOne({_id:req.body._id})
    .then((bookingData)=>{
        if(!bookingData){
            res.json({
                status:404,
                success:false,
                message:"No booking found!"
            })
        }else{
            if(!!req.body.bookingId){
                bookingData.bookingId=req.body.bookingId
            }
            // if(!!req.body.userId){
            //     bookingData.userId=req.body.userId
            // }
            if(!!req.body.cost){
                bookingData.cost=req.body.cost
            }
            if(!!req.body.address){
                bookingData.address=req.body.address
            }
            if(!!req.body.date){
                bookingData.date=req.body.date
            }
            if(!!req.body.time){
                bookingData.time=req.body.time
            }
            bookingData.save()
            .then((updateData)=>{
                res.json({
                    success:true,
                    status:200,
                    message:"Booking updated!",
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
    }) .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal Server error"
        })
       })
 }

}
bookingChangeStatus=(req,res)=>{
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
     bookingModel.findOne({_id:req.body._id})
     .then((bookingData)=>{
          if(!bookingData){
              res.json({
                  status:404,
                  success:false,
                  message:"No Bookin found!"
              })
          }else{
              if(!!req.body.status){
                  bookingData.status=req.body.status 
              }
             
              bookingData.save()
              .then((updateData)=>{
                  res.json({
                      success:true,
                      status:200,
                      message:"Booking status changed!",
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

module.exports={addBooking,allBooking,getSingleBooking,updateBooking,bookingChangeStatus}

