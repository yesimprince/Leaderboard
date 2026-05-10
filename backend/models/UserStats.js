const mongoose = require("mongoose");

const userStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  leetcode: {
    easy: Number,
    medium: Number,
    hard: Number,
    totalSolved: Number,
    acceptanceRate: Number,
    contestRating: Number,
    contestRank: Number,
    submissions: Number,
    streak: Number,
  },

  codeforces: {
    rating: Number,
    maxRating: Number,
    rank: String,
    contribution: Number,
    contests: Number,
    bestRank: Number,
  },

  codechef: {
    stars: Number,
    rating: Number,
  },

  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserStats", userStatsSchema);