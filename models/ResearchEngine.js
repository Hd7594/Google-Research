const mongoose = require("mongoose");

const Research = mongoose.model("research", {
  name: String,
  searchEngine: String,
  accuracy: Boolean,
});

module.exports = Research;
