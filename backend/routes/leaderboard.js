const express = require("express");
const router = express.Router();

const Score = require("../models/Score");
const calculateScore = require("../utils/scoreCalculator");
const getCodeforcesData = require("../services/codeforcesService");
const getLeetCodeData = require("../services/leetcodeService");
const getCodeChefData = require("../services/codechefService");

// ----------------------
// GET leaderboard
// ----------------------
router.get("/", async (req, res) => {
  try {
    const scores = await Score.find().populate("userId").sort({ score: -1 });
    
    const leaderboard = scores.map((item, index) => {
      // populate("userId") replaces the ObjectId with the actual User document
      const user = item.userId || { name: 'Unknown', branch: 'Unknown', uniqueUsername: 'N/A', year: 'N/A', gmail: 'N/A', leetcode: '', codeforces: '', codechef: '' };
      return {
        rank: index + 1,
        name: user.name,
        department: user.branch || 'Unknown', // Using 'branch' from DB as department
        uniqueUsername: user.uniqueUsername || 'N/A',
        year: user.year || 'N/A',
        gmail: user.gmail || 'N/A',
        leetcode: user.leetcode,
        codeforces: user.codeforces,
        codechef: user.codechef,
        score: item.score,
      };
    });

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// ----------------------
// POST manual score (calculator)
// ----------------------
router.post("/add", async (req, res) => {
  try {
    const { userId, leetcodeSolved, cfRating, ccStars } = req.body;

    const scoreValue = calculateScore({
      leetcodeSolved,
      cfRating,
      ccStars,
    });

    const newScore = new Score({ userId, score: scoreValue });
    await newScore.save();

    res.json(newScore);
  } catch (error) {
    console.error("Error adding score:", error);
    res.status(500).json({ error: "Failed to add score" });
  }
});

// ----------------------
// 🔥 ADD THIS NEW ROUTE HERE
// ----------------------
router.post("/auto", async (req, res) => {
  try {
    const { userId, codeforces, leetcode, codechef } = req.body;

    let cfData = { rating: 0, maxRating: 0 };
    if (codeforces) {
      cfData = await getCodeforcesData(codeforces);
    }

    let leetcodeData = { totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 };
    if (leetcode) {
      leetcodeData = await getLeetCodeData(leetcode);
    }

    let codechefData = { rating: 0, stars: 0 };
    if (codechef) {
      codechefData = await getCodeChefData(codechef);
    }
    const ccStars = codechefData.stars;

    const scoreValue = calculateScore({
      leetcodeSolved: leetcodeData.totalSolved,
      easySolved: leetcodeData.easySolved,
      mediumSolved: leetcodeData.mediumSolved,
      hardSolved: leetcodeData.hardSolved,
      cfRating: cfData.rating,
      cfMaxRating: cfData.maxRating,
      ccRating: codechefData.rating,
      ccStars,
    });

    const newScore = new Score({ 
      userId, 
      score: scoreValue,
      codeforcesRating: cfData.rating,
      cfMaxRating: cfData.maxRating,
      leetcodeEasy: leetcodeData.easySolved,
      leetcodeMedium: leetcodeData.mediumSolved,
      leetcodeHard: leetcodeData.hardSolved,
      codechefRating: codechefData.rating,
      ccRating: codechefData.rating
    });
    await newScore.save();

    res.json({
      cfRating: cfData.rating,
      leetcodeSolved: leetcodeData.totalSolved,
      calculatedScore: scoreValue,
      result: newScore,
    });
  } catch (error) {
    console.error("Error auto-calculating score:", error);
    res.status(500).json({ error: "Failed to auto-calculate score" });
  }
});

// ----------------------
// (optional) clear route
// ----------------------
router.delete("/clear", async (req, res) => {
  try {
    await Score.deleteMany({});
    res.send("All scores deleted");
  } catch (error) {
    res.status(500).json({ error: "Failed to clear scores" });
  }
});

// ----------------------
module.exports = router;