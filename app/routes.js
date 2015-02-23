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

  app.post('/user', function(req, res) {
    Users.findOne({ 'facebookId': req.body.id }, function(err, user) {
      if (err) {
        throw err;
      } else if (user) {
        console.log('user exists');
      } else {
        new Users({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          name: req.body.name,
          facebookId: req.body.id
        }).save(function(err, user) {
          if (err) {
            throw err;
          } else {
            console.log('created user');
            res.json(user);
          }
        });
      }
    })
  });

  app.get('/friends/:id', function(req, res) {
    Users.findOne({ 'facebookId': req.params.id }, function(err, user) {
      if (err) {
        throw err
      } else {
        res.json({friends: user.friends});
      }
    });
  });

  app.get('/items/:id', function(req, res) {
    Users.findOne({ 'facebookId': req.params.id }, function(err, user) {
      if (err) {
        throw err
      } else {
        // res.json(user);
        res.json({items: user.items});
      }
    })
  });

  app.get('/groups/:id', function(req, res) {
    Users.findOne({ 'facebookId': req.params.id }, function(err, user) {
      if (err) {
        throw err
      } else {
        res.json(user.groups);
      }
    })
  });

  app.post('/item/:id', function(req, res) {

    // TODO Fix Query!!!
    Users.findOne(
      {
        // query to find if user has item
        'facebookId': req.params.id,
        'items.id': req.body.Item[0].ASIN[0]
        // 'items': { $in: [ { id: req.body.Item[0].ASIN[0] } ] }
        // 'items.id': { $in: [ req.body.Item[0].ASIN[0] ] }
      }, function(err, user) {
        if (err) {
          throw err;
        } else if (user) {
          // returns user
          console.log('aready added item')
        } else {
          // insert item into user's item list

          Users.update(
            { 'facebookId': req.params.id },
            { $addToSet: { 'items':
                {
                  'id': req.body.Item[0].ASIN[0],
                  'name': req.body.Item[0].ItemAttributes[0].Title[0],
                  'category': req.body.Item[0].ItemAttributes[0].ProductGroup[0],
                  'image': req.body.Item[0].ImageSets[0].ImageSet[0].ThumbnailImage[0].URL[0]
                }
            } },
            function(err, user) {
              if (err) {
                throw err;
              } else {
                console.log('added item');
              }
            }
          )

        }
      })
  });

}
