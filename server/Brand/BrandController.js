const BrandModel=require("./BrandModel")
addBrand=async (req,res)=>{
   
  let validation=[]
    if(!req.body.brandName){
        validation.push("Brand name is required!")
    }
    
    if(!req.file){
       validation.push("Logo is required!") 
    }
    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation
        })
    }else{
        let total=await BrandModel.countDocuments().exec()
        let brandObj= new BrandModel()  
        brandObj.brandId=total+1
        brandObj.brandName=req.body.brandName
        brandObj.Logo="brandImage/"+req.file.filename
        brandObj.save()
        .then((brandData)=>{
            res.json({
                status:200,
                success:true,
                message:"Brand added successfully!",
                data:brandData
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
allBrand= async(req,res)=>{
    BrandModel.find({brandName:req.body.brandName, status:req.body.status})
      let total=await BrandModel.countDocuments().exec()
      let limit=req.body.limit || null
      let currentPage=req.body.currentPage || null
        BrandModel.find()
          .sort({createdAt:-1})
          .limit(limit)
          .skip(currentPage*limit)
          .then(brandData=>{
            if(brandData.length>0){
              res.json({
                status:200,
                success:true,
                message:"Inserted Data",
                total:total,
                data: brandData
              })
            }else{
              res.json({
                status:400,
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
  getSinglebrand=(req,res)=>{
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
       BrandModel.findOne({_id:req.body._id})
        .then((brandData)=>{
            if(!brandData){
                res.json({
                    status:404,
                    success:false,
                    message:"brand not found on given Id"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"brand exists",
                    data:brandData
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
deleteBrand=(req,res)=>{
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
       BrandModel.findOne({_id:req.body._id})
      
       .then((brandData)=>{
            if(!brandData){
                res.json({
                    status:404,
                    success:false,
                    message:"No brand found!"
                })
            }else{
                BrandModel.deleteOne({_id:req.body._id})
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
module.exports={addBrand,allBrand,getSinglebrand,deleteBrand}