# Understanding Score Discrepancies

This document explains why users might see different or changing scores in the Coding Club Platform despite providing the exact same LeetCode or Codeforces handle.

There are four primary reasons for these score discrepancies:

## 1. Manual vs. Automated Calculation Formulas
The platform has two different ways to calculate a user's LeetCode score:

- **Automated Pipeline (`/api/leaderboard/auto`)**: When the system fetches a user's data from the LeetCode API, it retrieves the breakdown of problem difficulties. The score is calculated as: 
  `Score = (Easy × 1) + (Medium × 3) + (Hard × 5)`
- **Manual Input Pipeline (`/api/leaderboard/add`)**: If a score is submitted manually with just the "total problems solved", the system falls back to a simpler calculation to preserve backward compatibility:
  `Score = Total Solved × 2`

**Example**: If a user solved 50 Easy, 30 Medium, and 20 Hard problems (100 total):
- The automated pipeline will calculate: `(50 × 1) + (30 × 3) + (20 × 5) = 240 points`.
- The manual pipeline will calculate: `100 × 2 = 200 points`.

## 2. API Data Fluctuations (Codeforces)
The Codeforces score component is calculated as: `Codeforces Rating / 10`.

The system fetches the **current rating** (`user.rating`) from the Codeforces API, rather than the user's historical maximum rating (`user.maxRating`). Because a user's Codeforces rating naturally fluctuates up and down after every contest they participate in, their total calculated platform score will also fluctuate. 

## 3. Point-in-Time Snapshotting
Scores are not dynamically calculated on the fly every time you view the leaderboard. Instead, they are calculated and saved as a static snapshot in the MongoDB database when a user is processed. 

If the same handle is processed on Monday and then again on Friday, the Friday score might be different because the user solved more LeetCode problems or participated in a Codeforces contest in the intervening days.

## 4. API Failures and Rate Limiting
If the LeetCode or Codeforces APIs are down, or if the Coding Club Platform server exceeds its rate limits, the data fetching services (`leetcodeService.js` and `codeforcesService.js`) are designed to catch the error gracefully and return `0` for all stats. 

If an API failure occurs during a user update, their score for that specific platform will be evaluated as `0`.
