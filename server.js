var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var port = 5000;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var storeRoutes = require('./routes');
app.use('/', storeRoutes);

app.listen(process.env.PORT || port, function() {
  var listeningPort = process.env.PORT || port;
  console.log(`Running on ${listeningPort}`);
});
