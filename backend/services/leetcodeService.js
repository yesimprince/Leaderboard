const axios = require("axios");

async function getLeetCodeData(handle) {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const res = await axios.post("https://leetcode.com/graphql", {
      query: query,
      variables: { username: handle },
    });

    // If user does not exist or API fails to match user
    if (!res.data || !res.data.data || !res.data.data.matchedUser) {
      return { totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 };
    }

    const submissions = res.data.data.matchedUser.submitStats.acSubmissionNum;
    
    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    submissions.forEach((item) => {
      if (item.difficulty === "All") totalSolved = item.count;
      if (item.difficulty === "Easy") easySolved = item.count;
      if (item.difficulty === "Medium") mediumSolved = item.count;
      if (item.difficulty === "Hard") hardSolved = item.count;
    });

    return { totalSolved, easySolved, mediumSolved, hardSolved };
  } catch (error) {
    console.log("LeetCode API error:", error.message);
    return { totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 };
  }
}

module.exports = getLeetCodeData;
