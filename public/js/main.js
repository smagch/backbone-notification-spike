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

  var socket = io.connect('http://localhost:3000');
  socket.on('connect', function () {

    socket.on('add', function (model) {
      console.log('add event called');
      itemCollection.add(model);
    });

    socket.on('remove', function (model) {
      console.log('remove event callded');
      itemCollection.remove(model.id);
    });

    socket.on('change', function (model) {
      console.log('change event called');
      var currentModel = itemCollection.get(model.id);
      currentModel.set(model);
    });
  });

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