"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***
 *  file: config.js
 *  description: the configuration of the API (base url, authentication, etc...)
 * 
 */
var _default = _axios["default"].create({
  baseURL: "https://wiconet.herokuapp.com/product-api/",

  /*
  auth: {
      username: 'honore',
      password: 'honoresuperuser'
  },
  */
  headers: {
    'Authorization': 'Token d008d5428c8cac7388db192fcfbc92862bd794b5'
  }
});

exports["default"] = _default;