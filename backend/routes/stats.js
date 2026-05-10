const express = require("express");
const router = express.Router();

const UserStats = require("../models/UserStats");
const User = require("../models/User");

// test route
router.get("/test", async (req, res) => {
    try {
        const user = await User.findOne();

        if (!user) return res.send("No user found");

        const stats = await UserStats.create({
            userId: user._id,
            leetcode: { easy: 20, medium: 10, hard: 5 },
            codeforces: { rating: 1400 },
        });

        res.json(stats);
    } catch (err) {
        console.error(err);
        res.send("Error");
    }
});

module.exports = router;