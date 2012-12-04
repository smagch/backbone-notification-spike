
/**
 * Module Dependencies
 */

var zmq = require('zmq')
  , http = require('http')
  , path = require('path')
  , _ = require('underscore')
  , express = require('express')
  , DB = require('./lib/db');

/**
 * initialize Database
 */

var db = new DB([
  {msg: 'Hello'},
  {msg: 'World'},
  {msg: 'I'},
  {msg: 'am'},
  {msg: 'a'},
  {msg: 'man'}
]);

/**
 * initialize Express
 */

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

/**
 * bulk get
 */

app.get('/item', function (req, res) {
  res.json(db.getAll());
});

/**
 * create new item
 */

app.post('/item', function (req, res) {
  var data = req.body;
  var ret = db.add(data);
  setTimeout(function () {
    if (!ret) res.json(404);
    res.json(200, data);
  }, 100);
});

/**
 * change item
 */

app.put('/item/:id', function (req, res) {
  var id = req.params.id;
  var data = req.body;
  var target = db.findById(id);
  if (!target) return res.json(400, 'not found');
  target.msg = data.msg;
  res.json(200, data);
});

/**
 * delete item
 */

app.del('/item/:id', function (req, res) {
  var id = req.params.id;
  var ret = db.remove(id);
  if (!ret) return res.json(404);
  res.json(200);
});

/**
 * start app!
 */

http.createServer(app).listen(3000);