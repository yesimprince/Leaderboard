const mongoose = require("mongoose");


async function connectDB() {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGO_URI is missing. Add it in backend/.env");
  }

  console.log("Trying to connect to MongoDB Atlas...");

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Atlas connection failed:", error.message);
    console.log("Falling back to mongodb-memory-server...");
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log("Connected to in-memory MongoDB successfully");
  }
}

module.exports = connectDB;