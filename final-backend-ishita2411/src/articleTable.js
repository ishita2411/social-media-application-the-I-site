const mongoose = require("mongoose");

const articleTable = new mongoose.Schema({
  pid: {
    type: Number,
  },
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
  },
  articleImage: {
    type: String,
    default: null,
    // default:"http://res.cloudinary.com/dhkwgnwxj/image/upload/v1669926380/xdarfbhslivrwyvn6tuk.jpg"
  },
  comments: {
    type: Array,
    // default: []
    default: [],
  },
});

module.exports = articleTable;
