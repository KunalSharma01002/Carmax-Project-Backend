const multer=require("multer")

const ServiceController =require("../server/Service/ServiceController")
const BrandController =require("../server/Brand/BrandController")
const VehicleController = require("../server/Vehicle/VehicleController")
const UserController= require("../server/User/UserController")
const DashboardController= require("../server/Dashboard/DashboardController")
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


//service Multer
const serviceStorage = multer.diskStorage({
  destination: function (req,file, cb) {
    cb(null, './public/serviceImage')
  },
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+ "-"+ file.originalname)
  }
})
const serviceUpload = multer({ storage: serviceStorage })

//brand Multer
const brandStorage = multer.diskStorage({
  destination: function (req,file, cb) {
    cb(null, './public/brandImage')
  },
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+ "-"+ file.originalname)
  }
})
const brandUpload = multer({ storage: brandStorage })


const router=require("express").Router()






//routes with token
router.use(require("../config/middleware/adminTokenChecker"))


//Brand
router.post("/Brand/add",brandUpload.single("Logo"),BrandController.addBrand)
router.post("/Brand/all",BrandController.allBrand)
router.post("/Brand/single",BrandController.getSinglebrand)
router.post("/Brand/delete",BrandController.deleteBrand)

//Service
router.post("/service/add",serviceUpload.single("Image"),ServiceController.addService)

router.post("/Service/all",ServiceController.allService)
router.post("/Service/single",ServiceController.getSingleService)
router.post("/Service/update",ServiceController.updateService)
router.post("/Service/delete",ServiceController.deleteService)

//Vehicle
router.post("/Vehicle/add",vehicleUpload.single("Image"),VehicleController.addVehicle)
router.post("/Vehicle/all",VehicleController.allVehicle)
router.post("/Vehicle/single",VehicleController.getSingleVehicle)
router.post("/Vehicle/update",vehicleUpload.single("Image"),VehicleController.updateVehicle)
router.post("/Vehicle/status",VehicleController.vehicleChangeStatus)
router.post("/Vehicle/delete",VehicleController.deleteVehicle)
//Booking
router.post("/Booking/add",BookingController.addBooking)
router.post("/Booking/all",BookingController.allBooking)
router.post("/Booking/single",BookingController.getSingleBooking)
router.post("/Booking/update",BookingController.updateBooking)
router.post("/Booking/status",BookingController.bookingChangeStatus)

//review
router.post("/review/add",ReviewController.addReview)
router.post("/Review/all",ReviewController.allReview)
router.post("/Review/single",ReviewController.getSingleReview)
router.post("/review/update",ReviewController.updateReview)
//Dashboard
router.post("/dashboard",DashboardController.dashBoard)
//user
router.post("/User/all",UserController.allUser)
router.post("/User/single",UserController.getSingleUser)

//changepassword
router.post("/changePassword",UserController.changePassword)





module.exports=router