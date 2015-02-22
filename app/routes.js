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
  app.get('/search/:category/:keywords', function(req, res) {
    AWS.execute('ItemSearch',
      {
        'SearchIndex': req.params.category,
        'Keywords': req.params.keywords,
        'ResponseGroup': 'Small,Images'
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

  // app.get('/user', function(req, res) {
  //   openFB.api({
  //     path: '/me',
  //     success: function(userInfo) {
  //       console.log('userInfo: ', userInfo);
  //     },
  //     error: function(error) {
  //       alert('Facebook error: ' + error.error_description);
  //     }
  //   })
  // });
}
