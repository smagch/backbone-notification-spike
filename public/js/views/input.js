(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var $ = global.$,
    _ = global._,
    Backbone = global.Backbone;

  global.InputView = Backbone.View.extend({
    initialize: function (options) {
      this.collection.on('edit', this.edit, this);
    },
    events: {
      'keydown': 'keydown',
      'focusout': 'endEdit'
    },
    edit: function (model) {
      var msg = model.get('msg');
      this.$el.val(msg).focus();
    },
    keydown: function (e) {
      if (e.keyCode === 13) {
        this.$el.blur();
      }
    },
    endEdit: function (e) {
      var msg = this.$el.val();
      this.collection.end({msg: msg});
      this.$el.val('');
    }
  });

})(this);