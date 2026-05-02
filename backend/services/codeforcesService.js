const axios = require("axios");

async function getCodeforcesData(handle) {
  try {
    const res = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );

    const user = res.data.result[0];

    return {
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
    };
  } catch (error) {
    console.log("CF API error:", error.message);
    return { rating: 0, maxRating: 0 };
  }
}

module.exports = getCodeforcesData;