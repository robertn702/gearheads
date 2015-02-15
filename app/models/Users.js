var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  name:  String,
  facebookId: String,
  date: { type: Date, default: Date.now },
  items: [{
    id: String,
    name: String,
    category: String
  }],
  friends: [{
    id: String,
    name: String
  }],
  groups: [{
    id: String,
    name: String
  }],
  comments: [{
    id: String,
    body: String,
    date: Date
  }],
});

module.exports = mongoose.model('Users', usersSchema);
