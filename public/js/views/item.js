(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var Backbone = global.Backbone,
    $ = global.$;

  global.ItemView = Backbone.View.extend({
    initialize: function (options) {
      this.collection
        .on('reset', this.render, this)
        .on('add', this.add, this)
        .on('change', this.change, this)
        .on('remove', this.remove, this)
        .on('edit', this.edit, this)
        .on('end', this.end, this);
      this.template = options.template;
    },
    events: {
      'click li': 'click'
    },
    get: function (id) {
      var $target = this.$el.children('[data-id=' + id + ']');
      if ($target.length !== 1) throw new Error('no child with :' + id);
      return $target;
    },
    edit: function (model) {
      this.get(model.id).addClass('selected');
    },
    end: function (model) {
      this.get(model.id).removeClass('selected');
    },
    click: function (e) {
      var id = $(e.currentTarget).attr('data-id');
      this.collection.edit(id);
    },
    remove: function (model) {
      console.log('remove');
      this.get(model.id).remove();
    },
    change: function (model, options) {
      console.log('change');
      var json = model.toJSON();
      var html = this.template({models: [json]});
      this.get(model.id).replaceWith(html);
    },
    render: function (collection, options) {
      console.log('render');
      var json = collection.toJSON();
      var html = this.template({models: json});
      this.$el.empty().html(html);
      return this;
    },
    add: function (model, options) {
      console.log('add');
      var json = model.toJSON();
      var html = this.template({models: [json]});
      this.$el.append(html);
      return this;
    }
  });

})(this);