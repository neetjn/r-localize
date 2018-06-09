(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Localize"] = factory();
	else
		root["Localize"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Riot = __webpack_require__(1);
const logger_1 = __webpack_require__(5);
const localize_tag_1 = __webpack_require__(6);
class Localize extends Riot.Observable {
    constructor(instance, options, localizations) {
        super();
        if (!options.default || !options.available)
            throw new Error('Expected options to include a default locale and list of available locales');
        options.available.forEach(locale => {
            if (!localizations[locale])
                throw Error(`Locale "${locale}" has no mappings available`);
        });
        options.debug = typeof (options.debug) == 'undefined' ? false : options.debug;
        options.fallbackContent = options.fallbackContent || false;
        options.fallback = options.fallback || '?';
        options.webStore = options.webStore || false;
        this.options = options;
        this.localizations = localizations;
        if (this.webStore)
            this._locale = window.localStorage.getItem('localization') || this.options.default;
        else
            this._locale = this.options.default;
        this.$logger = new logger_1.Logger(this.options.debug);
        this.$logger.log('Localize mixin instantiated.');
        instance.mixin({ localize: this });
        instance.tag('localize', false, false, false, localize_tag_1.Tag);
    }
    get webStore() {
        return this.options.webStore && typeof (window) !== 'undefined';
    }
    locale(locale = null) {
        if (locale) {
            if (!this.options.available.find(l => l == locale)) {
                this.$logger.error(`Locale "${locale}" not recognized.`);
                return;
            }
            this.trigger('update');
            if (this.webStore)
                window.localStorage.setItem('localization', locale);
            this._locale = locale;
            this.$logger.log(`Locale changed to "${locale}".`);
            this.trigger('updated');
        }
        return this._locale;
    }
    translate(item, locale = null) {
        const self = this;
        let stub = self.localizations[locale || self._locale];
        if (locale && !this.options.available.find(l => l == locale)) {
            this.$logger.error(`Locale "${locale}" not recognized.`);
            return this.options.fallback;
        }
        const branches = item.split('.');
        for (const b in branches) {
            const branch = branches[b];
            if (stub[branch])
                stub = stub[branch];
            else {
                self.$logger.error(`Provided item "${item}" could not be localized in locale "${locale || self._locale}".`);
                return this.options.fallback;
            }
        }
        this.$logger.log(`Localized item "${item}" retrieved for locale "${locale || self._locale}".`);
        self.trigger('localize', { item, locale: locale || self._locale });
        return stub;
    }
}
exports.default = Localize;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var riot = __webpack_require__(2);
var Observable = (function () {
    function Observable() {
        riot.observable(this);
    }
    Observable.prototype.on = function (events, callback) { };
    Observable.prototype.one = function (events, callback) { };
    Observable.prototype.off = function (events) { };
    Observable.prototype.trigger = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    return Observable;
}());
exports.Observable = Observable;
var Element = (function () {
    function Element() {
    }
    Element.prototype.update = function (data) { };
    Element.prototype.unmount = function (keepTheParent) { };
    Element.prototype.on = function (eventName, fun) { };
    Element.prototype.one = function (eventName, fun) { };
    Element.prototype.off = function (events) { };
    Element.prototype.trigger = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    Element.prototype.mixin = function (mixinObject, instance) { };
    Element.createElement = function (options) {
        var tagName = this.prototype.tagName;
        var el = document.createElement(tagName);
        riot.mount(el, tagName, options);
        return el;
    };
    return Element;
}());
exports.Element = Element;
// new extend, works with getters and setters
function extend(d, element) {
    var map = Object.keys(element.prototype).reduce(function (descriptors, key) {
        descriptors[key] = Object.getOwnPropertyDescriptor(element.prototype, key);
        return descriptors;
    }, {});
    Object.defineProperties(d, map);
}
/* old extend, without getters and setters
function extend(d, element) {
   Object.keys(element.prototype).forEach((key) => d[key] = element.prototype[key]);
}
*/
exports.precompiledTags = {};
function registerClass(element) {
    function registerTag(compiledTag) {
        var transformFunction = function (opts) {
            extend(this, element); // copies prototype into "this"
            element.apply(this, [opts]); // calls class constructor applying it on "this"
            if (element.prototype.mounted !== undefined)
                this.on("mount", this.mounted);
            if (element.prototype.unmounted !== undefined)
                this.on("unmount", this.unmounted);
            if (element.prototype.updating !== undefined)
                this.on("update", this.updating);
            if (element.prototype.updated !== undefined)
                this.on("updated", this.updated);
            // TODO support for init(opts) ?
        };
        riot.tag2(compiledTag.tagName, compiledTag.html, compiledTag.css, compiledTag.attribs, transformFunction, riot.settings.brackets);
        return compiledTag.tagName;
    }
    function loadTemplateFromHTTP(template) {
        var req = new XMLHttpRequest();
        req.open("GET", template, false);
        req.send();
        if (req.status == 200)
            return req.responseText;
        else
            throw req.responseText;
    }
    ;
    var compiled;
    // gets string template: inlined, via http request or via precompiled cache
    if (element.prototype.template !== undefined) {
        var tagTemplate = element.prototype.template;
        if (tagTemplate.indexOf("<") < 0) {
            // tag is a file
            if (exports.precompiledTags[tagTemplate] !== undefined) {
                // loads it from precompiled cache
                compiled = exports.precompiledTags[tagTemplate];
            }
            else {
                // loads from HTTP and compile on the fly
                tagTemplate = loadTemplateFromHTTP(tagTemplate);
                compiled = riot.compile(tagTemplate, true, { entities: true })[0];
            }
        }
        else {
            // tag is inlined, compile on the fly
            compiled = riot.compile(tagTemplate, true, { entities: true })[0];
        }
        element.prototype.tagName = registerTag(compiled);
    }
    else
        throw "template property not specified";
}
exports.registerClass = registerClass;
// @template decorator
function template(template) {
    return function (target) {
        target.prototype["template"] = template;
        registerClass(target);
    };
}
exports.template = template;
//# sourceMappingURL=riot-ts.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_RESULT__;/* Riot v2.6.8, @license MIT */

;(function(window, undefined) {
  'use strict';
var riot = { version: 'v2.6.8', settings: {} },
  // be aware, internal usage
  // ATTENTION: prefix the global dynamic variables with `__`

  // counter to give a unique id to all the Tag instances
  __uid = 0,
  // tags instances cache
  __virtualDom = [],
  // tags implementation cache
  __tagImpl = {},

  /**
   * Const
   */
  GLOBAL_MIXIN = '__global_mixin',

  // riot specific prefixes
  RIOT_PREFIX = 'riot-',
  RIOT_TAG = RIOT_PREFIX + 'tag',
  RIOT_TAG_IS = 'data-is',

  // for typeof == '' comparisons
  T_STRING = 'string',
  T_OBJECT = 'object',
  T_UNDEF  = 'undefined',
  T_FUNCTION = 'function',
  XLINK_NS = 'http://www.w3.org/1999/xlink',
  XLINK_REGEX = /^xlink:(\w+)/,
  // special native tags that cannot be treated like the others
  SPECIAL_TAGS_REGEX = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
  RESERVED_WORDS_BLACKLIST = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,
  // SVG tags list https://www.w3.org/TR/SVG/attindex.html#PresentationAttributes
  SVG_TAGS_LIST = ['altGlyph', 'animate', 'animateColor', 'circle', 'clipPath', 'defs', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feGaussianBlur', 'feImage', 'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence', 'filter', 'font', 'foreignObject', 'g', 'glyph', 'glyphRef', 'image', 'line', 'linearGradient', 'marker', 'mask', 'missing-glyph', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tref', 'tspan', 'use'],

  // version# for IE 8-11, 0 for others
  IE_VERSION = (window && window.document || {}).documentMode | 0,

  // detect firefox to fix #1374
  FIREFOX = window && !!window.InstallTrigger
/* istanbul ignore next */
riot.observable = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {}

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice

  /**
   * Private Methods
   */

  /**
   * Helper function needed to get and loop all the events in a string
   * @param   { String }   e - event string
   * @param   {Function}   fn - callback
   */
  function onEachEvent(e, fn) {
    var es = e.split(' '), l = es.length, i = 0
    for (; i < l; i++) {
      var name = es[i]
      if (name) fn(name, i)
    }
  }

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given space separated list of `events` and
     * execute the `callback` each time an event is triggered.
     * @param  { String } events - events ids
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(events, fn) {
        if (typeof fn != 'function')  return el

        onEachEvent(events, function(name, pos) {
          (callbacks[name] = callbacks[name] || []).push(fn)
          fn.typed = pos > 0
        })

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given space separated list of `events` listeners
     * @param   { String } events - events ids
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(events, fn) {
        if (events == '*' && !fn) callbacks = {}
        else {
          onEachEvent(events, function(name, pos) {
            if (fn) {
              var arr = callbacks[name]
              for (var i = 0, cb; cb = arr && arr[i]; ++i) {
                if (cb == fn) arr.splice(i--, 1)
              }
            } else delete callbacks[name]
          })
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given space separated list of `events` and
     * execute the `callback` at most once
     * @param   { String } events - events ids
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(events, fn) {
        function on() {
          el.off(events, on)
          fn.apply(el, arguments)
        }
        return el.on(events, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given space separated list of `events`
     * @param   { String } events - events ids
     * @returns { Object } el
     */
    trigger: {
      value: function(events) {

        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns

        for (var i = 0; i < arglen; i++) {
          args[i] = arguments[i + 1] // skip first argument
        }

        onEachEvent(events, function(name, pos) {

          fns = slice.call(callbacks[name] || [], 0)

          for (var i = 0, fn; fn = fns[i]; ++i) {
            if (fn.busy) continue
            fn.busy = 1
            fn.apply(el, fn.typed ? [name].concat(args) : args)
            if (fns[i] !== fn) { i-- }
            fn.busy = 0
          }

          if (callbacks['*'] && name != '*')
            el.trigger.apply(el, ['*', name].concat(args))

        })

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  })

  return el

}
/* istanbul ignore next */
;(function(riot) {

/**
 * Simple client-side router
 * @module riot-route
 */


var RE_ORIGIN = /^.+?\/\/+[^\/]+/,
  EVENT_LISTENER = 'EventListener',
  REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER,
  ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER,
  HAS_ATTRIBUTE = 'hasAttribute',
  REPLACE = 'replace',
  POPSTATE = 'popstate',
  HASHCHANGE = 'hashchange',
  TRIGGER = 'trigger',
  MAX_EMIT_STACK_LEVEL = 3,
  win = typeof window != 'undefined' && window,
  doc = typeof document != 'undefined' && document,
  hist = win && history,
  loc = win && (hist.location || win.location), // see html5-history-api
  prot = Router.prototype, // to minify more
  clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click',
  started = false,
  central = riot.observable(),
  routeFound = false,
  debouncedEmit,
  base, current, parser, secondParser, emitStack = [], emitStackLevel = 0

/**
 * Default parser. You can replace it via router.parser method.
 * @param {string} path - current path (normalized)
 * @returns {array} array
 */
function DEFAULT_PARSER(path) {
  return path.split(/[/?#]/)
}

/**
 * Default parser (second). You can replace it via router.parser method.
 * @param {string} path - current path (normalized)
 * @param {string} filter - filter string (normalized)
 * @returns {array} array
 */
function DEFAULT_SECOND_PARSER(path, filter) {
  var re = new RegExp('^' + filter[REPLACE](/\*/g, '([^/?#]+?)')[REPLACE](/\.\./, '.*') + '$'),
    args = path.match(re)

  if (args) return args.slice(1)
}

/**
 * Simple/cheap debounce implementation
 * @param   {function} fn - callback
 * @param   {number} delay - delay in seconds
 * @returns {function} debounced function
 */
function debounce(fn, delay) {
  var t
  return function () {
    clearTimeout(t)
    t = setTimeout(fn, delay)
  }
}

/**
 * Set the window listeners to trigger the routes
 * @param {boolean} autoExec - see route.start
 */
function start(autoExec) {
  debouncedEmit = debounce(emit, 1)
  win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit)
  win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit)
  doc[ADD_EVENT_LISTENER](clickEvent, click)
  if (autoExec) emit(true)
}

/**
 * Router class
 */
function Router() {
  this.$ = []
  riot.observable(this) // make it observable
  central.on('stop', this.s.bind(this))
  central.on('emit', this.e.bind(this))
}

function normalize(path) {
  return path[REPLACE](/^\/|\/$/, '')
}

function isString(str) {
  return typeof str == 'string'
}

/**
 * Get the part after domain name
 * @param {string} href - fullpath
 * @returns {string} path from root
 */
function getPathFromRoot(href) {
  return (href || loc.href)[REPLACE](RE_ORIGIN, '')
}

/**
 * Get the part after base
 * @param {string} href - fullpath
 * @returns {string} path from base
 */
function getPathFromBase(href) {
  return base[0] == '#'
    ? (href || loc.href || '').split(base)[1] || ''
    : (loc ? getPathFromRoot(href) : href || '')[REPLACE](base, '')
}

function emit(force) {
  // the stack is needed for redirections
  var isRoot = emitStackLevel == 0, first
  if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) return

  emitStackLevel++
  emitStack.push(function() {
    var path = getPathFromBase()
    if (force || path != current) {
      central[TRIGGER]('emit', path)
      current = path
    }
  })
  if (isRoot) {
    while (first = emitStack.shift()) first() // stack increses within this call
    emitStackLevel = 0
  }
}

function click(e) {
  if (
    e.which != 1 // not left click
    || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
    || e.defaultPrevented // or default prevented
  ) return

  var el = e.target
  while (el && el.nodeName != 'A') el = el.parentNode

  if (
    !el || el.nodeName != 'A' // not A tag
    || el[HAS_ATTRIBUTE]('download') // has download attr
    || !el[HAS_ATTRIBUTE]('href') // has no href attr
    || el.target && el.target != '_self' // another window or frame
    || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) == -1 // cross origin
  ) return

  if (el.href != loc.href
    && (
      el.href.split('#')[0] == loc.href.split('#')[0] // internal jump
      || base[0] != '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
      || base[0] == '#' && el.href.split(base)[0] != loc.href.split(base)[0] // outside of #base
      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
    )) return

  e.preventDefault()
}

/**
 * Go to the path
 * @param {string} path - destination path
 * @param {string} title - page title
 * @param {boolean} shouldReplace - use replaceState or pushState
 * @returns {boolean} - route not found flag
 */
function go(path, title, shouldReplace) {
  // Server-side usage: directly execute handlers for the path
  if (!hist) return central[TRIGGER]('emit', getPathFromBase(path))

  path = base + normalize(path)
  title = title || doc.title
  // browsers ignores the second parameter `title`
  shouldReplace
    ? hist.replaceState(null, title, path)
    : hist.pushState(null, title, path)
  // so we need to set it manually
  doc.title = title
  routeFound = false
  emit()
  return routeFound
}

/**
 * Go to path or set action
 * a single string:                go there
 * two strings:                    go there with setting a title
 * two strings and boolean:        replace history with setting a title
 * a single function:              set an action on the default route
 * a string/RegExp and a function: set an action on the route
 * @param {(string|function)} first - path / action / filter
 * @param {(string|RegExp|function)} second - title / action
 * @param {boolean} third - replace flag
 */
prot.m = function(first, second, third) {
  if (isString(first) && (!second || isString(second))) go(first, second, third || false)
  else if (second) this.r(first, second)
  else this.r('@', first)
}

/**
 * Stop routing
 */
prot.s = function() {
  this.off('*')
  this.$ = []
}

/**
 * Emit
 * @param {string} path - path
 */
prot.e = function(path) {
  this.$.concat('@').some(function(filter) {
    var args = (filter == '@' ? parser : secondParser)(normalize(path), normalize(filter))
    if (typeof args != 'undefined') {
      this[TRIGGER].apply(null, [filter].concat(args))
      return routeFound = true // exit from loop
    }
  }, this)
}

/**
 * Register route
 * @param {string} filter - filter for matching to url
 * @param {function} action - action to register
 */
prot.r = function(filter, action) {
  if (filter != '@') {
    filter = '/' + normalize(filter)
    this.$.push(filter)
  }
  this.on(filter, action)
}

var mainRouter = new Router()
var route = mainRouter.m.bind(mainRouter)

/**
 * Create a sub router
 * @returns {function} the method of a new Router object
 */
route.create = function() {
  var newSubRouter = new Router()
  // assign sub-router's main method
  var router = newSubRouter.m.bind(newSubRouter)
  // stop only this sub-router
  router.stop = newSubRouter.s.bind(newSubRouter)
  return router
}

/**
 * Set the base of url
 * @param {(str|RegExp)} arg - a new base or '#' or '#!'
 */
route.base = function(arg) {
  base = arg || '#'
  current = getPathFromBase() // recalculate current path
}

/** Exec routing right now **/
route.exec = function() {
  emit(true)
}

/**
 * Replace the default router to yours
 * @param {function} fn - your parser function
 * @param {function} fn2 - your secondParser function
 */
route.parser = function(fn, fn2) {
  if (!fn && !fn2) {
    // reset parser for testing...
    parser = DEFAULT_PARSER
    secondParser = DEFAULT_SECOND_PARSER
  }
  if (fn) parser = fn
  if (fn2) secondParser = fn2
}

/**
 * Helper function to get url query as an object
 * @returns {object} parsed query
 */
route.query = function() {
  var q = {}
  var href = loc.href || current
  href[REPLACE](/[?&](.+?)=([^&]*)/g, function(_, k, v) { q[k] = v })
  return q
}

/** Stop routing **/
route.stop = function () {
  if (started) {
    if (win) {
      win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit)
      win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit)
      doc[REMOVE_EVENT_LISTENER](clickEvent, click)
    }
    central[TRIGGER]('stop')
    started = false
  }
}

/**
 * Start routing
 * @param {boolean} autoExec - automatically exec after starting if true
 */
route.start = function (autoExec) {
  if (!started) {
    if (win) {
      if (document.readyState == 'complete') start(autoExec)
      // the timeout is needed to solve
      // a weird safari bug https://github.com/riot/route/issues/33
      else win[ADD_EVENT_LISTENER]('load', function() {
        setTimeout(function() { start(autoExec) }, 1)
      })
    }
    started = true
  }
}

/** Prepare the router **/
route.base()
route.parser()

riot.route = route
})(riot)
/* istanbul ignore next */

/**
 * The riot template engine
 * @version v2.4.2
 */
/**
 * riot.util.brackets
 *
 * - `brackets    ` - Returns a string or regex based on its parameter
 * - `brackets.set` - Change the current riot brackets
 *
 * @module
 */

var brackets = (function (UNDEF) {

  var
    REGLOB = 'g',

    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,

    S_QBLOCKS = R_STRINGS.source + '|' +
      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,

    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

    FINDBRACES = {
      '(': RegExp('([()])|'   + S_QBLOCKS, REGLOB),
      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
      '{': RegExp('([{}])|'   + S_QBLOCKS, REGLOB)
    },

    DEFAULT = '{ }'

  var _pairs = [
    '{', '}',
    '{', '}',
    /{[^}]*}/,
    /\\([{}])/g,
    /\\({)|{/g,
    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB),
    DEFAULT,
    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
    /(^|[^\\]){=[\S\s]*?}/
  ]

  var
    cachedBrackets = UNDEF,
    _regex,
    _cache = [],
    _settings

  function _loopback (re) { return re }

  function _rewrite (re, bp) {
    if (!bp) bp = _cache
    return new RegExp(
      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
    )
  }

  function _create (pair) {
    if (pair === DEFAULT) return _pairs

    var arr = pair.split(' ')

    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
      throw new Error('Unsupported brackets "' + pair + '"')
    }
    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '))

    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr)
    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr)
    arr[6] = _rewrite(_pairs[6], arr)
    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB)
    arr[8] = pair
    return arr
  }

  function _brackets (reOrIdx) {
    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
  }

  _brackets.split = function split (str, tmpl, _bp) {
    // istanbul ignore next: _bp is for the compiler
    if (!_bp) _bp = _cache

    var
      parts = [],
      match,
      isexpr,
      start,
      pos,
      re = _bp[6]

    isexpr = start = re.lastIndex = 0

    while ((match = re.exec(str))) {

      pos = match.index

      if (isexpr) {

        if (match[2]) {
          re.lastIndex = skipBraces(str, match[2], re.lastIndex)
          continue
        }
        if (!match[3]) {
          continue
        }
      }

      if (!match[1]) {
        unescapeStr(str.slice(start, pos))
        start = re.lastIndex
        re = _bp[6 + (isexpr ^= 1)]
        re.lastIndex = start
      }
    }

    if (str && start < str.length) {
      unescapeStr(str.slice(start))
    }

    return parts

    function unescapeStr (s) {
      if (tmpl || isexpr) {
        parts.push(s && s.replace(_bp[5], '$1'))
      } else {
        parts.push(s)
      }
    }

    function skipBraces (s, ch, ix) {
      var
        match,
        recch = FINDBRACES[ch]

      recch.lastIndex = ix
      ix = 1
      while ((match = recch.exec(s))) {
        if (match[1] &&
          !(match[1] === ch ? ++ix : --ix)) break
      }
      return ix ? s.length : recch.lastIndex
    }
  }

  _brackets.hasExpr = function hasExpr (str) {
    return _cache[4].test(str)
  }

  _brackets.loopKeys = function loopKeys (expr) {
    var m = expr.match(_cache[9])

    return m
      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
      : { val: expr.trim() }
  }

  _brackets.array = function array (pair) {
    return pair ? _create(pair) : _cache
  }

  function _reset (pair) {
    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
      _cache = _create(pair)
      _regex = pair === DEFAULT ? _loopback : _rewrite
      _cache[9] = _regex(_pairs[9])
    }
    cachedBrackets = pair
  }

  function _setSettings (o) {
    var b

    o = o || {}
    b = o.brackets
    Object.defineProperty(o, 'brackets', {
      set: _reset,
      get: function () { return cachedBrackets },
      enumerable: true
    })
    _settings = o
    _reset(b)
  }

  Object.defineProperty(_brackets, 'settings', {
    set: _setSettings,
    get: function () { return _settings }
  })

  /* istanbul ignore next: in the browser riot is always in the scope */
  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {}
  _brackets.set = _reset

  _brackets.R_STRINGS = R_STRINGS
  _brackets.R_MLCOMMS = R_MLCOMMS
  _brackets.S_QBLOCKS = S_QBLOCKS

  return _brackets

})()

/**
 * @module tmpl
 *
 * tmpl          - Root function, returns the template value, render with data
 * tmpl.hasExpr  - Test the existence of a expression inside a string
 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
 */

var tmpl = (function () {

  var _cache = {}

  function _tmpl (str, data) {
    if (!str) return str

    return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr)
  }

  _tmpl.haveRaw = brackets.hasRaw

  _tmpl.hasExpr = brackets.hasExpr

  _tmpl.loopKeys = brackets.loopKeys

  // istanbul ignore next
  _tmpl.clearCache = function () { _cache = {} }

  _tmpl.errorHandler = null

  function _logErr (err, ctx) {

    if (_tmpl.errorHandler) {

      err.riotData = {
        tagName: ctx && ctx.root && ctx.root.tagName,
        _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
      }
      _tmpl.errorHandler(err)
    }
  }

  function _create (str) {
    var expr = _getTmpl(str)

    if (expr.slice(0, 11) !== 'try{return ') expr = 'return ' + expr

    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
  }

  var
    CH_IDEXPR = String.fromCharCode(0x2057),
    RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
    RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
    RE_DQUOTE = /\u2057/g,
    RE_QBMARK = /\u2057(\d+)~/g

  function _getTmpl (str) {
    var
      qstr = [],
      expr,
      parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1)

    if (parts.length > 2 || parts[0]) {
      var i, j, list = []

      for (i = j = 0; i < parts.length; ++i) {

        expr = parts[i]

        if (expr && (expr = i & 1

            ? _parseExpr(expr, 1, qstr)

            : '"' + expr
                .replace(/\\/g, '\\\\')
                .replace(/\r\n?|\n/g, '\\n')
                .replace(/"/g, '\\"') +
              '"'

          )) list[j++] = expr

      }

      expr = j < 2 ? list[0]
           : '[' + list.join(',') + '].join("")'

    } else {

      expr = _parseExpr(parts[1], 0, qstr)
    }

    if (qstr[0]) {
      expr = expr.replace(RE_QBMARK, function (_, pos) {
        return qstr[pos]
          .replace(/\r/g, '\\r')
          .replace(/\n/g, '\\n')
      })
    }
    return expr
  }

  var
    RE_BREND = {
      '(': /[()]/g,
      '[': /[[\]]/g,
      '{': /[{}]/g
    }

  function _parseExpr (expr, asText, qstr) {

    expr = expr
          .replace(RE_QBLOCK, function (s, div) {
            return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s
          })
          .replace(/\s+/g, ' ').trim()
          .replace(/\ ?([[\({},?\.:])\ ?/g, '$1')

    if (expr) {
      var
        list = [],
        cnt = 0,
        match

      while (expr &&
            (match = expr.match(RE_CSNAME)) &&
            !match.index
        ) {
        var
          key,
          jsb,
          re = /,|([[{(])|$/g

        expr = RegExp.rightContext
        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1]

        while (jsb = (match = re.exec(expr))[1]) skipBraces(jsb, re)

        jsb  = expr.slice(0, match.index)
        expr = RegExp.rightContext

        list[cnt++] = _wrapExpr(jsb, 1, key)
      }

      expr = !cnt ? _wrapExpr(expr, asText)
           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0]
    }
    return expr

    function skipBraces (ch, re) {
      var
        mm,
        lv = 1,
        ir = RE_BREND[ch]

      ir.lastIndex = re.lastIndex
      while (mm = ir.exec(expr)) {
        if (mm[0] === ch) ++lv
        else if (!--lv) break
      }
      re.lastIndex = lv ? expr.length : ir.lastIndex
    }
  }

  // istanbul ignore next: not both
  var // eslint-disable-next-line max-len
    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/

  function _wrapExpr (expr, asText, key) {
    var tb

    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
      if (mvar) {
        pos = tb ? 0 : pos + match.length

        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
          match = p + '("' + mvar + JS_CONTEXT + mvar
          if (pos) tb = (s = s[pos]) === '.' || s === '(' || s === '['
        } else if (pos) {
          tb = !JS_NOPROPS.test(s.slice(pos))
        }
      }
      return match
    })

    if (tb) {
      expr = 'try{return ' + expr + '}catch(e){E(e,this)}'
    }

    if (key) {

      expr = (tb
          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
        ) + '?"' + key + '":""'

    } else if (asText) {

      expr = 'function(v){' + (tb
          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
        ) + ';return v||v===0?v:""}.call(this)'
    }

    return expr
  }

  _tmpl.version = brackets.version = 'v2.4.2'

  return _tmpl

})()

/*
  lib/browser/tag/mkdom.js

  Includes hacks needed for the Internet Explorer version 9 and below
  See: http://kangax.github.io/compat-table/es5/#ie8
       http://codeplanet.io/dropping-ie8/
*/
var mkdom = (function _mkdom() {
  var
    reHasYield  = /<yield\b/i,
    reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig,
    reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
    reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig
  var
    rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' },
    tblTags = IE_VERSION && IE_VERSION < 10
      ? SPECIAL_TAGS_REGEX : /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/

  /**
   * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
   * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
   *
   * @param   { String } templ  - The template coming from the custom tag definition
   * @param   { String } [html] - HTML content that comes from the DOM element where you
   *           will mount the tag, mostly the original tag in the page
   * @param   { Boolean } checkSvg - flag needed to know if we need to force the svg rendering in case of loop nodes
   * @returns {HTMLElement} DOM element with _templ_ merged through `YIELD` with the _html_.
   */
  function _mkdom(templ, html, checkSvg) {
    var
      match   = templ && templ.match(/^\s*<([-\w]+)/),
      tagName = match && match[1].toLowerCase(),
      el = mkEl('div', checkSvg && isSVGTag(tagName))

    // replace all the yield tags with the tag inner html
    templ = replaceYield(templ, html)

    /* istanbul ignore next */
    if (tblTags.test(tagName))
      el = specialTags(el, templ, tagName)
    else
      setInnerHTML(el, templ)

    el.stub = true

    return el
  }

  /*
    Creates the root element for table or select child elements:
    tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
  */
  function specialTags(el, templ, tagName) {
    var
      select = tagName[0] === 'o',
      parent = select ? 'select>' : 'table>'

    // trim() is important here, this ensures we don't have artifacts,
    // so we can check if we have only one element inside the parent
    el.innerHTML = '<' + parent + templ.trim() + '</' + parent
    parent = el.firstChild

    // returns the immediate parent if tr/th/td/col is the only element, if not
    // returns the whole tree, as this can include additional elements
    if (select) {
      parent.selectedIndex = -1  // for IE9, compatible w/current riot behavior
    } else {
      // avoids insertion of cointainer inside container (ex: tbody inside tbody)
      var tname = rootEls[tagName]
      if (tname && parent.childElementCount === 1) parent = $(tname, parent)
    }
    return parent
  }

  /*
    Replace the yield tag from any tag template with the innerHTML of the
    original tag in the page
  */
  function replaceYield(templ, html) {
    // do nothing if no yield
    if (!reHasYield.test(templ)) return templ

    // be careful with #1343 - string on the source having `$1`
    var src = {}

    html = html && html.replace(reYieldSrc, function (_, ref, text) {
      src[ref] = src[ref] || text   // preserve first definition
      return ''
    }).trim()

    return templ
      .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
        return src[ref] || def || ''
      })
      .replace(reYieldAll, function (_, def) {        // yield without any "from"
        return html || def || ''
      })
  }

  return _mkdom

})()

/**
 * Convert the item looped into an object used to extend the child tag properties
 * @param   { Object } expr - object containing the keys used to extend the children tags
 * @param   { * } key - value to assign to the new object returned
 * @param   { * } val - value containing the position of the item in the array
 * @returns { Object } - new object containing the values of the original item
 *
 * The variables 'key' and 'val' are arbitrary.
 * They depend on the collection type looped (Array, Object)
 * and on the expression used on the each tag
 *
 */
function mkitem(expr, key, val) {
  var item = {}
  item[expr.key] = key
  if (expr.pos) item[expr.pos] = val
  return item
}

/**
 * Unmount the redundant tags
 * @param   { Array } items - array containing the current items to loop
 * @param   { Array } tags - array containing all the children tags
 */
function unmountRedundant(items, tags) {

  var i = tags.length,
    j = items.length,
    t

  while (i > j) {
    t = tags[--i]
    tags.splice(i, 1)
    t.unmount()
  }
}

/**
 * Move the nested custom tags in non custom loop tags
 * @param   { Object } child - non custom loop tag
 * @param   { Number } i - current position of the loop tag
 */
function moveNestedTags(child, i) {
  Object.keys(child.tags).forEach(function(tagName) {
    var tag = child.tags[tagName]
    if (isArray(tag))
      each(tag, function (t) {
        moveChildTag(t, tagName, i)
      })
    else
      moveChildTag(tag, tagName, i)
  })
}

/**
 * Adds the elements for a virtual tag
 * @param { Tag } tag - the tag whose root's children will be inserted or appended
 * @param { Node } src - the node that will do the inserting or appending
 * @param { Tag } target - only if inserting, insert before this tag's first child
 */
function addVirtual(tag, src, target) {
  var el = tag._root, sib
  tag._virts = []
  while (el) {
    sib = el.nextSibling
    if (target)
      src.insertBefore(el, target._root)
    else
      src.appendChild(el)

    tag._virts.push(el) // hold for unmounting
    el = sib
  }
}

/**
 * Move virtual tag and all child nodes
 * @param { Tag } tag - first child reference used to start move
 * @param { Node } src  - the node that will do the inserting
 * @param { Tag } target - insert before this tag's first child
 * @param { Number } len - how many child nodes to move
 */
function moveVirtual(tag, src, target, len) {
  var el = tag._root, sib, i = 0
  for (; i < len; i++) {
    sib = el.nextSibling
    src.insertBefore(el, target._root)
    el = sib
  }
}

/**
 * Insert a new tag avoiding the insert for the conditional tags
 * @param   {Boolean} isVirtual [description]
 * @param   { Tag }  prevTag - tag instance used as reference to prepend our new tag
 * @param   { Tag }  newTag - new tag to be inserted
 * @param   { HTMLElement }  root - loop parent node
 * @param   { Array }  tags - array containing the current tags list
 * @param   { Function }  virtualFn - callback needed to move or insert virtual DOM
 * @param   { Object } dom - DOM node we need to loop
 */
function insertTag(isVirtual, prevTag, newTag, root, tags, virtualFn, dom) {
  if (isInStub(prevTag.root)) return
  if (isVirtual) virtualFn(prevTag, root, newTag, dom.childNodes.length)
  else root.insertBefore(prevTag.root, newTag.root) // #1374 some browsers reset selected here
}


/**
 * Manage tags having the 'each'
 * @param   { Object } dom - DOM node we need to loop
 * @param   { Tag } parent - parent tag instance where the dom node is contained
 * @param   { String } expr - string contained in the 'each' attribute
 */
function _each(dom, parent, expr) {

  // remove the each property from the original tag
  remAttr(dom, 'each')

  var mustReorder = typeof getAttr(dom, 'no-reorder') !== T_STRING || remAttr(dom, 'no-reorder'),
    tagName = getTagName(dom),
    impl = __tagImpl[tagName] || { tmpl: getOuterHTML(dom) },
    useRoot = SPECIAL_TAGS_REGEX.test(tagName),
    root = dom.parentNode,
    ref = document.createTextNode(''),
    child = getTag(dom),
    isOption = tagName.toLowerCase() === 'option', // the option tags must be treated differently
    tags = [],
    oldItems = [],
    hasKeys,
    isVirtual = dom.tagName == 'VIRTUAL'

  // parse the each expression
  expr = tmpl.loopKeys(expr)

  // insert a marked where the loop tags will be injected
  root.insertBefore(ref, dom)

  // clean template code
  parent.one('before-mount', function () {

    // remove the original DOM node
    dom.parentNode.removeChild(dom)
    if (root.stub) root = parent.root

  }).on('update', function () {
    // get the new items collection
    var items = tmpl(expr.val, parent),
      // create a fragment to hold the new DOM nodes to inject in the parent tag
      frag = document.createDocumentFragment()

    // object loop. any changes cause full redraw
    if (!isArray(items)) {
      hasKeys = items || false
      items = hasKeys ?
        Object.keys(items).map(function (key) {
          return mkitem(expr, key, items[key])
        }) : []
    }

    // loop all the new items
    var i = 0,
      itemsLength = items.length

    for (; i < itemsLength; i++) {
      // reorder only if the items are objects
      var
        item = items[i],
        _mustReorder = mustReorder && typeof item == T_OBJECT && !hasKeys,
        oldPos = oldItems.indexOf(item),
        pos = ~oldPos && _mustReorder ? oldPos : i,
        // does a tag exist in this position?
        tag = tags[pos]

      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item

      // new tag
      if (
        !_mustReorder && !tag // with no-reorder we just update the old tags
        ||
        _mustReorder && !~oldPos || !tag // by default we always try to reorder the DOM elements
      ) {

        tag = new Tag(impl, {
          parent: parent,
          isLoop: true,
          hasImpl: !!__tagImpl[tagName],
          root: useRoot ? root : dom.cloneNode(),
          item: item
        }, dom.innerHTML)

        tag.mount()

        if (isVirtual) tag._root = tag.root.firstChild // save reference for further moves or inserts
        // this tag must be appended
        if (i == tags.length || !tags[i]) { // fix 1581
          if (isVirtual)
            addVirtual(tag, frag)
          else frag.appendChild(tag.root)
        }
        // this tag must be insert
        else {
          insertTag(isVirtual, tag, tags[i], root, tags, addVirtual, dom)
          oldItems.splice(i, 0, item)
        }

        tags.splice(i, 0, tag)
        pos = i // handled here so no move
      } else tag.update(item, true)

      // reorder the tag if it's not located in its previous position
      if (
        pos !== i && _mustReorder &&
        tags[i] // fix 1581 unable to reproduce it in a test!
      ) {
        // #closes 2040 PLEASE DON'T REMOVE IT!
        // there are no tests for this feature
        if (contains(items, oldItems[i]))
          insertTag(isVirtual, tag, tags[i], root, tags, moveVirtual, dom)

        // update the position attribute if it exists
        if (expr.pos)
          tag[expr.pos] = i
        // move the old tag instance
        tags.splice(i, 0, tags.splice(pos, 1)[0])
        // move the old item
        oldItems.splice(i, 0, oldItems.splice(pos, 1)[0])
        // if the loop tags are not custom
        // we need to move all their custom tags into the right position
        if (!child && tag.tags) moveNestedTags(tag, i)
      }

      // cache the original item to use it in the events bound to this node
      // and its children
      tag._item = item
      // cache the real parent tag internally
      defineProperty(tag, '_parent', parent)
    }

    // remove the redundant tags
    unmountRedundant(items, tags)

    // insert the new nodes
    root.insertBefore(frag, ref)
    if (isOption) {

      // #1374 FireFox bug in <option selected={expression}>
      if (FIREFOX && !root.multiple) {
        for (var n = 0; n < root.length; n++) {
          if (root[n].__riot1374) {
            root.selectedIndex = n  // clear other options
            delete root[n].__riot1374
            break
          }
        }
      }
    }

    // set the 'tags' property of the parent tag
    // if child is 'undefined' it means that we don't need to set this property
    // for example:
    // we don't need store the `myTag.tags['div']` property if we are looping a div tag
    // but we need to track the `myTag.tags['child']` property looping a custom child node named `child`
    if (child) parent.tags[tagName] = tags

    // clone the items array
    oldItems = items.slice()

  })

}
/**
 * Object that will be used to inject and manage the css of every tag instance
 */
var styleManager = (function(_riot) {

  if (!window) return { // skip injection on the server
    add: function () {},
    inject: function () {}
  }

  var styleNode = (function () {
    // create a new style element with the correct type
    var newNode = mkEl('style')
    setAttr(newNode, 'type', 'text/css')

    // replace any user node or insert the new one into the head
    var userNode = $('style[type=riot]')
    if (userNode) {
      if (userNode.id) newNode.id = userNode.id
      userNode.parentNode.replaceChild(newNode, userNode)
    }
    else document.getElementsByTagName('head')[0].appendChild(newNode)

    return newNode
  })()

  // Create cache and shortcut to the correct property
  var cssTextProp = styleNode.styleSheet,
    stylesToInject = ''

  // Expose the style node in a non-modificable property
  Object.defineProperty(_riot, 'styleNode', {
    value: styleNode,
    writable: true
  })

  /**
   * Public api
   */
  return {
    /**
     * Save a tag style to be later injected into DOM
     * @param   { String } css [description]
     */
    add: function(css) {
      stylesToInject += css
    },
    /**
     * Inject all previously saved tag styles into DOM
     * innerHTML seems slow: http://jsperf.com/riot-insert-style
     */
    inject: function() {
      if (stylesToInject) {
        if (cssTextProp) cssTextProp.cssText += stylesToInject
        else styleNode.innerHTML += stylesToInject
        stylesToInject = ''
      }
    }
  }

})(riot)


function parseNamedElements(root, tag, childTags, forceParsingNamed) {

  walk(root, function(dom) {
    if (dom.nodeType == 1) {
      dom.isLoop = dom.isLoop ||
                  (dom.parentNode && dom.parentNode.isLoop || getAttr(dom, 'each'))
                    ? 1 : 0

      // custom child tag
      if (childTags) {
        var child = getTag(dom)

        if (child && !dom.isLoop)
          childTags.push(initChildTag(child, {root: dom, parent: tag}, dom.innerHTML, tag))
      }

      if (!dom.isLoop || forceParsingNamed)
        setNamed(dom, tag, [])
    }

  })

}

function parseExpressions(root, tag, expressions) {

  function addExpr(dom, val, extra) {
    if (tmpl.hasExpr(val)) {
      expressions.push(extend({ dom: dom, expr: val }, extra))
    }
  }

  walk(root, function(dom) {
    var type = dom.nodeType,
      attr

    // text node
    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
    if (type != 1) return

    /* element */

    // loop
    attr = getAttr(dom, 'each')

    if (attr) { _each(dom, tag, attr); return false }

    // attribute expressions
    each(dom.attributes, function(attr) {
      var name = attr.name,
        bool = name.split('__')[1]

      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
      if (bool) { remAttr(dom, name); return false }

    })

    // skip custom tags
    if (getTag(dom)) return false

  })

}
function Tag(impl, conf, innerHTML) {

  var self = riot.observable(this),
    opts = inherit(conf.opts) || {},
    parent = conf.parent,
    isLoop = conf.isLoop,
    hasImpl = conf.hasImpl,
    item = cleanUpData(conf.item),
    expressions = [],
    childTags = [],
    root = conf.root,
    tagName = root.tagName.toLowerCase(),
    attr = {},
    propsInSyncWithParent = [],
    dom

  // only call unmount if we have a valid __tagImpl (has name property)
  if (impl.name && root._tag) root._tag.unmount(true)

  // not yet mounted
  this.isMounted = false
  root.isLoop = isLoop

  // keep a reference to the tag just created
  // so we will be able to mount this tag multiple times
  root._tag = this

  // create a unique id to this tag
  // it could be handy to use it also to improve the virtual dom rendering speed
  defineProperty(this, '_riot_id', ++__uid) // base 1 allows test !t._riot_id

  extend(this, { parent: parent, root: root, opts: opts}, item)
  // protect the "tags" property from being overridden
  defineProperty(this, 'tags', {})

  // grab attributes
  each(root.attributes, function(el) {
    var val = el.value
    // remember attributes with expressions only
    if (tmpl.hasExpr(val)) attr[el.name] = val
  })

  dom = mkdom(impl.tmpl, innerHTML, isLoop)

  // options
  function updateOpts() {
    var ctx = hasImpl && isLoop ? self : parent || self

    // update opts from current DOM attributes
    each(root.attributes, function(el) {
      if (el.name in attr) return
      var val = el.value
      opts[toCamel(el.name)] = tmpl.hasExpr(val) ? tmpl(val, ctx) : val
    })
    // recover those with expressions
    each(Object.keys(attr), function(name) {
      opts[toCamel(name)] = tmpl(attr[name], ctx)
    })
  }

  function normalizeData(data) {
    for (var key in item) {
      if (typeof self[key] !== T_UNDEF && isWritable(self, key))
        self[key] = data[key]
    }
  }

  function inheritFrom(target) {
    each(Object.keys(target), function(k) {
      // some properties must be always in sync with the parent tag
      var mustSync = !RESERVED_WORDS_BLACKLIST.test(k) && contains(propsInSyncWithParent, k)

      if (typeof self[k] === T_UNDEF || mustSync) {
        // track the property to keep in sync
        // so we can keep it updated
        if (!mustSync) propsInSyncWithParent.push(k)
        self[k] = target[k]
      }
    })
  }

  /**
   * Update the tag expressions and options
   * @param   { * }  data - data we want to use to extend the tag properties
   * @param   { Boolean } isInherited - is this update coming from a parent tag?
   * @returns { self }
   */
  defineProperty(this, 'update', function(data, isInherited) {

    // make sure the data passed will not override
    // the component core methods
    data = cleanUpData(data)
    // inherit properties from the parent in loop
    if (isLoop) {
      inheritFrom(self.parent)
    }
    // normalize the tag properties in case an item object was initially passed
    if (data && isObject(item)) {
      normalizeData(data)
      item = data
    }
    extend(self, data)
    updateOpts()
    self.trigger('update', data)
    update(expressions, self)

    // the updated event will be triggered
    // once the DOM will be ready and all the re-flows are completed
    // this is useful if you want to get the "real" root properties
    // 4 ex: root.offsetWidth ...
    if (isInherited && self.parent)
      // closes #1599
      self.parent.one('updated', function() { self.trigger('updated') })
    else rAF(function() { self.trigger('updated') })

    return this
  })

  defineProperty(this, 'mixin', function() {
    each(arguments, function(mix) {
      var instance,
        props = [],
        obj

      mix = typeof mix === T_STRING ? riot.mixin(mix) : mix

      // check if the mixin is a function
      if (isFunction(mix)) {
        // create the new mixin instance
        instance = new mix()
      } else instance = mix

      var proto = Object.getPrototypeOf(instance)

      // build multilevel prototype inheritance chain property list
      do props = props.concat(Object.getOwnPropertyNames(obj || instance))
      while (obj = Object.getPrototypeOf(obj || instance))

      // loop the keys in the function prototype or the all object keys
      each(props, function(key) {
        // bind methods to self
        // allow mixins to override other properties/parent mixins
        if (key != 'init') {
          // check for getters/setters
          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key)
          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set)

          // apply method only if it does not already exist on the instance
          if (!self.hasOwnProperty(key) && hasGetterSetter) {
            Object.defineProperty(self, key, descriptor)
          } else {
            self[key] = isFunction(instance[key]) ?
              instance[key].bind(self) :
              instance[key]
          }
        }
      })

      // init method will be called automatically
      if (instance.init) instance.init.bind(self)()
    })
    return this
  })

  defineProperty(this, 'mount', function() {

    updateOpts()

    // add global mixins
    var globalMixin = riot.mixin(GLOBAL_MIXIN)

    if (globalMixin)
      for (var i in globalMixin)
        if (globalMixin.hasOwnProperty(i))
          self.mixin(globalMixin[i])

    // children in loop should inherit from true parent
    if (self._parent && self._parent.root.isLoop) {
      inheritFrom(self._parent)
    }

    // initialiation
    if (impl.fn) impl.fn.call(self, opts)

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions(dom, self, expressions)

    // mount the child tags
    toggle(true)

    // update the root adding custom attributes coming from the compiler
    // it fixes also #1087
    if (impl.attrs)
      walkAttributes(impl.attrs, function (k, v) { setAttr(root, k, v) })
    if (impl.attrs || hasImpl)
      parseExpressions(self.root, self, expressions)

    if (!self.parent || isLoop) self.update(item)

    // internal use only, fixes #403
    self.trigger('before-mount')

    if (isLoop && !hasImpl) {
      // update the root attribute for the looped elements
      root = dom.firstChild
    } else {
      while (dom.firstChild) root.appendChild(dom.firstChild)
      if (root.stub) root = parent.root
    }

    defineProperty(self, 'root', root)

    // parse the named dom nodes in the looped child
    // adding them to the parent as well
    if (isLoop)
      parseNamedElements(self.root, self.parent, null, true)

    // if it's not a child tag we can trigger its mount event
    if (!self.parent || self.parent.isMounted) {
      self.isMounted = true
      self.trigger('mount')
    }
    // otherwise we need to wait that the parent event gets triggered
    else self.parent.one('mount', function() {
      // avoid to trigger the `mount` event for the tags
      // not visible included in an if statement
      if (!isInStub(self.root)) {
        self.parent.isMounted = self.isMounted = true
        self.trigger('mount')
      }
    })
  })


  defineProperty(this, 'unmount', function(keepRootTag) {
    var el = root,
      p = el.parentNode,
      ptag,
      tagIndex = __virtualDom.indexOf(self)

    self.trigger('before-unmount')

    // remove this tag instance from the global virtualDom variable
    if (~tagIndex)
      __virtualDom.splice(tagIndex, 1)

    if (p) {

      if (parent) {
        ptag = getImmediateCustomParentTag(parent)
        // remove this tag from the parent tags object
        // if there are multiple nested tags with same name..
        // remove this element form the array
        if (isArray(ptag.tags[tagName]))
          each(ptag.tags[tagName], function(tag, i) {
            if (tag._riot_id == self._riot_id)
              ptag.tags[tagName].splice(i, 1)
          })
        else
          // otherwise just delete the tag instance
          ptag.tags[tagName] = undefined
      }

      else
        while (el.firstChild) el.removeChild(el.firstChild)

      if (!keepRootTag)
        p.removeChild(el)
      else {
        // the riot-tag and the data-is attributes aren't needed anymore, remove them
        remAttr(p, RIOT_TAG_IS)
        remAttr(p, RIOT_TAG) // this will be removed in riot 3.0.0
      }

    }

    if (this._virts) {
      each(this._virts, function(v) {
        if (v.parentNode) v.parentNode.removeChild(v)
      })
    }

    self.trigger('unmount')
    toggle()
    self.off('*')
    self.isMounted = false
    delete root._tag

  })

  // proxy function to bind updates
  // dispatched from a parent tag
  function onChildUpdate(data) { self.update(data, true) }

  function toggle(isMount) {

    // mount/unmount children
    each(childTags, function(child) { child[isMount ? 'mount' : 'unmount']() })

    // listen/unlisten parent (events flow one way from parent to children)
    if (!parent) return
    var evt = isMount ? 'on' : 'off'

    // the loop tags will be always in sync with the parent automatically
    if (isLoop)
      parent[evt]('unmount', self.unmount)
    else {
      parent[evt]('update', onChildUpdate)[evt]('unmount', self.unmount)
    }
  }


  // named elements available for fn
  parseNamedElements(dom, this, childTags)

}
/**
 * Attach an event to a DOM node
 * @param { String } name - event name
 * @param { Function } handler - event callback
 * @param { Object } dom - dom node
 * @param { Tag } tag - tag instance
 */
function setEventHandler(name, handler, dom, tag) {

  dom[name] = function(e) {

    var ptag = tag._parent,
      item = tag._item,
      el

    if (!item)
      while (ptag && !item) {
        item = ptag._item
        ptag = ptag._parent
      }

    // cross browser event fix
    e = e || window.event

    // override the event properties
    if (isWritable(e, 'currentTarget')) e.currentTarget = dom
    if (isWritable(e, 'target')) e.target = e.srcElement
    if (isWritable(e, 'which')) e.which = e.charCode || e.keyCode

    e.item = item

    // prevent default behaviour (by default)
    if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
      if (e.preventDefault) e.preventDefault()
      e.returnValue = false
    }

    if (!e.preventUpdate) {
      el = item ? getImmediateCustomParentTag(ptag) : tag
      el.update()
    }

  }

}


/**
 * Insert a DOM node replacing another one (used by if- attribute)
 * @param   { Object } root - parent node
 * @param   { Object } node - node replaced
 * @param   { Object } before - node added
 */
function insertTo(root, node, before) {
  if (!root) return
  root.insertBefore(before, node)
  root.removeChild(node)
}

/**
 * Update the expressions in a Tag instance
 * @param   { Array } expressions - expression that must be re evaluated
 * @param   { Tag } tag - tag instance
 */
function update(expressions, tag) {

  each(expressions, function(expr, i) {

    var dom = expr.dom,
      attrName = expr.attr,
      value = tmpl(expr.expr, tag),
      parent = expr.parent || expr.dom.parentNode

    if (expr.bool) {
      value = !!value
    } else if (value == null) {
      value = ''
    }

    // #1638: regression of #1612, update the dom only if the value of the
    // expression was changed
    if (expr.value === value) {
      return
    }
    expr.value = value

    // textarea and text nodes has no attribute name
    if (!attrName) {
      // about #815 w/o replace: the browser converts the value to a string,
      // the comparison by "==" does too, but not in the server
      value += ''
      // test for parent avoids error with invalid assignment to nodeValue
      if (parent) {
        // cache the parent node because somehow it will become null on IE
        // on the next iteration
        expr.parent = parent
        if (parent.tagName === 'TEXTAREA') {
          parent.value = value                    // #1113
          if (!IE_VERSION) dom.nodeValue = value  // #1625 IE throws here, nodeValue
        }                                         // will be available on 'updated'
        else dom.nodeValue = value
      }
      return
    }

    // ~~#1612: look for changes in dom.value when updating the value~~
    if (attrName === 'value') {
      if (dom.value !== value) {
        dom.value = value
        setAttr(dom, attrName, value)
      }
      return
    } else {
      // remove original attribute
      remAttr(dom, attrName)
    }

    // event handler
    if (isFunction(value)) {
      setEventHandler(attrName, value, dom, tag)

    // if- conditional
    } else if (attrName == 'if') {
      var stub = expr.stub,
        add = function() { insertTo(stub.parentNode, stub, dom) },
        remove = function() { insertTo(dom.parentNode, dom, stub) }

      // add to DOM
      if (value) {
        if (stub) {
          add()
          dom.inStub = false
          // avoid to trigger the mount event if the tags is not visible yet
          // maybe we can optimize this avoiding to mount the tag at all
          if (!isInStub(dom)) {
            walk(dom, function(el) {
              if (el._tag && !el._tag.isMounted)
                el._tag.isMounted = !!el._tag.trigger('mount')
            })
          }
        }
      // remove from DOM
      } else {
        stub = expr.stub = stub || document.createTextNode('')
        // if the parentNode is defined we can easily replace the tag
        if (dom.parentNode)
          remove()
        // otherwise we need to wait the updated event
        else (tag.parent || tag).one('updated', remove)

        dom.inStub = true
      }
    // show / hide
    } else if (attrName === 'show') {
      dom.style.display = value ? '' : 'none'

    } else if (attrName === 'hide') {
      dom.style.display = value ? 'none' : ''

    } else if (expr.bool) {
      dom[attrName] = value
      if (value) setAttr(dom, attrName, attrName)
      if (FIREFOX && attrName === 'selected' && dom.tagName === 'OPTION') {
        dom.__riot1374 = value   // #1374
      }

    } else if (value === 0 || value && typeof value !== T_OBJECT) {
      // <img src="{ expr }">
      if (startsWith(attrName, RIOT_PREFIX) && attrName != RIOT_TAG) {
        attrName = attrName.slice(RIOT_PREFIX.length)
      }
      setAttr(dom, attrName, value)
    }

  })

}
/**
 * Specialized function for looping an array-like collection with `each={}`
 * @param   { Array } els - collection of items
 * @param   {Function} fn - callback function
 * @returns { Array } the array looped
 */
function each(els, fn) {
  var len = els ? els.length : 0

  for (var i = 0, el; i < len; i++) {
    el = els[i]
    // return false -> current item was removed by fn during the loop
    if (el != null && fn(el, i) === false) i--
  }
  return els
}

/**
 * Detect if the argument passed is a function
 * @param   { * } v - whatever you want to pass to this function
 * @returns { Boolean } -
 */
function isFunction(v) {
  return typeof v === T_FUNCTION || false   // avoid IE problems
}

/**
 * Get the outer html of any DOM node SVGs included
 * @param   { Object } el - DOM node to parse
 * @returns { String } el.outerHTML
 */
function getOuterHTML(el) {
  if (el.outerHTML) return el.outerHTML
  // some browsers do not support outerHTML on the SVGs tags
  else {
    var container = mkEl('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

/**
 * Set the inner html of any DOM node SVGs included
 * @param { Object } container - DOM node where we will inject the new html
 * @param { String } html - html to inject
 */
function setInnerHTML(container, html) {
  if (typeof container.innerHTML != T_UNDEF) container.innerHTML = html
  // some browsers do not support innerHTML on the SVGs tags
  else {
    var doc = new DOMParser().parseFromString(html, 'application/xml')
    container.appendChild(
      container.ownerDocument.importNode(doc.documentElement, true)
    )
  }
}

/**
 * Checks wether a DOM node must be considered part of an svg document
 * @param   { String }  name - tag name
 * @returns { Boolean } -
 */
function isSVGTag(name) {
  return ~SVG_TAGS_LIST.indexOf(name)
}

/**
 * Detect if the argument passed is an object, exclude null.
 * NOTE: Use isObject(x) && !isArray(x) to excludes arrays.
 * @param   { * } v - whatever you want to pass to this function
 * @returns { Boolean } -
 */
function isObject(v) {
  return v && typeof v === T_OBJECT         // typeof null is 'object'
}

/**
 * Remove any DOM attribute from a node
 * @param   { Object } dom - DOM node we want to update
 * @param   { String } name - name of the property we want to remove
 */
function remAttr(dom, name) {
  dom.removeAttribute(name)
}

/**
 * Convert a string containing dashes to camel case
 * @param   { String } string - input string
 * @returns { String } my-string -> myString
 */
function toCamel(string) {
  return string.replace(/-(\w)/g, function(_, c) {
    return c.toUpperCase()
  })
}

/**
 * Get the value of any DOM attribute on a node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { String } name - name of the attribute we want to get
 * @returns { String | undefined } name of the node attribute whether it exists
 */
function getAttr(dom, name) {
  return dom.getAttribute(name)
}

/**
 * Set any DOM/SVG attribute
 * @param { Object } dom - DOM node we want to update
 * @param { String } name - name of the property we want to set
 * @param { String } val - value of the property we want to set
 */
function setAttr(dom, name, val) {
  var xlink = XLINK_REGEX.exec(name)
  if (xlink && xlink[1])
    dom.setAttributeNS(XLINK_NS, xlink[1], val)
  else
    dom.setAttribute(name, val)
}

/**
 * Detect the tag implementation by a DOM node
 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
 */
function getTag(dom) {
  return dom.tagName && __tagImpl[getAttr(dom, RIOT_TAG_IS) ||
    getAttr(dom, RIOT_TAG) || dom.tagName.toLowerCase()]
}
/**
 * Add a child tag to its parent into the `tags` object
 * @param   { Object } tag - child tag instance
 * @param   { String } tagName - key where the new tag will be stored
 * @param   { Object } parent - tag instance where the new child tag will be included
 */
function addChildTag(tag, tagName, parent) {
  var cachedTag = parent.tags[tagName]

  // if there are multiple children tags having the same name
  if (cachedTag) {
    // if the parent tags property is not yet an array
    // create it adding the first cached tag
    if (!isArray(cachedTag))
      // don't add the same tag twice
      if (cachedTag !== tag)
        parent.tags[tagName] = [cachedTag]
    // add the new nested tag to the array
    if (!contains(parent.tags[tagName], tag))
      parent.tags[tagName].push(tag)
  } else {
    parent.tags[tagName] = tag
  }
}

/**
 * Move the position of a custom tag in its parent tag
 * @param   { Object } tag - child tag instance
 * @param   { String } tagName - key where the tag was stored
 * @param   { Number } newPos - index where the new tag will be stored
 */
function moveChildTag(tag, tagName, newPos) {
  var parent = tag.parent,
    tags
  // no parent no move
  if (!parent) return

  tags = parent.tags[tagName]

  if (isArray(tags))
    tags.splice(newPos, 0, tags.splice(tags.indexOf(tag), 1)[0])
  else addChildTag(tag, tagName, parent)
}

/**
 * Create a new child tag including it correctly into its parent
 * @param   { Object } child - child tag implementation
 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
 * @param   { String } innerHTML - inner html of the child node
 * @param   { Object } parent - instance of the parent tag including the child custom tag
 * @returns { Object } instance of the new child tag just created
 */
function initChildTag(child, opts, innerHTML, parent) {
  var tag = new Tag(child, opts, innerHTML),
    tagName = getTagName(opts.root),
    ptag = getImmediateCustomParentTag(parent)
  // fix for the parent attribute in the looped elements
  tag.parent = ptag
  // store the real parent tag
  // in some cases this could be different from the custom parent tag
  // for example in nested loops
  tag._parent = parent

  // add this tag to the custom parent tag
  addChildTag(tag, tagName, ptag)
  // and also to the real parent tag
  if (ptag !== parent)
    addChildTag(tag, tagName, parent)
  // empty the child node once we got its template
  // to avoid that its children get compiled multiple times
  opts.root.innerHTML = ''

  return tag
}

/**
 * Loop backward all the parents tree to detect the first custom parent tag
 * @param   { Object } tag - a Tag instance
 * @returns { Object } the instance of the first custom parent tag found
 */
function getImmediateCustomParentTag(tag) {
  var ptag = tag
  while (!getTag(ptag.root)) {
    if (!ptag.parent) break
    ptag = ptag.parent
  }
  return ptag
}

/**
 * Helper function to set an immutable property
 * @param   { Object } el - object where the new property will be set
 * @param   { String } key - object key where the new property will be stored
 * @param   { * } value - value of the new property
* @param   { Object } options - set the propery overriding the default options
 * @returns { Object } - the initial object
 */
function defineProperty(el, key, value, options) {
  Object.defineProperty(el, key, extend({
    value: value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options))
  return el
}

/**
 * Get the tag name of any DOM node
 * @param   { Object } dom - DOM node we want to parse
 * @returns { String } name to identify this dom node in riot
 */
function getTagName(dom) {
  var child = getTag(dom),
    namedTag = getAttr(dom, 'name'),
    tagName = namedTag && !tmpl.hasExpr(namedTag) ?
                namedTag :
              child ? child.name : dom.tagName.toLowerCase()

  return tagName
}

/**
 * Extend any object with other properties
 * @param   { Object } src - source object
 * @returns { Object } the resulting extended object
 *
 * var obj = { foo: 'baz' }
 * extend(obj, {bar: 'bar', foo: 'bar'})
 * console.log(obj) => {bar: 'bar', foo: 'bar'}
 *
 */
function extend(src) {
  var obj, args = arguments
  for (var i = 1; i < args.length; ++i) {
    if (obj = args[i]) {
      for (var key in obj) {
        // check if this property of the source object could be overridden
        if (isWritable(src, key))
          src[key] = obj[key]
      }
    }
  }
  return src
}

/**
 * Check whether an array contains an item
 * @param   { Array } arr - target array
 * @param   { * } item - item to test
 * @returns { Boolean } Does 'arr' contain 'item'?
 */
function contains(arr, item) {
  return ~arr.indexOf(item)
}

/**
 * Check whether an object is a kind of array
 * @param   { * } a - anything
 * @returns {Boolean} is 'a' an array?
 */
function isArray(a) { return Array.isArray(a) || a instanceof Array }

/**
 * Detect whether a property of an object could be overridden
 * @param   { Object }  obj - source object
 * @param   { String }  key - object property
 * @returns { Boolean } is this property writable?
 */
function isWritable(obj, key) {
  var props = Object.getOwnPropertyDescriptor(obj, key)
  return typeof obj[key] === T_UNDEF || props && props.writable
}


/**
 * With this function we avoid that the internal Tag methods get overridden
 * @param   { Object } data - options we want to use to extend the tag instance
 * @returns { Object } clean object without containing the riot internal reserved words
 */
function cleanUpData(data) {
  if (!(data instanceof Tag) && !(data && typeof data.trigger == T_FUNCTION))
    return data

  var o = {}
  for (var key in data) {
    if (!RESERVED_WORDS_BLACKLIST.test(key)) o[key] = data[key]
  }
  return o
}

/**
 * Walk down recursively all the children tags starting dom node
 * @param   { Object }   dom - starting node where we will start the recursion
 * @param   { Function } fn - callback to transform the child node just found
 */
function walk(dom, fn) {
  if (dom) {
    // stop the recursion
    if (fn(dom) === false) return
    else {
      dom = dom.firstChild

      while (dom) {
        walk(dom, fn)
        dom = dom.nextSibling
      }
    }
  }
}

/**
 * Minimize risk: only zero or one _space_ between attr & value
 * @param   { String }   html - html string we want to parse
 * @param   { Function } fn - callback function to apply on any attribute found
 */
function walkAttributes(html, fn) {
  var m,
    re = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g

  while (m = re.exec(html)) {
    fn(m[1].toLowerCase(), m[2] || m[3] || m[4])
  }
}

/**
 * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
 * @param   { Object }  dom - DOM node we want to parse
 * @returns { Boolean } -
 */
function isInStub(dom) {
  while (dom) {
    if (dom.inStub) return true
    dom = dom.parentNode
  }
  return false
}

/**
 * Create a generic DOM node
 * @param   { String } name - name of the DOM node we want to create
 * @param   { Boolean } isSvg - should we use a SVG as parent node?
 * @returns { Object } DOM node just created
 */
function mkEl(name, isSvg) {
  return isSvg ?
    document.createElementNS('http://www.w3.org/2000/svg', 'svg') :
    document.createElement(name)
}

/**
 * Shorter and fast way to select multiple nodes in the DOM
 * @param   { String } selector - DOM selector
 * @param   { Object } ctx - DOM node where the targets of our search will is located
 * @returns { Object } dom nodes found
 */
function $$(selector, ctx) {
  return (ctx || document).querySelectorAll(selector)
}

/**
 * Shorter and fast way to select a single node in the DOM
 * @param   { String } selector - unique dom selector
 * @param   { Object } ctx - DOM node where the target of our search will is located
 * @returns { Object } dom node found
 */
function $(selector, ctx) {
  return (ctx || document).querySelector(selector)
}

/**
 * Simple object prototypal inheritance
 * @param   { Object } parent - parent object
 * @returns { Object } child instance
 */
function inherit(parent) {
  return Object.create(parent || null)
}

/**
 * Get the name property needed to identify a DOM node in riot
 * @param   { Object } dom - DOM node we need to parse
 * @returns { String | undefined } give us back a string to identify this dom node
 */
function getNamedKey(dom) {
  return getAttr(dom, 'id') || getAttr(dom, 'name')
}

/**
 * Set the named properties of a tag element
 * @param { Object } dom - DOM node we need to parse
 * @param { Object } parent - tag instance where the named dom element will be eventually added
 * @param { Array } keys - list of all the tag instance properties
 */
function setNamed(dom, parent, keys) {
  // get the key value we want to add to the tag instance
  var key = getNamedKey(dom),
    isArr,
    // add the node detected to a tag instance using the named property
    add = function(value) {
      // avoid to override the tag properties already set
      if (contains(keys, key)) return
      // check whether this value is an array
      isArr = isArray(value)
      // if the key was never set
      if (!value)
        // set it once on the tag instance
        parent[key] = dom
      // if it was an array and not yet set
      else if (!isArr || isArr && !contains(value, dom)) {
        // add the dom node into the array
        if (isArr)
          value.push(dom)
        else
          parent[key] = [value, dom]
      }
    }

  // skip the elements with no named properties
  if (!key) return

  // check whether this key has been already evaluated
  if (tmpl.hasExpr(key))
    // wait the first updated event only once
    parent.one('mount', function() {
      key = getNamedKey(dom)
      add(parent[key])
    })
  else
    add(parent[key])

}

/**
 * Faster String startsWith alternative
 * @param   { String } src - source string
 * @param   { String } str - test string
 * @returns { Boolean } -
 */
function startsWith(src, str) {
  return src.slice(0, str.length) === str
}

/**
 * requestAnimationFrame function
 * Adapted from https://gist.github.com/paulirish/1579671, license MIT
 */
var rAF = (function (w) {
  var raf = w.requestAnimationFrame    ||
            w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame

  if (!raf || /iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent)) {  // buggy iOS6
    var lastTime = 0

    raf = function (cb) {
      var nowtime = Date.now(), timeout = Math.max(16 - (nowtime - lastTime), 0)
      setTimeout(function () { cb(lastTime = nowtime + timeout) }, timeout)
    }
  }
  return raf

})(window || {})

/**
 * Mount a tag creating new Tag instance
 * @param   { Object } root - dom node where the tag will be mounted
 * @param   { String } tagName - name of the riot tag we want to mount
 * @param   { Object } opts - options to pass to the Tag instance
 * @returns { Tag } a new Tag instance
 */
function mountTo(root, tagName, opts) {
  var tag = __tagImpl[tagName],
    // cache the inner HTML to fix #855
    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML

  // clear the inner html
  root.innerHTML = ''

  if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML)

  if (tag && tag.mount) {
    tag.mount()
    // add this tag to the virtualDom variable
    if (!contains(__virtualDom, tag)) __virtualDom.push(tag)
  }

  return tag
}
/**
 * Riot public api
 */

// share methods for other riot parts, e.g. compiler
riot.util = { brackets: brackets, tmpl: tmpl }

/**
 * Create a mixin that could be globally shared across all the tags
 */
riot.mixin = (function() {
  var mixins = {},
    globals = mixins[GLOBAL_MIXIN] = {},
    _id = 0

  /**
   * Create/Return a mixin by its name
   * @param   { String }  name - mixin name (global mixin if object)
   * @param   { Object }  mixin - mixin logic
   * @param   { Boolean } g - is global?
   * @returns { Object }  the mixin logic
   */
  return function(name, mixin, g) {
    // Unnamed global
    if (isObject(name)) {
      riot.mixin('__unnamed_'+_id++, name, true)
      return
    }

    var store = g ? globals : mixins

    // Getter
    if (!mixin) {
      if (typeof store[name] === T_UNDEF) {
        throw new Error('Unregistered mixin: ' + name)
      }
      return store[name]
    }
    // Setter
    if (isFunction(mixin)) {
      extend(mixin.prototype, store[name] || {})
      store[name] = mixin
    }
    else {
      store[name] = extend(store[name] || {}, mixin)
    }
  }

})()

/**
 * Create a new riot tag implementation
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   html - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
riot.tag = function(name, html, css, attrs, fn) {
  if (isFunction(attrs)) {
    fn = attrs
    if (/^[\w\-]+\s?=/.test(css)) {
      attrs = css
      css = ''
    } else attrs = ''
  }
  if (css) {
    if (isFunction(css)) fn = css
    else styleManager.add(css)
  }
  name = name.toLowerCase()
  __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn }
  return name
}

/**
 * Create a new riot tag implementation (for use by the compiler)
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   html - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
riot.tag2 = function(name, html, css, attrs, fn) {
  if (css) styleManager.add(css)
  //if (bpair) riot.settings.brackets = bpair
  __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn }
  return name
}

/**
 * Mount a tag using a specific tag implementation
 * @param   { String } selector - tag DOM selector
 * @param   { String } tagName - tag implementation name
 * @param   { Object } opts - tag logic
 * @returns { Array } new tags instances
 */
riot.mount = function(selector, tagName, opts) {

  var els,
    allTags,
    tags = []

  // helper functions

  function addRiotTags(arr) {
    var list = ''
    each(arr, function (e) {
      if (!/[^-\w]/.test(e)) {
        e = e.trim().toLowerCase()
        list += ',[' + RIOT_TAG_IS + '="' + e + '"],[' + RIOT_TAG + '="' + e + '"]'
      }
    })
    return list
  }

  function selectAllTags() {
    var keys = Object.keys(__tagImpl)
    return keys + addRiotTags(keys)
  }

  function pushTags(root) {
    if (root.tagName) {
      var riotTag = getAttr(root, RIOT_TAG_IS) || getAttr(root, RIOT_TAG)

      // have tagName? force riot-tag to be the same
      if (tagName && riotTag !== tagName) {
        riotTag = tagName
        setAttr(root, RIOT_TAG_IS, tagName)
        setAttr(root, RIOT_TAG, tagName) // this will be removed in riot 3.0.0
      }
      var tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts)

      if (tag) tags.push(tag)
    } else if (root.length) {
      each(root, pushTags)   // assume nodeList
    }
  }

  // ----- mount code -----

  // inject styles into DOM
  styleManager.inject()

  if (isObject(tagName)) {
    opts = tagName
    tagName = 0
  }

  // crawl the DOM to find the tag
  if (typeof selector === T_STRING) {
    if (selector === '*')
      // select all the tags registered
      // and also the tags found with the riot-tag attribute set
      selector = allTags = selectAllTags()
    else
      // or just the ones named like the selector
      selector += addRiotTags(selector.split(/, */))

    // make sure to pass always a selector
    // to the querySelectorAll function
    els = selector ? $$(selector) : []
  }
  else
    // probably you have passed already a tag or a NodeList
    els = selector

  // select all the registered and mount them inside their root elements
  if (tagName === '*') {
    // get all custom tags
    tagName = allTags || selectAllTags()
    // if the root els it's just a single tag
    if (els.tagName)
      els = $$(tagName, els)
    else {
      // select all the children for all the different root elements
      var nodeList = []
      each(els, function (_el) {
        nodeList.push($$(tagName, _el))
      })
      els = nodeList
    }
    // get rid of the tagName
    tagName = 0
  }

  pushTags(els)

  return tags
}

/**
 * Update all the tags instances created
 * @returns { Array } all the tags instances
 */
riot.update = function() {
  return each(__virtualDom, function(tag) {
    tag.update()
  })
}

/**
 * Export the Virtual DOM
 */
riot.vdom = __virtualDom

/**
 * Export the Tag constructor
 */
riot.Tag = Tag
/* istanbul ignore next */

// istanbul ignore next
function safeRegex (re) {
  var src = re.source
  var opt = re.global ? 'g' : ''

  if (re.ignoreCase) opt += 'i'
  if (re.multiline)  opt += 'm'

  for (var i = 1; i < arguments.length; i++) {
    src = src.replace('@', '\\' + arguments[i])
  }

  return new RegExp(src, opt)
}

/**
 * @module parsers
 */
var parsers = (function (win) {

  var _p = {}

  function _r (name) {
    var parser = win[name]

    if (parser) return parser

    throw new Error('Parser "' + name + '" not loaded.')
  }

  function _req (name) {
    var parts = name.split('.')

    if (parts.length !== 2) throw new Error('Bad format for parsers._req')

    var parser = _p[parts[0]][parts[1]]
    if (parser) return parser

    throw new Error('Parser "' + name + '" not found.')
  }

  function extend (obj, props) {
    if (props) {
      for (var prop in props) {
        /* istanbul ignore next */
        if (props.hasOwnProperty(prop)) {
          obj[prop] = props[prop]
        }
      }
    }
    return obj
  }

  function renderPug (compilerName, html, opts, url) {
    opts = extend({
      pretty: true,
      filename: url,
      doctype: 'html'
    }, opts)
    return _r(compilerName).render(html, opts)
  }

  _p.html = {
    jade: function (html, opts, url) {
      /* eslint-disable */
      console.log('DEPRECATION WARNING: jade was renamed "pug" - The jade parser will be removed in riot@3.0.0!')
      /* eslint-enable */
      return renderPug('jade', html, opts, url)
    },
    pug: function (html, opts, url) {
      return renderPug('pug', html, opts, url)
    }
  }
  _p.css = {
    less: function (tag, css, opts, url) {
      var ret

      opts = extend({
        sync: true,
        syncImport: true,
        filename: url
      }, opts)
      _r('less').render(css, opts, function (err, result) {
        // istanbul ignore next
        if (err) throw err
        ret = result.css
      })
      return ret
    }
  }
  _p.js = {
    es6: function (js, opts) {
      opts = extend({
        blacklist: ['useStrict', 'strict', 'react'],
        sourceMaps: false,
        comments: false
      }, opts)
      return _r('babel').transform(js, opts).code
    },
    babel: function (js, opts, url) {
      return _r('babel').transform(js, extend({ filename: url }, opts)).code
    },
    buble: function (js, opts, url) {
      opts = extend({
        source: url,
        modules: false
      }, opts)
      return _r('buble').transform(js, opts).code
    },
    coffee: function (js, opts) {
      return _r('CoffeeScript').compile(js, extend({ bare: true }, opts))
    },
    livescript: function (js, opts) {
      return _r('livescript').compile(js, extend({ bare: true, header: false }, opts))
    },
    typescript: function (js, opts) {
      return _r('typescript')(js, opts)
    },
    none: function (js) {
      return js
    }
  }
  _p.js.javascript   = _p.js.none
  _p.js.coffeescript = _p.js.coffee
  _p._req  = _req
  _p.utils = {
    extend: extend
  }

  return _p

})(window || global)

riot.parsers = parsers

/**
 * Compiler for riot custom tags
 * @version v2.5.7
 */
var compile = (function () {

  var extend = parsers.utils.extend
  /* eslint-enable */

  var S_LINESTR = /"[^"\n\\]*(?:\\[\S\s][^"\n\\]*)*"|'[^'\n\\]*(?:\\[\S\s][^'\n\\]*)*'/.source

  var S_STRINGS = brackets.R_STRINGS.source

  var HTML_ATTRS = / *([-\w:\xA0-\xFF]+) ?(?:= ?('[^']*'|"[^"]*"|\S+))?/g

  var HTML_COMMS = RegExp(/<!--(?!>)[\S\s]*?-->/.source + '|' + S_LINESTR, 'g')

  var HTML_TAGS = /<(-?[A-Za-z][-\w\xA0-\xFF]*)(?:\s+([^"'\/>]*(?:(?:"[^"]*"|'[^']*'|\/[^>])[^'"\/>]*)*)|\s*)(\/?)>/g

  var HTML_PACK = />[ \t]+<(-?[A-Za-z]|\/[-A-Za-z])/g

  var BOOL_ATTRS = RegExp(
      '^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|' +
      'compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|' +
      'multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|' +
      'selected|sortable|truespeed|typemustmatch)$')

  var RIOT_ATTRS = ['style', 'src', 'd']

  var VOID_TAGS = /^(?:input|img|br|wbr|hr|area|base|col|embed|keygen|link|meta|param|source|track)$/

  var PRE_TAGS = /<pre(?:\s+(?:[^">]*|"[^"]*")*)?>([\S\s]+?)<\/pre\s*>/gi

  var SPEC_TYPES = /^"(?:number|date(?:time)?|time|month|email|color)\b/i

  var IMPORT_STATEMENT = /^\s*import(?:(?:\s|[^\s'"])*)['|"].*\n?/gm

  var TRIM_TRAIL = /[ \t]+$/gm

  var
    RE_HASEXPR = safeRegex(/@#\d/, 'x01'),
    RE_REPEXPR = safeRegex(/@#(\d+)/g, 'x01'),
    CH_IDEXPR  = '\x01#',
    CH_DQCODE  = '\u2057',
    DQ = '"',
    SQ = "'"

  function cleanSource (src) {
    var
      mm,
      re = HTML_COMMS

    if (~src.indexOf('\r')) {
      src = src.replace(/\r\n?/g, '\n')
    }

    re.lastIndex = 0
    while ((mm = re.exec(src))) {
      if (mm[0][0] === '<') {
        src = RegExp.leftContext + RegExp.rightContext
        re.lastIndex = mm[3] + 1
      }
    }
    return src
  }

  function parseAttribs (str, pcex) {
    var
      list = [],
      match,
      type, vexp

    HTML_ATTRS.lastIndex = 0

    str = str.replace(/\s+/g, ' ')

    while ((match = HTML_ATTRS.exec(str))) {
      var
        k = match[1].toLowerCase(),
        v = match[2]

      if (!v) {
        list.push(k)
      } else {

        if (v[0] !== DQ) {
          v = DQ + (v[0] === SQ ? v.slice(1, -1) : v) + DQ
        }

        if (k === 'type' && SPEC_TYPES.test(v)) {
          type = v
        } else {
          if (RE_HASEXPR.test(v)) {

            if (k === 'value') vexp = 1
            else if (BOOL_ATTRS.test(k)) k = '__' + k
            else if (~RIOT_ATTRS.indexOf(k)) k = 'riot-' + k
          }

          list.push(k + '=' + v)
        }
      }
    }

    if (type) {
      if (vexp) type = DQ + pcex._bp[0] + SQ + type.slice(1, -1) + SQ + pcex._bp[1] + DQ
      list.push('type=' + type)
    }
    return list.join(' ')
  }

  function splitHtml (html, opts, pcex) {
    var _bp = pcex._bp

    if (html && _bp[4].test(html)) {
      var
        jsfn = opts.expr && (opts.parser || opts.type) ? _compileJS : 0,
        list = brackets.split(html, 0, _bp),
        expr

      for (var i = 1; i < list.length; i += 2) {
        expr = list[i]
        if (expr[0] === '^') {
          expr = expr.slice(1)
        } else if (jsfn) {
          expr = jsfn(expr, opts).trim()
          if (expr.slice(-1) === ';') expr = expr.slice(0, -1)
        }
        list[i] = CH_IDEXPR + (pcex.push(expr) - 1) + _bp[1]
      }
      html = list.join('')
    }
    return html
  }

  function restoreExpr (html, pcex) {
    if (pcex.length) {
      html = html.replace(RE_REPEXPR, function (_, d) {

        return pcex._bp[0] + pcex[d].trim().replace(/[\r\n]+/g, ' ').replace(/"/g, CH_DQCODE)
      })
    }
    return html
  }

  function _compileHTML (html, opts, pcex) {
    if (!/\S/.test(html)) return ''

    html = splitHtml(html, opts, pcex)
      .replace(HTML_TAGS, function (_, name, attr, ends) {

        name = name.toLowerCase()

        ends = ends && !VOID_TAGS.test(name) ? '></' + name : ''

        if (attr) name += ' ' + parseAttribs(attr, pcex)

        return '<' + name + ends + '>'
      })

    if (!opts.whitespace) {
      var p = []

      if (/<pre[\s>]/.test(html)) {
        html = html.replace(PRE_TAGS, function (q) {
          p.push(q)
          return '\u0002'
        })
      }

      html = html.trim().replace(/\s+/g, ' ')

      if (p.length) html = html.replace(/\u0002/g, function () { return p.shift() })
    }

    if (opts.compact) html = html.replace(HTML_PACK, '><$1')

    return restoreExpr(html, pcex).replace(TRIM_TRAIL, '')
  }

  function compileHTML (html, opts, pcex) {

    if (Array.isArray(opts)) {
      pcex = opts
      opts = {}
    } else {
      if (!pcex) pcex = []
      if (!opts) opts = {}
    }

    pcex._bp = brackets.array(opts.brackets)

    return _compileHTML(cleanSource(html), opts, pcex)
  }

  var JS_ES6SIGN = /^[ \t]*([$_A-Za-z][$\w]*)\s*\([^()]*\)\s*{/m

  var JS_ES6END = RegExp('[{}]|' + brackets.S_QBLOCKS, 'g')

  var JS_COMMS = RegExp(brackets.R_MLCOMMS.source + '|//[^\r\n]*|' + brackets.S_QBLOCKS, 'g')

  function riotjs (js) {
    var
      parts = [],
      match,
      toes5,
      pos,
      name,
      RE = RegExp

    if (~js.indexOf('/')) js = rmComms(js, JS_COMMS)

    while ((match = js.match(JS_ES6SIGN))) {

      parts.push(RE.leftContext)
      js  = RE.rightContext
      pos = skipBody(js, JS_ES6END)

      name  = match[1]
      toes5 = !/^(?:if|while|for|switch|catch|function)$/.test(name)
      name  = toes5 ? match[0].replace(name, 'this.' + name + ' = function') : match[0]
      parts.push(name, js.slice(0, pos))
      js = js.slice(pos)

      if (toes5 && !/^\s*.\s*bind\b/.test(js)) parts.push('.bind(this)')
    }

    return parts.length ? parts.join('') + js : js

    function rmComms (s, r, m) {
      r.lastIndex = 0
      while ((m = r.exec(s))) {
        if (m[0][0] === '/' && !m[1] && !m[2]) {
          s = RE.leftContext + ' ' + RE.rightContext
          r.lastIndex = m[3] + 1
        }
      }
      return s
    }

    function skipBody (s, r) {
      var m, i = 1

      r.lastIndex = 0
      while (i && (m = r.exec(s))) {
        if (m[0] === '{') ++i
        else if (m[0] === '}') --i
      }
      return i ? s.length : r.lastIndex
    }
  }

  function _compileJS (js, opts, type, parserOpts, url) {
    if (!/\S/.test(js)) return ''
    if (!type) type = opts.type

    var parser = opts.parser || type && parsers._req('js.' + type, true) || riotjs

    return parser(js, parserOpts, url).replace(/\r\n?/g, '\n').replace(TRIM_TRAIL, '')
  }

  function compileJS (js, opts, type, userOpts) {
    if (typeof opts === 'string') {
      userOpts = type
      type = opts
      opts = {}
    }
    if (type && typeof type === 'object') {
      userOpts = type
      type = ''
    }
    if (!userOpts) userOpts = {}

    return _compileJS(js, opts || {}, type, userOpts.parserOptions, userOpts.url)
  }

  var CSS_SELECTOR = RegExp('([{}]|^)[ ;]*([^@ ;{}][^{}]*)(?={)|' + S_LINESTR, 'g')

  function scopedCSS (tag, css) {
    var scope = ':scope'

    return css.replace(CSS_SELECTOR, function (m, p1, p2) {

      if (!p2) return m

      p2 = p2.replace(/[^,]+/g, function (sel) {
        var s = sel.trim()

        if (!s || s === 'from' || s === 'to' || s.slice(-1) === '%') {
          return sel
        }

        if (s.indexOf(scope) < 0) {
          s = tag + ' ' + s + ',[riot-tag="' + tag + '"] ' + s +
                              ',[data-is="' + tag + '"] ' + s
        } else {
          s = s.replace(scope, tag) + ',' +
              s.replace(scope, '[riot-tag="' + tag + '"]') + ',' +
              s.replace(scope, '[data-is="' + tag + '"]')
        }
        return s
      })

      return p1 ? p1 + ' ' + p2 : p2
    })
  }

  function _compileCSS (css, tag, type, opts) {
    var scoped = (opts || (opts = {})).scoped

    if (type) {
      if (type === 'scoped-css') {
        scoped = true
      } else if (type !== 'css') {

        var parser = parsers._req('css.' + type, true)
        css = parser(tag, css, opts.parserOpts || {}, opts.url)
      }
    }

    css = css.replace(brackets.R_MLCOMMS, '').replace(/\s+/g, ' ').trim()

    if (scoped) {
      if (!tag) {
        throw new Error('Can not parse scoped CSS without a tagName')
      }
      css = scopedCSS(tag, css)
    }
    return css
  }

  function compileCSS (css, type, opts) {
    if (type && typeof type === 'object') {
      opts = type
      type = ''
    } else if (!opts) opts = {}

    return _compileCSS(css, opts.tagName, type, opts)
  }

  var TYPE_ATTR = /\stype\s*=\s*(?:(['"])(.+?)\1|(\S+))/i

  var MISC_ATTR = '\\s*=\\s*(' + S_STRINGS + '|{[^}]+}|\\S+)'

  var END_TAGS = /\/>\n|^<(?:\/?-?[A-Za-z][-\w\xA0-\xFF]*\s*|-?[A-Za-z][-\w\xA0-\xFF]*\s+[-\w:\xA0-\xFF][\S\s]*?)>\n/

  function _q (s, r) {
    if (!s) return "''"
    s = SQ + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + SQ
    return r && ~s.indexOf('\n') ? s.replace(/\n/g, '\\n') : s
  }

  function mktag (name, html, css, attr, js, imports, opts) {
    var
      c = opts.debug ? ',\n  ' : ', ',
      s = '});'

    if (js && js.slice(-1) !== '\n') s = '\n' + s

    return imports + 'riot.tag2(\'' + name + SQ +
      c + _q(html, 1) +
      c + _q(css) +
      c + _q(attr) + ', function(opts) {\n' + js + s
  }

  function splitBlocks (str) {
    if (/<[-\w]/.test(str)) {
      var
        m,
        k = str.lastIndexOf('<'),
        n = str.length

      while (~k) {
        m = str.slice(k, n).match(END_TAGS)
        if (m) {
          k += m.index + m[0].length
          m = str.slice(0, k)
          if (m.slice(-5) === '<-/>\n') m = m.slice(0, -5)
          return [m, str.slice(k)]
        }
        n = k
        k = str.lastIndexOf('<', k - 1)
      }
    }
    return ['', str]
  }

  function getType (attribs) {
    if (attribs) {
      var match = attribs.match(TYPE_ATTR)

      match = match && (match[2] || match[3])
      if (match) {
        return match.replace('text/', '')
      }
    }
    return ''
  }

  function getAttrib (attribs, name) {
    if (attribs) {
      var match = attribs.match(RegExp('\\s' + name + MISC_ATTR, 'i'))

      match = match && match[1]
      if (match) {
        return (/^['"]/).test(match) ? match.slice(1, -1) : match
      }
    }
    return ''
  }

  function unescapeHTML (str) {
    return str
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, '\'')
  }

  function getParserOptions (attribs) {
    var opts = unescapeHTML(getAttrib(attribs, 'options'))

    return opts ? JSON.parse(opts) : null
  }

  function getCode (code, opts, attribs, base) {
    var
      type = getType(attribs),
      src  = getAttrib(attribs, 'src'),
      jsParserOptions = extend({}, opts.parserOptions.js)

    if (src) return false

    return _compileJS(
            code,
            opts,
            type,
            extend(jsParserOptions, getParserOptions(attribs)),
            base
          )
  }

  function cssCode (code, opts, attribs, url, tag) {
    var
      parserStyleOptions = extend({}, opts.parserOptions.style),
      extraOpts = {
        parserOpts: extend(parserStyleOptions, getParserOptions(attribs)),
        scoped: attribs && /\sscoped(\s|=|$)/i.test(attribs),
        url: url
      }

    return _compileCSS(code, tag, getType(attribs) || opts.style, extraOpts)
  }

  function compileTemplate (html, url, lang, opts) {

    var parser = parsers._req('html.' + lang, true)
    return parser(html, opts, url)
  }

  var

    CUST_TAG = RegExp(/^([ \t]*)<(-?[A-Za-z][-\w\xA0-\xFF]*)(?:\s+([^'"\/>]+(?:(?:@|\/[^>])[^'"\/>]*)*)|\s*)?(?:\/>|>[ \t]*\n?([\S\s]*)^\1<\/\2\s*>|>(.*)<\/\2\s*>)/
      .source.replace('@', S_STRINGS), 'gim'),

    SCRIPTS = /<script(\s+[^>]*)?>\n?([\S\s]*?)<\/script\s*>/gi,

    STYLES = /<style(\s+[^>]*)?>\n?([\S\s]*?)<\/style\s*>/gi

  function compile (src, opts, url) {
    var
      parts = [],
      included,
      defaultParserptions = {

        template: {},
        js: {},
        style: {}
      }

    if (!opts) opts = {}

    opts.parserOptions = extend(defaultParserptions, opts.parserOptions || {})

    included = opts.exclude
      ? function (s) { return opts.exclude.indexOf(s) < 0 } : function () { return 1 }

    if (!url) url = ''

    var _bp = brackets.array(opts.brackets)

    if (opts.template) {
      src = compileTemplate(src, url, opts.template, opts.parserOptions.template)
    }

    src = cleanSource(src)
      .replace(CUST_TAG, function (_, indent, tagName, attribs, body, body2) {
        var
          jscode = '',
          styles = '',
          html = '',
          imports = '',
          pcex = []

        pcex._bp = _bp

        tagName = tagName.toLowerCase()

        attribs = attribs && included('attribs')
          ? restoreExpr(
              parseAttribs(
                splitHtml(attribs, opts, pcex),
              pcex),
            pcex) : ''

        if ((body || (body = body2)) && /\S/.test(body)) {

          if (body2) {

            if (included('html')) html = _compileHTML(body2, opts, pcex)
          } else {

            body = body.replace(RegExp('^' + indent, 'gm'), '')

            body = body.replace(STYLES, function (_m, _attrs, _style) {
              if (included('css')) {
                styles += (styles ? ' ' : '') + cssCode(_style, opts, _attrs, url, tagName)
              }
              return ''
            })

            body = body.replace(SCRIPTS, function (_m, _attrs, _script) {
              if (included('js')) {
                var code = getCode(_script, opts, _attrs, url)

                if (code) jscode += (jscode ? '\n' : '') + code
              }
              return ''
            })

            var blocks = splitBlocks(body.replace(TRIM_TRAIL, ''))

            if (included('html')) {
              html = _compileHTML(blocks[0], opts, pcex)
            }

            if (included('js')) {
              body = _compileJS(blocks[1], opts, null, null, url)
              if (body) jscode += (jscode ? '\n' : '') + body
              jscode = jscode.replace(IMPORT_STATEMENT, function (s) {
                imports += s.trim() + '\n'
                return ''
              })
            }
          }
        }

        jscode = /\S/.test(jscode) ? jscode.replace(/\n{3,}/g, '\n\n') : ''

        if (opts.entities) {
          parts.push({
            tagName: tagName,
            html: html,
            css: styles,
            attribs: attribs,
            js: jscode,
            imports: imports
          })
          return ''
        }

        return mktag(tagName, html, styles, attribs, jscode, imports, opts)
      })

    if (opts.entities) return parts

    return src
  }

  riot.util.compiler = {
    compile: compile,
    html: compileHTML,
    css: compileCSS,
    js: compileJS,
    version: 'v2.5.7'
  }
  return compile

})()

/*
  Compilation for the browser
*/
riot.compile = (function () {

  var
    promise,    // emits the 'ready' event and runs the first callback
    ready       // all the scripts were compiled?

  // gets the source of an external tag with an async call
  function GET (url, fn, opts) {
    var req = new XMLHttpRequest()

    req.onreadystatechange = function () {
      if (req.readyState === 4 &&
         (req.status === 200 || !req.status && req.responseText.length)) {
        fn(req.responseText, opts, url)
      }
    }
    req.open('GET', url, true)
    req.send('')
  }

  // evaluates a compiled tag within the global context
  function globalEval (js, url) {
    if (typeof js === T_STRING) {
      var
        node = mkEl('script'),
        root = document.documentElement

      // make the source available in the "(no domain)" tab
      // of Chrome DevTools, with a .js extension
      if (url) js += '\n//# sourceURL=' + url + '.js'

      node.text = js
      root.appendChild(node)
      root.removeChild(node)
    }
  }

  // compiles all the internal and external tags on the page
  function compileScripts (fn, xopt) {
    var
      scripts = $$('script[type="riot/tag"]'),
      scriptsAmount = scripts.length

    function done() {
      promise.trigger('ready')
      ready = true
      if (fn) fn()
    }

    function compileTag (src, opts, url) {
      var code = compile(src, opts, url)

      globalEval(code, url)
      if (!--scriptsAmount) done()
    }

    if (!scriptsAmount) done()
    else {
      for (var i = 0; i < scripts.length; ++i) {
        var
          script = scripts[i],
          opts = extend({template: getAttr(script, 'template')}, xopt),
          url = getAttr(script, 'src')

        url ? GET(url, compileTag, opts) : compileTag(script.innerHTML, opts)
      }
    }
  }

  //// Entry point -----

  return function (arg, fn, opts) {

    if (typeof arg === T_STRING) {

      // 2nd parameter is optional, but can be null
      if (isObject(fn)) {
        opts = fn
        fn = false
      }

      // `riot.compile(tag [, callback | true][, options])`
      if (/^\s*</m.test(arg)) {
        var js = compile(arg, opts)
        if (fn !== true) globalEval(js)
        if (isFunction(fn)) fn(js, arg, opts)
        return js
      }

      // `riot.compile(url [, callback][, options])`
      GET(arg, function (str, opts, url) {
        var js = compile(str, opts, url)
        globalEval(js, url)
        if (fn) fn(js, str, opts)
      }, opts)

    }
    else {

      // `riot.compile([callback][, options])`
      if (isFunction(arg)) {
        opts = fn
        fn = arg
      } else {
        opts = arg
        fn = undefined
      }

      if (ready) {
        return fn && fn()
      }

      if (promise) {
        if (fn) promise.on('ready', fn)

      } else {
        promise = riot.observable()
        compileScripts(fn, opts)
      }
    }
  }

})()

// reassign mount methods -----
var mount = riot.mount

riot.mount = function () {
  var ret,
    args = arguments
  riot.compile(function () { ret = mount.apply(riot, args) })
  return ret
}
  // support CommonJS, AMD & browser
  /* istanbul ignore next */
  if (typeof exports === T_OBJECT)
    module.exports = riot
  else if ("function" === T_FUNCTION && typeof __webpack_require__(4) !== T_UNDEF)
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return riot }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  else
    window.riot = riot

})(typeof window != 'undefined' ? window : void 0);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(debugging) {
        this.debugging = debugging;
        this.logs = [];
    }
    get time() {
        return new Date().getTime();
    }
    _format(message, timestamp) {
        return `[${new Date(timestamp).toString()}]: (r-localize) "${message}"`;
    }
    $get(type) {
        return this.logs.filter((log) => type ? log.type === type : true);
    }
    log(message) {
        const timestamp = this.time;
        if (this.debugging)
            console.log(this._format(message, timestamp));
        this.logs.push({ type: 'general', message, timestamp });
    }
    warn(message) {
        const timestamp = this.time;
        if (this.debugging)
            console.warn(this._format(message, timestamp));
        this.logs.push({ type: 'warning', message, timestamp });
    }
    error(message) {
        const timestamp = this.time;
        if (this.debugging)
            console.error(this._format(message, timestamp));
        this.logs.push({ type: 'critical', message, timestamp });
    }
}
exports.Logger = Logger;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Tag(opts) {
    const self = this;
    self.opts = opts;
    function localization() {
        const nodeContent = self.root.textContent || self.root.innerHTML;
        let translation = typeof self.opts.t == 'string' ? self.localize.translate(self.opts.t) : self.localize.translate(self.opts.t.i, self.opts.t.l);
        translation = this.localize ? this.localize.options.fallbackContent && translation == this.localize.options.fallback ? nodeContent ? nodeContent : translation : translation : translation;
        if (typeof self.opts.t == 'string')
            self.root.innerHTML = translation;
        else if (!self.opts.t.attr)
            self.root.innerHTML = translation;
        else
            self.root.setAttribute(self.opts.t.attr, translation);
    }
    self.on('mount', localization);
    self.localize.on('updated', localization);
}
exports.Tag = Tag;


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3MjZlMTFlNTJjNjA4YWYwODk2ZCIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYWxpemUudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Jpb3QtdHlwZXNjcmlwdC9yaW90LXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaW90LXR5cGVzY3JpcHQvbm9kZV9tb2R1bGVzL3Jpb3QvcmlvdCtjb21waWxlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2NhbGl6ZS50YWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxvQ0FBdUM7QUFHdkMsd0NBQWlDO0FBQ2pDLDhDQUFvQztBQUVwQyxjQUE4QixTQUFR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QVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEdBQUcsR0FBRzs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLHFCQUFxQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1FQUFtRTtBQUNuRTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLG1DQUFtQztBQUNqRTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxjQUFjOztBQUVmO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1Qyx5QkFBeUI7O0FBRWhFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsdUNBQXVDO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEIsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsVUFBVTtBQUN6QixlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixhQUFhLFdBQVc7QUFDeEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEIsYUFBYSxXQUFXO0FBQ3hCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixhQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsZ0JBQWdCO0FBQy9ELEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBLG9EQUFvRCxhQUFhO0FBQ2pFLEtBQUs7QUFDTDtBQUNBLGtEQUFrRCw0QkFBNEI7QUFDOUUsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQSxnRUFBZ0UsbUJBQW1CO0FBQ25GOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLDhEQUE4RDs7QUFFOUQsNkJBQTZCOztBQUU3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQztBQUNwQzs7QUFFQSxpQ0FBaUMsT0FBTyxVQUFVLEtBQUssT0FBTzs7QUFFOUQ7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxvQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBLGdEQUFnRCxHQUFHLEdBQUc7O0FBRXREOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxFQUFFOztBQUVkOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsMEJBQTBCO0FBQzFCLDBCQUEwQjtBQUMxQiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQzs7QUFFakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjtBQUNwQixjQUFjO0FBQ2Q7QUFDQTs7QUFFQTs7QUFFQSw2RUFBNkU7O0FBRTdFO0FBQ0Esc0JBQXNCLHFDQUFxQyxnQkFBZ0I7O0FBRTNFOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLFdBQVc7O0FBRVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUEsd0RBQXdELEdBQUc7O0FBRTNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0EseUJBQXlCLHNDQUFzQztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0NBQWdDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQXVCLGNBQWM7QUFBQTtBQUNyQztBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDNzlHRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7OztBQ3BCQTtBQUNBOzs7Ozs7Ozs7OztBQ0NBO0lBU0UsWUFBYSxTQUFrQjtRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVM7UUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO0lBQ2hCLENBQUM7SUFNRCxJQUFJLElBQUk7UUFDTixNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDN0IsQ0FBQztJQU9ELE9BQU8sQ0FBRSxPQUFlLEVBQUUsU0FBaUI7UUFDekMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLG9CQUFvQixPQUFPLEdBQUc7SUFDekUsQ0FBQztJQU9ELElBQUksQ0FBRSxJQUFZO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25FLENBQUM7SUFNRCxHQUFHLENBQUUsT0FBZTtRQUNsQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSTtRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUN6RCxDQUFDO0lBTUQsSUFBSSxDQUFFLE9BQWU7UUFDbkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUk7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDekQsQ0FBQztJQU1ELEtBQUssQ0FBRSxPQUFlO1FBQ3BCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQzFELENBQUM7Q0FFRjtBQXpFRCx3QkF5RUM7Ozs7Ozs7Ozs7QUMzRUQsYUFBcUIsSUFBYTtJQUNoQyxNQUFNLElBQUksR0FBRyxJQUFJO0lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSTtJQUNoQjtRQUNFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztRQUVoRSxJQUFJLFdBQVcsR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVztRQUMxTCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXO1FBQ25DLElBQUksQ0FDRixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXO1FBQ25DLElBQUk7WUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDO0lBQzNELENBQUM7SUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7SUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztBQUMzQyxDQUFDO0FBbkJELGtCQW1CQyIsImZpbGUiOiJyLWxvY2FsaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTG9jYWxpemVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTG9jYWxpemVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDcyNmUxMWU1MmM2MDhhZjA4OTZkIiwiaW1wb3J0ICogYXMgUmlvdCBmcm9tICdyaW90LXR5cGVzY3JpcHQnXG5cbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInXG5pbXBvcnQgeyBUYWcgfSBmcm9tICcuL2xvY2FsaXplLnRhZydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYWxpemUgZXh0ZW5kcyBSaW90Lk9ic2VydmFibGUge1xuXG4gIHByaXZhdGUgJGxvZ2dlcjogTG9nZ2VyXG4gIHByaXZhdGUgb3B0aW9uczogT3B0aW9uc1xuICBwcml2YXRlIGxvY2FsaXphdGlvbnM6IG9iamVjdFxuICBwcml2YXRlIF9sb2NhbGU6IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBMb2NhbGl6YXRpb24gbWl4aW4gZm9yIGkxOG4gaW1wbGVtZW50YXRpb24uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBsb2NhbGl6YXRpb25zIC0gRGljdGlvbmFyeSBvZiBsb2NhbGl6YXRpb25zLlxuICAgKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBtaXhpbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChpbnN0YW5jZTogYW55LCBvcHRpb25zOiBPcHRpb25zLCBsb2NhbGl6YXRpb25zOiBvYmplY3QpIHtcbiAgICBzdXBlcigpXG5cbiAgICAvLyAjIGNoZWNrcyBuZWNlc3NhcnkgZm9yIG5vbiB0cyB1c2VcbiAgICBpZiAoIW9wdGlvbnMuZGVmYXVsdCB8fCAhb3B0aW9ucy5hdmFpbGFibGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdFeHBlY3RlZCBvcHRpb25zIHRvIGluY2x1ZGUgYSBkZWZhdWx0IGxvY2FsZSBhbmQgbGlzdCBvZiBhdmFpbGFibGUgbG9jYWxlcycpXG4gICAgb3B0aW9ucy5hdmFpbGFibGUuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgaWYgKCFsb2NhbGl6YXRpb25zW2xvY2FsZV0pXG4gICAgICAgIHRocm93IEVycm9yKGBMb2NhbGUgXCIke2xvY2FsZX1cIiBoYXMgbm8gbWFwcGluZ3MgYXZhaWxhYmxlYClcbiAgICB9KVxuICAgIC8vICMgc2V0IGRlZmF1bHRzXG4gICAgb3B0aW9ucy5kZWJ1ZyA9IHR5cGVvZihvcHRpb25zLmRlYnVnKSA9PSAndW5kZWZpbmVkJyA/IGZhbHNlIDogb3B0aW9ucy5kZWJ1Z1xuICAgIG9wdGlvbnMuZmFsbGJhY2tDb250ZW50ID0gb3B0aW9ucy5mYWxsYmFja0NvbnRlbnQgfHwgZmFsc2VcbiAgICBvcHRpb25zLmZhbGxiYWNrID0gb3B0aW9ucy5mYWxsYmFjayB8fCAnPydcbiAgICBvcHRpb25zLndlYlN0b3JlID0gb3B0aW9ucy53ZWJTdG9yZSB8fCBmYWxzZVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmxvY2FsaXphdGlvbnMgPSBsb2NhbGl6YXRpb25zXG4gICAgLy8gIyBzZXJ2ZXIgdnMgY2xpZW50XG4gICAgaWYgKHRoaXMud2ViU3RvcmUpXG4gICAgICB0aGlzLl9sb2NhbGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvY2FsaXphdGlvbicpIHx8IHRoaXMub3B0aW9ucy5kZWZhdWx0XG4gICAgZWxzZVxuICAgICAgdGhpcy5fbG9jYWxlID0gdGhpcy5vcHRpb25zLmRlZmF1bHRcblxuICAgIHRoaXMuJGxvZ2dlciA9IG5ldyBMb2dnZXIodGhpcy5vcHRpb25zLmRlYnVnKVxuICAgIHRoaXMuJGxvZ2dlci5sb2coJ0xvY2FsaXplIG1peGluIGluc3RhbnRpYXRlZC4nKVxuXG4gICAgaW5zdGFuY2UubWl4aW4oeyBsb2NhbGl6ZTogdGhpcyB9KVxuICAgIGluc3RhbmNlLnRhZygnbG9jYWxpemUnLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBUYWcpXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBvciBub3Qgd2ViIHN0b3JlIGlzIGVuYWJsZWQgYW5kIGF2YWlsYWJsZS5cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBnZXQgd2ViU3RvcmUgKCkgOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLndlYlN0b3JlICYmIHR5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJ1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBvciBzZXQgY3VycmVudCBsb2NhbGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgLSBMb2NhbGUgdG8gdXNlLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfHZvaWR9XG4gICAqL1xuICBsb2NhbGUgKGxvY2FsZSA9IG51bGwpIDogc3RyaW5nIHtcbiAgICBpZiAobG9jYWxlKSB7XG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5hdmFpbGFibGUuZmluZChsID0+IGwgPT0gbG9jYWxlKSkge1xuICAgICAgICB0aGlzLiRsb2dnZXIuZXJyb3IoYExvY2FsZSBcIiR7IGxvY2FsZSB9XCIgbm90IHJlY29nbml6ZWQuYClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLnRyaWdnZXIoJ3VwZGF0ZScpXG4gICAgICBpZiAodGhpcy53ZWJTdG9yZSlcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2NhbGl6YXRpb24nLCBsb2NhbGUpXG4gICAgICB0aGlzLl9sb2NhbGUgPSBsb2NhbGVcbiAgICAgIHRoaXMuJGxvZ2dlci5sb2coYExvY2FsZSBjaGFuZ2VkIHRvIFwiJHsgbG9jYWxlIH1cIi5gKVxuICAgICAgdGhpcy50cmlnZ2VyKCd1cGRhdGVkJylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgbG9jYWxpemVkIGl0ZW0uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gSXRlbSBrZXkgdG8gbG9jYWxpemUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgLSBPcHRpb25hbCBsb2NhbGUsIG90aGVyd2lzZSB3aWxsIHVzZSBjdXJyZW50LlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgdHJhbnNsYXRlIChpdGVtOiBzdHJpbmcsIGxvY2FsZSA9IG51bGwpIDogc3RyaW5nIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGxldCBzdHViID0gc2VsZi5sb2NhbGl6YXRpb25zW2xvY2FsZSB8fCBzZWxmLl9sb2NhbGVdXG4gICAgaWYgKGxvY2FsZSAmJiAhdGhpcy5vcHRpb25zLmF2YWlsYWJsZS5maW5kKGwgPT4gbCA9PSBsb2NhbGUpKSB7XG4gICAgICB0aGlzLiRsb2dnZXIuZXJyb3IoYExvY2FsZSBcIiR7IGxvY2FsZSB9XCIgbm90IHJlY29nbml6ZWQuYClcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmFsbGJhY2tcbiAgICB9XG4gICAgY29uc3QgYnJhbmNoZXMgPSBpdGVtLnNwbGl0KCcuJylcbiAgICAvLyAjIHNwbGl0IHVwIHRvIHRlcm1pbmF0ZSBpbiB0aGUgZXZlbnQgYSBicmFuY2ggaXMgbm90IGZvdW5kXG4gICAgZm9yIChjb25zdCBiIGluIGJyYW5jaGVzKSB7XG4gICAgICBjb25zdCBicmFuY2ggPSBicmFuY2hlc1tiXVxuICAgICAgaWYgKHN0dWJbYnJhbmNoXSlcbiAgICAgICAgc3R1YiA9IHN0dWJbYnJhbmNoXVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzZWxmLiRsb2dnZXIuZXJyb3IoYFByb3ZpZGVkIGl0ZW0gXCIkeyBpdGVtIH1cIiBjb3VsZCBub3QgYmUgbG9jYWxpemVkIGluIGxvY2FsZSBcIiR7IGxvY2FsZSB8fCBzZWxmLl9sb2NhbGUgfVwiLmApXG4gICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5mYWxsYmFja1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kbG9nZ2VyLmxvZyhgTG9jYWxpemVkIGl0ZW0gXCIkeyBpdGVtIH1cIiByZXRyaWV2ZWQgZm9yIGxvY2FsZSBcIiR7IGxvY2FsZSB8fCBzZWxmLl9sb2NhbGUgfVwiLmApXG4gICAgc2VsZi50cmlnZ2VyKCdsb2NhbGl6ZScsIHsgaXRlbSwgbG9jYWxlOiBsb2NhbGUgfHwgc2VsZi5fbG9jYWxlIH0pXG4gICAgcmV0dXJuIHN0dWJcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbG9jYWxpemUudHMiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIHJpb3QgPSByZXF1aXJlKFwicmlvdC9yaW90K2NvbXBpbGVyXCIpO1xyXG52YXIgT2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKCkge1xyXG4gICAgICAgIHJpb3Qub2JzZXJ2YWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50cywgY2FsbGJhY2spIHsgfTtcclxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uIChldmVudHMsIGNhbGxiYWNrKSB7IH07XHJcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRzKSB7IH07XHJcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE9ic2VydmFibGU7XHJcbn0oKSk7XHJcbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XHJcbnZhciBFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEVsZW1lbnQoKSB7XHJcbiAgICB9XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGF0YSkgeyB9O1xyXG4gICAgRWxlbWVudC5wcm90b3R5cGUudW5tb3VudCA9IGZ1bmN0aW9uIChrZWVwVGhlUGFyZW50KSB7IH07XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGZ1bikgeyB9O1xyXG4gICAgRWxlbWVudC5wcm90b3R5cGUub25lID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZnVuKSB7IH07XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRzKSB7IH07XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgRWxlbWVudC5wcm90b3R5cGUubWl4aW4gPSBmdW5jdGlvbiAobWl4aW5PYmplY3QsIGluc3RhbmNlKSB7IH07XHJcbiAgICBFbGVtZW50LmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0YWdOYW1lID0gdGhpcy5wcm90b3R5cGUudGFnTmFtZTtcclxuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgICAgIHJpb3QubW91bnQoZWwsIHRhZ05hbWUsIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRWxlbWVudDtcclxufSgpKTtcclxuZXhwb3J0cy5FbGVtZW50ID0gRWxlbWVudDtcclxuLy8gbmV3IGV4dGVuZCwgd29ya3Mgd2l0aCBnZXR0ZXJzIGFuZCBzZXR0ZXJzXHJcbmZ1bmN0aW9uIGV4dGVuZChkLCBlbGVtZW50KSB7XHJcbiAgICB2YXIgbWFwID0gT2JqZWN0LmtleXMoZWxlbWVudC5wcm90b3R5cGUpLnJlZHVjZShmdW5jdGlvbiAoZGVzY3JpcHRvcnMsIGtleSkge1xyXG4gICAgICAgIGRlc2NyaXB0b3JzW2tleV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQucHJvdG90eXBlLCBrZXkpO1xyXG4gICAgICAgIHJldHVybiBkZXNjcmlwdG9ycztcclxuICAgIH0sIHt9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGQsIG1hcCk7XHJcbn1cclxuLyogb2xkIGV4dGVuZCwgd2l0aG91dCBnZXR0ZXJzIGFuZCBzZXR0ZXJzXHJcbmZ1bmN0aW9uIGV4dGVuZChkLCBlbGVtZW50KSB7XHJcbiAgIE9iamVjdC5rZXlzKGVsZW1lbnQucHJvdG90eXBlKS5mb3JFYWNoKChrZXkpID0+IGRba2V5XSA9IGVsZW1lbnQucHJvdG90eXBlW2tleV0pO1xyXG59XHJcbiovXHJcbmV4cG9ydHMucHJlY29tcGlsZWRUYWdzID0ge307XHJcbmZ1bmN0aW9uIHJlZ2lzdGVyQ2xhc3MoZWxlbWVudCkge1xyXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJUYWcoY29tcGlsZWRUYWcpIHtcclxuICAgICAgICB2YXIgdHJhbnNmb3JtRnVuY3Rpb24gPSBmdW5jdGlvbiAob3B0cykge1xyXG4gICAgICAgICAgICBleHRlbmQodGhpcywgZWxlbWVudCk7IC8vIGNvcGllcyBwcm90b3R5cGUgaW50byBcInRoaXNcIlxyXG4gICAgICAgICAgICBlbGVtZW50LmFwcGx5KHRoaXMsIFtvcHRzXSk7IC8vIGNhbGxzIGNsYXNzIGNvbnN0cnVjdG9yIGFwcGx5aW5nIGl0IG9uIFwidGhpc1wiXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnByb3RvdHlwZS5tb3VudGVkICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwibW91bnRcIiwgdGhpcy5tb3VudGVkKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQucHJvdG90eXBlLnVubW91bnRlZCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInVubW91bnRcIiwgdGhpcy51bm1vdW50ZWQpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5wcm90b3R5cGUudXBkYXRpbmcgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMub24oXCJ1cGRhdGVcIiwgdGhpcy51cGRhdGluZyk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnByb3RvdHlwZS51cGRhdGVkICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwidXBkYXRlZFwiLCB0aGlzLnVwZGF0ZWQpO1xyXG4gICAgICAgICAgICAvLyBUT0RPIHN1cHBvcnQgZm9yIGluaXQob3B0cykgP1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmlvdC50YWcyKGNvbXBpbGVkVGFnLnRhZ05hbWUsIGNvbXBpbGVkVGFnLmh0bWwsIGNvbXBpbGVkVGFnLmNzcywgY29tcGlsZWRUYWcuYXR0cmlicywgdHJhbnNmb3JtRnVuY3Rpb24sIHJpb3Quc2V0dGluZ3MuYnJhY2tldHMpO1xyXG4gICAgICAgIHJldHVybiBjb21waWxlZFRhZy50YWdOYW1lO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbG9hZFRlbXBsYXRlRnJvbUhUVFAodGVtcGxhdGUpIHtcclxuICAgICAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxLm9wZW4oXCJHRVRcIiwgdGVtcGxhdGUsIGZhbHNlKTtcclxuICAgICAgICByZXEuc2VuZCgpO1xyXG4gICAgICAgIGlmIChyZXEuc3RhdHVzID09IDIwMClcclxuICAgICAgICAgICAgcmV0dXJuIHJlcS5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aHJvdyByZXEucmVzcG9uc2VUZXh0O1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgdmFyIGNvbXBpbGVkO1xyXG4gICAgLy8gZ2V0cyBzdHJpbmcgdGVtcGxhdGU6IGlubGluZWQsIHZpYSBodHRwIHJlcXVlc3Qgb3IgdmlhIHByZWNvbXBpbGVkIGNhY2hlXHJcbiAgICBpZiAoZWxlbWVudC5wcm90b3R5cGUudGVtcGxhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHZhciB0YWdUZW1wbGF0ZSA9IGVsZW1lbnQucHJvdG90eXBlLnRlbXBsYXRlO1xyXG4gICAgICAgIGlmICh0YWdUZW1wbGF0ZS5pbmRleE9mKFwiPFwiKSA8IDApIHtcclxuICAgICAgICAgICAgLy8gdGFnIGlzIGEgZmlsZVxyXG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5wcmVjb21waWxlZFRhZ3NbdGFnVGVtcGxhdGVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGxvYWRzIGl0IGZyb20gcHJlY29tcGlsZWQgY2FjaGVcclxuICAgICAgICAgICAgICAgIGNvbXBpbGVkID0gZXhwb3J0cy5wcmVjb21waWxlZFRhZ3NbdGFnVGVtcGxhdGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gbG9hZHMgZnJvbSBIVFRQIGFuZCBjb21waWxlIG9uIHRoZSBmbHlcclxuICAgICAgICAgICAgICAgIHRhZ1RlbXBsYXRlID0gbG9hZFRlbXBsYXRlRnJvbUhUVFAodGFnVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgY29tcGlsZWQgPSByaW90LmNvbXBpbGUodGFnVGVtcGxhdGUsIHRydWUsIHsgZW50aXRpZXM6IHRydWUgfSlbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRhZyBpcyBpbmxpbmVkLCBjb21waWxlIG9uIHRoZSBmbHlcclxuICAgICAgICAgICAgY29tcGlsZWQgPSByaW90LmNvbXBpbGUodGFnVGVtcGxhdGUsIHRydWUsIHsgZW50aXRpZXM6IHRydWUgfSlbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW1lbnQucHJvdG90eXBlLnRhZ05hbWUgPSByZWdpc3RlclRhZyhjb21waWxlZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgdGhyb3cgXCJ0ZW1wbGF0ZSBwcm9wZXJ0eSBub3Qgc3BlY2lmaWVkXCI7XHJcbn1cclxuZXhwb3J0cy5yZWdpc3RlckNsYXNzID0gcmVnaXN0ZXJDbGFzcztcclxuLy8gQHRlbXBsYXRlIGRlY29yYXRvclxyXG5mdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICB0YXJnZXQucHJvdG90eXBlW1widGVtcGxhdGVcIl0gPSB0ZW1wbGF0ZTtcclxuICAgICAgICByZWdpc3RlckNsYXNzKHRhcmdldCk7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmlvdC10cy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yaW90LXR5cGVzY3JpcHQvcmlvdC10cy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBSaW90IHYyLjYuOCwgQGxpY2Vuc2UgTUlUICovXG5cbjsoZnVuY3Rpb24od2luZG93LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xudmFyIHJpb3QgPSB7IHZlcnNpb246ICd2Mi42LjgnLCBzZXR0aW5nczoge30gfSxcbiAgLy8gYmUgYXdhcmUsIGludGVybmFsIHVzYWdlXG4gIC8vIEFUVEVOVElPTjogcHJlZml4IHRoZSBnbG9iYWwgZHluYW1pYyB2YXJpYWJsZXMgd2l0aCBgX19gXG5cbiAgLy8gY291bnRlciB0byBnaXZlIGEgdW5pcXVlIGlkIHRvIGFsbCB0aGUgVGFnIGluc3RhbmNlc1xuICBfX3VpZCA9IDAsXG4gIC8vIHRhZ3MgaW5zdGFuY2VzIGNhY2hlXG4gIF9fdmlydHVhbERvbSA9IFtdLFxuICAvLyB0YWdzIGltcGxlbWVudGF0aW9uIGNhY2hlXG4gIF9fdGFnSW1wbCA9IHt9LFxuXG4gIC8qKlxuICAgKiBDb25zdFxuICAgKi9cbiAgR0xPQkFMX01JWElOID0gJ19fZ2xvYmFsX21peGluJyxcblxuICAvLyByaW90IHNwZWNpZmljIHByZWZpeGVzXG4gIFJJT1RfUFJFRklYID0gJ3Jpb3QtJyxcbiAgUklPVF9UQUcgPSBSSU9UX1BSRUZJWCArICd0YWcnLFxuICBSSU9UX1RBR19JUyA9ICdkYXRhLWlzJyxcblxuICAvLyBmb3IgdHlwZW9mID09ICcnIGNvbXBhcmlzb25zXG4gIFRfU1RSSU5HID0gJ3N0cmluZycsXG4gIFRfT0JKRUNUID0gJ29iamVjdCcsXG4gIFRfVU5ERUYgID0gJ3VuZGVmaW5lZCcsXG4gIFRfRlVOQ1RJT04gPSAnZnVuY3Rpb24nLFxuICBYTElOS19OUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyxcbiAgWExJTktfUkVHRVggPSAvXnhsaW5rOihcXHcrKS8sXG4gIC8vIHNwZWNpYWwgbmF0aXZlIHRhZ3MgdGhhdCBjYW5ub3QgYmUgdHJlYXRlZCBsaWtlIHRoZSBvdGhlcnNcbiAgU1BFQ0lBTF9UQUdTX1JFR0VYID0gL14oPzp0KD86Ym9keXxoZWFkfGZvb3R8W3JoZF0pfGNhcHRpb258Y29sKD86Z3JvdXApP3xvcHQoPzppb258Z3JvdXApKSQvLFxuICBSRVNFUlZFRF9XT1JEU19CTEFDS0xJU1QgPSAvXig/Ol8oPzppdGVtfGlkfHBhcmVudCl8dXBkYXRlfHJvb3R8KD86dW4pP21vdW50fG1peGlufGlzKD86TW91bnRlZHxMb29wKXx0YWdzfHBhcmVudHxvcHRzfHRyaWdnZXJ8byg/Om58ZmZ8bmUpKSQvLFxuICAvLyBTVkcgdGFncyBsaXN0IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9TVkcvYXR0aW5kZXguaHRtbCNQcmVzZW50YXRpb25BdHRyaWJ1dGVzXG4gIFNWR19UQUdTX0xJU1QgPSBbJ2FsdEdseXBoJywgJ2FuaW1hdGUnLCAnYW5pbWF0ZUNvbG9yJywgJ2NpcmNsZScsICdjbGlwUGF0aCcsICdkZWZzJywgJ2VsbGlwc2UnLCAnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JywgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLCAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsICdmZURpc3BsYWNlbWVudE1hcCcsICdmZUZsb29kJywgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlSW1hZ2UnLCAnZmVNZXJnZScsICdmZU1vcnBob2xvZ3knLCAnZmVPZmZzZXQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJywgJ2ZlVGlsZScsICdmZVR1cmJ1bGVuY2UnLCAnZmlsdGVyJywgJ2ZvbnQnLCAnZm9yZWlnbk9iamVjdCcsICdnJywgJ2dseXBoJywgJ2dseXBoUmVmJywgJ2ltYWdlJywgJ2xpbmUnLCAnbGluZWFyR3JhZGllbnQnLCAnbWFya2VyJywgJ21hc2snLCAnbWlzc2luZy1nbHlwaCcsICdwYXRoJywgJ3BhdHRlcm4nLCAncG9seWdvbicsICdwb2x5bGluZScsICdyYWRpYWxHcmFkaWVudCcsICdyZWN0JywgJ3N0b3AnLCAnc3ZnJywgJ3N3aXRjaCcsICdzeW1ib2wnLCAndGV4dCcsICd0ZXh0UGF0aCcsICd0cmVmJywgJ3RzcGFuJywgJ3VzZSddLFxuXG4gIC8vIHZlcnNpb24jIGZvciBJRSA4LTExLCAwIGZvciBvdGhlcnNcbiAgSUVfVkVSU0lPTiA9ICh3aW5kb3cgJiYgd2luZG93LmRvY3VtZW50IHx8IHt9KS5kb2N1bWVudE1vZGUgfCAwLFxuXG4gIC8vIGRldGVjdCBmaXJlZm94IHRvIGZpeCAjMTM3NFxuICBGSVJFRk9YID0gd2luZG93ICYmICEhd2luZG93Lkluc3RhbGxUcmlnZ2VyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xucmlvdC5vYnNlcnZhYmxlID0gZnVuY3Rpb24oZWwpIHtcblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBvcmlnaW5hbCBvYmplY3Qgb3IgY3JlYXRlIGEgbmV3IGVtcHR5IG9uZVxuICAgKiBAdHlwZSB7IE9iamVjdCB9XG4gICAqL1xuXG4gIGVsID0gZWwgfHwge31cblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICovXG4gIHZhciBjYWxsYmFja3MgPSB7fSxcbiAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIE1ldGhvZHNcbiAgICovXG5cbiAgLyoqXG4gICAqIEhlbHBlciBmdW5jdGlvbiBuZWVkZWQgdG8gZ2V0IGFuZCBsb29wIGFsbCB0aGUgZXZlbnRzIGluIGEgc3RyaW5nXG4gICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBlIC0gZXZlbnQgc3RyaW5nXG4gICAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gICBmbiAtIGNhbGxiYWNrXG4gICAqL1xuICBmdW5jdGlvbiBvbkVhY2hFdmVudChlLCBmbikge1xuICAgIHZhciBlcyA9IGUuc3BsaXQoJyAnKSwgbCA9IGVzLmxlbmd0aCwgaSA9IDBcbiAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIG5hbWUgPSBlc1tpXVxuICAgICAgaWYgKG5hbWUpIGZuKG5hbWUsIGkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBBcGlcbiAgICovXG5cbiAgLy8gZXh0ZW5kIHRoZSBlbCBvYmplY3QgYWRkaW5nIHRoZSBvYnNlcnZhYmxlIG1ldGhvZHNcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZWwsIHtcbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdGhlIGdpdmVuIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGBldmVudHNgIGFuZFxuICAgICAqIGV4ZWN1dGUgdGhlIGBjYWxsYmFja2AgZWFjaCB0aW1lIGFuIGV2ZW50IGlzIHRyaWdnZXJlZC5cbiAgICAgKiBAcGFyYW0gIHsgU3RyaW5nIH0gZXZlbnRzIC0gZXZlbnRzIGlkc1xuICAgICAqIEBwYXJhbSAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb246IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudHMsIGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT0gJ2Z1bmN0aW9uJykgIHJldHVybiBlbFxuXG4gICAgICAgIG9uRWFjaEV2ZW50KGV2ZW50cywgZnVuY3Rpb24obmFtZSwgcG9zKSB7XG4gICAgICAgICAgKGNhbGxiYWNrc1tuYW1lXSA9IGNhbGxiYWNrc1tuYW1lXSB8fCBbXSkucHVzaChmbilcbiAgICAgICAgICBmbi50eXBlZCA9IHBvcyA+IDBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgYGV2ZW50c2AgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudHMgLSBldmVudHMgaWRzXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb2ZmOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnRzLCBmbikge1xuICAgICAgICBpZiAoZXZlbnRzID09ICcqJyAmJiAhZm4pIGNhbGxiYWNrcyA9IHt9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIG9uRWFjaEV2ZW50KGV2ZW50cywgZnVuY3Rpb24obmFtZSwgcG9zKSB7XG4gICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgdmFyIGFyciA9IGNhbGxiYWNrc1tuYW1lXVxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgY2I7IGNiID0gYXJyICYmIGFycltpXTsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNiID09IGZuKSBhcnIuc3BsaWNlKGktLSwgMSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGRlbGV0ZSBjYWxsYmFja3NbbmFtZV1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdGhlIGdpdmVuIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGBldmVudHNgIGFuZFxuICAgICAqIGV4ZWN1dGUgdGhlIGBjYWxsYmFja2AgYXQgbW9zdCBvbmNlXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudHMgLSBldmVudHMgaWRzXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb25lOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnRzLCBmbikge1xuICAgICAgICBmdW5jdGlvbiBvbigpIHtcbiAgICAgICAgICBlbC5vZmYoZXZlbnRzLCBvbilcbiAgICAgICAgICBmbi5hcHBseShlbCwgYXJndW1lbnRzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbC5vbihldmVudHMsIG9uKVxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGFsbCBjYWxsYmFjayBmdW5jdGlvbnMgdGhhdCBsaXN0ZW4gdG9cbiAgICAgKiB0aGUgZ2l2ZW4gc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgYGV2ZW50c2BcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50cyAtIGV2ZW50cyBpZHNcbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgdHJpZ2dlcjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50cykge1xuXG4gICAgICAgIC8vIGdldHRpbmcgdGhlIGFyZ3VtZW50c1xuICAgICAgICB2YXIgYXJnbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgYXJncyA9IG5ldyBBcnJheShhcmdsZW4pLFxuICAgICAgICAgIGZuc1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnbGVuOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXSAvLyBza2lwIGZpcnN0IGFyZ3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICBvbkVhY2hFdmVudChldmVudHMsIGZ1bmN0aW9uKG5hbWUsIHBvcykge1xuXG4gICAgICAgICAgZm5zID0gc2xpY2UuY2FsbChjYWxsYmFja3NbbmFtZV0gfHwgW10sIDApXG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgZm47IGZuID0gZm5zW2ldOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChmbi5idXN5KSBjb250aW51ZVxuICAgICAgICAgICAgZm4uYnVzeSA9IDFcbiAgICAgICAgICAgIGZuLmFwcGx5KGVsLCBmbi50eXBlZCA/IFtuYW1lXS5jb25jYXQoYXJncykgOiBhcmdzKVxuICAgICAgICAgICAgaWYgKGZuc1tpXSAhPT0gZm4pIHsgaS0tIH1cbiAgICAgICAgICAgIGZuLmJ1c3kgPSAwXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNhbGxiYWNrc1snKiddICYmIG5hbWUgIT0gJyonKVxuICAgICAgICAgICAgZWwudHJpZ2dlci5hcHBseShlbCwgWycqJywgbmFtZV0uY29uY2F0KGFyZ3MpKVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBlbFxuXG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuOyhmdW5jdGlvbihyaW90KSB7XG5cbi8qKlxuICogU2ltcGxlIGNsaWVudC1zaWRlIHJvdXRlclxuICogQG1vZHVsZSByaW90LXJvdXRlXG4gKi9cblxuXG52YXIgUkVfT1JJR0lOID0gL14uKz9cXC9cXC8rW15cXC9dKy8sXG4gIEVWRU5UX0xJU1RFTkVSID0gJ0V2ZW50TGlzdGVuZXInLFxuICBSRU1PVkVfRVZFTlRfTElTVEVORVIgPSAncmVtb3ZlJyArIEVWRU5UX0xJU1RFTkVSLFxuICBBRERfRVZFTlRfTElTVEVORVIgPSAnYWRkJyArIEVWRU5UX0xJU1RFTkVSLFxuICBIQVNfQVRUUklCVVRFID0gJ2hhc0F0dHJpYnV0ZScsXG4gIFJFUExBQ0UgPSAncmVwbGFjZScsXG4gIFBPUFNUQVRFID0gJ3BvcHN0YXRlJyxcbiAgSEFTSENIQU5HRSA9ICdoYXNoY2hhbmdlJyxcbiAgVFJJR0dFUiA9ICd0cmlnZ2VyJyxcbiAgTUFYX0VNSVRfU1RBQ0tfTEVWRUwgPSAzLFxuICB3aW4gPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdyxcbiAgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LFxuICBoaXN0ID0gd2luICYmIGhpc3RvcnksXG4gIGxvYyA9IHdpbiAmJiAoaGlzdC5sb2NhdGlvbiB8fCB3aW4ubG9jYXRpb24pLCAvLyBzZWUgaHRtbDUtaGlzdG9yeS1hcGlcbiAgcHJvdCA9IFJvdXRlci5wcm90b3R5cGUsIC8vIHRvIG1pbmlmeSBtb3JlXG4gIGNsaWNrRXZlbnQgPSBkb2MgJiYgZG9jLm9udG91Y2hzdGFydCA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljaycsXG4gIHN0YXJ0ZWQgPSBmYWxzZSxcbiAgY2VudHJhbCA9IHJpb3Qub2JzZXJ2YWJsZSgpLFxuICByb3V0ZUZvdW5kID0gZmFsc2UsXG4gIGRlYm91bmNlZEVtaXQsXG4gIGJhc2UsIGN1cnJlbnQsIHBhcnNlciwgc2Vjb25kUGFyc2VyLCBlbWl0U3RhY2sgPSBbXSwgZW1pdFN0YWNrTGV2ZWwgPSAwXG5cbi8qKlxuICogRGVmYXVsdCBwYXJzZXIuIFlvdSBjYW4gcmVwbGFjZSBpdCB2aWEgcm91dGVyLnBhcnNlciBtZXRob2QuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGN1cnJlbnQgcGF0aCAobm9ybWFsaXplZClcbiAqIEByZXR1cm5zIHthcnJheX0gYXJyYXlcbiAqL1xuZnVuY3Rpb24gREVGQVVMVF9QQVJTRVIocGF0aCkge1xuICByZXR1cm4gcGF0aC5zcGxpdCgvWy8/I10vKVxufVxuXG4vKipcbiAqIERlZmF1bHQgcGFyc2VyIChzZWNvbmQpLiBZb3UgY2FuIHJlcGxhY2UgaXQgdmlhIHJvdXRlci5wYXJzZXIgbWV0aG9kLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBjdXJyZW50IHBhdGggKG5vcm1hbGl6ZWQpXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsdGVyIC0gZmlsdGVyIHN0cmluZyAobm9ybWFsaXplZClcbiAqIEByZXR1cm5zIHthcnJheX0gYXJyYXlcbiAqL1xuZnVuY3Rpb24gREVGQVVMVF9TRUNPTkRfUEFSU0VSKHBhdGgsIGZpbHRlcikge1xuICB2YXIgcmUgPSBuZXcgUmVnRXhwKCdeJyArIGZpbHRlcltSRVBMQUNFXSgvXFwqL2csICcoW14vPyNdKz8pJylbUkVQTEFDRV0oL1xcLlxcLi8sICcuKicpICsgJyQnKSxcbiAgICBhcmdzID0gcGF0aC5tYXRjaChyZSlcblxuICBpZiAoYXJncykgcmV0dXJuIGFyZ3Muc2xpY2UoMSlcbn1cblxuLyoqXG4gKiBTaW1wbGUvY2hlYXAgZGVib3VuY2UgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHtmdW5jdGlvbn0gZm4gLSBjYWxsYmFja1xuICogQHBhcmFtICAge251bWJlcn0gZGVsYXkgLSBkZWxheSBpbiBzZWNvbmRzXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IGRlYm91bmNlZCBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmbiwgZGVsYXkpIHtcbiAgdmFyIHRcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodClcbiAgICB0ID0gc2V0VGltZW91dChmbiwgZGVsYXkpXG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHdpbmRvdyBsaXN0ZW5lcnMgdG8gdHJpZ2dlciB0aGUgcm91dGVzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGF1dG9FeGVjIC0gc2VlIHJvdXRlLnN0YXJ0XG4gKi9cbmZ1bmN0aW9uIHN0YXJ0KGF1dG9FeGVjKSB7XG4gIGRlYm91bmNlZEVtaXQgPSBkZWJvdW5jZShlbWl0LCAxKVxuICB3aW5bQUREX0VWRU5UX0xJU1RFTkVSXShQT1BTVEFURSwgZGVib3VuY2VkRW1pdClcbiAgd2luW0FERF9FVkVOVF9MSVNURU5FUl0oSEFTSENIQU5HRSwgZGVib3VuY2VkRW1pdClcbiAgZG9jW0FERF9FVkVOVF9MSVNURU5FUl0oY2xpY2tFdmVudCwgY2xpY2spXG4gIGlmIChhdXRvRXhlYykgZW1pdCh0cnVlKVxufVxuXG4vKipcbiAqIFJvdXRlciBjbGFzc1xuICovXG5mdW5jdGlvbiBSb3V0ZXIoKSB7XG4gIHRoaXMuJCA9IFtdXG4gIHJpb3Qub2JzZXJ2YWJsZSh0aGlzKSAvLyBtYWtlIGl0IG9ic2VydmFibGVcbiAgY2VudHJhbC5vbignc3RvcCcsIHRoaXMucy5iaW5kKHRoaXMpKVxuICBjZW50cmFsLm9uKCdlbWl0JywgdGhpcy5lLmJpbmQodGhpcykpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoKSB7XG4gIHJldHVybiBwYXRoW1JFUExBQ0VdKC9eXFwvfFxcLyQvLCAnJylcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmcoc3RyKSB7XG4gIHJldHVybiB0eXBlb2Ygc3RyID09ICdzdHJpbmcnXG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXJ0IGFmdGVyIGRvbWFpbiBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gaHJlZiAtIGZ1bGxwYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBwYXRoIGZyb20gcm9vdFxuICovXG5mdW5jdGlvbiBnZXRQYXRoRnJvbVJvb3QoaHJlZikge1xuICByZXR1cm4gKGhyZWYgfHwgbG9jLmhyZWYpW1JFUExBQ0VdKFJFX09SSUdJTiwgJycpXG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXJ0IGFmdGVyIGJhc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmIC0gZnVsbHBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBhdGggZnJvbSBiYXNlXG4gKi9cbmZ1bmN0aW9uIGdldFBhdGhGcm9tQmFzZShocmVmKSB7XG4gIHJldHVybiBiYXNlWzBdID09ICcjJ1xuICAgID8gKGhyZWYgfHwgbG9jLmhyZWYgfHwgJycpLnNwbGl0KGJhc2UpWzFdIHx8ICcnXG4gICAgOiAobG9jID8gZ2V0UGF0aEZyb21Sb290KGhyZWYpIDogaHJlZiB8fCAnJylbUkVQTEFDRV0oYmFzZSwgJycpXG59XG5cbmZ1bmN0aW9uIGVtaXQoZm9yY2UpIHtcbiAgLy8gdGhlIHN0YWNrIGlzIG5lZWRlZCBmb3IgcmVkaXJlY3Rpb25zXG4gIHZhciBpc1Jvb3QgPSBlbWl0U3RhY2tMZXZlbCA9PSAwLCBmaXJzdFxuICBpZiAoTUFYX0VNSVRfU1RBQ0tfTEVWRUwgPD0gZW1pdFN0YWNrTGV2ZWwpIHJldHVyblxuXG4gIGVtaXRTdGFja0xldmVsKytcbiAgZW1pdFN0YWNrLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhdGggPSBnZXRQYXRoRnJvbUJhc2UoKVxuICAgIGlmIChmb3JjZSB8fCBwYXRoICE9IGN1cnJlbnQpIHtcbiAgICAgIGNlbnRyYWxbVFJJR0dFUl0oJ2VtaXQnLCBwYXRoKVxuICAgICAgY3VycmVudCA9IHBhdGhcbiAgICB9XG4gIH0pXG4gIGlmIChpc1Jvb3QpIHtcbiAgICB3aGlsZSAoZmlyc3QgPSBlbWl0U3RhY2suc2hpZnQoKSkgZmlyc3QoKSAvLyBzdGFjayBpbmNyZXNlcyB3aXRoaW4gdGhpcyBjYWxsXG4gICAgZW1pdFN0YWNrTGV2ZWwgPSAwXG4gIH1cbn1cblxuZnVuY3Rpb24gY2xpY2soZSkge1xuICBpZiAoXG4gICAgZS53aGljaCAhPSAxIC8vIG5vdCBsZWZ0IGNsaWNrXG4gICAgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5IC8vIG9yIG1ldGEga2V5c1xuICAgIHx8IGUuZGVmYXVsdFByZXZlbnRlZCAvLyBvciBkZWZhdWx0IHByZXZlbnRlZFxuICApIHJldHVyblxuXG4gIHZhciBlbCA9IGUudGFyZ2V0XG4gIHdoaWxlIChlbCAmJiBlbC5ub2RlTmFtZSAhPSAnQScpIGVsID0gZWwucGFyZW50Tm9kZVxuXG4gIGlmIChcbiAgICAhZWwgfHwgZWwubm9kZU5hbWUgIT0gJ0EnIC8vIG5vdCBBIHRhZ1xuICAgIHx8IGVsW0hBU19BVFRSSUJVVEVdKCdkb3dubG9hZCcpIC8vIGhhcyBkb3dubG9hZCBhdHRyXG4gICAgfHwgIWVsW0hBU19BVFRSSUJVVEVdKCdocmVmJykgLy8gaGFzIG5vIGhyZWYgYXR0clxuICAgIHx8IGVsLnRhcmdldCAmJiBlbC50YXJnZXQgIT0gJ19zZWxmJyAvLyBhbm90aGVyIHdpbmRvdyBvciBmcmFtZVxuICAgIHx8IGVsLmhyZWYuaW5kZXhPZihsb2MuaHJlZi5tYXRjaChSRV9PUklHSU4pWzBdKSA9PSAtMSAvLyBjcm9zcyBvcmlnaW5cbiAgKSByZXR1cm5cblxuICBpZiAoZWwuaHJlZiAhPSBsb2MuaHJlZlxuICAgICYmIChcbiAgICAgIGVsLmhyZWYuc3BsaXQoJyMnKVswXSA9PSBsb2MuaHJlZi5zcGxpdCgnIycpWzBdIC8vIGludGVybmFsIGp1bXBcbiAgICAgIHx8IGJhc2VbMF0gIT0gJyMnICYmIGdldFBhdGhGcm9tUm9vdChlbC5ocmVmKS5pbmRleE9mKGJhc2UpICE9PSAwIC8vIG91dHNpZGUgb2YgYmFzZVxuICAgICAgfHwgYmFzZVswXSA9PSAnIycgJiYgZWwuaHJlZi5zcGxpdChiYXNlKVswXSAhPSBsb2MuaHJlZi5zcGxpdChiYXNlKVswXSAvLyBvdXRzaWRlIG9mICNiYXNlXG4gICAgICB8fCAhZ28oZ2V0UGF0aEZyb21CYXNlKGVsLmhyZWYpLCBlbC50aXRsZSB8fCBkb2MudGl0bGUpIC8vIHJvdXRlIG5vdCBmb3VuZFxuICAgICkpIHJldHVyblxuXG4gIGUucHJldmVudERlZmF1bHQoKVxufVxuXG4vKipcbiAqIEdvIHRvIHRoZSBwYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGRlc3RpbmF0aW9uIHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZSAtIHBhZ2UgdGl0bGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkUmVwbGFjZSAtIHVzZSByZXBsYWNlU3RhdGUgb3IgcHVzaFN0YXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSByb3V0ZSBub3QgZm91bmQgZmxhZ1xuICovXG5mdW5jdGlvbiBnbyhwYXRoLCB0aXRsZSwgc2hvdWxkUmVwbGFjZSkge1xuICAvLyBTZXJ2ZXItc2lkZSB1c2FnZTogZGlyZWN0bHkgZXhlY3V0ZSBoYW5kbGVycyBmb3IgdGhlIHBhdGhcbiAgaWYgKCFoaXN0KSByZXR1cm4gY2VudHJhbFtUUklHR0VSXSgnZW1pdCcsIGdldFBhdGhGcm9tQmFzZShwYXRoKSlcblxuICBwYXRoID0gYmFzZSArIG5vcm1hbGl6ZShwYXRoKVxuICB0aXRsZSA9IHRpdGxlIHx8IGRvYy50aXRsZVxuICAvLyBicm93c2VycyBpZ25vcmVzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIGB0aXRsZWBcbiAgc2hvdWxkUmVwbGFjZVxuICAgID8gaGlzdC5yZXBsYWNlU3RhdGUobnVsbCwgdGl0bGUsIHBhdGgpXG4gICAgOiBoaXN0LnB1c2hTdGF0ZShudWxsLCB0aXRsZSwgcGF0aClcbiAgLy8gc28gd2UgbmVlZCB0byBzZXQgaXQgbWFudWFsbHlcbiAgZG9jLnRpdGxlID0gdGl0bGVcbiAgcm91dGVGb3VuZCA9IGZhbHNlXG4gIGVtaXQoKVxuICByZXR1cm4gcm91dGVGb3VuZFxufVxuXG4vKipcbiAqIEdvIHRvIHBhdGggb3Igc2V0IGFjdGlvblxuICogYSBzaW5nbGUgc3RyaW5nOiAgICAgICAgICAgICAgICBnbyB0aGVyZVxuICogdHdvIHN0cmluZ3M6ICAgICAgICAgICAgICAgICAgICBnbyB0aGVyZSB3aXRoIHNldHRpbmcgYSB0aXRsZVxuICogdHdvIHN0cmluZ3MgYW5kIGJvb2xlYW46ICAgICAgICByZXBsYWNlIGhpc3Rvcnkgd2l0aCBzZXR0aW5nIGEgdGl0bGVcbiAqIGEgc2luZ2xlIGZ1bmN0aW9uOiAgICAgICAgICAgICAgc2V0IGFuIGFjdGlvbiBvbiB0aGUgZGVmYXVsdCByb3V0ZVxuICogYSBzdHJpbmcvUmVnRXhwIGFuZCBhIGZ1bmN0aW9uOiBzZXQgYW4gYWN0aW9uIG9uIHRoZSByb3V0ZVxuICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gZmlyc3QgLSBwYXRoIC8gYWN0aW9uIC8gZmlsdGVyXG4gKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKX0gc2Vjb25kIC0gdGl0bGUgLyBhY3Rpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdGhpcmQgLSByZXBsYWNlIGZsYWdcbiAqL1xucHJvdC5tID0gZnVuY3Rpb24oZmlyc3QsIHNlY29uZCwgdGhpcmQpIHtcbiAgaWYgKGlzU3RyaW5nKGZpcnN0KSAmJiAoIXNlY29uZCB8fCBpc1N0cmluZyhzZWNvbmQpKSkgZ28oZmlyc3QsIHNlY29uZCwgdGhpcmQgfHwgZmFsc2UpXG4gIGVsc2UgaWYgKHNlY29uZCkgdGhpcy5yKGZpcnN0LCBzZWNvbmQpXG4gIGVsc2UgdGhpcy5yKCdAJywgZmlyc3QpXG59XG5cbi8qKlxuICogU3RvcCByb3V0aW5nXG4gKi9cbnByb3QucyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9mZignKicpXG4gIHRoaXMuJCA9IFtdXG59XG5cbi8qKlxuICogRW1pdFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBwYXRoXG4gKi9cbnByb3QuZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdGhpcy4kLmNvbmNhdCgnQCcpLnNvbWUoZnVuY3Rpb24oZmlsdGVyKSB7XG4gICAgdmFyIGFyZ3MgPSAoZmlsdGVyID09ICdAJyA/IHBhcnNlciA6IHNlY29uZFBhcnNlcikobm9ybWFsaXplKHBhdGgpLCBub3JtYWxpemUoZmlsdGVyKSlcbiAgICBpZiAodHlwZW9mIGFyZ3MgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXNbVFJJR0dFUl0uYXBwbHkobnVsbCwgW2ZpbHRlcl0uY29uY2F0KGFyZ3MpKVxuICAgICAgcmV0dXJuIHJvdXRlRm91bmQgPSB0cnVlIC8vIGV4aXQgZnJvbSBsb29wXG4gICAgfVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIFJlZ2lzdGVyIHJvdXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsdGVyIC0gZmlsdGVyIGZvciBtYXRjaGluZyB0byB1cmxcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiAtIGFjdGlvbiB0byByZWdpc3RlclxuICovXG5wcm90LnIgPSBmdW5jdGlvbihmaWx0ZXIsIGFjdGlvbikge1xuICBpZiAoZmlsdGVyICE9ICdAJykge1xuICAgIGZpbHRlciA9ICcvJyArIG5vcm1hbGl6ZShmaWx0ZXIpXG4gICAgdGhpcy4kLnB1c2goZmlsdGVyKVxuICB9XG4gIHRoaXMub24oZmlsdGVyLCBhY3Rpb24pXG59XG5cbnZhciBtYWluUm91dGVyID0gbmV3IFJvdXRlcigpXG52YXIgcm91dGUgPSBtYWluUm91dGVyLm0uYmluZChtYWluUm91dGVyKVxuXG4vKipcbiAqIENyZWF0ZSBhIHN1YiByb3V0ZXJcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gdGhlIG1ldGhvZCBvZiBhIG5ldyBSb3V0ZXIgb2JqZWN0XG4gKi9cbnJvdXRlLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbmV3U3ViUm91dGVyID0gbmV3IFJvdXRlcigpXG4gIC8vIGFzc2lnbiBzdWItcm91dGVyJ3MgbWFpbiBtZXRob2RcbiAgdmFyIHJvdXRlciA9IG5ld1N1YlJvdXRlci5tLmJpbmQobmV3U3ViUm91dGVyKVxuICAvLyBzdG9wIG9ubHkgdGhpcyBzdWItcm91dGVyXG4gIHJvdXRlci5zdG9wID0gbmV3U3ViUm91dGVyLnMuYmluZChuZXdTdWJSb3V0ZXIpXG4gIHJldHVybiByb3V0ZXJcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGJhc2Ugb2YgdXJsXG4gKiBAcGFyYW0geyhzdHJ8UmVnRXhwKX0gYXJnIC0gYSBuZXcgYmFzZSBvciAnIycgb3IgJyMhJ1xuICovXG5yb3V0ZS5iYXNlID0gZnVuY3Rpb24oYXJnKSB7XG4gIGJhc2UgPSBhcmcgfHwgJyMnXG4gIGN1cnJlbnQgPSBnZXRQYXRoRnJvbUJhc2UoKSAvLyByZWNhbGN1bGF0ZSBjdXJyZW50IHBhdGhcbn1cblxuLyoqIEV4ZWMgcm91dGluZyByaWdodCBub3cgKiovXG5yb3V0ZS5leGVjID0gZnVuY3Rpb24oKSB7XG4gIGVtaXQodHJ1ZSlcbn1cblxuLyoqXG4gKiBSZXBsYWNlIHRoZSBkZWZhdWx0IHJvdXRlciB0byB5b3Vyc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gLSB5b3VyIHBhcnNlciBmdW5jdGlvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm4yIC0geW91ciBzZWNvbmRQYXJzZXIgZnVuY3Rpb25cbiAqL1xucm91dGUucGFyc2VyID0gZnVuY3Rpb24oZm4sIGZuMikge1xuICBpZiAoIWZuICYmICFmbjIpIHtcbiAgICAvLyByZXNldCBwYXJzZXIgZm9yIHRlc3RpbmcuLi5cbiAgICBwYXJzZXIgPSBERUZBVUxUX1BBUlNFUlxuICAgIHNlY29uZFBhcnNlciA9IERFRkFVTFRfU0VDT05EX1BBUlNFUlxuICB9XG4gIGlmIChmbikgcGFyc2VyID0gZm5cbiAgaWYgKGZuMikgc2Vjb25kUGFyc2VyID0gZm4yXG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGdldCB1cmwgcXVlcnkgYXMgYW4gb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBwYXJzZWQgcXVlcnlcbiAqL1xucm91dGUucXVlcnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHEgPSB7fVxuICB2YXIgaHJlZiA9IGxvYy5ocmVmIHx8IGN1cnJlbnRcbiAgaHJlZltSRVBMQUNFXSgvWz8mXSguKz8pPShbXiZdKikvZywgZnVuY3Rpb24oXywgaywgdikgeyBxW2tdID0gdiB9KVxuICByZXR1cm4gcVxufVxuXG4vKiogU3RvcCByb3V0aW5nICoqL1xucm91dGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHN0YXJ0ZWQpIHtcbiAgICBpZiAod2luKSB7XG4gICAgICB3aW5bUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXShQT1BTVEFURSwgZGVib3VuY2VkRW1pdClcbiAgICAgIHdpbltSRU1PVkVfRVZFTlRfTElTVEVORVJdKEhBU0hDSEFOR0UsIGRlYm91bmNlZEVtaXQpXG4gICAgICBkb2NbUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXShjbGlja0V2ZW50LCBjbGljaylcbiAgICB9XG4gICAgY2VudHJhbFtUUklHR0VSXSgnc3RvcCcpXG4gICAgc3RhcnRlZCA9IGZhbHNlXG4gIH1cbn1cblxuLyoqXG4gKiBTdGFydCByb3V0aW5nXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGF1dG9FeGVjIC0gYXV0b21hdGljYWxseSBleGVjIGFmdGVyIHN0YXJ0aW5nIGlmIHRydWVcbiAqL1xucm91dGUuc3RhcnQgPSBmdW5jdGlvbiAoYXV0b0V4ZWMpIHtcbiAgaWYgKCFzdGFydGVkKSB7XG4gICAgaWYgKHdpbikge1xuICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgc3RhcnQoYXV0b0V4ZWMpXG4gICAgICAvLyB0aGUgdGltZW91dCBpcyBuZWVkZWQgdG8gc29sdmVcbiAgICAgIC8vIGEgd2VpcmQgc2FmYXJpIGJ1ZyBodHRwczovL2dpdGh1Yi5jb20vcmlvdC9yb3V0ZS9pc3N1ZXMvMzNcbiAgICAgIGVsc2Ugd2luW0FERF9FVkVOVF9MSVNURU5FUl0oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgc3RhcnQoYXV0b0V4ZWMpIH0sIDEpXG4gICAgICB9KVxuICAgIH1cbiAgICBzdGFydGVkID0gdHJ1ZVxuICB9XG59XG5cbi8qKiBQcmVwYXJlIHRoZSByb3V0ZXIgKiovXG5yb3V0ZS5iYXNlKClcbnJvdXRlLnBhcnNlcigpXG5cbnJpb3Qucm91dGUgPSByb3V0ZVxufSkocmlvdClcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cbi8qKlxuICogVGhlIHJpb3QgdGVtcGxhdGUgZW5naW5lXG4gKiBAdmVyc2lvbiB2Mi40LjJcbiAqL1xuLyoqXG4gKiByaW90LnV0aWwuYnJhY2tldHNcbiAqXG4gKiAtIGBicmFja2V0cyAgICBgIC0gUmV0dXJucyBhIHN0cmluZyBvciByZWdleCBiYXNlZCBvbiBpdHMgcGFyYW1ldGVyXG4gKiAtIGBicmFja2V0cy5zZXRgIC0gQ2hhbmdlIHRoZSBjdXJyZW50IHJpb3QgYnJhY2tldHNcbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxudmFyIGJyYWNrZXRzID0gKGZ1bmN0aW9uIChVTkRFRikge1xuXG4gIHZhclxuICAgIFJFR0xPQiA9ICdnJyxcblxuICAgIFJfTUxDT01NUyA9IC9cXC9cXCpbXipdKlxcKisoPzpbXipcXC9dW14qXSpcXCorKSpcXC8vZyxcblxuICAgIFJfU1RSSU5HUyA9IC9cIlteXCJcXFxcXSooPzpcXFxcW1xcU1xcc11bXlwiXFxcXF0qKSpcInwnW14nXFxcXF0qKD86XFxcXFtcXFNcXHNdW14nXFxcXF0qKSonL2csXG5cbiAgICBTX1FCTE9DS1MgPSBSX1NUUklOR1Muc291cmNlICsgJ3wnICtcbiAgICAgIC8oPzpcXGJyZXR1cm5cXHMrfCg/OlskXFx3XFwpXFxdXXxcXCtcXCt8LS0pXFxzKihcXC8pKD8hWypcXC9dKSkvLnNvdXJjZSArICd8JyArXG4gICAgICAvXFwvKD89W14qXFwvXSlbXltcXC9cXFxcXSooPzooPzpcXFsoPzpcXFxcLnxbXlxcXVxcXFxdKikqXFxdfFxcXFwuKVteW1xcL1xcXFxdKikqPyhcXC8pW2dpbV0qLy5zb3VyY2UsXG5cbiAgICBVTlNVUFBPUlRFRCA9IFJlZ0V4cCgnW1xcXFwnICsgJ3gwMC1cXFxceDFGPD5hLXpBLVowLTlcXCdcIiw7XFxcXFxcXFxdJyksXG5cbiAgICBORUVEX0VTQ0FQRSA9IC8oPz1bW1xcXSgpKis/Ll4kfF0pL2csXG5cbiAgICBGSU5EQlJBQ0VTID0ge1xuICAgICAgJygnOiBSZWdFeHAoJyhbKCldKXwnICAgKyBTX1FCTE9DS1MsIFJFR0xPQiksXG4gICAgICAnWyc6IFJlZ0V4cCgnKFtbXFxcXF1dKXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpLFxuICAgICAgJ3snOiBSZWdFeHAoJyhbe31dKXwnICAgKyBTX1FCTE9DS1MsIFJFR0xPQilcbiAgICB9LFxuXG4gICAgREVGQVVMVCA9ICd7IH0nXG5cbiAgdmFyIF9wYWlycyA9IFtcbiAgICAneycsICd9JyxcbiAgICAneycsICd9JyxcbiAgICAve1tefV0qfS8sXG4gICAgL1xcXFwoW3t9XSkvZyxcbiAgICAvXFxcXCh7KXx7L2csXG4gICAgUmVnRXhwKCdcXFxcXFxcXCh9KXwoW1soe10pfCh9KXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpLFxuICAgIERFRkFVTFQsXG4gICAgL15cXHMqe1xcXj9cXHMqKFskXFx3XSspKD86XFxzKixcXHMqKFxcUyspKT9cXHMraW5cXHMrKFxcUy4qKVxccyp9LyxcbiAgICAvKF58W15cXFxcXSl7PVtcXFNcXHNdKj99L1xuICBdXG5cbiAgdmFyXG4gICAgY2FjaGVkQnJhY2tldHMgPSBVTkRFRixcbiAgICBfcmVnZXgsXG4gICAgX2NhY2hlID0gW10sXG4gICAgX3NldHRpbmdzXG5cbiAgZnVuY3Rpb24gX2xvb3BiYWNrIChyZSkgeyByZXR1cm4gcmUgfVxuXG4gIGZ1bmN0aW9uIF9yZXdyaXRlIChyZSwgYnApIHtcbiAgICBpZiAoIWJwKSBicCA9IF9jYWNoZVxuICAgIHJldHVybiBuZXcgUmVnRXhwKFxuICAgICAgcmUuc291cmNlLnJlcGxhY2UoL3svZywgYnBbMl0pLnJlcGxhY2UoL30vZywgYnBbM10pLCByZS5nbG9iYWwgPyBSRUdMT0IgOiAnJ1xuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGUgKHBhaXIpIHtcbiAgICBpZiAocGFpciA9PT0gREVGQVVMVCkgcmV0dXJuIF9wYWlyc1xuXG4gICAgdmFyIGFyciA9IHBhaXIuc3BsaXQoJyAnKVxuXG4gICAgaWYgKGFyci5sZW5ndGggIT09IDIgfHwgVU5TVVBQT1JURUQudGVzdChwYWlyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBicmFja2V0cyBcIicgKyBwYWlyICsgJ1wiJylcbiAgICB9XG4gICAgYXJyID0gYXJyLmNvbmNhdChwYWlyLnJlcGxhY2UoTkVFRF9FU0NBUEUsICdcXFxcJykuc3BsaXQoJyAnKSlcblxuICAgIGFycls0XSA9IF9yZXdyaXRlKGFyclsxXS5sZW5ndGggPiAxID8gL3tbXFxTXFxzXSo/fS8gOiBfcGFpcnNbNF0sIGFycilcbiAgICBhcnJbNV0gPSBfcmV3cml0ZShwYWlyLmxlbmd0aCA+IDMgPyAvXFxcXCh7fH0pL2cgOiBfcGFpcnNbNV0sIGFycilcbiAgICBhcnJbNl0gPSBfcmV3cml0ZShfcGFpcnNbNl0sIGFycilcbiAgICBhcnJbN10gPSBSZWdFeHAoJ1xcXFxcXFxcKCcgKyBhcnJbM10gKyAnKXwoW1soe10pfCgnICsgYXJyWzNdICsgJyl8JyArIFNfUUJMT0NLUywgUkVHTE9CKVxuICAgIGFycls4XSA9IHBhaXJcbiAgICByZXR1cm4gYXJyXG4gIH1cblxuICBmdW5jdGlvbiBfYnJhY2tldHMgKHJlT3JJZHgpIHtcbiAgICByZXR1cm4gcmVPcklkeCBpbnN0YW5jZW9mIFJlZ0V4cCA/IF9yZWdleChyZU9ySWR4KSA6IF9jYWNoZVtyZU9ySWR4XVxuICB9XG5cbiAgX2JyYWNrZXRzLnNwbGl0ID0gZnVuY3Rpb24gc3BsaXQgKHN0ciwgdG1wbCwgX2JwKSB7XG4gICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHQ6IF9icCBpcyBmb3IgdGhlIGNvbXBpbGVyXG4gICAgaWYgKCFfYnApIF9icCA9IF9jYWNoZVxuXG4gICAgdmFyXG4gICAgICBwYXJ0cyA9IFtdLFxuICAgICAgbWF0Y2gsXG4gICAgICBpc2V4cHIsXG4gICAgICBzdGFydCxcbiAgICAgIHBvcyxcbiAgICAgIHJlID0gX2JwWzZdXG5cbiAgICBpc2V4cHIgPSBzdGFydCA9IHJlLmxhc3RJbmRleCA9IDBcblxuICAgIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKHN0cikpKSB7XG5cbiAgICAgIHBvcyA9IG1hdGNoLmluZGV4XG5cbiAgICAgIGlmIChpc2V4cHIpIHtcblxuICAgICAgICBpZiAobWF0Y2hbMl0pIHtcbiAgICAgICAgICByZS5sYXN0SW5kZXggPSBza2lwQnJhY2VzKHN0ciwgbWF0Y2hbMl0sIHJlLmxhc3RJbmRleClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWF0Y2hbM10pIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghbWF0Y2hbMV0pIHtcbiAgICAgICAgdW5lc2NhcGVTdHIoc3RyLnNsaWNlKHN0YXJ0LCBwb3MpKVxuICAgICAgICBzdGFydCA9IHJlLmxhc3RJbmRleFxuICAgICAgICByZSA9IF9icFs2ICsgKGlzZXhwciBePSAxKV1cbiAgICAgICAgcmUubGFzdEluZGV4ID0gc3RhcnRcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RyICYmIHN0YXJ0IDwgc3RyLmxlbmd0aCkge1xuICAgICAgdW5lc2NhcGVTdHIoc3RyLnNsaWNlKHN0YXJ0KSlcbiAgICB9XG5cbiAgICByZXR1cm4gcGFydHNcblxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlU3RyIChzKSB7XG4gICAgICBpZiAodG1wbCB8fCBpc2V4cHIpIHtcbiAgICAgICAgcGFydHMucHVzaChzICYmIHMucmVwbGFjZShfYnBbNV0sICckMScpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydHMucHVzaChzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNraXBCcmFjZXMgKHMsIGNoLCBpeCkge1xuICAgICAgdmFyXG4gICAgICAgIG1hdGNoLFxuICAgICAgICByZWNjaCA9IEZJTkRCUkFDRVNbY2hdXG5cbiAgICAgIHJlY2NoLmxhc3RJbmRleCA9IGl4XG4gICAgICBpeCA9IDFcbiAgICAgIHdoaWxlICgobWF0Y2ggPSByZWNjaC5leGVjKHMpKSkge1xuICAgICAgICBpZiAobWF0Y2hbMV0gJiZcbiAgICAgICAgICAhKG1hdGNoWzFdID09PSBjaCA/ICsraXggOiAtLWl4KSkgYnJlYWtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpeCA/IHMubGVuZ3RoIDogcmVjY2gubGFzdEluZGV4XG4gICAgfVxuICB9XG5cbiAgX2JyYWNrZXRzLmhhc0V4cHIgPSBmdW5jdGlvbiBoYXNFeHByIChzdHIpIHtcbiAgICByZXR1cm4gX2NhY2hlWzRdLnRlc3Qoc3RyKVxuICB9XG5cbiAgX2JyYWNrZXRzLmxvb3BLZXlzID0gZnVuY3Rpb24gbG9vcEtleXMgKGV4cHIpIHtcbiAgICB2YXIgbSA9IGV4cHIubWF0Y2goX2NhY2hlWzldKVxuXG4gICAgcmV0dXJuIG1cbiAgICAgID8geyBrZXk6IG1bMV0sIHBvczogbVsyXSwgdmFsOiBfY2FjaGVbMF0gKyBtWzNdLnRyaW0oKSArIF9jYWNoZVsxXSB9XG4gICAgICA6IHsgdmFsOiBleHByLnRyaW0oKSB9XG4gIH1cblxuICBfYnJhY2tldHMuYXJyYXkgPSBmdW5jdGlvbiBhcnJheSAocGFpcikge1xuICAgIHJldHVybiBwYWlyID8gX2NyZWF0ZShwYWlyKSA6IF9jYWNoZVxuICB9XG5cbiAgZnVuY3Rpb24gX3Jlc2V0IChwYWlyKSB7XG4gICAgaWYgKChwYWlyIHx8IChwYWlyID0gREVGQVVMVCkpICE9PSBfY2FjaGVbOF0pIHtcbiAgICAgIF9jYWNoZSA9IF9jcmVhdGUocGFpcilcbiAgICAgIF9yZWdleCA9IHBhaXIgPT09IERFRkFVTFQgPyBfbG9vcGJhY2sgOiBfcmV3cml0ZVxuICAgICAgX2NhY2hlWzldID0gX3JlZ2V4KF9wYWlyc1s5XSlcbiAgICB9XG4gICAgY2FjaGVkQnJhY2tldHMgPSBwYWlyXG4gIH1cblxuICBmdW5jdGlvbiBfc2V0U2V0dGluZ3MgKG8pIHtcbiAgICB2YXIgYlxuXG4gICAgbyA9IG8gfHwge31cbiAgICBiID0gby5icmFja2V0c1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCAnYnJhY2tldHMnLCB7XG4gICAgICBzZXQ6IF9yZXNldCxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FjaGVkQnJhY2tldHMgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KVxuICAgIF9zZXR0aW5ncyA9IG9cbiAgICBfcmVzZXQoYilcbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYnJhY2tldHMsICdzZXR0aW5ncycsIHtcbiAgICBzZXQ6IF9zZXRTZXR0aW5ncyxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9zZXR0aW5ncyB9XG4gIH0pXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IGluIHRoZSBicm93c2VyIHJpb3QgaXMgYWx3YXlzIGluIHRoZSBzY29wZSAqL1xuICBfYnJhY2tldHMuc2V0dGluZ3MgPSB0eXBlb2YgcmlvdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcmlvdC5zZXR0aW5ncyB8fCB7fVxuICBfYnJhY2tldHMuc2V0ID0gX3Jlc2V0XG5cbiAgX2JyYWNrZXRzLlJfU1RSSU5HUyA9IFJfU1RSSU5HU1xuICBfYnJhY2tldHMuUl9NTENPTU1TID0gUl9NTENPTU1TXG4gIF9icmFja2V0cy5TX1FCTE9DS1MgPSBTX1FCTE9DS1NcblxuICByZXR1cm4gX2JyYWNrZXRzXG5cbn0pKClcblxuLyoqXG4gKiBAbW9kdWxlIHRtcGxcbiAqXG4gKiB0bXBsICAgICAgICAgIC0gUm9vdCBmdW5jdGlvbiwgcmV0dXJucyB0aGUgdGVtcGxhdGUgdmFsdWUsIHJlbmRlciB3aXRoIGRhdGFcbiAqIHRtcGwuaGFzRXhwciAgLSBUZXN0IHRoZSBleGlzdGVuY2Ugb2YgYSBleHByZXNzaW9uIGluc2lkZSBhIHN0cmluZ1xuICogdG1wbC5sb29wS2V5cyAtIEdldCB0aGUga2V5cyBmb3IgYW4gJ2VhY2gnIGxvb3AgKHVzZWQgYnkgYF9lYWNoYClcbiAqL1xuXG52YXIgdG1wbCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIF9jYWNoZSA9IHt9XG5cbiAgZnVuY3Rpb24gX3RtcGwgKHN0ciwgZGF0YSkge1xuICAgIGlmICghc3RyKSByZXR1cm4gc3RyXG5cbiAgICByZXR1cm4gKF9jYWNoZVtzdHJdIHx8IChfY2FjaGVbc3RyXSA9IF9jcmVhdGUoc3RyKSkpLmNhbGwoZGF0YSwgX2xvZ0VycilcbiAgfVxuXG4gIF90bXBsLmhhdmVSYXcgPSBicmFja2V0cy5oYXNSYXdcblxuICBfdG1wbC5oYXNFeHByID0gYnJhY2tldHMuaGFzRXhwclxuXG4gIF90bXBsLmxvb3BLZXlzID0gYnJhY2tldHMubG9vcEtleXNcblxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICBfdG1wbC5jbGVhckNhY2hlID0gZnVuY3Rpb24gKCkgeyBfY2FjaGUgPSB7fSB9XG5cbiAgX3RtcGwuZXJyb3JIYW5kbGVyID0gbnVsbFxuXG4gIGZ1bmN0aW9uIF9sb2dFcnIgKGVyciwgY3R4KSB7XG5cbiAgICBpZiAoX3RtcGwuZXJyb3JIYW5kbGVyKSB7XG5cbiAgICAgIGVyci5yaW90RGF0YSA9IHtcbiAgICAgICAgdGFnTmFtZTogY3R4ICYmIGN0eC5yb290ICYmIGN0eC5yb290LnRhZ05hbWUsXG4gICAgICAgIF9yaW90X2lkOiBjdHggJiYgY3R4Ll9yaW90X2lkICAvL2VzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gICAgICB9XG4gICAgICBfdG1wbC5lcnJvckhhbmRsZXIoZXJyKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGUgKHN0cikge1xuICAgIHZhciBleHByID0gX2dldFRtcGwoc3RyKVxuXG4gICAgaWYgKGV4cHIuc2xpY2UoMCwgMTEpICE9PSAndHJ5e3JldHVybiAnKSBleHByID0gJ3JldHVybiAnICsgZXhwclxuXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbignRScsIGV4cHIgKyAnOycpICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LWZ1bmNcbiAgfVxuXG4gIHZhclxuICAgIENIX0lERVhQUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHgyMDU3KSxcbiAgICBSRV9DU05BTUUgPSAvXig/OigtP1tfQS1aYS16XFx4QTAtXFx4RkZdWy1cXHdcXHhBMC1cXHhGRl0qKXxcXHUyMDU3KFxcZCspfik6LyxcbiAgICBSRV9RQkxPQ0sgPSBSZWdFeHAoYnJhY2tldHMuU19RQkxPQ0tTLCAnZycpLFxuICAgIFJFX0RRVU9URSA9IC9cXHUyMDU3L2csXG4gICAgUkVfUUJNQVJLID0gL1xcdTIwNTcoXFxkKyl+L2dcblxuICBmdW5jdGlvbiBfZ2V0VG1wbCAoc3RyKSB7XG4gICAgdmFyXG4gICAgICBxc3RyID0gW10sXG4gICAgICBleHByLFxuICAgICAgcGFydHMgPSBicmFja2V0cy5zcGxpdChzdHIucmVwbGFjZShSRV9EUVVPVEUsICdcIicpLCAxKVxuXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDIgfHwgcGFydHNbMF0pIHtcbiAgICAgIHZhciBpLCBqLCBsaXN0ID0gW11cblxuICAgICAgZm9yIChpID0gaiA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGV4cHIgPSBwYXJ0c1tpXVxuXG4gICAgICAgIGlmIChleHByICYmIChleHByID0gaSAmIDFcblxuICAgICAgICAgICAgPyBfcGFyc2VFeHByKGV4cHIsIDEsIHFzdHIpXG5cbiAgICAgICAgICAgIDogJ1wiJyArIGV4cHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHJcXG4/fFxcbi9nLCAnXFxcXG4nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgK1xuICAgICAgICAgICAgICAnXCInXG5cbiAgICAgICAgICApKSBsaXN0W2orK10gPSBleHByXG5cbiAgICAgIH1cblxuICAgICAgZXhwciA9IGogPCAyID8gbGlzdFswXVxuICAgICAgICAgICA6ICdbJyArIGxpc3Quam9pbignLCcpICsgJ10uam9pbihcIlwiKSdcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGV4cHIgPSBfcGFyc2VFeHByKHBhcnRzWzFdLCAwLCBxc3RyKVxuICAgIH1cblxuICAgIGlmIChxc3RyWzBdKSB7XG4gICAgICBleHByID0gZXhwci5yZXBsYWNlKFJFX1FCTUFSSywgZnVuY3Rpb24gKF8sIHBvcykge1xuICAgICAgICByZXR1cm4gcXN0cltwb3NdXG4gICAgICAgICAgLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJylcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBleHByXG4gIH1cblxuICB2YXJcbiAgICBSRV9CUkVORCA9IHtcbiAgICAgICcoJzogL1soKV0vZyxcbiAgICAgICdbJzogL1tbXFxdXS9nLFxuICAgICAgJ3snOiAvW3t9XS9nXG4gICAgfVxuXG4gIGZ1bmN0aW9uIF9wYXJzZUV4cHIgKGV4cHIsIGFzVGV4dCwgcXN0cikge1xuXG4gICAgZXhwciA9IGV4cHJcbiAgICAgICAgICAucmVwbGFjZShSRV9RQkxPQ0ssIGZ1bmN0aW9uIChzLCBkaXYpIHtcbiAgICAgICAgICAgIHJldHVybiBzLmxlbmd0aCA+IDIgJiYgIWRpdiA/IENIX0lERVhQUiArIChxc3RyLnB1c2gocykgLSAxKSArICd+JyA6IHNcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpXG4gICAgICAgICAgLnJlcGxhY2UoL1xcID8oW1tcXCh7fSw/XFwuOl0pXFwgPy9nLCAnJDEnKVxuXG4gICAgaWYgKGV4cHIpIHtcbiAgICAgIHZhclxuICAgICAgICBsaXN0ID0gW10sXG4gICAgICAgIGNudCA9IDAsXG4gICAgICAgIG1hdGNoXG5cbiAgICAgIHdoaWxlIChleHByICYmXG4gICAgICAgICAgICAobWF0Y2ggPSBleHByLm1hdGNoKFJFX0NTTkFNRSkpICYmXG4gICAgICAgICAgICAhbWF0Y2guaW5kZXhcbiAgICAgICAgKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBqc2IsXG4gICAgICAgICAgcmUgPSAvLHwoW1t7KF0pfCQvZ1xuXG4gICAgICAgIGV4cHIgPSBSZWdFeHAucmlnaHRDb250ZXh0XG4gICAgICAgIGtleSAgPSBtYXRjaFsyXSA/IHFzdHJbbWF0Y2hbMl1dLnNsaWNlKDEsIC0xKS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnICcpIDogbWF0Y2hbMV1cblxuICAgICAgICB3aGlsZSAoanNiID0gKG1hdGNoID0gcmUuZXhlYyhleHByKSlbMV0pIHNraXBCcmFjZXMoanNiLCByZSlcblxuICAgICAgICBqc2IgID0gZXhwci5zbGljZSgwLCBtYXRjaC5pbmRleClcbiAgICAgICAgZXhwciA9IFJlZ0V4cC5yaWdodENvbnRleHRcblxuICAgICAgICBsaXN0W2NudCsrXSA9IF93cmFwRXhwcihqc2IsIDEsIGtleSlcbiAgICAgIH1cblxuICAgICAgZXhwciA9ICFjbnQgPyBfd3JhcEV4cHIoZXhwciwgYXNUZXh0KVxuICAgICAgICAgICA6IGNudCA+IDEgPyAnWycgKyBsaXN0LmpvaW4oJywnKSArICddLmpvaW4oXCIgXCIpLnRyaW0oKScgOiBsaXN0WzBdXG4gICAgfVxuICAgIHJldHVybiBleHByXG5cbiAgICBmdW5jdGlvbiBza2lwQnJhY2VzIChjaCwgcmUpIHtcbiAgICAgIHZhclxuICAgICAgICBtbSxcbiAgICAgICAgbHYgPSAxLFxuICAgICAgICBpciA9IFJFX0JSRU5EW2NoXVxuXG4gICAgICBpci5sYXN0SW5kZXggPSByZS5sYXN0SW5kZXhcbiAgICAgIHdoaWxlIChtbSA9IGlyLmV4ZWMoZXhwcikpIHtcbiAgICAgICAgaWYgKG1tWzBdID09PSBjaCkgKytsdlxuICAgICAgICBlbHNlIGlmICghLS1sdikgYnJlYWtcbiAgICAgIH1cbiAgICAgIHJlLmxhc3RJbmRleCA9IGx2ID8gZXhwci5sZW5ndGggOiBpci5sYXN0SW5kZXhcbiAgICB9XG4gIH1cblxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogbm90IGJvdGhcbiAgdmFyIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgSlNfQ09OVEVYVCA9ICdcImluIHRoaXM/dGhpczonICsgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnID8gJ2dsb2JhbCcgOiAnd2luZG93JykgKyAnKS4nLFxuICAgIEpTX1ZBUk5BTUUgPSAvWyx7XVtcXCRcXHddKyg/PTopfCheICp8W14kXFx3XFwue10pKD8hKD86dHlwZW9mfHRydWV8ZmFsc2V8bnVsbHx1bmRlZmluZWR8aW58aW5zdGFuY2VvZnxpcyg/OkZpbml0ZXxOYU4pfHZvaWR8TmFOfG5ld3xEYXRlfFJlZ0V4cHxNYXRoKSg/IVskXFx3XSkpKFskX0EtWmEtel1bJFxcd10qKS9nLFxuICAgIEpTX05PUFJPUFMgPSAvXig/PShcXC5bJFxcd10rKSlcXDEoPzpbXi5bKF18JCkvXG5cbiAgZnVuY3Rpb24gX3dyYXBFeHByIChleHByLCBhc1RleHQsIGtleSkge1xuICAgIHZhciB0YlxuXG4gICAgZXhwciA9IGV4cHIucmVwbGFjZShKU19WQVJOQU1FLCBmdW5jdGlvbiAobWF0Y2gsIHAsIG12YXIsIHBvcywgcykge1xuICAgICAgaWYgKG12YXIpIHtcbiAgICAgICAgcG9zID0gdGIgPyAwIDogcG9zICsgbWF0Y2gubGVuZ3RoXG5cbiAgICAgICAgaWYgKG12YXIgIT09ICd0aGlzJyAmJiBtdmFyICE9PSAnZ2xvYmFsJyAmJiBtdmFyICE9PSAnd2luZG93Jykge1xuICAgICAgICAgIG1hdGNoID0gcCArICcoXCInICsgbXZhciArIEpTX0NPTlRFWFQgKyBtdmFyXG4gICAgICAgICAgaWYgKHBvcykgdGIgPSAocyA9IHNbcG9zXSkgPT09ICcuJyB8fCBzID09PSAnKCcgfHwgcyA9PT0gJ1snXG4gICAgICAgIH0gZWxzZSBpZiAocG9zKSB7XG4gICAgICAgICAgdGIgPSAhSlNfTk9QUk9QUy50ZXN0KHMuc2xpY2UocG9zKSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoXG4gICAgfSlcblxuICAgIGlmICh0Yikge1xuICAgICAgZXhwciA9ICd0cnl7cmV0dXJuICcgKyBleHByICsgJ31jYXRjaChlKXtFKGUsdGhpcyl9J1xuICAgIH1cblxuICAgIGlmIChrZXkpIHtcblxuICAgICAgZXhwciA9ICh0YlxuICAgICAgICAgID8gJ2Z1bmN0aW9uKCl7JyArIGV4cHIgKyAnfS5jYWxsKHRoaXMpJyA6ICcoJyArIGV4cHIgKyAnKSdcbiAgICAgICAgKSArICc/XCInICsga2V5ICsgJ1wiOlwiXCInXG5cbiAgICB9IGVsc2UgaWYgKGFzVGV4dCkge1xuXG4gICAgICBleHByID0gJ2Z1bmN0aW9uKHYpeycgKyAodGJcbiAgICAgICAgICA/IGV4cHIucmVwbGFjZSgncmV0dXJuICcsICd2PScpIDogJ3Y9KCcgKyBleHByICsgJyknXG4gICAgICAgICkgKyAnO3JldHVybiB2fHx2PT09MD92OlwiXCJ9LmNhbGwodGhpcyknXG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cHJcbiAgfVxuXG4gIF90bXBsLnZlcnNpb24gPSBicmFja2V0cy52ZXJzaW9uID0gJ3YyLjQuMidcblxuICByZXR1cm4gX3RtcGxcblxufSkoKVxuXG4vKlxuICBsaWIvYnJvd3Nlci90YWcvbWtkb20uanNcblxuICBJbmNsdWRlcyBoYWNrcyBuZWVkZWQgZm9yIHRoZSBJbnRlcm5ldCBFeHBsb3JlciB2ZXJzaW9uIDkgYW5kIGJlbG93XG4gIFNlZTogaHR0cDovL2thbmdheC5naXRodWIuaW8vY29tcGF0LXRhYmxlL2VzNS8jaWU4XG4gICAgICAgaHR0cDovL2NvZGVwbGFuZXQuaW8vZHJvcHBpbmctaWU4L1xuKi9cbnZhciBta2RvbSA9IChmdW5jdGlvbiBfbWtkb20oKSB7XG4gIHZhclxuICAgIHJlSGFzWWllbGQgID0gLzx5aWVsZFxcYi9pLFxuICAgIHJlWWllbGRBbGwgID0gLzx5aWVsZFxccyooPzpcXC8+fD4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPnw+KS9pZyxcbiAgICByZVlpZWxkU3JjICA9IC88eWllbGRcXHMrdG89WydcIl0oW14nXCI+XSopWydcIl1cXHMqPihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+L2lnLFxuICAgIHJlWWllbGREZXN0ID0gLzx5aWVsZFxccytmcm9tPVsnXCJdPyhbLVxcd10rKVsnXCJdP1xccyooPzpcXC8+fD4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPikvaWdcbiAgdmFyXG4gICAgcm9vdEVscyA9IHsgdHI6ICd0Ym9keScsIHRoOiAndHInLCB0ZDogJ3RyJywgY29sOiAnY29sZ3JvdXAnIH0sXG4gICAgdGJsVGFncyA9IElFX1ZFUlNJT04gJiYgSUVfVkVSU0lPTiA8IDEwXG4gICAgICA/IFNQRUNJQUxfVEFHU19SRUdFWCA6IC9eKD86dCg/OmJvZHl8aGVhZHxmb290fFtyaGRdKXxjYXB0aW9ufGNvbCg/Omdyb3VwKT8pJC9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIERPTSBlbGVtZW50IHRvIHdyYXAgdGhlIGdpdmVuIGNvbnRlbnQuIE5vcm1hbGx5IGFuIGBESVZgLCBidXQgY2FuIGJlXG4gICAqIGFsc28gYSBgVEFCTEVgLCBgU0VMRUNUYCwgYFRCT0RZYCwgYFRSYCwgb3IgYENPTEdST1VQYCBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IHRlbXBsICAtIFRoZSB0ZW1wbGF0ZSBjb21pbmcgZnJvbSB0aGUgY3VzdG9tIHRhZyBkZWZpbml0aW9uXG4gICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gW2h0bWxdIC0gSFRNTCBjb250ZW50IHRoYXQgY29tZXMgZnJvbSB0aGUgRE9NIGVsZW1lbnQgd2hlcmUgeW91XG4gICAqICAgICAgICAgICB3aWxsIG1vdW50IHRoZSB0YWcsIG1vc3RseSB0aGUgb3JpZ2luYWwgdGFnIGluIHRoZSBwYWdlXG4gICAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGNoZWNrU3ZnIC0gZmxhZyBuZWVkZWQgdG8ga25vdyBpZiB3ZSBuZWVkIHRvIGZvcmNlIHRoZSBzdmcgcmVuZGVyaW5nIGluIGNhc2Ugb2YgbG9vcCBub2Rlc1xuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IERPTSBlbGVtZW50IHdpdGggX3RlbXBsXyBtZXJnZWQgdGhyb3VnaCBgWUlFTERgIHdpdGggdGhlIF9odG1sXy5cbiAgICovXG4gIGZ1bmN0aW9uIF9ta2RvbSh0ZW1wbCwgaHRtbCwgY2hlY2tTdmcpIHtcbiAgICB2YXJcbiAgICAgIG1hdGNoICAgPSB0ZW1wbCAmJiB0ZW1wbC5tYXRjaCgvXlxccyo8KFstXFx3XSspLyksXG4gICAgICB0YWdOYW1lID0gbWF0Y2ggJiYgbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSxcbiAgICAgIGVsID0gbWtFbCgnZGl2JywgY2hlY2tTdmcgJiYgaXNTVkdUYWcodGFnTmFtZSkpXG5cbiAgICAvLyByZXBsYWNlIGFsbCB0aGUgeWllbGQgdGFncyB3aXRoIHRoZSB0YWcgaW5uZXIgaHRtbFxuICAgIHRlbXBsID0gcmVwbGFjZVlpZWxkKHRlbXBsLCBodG1sKVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAodGJsVGFncy50ZXN0KHRhZ05hbWUpKVxuICAgICAgZWwgPSBzcGVjaWFsVGFncyhlbCwgdGVtcGwsIHRhZ05hbWUpXG4gICAgZWxzZVxuICAgICAgc2V0SW5uZXJIVE1MKGVsLCB0ZW1wbClcblxuICAgIGVsLnN0dWIgPSB0cnVlXG5cbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qXG4gICAgQ3JlYXRlcyB0aGUgcm9vdCBlbGVtZW50IGZvciB0YWJsZSBvciBzZWxlY3QgY2hpbGQgZWxlbWVudHM6XG4gICAgdHIvdGgvdGQvdGhlYWQvdGZvb3QvdGJvZHkvY2FwdGlvbi9jb2wvY29sZ3JvdXAvb3B0aW9uL29wdGdyb3VwXG4gICovXG4gIGZ1bmN0aW9uIHNwZWNpYWxUYWdzKGVsLCB0ZW1wbCwgdGFnTmFtZSkge1xuICAgIHZhclxuICAgICAgc2VsZWN0ID0gdGFnTmFtZVswXSA9PT0gJ28nLFxuICAgICAgcGFyZW50ID0gc2VsZWN0ID8gJ3NlbGVjdD4nIDogJ3RhYmxlPidcblxuICAgIC8vIHRyaW0oKSBpcyBpbXBvcnRhbnQgaGVyZSwgdGhpcyBlbnN1cmVzIHdlIGRvbid0IGhhdmUgYXJ0aWZhY3RzLFxuICAgIC8vIHNvIHdlIGNhbiBjaGVjayBpZiB3ZSBoYXZlIG9ubHkgb25lIGVsZW1lbnQgaW5zaWRlIHRoZSBwYXJlbnRcbiAgICBlbC5pbm5lckhUTUwgPSAnPCcgKyBwYXJlbnQgKyB0ZW1wbC50cmltKCkgKyAnPC8nICsgcGFyZW50XG4gICAgcGFyZW50ID0gZWwuZmlyc3RDaGlsZFxuXG4gICAgLy8gcmV0dXJucyB0aGUgaW1tZWRpYXRlIHBhcmVudCBpZiB0ci90aC90ZC9jb2wgaXMgdGhlIG9ubHkgZWxlbWVudCwgaWYgbm90XG4gICAgLy8gcmV0dXJucyB0aGUgd2hvbGUgdHJlZSwgYXMgdGhpcyBjYW4gaW5jbHVkZSBhZGRpdGlvbmFsIGVsZW1lbnRzXG4gICAgaWYgKHNlbGVjdCkge1xuICAgICAgcGFyZW50LnNlbGVjdGVkSW5kZXggPSAtMSAgLy8gZm9yIElFOSwgY29tcGF0aWJsZSB3L2N1cnJlbnQgcmlvdCBiZWhhdmlvclxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdm9pZHMgaW5zZXJ0aW9uIG9mIGNvaW50YWluZXIgaW5zaWRlIGNvbnRhaW5lciAoZXg6IHRib2R5IGluc2lkZSB0Ym9keSlcbiAgICAgIHZhciB0bmFtZSA9IHJvb3RFbHNbdGFnTmFtZV1cbiAgICAgIGlmICh0bmFtZSAmJiBwYXJlbnQuY2hpbGRFbGVtZW50Q291bnQgPT09IDEpIHBhcmVudCA9ICQodG5hbWUsIHBhcmVudClcbiAgICB9XG4gICAgcmV0dXJuIHBhcmVudFxuICB9XG5cbiAgLypcbiAgICBSZXBsYWNlIHRoZSB5aWVsZCB0YWcgZnJvbSBhbnkgdGFnIHRlbXBsYXRlIHdpdGggdGhlIGlubmVySFRNTCBvZiB0aGVcbiAgICBvcmlnaW5hbCB0YWcgaW4gdGhlIHBhZ2VcbiAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVlpZWxkKHRlbXBsLCBodG1sKSB7XG4gICAgLy8gZG8gbm90aGluZyBpZiBubyB5aWVsZFxuICAgIGlmICghcmVIYXNZaWVsZC50ZXN0KHRlbXBsKSkgcmV0dXJuIHRlbXBsXG5cbiAgICAvLyBiZSBjYXJlZnVsIHdpdGggIzEzNDMgLSBzdHJpbmcgb24gdGhlIHNvdXJjZSBoYXZpbmcgYCQxYFxuICAgIHZhciBzcmMgPSB7fVxuXG4gICAgaHRtbCA9IGh0bWwgJiYgaHRtbC5yZXBsYWNlKHJlWWllbGRTcmMsIGZ1bmN0aW9uIChfLCByZWYsIHRleHQpIHtcbiAgICAgIHNyY1tyZWZdID0gc3JjW3JlZl0gfHwgdGV4dCAgIC8vIHByZXNlcnZlIGZpcnN0IGRlZmluaXRpb25cbiAgICAgIHJldHVybiAnJ1xuICAgIH0pLnRyaW0oKVxuXG4gICAgcmV0dXJuIHRlbXBsXG4gICAgICAucmVwbGFjZShyZVlpZWxkRGVzdCwgZnVuY3Rpb24gKF8sIHJlZiwgZGVmKSB7ICAvLyB5aWVsZCB3aXRoIGZyb20gLSB0byBhdHRyc1xuICAgICAgICByZXR1cm4gc3JjW3JlZl0gfHwgZGVmIHx8ICcnXG4gICAgICB9KVxuICAgICAgLnJlcGxhY2UocmVZaWVsZEFsbCwgZnVuY3Rpb24gKF8sIGRlZikgeyAgICAgICAgLy8geWllbGQgd2l0aG91dCBhbnkgXCJmcm9tXCJcbiAgICAgICAgcmV0dXJuIGh0bWwgfHwgZGVmIHx8ICcnXG4gICAgICB9KVxuICB9XG5cbiAgcmV0dXJuIF9ta2RvbVxuXG59KSgpXG5cbi8qKlxuICogQ29udmVydCB0aGUgaXRlbSBsb29wZWQgaW50byBhbiBvYmplY3QgdXNlZCB0byBleHRlbmQgdGhlIGNoaWxkIHRhZyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGV4cHIgLSBvYmplY3QgY29udGFpbmluZyB0aGUga2V5cyB1c2VkIHRvIGV4dGVuZCB0aGUgY2hpbGRyZW4gdGFnc1xuICogQHBhcmFtICAgeyAqIH0ga2V5IC0gdmFsdWUgdG8gYXNzaWduIHRvIHRoZSBuZXcgb2JqZWN0IHJldHVybmVkXG4gKiBAcGFyYW0gICB7ICogfSB2YWwgLSB2YWx1ZSBjb250YWluaW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSBpbiB0aGUgYXJyYXlcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gLSBuZXcgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHZhbHVlcyBvZiB0aGUgb3JpZ2luYWwgaXRlbVxuICpcbiAqIFRoZSB2YXJpYWJsZXMgJ2tleScgYW5kICd2YWwnIGFyZSBhcmJpdHJhcnkuXG4gKiBUaGV5IGRlcGVuZCBvbiB0aGUgY29sbGVjdGlvbiB0eXBlIGxvb3BlZCAoQXJyYXksIE9iamVjdClcbiAqIGFuZCBvbiB0aGUgZXhwcmVzc2lvbiB1c2VkIG9uIHRoZSBlYWNoIHRhZ1xuICpcbiAqL1xuZnVuY3Rpb24gbWtpdGVtKGV4cHIsIGtleSwgdmFsKSB7XG4gIHZhciBpdGVtID0ge31cbiAgaXRlbVtleHByLmtleV0gPSBrZXlcbiAgaWYgKGV4cHIucG9zKSBpdGVtW2V4cHIucG9zXSA9IHZhbFxuICByZXR1cm4gaXRlbVxufVxuXG4vKipcbiAqIFVubW91bnQgdGhlIHJlZHVuZGFudCB0YWdzXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gaXRlbXMgLSBhcnJheSBjb250YWluaW5nIHRoZSBjdXJyZW50IGl0ZW1zIHRvIGxvb3BcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB0YWdzIC0gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIHRhZ3NcbiAqL1xuZnVuY3Rpb24gdW5tb3VudFJlZHVuZGFudChpdGVtcywgdGFncykge1xuXG4gIHZhciBpID0gdGFncy5sZW5ndGgsXG4gICAgaiA9IGl0ZW1zLmxlbmd0aCxcbiAgICB0XG5cbiAgd2hpbGUgKGkgPiBqKSB7XG4gICAgdCA9IHRhZ3NbLS1pXVxuICAgIHRhZ3Muc3BsaWNlKGksIDEpXG4gICAgdC51bm1vdW50KClcbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgdGhlIG5lc3RlZCBjdXN0b20gdGFncyBpbiBub24gY3VzdG9tIGxvb3AgdGFnc1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBjaGlsZCAtIG5vbiBjdXN0b20gbG9vcCB0YWdcbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gaSAtIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIGxvb3AgdGFnXG4gKi9cbmZ1bmN0aW9uIG1vdmVOZXN0ZWRUYWdzKGNoaWxkLCBpKSB7XG4gIE9iamVjdC5rZXlzKGNoaWxkLnRhZ3MpLmZvckVhY2goZnVuY3Rpb24odGFnTmFtZSkge1xuICAgIHZhciB0YWcgPSBjaGlsZC50YWdzW3RhZ05hbWVdXG4gICAgaWYgKGlzQXJyYXkodGFnKSlcbiAgICAgIGVhY2godGFnLCBmdW5jdGlvbiAodCkge1xuICAgICAgICBtb3ZlQ2hpbGRUYWcodCwgdGFnTmFtZSwgaSlcbiAgICAgIH0pXG4gICAgZWxzZVxuICAgICAgbW92ZUNoaWxkVGFnKHRhZywgdGFnTmFtZSwgaSlcbiAgfSlcbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBlbGVtZW50cyBmb3IgYSB2aXJ0dWFsIHRhZ1xuICogQHBhcmFtIHsgVGFnIH0gdGFnIC0gdGhlIHRhZyB3aG9zZSByb290J3MgY2hpbGRyZW4gd2lsbCBiZSBpbnNlcnRlZCBvciBhcHBlbmRlZFxuICogQHBhcmFtIHsgTm9kZSB9IHNyYyAtIHRoZSBub2RlIHRoYXQgd2lsbCBkbyB0aGUgaW5zZXJ0aW5nIG9yIGFwcGVuZGluZ1xuICogQHBhcmFtIHsgVGFnIH0gdGFyZ2V0IC0gb25seSBpZiBpbnNlcnRpbmcsIGluc2VydCBiZWZvcmUgdGhpcyB0YWcncyBmaXJzdCBjaGlsZFxuICovXG5mdW5jdGlvbiBhZGRWaXJ0dWFsKHRhZywgc3JjLCB0YXJnZXQpIHtcbiAgdmFyIGVsID0gdGFnLl9yb290LCBzaWJcbiAgdGFnLl92aXJ0cyA9IFtdXG4gIHdoaWxlIChlbCkge1xuICAgIHNpYiA9IGVsLm5leHRTaWJsaW5nXG4gICAgaWYgKHRhcmdldClcbiAgICAgIHNyYy5pbnNlcnRCZWZvcmUoZWwsIHRhcmdldC5fcm9vdClcbiAgICBlbHNlXG4gICAgICBzcmMuYXBwZW5kQ2hpbGQoZWwpXG5cbiAgICB0YWcuX3ZpcnRzLnB1c2goZWwpIC8vIGhvbGQgZm9yIHVubW91bnRpbmdcbiAgICBlbCA9IHNpYlxuICB9XG59XG5cbi8qKlxuICogTW92ZSB2aXJ0dWFsIHRhZyBhbmQgYWxsIGNoaWxkIG5vZGVzXG4gKiBAcGFyYW0geyBUYWcgfSB0YWcgLSBmaXJzdCBjaGlsZCByZWZlcmVuY2UgdXNlZCB0byBzdGFydCBtb3ZlXG4gKiBAcGFyYW0geyBOb2RlIH0gc3JjICAtIHRoZSBub2RlIHRoYXQgd2lsbCBkbyB0aGUgaW5zZXJ0aW5nXG4gKiBAcGFyYW0geyBUYWcgfSB0YXJnZXQgLSBpbnNlcnQgYmVmb3JlIHRoaXMgdGFnJ3MgZmlyc3QgY2hpbGRcbiAqIEBwYXJhbSB7IE51bWJlciB9IGxlbiAtIGhvdyBtYW55IGNoaWxkIG5vZGVzIHRvIG1vdmVcbiAqL1xuZnVuY3Rpb24gbW92ZVZpcnR1YWwodGFnLCBzcmMsIHRhcmdldCwgbGVuKSB7XG4gIHZhciBlbCA9IHRhZy5fcm9vdCwgc2liLCBpID0gMFxuICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgc2liID0gZWwubmV4dFNpYmxpbmdcbiAgICBzcmMuaW5zZXJ0QmVmb3JlKGVsLCB0YXJnZXQuX3Jvb3QpXG4gICAgZWwgPSBzaWJcbiAgfVxufVxuXG4vKipcbiAqIEluc2VydCBhIG5ldyB0YWcgYXZvaWRpbmcgdGhlIGluc2VydCBmb3IgdGhlIGNvbmRpdGlvbmFsIHRhZ3NcbiAqIEBwYXJhbSAgIHtCb29sZWFufSBpc1ZpcnR1YWwgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICAgeyBUYWcgfSAgcHJldlRhZyAtIHRhZyBpbnN0YW5jZSB1c2VkIGFzIHJlZmVyZW5jZSB0byBwcmVwZW5kIG91ciBuZXcgdGFnXG4gKiBAcGFyYW0gICB7IFRhZyB9ICBuZXdUYWcgLSBuZXcgdGFnIHRvIGJlIGluc2VydGVkXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gIHJvb3QgLSBsb29wIHBhcmVudCBub2RlXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gIHRhZ3MgLSBhcnJheSBjb250YWluaW5nIHRoZSBjdXJyZW50IHRhZ3MgbGlzdFxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9ICB2aXJ0dWFsRm4gLSBjYWxsYmFjayBuZWVkZWQgdG8gbW92ZSBvciBpbnNlcnQgdmlydHVhbCBET01cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2UgbmVlZCB0byBsb29wXG4gKi9cbmZ1bmN0aW9uIGluc2VydFRhZyhpc1ZpcnR1YWwsIHByZXZUYWcsIG5ld1RhZywgcm9vdCwgdGFncywgdmlydHVhbEZuLCBkb20pIHtcbiAgaWYgKGlzSW5TdHViKHByZXZUYWcucm9vdCkpIHJldHVyblxuICBpZiAoaXNWaXJ0dWFsKSB2aXJ0dWFsRm4ocHJldlRhZywgcm9vdCwgbmV3VGFnLCBkb20uY2hpbGROb2Rlcy5sZW5ndGgpXG4gIGVsc2Ugcm9vdC5pbnNlcnRCZWZvcmUocHJldlRhZy5yb290LCBuZXdUYWcucm9vdCkgLy8gIzEzNzQgc29tZSBicm93c2VycyByZXNldCBzZWxlY3RlZCBoZXJlXG59XG5cblxuLyoqXG4gKiBNYW5hZ2UgdGFncyBoYXZpbmcgdGhlICdlYWNoJ1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSBuZWVkIHRvIGxvb3BcbiAqIEBwYXJhbSAgIHsgVGFnIH0gcGFyZW50IC0gcGFyZW50IHRhZyBpbnN0YW5jZSB3aGVyZSB0aGUgZG9tIG5vZGUgaXMgY29udGFpbmVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGV4cHIgLSBzdHJpbmcgY29udGFpbmVkIGluIHRoZSAnZWFjaCcgYXR0cmlidXRlXG4gKi9cbmZ1bmN0aW9uIF9lYWNoKGRvbSwgcGFyZW50LCBleHByKSB7XG5cbiAgLy8gcmVtb3ZlIHRoZSBlYWNoIHByb3BlcnR5IGZyb20gdGhlIG9yaWdpbmFsIHRhZ1xuICByZW1BdHRyKGRvbSwgJ2VhY2gnKVxuXG4gIHZhciBtdXN0UmVvcmRlciA9IHR5cGVvZiBnZXRBdHRyKGRvbSwgJ25vLXJlb3JkZXInKSAhPT0gVF9TVFJJTkcgfHwgcmVtQXR0cihkb20sICduby1yZW9yZGVyJyksXG4gICAgdGFnTmFtZSA9IGdldFRhZ05hbWUoZG9tKSxcbiAgICBpbXBsID0gX190YWdJbXBsW3RhZ05hbWVdIHx8IHsgdG1wbDogZ2V0T3V0ZXJIVE1MKGRvbSkgfSxcbiAgICB1c2VSb290ID0gU1BFQ0lBTF9UQUdTX1JFR0VYLnRlc3QodGFnTmFtZSksXG4gICAgcm9vdCA9IGRvbS5wYXJlbnROb2RlLFxuICAgIHJlZiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSxcbiAgICBjaGlsZCA9IGdldFRhZyhkb20pLFxuICAgIGlzT3B0aW9uID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnb3B0aW9uJywgLy8gdGhlIG9wdGlvbiB0YWdzIG11c3QgYmUgdHJlYXRlZCBkaWZmZXJlbnRseVxuICAgIHRhZ3MgPSBbXSxcbiAgICBvbGRJdGVtcyA9IFtdLFxuICAgIGhhc0tleXMsXG4gICAgaXNWaXJ0dWFsID0gZG9tLnRhZ05hbWUgPT0gJ1ZJUlRVQUwnXG5cbiAgLy8gcGFyc2UgdGhlIGVhY2ggZXhwcmVzc2lvblxuICBleHByID0gdG1wbC5sb29wS2V5cyhleHByKVxuXG4gIC8vIGluc2VydCBhIG1hcmtlZCB3aGVyZSB0aGUgbG9vcCB0YWdzIHdpbGwgYmUgaW5qZWN0ZWRcbiAgcm9vdC5pbnNlcnRCZWZvcmUocmVmLCBkb20pXG5cbiAgLy8gY2xlYW4gdGVtcGxhdGUgY29kZVxuICBwYXJlbnQub25lKCdiZWZvcmUtbW91bnQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyByZW1vdmUgdGhlIG9yaWdpbmFsIERPTSBub2RlXG4gICAgZG9tLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tKVxuICAgIGlmIChyb290LnN0dWIpIHJvb3QgPSBwYXJlbnQucm9vdFxuXG4gIH0pLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gZ2V0IHRoZSBuZXcgaXRlbXMgY29sbGVjdGlvblxuICAgIHZhciBpdGVtcyA9IHRtcGwoZXhwci52YWwsIHBhcmVudCksXG4gICAgICAvLyBjcmVhdGUgYSBmcmFnbWVudCB0byBob2xkIHRoZSBuZXcgRE9NIG5vZGVzIHRvIGluamVjdCBpbiB0aGUgcGFyZW50IHRhZ1xuICAgICAgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXG4gICAgLy8gb2JqZWN0IGxvb3AuIGFueSBjaGFuZ2VzIGNhdXNlIGZ1bGwgcmVkcmF3XG4gICAgaWYgKCFpc0FycmF5KGl0ZW1zKSkge1xuICAgICAgaGFzS2V5cyA9IGl0ZW1zIHx8IGZhbHNlXG4gICAgICBpdGVtcyA9IGhhc0tleXMgP1xuICAgICAgICBPYmplY3Qua2V5cyhpdGVtcykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gbWtpdGVtKGV4cHIsIGtleSwgaXRlbXNba2V5XSlcbiAgICAgICAgfSkgOiBbXVxuICAgIH1cblxuICAgIC8vIGxvb3AgYWxsIHRoZSBuZXcgaXRlbXNcbiAgICB2YXIgaSA9IDAsXG4gICAgICBpdGVtc0xlbmd0aCA9IGl0ZW1zLmxlbmd0aFxuXG4gICAgZm9yICg7IGkgPCBpdGVtc0xlbmd0aDsgaSsrKSB7XG4gICAgICAvLyByZW9yZGVyIG9ubHkgaWYgdGhlIGl0ZW1zIGFyZSBvYmplY3RzXG4gICAgICB2YXJcbiAgICAgICAgaXRlbSA9IGl0ZW1zW2ldLFxuICAgICAgICBfbXVzdFJlb3JkZXIgPSBtdXN0UmVvcmRlciAmJiB0eXBlb2YgaXRlbSA9PSBUX09CSkVDVCAmJiAhaGFzS2V5cyxcbiAgICAgICAgb2xkUG9zID0gb2xkSXRlbXMuaW5kZXhPZihpdGVtKSxcbiAgICAgICAgcG9zID0gfm9sZFBvcyAmJiBfbXVzdFJlb3JkZXIgPyBvbGRQb3MgOiBpLFxuICAgICAgICAvLyBkb2VzIGEgdGFnIGV4aXN0IGluIHRoaXMgcG9zaXRpb24/XG4gICAgICAgIHRhZyA9IHRhZ3NbcG9zXVxuXG4gICAgICBpdGVtID0gIWhhc0tleXMgJiYgZXhwci5rZXkgPyBta2l0ZW0oZXhwciwgaXRlbSwgaSkgOiBpdGVtXG5cbiAgICAgIC8vIG5ldyB0YWdcbiAgICAgIGlmIChcbiAgICAgICAgIV9tdXN0UmVvcmRlciAmJiAhdGFnIC8vIHdpdGggbm8tcmVvcmRlciB3ZSBqdXN0IHVwZGF0ZSB0aGUgb2xkIHRhZ3NcbiAgICAgICAgfHxcbiAgICAgICAgX211c3RSZW9yZGVyICYmICF+b2xkUG9zIHx8ICF0YWcgLy8gYnkgZGVmYXVsdCB3ZSBhbHdheXMgdHJ5IHRvIHJlb3JkZXIgdGhlIERPTSBlbGVtZW50c1xuICAgICAgKSB7XG5cbiAgICAgICAgdGFnID0gbmV3IFRhZyhpbXBsLCB7XG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgaXNMb29wOiB0cnVlLFxuICAgICAgICAgIGhhc0ltcGw6ICEhX190YWdJbXBsW3RhZ05hbWVdLFxuICAgICAgICAgIHJvb3Q6IHVzZVJvb3QgPyByb290IDogZG9tLmNsb25lTm9kZSgpLFxuICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSwgZG9tLmlubmVySFRNTClcblxuICAgICAgICB0YWcubW91bnQoKVxuXG4gICAgICAgIGlmIChpc1ZpcnR1YWwpIHRhZy5fcm9vdCA9IHRhZy5yb290LmZpcnN0Q2hpbGQgLy8gc2F2ZSByZWZlcmVuY2UgZm9yIGZ1cnRoZXIgbW92ZXMgb3IgaW5zZXJ0c1xuICAgICAgICAvLyB0aGlzIHRhZyBtdXN0IGJlIGFwcGVuZGVkXG4gICAgICAgIGlmIChpID09IHRhZ3MubGVuZ3RoIHx8ICF0YWdzW2ldKSB7IC8vIGZpeCAxNTgxXG4gICAgICAgICAgaWYgKGlzVmlydHVhbClcbiAgICAgICAgICAgIGFkZFZpcnR1YWwodGFnLCBmcmFnKVxuICAgICAgICAgIGVsc2UgZnJhZy5hcHBlbmRDaGlsZCh0YWcucm9vdClcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzIHRhZyBtdXN0IGJlIGluc2VydFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpbnNlcnRUYWcoaXNWaXJ0dWFsLCB0YWcsIHRhZ3NbaV0sIHJvb3QsIHRhZ3MsIGFkZFZpcnR1YWwsIGRvbSlcbiAgICAgICAgICBvbGRJdGVtcy5zcGxpY2UoaSwgMCwgaXRlbSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRhZ3Muc3BsaWNlKGksIDAsIHRhZylcbiAgICAgICAgcG9zID0gaSAvLyBoYW5kbGVkIGhlcmUgc28gbm8gbW92ZVxuICAgICAgfSBlbHNlIHRhZy51cGRhdGUoaXRlbSwgdHJ1ZSlcblxuICAgICAgLy8gcmVvcmRlciB0aGUgdGFnIGlmIGl0J3Mgbm90IGxvY2F0ZWQgaW4gaXRzIHByZXZpb3VzIHBvc2l0aW9uXG4gICAgICBpZiAoXG4gICAgICAgIHBvcyAhPT0gaSAmJiBfbXVzdFJlb3JkZXIgJiZcbiAgICAgICAgdGFnc1tpXSAvLyBmaXggMTU4MSB1bmFibGUgdG8gcmVwcm9kdWNlIGl0IGluIGEgdGVzdCFcbiAgICAgICkge1xuICAgICAgICAvLyAjY2xvc2VzIDIwNDAgUExFQVNFIERPTidUIFJFTU9WRSBJVCFcbiAgICAgICAgLy8gdGhlcmUgYXJlIG5vIHRlc3RzIGZvciB0aGlzIGZlYXR1cmVcbiAgICAgICAgaWYgKGNvbnRhaW5zKGl0ZW1zLCBvbGRJdGVtc1tpXSkpXG4gICAgICAgICAgaW5zZXJ0VGFnKGlzVmlydHVhbCwgdGFnLCB0YWdzW2ldLCByb290LCB0YWdzLCBtb3ZlVmlydHVhbCwgZG9tKVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gYXR0cmlidXRlIGlmIGl0IGV4aXN0c1xuICAgICAgICBpZiAoZXhwci5wb3MpXG4gICAgICAgICAgdGFnW2V4cHIucG9zXSA9IGlcbiAgICAgICAgLy8gbW92ZSB0aGUgb2xkIHRhZyBpbnN0YW5jZVxuICAgICAgICB0YWdzLnNwbGljZShpLCAwLCB0YWdzLnNwbGljZShwb3MsIDEpWzBdKVxuICAgICAgICAvLyBtb3ZlIHRoZSBvbGQgaXRlbVxuICAgICAgICBvbGRJdGVtcy5zcGxpY2UoaSwgMCwgb2xkSXRlbXMuc3BsaWNlKHBvcywgMSlbMF0pXG4gICAgICAgIC8vIGlmIHRoZSBsb29wIHRhZ3MgYXJlIG5vdCBjdXN0b21cbiAgICAgICAgLy8gd2UgbmVlZCB0byBtb3ZlIGFsbCB0aGVpciBjdXN0b20gdGFncyBpbnRvIHRoZSByaWdodCBwb3NpdGlvblxuICAgICAgICBpZiAoIWNoaWxkICYmIHRhZy50YWdzKSBtb3ZlTmVzdGVkVGFncyh0YWcsIGkpXG4gICAgICB9XG5cbiAgICAgIC8vIGNhY2hlIHRoZSBvcmlnaW5hbCBpdGVtIHRvIHVzZSBpdCBpbiB0aGUgZXZlbnRzIGJvdW5kIHRvIHRoaXMgbm9kZVxuICAgICAgLy8gYW5kIGl0cyBjaGlsZHJlblxuICAgICAgdGFnLl9pdGVtID0gaXRlbVxuICAgICAgLy8gY2FjaGUgdGhlIHJlYWwgcGFyZW50IHRhZyBpbnRlcm5hbGx5XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YWcsICdfcGFyZW50JywgcGFyZW50KVxuICAgIH1cblxuICAgIC8vIHJlbW92ZSB0aGUgcmVkdW5kYW50IHRhZ3NcbiAgICB1bm1vdW50UmVkdW5kYW50KGl0ZW1zLCB0YWdzKVxuXG4gICAgLy8gaW5zZXJ0IHRoZSBuZXcgbm9kZXNcbiAgICByb290Lmluc2VydEJlZm9yZShmcmFnLCByZWYpXG4gICAgaWYgKGlzT3B0aW9uKSB7XG5cbiAgICAgIC8vICMxMzc0IEZpcmVGb3ggYnVnIGluIDxvcHRpb24gc2VsZWN0ZWQ9e2V4cHJlc3Npb259PlxuICAgICAgaWYgKEZJUkVGT1ggJiYgIXJvb3QubXVsdGlwbGUpIHtcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCByb290Lmxlbmd0aDsgbisrKSB7XG4gICAgICAgICAgaWYgKHJvb3Rbbl0uX19yaW90MTM3NCkge1xuICAgICAgICAgICAgcm9vdC5zZWxlY3RlZEluZGV4ID0gbiAgLy8gY2xlYXIgb3RoZXIgb3B0aW9uc1xuICAgICAgICAgICAgZGVsZXRlIHJvb3Rbbl0uX19yaW90MTM3NFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgdGhlICd0YWdzJyBwcm9wZXJ0eSBvZiB0aGUgcGFyZW50IHRhZ1xuICAgIC8vIGlmIGNoaWxkIGlzICd1bmRlZmluZWQnIGl0IG1lYW5zIHRoYXQgd2UgZG9uJ3QgbmVlZCB0byBzZXQgdGhpcyBwcm9wZXJ0eVxuICAgIC8vIGZvciBleGFtcGxlOlxuICAgIC8vIHdlIGRvbid0IG5lZWQgc3RvcmUgdGhlIGBteVRhZy50YWdzWydkaXYnXWAgcHJvcGVydHkgaWYgd2UgYXJlIGxvb3BpbmcgYSBkaXYgdGFnXG4gICAgLy8gYnV0IHdlIG5lZWQgdG8gdHJhY2sgdGhlIGBteVRhZy50YWdzWydjaGlsZCddYCBwcm9wZXJ0eSBsb29waW5nIGEgY3VzdG9tIGNoaWxkIG5vZGUgbmFtZWQgYGNoaWxkYFxuICAgIGlmIChjaGlsZCkgcGFyZW50LnRhZ3NbdGFnTmFtZV0gPSB0YWdzXG5cbiAgICAvLyBjbG9uZSB0aGUgaXRlbXMgYXJyYXlcbiAgICBvbGRJdGVtcyA9IGl0ZW1zLnNsaWNlKClcblxuICB9KVxuXG59XG4vKipcbiAqIE9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZCB0byBpbmplY3QgYW5kIG1hbmFnZSB0aGUgY3NzIG9mIGV2ZXJ5IHRhZyBpbnN0YW5jZVxuICovXG52YXIgc3R5bGVNYW5hZ2VyID0gKGZ1bmN0aW9uKF9yaW90KSB7XG5cbiAgaWYgKCF3aW5kb3cpIHJldHVybiB7IC8vIHNraXAgaW5qZWN0aW9uIG9uIHRoZSBzZXJ2ZXJcbiAgICBhZGQ6IGZ1bmN0aW9uICgpIHt9LFxuICAgIGluamVjdDogZnVuY3Rpb24gKCkge31cbiAgfVxuXG4gIHZhciBzdHlsZU5vZGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8vIGNyZWF0ZSBhIG5ldyBzdHlsZSBlbGVtZW50IHdpdGggdGhlIGNvcnJlY3QgdHlwZVxuICAgIHZhciBuZXdOb2RlID0gbWtFbCgnc3R5bGUnKVxuICAgIHNldEF0dHIobmV3Tm9kZSwgJ3R5cGUnLCAndGV4dC9jc3MnKVxuXG4gICAgLy8gcmVwbGFjZSBhbnkgdXNlciBub2RlIG9yIGluc2VydCB0aGUgbmV3IG9uZSBpbnRvIHRoZSBoZWFkXG4gICAgdmFyIHVzZXJOb2RlID0gJCgnc3R5bGVbdHlwZT1yaW90XScpXG4gICAgaWYgKHVzZXJOb2RlKSB7XG4gICAgICBpZiAodXNlck5vZGUuaWQpIG5ld05vZGUuaWQgPSB1c2VyTm9kZS5pZFxuICAgICAgdXNlck5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgdXNlck5vZGUpXG4gICAgfVxuICAgIGVsc2UgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChuZXdOb2RlKVxuXG4gICAgcmV0dXJuIG5ld05vZGVcbiAgfSkoKVxuXG4gIC8vIENyZWF0ZSBjYWNoZSBhbmQgc2hvcnRjdXQgdG8gdGhlIGNvcnJlY3QgcHJvcGVydHlcbiAgdmFyIGNzc1RleHRQcm9wID0gc3R5bGVOb2RlLnN0eWxlU2hlZXQsXG4gICAgc3R5bGVzVG9JbmplY3QgPSAnJ1xuXG4gIC8vIEV4cG9zZSB0aGUgc3R5bGUgbm9kZSBpbiBhIG5vbi1tb2RpZmljYWJsZSBwcm9wZXJ0eVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX3Jpb3QsICdzdHlsZU5vZGUnLCB7XG4gICAgdmFsdWU6IHN0eWxlTm9kZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgYXBpXG4gICAqL1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIFNhdmUgYSB0YWcgc3R5bGUgdG8gYmUgbGF0ZXIgaW5qZWN0ZWQgaW50byBET01cbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGNzcyBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgYWRkOiBmdW5jdGlvbihjc3MpIHtcbiAgICAgIHN0eWxlc1RvSW5qZWN0ICs9IGNzc1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogSW5qZWN0IGFsbCBwcmV2aW91c2x5IHNhdmVkIHRhZyBzdHlsZXMgaW50byBET01cbiAgICAgKiBpbm5lckhUTUwgc2VlbXMgc2xvdzogaHR0cDovL2pzcGVyZi5jb20vcmlvdC1pbnNlcnQtc3R5bGVcbiAgICAgKi9cbiAgICBpbmplY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHN0eWxlc1RvSW5qZWN0KSB7XG4gICAgICAgIGlmIChjc3NUZXh0UHJvcCkgY3NzVGV4dFByb3AuY3NzVGV4dCArPSBzdHlsZXNUb0luamVjdFxuICAgICAgICBlbHNlIHN0eWxlTm9kZS5pbm5lckhUTUwgKz0gc3R5bGVzVG9JbmplY3RcbiAgICAgICAgc3R5bGVzVG9JbmplY3QgPSAnJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59KShyaW90KVxuXG5cbmZ1bmN0aW9uIHBhcnNlTmFtZWRFbGVtZW50cyhyb290LCB0YWcsIGNoaWxkVGFncywgZm9yY2VQYXJzaW5nTmFtZWQpIHtcblxuICB3YWxrKHJvb3QsIGZ1bmN0aW9uKGRvbSkge1xuICAgIGlmIChkb20ubm9kZVR5cGUgPT0gMSkge1xuICAgICAgZG9tLmlzTG9vcCA9IGRvbS5pc0xvb3AgfHxcbiAgICAgICAgICAgICAgICAgIChkb20ucGFyZW50Tm9kZSAmJiBkb20ucGFyZW50Tm9kZS5pc0xvb3AgfHwgZ2V0QXR0cihkb20sICdlYWNoJykpXG4gICAgICAgICAgICAgICAgICAgID8gMSA6IDBcblxuICAgICAgLy8gY3VzdG9tIGNoaWxkIHRhZ1xuICAgICAgaWYgKGNoaWxkVGFncykge1xuICAgICAgICB2YXIgY2hpbGQgPSBnZXRUYWcoZG9tKVxuXG4gICAgICAgIGlmIChjaGlsZCAmJiAhZG9tLmlzTG9vcClcbiAgICAgICAgICBjaGlsZFRhZ3MucHVzaChpbml0Q2hpbGRUYWcoY2hpbGQsIHtyb290OiBkb20sIHBhcmVudDogdGFnfSwgZG9tLmlubmVySFRNTCwgdGFnKSlcbiAgICAgIH1cblxuICAgICAgaWYgKCFkb20uaXNMb29wIHx8IGZvcmNlUGFyc2luZ05hbWVkKVxuICAgICAgICBzZXROYW1lZChkb20sIHRhZywgW10pXG4gICAgfVxuXG4gIH0pXG5cbn1cblxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9ucyhyb290LCB0YWcsIGV4cHJlc3Npb25zKSB7XG5cbiAgZnVuY3Rpb24gYWRkRXhwcihkb20sIHZhbCwgZXh0cmEpIHtcbiAgICBpZiAodG1wbC5oYXNFeHByKHZhbCkpIHtcbiAgICAgIGV4cHJlc3Npb25zLnB1c2goZXh0ZW5kKHsgZG9tOiBkb20sIGV4cHI6IHZhbCB9LCBleHRyYSkpXG4gICAgfVxuICB9XG5cbiAgd2Fsayhyb290LCBmdW5jdGlvbihkb20pIHtcbiAgICB2YXIgdHlwZSA9IGRvbS5ub2RlVHlwZSxcbiAgICAgIGF0dHJcblxuICAgIC8vIHRleHQgbm9kZVxuICAgIGlmICh0eXBlID09IDMgJiYgZG9tLnBhcmVudE5vZGUudGFnTmFtZSAhPSAnU1RZTEUnKSBhZGRFeHByKGRvbSwgZG9tLm5vZGVWYWx1ZSlcbiAgICBpZiAodHlwZSAhPSAxKSByZXR1cm5cblxuICAgIC8qIGVsZW1lbnQgKi9cblxuICAgIC8vIGxvb3BcbiAgICBhdHRyID0gZ2V0QXR0cihkb20sICdlYWNoJylcblxuICAgIGlmIChhdHRyKSB7IF9lYWNoKGRvbSwgdGFnLCBhdHRyKTsgcmV0dXJuIGZhbHNlIH1cblxuICAgIC8vIGF0dHJpYnV0ZSBleHByZXNzaW9uc1xuICAgIGVhY2goZG9tLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIHZhciBuYW1lID0gYXR0ci5uYW1lLFxuICAgICAgICBib29sID0gbmFtZS5zcGxpdCgnX18nKVsxXVxuXG4gICAgICBhZGRFeHByKGRvbSwgYXR0ci52YWx1ZSwgeyBhdHRyOiBib29sIHx8IG5hbWUsIGJvb2w6IGJvb2wgfSlcbiAgICAgIGlmIChib29sKSB7IHJlbUF0dHIoZG9tLCBuYW1lKTsgcmV0dXJuIGZhbHNlIH1cblxuICAgIH0pXG5cbiAgICAvLyBza2lwIGN1c3RvbSB0YWdzXG4gICAgaWYgKGdldFRhZyhkb20pKSByZXR1cm4gZmFsc2VcblxuICB9KVxuXG59XG5mdW5jdGlvbiBUYWcoaW1wbCwgY29uZiwgaW5uZXJIVE1MKSB7XG5cbiAgdmFyIHNlbGYgPSByaW90Lm9ic2VydmFibGUodGhpcyksXG4gICAgb3B0cyA9IGluaGVyaXQoY29uZi5vcHRzKSB8fCB7fSxcbiAgICBwYXJlbnQgPSBjb25mLnBhcmVudCxcbiAgICBpc0xvb3AgPSBjb25mLmlzTG9vcCxcbiAgICBoYXNJbXBsID0gY29uZi5oYXNJbXBsLFxuICAgIGl0ZW0gPSBjbGVhblVwRGF0YShjb25mLml0ZW0pLFxuICAgIGV4cHJlc3Npb25zID0gW10sXG4gICAgY2hpbGRUYWdzID0gW10sXG4gICAgcm9vdCA9IGNvbmYucm9vdCxcbiAgICB0YWdOYW1lID0gcm9vdC50YWdOYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgYXR0ciA9IHt9LFxuICAgIHByb3BzSW5TeW5jV2l0aFBhcmVudCA9IFtdLFxuICAgIGRvbVxuXG4gIC8vIG9ubHkgY2FsbCB1bm1vdW50IGlmIHdlIGhhdmUgYSB2YWxpZCBfX3RhZ0ltcGwgKGhhcyBuYW1lIHByb3BlcnR5KVxuICBpZiAoaW1wbC5uYW1lICYmIHJvb3QuX3RhZykgcm9vdC5fdGFnLnVubW91bnQodHJ1ZSlcblxuICAvLyBub3QgeWV0IG1vdW50ZWRcbiAgdGhpcy5pc01vdW50ZWQgPSBmYWxzZVxuICByb290LmlzTG9vcCA9IGlzTG9vcFxuXG4gIC8vIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAgLy8gc28gd2Ugd2lsbCBiZSBhYmxlIHRvIG1vdW50IHRoaXMgdGFnIG11bHRpcGxlIHRpbWVzXG4gIHJvb3QuX3RhZyA9IHRoaXNcblxuICAvLyBjcmVhdGUgYSB1bmlxdWUgaWQgdG8gdGhpcyB0YWdcbiAgLy8gaXQgY291bGQgYmUgaGFuZHkgdG8gdXNlIGl0IGFsc28gdG8gaW1wcm92ZSB0aGUgdmlydHVhbCBkb20gcmVuZGVyaW5nIHNwZWVkXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdfcmlvdF9pZCcsICsrX191aWQpIC8vIGJhc2UgMSBhbGxvd3MgdGVzdCAhdC5fcmlvdF9pZFxuXG4gIGV4dGVuZCh0aGlzLCB7IHBhcmVudDogcGFyZW50LCByb290OiByb290LCBvcHRzOiBvcHRzfSwgaXRlbSlcbiAgLy8gcHJvdGVjdCB0aGUgXCJ0YWdzXCIgcHJvcGVydHkgZnJvbSBiZWluZyBvdmVycmlkZGVuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd0YWdzJywge30pXG5cbiAgLy8gZ3JhYiBhdHRyaWJ1dGVzXG4gIGVhY2gocm9vdC5hdHRyaWJ1dGVzLCBmdW5jdGlvbihlbCkge1xuICAgIHZhciB2YWwgPSBlbC52YWx1ZVxuICAgIC8vIHJlbWVtYmVyIGF0dHJpYnV0ZXMgd2l0aCBleHByZXNzaW9ucyBvbmx5XG4gICAgaWYgKHRtcGwuaGFzRXhwcih2YWwpKSBhdHRyW2VsLm5hbWVdID0gdmFsXG4gIH0pXG5cbiAgZG9tID0gbWtkb20oaW1wbC50bXBsLCBpbm5lckhUTUwsIGlzTG9vcClcblxuICAvLyBvcHRpb25zXG4gIGZ1bmN0aW9uIHVwZGF0ZU9wdHMoKSB7XG4gICAgdmFyIGN0eCA9IGhhc0ltcGwgJiYgaXNMb29wID8gc2VsZiA6IHBhcmVudCB8fCBzZWxmXG5cbiAgICAvLyB1cGRhdGUgb3B0cyBmcm9tIGN1cnJlbnQgRE9NIGF0dHJpYnV0ZXNcbiAgICBlYWNoKHJvb3QuYXR0cmlidXRlcywgZnVuY3Rpb24oZWwpIHtcbiAgICAgIGlmIChlbC5uYW1lIGluIGF0dHIpIHJldHVyblxuICAgICAgdmFyIHZhbCA9IGVsLnZhbHVlXG4gICAgICBvcHRzW3RvQ2FtZWwoZWwubmFtZSldID0gdG1wbC5oYXNFeHByKHZhbCkgPyB0bXBsKHZhbCwgY3R4KSA6IHZhbFxuICAgIH0pXG4gICAgLy8gcmVjb3ZlciB0aG9zZSB3aXRoIGV4cHJlc3Npb25zXG4gICAgZWFjaChPYmplY3Qua2V5cyhhdHRyKSwgZnVuY3Rpb24obmFtZSkge1xuICAgICAgb3B0c1t0b0NhbWVsKG5hbWUpXSA9IHRtcGwoYXR0cltuYW1lXSwgY3R4KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVEYXRhKGRhdGEpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gaXRlbSkge1xuICAgICAgaWYgKHR5cGVvZiBzZWxmW2tleV0gIT09IFRfVU5ERUYgJiYgaXNXcml0YWJsZShzZWxmLCBrZXkpKVxuICAgICAgICBzZWxmW2tleV0gPSBkYXRhW2tleV1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbmhlcml0RnJvbSh0YXJnZXQpIHtcbiAgICBlYWNoKE9iamVjdC5rZXlzKHRhcmdldCksIGZ1bmN0aW9uKGspIHtcbiAgICAgIC8vIHNvbWUgcHJvcGVydGllcyBtdXN0IGJlIGFsd2F5cyBpbiBzeW5jIHdpdGggdGhlIHBhcmVudCB0YWdcbiAgICAgIHZhciBtdXN0U3luYyA9ICFSRVNFUlZFRF9XT1JEU19CTEFDS0xJU1QudGVzdChrKSAmJiBjb250YWlucyhwcm9wc0luU3luY1dpdGhQYXJlbnQsIGspXG5cbiAgICAgIGlmICh0eXBlb2Ygc2VsZltrXSA9PT0gVF9VTkRFRiB8fCBtdXN0U3luYykge1xuICAgICAgICAvLyB0cmFjayB0aGUgcHJvcGVydHkgdG8ga2VlcCBpbiBzeW5jXG4gICAgICAgIC8vIHNvIHdlIGNhbiBrZWVwIGl0IHVwZGF0ZWRcbiAgICAgICAgaWYgKCFtdXN0U3luYykgcHJvcHNJblN5bmNXaXRoUGFyZW50LnB1c2goaylcbiAgICAgICAgc2VsZltrXSA9IHRhcmdldFtrXVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0YWcgZXhwcmVzc2lvbnMgYW5kIG9wdGlvbnNcbiAgICogQHBhcmFtICAgeyAqIH0gIGRhdGEgLSBkYXRhIHdlIHdhbnQgdG8gdXNlIHRvIGV4dGVuZCB0aGUgdGFnIHByb3BlcnRpZXNcbiAgICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNJbmhlcml0ZWQgLSBpcyB0aGlzIHVwZGF0ZSBjb21pbmcgZnJvbSBhIHBhcmVudCB0YWc/XG4gICAqIEByZXR1cm5zIHsgc2VsZiB9XG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAndXBkYXRlJywgZnVuY3Rpb24oZGF0YSwgaXNJbmhlcml0ZWQpIHtcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgZGF0YSBwYXNzZWQgd2lsbCBub3Qgb3ZlcnJpZGVcbiAgICAvLyB0aGUgY29tcG9uZW50IGNvcmUgbWV0aG9kc1xuICAgIGRhdGEgPSBjbGVhblVwRGF0YShkYXRhKVxuICAgIC8vIGluaGVyaXQgcHJvcGVydGllcyBmcm9tIHRoZSBwYXJlbnQgaW4gbG9vcFxuICAgIGlmIChpc0xvb3ApIHtcbiAgICAgIGluaGVyaXRGcm9tKHNlbGYucGFyZW50KVxuICAgIH1cbiAgICAvLyBub3JtYWxpemUgdGhlIHRhZyBwcm9wZXJ0aWVzIGluIGNhc2UgYW4gaXRlbSBvYmplY3Qgd2FzIGluaXRpYWxseSBwYXNzZWRcbiAgICBpZiAoZGF0YSAmJiBpc09iamVjdChpdGVtKSkge1xuICAgICAgbm9ybWFsaXplRGF0YShkYXRhKVxuICAgICAgaXRlbSA9IGRhdGFcbiAgICB9XG4gICAgZXh0ZW5kKHNlbGYsIGRhdGEpXG4gICAgdXBkYXRlT3B0cygpXG4gICAgc2VsZi50cmlnZ2VyKCd1cGRhdGUnLCBkYXRhKVxuICAgIHVwZGF0ZShleHByZXNzaW9ucywgc2VsZilcblxuICAgIC8vIHRoZSB1cGRhdGVkIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkXG4gICAgLy8gb25jZSB0aGUgRE9NIHdpbGwgYmUgcmVhZHkgYW5kIGFsbCB0aGUgcmUtZmxvd3MgYXJlIGNvbXBsZXRlZFxuICAgIC8vIHRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3YW50IHRvIGdldCB0aGUgXCJyZWFsXCIgcm9vdCBwcm9wZXJ0aWVzXG4gICAgLy8gNCBleDogcm9vdC5vZmZzZXRXaWR0aCAuLi5cbiAgICBpZiAoaXNJbmhlcml0ZWQgJiYgc2VsZi5wYXJlbnQpXG4gICAgICAvLyBjbG9zZXMgIzE1OTlcbiAgICAgIHNlbGYucGFyZW50Lm9uZSgndXBkYXRlZCcsIGZ1bmN0aW9uKCkgeyBzZWxmLnRyaWdnZXIoJ3VwZGF0ZWQnKSB9KVxuICAgIGVsc2UgckFGKGZ1bmN0aW9uKCkgeyBzZWxmLnRyaWdnZXIoJ3VwZGF0ZWQnKSB9KVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfSlcblxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWl4aW4nLCBmdW5jdGlvbigpIHtcbiAgICBlYWNoKGFyZ3VtZW50cywgZnVuY3Rpb24obWl4KSB7XG4gICAgICB2YXIgaW5zdGFuY2UsXG4gICAgICAgIHByb3BzID0gW10sXG4gICAgICAgIG9ialxuXG4gICAgICBtaXggPSB0eXBlb2YgbWl4ID09PSBUX1NUUklORyA/IHJpb3QubWl4aW4obWl4KSA6IG1peFxuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgbWl4aW4gaXMgYSBmdW5jdGlvblxuICAgICAgaWYgKGlzRnVuY3Rpb24obWl4KSkge1xuICAgICAgICAvLyBjcmVhdGUgdGhlIG5ldyBtaXhpbiBpbnN0YW5jZVxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBtaXgoKVxuICAgICAgfSBlbHNlIGluc3RhbmNlID0gbWl4XG5cbiAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZSlcblxuICAgICAgLy8gYnVpbGQgbXVsdGlsZXZlbCBwcm90b3R5cGUgaW5oZXJpdGFuY2UgY2hhaW4gcHJvcGVydHkgbGlzdFxuICAgICAgZG8gcHJvcHMgPSBwcm9wcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqIHx8IGluc3RhbmNlKSlcbiAgICAgIHdoaWxlIChvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqIHx8IGluc3RhbmNlKSlcblxuICAgICAgLy8gbG9vcCB0aGUga2V5cyBpbiB0aGUgZnVuY3Rpb24gcHJvdG90eXBlIG9yIHRoZSBhbGwgb2JqZWN0IGtleXNcbiAgICAgIGVhY2gocHJvcHMsIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAvLyBiaW5kIG1ldGhvZHMgdG8gc2VsZlxuICAgICAgICAvLyBhbGxvdyBtaXhpbnMgdG8gb3ZlcnJpZGUgb3RoZXIgcHJvcGVydGllcy9wYXJlbnQgbWl4aW5zXG4gICAgICAgIGlmIChrZXkgIT0gJ2luaXQnKSB7XG4gICAgICAgICAgLy8gY2hlY2sgZm9yIGdldHRlcnMvc2V0dGVyc1xuICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpbnN0YW5jZSwga2V5KSB8fCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBrZXkpXG4gICAgICAgICAgdmFyIGhhc0dldHRlclNldHRlciA9IGRlc2NyaXB0b3IgJiYgKGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KVxuXG4gICAgICAgICAgLy8gYXBwbHkgbWV0aG9kIG9ubHkgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdCBvbiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICBpZiAoIXNlbGYuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBoYXNHZXR0ZXJTZXR0ZXIpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBrZXksIGRlc2NyaXB0b3IpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGZba2V5XSA9IGlzRnVuY3Rpb24oaW5zdGFuY2Vba2V5XSkgP1xuICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldLmJpbmQoc2VsZikgOlxuICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBpbml0IG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBhdXRvbWF0aWNhbGx5XG4gICAgICBpZiAoaW5zdGFuY2UuaW5pdCkgaW5zdGFuY2UuaW5pdC5iaW5kKHNlbGYpKClcbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH0pXG5cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ21vdW50JywgZnVuY3Rpb24oKSB7XG5cbiAgICB1cGRhdGVPcHRzKClcblxuICAgIC8vIGFkZCBnbG9iYWwgbWl4aW5zXG4gICAgdmFyIGdsb2JhbE1peGluID0gcmlvdC5taXhpbihHTE9CQUxfTUlYSU4pXG5cbiAgICBpZiAoZ2xvYmFsTWl4aW4pXG4gICAgICBmb3IgKHZhciBpIGluIGdsb2JhbE1peGluKVxuICAgICAgICBpZiAoZ2xvYmFsTWl4aW4uaGFzT3duUHJvcGVydHkoaSkpXG4gICAgICAgICAgc2VsZi5taXhpbihnbG9iYWxNaXhpbltpXSlcblxuICAgIC8vIGNoaWxkcmVuIGluIGxvb3Agc2hvdWxkIGluaGVyaXQgZnJvbSB0cnVlIHBhcmVudFxuICAgIGlmIChzZWxmLl9wYXJlbnQgJiYgc2VsZi5fcGFyZW50LnJvb3QuaXNMb29wKSB7XG4gICAgICBpbmhlcml0RnJvbShzZWxmLl9wYXJlbnQpXG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbGlhdGlvblxuICAgIGlmIChpbXBsLmZuKSBpbXBsLmZuLmNhbGwoc2VsZiwgb3B0cylcblxuICAgIC8vIHBhcnNlIGxheW91dCBhZnRlciBpbml0LiBmbiBtYXkgY2FsY3VsYXRlIGFyZ3MgZm9yIG5lc3RlZCBjdXN0b20gdGFnc1xuICAgIHBhcnNlRXhwcmVzc2lvbnMoZG9tLCBzZWxmLCBleHByZXNzaW9ucylcblxuICAgIC8vIG1vdW50IHRoZSBjaGlsZCB0YWdzXG4gICAgdG9nZ2xlKHRydWUpXG5cbiAgICAvLyB1cGRhdGUgdGhlIHJvb3QgYWRkaW5nIGN1c3RvbSBhdHRyaWJ1dGVzIGNvbWluZyBmcm9tIHRoZSBjb21waWxlclxuICAgIC8vIGl0IGZpeGVzIGFsc28gIzEwODdcbiAgICBpZiAoaW1wbC5hdHRycylcbiAgICAgIHdhbGtBdHRyaWJ1dGVzKGltcGwuYXR0cnMsIGZ1bmN0aW9uIChrLCB2KSB7IHNldEF0dHIocm9vdCwgaywgdikgfSlcbiAgICBpZiAoaW1wbC5hdHRycyB8fCBoYXNJbXBsKVxuICAgICAgcGFyc2VFeHByZXNzaW9ucyhzZWxmLnJvb3QsIHNlbGYsIGV4cHJlc3Npb25zKVxuXG4gICAgaWYgKCFzZWxmLnBhcmVudCB8fCBpc0xvb3ApIHNlbGYudXBkYXRlKGl0ZW0pXG5cbiAgICAvLyBpbnRlcm5hbCB1c2Ugb25seSwgZml4ZXMgIzQwM1xuICAgIHNlbGYudHJpZ2dlcignYmVmb3JlLW1vdW50JylcblxuICAgIGlmIChpc0xvb3AgJiYgIWhhc0ltcGwpIHtcbiAgICAgIC8vIHVwZGF0ZSB0aGUgcm9vdCBhdHRyaWJ1dGUgZm9yIHRoZSBsb29wZWQgZWxlbWVudHNcbiAgICAgIHJvb3QgPSBkb20uZmlyc3RDaGlsZFxuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAoZG9tLmZpcnN0Q2hpbGQpIHJvb3QuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpXG4gICAgICBpZiAocm9vdC5zdHViKSByb290ID0gcGFyZW50LnJvb3RcbiAgICB9XG5cbiAgICBkZWZpbmVQcm9wZXJ0eShzZWxmLCAncm9vdCcsIHJvb3QpXG5cbiAgICAvLyBwYXJzZSB0aGUgbmFtZWQgZG9tIG5vZGVzIGluIHRoZSBsb29wZWQgY2hpbGRcbiAgICAvLyBhZGRpbmcgdGhlbSB0byB0aGUgcGFyZW50IGFzIHdlbGxcbiAgICBpZiAoaXNMb29wKVxuICAgICAgcGFyc2VOYW1lZEVsZW1lbnRzKHNlbGYucm9vdCwgc2VsZi5wYXJlbnQsIG51bGwsIHRydWUpXG5cbiAgICAvLyBpZiBpdCdzIG5vdCBhIGNoaWxkIHRhZyB3ZSBjYW4gdHJpZ2dlciBpdHMgbW91bnQgZXZlbnRcbiAgICBpZiAoIXNlbGYucGFyZW50IHx8IHNlbGYucGFyZW50LmlzTW91bnRlZCkge1xuICAgICAgc2VsZi5pc01vdW50ZWQgPSB0cnVlXG4gICAgICBzZWxmLnRyaWdnZXIoJ21vdW50JylcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlIHdlIG5lZWQgdG8gd2FpdCB0aGF0IHRoZSBwYXJlbnQgZXZlbnQgZ2V0cyB0cmlnZ2VyZWRcbiAgICBlbHNlIHNlbGYucGFyZW50Lm9uZSgnbW91bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIHRvIHRyaWdnZXIgdGhlIGBtb3VudGAgZXZlbnQgZm9yIHRoZSB0YWdzXG4gICAgICAvLyBub3QgdmlzaWJsZSBpbmNsdWRlZCBpbiBhbiBpZiBzdGF0ZW1lbnRcbiAgICAgIGlmICghaXNJblN0dWIoc2VsZi5yb290KSkge1xuICAgICAgICBzZWxmLnBhcmVudC5pc01vdW50ZWQgPSBzZWxmLmlzTW91bnRlZCA9IHRydWVcbiAgICAgICAgc2VsZi50cmlnZ2VyKCdtb3VudCcpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd1bm1vdW50JywgZnVuY3Rpb24oa2VlcFJvb3RUYWcpIHtcbiAgICB2YXIgZWwgPSByb290LFxuICAgICAgcCA9IGVsLnBhcmVudE5vZGUsXG4gICAgICBwdGFnLFxuICAgICAgdGFnSW5kZXggPSBfX3ZpcnR1YWxEb20uaW5kZXhPZihzZWxmKVxuXG4gICAgc2VsZi50cmlnZ2VyKCdiZWZvcmUtdW5tb3VudCcpXG5cbiAgICAvLyByZW1vdmUgdGhpcyB0YWcgaW5zdGFuY2UgZnJvbSB0aGUgZ2xvYmFsIHZpcnR1YWxEb20gdmFyaWFibGVcbiAgICBpZiAofnRhZ0luZGV4KVxuICAgICAgX192aXJ0dWFsRG9tLnNwbGljZSh0YWdJbmRleCwgMSlcblxuICAgIGlmIChwKSB7XG5cbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgcHRhZyA9IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyhwYXJlbnQpXG4gICAgICAgIC8vIHJlbW92ZSB0aGlzIHRhZyBmcm9tIHRoZSBwYXJlbnQgdGFncyBvYmplY3RcbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG11bHRpcGxlIG5lc3RlZCB0YWdzIHdpdGggc2FtZSBuYW1lLi5cbiAgICAgICAgLy8gcmVtb3ZlIHRoaXMgZWxlbWVudCBmb3JtIHRoZSBhcnJheVxuICAgICAgICBpZiAoaXNBcnJheShwdGFnLnRhZ3NbdGFnTmFtZV0pKVxuICAgICAgICAgIGVhY2gocHRhZy50YWdzW3RhZ05hbWVdLCBmdW5jdGlvbih0YWcsIGkpIHtcbiAgICAgICAgICAgIGlmICh0YWcuX3Jpb3RfaWQgPT0gc2VsZi5fcmlvdF9pZClcbiAgICAgICAgICAgICAgcHRhZy50YWdzW3RhZ05hbWVdLnNwbGljZShpLCAxKVxuICAgICAgICAgIH0pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAvLyBvdGhlcndpc2UganVzdCBkZWxldGUgdGhlIHRhZyBpbnN0YW5jZVxuICAgICAgICAgIHB0YWcudGFnc1t0YWdOYW1lXSA9IHVuZGVmaW5lZFxuICAgICAgfVxuXG4gICAgICBlbHNlXG4gICAgICAgIHdoaWxlIChlbC5maXJzdENoaWxkKSBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKVxuXG4gICAgICBpZiAoIWtlZXBSb290VGFnKVxuICAgICAgICBwLnJlbW92ZUNoaWxkKGVsKVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIHRoZSByaW90LXRhZyBhbmQgdGhlIGRhdGEtaXMgYXR0cmlidXRlcyBhcmVuJ3QgbmVlZGVkIGFueW1vcmUsIHJlbW92ZSB0aGVtXG4gICAgICAgIHJlbUF0dHIocCwgUklPVF9UQUdfSVMpXG4gICAgICAgIHJlbUF0dHIocCwgUklPVF9UQUcpIC8vIHRoaXMgd2lsbCBiZSByZW1vdmVkIGluIHJpb3QgMy4wLjBcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICh0aGlzLl92aXJ0cykge1xuICAgICAgZWFjaCh0aGlzLl92aXJ0cywgZnVuY3Rpb24odikge1xuICAgICAgICBpZiAodi5wYXJlbnROb2RlKSB2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodilcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VsZi50cmlnZ2VyKCd1bm1vdW50JylcbiAgICB0b2dnbGUoKVxuICAgIHNlbGYub2ZmKCcqJylcbiAgICBzZWxmLmlzTW91bnRlZCA9IGZhbHNlXG4gICAgZGVsZXRlIHJvb3QuX3RhZ1xuXG4gIH0pXG5cbiAgLy8gcHJveHkgZnVuY3Rpb24gdG8gYmluZCB1cGRhdGVzXG4gIC8vIGRpc3BhdGNoZWQgZnJvbSBhIHBhcmVudCB0YWdcbiAgZnVuY3Rpb24gb25DaGlsZFVwZGF0ZShkYXRhKSB7IHNlbGYudXBkYXRlKGRhdGEsIHRydWUpIH1cblxuICBmdW5jdGlvbiB0b2dnbGUoaXNNb3VudCkge1xuXG4gICAgLy8gbW91bnQvdW5tb3VudCBjaGlsZHJlblxuICAgIGVhY2goY2hpbGRUYWdzLCBmdW5jdGlvbihjaGlsZCkgeyBjaGlsZFtpc01vdW50ID8gJ21vdW50JyA6ICd1bm1vdW50J10oKSB9KVxuXG4gICAgLy8gbGlzdGVuL3VubGlzdGVuIHBhcmVudCAoZXZlbnRzIGZsb3cgb25lIHdheSBmcm9tIHBhcmVudCB0byBjaGlsZHJlbilcbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuXG4gICAgdmFyIGV2dCA9IGlzTW91bnQgPyAnb24nIDogJ29mZidcblxuICAgIC8vIHRoZSBsb29wIHRhZ3Mgd2lsbCBiZSBhbHdheXMgaW4gc3luYyB3aXRoIHRoZSBwYXJlbnQgYXV0b21hdGljYWxseVxuICAgIGlmIChpc0xvb3ApXG4gICAgICBwYXJlbnRbZXZ0XSgndW5tb3VudCcsIHNlbGYudW5tb3VudClcbiAgICBlbHNlIHtcbiAgICAgIHBhcmVudFtldnRdKCd1cGRhdGUnLCBvbkNoaWxkVXBkYXRlKVtldnRdKCd1bm1vdW50Jywgc2VsZi51bm1vdW50KVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gbmFtZWQgZWxlbWVudHMgYXZhaWxhYmxlIGZvciBmblxuICBwYXJzZU5hbWVkRWxlbWVudHMoZG9tLCB0aGlzLCBjaGlsZFRhZ3MpXG5cbn1cbi8qKlxuICogQXR0YWNoIGFuIGV2ZW50IHRvIGEgRE9NIG5vZGVcbiAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBldmVudCBuYW1lXG4gKiBAcGFyYW0geyBGdW5jdGlvbiB9IGhhbmRsZXIgLSBldmVudCBjYWxsYmFja1xuICogQHBhcmFtIHsgT2JqZWN0IH0gZG9tIC0gZG9tIG5vZGVcbiAqIEBwYXJhbSB7IFRhZyB9IHRhZyAtIHRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBzZXRFdmVudEhhbmRsZXIobmFtZSwgaGFuZGxlciwgZG9tLCB0YWcpIHtcblxuICBkb21bbmFtZV0gPSBmdW5jdGlvbihlKSB7XG5cbiAgICB2YXIgcHRhZyA9IHRhZy5fcGFyZW50LFxuICAgICAgaXRlbSA9IHRhZy5faXRlbSxcbiAgICAgIGVsXG5cbiAgICBpZiAoIWl0ZW0pXG4gICAgICB3aGlsZSAocHRhZyAmJiAhaXRlbSkge1xuICAgICAgICBpdGVtID0gcHRhZy5faXRlbVxuICAgICAgICBwdGFnID0gcHRhZy5fcGFyZW50XG4gICAgICB9XG5cbiAgICAvLyBjcm9zcyBicm93c2VyIGV2ZW50IGZpeFxuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudFxuXG4gICAgLy8gb3ZlcnJpZGUgdGhlIGV2ZW50IHByb3BlcnRpZXNcbiAgICBpZiAoaXNXcml0YWJsZShlLCAnY3VycmVudFRhcmdldCcpKSBlLmN1cnJlbnRUYXJnZXQgPSBkb21cbiAgICBpZiAoaXNXcml0YWJsZShlLCAndGFyZ2V0JykpIGUudGFyZ2V0ID0gZS5zcmNFbGVtZW50XG4gICAgaWYgKGlzV3JpdGFibGUoZSwgJ3doaWNoJykpIGUud2hpY2ggPSBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZVxuXG4gICAgZS5pdGVtID0gaXRlbVxuXG4gICAgLy8gcHJldmVudCBkZWZhdWx0IGJlaGF2aW91ciAoYnkgZGVmYXVsdClcbiAgICBpZiAoaGFuZGxlci5jYWxsKHRhZywgZSkgIT09IHRydWUgJiYgIS9yYWRpb3xjaGVjay8udGVzdChkb20udHlwZSkpIHtcbiAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGlmICghZS5wcmV2ZW50VXBkYXRlKSB7XG4gICAgICBlbCA9IGl0ZW0gPyBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcocHRhZykgOiB0YWdcbiAgICAgIGVsLnVwZGF0ZSgpXG4gICAgfVxuXG4gIH1cblxufVxuXG5cbi8qKlxuICogSW5zZXJ0IGEgRE9NIG5vZGUgcmVwbGFjaW5nIGFub3RoZXIgb25lICh1c2VkIGJ5IGlmLSBhdHRyaWJ1dGUpXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHJvb3QgLSBwYXJlbnQgbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBub2RlIC0gbm9kZSByZXBsYWNlZFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBiZWZvcmUgLSBub2RlIGFkZGVkXG4gKi9cbmZ1bmN0aW9uIGluc2VydFRvKHJvb3QsIG5vZGUsIGJlZm9yZSkge1xuICBpZiAoIXJvb3QpIHJldHVyblxuICByb290Lmluc2VydEJlZm9yZShiZWZvcmUsIG5vZGUpXG4gIHJvb3QucmVtb3ZlQ2hpbGQobm9kZSlcbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIGV4cHJlc3Npb25zIGluIGEgVGFnIGluc3RhbmNlXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBleHByZXNzaW9uIHRoYXQgbXVzdCBiZSByZSBldmFsdWF0ZWRcbiAqIEBwYXJhbSAgIHsgVGFnIH0gdGFnIC0gdGFnIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShleHByZXNzaW9ucywgdGFnKSB7XG5cbiAgZWFjaChleHByZXNzaW9ucywgZnVuY3Rpb24oZXhwciwgaSkge1xuXG4gICAgdmFyIGRvbSA9IGV4cHIuZG9tLFxuICAgICAgYXR0ck5hbWUgPSBleHByLmF0dHIsXG4gICAgICB2YWx1ZSA9IHRtcGwoZXhwci5leHByLCB0YWcpLFxuICAgICAgcGFyZW50ID0gZXhwci5wYXJlbnQgfHwgZXhwci5kb20ucGFyZW50Tm9kZVxuXG4gICAgaWYgKGV4cHIuYm9vbCkge1xuICAgICAgdmFsdWUgPSAhIXZhbHVlXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB2YWx1ZSA9ICcnXG4gICAgfVxuXG4gICAgLy8gIzE2Mzg6IHJlZ3Jlc3Npb24gb2YgIzE2MTIsIHVwZGF0ZSB0aGUgZG9tIG9ubHkgaWYgdGhlIHZhbHVlIG9mIHRoZVxuICAgIC8vIGV4cHJlc3Npb24gd2FzIGNoYW5nZWRcbiAgICBpZiAoZXhwci52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBleHByLnZhbHVlID0gdmFsdWVcblxuICAgIC8vIHRleHRhcmVhIGFuZCB0ZXh0IG5vZGVzIGhhcyBubyBhdHRyaWJ1dGUgbmFtZVxuICAgIGlmICghYXR0ck5hbWUpIHtcbiAgICAgIC8vIGFib3V0ICM4MTUgdy9vIHJlcGxhY2U6IHRoZSBicm93c2VyIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBhIHN0cmluZyxcbiAgICAgIC8vIHRoZSBjb21wYXJpc29uIGJ5IFwiPT1cIiBkb2VzIHRvbywgYnV0IG5vdCBpbiB0aGUgc2VydmVyXG4gICAgICB2YWx1ZSArPSAnJ1xuICAgICAgLy8gdGVzdCBmb3IgcGFyZW50IGF2b2lkcyBlcnJvciB3aXRoIGludmFsaWQgYXNzaWdubWVudCB0byBub2RlVmFsdWVcbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gY2FjaGUgdGhlIHBhcmVudCBub2RlIGJlY2F1c2Ugc29tZWhvdyBpdCB3aWxsIGJlY29tZSBudWxsIG9uIElFXG4gICAgICAgIC8vIG9uIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgICBleHByLnBhcmVudCA9IHBhcmVudFxuICAgICAgICBpZiAocGFyZW50LnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgICBwYXJlbnQudmFsdWUgPSB2YWx1ZSAgICAgICAgICAgICAgICAgICAgLy8gIzExMTNcbiAgICAgICAgICBpZiAoIUlFX1ZFUlNJT04pIGRvbS5ub2RlVmFsdWUgPSB2YWx1ZSAgLy8gIzE2MjUgSUUgdGhyb3dzIGhlcmUsIG5vZGVWYWx1ZVxuICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIGJlIGF2YWlsYWJsZSBvbiAndXBkYXRlZCdcbiAgICAgICAgZWxzZSBkb20ubm9kZVZhbHVlID0gdmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIH5+IzE2MTI6IGxvb2sgZm9yIGNoYW5nZXMgaW4gZG9tLnZhbHVlIHdoZW4gdXBkYXRpbmcgdGhlIHZhbHVlfn5cbiAgICBpZiAoYXR0ck5hbWUgPT09ICd2YWx1ZScpIHtcbiAgICAgIGlmIChkb20udmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIGRvbS52YWx1ZSA9IHZhbHVlXG4gICAgICAgIHNldEF0dHIoZG9tLCBhdHRyTmFtZSwgdmFsdWUpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVtb3ZlIG9yaWdpbmFsIGF0dHJpYnV0ZVxuICAgICAgcmVtQXR0cihkb20sIGF0dHJOYW1lKVxuICAgIH1cblxuICAgIC8vIGV2ZW50IGhhbmRsZXJcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHNldEV2ZW50SGFuZGxlcihhdHRyTmFtZSwgdmFsdWUsIGRvbSwgdGFnKVxuXG4gICAgLy8gaWYtIGNvbmRpdGlvbmFsXG4gICAgfSBlbHNlIGlmIChhdHRyTmFtZSA9PSAnaWYnKSB7XG4gICAgICB2YXIgc3R1YiA9IGV4cHIuc3R1YixcbiAgICAgICAgYWRkID0gZnVuY3Rpb24oKSB7IGluc2VydFRvKHN0dWIucGFyZW50Tm9kZSwgc3R1YiwgZG9tKSB9LFxuICAgICAgICByZW1vdmUgPSBmdW5jdGlvbigpIHsgaW5zZXJ0VG8oZG9tLnBhcmVudE5vZGUsIGRvbSwgc3R1YikgfVxuXG4gICAgICAvLyBhZGQgdG8gRE9NXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHN0dWIpIHtcbiAgICAgICAgICBhZGQoKVxuICAgICAgICAgIGRvbS5pblN0dWIgPSBmYWxzZVxuICAgICAgICAgIC8vIGF2b2lkIHRvIHRyaWdnZXIgdGhlIG1vdW50IGV2ZW50IGlmIHRoZSB0YWdzIGlzIG5vdCB2aXNpYmxlIHlldFxuICAgICAgICAgIC8vIG1heWJlIHdlIGNhbiBvcHRpbWl6ZSB0aGlzIGF2b2lkaW5nIHRvIG1vdW50IHRoZSB0YWcgYXQgYWxsXG4gICAgICAgICAgaWYgKCFpc0luU3R1Yihkb20pKSB7XG4gICAgICAgICAgICB3YWxrKGRvbSwgZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgaWYgKGVsLl90YWcgJiYgIWVsLl90YWcuaXNNb3VudGVkKVxuICAgICAgICAgICAgICAgIGVsLl90YWcuaXNNb3VudGVkID0gISFlbC5fdGFnLnRyaWdnZXIoJ21vdW50JylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAvLyByZW1vdmUgZnJvbSBET01cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0dWIgPSBleHByLnN0dWIgPSBzdHViIHx8IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKVxuICAgICAgICAvLyBpZiB0aGUgcGFyZW50Tm9kZSBpcyBkZWZpbmVkIHdlIGNhbiBlYXNpbHkgcmVwbGFjZSB0aGUgdGFnXG4gICAgICAgIGlmIChkb20ucGFyZW50Tm9kZSlcbiAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAvLyBvdGhlcndpc2Ugd2UgbmVlZCB0byB3YWl0IHRoZSB1cGRhdGVkIGV2ZW50XG4gICAgICAgIGVsc2UgKHRhZy5wYXJlbnQgfHwgdGFnKS5vbmUoJ3VwZGF0ZWQnLCByZW1vdmUpXG5cbiAgICAgICAgZG9tLmluU3R1YiA9IHRydWVcbiAgICAgIH1cbiAgICAvLyBzaG93IC8gaGlkZVxuICAgIH0gZWxzZSBpZiAoYXR0ck5hbWUgPT09ICdzaG93Jykge1xuICAgICAgZG9tLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnXG5cbiAgICB9IGVsc2UgaWYgKGF0dHJOYW1lID09PSAnaGlkZScpIHtcbiAgICAgIGRvbS5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnbm9uZScgOiAnJ1xuXG4gICAgfSBlbHNlIGlmIChleHByLmJvb2wpIHtcbiAgICAgIGRvbVthdHRyTmFtZV0gPSB2YWx1ZVxuICAgICAgaWYgKHZhbHVlKSBzZXRBdHRyKGRvbSwgYXR0ck5hbWUsIGF0dHJOYW1lKVxuICAgICAgaWYgKEZJUkVGT1ggJiYgYXR0ck5hbWUgPT09ICdzZWxlY3RlZCcgJiYgZG9tLnRhZ05hbWUgPT09ICdPUFRJT04nKSB7XG4gICAgICAgIGRvbS5fX3Jpb3QxMzc0ID0gdmFsdWUgICAvLyAjMTM3NFxuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMCB8fCB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgIT09IFRfT0JKRUNUKSB7XG4gICAgICAvLyA8aW1nIHNyYz1cInsgZXhwciB9XCI+XG4gICAgICBpZiAoc3RhcnRzV2l0aChhdHRyTmFtZSwgUklPVF9QUkVGSVgpICYmIGF0dHJOYW1lICE9IFJJT1RfVEFHKSB7XG4gICAgICAgIGF0dHJOYW1lID0gYXR0ck5hbWUuc2xpY2UoUklPVF9QUkVGSVgubGVuZ3RoKVxuICAgICAgfVxuICAgICAgc2V0QXR0cihkb20sIGF0dHJOYW1lLCB2YWx1ZSlcbiAgICB9XG5cbiAgfSlcblxufVxuLyoqXG4gKiBTcGVjaWFsaXplZCBmdW5jdGlvbiBmb3IgbG9vcGluZyBhbiBhcnJheS1saWtlIGNvbGxlY3Rpb24gd2l0aCBgZWFjaD17fWBcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBlbHMgLSBjb2xsZWN0aW9uIG9mIGl0ZW1zXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsgQXJyYXkgfSB0aGUgYXJyYXkgbG9vcGVkXG4gKi9cbmZ1bmN0aW9uIGVhY2goZWxzLCBmbikge1xuICB2YXIgbGVuID0gZWxzID8gZWxzLmxlbmd0aCA6IDBcblxuICBmb3IgKHZhciBpID0gMCwgZWw7IGkgPCBsZW47IGkrKykge1xuICAgIGVsID0gZWxzW2ldXG4gICAgLy8gcmV0dXJuIGZhbHNlIC0+IGN1cnJlbnQgaXRlbSB3YXMgcmVtb3ZlZCBieSBmbiBkdXJpbmcgdGhlIGxvb3BcbiAgICBpZiAoZWwgIT0gbnVsbCAmJiBmbihlbCwgaSkgPT09IGZhbHNlKSBpLS1cbiAgfVxuICByZXR1cm4gZWxzXG59XG5cbi8qKlxuICogRGV0ZWN0IGlmIHRoZSBhcmd1bWVudCBwYXNzZWQgaXMgYSBmdW5jdGlvblxuICogQHBhcmFtICAgeyAqIH0gdiAtIHdoYXRldmVyIHlvdSB3YW50IHRvIHBhc3MgdG8gdGhpcyBmdW5jdGlvblxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSBUX0ZVTkNUSU9OIHx8IGZhbHNlICAgLy8gYXZvaWQgSUUgcHJvYmxlbXNcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG91dGVyIGh0bWwgb2YgYW55IERPTSBub2RlIFNWR3MgaW5jbHVkZWRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZWwgLSBET00gbm9kZSB0byBwYXJzZVxuICogQHJldHVybnMgeyBTdHJpbmcgfSBlbC5vdXRlckhUTUxcbiAqL1xuZnVuY3Rpb24gZ2V0T3V0ZXJIVE1MKGVsKSB7XG4gIGlmIChlbC5vdXRlckhUTUwpIHJldHVybiBlbC5vdXRlckhUTUxcbiAgLy8gc29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCBvdXRlckhUTUwgb24gdGhlIFNWR3MgdGFnc1xuICBlbHNlIHtcbiAgICB2YXIgY29udGFpbmVyID0gbWtFbCgnZGl2JylcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWwuY2xvbmVOb2RlKHRydWUpKVxuICAgIHJldHVybiBjb250YWluZXIuaW5uZXJIVE1MXG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgdGhlIGlubmVyIGh0bWwgb2YgYW55IERPTSBub2RlIFNWR3MgaW5jbHVkZWRcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGNvbnRhaW5lciAtIERPTSBub2RlIHdoZXJlIHdlIHdpbGwgaW5qZWN0IHRoZSBuZXcgaHRtbFxuICogQHBhcmFtIHsgU3RyaW5nIH0gaHRtbCAtIGh0bWwgdG8gaW5qZWN0XG4gKi9cbmZ1bmN0aW9uIHNldElubmVySFRNTChjb250YWluZXIsIGh0bWwpIHtcbiAgaWYgKHR5cGVvZiBjb250YWluZXIuaW5uZXJIVE1MICE9IFRfVU5ERUYpIGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sXG4gIC8vIHNvbWUgYnJvd3NlcnMgZG8gbm90IHN1cHBvcnQgaW5uZXJIVE1MIG9uIHRoZSBTVkdzIHRhZ3NcbiAgZWxzZSB7XG4gICAgdmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ2FwcGxpY2F0aW9uL3htbCcpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgY29udGFpbmVyLm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShkb2MuZG9jdW1lbnRFbGVtZW50LCB0cnVlKVxuICAgIClcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyB3ZXRoZXIgYSBET00gbm9kZSBtdXN0IGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhbiBzdmcgZG9jdW1lbnRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gIG5hbWUgLSB0YWcgbmFtZVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1NWR1RhZyhuYW1lKSB7XG4gIHJldHVybiB+U1ZHX1RBR1NfTElTVC5pbmRleE9mKG5hbWUpXG59XG5cbi8qKlxuICogRGV0ZWN0IGlmIHRoZSBhcmd1bWVudCBwYXNzZWQgaXMgYW4gb2JqZWN0LCBleGNsdWRlIG51bGwuXG4gKiBOT1RFOiBVc2UgaXNPYmplY3QoeCkgJiYgIWlzQXJyYXkoeCkgdG8gZXhjbHVkZXMgYXJyYXlzLlxuICogQHBhcmFtICAgeyAqIH0gdiAtIHdoYXRldmVyIHlvdSB3YW50IHRvIHBhc3MgdG8gdGhpcyBmdW5jdGlvblxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2KSB7XG4gIHJldHVybiB2ICYmIHR5cGVvZiB2ID09PSBUX09CSkVDVCAgICAgICAgIC8vIHR5cGVvZiBudWxsIGlzICdvYmplY3QnXG59XG5cbi8qKlxuICogUmVtb3ZlIGFueSBET00gYXR0cmlidXRlIGZyb20gYSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHJlbW92ZVxuICovXG5mdW5jdGlvbiByZW1BdHRyKGRvbSwgbmFtZSkge1xuICBkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG59XG5cbi8qKlxuICogQ29udmVydCBhIHN0cmluZyBjb250YWluaW5nIGRhc2hlcyB0byBjYW1lbCBjYXNlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHN0cmluZyAtIGlucHV0IHN0cmluZ1xuICogQHJldHVybnMgeyBTdHJpbmcgfSBteS1zdHJpbmcgLT4gbXlTdHJpbmdcbiAqL1xuZnVuY3Rpb24gdG9DYW1lbChzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8tKFxcdykvZywgZnVuY3Rpb24oXywgYykge1xuICAgIHJldHVybiBjLnRvVXBwZXJDYXNlKClcbiAgfSlcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHZhbHVlIG9mIGFueSBET00gYXR0cmlidXRlIG9uIGEgbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgd2Ugd2FudCB0byBnZXRcbiAqIEByZXR1cm5zIHsgU3RyaW5nIHwgdW5kZWZpbmVkIH0gbmFtZSBvZiB0aGUgbm9kZSBhdHRyaWJ1dGUgd2hldGhlciBpdCBleGlzdHNcbiAqL1xuZnVuY3Rpb24gZ2V0QXR0cihkb20sIG5hbWUpIHtcbiAgcmV0dXJuIGRvbS5nZXRBdHRyaWJ1dGUobmFtZSlcbn1cblxuLyoqXG4gKiBTZXQgYW55IERPTS9TVkcgYXR0cmlidXRlXG4gKiBAcGFyYW0geyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHVwZGF0ZVxuICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gc2V0XG4gKiBAcGFyYW0geyBTdHJpbmcgfSB2YWwgLSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgd2Ugd2FudCB0byBzZXRcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cihkb20sIG5hbWUsIHZhbCkge1xuICB2YXIgeGxpbmsgPSBYTElOS19SRUdFWC5leGVjKG5hbWUpXG4gIGlmICh4bGluayAmJiB4bGlua1sxXSlcbiAgICBkb20uc2V0QXR0cmlidXRlTlMoWExJTktfTlMsIHhsaW5rWzFdLCB2YWwpXG4gIGVsc2VcbiAgICBkb20uc2V0QXR0cmlidXRlKG5hbWUsIHZhbClcbn1cblxuLyoqXG4gKiBEZXRlY3QgdGhlIHRhZyBpbXBsZW1lbnRhdGlvbiBieSBhIERPTSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIG5lZWQgdG8gcGFyc2UgdG8gZ2V0IGl0cyB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gaXQgcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgaW1wbGVtZW50YXRpb24gb2YgYSBjdXN0b20gdGFnICh0ZW1wbGF0ZSBhbmQgYm9vdCBmdW5jdGlvbilcbiAqL1xuZnVuY3Rpb24gZ2V0VGFnKGRvbSkge1xuICByZXR1cm4gZG9tLnRhZ05hbWUgJiYgX190YWdJbXBsW2dldEF0dHIoZG9tLCBSSU9UX1RBR19JUykgfHxcbiAgICBnZXRBdHRyKGRvbSwgUklPVF9UQUcpIHx8IGRvbS50YWdOYW1lLnRvTG93ZXJDYXNlKCldXG59XG4vKipcbiAqIEFkZCBhIGNoaWxkIHRhZyB0byBpdHMgcGFyZW50IGludG8gdGhlIGB0YWdzYCBvYmplY3RcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gdGFnIC0gY2hpbGQgdGFnIGluc3RhbmNlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRhZ05hbWUgLSBrZXkgd2hlcmUgdGhlIG5ldyB0YWcgd2lsbCBiZSBzdG9yZWRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gcGFyZW50IC0gdGFnIGluc3RhbmNlIHdoZXJlIHRoZSBuZXcgY2hpbGQgdGFnIHdpbGwgYmUgaW5jbHVkZWRcbiAqL1xuZnVuY3Rpb24gYWRkQ2hpbGRUYWcodGFnLCB0YWdOYW1lLCBwYXJlbnQpIHtcbiAgdmFyIGNhY2hlZFRhZyA9IHBhcmVudC50YWdzW3RhZ05hbWVdXG5cbiAgLy8gaWYgdGhlcmUgYXJlIG11bHRpcGxlIGNoaWxkcmVuIHRhZ3MgaGF2aW5nIHRoZSBzYW1lIG5hbWVcbiAgaWYgKGNhY2hlZFRhZykge1xuICAgIC8vIGlmIHRoZSBwYXJlbnQgdGFncyBwcm9wZXJ0eSBpcyBub3QgeWV0IGFuIGFycmF5XG4gICAgLy8gY3JlYXRlIGl0IGFkZGluZyB0aGUgZmlyc3QgY2FjaGVkIHRhZ1xuICAgIGlmICghaXNBcnJheShjYWNoZWRUYWcpKVxuICAgICAgLy8gZG9uJ3QgYWRkIHRoZSBzYW1lIHRhZyB0d2ljZVxuICAgICAgaWYgKGNhY2hlZFRhZyAhPT0gdGFnKVxuICAgICAgICBwYXJlbnQudGFnc1t0YWdOYW1lXSA9IFtjYWNoZWRUYWddXG4gICAgLy8gYWRkIHRoZSBuZXcgbmVzdGVkIHRhZyB0byB0aGUgYXJyYXlcbiAgICBpZiAoIWNvbnRhaW5zKHBhcmVudC50YWdzW3RhZ05hbWVdLCB0YWcpKVxuICAgICAgcGFyZW50LnRhZ3NbdGFnTmFtZV0ucHVzaCh0YWcpXG4gIH0gZWxzZSB7XG4gICAgcGFyZW50LnRhZ3NbdGFnTmFtZV0gPSB0YWdcbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgdGhlIHBvc2l0aW9uIG9mIGEgY3VzdG9tIHRhZyBpbiBpdHMgcGFyZW50IHRhZ1xuICogQHBhcmFtICAgeyBPYmplY3QgfSB0YWcgLSBjaGlsZCB0YWcgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIGtleSB3aGVyZSB0aGUgdGFnIHdhcyBzdG9yZWRcbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gbmV3UG9zIC0gaW5kZXggd2hlcmUgdGhlIG5ldyB0YWcgd2lsbCBiZSBzdG9yZWRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkVGFnKHRhZywgdGFnTmFtZSwgbmV3UG9zKSB7XG4gIHZhciBwYXJlbnQgPSB0YWcucGFyZW50LFxuICAgIHRhZ3NcbiAgLy8gbm8gcGFyZW50IG5vIG1vdmVcbiAgaWYgKCFwYXJlbnQpIHJldHVyblxuXG4gIHRhZ3MgPSBwYXJlbnQudGFnc1t0YWdOYW1lXVxuXG4gIGlmIChpc0FycmF5KHRhZ3MpKVxuICAgIHRhZ3Muc3BsaWNlKG5ld1BvcywgMCwgdGFncy5zcGxpY2UodGFncy5pbmRleE9mKHRhZyksIDEpWzBdKVxuICBlbHNlIGFkZENoaWxkVGFnKHRhZywgdGFnTmFtZSwgcGFyZW50KVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBjaGlsZCB0YWcgaW5jbHVkaW5nIGl0IGNvcnJlY3RseSBpbnRvIGl0cyBwYXJlbnRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY2hpbGQgLSBjaGlsZCB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBvcHRpb25zIGNvbnRhaW5pbmcgdGhlIERPTSBub2RlIHdoZXJlIHRoZSB0YWcgd2lsbCBiZSBtb3VudGVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGlubmVySFRNTCAtIGlubmVyIGh0bWwgb2YgdGhlIGNoaWxkIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gcGFyZW50IC0gaW5zdGFuY2Ugb2YgdGhlIHBhcmVudCB0YWcgaW5jbHVkaW5nIHRoZSBjaGlsZCBjdXN0b20gdGFnXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGluc3RhbmNlIG9mIHRoZSBuZXcgY2hpbGQgdGFnIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiBpbml0Q2hpbGRUYWcoY2hpbGQsIG9wdHMsIGlubmVySFRNTCwgcGFyZW50KSB7XG4gIHZhciB0YWcgPSBuZXcgVGFnKGNoaWxkLCBvcHRzLCBpbm5lckhUTUwpLFxuICAgIHRhZ05hbWUgPSBnZXRUYWdOYW1lKG9wdHMucm9vdCksXG4gICAgcHRhZyA9IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyhwYXJlbnQpXG4gIC8vIGZpeCBmb3IgdGhlIHBhcmVudCBhdHRyaWJ1dGUgaW4gdGhlIGxvb3BlZCBlbGVtZW50c1xuICB0YWcucGFyZW50ID0gcHRhZ1xuICAvLyBzdG9yZSB0aGUgcmVhbCBwYXJlbnQgdGFnXG4gIC8vIGluIHNvbWUgY2FzZXMgdGhpcyBjb3VsZCBiZSBkaWZmZXJlbnQgZnJvbSB0aGUgY3VzdG9tIHBhcmVudCB0YWdcbiAgLy8gZm9yIGV4YW1wbGUgaW4gbmVzdGVkIGxvb3BzXG4gIHRhZy5fcGFyZW50ID0gcGFyZW50XG5cbiAgLy8gYWRkIHRoaXMgdGFnIHRvIHRoZSBjdXN0b20gcGFyZW50IHRhZ1xuICBhZGRDaGlsZFRhZyh0YWcsIHRhZ05hbWUsIHB0YWcpXG4gIC8vIGFuZCBhbHNvIHRvIHRoZSByZWFsIHBhcmVudCB0YWdcbiAgaWYgKHB0YWcgIT09IHBhcmVudClcbiAgICBhZGRDaGlsZFRhZyh0YWcsIHRhZ05hbWUsIHBhcmVudClcbiAgLy8gZW1wdHkgdGhlIGNoaWxkIG5vZGUgb25jZSB3ZSBnb3QgaXRzIHRlbXBsYXRlXG4gIC8vIHRvIGF2b2lkIHRoYXQgaXRzIGNoaWxkcmVuIGdldCBjb21waWxlZCBtdWx0aXBsZSB0aW1lc1xuICBvcHRzLnJvb3QuaW5uZXJIVE1MID0gJydcblxuICByZXR1cm4gdGFnXG59XG5cbi8qKlxuICogTG9vcCBiYWNrd2FyZCBhbGwgdGhlIHBhcmVudHMgdHJlZSB0byBkZXRlY3QgdGhlIGZpcnN0IGN1c3RvbSBwYXJlbnQgdGFnXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHRhZyAtIGEgVGFnIGluc3RhbmNlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IHRoZSBpbnN0YW5jZSBvZiB0aGUgZmlyc3QgY3VzdG9tIHBhcmVudCB0YWcgZm91bmRcbiAqL1xuZnVuY3Rpb24gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRhZykge1xuICB2YXIgcHRhZyA9IHRhZ1xuICB3aGlsZSAoIWdldFRhZyhwdGFnLnJvb3QpKSB7XG4gICAgaWYgKCFwdGFnLnBhcmVudCkgYnJlYWtcbiAgICBwdGFnID0gcHRhZy5wYXJlbnRcbiAgfVxuICByZXR1cm4gcHRhZ1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgYW4gaW1tdXRhYmxlIHByb3BlcnR5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGVsIC0gb2JqZWN0IHdoZXJlIHRoZSBuZXcgcHJvcGVydHkgd2lsbCBiZSBzZXRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0ga2V5IC0gb2JqZWN0IGtleSB3aGVyZSB0aGUgbmV3IHByb3BlcnR5IHdpbGwgYmUgc3RvcmVkXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtIHZhbHVlIG9mIHRoZSBuZXcgcHJvcGVydHlcbiogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRpb25zIC0gc2V0IHRoZSBwcm9wZXJ5IG92ZXJyaWRpbmcgdGhlIGRlZmF1bHQgb3B0aW9uc1xuICogQHJldHVybnMgeyBPYmplY3QgfSAtIHRoZSBpbml0aWFsIG9iamVjdFxuICovXG5mdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShlbCwga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIGtleSwgZXh0ZW5kKHtcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9LCBvcHRpb25zKSlcbiAgcmV0dXJuIGVsXG59XG5cbi8qKlxuICogR2V0IHRoZSB0YWcgbmFtZSBvZiBhbnkgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byBwYXJzZVxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lIHRvIGlkZW50aWZ5IHRoaXMgZG9tIG5vZGUgaW4gcmlvdFxuICovXG5mdW5jdGlvbiBnZXRUYWdOYW1lKGRvbSkge1xuICB2YXIgY2hpbGQgPSBnZXRUYWcoZG9tKSxcbiAgICBuYW1lZFRhZyA9IGdldEF0dHIoZG9tLCAnbmFtZScpLFxuICAgIHRhZ05hbWUgPSBuYW1lZFRhZyAmJiAhdG1wbC5oYXNFeHByKG5hbWVkVGFnKSA/XG4gICAgICAgICAgICAgICAgbmFtZWRUYWcgOlxuICAgICAgICAgICAgICBjaGlsZCA/IGNoaWxkLm5hbWUgOiBkb20udGFnTmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgcmV0dXJuIHRhZ05hbWVcbn1cblxuLyoqXG4gKiBFeHRlbmQgYW55IG9iamVjdCB3aXRoIG90aGVyIHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gc3JjIC0gc291cmNlIG9iamVjdFxuICogQHJldHVybnMgeyBPYmplY3QgfSB0aGUgcmVzdWx0aW5nIGV4dGVuZGVkIG9iamVjdFxuICpcbiAqIHZhciBvYmogPSB7IGZvbzogJ2JheicgfVxuICogZXh0ZW5kKG9iaiwge2JhcjogJ2JhcicsIGZvbzogJ2Jhcid9KVxuICogY29uc29sZS5sb2cob2JqKSA9PiB7YmFyOiAnYmFyJywgZm9vOiAnYmFyJ31cbiAqXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChzcmMpIHtcbiAgdmFyIG9iaiwgYXJncyA9IGFyZ3VtZW50c1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAob2JqID0gYXJnc1tpXSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugb2JqZWN0IGNvdWxkIGJlIG92ZXJyaWRkZW5cbiAgICAgICAgaWYgKGlzV3JpdGFibGUoc3JjLCBrZXkpKVxuICAgICAgICAgIHNyY1trZXldID0gb2JqW2tleV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNyY1xufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gYXJyYXkgY29udGFpbnMgYW4gaXRlbVxuICogQHBhcmFtICAgeyBBcnJheSB9IGFyciAtIHRhcmdldCBhcnJheVxuICogQHBhcmFtICAgeyAqIH0gaXRlbSAtIGl0ZW0gdG8gdGVzdFxuICogQHJldHVybnMgeyBCb29sZWFuIH0gRG9lcyAnYXJyJyBjb250YWluICdpdGVtJz9cbiAqL1xuZnVuY3Rpb24gY29udGFpbnMoYXJyLCBpdGVtKSB7XG4gIHJldHVybiB+YXJyLmluZGV4T2YoaXRlbSlcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIG9iamVjdCBpcyBhIGtpbmQgb2YgYXJyYXlcbiAqIEBwYXJhbSAgIHsgKiB9IGEgLSBhbnl0aGluZ1xuICogQHJldHVybnMge0Jvb2xlYW59IGlzICdhJyBhbiBhcnJheT9cbiAqL1xuZnVuY3Rpb24gaXNBcnJheShhKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGEpIHx8IGEgaW5zdGFuY2VvZiBBcnJheSB9XG5cbi8qKlxuICogRGV0ZWN0IHdoZXRoZXIgYSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgY291bGQgYmUgb3ZlcnJpZGRlblxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgb2JqIC0gc291cmNlIG9iamVjdFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAga2V5IC0gb2JqZWN0IHByb3BlcnR5XG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSBpcyB0aGlzIHByb3BlcnR5IHdyaXRhYmxlP1xuICovXG5mdW5jdGlvbiBpc1dyaXRhYmxlKG9iaiwga2V5KSB7XG4gIHZhciBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpXG4gIHJldHVybiB0eXBlb2Ygb2JqW2tleV0gPT09IFRfVU5ERUYgfHwgcHJvcHMgJiYgcHJvcHMud3JpdGFibGVcbn1cblxuXG4vKipcbiAqIFdpdGggdGhpcyBmdW5jdGlvbiB3ZSBhdm9pZCB0aGF0IHRoZSBpbnRlcm5hbCBUYWcgbWV0aG9kcyBnZXQgb3ZlcnJpZGRlblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkYXRhIC0gb3B0aW9ucyB3ZSB3YW50IHRvIHVzZSB0byBleHRlbmQgdGhlIHRhZyBpbnN0YW5jZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBjbGVhbiBvYmplY3Qgd2l0aG91dCBjb250YWluaW5nIHRoZSByaW90IGludGVybmFsIHJlc2VydmVkIHdvcmRzXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXBEYXRhKGRhdGEpIHtcbiAgaWYgKCEoZGF0YSBpbnN0YW5jZW9mIFRhZykgJiYgIShkYXRhICYmIHR5cGVvZiBkYXRhLnRyaWdnZXIgPT0gVF9GVU5DVElPTikpXG4gICAgcmV0dXJuIGRhdGFcblxuICB2YXIgbyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgaWYgKCFSRVNFUlZFRF9XT1JEU19CTEFDS0xJU1QudGVzdChrZXkpKSBvW2tleV0gPSBkYXRhW2tleV1cbiAgfVxuICByZXR1cm4gb1xufVxuXG4vKipcbiAqIFdhbGsgZG93biByZWN1cnNpdmVseSBhbGwgdGhlIGNoaWxkcmVuIHRhZ3Mgc3RhcnRpbmcgZG9tIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gICBkb20gLSBzdGFydGluZyBub2RlIHdoZXJlIHdlIHdpbGwgc3RhcnQgdGhlIHJlY3Vyc2lvblxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgdG8gdHJhbnNmb3JtIHRoZSBjaGlsZCBub2RlIGp1c3QgZm91bmRcbiAqL1xuZnVuY3Rpb24gd2Fsayhkb20sIGZuKSB7XG4gIGlmIChkb20pIHtcbiAgICAvLyBzdG9wIHRoZSByZWN1cnNpb25cbiAgICBpZiAoZm4oZG9tKSA9PT0gZmFsc2UpIHJldHVyblxuICAgIGVsc2Uge1xuICAgICAgZG9tID0gZG9tLmZpcnN0Q2hpbGRcblxuICAgICAgd2hpbGUgKGRvbSkge1xuICAgICAgICB3YWxrKGRvbSwgZm4pXG4gICAgICAgIGRvbSA9IGRvbS5uZXh0U2libGluZ1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1pbmltaXplIHJpc2s6IG9ubHkgemVybyBvciBvbmUgX3NwYWNlXyBiZXR3ZWVuIGF0dHIgJiB2YWx1ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGh0bWwgLSBodG1sIHN0cmluZyB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvbiB0byBhcHBseSBvbiBhbnkgYXR0cmlidXRlIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIHdhbGtBdHRyaWJ1dGVzKGh0bWwsIGZuKSB7XG4gIHZhciBtLFxuICAgIHJlID0gLyhbLVxcd10rKSA/PSA/KD86XCIoW15cIl0qKXwnKFteJ10qKXwoe1tefV0qfSkpL2dcblxuICB3aGlsZSAobSA9IHJlLmV4ZWMoaHRtbCkpIHtcbiAgICBmbihtWzFdLnRvTG93ZXJDYXNlKCksIG1bMl0gfHwgbVszXSB8fCBtWzRdKVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhIERPTSBub2RlIGlzIGluIHN0dWIgbW9kZSwgdXNlZnVsIGZvciB0aGUgcmlvdCAnaWYnIGRpcmVjdGl2ZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byBwYXJzZVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0luU3R1Yihkb20pIHtcbiAgd2hpbGUgKGRvbSkge1xuICAgIGlmIChkb20uaW5TdHViKSByZXR1cm4gdHJ1ZVxuICAgIGRvbSA9IGRvbS5wYXJlbnROb2RlXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZ2VuZXJpYyBET00gbm9kZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgRE9NIG5vZGUgd2Ugd2FudCB0byBjcmVhdGVcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzU3ZnIC0gc2hvdWxkIHdlIHVzZSBhIFNWRyBhcyBwYXJlbnQgbm9kZT9cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gRE9NIG5vZGUganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIG1rRWwobmFtZSwgaXNTdmcpIHtcbiAgcmV0dXJuIGlzU3ZnID9cbiAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpIDpcbiAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpXG59XG5cbi8qKlxuICogU2hvcnRlciBhbmQgZmFzdCB3YXkgdG8gc2VsZWN0IG11bHRpcGxlIG5vZGVzIGluIHRoZSBET01cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc2VsZWN0b3IgLSBET00gc2VsZWN0b3JcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gRE9NIG5vZGUgd2hlcmUgdGhlIHRhcmdldHMgb2Ygb3VyIHNlYXJjaCB3aWxsIGlzIGxvY2F0ZWRcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZG9tIG5vZGVzIGZvdW5kXG4gKi9cbmZ1bmN0aW9uICQkKHNlbGVjdG9yLCBjdHgpIHtcbiAgcmV0dXJuIChjdHggfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG59XG5cbi8qKlxuICogU2hvcnRlciBhbmQgZmFzdCB3YXkgdG8gc2VsZWN0IGEgc2luZ2xlIG5vZGUgaW4gdGhlIERPTVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzZWxlY3RvciAtIHVuaXF1ZSBkb20gc2VsZWN0b3JcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gRE9NIG5vZGUgd2hlcmUgdGhlIHRhcmdldCBvZiBvdXIgc2VhcmNoIHdpbGwgaXMgbG9jYXRlZFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb20gbm9kZSBmb3VuZFxuICovXG5mdW5jdGlvbiAkKHNlbGVjdG9yLCBjdHgpIHtcbiAgcmV0dXJuIChjdHggfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbi8qKlxuICogU2ltcGxlIG9iamVjdCBwcm90b3R5cGFsIGluaGVyaXRhbmNlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHBhcmVudCAtIHBhcmVudCBvYmplY3RcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gY2hpbGQgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gaW5oZXJpdChwYXJlbnQpIHtcbiAgcmV0dXJuIE9iamVjdC5jcmVhdGUocGFyZW50IHx8IG51bGwpXG59XG5cbi8qKlxuICogR2V0IHRoZSBuYW1lIHByb3BlcnR5IG5lZWRlZCB0byBpZGVudGlmeSBhIERPTSBub2RlIGluIHJpb3RcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2UgbmVlZCB0byBwYXJzZVxuICogQHJldHVybnMgeyBTdHJpbmcgfCB1bmRlZmluZWQgfSBnaXZlIHVzIGJhY2sgYSBzdHJpbmcgdG8gaWRlbnRpZnkgdGhpcyBkb20gbm9kZVxuICovXG5mdW5jdGlvbiBnZXROYW1lZEtleShkb20pIHtcbiAgcmV0dXJuIGdldEF0dHIoZG9tLCAnaWQnKSB8fCBnZXRBdHRyKGRvbSwgJ25hbWUnKVxufVxuXG4vKipcbiAqIFNldCB0aGUgbmFtZWQgcHJvcGVydGllcyBvZiBhIHRhZyBlbGVtZW50XG4gKiBAcGFyYW0geyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSBuZWVkIHRvIHBhcnNlXG4gKiBAcGFyYW0geyBPYmplY3QgfSBwYXJlbnQgLSB0YWcgaW5zdGFuY2Ugd2hlcmUgdGhlIG5hbWVkIGRvbSBlbGVtZW50IHdpbGwgYmUgZXZlbnR1YWxseSBhZGRlZFxuICogQHBhcmFtIHsgQXJyYXkgfSBrZXlzIC0gbGlzdCBvZiBhbGwgdGhlIHRhZyBpbnN0YW5jZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIHNldE5hbWVkKGRvbSwgcGFyZW50LCBrZXlzKSB7XG4gIC8vIGdldCB0aGUga2V5IHZhbHVlIHdlIHdhbnQgdG8gYWRkIHRvIHRoZSB0YWcgaW5zdGFuY2VcbiAgdmFyIGtleSA9IGdldE5hbWVkS2V5KGRvbSksXG4gICAgaXNBcnIsXG4gICAgLy8gYWRkIHRoZSBub2RlIGRldGVjdGVkIHRvIGEgdGFnIGluc3RhbmNlIHVzaW5nIHRoZSBuYW1lZCBwcm9wZXJ0eVxuICAgIGFkZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAvLyBhdm9pZCB0byBvdmVycmlkZSB0aGUgdGFnIHByb3BlcnRpZXMgYWxyZWFkeSBzZXRcbiAgICAgIGlmIChjb250YWlucyhrZXlzLCBrZXkpKSByZXR1cm5cbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhpcyB2YWx1ZSBpcyBhbiBhcnJheVxuICAgICAgaXNBcnIgPSBpc0FycmF5KHZhbHVlKVxuICAgICAgLy8gaWYgdGhlIGtleSB3YXMgbmV2ZXIgc2V0XG4gICAgICBpZiAoIXZhbHVlKVxuICAgICAgICAvLyBzZXQgaXQgb25jZSBvbiB0aGUgdGFnIGluc3RhbmNlXG4gICAgICAgIHBhcmVudFtrZXldID0gZG9tXG4gICAgICAvLyBpZiBpdCB3YXMgYW4gYXJyYXkgYW5kIG5vdCB5ZXQgc2V0XG4gICAgICBlbHNlIGlmICghaXNBcnIgfHwgaXNBcnIgJiYgIWNvbnRhaW5zKHZhbHVlLCBkb20pKSB7XG4gICAgICAgIC8vIGFkZCB0aGUgZG9tIG5vZGUgaW50byB0aGUgYXJyYXlcbiAgICAgICAgaWYgKGlzQXJyKVxuICAgICAgICAgIHZhbHVlLnB1c2goZG9tKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgcGFyZW50W2tleV0gPSBbdmFsdWUsIGRvbV1cbiAgICAgIH1cbiAgICB9XG5cbiAgLy8gc2tpcCB0aGUgZWxlbWVudHMgd2l0aCBubyBuYW1lZCBwcm9wZXJ0aWVzXG4gIGlmICgha2V5KSByZXR1cm5cblxuICAvLyBjaGVjayB3aGV0aGVyIHRoaXMga2V5IGhhcyBiZWVuIGFscmVhZHkgZXZhbHVhdGVkXG4gIGlmICh0bXBsLmhhc0V4cHIoa2V5KSlcbiAgICAvLyB3YWl0IHRoZSBmaXJzdCB1cGRhdGVkIGV2ZW50IG9ubHkgb25jZVxuICAgIHBhcmVudC5vbmUoJ21vdW50JywgZnVuY3Rpb24oKSB7XG4gICAgICBrZXkgPSBnZXROYW1lZEtleShkb20pXG4gICAgICBhZGQocGFyZW50W2tleV0pXG4gICAgfSlcbiAgZWxzZVxuICAgIGFkZChwYXJlbnRba2V5XSlcblxufVxuXG4vKipcbiAqIEZhc3RlciBTdHJpbmcgc3RhcnRzV2l0aCBhbHRlcm5hdGl2ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzcmMgLSBzb3VyY2Ugc3RyaW5nXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHN0ciAtIHRlc3Qgc3RyaW5nXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3JjLCBzdHIpIHtcbiAgcmV0dXJuIHNyYy5zbGljZSgwLCBzdHIubGVuZ3RoKSA9PT0gc3RyXG59XG5cbi8qKlxuICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZ1bmN0aW9uXG4gKiBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzE1Nzk2NzEsIGxpY2Vuc2UgTUlUXG4gKi9cbnZhciByQUYgPSAoZnVuY3Rpb24gKHcpIHtcbiAgdmFyIHJhZiA9IHcucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgICAgICB3Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuXG4gIGlmICghcmFmIHx8IC9pUChhZHxob25lfG9kKS4qT1MgNi8udGVzdCh3Lm5hdmlnYXRvci51c2VyQWdlbnQpKSB7ICAvLyBidWdneSBpT1M2XG4gICAgdmFyIGxhc3RUaW1lID0gMFxuXG4gICAgcmFmID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICB2YXIgbm93dGltZSA9IERhdGUubm93KCksIHRpbWVvdXQgPSBNYXRoLm1heCgxNiAtIChub3d0aW1lIC0gbGFzdFRpbWUpLCAwKVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGNiKGxhc3RUaW1lID0gbm93dGltZSArIHRpbWVvdXQpIH0sIHRpbWVvdXQpXG4gICAgfVxuICB9XG4gIHJldHVybiByYWZcblxufSkod2luZG93IHx8IHt9KVxuXG4vKipcbiAqIE1vdW50IGEgdGFnIGNyZWF0aW5nIG5ldyBUYWcgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gcm9vdCAtIGRvbSBub2RlIHdoZXJlIHRoZSB0YWcgd2lsbCBiZSBtb3VudGVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRhZ05hbWUgLSBuYW1lIG9mIHRoZSByaW90IHRhZyB3ZSB3YW50IHRvIG1vdW50XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdHMgLSBvcHRpb25zIHRvIHBhc3MgdG8gdGhlIFRhZyBpbnN0YW5jZVxuICogQHJldHVybnMgeyBUYWcgfSBhIG5ldyBUYWcgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gbW91bnRUbyhyb290LCB0YWdOYW1lLCBvcHRzKSB7XG4gIHZhciB0YWcgPSBfX3RhZ0ltcGxbdGFnTmFtZV0sXG4gICAgLy8gY2FjaGUgdGhlIGlubmVyIEhUTUwgdG8gZml4ICM4NTVcbiAgICBpbm5lckhUTUwgPSByb290Ll9pbm5lckhUTUwgPSByb290Ll9pbm5lckhUTUwgfHwgcm9vdC5pbm5lckhUTUxcblxuICAvLyBjbGVhciB0aGUgaW5uZXIgaHRtbFxuICByb290LmlubmVySFRNTCA9ICcnXG5cbiAgaWYgKHRhZyAmJiByb290KSB0YWcgPSBuZXcgVGFnKHRhZywgeyByb290OiByb290LCBvcHRzOiBvcHRzIH0sIGlubmVySFRNTClcblxuICBpZiAodGFnICYmIHRhZy5tb3VudCkge1xuICAgIHRhZy5tb3VudCgpXG4gICAgLy8gYWRkIHRoaXMgdGFnIHRvIHRoZSB2aXJ0dWFsRG9tIHZhcmlhYmxlXG4gICAgaWYgKCFjb250YWlucyhfX3ZpcnR1YWxEb20sIHRhZykpIF9fdmlydHVhbERvbS5wdXNoKHRhZylcbiAgfVxuXG4gIHJldHVybiB0YWdcbn1cbi8qKlxuICogUmlvdCBwdWJsaWMgYXBpXG4gKi9cblxuLy8gc2hhcmUgbWV0aG9kcyBmb3Igb3RoZXIgcmlvdCBwYXJ0cywgZS5nLiBjb21waWxlclxucmlvdC51dGlsID0geyBicmFja2V0czogYnJhY2tldHMsIHRtcGw6IHRtcGwgfVxuXG4vKipcbiAqIENyZWF0ZSBhIG1peGluIHRoYXQgY291bGQgYmUgZ2xvYmFsbHkgc2hhcmVkIGFjcm9zcyBhbGwgdGhlIHRhZ3NcbiAqL1xucmlvdC5taXhpbiA9IChmdW5jdGlvbigpIHtcbiAgdmFyIG1peGlucyA9IHt9LFxuICAgIGdsb2JhbHMgPSBtaXhpbnNbR0xPQkFMX01JWElOXSA9IHt9LFxuICAgIF9pZCA9IDBcblxuICAvKipcbiAgICogQ3JlYXRlL1JldHVybiBhIG1peGluIGJ5IGl0cyBuYW1lXG4gICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gIG5hbWUgLSBtaXhpbiBuYW1lIChnbG9iYWwgbWl4aW4gaWYgb2JqZWN0KVxuICAgKiBAcGFyYW0gICB7IE9iamVjdCB9ICBtaXhpbiAtIG1peGluIGxvZ2ljXG4gICAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGcgLSBpcyBnbG9iYWw/XG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gIHRoZSBtaXhpbiBsb2dpY1xuICAgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUsIG1peGluLCBnKSB7XG4gICAgLy8gVW5uYW1lZCBnbG9iYWxcbiAgICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICAgIHJpb3QubWl4aW4oJ19fdW5uYW1lZF8nK19pZCsrLCBuYW1lLCB0cnVlKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdmFyIHN0b3JlID0gZyA/IGdsb2JhbHMgOiBtaXhpbnNcblxuICAgIC8vIEdldHRlclxuICAgIGlmICghbWl4aW4pIHtcbiAgICAgIGlmICh0eXBlb2Ygc3RvcmVbbmFtZV0gPT09IFRfVU5ERUYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnJlZ2lzdGVyZWQgbWl4aW46ICcgKyBuYW1lKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlW25hbWVdXG4gICAgfVxuICAgIC8vIFNldHRlclxuICAgIGlmIChpc0Z1bmN0aW9uKG1peGluKSkge1xuICAgICAgZXh0ZW5kKG1peGluLnByb3RvdHlwZSwgc3RvcmVbbmFtZV0gfHwge30pXG4gICAgICBzdG9yZVtuYW1lXSA9IG1peGluXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RvcmVbbmFtZV0gPSBleHRlbmQoc3RvcmVbbmFtZV0gfHwge30sIG1peGluKVxuICAgIH1cbiAgfVxuXG59KSgpXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJpb3QgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgbmFtZSAtIG5hbWUvaWQgb2YgdGhlIG5ldyByaW90IHRhZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGh0bWwgLSB0YWcgdGVtcGxhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBjc3MgLSBjdXN0b20gdGFnIGNzc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGF0dHJzIC0gcm9vdCB0YWcgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gdXNlciBmdW5jdGlvblxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lL2lkIG9mIHRoZSB0YWcganVzdCBjcmVhdGVkXG4gKi9cbnJpb3QudGFnID0gZnVuY3Rpb24obmFtZSwgaHRtbCwgY3NzLCBhdHRycywgZm4pIHtcbiAgaWYgKGlzRnVuY3Rpb24oYXR0cnMpKSB7XG4gICAgZm4gPSBhdHRyc1xuICAgIGlmICgvXltcXHdcXC1dK1xccz89Ly50ZXN0KGNzcykpIHtcbiAgICAgIGF0dHJzID0gY3NzXG4gICAgICBjc3MgPSAnJ1xuICAgIH0gZWxzZSBhdHRycyA9ICcnXG4gIH1cbiAgaWYgKGNzcykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNzcykpIGZuID0gY3NzXG4gICAgZWxzZSBzdHlsZU1hbmFnZXIuYWRkKGNzcylcbiAgfVxuICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIF9fdGFnSW1wbFtuYW1lXSA9IHsgbmFtZTogbmFtZSwgdG1wbDogaHRtbCwgYXR0cnM6IGF0dHJzLCBmbjogZm4gfVxuICByZXR1cm4gbmFtZVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyByaW90IHRhZyBpbXBsZW1lbnRhdGlvbiAoZm9yIHVzZSBieSB0aGUgY29tcGlsZXIpXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgbmFtZSAtIG5hbWUvaWQgb2YgdGhlIG5ldyByaW90IHRhZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGh0bWwgLSB0YWcgdGVtcGxhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBjc3MgLSBjdXN0b20gdGFnIGNzc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGF0dHJzIC0gcm9vdCB0YWcgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gdXNlciBmdW5jdGlvblxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lL2lkIG9mIHRoZSB0YWcganVzdCBjcmVhdGVkXG4gKi9cbnJpb3QudGFnMiA9IGZ1bmN0aW9uKG5hbWUsIGh0bWwsIGNzcywgYXR0cnMsIGZuKSB7XG4gIGlmIChjc3MpIHN0eWxlTWFuYWdlci5hZGQoY3NzKVxuICAvL2lmIChicGFpcikgcmlvdC5zZXR0aW5ncy5icmFja2V0cyA9IGJwYWlyXG4gIF9fdGFnSW1wbFtuYW1lXSA9IHsgbmFtZTogbmFtZSwgdG1wbDogaHRtbCwgYXR0cnM6IGF0dHJzLCBmbjogZm4gfVxuICByZXR1cm4gbmFtZVxufVxuXG4vKipcbiAqIE1vdW50IGEgdGFnIHVzaW5nIGEgc3BlY2lmaWMgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHNlbGVjdG9yIC0gdGFnIERPTSBzZWxlY3RvclxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0gdGFnIGltcGxlbWVudGF0aW9uIG5hbWVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBsb2dpY1xuICogQHJldHVybnMgeyBBcnJheSB9IG5ldyB0YWdzIGluc3RhbmNlc1xuICovXG5yaW90Lm1vdW50ID0gZnVuY3Rpb24oc2VsZWN0b3IsIHRhZ05hbWUsIG9wdHMpIHtcblxuICB2YXIgZWxzLFxuICAgIGFsbFRhZ3MsXG4gICAgdGFncyA9IFtdXG5cbiAgLy8gaGVscGVyIGZ1bmN0aW9uc1xuXG4gIGZ1bmN0aW9uIGFkZFJpb3RUYWdzKGFycikge1xuICAgIHZhciBsaXN0ID0gJydcbiAgICBlYWNoKGFyciwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghL1teLVxcd10vLnRlc3QoZSkpIHtcbiAgICAgICAgZSA9IGUudHJpbSgpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbGlzdCArPSAnLFsnICsgUklPVF9UQUdfSVMgKyAnPVwiJyArIGUgKyAnXCJdLFsnICsgUklPVF9UQUcgKyAnPVwiJyArIGUgKyAnXCJdJ1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGxpc3RcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdEFsbFRhZ3MoKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhfX3RhZ0ltcGwpXG4gICAgcmV0dXJuIGtleXMgKyBhZGRSaW90VGFncyhrZXlzKVxuICB9XG5cbiAgZnVuY3Rpb24gcHVzaFRhZ3Mocm9vdCkge1xuICAgIGlmIChyb290LnRhZ05hbWUpIHtcbiAgICAgIHZhciByaW90VGFnID0gZ2V0QXR0cihyb290LCBSSU9UX1RBR19JUykgfHwgZ2V0QXR0cihyb290LCBSSU9UX1RBRylcblxuICAgICAgLy8gaGF2ZSB0YWdOYW1lPyBmb3JjZSByaW90LXRhZyB0byBiZSB0aGUgc2FtZVxuICAgICAgaWYgKHRhZ05hbWUgJiYgcmlvdFRhZyAhPT0gdGFnTmFtZSkge1xuICAgICAgICByaW90VGFnID0gdGFnTmFtZVxuICAgICAgICBzZXRBdHRyKHJvb3QsIFJJT1RfVEFHX0lTLCB0YWdOYW1lKVxuICAgICAgICBzZXRBdHRyKHJvb3QsIFJJT1RfVEFHLCB0YWdOYW1lKSAvLyB0aGlzIHdpbGwgYmUgcmVtb3ZlZCBpbiByaW90IDMuMC4wXG4gICAgICB9XG4gICAgICB2YXIgdGFnID0gbW91bnRUbyhyb290LCByaW90VGFnIHx8IHJvb3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpLCBvcHRzKVxuXG4gICAgICBpZiAodGFnKSB0YWdzLnB1c2godGFnKVxuICAgIH0gZWxzZSBpZiAocm9vdC5sZW5ndGgpIHtcbiAgICAgIGVhY2gocm9vdCwgcHVzaFRhZ3MpICAgLy8gYXNzdW1lIG5vZGVMaXN0XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLS0gbW91bnQgY29kZSAtLS0tLVxuXG4gIC8vIGluamVjdCBzdHlsZXMgaW50byBET01cbiAgc3R5bGVNYW5hZ2VyLmluamVjdCgpXG5cbiAgaWYgKGlzT2JqZWN0KHRhZ05hbWUpKSB7XG4gICAgb3B0cyA9IHRhZ05hbWVcbiAgICB0YWdOYW1lID0gMFxuICB9XG5cbiAgLy8gY3Jhd2wgdGhlIERPTSB0byBmaW5kIHRoZSB0YWdcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gVF9TVFJJTkcpIHtcbiAgICBpZiAoc2VsZWN0b3IgPT09ICcqJylcbiAgICAgIC8vIHNlbGVjdCBhbGwgdGhlIHRhZ3MgcmVnaXN0ZXJlZFxuICAgICAgLy8gYW5kIGFsc28gdGhlIHRhZ3MgZm91bmQgd2l0aCB0aGUgcmlvdC10YWcgYXR0cmlidXRlIHNldFxuICAgICAgc2VsZWN0b3IgPSBhbGxUYWdzID0gc2VsZWN0QWxsVGFncygpXG4gICAgZWxzZVxuICAgICAgLy8gb3IganVzdCB0aGUgb25lcyBuYW1lZCBsaWtlIHRoZSBzZWxlY3RvclxuICAgICAgc2VsZWN0b3IgKz0gYWRkUmlvdFRhZ3Moc2VsZWN0b3Iuc3BsaXQoLywgKi8pKVxuXG4gICAgLy8gbWFrZSBzdXJlIHRvIHBhc3MgYWx3YXlzIGEgc2VsZWN0b3JcbiAgICAvLyB0byB0aGUgcXVlcnlTZWxlY3RvckFsbCBmdW5jdGlvblxuICAgIGVscyA9IHNlbGVjdG9yID8gJCQoc2VsZWN0b3IpIDogW11cbiAgfVxuICBlbHNlXG4gICAgLy8gcHJvYmFibHkgeW91IGhhdmUgcGFzc2VkIGFscmVhZHkgYSB0YWcgb3IgYSBOb2RlTGlzdFxuICAgIGVscyA9IHNlbGVjdG9yXG5cbiAgLy8gc2VsZWN0IGFsbCB0aGUgcmVnaXN0ZXJlZCBhbmQgbW91bnQgdGhlbSBpbnNpZGUgdGhlaXIgcm9vdCBlbGVtZW50c1xuICBpZiAodGFnTmFtZSA9PT0gJyonKSB7XG4gICAgLy8gZ2V0IGFsbCBjdXN0b20gdGFnc1xuICAgIHRhZ05hbWUgPSBhbGxUYWdzIHx8IHNlbGVjdEFsbFRhZ3MoKVxuICAgIC8vIGlmIHRoZSByb290IGVscyBpdCdzIGp1c3QgYSBzaW5nbGUgdGFnXG4gICAgaWYgKGVscy50YWdOYW1lKVxuICAgICAgZWxzID0gJCQodGFnTmFtZSwgZWxzKVxuICAgIGVsc2Uge1xuICAgICAgLy8gc2VsZWN0IGFsbCB0aGUgY2hpbGRyZW4gZm9yIGFsbCB0aGUgZGlmZmVyZW50IHJvb3QgZWxlbWVudHNcbiAgICAgIHZhciBub2RlTGlzdCA9IFtdXG4gICAgICBlYWNoKGVscywgZnVuY3Rpb24gKF9lbCkge1xuICAgICAgICBub2RlTGlzdC5wdXNoKCQkKHRhZ05hbWUsIF9lbCkpXG4gICAgICB9KVxuICAgICAgZWxzID0gbm9kZUxpc3RcbiAgICB9XG4gICAgLy8gZ2V0IHJpZCBvZiB0aGUgdGFnTmFtZVxuICAgIHRhZ05hbWUgPSAwXG4gIH1cblxuICBwdXNoVGFncyhlbHMpXG5cbiAgcmV0dXJuIHRhZ3Ncbn1cblxuLyoqXG4gKiBVcGRhdGUgYWxsIHRoZSB0YWdzIGluc3RhbmNlcyBjcmVhdGVkXG4gKiBAcmV0dXJucyB7IEFycmF5IH0gYWxsIHRoZSB0YWdzIGluc3RhbmNlc1xuICovXG5yaW90LnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZWFjaChfX3ZpcnR1YWxEb20sIGZ1bmN0aW9uKHRhZykge1xuICAgIHRhZy51cGRhdGUoKVxuICB9KVxufVxuXG4vKipcbiAqIEV4cG9ydCB0aGUgVmlydHVhbCBET01cbiAqL1xucmlvdC52ZG9tID0gX192aXJ0dWFsRG9tXG5cbi8qKlxuICogRXhwb3J0IHRoZSBUYWcgY29uc3RydWN0b3JcbiAqL1xucmlvdC5UYWcgPSBUYWdcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cbi8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG5mdW5jdGlvbiBzYWZlUmVnZXggKHJlKSB7XG4gIHZhciBzcmMgPSByZS5zb3VyY2VcbiAgdmFyIG9wdCA9IHJlLmdsb2JhbCA/ICdnJyA6ICcnXG5cbiAgaWYgKHJlLmlnbm9yZUNhc2UpIG9wdCArPSAnaSdcbiAgaWYgKHJlLm11bHRpbGluZSkgIG9wdCArPSAnbSdcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHNyYyA9IHNyYy5yZXBsYWNlKCdAJywgJ1xcXFwnICsgYXJndW1lbnRzW2ldKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoc3JjLCBvcHQpXG59XG5cbi8qKlxuICogQG1vZHVsZSBwYXJzZXJzXG4gKi9cbnZhciBwYXJzZXJzID0gKGZ1bmN0aW9uICh3aW4pIHtcblxuICB2YXIgX3AgPSB7fVxuXG4gIGZ1bmN0aW9uIF9yIChuYW1lKSB7XG4gICAgdmFyIHBhcnNlciA9IHdpbltuYW1lXVxuXG4gICAgaWYgKHBhcnNlcikgcmV0dXJuIHBhcnNlclxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXJzZXIgXCInICsgbmFtZSArICdcIiBub3QgbG9hZGVkLicpXG4gIH1cblxuICBmdW5jdGlvbiBfcmVxIChuYW1lKSB7XG4gICAgdmFyIHBhcnRzID0gbmFtZS5zcGxpdCgnLicpXG5cbiAgICBpZiAocGFydHMubGVuZ3RoICE9PSAyKSB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBmb3JtYXQgZm9yIHBhcnNlcnMuX3JlcScpXG5cbiAgICB2YXIgcGFyc2VyID0gX3BbcGFydHNbMF1dW3BhcnRzWzFdXVxuICAgIGlmIChwYXJzZXIpIHJldHVybiBwYXJzZXJcblxuICAgIHRocm93IG5ldyBFcnJvcignUGFyc2VyIFwiJyArIG5hbWUgKyAnXCIgbm90IGZvdW5kLicpXG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmQgKG9iaiwgcHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gcHJvcHMpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgb2JqW3Byb3BdID0gcHJvcHNbcHJvcF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJQdWcgKGNvbXBpbGVyTmFtZSwgaHRtbCwgb3B0cywgdXJsKSB7XG4gICAgb3B0cyA9IGV4dGVuZCh7XG4gICAgICBwcmV0dHk6IHRydWUsXG4gICAgICBmaWxlbmFtZTogdXJsLFxuICAgICAgZG9jdHlwZTogJ2h0bWwnXG4gICAgfSwgb3B0cylcbiAgICByZXR1cm4gX3IoY29tcGlsZXJOYW1lKS5yZW5kZXIoaHRtbCwgb3B0cylcbiAgfVxuXG4gIF9wLmh0bWwgPSB7XG4gICAgamFkZTogZnVuY3Rpb24gKGh0bWwsIG9wdHMsIHVybCkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAgIGNvbnNvbGUubG9nKCdERVBSRUNBVElPTiBXQVJOSU5HOiBqYWRlIHdhcyByZW5hbWVkIFwicHVnXCIgLSBUaGUgamFkZSBwYXJzZXIgd2lsbCBiZSByZW1vdmVkIGluIHJpb3RAMy4wLjAhJylcbiAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICAgIHJldHVybiByZW5kZXJQdWcoJ2phZGUnLCBodG1sLCBvcHRzLCB1cmwpXG4gICAgfSxcbiAgICBwdWc6IGZ1bmN0aW9uIChodG1sLCBvcHRzLCB1cmwpIHtcbiAgICAgIHJldHVybiByZW5kZXJQdWcoJ3B1ZycsIGh0bWwsIG9wdHMsIHVybClcbiAgICB9XG4gIH1cbiAgX3AuY3NzID0ge1xuICAgIGxlc3M6IGZ1bmN0aW9uICh0YWcsIGNzcywgb3B0cywgdXJsKSB7XG4gICAgICB2YXIgcmV0XG5cbiAgICAgIG9wdHMgPSBleHRlbmQoe1xuICAgICAgICBzeW5jOiB0cnVlLFxuICAgICAgICBzeW5jSW1wb3J0OiB0cnVlLFxuICAgICAgICBmaWxlbmFtZTogdXJsXG4gICAgICB9LCBvcHRzKVxuICAgICAgX3IoJ2xlc3MnKS5yZW5kZXIoY3NzLCBvcHRzLCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG4gICAgICAgIHJldCA9IHJlc3VsdC5jc3NcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICB9XG4gIF9wLmpzID0ge1xuICAgIGVzNjogZnVuY3Rpb24gKGpzLCBvcHRzKSB7XG4gICAgICBvcHRzID0gZXh0ZW5kKHtcbiAgICAgICAgYmxhY2tsaXN0OiBbJ3VzZVN0cmljdCcsICdzdHJpY3QnLCAncmVhY3QnXSxcbiAgICAgICAgc291cmNlTWFwczogZmFsc2UsXG4gICAgICAgIGNvbW1lbnRzOiBmYWxzZVxuICAgICAgfSwgb3B0cylcbiAgICAgIHJldHVybiBfcignYmFiZWwnKS50cmFuc2Zvcm0oanMsIG9wdHMpLmNvZGVcbiAgICB9LFxuICAgIGJhYmVsOiBmdW5jdGlvbiAoanMsIG9wdHMsIHVybCkge1xuICAgICAgcmV0dXJuIF9yKCdiYWJlbCcpLnRyYW5zZm9ybShqcywgZXh0ZW5kKHsgZmlsZW5hbWU6IHVybCB9LCBvcHRzKSkuY29kZVxuICAgIH0sXG4gICAgYnVibGU6IGZ1bmN0aW9uIChqcywgb3B0cywgdXJsKSB7XG4gICAgICBvcHRzID0gZXh0ZW5kKHtcbiAgICAgICAgc291cmNlOiB1cmwsXG4gICAgICAgIG1vZHVsZXM6IGZhbHNlXG4gICAgICB9LCBvcHRzKVxuICAgICAgcmV0dXJuIF9yKCdidWJsZScpLnRyYW5zZm9ybShqcywgb3B0cykuY29kZVxuICAgIH0sXG4gICAgY29mZmVlOiBmdW5jdGlvbiAoanMsIG9wdHMpIHtcbiAgICAgIHJldHVybiBfcignQ29mZmVlU2NyaXB0JykuY29tcGlsZShqcywgZXh0ZW5kKHsgYmFyZTogdHJ1ZSB9LCBvcHRzKSlcbiAgICB9LFxuICAgIGxpdmVzY3JpcHQ6IGZ1bmN0aW9uIChqcywgb3B0cykge1xuICAgICAgcmV0dXJuIF9yKCdsaXZlc2NyaXB0JykuY29tcGlsZShqcywgZXh0ZW5kKHsgYmFyZTogdHJ1ZSwgaGVhZGVyOiBmYWxzZSB9LCBvcHRzKSlcbiAgICB9LFxuICAgIHR5cGVzY3JpcHQ6IGZ1bmN0aW9uIChqcywgb3B0cykge1xuICAgICAgcmV0dXJuIF9yKCd0eXBlc2NyaXB0JykoanMsIG9wdHMpXG4gICAgfSxcbiAgICBub25lOiBmdW5jdGlvbiAoanMpIHtcbiAgICAgIHJldHVybiBqc1xuICAgIH1cbiAgfVxuICBfcC5qcy5qYXZhc2NyaXB0ICAgPSBfcC5qcy5ub25lXG4gIF9wLmpzLmNvZmZlZXNjcmlwdCA9IF9wLmpzLmNvZmZlZVxuICBfcC5fcmVxICA9IF9yZXFcbiAgX3AudXRpbHMgPSB7XG4gICAgZXh0ZW5kOiBleHRlbmRcbiAgfVxuXG4gIHJldHVybiBfcFxuXG59KSh3aW5kb3cgfHwgZ2xvYmFsKVxuXG5yaW90LnBhcnNlcnMgPSBwYXJzZXJzXG5cbi8qKlxuICogQ29tcGlsZXIgZm9yIHJpb3QgY3VzdG9tIHRhZ3NcbiAqIEB2ZXJzaW9uIHYyLjUuN1xuICovXG52YXIgY29tcGlsZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGV4dGVuZCA9IHBhcnNlcnMudXRpbHMuZXh0ZW5kXG4gIC8qIGVzbGludC1lbmFibGUgKi9cblxuICB2YXIgU19MSU5FU1RSID0gL1wiW15cIlxcblxcXFxdKig/OlxcXFxbXFxTXFxzXVteXCJcXG5cXFxcXSopKlwifCdbXidcXG5cXFxcXSooPzpcXFxcW1xcU1xcc11bXidcXG5cXFxcXSopKicvLnNvdXJjZVxuXG4gIHZhciBTX1NUUklOR1MgPSBicmFja2V0cy5SX1NUUklOR1Muc291cmNlXG5cbiAgdmFyIEhUTUxfQVRUUlMgPSAvICooWy1cXHc6XFx4QTAtXFx4RkZdKykgPyg/Oj0gPygnW14nXSonfFwiW15cIl0qXCJ8XFxTKykpPy9nXG5cbiAgdmFyIEhUTUxfQ09NTVMgPSBSZWdFeHAoLzwhLS0oPyE+KVtcXFNcXHNdKj8tLT4vLnNvdXJjZSArICd8JyArIFNfTElORVNUUiwgJ2cnKVxuXG4gIHZhciBIVE1MX1RBR1MgPSAvPCgtP1tBLVphLXpdWy1cXHdcXHhBMC1cXHhGRl0qKSg/OlxccysoW15cIidcXC8+XSooPzooPzpcIlteXCJdKlwifCdbXiddKid8XFwvW14+XSlbXidcIlxcLz5dKikqKXxcXHMqKShcXC8/KT4vZ1xuXG4gIHZhciBIVE1MX1BBQ0sgPSAvPlsgXFx0XSs8KC0/W0EtWmEtel18XFwvWy1BLVphLXpdKS9nXG5cbiAgdmFyIEJPT0xfQVRUUlMgPSBSZWdFeHAoXG4gICAgICAnXig/OmRpc2FibGVkfGNoZWNrZWR8cmVhZG9ubHl8cmVxdWlyZWR8YWxsb3dmdWxsc2NyZWVufGF1dG8oPzpmb2N1c3xwbGF5KXwnICtcbiAgICAgICdjb21wYWN0fGNvbnRyb2xzfGRlZmF1bHR8Zm9ybW5vdmFsaWRhdGV8aGlkZGVufGlzbWFwfGl0ZW1zY29wZXxsb29wfCcgK1xuICAgICAgJ211bHRpcGxlfG11dGVkfG5vKD86cmVzaXplfHNoYWRlfHZhbGlkYXRlfHdyYXApP3xvcGVufHJldmVyc2VkfHNlYW1sZXNzfCcgK1xuICAgICAgJ3NlbGVjdGVkfHNvcnRhYmxlfHRydWVzcGVlZHx0eXBlbXVzdG1hdGNoKSQnKVxuXG4gIHZhciBSSU9UX0FUVFJTID0gWydzdHlsZScsICdzcmMnLCAnZCddXG5cbiAgdmFyIFZPSURfVEFHUyA9IC9eKD86aW5wdXR8aW1nfGJyfHdicnxocnxhcmVhfGJhc2V8Y29sfGVtYmVkfGtleWdlbnxsaW5rfG1ldGF8cGFyYW18c291cmNlfHRyYWNrKSQvXG5cbiAgdmFyIFBSRV9UQUdTID0gLzxwcmUoPzpcXHMrKD86W15cIj5dKnxcIlteXCJdKlwiKSopPz4oW1xcU1xcc10rPyk8XFwvcHJlXFxzKj4vZ2lcblxuICB2YXIgU1BFQ19UWVBFUyA9IC9eXCIoPzpudW1iZXJ8ZGF0ZSg/OnRpbWUpP3x0aW1lfG1vbnRofGVtYWlsfGNvbG9yKVxcYi9pXG5cbiAgdmFyIElNUE9SVF9TVEFURU1FTlQgPSAvXlxccyppbXBvcnQoPzooPzpcXHN8W15cXHMnXCJdKSopWyd8XCJdLipcXG4/L2dtXG5cbiAgdmFyIFRSSU1fVFJBSUwgPSAvWyBcXHRdKyQvZ21cblxuICB2YXJcbiAgICBSRV9IQVNFWFBSID0gc2FmZVJlZ2V4KC9AI1xcZC8sICd4MDEnKSxcbiAgICBSRV9SRVBFWFBSID0gc2FmZVJlZ2V4KC9AIyhcXGQrKS9nLCAneDAxJyksXG4gICAgQ0hfSURFWFBSICA9ICdcXHgwMSMnLFxuICAgIENIX0RRQ09ERSAgPSAnXFx1MjA1NycsXG4gICAgRFEgPSAnXCInLFxuICAgIFNRID0gXCInXCJcblxuICBmdW5jdGlvbiBjbGVhblNvdXJjZSAoc3JjKSB7XG4gICAgdmFyXG4gICAgICBtbSxcbiAgICAgIHJlID0gSFRNTF9DT01NU1xuXG4gICAgaWYgKH5zcmMuaW5kZXhPZignXFxyJykpIHtcbiAgICAgIHNyYyA9IHNyYy5yZXBsYWNlKC9cXHJcXG4/L2csICdcXG4nKVxuICAgIH1cblxuICAgIHJlLmxhc3RJbmRleCA9IDBcbiAgICB3aGlsZSAoKG1tID0gcmUuZXhlYyhzcmMpKSkge1xuICAgICAgaWYgKG1tWzBdWzBdID09PSAnPCcpIHtcbiAgICAgICAgc3JjID0gUmVnRXhwLmxlZnRDb250ZXh0ICsgUmVnRXhwLnJpZ2h0Q29udGV4dFxuICAgICAgICByZS5sYXN0SW5kZXggPSBtbVszXSArIDFcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNyY1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VBdHRyaWJzIChzdHIsIHBjZXgpIHtcbiAgICB2YXJcbiAgICAgIGxpc3QgPSBbXSxcbiAgICAgIG1hdGNoLFxuICAgICAgdHlwZSwgdmV4cFxuXG4gICAgSFRNTF9BVFRSUy5sYXN0SW5kZXggPSAwXG5cbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFxzKy9nLCAnICcpXG5cbiAgICB3aGlsZSAoKG1hdGNoID0gSFRNTF9BVFRSUy5leGVjKHN0cikpKSB7XG4gICAgICB2YXJcbiAgICAgICAgayA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHYgPSBtYXRjaFsyXVxuXG4gICAgICBpZiAoIXYpIHtcbiAgICAgICAgbGlzdC5wdXNoKGspXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlmICh2WzBdICE9PSBEUSkge1xuICAgICAgICAgIHYgPSBEUSArICh2WzBdID09PSBTUSA/IHYuc2xpY2UoMSwgLTEpIDogdikgKyBEUVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGsgPT09ICd0eXBlJyAmJiBTUEVDX1RZUEVTLnRlc3QodikpIHtcbiAgICAgICAgICB0eXBlID0gdlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChSRV9IQVNFWFBSLnRlc3QodikpIHtcblxuICAgICAgICAgICAgaWYgKGsgPT09ICd2YWx1ZScpIHZleHAgPSAxXG4gICAgICAgICAgICBlbHNlIGlmIChCT09MX0FUVFJTLnRlc3QoaykpIGsgPSAnX18nICsga1xuICAgICAgICAgICAgZWxzZSBpZiAoflJJT1RfQVRUUlMuaW5kZXhPZihrKSkgayA9ICdyaW90LScgKyBrXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdC5wdXNoKGsgKyAnPScgKyB2KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGlmICh2ZXhwKSB0eXBlID0gRFEgKyBwY2V4Ll9icFswXSArIFNRICsgdHlwZS5zbGljZSgxLCAtMSkgKyBTUSArIHBjZXguX2JwWzFdICsgRFFcbiAgICAgIGxpc3QucHVzaCgndHlwZT0nICsgdHlwZSlcbiAgICB9XG4gICAgcmV0dXJuIGxpc3Quam9pbignICcpXG4gIH1cblxuICBmdW5jdGlvbiBzcGxpdEh0bWwgKGh0bWwsIG9wdHMsIHBjZXgpIHtcbiAgICB2YXIgX2JwID0gcGNleC5fYnBcblxuICAgIGlmIChodG1sICYmIF9icFs0XS50ZXN0KGh0bWwpKSB7XG4gICAgICB2YXJcbiAgICAgICAganNmbiA9IG9wdHMuZXhwciAmJiAob3B0cy5wYXJzZXIgfHwgb3B0cy50eXBlKSA/IF9jb21waWxlSlMgOiAwLFxuICAgICAgICBsaXN0ID0gYnJhY2tldHMuc3BsaXQoaHRtbCwgMCwgX2JwKSxcbiAgICAgICAgZXhwclxuXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGxpc3QubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgZXhwciA9IGxpc3RbaV1cbiAgICAgICAgaWYgKGV4cHJbMF0gPT09ICdeJykge1xuICAgICAgICAgIGV4cHIgPSBleHByLnNsaWNlKDEpXG4gICAgICAgIH0gZWxzZSBpZiAoanNmbikge1xuICAgICAgICAgIGV4cHIgPSBqc2ZuKGV4cHIsIG9wdHMpLnRyaW0oKVxuICAgICAgICAgIGlmIChleHByLnNsaWNlKC0xKSA9PT0gJzsnKSBleHByID0gZXhwci5zbGljZSgwLCAtMSlcbiAgICAgICAgfVxuICAgICAgICBsaXN0W2ldID0gQ0hfSURFWFBSICsgKHBjZXgucHVzaChleHByKSAtIDEpICsgX2JwWzFdXG4gICAgICB9XG4gICAgICBodG1sID0gbGlzdC5qb2luKCcnKVxuICAgIH1cbiAgICByZXR1cm4gaHRtbFxuICB9XG5cbiAgZnVuY3Rpb24gcmVzdG9yZUV4cHIgKGh0bWwsIHBjZXgpIHtcbiAgICBpZiAocGNleC5sZW5ndGgpIHtcbiAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoUkVfUkVQRVhQUiwgZnVuY3Rpb24gKF8sIGQpIHtcblxuICAgICAgICByZXR1cm4gcGNleC5fYnBbMF0gKyBwY2V4W2RdLnRyaW0oKS5yZXBsYWNlKC9bXFxyXFxuXSsvZywgJyAnKS5yZXBsYWNlKC9cIi9nLCBDSF9EUUNPREUpXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gaHRtbFxuICB9XG5cbiAgZnVuY3Rpb24gX2NvbXBpbGVIVE1MIChodG1sLCBvcHRzLCBwY2V4KSB7XG4gICAgaWYgKCEvXFxTLy50ZXN0KGh0bWwpKSByZXR1cm4gJydcblxuICAgIGh0bWwgPSBzcGxpdEh0bWwoaHRtbCwgb3B0cywgcGNleClcbiAgICAgIC5yZXBsYWNlKEhUTUxfVEFHUywgZnVuY3Rpb24gKF8sIG5hbWUsIGF0dHIsIGVuZHMpIHtcblxuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgZW5kcyA9IGVuZHMgJiYgIVZPSURfVEFHUy50ZXN0KG5hbWUpID8gJz48LycgKyBuYW1lIDogJydcblxuICAgICAgICBpZiAoYXR0cikgbmFtZSArPSAnICcgKyBwYXJzZUF0dHJpYnMoYXR0ciwgcGNleClcblxuICAgICAgICByZXR1cm4gJzwnICsgbmFtZSArIGVuZHMgKyAnPidcbiAgICAgIH0pXG5cbiAgICBpZiAoIW9wdHMud2hpdGVzcGFjZSkge1xuICAgICAgdmFyIHAgPSBbXVxuXG4gICAgICBpZiAoLzxwcmVbXFxzPl0vLnRlc3QoaHRtbCkpIHtcbiAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShQUkVfVEFHUywgZnVuY3Rpb24gKHEpIHtcbiAgICAgICAgICBwLnB1c2gocSlcbiAgICAgICAgICByZXR1cm4gJ1xcdTAwMDInXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGh0bWwgPSBodG1sLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJylcblxuICAgICAgaWYgKHAubGVuZ3RoKSBodG1sID0gaHRtbC5yZXBsYWNlKC9cXHUwMDAyL2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHAuc2hpZnQoKSB9KVxuICAgIH1cblxuICAgIGlmIChvcHRzLmNvbXBhY3QpIGh0bWwgPSBodG1sLnJlcGxhY2UoSFRNTF9QQUNLLCAnPjwkMScpXG5cbiAgICByZXR1cm4gcmVzdG9yZUV4cHIoaHRtbCwgcGNleCkucmVwbGFjZShUUklNX1RSQUlMLCAnJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBpbGVIVE1MIChodG1sLCBvcHRzLCBwY2V4KSB7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRzKSkge1xuICAgICAgcGNleCA9IG9wdHNcbiAgICAgIG9wdHMgPSB7fVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXBjZXgpIHBjZXggPSBbXVxuICAgICAgaWYgKCFvcHRzKSBvcHRzID0ge31cbiAgICB9XG5cbiAgICBwY2V4Ll9icCA9IGJyYWNrZXRzLmFycmF5KG9wdHMuYnJhY2tldHMpXG5cbiAgICByZXR1cm4gX2NvbXBpbGVIVE1MKGNsZWFuU291cmNlKGh0bWwpLCBvcHRzLCBwY2V4KVxuICB9XG5cbiAgdmFyIEpTX0VTNlNJR04gPSAvXlsgXFx0XSooWyRfQS1aYS16XVskXFx3XSopXFxzKlxcKFteKCldKlxcKVxccyp7L21cblxuICB2YXIgSlNfRVM2RU5EID0gUmVnRXhwKCdbe31dfCcgKyBicmFja2V0cy5TX1FCTE9DS1MsICdnJylcblxuICB2YXIgSlNfQ09NTVMgPSBSZWdFeHAoYnJhY2tldHMuUl9NTENPTU1TLnNvdXJjZSArICd8Ly9bXlxcclxcbl0qfCcgKyBicmFja2V0cy5TX1FCTE9DS1MsICdnJylcblxuICBmdW5jdGlvbiByaW90anMgKGpzKSB7XG4gICAgdmFyXG4gICAgICBwYXJ0cyA9IFtdLFxuICAgICAgbWF0Y2gsXG4gICAgICB0b2VzNSxcbiAgICAgIHBvcyxcbiAgICAgIG5hbWUsXG4gICAgICBSRSA9IFJlZ0V4cFxuXG4gICAgaWYgKH5qcy5pbmRleE9mKCcvJykpIGpzID0gcm1Db21tcyhqcywgSlNfQ09NTVMpXG5cbiAgICB3aGlsZSAoKG1hdGNoID0ganMubWF0Y2goSlNfRVM2U0lHTikpKSB7XG5cbiAgICAgIHBhcnRzLnB1c2goUkUubGVmdENvbnRleHQpXG4gICAgICBqcyAgPSBSRS5yaWdodENvbnRleHRcbiAgICAgIHBvcyA9IHNraXBCb2R5KGpzLCBKU19FUzZFTkQpXG5cbiAgICAgIG5hbWUgID0gbWF0Y2hbMV1cbiAgICAgIHRvZXM1ID0gIS9eKD86aWZ8d2hpbGV8Zm9yfHN3aXRjaHxjYXRjaHxmdW5jdGlvbikkLy50ZXN0KG5hbWUpXG4gICAgICBuYW1lICA9IHRvZXM1ID8gbWF0Y2hbMF0ucmVwbGFjZShuYW1lLCAndGhpcy4nICsgbmFtZSArICcgPSBmdW5jdGlvbicpIDogbWF0Y2hbMF1cbiAgICAgIHBhcnRzLnB1c2gobmFtZSwganMuc2xpY2UoMCwgcG9zKSlcbiAgICAgIGpzID0ganMuc2xpY2UocG9zKVxuXG4gICAgICBpZiAodG9lczUgJiYgIS9eXFxzKi5cXHMqYmluZFxcYi8udGVzdChqcykpIHBhcnRzLnB1c2goJy5iaW5kKHRoaXMpJylcbiAgICB9XG5cbiAgICByZXR1cm4gcGFydHMubGVuZ3RoID8gcGFydHMuam9pbignJykgKyBqcyA6IGpzXG5cbiAgICBmdW5jdGlvbiBybUNvbW1zIChzLCByLCBtKSB7XG4gICAgICByLmxhc3RJbmRleCA9IDBcbiAgICAgIHdoaWxlICgobSA9IHIuZXhlYyhzKSkpIHtcbiAgICAgICAgaWYgKG1bMF1bMF0gPT09ICcvJyAmJiAhbVsxXSAmJiAhbVsyXSkge1xuICAgICAgICAgIHMgPSBSRS5sZWZ0Q29udGV4dCArICcgJyArIFJFLnJpZ2h0Q29udGV4dFxuICAgICAgICAgIHIubGFzdEluZGV4ID0gbVszXSArIDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBza2lwQm9keSAocywgcikge1xuICAgICAgdmFyIG0sIGkgPSAxXG5cbiAgICAgIHIubGFzdEluZGV4ID0gMFxuICAgICAgd2hpbGUgKGkgJiYgKG0gPSByLmV4ZWMocykpKSB7XG4gICAgICAgIGlmIChtWzBdID09PSAneycpICsraVxuICAgICAgICBlbHNlIGlmIChtWzBdID09PSAnfScpIC0taVxuICAgICAgfVxuICAgICAgcmV0dXJuIGkgPyBzLmxlbmd0aCA6IHIubGFzdEluZGV4XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX2NvbXBpbGVKUyAoanMsIG9wdHMsIHR5cGUsIHBhcnNlck9wdHMsIHVybCkge1xuICAgIGlmICghL1xcUy8udGVzdChqcykpIHJldHVybiAnJ1xuICAgIGlmICghdHlwZSkgdHlwZSA9IG9wdHMudHlwZVxuXG4gICAgdmFyIHBhcnNlciA9IG9wdHMucGFyc2VyIHx8IHR5cGUgJiYgcGFyc2Vycy5fcmVxKCdqcy4nICsgdHlwZSwgdHJ1ZSkgfHwgcmlvdGpzXG5cbiAgICByZXR1cm4gcGFyc2VyKGpzLCBwYXJzZXJPcHRzLCB1cmwpLnJlcGxhY2UoL1xcclxcbj8vZywgJ1xcbicpLnJlcGxhY2UoVFJJTV9UUkFJTCwgJycpXG4gIH1cblxuICBmdW5jdGlvbiBjb21waWxlSlMgKGpzLCBvcHRzLCB0eXBlLCB1c2VyT3B0cykge1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHVzZXJPcHRzID0gdHlwZVxuICAgICAgdHlwZSA9IG9wdHNcbiAgICAgIG9wdHMgPSB7fVxuICAgIH1cbiAgICBpZiAodHlwZSAmJiB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHVzZXJPcHRzID0gdHlwZVxuICAgICAgdHlwZSA9ICcnXG4gICAgfVxuICAgIGlmICghdXNlck9wdHMpIHVzZXJPcHRzID0ge31cblxuICAgIHJldHVybiBfY29tcGlsZUpTKGpzLCBvcHRzIHx8IHt9LCB0eXBlLCB1c2VyT3B0cy5wYXJzZXJPcHRpb25zLCB1c2VyT3B0cy51cmwpXG4gIH1cblxuICB2YXIgQ1NTX1NFTEVDVE9SID0gUmVnRXhwKCcoW3t9XXxeKVsgO10qKFteQCA7e31dW157fV0qKSg/PXspfCcgKyBTX0xJTkVTVFIsICdnJylcblxuICBmdW5jdGlvbiBzY29wZWRDU1MgKHRhZywgY3NzKSB7XG4gICAgdmFyIHNjb3BlID0gJzpzY29wZSdcblxuICAgIHJldHVybiBjc3MucmVwbGFjZShDU1NfU0VMRUNUT1IsIGZ1bmN0aW9uIChtLCBwMSwgcDIpIHtcblxuICAgICAgaWYgKCFwMikgcmV0dXJuIG1cblxuICAgICAgcDIgPSBwMi5yZXBsYWNlKC9bXixdKy9nLCBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIHZhciBzID0gc2VsLnRyaW0oKVxuXG4gICAgICAgIGlmICghcyB8fCBzID09PSAnZnJvbScgfHwgcyA9PT0gJ3RvJyB8fCBzLnNsaWNlKC0xKSA9PT0gJyUnKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHMuaW5kZXhPZihzY29wZSkgPCAwKSB7XG4gICAgICAgICAgcyA9IHRhZyArICcgJyArIHMgKyAnLFtyaW90LXRhZz1cIicgKyB0YWcgKyAnXCJdICcgKyBzICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsW2RhdGEtaXM9XCInICsgdGFnICsgJ1wiXSAnICsgc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHMgPSBzLnJlcGxhY2Uoc2NvcGUsIHRhZykgKyAnLCcgK1xuICAgICAgICAgICAgICBzLnJlcGxhY2Uoc2NvcGUsICdbcmlvdC10YWc9XCInICsgdGFnICsgJ1wiXScpICsgJywnICtcbiAgICAgICAgICAgICAgcy5yZXBsYWNlKHNjb3BlLCAnW2RhdGEtaXM9XCInICsgdGFnICsgJ1wiXScpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBwMSA/IHAxICsgJyAnICsgcDIgOiBwMlxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBfY29tcGlsZUNTUyAoY3NzLCB0YWcsIHR5cGUsIG9wdHMpIHtcbiAgICB2YXIgc2NvcGVkID0gKG9wdHMgfHwgKG9wdHMgPSB7fSkpLnNjb3BlZFxuXG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGlmICh0eXBlID09PSAnc2NvcGVkLWNzcycpIHtcbiAgICAgICAgc2NvcGVkID0gdHJ1ZVxuICAgICAgfSBlbHNlIGlmICh0eXBlICE9PSAnY3NzJykge1xuXG4gICAgICAgIHZhciBwYXJzZXIgPSBwYXJzZXJzLl9yZXEoJ2Nzcy4nICsgdHlwZSwgdHJ1ZSlcbiAgICAgICAgY3NzID0gcGFyc2VyKHRhZywgY3NzLCBvcHRzLnBhcnNlck9wdHMgfHwge30sIG9wdHMudXJsKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNzcyA9IGNzcy5yZXBsYWNlKGJyYWNrZXRzLlJfTUxDT01NUywgJycpLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKClcblxuICAgIGlmIChzY29wZWQpIHtcbiAgICAgIGlmICghdGFnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBwYXJzZSBzY29wZWQgQ1NTIHdpdGhvdXQgYSB0YWdOYW1lJylcbiAgICAgIH1cbiAgICAgIGNzcyA9IHNjb3BlZENTUyh0YWcsIGNzcylcbiAgICB9XG4gICAgcmV0dXJuIGNzc1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcGlsZUNTUyAoY3NzLCB0eXBlLCBvcHRzKSB7XG4gICAgaWYgKHR5cGUgJiYgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRzID0gdHlwZVxuICAgICAgdHlwZSA9ICcnXG4gICAgfSBlbHNlIGlmICghb3B0cykgb3B0cyA9IHt9XG5cbiAgICByZXR1cm4gX2NvbXBpbGVDU1MoY3NzLCBvcHRzLnRhZ05hbWUsIHR5cGUsIG9wdHMpXG4gIH1cblxuICB2YXIgVFlQRV9BVFRSID0gL1xcc3R5cGVcXHMqPVxccyooPzooWydcIl0pKC4rPylcXDF8KFxcUyspKS9pXG5cbiAgdmFyIE1JU0NfQVRUUiA9ICdcXFxccyo9XFxcXHMqKCcgKyBTX1NUUklOR1MgKyAnfHtbXn1dK318XFxcXFMrKSdcblxuICB2YXIgRU5EX1RBR1MgPSAvXFwvPlxcbnxePCg/OlxcLz8tP1tBLVphLXpdWy1cXHdcXHhBMC1cXHhGRl0qXFxzKnwtP1tBLVphLXpdWy1cXHdcXHhBMC1cXHhGRl0qXFxzK1stXFx3OlxceEEwLVxceEZGXVtcXFNcXHNdKj8pPlxcbi9cblxuICBmdW5jdGlvbiBfcSAocywgcikge1xuICAgIGlmICghcykgcmV0dXJuIFwiJydcIlxuICAgIHMgPSBTUSArIHMucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIikgKyBTUVxuICAgIHJldHVybiByICYmIH5zLmluZGV4T2YoJ1xcbicpID8gcy5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykgOiBzXG4gIH1cblxuICBmdW5jdGlvbiBta3RhZyAobmFtZSwgaHRtbCwgY3NzLCBhdHRyLCBqcywgaW1wb3J0cywgb3B0cykge1xuICAgIHZhclxuICAgICAgYyA9IG9wdHMuZGVidWcgPyAnLFxcbiAgJyA6ICcsICcsXG4gICAgICBzID0gJ30pOydcblxuICAgIGlmIChqcyAmJiBqcy5zbGljZSgtMSkgIT09ICdcXG4nKSBzID0gJ1xcbicgKyBzXG5cbiAgICByZXR1cm4gaW1wb3J0cyArICdyaW90LnRhZzIoXFwnJyArIG5hbWUgKyBTUSArXG4gICAgICBjICsgX3EoaHRtbCwgMSkgK1xuICAgICAgYyArIF9xKGNzcykgK1xuICAgICAgYyArIF9xKGF0dHIpICsgJywgZnVuY3Rpb24ob3B0cykge1xcbicgKyBqcyArIHNcbiAgfVxuXG4gIGZ1bmN0aW9uIHNwbGl0QmxvY2tzIChzdHIpIHtcbiAgICBpZiAoLzxbLVxcd10vLnRlc3Qoc3RyKSkge1xuICAgICAgdmFyXG4gICAgICAgIG0sXG4gICAgICAgIGsgPSBzdHIubGFzdEluZGV4T2YoJzwnKSxcbiAgICAgICAgbiA9IHN0ci5sZW5ndGhcblxuICAgICAgd2hpbGUgKH5rKSB7XG4gICAgICAgIG0gPSBzdHIuc2xpY2UoaywgbikubWF0Y2goRU5EX1RBR1MpXG4gICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgayArPSBtLmluZGV4ICsgbVswXS5sZW5ndGhcbiAgICAgICAgICBtID0gc3RyLnNsaWNlKDAsIGspXG4gICAgICAgICAgaWYgKG0uc2xpY2UoLTUpID09PSAnPC0vPlxcbicpIG0gPSBtLnNsaWNlKDAsIC01KVxuICAgICAgICAgIHJldHVybiBbbSwgc3RyLnNsaWNlKGspXVxuICAgICAgICB9XG4gICAgICAgIG4gPSBrXG4gICAgICAgIGsgPSBzdHIubGFzdEluZGV4T2YoJzwnLCBrIC0gMSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFsnJywgc3RyXVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VHlwZSAoYXR0cmlicykge1xuICAgIGlmIChhdHRyaWJzKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBhdHRyaWJzLm1hdGNoKFRZUEVfQVRUUilcblxuICAgICAgbWF0Y2ggPSBtYXRjaCAmJiAobWF0Y2hbMl0gfHwgbWF0Y2hbM10pXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoLnJlcGxhY2UoJ3RleHQvJywgJycpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXR0cmliIChhdHRyaWJzLCBuYW1lKSB7XG4gICAgaWYgKGF0dHJpYnMpIHtcbiAgICAgIHZhciBtYXRjaCA9IGF0dHJpYnMubWF0Y2goUmVnRXhwKCdcXFxccycgKyBuYW1lICsgTUlTQ19BVFRSLCAnaScpKVxuXG4gICAgICBtYXRjaCA9IG1hdGNoICYmIG1hdGNoWzFdXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuICgvXlsnXCJdLykudGVzdChtYXRjaCkgPyBtYXRjaC5zbGljZSgxLCAtMSkgOiBtYXRjaFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuZXNjYXBlSFRNTCAoc3RyKSB7XG4gICAgcmV0dXJuIHN0clxuICAgICAgICAgICAgLnJlcGxhY2UoLyZhbXA7L2csICcmJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8mbHQ7L2csICc8JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8mZ3Q7L2csICc+JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8mcXVvdDsvZywgJ1wiJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8mIzAzOTsvZywgJ1xcJycpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYXJzZXJPcHRpb25zIChhdHRyaWJzKSB7XG4gICAgdmFyIG9wdHMgPSB1bmVzY2FwZUhUTUwoZ2V0QXR0cmliKGF0dHJpYnMsICdvcHRpb25zJykpXG5cbiAgICByZXR1cm4gb3B0cyA/IEpTT04ucGFyc2Uob3B0cykgOiBudWxsXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb2RlIChjb2RlLCBvcHRzLCBhdHRyaWJzLCBiYXNlKSB7XG4gICAgdmFyXG4gICAgICB0eXBlID0gZ2V0VHlwZShhdHRyaWJzKSxcbiAgICAgIHNyYyAgPSBnZXRBdHRyaWIoYXR0cmlicywgJ3NyYycpLFxuICAgICAganNQYXJzZXJPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRzLnBhcnNlck9wdGlvbnMuanMpXG5cbiAgICBpZiAoc3JjKSByZXR1cm4gZmFsc2VcblxuICAgIHJldHVybiBfY29tcGlsZUpTKFxuICAgICAgICAgICAgY29kZSxcbiAgICAgICAgICAgIG9wdHMsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgZXh0ZW5kKGpzUGFyc2VyT3B0aW9ucywgZ2V0UGFyc2VyT3B0aW9ucyhhdHRyaWJzKSksXG4gICAgICAgICAgICBiYXNlXG4gICAgICAgICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gY3NzQ29kZSAoY29kZSwgb3B0cywgYXR0cmlicywgdXJsLCB0YWcpIHtcbiAgICB2YXJcbiAgICAgIHBhcnNlclN0eWxlT3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0cy5wYXJzZXJPcHRpb25zLnN0eWxlKSxcbiAgICAgIGV4dHJhT3B0cyA9IHtcbiAgICAgICAgcGFyc2VyT3B0czogZXh0ZW5kKHBhcnNlclN0eWxlT3B0aW9ucywgZ2V0UGFyc2VyT3B0aW9ucyhhdHRyaWJzKSksXG4gICAgICAgIHNjb3BlZDogYXR0cmlicyAmJiAvXFxzc2NvcGVkKFxcc3w9fCQpL2kudGVzdChhdHRyaWJzKSxcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cblxuICAgIHJldHVybiBfY29tcGlsZUNTUyhjb2RlLCB0YWcsIGdldFR5cGUoYXR0cmlicykgfHwgb3B0cy5zdHlsZSwgZXh0cmFPcHRzKVxuICB9XG5cbiAgZnVuY3Rpb24gY29tcGlsZVRlbXBsYXRlIChodG1sLCB1cmwsIGxhbmcsIG9wdHMpIHtcblxuICAgIHZhciBwYXJzZXIgPSBwYXJzZXJzLl9yZXEoJ2h0bWwuJyArIGxhbmcsIHRydWUpXG4gICAgcmV0dXJuIHBhcnNlcihodG1sLCBvcHRzLCB1cmwpXG4gIH1cblxuICB2YXJcblxuICAgIENVU1RfVEFHID0gUmVnRXhwKC9eKFsgXFx0XSopPCgtP1tBLVphLXpdWy1cXHdcXHhBMC1cXHhGRl0qKSg/OlxccysoW14nXCJcXC8+XSsoPzooPzpAfFxcL1tePl0pW14nXCJcXC8+XSopKil8XFxzKik/KD86XFwvPnw+WyBcXHRdKlxcbj8oW1xcU1xcc10qKV5cXDE8XFwvXFwyXFxzKj58PiguKik8XFwvXFwyXFxzKj4pL1xuICAgICAgLnNvdXJjZS5yZXBsYWNlKCdAJywgU19TVFJJTkdTKSwgJ2dpbScpLFxuXG4gICAgU0NSSVBUUyA9IC88c2NyaXB0KFxccytbXj5dKik/Plxcbj8oW1xcU1xcc10qPyk8XFwvc2NyaXB0XFxzKj4vZ2ksXG5cbiAgICBTVFlMRVMgPSAvPHN0eWxlKFxccytbXj5dKik/Plxcbj8oW1xcU1xcc10qPyk8XFwvc3R5bGVcXHMqPi9naVxuXG4gIGZ1bmN0aW9uIGNvbXBpbGUgKHNyYywgb3B0cywgdXJsKSB7XG4gICAgdmFyXG4gICAgICBwYXJ0cyA9IFtdLFxuICAgICAgaW5jbHVkZWQsXG4gICAgICBkZWZhdWx0UGFyc2VycHRpb25zID0ge1xuXG4gICAgICAgIHRlbXBsYXRlOiB7fSxcbiAgICAgICAganM6IHt9LFxuICAgICAgICBzdHlsZToge31cbiAgICAgIH1cblxuICAgIGlmICghb3B0cykgb3B0cyA9IHt9XG5cbiAgICBvcHRzLnBhcnNlck9wdGlvbnMgPSBleHRlbmQoZGVmYXVsdFBhcnNlcnB0aW9ucywgb3B0cy5wYXJzZXJPcHRpb25zIHx8IHt9KVxuXG4gICAgaW5jbHVkZWQgPSBvcHRzLmV4Y2x1ZGVcbiAgICAgID8gZnVuY3Rpb24gKHMpIHsgcmV0dXJuIG9wdHMuZXhjbHVkZS5pbmRleE9mKHMpIDwgMCB9IDogZnVuY3Rpb24gKCkgeyByZXR1cm4gMSB9XG5cbiAgICBpZiAoIXVybCkgdXJsID0gJydcblxuICAgIHZhciBfYnAgPSBicmFja2V0cy5hcnJheShvcHRzLmJyYWNrZXRzKVxuXG4gICAgaWYgKG9wdHMudGVtcGxhdGUpIHtcbiAgICAgIHNyYyA9IGNvbXBpbGVUZW1wbGF0ZShzcmMsIHVybCwgb3B0cy50ZW1wbGF0ZSwgb3B0cy5wYXJzZXJPcHRpb25zLnRlbXBsYXRlKVxuICAgIH1cblxuICAgIHNyYyA9IGNsZWFuU291cmNlKHNyYylcbiAgICAgIC5yZXBsYWNlKENVU1RfVEFHLCBmdW5jdGlvbiAoXywgaW5kZW50LCB0YWdOYW1lLCBhdHRyaWJzLCBib2R5LCBib2R5Mikge1xuICAgICAgICB2YXJcbiAgICAgICAgICBqc2NvZGUgPSAnJyxcbiAgICAgICAgICBzdHlsZXMgPSAnJyxcbiAgICAgICAgICBodG1sID0gJycsXG4gICAgICAgICAgaW1wb3J0cyA9ICcnLFxuICAgICAgICAgIHBjZXggPSBbXVxuXG4gICAgICAgIHBjZXguX2JwID0gX2JwXG5cbiAgICAgICAgdGFnTmFtZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKVxuXG4gICAgICAgIGF0dHJpYnMgPSBhdHRyaWJzICYmIGluY2x1ZGVkKCdhdHRyaWJzJylcbiAgICAgICAgICA/IHJlc3RvcmVFeHByKFxuICAgICAgICAgICAgICBwYXJzZUF0dHJpYnMoXG4gICAgICAgICAgICAgICAgc3BsaXRIdG1sKGF0dHJpYnMsIG9wdHMsIHBjZXgpLFxuICAgICAgICAgICAgICBwY2V4KSxcbiAgICAgICAgICAgIHBjZXgpIDogJydcblxuICAgICAgICBpZiAoKGJvZHkgfHwgKGJvZHkgPSBib2R5MikpICYmIC9cXFMvLnRlc3QoYm9keSkpIHtcblxuICAgICAgICAgIGlmIChib2R5Mikge1xuXG4gICAgICAgICAgICBpZiAoaW5jbHVkZWQoJ2h0bWwnKSkgaHRtbCA9IF9jb21waWxlSFRNTChib2R5Miwgb3B0cywgcGNleClcbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBib2R5ID0gYm9keS5yZXBsYWNlKFJlZ0V4cCgnXicgKyBpbmRlbnQsICdnbScpLCAnJylcblxuICAgICAgICAgICAgYm9keSA9IGJvZHkucmVwbGFjZShTVFlMRVMsIGZ1bmN0aW9uIChfbSwgX2F0dHJzLCBfc3R5bGUpIHtcbiAgICAgICAgICAgICAgaWYgKGluY2x1ZGVkKCdjc3MnKSkge1xuICAgICAgICAgICAgICAgIHN0eWxlcyArPSAoc3R5bGVzID8gJyAnIDogJycpICsgY3NzQ29kZShfc3R5bGUsIG9wdHMsIF9hdHRycywgdXJsLCB0YWdOYW1lKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgYm9keSA9IGJvZHkucmVwbGFjZShTQ1JJUFRTLCBmdW5jdGlvbiAoX20sIF9hdHRycywgX3NjcmlwdCkge1xuICAgICAgICAgICAgICBpZiAoaW5jbHVkZWQoJ2pzJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IGdldENvZGUoX3NjcmlwdCwgb3B0cywgX2F0dHJzLCB1cmwpXG5cbiAgICAgICAgICAgICAgICBpZiAoY29kZSkganNjb2RlICs9IChqc2NvZGUgPyAnXFxuJyA6ICcnKSArIGNvZGVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHZhciBibG9ja3MgPSBzcGxpdEJsb2Nrcyhib2R5LnJlcGxhY2UoVFJJTV9UUkFJTCwgJycpKVxuXG4gICAgICAgICAgICBpZiAoaW5jbHVkZWQoJ2h0bWwnKSkge1xuICAgICAgICAgICAgICBodG1sID0gX2NvbXBpbGVIVE1MKGJsb2Nrc1swXSwgb3B0cywgcGNleClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluY2x1ZGVkKCdqcycpKSB7XG4gICAgICAgICAgICAgIGJvZHkgPSBfY29tcGlsZUpTKGJsb2Nrc1sxXSwgb3B0cywgbnVsbCwgbnVsbCwgdXJsKVxuICAgICAgICAgICAgICBpZiAoYm9keSkganNjb2RlICs9IChqc2NvZGUgPyAnXFxuJyA6ICcnKSArIGJvZHlcbiAgICAgICAgICAgICAganNjb2RlID0ganNjb2RlLnJlcGxhY2UoSU1QT1JUX1NUQVRFTUVOVCwgZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgICAgICBpbXBvcnRzICs9IHMudHJpbSgpICsgJ1xcbidcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBqc2NvZGUgPSAvXFxTLy50ZXN0KGpzY29kZSkgPyBqc2NvZGUucmVwbGFjZSgvXFxuezMsfS9nLCAnXFxuXFxuJykgOiAnJ1xuXG4gICAgICAgIGlmIChvcHRzLmVudGl0aWVzKSB7XG4gICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgICAgICAgICAgaHRtbDogaHRtbCxcbiAgICAgICAgICAgIGNzczogc3R5bGVzLFxuICAgICAgICAgICAgYXR0cmliczogYXR0cmlicyxcbiAgICAgICAgICAgIGpzOiBqc2NvZGUsXG4gICAgICAgICAgICBpbXBvcnRzOiBpbXBvcnRzXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBta3RhZyh0YWdOYW1lLCBodG1sLCBzdHlsZXMsIGF0dHJpYnMsIGpzY29kZSwgaW1wb3J0cywgb3B0cylcbiAgICAgIH0pXG5cbiAgICBpZiAob3B0cy5lbnRpdGllcykgcmV0dXJuIHBhcnRzXG5cbiAgICByZXR1cm4gc3JjXG4gIH1cblxuICByaW90LnV0aWwuY29tcGlsZXIgPSB7XG4gICAgY29tcGlsZTogY29tcGlsZSxcbiAgICBodG1sOiBjb21waWxlSFRNTCxcbiAgICBjc3M6IGNvbXBpbGVDU1MsXG4gICAganM6IGNvbXBpbGVKUyxcbiAgICB2ZXJzaW9uOiAndjIuNS43J1xuICB9XG4gIHJldHVybiBjb21waWxlXG5cbn0pKClcblxuLypcbiAgQ29tcGlsYXRpb24gZm9yIHRoZSBicm93c2VyXG4qL1xucmlvdC5jb21waWxlID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXJcbiAgICBwcm9taXNlLCAgICAvLyBlbWl0cyB0aGUgJ3JlYWR5JyBldmVudCBhbmQgcnVucyB0aGUgZmlyc3QgY2FsbGJhY2tcbiAgICByZWFkeSAgICAgICAvLyBhbGwgdGhlIHNjcmlwdHMgd2VyZSBjb21waWxlZD9cblxuICAvLyBnZXRzIHRoZSBzb3VyY2Ugb2YgYW4gZXh0ZXJuYWwgdGFnIHdpdGggYW4gYXN5bmMgY2FsbFxuICBmdW5jdGlvbiBHRVQgKHVybCwgZm4sIG9wdHMpIHtcbiAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT09IDQgJiZcbiAgICAgICAgIChyZXEuc3RhdHVzID09PSAyMDAgfHwgIXJlcS5zdGF0dXMgJiYgcmVxLnJlc3BvbnNlVGV4dC5sZW5ndGgpKSB7XG4gICAgICAgIGZuKHJlcS5yZXNwb25zZVRleHQsIG9wdHMsIHVybClcbiAgICAgIH1cbiAgICB9XG4gICAgcmVxLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSlcbiAgICByZXEuc2VuZCgnJylcbiAgfVxuXG4gIC8vIGV2YWx1YXRlcyBhIGNvbXBpbGVkIHRhZyB3aXRoaW4gdGhlIGdsb2JhbCBjb250ZXh0XG4gIGZ1bmN0aW9uIGdsb2JhbEV2YWwgKGpzLCB1cmwpIHtcbiAgICBpZiAodHlwZW9mIGpzID09PSBUX1NUUklORykge1xuICAgICAgdmFyXG4gICAgICAgIG5vZGUgPSBta0VsKCdzY3JpcHQnKSxcbiAgICAgICAgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuXG4gICAgICAvLyBtYWtlIHRoZSBzb3VyY2UgYXZhaWxhYmxlIGluIHRoZSBcIihubyBkb21haW4pXCIgdGFiXG4gICAgICAvLyBvZiBDaHJvbWUgRGV2VG9vbHMsIHdpdGggYSAuanMgZXh0ZW5zaW9uXG4gICAgICBpZiAodXJsKSBqcyArPSAnXFxuLy8jIHNvdXJjZVVSTD0nICsgdXJsICsgJy5qcydcblxuICAgICAgbm9kZS50ZXh0ID0ganNcbiAgICAgIHJvb3QuYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgIHJvb3QucmVtb3ZlQ2hpbGQobm9kZSlcbiAgICB9XG4gIH1cblxuICAvLyBjb21waWxlcyBhbGwgdGhlIGludGVybmFsIGFuZCBleHRlcm5hbCB0YWdzIG9uIHRoZSBwYWdlXG4gIGZ1bmN0aW9uIGNvbXBpbGVTY3JpcHRzIChmbiwgeG9wdCkge1xuICAgIHZhclxuICAgICAgc2NyaXB0cyA9ICQkKCdzY3JpcHRbdHlwZT1cInJpb3QvdGFnXCJdJyksXG4gICAgICBzY3JpcHRzQW1vdW50ID0gc2NyaXB0cy5sZW5ndGhcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBwcm9taXNlLnRyaWdnZXIoJ3JlYWR5JylcbiAgICAgIHJlYWR5ID0gdHJ1ZVxuICAgICAgaWYgKGZuKSBmbigpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcGlsZVRhZyAoc3JjLCBvcHRzLCB1cmwpIHtcbiAgICAgIHZhciBjb2RlID0gY29tcGlsZShzcmMsIG9wdHMsIHVybClcblxuICAgICAgZ2xvYmFsRXZhbChjb2RlLCB1cmwpXG4gICAgICBpZiAoIS0tc2NyaXB0c0Ftb3VudCkgZG9uZSgpXG4gICAgfVxuXG4gICAgaWYgKCFzY3JpcHRzQW1vdW50KSBkb25lKClcbiAgICBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXJcbiAgICAgICAgICBzY3JpcHQgPSBzY3JpcHRzW2ldLFxuICAgICAgICAgIG9wdHMgPSBleHRlbmQoe3RlbXBsYXRlOiBnZXRBdHRyKHNjcmlwdCwgJ3RlbXBsYXRlJyl9LCB4b3B0KSxcbiAgICAgICAgICB1cmwgPSBnZXRBdHRyKHNjcmlwdCwgJ3NyYycpXG5cbiAgICAgICAgdXJsID8gR0VUKHVybCwgY29tcGlsZVRhZywgb3B0cykgOiBjb21waWxlVGFnKHNjcmlwdC5pbm5lckhUTUwsIG9wdHMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8vLyBFbnRyeSBwb2ludCAtLS0tLVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJnLCBmbiwgb3B0cykge1xuXG4gICAgaWYgKHR5cGVvZiBhcmcgPT09IFRfU1RSSU5HKSB7XG5cbiAgICAgIC8vIDJuZCBwYXJhbWV0ZXIgaXMgb3B0aW9uYWwsIGJ1dCBjYW4gYmUgbnVsbFxuICAgICAgaWYgKGlzT2JqZWN0KGZuKSkge1xuICAgICAgICBvcHRzID0gZm5cbiAgICAgICAgZm4gPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICAvLyBgcmlvdC5jb21waWxlKHRhZyBbLCBjYWxsYmFjayB8IHRydWVdWywgb3B0aW9uc10pYFxuICAgICAgaWYgKC9eXFxzKjwvbS50ZXN0KGFyZykpIHtcbiAgICAgICAgdmFyIGpzID0gY29tcGlsZShhcmcsIG9wdHMpXG4gICAgICAgIGlmIChmbiAhPT0gdHJ1ZSkgZ2xvYmFsRXZhbChqcylcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oZm4pKSBmbihqcywgYXJnLCBvcHRzKVxuICAgICAgICByZXR1cm4ganNcbiAgICAgIH1cblxuICAgICAgLy8gYHJpb3QuY29tcGlsZSh1cmwgWywgY2FsbGJhY2tdWywgb3B0aW9uc10pYFxuICAgICAgR0VUKGFyZywgZnVuY3Rpb24gKHN0ciwgb3B0cywgdXJsKSB7XG4gICAgICAgIHZhciBqcyA9IGNvbXBpbGUoc3RyLCBvcHRzLCB1cmwpXG4gICAgICAgIGdsb2JhbEV2YWwoanMsIHVybClcbiAgICAgICAgaWYgKGZuKSBmbihqcywgc3RyLCBvcHRzKVxuICAgICAgfSwgb3B0cylcblxuICAgIH1cbiAgICBlbHNlIHtcblxuICAgICAgLy8gYHJpb3QuY29tcGlsZShbY2FsbGJhY2tdWywgb3B0aW9uc10pYFxuICAgICAgaWYgKGlzRnVuY3Rpb24oYXJnKSkge1xuICAgICAgICBvcHRzID0gZm5cbiAgICAgICAgZm4gPSBhcmdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdHMgPSBhcmdcbiAgICAgICAgZm4gPSB1bmRlZmluZWRcbiAgICAgIH1cblxuICAgICAgaWYgKHJlYWR5KSB7XG4gICAgICAgIHJldHVybiBmbiAmJiBmbigpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9taXNlKSB7XG4gICAgICAgIGlmIChmbikgcHJvbWlzZS5vbigncmVhZHknLCBmbilcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZSA9IHJpb3Qub2JzZXJ2YWJsZSgpXG4gICAgICAgIGNvbXBpbGVTY3JpcHRzKGZuLCBvcHRzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG59KSgpXG5cbi8vIHJlYXNzaWduIG1vdW50IG1ldGhvZHMgLS0tLS1cbnZhciBtb3VudCA9IHJpb3QubW91bnRcblxucmlvdC5tb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJldCxcbiAgICBhcmdzID0gYXJndW1lbnRzXG4gIHJpb3QuY29tcGlsZShmdW5jdGlvbiAoKSB7IHJldCA9IG1vdW50LmFwcGx5KHJpb3QsIGFyZ3MpIH0pXG4gIHJldHVybiByZXRcbn1cbiAgLy8gc3VwcG9ydCBDb21tb25KUywgQU1EICYgYnJvd3NlclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFRfT0JKRUNUKVxuICAgIG1vZHVsZS5leHBvcnRzID0gcmlvdFxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBUX0ZVTkNUSU9OICYmIHR5cGVvZiBkZWZpbmUuYW1kICE9PSBUX1VOREVGKVxuICAgIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIHJpb3QgfSlcbiAgZWxzZVxuICAgIHdpbmRvdy5yaW90ID0gcmlvdFxuXG59KSh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID8gd2luZG93IDogdm9pZCAwKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Jpb3QtdHlwZXNjcmlwdC9ub2RlX21vZHVsZXMvcmlvdC9yaW90K2NvbXBpbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBnbG9iYWxzIF9fd2VicGFja19hbWRfb3B0aW9uc19fICovXHJcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IExvZyB9IGZyb20gJy4vdHlwZXMnXG5cbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xuXG4gIHB1YmxpYyBkZWJ1Z2dpbmc6IGJvb2xlYW5cbiAgcHVibGljIGxvZ3M6IExvZ1tdXG5cbiAgLyoqXG4gICAqIExvZ2dpbmcgaW50ZXJmYWNlIGZvciByLWxvY2FsaXplLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlYnVnZ2luZyAtIERlYnVnIHRvIGNvbnNvbGUuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoZGVidWdnaW5nOiBib29sZWFuKSB7XG4gICAgdGhpcy5kZWJ1Z2dpbmcgPSBkZWJ1Z2dpbmdcbiAgICB0aGlzLmxvZ3MgPSBbXVxuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGN1cnJlbnQgdGltZSBpbiBzZWNvbmRzLlxuICAgKiBAcmV0dXJucyB7aW50fVxuICAgKi9cbiAgZ2V0IHRpbWUgKCkgOiBudW1iZXIge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBsb2cgZm9yIGxvZ3N0b3JlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIG1lc3NhZ2UgdG8gbG9nLlxuICAgKiBAcGFyYW0ge2ludH0gdGltZXN0YW1wIC0gdGltZXN0YW1wIGZvciBsb2cuXG4gICAqL1xuICBfZm9ybWF0IChtZXNzYWdlOiBzdHJpbmcsIHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGBbJHtuZXcgRGF0ZSh0aW1lc3RhbXApLnRvU3RyaW5nKCl9XTogKHItbG9jYWxpemUpIFwiJHttZXNzYWdlfVwiYFxuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGxvZ3MsIGFsbG93cyBmb3IgZmlsdGVyaW5nIGJ5IHR5cGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gTG9nIHR5cGUgdG8gZmlsdGVyIGJ5LlxuICAgKiBAcmV0dXJucyB7YXJyYXl9XG4gICAqL1xuICAkZ2V0ICh0eXBlOiBzdHJpbmcpIDogTG9nW10ge1xuICAgIHJldHVybiB0aGlzLmxvZ3MuZmlsdGVyKChsb2cpID0+IHR5cGUgPyBsb2cudHlwZSA9PT0gdHlwZSA6IHRydWUpXG4gIH1cblxuICAvKipcbiAgICogUHVzaGVzIHByb3ZpZGVkIG1lc3NhZ2UgdG8gbG9nIHN0b3JlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIE1lc3NhZ2UgdG8gbG9nLlxuICAgKi9cbiAgbG9nIChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLnRpbWVcbiAgICBpZiAodGhpcy5kZWJ1Z2dpbmcpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLl9mb3JtYXQobWVzc2FnZSwgdGltZXN0YW1wKSlcbiAgICB0aGlzLmxvZ3MucHVzaCh7IHR5cGU6ICdnZW5lcmFsJywgbWVzc2FnZSwgdGltZXN0YW1wIH0pXG4gIH1cblxuICAvKipcbiAgICogUHVzaGVzIHByb3ZpZGVkIG1lc3NhZ2UgdG8gbG9nIHN0b3JlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIE1lc3NhZ2UgdG8gbG9nLlxuICAgKi9cbiAgd2FybiAobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gdGhpcy50aW1lXG4gICAgaWYgKHRoaXMuZGVidWdnaW5nKVxuICAgICAgY29uc29sZS53YXJuKHRoaXMuX2Zvcm1hdChtZXNzYWdlLCB0aW1lc3RhbXApKVxuICAgIHRoaXMubG9ncy5wdXNoKHsgdHlwZTogJ3dhcm5pbmcnLCBtZXNzYWdlLCB0aW1lc3RhbXAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoZXMgcHJvdmlkZWQgbWVzc2FnZSB0byBsb2cgc3RvcmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gTWVzc2FnZSB0byBsb2cuXG4gICAqL1xuICBlcnJvciAobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gdGhpcy50aW1lXG4gICAgaWYgKHRoaXMuZGVidWdnaW5nKVxuICAgICAgY29uc29sZS5lcnJvcih0aGlzLl9mb3JtYXQobWVzc2FnZSwgdGltZXN0YW1wKSlcbiAgICB0aGlzLmxvZ3MucHVzaCh7IHR5cGU6ICdjcml0aWNhbCcsIG1lc3NhZ2UsIHRpbWVzdGFtcCB9KVxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sb2dnZXIudHMiLCJleHBvcnQgZnVuY3Rpb24gVGFnIChvcHRzIDogb2JqZWN0KSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIHNlbGYub3B0cyA9IG9wdHNcbiAgZnVuY3Rpb24gbG9jYWxpemF0aW9uICgpIHtcbiAgICBjb25zdCBub2RlQ29udGVudCA9IHNlbGYucm9vdC50ZXh0Q29udGVudCB8fCBzZWxmLnJvb3QuaW5uZXJIVE1MXG4gICAgLy8gIyBmZXRjaCBpbml0aWFsIHRyYW5zbGF0aW9uXG4gICAgbGV0IHRyYW5zbGF0aW9uID0gdHlwZW9mIHNlbGYub3B0cy50ID09ICdzdHJpbmcnID8gc2VsZi5sb2NhbGl6ZS50cmFuc2xhdGUoc2VsZi5vcHRzLnQpIDogc2VsZi5sb2NhbGl6ZS50cmFuc2xhdGUoc2VsZi5vcHRzLnQuaSwgc2VsZi5vcHRzLnQubClcbiAgICAvLyAjIGlmIGZhbGxiYWNrQ29udGVudCB0b2dnbGVkIGFuZCB0cmFuc2xhdGlvbiBpcyB0aGUgcHJvdmlkZWQgZmFsbGJhY2ssIHRyeSB0byB1c2UgZXhpc3Rpbmcgbm9kZSBjb250ZW50XG4gICAgdHJhbnNsYXRpb24gPSB0aGlzLmxvY2FsaXplID8gdGhpcy5sb2NhbGl6ZS5vcHRpb25zLmZhbGxiYWNrQ29udGVudCAmJiB0cmFuc2xhdGlvbiA9PSB0aGlzLmxvY2FsaXplLm9wdGlvbnMuZmFsbGJhY2sgPyBub2RlQ29udGVudCA/IG5vZGVDb250ZW50IDogdHJhbnNsYXRpb24gOiB0cmFuc2xhdGlvbiA6IHRyYW5zbGF0aW9uXG4gICAgaWYgKHR5cGVvZiBzZWxmLm9wdHMudCA9PSAnc3RyaW5nJylcbiAgICAgIHNlbGYucm9vdC5pbm5lckhUTUwgPSB0cmFuc2xhdGlvblxuICAgIGVsc2VcbiAgICAgIGlmICghc2VsZi5vcHRzLnQuYXR0cilcbiAgICAgICAgc2VsZi5yb290LmlubmVySFRNTCA9IHRyYW5zbGF0aW9uXG4gICAgICBlbHNlXG4gICAgICAgIHNlbGYucm9vdC5zZXRBdHRyaWJ1dGUoc2VsZi5vcHRzLnQuYXR0ciwgdHJhbnNsYXRpb24pXG4gIH1cbiAgc2VsZi5vbignbW91bnQnLCBsb2NhbGl6YXRpb24pXG4gIHNlbGYubG9jYWxpemUub24oJ3VwZGF0ZWQnLCBsb2NhbGl6YXRpb24pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbG9jYWxpemUudGFnLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==