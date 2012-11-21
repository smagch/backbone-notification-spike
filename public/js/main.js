(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var $ = global.$,
    io = global.io,
    _ = global._,
    Backbone = global.Backbone,
    ItemCollection = global.ItemCollection,
    ItemView = global.ItemView,
    InputView = global.InputView;

  // var socket = io.connect('http://localhost:3000');
  // socket.on('connect', function () {
  //   socket.emit('set nickname', prompt('What is your nickname?'));
  //   socket.on('ready', function () {
  //     console.log('Connected !');
  //     socket.emit('msg', prompt('What is your message?'));
  //   });
  // });

  /**
   * template
   */

  var itemTemplate = _.template($('#item-template').html());

  /**
   * setup modules
   */

  var itemCollection = new ItemCollection();

  var itemView = new ItemView({
    el: '#item-view',
    collection: itemCollection,
    template: itemTemplate
  });

  var inputView = new InputView({
    el: '#input-view',
    collection: itemCollection
  });

  /**
   * start app
   */

  itemCollection.fetch();

})(this);