
/**
 * generate guid
 */

exports.getId = function () {
  return Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
};