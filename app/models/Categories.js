var mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema({
    searchIndex: String,
    subCategories: Array
});

module.exports = mongoose.model('Categories', categoriesSchema);
