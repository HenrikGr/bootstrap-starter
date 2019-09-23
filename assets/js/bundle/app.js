/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/src/app.js":
/*!******************************!*\
  !*** ./assets/js/src/app.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./assets/js/src/events.js\");\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_events__WEBPACK_IMPORTED_MODULE_0__);\n//JQuery Module Pattern\r\n\r\nconsole.log(_events__WEBPACK_IMPORTED_MODULE_0___default.a)\r\n\r\nconst app = {\r\n  init: () => {\r\n    let emitter = new _events__WEBPACK_IMPORTED_MODULE_0___default.a.Events()\r\n    emitter.on('tick', number => {\r\n      console.log(number)\r\n    })\r\n\r\n    emitter.emit('tick', 1)\r\n    console.log('Started again', window.$)\r\n  },\r\n  test: function() {\r\n    console.log('test')\r\n  }\r\n}\r\n\r\n\r\n\r\n/**\r\n * Bootstrap app\r\n */\r\n$('document').ready(function() {\r\n  app.init()\r\n})\r\n\n\n//# sourceURL=webpack:///./assets/js/src/app.js?");

/***/ }),

/***/ "./assets/js/src/events.js":
/*!*********************************!*\
  !*** ./assets/js/src/events.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\n(function(exports) {\r\n\r\n  /**\r\n   * Interface for event subscription.\r\n   * @alias NanoEvents\r\n   * @class\r\n   */\r\n  exports.Events = function () {\r\n    this.events = {}\r\n  }\r\n\r\n  /**\r\n   * Calls each of the listeners registered for a given event.\r\n   * @param {string} event The event name.\r\n   * @param {...*} arguments The arguments for listeners.\r\n   * @return {undefined}\r\n   *\r\n   * @example\r\n   * ee.emit('tick', tickType, tickDuration)\r\n   *\r\n   * @alias NanoEvents#emit\r\n   * @method\r\n   */\r\n  exports.Events.prototype.emit = function(event) {\r\n    let args = [].slice.call(arguments, 1)\r\n      // Array.prototype.call() returns empty array if context is not array-like\r\n    ;[].slice.call(this.events[event] || []).filter(function (i) {\r\n      i.apply(this, args) // this === global or window\r\n    })\r\n  }\r\n\r\n  /**\r\n   * Add a listener for a given event.\r\n   * @param {string} event The event name.\r\n   * @param {function} cb The listener function.\r\n   * @return {function} Unbind listener from event.\r\n   * @example\r\n   * const unbind = ee.on('tick', (tickType, tickDuration) => {\r\n   *   count += 1\r\n   * })\r\n   *\r\n   * disable () {\r\n   *   unbind()\r\n   * }\r\n   * @alias NanoEvents#on\r\n   * @method\r\n   */\r\n  exports.Events.prototype.on = function(event, cb) {\r\n    if ( true && typeof cb !== 'function') {\r\n      throw new Error('Listener must be a function')\r\n    }\r\n\r\n    (this.events[event] = this.events[event] || []).push(cb)\r\n\r\n    return function () {\r\n      this.events[event] = this.events[event].filter(function (i) {\r\n        return i !== cb\r\n      })\r\n    }.bind(this)\r\n  }\r\n\r\n}( false ? (undefined) : exports));\r\n\r\n\n\n//# sourceURL=webpack:///./assets/js/src/events.js?");

/***/ }),

/***/ "./assets/js/src/flip-card.js":
/*!************************************!*\
  !*** ./assets/js/src/flip-card.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\n/**\r\n * Constants\r\n * @type {string}\r\n */\r\nconst NAME                = 'flip'\r\nconst VERSION             = '1.0.0'\r\nconst DATA_KEY            = 'custom.flip'\r\nconst EVENT_KEY           = `.${DATA_KEY}`\r\nconst DATA_API_KEY        = '.data-api'\r\nconst JQUERY_NO_CONFLICT  = $.fn[NAME]\r\n\r\n/**\r\n * Class names\r\n * @type {{CONTAINER: string, TRANSFORM: string}}\r\n */\r\nconst ClassName = {\r\n  CONTAINER: 'flip-container',\r\n  TRANSFORM: 'flip'\r\n}\r\n\r\n/**\r\n * Selectors\r\n * @type {{CONTAINER: string}}\r\n */\r\nconst Selector = {\r\n  CONTAINER: '.flip-container',\r\n}\r\n\r\n/**\r\n * Custom events\r\n * @type {{CLICK_DATA_API: string}}\r\n */\r\nconst Event = {\r\n  CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`\r\n}\r\n\r\n/**\r\n * Flip constructor\r\n * @param element\r\n * @constructor\r\n */\r\nfunction Flip(element) {\r\n  this._element = element || ClassName.CONTAINER\r\n  Flip.VERSION = VERSION\r\n}\r\n\r\n/**\r\n * Toggle method\r\n */\r\nFlip.prototype.toggle = function() {\r\n  $(this._element).toggleClass(ClassName.TRANSFORM)\r\n}\r\n\r\n/**\r\n * Dispose method\r\n */\r\nFlip.prototype.dispose = function() {\r\n  $.removeData(this._element, DATA_KEY)\r\n  this._element = null\r\n}\r\n\r\n/**\r\n * Static interface\r\n * @param config\r\n * @returns {*|jQuery}\r\n * @private\r\n */\r\nFlip._jQueryInterface = function (config) { //static method\r\n  return this.each(function() {\r\n    // Get data for the instance\r\n    let data = $(this).data(DATA_KEY)\r\n\r\n\r\n    // If no data for the instance, ie no flip component being instantiated,\r\n    // create a new instance and set data api on the component\r\n    if (!data) {\r\n      data = new Flip(this)\r\n      $(this).data(DATA_KEY, data)\r\n    }\r\n\r\n    if (config === 'toggle') {\r\n      data.toggle()\r\n    }\r\n  })\r\n}\r\n\r\n\r\n\r\n/**\r\n * Data Api implementation\r\n */\r\n\r\n/**\r\n * OnClick event handler, uses a static method to call the component\r\n * interface. If no component has been instantiated, the static interface will do\r\n */\r\n$(document).on(Event.CLICK_DATA_API, Selector.CONTAINER, event => {\r\n  event.preventDefault()\r\n  Flip._jQueryInterface.call($(Selector.CONTAINER), 'toggle')\r\n})\r\n\r\n/**\r\n * jQuery\r\n */\r\n$.fn[NAME] = Flip._jQueryInterface\r\n$.fn[NAME].Constructor = Flip\r\n$.fn[NAME].noConflict = () => {\r\n  $.fn[NAME] = JQUERY_NO_CONFLICT\r\n  return Flip._jQueryInterface\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Flip);\r\n\n\n//# sourceURL=webpack:///./assets/js/src/flip-card.js?");

/***/ }),

/***/ "./assets/js/src/flip.js":
/*!*******************************!*\
  !*** ./assets/js/src/flip.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\n\r\n\r\n\r\n\r\n\r\nfunction myModule() {\r\n  this.hello = function() {\r\n    return 'hello!';\r\n  }\r\n\r\n  this.goodbye = function() {\r\n    return 'goodbye!';\r\n  }\r\n}\r\n\r\nmodule.exports = myModule;\n\n//# sourceURL=webpack:///./assets/js/src/flip.js?");

/***/ }),

/***/ 0:
/*!*******************************************************************************************************************!*\
  !*** multi ./assets/js/src/app.js ./assets/js/src/events.js ./assets/js/src/flip-card.js ./assets/js/src/flip.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! C:\\Users\\Henrik\\WebstormProjects\\ICA\\bootstrap-starter\\assets\\js\\src\\app.js */\"./assets/js/src/app.js\");\n__webpack_require__(/*! C:\\Users\\Henrik\\WebstormProjects\\ICA\\bootstrap-starter\\assets\\js\\src\\events.js */\"./assets/js/src/events.js\");\n__webpack_require__(/*! C:\\Users\\Henrik\\WebstormProjects\\ICA\\bootstrap-starter\\assets\\js\\src\\flip-card.js */\"./assets/js/src/flip-card.js\");\nmodule.exports = __webpack_require__(/*! C:\\Users\\Henrik\\WebstormProjects\\ICA\\bootstrap-starter\\assets\\js\\src\\flip.js */\"./assets/js/src/flip.js\");\n\n\n//# sourceURL=webpack:///multi_./assets/js/src/app.js_./assets/js/src/events.js_./assets/js/src/flip-card.js_./assets/js/src/flip.js?");

/***/ })

/******/ });