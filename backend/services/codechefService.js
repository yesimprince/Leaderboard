const https = require('https');

function getCodeChefData(handle) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.codechef.com/users/${handle}`, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const ratingMatch = data.match(/<div class="rating-number">(?:<!-.*?->|[^>])*?(\d+)/) || data.match(/<div[^>]*class="rating-number"[^>]*>(?:\s*)([0-9]+)/);
          let rating = 0;
          if (ratingMatch) {
            rating = parseInt(ratingMatch[1] || ratingMatch[2], 10);
          }
          
          const starsMatch = data.match(/(\d+)&#9733;/);
          const stars = starsMatch ? parseInt(starsMatch[1], 10) : 0;

          resolve({ rating, stars });
        } catch (error) {
          console.log("CC API error:", error.message);
          resolve({ rating: 0, stars: 0 });
        }
      });
    }).on('error', (err) => {
      console.log("CC API error:", err.message);
      resolve({ rating: 0, stars: 0 });
    });
  });
}

module.exports = getCodeChefData;
