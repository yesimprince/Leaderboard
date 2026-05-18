const User = require('../models/User');
const Score = require('../models/Score');
const getCodeforcesData = require('./codeforcesService');
const getLeetCodeData = require('./leetcodeService');
const getCodeChefData = require('./codechefService');
const calculateScore = require('../utils/scoreCalculator');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function updateSingleUserScore(user) {
  try {
    const cfDataPromise = user.codeforces ? getCodeforcesData(user.codeforces) : Promise.resolve({ rating: 0, maxRating: 0 });
    const lcDataPromise = user.leetcode ? getLeetCodeData(user.leetcode) : Promise.resolve({ totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 });
    const ccDataPromise = user.codechef ? getCodeChefData(user.codechef) : Promise.resolve({ rating: 0, stars: 0 });

    const [cfData, lcData, ccData] = await Promise.all([cfDataPromise, lcDataPromise, ccDataPromise]);

    const scoreValue = calculateScore({
      leetcodeSolved: lcData.totalSolved,
      easySolved: lcData.easySolved,
      mediumSolved: lcData.mediumSolved,
      hardSolved: lcData.hardSolved,
      cfRating: cfData.rating,
      cfMaxRating: cfData.maxRating,
      ccRating: ccData.rating,
      ccStars: ccData.stars,
    });

    const updateData = {
      score: scoreValue,
      codeforcesRating: cfData.rating,
      cfMaxRating: cfData.maxRating,
      leetcodeEasy: lcData.easySolved,
      leetcodeMedium: lcData.mediumSolved,
      leetcodeHard: lcData.hardSolved,
      codechefRating: ccData.rating,
      ccRating: ccData.rating
    };

    await Score.findOneAndUpdate(
      { userId: user._id },
      { $set: updateData },
      { upsert: true, new: true }
    );

    return true;
  } catch (error) {
    console.error(`Error updating score for user ${user.uniqueUsername || user._id}:`, error.message);
    return false;
  }
}

async function updateAllScoresBackground() {
  console.log("Starting background cron job to update all scores...");
  try {
    const users = await User.find({});
    console.log(`Found ${users.length} users to update.`);

    const BATCH_SIZE = 5;
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      const batch = users.slice(i, i + BATCH_SIZE);
      console.log(`Processing batch ${i / BATCH_SIZE + 1} of ${Math.ceil(users.length / BATCH_SIZE)}`);
      
      const batchPromises = batch.map(user => updateSingleUserScore(user));
      const results = await Promise.all(batchPromises);

      results.forEach(success => {
        if (success) successCount++;
        else failureCount++;
      });

      // Sleep for 2 seconds between batches to avoid rate limits
      if (i + BATCH_SIZE < users.length) {
        await sleep(2000);
      }
    }

    console.log(`Cron job finished. Successfully updated: ${successCount}. Failed: ${failureCount}.`);
  } catch (error) {
    console.error("Critical error in updateAllScoresBackground:", error);
  }
}

module.exports = {
  updateAllScoresBackground
};
