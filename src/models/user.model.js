const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true, required: true },
  age: Number,
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "premium", "admin"], default: "user" }
});


module.exports = mongoose.models.User || mongoose.model("User", userSchema);