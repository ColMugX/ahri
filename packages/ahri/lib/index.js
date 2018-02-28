'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var app = (0, _core2.default)();

  var router = function router(_router) {
    _vue2.default.use(_vueRouter2.default);
    _router = (0, _router3.default)(_router);
    app._router = _router;
  };

  // 参考 dva 对节点的挂载方式
  var start = function start(container) {
    if ((0, _utils.isString)(container)) {
      container = document.querySelector(container);
    }
    (0, _utils.assert)(!container || (0, _utils.isElement)(container), '[Ahri] container should be HTMLElement');
    (0, _utils.assert)(app._router, '[Ahri] router must be registered before app.start()');

    var store = app.store(app._model);
    return opt.ajax ? withAjax(container, store, app._router) : render(container, store, app._router);
  };

  app.start = start;
  app.router = router;
  app.use = _vue2.default.use.bind(_vue2.default);

  return app;
};

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _utils = require('./utils');

var _router2 = require('./router');

var _router3 = _interopRequireDefault(_router2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(container, store, router) {
  var app = new _vue2.default({
    store: store,
    router: router,
    render: function render(h) {
      return h('div', { attrs: { id: 'app' } }, [h('router-view')]);
    }
  });

  return container ? app.$mount(container) : app;
};

var withAjax = function withAjax(container, store, router) {
  _vue2.default.prototype.$ajax = require('axios');
  return render(container, store, router);
};
