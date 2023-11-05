const mongoose = require("mongoose");

const followerTable = new mongoose.Schema({
  username: {
    type: String,
  },
  follower: {
    type: String,
  },
});

module.exports = followerTable;
