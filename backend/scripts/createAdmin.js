require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    await connectDB();

    const exists = await Admin.findOne({
      email: "baalaconstructions@gmail.com",
    });

    if (exists) {
      console.log("Admin already exists");
      process.exit();
    }

    await Admin.create({
      name: "Admin",
      email: "baalaconstructions@gmail.com",
      password: "baalaconstructions@60",
    });

    console.log("Admin Created Successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

createAdmin();