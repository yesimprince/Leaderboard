const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  score: Number,
  codeforcesRating: { type: Number, default: 0 },
  leetcodeEasy: { type: Number, default: 0 },
  leetcodeMedium: { type: Number, default: 0 },
  leetcodeHard: { type: Number, default: 0 },
  codechefRating: { type: Number, default: 0 },
});

module.exports = mongoose.model("Score", scoreSchema);