function calculateScore(data) {
  // Extract LeetCode difficulty stats
  const easy = data.easySolved || 0;
  const medium = data.mediumSolved || 0;
  const hard = data.hardSolved || 0;
  
  // Backward compatibility in case only leetcodeSolved is provided (manual score addition)
  const leetcode = data.leetcodeSolved || 0;
  
  let leetcodeScore = 0;
  if (easy > 0 || medium > 0 || hard > 0) {
    // Points based on difficulty
    leetcodeScore = (easy * 1) + (medium * 3) + (hard * 5);
  } else {
    // Fallback formula if difficulty stats are not present
    leetcodeScore = leetcode * 2;
  }

  const cf = data.cfRating || 0;
  const cc = data.ccStars || 0;

  const score = leetcodeScore + (cf / 10) + (cc * 50);
  
  return Math.round(score);
}

module.exports = calculateScore;