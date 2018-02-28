'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _model = [(0, _checkModel2.default)(initModel)];

  var model = function model(_model2) {
    return _model.push((0, _checkModel2.default)(_model2));
  };

  var store = function store(models, plugin) {
    return createStore({
      modules: (0, _checkModel.mixModel)(models),
      plugin: plugin
    });
  };

  var app = {
    _model: _model,
    model: model,
    store: store
  };
  return app;
};

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _checkModel = require('./checkModel');

var _checkModel2 = _interopRequireDefault(_checkModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initModel = {
  namespace: '@@ahri',
  state: {
    count: 0
  },
  mutations: {
    update: function update(state) {
      return state.count += 1;
    }
  }
};

var createStore = function createStore(config) {
  _vue2.default.use(_vuex2.default);
  return new _vuex2.default.Store(config);
};
