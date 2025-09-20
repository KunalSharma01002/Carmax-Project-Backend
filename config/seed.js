const bcrypt=require("bcryptjs")
const userModel=require("../server/User/UserModel")
userModel.findOne({email:"admin@gmail.com"})
.then((userData)=>{
    if(!userData){
        let userObj=new userModel()
        userObj.name="admin"
        userObj.email="admin@gmail.com"
        userObj.password=bcrypt.hashSync("123", 10)
        userObj.userType=1
        userObj.save()
        .then((userData)=>{
            console.log("Admin created successfully");
        })
        .catch((err)=>{
            console.log("Error while registering admin");
        })
    }else{
        console.log("Admin already exists");
    }
})
.catch((err)=>{
    console.log("Error while finding user");
    
})