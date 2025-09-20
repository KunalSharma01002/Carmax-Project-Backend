const userModel=require("./UserModel")
const bcrypt=require("bcryptjs")
const jwt= require("jsonwebtoken")
const PVT_KEY= "Carmax@26"


const login = (req, res) => {
  let validation = [];
  if (!req.body.email) {
    validation.push("Email is required");
  }
  if (!req.body.password) {
    validation.push("Password is required");
  }

  if (validation.length > 0) {
    return res.json({
      status: 422,
      success: false,
      message: validation,
    });
  }

  userModel
    .findOne({ email: { $regex: new RegExp("^" + req.body.email + "$", "i") } })
    .then((userData) => {
      if (!userData) {
        return res.json({
          status: 404,
          success: false,
          message: "User not found!",
        });
      }

      // ✅ Only compare (DON’T rehash here)
      const result = bcrypt.compareSync(req.body.password, userData.password);

      if (result) {
        let payload = {
          email: userData.email,
          userId: userData._id,
          userType: userData.userType,
        };

        let token = jwt.sign(payload, PVT_KEY, { expiresIn: "24h" });

        res.json({
          success: true,
          status: 200,
          message: "Login successfully!",
          token: token,
          data: userData,
        });
      } else {
        res.json({
          status: 401,
          success: false,
          message: "Invalid credentials",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    });
};


changePassword=(req,res)=>{
   
    let validation=[]
   
    if(!req.body.oldPassword){
        validation.push("Old Password is required")
    }
    if(!req.body.newPassword){
        validation.push("New Password is required")
    }
    if(!req.body.confirmPassword){
        validation.push("Confirm Password is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        //user find 
        userModel.findOne({_id:req.decoded.userId})
        .then((userData)=>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"No user found!"
                })
            }else{
          
                if(req.body.confirmPassword===req.body.newPassword){
                 
                    let result=bcrypt.compareSync(req.body.oldPassword, userData.password)
                    if(result){
                 
                        userData.password=bcrypt.hashSync(req.body.newPassword, 10)
                        userData.save()
                        .then((userData)=>{
                            res.json({
                                status:200,
                                success:true,
                                message:"Password changed successfully",
                                data: userData
                            })
                        })
                        .catch((err)=>{
                            res.json({
                                status:422,
                                success:false,
                                message:"validation error",
                                error:err
                            }) 
                        })
                    }else{
                        res.json({
                            success:false,
                            status:200,
                            message:"Old Password doesn't match"
                        })
                    }
                }else{
                    res.json({
                        success:false,
                        status:200,
                        message:"confirm password and new password doesn't match"
                    })
                }

            }
        })
        .catch((err)=>{
            res.json({
                status:422,
                success:false,
                message:validation
            })
        })
    }
}
// parse=(req,res,next)=>{
 
//     let token =req.headers.authorization
//      if(!token){
//         res.json({
//           status:403,
//           success:false,
//           message:"Token not found!" 
//         })
//      }else{
//        jwt.verify(token,PVT_KEY,function(err,decoded){
//         if(!!err){
//         res.json({
//             status:403,
//             success:false,
//             message:"Unauthorized access!"
//         })
//         }else{
//             req.decoded=decoded
//             // next()
//         }

//        })
//      }


// }
allUser=async(req,res)=>{

    let total=await userModel.countDocuments().exec()
    userModel.find(req.body)
     
      .then(userData=>{
      if(userData.length>0){
        res.json({
          status:200,
          success:true,
          message:"Inserted Data",
          total:total,
          data: userData
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
 getSingleUser=(req,res)=>{
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
        userModel.findOne({_id:req.body._id})
        .then((userData)=>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"user not found on given Id"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"user exists",
                    data:userData
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
  updateUser=(req,res)=>{
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
        userModel.findOne({_id:req.body._id})
        .then((userData)=>{
          if(!userData){
           res.json({
            status:404,
            success:false,
            message:"No user found!"
           })
         }else{
          if(!!req.body.name){
            userData.name=req.body.name 
          }
          if(!!req.body.email){
            userData.email=req.body.email
          }
      
          userData.save()
          .then((updateData)=>{
           res.json({
               success:true,
               status:200,
               message:"user updated!",
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

module.exports={login,changePassword,allUser,getSingleUser,updateUser}