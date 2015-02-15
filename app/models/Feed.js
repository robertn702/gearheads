var mongoose = require('mongoose');

var feedSchema = new mongoose.Schema({
  action: String, // exchange, comment, acquire, sell
  user: {
    id: String,
    name: String,
  },
  item: {
    id: String,
    name: String
  }
});

module.exports = mongoose.model('Feed', feedSchema);
