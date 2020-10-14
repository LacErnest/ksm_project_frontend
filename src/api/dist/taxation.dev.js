"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.create = exports.retrieve = exports.list = exports.product = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var product = function product(id) {
  return _config["default"].get('products/' + id + '/taxes');
};

exports.product = product;

var list = function list() {
  return _config["default"].get('product_taxations/');
};

exports.list = list;

var retrieve = function retrieve(id) {
  return _config["default"].get('product_taxations/' + id + '/');
};

exports.retrieve = retrieve;

var create = function create(prod) {
  return _config["default"].post('product_taxations/', prod);
};

exports.create = create;

var update = function update(id, prod) {
  return _config["default"].put('product_taxations/' + id + '/', prod);
};

exports.update = update;

var destroy = function destroy(id) {
  return _config["default"]["delete"]('product_taxations/' + id + '/');
};

exports.destroy = destroy;