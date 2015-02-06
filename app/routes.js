// load necessary models here
var AWS = require('./amazonAPI')

module.exports = function(app) {
  // app.get('/', function(req, res) {
  //   res.render(__dirname + '/index.html'); // load our client/index.html file
  // });

  // app.get('/business', function(req, res) {});

  // API Details: http://docs.aws.amazon.com/AWSECommerceService/latest/DG/ItemSearch.html
  app.get('/search', function(req, res) {
    AWS.execute('ItemSearch',
      {
        'SearchIndex': 'MusicalInstruments',
        'Keywords': 'martin d35'
      }, function(err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log('Results: ', results);
          console.log('Items: ', results.ItemSearchResponse.Items);
          console.log('Items[0]: ', results.ItemSearchResponse.Items[0]);
          console.log('Items[0][0]: ', results.ItemSearchResponse.Items[0].Item[0]);
          res.json(results.ItemSearchResponse.Items[0]);
          // if ()
          // console.log('Errors: ', results.ItemSearchResponse.Items[0].Request[0].Errors[0].Error);
        }
      })
  });

}
