const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://KunalSharma:2602@cluster0.7nmdp.mongodb.net/Carmax")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));
  