// Library Docs: https://github.com/dmcquay/node-apac

var util = require('util');
var OperationHelper = require('apac').OperationHelper;

require('dotenv').load();

var opHelper = new OperationHelper({
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET,
  assocId: process.env.ASSOC_ID
  // xml2jsOptions: an extra, optional, parameter for if you want to pass additional options for the xml2js module. (see https://github.com/Leonidas-from-XIV/node-xml2js#options)
});

module.exports = opHelper;
