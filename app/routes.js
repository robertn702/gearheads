// load necessary models here
var AWS = require('./amazonAPI');

// MongoDB Models
var Categories = require('./models/Categories');
var Comments = require('./models/Comments');
var Feed = require('./models/Feed');
var Items = require('./models/Items');
var Users = require('./models/Users');


module.exports = function(app) {
  // API Details: http://docs.aws.amazon.com/AWSECommerceService/latest/DG/ItemSearch.html
  app.get('/search/:keywords', function(req, res) {
    console.log('url: ', req.url);
    console.log('query: ', req.query);
    console.log('body: ', req.body);
    AWS.execute('ItemSearch',
      {
        'SearchIndex': 'MusicalInstruments',
        'Keywords': req.params.keywords
      }, function(err, results) {
        if (err) {
          throw (err);
        } else {
          res.json(results.ItemSearchResponse.Items[0]);
          res.status(200);
        }
      })
  });

  app.get('/lookup/:ASIN', function(req, res) {
    AWS.execute('ItemLookup',
      {
        'ItemId': req.params.ASIN,
        'ResponseGroup': 'Small,EditorialReview,Images'
      }, function(err, results) {
        if (err) {
          throw (err);
        } else {
          res.json(results.ItemLookupResponse.Items[0])
          res.status(200);
        }
      })
  });

  app.get('/categories', function(req, res) {
    Categories.find(function(err, categories) {
      if (err) {
        throw (err);
      } else {
        res.json({categories: categories});
        res.status(200);
      }
    });
  });
}
