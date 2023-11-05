const mongoose = require("mongoose");

const detailsTable = new mongoose.Schema({
  username: {
    type: String,
  },
  headline: {
    type: String,
    default: "New User- default headline",
  },
  email: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  dob: {
    type: Date
  },
  phone:{
    type: String
  },
  avatar: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
  following: {
    type: Array,
    default: [],
  },
});

module.exports = detailsTable;
