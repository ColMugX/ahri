'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = require('./lib');
module.exports = exports['default'];

var _connect = require('./lib/connect');

Object.keys(_connect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _connect[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
