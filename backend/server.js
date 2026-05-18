const cors = require('cors');
const express = require("express");
require("dotenv").config({ path: require('path').resolve(__dirname, '.env') });
const connectDB = require("./config/db");

const app = express();

// Allow all origins for Vercel deployments, or specify frontend URL
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://leaderboard-rho-one.vercel.app"
  ],
  credentials: true
}));

// middleware
app.use(express.json());

// import routes
const userRoutes = require("./routes/user");
const leaderboardRoutes = require("./routes/leaderboard");
const cronRoutes = require("./routes/cron");

// use routes
app.use("/api/users", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/cron", cronRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

async function startServer() {
  try {
    await connectDB();
    app.listen(3001, () => {
      console.log("Server running on http://localhost:3001");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

// In Vercel, we export the app and connect to DB without app.listen
if (process.env.VERCEL) {
  connectDB();
} else {
  startServer();
}

module.exports = app;