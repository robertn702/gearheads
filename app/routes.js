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
        'Keywords': 'harry potter'
      }, function(err, results) {
        console.log(results);
      })
  });

}
