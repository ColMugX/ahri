'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var router = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _router = router;
  (0, _utils.assert)(_router.routes, '[router] routes not found!');

  router.routes.forEach(function (route, idx) {
    if ((0, _utils.isString)(route.component)) {
      _router.routes[idx].component = lazyLoad(route.component);
    }
  });
  return new _vueRouter2.default(_router);
};

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lazyLoad = function lazyLoad(route) {
  return function (resolve) {
    return require(['@/routes/' + route], resolve);
  };
};
