const multer=require("multer")

const ServiceController =require("../server/Service/ServiceController")
const VehicleController = require("../server/Vehicle/VehicleController")
const CustomerController= require("../server/Customer/CustomerController")
const UserController= require("../server/User/UserController")
const BrandController=require("../server/Brand/BrandController")
const BookingController =require("../server/Booking/BookingController")
const ReviewController =require("../server/Review/ReviewController")



//Vehicle Multer
const vehicleStorage = multer.diskStorage({
  destination: function (req,file, cb) {
    cb(null, './public/vehicleImage')
  },
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+ "-"+ file.originalname)
  }
})
const vehicleUpload = multer({ storage: vehicleStorage })

const router=require("express").Router()


//routes without token
//customer
router.post("/register", CustomerController.register)
//user
router.post("/Login",UserController.login)

//service
router.post("/Service/all",ServiceController.allService)
router.post("/Service/single",ServiceController.getSingleService)
//Vehicle
router.post("/Vehicle/all",VehicleController.allVehicle)
router.post("/Vehicle/single",VehicleController.getSingleVehicle)
//Brand
router.post("/Brand/all",BrandController.allBrand)
router.post("/Brand/single",BrandController.getSinglebrand)







//routes with token
router.use(require("../config/middleware/userTokenChecker"))

router.post("/all",UserController.allUser)
router.post("/single",UserController.getSingleUser)
router.post("/update",UserController.updateUser)

//booking
router.post("/Booking/add",BookingController.addBooking)
router.post("/Booking/all",BookingController.allBooking)
router.post("/Booking/single",BookingController.getSingleBooking)
router.post("/Booking/status",BookingController.bookingChangeStatus)
//review
router.post("/Review/add",ReviewController.addReview)
router.post("/Review/all",ReviewController.allReview)
router.post("/Review/single",ReviewController.getSingleReview)


router.post("/changePassword",UserController.changePassword)







module.exports=router