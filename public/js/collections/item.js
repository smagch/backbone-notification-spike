(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var Backbone = global.Backbone,
    ItemModel = global.ItemModel;

  global.ItemCollection = Backbone.Collection.extend({
    model: ItemModel,
    url: '/item',
    edit: function (id, options) {
      var model = this.get(id);
      if (!model) throw new Error('invalid id : ' + id);
      if (this._edit === model) return;
      if (this._edit) this.end();
      this._edit = model;
      this.trigger('edit', model, options);
    },
    end: function (model) {
      if (this._edit && model && model.msg === '') {
        model = this.get(this._edit.id);
        this._edit = null;
        model.destroy({
          wait: true
        });
      } else if (!this._edit && model) {
        this.create(model, {
          silent: true,
          wait: true
        });
      } else {
        this.trigger('end', this._edit);
        this._edit.save(model, {
          silent: true,
          wait: true
        });
        this._edit = null;
      }
    }
  });

})(this);