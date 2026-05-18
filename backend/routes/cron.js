const express = require('express');
const router = express.Router();
const { updateAllScoresBackground } = require('../services/cronService');

const updateLeaderboardHandler = (req, res) => {
  // Simple security check to prevent unauthorized access
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET || 'default-secret-if-not-set';

  if (authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized: Invalid CRON_SECRET' });
  }

  // Acknowledge the request immediately to avoid timeout
  res.status(202).json({ message: 'Update started in background' });

  // Start the actual update process without awaiting it
  updateAllScoresBackground();
};

// GET /api/cron/update-leaderboard
router.get('/update-leaderboard', updateLeaderboardHandler);

// POST /api/cron/update-leaderboard
router.post('/update-leaderboard', updateLeaderboardHandler);

module.exports = router;
