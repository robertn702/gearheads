var mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now },
  item: {
    id: String,
    name: String
  }
});

module.exports = mongoose.model('Comments', commentsSchema);
