"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.create = exports.retrieve = exports.list = exports.product = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var product = function product(id) {
  return _config["default"].get('products/' + id + '/detail');
};

exports.product = product;

var list = function list() {
  return _config["default"].get('product_details/');
};

exports.list = list;

var retrieve = function retrieve(id) {
  return _config["default"].get('product_details/' + id + '/');
};

exports.retrieve = retrieve;

var create = function create(prod) {
  return _config["default"].post('product_details/', prod);
};

exports.create = create;

var update = function update(id, prod) {
  return _config["default"].put('product_details/' + id + '/', prod);
};

exports.update = update;

var destroy = function destroy(id) {
  return _config["default"]["delete"]('product_details/' + id + '/');
};

exports.destroy = destroy;