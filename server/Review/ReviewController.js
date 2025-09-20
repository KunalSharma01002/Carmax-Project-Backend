const reviewModel = require("./ReviewModel")
const serviceModel=require("../Service/ServiceModel")
addReview=async (req,res)=>{
   
  let validation=[]
    if(!req.body.bookingId){
        validation.push("BookingId is required!")
    }
    
    // if(!req.body.userId){
    //    validation.push("UserId is required!") 
    // }
    if(!req.body.serviceId){
      validation.push("ServiceId is required!") 
   }
    if(!req.body.rating){
        validation.push("Rating is required!") 
    }
     if(!req.body.feedback){
        validation.push("feedback is required!") 
     }
    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation
        })

    }else{
       reviewModel.findOne({bookingId:req.body.bookingId})
       
        .then(async (reviewData)=>{
          if(!!reviewData){
              res.json({
                  status:404,
                  success:false,
                  message:"review exist on given booking id"
              })
          }else{
            let total=await reviewModel.countDocuments().exec()
            let reviewObj= new reviewModel()  
            reviewObj.reviewId=total+1
            reviewObj.bookingId=req.body.bookingId
            reviewObj.userId=req.decoded.userId
            reviewObj.serviceId=req.body.serviceId
            reviewObj.rating=req.body.rating
            reviewObj.feedback=req.body.feedback
    
            reviewObj.save()
            .then(async(reviewData)=>{
         
             let totalReviewPerService=await reviewModel.countDocuments({serviceId:req.body.serviceId}).exec()
             reviewModel.find({serviceId:req.body.serviceId})
             .then((ratingData)=>{
               let totalRating=0
              //  if(reviewData.length>0){
                  for(let i=0;i<ratingData.length;i++){
                    totalRating+=ratingData[i].rating
                  }
                  let avgRating=(totalRating/totalReviewPerService)?.toFixed(1)
                  serviceModel.findOne({_id:req.body.serviceId})
                  .then((serviceData)=>{
                    serviceData.rating=avgRating 
                    serviceData.save()
                    .then((serviceData)=>{
                      res.json({
                        success:true,
                        status:200,
                        message:"Review Added",
                        data:reviewData,
                    })
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
              // }else{
    
              // }
               
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
      }) .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            error:err
        })
    })
       
            
    }
 
}
allReview= async(req,res)=>{

    let total=await reviewModel.countDocuments().exec()
    reviewModel.find(req.body)
     
      .then(reviewData=>{
      if(reviewData.length>0){
        res.json({
          status:200,
          success:true,
          message:"Inserted Data",
          total:total,
          data: reviewData
        })
      }else{
        res.json({
          status:200,
          success:false,
          message:"Data is not Inserted",
         
        })
      }
      })
      .catch(err=>{
        res.json({
          status:500,
          success:false,
          message:"Error in Server",
          data : err.message
    
        })
      })
} 
getSingleReview=(req,res)=>{
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
        reviewModel.findOne({_id:req.body._id})
        .then((reviewData)=>{
            if(!reviewData){
                res.json({
                    status:404,
                    success:false,
                    message:"Review not found on given Id"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Review exists",
                    data:reviewData
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
  updateReview=(req,res)=>{
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
        reviewModel.findOne({_id:req.body._id})
        .then((reviewData)=>{
          if(!reviewData){
           res.json({
            status:404,
            success:false,
            message:"No Review found!"
           })
         }else{
          if(!!req.body.bookingId){
            reviewData.bookingId=req.body.bookingId 
          }
          // if(!!req.decoded.userId){
          //   reviewData.userId=req.decoded.userId
          // }
          if(!!req.body.serviceId){
            reviewData.serviceId=req.body.serviceId
          }
          if(!!req.body.rating){
            reviewData.rating=req.body.rating
          }
          if(!!req.body.feedback){
            reviewData.feedback=req.body.feedback
          }

      
          reviewData.save()
          .then((updateData)=>{
           res.json({
               success:true,
               status:200,
               message:"Review updated!",
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

module.exports={addReview,allReview,getSingleReview,updateReview}