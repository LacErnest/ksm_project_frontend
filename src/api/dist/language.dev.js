"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var list = function list() {
  return _config["default"].get('languages/');
};

exports.list = list;