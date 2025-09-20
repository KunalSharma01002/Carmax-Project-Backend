
const express=require("express")
const cors=require("cors")
const app=express()
app.use(cors())
const db=require("./config/db")
const seed=require("./config/seed")

app.use(express.json({limit:'40mb'}))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public/'))
const userApi = require("./router/userRouter")
app.use("/user",userApi)
const adminApi = require("./router/adminRouter")
app.use("/admin",adminApi)
const PORT=5002
app.listen(PORT,()=>{
    console.log("server running at port "+PORT);
})


app.all("/**",(req,res)=>{
    res.json({
        status:404,
        success:false,
        message:"Not found"
    })
})