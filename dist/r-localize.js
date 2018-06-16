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
            const current = typeof locale === 'object' ? locale.locale : locale;
            if (!localizations[current])
                throw Error(`Locale "${current}" has no mappings available`);
        });
        options.debug = typeof (options.debug) === 'undefined' ? false : options.debug;
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
        const self = this;
        if (locale) {
            if (!self.options.available.find(l => l === locale || l.locale === locale)) {
                self.$logger.error(`Locale "${locale}" not recognized.`);
                return;
            }
            self.trigger('update');
            if (self.webStore)
                window.localStorage.setItem('localization', locale);
            self._locale = locale;
            self.$logger.log(`Locale changed to "${locale}".`);
            self.trigger('updated');
        }
        return self._locale;
    }
    translate(item, locale = null) {
        const self = this;
        let stub = self.localizations[locale || self._locale];
        if (locale && !self.options.available.find(l => l === locale || l.locale === locale)) {
            self.$logger.error(`Locale "${locale}" not recognized.`);
            return self.options.fallback;
        }
        const branches = item.split('.');
        for (const b in branches) {
            const branch = branches[b];
            if (stub[branch])
                stub = stub[branch];
            else {
                self.$logger.error(`Provided item "${item}" could not be localized in locale "${locale || self._locale}".`);
                return self.options.fallback;
            }
        }
        self.$logger.log(`Localized item "${item}" retrieved for locale "${locale || self._locale}".`);
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
        let translation = typeof self.opts.t === 'string' ? self.localize.translate(self.opts.t) : self.localize.translate(self.opts.t.i, self.opts.t.l);
        if (self.localize)
            if (self.localize.options.fallbackContent && translation === self.localize.options.fallback)
                translation = nodeContent;
        const locale = self.localize.locale();
        const localeOptions = self.localize.options.available.find(l => typeof l === 'object' && l.locale === locale);
        if (localeOptions) {
            if (localeOptions.orientation)
                self.root.setAttribute('dir', localeOptions.orientation);
            if (localeOptions.fontFamily)
                self.root.style.fontFamily = localeOptions.fontFamily;
        }
        if (typeof self.opts.t === 'string')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2Zjg2NzFkOWY4NzgyNGU2MzdlZSIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYWxpemUudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Jpb3QtdHlwZXNjcmlwdC9yaW90LXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaW90LXR5cGVzY3JpcHQvbm9kZV9tb2R1bGVzL3Jpb3QvcmlvdCtjb21waWxlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2NhbGl6ZS50YWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxvQ0FBdUM7QUFHdkMsd0NBQWlDO0FBQ2pDLDhDQUFvQztBQUVwQyxjQUE4QixTQUFR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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsSUFBSTtBQUNqQixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQixhQUFhLFFBQVE7QUFDckI7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEdBQUcsR0FBRzs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEs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QyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztJQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO0FBQzNDLENBQUM7QUFqQ0Qsa0JBaUNDIiwiZmlsZSI6InItbG9jYWxpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJMb2NhbGl6ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJMb2NhbGl6ZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNmY4NjcxZDlmODc4MjRlNjM3ZWUiLCJpbXBvcnQgKiBhcyBSaW90IGZyb20gJ3Jpb3QtdHlwZXNjcmlwdCdcblxuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcidcbmltcG9ydCB7IFRhZyB9IGZyb20gJy4vbG9jYWxpemUudGFnJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhbGl6ZSBleHRlbmRzIFJpb3QuT2JzZXJ2YWJsZSB7XG5cbiAgcHJpdmF0ZSAkbG9nZ2VyOiBMb2dnZXJcbiAgcHJpdmF0ZSBvcHRpb25zOiBPcHRpb25zXG4gIHByaXZhdGUgbG9jYWxpemF0aW9uczogb2JqZWN0XG4gIHByaXZhdGUgX2xvY2FsZTogc3RyaW5nXG5cbiAgLyoqXG4gICAqIExvY2FsaXphdGlvbiBtaXhpbiBmb3IgaTE4biBpbXBsZW1lbnRhdGlvbi5cbiAgICogQHBhcmFtIHtvYmplY3R9IGxvY2FsaXphdGlvbnMgLSBEaWN0aW9uYXJ5IG9mIGxvY2FsaXphdGlvbnMuXG4gICAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIG1peGluLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKGluc3RhbmNlOiBhbnksIG9wdGlvbnM6IE9wdGlvbnMsIGxvY2FsaXphdGlvbnM6IG9iamVjdCkge1xuICAgIHN1cGVyKClcbiAgICAvLyAjIGNoZWNrcyBuZWNlc3NhcnkgZm9yIG5vbiB0cyB1c2VcbiAgICBpZiAoIW9wdGlvbnMuZGVmYXVsdCB8fCAhb3B0aW9ucy5hdmFpbGFibGUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdFeHBlY3RlZCBvcHRpb25zIHRvIGluY2x1ZGUgYSBkZWZhdWx0IGxvY2FsZSBhbmQgbGlzdCBvZiBhdmFpbGFibGUgbG9jYWxlcycpXG4gICAgb3B0aW9ucy5hdmFpbGFibGUuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgY29uc3QgY3VycmVudCA9IHR5cGVvZiBsb2NhbGUgPT09ICdvYmplY3QnID8gbG9jYWxlLmxvY2FsZSA6IGxvY2FsZVxuICAgICAgaWYgKCFsb2NhbGl6YXRpb25zW2N1cnJlbnRdKVxuICAgICAgICB0aHJvdyBFcnJvcihgTG9jYWxlIFwiJHtjdXJyZW50fVwiIGhhcyBubyBtYXBwaW5ncyBhdmFpbGFibGVgKVxuICAgIH0pXG4gICAgLy8gIyBzZXQgZGVmYXVsdHNcbiAgICBvcHRpb25zLmRlYnVnID0gdHlwZW9mKG9wdGlvbnMuZGVidWcpID09PSAndW5kZWZpbmVkJyA/IGZhbHNlIDogb3B0aW9ucy5kZWJ1Z1xuICAgIG9wdGlvbnMuZmFsbGJhY2tDb250ZW50ID0gb3B0aW9ucy5mYWxsYmFja0NvbnRlbnQgfHwgZmFsc2VcbiAgICBvcHRpb25zLmZhbGxiYWNrID0gb3B0aW9ucy5mYWxsYmFjayB8fCAnPydcbiAgICBvcHRpb25zLndlYlN0b3JlID0gb3B0aW9ucy53ZWJTdG9yZSB8fCBmYWxzZVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmxvY2FsaXphdGlvbnMgPSBsb2NhbGl6YXRpb25zXG4gICAgLy8gIyBzZXJ2ZXIgdnMgY2xpZW50XG4gICAgaWYgKHRoaXMud2ViU3RvcmUpXG4gICAgICB0aGlzLl9sb2NhbGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvY2FsaXphdGlvbicpIHx8IHRoaXMub3B0aW9ucy5kZWZhdWx0XG4gICAgZWxzZVxuICAgICAgdGhpcy5fbG9jYWxlID0gdGhpcy5vcHRpb25zLmRlZmF1bHRcblxuICAgIHRoaXMuJGxvZ2dlciA9IG5ldyBMb2dnZXIodGhpcy5vcHRpb25zLmRlYnVnKVxuICAgIHRoaXMuJGxvZ2dlci5sb2coJ0xvY2FsaXplIG1peGluIGluc3RhbnRpYXRlZC4nKVxuXG4gICAgaW5zdGFuY2UubWl4aW4oeyBsb2NhbGl6ZTogdGhpcyB9KVxuICAgIGluc3RhbmNlLnRhZygnbG9jYWxpemUnLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBUYWcpXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBvciBub3Qgd2ViIHN0b3JlIGlzIGVuYWJsZWQgYW5kIGF2YWlsYWJsZS5cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBnZXQgd2ViU3RvcmUgKCkgOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLndlYlN0b3JlICYmIHR5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJ1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBvciBzZXQgY3VycmVudCBsb2NhbGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgLSBMb2NhbGUgdG8gdXNlLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfHZvaWR9XG4gICAqL1xuICBsb2NhbGUgKGxvY2FsZSA9IG51bGwpIDogc3RyaW5nIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGlmIChsb2NhbGUpIHtcbiAgICAgIGlmICghc2VsZi5vcHRpb25zLmF2YWlsYWJsZS5maW5kKGwgPT4gbCA9PT0gbG9jYWxlIHx8IGwubG9jYWxlID09PSBsb2NhbGUpKSB7XG4gICAgICAgIHNlbGYuJGxvZ2dlci5lcnJvcihgTG9jYWxlIFwiJHsgbG9jYWxlIH1cIiBub3QgcmVjb2duaXplZC5gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNlbGYudHJpZ2dlcigndXBkYXRlJylcbiAgICAgIGlmIChzZWxmLndlYlN0b3JlKVxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvY2FsaXphdGlvbicsIGxvY2FsZSlcbiAgICAgIHNlbGYuX2xvY2FsZSA9IGxvY2FsZVxuICAgICAgc2VsZi4kbG9nZ2VyLmxvZyhgTG9jYWxlIGNoYW5nZWQgdG8gXCIkeyBsb2NhbGUgfVwiLmApXG4gICAgICBzZWxmLnRyaWdnZXIoJ3VwZGF0ZWQnKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZi5fbG9jYWxlXG4gIH1cblxuICAvKipcbiAgICogRmluZCBsb2NhbGl6ZWQgaXRlbS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBJdGVtIGtleSB0byBsb2NhbGl6ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZSAtIE9wdGlvbmFsIGxvY2FsZSwgb3RoZXJ3aXNlIHdpbGwgdXNlIGN1cnJlbnQuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB0cmFuc2xhdGUgKGl0ZW06IHN0cmluZywgbG9jYWxlID0gbnVsbCkgOiBzdHJpbmcge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgbGV0IHN0dWIgPSBzZWxmLmxvY2FsaXphdGlvbnNbbG9jYWxlIHx8IHNlbGYuX2xvY2FsZV1cbiAgICBpZiAobG9jYWxlICYmICFzZWxmLm9wdGlvbnMuYXZhaWxhYmxlLmZpbmQobCA9PiBsID09PSBsb2NhbGUgfHwgbC5sb2NhbGUgPT09IGxvY2FsZSkpIHtcbiAgICAgIHNlbGYuJGxvZ2dlci5lcnJvcihgTG9jYWxlIFwiJHsgbG9jYWxlIH1cIiBub3QgcmVjb2duaXplZC5gKVxuICAgICAgcmV0dXJuIHNlbGYub3B0aW9ucy5mYWxsYmFja1xuICAgIH1cbiAgICBjb25zdCBicmFuY2hlcyA9IGl0ZW0uc3BsaXQoJy4nKVxuICAgIC8vICMgc3BsaXQgdXAgdG8gdGVybWluYXRlIGluIHRoZSBldmVudCBhIGJyYW5jaCBpcyBub3QgZm91bmRcbiAgICBmb3IgKGNvbnN0IGIgaW4gYnJhbmNoZXMpIHtcbiAgICAgIGNvbnN0IGJyYW5jaCA9IGJyYW5jaGVzW2JdXG4gICAgICBpZiAoc3R1YlticmFuY2hdKVxuICAgICAgICBzdHViID0gc3R1YlticmFuY2hdXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNlbGYuJGxvZ2dlci5lcnJvcihgUHJvdmlkZWQgaXRlbSBcIiR7IGl0ZW0gfVwiIGNvdWxkIG5vdCBiZSBsb2NhbGl6ZWQgaW4gbG9jYWxlIFwiJHsgbG9jYWxlIHx8IHNlbGYuX2xvY2FsZSB9XCIuYClcbiAgICAgICAgICByZXR1cm4gc2VsZi5vcHRpb25zLmZhbGxiYWNrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxmLiRsb2dnZXIubG9nKGBMb2NhbGl6ZWQgaXRlbSBcIiR7IGl0ZW0gfVwiIHJldHJpZXZlZCBmb3IgbG9jYWxlIFwiJHsgbG9jYWxlIHx8IHNlbGYuX2xvY2FsZSB9XCIuYClcbiAgICBzZWxmLnRyaWdnZXIoJ2xvY2FsaXplJywgeyBpdGVtLCBsb2NhbGU6IGxvY2FsZSB8fCBzZWxmLl9sb2NhbGUgfSlcbiAgICByZXR1cm4gc3R1YlxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sb2NhbGl6ZS50cyIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgcmlvdCA9IHJlcXVpcmUoXCJyaW90L3Jpb3QrY29tcGlsZXJcIik7XHJcbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoKSB7XHJcbiAgICAgICAgcmlvdC5vYnNlcnZhYmxlKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnRzLCBjYWxsYmFjaykgeyB9O1xyXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub25lID0gZnVuY3Rpb24gKGV2ZW50cywgY2FsbGJhY2spIHsgfTtcclxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudHMpIHsgfTtcclxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gT2JzZXJ2YWJsZTtcclxufSgpKTtcclxuZXhwb3J0cy5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZTtcclxudmFyIEVsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRWxlbWVudCgpIHtcclxuICAgIH1cclxuICAgIEVsZW1lbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7IH07XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS51bm1vdW50ID0gZnVuY3Rpb24gKGtlZXBUaGVQYXJlbnQpIHsgfTtcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZnVuKSB7IH07XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5vbmUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBmdW4pIHsgfTtcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudHMpIHsgfTtcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5taXhpbiA9IGZ1bmN0aW9uIChtaXhpbk9iamVjdCwgaW5zdGFuY2UpIHsgfTtcclxuICAgIEVsZW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRhZ05hbWUgPSB0aGlzLnByb3RvdHlwZS50YWdOYW1lO1xyXG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcbiAgICAgICAgcmlvdC5tb3VudChlbCwgdGFnTmFtZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBFbGVtZW50O1xyXG59KCkpO1xyXG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xyXG4vLyBuZXcgZXh0ZW5kLCB3b3JrcyB3aXRoIGdldHRlcnMgYW5kIHNldHRlcnNcclxuZnVuY3Rpb24gZXh0ZW5kKGQsIGVsZW1lbnQpIHtcclxuICAgIHZhciBtYXAgPSBPYmplY3Qua2V5cyhlbGVtZW50LnByb3RvdHlwZSkucmVkdWNlKGZ1bmN0aW9uIChkZXNjcmlwdG9ycywga2V5KSB7XHJcbiAgICAgICAgZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudC5wcm90b3R5cGUsIGtleSk7XHJcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3JzO1xyXG4gICAgfSwge30pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZCwgbWFwKTtcclxufVxyXG4vKiBvbGQgZXh0ZW5kLCB3aXRob3V0IGdldHRlcnMgYW5kIHNldHRlcnNcclxuZnVuY3Rpb24gZXh0ZW5kKGQsIGVsZW1lbnQpIHtcclxuICAgT2JqZWN0LmtleXMoZWxlbWVudC5wcm90b3R5cGUpLmZvckVhY2goKGtleSkgPT4gZFtrZXldID0gZWxlbWVudC5wcm90b3R5cGVba2V5XSk7XHJcbn1cclxuKi9cclxuZXhwb3J0cy5wcmVjb21waWxlZFRhZ3MgPSB7fTtcclxuZnVuY3Rpb24gcmVnaXN0ZXJDbGFzcyhlbGVtZW50KSB7XHJcbiAgICBmdW5jdGlvbiByZWdpc3RlclRhZyhjb21waWxlZFRhZykge1xyXG4gICAgICAgIHZhciB0cmFuc2Zvcm1GdW5jdGlvbiA9IGZ1bmN0aW9uIChvcHRzKSB7XHJcbiAgICAgICAgICAgIGV4dGVuZCh0aGlzLCBlbGVtZW50KTsgLy8gY29waWVzIHByb3RvdHlwZSBpbnRvIFwidGhpc1wiXHJcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwbHkodGhpcywgW29wdHNdKTsgLy8gY2FsbHMgY2xhc3MgY29uc3RydWN0b3IgYXBwbHlpbmcgaXQgb24gXCJ0aGlzXCJcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQucHJvdG90eXBlLm1vdW50ZWQgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMub24oXCJtb3VudFwiLCB0aGlzLm1vdW50ZWQpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5wcm90b3R5cGUudW5tb3VudGVkICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwidW5tb3VudFwiLCB0aGlzLnVubW91bnRlZCk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnByb3RvdHlwZS51cGRhdGluZyAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInVwZGF0ZVwiLCB0aGlzLnVwZGF0aW5nKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQucHJvdG90eXBlLnVwZGF0ZWQgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMub24oXCJ1cGRhdGVkXCIsIHRoaXMudXBkYXRlZCk7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gc3VwcG9ydCBmb3IgaW5pdChvcHRzKSA/XHJcbiAgICAgICAgfTtcclxuICAgICAgICByaW90LnRhZzIoY29tcGlsZWRUYWcudGFnTmFtZSwgY29tcGlsZWRUYWcuaHRtbCwgY29tcGlsZWRUYWcuY3NzLCBjb21waWxlZFRhZy5hdHRyaWJzLCB0cmFuc2Zvcm1GdW5jdGlvbiwgcmlvdC5zZXR0aW5ncy5icmFja2V0cyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkVGFnLnRhZ05hbWU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBsb2FkVGVtcGxhdGVGcm9tSFRUUCh0ZW1wbGF0ZSkge1xyXG4gICAgICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXEub3BlbihcIkdFVFwiLCB0ZW1wbGF0ZSwgZmFsc2UpO1xyXG4gICAgICAgIHJlcS5zZW5kKCk7XHJcbiAgICAgICAgaWYgKHJlcS5zdGF0dXMgPT0gMjAwKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVxLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRocm93IHJlcS5yZXNwb25zZVRleHQ7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICB2YXIgY29tcGlsZWQ7XHJcbiAgICAvLyBnZXRzIHN0cmluZyB0ZW1wbGF0ZTogaW5saW5lZCwgdmlhIGh0dHAgcmVxdWVzdCBvciB2aWEgcHJlY29tcGlsZWQgY2FjaGVcclxuICAgIGlmIChlbGVtZW50LnByb3RvdHlwZS50ZW1wbGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmFyIHRhZ1RlbXBsYXRlID0gZWxlbWVudC5wcm90b3R5cGUudGVtcGxhdGU7XHJcbiAgICAgICAgaWYgKHRhZ1RlbXBsYXRlLmluZGV4T2YoXCI8XCIpIDwgMCkge1xyXG4gICAgICAgICAgICAvLyB0YWcgaXMgYSBmaWxlXHJcbiAgICAgICAgICAgIGlmIChleHBvcnRzLnByZWNvbXBpbGVkVGFnc1t0YWdUZW1wbGF0ZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gbG9hZHMgaXQgZnJvbSBwcmVjb21waWxlZCBjYWNoZVxyXG4gICAgICAgICAgICAgICAgY29tcGlsZWQgPSBleHBvcnRzLnByZWNvbXBpbGVkVGFnc1t0YWdUZW1wbGF0ZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2FkcyBmcm9tIEhUVFAgYW5kIGNvbXBpbGUgb24gdGhlIGZseVxyXG4gICAgICAgICAgICAgICAgdGFnVGVtcGxhdGUgPSBsb2FkVGVtcGxhdGVGcm9tSFRUUCh0YWdUZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBjb21waWxlZCA9IHJpb3QuY29tcGlsZSh0YWdUZW1wbGF0ZSwgdHJ1ZSwgeyBlbnRpdGllczogdHJ1ZSB9KVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGFnIGlzIGlubGluZWQsIGNvbXBpbGUgb24gdGhlIGZseVxyXG4gICAgICAgICAgICBjb21waWxlZCA9IHJpb3QuY29tcGlsZSh0YWdUZW1wbGF0ZSwgdHJ1ZSwgeyBlbnRpdGllczogdHJ1ZSB9KVswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudC5wcm90b3R5cGUudGFnTmFtZSA9IHJlZ2lzdGVyVGFnKGNvbXBpbGVkKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICB0aHJvdyBcInRlbXBsYXRlIHByb3BlcnR5IG5vdCBzcGVjaWZpZWRcIjtcclxufVxyXG5leHBvcnRzLnJlZ2lzdGVyQ2xhc3MgPSByZWdpc3RlckNsYXNzO1xyXG4vLyBAdGVtcGxhdGUgZGVjb3JhdG9yXHJcbmZ1bmN0aW9uIHRlbXBsYXRlKHRlbXBsYXRlKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGVbXCJ0ZW1wbGF0ZVwiXSA9IHRlbXBsYXRlO1xyXG4gICAgICAgIHJlZ2lzdGVyQ2xhc3ModGFyZ2V0KTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yaW90LXRzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Jpb3QtdHlwZXNjcmlwdC9yaW90LXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIFJpb3QgdjIuNi44LCBAbGljZW5zZSBNSVQgKi9cblxuOyhmdW5jdGlvbih3aW5kb3csIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG52YXIgcmlvdCA9IHsgdmVyc2lvbjogJ3YyLjYuOCcsIHNldHRpbmdzOiB7fSB9LFxuICAvLyBiZSBhd2FyZSwgaW50ZXJuYWwgdXNhZ2VcbiAgLy8gQVRURU5USU9OOiBwcmVmaXggdGhlIGdsb2JhbCBkeW5hbWljIHZhcmlhYmxlcyB3aXRoIGBfX2BcblxuICAvLyBjb3VudGVyIHRvIGdpdmUgYSB1bmlxdWUgaWQgdG8gYWxsIHRoZSBUYWcgaW5zdGFuY2VzXG4gIF9fdWlkID0gMCxcbiAgLy8gdGFncyBpbnN0YW5jZXMgY2FjaGVcbiAgX192aXJ0dWFsRG9tID0gW10sXG4gIC8vIHRhZ3MgaW1wbGVtZW50YXRpb24gY2FjaGVcbiAgX190YWdJbXBsID0ge30sXG5cbiAgLyoqXG4gICAqIENvbnN0XG4gICAqL1xuICBHTE9CQUxfTUlYSU4gPSAnX19nbG9iYWxfbWl4aW4nLFxuXG4gIC8vIHJpb3Qgc3BlY2lmaWMgcHJlZml4ZXNcbiAgUklPVF9QUkVGSVggPSAncmlvdC0nLFxuICBSSU9UX1RBRyA9IFJJT1RfUFJFRklYICsgJ3RhZycsXG4gIFJJT1RfVEFHX0lTID0gJ2RhdGEtaXMnLFxuXG4gIC8vIGZvciB0eXBlb2YgPT0gJycgY29tcGFyaXNvbnNcbiAgVF9TVFJJTkcgPSAnc3RyaW5nJyxcbiAgVF9PQkpFQ1QgPSAnb2JqZWN0JyxcbiAgVF9VTkRFRiAgPSAndW5kZWZpbmVkJyxcbiAgVF9GVU5DVElPTiA9ICdmdW5jdGlvbicsXG4gIFhMSU5LX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICBYTElOS19SRUdFWCA9IC9eeGxpbms6KFxcdyspLyxcbiAgLy8gc3BlY2lhbCBuYXRpdmUgdGFncyB0aGF0IGNhbm5vdCBiZSB0cmVhdGVkIGxpa2UgdGhlIG90aGVyc1xuICBTUEVDSUFMX1RBR1NfUkVHRVggPSAvXig/OnQoPzpib2R5fGhlYWR8Zm9vdHxbcmhkXSl8Y2FwdGlvbnxjb2woPzpncm91cCk/fG9wdCg/Omlvbnxncm91cCkpJC8sXG4gIFJFU0VSVkVEX1dPUkRTX0JMQUNLTElTVCA9IC9eKD86Xyg/Oml0ZW18aWR8cGFyZW50KXx1cGRhdGV8cm9vdHwoPzp1bik/bW91bnR8bWl4aW58aXMoPzpNb3VudGVkfExvb3ApfHRhZ3N8cGFyZW50fG9wdHN8dHJpZ2dlcnxvKD86bnxmZnxuZSkpJC8sXG4gIC8vIFNWRyB0YWdzIGxpc3QgaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRy9hdHRpbmRleC5odG1sI1ByZXNlbnRhdGlvbkF0dHJpYnV0ZXNcbiAgU1ZHX1RBR1NfTElTVCA9IFsnYWx0R2x5cGgnLCAnYW5pbWF0ZScsICdhbmltYXRlQ29sb3InLCAnY2lyY2xlJywgJ2NsaXBQYXRoJywgJ2RlZnMnLCAnZWxsaXBzZScsICdmZUJsZW5kJywgJ2ZlQ29sb3JNYXRyaXgnLCAnZmVDb21wb25lbnRUcmFuc2ZlcicsICdmZUNvbXBvc2l0ZScsICdmZUNvbnZvbHZlTWF0cml4JywgJ2ZlRGlmZnVzZUxpZ2h0aW5nJywgJ2ZlRGlzcGxhY2VtZW50TWFwJywgJ2ZlRmxvb2QnLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTW9ycGhvbG9neScsICdmZU9mZnNldCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLCAnZmVUaWxlJywgJ2ZlVHVyYnVsZW5jZScsICdmaWx0ZXInLCAnZm9udCcsICdmb3JlaWduT2JqZWN0JywgJ2cnLCAnZ2x5cGgnLCAnZ2x5cGhSZWYnLCAnaW1hZ2UnLCAnbGluZScsICdsaW5lYXJHcmFkaWVudCcsICdtYXJrZXInLCAnbWFzaycsICdtaXNzaW5nLWdseXBoJywgJ3BhdGgnLCAncGF0dGVybicsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JhZGlhbEdyYWRpZW50JywgJ3JlY3QnLCAnc3RvcCcsICdzdmcnLCAnc3dpdGNoJywgJ3N5bWJvbCcsICd0ZXh0JywgJ3RleHRQYXRoJywgJ3RyZWYnLCAndHNwYW4nLCAndXNlJ10sXG5cbiAgLy8gdmVyc2lvbiMgZm9yIElFIDgtMTEsIDAgZm9yIG90aGVyc1xuICBJRV9WRVJTSU9OID0gKHdpbmRvdyAmJiB3aW5kb3cuZG9jdW1lbnQgfHwge30pLmRvY3VtZW50TW9kZSB8IDAsXG5cbiAgLy8gZGV0ZWN0IGZpcmVmb3ggdG8gZml4ICMxMzc0XG4gIEZJUkVGT1ggPSB3aW5kb3cgJiYgISF3aW5kb3cuSW5zdGFsbFRyaWdnZXJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5yaW90Lm9ic2VydmFibGUgPSBmdW5jdGlvbihlbCkge1xuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIG9yaWdpbmFsIG9iamVjdCBvciBjcmVhdGUgYSBuZXcgZW1wdHkgb25lXG4gICAqIEB0eXBlIHsgT2JqZWN0IH1cbiAgICovXG5cbiAgZWwgPSBlbCB8fCB7fVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlc1xuICAgKi9cbiAgdmFyIGNhbGxiYWNrcyA9IHt9LFxuICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbiAgLyoqXG4gICAqIFByaXZhdGUgTWV0aG9kc1xuICAgKi9cblxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIG5lZWRlZCB0byBnZXQgYW5kIGxvb3AgYWxsIHRoZSBldmVudHMgaW4gYSBzdHJpbmdcbiAgICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGUgLSBldmVudCBzdHJpbmdcbiAgICogQHBhcmFtICAge0Z1bmN0aW9ufSAgIGZuIC0gY2FsbGJhY2tcbiAgICovXG4gIGZ1bmN0aW9uIG9uRWFjaEV2ZW50KGUsIGZuKSB7XG4gICAgdmFyIGVzID0gZS5zcGxpdCgnICcpLCBsID0gZXMubGVuZ3RoLCBpID0gMFxuICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgbmFtZSA9IGVzW2ldXG4gICAgICBpZiAobmFtZSkgZm4obmFtZSwgaSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVibGljIEFwaVxuICAgKi9cblxuICAvLyBleHRlbmQgdGhlIGVsIG9iamVjdCBhZGRpbmcgdGhlIG9ic2VydmFibGUgbWV0aG9kc1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlbCwge1xuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUgZ2l2ZW4gc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgYGV2ZW50c2AgYW5kXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBlYWNoIHRpbWUgYW4gZXZlbnQgaXMgdHJpZ2dlcmVkLlxuICAgICAqIEBwYXJhbSAgeyBTdHJpbmcgfSBldmVudHMgLSBldmVudHMgaWRzXG4gICAgICogQHBhcmFtICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50cywgZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPSAnZnVuY3Rpb24nKSAgcmV0dXJuIGVsXG5cbiAgICAgICAgb25FYWNoRXZlbnQoZXZlbnRzLCBmdW5jdGlvbihuYW1lLCBwb3MpIHtcbiAgICAgICAgICAoY2FsbGJhY2tzW25hbWVdID0gY2FsbGJhY2tzW25hbWVdIHx8IFtdKS5wdXNoKGZuKVxuICAgICAgICAgIGZuLnR5cGVkID0gcG9zID4gMFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBgZXZlbnRzYCBsaXN0ZW5lcnNcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50cyAtIGV2ZW50cyBpZHNcbiAgICAgKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvZmY6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudHMsIGZuKSB7XG4gICAgICAgIGlmIChldmVudHMgPT0gJyonICYmICFmbikgY2FsbGJhY2tzID0ge31cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgb25FYWNoRXZlbnQoZXZlbnRzLCBmdW5jdGlvbihuYW1lLCBwb3MpIHtcbiAgICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgICB2YXIgYXJyID0gY2FsbGJhY2tzW25hbWVdXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBjYjsgY2IgPSBhcnIgJiYgYXJyW2ldOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2IgPT0gZm4pIGFyci5zcGxpY2UoaS0tLCAxKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgZGVsZXRlIGNhbGxiYWNrc1tuYW1lXVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUgZ2l2ZW4gc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgYGV2ZW50c2AgYW5kXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBhdCBtb3N0IG9uY2VcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50cyAtIGV2ZW50cyBpZHNcbiAgICAgKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbmU6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudHMsIGZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uKCkge1xuICAgICAgICAgIGVsLm9mZihldmVudHMsIG9uKVxuICAgICAgICAgIGZuLmFwcGx5KGVsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsLm9uKGV2ZW50cywgb24pXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYWxsIGNhbGxiYWNrIGZ1bmN0aW9ucyB0aGF0IGxpc3RlbiB0b1xuICAgICAqIHRoZSBnaXZlbiBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBgZXZlbnRzYFxuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnRzIC0gZXZlbnRzIGlkc1xuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICB0cmlnZ2VyOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnRzKSB7XG5cbiAgICAgICAgLy8gZ2V0dGluZyB0aGUgYXJndW1lbnRzXG4gICAgICAgIHZhciBhcmdsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMSxcbiAgICAgICAgICBhcmdzID0gbmV3IEFycmF5KGFyZ2xlbiksXG4gICAgICAgICAgZm5zXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdsZW47IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdIC8vIHNraXAgZmlyc3QgYXJndW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIG9uRWFjaEV2ZW50KGV2ZW50cywgZnVuY3Rpb24obmFtZSwgcG9zKSB7XG5cbiAgICAgICAgICBmbnMgPSBzbGljZS5jYWxsKGNhbGxiYWNrc1tuYW1lXSB8fCBbXSwgMClcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBmbjsgZm4gPSBmbnNbaV07ICsraSkge1xuICAgICAgICAgICAgaWYgKGZuLmJ1c3kpIGNvbnRpbnVlXG4gICAgICAgICAgICBmbi5idXN5ID0gMVxuICAgICAgICAgICAgZm4uYXBwbHkoZWwsIGZuLnR5cGVkID8gW25hbWVdLmNvbmNhdChhcmdzKSA6IGFyZ3MpXG4gICAgICAgICAgICBpZiAoZm5zW2ldICE9PSBmbikgeyBpLS0gfVxuICAgICAgICAgICAgZm4uYnVzeSA9IDBcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY2FsbGJhY2tzWycqJ10gJiYgbmFtZSAhPSAnKicpXG4gICAgICAgICAgICBlbC50cmlnZ2VyLmFwcGx5KGVsLCBbJyonLCBuYW1lXS5jb25jYXQoYXJncykpXG5cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGVsXG5cbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG47KGZ1bmN0aW9uKHJpb3QpIHtcblxuLyoqXG4gKiBTaW1wbGUgY2xpZW50LXNpZGUgcm91dGVyXG4gKiBAbW9kdWxlIHJpb3Qtcm91dGVcbiAqL1xuXG5cbnZhciBSRV9PUklHSU4gPSAvXi4rP1xcL1xcLytbXlxcL10rLyxcbiAgRVZFTlRfTElTVEVORVIgPSAnRXZlbnRMaXN0ZW5lcicsXG4gIFJFTU9WRV9FVkVOVF9MSVNURU5FUiA9ICdyZW1vdmUnICsgRVZFTlRfTElTVEVORVIsXG4gIEFERF9FVkVOVF9MSVNURU5FUiA9ICdhZGQnICsgRVZFTlRfTElTVEVORVIsXG4gIEhBU19BVFRSSUJVVEUgPSAnaGFzQXR0cmlidXRlJyxcbiAgUkVQTEFDRSA9ICdyZXBsYWNlJyxcbiAgUE9QU1RBVEUgPSAncG9wc3RhdGUnLFxuICBIQVNIQ0hBTkdFID0gJ2hhc2hjaGFuZ2UnLFxuICBUUklHR0VSID0gJ3RyaWdnZXInLFxuICBNQVhfRU1JVF9TVEFDS19MRVZFTCA9IDMsXG4gIHdpbiA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LFxuICBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgIT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQsXG4gIGhpc3QgPSB3aW4gJiYgaGlzdG9yeSxcbiAgbG9jID0gd2luICYmIChoaXN0LmxvY2F0aW9uIHx8IHdpbi5sb2NhdGlvbiksIC8vIHNlZSBodG1sNS1oaXN0b3J5LWFwaVxuICBwcm90ID0gUm91dGVyLnByb3RvdHlwZSwgLy8gdG8gbWluaWZ5IG1vcmVcbiAgY2xpY2tFdmVudCA9IGRvYyAmJiBkb2Mub250b3VjaHN0YXJ0ID8gJ3RvdWNoc3RhcnQnIDogJ2NsaWNrJyxcbiAgc3RhcnRlZCA9IGZhbHNlLFxuICBjZW50cmFsID0gcmlvdC5vYnNlcnZhYmxlKCksXG4gIHJvdXRlRm91bmQgPSBmYWxzZSxcbiAgZGVib3VuY2VkRW1pdCxcbiAgYmFzZSwgY3VycmVudCwgcGFyc2VyLCBzZWNvbmRQYXJzZXIsIGVtaXRTdGFjayA9IFtdLCBlbWl0U3RhY2tMZXZlbCA9IDBcblxuLyoqXG4gKiBEZWZhdWx0IHBhcnNlci4gWW91IGNhbiByZXBsYWNlIGl0IHZpYSByb3V0ZXIucGFyc2VyIG1ldGhvZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gY3VycmVudCBwYXRoIChub3JtYWxpemVkKVxuICogQHJldHVybnMge2FycmF5fSBhcnJheVxuICovXG5mdW5jdGlvbiBERUZBVUxUX1BBUlNFUihwYXRoKSB7XG4gIHJldHVybiBwYXRoLnNwbGl0KC9bLz8jXS8pXG59XG5cbi8qKlxuICogRGVmYXVsdCBwYXJzZXIgKHNlY29uZCkuIFlvdSBjYW4gcmVwbGFjZSBpdCB2aWEgcm91dGVyLnBhcnNlciBtZXRob2QuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGN1cnJlbnQgcGF0aCAobm9ybWFsaXplZClcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWx0ZXIgLSBmaWx0ZXIgc3RyaW5nIChub3JtYWxpemVkKVxuICogQHJldHVybnMge2FycmF5fSBhcnJheVxuICovXG5mdW5jdGlvbiBERUZBVUxUX1NFQ09ORF9QQVJTRVIocGF0aCwgZmlsdGVyKSB7XG4gIHZhciByZSA9IG5ldyBSZWdFeHAoJ14nICsgZmlsdGVyW1JFUExBQ0VdKC9cXCovZywgJyhbXi8/I10rPyknKVtSRVBMQUNFXSgvXFwuXFwuLywgJy4qJykgKyAnJCcpLFxuICAgIGFyZ3MgPSBwYXRoLm1hdGNoKHJlKVxuXG4gIGlmIChhcmdzKSByZXR1cm4gYXJncy5zbGljZSgxKVxufVxuXG4vKipcbiAqIFNpbXBsZS9jaGVhcCBkZWJvdW5jZSBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtICAge2Z1bmN0aW9ufSBmbiAtIGNhbGxiYWNrXG4gKiBAcGFyYW0gICB7bnVtYmVyfSBkZWxheSAtIGRlbGF5IGluIHNlY29uZHNcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gZGVib3VuY2VkIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZuLCBkZWxheSkge1xuICB2YXIgdFxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0KVxuICAgIHQgPSBzZXRUaW1lb3V0KGZuLCBkZWxheSlcbiAgfVxufVxuXG4vKipcbiAqIFNldCB0aGUgd2luZG93IGxpc3RlbmVycyB0byB0cmlnZ2VyIHRoZSByb3V0ZXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXV0b0V4ZWMgLSBzZWUgcm91dGUuc3RhcnRcbiAqL1xuZnVuY3Rpb24gc3RhcnQoYXV0b0V4ZWMpIHtcbiAgZGVib3VuY2VkRW1pdCA9IGRlYm91bmNlKGVtaXQsIDEpXG4gIHdpbltBRERfRVZFTlRfTElTVEVORVJdKFBPUFNUQVRFLCBkZWJvdW5jZWRFbWl0KVxuICB3aW5bQUREX0VWRU5UX0xJU1RFTkVSXShIQVNIQ0hBTkdFLCBkZWJvdW5jZWRFbWl0KVxuICBkb2NbQUREX0VWRU5UX0xJU1RFTkVSXShjbGlja0V2ZW50LCBjbGljaylcbiAgaWYgKGF1dG9FeGVjKSBlbWl0KHRydWUpXG59XG5cbi8qKlxuICogUm91dGVyIGNsYXNzXG4gKi9cbmZ1bmN0aW9uIFJvdXRlcigpIHtcbiAgdGhpcy4kID0gW11cbiAgcmlvdC5vYnNlcnZhYmxlKHRoaXMpIC8vIG1ha2UgaXQgb2JzZXJ2YWJsZVxuICBjZW50cmFsLm9uKCdzdG9wJywgdGhpcy5zLmJpbmQodGhpcykpXG4gIGNlbnRyYWwub24oJ2VtaXQnLCB0aGlzLmUuYmluZCh0aGlzKSlcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGhbUkVQTEFDRV0oL15cXC98XFwvJC8sICcnKVxufVxuXG5mdW5jdGlvbiBpc1N0cmluZyhzdHIpIHtcbiAgcmV0dXJuIHR5cGVvZiBzdHIgPT0gJ3N0cmluZydcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhcnQgYWZ0ZXIgZG9tYWluIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmIC0gZnVsbHBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBhdGggZnJvbSByb290XG4gKi9cbmZ1bmN0aW9uIGdldFBhdGhGcm9tUm9vdChocmVmKSB7XG4gIHJldHVybiAoaHJlZiB8fCBsb2MuaHJlZilbUkVQTEFDRV0oUkVfT1JJR0lOLCAnJylcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhcnQgYWZ0ZXIgYmFzZVxuICogQHBhcmFtIHtzdHJpbmd9IGhyZWYgLSBmdWxscGF0aFxuICogQHJldHVybnMge3N0cmluZ30gcGF0aCBmcm9tIGJhc2VcbiAqL1xuZnVuY3Rpb24gZ2V0UGF0aEZyb21CYXNlKGhyZWYpIHtcbiAgcmV0dXJuIGJhc2VbMF0gPT0gJyMnXG4gICAgPyAoaHJlZiB8fCBsb2MuaHJlZiB8fCAnJykuc3BsaXQoYmFzZSlbMV0gfHwgJydcbiAgICA6IChsb2MgPyBnZXRQYXRoRnJvbVJvb3QoaHJlZikgOiBocmVmIHx8ICcnKVtSRVBMQUNFXShiYXNlLCAnJylcbn1cblxuZnVuY3Rpb24gZW1pdChmb3JjZSkge1xuICAvLyB0aGUgc3RhY2sgaXMgbmVlZGVkIGZvciByZWRpcmVjdGlvbnNcbiAgdmFyIGlzUm9vdCA9IGVtaXRTdGFja0xldmVsID09IDAsIGZpcnN0XG4gIGlmIChNQVhfRU1JVF9TVEFDS19MRVZFTCA8PSBlbWl0U3RhY2tMZXZlbCkgcmV0dXJuXG5cbiAgZW1pdFN0YWNrTGV2ZWwrK1xuICBlbWl0U3RhY2sucHVzaChmdW5jdGlvbigpIHtcbiAgICB2YXIgcGF0aCA9IGdldFBhdGhGcm9tQmFzZSgpXG4gICAgaWYgKGZvcmNlIHx8IHBhdGggIT0gY3VycmVudCkge1xuICAgICAgY2VudHJhbFtUUklHR0VSXSgnZW1pdCcsIHBhdGgpXG4gICAgICBjdXJyZW50ID0gcGF0aFxuICAgIH1cbiAgfSlcbiAgaWYgKGlzUm9vdCkge1xuICAgIHdoaWxlIChmaXJzdCA9IGVtaXRTdGFjay5zaGlmdCgpKSBmaXJzdCgpIC8vIHN0YWNrIGluY3Jlc2VzIHdpdGhpbiB0aGlzIGNhbGxcbiAgICBlbWl0U3RhY2tMZXZlbCA9IDBcbiAgfVxufVxuXG5mdW5jdGlvbiBjbGljayhlKSB7XG4gIGlmIChcbiAgICBlLndoaWNoICE9IDEgLy8gbm90IGxlZnQgY2xpY2tcbiAgICB8fCBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkgLy8gb3IgbWV0YSBrZXlzXG4gICAgfHwgZS5kZWZhdWx0UHJldmVudGVkIC8vIG9yIGRlZmF1bHQgcHJldmVudGVkXG4gICkgcmV0dXJuXG5cbiAgdmFyIGVsID0gZS50YXJnZXRcbiAgd2hpbGUgKGVsICYmIGVsLm5vZGVOYW1lICE9ICdBJykgZWwgPSBlbC5wYXJlbnROb2RlXG5cbiAgaWYgKFxuICAgICFlbCB8fCBlbC5ub2RlTmFtZSAhPSAnQScgLy8gbm90IEEgdGFnXG4gICAgfHwgZWxbSEFTX0FUVFJJQlVURV0oJ2Rvd25sb2FkJykgLy8gaGFzIGRvd25sb2FkIGF0dHJcbiAgICB8fCAhZWxbSEFTX0FUVFJJQlVURV0oJ2hyZWYnKSAvLyBoYXMgbm8gaHJlZiBhdHRyXG4gICAgfHwgZWwudGFyZ2V0ICYmIGVsLnRhcmdldCAhPSAnX3NlbGYnIC8vIGFub3RoZXIgd2luZG93IG9yIGZyYW1lXG4gICAgfHwgZWwuaHJlZi5pbmRleE9mKGxvYy5ocmVmLm1hdGNoKFJFX09SSUdJTilbMF0pID09IC0xIC8vIGNyb3NzIG9yaWdpblxuICApIHJldHVyblxuXG4gIGlmIChlbC5ocmVmICE9IGxvYy5ocmVmXG4gICAgJiYgKFxuICAgICAgZWwuaHJlZi5zcGxpdCgnIycpWzBdID09IGxvYy5ocmVmLnNwbGl0KCcjJylbMF0gLy8gaW50ZXJuYWwganVtcFxuICAgICAgfHwgYmFzZVswXSAhPSAnIycgJiYgZ2V0UGF0aEZyb21Sb290KGVsLmhyZWYpLmluZGV4T2YoYmFzZSkgIT09IDAgLy8gb3V0c2lkZSBvZiBiYXNlXG4gICAgICB8fCBiYXNlWzBdID09ICcjJyAmJiBlbC5ocmVmLnNwbGl0KGJhc2UpWzBdICE9IGxvYy5ocmVmLnNwbGl0KGJhc2UpWzBdIC8vIG91dHNpZGUgb2YgI2Jhc2VcbiAgICAgIHx8ICFnbyhnZXRQYXRoRnJvbUJhc2UoZWwuaHJlZiksIGVsLnRpdGxlIHx8IGRvYy50aXRsZSkgLy8gcm91dGUgbm90IGZvdW5kXG4gICAgKSkgcmV0dXJuXG5cbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG59XG5cbi8qKlxuICogR28gdG8gdGhlIHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gZGVzdGluYXRpb24gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlIC0gcGFnZSB0aXRsZVxuICogQHBhcmFtIHtib29sZWFufSBzaG91bGRSZXBsYWNlIC0gdXNlIHJlcGxhY2VTdGF0ZSBvciBwdXNoU3RhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufSAtIHJvdXRlIG5vdCBmb3VuZCBmbGFnXG4gKi9cbmZ1bmN0aW9uIGdvKHBhdGgsIHRpdGxlLCBzaG91bGRSZXBsYWNlKSB7XG4gIC8vIFNlcnZlci1zaWRlIHVzYWdlOiBkaXJlY3RseSBleGVjdXRlIGhhbmRsZXJzIGZvciB0aGUgcGF0aFxuICBpZiAoIWhpc3QpIHJldHVybiBjZW50cmFsW1RSSUdHRVJdKCdlbWl0JywgZ2V0UGF0aEZyb21CYXNlKHBhdGgpKVxuXG4gIHBhdGggPSBiYXNlICsgbm9ybWFsaXplKHBhdGgpXG4gIHRpdGxlID0gdGl0bGUgfHwgZG9jLnRpdGxlXG4gIC8vIGJyb3dzZXJzIGlnbm9yZXMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgYHRpdGxlYFxuICBzaG91bGRSZXBsYWNlXG4gICAgPyBoaXN0LnJlcGxhY2VTdGF0ZShudWxsLCB0aXRsZSwgcGF0aClcbiAgICA6IGhpc3QucHVzaFN0YXRlKG51bGwsIHRpdGxlLCBwYXRoKVxuICAvLyBzbyB3ZSBuZWVkIHRvIHNldCBpdCBtYW51YWxseVxuICBkb2MudGl0bGUgPSB0aXRsZVxuICByb3V0ZUZvdW5kID0gZmFsc2VcbiAgZW1pdCgpXG4gIHJldHVybiByb3V0ZUZvdW5kXG59XG5cbi8qKlxuICogR28gdG8gcGF0aCBvciBzZXQgYWN0aW9uXG4gKiBhIHNpbmdsZSBzdHJpbmc6ICAgICAgICAgICAgICAgIGdvIHRoZXJlXG4gKiB0d28gc3RyaW5nczogICAgICAgICAgICAgICAgICAgIGdvIHRoZXJlIHdpdGggc2V0dGluZyBhIHRpdGxlXG4gKiB0d28gc3RyaW5ncyBhbmQgYm9vbGVhbjogICAgICAgIHJlcGxhY2UgaGlzdG9yeSB3aXRoIHNldHRpbmcgYSB0aXRsZVxuICogYSBzaW5nbGUgZnVuY3Rpb246ICAgICAgICAgICAgICBzZXQgYW4gYWN0aW9uIG9uIHRoZSBkZWZhdWx0IHJvdXRlXG4gKiBhIHN0cmluZy9SZWdFeHAgYW5kIGEgZnVuY3Rpb246IHNldCBhbiBhY3Rpb24gb24gdGhlIHJvdXRlXG4gKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBmaXJzdCAtIHBhdGggLyBhY3Rpb24gLyBmaWx0ZXJcbiAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHB8ZnVuY3Rpb24pfSBzZWNvbmQgLSB0aXRsZSAvIGFjdGlvblxuICogQHBhcmFtIHtib29sZWFufSB0aGlyZCAtIHJlcGxhY2UgZmxhZ1xuICovXG5wcm90Lm0gPSBmdW5jdGlvbihmaXJzdCwgc2Vjb25kLCB0aGlyZCkge1xuICBpZiAoaXNTdHJpbmcoZmlyc3QpICYmICghc2Vjb25kIHx8IGlzU3RyaW5nKHNlY29uZCkpKSBnbyhmaXJzdCwgc2Vjb25kLCB0aGlyZCB8fCBmYWxzZSlcbiAgZWxzZSBpZiAoc2Vjb25kKSB0aGlzLnIoZmlyc3QsIHNlY29uZClcbiAgZWxzZSB0aGlzLnIoJ0AnLCBmaXJzdClcbn1cblxuLyoqXG4gKiBTdG9wIHJvdXRpbmdcbiAqL1xucHJvdC5zID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub2ZmKCcqJylcbiAgdGhpcy4kID0gW11cbn1cblxuLyoqXG4gKiBFbWl0XG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHBhdGhcbiAqL1xucHJvdC5lID0gZnVuY3Rpb24ocGF0aCkge1xuICB0aGlzLiQuY29uY2F0KCdAJykuc29tZShmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICB2YXIgYXJncyA9IChmaWx0ZXIgPT0gJ0AnID8gcGFyc2VyIDogc2Vjb25kUGFyc2VyKShub3JtYWxpemUocGF0aCksIG5vcm1hbGl6ZShmaWx0ZXIpKVxuICAgIGlmICh0eXBlb2YgYXJncyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpc1tUUklHR0VSXS5hcHBseShudWxsLCBbZmlsdGVyXS5jb25jYXQoYXJncykpXG4gICAgICByZXR1cm4gcm91dGVGb3VuZCA9IHRydWUgLy8gZXhpdCBmcm9tIGxvb3BcbiAgICB9XG4gIH0sIHRoaXMpXG59XG5cbi8qKlxuICogUmVnaXN0ZXIgcm91dGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWx0ZXIgLSBmaWx0ZXIgZm9yIG1hdGNoaW5nIHRvIHVybFxuICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uIC0gYWN0aW9uIHRvIHJlZ2lzdGVyXG4gKi9cbnByb3QuciA9IGZ1bmN0aW9uKGZpbHRlciwgYWN0aW9uKSB7XG4gIGlmIChmaWx0ZXIgIT0gJ0AnKSB7XG4gICAgZmlsdGVyID0gJy8nICsgbm9ybWFsaXplKGZpbHRlcilcbiAgICB0aGlzLiQucHVzaChmaWx0ZXIpXG4gIH1cbiAgdGhpcy5vbihmaWx0ZXIsIGFjdGlvbilcbn1cblxudmFyIG1haW5Sb3V0ZXIgPSBuZXcgUm91dGVyKClcbnZhciByb3V0ZSA9IG1haW5Sb3V0ZXIubS5iaW5kKG1haW5Sb3V0ZXIpXG5cbi8qKlxuICogQ3JlYXRlIGEgc3ViIHJvdXRlclxuICogQHJldHVybnMge2Z1bmN0aW9ufSB0aGUgbWV0aG9kIG9mIGEgbmV3IFJvdXRlciBvYmplY3RcbiAqL1xucm91dGUuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuZXdTdWJSb3V0ZXIgPSBuZXcgUm91dGVyKClcbiAgLy8gYXNzaWduIHN1Yi1yb3V0ZXIncyBtYWluIG1ldGhvZFxuICB2YXIgcm91dGVyID0gbmV3U3ViUm91dGVyLm0uYmluZChuZXdTdWJSb3V0ZXIpXG4gIC8vIHN0b3Agb25seSB0aGlzIHN1Yi1yb3V0ZXJcbiAgcm91dGVyLnN0b3AgPSBuZXdTdWJSb3V0ZXIucy5iaW5kKG5ld1N1YlJvdXRlcilcbiAgcmV0dXJuIHJvdXRlclxufVxuXG4vKipcbiAqIFNldCB0aGUgYmFzZSBvZiB1cmxcbiAqIEBwYXJhbSB7KHN0cnxSZWdFeHApfSBhcmcgLSBhIG5ldyBiYXNlIG9yICcjJyBvciAnIyEnXG4gKi9cbnJvdXRlLmJhc2UgPSBmdW5jdGlvbihhcmcpIHtcbiAgYmFzZSA9IGFyZyB8fCAnIydcbiAgY3VycmVudCA9IGdldFBhdGhGcm9tQmFzZSgpIC8vIHJlY2FsY3VsYXRlIGN1cnJlbnQgcGF0aFxufVxuXG4vKiogRXhlYyByb3V0aW5nIHJpZ2h0IG5vdyAqKi9cbnJvdXRlLmV4ZWMgPSBmdW5jdGlvbigpIHtcbiAgZW1pdCh0cnVlKVxufVxuXG4vKipcbiAqIFJlcGxhY2UgdGhlIGRlZmF1bHQgcm91dGVyIHRvIHlvdXJzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiAtIHlvdXIgcGFyc2VyIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbjIgLSB5b3VyIHNlY29uZFBhcnNlciBmdW5jdGlvblxuICovXG5yb3V0ZS5wYXJzZXIgPSBmdW5jdGlvbihmbiwgZm4yKSB7XG4gIGlmICghZm4gJiYgIWZuMikge1xuICAgIC8vIHJlc2V0IHBhcnNlciBmb3IgdGVzdGluZy4uLlxuICAgIHBhcnNlciA9IERFRkFVTFRfUEFSU0VSXG4gICAgc2Vjb25kUGFyc2VyID0gREVGQVVMVF9TRUNPTkRfUEFSU0VSXG4gIH1cbiAgaWYgKGZuKSBwYXJzZXIgPSBmblxuICBpZiAoZm4yKSBzZWNvbmRQYXJzZXIgPSBmbjJcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHVybCBxdWVyeSBhcyBhbiBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IHBhcnNlZCBxdWVyeVxuICovXG5yb3V0ZS5xdWVyeSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcSA9IHt9XG4gIHZhciBocmVmID0gbG9jLmhyZWYgfHwgY3VycmVudFxuICBocmVmW1JFUExBQ0VdKC9bPyZdKC4rPyk9KFteJl0qKS9nLCBmdW5jdGlvbihfLCBrLCB2KSB7IHFba10gPSB2IH0pXG4gIHJldHVybiBxXG59XG5cbi8qKiBTdG9wIHJvdXRpbmcgKiovXG5yb3V0ZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICBpZiAoc3RhcnRlZCkge1xuICAgIGlmICh3aW4pIHtcbiAgICAgIHdpbltSRU1PVkVfRVZFTlRfTElTVEVORVJdKFBPUFNUQVRFLCBkZWJvdW5jZWRFbWl0KVxuICAgICAgd2luW1JFTU9WRV9FVkVOVF9MSVNURU5FUl0oSEFTSENIQU5HRSwgZGVib3VuY2VkRW1pdClcbiAgICAgIGRvY1tSRU1PVkVfRVZFTlRfTElTVEVORVJdKGNsaWNrRXZlbnQsIGNsaWNrKVxuICAgIH1cbiAgICBjZW50cmFsW1RSSUdHRVJdKCdzdG9wJylcbiAgICBzdGFydGVkID0gZmFsc2VcbiAgfVxufVxuXG4vKipcbiAqIFN0YXJ0IHJvdXRpbmdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXV0b0V4ZWMgLSBhdXRvbWF0aWNhbGx5IGV4ZWMgYWZ0ZXIgc3RhcnRpbmcgaWYgdHJ1ZVxuICovXG5yb3V0ZS5zdGFydCA9IGZ1bmN0aW9uIChhdXRvRXhlYykge1xuICBpZiAoIXN0YXJ0ZWQpIHtcbiAgICBpZiAod2luKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSBzdGFydChhdXRvRXhlYylcbiAgICAgIC8vIHRoZSB0aW1lb3V0IGlzIG5lZWRlZCB0byBzb2x2ZVxuICAgICAgLy8gYSB3ZWlyZCBzYWZhcmkgYnVnIGh0dHBzOi8vZ2l0aHViLmNvbS9yaW90L3JvdXRlL2lzc3Vlcy8zM1xuICAgICAgZWxzZSB3aW5bQUREX0VWRU5UX0xJU1RFTkVSXSgnbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBzdGFydChhdXRvRXhlYykgfSwgMSlcbiAgICAgIH0pXG4gICAgfVxuICAgIHN0YXJ0ZWQgPSB0cnVlXG4gIH1cbn1cblxuLyoqIFByZXBhcmUgdGhlIHJvdXRlciAqKi9cbnJvdXRlLmJhc2UoKVxucm91dGUucGFyc2VyKClcblxucmlvdC5yb3V0ZSA9IHJvdXRlXG59KShyaW90KVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblxuLyoqXG4gKiBUaGUgcmlvdCB0ZW1wbGF0ZSBlbmdpbmVcbiAqIEB2ZXJzaW9uIHYyLjQuMlxuICovXG4vKipcbiAqIHJpb3QudXRpbC5icmFja2V0c1xuICpcbiAqIC0gYGJyYWNrZXRzICAgIGAgLSBSZXR1cm5zIGEgc3RyaW5nIG9yIHJlZ2V4IGJhc2VkIG9uIGl0cyBwYXJhbWV0ZXJcbiAqIC0gYGJyYWNrZXRzLnNldGAgLSBDaGFuZ2UgdGhlIGN1cnJlbnQgcmlvdCBicmFja2V0c1xuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG52YXIgYnJhY2tldHMgPSAoZnVuY3Rpb24gKFVOREVGKSB7XG5cbiAgdmFyXG4gICAgUkVHTE9CID0gJ2cnLFxuXG4gICAgUl9NTENPTU1TID0gL1xcL1xcKlteKl0qXFwqKyg/OlteKlxcL11bXipdKlxcKispKlxcLy9nLFxuXG4gICAgUl9TVFJJTkdTID0gL1wiW15cIlxcXFxdKig/OlxcXFxbXFxTXFxzXVteXCJcXFxcXSopKlwifCdbXidcXFxcXSooPzpcXFxcW1xcU1xcc11bXidcXFxcXSopKicvZyxcblxuICAgIFNfUUJMT0NLUyA9IFJfU1RSSU5HUy5zb3VyY2UgKyAnfCcgK1xuICAgICAgLyg/OlxcYnJldHVyblxccyt8KD86WyRcXHdcXClcXF1dfFxcK1xcK3wtLSlcXHMqKFxcLykoPyFbKlxcL10pKS8uc291cmNlICsgJ3wnICtcbiAgICAgIC9cXC8oPz1bXipcXC9dKVteW1xcL1xcXFxdKig/Oig/OlxcWyg/OlxcXFwufFteXFxdXFxcXF0qKSpcXF18XFxcXC4pW15bXFwvXFxcXF0qKSo/KFxcLylbZ2ltXSovLnNvdXJjZSxcblxuICAgIFVOU1VQUE9SVEVEID0gUmVnRXhwKCdbXFxcXCcgKyAneDAwLVxcXFx4MUY8PmEtekEtWjAtOVxcJ1wiLDtcXFxcXFxcXF0nKSxcblxuICAgIE5FRURfRVNDQVBFID0gLyg/PVtbXFxdKCkqKz8uXiR8XSkvZyxcblxuICAgIEZJTkRCUkFDRVMgPSB7XG4gICAgICAnKCc6IFJlZ0V4cCgnKFsoKV0pfCcgICArIFNfUUJMT0NLUywgUkVHTE9CKSxcbiAgICAgICdbJzogUmVnRXhwKCcoW1tcXFxcXV0pfCcgKyBTX1FCTE9DS1MsIFJFR0xPQiksXG4gICAgICAneyc6IFJlZ0V4cCgnKFt7fV0pfCcgICArIFNfUUJMT0NLUywgUkVHTE9CKVxuICAgIH0sXG5cbiAgICBERUZBVUxUID0gJ3sgfSdcblxuICB2YXIgX3BhaXJzID0gW1xuICAgICd7JywgJ30nLFxuICAgICd7JywgJ30nLFxuICAgIC97W159XSp9LyxcbiAgICAvXFxcXChbe31dKS9nLFxuICAgIC9cXFxcKHspfHsvZyxcbiAgICBSZWdFeHAoJ1xcXFxcXFxcKH0pfChbWyh7XSl8KH0pfCcgKyBTX1FCTE9DS1MsIFJFR0xPQiksXG4gICAgREVGQVVMVCxcbiAgICAvXlxccyp7XFxeP1xccyooWyRcXHddKykoPzpcXHMqLFxccyooXFxTKykpP1xccytpblxccysoXFxTLiopXFxzKn0vLFxuICAgIC8oXnxbXlxcXFxdKXs9W1xcU1xcc10qP30vXG4gIF1cblxuICB2YXJcbiAgICBjYWNoZWRCcmFja2V0cyA9IFVOREVGLFxuICAgIF9yZWdleCxcbiAgICBfY2FjaGUgPSBbXSxcbiAgICBfc2V0dGluZ3NcblxuICBmdW5jdGlvbiBfbG9vcGJhY2sgKHJlKSB7IHJldHVybiByZSB9XG5cbiAgZnVuY3Rpb24gX3Jld3JpdGUgKHJlLCBicCkge1xuICAgIGlmICghYnApIGJwID0gX2NhY2hlXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICByZS5zb3VyY2UucmVwbGFjZSgvey9nLCBicFsyXSkucmVwbGFjZSgvfS9nLCBicFszXSksIHJlLmdsb2JhbCA/IFJFR0xPQiA6ICcnXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZSAocGFpcikge1xuICAgIGlmIChwYWlyID09PSBERUZBVUxUKSByZXR1cm4gX3BhaXJzXG5cbiAgICB2YXIgYXJyID0gcGFpci5zcGxpdCgnICcpXG5cbiAgICBpZiAoYXJyLmxlbmd0aCAhPT0gMiB8fCBVTlNVUFBPUlRFRC50ZXN0KHBhaXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGJyYWNrZXRzIFwiJyArIHBhaXIgKyAnXCInKVxuICAgIH1cbiAgICBhcnIgPSBhcnIuY29uY2F0KHBhaXIucmVwbGFjZShORUVEX0VTQ0FQRSwgJ1xcXFwnKS5zcGxpdCgnICcpKVxuXG4gICAgYXJyWzRdID0gX3Jld3JpdGUoYXJyWzFdLmxlbmd0aCA+IDEgPyAve1tcXFNcXHNdKj99LyA6IF9wYWlyc1s0XSwgYXJyKVxuICAgIGFycls1XSA9IF9yZXdyaXRlKHBhaXIubGVuZ3RoID4gMyA/IC9cXFxcKHt8fSkvZyA6IF9wYWlyc1s1XSwgYXJyKVxuICAgIGFycls2XSA9IF9yZXdyaXRlKF9wYWlyc1s2XSwgYXJyKVxuICAgIGFycls3XSA9IFJlZ0V4cCgnXFxcXFxcXFwoJyArIGFyclszXSArICcpfChbWyh7XSl8KCcgKyBhcnJbM10gKyAnKXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpXG4gICAgYXJyWzhdID0gcGFpclxuICAgIHJldHVybiBhcnJcbiAgfVxuXG4gIGZ1bmN0aW9uIF9icmFja2V0cyAocmVPcklkeCkge1xuICAgIHJldHVybiByZU9ySWR4IGluc3RhbmNlb2YgUmVnRXhwID8gX3JlZ2V4KHJlT3JJZHgpIDogX2NhY2hlW3JlT3JJZHhdXG4gIH1cblxuICBfYnJhY2tldHMuc3BsaXQgPSBmdW5jdGlvbiBzcGxpdCAoc3RyLCB0bXBsLCBfYnApIHtcbiAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogX2JwIGlzIGZvciB0aGUgY29tcGlsZXJcbiAgICBpZiAoIV9icCkgX2JwID0gX2NhY2hlXG5cbiAgICB2YXJcbiAgICAgIHBhcnRzID0gW10sXG4gICAgICBtYXRjaCxcbiAgICAgIGlzZXhwcixcbiAgICAgIHN0YXJ0LFxuICAgICAgcG9zLFxuICAgICAgcmUgPSBfYnBbNl1cblxuICAgIGlzZXhwciA9IHN0YXJ0ID0gcmUubGFzdEluZGV4ID0gMFxuXG4gICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoc3RyKSkpIHtcblxuICAgICAgcG9zID0gbWF0Y2guaW5kZXhcblxuICAgICAgaWYgKGlzZXhwcikge1xuXG4gICAgICAgIGlmIChtYXRjaFsyXSkge1xuICAgICAgICAgIHJlLmxhc3RJbmRleCA9IHNraXBCcmFjZXMoc3RyLCBtYXRjaFsyXSwgcmUubGFzdEluZGV4KVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRjaFszXSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFtYXRjaFsxXSkge1xuICAgICAgICB1bmVzY2FwZVN0cihzdHIuc2xpY2Uoc3RhcnQsIHBvcykpXG4gICAgICAgIHN0YXJ0ID0gcmUubGFzdEluZGV4XG4gICAgICAgIHJlID0gX2JwWzYgKyAoaXNleHByIF49IDEpXVxuICAgICAgICByZS5sYXN0SW5kZXggPSBzdGFydFxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHIgJiYgc3RhcnQgPCBzdHIubGVuZ3RoKSB7XG4gICAgICB1bmVzY2FwZVN0cihzdHIuc2xpY2Uoc3RhcnQpKVxuICAgIH1cblxuICAgIHJldHVybiBwYXJ0c1xuXG4gICAgZnVuY3Rpb24gdW5lc2NhcGVTdHIgKHMpIHtcbiAgICAgIGlmICh0bXBsIHx8IGlzZXhwcikge1xuICAgICAgICBwYXJ0cy5wdXNoKHMgJiYgcy5yZXBsYWNlKF9icFs1XSwgJyQxJykpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0cy5wdXNoKHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2tpcEJyYWNlcyAocywgY2gsIGl4KSB7XG4gICAgICB2YXJcbiAgICAgICAgbWF0Y2gsXG4gICAgICAgIHJlY2NoID0gRklOREJSQUNFU1tjaF1cblxuICAgICAgcmVjY2gubGFzdEluZGV4ID0gaXhcbiAgICAgIGl4ID0gMVxuICAgICAgd2hpbGUgKChtYXRjaCA9IHJlY2NoLmV4ZWMocykpKSB7XG4gICAgICAgIGlmIChtYXRjaFsxXSAmJlxuICAgICAgICAgICEobWF0Y2hbMV0gPT09IGNoID8gKytpeCA6IC0taXgpKSBicmVha1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl4ID8gcy5sZW5ndGggOiByZWNjaC5sYXN0SW5kZXhcbiAgICB9XG4gIH1cblxuICBfYnJhY2tldHMuaGFzRXhwciA9IGZ1bmN0aW9uIGhhc0V4cHIgKHN0cikge1xuICAgIHJldHVybiBfY2FjaGVbNF0udGVzdChzdHIpXG4gIH1cblxuICBfYnJhY2tldHMubG9vcEtleXMgPSBmdW5jdGlvbiBsb29wS2V5cyAoZXhwcikge1xuICAgIHZhciBtID0gZXhwci5tYXRjaChfY2FjaGVbOV0pXG5cbiAgICByZXR1cm4gbVxuICAgICAgPyB7IGtleTogbVsxXSwgcG9zOiBtWzJdLCB2YWw6IF9jYWNoZVswXSArIG1bM10udHJpbSgpICsgX2NhY2hlWzFdIH1cbiAgICAgIDogeyB2YWw6IGV4cHIudHJpbSgpIH1cbiAgfVxuXG4gIF9icmFja2V0cy5hcnJheSA9IGZ1bmN0aW9uIGFycmF5IChwYWlyKSB7XG4gICAgcmV0dXJuIHBhaXIgPyBfY3JlYXRlKHBhaXIpIDogX2NhY2hlXG4gIH1cblxuICBmdW5jdGlvbiBfcmVzZXQgKHBhaXIpIHtcbiAgICBpZiAoKHBhaXIgfHwgKHBhaXIgPSBERUZBVUxUKSkgIT09IF9jYWNoZVs4XSkge1xuICAgICAgX2NhY2hlID0gX2NyZWF0ZShwYWlyKVxuICAgICAgX3JlZ2V4ID0gcGFpciA9PT0gREVGQVVMVCA/IF9sb29wYmFjayA6IF9yZXdyaXRlXG4gICAgICBfY2FjaGVbOV0gPSBfcmVnZXgoX3BhaXJzWzldKVxuICAgIH1cbiAgICBjYWNoZWRCcmFja2V0cyA9IHBhaXJcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRTZXR0aW5ncyAobykge1xuICAgIHZhciBiXG5cbiAgICBvID0gbyB8fCB7fVxuICAgIGIgPSBvLmJyYWNrZXRzXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sICdicmFja2V0cycsIHtcbiAgICAgIHNldDogX3Jlc2V0LFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjYWNoZWRCcmFja2V0cyB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pXG4gICAgX3NldHRpbmdzID0gb1xuICAgIF9yZXNldChiKVxuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9icmFja2V0cywgJ3NldHRpbmdzJywge1xuICAgIHNldDogX3NldFNldHRpbmdzLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3NldHRpbmdzIH1cbiAgfSlcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogaW4gdGhlIGJyb3dzZXIgcmlvdCBpcyBhbHdheXMgaW4gdGhlIHNjb3BlICovXG4gIF9icmFja2V0cy5zZXR0aW5ncyA9IHR5cGVvZiByaW90ICE9PSAndW5kZWZpbmVkJyAmJiByaW90LnNldHRpbmdzIHx8IHt9XG4gIF9icmFja2V0cy5zZXQgPSBfcmVzZXRcblxuICBfYnJhY2tldHMuUl9TVFJJTkdTID0gUl9TVFJJTkdTXG4gIF9icmFja2V0cy5SX01MQ09NTVMgPSBSX01MQ09NTVNcbiAgX2JyYWNrZXRzLlNfUUJMT0NLUyA9IFNfUUJMT0NLU1xuXG4gIHJldHVybiBfYnJhY2tldHNcblxufSkoKVxuXG4vKipcbiAqIEBtb2R1bGUgdG1wbFxuICpcbiAqIHRtcGwgICAgICAgICAgLSBSb290IGZ1bmN0aW9uLCByZXR1cm5zIHRoZSB0ZW1wbGF0ZSB2YWx1ZSwgcmVuZGVyIHdpdGggZGF0YVxuICogdG1wbC5oYXNFeHByICAtIFRlc3QgdGhlIGV4aXN0ZW5jZSBvZiBhIGV4cHJlc3Npb24gaW5zaWRlIGEgc3RyaW5nXG4gKiB0bXBsLmxvb3BLZXlzIC0gR2V0IHRoZSBrZXlzIGZvciBhbiAnZWFjaCcgbG9vcCAodXNlZCBieSBgX2VhY2hgKVxuICovXG5cbnZhciB0bXBsID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX2NhY2hlID0ge31cblxuICBmdW5jdGlvbiBfdG1wbCAoc3RyLCBkYXRhKSB7XG4gICAgaWYgKCFzdHIpIHJldHVybiBzdHJcblxuICAgIHJldHVybiAoX2NhY2hlW3N0cl0gfHwgKF9jYWNoZVtzdHJdID0gX2NyZWF0ZShzdHIpKSkuY2FsbChkYXRhLCBfbG9nRXJyKVxuICB9XG5cbiAgX3RtcGwuaGF2ZVJhdyA9IGJyYWNrZXRzLmhhc1Jhd1xuXG4gIF90bXBsLmhhc0V4cHIgPSBicmFja2V0cy5oYXNFeHByXG5cbiAgX3RtcGwubG9vcEtleXMgPSBicmFja2V0cy5sb29wS2V5c1xuXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gIF90bXBsLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7IF9jYWNoZSA9IHt9IH1cblxuICBfdG1wbC5lcnJvckhhbmRsZXIgPSBudWxsXG5cbiAgZnVuY3Rpb24gX2xvZ0VyciAoZXJyLCBjdHgpIHtcblxuICAgIGlmIChfdG1wbC5lcnJvckhhbmRsZXIpIHtcblxuICAgICAgZXJyLnJpb3REYXRhID0ge1xuICAgICAgICB0YWdOYW1lOiBjdHggJiYgY3R4LnJvb3QgJiYgY3R4LnJvb3QudGFnTmFtZSxcbiAgICAgICAgX3Jpb3RfaWQ6IGN0eCAmJiBjdHguX3Jpb3RfaWQgIC8vZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgICAgIH1cbiAgICAgIF90bXBsLmVycm9ySGFuZGxlcihlcnIpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZSAoc3RyKSB7XG4gICAgdmFyIGV4cHIgPSBfZ2V0VG1wbChzdHIpXG5cbiAgICBpZiAoZXhwci5zbGljZSgwLCAxMSkgIT09ICd0cnl7cmV0dXJuICcpIGV4cHIgPSAncmV0dXJuICcgKyBleHByXG5cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdFJywgZXhwciArICc7JykgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xuICB9XG5cbiAgdmFyXG4gICAgQ0hfSURFWFBSID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDIwNTcpLFxuICAgIFJFX0NTTkFNRSA9IC9eKD86KC0/W19BLVphLXpcXHhBMC1cXHhGRl1bLVxcd1xceEEwLVxceEZGXSopfFxcdTIwNTcoXFxkKyl+KTovLFxuICAgIFJFX1FCTE9DSyA9IFJlZ0V4cChicmFja2V0cy5TX1FCTE9DS1MsICdnJyksXG4gICAgUkVfRFFVT1RFID0gL1xcdTIwNTcvZyxcbiAgICBSRV9RQk1BUksgPSAvXFx1MjA1NyhcXGQrKX4vZ1xuXG4gIGZ1bmN0aW9uIF9nZXRUbXBsIChzdHIpIHtcbiAgICB2YXJcbiAgICAgIHFzdHIgPSBbXSxcbiAgICAgIGV4cHIsXG4gICAgICBwYXJ0cyA9IGJyYWNrZXRzLnNwbGl0KHN0ci5yZXBsYWNlKFJFX0RRVU9URSwgJ1wiJyksIDEpXG5cbiAgICBpZiAocGFydHMubGVuZ3RoID4gMiB8fCBwYXJ0c1swXSkge1xuICAgICAgdmFyIGksIGosIGxpc3QgPSBbXVxuXG4gICAgICBmb3IgKGkgPSBqID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgZXhwciA9IHBhcnRzW2ldXG5cbiAgICAgICAgaWYgKGV4cHIgJiYgKGV4cHIgPSBpICYgMVxuXG4gICAgICAgICAgICA/IF9wYXJzZUV4cHIoZXhwciwgMSwgcXN0cilcblxuICAgICAgICAgICAgOiAnXCInICsgZXhwclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcclxcbj98XFxuL2csICdcXFxcbicpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArXG4gICAgICAgICAgICAgICdcIidcblxuICAgICAgICAgICkpIGxpc3RbaisrXSA9IGV4cHJcblxuICAgICAgfVxuXG4gICAgICBleHByID0gaiA8IDIgPyBsaXN0WzBdXG4gICAgICAgICAgIDogJ1snICsgbGlzdC5qb2luKCcsJykgKyAnXS5qb2luKFwiXCIpJ1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgZXhwciA9IF9wYXJzZUV4cHIocGFydHNbMV0sIDAsIHFzdHIpXG4gICAgfVxuXG4gICAgaWYgKHFzdHJbMF0pIHtcbiAgICAgIGV4cHIgPSBleHByLnJlcGxhY2UoUkVfUUJNQVJLLCBmdW5jdGlvbiAoXywgcG9zKSB7XG4gICAgICAgIHJldHVybiBxc3RyW3Bvc11cbiAgICAgICAgICAucmVwbGFjZSgvXFxyL2csICdcXFxccicpXG4gICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIGV4cHJcbiAgfVxuXG4gIHZhclxuICAgIFJFX0JSRU5EID0ge1xuICAgICAgJygnOiAvWygpXS9nLFxuICAgICAgJ1snOiAvW1tcXF1dL2csXG4gICAgICAneyc6IC9be31dL2dcbiAgICB9XG5cbiAgZnVuY3Rpb24gX3BhcnNlRXhwciAoZXhwciwgYXNUZXh0LCBxc3RyKSB7XG5cbiAgICBleHByID0gZXhwclxuICAgICAgICAgIC5yZXBsYWNlKFJFX1FCTE9DSywgZnVuY3Rpb24gKHMsIGRpdikge1xuICAgICAgICAgICAgcmV0dXJuIHMubGVuZ3RoID4gMiAmJiAhZGl2ID8gQ0hfSURFWFBSICsgKHFzdHIucHVzaChzKSAtIDEpICsgJ34nIDogc1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKClcbiAgICAgICAgICAucmVwbGFjZSgvXFwgPyhbW1xcKHt9LD9cXC46XSlcXCA/L2csICckMScpXG5cbiAgICBpZiAoZXhwcikge1xuICAgICAgdmFyXG4gICAgICAgIGxpc3QgPSBbXSxcbiAgICAgICAgY250ID0gMCxcbiAgICAgICAgbWF0Y2hcblxuICAgICAgd2hpbGUgKGV4cHIgJiZcbiAgICAgICAgICAgIChtYXRjaCA9IGV4cHIubWF0Y2goUkVfQ1NOQU1FKSkgJiZcbiAgICAgICAgICAgICFtYXRjaC5pbmRleFxuICAgICAgICApIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIGpzYixcbiAgICAgICAgICByZSA9IC8sfChbW3soXSl8JC9nXG5cbiAgICAgICAgZXhwciA9IFJlZ0V4cC5yaWdodENvbnRleHRcbiAgICAgICAga2V5ICA9IG1hdGNoWzJdID8gcXN0clttYXRjaFsyXV0uc2xpY2UoMSwgLTEpLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJykgOiBtYXRjaFsxXVxuXG4gICAgICAgIHdoaWxlIChqc2IgPSAobWF0Y2ggPSByZS5leGVjKGV4cHIpKVsxXSkgc2tpcEJyYWNlcyhqc2IsIHJlKVxuXG4gICAgICAgIGpzYiAgPSBleHByLnNsaWNlKDAsIG1hdGNoLmluZGV4KVxuICAgICAgICBleHByID0gUmVnRXhwLnJpZ2h0Q29udGV4dFxuXG4gICAgICAgIGxpc3RbY250KytdID0gX3dyYXBFeHByKGpzYiwgMSwga2V5KVxuICAgICAgfVxuXG4gICAgICBleHByID0gIWNudCA/IF93cmFwRXhwcihleHByLCBhc1RleHQpXG4gICAgICAgICAgIDogY250ID4gMSA/ICdbJyArIGxpc3Quam9pbignLCcpICsgJ10uam9pbihcIiBcIikudHJpbSgpJyA6IGxpc3RbMF1cbiAgICB9XG4gICAgcmV0dXJuIGV4cHJcblxuICAgIGZ1bmN0aW9uIHNraXBCcmFjZXMgKGNoLCByZSkge1xuICAgICAgdmFyXG4gICAgICAgIG1tLFxuICAgICAgICBsdiA9IDEsXG4gICAgICAgIGlyID0gUkVfQlJFTkRbY2hdXG5cbiAgICAgIGlyLmxhc3RJbmRleCA9IHJlLmxhc3RJbmRleFxuICAgICAgd2hpbGUgKG1tID0gaXIuZXhlYyhleHByKSkge1xuICAgICAgICBpZiAobW1bMF0gPT09IGNoKSArK2x2XG4gICAgICAgIGVsc2UgaWYgKCEtLWx2KSBicmVha1xuICAgICAgfVxuICAgICAgcmUubGFzdEluZGV4ID0gbHYgPyBleHByLmxlbmd0aCA6IGlyLmxhc3RJbmRleFxuICAgIH1cbiAgfVxuXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub3QgYm90aFxuICB2YXIgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBKU19DT05URVhUID0gJ1wiaW4gdGhpcz90aGlzOicgKyAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgPyAnZ2xvYmFsJyA6ICd3aW5kb3cnKSArICcpLicsXG4gICAgSlNfVkFSTkFNRSA9IC9bLHtdW1xcJFxcd10rKD89Oil8KF4gKnxbXiRcXHdcXC57XSkoPyEoPzp0eXBlb2Z8dHJ1ZXxmYWxzZXxudWxsfHVuZGVmaW5lZHxpbnxpbnN0YW5jZW9mfGlzKD86RmluaXRlfE5hTil8dm9pZHxOYU58bmV3fERhdGV8UmVnRXhwfE1hdGgpKD8hWyRcXHddKSkoWyRfQS1aYS16XVskXFx3XSopL2csXG4gICAgSlNfTk9QUk9QUyA9IC9eKD89KFxcLlskXFx3XSspKVxcMSg/OlteLlsoXXwkKS9cblxuICBmdW5jdGlvbiBfd3JhcEV4cHIgKGV4cHIsIGFzVGV4dCwga2V5KSB7XG4gICAgdmFyIHRiXG5cbiAgICBleHByID0gZXhwci5yZXBsYWNlKEpTX1ZBUk5BTUUsIGZ1bmN0aW9uIChtYXRjaCwgcCwgbXZhciwgcG9zLCBzKSB7XG4gICAgICBpZiAobXZhcikge1xuICAgICAgICBwb3MgPSB0YiA/IDAgOiBwb3MgKyBtYXRjaC5sZW5ndGhcblxuICAgICAgICBpZiAobXZhciAhPT0gJ3RoaXMnICYmIG12YXIgIT09ICdnbG9iYWwnICYmIG12YXIgIT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgbWF0Y2ggPSBwICsgJyhcIicgKyBtdmFyICsgSlNfQ09OVEVYVCArIG12YXJcbiAgICAgICAgICBpZiAocG9zKSB0YiA9IChzID0gc1twb3NdKSA9PT0gJy4nIHx8IHMgPT09ICcoJyB8fCBzID09PSAnWydcbiAgICAgICAgfSBlbHNlIGlmIChwb3MpIHtcbiAgICAgICAgICB0YiA9ICFKU19OT1BST1BTLnRlc3Qocy5zbGljZShwb3MpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2hcbiAgICB9KVxuXG4gICAgaWYgKHRiKSB7XG4gICAgICBleHByID0gJ3RyeXtyZXR1cm4gJyArIGV4cHIgKyAnfWNhdGNoKGUpe0UoZSx0aGlzKX0nXG4gICAgfVxuXG4gICAgaWYgKGtleSkge1xuXG4gICAgICBleHByID0gKHRiXG4gICAgICAgICAgPyAnZnVuY3Rpb24oKXsnICsgZXhwciArICd9LmNhbGwodGhpcyknIDogJygnICsgZXhwciArICcpJ1xuICAgICAgICApICsgJz9cIicgKyBrZXkgKyAnXCI6XCJcIidcblxuICAgIH0gZWxzZSBpZiAoYXNUZXh0KSB7XG5cbiAgICAgIGV4cHIgPSAnZnVuY3Rpb24odil7JyArICh0YlxuICAgICAgICAgID8gZXhwci5yZXBsYWNlKCdyZXR1cm4gJywgJ3Y9JykgOiAndj0oJyArIGV4cHIgKyAnKSdcbiAgICAgICAgKSArICc7cmV0dXJuIHZ8fHY9PT0wP3Y6XCJcIn0uY2FsbCh0aGlzKSdcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwclxuICB9XG5cbiAgX3RtcGwudmVyc2lvbiA9IGJyYWNrZXRzLnZlcnNpb24gPSAndjIuNC4yJ1xuXG4gIHJldHVybiBfdG1wbFxuXG59KSgpXG5cbi8qXG4gIGxpYi9icm93c2VyL3RhZy9ta2RvbS5qc1xuXG4gIEluY2x1ZGVzIGhhY2tzIG5lZWRlZCBmb3IgdGhlIEludGVybmV0IEV4cGxvcmVyIHZlcnNpb24gOSBhbmQgYmVsb3dcbiAgU2VlOiBodHRwOi8va2FuZ2F4LmdpdGh1Yi5pby9jb21wYXQtdGFibGUvZXM1LyNpZThcbiAgICAgICBodHRwOi8vY29kZXBsYW5ldC5pby9kcm9wcGluZy1pZTgvXG4qL1xudmFyIG1rZG9tID0gKGZ1bmN0aW9uIF9ta2RvbSgpIHtcbiAgdmFyXG4gICAgcmVIYXNZaWVsZCAgPSAvPHlpZWxkXFxiL2ksXG4gICAgcmVZaWVsZEFsbCAgPSAvPHlpZWxkXFxzKig/OlxcLz58PihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+fD4pL2lnLFxuICAgIHJlWWllbGRTcmMgID0gLzx5aWVsZFxccyt0bz1bJ1wiXShbXidcIj5dKilbJ1wiXVxccyo+KFtcXFNcXHNdKj8pPFxcL3lpZWxkXFxzKj4vaWcsXG4gICAgcmVZaWVsZERlc3QgPSAvPHlpZWxkXFxzK2Zyb209WydcIl0/KFstXFx3XSspWydcIl0/XFxzKig/OlxcLz58PihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+KS9pZ1xuICB2YXJcbiAgICByb290RWxzID0geyB0cjogJ3Rib2R5JywgdGg6ICd0cicsIHRkOiAndHInLCBjb2w6ICdjb2xncm91cCcgfSxcbiAgICB0YmxUYWdzID0gSUVfVkVSU0lPTiAmJiBJRV9WRVJTSU9OIDwgMTBcbiAgICAgID8gU1BFQ0lBTF9UQUdTX1JFR0VYIDogL14oPzp0KD86Ym9keXxoZWFkfGZvb3R8W3JoZF0pfGNhcHRpb258Y29sKD86Z3JvdXApPykkL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnQgdG8gd3JhcCB0aGUgZ2l2ZW4gY29udGVudC4gTm9ybWFsbHkgYW4gYERJVmAsIGJ1dCBjYW4gYmVcbiAgICogYWxzbyBhIGBUQUJMRWAsIGBTRUxFQ1RgLCBgVEJPRFlgLCBgVFJgLCBvciBgQ09MR1JPVVBgIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGVtcGwgIC0gVGhlIHRlbXBsYXRlIGNvbWluZyBmcm9tIHRoZSBjdXN0b20gdGFnIGRlZmluaXRpb25cbiAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBbaHRtbF0gLSBIVE1MIGNvbnRlbnQgdGhhdCBjb21lcyBmcm9tIHRoZSBET00gZWxlbWVudCB3aGVyZSB5b3VcbiAgICogICAgICAgICAgIHdpbGwgbW91bnQgdGhlIHRhZywgbW9zdGx5IHRoZSBvcmlnaW5hbCB0YWcgaW4gdGhlIHBhZ2VcbiAgICogQHBhcmFtICAgeyBCb29sZWFuIH0gY2hlY2tTdmcgLSBmbGFnIG5lZWRlZCB0byBrbm93IGlmIHdlIG5lZWQgdG8gZm9yY2UgdGhlIHN2ZyByZW5kZXJpbmcgaW4gY2FzZSBvZiBsb29wIG5vZGVzXG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gRE9NIGVsZW1lbnQgd2l0aCBfdGVtcGxfIG1lcmdlZCB0aHJvdWdoIGBZSUVMRGAgd2l0aCB0aGUgX2h0bWxfLlxuICAgKi9cbiAgZnVuY3Rpb24gX21rZG9tKHRlbXBsLCBodG1sLCBjaGVja1N2Zykge1xuICAgIHZhclxuICAgICAgbWF0Y2ggICA9IHRlbXBsICYmIHRlbXBsLm1hdGNoKC9eXFxzKjwoWy1cXHddKykvKSxcbiAgICAgIHRhZ05hbWUgPSBtYXRjaCAmJiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpLFxuICAgICAgZWwgPSBta0VsKCdkaXYnLCBjaGVja1N2ZyAmJiBpc1NWR1RhZyh0YWdOYW1lKSlcblxuICAgIC8vIHJlcGxhY2UgYWxsIHRoZSB5aWVsZCB0YWdzIHdpdGggdGhlIHRhZyBpbm5lciBodG1sXG4gICAgdGVtcGwgPSByZXBsYWNlWWllbGQodGVtcGwsIGh0bWwpXG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0YmxUYWdzLnRlc3QodGFnTmFtZSkpXG4gICAgICBlbCA9IHNwZWNpYWxUYWdzKGVsLCB0ZW1wbCwgdGFnTmFtZSlcbiAgICBlbHNlXG4gICAgICBzZXRJbm5lckhUTUwoZWwsIHRlbXBsKVxuXG4gICAgZWwuc3R1YiA9IHRydWVcblxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLypcbiAgICBDcmVhdGVzIHRoZSByb290IGVsZW1lbnQgZm9yIHRhYmxlIG9yIHNlbGVjdCBjaGlsZCBlbGVtZW50czpcbiAgICB0ci90aC90ZC90aGVhZC90Zm9vdC90Ym9keS9jYXB0aW9uL2NvbC9jb2xncm91cC9vcHRpb24vb3B0Z3JvdXBcbiAgKi9cbiAgZnVuY3Rpb24gc3BlY2lhbFRhZ3MoZWwsIHRlbXBsLCB0YWdOYW1lKSB7XG4gICAgdmFyXG4gICAgICBzZWxlY3QgPSB0YWdOYW1lWzBdID09PSAnbycsXG4gICAgICBwYXJlbnQgPSBzZWxlY3QgPyAnc2VsZWN0PicgOiAndGFibGU+J1xuXG4gICAgLy8gdHJpbSgpIGlzIGltcG9ydGFudCBoZXJlLCB0aGlzIGVuc3VyZXMgd2UgZG9uJ3QgaGF2ZSBhcnRpZmFjdHMsXG4gICAgLy8gc28gd2UgY2FuIGNoZWNrIGlmIHdlIGhhdmUgb25seSBvbmUgZWxlbWVudCBpbnNpZGUgdGhlIHBhcmVudFxuICAgIGVsLmlubmVySFRNTCA9ICc8JyArIHBhcmVudCArIHRlbXBsLnRyaW0oKSArICc8LycgKyBwYXJlbnRcbiAgICBwYXJlbnQgPSBlbC5maXJzdENoaWxkXG5cbiAgICAvLyByZXR1cm5zIHRoZSBpbW1lZGlhdGUgcGFyZW50IGlmIHRyL3RoL3RkL2NvbCBpcyB0aGUgb25seSBlbGVtZW50LCBpZiBub3RcbiAgICAvLyByZXR1cm5zIHRoZSB3aG9sZSB0cmVlLCBhcyB0aGlzIGNhbiBpbmNsdWRlIGFkZGl0aW9uYWwgZWxlbWVudHNcbiAgICBpZiAoc2VsZWN0KSB7XG4gICAgICBwYXJlbnQuc2VsZWN0ZWRJbmRleCA9IC0xICAvLyBmb3IgSUU5LCBjb21wYXRpYmxlIHcvY3VycmVudCByaW90IGJlaGF2aW9yXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGF2b2lkcyBpbnNlcnRpb24gb2YgY29pbnRhaW5lciBpbnNpZGUgY29udGFpbmVyIChleDogdGJvZHkgaW5zaWRlIHRib2R5KVxuICAgICAgdmFyIHRuYW1lID0gcm9vdEVsc1t0YWdOYW1lXVxuICAgICAgaWYgKHRuYW1lICYmIHBhcmVudC5jaGlsZEVsZW1lbnRDb3VudCA9PT0gMSkgcGFyZW50ID0gJCh0bmFtZSwgcGFyZW50KVxuICAgIH1cbiAgICByZXR1cm4gcGFyZW50XG4gIH1cblxuICAvKlxuICAgIFJlcGxhY2UgdGhlIHlpZWxkIHRhZyBmcm9tIGFueSB0YWcgdGVtcGxhdGUgd2l0aCB0aGUgaW5uZXJIVE1MIG9mIHRoZVxuICAgIG9yaWdpbmFsIHRhZyBpbiB0aGUgcGFnZVxuICAqL1xuICBmdW5jdGlvbiByZXBsYWNlWWllbGQodGVtcGwsIGh0bWwpIHtcbiAgICAvLyBkbyBub3RoaW5nIGlmIG5vIHlpZWxkXG4gICAgaWYgKCFyZUhhc1lpZWxkLnRlc3QodGVtcGwpKSByZXR1cm4gdGVtcGxcblxuICAgIC8vIGJlIGNhcmVmdWwgd2l0aCAjMTM0MyAtIHN0cmluZyBvbiB0aGUgc291cmNlIGhhdmluZyBgJDFgXG4gICAgdmFyIHNyYyA9IHt9XG5cbiAgICBodG1sID0gaHRtbCAmJiBodG1sLnJlcGxhY2UocmVZaWVsZFNyYywgZnVuY3Rpb24gKF8sIHJlZiwgdGV4dCkge1xuICAgICAgc3JjW3JlZl0gPSBzcmNbcmVmXSB8fCB0ZXh0ICAgLy8gcHJlc2VydmUgZmlyc3QgZGVmaW5pdGlvblxuICAgICAgcmV0dXJuICcnXG4gICAgfSkudHJpbSgpXG5cbiAgICByZXR1cm4gdGVtcGxcbiAgICAgIC5yZXBsYWNlKHJlWWllbGREZXN0LCBmdW5jdGlvbiAoXywgcmVmLCBkZWYpIHsgIC8vIHlpZWxkIHdpdGggZnJvbSAtIHRvIGF0dHJzXG4gICAgICAgIHJldHVybiBzcmNbcmVmXSB8fCBkZWYgfHwgJydcbiAgICAgIH0pXG4gICAgICAucmVwbGFjZShyZVlpZWxkQWxsLCBmdW5jdGlvbiAoXywgZGVmKSB7ICAgICAgICAvLyB5aWVsZCB3aXRob3V0IGFueSBcImZyb21cIlxuICAgICAgICByZXR1cm4gaHRtbCB8fCBkZWYgfHwgJydcbiAgICAgIH0pXG4gIH1cblxuICByZXR1cm4gX21rZG9tXG5cbn0pKClcblxuLyoqXG4gKiBDb252ZXJ0IHRoZSBpdGVtIGxvb3BlZCBpbnRvIGFuIG9iamVjdCB1c2VkIHRvIGV4dGVuZCB0aGUgY2hpbGQgdGFnIHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZXhwciAtIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXlzIHVzZWQgdG8gZXh0ZW5kIHRoZSBjaGlsZHJlbiB0YWdzXG4gKiBAcGFyYW0gICB7ICogfSBrZXkgLSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIG5ldyBvYmplY3QgcmV0dXJuZWRcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbCAtIHZhbHVlIGNvbnRhaW5pbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIGluIHRoZSBhcnJheVxuICogQHJldHVybnMgeyBPYmplY3QgfSAtIG5ldyBvYmplY3QgY29udGFpbmluZyB0aGUgdmFsdWVzIG9mIHRoZSBvcmlnaW5hbCBpdGVtXG4gKlxuICogVGhlIHZhcmlhYmxlcyAna2V5JyBhbmQgJ3ZhbCcgYXJlIGFyYml0cmFyeS5cbiAqIFRoZXkgZGVwZW5kIG9uIHRoZSBjb2xsZWN0aW9uIHR5cGUgbG9vcGVkIChBcnJheSwgT2JqZWN0KVxuICogYW5kIG9uIHRoZSBleHByZXNzaW9uIHVzZWQgb24gdGhlIGVhY2ggdGFnXG4gKlxuICovXG5mdW5jdGlvbiBta2l0ZW0oZXhwciwga2V5LCB2YWwpIHtcbiAgdmFyIGl0ZW0gPSB7fVxuICBpdGVtW2V4cHIua2V5XSA9IGtleVxuICBpZiAoZXhwci5wb3MpIGl0ZW1bZXhwci5wb3NdID0gdmFsXG4gIHJldHVybiBpdGVtXG59XG5cbi8qKlxuICogVW5tb3VudCB0aGUgcmVkdW5kYW50IHRhZ3NcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBpdGVtcyAtIGFycmF5IGNvbnRhaW5pbmcgdGhlIGN1cnJlbnQgaXRlbXMgdG8gbG9vcFxuICogQHBhcmFtICAgeyBBcnJheSB9IHRhZ3MgLSBhcnJheSBjb250YWluaW5nIGFsbCB0aGUgY2hpbGRyZW4gdGFnc1xuICovXG5mdW5jdGlvbiB1bm1vdW50UmVkdW5kYW50KGl0ZW1zLCB0YWdzKSB7XG5cbiAgdmFyIGkgPSB0YWdzLmxlbmd0aCxcbiAgICBqID0gaXRlbXMubGVuZ3RoLFxuICAgIHRcblxuICB3aGlsZSAoaSA+IGopIHtcbiAgICB0ID0gdGFnc1stLWldXG4gICAgdGFncy5zcGxpY2UoaSwgMSlcbiAgICB0LnVubW91bnQoKVxuICB9XG59XG5cbi8qKlxuICogTW92ZSB0aGUgbmVzdGVkIGN1c3RvbSB0YWdzIGluIG5vbiBjdXN0b20gbG9vcCB0YWdzXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGNoaWxkIC0gbm9uIGN1c3RvbSBsb29wIHRhZ1xuICogQHBhcmFtICAgeyBOdW1iZXIgfSBpIC0gY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgbG9vcCB0YWdcbiAqL1xuZnVuY3Rpb24gbW92ZU5lc3RlZFRhZ3MoY2hpbGQsIGkpIHtcbiAgT2JqZWN0LmtleXMoY2hpbGQudGFncykuZm9yRWFjaChmdW5jdGlvbih0YWdOYW1lKSB7XG4gICAgdmFyIHRhZyA9IGNoaWxkLnRhZ3NbdGFnTmFtZV1cbiAgICBpZiAoaXNBcnJheSh0YWcpKVxuICAgICAgZWFjaCh0YWcsIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIG1vdmVDaGlsZFRhZyh0LCB0YWdOYW1lLCBpKVxuICAgICAgfSlcbiAgICBlbHNlXG4gICAgICBtb3ZlQ2hpbGRUYWcodGFnLCB0YWdOYW1lLCBpKVxuICB9KVxufVxuXG4vKipcbiAqIEFkZHMgdGhlIGVsZW1lbnRzIGZvciBhIHZpcnR1YWwgdGFnXG4gKiBAcGFyYW0geyBUYWcgfSB0YWcgLSB0aGUgdGFnIHdob3NlIHJvb3QncyBjaGlsZHJlbiB3aWxsIGJlIGluc2VydGVkIG9yIGFwcGVuZGVkXG4gKiBAcGFyYW0geyBOb2RlIH0gc3JjIC0gdGhlIG5vZGUgdGhhdCB3aWxsIGRvIHRoZSBpbnNlcnRpbmcgb3IgYXBwZW5kaW5nXG4gKiBAcGFyYW0geyBUYWcgfSB0YXJnZXQgLSBvbmx5IGlmIGluc2VydGluZywgaW5zZXJ0IGJlZm9yZSB0aGlzIHRhZydzIGZpcnN0IGNoaWxkXG4gKi9cbmZ1bmN0aW9uIGFkZFZpcnR1YWwodGFnLCBzcmMsIHRhcmdldCkge1xuICB2YXIgZWwgPSB0YWcuX3Jvb3QsIHNpYlxuICB0YWcuX3ZpcnRzID0gW11cbiAgd2hpbGUgKGVsKSB7XG4gICAgc2liID0gZWwubmV4dFNpYmxpbmdcbiAgICBpZiAodGFyZ2V0KVxuICAgICAgc3JjLmluc2VydEJlZm9yZShlbCwgdGFyZ2V0Ll9yb290KVxuICAgIGVsc2VcbiAgICAgIHNyYy5hcHBlbmRDaGlsZChlbClcblxuICAgIHRhZy5fdmlydHMucHVzaChlbCkgLy8gaG9sZCBmb3IgdW5tb3VudGluZ1xuICAgIGVsID0gc2liXG4gIH1cbn1cblxuLyoqXG4gKiBNb3ZlIHZpcnR1YWwgdGFnIGFuZCBhbGwgY2hpbGQgbm9kZXNcbiAqIEBwYXJhbSB7IFRhZyB9IHRhZyAtIGZpcnN0IGNoaWxkIHJlZmVyZW5jZSB1c2VkIHRvIHN0YXJ0IG1vdmVcbiAqIEBwYXJhbSB7IE5vZGUgfSBzcmMgIC0gdGhlIG5vZGUgdGhhdCB3aWxsIGRvIHRoZSBpbnNlcnRpbmdcbiAqIEBwYXJhbSB7IFRhZyB9IHRhcmdldCAtIGluc2VydCBiZWZvcmUgdGhpcyB0YWcncyBmaXJzdCBjaGlsZFxuICogQHBhcmFtIHsgTnVtYmVyIH0gbGVuIC0gaG93IG1hbnkgY2hpbGQgbm9kZXMgdG8gbW92ZVxuICovXG5mdW5jdGlvbiBtb3ZlVmlydHVhbCh0YWcsIHNyYywgdGFyZ2V0LCBsZW4pIHtcbiAgdmFyIGVsID0gdGFnLl9yb290LCBzaWIsIGkgPSAwXG4gIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBzaWIgPSBlbC5uZXh0U2libGluZ1xuICAgIHNyYy5pbnNlcnRCZWZvcmUoZWwsIHRhcmdldC5fcm9vdClcbiAgICBlbCA9IHNpYlxuICB9XG59XG5cbi8qKlxuICogSW5zZXJ0IGEgbmV3IHRhZyBhdm9pZGluZyB0aGUgaW5zZXJ0IGZvciB0aGUgY29uZGl0aW9uYWwgdGFnc1xuICogQHBhcmFtICAge0Jvb2xlYW59IGlzVmlydHVhbCBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gICB7IFRhZyB9ICBwcmV2VGFnIC0gdGFnIGluc3RhbmNlIHVzZWQgYXMgcmVmZXJlbmNlIHRvIHByZXBlbmQgb3VyIG5ldyB0YWdcbiAqIEBwYXJhbSAgIHsgVGFnIH0gIG5ld1RhZyAtIG5ldyB0YWcgdG8gYmUgaW5zZXJ0ZWRcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSAgcm9vdCAtIGxvb3AgcGFyZW50IG5vZGVcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSAgdGFncyAtIGFycmF5IGNvbnRhaW5pbmcgdGhlIGN1cnJlbnQgdGFncyBsaXN0XG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gIHZpcnR1YWxGbiAtIGNhbGxiYWNrIG5lZWRlZCB0byBtb3ZlIG9yIGluc2VydCB2aXJ0dWFsIERPTVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSBuZWVkIHRvIGxvb3BcbiAqL1xuZnVuY3Rpb24gaW5zZXJ0VGFnKGlzVmlydHVhbCwgcHJldlRhZywgbmV3VGFnLCByb290LCB0YWdzLCB2aXJ0dWFsRm4sIGRvbSkge1xuICBpZiAoaXNJblN0dWIocHJldlRhZy5yb290KSkgcmV0dXJuXG4gIGlmIChpc1ZpcnR1YWwpIHZpcnR1YWxGbihwcmV2VGFnLCByb290LCBuZXdUYWcsIGRvbS5jaGlsZE5vZGVzLmxlbmd0aClcbiAgZWxzZSByb290Lmluc2VydEJlZm9yZShwcmV2VGFnLnJvb3QsIG5ld1RhZy5yb290KSAvLyAjMTM3NCBzb21lIGJyb3dzZXJzIHJlc2V0IHNlbGVjdGVkIGhlcmVcbn1cblxuXG4vKipcbiAqIE1hbmFnZSB0YWdzIGhhdmluZyB0aGUgJ2VhY2gnXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIG5lZWQgdG8gbG9vcFxuICogQHBhcmFtICAgeyBUYWcgfSBwYXJlbnQgLSBwYXJlbnQgdGFnIGluc3RhbmNlIHdoZXJlIHRoZSBkb20gbm9kZSBpcyBjb250YWluZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXhwciAtIHN0cmluZyBjb250YWluZWQgaW4gdGhlICdlYWNoJyBhdHRyaWJ1dGVcbiAqL1xuZnVuY3Rpb24gX2VhY2goZG9tLCBwYXJlbnQsIGV4cHIpIHtcblxuICAvLyByZW1vdmUgdGhlIGVhY2ggcHJvcGVydHkgZnJvbSB0aGUgb3JpZ2luYWwgdGFnXG4gIHJlbUF0dHIoZG9tLCAnZWFjaCcpXG5cbiAgdmFyIG11c3RSZW9yZGVyID0gdHlwZW9mIGdldEF0dHIoZG9tLCAnbm8tcmVvcmRlcicpICE9PSBUX1NUUklORyB8fCByZW1BdHRyKGRvbSwgJ25vLXJlb3JkZXInKSxcbiAgICB0YWdOYW1lID0gZ2V0VGFnTmFtZShkb20pLFxuICAgIGltcGwgPSBfX3RhZ0ltcGxbdGFnTmFtZV0gfHwgeyB0bXBsOiBnZXRPdXRlckhUTUwoZG9tKSB9LFxuICAgIHVzZVJvb3QgPSBTUEVDSUFMX1RBR1NfUkVHRVgudGVzdCh0YWdOYW1lKSxcbiAgICByb290ID0gZG9tLnBhcmVudE5vZGUsXG4gICAgcmVmID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpLFxuICAgIGNoaWxkID0gZ2V0VGFnKGRvbSksXG4gICAgaXNPcHRpb24gPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdvcHRpb24nLCAvLyB0aGUgb3B0aW9uIHRhZ3MgbXVzdCBiZSB0cmVhdGVkIGRpZmZlcmVudGx5XG4gICAgdGFncyA9IFtdLFxuICAgIG9sZEl0ZW1zID0gW10sXG4gICAgaGFzS2V5cyxcbiAgICBpc1ZpcnR1YWwgPSBkb20udGFnTmFtZSA9PSAnVklSVFVBTCdcblxuICAvLyBwYXJzZSB0aGUgZWFjaCBleHByZXNzaW9uXG4gIGV4cHIgPSB0bXBsLmxvb3BLZXlzKGV4cHIpXG5cbiAgLy8gaW5zZXJ0IGEgbWFya2VkIHdoZXJlIHRoZSBsb29wIHRhZ3Mgd2lsbCBiZSBpbmplY3RlZFxuICByb290Lmluc2VydEJlZm9yZShyZWYsIGRvbSlcblxuICAvLyBjbGVhbiB0ZW1wbGF0ZSBjb2RlXG4gIHBhcmVudC5vbmUoJ2JlZm9yZS1tb3VudCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIHJlbW92ZSB0aGUgb3JpZ2luYWwgRE9NIG5vZGVcbiAgICBkb20ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb20pXG4gICAgaWYgKHJvb3Quc3R1Yikgcm9vdCA9IHBhcmVudC5yb290XG5cbiAgfSkub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBnZXQgdGhlIG5ldyBpdGVtcyBjb2xsZWN0aW9uXG4gICAgdmFyIGl0ZW1zID0gdG1wbChleHByLnZhbCwgcGFyZW50KSxcbiAgICAgIC8vIGNyZWF0ZSBhIGZyYWdtZW50IHRvIGhvbGQgdGhlIG5ldyBET00gbm9kZXMgdG8gaW5qZWN0IGluIHRoZSBwYXJlbnQgdGFnXG4gICAgICBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cbiAgICAvLyBvYmplY3QgbG9vcC4gYW55IGNoYW5nZXMgY2F1c2UgZnVsbCByZWRyYXdcbiAgICBpZiAoIWlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICBoYXNLZXlzID0gaXRlbXMgfHwgZmFsc2VcbiAgICAgIGl0ZW1zID0gaGFzS2V5cyA/XG4gICAgICAgIE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiBta2l0ZW0oZXhwciwga2V5LCBpdGVtc1trZXldKVxuICAgICAgICB9KSA6IFtdXG4gICAgfVxuXG4gICAgLy8gbG9vcCBhbGwgdGhlIG5ldyBpdGVtc1xuICAgIHZhciBpID0gMCxcbiAgICAgIGl0ZW1zTGVuZ3RoID0gaXRlbXMubGVuZ3RoXG5cbiAgICBmb3IgKDsgaSA8IGl0ZW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHJlb3JkZXIgb25seSBpZiB0aGUgaXRlbXMgYXJlIG9iamVjdHNcbiAgICAgIHZhclxuICAgICAgICBpdGVtID0gaXRlbXNbaV0sXG4gICAgICAgIF9tdXN0UmVvcmRlciA9IG11c3RSZW9yZGVyICYmIHR5cGVvZiBpdGVtID09IFRfT0JKRUNUICYmICFoYXNLZXlzLFxuICAgICAgICBvbGRQb3MgPSBvbGRJdGVtcy5pbmRleE9mKGl0ZW0pLFxuICAgICAgICBwb3MgPSB+b2xkUG9zICYmIF9tdXN0UmVvcmRlciA/IG9sZFBvcyA6IGksXG4gICAgICAgIC8vIGRvZXMgYSB0YWcgZXhpc3QgaW4gdGhpcyBwb3NpdGlvbj9cbiAgICAgICAgdGFnID0gdGFnc1twb3NdXG5cbiAgICAgIGl0ZW0gPSAhaGFzS2V5cyAmJiBleHByLmtleSA/IG1raXRlbShleHByLCBpdGVtLCBpKSA6IGl0ZW1cblxuICAgICAgLy8gbmV3IHRhZ1xuICAgICAgaWYgKFxuICAgICAgICAhX211c3RSZW9yZGVyICYmICF0YWcgLy8gd2l0aCBuby1yZW9yZGVyIHdlIGp1c3QgdXBkYXRlIHRoZSBvbGQgdGFnc1xuICAgICAgICB8fFxuICAgICAgICBfbXVzdFJlb3JkZXIgJiYgIX5vbGRQb3MgfHwgIXRhZyAvLyBieSBkZWZhdWx0IHdlIGFsd2F5cyB0cnkgdG8gcmVvcmRlciB0aGUgRE9NIGVsZW1lbnRzXG4gICAgICApIHtcblxuICAgICAgICB0YWcgPSBuZXcgVGFnKGltcGwsIHtcbiAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICBpc0xvb3A6IHRydWUsXG4gICAgICAgICAgaGFzSW1wbDogISFfX3RhZ0ltcGxbdGFnTmFtZV0sXG4gICAgICAgICAgcm9vdDogdXNlUm9vdCA/IHJvb3QgOiBkb20uY2xvbmVOb2RlKCksXG4gICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICB9LCBkb20uaW5uZXJIVE1MKVxuXG4gICAgICAgIHRhZy5tb3VudCgpXG5cbiAgICAgICAgaWYgKGlzVmlydHVhbCkgdGFnLl9yb290ID0gdGFnLnJvb3QuZmlyc3RDaGlsZCAvLyBzYXZlIHJlZmVyZW5jZSBmb3IgZnVydGhlciBtb3ZlcyBvciBpbnNlcnRzXG4gICAgICAgIC8vIHRoaXMgdGFnIG11c3QgYmUgYXBwZW5kZWRcbiAgICAgICAgaWYgKGkgPT0gdGFncy5sZW5ndGggfHwgIXRhZ3NbaV0pIHsgLy8gZml4IDE1ODFcbiAgICAgICAgICBpZiAoaXNWaXJ0dWFsKVxuICAgICAgICAgICAgYWRkVmlydHVhbCh0YWcsIGZyYWcpXG4gICAgICAgICAgZWxzZSBmcmFnLmFwcGVuZENoaWxkKHRhZy5yb290KVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMgdGFnIG11c3QgYmUgaW5zZXJ0XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGluc2VydFRhZyhpc1ZpcnR1YWwsIHRhZywgdGFnc1tpXSwgcm9vdCwgdGFncywgYWRkVmlydHVhbCwgZG9tKVxuICAgICAgICAgIG9sZEl0ZW1zLnNwbGljZShpLCAwLCBpdGVtKVxuICAgICAgICB9XG5cbiAgICAgICAgdGFncy5zcGxpY2UoaSwgMCwgdGFnKVxuICAgICAgICBwb3MgPSBpIC8vIGhhbmRsZWQgaGVyZSBzbyBubyBtb3ZlXG4gICAgICB9IGVsc2UgdGFnLnVwZGF0ZShpdGVtLCB0cnVlKVxuXG4gICAgICAvLyByZW9yZGVyIHRoZSB0YWcgaWYgaXQncyBub3QgbG9jYXRlZCBpbiBpdHMgcHJldmlvdXMgcG9zaXRpb25cbiAgICAgIGlmIChcbiAgICAgICAgcG9zICE9PSBpICYmIF9tdXN0UmVvcmRlciAmJlxuICAgICAgICB0YWdzW2ldIC8vIGZpeCAxNTgxIHVuYWJsZSB0byByZXByb2R1Y2UgaXQgaW4gYSB0ZXN0IVxuICAgICAgKSB7XG4gICAgICAgIC8vICNjbG9zZXMgMjA0MCBQTEVBU0UgRE9OJ1QgUkVNT1ZFIElUIVxuICAgICAgICAvLyB0aGVyZSBhcmUgbm8gdGVzdHMgZm9yIHRoaXMgZmVhdHVyZVxuICAgICAgICBpZiAoY29udGFpbnMoaXRlbXMsIG9sZEl0ZW1zW2ldKSlcbiAgICAgICAgICBpbnNlcnRUYWcoaXNWaXJ0dWFsLCB0YWcsIHRhZ3NbaV0sIHJvb3QsIHRhZ3MsIG1vdmVWaXJ0dWFsLCBkb20pXG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwb3NpdGlvbiBhdHRyaWJ1dGUgaWYgaXQgZXhpc3RzXG4gICAgICAgIGlmIChleHByLnBvcylcbiAgICAgICAgICB0YWdbZXhwci5wb3NdID0gaVxuICAgICAgICAvLyBtb3ZlIHRoZSBvbGQgdGFnIGluc3RhbmNlXG4gICAgICAgIHRhZ3Muc3BsaWNlKGksIDAsIHRhZ3Muc3BsaWNlKHBvcywgMSlbMF0pXG4gICAgICAgIC8vIG1vdmUgdGhlIG9sZCBpdGVtXG4gICAgICAgIG9sZEl0ZW1zLnNwbGljZShpLCAwLCBvbGRJdGVtcy5zcGxpY2UocG9zLCAxKVswXSlcbiAgICAgICAgLy8gaWYgdGhlIGxvb3AgdGFncyBhcmUgbm90IGN1c3RvbVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIG1vdmUgYWxsIHRoZWlyIGN1c3RvbSB0YWdzIGludG8gdGhlIHJpZ2h0IHBvc2l0aW9uXG4gICAgICAgIGlmICghY2hpbGQgJiYgdGFnLnRhZ3MpIG1vdmVOZXN0ZWRUYWdzKHRhZywgaSlcbiAgICAgIH1cblxuICAgICAgLy8gY2FjaGUgdGhlIG9yaWdpbmFsIGl0ZW0gdG8gdXNlIGl0IGluIHRoZSBldmVudHMgYm91bmQgdG8gdGhpcyBub2RlXG4gICAgICAvLyBhbmQgaXRzIGNoaWxkcmVuXG4gICAgICB0YWcuX2l0ZW0gPSBpdGVtXG4gICAgICAvLyBjYWNoZSB0aGUgcmVhbCBwYXJlbnQgdGFnIGludGVybmFsbHlcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhZywgJ19wYXJlbnQnLCBwYXJlbnQpXG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIHRoZSByZWR1bmRhbnQgdGFnc1xuICAgIHVubW91bnRSZWR1bmRhbnQoaXRlbXMsIHRhZ3MpXG5cbiAgICAvLyBpbnNlcnQgdGhlIG5ldyBub2Rlc1xuICAgIHJvb3QuaW5zZXJ0QmVmb3JlKGZyYWcsIHJlZilcbiAgICBpZiAoaXNPcHRpb24pIHtcblxuICAgICAgLy8gIzEzNzQgRmlyZUZveCBidWcgaW4gPG9wdGlvbiBzZWxlY3RlZD17ZXhwcmVzc2lvbn0+XG4gICAgICBpZiAoRklSRUZPWCAmJiAhcm9vdC5tdWx0aXBsZSkge1xuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHJvb3QubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgICBpZiAocm9vdFtuXS5fX3Jpb3QxMzc0KSB7XG4gICAgICAgICAgICByb290LnNlbGVjdGVkSW5kZXggPSBuICAvLyBjbGVhciBvdGhlciBvcHRpb25zXG4gICAgICAgICAgICBkZWxldGUgcm9vdFtuXS5fX3Jpb3QxMzc0XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldCB0aGUgJ3RhZ3MnIHByb3BlcnR5IG9mIHRoZSBwYXJlbnQgdGFnXG4gICAgLy8gaWYgY2hpbGQgaXMgJ3VuZGVmaW5lZCcgaXQgbWVhbnMgdGhhdCB3ZSBkb24ndCBuZWVkIHRvIHNldCB0aGlzIHByb3BlcnR5XG4gICAgLy8gZm9yIGV4YW1wbGU6XG4gICAgLy8gd2UgZG9uJ3QgbmVlZCBzdG9yZSB0aGUgYG15VGFnLnRhZ3NbJ2RpdiddYCBwcm9wZXJ0eSBpZiB3ZSBhcmUgbG9vcGluZyBhIGRpdiB0YWdcbiAgICAvLyBidXQgd2UgbmVlZCB0byB0cmFjayB0aGUgYG15VGFnLnRhZ3NbJ2NoaWxkJ11gIHByb3BlcnR5IGxvb3BpbmcgYSBjdXN0b20gY2hpbGQgbm9kZSBuYW1lZCBgY2hpbGRgXG4gICAgaWYgKGNoaWxkKSBwYXJlbnQudGFnc1t0YWdOYW1lXSA9IHRhZ3NcblxuICAgIC8vIGNsb25lIHRoZSBpdGVtcyBhcnJheVxuICAgIG9sZEl0ZW1zID0gaXRlbXMuc2xpY2UoKVxuXG4gIH0pXG5cbn1cbi8qKlxuICogT2JqZWN0IHRoYXQgd2lsbCBiZSB1c2VkIHRvIGluamVjdCBhbmQgbWFuYWdlIHRoZSBjc3Mgb2YgZXZlcnkgdGFnIGluc3RhbmNlXG4gKi9cbnZhciBzdHlsZU1hbmFnZXIgPSAoZnVuY3Rpb24oX3Jpb3QpIHtcblxuICBpZiAoIXdpbmRvdykgcmV0dXJuIHsgLy8gc2tpcCBpbmplY3Rpb24gb24gdGhlIHNlcnZlclxuICAgIGFkZDogZnVuY3Rpb24gKCkge30sXG4gICAgaW5qZWN0OiBmdW5jdGlvbiAoKSB7fVxuICB9XG5cbiAgdmFyIHN0eWxlTm9kZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLy8gY3JlYXRlIGEgbmV3IHN0eWxlIGVsZW1lbnQgd2l0aCB0aGUgY29ycmVjdCB0eXBlXG4gICAgdmFyIG5ld05vZGUgPSBta0VsKCdzdHlsZScpXG4gICAgc2V0QXR0cihuZXdOb2RlLCAndHlwZScsICd0ZXh0L2NzcycpXG5cbiAgICAvLyByZXBsYWNlIGFueSB1c2VyIG5vZGUgb3IgaW5zZXJ0IHRoZSBuZXcgb25lIGludG8gdGhlIGhlYWRcbiAgICB2YXIgdXNlck5vZGUgPSAkKCdzdHlsZVt0eXBlPXJpb3RdJylcbiAgICBpZiAodXNlck5vZGUpIHtcbiAgICAgIGlmICh1c2VyTm9kZS5pZCkgbmV3Tm9kZS5pZCA9IHVzZXJOb2RlLmlkXG4gICAgICB1c2VyTm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCB1c2VyTm9kZSlcbiAgICB9XG4gICAgZWxzZSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKG5ld05vZGUpXG5cbiAgICByZXR1cm4gbmV3Tm9kZVxuICB9KSgpXG5cbiAgLy8gQ3JlYXRlIGNhY2hlIGFuZCBzaG9ydGN1dCB0byB0aGUgY29ycmVjdCBwcm9wZXJ0eVxuICB2YXIgY3NzVGV4dFByb3AgPSBzdHlsZU5vZGUuc3R5bGVTaGVldCxcbiAgICBzdHlsZXNUb0luamVjdCA9ICcnXG5cbiAgLy8gRXhwb3NlIHRoZSBzdHlsZSBub2RlIGluIGEgbm9uLW1vZGlmaWNhYmxlIHByb3BlcnR5XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfcmlvdCwgJ3N0eWxlTm9kZScsIHtcbiAgICB2YWx1ZTogc3R5bGVOb2RlLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pXG5cbiAgLyoqXG4gICAqIFB1YmxpYyBhcGlcbiAgICovXG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogU2F2ZSBhIHRhZyBzdHlsZSB0byBiZSBsYXRlciBpbmplY3RlZCBpbnRvIERPTVxuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gY3NzIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBhZGQ6IGZ1bmN0aW9uKGNzcykge1xuICAgICAgc3R5bGVzVG9JbmplY3QgKz0gY3NzXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBJbmplY3QgYWxsIHByZXZpb3VzbHkgc2F2ZWQgdGFnIHN0eWxlcyBpbnRvIERPTVxuICAgICAqIGlubmVySFRNTCBzZWVtcyBzbG93OiBodHRwOi8vanNwZXJmLmNvbS9yaW90LWluc2VydC1zdHlsZVxuICAgICAqL1xuICAgIGluamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc3R5bGVzVG9JbmplY3QpIHtcbiAgICAgICAgaWYgKGNzc1RleHRQcm9wKSBjc3NUZXh0UHJvcC5jc3NUZXh0ICs9IHN0eWxlc1RvSW5qZWN0XG4gICAgICAgIGVsc2Ugc3R5bGVOb2RlLmlubmVySFRNTCArPSBzdHlsZXNUb0luamVjdFxuICAgICAgICBzdHlsZXNUb0luamVjdCA9ICcnXG4gICAgICB9XG4gICAgfVxuICB9XG5cbn0pKHJpb3QpXG5cblxuZnVuY3Rpb24gcGFyc2VOYW1lZEVsZW1lbnRzKHJvb3QsIHRhZywgY2hpbGRUYWdzLCBmb3JjZVBhcnNpbmdOYW1lZCkge1xuXG4gIHdhbGsocm9vdCwgZnVuY3Rpb24oZG9tKSB7XG4gICAgaWYgKGRvbS5ub2RlVHlwZSA9PSAxKSB7XG4gICAgICBkb20uaXNMb29wID0gZG9tLmlzTG9vcCB8fFxuICAgICAgICAgICAgICAgICAgKGRvbS5wYXJlbnROb2RlICYmIGRvbS5wYXJlbnROb2RlLmlzTG9vcCB8fCBnZXRBdHRyKGRvbSwgJ2VhY2gnKSlcbiAgICAgICAgICAgICAgICAgICAgPyAxIDogMFxuXG4gICAgICAvLyBjdXN0b20gY2hpbGQgdGFnXG4gICAgICBpZiAoY2hpbGRUYWdzKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IGdldFRhZyhkb20pXG5cbiAgICAgICAgaWYgKGNoaWxkICYmICFkb20uaXNMb29wKVxuICAgICAgICAgIGNoaWxkVGFncy5wdXNoKGluaXRDaGlsZFRhZyhjaGlsZCwge3Jvb3Q6IGRvbSwgcGFyZW50OiB0YWd9LCBkb20uaW5uZXJIVE1MLCB0YWcpKVxuICAgICAgfVxuXG4gICAgICBpZiAoIWRvbS5pc0xvb3AgfHwgZm9yY2VQYXJzaW5nTmFtZWQpXG4gICAgICAgIHNldE5hbWVkKGRvbSwgdGFnLCBbXSlcbiAgICB9XG5cbiAgfSlcblxufVxuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb25zKHJvb3QsIHRhZywgZXhwcmVzc2lvbnMpIHtcblxuICBmdW5jdGlvbiBhZGRFeHByKGRvbSwgdmFsLCBleHRyYSkge1xuICAgIGlmICh0bXBsLmhhc0V4cHIodmFsKSkge1xuICAgICAgZXhwcmVzc2lvbnMucHVzaChleHRlbmQoeyBkb206IGRvbSwgZXhwcjogdmFsIH0sIGV4dHJhKSlcbiAgICB9XG4gIH1cblxuICB3YWxrKHJvb3QsIGZ1bmN0aW9uKGRvbSkge1xuICAgIHZhciB0eXBlID0gZG9tLm5vZGVUeXBlLFxuICAgICAgYXR0clxuXG4gICAgLy8gdGV4dCBub2RlXG4gICAgaWYgKHR5cGUgPT0gMyAmJiBkb20ucGFyZW50Tm9kZS50YWdOYW1lICE9ICdTVFlMRScpIGFkZEV4cHIoZG9tLCBkb20ubm9kZVZhbHVlKVxuICAgIGlmICh0eXBlICE9IDEpIHJldHVyblxuXG4gICAgLyogZWxlbWVudCAqL1xuXG4gICAgLy8gbG9vcFxuICAgIGF0dHIgPSBnZXRBdHRyKGRvbSwgJ2VhY2gnKVxuXG4gICAgaWYgKGF0dHIpIHsgX2VhY2goZG9tLCB0YWcsIGF0dHIpOyByZXR1cm4gZmFsc2UgfVxuXG4gICAgLy8gYXR0cmlidXRlIGV4cHJlc3Npb25zXG4gICAgZWFjaChkb20uYXR0cmlidXRlcywgZnVuY3Rpb24oYXR0cikge1xuICAgICAgdmFyIG5hbWUgPSBhdHRyLm5hbWUsXG4gICAgICAgIGJvb2wgPSBuYW1lLnNwbGl0KCdfXycpWzFdXG5cbiAgICAgIGFkZEV4cHIoZG9tLCBhdHRyLnZhbHVlLCB7IGF0dHI6IGJvb2wgfHwgbmFtZSwgYm9vbDogYm9vbCB9KVxuICAgICAgaWYgKGJvb2wpIHsgcmVtQXR0cihkb20sIG5hbWUpOyByZXR1cm4gZmFsc2UgfVxuXG4gICAgfSlcblxuICAgIC8vIHNraXAgY3VzdG9tIHRhZ3NcbiAgICBpZiAoZ2V0VGFnKGRvbSkpIHJldHVybiBmYWxzZVxuXG4gIH0pXG5cbn1cbmZ1bmN0aW9uIFRhZyhpbXBsLCBjb25mLCBpbm5lckhUTUwpIHtcblxuICB2YXIgc2VsZiA9IHJpb3Qub2JzZXJ2YWJsZSh0aGlzKSxcbiAgICBvcHRzID0gaW5oZXJpdChjb25mLm9wdHMpIHx8IHt9LFxuICAgIHBhcmVudCA9IGNvbmYucGFyZW50LFxuICAgIGlzTG9vcCA9IGNvbmYuaXNMb29wLFxuICAgIGhhc0ltcGwgPSBjb25mLmhhc0ltcGwsXG4gICAgaXRlbSA9IGNsZWFuVXBEYXRhKGNvbmYuaXRlbSksXG4gICAgZXhwcmVzc2lvbnMgPSBbXSxcbiAgICBjaGlsZFRhZ3MgPSBbXSxcbiAgICByb290ID0gY29uZi5yb290LFxuICAgIHRhZ05hbWUgPSByb290LnRhZ05hbWUudG9Mb3dlckNhc2UoKSxcbiAgICBhdHRyID0ge30sXG4gICAgcHJvcHNJblN5bmNXaXRoUGFyZW50ID0gW10sXG4gICAgZG9tXG5cbiAgLy8gb25seSBjYWxsIHVubW91bnQgaWYgd2UgaGF2ZSBhIHZhbGlkIF9fdGFnSW1wbCAoaGFzIG5hbWUgcHJvcGVydHkpXG4gIGlmIChpbXBsLm5hbWUgJiYgcm9vdC5fdGFnKSByb290Ll90YWcudW5tb3VudCh0cnVlKVxuXG4gIC8vIG5vdCB5ZXQgbW91bnRlZFxuICB0aGlzLmlzTW91bnRlZCA9IGZhbHNlXG4gIHJvb3QuaXNMb29wID0gaXNMb29wXG5cbiAgLy8ga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgdGFnIGp1c3QgY3JlYXRlZFxuICAvLyBzbyB3ZSB3aWxsIGJlIGFibGUgdG8gbW91bnQgdGhpcyB0YWcgbXVsdGlwbGUgdGltZXNcbiAgcm9vdC5fdGFnID0gdGhpc1xuXG4gIC8vIGNyZWF0ZSBhIHVuaXF1ZSBpZCB0byB0aGlzIHRhZ1xuICAvLyBpdCBjb3VsZCBiZSBoYW5keSB0byB1c2UgaXQgYWxzbyB0byBpbXByb3ZlIHRoZSB2aXJ0dWFsIGRvbSByZW5kZXJpbmcgc3BlZWRcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ19yaW90X2lkJywgKytfX3VpZCkgLy8gYmFzZSAxIGFsbG93cyB0ZXN0ICF0Ll9yaW90X2lkXG5cbiAgZXh0ZW5kKHRoaXMsIHsgcGFyZW50OiBwYXJlbnQsIHJvb3Q6IHJvb3QsIG9wdHM6IG9wdHN9LCBpdGVtKVxuICAvLyBwcm90ZWN0IHRoZSBcInRhZ3NcIiBwcm9wZXJ0eSBmcm9tIGJlaW5nIG92ZXJyaWRkZW5cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3RhZ3MnLCB7fSlcblxuICAvLyBncmFiIGF0dHJpYnV0ZXNcbiAgZWFjaChyb290LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGVsKSB7XG4gICAgdmFyIHZhbCA9IGVsLnZhbHVlXG4gICAgLy8gcmVtZW1iZXIgYXR0cmlidXRlcyB3aXRoIGV4cHJlc3Npb25zIG9ubHlcbiAgICBpZiAodG1wbC5oYXNFeHByKHZhbCkpIGF0dHJbZWwubmFtZV0gPSB2YWxcbiAgfSlcblxuICBkb20gPSBta2RvbShpbXBsLnRtcGwsIGlubmVySFRNTCwgaXNMb29wKVxuXG4gIC8vIG9wdGlvbnNcbiAgZnVuY3Rpb24gdXBkYXRlT3B0cygpIHtcbiAgICB2YXIgY3R4ID0gaGFzSW1wbCAmJiBpc0xvb3AgPyBzZWxmIDogcGFyZW50IHx8IHNlbGZcblxuICAgIC8vIHVwZGF0ZSBvcHRzIGZyb20gY3VycmVudCBET00gYXR0cmlidXRlc1xuICAgIGVhY2gocm9vdC5hdHRyaWJ1dGVzLCBmdW5jdGlvbihlbCkge1xuICAgICAgaWYgKGVsLm5hbWUgaW4gYXR0cikgcmV0dXJuXG4gICAgICB2YXIgdmFsID0gZWwudmFsdWVcbiAgICAgIG9wdHNbdG9DYW1lbChlbC5uYW1lKV0gPSB0bXBsLmhhc0V4cHIodmFsKSA/IHRtcGwodmFsLCBjdHgpIDogdmFsXG4gICAgfSlcbiAgICAvLyByZWNvdmVyIHRob3NlIHdpdGggZXhwcmVzc2lvbnNcbiAgICBlYWNoKE9iamVjdC5rZXlzKGF0dHIpLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBvcHRzW3RvQ2FtZWwobmFtZSldID0gdG1wbChhdHRyW25hbWVdLCBjdHgpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZURhdGEoZGF0YSkge1xuICAgIGZvciAodmFyIGtleSBpbiBpdGVtKSB7XG4gICAgICBpZiAodHlwZW9mIHNlbGZba2V5XSAhPT0gVF9VTkRFRiAmJiBpc1dyaXRhYmxlKHNlbGYsIGtleSkpXG4gICAgICAgIHNlbGZba2V5XSA9IGRhdGFba2V5XVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaGVyaXRGcm9tKHRhcmdldCkge1xuICAgIGVhY2goT2JqZWN0LmtleXModGFyZ2V0KSwgZnVuY3Rpb24oaykge1xuICAgICAgLy8gc29tZSBwcm9wZXJ0aWVzIG11c3QgYmUgYWx3YXlzIGluIHN5bmMgd2l0aCB0aGUgcGFyZW50IHRhZ1xuICAgICAgdmFyIG11c3RTeW5jID0gIVJFU0VSVkVEX1dPUkRTX0JMQUNLTElTVC50ZXN0KGspICYmIGNvbnRhaW5zKHByb3BzSW5TeW5jV2l0aFBhcmVudCwgaylcblxuICAgICAgaWYgKHR5cGVvZiBzZWxmW2tdID09PSBUX1VOREVGIHx8IG11c3RTeW5jKSB7XG4gICAgICAgIC8vIHRyYWNrIHRoZSBwcm9wZXJ0eSB0byBrZWVwIGluIHN5bmNcbiAgICAgICAgLy8gc28gd2UgY2FuIGtlZXAgaXQgdXBkYXRlZFxuICAgICAgICBpZiAoIW11c3RTeW5jKSBwcm9wc0luU3luY1dpdGhQYXJlbnQucHVzaChrKVxuICAgICAgICBzZWxmW2tdID0gdGFyZ2V0W2tdXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHRhZyBleHByZXNzaW9ucyBhbmQgb3B0aW9uc1xuICAgKiBAcGFyYW0gICB7ICogfSAgZGF0YSAtIGRhdGEgd2Ugd2FudCB0byB1c2UgdG8gZXh0ZW5kIHRoZSB0YWcgcHJvcGVydGllc1xuICAgKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc0luaGVyaXRlZCAtIGlzIHRoaXMgdXBkYXRlIGNvbWluZyBmcm9tIGEgcGFyZW50IHRhZz9cbiAgICogQHJldHVybnMgeyBzZWxmIH1cbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd1cGRhdGUnLCBmdW5jdGlvbihkYXRhLCBpc0luaGVyaXRlZCkge1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBkYXRhIHBhc3NlZCB3aWxsIG5vdCBvdmVycmlkZVxuICAgIC8vIHRoZSBjb21wb25lbnQgY29yZSBtZXRob2RzXG4gICAgZGF0YSA9IGNsZWFuVXBEYXRhKGRhdGEpXG4gICAgLy8gaW5oZXJpdCBwcm9wZXJ0aWVzIGZyb20gdGhlIHBhcmVudCBpbiBsb29wXG4gICAgaWYgKGlzTG9vcCkge1xuICAgICAgaW5oZXJpdEZyb20oc2VsZi5wYXJlbnQpXG4gICAgfVxuICAgIC8vIG5vcm1hbGl6ZSB0aGUgdGFnIHByb3BlcnRpZXMgaW4gY2FzZSBhbiBpdGVtIG9iamVjdCB3YXMgaW5pdGlhbGx5IHBhc3NlZFxuICAgIGlmIChkYXRhICYmIGlzT2JqZWN0KGl0ZW0pKSB7XG4gICAgICBub3JtYWxpemVEYXRhKGRhdGEpXG4gICAgICBpdGVtID0gZGF0YVxuICAgIH1cbiAgICBleHRlbmQoc2VsZiwgZGF0YSlcbiAgICB1cGRhdGVPcHRzKClcbiAgICBzZWxmLnRyaWdnZXIoJ3VwZGF0ZScsIGRhdGEpXG4gICAgdXBkYXRlKGV4cHJlc3Npb25zLCBzZWxmKVxuXG4gICAgLy8gdGhlIHVwZGF0ZWQgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWRcbiAgICAvLyBvbmNlIHRoZSBET00gd2lsbCBiZSByZWFkeSBhbmQgYWxsIHRoZSByZS1mbG93cyBhcmUgY29tcGxldGVkXG4gICAgLy8gdGhpcyBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gZ2V0IHRoZSBcInJlYWxcIiByb290IHByb3BlcnRpZXNcbiAgICAvLyA0IGV4OiByb290Lm9mZnNldFdpZHRoIC4uLlxuICAgIGlmIChpc0luaGVyaXRlZCAmJiBzZWxmLnBhcmVudClcbiAgICAgIC8vIGNsb3NlcyAjMTU5OVxuICAgICAgc2VsZi5wYXJlbnQub25lKCd1cGRhdGVkJywgZnVuY3Rpb24oKSB7IHNlbGYudHJpZ2dlcigndXBkYXRlZCcpIH0pXG4gICAgZWxzZSByQUYoZnVuY3Rpb24oKSB7IHNlbGYudHJpZ2dlcigndXBkYXRlZCcpIH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9KVxuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdtaXhpbicsIGZ1bmN0aW9uKCkge1xuICAgIGVhY2goYXJndW1lbnRzLCBmdW5jdGlvbihtaXgpIHtcbiAgICAgIHZhciBpbnN0YW5jZSxcbiAgICAgICAgcHJvcHMgPSBbXSxcbiAgICAgICAgb2JqXG5cbiAgICAgIG1peCA9IHR5cGVvZiBtaXggPT09IFRfU1RSSU5HID8gcmlvdC5taXhpbihtaXgpIDogbWl4XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBtaXhpbiBpcyBhIGZ1bmN0aW9uXG4gICAgICBpZiAoaXNGdW5jdGlvbihtaXgpKSB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbmV3IG1peGluIGluc3RhbmNlXG4gICAgICAgIGluc3RhbmNlID0gbmV3IG1peCgpXG4gICAgICB9IGVsc2UgaW5zdGFuY2UgPSBtaXhcblxuICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGluc3RhbmNlKVxuXG4gICAgICAvLyBidWlsZCBtdWx0aWxldmVsIHByb3RvdHlwZSBpbmhlcml0YW5jZSBjaGFpbiBwcm9wZXJ0eSBsaXN0XG4gICAgICBkbyBwcm9wcyA9IHByb3BzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmogfHwgaW5zdGFuY2UpKVxuICAgICAgd2hpbGUgKG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmogfHwgaW5zdGFuY2UpKVxuXG4gICAgICAvLyBsb29wIHRoZSBrZXlzIGluIHRoZSBmdW5jdGlvbiBwcm90b3R5cGUgb3IgdGhlIGFsbCBvYmplY3Qga2V5c1xuICAgICAgZWFjaChwcm9wcywgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIC8vIGJpbmQgbWV0aG9kcyB0byBzZWxmXG4gICAgICAgIC8vIGFsbG93IG1peGlucyB0byBvdmVycmlkZSBvdGhlciBwcm9wZXJ0aWVzL3BhcmVudCBtaXhpbnNcbiAgICAgICAgaWYgKGtleSAhPSAnaW5pdCcpIHtcbiAgICAgICAgICAvLyBjaGVjayBmb3IgZ2V0dGVycy9zZXR0ZXJzXG4gICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGluc3RhbmNlLCBrZXkpIHx8IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIGtleSlcbiAgICAgICAgICB2YXIgaGFzR2V0dGVyU2V0dGVyID0gZGVzY3JpcHRvciAmJiAoZGVzY3JpcHRvci5nZXQgfHwgZGVzY3JpcHRvci5zZXQpXG5cbiAgICAgICAgICAvLyBhcHBseSBtZXRob2Qgb25seSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IG9uIHRoZSBpbnN0YW5jZVxuICAgICAgICAgIGlmICghc2VsZi5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGhhc0dldHRlclNldHRlcikge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIGtleSwgZGVzY3JpcHRvcilcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZltrZXldID0gaXNGdW5jdGlvbihpbnN0YW5jZVtrZXldKSA/XG4gICAgICAgICAgICAgIGluc3RhbmNlW2tleV0uYmluZChzZWxmKSA6XG4gICAgICAgICAgICAgIGluc3RhbmNlW2tleV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIGluaXQgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGF1dG9tYXRpY2FsbHlcbiAgICAgIGlmIChpbnN0YW5jZS5pbml0KSBpbnN0YW5jZS5pbml0LmJpbmQoc2VsZikoKVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfSlcblxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbW91bnQnLCBmdW5jdGlvbigpIHtcblxuICAgIHVwZGF0ZU9wdHMoKVxuXG4gICAgLy8gYWRkIGdsb2JhbCBtaXhpbnNcbiAgICB2YXIgZ2xvYmFsTWl4aW4gPSByaW90Lm1peGluKEdMT0JBTF9NSVhJTilcblxuICAgIGlmIChnbG9iYWxNaXhpbilcbiAgICAgIGZvciAodmFyIGkgaW4gZ2xvYmFsTWl4aW4pXG4gICAgICAgIGlmIChnbG9iYWxNaXhpbi5oYXNPd25Qcm9wZXJ0eShpKSlcbiAgICAgICAgICBzZWxmLm1peGluKGdsb2JhbE1peGluW2ldKVxuXG4gICAgLy8gY2hpbGRyZW4gaW4gbG9vcCBzaG91bGQgaW5oZXJpdCBmcm9tIHRydWUgcGFyZW50XG4gICAgaWYgKHNlbGYuX3BhcmVudCAmJiBzZWxmLl9wYXJlbnQucm9vdC5pc0xvb3ApIHtcbiAgICAgIGluaGVyaXRGcm9tKHNlbGYuX3BhcmVudClcbiAgICB9XG5cbiAgICAvLyBpbml0aWFsaWF0aW9uXG4gICAgaWYgKGltcGwuZm4pIGltcGwuZm4uY2FsbChzZWxmLCBvcHRzKVxuXG4gICAgLy8gcGFyc2UgbGF5b3V0IGFmdGVyIGluaXQuIGZuIG1heSBjYWxjdWxhdGUgYXJncyBmb3IgbmVzdGVkIGN1c3RvbSB0YWdzXG4gICAgcGFyc2VFeHByZXNzaW9ucyhkb20sIHNlbGYsIGV4cHJlc3Npb25zKVxuXG4gICAgLy8gbW91bnQgdGhlIGNoaWxkIHRhZ3NcbiAgICB0b2dnbGUodHJ1ZSlcblxuICAgIC8vIHVwZGF0ZSB0aGUgcm9vdCBhZGRpbmcgY3VzdG9tIGF0dHJpYnV0ZXMgY29taW5nIGZyb20gdGhlIGNvbXBpbGVyXG4gICAgLy8gaXQgZml4ZXMgYWxzbyAjMTA4N1xuICAgIGlmIChpbXBsLmF0dHJzKVxuICAgICAgd2Fsa0F0dHJpYnV0ZXMoaW1wbC5hdHRycywgZnVuY3Rpb24gKGssIHYpIHsgc2V0QXR0cihyb290LCBrLCB2KSB9KVxuICAgIGlmIChpbXBsLmF0dHJzIHx8IGhhc0ltcGwpXG4gICAgICBwYXJzZUV4cHJlc3Npb25zKHNlbGYucm9vdCwgc2VsZiwgZXhwcmVzc2lvbnMpXG5cbiAgICBpZiAoIXNlbGYucGFyZW50IHx8IGlzTG9vcCkgc2VsZi51cGRhdGUoaXRlbSlcblxuICAgIC8vIGludGVybmFsIHVzZSBvbmx5LCBmaXhlcyAjNDAzXG4gICAgc2VsZi50cmlnZ2VyKCdiZWZvcmUtbW91bnQnKVxuXG4gICAgaWYgKGlzTG9vcCAmJiAhaGFzSW1wbCkge1xuICAgICAgLy8gdXBkYXRlIHRoZSByb290IGF0dHJpYnV0ZSBmb3IgdGhlIGxvb3BlZCBlbGVtZW50c1xuICAgICAgcm9vdCA9IGRvbS5maXJzdENoaWxkXG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChkb20uZmlyc3RDaGlsZCkgcm9vdC5hcHBlbmRDaGlsZChkb20uZmlyc3RDaGlsZClcbiAgICAgIGlmIChyb290LnN0dWIpIHJvb3QgPSBwYXJlbnQucm9vdFxuICAgIH1cblxuICAgIGRlZmluZVByb3BlcnR5KHNlbGYsICdyb290Jywgcm9vdClcblxuICAgIC8vIHBhcnNlIHRoZSBuYW1lZCBkb20gbm9kZXMgaW4gdGhlIGxvb3BlZCBjaGlsZFxuICAgIC8vIGFkZGluZyB0aGVtIHRvIHRoZSBwYXJlbnQgYXMgd2VsbFxuICAgIGlmIChpc0xvb3ApXG4gICAgICBwYXJzZU5hbWVkRWxlbWVudHMoc2VsZi5yb290LCBzZWxmLnBhcmVudCwgbnVsbCwgdHJ1ZSlcblxuICAgIC8vIGlmIGl0J3Mgbm90IGEgY2hpbGQgdGFnIHdlIGNhbiB0cmlnZ2VyIGl0cyBtb3VudCBldmVudFxuICAgIGlmICghc2VsZi5wYXJlbnQgfHwgc2VsZi5wYXJlbnQuaXNNb3VudGVkKSB7XG4gICAgICBzZWxmLmlzTW91bnRlZCA9IHRydWVcbiAgICAgIHNlbGYudHJpZ2dlcignbW91bnQnKVxuICAgIH1cbiAgICAvLyBvdGhlcndpc2Ugd2UgbmVlZCB0byB3YWl0IHRoYXQgdGhlIHBhcmVudCBldmVudCBnZXRzIHRyaWdnZXJlZFxuICAgIGVsc2Ugc2VsZi5wYXJlbnQub25lKCdtb3VudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYXZvaWQgdG8gdHJpZ2dlciB0aGUgYG1vdW50YCBldmVudCBmb3IgdGhlIHRhZ3NcbiAgICAgIC8vIG5vdCB2aXNpYmxlIGluY2x1ZGVkIGluIGFuIGlmIHN0YXRlbWVudFxuICAgICAgaWYgKCFpc0luU3R1YihzZWxmLnJvb3QpKSB7XG4gICAgICAgIHNlbGYucGFyZW50LmlzTW91bnRlZCA9IHNlbGYuaXNNb3VudGVkID0gdHJ1ZVxuICAgICAgICBzZWxmLnRyaWdnZXIoJ21vdW50JylcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG5cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3VubW91bnQnLCBmdW5jdGlvbihrZWVwUm9vdFRhZykge1xuICAgIHZhciBlbCA9IHJvb3QsXG4gICAgICBwID0gZWwucGFyZW50Tm9kZSxcbiAgICAgIHB0YWcsXG4gICAgICB0YWdJbmRleCA9IF9fdmlydHVhbERvbS5pbmRleE9mKHNlbGYpXG5cbiAgICBzZWxmLnRyaWdnZXIoJ2JlZm9yZS11bm1vdW50JylcblxuICAgIC8vIHJlbW92ZSB0aGlzIHRhZyBpbnN0YW5jZSBmcm9tIHRoZSBnbG9iYWwgdmlydHVhbERvbSB2YXJpYWJsZVxuICAgIGlmICh+dGFnSW5kZXgpXG4gICAgICBfX3ZpcnR1YWxEb20uc3BsaWNlKHRhZ0luZGV4LCAxKVxuXG4gICAgaWYgKHApIHtcblxuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICBwdGFnID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHBhcmVudClcbiAgICAgICAgLy8gcmVtb3ZlIHRoaXMgdGFnIGZyb20gdGhlIHBhcmVudCB0YWdzIG9iamVjdFxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgbmVzdGVkIHRhZ3Mgd2l0aCBzYW1lIG5hbWUuLlxuICAgICAgICAvLyByZW1vdmUgdGhpcyBlbGVtZW50IGZvcm0gdGhlIGFycmF5XG4gICAgICAgIGlmIChpc0FycmF5KHB0YWcudGFnc1t0YWdOYW1lXSkpXG4gICAgICAgICAgZWFjaChwdGFnLnRhZ3NbdGFnTmFtZV0sIGZ1bmN0aW9uKHRhZywgaSkge1xuICAgICAgICAgICAgaWYgKHRhZy5fcmlvdF9pZCA9PSBzZWxmLl9yaW90X2lkKVxuICAgICAgICAgICAgICBwdGFnLnRhZ3NbdGFnTmFtZV0uc3BsaWNlKGksIDEpXG4gICAgICAgICAgfSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgIC8vIG90aGVyd2lzZSBqdXN0IGRlbGV0ZSB0aGUgdGFnIGluc3RhbmNlXG4gICAgICAgICAgcHRhZy50YWdzW3RhZ05hbWVdID0gdW5kZWZpbmVkXG4gICAgICB9XG5cbiAgICAgIGVsc2VcbiAgICAgICAgd2hpbGUgKGVsLmZpcnN0Q2hpbGQpIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpXG5cbiAgICAgIGlmICgha2VlcFJvb3RUYWcpXG4gICAgICAgIHAucmVtb3ZlQ2hpbGQoZWwpXG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gdGhlIHJpb3QtdGFnIGFuZCB0aGUgZGF0YS1pcyBhdHRyaWJ1dGVzIGFyZW4ndCBuZWVkZWQgYW55bW9yZSwgcmVtb3ZlIHRoZW1cbiAgICAgICAgcmVtQXR0cihwLCBSSU9UX1RBR19JUylcbiAgICAgICAgcmVtQXR0cihwLCBSSU9UX1RBRykgLy8gdGhpcyB3aWxsIGJlIHJlbW92ZWQgaW4gcmlvdCAzLjAuMFxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3ZpcnRzKSB7XG4gICAgICBlYWNoKHRoaXMuX3ZpcnRzLCBmdW5jdGlvbih2KSB7XG4gICAgICAgIGlmICh2LnBhcmVudE5vZGUpIHYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzZWxmLnRyaWdnZXIoJ3VubW91bnQnKVxuICAgIHRvZ2dsZSgpXG4gICAgc2VsZi5vZmYoJyonKVxuICAgIHNlbGYuaXNNb3VudGVkID0gZmFsc2VcbiAgICBkZWxldGUgcm9vdC5fdGFnXG5cbiAgfSlcblxuICAvLyBwcm94eSBmdW5jdGlvbiB0byBiaW5kIHVwZGF0ZXNcbiAgLy8gZGlzcGF0Y2hlZCBmcm9tIGEgcGFyZW50IHRhZ1xuICBmdW5jdGlvbiBvbkNoaWxkVXBkYXRlKGRhdGEpIHsgc2VsZi51cGRhdGUoZGF0YSwgdHJ1ZSkgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZShpc01vdW50KSB7XG5cbiAgICAvLyBtb3VudC91bm1vdW50IGNoaWxkcmVuXG4gICAgZWFjaChjaGlsZFRhZ3MsIGZ1bmN0aW9uKGNoaWxkKSB7IGNoaWxkW2lzTW91bnQgPyAnbW91bnQnIDogJ3VubW91bnQnXSgpIH0pXG5cbiAgICAvLyBsaXN0ZW4vdW5saXN0ZW4gcGFyZW50IChldmVudHMgZmxvdyBvbmUgd2F5IGZyb20gcGFyZW50IHRvIGNoaWxkcmVuKVxuICAgIGlmICghcGFyZW50KSByZXR1cm5cbiAgICB2YXIgZXZ0ID0gaXNNb3VudCA/ICdvbicgOiAnb2ZmJ1xuXG4gICAgLy8gdGhlIGxvb3AgdGFncyB3aWxsIGJlIGFsd2F5cyBpbiBzeW5jIHdpdGggdGhlIHBhcmVudCBhdXRvbWF0aWNhbGx5XG4gICAgaWYgKGlzTG9vcClcbiAgICAgIHBhcmVudFtldnRdKCd1bm1vdW50Jywgc2VsZi51bm1vdW50KVxuICAgIGVsc2Uge1xuICAgICAgcGFyZW50W2V2dF0oJ3VwZGF0ZScsIG9uQ2hpbGRVcGRhdGUpW2V2dF0oJ3VubW91bnQnLCBzZWxmLnVubW91bnQpXG4gICAgfVxuICB9XG5cblxuICAvLyBuYW1lZCBlbGVtZW50cyBhdmFpbGFibGUgZm9yIGZuXG4gIHBhcnNlTmFtZWRFbGVtZW50cyhkb20sIHRoaXMsIGNoaWxkVGFncylcblxufVxuLyoqXG4gKiBBdHRhY2ggYW4gZXZlbnQgdG8gYSBET00gbm9kZVxuICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIGV2ZW50IG5hbWVcbiAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gaGFuZGxlciAtIGV2ZW50IGNhbGxiYWNrXG4gKiBAcGFyYW0geyBPYmplY3QgfSBkb20gLSBkb20gbm9kZVxuICogQHBhcmFtIHsgVGFnIH0gdGFnIC0gdGFnIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHNldEV2ZW50SGFuZGxlcihuYW1lLCBoYW5kbGVyLCBkb20sIHRhZykge1xuXG4gIGRvbVtuYW1lXSA9IGZ1bmN0aW9uKGUpIHtcblxuICAgIHZhciBwdGFnID0gdGFnLl9wYXJlbnQsXG4gICAgICBpdGVtID0gdGFnLl9pdGVtLFxuICAgICAgZWxcblxuICAgIGlmICghaXRlbSlcbiAgICAgIHdoaWxlIChwdGFnICYmICFpdGVtKSB7XG4gICAgICAgIGl0ZW0gPSBwdGFnLl9pdGVtXG4gICAgICAgIHB0YWcgPSBwdGFnLl9wYXJlbnRcbiAgICAgIH1cblxuICAgIC8vIGNyb3NzIGJyb3dzZXIgZXZlbnQgZml4XG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50XG5cbiAgICAvLyBvdmVycmlkZSB0aGUgZXZlbnQgcHJvcGVydGllc1xuICAgIGlmIChpc1dyaXRhYmxlKGUsICdjdXJyZW50VGFyZ2V0JykpIGUuY3VycmVudFRhcmdldCA9IGRvbVxuICAgIGlmIChpc1dyaXRhYmxlKGUsICd0YXJnZXQnKSkgZS50YXJnZXQgPSBlLnNyY0VsZW1lbnRcbiAgICBpZiAoaXNXcml0YWJsZShlLCAnd2hpY2gnKSkgZS53aGljaCA9IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlXG5cbiAgICBlLml0ZW0gPSBpdGVtXG5cbiAgICAvLyBwcmV2ZW50IGRlZmF1bHQgYmVoYXZpb3VyIChieSBkZWZhdWx0KVxuICAgIGlmIChoYW5kbGVyLmNhbGwodGFnLCBlKSAhPT0gdHJ1ZSAmJiAhL3JhZGlvfGNoZWNrLy50ZXN0KGRvbS50eXBlKSkge1xuICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCFlLnByZXZlbnRVcGRhdGUpIHtcbiAgICAgIGVsID0gaXRlbSA/IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyhwdGFnKSA6IHRhZ1xuICAgICAgZWwudXBkYXRlKClcbiAgICB9XG5cbiAgfVxuXG59XG5cblxuLyoqXG4gKiBJbnNlcnQgYSBET00gbm9kZSByZXBsYWNpbmcgYW5vdGhlciBvbmUgKHVzZWQgYnkgaWYtIGF0dHJpYnV0ZSlcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gcm9vdCAtIHBhcmVudCBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG5vZGUgLSBub2RlIHJlcGxhY2VkXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGJlZm9yZSAtIG5vZGUgYWRkZWRcbiAqL1xuZnVuY3Rpb24gaW5zZXJ0VG8ocm9vdCwgbm9kZSwgYmVmb3JlKSB7XG4gIGlmICghcm9vdCkgcmV0dXJuXG4gIHJvb3QuaW5zZXJ0QmVmb3JlKGJlZm9yZSwgbm9kZSlcbiAgcm9vdC5yZW1vdmVDaGlsZChub2RlKVxufVxuXG4vKipcbiAqIFVwZGF0ZSB0aGUgZXhwcmVzc2lvbnMgaW4gYSBUYWcgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIGV4cHJlc3Npb24gdGhhdCBtdXN0IGJlIHJlIGV2YWx1YXRlZFxuICogQHBhcmFtICAgeyBUYWcgfSB0YWcgLSB0YWcgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGV4cHJlc3Npb25zLCB0YWcpIHtcblxuICBlYWNoKGV4cHJlc3Npb25zLCBmdW5jdGlvbihleHByLCBpKSB7XG5cbiAgICB2YXIgZG9tID0gZXhwci5kb20sXG4gICAgICBhdHRyTmFtZSA9IGV4cHIuYXR0cixcbiAgICAgIHZhbHVlID0gdG1wbChleHByLmV4cHIsIHRhZyksXG4gICAgICBwYXJlbnQgPSBleHByLnBhcmVudCB8fCBleHByLmRvbS5wYXJlbnROb2RlXG5cbiAgICBpZiAoZXhwci5ib29sKSB7XG4gICAgICB2YWx1ZSA9ICEhdmFsdWVcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIHZhbHVlID0gJydcbiAgICB9XG5cbiAgICAvLyAjMTYzODogcmVncmVzc2lvbiBvZiAjMTYxMiwgdXBkYXRlIHRoZSBkb20gb25seSBpZiB0aGUgdmFsdWUgb2YgdGhlXG4gICAgLy8gZXhwcmVzc2lvbiB3YXMgY2hhbmdlZFxuICAgIGlmIChleHByLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGV4cHIudmFsdWUgPSB2YWx1ZVxuXG4gICAgLy8gdGV4dGFyZWEgYW5kIHRleHQgbm9kZXMgaGFzIG5vIGF0dHJpYnV0ZSBuYW1lXG4gICAgaWYgKCFhdHRyTmFtZSkge1xuICAgICAgLy8gYWJvdXQgIzgxNSB3L28gcmVwbGFjZTogdGhlIGJyb3dzZXIgY29udmVydHMgdGhlIHZhbHVlIHRvIGEgc3RyaW5nLFxuICAgICAgLy8gdGhlIGNvbXBhcmlzb24gYnkgXCI9PVwiIGRvZXMgdG9vLCBidXQgbm90IGluIHRoZSBzZXJ2ZXJcbiAgICAgIHZhbHVlICs9ICcnXG4gICAgICAvLyB0ZXN0IGZvciBwYXJlbnQgYXZvaWRzIGVycm9yIHdpdGggaW52YWxpZCBhc3NpZ25tZW50IHRvIG5vZGVWYWx1ZVxuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAvLyBjYWNoZSB0aGUgcGFyZW50IG5vZGUgYmVjYXVzZSBzb21laG93IGl0IHdpbGwgYmVjb21lIG51bGwgb24gSUVcbiAgICAgICAgLy8gb24gdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICAgIGV4cHIucGFyZW50ID0gcGFyZW50XG4gICAgICAgIGlmIChwYXJlbnQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgIHBhcmVudC52YWx1ZSA9IHZhbHVlICAgICAgICAgICAgICAgICAgICAvLyAjMTExM1xuICAgICAgICAgIGlmICghSUVfVkVSU0lPTikgZG9tLm5vZGVWYWx1ZSA9IHZhbHVlICAvLyAjMTYyNSBJRSB0aHJvd3MgaGVyZSwgbm9kZVZhbHVlXG4gICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgYmUgYXZhaWxhYmxlIG9uICd1cGRhdGVkJ1xuICAgICAgICBlbHNlIGRvbS5ub2RlVmFsdWUgPSB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gfn4jMTYxMjogbG9vayBmb3IgY2hhbmdlcyBpbiBkb20udmFsdWUgd2hlbiB1cGRhdGluZyB0aGUgdmFsdWV+flxuICAgIGlmIChhdHRyTmFtZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgaWYgKGRvbS52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgZG9tLnZhbHVlID0gdmFsdWVcbiAgICAgICAgc2V0QXR0cihkb20sIGF0dHJOYW1lLCB2YWx1ZSlcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW1vdmUgb3JpZ2luYWwgYXR0cmlidXRlXG4gICAgICByZW1BdHRyKGRvbSwgYXR0ck5hbWUpXG4gICAgfVxuXG4gICAgLy8gZXZlbnQgaGFuZGxlclxuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgc2V0RXZlbnRIYW5kbGVyKGF0dHJOYW1lLCB2YWx1ZSwgZG9tLCB0YWcpXG5cbiAgICAvLyBpZi0gY29uZGl0aW9uYWxcbiAgICB9IGVsc2UgaWYgKGF0dHJOYW1lID09ICdpZicpIHtcbiAgICAgIHZhciBzdHViID0gZXhwci5zdHViLFxuICAgICAgICBhZGQgPSBmdW5jdGlvbigpIHsgaW5zZXJ0VG8oc3R1Yi5wYXJlbnROb2RlLCBzdHViLCBkb20pIH0sXG4gICAgICAgIHJlbW92ZSA9IGZ1bmN0aW9uKCkgeyBpbnNlcnRUbyhkb20ucGFyZW50Tm9kZSwgZG9tLCBzdHViKSB9XG5cbiAgICAgIC8vIGFkZCB0byBET01cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBpZiAoc3R1Yikge1xuICAgICAgICAgIGFkZCgpXG4gICAgICAgICAgZG9tLmluU3R1YiA9IGZhbHNlXG4gICAgICAgICAgLy8gYXZvaWQgdG8gdHJpZ2dlciB0aGUgbW91bnQgZXZlbnQgaWYgdGhlIHRhZ3MgaXMgbm90IHZpc2libGUgeWV0XG4gICAgICAgICAgLy8gbWF5YmUgd2UgY2FuIG9wdGltaXplIHRoaXMgYXZvaWRpbmcgdG8gbW91bnQgdGhlIHRhZyBhdCBhbGxcbiAgICAgICAgICBpZiAoIWlzSW5TdHViKGRvbSkpIHtcbiAgICAgICAgICAgIHdhbGsoZG9tLCBmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICBpZiAoZWwuX3RhZyAmJiAhZWwuX3RhZy5pc01vdW50ZWQpXG4gICAgICAgICAgICAgICAgZWwuX3RhZy5pc01vdW50ZWQgPSAhIWVsLl90YWcudHJpZ2dlcignbW91bnQnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIC8vIHJlbW92ZSBmcm9tIERPTVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R1YiA9IGV4cHIuc3R1YiA9IHN0dWIgfHwgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpXG4gICAgICAgIC8vIGlmIHRoZSBwYXJlbnROb2RlIGlzIGRlZmluZWQgd2UgY2FuIGVhc2lseSByZXBsYWNlIHRoZSB0YWdcbiAgICAgICAgaWYgKGRvbS5wYXJlbnROb2RlKVxuICAgICAgICAgIHJlbW92ZSgpXG4gICAgICAgIC8vIG90aGVyd2lzZSB3ZSBuZWVkIHRvIHdhaXQgdGhlIHVwZGF0ZWQgZXZlbnRcbiAgICAgICAgZWxzZSAodGFnLnBhcmVudCB8fCB0YWcpLm9uZSgndXBkYXRlZCcsIHJlbW92ZSlcblxuICAgICAgICBkb20uaW5TdHViID0gdHJ1ZVxuICAgICAgfVxuICAgIC8vIHNob3cgLyBoaWRlXG4gICAgfSBlbHNlIGlmIChhdHRyTmFtZSA9PT0gJ3Nob3cnKSB7XG4gICAgICBkb20uc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJycgOiAnbm9uZSdcblxuICAgIH0gZWxzZSBpZiAoYXR0ck5hbWUgPT09ICdoaWRlJykge1xuICAgICAgZG9tLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICdub25lJyA6ICcnXG5cbiAgICB9IGVsc2UgaWYgKGV4cHIuYm9vbCkge1xuICAgICAgZG9tW2F0dHJOYW1lXSA9IHZhbHVlXG4gICAgICBpZiAodmFsdWUpIHNldEF0dHIoZG9tLCBhdHRyTmFtZSwgYXR0ck5hbWUpXG4gICAgICBpZiAoRklSRUZPWCAmJiBhdHRyTmFtZSA9PT0gJ3NlbGVjdGVkJyAmJiBkb20udGFnTmFtZSA9PT0gJ09QVElPTicpIHtcbiAgICAgICAgZG9tLl9fcmlvdDEzNzQgPSB2YWx1ZSAgIC8vICMxMzc0XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAwIHx8IHZhbHVlICYmIHR5cGVvZiB2YWx1ZSAhPT0gVF9PQkpFQ1QpIHtcbiAgICAgIC8vIDxpbWcgc3JjPVwieyBleHByIH1cIj5cbiAgICAgIGlmIChzdGFydHNXaXRoKGF0dHJOYW1lLCBSSU9UX1BSRUZJWCkgJiYgYXR0ck5hbWUgIT0gUklPVF9UQUcpIHtcbiAgICAgICAgYXR0ck5hbWUgPSBhdHRyTmFtZS5zbGljZShSSU9UX1BSRUZJWC5sZW5ndGgpXG4gICAgICB9XG4gICAgICBzZXRBdHRyKGRvbSwgYXR0ck5hbWUsIHZhbHVlKVxuICAgIH1cblxuICB9KVxuXG59XG4vKipcbiAqIFNwZWNpYWxpemVkIGZ1bmN0aW9uIGZvciBsb29waW5nIGFuIGFycmF5LWxpa2UgY29sbGVjdGlvbiB3aXRoIGBlYWNoPXt9YFxuICogQHBhcmFtICAgeyBBcnJheSB9IGVscyAtIGNvbGxlY3Rpb24gb2YgaXRlbXNcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMgeyBBcnJheSB9IHRoZSBhcnJheSBsb29wZWRcbiAqL1xuZnVuY3Rpb24gZWFjaChlbHMsIGZuKSB7XG4gIHZhciBsZW4gPSBlbHMgPyBlbHMubGVuZ3RoIDogMFxuXG4gIGZvciAodmFyIGkgPSAwLCBlbDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZWwgPSBlbHNbaV1cbiAgICAvLyByZXR1cm4gZmFsc2UgLT4gY3VycmVudCBpdGVtIHdhcyByZW1vdmVkIGJ5IGZuIGR1cmluZyB0aGUgbG9vcFxuICAgIGlmIChlbCAhPSBudWxsICYmIGZuKGVsLCBpKSA9PT0gZmFsc2UpIGktLVxuICB9XG4gIHJldHVybiBlbHNcbn1cblxuLyoqXG4gKiBEZXRlY3QgaWYgdGhlIGFyZ3VtZW50IHBhc3NlZCBpcyBhIGZ1bmN0aW9uXG4gKiBAcGFyYW0gICB7ICogfSB2IC0gd2hhdGV2ZXIgeW91IHdhbnQgdG8gcGFzcyB0byB0aGlzIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odikge1xuICByZXR1cm4gdHlwZW9mIHYgPT09IFRfRlVOQ1RJT04gfHwgZmFsc2UgICAvLyBhdm9pZCBJRSBwcm9ibGVtc1xufVxuXG4vKipcbiAqIEdldCB0aGUgb3V0ZXIgaHRtbCBvZiBhbnkgRE9NIG5vZGUgU1ZHcyBpbmNsdWRlZFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlbCAtIERPTSBub2RlIHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IGVsLm91dGVySFRNTFxuICovXG5mdW5jdGlvbiBnZXRPdXRlckhUTUwoZWwpIHtcbiAgaWYgKGVsLm91dGVySFRNTCkgcmV0dXJuIGVsLm91dGVySFRNTFxuICAvLyBzb21lIGJyb3dzZXJzIGRvIG5vdCBzdXBwb3J0IG91dGVySFRNTCBvbiB0aGUgU1ZHcyB0YWdzXG4gIGVsc2Uge1xuICAgIHZhciBjb250YWluZXIgPSBta0VsKCdkaXYnKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbC5jbG9uZU5vZGUodHJ1ZSkpXG4gICAgcmV0dXJuIGNvbnRhaW5lci5pbm5lckhUTUxcbiAgfVxufVxuXG4vKipcbiAqIFNldCB0aGUgaW5uZXIgaHRtbCBvZiBhbnkgRE9NIG5vZGUgU1ZHcyBpbmNsdWRlZFxuICogQHBhcmFtIHsgT2JqZWN0IH0gY29udGFpbmVyIC0gRE9NIG5vZGUgd2hlcmUgd2Ugd2lsbCBpbmplY3QgdGhlIG5ldyBodG1sXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBodG1sIC0gaHRtbCB0byBpbmplY3RcbiAqL1xuZnVuY3Rpb24gc2V0SW5uZXJIVE1MKGNvbnRhaW5lciwgaHRtbCkge1xuICBpZiAodHlwZW9mIGNvbnRhaW5lci5pbm5lckhUTUwgIT0gVF9VTkRFRikgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWxcbiAgLy8gc29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCBpbm5lckhUTUwgb24gdGhlIFNWR3MgdGFnc1xuICBlbHNlIHtcbiAgICB2YXIgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAnYXBwbGljYXRpb24veG1sJylcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICBjb250YWluZXIub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRvYy5kb2N1bWVudEVsZW1lbnQsIHRydWUpXG4gICAgKVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIHdldGhlciBhIERPTSBub2RlIG11c3QgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFuIHN2ZyBkb2N1bWVudFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgbmFtZSAtIHRhZyBuYW1lXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzU1ZHVGFnKG5hbWUpIHtcbiAgcmV0dXJuIH5TVkdfVEFHU19MSVNULmluZGV4T2YobmFtZSlcbn1cblxuLyoqXG4gKiBEZXRlY3QgaWYgdGhlIGFyZ3VtZW50IHBhc3NlZCBpcyBhbiBvYmplY3QsIGV4Y2x1ZGUgbnVsbC5cbiAqIE5PVEU6IFVzZSBpc09iamVjdCh4KSAmJiAhaXNBcnJheSh4KSB0byBleGNsdWRlcyBhcnJheXMuXG4gKiBAcGFyYW0gICB7ICogfSB2IC0gd2hhdGV2ZXIgeW91IHdhbnQgdG8gcGFzcyB0byB0aGlzIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHYpIHtcbiAgcmV0dXJuIHYgJiYgdHlwZW9mIHYgPT09IFRfT0JKRUNUICAgICAgICAgLy8gdHlwZW9mIG51bGwgaXMgJ29iamVjdCdcbn1cblxuLyoqXG4gKiBSZW1vdmUgYW55IERPTSBhdHRyaWJ1dGUgZnJvbSBhIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byB1cGRhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gcmVtb3ZlXG4gKi9cbmZ1bmN0aW9uIHJlbUF0dHIoZG9tLCBuYW1lKSB7XG4gIGRvbS5yZW1vdmVBdHRyaWJ1dGUobmFtZSlcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIGNvbnRhaW5pbmcgZGFzaGVzIHRvIGNhbWVsIGNhc2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc3RyaW5nIC0gaW5wdXQgc3RyaW5nXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG15LXN0cmluZyAtPiBteVN0cmluZ1xuICovXG5mdW5jdGlvbiB0b0NhbWVsKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLy0oXFx3KS9nLCBmdW5jdGlvbihfLCBjKSB7XG4gICAgcmV0dXJuIGMudG9VcHBlckNhc2UoKVxuICB9KVxufVxuXG4vKipcbiAqIEdldCB0aGUgdmFsdWUgb2YgYW55IERPTSBhdHRyaWJ1dGUgb24gYSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB3ZSB3YW50IHRvIGdldFxuICogQHJldHVybnMgeyBTdHJpbmcgfCB1bmRlZmluZWQgfSBuYW1lIG9mIHRoZSBub2RlIGF0dHJpYnV0ZSB3aGV0aGVyIGl0IGV4aXN0c1xuICovXG5mdW5jdGlvbiBnZXRBdHRyKGRvbSwgbmFtZSkge1xuICByZXR1cm4gZG9tLmdldEF0dHJpYnV0ZShuYW1lKVxufVxuXG4vKipcbiAqIFNldCBhbnkgRE9NL1NWRyBhdHRyaWJ1dGVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgcHJvcGVydHkgd2Ugd2FudCB0byBzZXRcbiAqIEBwYXJhbSB7IFN0cmluZyB9IHZhbCAtIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHNldFxuICovXG5mdW5jdGlvbiBzZXRBdHRyKGRvbSwgbmFtZSwgdmFsKSB7XG4gIHZhciB4bGluayA9IFhMSU5LX1JFR0VYLmV4ZWMobmFtZSlcbiAgaWYgKHhsaW5rICYmIHhsaW5rWzFdKVxuICAgIGRvbS5zZXRBdHRyaWJ1dGVOUyhYTElOS19OUywgeGxpbmtbMV0sIHZhbClcbiAgZWxzZVxuICAgIGRvbS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsKVxufVxuXG4vKipcbiAqIERldGVjdCB0aGUgdGFnIGltcGxlbWVudGF0aW9uIGJ5IGEgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2UgbmVlZCB0byBwYXJzZSB0byBnZXQgaXRzIHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybnMgeyBPYmplY3QgfSBpdCByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBhIGN1c3RvbSB0YWcgKHRlbXBsYXRlIGFuZCBib290IGZ1bmN0aW9uKVxuICovXG5mdW5jdGlvbiBnZXRUYWcoZG9tKSB7XG4gIHJldHVybiBkb20udGFnTmFtZSAmJiBfX3RhZ0ltcGxbZ2V0QXR0cihkb20sIFJJT1RfVEFHX0lTKSB8fFxuICAgIGdldEF0dHIoZG9tLCBSSU9UX1RBRykgfHwgZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKV1cbn1cbi8qKlxuICogQWRkIGEgY2hpbGQgdGFnIHRvIGl0cyBwYXJlbnQgaW50byB0aGUgYHRhZ3NgIG9iamVjdFxuICogQHBhcmFtICAgeyBPYmplY3QgfSB0YWcgLSBjaGlsZCB0YWcgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIGtleSB3aGVyZSB0aGUgbmV3IHRhZyB3aWxsIGJlIHN0b3JlZFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBwYXJlbnQgLSB0YWcgaW5zdGFuY2Ugd2hlcmUgdGhlIG5ldyBjaGlsZCB0YWcgd2lsbCBiZSBpbmNsdWRlZFxuICovXG5mdW5jdGlvbiBhZGRDaGlsZFRhZyh0YWcsIHRhZ05hbWUsIHBhcmVudCkge1xuICB2YXIgY2FjaGVkVGFnID0gcGFyZW50LnRhZ3NbdGFnTmFtZV1cblxuICAvLyBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgY2hpbGRyZW4gdGFncyBoYXZpbmcgdGhlIHNhbWUgbmFtZVxuICBpZiAoY2FjaGVkVGFnKSB7XG4gICAgLy8gaWYgdGhlIHBhcmVudCB0YWdzIHByb3BlcnR5IGlzIG5vdCB5ZXQgYW4gYXJyYXlcbiAgICAvLyBjcmVhdGUgaXQgYWRkaW5nIHRoZSBmaXJzdCBjYWNoZWQgdGFnXG4gICAgaWYgKCFpc0FycmF5KGNhY2hlZFRhZykpXG4gICAgICAvLyBkb24ndCBhZGQgdGhlIHNhbWUgdGFnIHR3aWNlXG4gICAgICBpZiAoY2FjaGVkVGFnICE9PSB0YWcpXG4gICAgICAgIHBhcmVudC50YWdzW3RhZ05hbWVdID0gW2NhY2hlZFRhZ11cbiAgICAvLyBhZGQgdGhlIG5ldyBuZXN0ZWQgdGFnIHRvIHRoZSBhcnJheVxuICAgIGlmICghY29udGFpbnMocGFyZW50LnRhZ3NbdGFnTmFtZV0sIHRhZykpXG4gICAgICBwYXJlbnQudGFnc1t0YWdOYW1lXS5wdXNoKHRhZylcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnQudGFnc1t0YWdOYW1lXSA9IHRhZ1xuICB9XG59XG5cbi8qKlxuICogTW92ZSB0aGUgcG9zaXRpb24gb2YgYSBjdXN0b20gdGFnIGluIGl0cyBwYXJlbnQgdGFnXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHRhZyAtIGNoaWxkIHRhZyBpbnN0YW5jZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0ga2V5IHdoZXJlIHRoZSB0YWcgd2FzIHN0b3JlZFxuICogQHBhcmFtICAgeyBOdW1iZXIgfSBuZXdQb3MgLSBpbmRleCB3aGVyZSB0aGUgbmV3IHRhZyB3aWxsIGJlIHN0b3JlZFxuICovXG5mdW5jdGlvbiBtb3ZlQ2hpbGRUYWcodGFnLCB0YWdOYW1lLCBuZXdQb3MpIHtcbiAgdmFyIHBhcmVudCA9IHRhZy5wYXJlbnQsXG4gICAgdGFnc1xuICAvLyBubyBwYXJlbnQgbm8gbW92ZVxuICBpZiAoIXBhcmVudCkgcmV0dXJuXG5cbiAgdGFncyA9IHBhcmVudC50YWdzW3RhZ05hbWVdXG5cbiAgaWYgKGlzQXJyYXkodGFncykpXG4gICAgdGFncy5zcGxpY2UobmV3UG9zLCAwLCB0YWdzLnNwbGljZSh0YWdzLmluZGV4T2YodGFnKSwgMSlbMF0pXG4gIGVsc2UgYWRkQ2hpbGRUYWcodGFnLCB0YWdOYW1lLCBwYXJlbnQpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGNoaWxkIHRhZyBpbmNsdWRpbmcgaXQgY29ycmVjdGx5IGludG8gaXRzIHBhcmVudFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjaGlsZCAtIGNoaWxkIHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRzIC0gdGFnIG9wdGlvbnMgY29udGFpbmluZyB0aGUgRE9NIG5vZGUgd2hlcmUgdGhlIHRhZyB3aWxsIGJlIG1vdW50ZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gaW5uZXJIVE1MIC0gaW5uZXIgaHRtbCBvZiB0aGUgY2hpbGQgbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBwYXJlbnQgLSBpbnN0YW5jZSBvZiB0aGUgcGFyZW50IHRhZyBpbmNsdWRpbmcgdGhlIGNoaWxkIGN1c3RvbSB0YWdcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gaW5zdGFuY2Ugb2YgdGhlIG5ldyBjaGlsZCB0YWcganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIGluaXRDaGlsZFRhZyhjaGlsZCwgb3B0cywgaW5uZXJIVE1MLCBwYXJlbnQpIHtcbiAgdmFyIHRhZyA9IG5ldyBUYWcoY2hpbGQsIG9wdHMsIGlubmVySFRNTCksXG4gICAgdGFnTmFtZSA9IGdldFRhZ05hbWUob3B0cy5yb290KSxcbiAgICBwdGFnID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHBhcmVudClcbiAgLy8gZml4IGZvciB0aGUgcGFyZW50IGF0dHJpYnV0ZSBpbiB0aGUgbG9vcGVkIGVsZW1lbnRzXG4gIHRhZy5wYXJlbnQgPSBwdGFnXG4gIC8vIHN0b3JlIHRoZSByZWFsIHBhcmVudCB0YWdcbiAgLy8gaW4gc29tZSBjYXNlcyB0aGlzIGNvdWxkIGJlIGRpZmZlcmVudCBmcm9tIHRoZSBjdXN0b20gcGFyZW50IHRhZ1xuICAvLyBmb3IgZXhhbXBsZSBpbiBuZXN0ZWQgbG9vcHNcbiAgdGFnLl9wYXJlbnQgPSBwYXJlbnRcblxuICAvLyBhZGQgdGhpcyB0YWcgdG8gdGhlIGN1c3RvbSBwYXJlbnQgdGFnXG4gIGFkZENoaWxkVGFnKHRhZywgdGFnTmFtZSwgcHRhZylcbiAgLy8gYW5kIGFsc28gdG8gdGhlIHJlYWwgcGFyZW50IHRhZ1xuICBpZiAocHRhZyAhPT0gcGFyZW50KVxuICAgIGFkZENoaWxkVGFnKHRhZywgdGFnTmFtZSwgcGFyZW50KVxuICAvLyBlbXB0eSB0aGUgY2hpbGQgbm9kZSBvbmNlIHdlIGdvdCBpdHMgdGVtcGxhdGVcbiAgLy8gdG8gYXZvaWQgdGhhdCBpdHMgY2hpbGRyZW4gZ2V0IGNvbXBpbGVkIG11bHRpcGxlIHRpbWVzXG4gIG9wdHMucm9vdC5pbm5lckhUTUwgPSAnJ1xuXG4gIHJldHVybiB0YWdcbn1cblxuLyoqXG4gKiBMb29wIGJhY2t3YXJkIGFsbCB0aGUgcGFyZW50cyB0cmVlIHRvIGRldGVjdCB0aGUgZmlyc3QgY3VzdG9tIHBhcmVudCB0YWdcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gdGFnIC0gYSBUYWcgaW5zdGFuY2VcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gdGhlIGluc3RhbmNlIG9mIHRoZSBmaXJzdCBjdXN0b20gcGFyZW50IHRhZyBmb3VuZFxuICovXG5mdW5jdGlvbiBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGFnKSB7XG4gIHZhciBwdGFnID0gdGFnXG4gIHdoaWxlICghZ2V0VGFnKHB0YWcucm9vdCkpIHtcbiAgICBpZiAoIXB0YWcucGFyZW50KSBicmVha1xuICAgIHB0YWcgPSBwdGFnLnBhcmVudFxuICB9XG4gIHJldHVybiBwdGFnXG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNldCBhbiBpbW11dGFibGUgcHJvcGVydHlcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZWwgLSBvYmplY3Qgd2hlcmUgdGhlIG5ldyBwcm9wZXJ0eSB3aWxsIGJlIHNldFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBrZXkgLSBvYmplY3Qga2V5IHdoZXJlIHRoZSBuZXcgcHJvcGVydHkgd2lsbCBiZSBzdG9yZWRcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC0gdmFsdWUgb2YgdGhlIG5ldyBwcm9wZXJ0eVxuKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdGlvbnMgLSBzZXQgdGhlIHByb3Blcnkgb3ZlcnJpZGluZyB0aGUgZGVmYXVsdCBvcHRpb25zXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IC0gdGhlIGluaXRpYWwgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGVsLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwga2V5LCBleHRlbmQoe1xuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0sIG9wdGlvbnMpKVxuICByZXR1cm4gZWxcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRhZyBuYW1lIG9mIGFueSBET00gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUgdG8gaWRlbnRpZnkgdGhpcyBkb20gbm9kZSBpbiByaW90XG4gKi9cbmZ1bmN0aW9uIGdldFRhZ05hbWUoZG9tKSB7XG4gIHZhciBjaGlsZCA9IGdldFRhZyhkb20pLFxuICAgIG5hbWVkVGFnID0gZ2V0QXR0cihkb20sICduYW1lJyksXG4gICAgdGFnTmFtZSA9IG5hbWVkVGFnICYmICF0bXBsLmhhc0V4cHIobmFtZWRUYWcpID9cbiAgICAgICAgICAgICAgICBuYW1lZFRhZyA6XG4gICAgICAgICAgICAgIGNoaWxkID8gY2hpbGQubmFtZSA6IGRvbS50YWdOYW1lLnRvTG93ZXJDYXNlKClcblxuICByZXR1cm4gdGFnTmFtZVxufVxuXG4vKipcbiAqIEV4dGVuZCBhbnkgb2JqZWN0IHdpdGggb3RoZXIgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBzcmMgLSBzb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IHRoZSByZXN1bHRpbmcgZXh0ZW5kZWQgb2JqZWN0XG4gKlxuICogdmFyIG9iaiA9IHsgZm9vOiAnYmF6JyB9XG4gKiBleHRlbmQob2JqLCB7YmFyOiAnYmFyJywgZm9vOiAnYmFyJ30pXG4gKiBjb25zb2xlLmxvZyhvYmopID0+IHtiYXI6ICdiYXInLCBmb286ICdiYXInfVxuICpcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKHNyYykge1xuICB2YXIgb2JqLCBhcmdzID0gYXJndW1lbnRzXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChvYmogPSBhcmdzW2ldKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgcHJvcGVydHkgb2YgdGhlIHNvdXJjZSBvYmplY3QgY291bGQgYmUgb3ZlcnJpZGRlblxuICAgICAgICBpZiAoaXNXcml0YWJsZShzcmMsIGtleSkpXG4gICAgICAgICAgc3JjW2tleV0gPSBvYmpba2V5XVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3JjXG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBhcnJheSBjb250YWlucyBhbiBpdGVtXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gYXJyIC0gdGFyZ2V0IGFycmF5XG4gKiBAcGFyYW0gICB7ICogfSBpdGVtIC0gaXRlbSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSBEb2VzICdhcnInIGNvbnRhaW4gJ2l0ZW0nP1xuICovXG5mdW5jdGlvbiBjb250YWlucyhhcnIsIGl0ZW0pIHtcbiAgcmV0dXJuIH5hcnIuaW5kZXhPZihpdGVtKVxufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gb2JqZWN0IGlzIGEga2luZCBvZiBhcnJheVxuICogQHBhcmFtICAgeyAqIH0gYSAtIGFueXRoaW5nXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gaXMgJ2EnIGFuIGFycmF5P1xuICovXG5mdW5jdGlvbiBpc0FycmF5KGEpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSkgfHwgYSBpbnN0YW5jZW9mIEFycmF5IH1cblxuLyoqXG4gKiBEZXRlY3Qgd2hldGhlciBhIHByb3BlcnR5IG9mIGFuIG9iamVjdCBjb3VsZCBiZSBvdmVycmlkZGVuXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBvYmogLSBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICBrZXkgLSBvYmplY3QgcHJvcGVydHlcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IGlzIHRoaXMgcHJvcGVydHkgd3JpdGFibGU/XG4gKi9cbmZ1bmN0aW9uIGlzV3JpdGFibGUob2JqLCBrZXkpIHtcbiAgdmFyIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSlcbiAgcmV0dXJuIHR5cGVvZiBvYmpba2V5XSA9PT0gVF9VTkRFRiB8fCBwcm9wcyAmJiBwcm9wcy53cml0YWJsZVxufVxuXG5cbi8qKlxuICogV2l0aCB0aGlzIGZ1bmN0aW9uIHdlIGF2b2lkIHRoYXQgdGhlIGludGVybmFsIFRhZyBtZXRob2RzIGdldCBvdmVycmlkZGVuXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRhdGEgLSBvcHRpb25zIHdlIHdhbnQgdG8gdXNlIHRvIGV4dGVuZCB0aGUgdGFnIGluc3RhbmNlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGNsZWFuIG9iamVjdCB3aXRob3V0IGNvbnRhaW5pbmcgdGhlIHJpb3QgaW50ZXJuYWwgcmVzZXJ2ZWQgd29yZHNcbiAqL1xuZnVuY3Rpb24gY2xlYW5VcERhdGEoZGF0YSkge1xuICBpZiAoIShkYXRhIGluc3RhbmNlb2YgVGFnKSAmJiAhKGRhdGEgJiYgdHlwZW9mIGRhdGEudHJpZ2dlciA9PSBUX0ZVTkNUSU9OKSlcbiAgICByZXR1cm4gZGF0YVxuXG4gIHZhciBvID0ge31cbiAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICBpZiAoIVJFU0VSVkVEX1dPUkRTX0JMQUNLTElTVC50ZXN0KGtleSkpIG9ba2V5XSA9IGRhdGFba2V5XVxuICB9XG4gIHJldHVybiBvXG59XG5cbi8qKlxuICogV2FsayBkb3duIHJlY3Vyc2l2ZWx5IGFsbCB0aGUgY2hpbGRyZW4gdGFncyBzdGFydGluZyBkb20gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgIGRvbSAtIHN0YXJ0aW5nIG5vZGUgd2hlcmUgd2Ugd2lsbCBzdGFydCB0aGUgcmVjdXJzaW9uXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayB0byB0cmFuc2Zvcm0gdGhlIGNoaWxkIG5vZGUganVzdCBmb3VuZFxuICovXG5mdW5jdGlvbiB3YWxrKGRvbSwgZm4pIHtcbiAgaWYgKGRvbSkge1xuICAgIC8vIHN0b3AgdGhlIHJlY3Vyc2lvblxuICAgIGlmIChmbihkb20pID09PSBmYWxzZSkgcmV0dXJuXG4gICAgZWxzZSB7XG4gICAgICBkb20gPSBkb20uZmlyc3RDaGlsZFxuXG4gICAgICB3aGlsZSAoZG9tKSB7XG4gICAgICAgIHdhbGsoZG9tLCBmbilcbiAgICAgICAgZG9tID0gZG9tLm5leHRTaWJsaW5nXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogTWluaW1pemUgcmlzazogb25seSB6ZXJvIG9yIG9uZSBfc3BhY2VfIGJldHdlZW4gYXR0ciAmIHZhbHVlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgaHRtbCAtIGh0bWwgc3RyaW5nIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFwcGx5IG9uIGFueSBhdHRyaWJ1dGUgZm91bmRcbiAqL1xuZnVuY3Rpb24gd2Fsa0F0dHJpYnV0ZXMoaHRtbCwgZm4pIHtcbiAgdmFyIG0sXG4gICAgcmUgPSAvKFstXFx3XSspID89ID8oPzpcIihbXlwiXSopfCcoW14nXSopfCh7W159XSp9KSkvZ1xuXG4gIHdoaWxlIChtID0gcmUuZXhlYyhodG1sKSkge1xuICAgIGZuKG1bMV0udG9Mb3dlckNhc2UoKSwgbVsyXSB8fCBtWzNdIHx8IG1bNF0pXG4gIH1cbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgRE9NIG5vZGUgaXMgaW4gc3R1YiBtb2RlLCB1c2VmdWwgZm9yIHRoZSByaW90ICdpZicgZGlyZWN0aXZlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzSW5TdHViKGRvbSkge1xuICB3aGlsZSAoZG9tKSB7XG4gICAgaWYgKGRvbS5pblN0dWIpIHJldHVybiB0cnVlXG4gICAgZG9tID0gZG9tLnBhcmVudE5vZGVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBnZW5lcmljIERPTSBub2RlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBET00gbm9kZSB3ZSB3YW50IHRvIGNyZWF0ZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNTdmcgLSBzaG91bGQgd2UgdXNlIGEgU1ZHIGFzIHBhcmVudCBub2RlP1xuICogQHJldHVybnMgeyBPYmplY3QgfSBET00gbm9kZSBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gbWtFbChuYW1lLCBpc1N2Zykge1xuICByZXR1cm4gaXNTdmcgP1xuICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJykgOlxuICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSlcbn1cblxuLyoqXG4gKiBTaG9ydGVyIGFuZCBmYXN0IHdheSB0byBzZWxlY3QgbXVsdGlwbGUgbm9kZXMgaW4gdGhlIERPTVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzZWxlY3RvciAtIERPTSBzZWxlY3RvclxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjdHggLSBET00gbm9kZSB3aGVyZSB0aGUgdGFyZ2V0cyBvZiBvdXIgc2VhcmNoIHdpbGwgaXMgbG9jYXRlZFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb20gbm9kZXMgZm91bmRcbiAqL1xuZnVuY3Rpb24gJCQoc2VsZWN0b3IsIGN0eCkge1xuICByZXR1cm4gKGN0eCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcilcbn1cblxuLyoqXG4gKiBTaG9ydGVyIGFuZCBmYXN0IHdheSB0byBzZWxlY3QgYSBzaW5nbGUgbm9kZSBpbiB0aGUgRE9NXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHNlbGVjdG9yIC0gdW5pcXVlIGRvbSBzZWxlY3RvclxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjdHggLSBET00gbm9kZSB3aGVyZSB0aGUgdGFyZ2V0IG9mIG91ciBzZWFyY2ggd2lsbCBpcyBsb2NhdGVkXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGRvbSBub2RlIGZvdW5kXG4gKi9cbmZ1bmN0aW9uICQoc2VsZWN0b3IsIGN0eCkge1xuICByZXR1cm4gKGN0eCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcilcbn1cblxuLyoqXG4gKiBTaW1wbGUgb2JqZWN0IHByb3RvdHlwYWwgaW5oZXJpdGFuY2VcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gcGFyZW50IC0gcGFyZW50IG9iamVjdFxuICogQHJldHVybnMgeyBPYmplY3QgfSBjaGlsZCBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBpbmhlcml0KHBhcmVudCkge1xuICByZXR1cm4gT2JqZWN0LmNyZWF0ZShwYXJlbnQgfHwgbnVsbClcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG5hbWUgcHJvcGVydHkgbmVlZGVkIHRvIGlkZW50aWZ5IGEgRE9NIG5vZGUgaW4gcmlvdFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSBuZWVkIHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7IFN0cmluZyB8IHVuZGVmaW5lZCB9IGdpdmUgdXMgYmFjayBhIHN0cmluZyB0byBpZGVudGlmeSB0aGlzIGRvbSBub2RlXG4gKi9cbmZ1bmN0aW9uIGdldE5hbWVkS2V5KGRvbSkge1xuICByZXR1cm4gZ2V0QXR0cihkb20sICdpZCcpIHx8IGdldEF0dHIoZG9tLCAnbmFtZScpXG59XG5cbi8qKlxuICogU2V0IHRoZSBuYW1lZCBwcm9wZXJ0aWVzIG9mIGEgdGFnIGVsZW1lbnRcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIG5lZWQgdG8gcGFyc2VcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHBhcmVudCAtIHRhZyBpbnN0YW5jZSB3aGVyZSB0aGUgbmFtZWQgZG9tIGVsZW1lbnQgd2lsbCBiZSBldmVudHVhbGx5IGFkZGVkXG4gKiBAcGFyYW0geyBBcnJheSB9IGtleXMgLSBsaXN0IG9mIGFsbCB0aGUgdGFnIGluc3RhbmNlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gc2V0TmFtZWQoZG9tLCBwYXJlbnQsIGtleXMpIHtcbiAgLy8gZ2V0IHRoZSBrZXkgdmFsdWUgd2Ugd2FudCB0byBhZGQgdG8gdGhlIHRhZyBpbnN0YW5jZVxuICB2YXIga2V5ID0gZ2V0TmFtZWRLZXkoZG9tKSxcbiAgICBpc0FycixcbiAgICAvLyBhZGQgdGhlIG5vZGUgZGV0ZWN0ZWQgdG8gYSB0YWcgaW5zdGFuY2UgdXNpbmcgdGhlIG5hbWVkIHByb3BlcnR5XG4gICAgYWRkID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIC8vIGF2b2lkIHRvIG92ZXJyaWRlIHRoZSB0YWcgcHJvcGVydGllcyBhbHJlYWR5IHNldFxuICAgICAgaWYgKGNvbnRhaW5zKGtleXMsIGtleSkpIHJldHVyblxuICAgICAgLy8gY2hlY2sgd2hldGhlciB0aGlzIHZhbHVlIGlzIGFuIGFycmF5XG4gICAgICBpc0FyciA9IGlzQXJyYXkodmFsdWUpXG4gICAgICAvLyBpZiB0aGUga2V5IHdhcyBuZXZlciBzZXRcbiAgICAgIGlmICghdmFsdWUpXG4gICAgICAgIC8vIHNldCBpdCBvbmNlIG9uIHRoZSB0YWcgaW5zdGFuY2VcbiAgICAgICAgcGFyZW50W2tleV0gPSBkb21cbiAgICAgIC8vIGlmIGl0IHdhcyBhbiBhcnJheSBhbmQgbm90IHlldCBzZXRcbiAgICAgIGVsc2UgaWYgKCFpc0FyciB8fCBpc0FyciAmJiAhY29udGFpbnModmFsdWUsIGRvbSkpIHtcbiAgICAgICAgLy8gYWRkIHRoZSBkb20gbm9kZSBpbnRvIHRoZSBhcnJheVxuICAgICAgICBpZiAoaXNBcnIpXG4gICAgICAgICAgdmFsdWUucHVzaChkb20pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBwYXJlbnRba2V5XSA9IFt2YWx1ZSwgZG9tXVxuICAgICAgfVxuICAgIH1cblxuICAvLyBza2lwIHRoZSBlbGVtZW50cyB3aXRoIG5vIG5hbWVkIHByb3BlcnRpZXNcbiAgaWYgKCFrZXkpIHJldHVyblxuXG4gIC8vIGNoZWNrIHdoZXRoZXIgdGhpcyBrZXkgaGFzIGJlZW4gYWxyZWFkeSBldmFsdWF0ZWRcbiAgaWYgKHRtcGwuaGFzRXhwcihrZXkpKVxuICAgIC8vIHdhaXQgdGhlIGZpcnN0IHVwZGF0ZWQgZXZlbnQgb25seSBvbmNlXG4gICAgcGFyZW50Lm9uZSgnbW91bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgIGtleSA9IGdldE5hbWVkS2V5KGRvbSlcbiAgICAgIGFkZChwYXJlbnRba2V5XSlcbiAgICB9KVxuICBlbHNlXG4gICAgYWRkKHBhcmVudFtrZXldKVxuXG59XG5cbi8qKlxuICogRmFzdGVyIFN0cmluZyBzdGFydHNXaXRoIGFsdGVybmF0aXZlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHNyYyAtIHNvdXJjZSBzdHJpbmdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc3RyIC0gdGVzdCBzdHJpbmdcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gc3RhcnRzV2l0aChzcmMsIHN0cikge1xuICByZXR1cm4gc3JjLnNsaWNlKDAsIHN0ci5sZW5ndGgpID09PSBzdHJcbn1cblxuLyoqXG4gKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZnVuY3Rpb25cbiAqIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTU3OTY3MSwgbGljZW5zZSBNSVRcbiAqL1xudmFyIHJBRiA9IChmdW5jdGlvbiAodykge1xuICB2YXIgcmFmID0gdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgICAgIHcubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHcud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cbiAgaWYgKCFyYWYgfHwgL2lQKGFkfGhvbmV8b2QpLipPUyA2Ly50ZXN0KHcubmF2aWdhdG9yLnVzZXJBZ2VudCkpIHsgIC8vIGJ1Z2d5IGlPUzZcbiAgICB2YXIgbGFzdFRpbWUgPSAwXG5cbiAgICByYWYgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIHZhciBub3d0aW1lID0gRGF0ZS5ub3coKSwgdGltZW91dCA9IE1hdGgubWF4KDE2IC0gKG5vd3RpbWUgLSBsYXN0VGltZSksIDApXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgY2IobGFzdFRpbWUgPSBub3d0aW1lICsgdGltZW91dCkgfSwgdGltZW91dClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJhZlxuXG59KSh3aW5kb3cgfHwge30pXG5cbi8qKlxuICogTW91bnQgYSB0YWcgY3JlYXRpbmcgbmV3IFRhZyBpbnN0YW5jZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSByb290IC0gZG9tIG5vZGUgd2hlcmUgdGhlIHRhZyB3aWxsIGJlIG1vdW50ZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIG5hbWUgb2YgdGhlIHJpb3QgdGFnIHdlIHdhbnQgdG8gbW91bnRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgVGFnIGluc3RhbmNlXG4gKiBAcmV0dXJucyB7IFRhZyB9IGEgbmV3IFRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBtb3VudFRvKHJvb3QsIHRhZ05hbWUsIG9wdHMpIHtcbiAgdmFyIHRhZyA9IF9fdGFnSW1wbFt0YWdOYW1lXSxcbiAgICAvLyBjYWNoZSB0aGUgaW5uZXIgSFRNTCB0byBmaXggIzg1NVxuICAgIGlubmVySFRNTCA9IHJvb3QuX2lubmVySFRNTCA9IHJvb3QuX2lubmVySFRNTCB8fCByb290LmlubmVySFRNTFxuXG4gIC8vIGNsZWFyIHRoZSBpbm5lciBodG1sXG4gIHJvb3QuaW5uZXJIVE1MID0gJydcblxuICBpZiAodGFnICYmIHJvb3QpIHRhZyA9IG5ldyBUYWcodGFnLCB7IHJvb3Q6IHJvb3QsIG9wdHM6IG9wdHMgfSwgaW5uZXJIVE1MKVxuXG4gIGlmICh0YWcgJiYgdGFnLm1vdW50KSB7XG4gICAgdGFnLm1vdW50KClcbiAgICAvLyBhZGQgdGhpcyB0YWcgdG8gdGhlIHZpcnR1YWxEb20gdmFyaWFibGVcbiAgICBpZiAoIWNvbnRhaW5zKF9fdmlydHVhbERvbSwgdGFnKSkgX192aXJ0dWFsRG9tLnB1c2godGFnKVxuICB9XG5cbiAgcmV0dXJuIHRhZ1xufVxuLyoqXG4gKiBSaW90IHB1YmxpYyBhcGlcbiAqL1xuXG4vLyBzaGFyZSBtZXRob2RzIGZvciBvdGhlciByaW90IHBhcnRzLCBlLmcuIGNvbXBpbGVyXG5yaW90LnV0aWwgPSB7IGJyYWNrZXRzOiBicmFja2V0cywgdG1wbDogdG1wbCB9XG5cbi8qKlxuICogQ3JlYXRlIGEgbWl4aW4gdGhhdCBjb3VsZCBiZSBnbG9iYWxseSBzaGFyZWQgYWNyb3NzIGFsbCB0aGUgdGFnc1xuICovXG5yaW90Lm1peGluID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgbWl4aW5zID0ge30sXG4gICAgZ2xvYmFscyA9IG1peGluc1tHTE9CQUxfTUlYSU5dID0ge30sXG4gICAgX2lkID0gMFxuXG4gIC8qKlxuICAgKiBDcmVhdGUvUmV0dXJuIGEgbWl4aW4gYnkgaXRzIG5hbWVcbiAgICogQHBhcmFtICAgeyBTdHJpbmcgfSAgbmFtZSAtIG1peGluIG5hbWUgKGdsb2JhbCBtaXhpbiBpZiBvYmplY3QpXG4gICAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG1peGluIC0gbWl4aW4gbG9naWNcbiAgICogQHBhcmFtICAgeyBCb29sZWFuIH0gZyAtIGlzIGdsb2JhbD9cbiAgICogQHJldHVybnMgeyBPYmplY3QgfSAgdGhlIG1peGluIGxvZ2ljXG4gICAqL1xuICByZXR1cm4gZnVuY3Rpb24obmFtZSwgbWl4aW4sIGcpIHtcbiAgICAvLyBVbm5hbWVkIGdsb2JhbFxuICAgIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgICAgcmlvdC5taXhpbignX191bm5hbWVkXycrX2lkKyssIG5hbWUsIHRydWUpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB2YXIgc3RvcmUgPSBnID8gZ2xvYmFscyA6IG1peGluc1xuXG4gICAgLy8gR2V0dGVyXG4gICAgaWYgKCFtaXhpbikge1xuICAgICAgaWYgKHR5cGVvZiBzdG9yZVtuYW1lXSA9PT0gVF9VTkRFRikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VucmVnaXN0ZXJlZCBtaXhpbjogJyArIG5hbWUpXG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVbbmFtZV1cbiAgICB9XG4gICAgLy8gU2V0dGVyXG4gICAgaWYgKGlzRnVuY3Rpb24obWl4aW4pKSB7XG4gICAgICBleHRlbmQobWl4aW4ucHJvdG90eXBlLCBzdG9yZVtuYW1lXSB8fCB7fSlcbiAgICAgIHN0b3JlW25hbWVdID0gbWl4aW5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzdG9yZVtuYW1lXSA9IGV4dGVuZChzdG9yZVtuYW1lXSB8fCB7fSwgbWl4aW4pXG4gICAgfVxuICB9XG5cbn0pKClcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcmlvdCB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBuYW1lIC0gbmFtZS9pZCBvZiB0aGUgbmV3IHJpb3QgdGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgaHRtbCAtIHRhZyB0ZW1wbGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGNzcyAtIGN1c3RvbSB0YWcgY3NzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgYXR0cnMgLSByb290IHRhZyBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUvaWQgb2YgdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xucmlvdC50YWcgPSBmdW5jdGlvbihuYW1lLCBodG1sLCBjc3MsIGF0dHJzLCBmbikge1xuICBpZiAoaXNGdW5jdGlvbihhdHRycykpIHtcbiAgICBmbiA9IGF0dHJzXG4gICAgaWYgKC9eW1xcd1xcLV0rXFxzPz0vLnRlc3QoY3NzKSkge1xuICAgICAgYXR0cnMgPSBjc3NcbiAgICAgIGNzcyA9ICcnXG4gICAgfSBlbHNlIGF0dHJzID0gJydcbiAgfVxuICBpZiAoY3NzKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY3NzKSkgZm4gPSBjc3NcbiAgICBlbHNlIHN0eWxlTWFuYWdlci5hZGQoY3NzKVxuICB9XG4gIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKClcbiAgX190YWdJbXBsW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiBodG1sLCBhdHRyczogYXR0cnMsIGZuOiBmbiB9XG4gIHJldHVybiBuYW1lXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJpb3QgdGFnIGltcGxlbWVudGF0aW9uIChmb3IgdXNlIGJ5IHRoZSBjb21waWxlcilcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBuYW1lIC0gbmFtZS9pZCBvZiB0aGUgbmV3IHJpb3QgdGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgaHRtbCAtIHRhZyB0ZW1wbGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGNzcyAtIGN1c3RvbSB0YWcgY3NzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgYXR0cnMgLSByb290IHRhZyBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUvaWQgb2YgdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xucmlvdC50YWcyID0gZnVuY3Rpb24obmFtZSwgaHRtbCwgY3NzLCBhdHRycywgZm4pIHtcbiAgaWYgKGNzcykgc3R5bGVNYW5hZ2VyLmFkZChjc3MpXG4gIC8vaWYgKGJwYWlyKSByaW90LnNldHRpbmdzLmJyYWNrZXRzID0gYnBhaXJcbiAgX190YWdJbXBsW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiBodG1sLCBhdHRyczogYXR0cnMsIGZuOiBmbiB9XG4gIHJldHVybiBuYW1lXG59XG5cbi8qKlxuICogTW91bnQgYSB0YWcgdXNpbmcgYSBzcGVjaWZpYyB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc2VsZWN0b3IgLSB0YWcgRE9NIHNlbGVjdG9yXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRhZ05hbWUgLSB0YWcgaW1wbGVtZW50YXRpb24gbmFtZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRzIC0gdGFnIGxvZ2ljXG4gKiBAcmV0dXJucyB7IEFycmF5IH0gbmV3IHRhZ3MgaW5zdGFuY2VzXG4gKi9cbnJpb3QubW91bnQgPSBmdW5jdGlvbihzZWxlY3RvciwgdGFnTmFtZSwgb3B0cykge1xuXG4gIHZhciBlbHMsXG4gICAgYWxsVGFncyxcbiAgICB0YWdzID0gW11cblxuICAvLyBoZWxwZXIgZnVuY3Rpb25zXG5cbiAgZnVuY3Rpb24gYWRkUmlvdFRhZ3MoYXJyKSB7XG4gICAgdmFyIGxpc3QgPSAnJ1xuICAgIGVhY2goYXJyLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCEvW14tXFx3XS8udGVzdChlKSkge1xuICAgICAgICBlID0gZS50cmltKCkudG9Mb3dlckNhc2UoKVxuICAgICAgICBsaXN0ICs9ICcsWycgKyBSSU9UX1RBR19JUyArICc9XCInICsgZSArICdcIl0sWycgKyBSSU9UX1RBRyArICc9XCInICsgZSArICdcIl0nXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbGlzdFxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0QWxsVGFncygpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKF9fdGFnSW1wbClcbiAgICByZXR1cm4ga2V5cyArIGFkZFJpb3RUYWdzKGtleXMpXG4gIH1cblxuICBmdW5jdGlvbiBwdXNoVGFncyhyb290KSB7XG4gICAgaWYgKHJvb3QudGFnTmFtZSkge1xuICAgICAgdmFyIHJpb3RUYWcgPSBnZXRBdHRyKHJvb3QsIFJJT1RfVEFHX0lTKSB8fCBnZXRBdHRyKHJvb3QsIFJJT1RfVEFHKVxuXG4gICAgICAvLyBoYXZlIHRhZ05hbWU/IGZvcmNlIHJpb3QtdGFnIHRvIGJlIHRoZSBzYW1lXG4gICAgICBpZiAodGFnTmFtZSAmJiByaW90VGFnICE9PSB0YWdOYW1lKSB7XG4gICAgICAgIHJpb3RUYWcgPSB0YWdOYW1lXG4gICAgICAgIHNldEF0dHIocm9vdCwgUklPVF9UQUdfSVMsIHRhZ05hbWUpXG4gICAgICAgIHNldEF0dHIocm9vdCwgUklPVF9UQUcsIHRhZ05hbWUpIC8vIHRoaXMgd2lsbCBiZSByZW1vdmVkIGluIHJpb3QgMy4wLjBcbiAgICAgIH1cbiAgICAgIHZhciB0YWcgPSBtb3VudFRvKHJvb3QsIHJpb3RUYWcgfHwgcm9vdC50YWdOYW1lLnRvTG93ZXJDYXNlKCksIG9wdHMpXG5cbiAgICAgIGlmICh0YWcpIHRhZ3MucHVzaCh0YWcpXG4gICAgfSBlbHNlIGlmIChyb290Lmxlbmd0aCkge1xuICAgICAgZWFjaChyb290LCBwdXNoVGFncykgICAvLyBhc3N1bWUgbm9kZUxpc3RcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tLSBtb3VudCBjb2RlIC0tLS0tXG5cbiAgLy8gaW5qZWN0IHN0eWxlcyBpbnRvIERPTVxuICBzdHlsZU1hbmFnZXIuaW5qZWN0KClcblxuICBpZiAoaXNPYmplY3QodGFnTmFtZSkpIHtcbiAgICBvcHRzID0gdGFnTmFtZVxuICAgIHRhZ05hbWUgPSAwXG4gIH1cblxuICAvLyBjcmF3bCB0aGUgRE9NIHRvIGZpbmQgdGhlIHRhZ1xuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBUX1NUUklORykge1xuICAgIGlmIChzZWxlY3RvciA9PT0gJyonKVxuICAgICAgLy8gc2VsZWN0IGFsbCB0aGUgdGFncyByZWdpc3RlcmVkXG4gICAgICAvLyBhbmQgYWxzbyB0aGUgdGFncyBmb3VuZCB3aXRoIHRoZSByaW90LXRhZyBhdHRyaWJ1dGUgc2V0XG4gICAgICBzZWxlY3RvciA9IGFsbFRhZ3MgPSBzZWxlY3RBbGxUYWdzKClcbiAgICBlbHNlXG4gICAgICAvLyBvciBqdXN0IHRoZSBvbmVzIG5hbWVkIGxpa2UgdGhlIHNlbGVjdG9yXG4gICAgICBzZWxlY3RvciArPSBhZGRSaW90VGFncyhzZWxlY3Rvci5zcGxpdCgvLCAqLykpXG5cbiAgICAvLyBtYWtlIHN1cmUgdG8gcGFzcyBhbHdheXMgYSBzZWxlY3RvclxuICAgIC8vIHRvIHRoZSBxdWVyeVNlbGVjdG9yQWxsIGZ1bmN0aW9uXG4gICAgZWxzID0gc2VsZWN0b3IgPyAkJChzZWxlY3RvcikgOiBbXVxuICB9XG4gIGVsc2VcbiAgICAvLyBwcm9iYWJseSB5b3UgaGF2ZSBwYXNzZWQgYWxyZWFkeSBhIHRhZyBvciBhIE5vZGVMaXN0XG4gICAgZWxzID0gc2VsZWN0b3JcblxuICAvLyBzZWxlY3QgYWxsIHRoZSByZWdpc3RlcmVkIGFuZCBtb3VudCB0aGVtIGluc2lkZSB0aGVpciByb290IGVsZW1lbnRzXG4gIGlmICh0YWdOYW1lID09PSAnKicpIHtcbiAgICAvLyBnZXQgYWxsIGN1c3RvbSB0YWdzXG4gICAgdGFnTmFtZSA9IGFsbFRhZ3MgfHwgc2VsZWN0QWxsVGFncygpXG4gICAgLy8gaWYgdGhlIHJvb3QgZWxzIGl0J3MganVzdCBhIHNpbmdsZSB0YWdcbiAgICBpZiAoZWxzLnRhZ05hbWUpXG4gICAgICBlbHMgPSAkJCh0YWdOYW1lLCBlbHMpXG4gICAgZWxzZSB7XG4gICAgICAvLyBzZWxlY3QgYWxsIHRoZSBjaGlsZHJlbiBmb3IgYWxsIHRoZSBkaWZmZXJlbnQgcm9vdCBlbGVtZW50c1xuICAgICAgdmFyIG5vZGVMaXN0ID0gW11cbiAgICAgIGVhY2goZWxzLCBmdW5jdGlvbiAoX2VsKSB7XG4gICAgICAgIG5vZGVMaXN0LnB1c2goJCQodGFnTmFtZSwgX2VsKSlcbiAgICAgIH0pXG4gICAgICBlbHMgPSBub2RlTGlzdFxuICAgIH1cbiAgICAvLyBnZXQgcmlkIG9mIHRoZSB0YWdOYW1lXG4gICAgdGFnTmFtZSA9IDBcbiAgfVxuXG4gIHB1c2hUYWdzKGVscylcblxuICByZXR1cm4gdGFnc1xufVxuXG4vKipcbiAqIFVwZGF0ZSBhbGwgdGhlIHRhZ3MgaW5zdGFuY2VzIGNyZWF0ZWRcbiAqIEByZXR1cm5zIHsgQXJyYXkgfSBhbGwgdGhlIHRhZ3MgaW5zdGFuY2VzXG4gKi9cbnJpb3QudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBlYWNoKF9fdmlydHVhbERvbSwgZnVuY3Rpb24odGFnKSB7XG4gICAgdGFnLnVwZGF0ZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRXhwb3J0IHRoZSBWaXJ0dWFsIERPTVxuICovXG5yaW90LnZkb20gPSBfX3ZpcnR1YWxEb21cblxuLyoqXG4gKiBFeHBvcnQgdGhlIFRhZyBjb25zdHJ1Y3RvclxuICovXG5yaW90LlRhZyA9IFRhZ1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblxuLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbmZ1bmN0aW9uIHNhZmVSZWdleCAocmUpIHtcbiAgdmFyIHNyYyA9IHJlLnNvdXJjZVxuICB2YXIgb3B0ID0gcmUuZ2xvYmFsID8gJ2cnIDogJydcblxuICBpZiAocmUuaWdub3JlQ2FzZSkgb3B0ICs9ICdpJ1xuICBpZiAocmUubXVsdGlsaW5lKSAgb3B0ICs9ICdtJ1xuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgc3JjID0gc3JjLnJlcGxhY2UoJ0AnLCAnXFxcXCcgKyBhcmd1bWVudHNbaV0pXG4gIH1cblxuICByZXR1cm4gbmV3IFJlZ0V4cChzcmMsIG9wdClcbn1cblxuLyoqXG4gKiBAbW9kdWxlIHBhcnNlcnNcbiAqL1xudmFyIHBhcnNlcnMgPSAoZnVuY3Rpb24gKHdpbikge1xuXG4gIHZhciBfcCA9IHt9XG5cbiAgZnVuY3Rpb24gX3IgKG5hbWUpIHtcbiAgICB2YXIgcGFyc2VyID0gd2luW25hbWVdXG5cbiAgICBpZiAocGFyc2VyKSByZXR1cm4gcGFyc2VyXG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcnNlciBcIicgKyBuYW1lICsgJ1wiIG5vdCBsb2FkZWQuJylcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZXEgKG5hbWUpIHtcbiAgICB2YXIgcGFydHMgPSBuYW1lLnNwbGl0KCcuJylcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IDIpIHRocm93IG5ldyBFcnJvcignQmFkIGZvcm1hdCBmb3IgcGFyc2Vycy5fcmVxJylcblxuICAgIHZhciBwYXJzZXIgPSBfcFtwYXJ0c1swXV1bcGFydHNbMV1dXG4gICAgaWYgKHBhcnNlcikgcmV0dXJuIHBhcnNlclxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXJzZXIgXCInICsgbmFtZSArICdcIiBub3QgZm91bmQuJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZCAob2JqLCBwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiBwcm9wcykge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAocHJvcHMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICBvYmpbcHJvcF0gPSBwcm9wc1twcm9wXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmpcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclB1ZyAoY29tcGlsZXJOYW1lLCBodG1sLCBvcHRzLCB1cmwpIHtcbiAgICBvcHRzID0gZXh0ZW5kKHtcbiAgICAgIHByZXR0eTogdHJ1ZSxcbiAgICAgIGZpbGVuYW1lOiB1cmwsXG4gICAgICBkb2N0eXBlOiAnaHRtbCdcbiAgICB9LCBvcHRzKVxuICAgIHJldHVybiBfcihjb21waWxlck5hbWUpLnJlbmRlcihodG1sLCBvcHRzKVxuICB9XG5cbiAgX3AuaHRtbCA9IHtcbiAgICBqYWRlOiBmdW5jdGlvbiAoaHRtbCwgb3B0cywgdXJsKSB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgY29uc29sZS5sb2coJ0RFUFJFQ0FUSU9OIFdBUk5JTkc6IGphZGUgd2FzIHJlbmFtZWQgXCJwdWdcIiAtIFRoZSBqYWRlIHBhcnNlciB3aWxsIGJlIHJlbW92ZWQgaW4gcmlvdEAzLjAuMCEnKVxuICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgICAgcmV0dXJuIHJlbmRlclB1ZygnamFkZScsIGh0bWwsIG9wdHMsIHVybClcbiAgICB9LFxuICAgIHB1ZzogZnVuY3Rpb24gKGh0bWwsIG9wdHMsIHVybCkge1xuICAgICAgcmV0dXJuIHJlbmRlclB1ZygncHVnJywgaHRtbCwgb3B0cywgdXJsKVxuICAgIH1cbiAgfVxuICBfcC5jc3MgPSB7XG4gICAgbGVzczogZnVuY3Rpb24gKHRhZywgY3NzLCBvcHRzLCB1cmwpIHtcbiAgICAgIHZhciByZXRcblxuICAgICAgb3B0cyA9IGV4dGVuZCh7XG4gICAgICAgIHN5bmM6IHRydWUsXG4gICAgICAgIHN5bmNJbXBvcnQ6IHRydWUsXG4gICAgICAgIGZpbGVuYW1lOiB1cmxcbiAgICAgIH0sIG9wdHMpXG4gICAgICBfcignbGVzcycpLnJlbmRlcihjc3MsIG9wdHMsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcbiAgICAgICAgcmV0ID0gcmVzdWx0LmNzc1xuICAgICAgfSlcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG4gIH1cbiAgX3AuanMgPSB7XG4gICAgZXM2OiBmdW5jdGlvbiAoanMsIG9wdHMpIHtcbiAgICAgIG9wdHMgPSBleHRlbmQoe1xuICAgICAgICBibGFja2xpc3Q6IFsndXNlU3RyaWN0JywgJ3N0cmljdCcsICdyZWFjdCddLFxuICAgICAgICBzb3VyY2VNYXBzOiBmYWxzZSxcbiAgICAgICAgY29tbWVudHM6IGZhbHNlXG4gICAgICB9LCBvcHRzKVxuICAgICAgcmV0dXJuIF9yKCdiYWJlbCcpLnRyYW5zZm9ybShqcywgb3B0cykuY29kZVxuICAgIH0sXG4gICAgYmFiZWw6IGZ1bmN0aW9uIChqcywgb3B0cywgdXJsKSB7XG4gICAgICByZXR1cm4gX3IoJ2JhYmVsJykudHJhbnNmb3JtKGpzLCBleHRlbmQoeyBmaWxlbmFtZTogdXJsIH0sIG9wdHMpKS5jb2RlXG4gICAgfSxcbiAgICBidWJsZTogZnVuY3Rpb24gKGpzLCBvcHRzLCB1cmwpIHtcbiAgICAgIG9wdHMgPSBleHRlbmQoe1xuICAgICAgICBzb3VyY2U6IHVybCxcbiAgICAgICAgbW9kdWxlczogZmFsc2VcbiAgICAgIH0sIG9wdHMpXG4gICAgICByZXR1cm4gX3IoJ2J1YmxlJykudHJhbnNmb3JtKGpzLCBvcHRzKS5jb2RlXG4gICAgfSxcbiAgICBjb2ZmZWU6IGZ1bmN0aW9uIChqcywgb3B0cykge1xuICAgICAgcmV0dXJuIF9yKCdDb2ZmZWVTY3JpcHQnKS5jb21waWxlKGpzLCBleHRlbmQoeyBiYXJlOiB0cnVlIH0sIG9wdHMpKVxuICAgIH0sXG4gICAgbGl2ZXNjcmlwdDogZnVuY3Rpb24gKGpzLCBvcHRzKSB7XG4gICAgICByZXR1cm4gX3IoJ2xpdmVzY3JpcHQnKS5jb21waWxlKGpzLCBleHRlbmQoeyBiYXJlOiB0cnVlLCBoZWFkZXI6IGZhbHNlIH0sIG9wdHMpKVxuICAgIH0sXG4gICAgdHlwZXNjcmlwdDogZnVuY3Rpb24gKGpzLCBvcHRzKSB7XG4gICAgICByZXR1cm4gX3IoJ3R5cGVzY3JpcHQnKShqcywgb3B0cylcbiAgICB9LFxuICAgIG5vbmU6IGZ1bmN0aW9uIChqcykge1xuICAgICAgcmV0dXJuIGpzXG4gICAgfVxuICB9XG4gIF9wLmpzLmphdmFzY3JpcHQgICA9IF9wLmpzLm5vbmVcbiAgX3AuanMuY29mZmVlc2NyaXB0ID0gX3AuanMuY29mZmVlXG4gIF9wLl9yZXEgID0gX3JlcVxuICBfcC51dGlscyA9IHtcbiAgICBleHRlbmQ6IGV4dGVuZFxuICB9XG5cbiAgcmV0dXJuIF9wXG5cbn0pKHdpbmRvdyB8fCBnbG9iYWwpXG5cbnJpb3QucGFyc2VycyA9IHBhcnNlcnNcblxuLyoqXG4gKiBDb21waWxlciBmb3IgcmlvdCBjdXN0b20gdGFnc1xuICogQHZlcnNpb24gdjIuNS43XG4gKi9cbnZhciBjb21waWxlID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgZXh0ZW5kID0gcGFyc2Vycy51dGlscy5leHRlbmRcbiAgLyogZXNsaW50LWVuYWJsZSAqL1xuXG4gIHZhciBTX0xJTkVTVFIgPSAvXCJbXlwiXFxuXFxcXF0qKD86XFxcXFtcXFNcXHNdW15cIlxcblxcXFxdKikqXCJ8J1teJ1xcblxcXFxdKig/OlxcXFxbXFxTXFxzXVteJ1xcblxcXFxdKikqJy8uc291cmNlXG5cbiAgdmFyIFNfU1RSSU5HUyA9IGJyYWNrZXRzLlJfU1RSSU5HUy5zb3VyY2VcblxuICB2YXIgSFRNTF9BVFRSUyA9IC8gKihbLVxcdzpcXHhBMC1cXHhGRl0rKSA/KD86PSA/KCdbXiddKid8XCJbXlwiXSpcInxcXFMrKSk/L2dcblxuICB2YXIgSFRNTF9DT01NUyA9IFJlZ0V4cCgvPCEtLSg/IT4pW1xcU1xcc10qPy0tPi8uc291cmNlICsgJ3wnICsgU19MSU5FU1RSLCAnZycpXG5cbiAgdmFyIEhUTUxfVEFHUyA9IC88KC0/W0EtWmEtel1bLVxcd1xceEEwLVxceEZGXSopKD86XFxzKyhbXlwiJ1xcLz5dKig/Oig/OlwiW15cIl0qXCJ8J1teJ10qJ3xcXC9bXj5dKVteJ1wiXFwvPl0qKSopfFxccyopKFxcLz8pPi9nXG5cbiAgdmFyIEhUTUxfUEFDSyA9IC8+WyBcXHRdKzwoLT9bQS1aYS16XXxcXC9bLUEtWmEtel0pL2dcblxuICB2YXIgQk9PTF9BVFRSUyA9IFJlZ0V4cChcbiAgICAgICdeKD86ZGlzYWJsZWR8Y2hlY2tlZHxyZWFkb25seXxyZXF1aXJlZHxhbGxvd2Z1bGxzY3JlZW58YXV0byg/OmZvY3VzfHBsYXkpfCcgK1xuICAgICAgJ2NvbXBhY3R8Y29udHJvbHN8ZGVmYXVsdHxmb3Jtbm92YWxpZGF0ZXxoaWRkZW58aXNtYXB8aXRlbXNjb3BlfGxvb3B8JyArXG4gICAgICAnbXVsdGlwbGV8bXV0ZWR8bm8oPzpyZXNpemV8c2hhZGV8dmFsaWRhdGV8d3JhcCk/fG9wZW58cmV2ZXJzZWR8c2VhbWxlc3N8JyArXG4gICAgICAnc2VsZWN0ZWR8c29ydGFibGV8dHJ1ZXNwZWVkfHR5cGVtdXN0bWF0Y2gpJCcpXG5cbiAgdmFyIFJJT1RfQVRUUlMgPSBbJ3N0eWxlJywgJ3NyYycsICdkJ11cblxuICB2YXIgVk9JRF9UQUdTID0gL14oPzppbnB1dHxpbWd8YnJ8d2JyfGhyfGFyZWF8YmFzZXxjb2x8ZW1iZWR8a2V5Z2VufGxpbmt8bWV0YXxwYXJhbXxzb3VyY2V8dHJhY2spJC9cblxuICB2YXIgUFJFX1RBR1MgPSAvPHByZSg/OlxccysoPzpbXlwiPl0qfFwiW15cIl0qXCIpKik/PihbXFxTXFxzXSs/KTxcXC9wcmVcXHMqPi9naVxuXG4gIHZhciBTUEVDX1RZUEVTID0gL15cIig/Om51bWJlcnxkYXRlKD86dGltZSk/fHRpbWV8bW9udGh8ZW1haWx8Y29sb3IpXFxiL2lcblxuICB2YXIgSU1QT1JUX1NUQVRFTUVOVCA9IC9eXFxzKmltcG9ydCg/Oig/Olxcc3xbXlxccydcIl0pKilbJ3xcIl0uKlxcbj8vZ21cblxuICB2YXIgVFJJTV9UUkFJTCA9IC9bIFxcdF0rJC9nbVxuXG4gIHZhclxuICAgIFJFX0hBU0VYUFIgPSBzYWZlUmVnZXgoL0AjXFxkLywgJ3gwMScpLFxuICAgIFJFX1JFUEVYUFIgPSBzYWZlUmVnZXgoL0AjKFxcZCspL2csICd4MDEnKSxcbiAgICBDSF9JREVYUFIgID0gJ1xceDAxIycsXG4gICAgQ0hfRFFDT0RFICA9ICdcXHUyMDU3JyxcbiAgICBEUSA9ICdcIicsXG4gICAgU1EgPSBcIidcIlxuXG4gIGZ1bmN0aW9uIGNsZWFuU291cmNlIChzcmMpIHtcbiAgICB2YXJcbiAgICAgIG1tLFxuICAgICAgcmUgPSBIVE1MX0NPTU1TXG5cbiAgICBpZiAofnNyYy5pbmRleE9mKCdcXHInKSkge1xuICAgICAgc3JjID0gc3JjLnJlcGxhY2UoL1xcclxcbj8vZywgJ1xcbicpXG4gICAgfVxuXG4gICAgcmUubGFzdEluZGV4ID0gMFxuICAgIHdoaWxlICgobW0gPSByZS5leGVjKHNyYykpKSB7XG4gICAgICBpZiAobW1bMF1bMF0gPT09ICc8Jykge1xuICAgICAgICBzcmMgPSBSZWdFeHAubGVmdENvbnRleHQgKyBSZWdFeHAucmlnaHRDb250ZXh0XG4gICAgICAgIHJlLmxhc3RJbmRleCA9IG1tWzNdICsgMVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3JjXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUF0dHJpYnMgKHN0ciwgcGNleCkge1xuICAgIHZhclxuICAgICAgbGlzdCA9IFtdLFxuICAgICAgbWF0Y2gsXG4gICAgICB0eXBlLCB2ZXhwXG5cbiAgICBIVE1MX0FUVFJTLmxhc3RJbmRleCA9IDBcblxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXHMrL2csICcgJylcblxuICAgIHdoaWxlICgobWF0Y2ggPSBIVE1MX0FUVFJTLmV4ZWMoc3RyKSkpIHtcbiAgICAgIHZhclxuICAgICAgICBrID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgdiA9IG1hdGNoWzJdXG5cbiAgICAgIGlmICghdikge1xuICAgICAgICBsaXN0LnB1c2goaylcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgaWYgKHZbMF0gIT09IERRKSB7XG4gICAgICAgICAgdiA9IERRICsgKHZbMF0gPT09IFNRID8gdi5zbGljZSgxLCAtMSkgOiB2KSArIERRXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoayA9PT0gJ3R5cGUnICYmIFNQRUNfVFlQRVMudGVzdCh2KSkge1xuICAgICAgICAgIHR5cGUgPSB2XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKFJFX0hBU0VYUFIudGVzdCh2KSkge1xuXG4gICAgICAgICAgICBpZiAoayA9PT0gJ3ZhbHVlJykgdmV4cCA9IDFcbiAgICAgICAgICAgIGVsc2UgaWYgKEJPT0xfQVRUUlMudGVzdChrKSkgayA9ICdfXycgKyBrXG4gICAgICAgICAgICBlbHNlIGlmICh+UklPVF9BVFRSUy5pbmRleE9mKGspKSBrID0gJ3Jpb3QtJyArIGtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0LnB1c2goayArICc9JyArIHYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZSkge1xuICAgICAgaWYgKHZleHApIHR5cGUgPSBEUSArIHBjZXguX2JwWzBdICsgU1EgKyB0eXBlLnNsaWNlKDEsIC0xKSArIFNRICsgcGNleC5fYnBbMV0gKyBEUVxuICAgICAgbGlzdC5wdXNoKCd0eXBlPScgKyB0eXBlKVxuICAgIH1cbiAgICByZXR1cm4gbGlzdC5qb2luKCcgJylcbiAgfVxuXG4gIGZ1bmN0aW9uIHNwbGl0SHRtbCAoaHRtbCwgb3B0cywgcGNleCkge1xuICAgIHZhciBfYnAgPSBwY2V4Ll9icFxuXG4gICAgaWYgKGh0bWwgJiYgX2JwWzRdLnRlc3QoaHRtbCkpIHtcbiAgICAgIHZhclxuICAgICAgICBqc2ZuID0gb3B0cy5leHByICYmIChvcHRzLnBhcnNlciB8fCBvcHRzLnR5cGUpID8gX2NvbXBpbGVKUyA6IDAsXG4gICAgICAgIGxpc3QgPSBicmFja2V0cy5zcGxpdChodG1sLCAwLCBfYnApLFxuICAgICAgICBleHByXG5cbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGlzdC5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBleHByID0gbGlzdFtpXVxuICAgICAgICBpZiAoZXhwclswXSA9PT0gJ14nKSB7XG4gICAgICAgICAgZXhwciA9IGV4cHIuc2xpY2UoMSlcbiAgICAgICAgfSBlbHNlIGlmIChqc2ZuKSB7XG4gICAgICAgICAgZXhwciA9IGpzZm4oZXhwciwgb3B0cykudHJpbSgpXG4gICAgICAgICAgaWYgKGV4cHIuc2xpY2UoLTEpID09PSAnOycpIGV4cHIgPSBleHByLnNsaWNlKDAsIC0xKVxuICAgICAgICB9XG4gICAgICAgIGxpc3RbaV0gPSBDSF9JREVYUFIgKyAocGNleC5wdXNoKGV4cHIpIC0gMSkgKyBfYnBbMV1cbiAgICAgIH1cbiAgICAgIGh0bWwgPSBsaXN0LmpvaW4oJycpXG4gICAgfVxuICAgIHJldHVybiBodG1sXG4gIH1cblxuICBmdW5jdGlvbiByZXN0b3JlRXhwciAoaHRtbCwgcGNleCkge1xuICAgIGlmIChwY2V4Lmxlbmd0aCkge1xuICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShSRV9SRVBFWFBSLCBmdW5jdGlvbiAoXywgZCkge1xuXG4gICAgICAgIHJldHVybiBwY2V4Ll9icFswXSArIHBjZXhbZF0udHJpbSgpLnJlcGxhY2UoL1tcXHJcXG5dKy9nLCAnICcpLnJlcGxhY2UoL1wiL2csIENIX0RRQ09ERSlcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBodG1sXG4gIH1cblxuICBmdW5jdGlvbiBfY29tcGlsZUhUTUwgKGh0bWwsIG9wdHMsIHBjZXgpIHtcbiAgICBpZiAoIS9cXFMvLnRlc3QoaHRtbCkpIHJldHVybiAnJ1xuXG4gICAgaHRtbCA9IHNwbGl0SHRtbChodG1sLCBvcHRzLCBwY2V4KVxuICAgICAgLnJlcGxhY2UoSFRNTF9UQUdTLCBmdW5jdGlvbiAoXywgbmFtZSwgYXR0ciwgZW5kcykge1xuXG4gICAgICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKClcblxuICAgICAgICBlbmRzID0gZW5kcyAmJiAhVk9JRF9UQUdTLnRlc3QobmFtZSkgPyAnPjwvJyArIG5hbWUgOiAnJ1xuXG4gICAgICAgIGlmIChhdHRyKSBuYW1lICs9ICcgJyArIHBhcnNlQXR0cmlicyhhdHRyLCBwY2V4KVxuXG4gICAgICAgIHJldHVybiAnPCcgKyBuYW1lICsgZW5kcyArICc+J1xuICAgICAgfSlcblxuICAgIGlmICghb3B0cy53aGl0ZXNwYWNlKSB7XG4gICAgICB2YXIgcCA9IFtdXG5cbiAgICAgIGlmICgvPHByZVtcXHM+XS8udGVzdChodG1sKSkge1xuICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKFBSRV9UQUdTLCBmdW5jdGlvbiAocSkge1xuICAgICAgICAgIHAucHVzaChxKVxuICAgICAgICAgIHJldHVybiAnXFx1MDAwMidcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaHRtbCA9IGh0bWwudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKVxuXG4gICAgICBpZiAocC5sZW5ndGgpIGh0bWwgPSBodG1sLnJlcGxhY2UoL1xcdTAwMDIvZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gcC5zaGlmdCgpIH0pXG4gICAgfVxuXG4gICAgaWYgKG9wdHMuY29tcGFjdCkgaHRtbCA9IGh0bWwucmVwbGFjZShIVE1MX1BBQ0ssICc+PCQxJylcblxuICAgIHJldHVybiByZXN0b3JlRXhwcihodG1sLCBwY2V4KS5yZXBsYWNlKFRSSU1fVFJBSUwsICcnKVxuICB9XG5cbiAgZnVuY3Rpb24gY29tcGlsZUhUTUwgKGh0bWwsIG9wdHMsIHBjZXgpIHtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdHMpKSB7XG4gICAgICBwY2V4ID0gb3B0c1xuICAgICAgb3B0cyA9IHt9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghcGNleCkgcGNleCA9IFtdXG4gICAgICBpZiAoIW9wdHMpIG9wdHMgPSB7fVxuICAgIH1cblxuICAgIHBjZXguX2JwID0gYnJhY2tldHMuYXJyYXkob3B0cy5icmFja2V0cylcblxuICAgIHJldHVybiBfY29tcGlsZUhUTUwoY2xlYW5Tb3VyY2UoaHRtbCksIG9wdHMsIHBjZXgpXG4gIH1cblxuICB2YXIgSlNfRVM2U0lHTiA9IC9eWyBcXHRdKihbJF9BLVphLXpdWyRcXHddKilcXHMqXFwoW14oKV0qXFwpXFxzKnsvbVxuXG4gIHZhciBKU19FUzZFTkQgPSBSZWdFeHAoJ1t7fV18JyArIGJyYWNrZXRzLlNfUUJMT0NLUywgJ2cnKVxuXG4gIHZhciBKU19DT01NUyA9IFJlZ0V4cChicmFja2V0cy5SX01MQ09NTVMuc291cmNlICsgJ3wvL1teXFxyXFxuXSp8JyArIGJyYWNrZXRzLlNfUUJMT0NLUywgJ2cnKVxuXG4gIGZ1bmN0aW9uIHJpb3RqcyAoanMpIHtcbiAgICB2YXJcbiAgICAgIHBhcnRzID0gW10sXG4gICAgICBtYXRjaCxcbiAgICAgIHRvZXM1LFxuICAgICAgcG9zLFxuICAgICAgbmFtZSxcbiAgICAgIFJFID0gUmVnRXhwXG5cbiAgICBpZiAofmpzLmluZGV4T2YoJy8nKSkganMgPSBybUNvbW1zKGpzLCBKU19DT01NUylcblxuICAgIHdoaWxlICgobWF0Y2ggPSBqcy5tYXRjaChKU19FUzZTSUdOKSkpIHtcblxuICAgICAgcGFydHMucHVzaChSRS5sZWZ0Q29udGV4dClcbiAgICAgIGpzICA9IFJFLnJpZ2h0Q29udGV4dFxuICAgICAgcG9zID0gc2tpcEJvZHkoanMsIEpTX0VTNkVORClcblxuICAgICAgbmFtZSAgPSBtYXRjaFsxXVxuICAgICAgdG9lczUgPSAhL14oPzppZnx3aGlsZXxmb3J8c3dpdGNofGNhdGNofGZ1bmN0aW9uKSQvLnRlc3QobmFtZSlcbiAgICAgIG5hbWUgID0gdG9lczUgPyBtYXRjaFswXS5yZXBsYWNlKG5hbWUsICd0aGlzLicgKyBuYW1lICsgJyA9IGZ1bmN0aW9uJykgOiBtYXRjaFswXVxuICAgICAgcGFydHMucHVzaChuYW1lLCBqcy5zbGljZSgwLCBwb3MpKVxuICAgICAganMgPSBqcy5zbGljZShwb3MpXG5cbiAgICAgIGlmICh0b2VzNSAmJiAhL15cXHMqLlxccypiaW5kXFxiLy50ZXN0KGpzKSkgcGFydHMucHVzaCgnLmJpbmQodGhpcyknKVxuICAgIH1cblxuICAgIHJldHVybiBwYXJ0cy5sZW5ndGggPyBwYXJ0cy5qb2luKCcnKSArIGpzIDoganNcblxuICAgIGZ1bmN0aW9uIHJtQ29tbXMgKHMsIHIsIG0pIHtcbiAgICAgIHIubGFzdEluZGV4ID0gMFxuICAgICAgd2hpbGUgKChtID0gci5leGVjKHMpKSkge1xuICAgICAgICBpZiAobVswXVswXSA9PT0gJy8nICYmICFtWzFdICYmICFtWzJdKSB7XG4gICAgICAgICAgcyA9IFJFLmxlZnRDb250ZXh0ICsgJyAnICsgUkUucmlnaHRDb250ZXh0XG4gICAgICAgICAgci5sYXN0SW5kZXggPSBtWzNdICsgMVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNraXBCb2R5IChzLCByKSB7XG4gICAgICB2YXIgbSwgaSA9IDFcblxuICAgICAgci5sYXN0SW5kZXggPSAwXG4gICAgICB3aGlsZSAoaSAmJiAobSA9IHIuZXhlYyhzKSkpIHtcbiAgICAgICAgaWYgKG1bMF0gPT09ICd7JykgKytpXG4gICAgICAgIGVsc2UgaWYgKG1bMF0gPT09ICd9JykgLS1pXG4gICAgICB9XG4gICAgICByZXR1cm4gaSA/IHMubGVuZ3RoIDogci5sYXN0SW5kZXhcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfY29tcGlsZUpTIChqcywgb3B0cywgdHlwZSwgcGFyc2VyT3B0cywgdXJsKSB7XG4gICAgaWYgKCEvXFxTLy50ZXN0KGpzKSkgcmV0dXJuICcnXG4gICAgaWYgKCF0eXBlKSB0eXBlID0gb3B0cy50eXBlXG5cbiAgICB2YXIgcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgdHlwZSAmJiBwYXJzZXJzLl9yZXEoJ2pzLicgKyB0eXBlLCB0cnVlKSB8fCByaW90anNcblxuICAgIHJldHVybiBwYXJzZXIoanMsIHBhcnNlck9wdHMsIHVybCkucmVwbGFjZSgvXFxyXFxuPy9nLCAnXFxuJykucmVwbGFjZShUUklNX1RSQUlMLCAnJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBpbGVKUyAoanMsIG9wdHMsIHR5cGUsIHVzZXJPcHRzKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJykge1xuICAgICAgdXNlck9wdHMgPSB0eXBlXG4gICAgICB0eXBlID0gb3B0c1xuICAgICAgb3B0cyA9IHt9XG4gICAgfVxuICAgIGlmICh0eXBlICYmIHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdXNlck9wdHMgPSB0eXBlXG4gICAgICB0eXBlID0gJydcbiAgICB9XG4gICAgaWYgKCF1c2VyT3B0cykgdXNlck9wdHMgPSB7fVxuXG4gICAgcmV0dXJuIF9jb21waWxlSlMoanMsIG9wdHMgfHwge30sIHR5cGUsIHVzZXJPcHRzLnBhcnNlck9wdGlvbnMsIHVzZXJPcHRzLnVybClcbiAgfVxuXG4gIHZhciBDU1NfU0VMRUNUT1IgPSBSZWdFeHAoJyhbe31dfF4pWyA7XSooW15AIDt7fV1bXnt9XSopKD89eyl8JyArIFNfTElORVNUUiwgJ2cnKVxuXG4gIGZ1bmN0aW9uIHNjb3BlZENTUyAodGFnLCBjc3MpIHtcbiAgICB2YXIgc2NvcGUgPSAnOnNjb3BlJ1xuXG4gICAgcmV0dXJuIGNzcy5yZXBsYWNlKENTU19TRUxFQ1RPUiwgZnVuY3Rpb24gKG0sIHAxLCBwMikge1xuXG4gICAgICBpZiAoIXAyKSByZXR1cm4gbVxuXG4gICAgICBwMiA9IHAyLnJlcGxhY2UoL1teLF0rL2csIGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgdmFyIHMgPSBzZWwudHJpbSgpXG5cbiAgICAgICAgaWYgKCFzIHx8IHMgPT09ICdmcm9tJyB8fCBzID09PSAndG8nIHx8IHMuc2xpY2UoLTEpID09PSAnJScpIHtcbiAgICAgICAgICByZXR1cm4gc2VsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocy5pbmRleE9mKHNjb3BlKSA8IDApIHtcbiAgICAgICAgICBzID0gdGFnICsgJyAnICsgcyArICcsW3Jpb3QtdGFnPVwiJyArIHRhZyArICdcIl0gJyArIHMgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyxbZGF0YS1pcz1cIicgKyB0YWcgKyAnXCJdICcgKyBzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcyA9IHMucmVwbGFjZShzY29wZSwgdGFnKSArICcsJyArXG4gICAgICAgICAgICAgIHMucmVwbGFjZShzY29wZSwgJ1tyaW90LXRhZz1cIicgKyB0YWcgKyAnXCJdJykgKyAnLCcgK1xuICAgICAgICAgICAgICBzLnJlcGxhY2Uoc2NvcGUsICdbZGF0YS1pcz1cIicgKyB0YWcgKyAnXCJdJylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc1xuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHAxID8gcDEgKyAnICcgKyBwMiA6IHAyXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jb21waWxlQ1NTIChjc3MsIHRhZywgdHlwZSwgb3B0cykge1xuICAgIHZhciBzY29wZWQgPSAob3B0cyB8fCAob3B0cyA9IHt9KSkuc2NvcGVkXG5cbiAgICBpZiAodHlwZSkge1xuICAgICAgaWYgKHR5cGUgPT09ICdzY29wZWQtY3NzJykge1xuICAgICAgICBzY29wZWQgPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgIT09ICdjc3MnKSB7XG5cbiAgICAgICAgdmFyIHBhcnNlciA9IHBhcnNlcnMuX3JlcSgnY3NzLicgKyB0eXBlLCB0cnVlKVxuICAgICAgICBjc3MgPSBwYXJzZXIodGFnLCBjc3MsIG9wdHMucGFyc2VyT3B0cyB8fCB7fSwgb3B0cy51cmwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY3NzID0gY3NzLnJlcGxhY2UoYnJhY2tldHMuUl9NTENPTU1TLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKVxuXG4gICAgaWYgKHNjb3BlZCkge1xuICAgICAgaWYgKCF0YWcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IHBhcnNlIHNjb3BlZCBDU1Mgd2l0aG91dCBhIHRhZ05hbWUnKVxuICAgICAgfVxuICAgICAgY3NzID0gc2NvcGVkQ1NTKHRhZywgY3NzKVxuICAgIH1cbiAgICByZXR1cm4gY3NzXG4gIH1cblxuICBmdW5jdGlvbiBjb21waWxlQ1NTIChjc3MsIHR5cGUsIG9wdHMpIHtcbiAgICBpZiAodHlwZSAmJiB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdHMgPSB0eXBlXG4gICAgICB0eXBlID0gJydcbiAgICB9IGVsc2UgaWYgKCFvcHRzKSBvcHRzID0ge31cblxuICAgIHJldHVybiBfY29tcGlsZUNTUyhjc3MsIG9wdHMudGFnTmFtZSwgdHlwZSwgb3B0cylcbiAgfVxuXG4gIHZhciBUWVBFX0FUVFIgPSAvXFxzdHlwZVxccyo9XFxzKig/OihbJ1wiXSkoLis/KVxcMXwoXFxTKykpL2lcblxuICB2YXIgTUlTQ19BVFRSID0gJ1xcXFxzKj1cXFxccyooJyArIFNfU1RSSU5HUyArICd8e1tefV0rfXxcXFxcUyspJ1xuXG4gIHZhciBFTkRfVEFHUyA9IC9cXC8+XFxufF48KD86XFwvPy0/W0EtWmEtel1bLVxcd1xceEEwLVxceEZGXSpcXHMqfC0/W0EtWmEtel1bLVxcd1xceEEwLVxceEZGXSpcXHMrWy1cXHc6XFx4QTAtXFx4RkZdW1xcU1xcc10qPyk+XFxuL1xuXG4gIGZ1bmN0aW9uIF9xIChzLCByKSB7XG4gICAgaWYgKCFzKSByZXR1cm4gXCInJ1wiXG4gICAgcyA9IFNRICsgcy5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKSArIFNRXG4gICAgcmV0dXJuIHIgJiYgfnMuaW5kZXhPZignXFxuJykgPyBzLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSA6IHNcbiAgfVxuXG4gIGZ1bmN0aW9uIG1rdGFnIChuYW1lLCBodG1sLCBjc3MsIGF0dHIsIGpzLCBpbXBvcnRzLCBvcHRzKSB7XG4gICAgdmFyXG4gICAgICBjID0gb3B0cy5kZWJ1ZyA/ICcsXFxuICAnIDogJywgJyxcbiAgICAgIHMgPSAnfSk7J1xuXG4gICAgaWYgKGpzICYmIGpzLnNsaWNlKC0xKSAhPT0gJ1xcbicpIHMgPSAnXFxuJyArIHNcblxuICAgIHJldHVybiBpbXBvcnRzICsgJ3Jpb3QudGFnMihcXCcnICsgbmFtZSArIFNRICtcbiAgICAgIGMgKyBfcShodG1sLCAxKSArXG4gICAgICBjICsgX3EoY3NzKSArXG4gICAgICBjICsgX3EoYXR0cikgKyAnLCBmdW5jdGlvbihvcHRzKSB7XFxuJyArIGpzICsgc1xuICB9XG5cbiAgZnVuY3Rpb24gc3BsaXRCbG9ja3MgKHN0cikge1xuICAgIGlmICgvPFstXFx3XS8udGVzdChzdHIpKSB7XG4gICAgICB2YXJcbiAgICAgICAgbSxcbiAgICAgICAgayA9IHN0ci5sYXN0SW5kZXhPZignPCcpLFxuICAgICAgICBuID0gc3RyLmxlbmd0aFxuXG4gICAgICB3aGlsZSAofmspIHtcbiAgICAgICAgbSA9IHN0ci5zbGljZShrLCBuKS5tYXRjaChFTkRfVEFHUylcbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICBrICs9IG0uaW5kZXggKyBtWzBdLmxlbmd0aFxuICAgICAgICAgIG0gPSBzdHIuc2xpY2UoMCwgaylcbiAgICAgICAgICBpZiAobS5zbGljZSgtNSkgPT09ICc8LS8+XFxuJykgbSA9IG0uc2xpY2UoMCwgLTUpXG4gICAgICAgICAgcmV0dXJuIFttLCBzdHIuc2xpY2UoayldXG4gICAgICAgIH1cbiAgICAgICAgbiA9IGtcbiAgICAgICAgayA9IHN0ci5sYXN0SW5kZXhPZignPCcsIGsgLSAxKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWycnLCBzdHJdXG4gIH1cblxuICBmdW5jdGlvbiBnZXRUeXBlIChhdHRyaWJzKSB7XG4gICAgaWYgKGF0dHJpYnMpIHtcbiAgICAgIHZhciBtYXRjaCA9IGF0dHJpYnMubWF0Y2goVFlQRV9BVFRSKVxuXG4gICAgICBtYXRjaCA9IG1hdGNoICYmIChtYXRjaFsyXSB8fCBtYXRjaFszXSlcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4gbWF0Y2gucmVwbGFjZSgndGV4dC8nLCAnJylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBmdW5jdGlvbiBnZXRBdHRyaWIgKGF0dHJpYnMsIG5hbWUpIHtcbiAgICBpZiAoYXR0cmlicykge1xuICAgICAgdmFyIG1hdGNoID0gYXR0cmlicy5tYXRjaChSZWdFeHAoJ1xcXFxzJyArIG5hbWUgKyBNSVNDX0FUVFIsICdpJykpXG5cbiAgICAgIG1hdGNoID0gbWF0Y2ggJiYgbWF0Y2hbMV1cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4gKC9eWydcIl0vKS50ZXN0KG1hdGNoKSA/IG1hdGNoLnNsaWNlKDEsIC0xKSA6IG1hdGNoXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gdW5lc2NhcGVIVE1MIChzdHIpIHtcbiAgICByZXR1cm4gc3RyXG4gICAgICAgICAgICAucmVwbGFjZSgvJmFtcDsvZywgJyYnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyZsdDsvZywgJzwnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyZndDsvZywgJz4nKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyZxdW90Oy9nLCAnXCInKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyYjMDM5Oy9nLCAnXFwnJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhcnNlck9wdGlvbnMgKGF0dHJpYnMpIHtcbiAgICB2YXIgb3B0cyA9IHVuZXNjYXBlSFRNTChnZXRBdHRyaWIoYXR0cmlicywgJ29wdGlvbnMnKSlcblxuICAgIHJldHVybiBvcHRzID8gSlNPTi5wYXJzZShvcHRzKSA6IG51bGxcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvZGUgKGNvZGUsIG9wdHMsIGF0dHJpYnMsIGJhc2UpIHtcbiAgICB2YXJcbiAgICAgIHR5cGUgPSBnZXRUeXBlKGF0dHJpYnMpLFxuICAgICAgc3JjICA9IGdldEF0dHJpYihhdHRyaWJzLCAnc3JjJyksXG4gICAgICBqc1BhcnNlck9wdGlvbnMgPSBleHRlbmQoe30sIG9wdHMucGFyc2VyT3B0aW9ucy5qcylcblxuICAgIGlmIChzcmMpIHJldHVybiBmYWxzZVxuXG4gICAgcmV0dXJuIF9jb21waWxlSlMoXG4gICAgICAgICAgICBjb2RlLFxuICAgICAgICAgICAgb3B0cyxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBleHRlbmQoanNQYXJzZXJPcHRpb25zLCBnZXRQYXJzZXJPcHRpb25zKGF0dHJpYnMpKSxcbiAgICAgICAgICAgIGJhc2VcbiAgICAgICAgICApXG4gIH1cblxuICBmdW5jdGlvbiBjc3NDb2RlIChjb2RlLCBvcHRzLCBhdHRyaWJzLCB1cmwsIHRhZykge1xuICAgIHZhclxuICAgICAgcGFyc2VyU3R5bGVPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRzLnBhcnNlck9wdGlvbnMuc3R5bGUpLFxuICAgICAgZXh0cmFPcHRzID0ge1xuICAgICAgICBwYXJzZXJPcHRzOiBleHRlbmQocGFyc2VyU3R5bGVPcHRpb25zLCBnZXRQYXJzZXJPcHRpb25zKGF0dHJpYnMpKSxcbiAgICAgICAgc2NvcGVkOiBhdHRyaWJzICYmIC9cXHNzY29wZWQoXFxzfD18JCkvaS50ZXN0KGF0dHJpYnMpLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfVxuXG4gICAgcmV0dXJuIF9jb21waWxlQ1NTKGNvZGUsIHRhZywgZ2V0VHlwZShhdHRyaWJzKSB8fCBvcHRzLnN0eWxlLCBleHRyYU9wdHMpXG4gIH1cblxuICBmdW5jdGlvbiBjb21waWxlVGVtcGxhdGUgKGh0bWwsIHVybCwgbGFuZywgb3B0cykge1xuXG4gICAgdmFyIHBhcnNlciA9IHBhcnNlcnMuX3JlcSgnaHRtbC4nICsgbGFuZywgdHJ1ZSlcbiAgICByZXR1cm4gcGFyc2VyKGh0bWwsIG9wdHMsIHVybClcbiAgfVxuXG4gIHZhclxuXG4gICAgQ1VTVF9UQUcgPSBSZWdFeHAoL14oWyBcXHRdKik8KC0/W0EtWmEtel1bLVxcd1xceEEwLVxceEZGXSopKD86XFxzKyhbXidcIlxcLz5dKyg/Oig/OkB8XFwvW14+XSlbXidcIlxcLz5dKikqKXxcXHMqKT8oPzpcXC8+fD5bIFxcdF0qXFxuPyhbXFxTXFxzXSopXlxcMTxcXC9cXDJcXHMqPnw+KC4qKTxcXC9cXDJcXHMqPikvXG4gICAgICAuc291cmNlLnJlcGxhY2UoJ0AnLCBTX1NUUklOR1MpLCAnZ2ltJyksXG5cbiAgICBTQ1JJUFRTID0gLzxzY3JpcHQoXFxzK1tePl0qKT8+XFxuPyhbXFxTXFxzXSo/KTxcXC9zY3JpcHRcXHMqPi9naSxcblxuICAgIFNUWUxFUyA9IC88c3R5bGUoXFxzK1tePl0qKT8+XFxuPyhbXFxTXFxzXSo/KTxcXC9zdHlsZVxccyo+L2dpXG5cbiAgZnVuY3Rpb24gY29tcGlsZSAoc3JjLCBvcHRzLCB1cmwpIHtcbiAgICB2YXJcbiAgICAgIHBhcnRzID0gW10sXG4gICAgICBpbmNsdWRlZCxcbiAgICAgIGRlZmF1bHRQYXJzZXJwdGlvbnMgPSB7XG5cbiAgICAgICAgdGVtcGxhdGU6IHt9LFxuICAgICAgICBqczoge30sXG4gICAgICAgIHN0eWxlOiB7fVxuICAgICAgfVxuXG4gICAgaWYgKCFvcHRzKSBvcHRzID0ge31cblxuICAgIG9wdHMucGFyc2VyT3B0aW9ucyA9IGV4dGVuZChkZWZhdWx0UGFyc2VycHRpb25zLCBvcHRzLnBhcnNlck9wdGlvbnMgfHwge30pXG5cbiAgICBpbmNsdWRlZCA9IG9wdHMuZXhjbHVkZVxuICAgICAgPyBmdW5jdGlvbiAocykgeyByZXR1cm4gb3B0cy5leGNsdWRlLmluZGV4T2YocykgPCAwIH0gOiBmdW5jdGlvbiAoKSB7IHJldHVybiAxIH1cblxuICAgIGlmICghdXJsKSB1cmwgPSAnJ1xuXG4gICAgdmFyIF9icCA9IGJyYWNrZXRzLmFycmF5KG9wdHMuYnJhY2tldHMpXG5cbiAgICBpZiAob3B0cy50ZW1wbGF0ZSkge1xuICAgICAgc3JjID0gY29tcGlsZVRlbXBsYXRlKHNyYywgdXJsLCBvcHRzLnRlbXBsYXRlLCBvcHRzLnBhcnNlck9wdGlvbnMudGVtcGxhdGUpXG4gICAgfVxuXG4gICAgc3JjID0gY2xlYW5Tb3VyY2Uoc3JjKVxuICAgICAgLnJlcGxhY2UoQ1VTVF9UQUcsIGZ1bmN0aW9uIChfLCBpbmRlbnQsIHRhZ05hbWUsIGF0dHJpYnMsIGJvZHksIGJvZHkyKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgIGpzY29kZSA9ICcnLFxuICAgICAgICAgIHN0eWxlcyA9ICcnLFxuICAgICAgICAgIGh0bWwgPSAnJyxcbiAgICAgICAgICBpbXBvcnRzID0gJycsXG4gICAgICAgICAgcGNleCA9IFtdXG5cbiAgICAgICAgcGNleC5fYnAgPSBfYnBcblxuICAgICAgICB0YWdOYW1lID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgYXR0cmlicyA9IGF0dHJpYnMgJiYgaW5jbHVkZWQoJ2F0dHJpYnMnKVxuICAgICAgICAgID8gcmVzdG9yZUV4cHIoXG4gICAgICAgICAgICAgIHBhcnNlQXR0cmlicyhcbiAgICAgICAgICAgICAgICBzcGxpdEh0bWwoYXR0cmlicywgb3B0cywgcGNleCksXG4gICAgICAgICAgICAgIHBjZXgpLFxuICAgICAgICAgICAgcGNleCkgOiAnJ1xuXG4gICAgICAgIGlmICgoYm9keSB8fCAoYm9keSA9IGJvZHkyKSkgJiYgL1xcUy8udGVzdChib2R5KSkge1xuXG4gICAgICAgICAgaWYgKGJvZHkyKSB7XG5cbiAgICAgICAgICAgIGlmIChpbmNsdWRlZCgnaHRtbCcpKSBodG1sID0gX2NvbXBpbGVIVE1MKGJvZHkyLCBvcHRzLCBwY2V4KVxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGJvZHkgPSBib2R5LnJlcGxhY2UoUmVnRXhwKCdeJyArIGluZGVudCwgJ2dtJyksICcnKVxuXG4gICAgICAgICAgICBib2R5ID0gYm9keS5yZXBsYWNlKFNUWUxFUywgZnVuY3Rpb24gKF9tLCBfYXR0cnMsIF9zdHlsZSkge1xuICAgICAgICAgICAgICBpZiAoaW5jbHVkZWQoJ2NzcycpKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzICs9IChzdHlsZXMgPyAnICcgOiAnJykgKyBjc3NDb2RlKF9zdHlsZSwgb3B0cywgX2F0dHJzLCB1cmwsIHRhZ05hbWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuICcnXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBib2R5ID0gYm9keS5yZXBsYWNlKFNDUklQVFMsIGZ1bmN0aW9uIChfbSwgX2F0dHJzLCBfc2NyaXB0KSB7XG4gICAgICAgICAgICAgIGlmIChpbmNsdWRlZCgnanMnKSkge1xuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gZ2V0Q29kZShfc2NyaXB0LCBvcHRzLCBfYXR0cnMsIHVybClcblxuICAgICAgICAgICAgICAgIGlmIChjb2RlKSBqc2NvZGUgKz0gKGpzY29kZSA/ICdcXG4nIDogJycpICsgY29kZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdmFyIGJsb2NrcyA9IHNwbGl0QmxvY2tzKGJvZHkucmVwbGFjZShUUklNX1RSQUlMLCAnJykpXG5cbiAgICAgICAgICAgIGlmIChpbmNsdWRlZCgnaHRtbCcpKSB7XG4gICAgICAgICAgICAgIGh0bWwgPSBfY29tcGlsZUhUTUwoYmxvY2tzWzBdLCBvcHRzLCBwY2V4KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5jbHVkZWQoJ2pzJykpIHtcbiAgICAgICAgICAgICAgYm9keSA9IF9jb21waWxlSlMoYmxvY2tzWzFdLCBvcHRzLCBudWxsLCBudWxsLCB1cmwpXG4gICAgICAgICAgICAgIGlmIChib2R5KSBqc2NvZGUgKz0gKGpzY29kZSA/ICdcXG4nIDogJycpICsgYm9keVxuICAgICAgICAgICAgICBqc2NvZGUgPSBqc2NvZGUucmVwbGFjZShJTVBPUlRfU1RBVEVNRU5ULCBmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgICAgIGltcG9ydHMgKz0gcy50cmltKCkgKyAnXFxuJ1xuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGpzY29kZSA9IC9cXFMvLnRlc3QoanNjb2RlKSA/IGpzY29kZS5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKSA6ICcnXG5cbiAgICAgICAgaWYgKG9wdHMuZW50aXRpZXMpIHtcbiAgICAgICAgICBwYXJ0cy5wdXNoKHtcbiAgICAgICAgICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgICAgICAgICBodG1sOiBodG1sLFxuICAgICAgICAgICAgY3NzOiBzdHlsZXMsXG4gICAgICAgICAgICBhdHRyaWJzOiBhdHRyaWJzLFxuICAgICAgICAgICAganM6IGpzY29kZSxcbiAgICAgICAgICAgIGltcG9ydHM6IGltcG9ydHNcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1rdGFnKHRhZ05hbWUsIGh0bWwsIHN0eWxlcywgYXR0cmlicywganNjb2RlLCBpbXBvcnRzLCBvcHRzKVxuICAgICAgfSlcblxuICAgIGlmIChvcHRzLmVudGl0aWVzKSByZXR1cm4gcGFydHNcblxuICAgIHJldHVybiBzcmNcbiAgfVxuXG4gIHJpb3QudXRpbC5jb21waWxlciA9IHtcbiAgICBjb21waWxlOiBjb21waWxlLFxuICAgIGh0bWw6IGNvbXBpbGVIVE1MLFxuICAgIGNzczogY29tcGlsZUNTUyxcbiAgICBqczogY29tcGlsZUpTLFxuICAgIHZlcnNpb246ICd2Mi41LjcnXG4gIH1cbiAgcmV0dXJuIGNvbXBpbGVcblxufSkoKVxuXG4vKlxuICBDb21waWxhdGlvbiBmb3IgdGhlIGJyb3dzZXJcbiovXG5yaW90LmNvbXBpbGUgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhclxuICAgIHByb21pc2UsICAgIC8vIGVtaXRzIHRoZSAncmVhZHknIGV2ZW50IGFuZCBydW5zIHRoZSBmaXJzdCBjYWxsYmFja1xuICAgIHJlYWR5ICAgICAgIC8vIGFsbCB0aGUgc2NyaXB0cyB3ZXJlIGNvbXBpbGVkP1xuXG4gIC8vIGdldHMgdGhlIHNvdXJjZSBvZiBhbiBleHRlcm5hbCB0YWcgd2l0aCBhbiBhc3luYyBjYWxsXG4gIGZ1bmN0aW9uIEdFVCAodXJsLCBmbiwgb3B0cykge1xuICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChyZXEucmVhZHlTdGF0ZSA9PT0gNCAmJlxuICAgICAgICAgKHJlcS5zdGF0dXMgPT09IDIwMCB8fCAhcmVxLnN0YXR1cyAmJiByZXEucmVzcG9uc2VUZXh0Lmxlbmd0aCkpIHtcbiAgICAgICAgZm4ocmVxLnJlc3BvbnNlVGV4dCwgb3B0cywgdXJsKVxuICAgICAgfVxuICAgIH1cbiAgICByZXEub3BlbignR0VUJywgdXJsLCB0cnVlKVxuICAgIHJlcS5zZW5kKCcnKVxuICB9XG5cbiAgLy8gZXZhbHVhdGVzIGEgY29tcGlsZWQgdGFnIHdpdGhpbiB0aGUgZ2xvYmFsIGNvbnRleHRcbiAgZnVuY3Rpb24gZ2xvYmFsRXZhbCAoanMsIHVybCkge1xuICAgIGlmICh0eXBlb2YganMgPT09IFRfU1RSSU5HKSB7XG4gICAgICB2YXJcbiAgICAgICAgbm9kZSA9IG1rRWwoJ3NjcmlwdCcpLFxuICAgICAgICByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG5cbiAgICAgIC8vIG1ha2UgdGhlIHNvdXJjZSBhdmFpbGFibGUgaW4gdGhlIFwiKG5vIGRvbWFpbilcIiB0YWJcbiAgICAgIC8vIG9mIENocm9tZSBEZXZUb29scywgd2l0aCBhIC5qcyBleHRlbnNpb25cbiAgICAgIGlmICh1cmwpIGpzICs9ICdcXG4vLyMgc291cmNlVVJMPScgKyB1cmwgKyAnLmpzJ1xuXG4gICAgICBub2RlLnRleHQgPSBqc1xuICAgICAgcm9vdC5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgcm9vdC5yZW1vdmVDaGlsZChub2RlKVxuICAgIH1cbiAgfVxuXG4gIC8vIGNvbXBpbGVzIGFsbCB0aGUgaW50ZXJuYWwgYW5kIGV4dGVybmFsIHRhZ3Mgb24gdGhlIHBhZ2VcbiAgZnVuY3Rpb24gY29tcGlsZVNjcmlwdHMgKGZuLCB4b3B0KSB7XG4gICAgdmFyXG4gICAgICBzY3JpcHRzID0gJCQoJ3NjcmlwdFt0eXBlPVwicmlvdC90YWdcIl0nKSxcbiAgICAgIHNjcmlwdHNBbW91bnQgPSBzY3JpcHRzLmxlbmd0aFxuXG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIHByb21pc2UudHJpZ2dlcigncmVhZHknKVxuICAgICAgcmVhZHkgPSB0cnVlXG4gICAgICBpZiAoZm4pIGZuKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21waWxlVGFnIChzcmMsIG9wdHMsIHVybCkge1xuICAgICAgdmFyIGNvZGUgPSBjb21waWxlKHNyYywgb3B0cywgdXJsKVxuXG4gICAgICBnbG9iYWxFdmFsKGNvZGUsIHVybClcbiAgICAgIGlmICghLS1zY3JpcHRzQW1vdW50KSBkb25lKClcbiAgICB9XG5cbiAgICBpZiAoIXNjcmlwdHNBbW91bnQpIGRvbmUoKVxuICAgIGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgIHNjcmlwdCA9IHNjcmlwdHNbaV0sXG4gICAgICAgICAgb3B0cyA9IGV4dGVuZCh7dGVtcGxhdGU6IGdldEF0dHIoc2NyaXB0LCAndGVtcGxhdGUnKX0sIHhvcHQpLFxuICAgICAgICAgIHVybCA9IGdldEF0dHIoc2NyaXB0LCAnc3JjJylcblxuICAgICAgICB1cmwgPyBHRVQodXJsLCBjb21waWxlVGFnLCBvcHRzKSA6IGNvbXBpbGVUYWcoc2NyaXB0LmlubmVySFRNTCwgb3B0cylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLy8vIEVudHJ5IHBvaW50IC0tLS0tXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcmcsIGZuLCBvcHRzKSB7XG5cbiAgICBpZiAodHlwZW9mIGFyZyA9PT0gVF9TVFJJTkcpIHtcblxuICAgICAgLy8gMm5kIHBhcmFtZXRlciBpcyBvcHRpb25hbCwgYnV0IGNhbiBiZSBudWxsXG4gICAgICBpZiAoaXNPYmplY3QoZm4pKSB7XG4gICAgICAgIG9wdHMgPSBmblxuICAgICAgICBmbiA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIC8vIGByaW90LmNvbXBpbGUodGFnIFssIGNhbGxiYWNrIHwgdHJ1ZV1bLCBvcHRpb25zXSlgXG4gICAgICBpZiAoL15cXHMqPC9tLnRlc3QoYXJnKSkge1xuICAgICAgICB2YXIganMgPSBjb21waWxlKGFyZywgb3B0cylcbiAgICAgICAgaWYgKGZuICE9PSB0cnVlKSBnbG9iYWxFdmFsKGpzKVxuICAgICAgICBpZiAoaXNGdW5jdGlvbihmbikpIGZuKGpzLCBhcmcsIG9wdHMpXG4gICAgICAgIHJldHVybiBqc1xuICAgICAgfVxuXG4gICAgICAvLyBgcmlvdC5jb21waWxlKHVybCBbLCBjYWxsYmFja11bLCBvcHRpb25zXSlgXG4gICAgICBHRVQoYXJnLCBmdW5jdGlvbiAoc3RyLCBvcHRzLCB1cmwpIHtcbiAgICAgICAgdmFyIGpzID0gY29tcGlsZShzdHIsIG9wdHMsIHVybClcbiAgICAgICAgZ2xvYmFsRXZhbChqcywgdXJsKVxuICAgICAgICBpZiAoZm4pIGZuKGpzLCBzdHIsIG9wdHMpXG4gICAgICB9LCBvcHRzKVxuXG4gICAgfVxuICAgIGVsc2Uge1xuXG4gICAgICAvLyBgcmlvdC5jb21waWxlKFtjYWxsYmFja11bLCBvcHRpb25zXSlgXG4gICAgICBpZiAoaXNGdW5jdGlvbihhcmcpKSB7XG4gICAgICAgIG9wdHMgPSBmblxuICAgICAgICBmbiA9IGFyZ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0cyA9IGFyZ1xuICAgICAgICBmbiA9IHVuZGVmaW5lZFxuICAgICAgfVxuXG4gICAgICBpZiAocmVhZHkpIHtcbiAgICAgICAgcmV0dXJuIGZuICYmIGZuKClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb21pc2UpIHtcbiAgICAgICAgaWYgKGZuKSBwcm9taXNlLm9uKCdyZWFkeScsIGZuKVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlID0gcmlvdC5vYnNlcnZhYmxlKClcbiAgICAgICAgY29tcGlsZVNjcmlwdHMoZm4sIG9wdHMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbn0pKClcblxuLy8gcmVhc3NpZ24gbW91bnQgbWV0aG9kcyAtLS0tLVxudmFyIG1vdW50ID0gcmlvdC5tb3VudFxuXG5yaW90Lm1vdW50ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcmV0LFxuICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgcmlvdC5jb21waWxlKGZ1bmN0aW9uICgpIHsgcmV0ID0gbW91bnQuYXBwbHkocmlvdCwgYXJncykgfSlcbiAgcmV0dXJuIHJldFxufVxuICAvLyBzdXBwb3J0IENvbW1vbkpTLCBBTUQgJiBicm93c2VyXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gVF9PQkpFQ1QpXG4gICAgbW9kdWxlLmV4cG9ydHMgPSByaW90XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFRfRlVOQ1RJT04gJiYgdHlwZW9mIGRlZmluZS5hbWQgIT09IFRfVU5ERUYpXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gcmlvdCB9KVxuICBlbHNlXG4gICAgd2luZG93LnJpb3QgPSByaW90XG5cbn0pKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB2b2lkIDApO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmlvdC10eXBlc2NyaXB0L25vZGVfbW9kdWxlcy9yaW90L3Jpb3QrY29tcGlsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGdsb2JhbHMgX193ZWJwYWNrX2FtZF9vcHRpb25zX18gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi90eXBlcydcblxuZXhwb3J0IGNsYXNzIExvZ2dlciB7XG5cbiAgcHVibGljIGRlYnVnZ2luZzogYm9vbGVhblxuICBwdWJsaWMgbG9nczogTG9nW11cblxuICAvKipcbiAgICogTG9nZ2luZyBpbnRlcmZhY2UgZm9yIHItbG9jYWxpemUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGVidWdnaW5nIC0gRGVidWcgdG8gY29uc29sZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChkZWJ1Z2dpbmc6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRlYnVnZ2luZyA9IGRlYnVnZ2luZ1xuICAgIHRoaXMubG9ncyA9IFtdXG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggY3VycmVudCB0aW1lIGluIHNlY29uZHMuXG4gICAqIEByZXR1cm5zIHtpbnR9XG4gICAqL1xuICBnZXQgdGltZSAoKSA6IG51bWJlciB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGxvZyBmb3IgbG9nc3RvcmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gbWVzc2FnZSB0byBsb2cuXG4gICAqIEBwYXJhbSB7aW50fSB0aW1lc3RhbXAgLSB0aW1lc3RhbXAgZm9yIGxvZy5cbiAgICovXG4gIF9mb3JtYXQgKG1lc3NhZ2U6IHN0cmluZywgdGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICByZXR1cm4gYFske25ldyBEYXRlKHRpbWVzdGFtcCkudG9TdHJpbmcoKX1dOiAoci1sb2NhbGl6ZSkgXCIke21lc3NhZ2V9XCJgXG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggbG9ncywgYWxsb3dzIGZvciBmaWx0ZXJpbmcgYnkgdHlwZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBMb2cgdHlwZSB0byBmaWx0ZXIgYnkuXG4gICAqIEByZXR1cm5zIHthcnJheX1cbiAgICovXG4gICRnZXQgKHR5cGU6IHN0cmluZykgOiBMb2dbXSB7XG4gICAgcmV0dXJuIHRoaXMubG9ncy5maWx0ZXIoKGxvZykgPT4gdHlwZSA/IGxvZy50eXBlID09PSB0eXBlIDogdHJ1ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoZXMgcHJvdmlkZWQgbWVzc2FnZSB0byBsb2cgc3RvcmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gTWVzc2FnZSB0byBsb2cuXG4gICAqL1xuICBsb2cgKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHRoaXMudGltZVxuICAgIGlmICh0aGlzLmRlYnVnZ2luZylcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2Zvcm1hdChtZXNzYWdlLCB0aW1lc3RhbXApKVxuICAgIHRoaXMubG9ncy5wdXNoKHsgdHlwZTogJ2dlbmVyYWwnLCBtZXNzYWdlLCB0aW1lc3RhbXAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoZXMgcHJvdmlkZWQgbWVzc2FnZSB0byBsb2cgc3RvcmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gTWVzc2FnZSB0byBsb2cuXG4gICAqL1xuICB3YXJuIChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLnRpbWVcbiAgICBpZiAodGhpcy5kZWJ1Z2dpbmcpXG4gICAgICBjb25zb2xlLndhcm4odGhpcy5fZm9ybWF0KG1lc3NhZ2UsIHRpbWVzdGFtcCkpXG4gICAgdGhpcy5sb2dzLnB1c2goeyB0eXBlOiAnd2FybmluZycsIG1lc3NhZ2UsIHRpbWVzdGFtcCB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hlcyBwcm92aWRlZCBtZXNzYWdlIHRvIGxvZyBzdG9yZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBNZXNzYWdlIHRvIGxvZy5cbiAgICovXG4gIGVycm9yIChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLnRpbWVcbiAgICBpZiAodGhpcy5kZWJ1Z2dpbmcpXG4gICAgICBjb25zb2xlLmVycm9yKHRoaXMuX2Zvcm1hdChtZXNzYWdlLCB0aW1lc3RhbXApKVxuICAgIHRoaXMubG9ncy5wdXNoKHsgdHlwZTogJ2NyaXRpY2FsJywgbWVzc2FnZSwgdGltZXN0YW1wIH0pXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xvZ2dlci50cyIsImV4cG9ydCBmdW5jdGlvbiBUYWcgKG9wdHMgOiBvYmplY3QpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgc2VsZi5vcHRzID0gb3B0c1xuICBmdW5jdGlvbiBsb2NhbGl6YXRpb24gKCkge1xuICAgIGNvbnN0IG5vZGVDb250ZW50ID0gc2VsZi5yb290LnRleHRDb250ZW50IHx8IHNlbGYucm9vdC5pbm5lckhUTUxcbiAgICAvLyAjIGZldGNoIGluaXRpYWwgdHJhbnNsYXRpb25cbiAgICBsZXQgdHJhbnNsYXRpb24gPSB0eXBlb2Ygc2VsZi5vcHRzLnQgPT09ICdzdHJpbmcnID8gc2VsZi5sb2NhbGl6ZS50cmFuc2xhdGUoXG4gICAgICBzZWxmLm9wdHMudCkgOiBzZWxmLmxvY2FsaXplLnRyYW5zbGF0ZShzZWxmLm9wdHMudC5pLCBzZWxmLm9wdHMudC5sKVxuICAgIC8vICMgaWYgZmFsbGJhY2tDb250ZW50IHRvZ2dsZWQgYW5kIHRyYW5zbGF0aW9uIGlzIHRoZSBwcm92aWRlZCBmYWxsYmFjaywgdHJ5IHRvIHVzZSBleGlzdGluZyBub2RlIGNvbnRlbnRcbiAgICBpZiAoc2VsZi5sb2NhbGl6ZSlcbiAgICAgIGlmIChzZWxmLmxvY2FsaXplLm9wdGlvbnMuZmFsbGJhY2tDb250ZW50ICYmIHRyYW5zbGF0aW9uID09PSBzZWxmLmxvY2FsaXplLm9wdGlvbnMuZmFsbGJhY2spXG4gICAgICAgIHRyYW5zbGF0aW9uID0gbm9kZUNvbnRlbnRcbiAgICAvLyAjIHNjcmFwZSBsb2NhbGUgb3B0aW9uc1xuICAgIGNvbnN0IGxvY2FsZSA9IHNlbGYubG9jYWxpemUubG9jYWxlKClcbiAgICBjb25zdCBsb2NhbGVPcHRpb25zID0gc2VsZi5sb2NhbGl6ZS5vcHRpb25zLmF2YWlsYWJsZS5maW5kKFxuICAgICAgbCA9PiB0eXBlb2YgbCA9PT0gJ29iamVjdCcgJiYgbC5sb2NhbGUgPT09IGxvY2FsZSlcblxuICAgIGlmIChsb2NhbGVPcHRpb25zKSB7XG4gICAgICBpZiAobG9jYWxlT3B0aW9ucy5vcmllbnRhdGlvbilcbiAgICAgICAgc2VsZi5yb290LnNldEF0dHJpYnV0ZSgnZGlyJywgbG9jYWxlT3B0aW9ucy5vcmllbnRhdGlvbilcbiAgICAgIGlmIChsb2NhbGVPcHRpb25zLmZvbnRGYW1pbHkpXG4gICAgICAgIHNlbGYucm9vdC5zdHlsZS5mb250RmFtaWx5ID0gbG9jYWxlT3B0aW9ucy5mb250RmFtaWx5XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc2VsZi5vcHRzLnQgPT09ICdzdHJpbmcnKVxuICAgICAgc2VsZi5yb290LmlubmVySFRNTCA9IHRyYW5zbGF0aW9uXG4gICAgZWxzZVxuICAgICAgaWYgKCFzZWxmLm9wdHMudC5hdHRyKVxuICAgICAgICBzZWxmLnJvb3QuaW5uZXJIVE1MID0gdHJhbnNsYXRpb25cbiAgICAgIGVsc2VcbiAgICAgICAgc2VsZi5yb290LnNldEF0dHJpYnV0ZShzZWxmLm9wdHMudC5hdHRyLCB0cmFuc2xhdGlvbilcbiAgfVxuICBzZWxmLm9uKCdtb3VudCcsIGxvY2FsaXphdGlvbilcbiAgc2VsZi5sb2NhbGl6ZS5vbigndXBkYXRlZCcsIGxvY2FsaXphdGlvbilcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sb2NhbGl6ZS50YWcudHMiXSwic291cmNlUm9vdCI6IiJ9