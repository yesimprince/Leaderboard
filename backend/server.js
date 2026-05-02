const cors = require('cors');
const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// middleware
app.use(express.json());

// import routes
const userRoutes = require("./routes/user");
const leaderboardRoutes = require("./routes/leaderboard");

// DEBUG (very important for now)
console.log("userRoutes:", userRoutes);
console.log("leaderboardRoutes:", leaderboardRoutes);

// use routes
app.use("/api/users", require("./routes/user"));
app.use("/api/leaderboard", leaderboardRoutes);

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

startServer();