

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 *  file: product.js
 *  description: Contains the function used to fetch the list of all products from API
 */
// Libraries
var list = function list() {
  return _config["default"].get('products/');
};

exports.list = list;