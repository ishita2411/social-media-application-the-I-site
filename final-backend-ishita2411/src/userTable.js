const mongoose = require("mongoose");

const userTable = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = userTable;
