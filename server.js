
/**
 * Module Dependencies
 */

var zmq = require('zmq')
  , http = require('http')
  , path = require('path')
  , _ = require('underscore')
  , express = require('express');

/**
 * generate guid
 */

function getId() {
  return Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
}

// models

var cache = [
  {msg: 'Hello'},
  {msg: 'World'},
  {msg: 'I'},
  {msg: 'am'},
  {msg: 'a'},
  {msg: 'man'}
];

// add id

cache.forEach(function (model) {
  model.id = getId();
});

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

/**
 * bulk get
 */

app.get('/item', function (req, res) {
  res.json(cache);
});

/**
 * new item
 */

app.post('/item', function (req, res) {
  var data = req.body;
  data.id = getId();
  cache.push(data);
  setTimeout(function () {
    res.json(200, data);
  }, 100);
});

/**
 * change item
 */

app.put('/item/:id', function (req, res) {
  var id = req.params.id;
  var data = req.body;
  var target = _.find(cache, function (model) {
    return model.id === id;
  });
  if (!target) return res.json(400, 'not found');
  target.msg = data.msg;
  res.json(200, data);
});

/**
 * delete item
 */

app.del('/item/:id', function (req, res) {
  var id = req.params.id;
  var target = _.find(cache, function (model) {
    return model.id === id;
  });
  if (!target) return res.json(400, 'not found');
  var index = cache.indexOf(target);
  cache.splice(index, 1);
  res.json(200);
});

/**
 * start app!
 */

http.createServer(app).listen(3000);