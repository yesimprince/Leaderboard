const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('./models/User');
const Score = require('./models/Score');
const getCodeforcesData = require('./services/codeforcesService');
const getLeetCodeData = require('./services/leetcodeService');
const calculateScore = require('./utils/scoreCalculator');

async function runTest() {
  console.log("1. Starting Local MongoDB Database...");
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  console.log("   ✅ Database connected successfully.");

  console.log("\n2. Simulating User Creation (/api/users/add)...");
  const userData = {
    uniqueUsername: "test_integration_user",
    name: "Integration Test User",
    branch: "CSE",
    year: "3",
    gmail: "test@example.com",
    codeforces: "tourist",
    leetcode: "anshu_2211_",
    codechef: ""
  };
  
  const newUser = new User(userData);
  await newUser.save();
  console.log("   ✅ User saved to database:", newUser.uniqueUsername);

  console.log("\n3. Simulating Auto Score Calculation (/api/leaderboard/auto)...");
  console.log("   Fetching Codeforces data for:", userData.codeforces);
  const cfData = await getCodeforcesData(userData.codeforces);
  console.log("   CF Data:", cfData);

  console.log("   Fetching LeetCode data for:", userData.leetcode);
  const leetcodeData = await getLeetCodeData(userData.leetcode);
  console.log("   LeetCode Data:", leetcodeData);

  const scoreValue = calculateScore({
    leetcodeSolved: leetcodeData.totalSolved,
    easySolved: leetcodeData.easySolved,
    mediumSolved: leetcodeData.mediumSolved,
    hardSolved: leetcodeData.hardSolved,
    cfRating: cfData.rating,
    ccStars: 0,
  });
  console.log(`   🧮 Calculated Final Score: ${scoreValue}`);

  const newScore = new Score({ userId: newUser._id, score: scoreValue });
  await newScore.save();
  console.log("   ✅ Score successfully saved to database linked to User ID:", newUser._id);

  console.log("\n4. Simulating Leaderboard Fetch (/api/leaderboard)...");
  const leaderboard = await Score.find().populate("userId").sort({ score: -1 });
  console.log("   🏆 Leaderboard Output:");
  console.log(JSON.stringify(leaderboard, null, 2));

  console.log("\nTest Completed Successfully! Disconnecting...");
  await mongoose.disconnect();
  await mongoServer.stop();
}

runTest().catch(err => {
  console.error("Test Failed:", err);
  process.exit(1);
});
