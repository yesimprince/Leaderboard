function calculateScore(data) {
  // 1. LeetCode Component
  const easy = data.easySolved || 0;
  const medium = data.mediumSolved || 0;
  const hard = data.hardSolved || 0;
  const leetcode = data.leetcodeSolved || 0;
  
  let leetcodeScore = 0;
  if (easy > 0 || medium > 0 || hard > 0) {
    leetcodeScore = (easy * 1) + (medium * 3) + (hard * 5);
  } else {
    leetcodeScore = leetcode * 2;
  }

  // 2. Codeforces Component
  const cfRating = data.cfRating || 0;
  const cfMaxRating = data.cfMaxRating || 0;
  // Use both current and max rating to balance LeetCode grind
  const cfScore = (cfRating * 0.4) + (cfMaxRating * 0.1);

  // 3. CodeChef Component
  const ccRating = data.ccRating || 0;
  const ccStars = data.ccStars || 0;
  // Combine rating and stars
  const ccScore = (ccRating * 0.4) + (ccStars * 20);

  // 4. Total Calculation
  const score = leetcodeScore + cfScore + ccScore;
  
  return Math.round(score);
}

module.exports = calculateScore;