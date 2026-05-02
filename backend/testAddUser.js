const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('././models/User');

async function test() {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  try {
    const user = new User({"uniqueUsername":"ashish_123","name":"Ashish","branch":"CSE","year":"3","gmail":"ashish@example.com","codeforces":"","leetcode":"anshu_2211_","codechef":""});
    await user.save();
    console.log("User saved successfully");
  } catch (err) {
    console.error("Save error:", err);
  }
  process.exit(0);
}
test();
