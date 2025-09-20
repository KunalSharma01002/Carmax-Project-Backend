const customerModel = require("./CustomerModel");
const userModel = require("../User/UserModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    let validation = [];
    if (!req.body.name) validation.push("Name is required");
    if (!req.body.email) validation.push("Email is required");
    if (!req.body.password) validation.push("Password is required");
    if (!req.body.contact) validation.push("Contact is required");
    if (!req.body.address) validation.push("Address is required");
    if (!req.body.pincode) validation.push("Pincode is required");

    if (validation.length > 0) {
      return res.json({
        status: 422,
        success: false,
        message: validation,
      });
    }

    let userData = await userModel.findOne({ email: req.body.email });
    if (userData) {
      return res.json({
        status: 200,
        success: false,
        message: "User already exists with same mail",
      });
    }

    let total = await userModel.countDocuments().exec();
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);

    let userObj = new userModel({
      userId: total + 1,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.userType || 2, // 👈 default userType = 2 (user), pass 1 for admin
    });

    let savedUser = await userObj.save();

    let customerTotal = await customerModel.countDocuments().exec();
    let customerObj = new customerModel({
      customerId: customerTotal + 1,
      address: req.body.address,
      pincode: req.body.pincode,
      contact: req.body.contact,
      userId: savedUser._id,
    });

    let savedCustomer = await customerObj.save();

    savedUser.customerId = savedCustomer._id;
    await savedUser.save();

    return res.json({
      success: true,
      status: 200,
      message: "User registered successfully",
      data: savedUser,
    });
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = { register };
