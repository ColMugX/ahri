'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.functional = undefined;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functional = function functional(fn) {
  return _vue2.default.component(fn.name || 'anonymous', {
    functional: true,
    render: function render(h, ctx) {
      return fn.call(this, h, ctx.props, ctx.data);
    }
  });
};

exports.functional = functional;
