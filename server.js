
/**
 * Module Dependencies
 */

var http = require('http')
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

var delay = 200;

/**
 * initialize zmq socket
 */

// var sock = zmq.socket('push');
// sock.bindSync('tcp://127.0.0.1:3010');
// console.log('Producer bound to port 3010');

/**
 * initialize Express server
 */

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

var server, io;

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
  var model = db.add(data);
  if (!model) return res.json(404);
  setTimeout(function () {
    res.json(200);
    io.sockets.emit('add', model);
  }, delay);
});

/**
 * change item
 */

app.put('/item/:id', function (req, res) {
  var id = req.params.id;
  var data = req.body;
  var model = db.update(data);
  if (!model) return res.json(500);
  setTimeout(function () {
    res.json(200);
    io.sockets.emit('change', model);
  }, delay);
});

/**
 * delete item
 */

app.del('/item/:id', function (req, res) {
  var id = req.params.id;
  var model = db.remove(id);
  if (!model) return res.json(404);
  setTimeout(function () {
    res.json(200);
    io.sockets.emit('remove', model);
  }, delay);
});

/**
 * socket io
 */

server = http.createServer(app);
io = require('socket.io').listen(server);

/**
 * start app!
 */

server.listen(3000);