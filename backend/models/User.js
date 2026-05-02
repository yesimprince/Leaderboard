const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uniqueUsername: { type: String, required: true, unique: true },
  name: String,
  branch: String,
  year: String,
  gmail: String,
  leetcode: String,
  codeforces: String,
  codechef: String,
});

module.exports = mongoose.model("User", userSchema);