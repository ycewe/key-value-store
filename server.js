var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var storeRoutes = require('./routes');

var port = 5000;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', storeRoutes);

app.listen(process.env.PORT || port, function() {
  var listeningPort = process.env.PORT || port;
  console.log(`Running on ${listeningPort}`);
});
