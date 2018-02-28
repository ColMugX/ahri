'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = checkModel;
exports.mixModel = mixModel;

var _utils = require('./utils');

function checkModel(model) {
  var namespace = model.namespace,
      state = model.state,
      getter = model.getter,
      mutations = model.mutations,
      actions = model.actions,
      subscriptions = model.subscriptions;

  var out = {};
  var store = out.store = {};

  (0, _utils.assert)(state, 'state not found!');
  (0, _utils.assert)(mutations, 'mutations not found!');
  (0, _utils.assert)((0, _utils.isObject)(mutations), 'mutations should be object, but got ' + (typeof mutations === 'undefined' ? 'undefined' : _typeof(mutations)));

  if (namespace && (0, _utils.isString)(namespace)) {
    (0, _utils.assert)(namespace !== 'GlobalApp', 'namespace should not be GlobalApp');
    store.namespaced = true;
    out.name = namespace;
  } else {
    out.name = 'GlobalApp';
  }

  if (actions) {
    (0, _utils.assert)(actions, 'actions should be object, but got ' + (typeof actions === 'undefined' ? 'undefined' : _typeof(actions)));
  }

  if (subscriptions) {
    (0, _utils.assert)(Object.keys(subscriptions).every(function (key) {
      return (0, _utils.isFunction)(subscriptions[key]);
    }), 'subscription should be function');
  }

  store.state = state;
  store.mutations = mutations;
  store.actions = actions;
  store.getter = getter || {};

  return out;
}

function mixModel(models) {
  var modules = {};

  for (var key in models) {
    var model = models[key];
    modules[model.name] = model.store;
  }
  return modules;
}
