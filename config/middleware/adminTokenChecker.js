const jwt=require("jsonwebtoken")
const PVT_KEY="Carmax@26"
module.exports=(req,res,next)=>{
 
    let token =req.headers.authorization
     if(!token){
        res.json({
          status:403,
          success:false,
          message:"Token not found!" 
        })
     }else{
       jwt.verify(token,PVT_KEY,function(err,decoded){
        if(!!err){
            res.json({
                status:403,
                success:false,
                message:"Unauthorized access!"
            })
           }else{
               if(decoded.userType==1){
                    req.decoded=decoded
                    next()
               }else{
                   res.json({
                       status:403,
                       success:false,
                       message:"You are not allowed to access this page"
                   })
               }
           }
        })
       }


}