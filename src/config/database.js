const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://zubairhasrat48:NWiVJu7TXDRLnkGl@devttinder.6neli.mongodb.net/devTinder");
}

module.exports = connectDB;