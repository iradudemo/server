const mongoose = require('mongoose');

const articles = mongoose.Schema({
  title: String,
  content: String,
  image: String,
  date_created: Date,
});

module.exports = mongoose.model('Articles', articles);
