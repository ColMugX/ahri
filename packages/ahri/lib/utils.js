'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assert = exports.assert = function assert(condition, msg) {
  if (!condition) throw new Error('' + msg);
};
var isObject = exports.isObject = function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};
var isFunction = exports.isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};
var isString = exports.isString = function isString(str) {
  return typeof str === 'string';
};
var isElement = exports.isElement = function isElement(node) {
  return (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node !== null && node.nodeType && node.nodeName;
};
