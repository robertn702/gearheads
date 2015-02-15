var mongoose = require('mongoose');

var itemsSchema = new mongoose.Schema({
  name: String,
  category: String,
  subCategories: {
    actor: String,
    artist: String,
    audienceRating: Number,
    author: String,
    availability: String,
    brand: String,
    composer: String,
    conductor: String,
    director: String,
    itemPage: String,
    keywords: String,
    manufacturer: String,
    maximumPrice: Number,
    merchantId: String,
    minimumPrice: Number,
    minPercentageOff: Number,
    neighborhood: String,
    orchestra: String,
    publisher: String,
    sort: String,
    title: String,
  }
});

module.exports = mongoose.model('Items', itemsSchema);
