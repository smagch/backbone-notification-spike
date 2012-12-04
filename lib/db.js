
/**
 * Module Dependencies
 */

var _ = require('underscore')
  , utils = require('./utils');

/**
 * Database constructor
 */

function DB(data) {
  this.data = [];
  if (Array.isArray(data)) {
    data.forEach(function (model) {
      this.add(model);
    }, this);
  } else if (typeof data === 'object') {
    this.add(data);
  }
}

/**
 * export DB
 */

module.exports = DB;

/**
 * return all data
 * @return {Array}
 */

DB.prototype.getAll = function () {
  return this.data.concat();
};

/**
 * find item by id
 * return {Object}
 */

DB.prototype.findById = function (id) {
  return _.find(this.data, function (model) {
    return model.id === id;
  });
};

/**
 * add item
 * @return {Object}
 */

DB.prototype.add = function (model) {
  if (typeof model !== 'object' || model.id) return null;
  model.id = utils.getId();
  this.data.push(model);
  return model;
};

/**
 * update item
 * @return {Object}
 */

DB.prototype.update = function (model) {
  if (typeof model !== 'object' || !model.id) {
    return null;
  }
  var target = this.findById(model.id);
  if (!target) return null;
  target.msg = model.msg;
  return model;
};

/**
 * delete by id, and return the model
 * @return {Object}
 */

DB.prototype.remove = function (id) {
  var model = this.findById(id);
  if (!model) return null;
  var index = this.data.indexOf(model);
  this.data.splice(index, 1);
  return model;
};