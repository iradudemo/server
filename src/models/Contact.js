const mongoose = require('mongoose');

const contact = mongoose.Schema({
  name: String,
  email: String,
  content: String,
});

module.exports = mongoose.model('Contact', contact);

