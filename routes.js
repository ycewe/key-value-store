var express = require('express');
var router = new express.Router();

var Store = require('./store');

router.get('/object/:key', function (req = {}, res) {
  Store.find(req.params.key, req.query.timestamp, function(value, err) {
    if (err) {
      res.send('Unable to fetch data:' + err);
    } else if (value) {
      res.send(value[0])
    } else {
      res.send('No such key found');
    }
  });
});

router.post('/object', function (req = {}, res) {
  var key = Object.keys(req.body)[0];
  var value = Object.keys(req.body).map(function(k) {
    return req.body[k];
  });

  Store.add(key, value, function (response, err) {
    if (err) {
      res.send('Unable to store data:' + err);
    } else {
      res.send(response);
    }
  });
});

module.exports = router;
