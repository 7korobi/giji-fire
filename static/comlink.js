(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 105);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(21);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mem;

module.exports = Mem = __webpack_require__(7);

Mem.Rule = __webpack_require__(43);

Mem.Base = {
  Query: __webpack_require__(11),
  Set: __webpack_require__(26),
  Map: __webpack_require__(27),
  List: __webpack_require__(24),
  Model: __webpack_require__(23),
  Finder: __webpack_require__(22)
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(20);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(51);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(53);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(20);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Finder, Map, Name, Query, Set, State, merge, set_depend, set_deploy;

Set = {};

Map = {};

Name = {};

Query = {};

Finder = {};

State = {
  step: {}
};

set_deploy = function set_deploy(key, cb) {
  return Name[key].deploys.push(cb);
};

set_depend = function set_depend(key, cb) {
  return Name[key].depends.push(cb);
};

merge = function merge(o) {
  var key, results, val;
  results = [];
  for (key in o) {
    val = o[key];
    switch (false) {
      case Query[key] == null:
        key = Name[key].base;
        results.push(Set[key].merge(val));
        break;
      case Set[key] == null:
        results.push(Set[key].append(val));
        break;
      default:
        results.push(void 0);
    }
  }
  return results;
};

module.exports = { Set: Set, Map: Map, Name: Name, State: State, Finder: Finder, Query: Query, set_deploy: set_deploy, set_depend: set_depend, merge: merge };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(39);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(41);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(9);

var _keys2 = _interopRequireDefault(_keys);

var _defineProperties = __webpack_require__(19);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OBJ, Query, _, query_parser, set_for;

_ = __webpack_require__(6);

// { State } = require "./index.coffee"
OBJ = function OBJ() {
  return new Object(null);
};

set_for = function set_for(list) {
  var i, key, len, set;
  set = OBJ();
  for (i = 0, len = list.length; i < len; i++) {
    key = list[i];
    set[key] = true;
  }
  return set;
};

query_parser = function query_parser(base, req, cb) {
  if (!req) {
    return base;
  }
  return new Query(base, function () {
    var key, results, val;
    this._filters = base._filters.concat();
    switch (req && req.constructor) {
      case Object:
        results = [];
        for (key in req) {
          val = req[key];
          results.push(cb(this, key, val, _.property(key)));
        }
        return results;
        break;
      case Function:
      case Array:
      case String:
        return cb(this, null, req, function (o) {
          return o;
        });
      default:
        return console.log({ req: req });
    }
  });
};

//throw Error 'unimplemented'
module.exports = Query = function () {
  var Query = function () {
    (0, _createClass3.default)(Query, null, [{
      key: "build",
      value: function build() {
        var $sort, _all_ids, _filters, _group;
        _all_ids = _group = null;
        _filters = [];
        $sort = {};
        return new Query({ _all_ids: _all_ids, _group: _group, _filters: _filters, $sort: $sort }, function () {
          this.all = this;
          return this._memory = OBJ();
        });
      }
    }]);

    function Query(base, tap) {
      (0, _classCallCheck3.default)(this, Query);

      this._step = 0;
      this._copy(base);
      tap.call(this);
    }

    (0, _createClass3.default)(Query, [{
      key: "_copy",
      value: function _copy(_ref) {
        var all = _ref.all,
            _all_ids1 = _ref._all_ids,
            _group1 = _ref._group,
            _filters1 = _ref._filters,
            $sort1 = _ref.$sort;

        this.all = all;
        this._all_ids = _all_ids1;
        this._group = _group1;
        this._filters = _filters1;
        this.$sort = $sort1;
      }
    }, {
      key: "in",
      value: function _in(req) {
        return query_parser(this, req, function (q, target, req, path) {
          var add, set;
          add = function add(f) {
            return q._filters.push(f);
          };
          switch (req && req.constructor) {
            case Array:
              set = set_for(req);
              return add(function (o) {
                var i, key, len, ref;
                ref = path(o);
                for (i = 0, len = ref.length; i < len; i++) {
                  key = ref[i];
                  if (set[key]) {
                    return true;
                  }
                }
                return false;
              });
            case RegExp:
              return add(function (o) {
                var i, len, ref, val;
                ref = path(o);
                for (i = 0, len = ref.length; i < len; i++) {
                  val = ref[i];
                  if (req.test(val)) {
                    return true;
                  }
                }
                return false;
              });
            case null:
            case 0:
            case "":
            case Boolean:
            case String:
            case Number:
              return add(function (o) {
                var ref;
                return -1 < ((ref = path(o)) != null ? ref.indexOf(req) : void 0);
              });
            default:
              console.log({ target: target, req: req, path: path });
              throw Error('unimplemented');
          }
        });
      }
    }, {
      key: "where",
      value: function where(req) {
        return query_parser(this, req, function (q, target, req, path) {
          var add, set;
          add = function add(f) {
            return q._filters.push(f);
          };
          switch (req && req.constructor) {
            case Function:
              return add(req);
            case Array:
              if ("_id" === target) {
                return q._all_ids = req;
              } else {
                set = set_for(req);
                return add(function (o) {
                  return set[path(o)];
                });
              }
              break;
            case RegExp:
              return add(function (o) {
                return req.test(path(o));
              });
            case null:
            case 0:
            case Boolean:
            case String:
            case Number:
              if ("_id" === target) {
                return q._all_ids = [req];
              } else {
                return add(function (o) {
                  return req === path(o);
                });
              }
              break;
            default:
              console.log({ target: target, req: req, path: path });
              throw Error('unimplemented');
          }
        });
      }
    }, {
      key: "search",
      value: function search(text) {
        var item, list, regexp;
        if (!text) {
          return this;
        }
        list = function () {
          var i, len, ref, results;
          ref = text.split(/\s+/);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            if (!item.length) {
              continue;
            }
            results.push("(" + item + ")");
          }
          return results;
        }();
        if (!list.length) {
          return this;
        }
        regexp = new RegExp(list.join("|"), "ig");
        return this.where(function (o) {
          var s;
          s = o.q.search_words;
          return !s || regexp.test(s);
        });
      }
    }, {
      key: "shuffle",
      value: function shuffle() {
        return this.sort(Math.random);
      }
    }, {
      key: "order",
      value: function order(_order) {
        if (_.isEqual(_order, this.$sort['_reduce.list'])) {
          return this;
        }
        return new Query(this, function () {
          this.$sort = _.cloneDeep(this.$sort);
          return this.$sort['_reduce.list'] = _order;
        });
      }
    }, {
      key: "sort",
      value: function sort() {
        for (var _len = arguments.length, _sort = Array(_len), _key = 0; _key < _len; _key++) {
          _sort[_key] = arguments[_key];
        }

        return this.order({ sort: _sort });
      }
    }, {
      key: "page",
      value: function page(page_by) {
        return this.order({ page_by: page_by });
      }
    }, {
      key: "form",
      value: function form() {
        var base1, o, oo;
        oo = this.find.apply(this, arguments);
        if (oo) {
          o = (base1 = this.all._memory[oo.id]).form != null ? base1.form : base1.form = {};
          o.__proto__ = oo;
          return o;
        } else {
          return oo;
        }
      }
    }, {
      key: "find",
      value: function find() {
        var i, id, len, o;

        for (var _len2 = arguments.length, ids = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          ids[_key2] = arguments[_key2];
        }

        for (i = 0, len = ids.length; i < len; i++) {
          id = ids[i];
          if (o = this.hash[id]) {
            if (o) {
              return o;
            }
          }
        }
        return null;
      }
    }, {
      key: "finds",
      value: function finds(ids) {
        var i, id, len, o, results;
        results = [];
        for (i = 0, len = ids.length; i < len; i++) {
          id = ids[i];
          if (o = this.hash[id]) {
            results.push(o);
          }
        }
        return results;
      }
    }, {
      key: "pluck",
      value: function pluck() {
        var _list;

        return (_list = this.list).pluck.apply(_list, arguments);
      }
    }]);
    return Query;
  }();

  ;

  (0, _defineProperties2.default)(Query.prototype, {
    reduce: {
      get: function get() {
        this.all._finder.calculate(this, this.all._memory);
        return this._reduce;
      }
    },
    list: {
      get: function get() {
        return this.reduce.list;
      }
    },
    hash: {
      get: function get() {
        return this.reduce.hash;
      }
    },
    memory: {
      get: function get() {
        return this.all._memory;
      }
    },
    ids: {
      get: function get() {
        return (0, _keys2.default)(this.hash);
      }
    }
  });

  return Query;
}.call(undefined);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {"game":{"folder_id":"beta"},"url":{"web":"https://giji.f5.si","api":"https://giji-api.duckdns.org/api","firebase":"https://api-project-54633717694.firebaseapp.com","assets":"https://api-project-54633717694.firebaseapp.com","store":"https://s3-ap-northeast-1.amazonaws.com/giji-assets","sow":"https://s3-ap-northeast-1.amazonaws.com/giji-assets/sow"},"firebase":{"projectId":"api-project-54633717694","storageBucket":"api-project-54633717694.appspot.com","authDomain":"api-project-54633717694.firebaseapp.com","databaseURL":"https://api-project-54633717694.firebaseio.com","messagingSenderId":"54633717694","apiKey":"AIzaSyAC3N874UpvVZTYmh88mDHkuWKfUDhj25o"}}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(37);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(31);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(18);

__webpack_require__(61);

__webpack_require__(18);

__webpack_require__(63);

__webpack_require__(79);

__webpack_require__(80);

__webpack_require__(84);

__webpack_require__(89);

__webpack_require__(90);

__webpack_require__(91);

__webpack_require__(92);

__webpack_require__(95);

__webpack_require__(96);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Model, Query, Rule, Set;

var _require = __webpack_require__(2);

Set = _require.Set;
Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;


new Rule("locale").schema(function () {});

Set.locale.set(__webpack_require__(60));

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(47);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(49);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray2 = __webpack_require__(8);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = __webpack_require__(9);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $step, Finder, Format, OBJ, Query, State, _, each, validate;

_ = __webpack_require__(6);

var _require = __webpack_require__(7);

State = _require.State;
Query = _require.Query;
Format = _require.Format;


OBJ = function OBJ() {
  return new Object(null);
};

each = function each(_ref, from, process) {
  var depends = _ref.depends;

  var f, i, id, item, j, len, len1;
  for (i = 0, len = depends.length; i < len; i++) {
    f = depends[i];
    f();
  }
  switch (from != null ? from.constructor : void 0) {
    case Array:
      for (j = 0, len1 = from.length; j < len1; j++) {
        item = from[j];
        process(item);
      }
      break;
    case Object:
      for (id in from) {
        item = from[id];
        item._id = id;
        process(item);
      }
  }
};

validate = function validate(item, chklist) {
  var chk, i, len;
  if (!(item && chklist)) {
    return false;
  }
  for (i = 0, len = chklist.length; i < len; i++) {
    chk = chklist[i];
    if (!chk(item)) {
      return false;
    }
  }
  return true;
};

$step = 0;

module.exports = Finder = function () {
  function Finder(name) {
    (0, _classCallCheck3.default)(this, Finder);

    this.name = name;
    State.step[this.name.list] = ++$step;
  }

  (0, _createClass3.default)(Finder, [{
    key: "calculate",
    value: function calculate(query, memory) {
      var cache;
      if (!(query._step < State.step[this.name.list])) {
        return;
      }
      cache = _.cloneDeep(this.format);
      this.reduce(this.map, cache, query, memory);
    }
  }, {
    key: "reduce",
    value: function reduce(map, cache, query, memory) {
      var _this = this;

      var $group, a, cmd, from, i, id, item, j, len, len1, o, path, paths, ref, ref1, ref2, results;
      query._step = ++$step;
      paths = {
        _reduce: {
          list: [],
          hash: {}
        }
      };
      delete query._reduce;
      ref1 = (ref = query._all_ids) != null ? ref : (0, _keys2.default)(memory);
      for (i = 0, len = ref1.length; i < len; i++) {
        id = ref1[i];
        if (!(o = memory[id])) {
          continue;
        }
        var _o = o;
        item = _o.item;
        $group = _o.$group;

        if (!validate(item, query._filters)) {
          continue;
        }
        for (j = 0, len1 = $group.length; j < len1; j++) {
          var _$group$j = (0, _slicedToArray3.default)($group[j], 2);

          path = _$group$j[0];
          a = _$group$j[1];

          o = paths[path] = cache[path];
          map.reduce(query, path, item, o, a);
        }
      }
      for (path in paths) {
        o = paths[path];
        map.finish(query, path, o, this.list);
        _.set(query, path, o);
      }
      ref2 = query.$sort;
      results = [];
      for (path in ref2) {
        cmd = ref2[path];
        if (!(o = from = _.get(query, path))) {
          continue;
        }
        o = map.order(query, path, o, cmd, this.list, function (target) {
          return _this.list.bless(target, query);
        });
        o.from = from;
        results.push(_.set(query, path, o));
      }
      return results;
    }
  }, {
    key: "clear_cache",
    value: function clear_cache() {
      var all = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var id, item, ref;
      State.step[this.name.list] = ++$step;
      if (all) {
        ref = all._memory;
        for (id in ref) {
          item = ref[id].item;

          this.map.$deploy_sort(this.model, item, all);
        }
      }
    }
  }, {
    key: "remove",
    value: function remove(all, from) {
      var _this2 = this;

      var _memory, hit;
      _memory = all._memory;

      hit = false;
      each(this.name, from, function (item) {
        var old;
        _this2.model.bless(item);
        old = _memory[item.id];
        if (old != null) {
          _this2.model.delete(old.item);
          delete _memory[item.id];
          return hit = true;
        }
      });
      if (hit != null) {
        return this.clear_cache();
      }
    }
  }, {
    key: "reset",
    value: function reset(all, from, parent) {
      var _memory, item, key, news, old, results;
      _memory = all._memory;

      all._memory = news = OBJ();
      this.merge(all, from, parent);
      results = [];
      for (key in _memory) {
        old = _memory[key];
        item = news[key];
        if (item == null) {
          results.push(this.model.delete(old));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  }, {
    key: "merge",
    value: function merge(all, from, parent) {
      var _this3 = this;

      var _memory;
      _memory = all._memory;

      each(this.name, from, function (item) {
        var o, old;
        o = _this3.map.$deploy(_this3.model, _this3.format, all, item, parent);
        old = _memory[item.id];
        _memory[item.id] = o;
        if (old != null) {
          return _this3.model.update(item, old.item);
        } else {
          _this3.model.create(item);
          return _this3.model.rowid++;
        }
      });
      return this.clear_cache();
    }
  }]);
  return Finder;
}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(14);

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = __webpack_require__(10);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model, _;

_ = __webpack_require__(6);

// Mem = require "./index.coffee"
module.exports = Model = function () {
  var Model = function () {
    function Model() {
      (0, _classCallCheck3.default)(this, Model);
    }

    (0, _createClass3.default)(Model, null, [{
      key: "bless",
      value: function bless(o) {
        o.__proto__ = this.prototype;
        return o;
      }
    }, {
      key: "$deploy",
      value: function $deploy(item, parent) {
        var deploy, i, len, ref;
        this.bless(item);
        (0, _assign2.default)(item, parent);
        ref = this.$name.deploys;
        for (i = 0, len = ref.length; i < len; i++) {
          deploy = ref[i];
          deploy.call(item, this);
        }
        if (!item.id) {
          throw new Error("detect bad data: " + (0, _stringify2.default)(item));
        }
      }
    }, {
      key: "update",
      value: function update(item, old) {}
    }, {
      key: "create",
      value: function create(item) {}
    }, {
      key: "delete",
      value: function _delete(old) {}
    }, {
      key: "map_reduce",
      value: function map_reduce(item, emit) {
        return void 0;
      }
    }, {
      key: "order",
      value: function order(reduce, emit) {
        return void 0;
      }
    }]);
    return Model;
  }();

  ;

  Model.rowid = 0;

  Model.aggregate = [function (o, idx) {}];

  return Model;
}.call(undefined);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _values = __webpack_require__(25);

var _values2 = _interopRequireDefault(_values);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List, Mem, Query, _;

_ = __webpack_require__(6);

Mem = __webpack_require__(7);

Query = __webpack_require__(11);

module.exports = List = function (_Array) {
  (0, _inherits3.default)(List, _Array);

  function List() {
    (0, _classCallCheck3.default)(this, List);
    return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));
  }

  (0, _createClass3.default)(List, [{
    key: "sort",
    value: function sort() {
      var _ref;

      var o;

      for (var _len = arguments.length, _sort = Array(_len), _key = 0; _key < _len; _key++) {
        _sort[_key] = arguments[_key];
      }

      o = (_ref = _).orderBy.apply(_ref, [this].concat(_sort));
      o.__proto__ = this.__proto__;
      return o;
    }
  }, {
    key: "group_by",
    value: function group_by(cb) {
      var key, o, oo;
      o = _.groupBy(this, cb);
      for (key in o) {
        oo = o[key];
        oo.__proto__ = this.__proto__;
      }
      return o;
    }
  }, {
    key: "page_by",
    value: function page_by(per) {
      var idx;
      idx = 0;
      return (0, _values2.default)(this.group_by(function (o) {
        return Math.floor(idx++ / per);
      }));
    }
  }, {
    key: "where",
    value: function where(req) {
      return this.query.where(req);
    }
  }, {
    key: "in",
    value: function _in(req) {
      return this.query.in(req);
    }
  }], [{
    key: "bless",
    value: function bless(list, query) {
      list.__proto__ = this.prototype;
      list.query = query;
      return list;
    }
  }]);
  return List;
}(Array);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mem, OBJ, Query, Set, _, f_clear, f_item, f_merge, f_remove, f_reset;

_ = __webpack_require__(6);

Mem = __webpack_require__(7);

Query = __webpack_require__(11);

OBJ = function OBJ() {
  return new Object(null);
};

f_reset = function f_reset(list, parent) {
  return this.all._finder.reset(this.all, list, parent);
};

f_merge = function f_merge(list, parent) {
  return this.all._finder.merge(this.all, list, parent);
};

f_remove = function f_remove(list) {
  return this.all._finder.remove(this.all, list);
};

f_item = function f_item(cb) {
  return function (item, parent) {
    if (item != null) {
      return cb.call(this, [item], parent);
    }
  };
};

f_clear = function f_clear() {
  return this.all._finder.clear_cach(this.all);
};

module.exports = Set = function () {
  var Set = function Set() {
    (0, _classCallCheck3.default)(this, Set);
  };

  ;

  Set.prototype.set = f_reset;

  Set.prototype.reset = f_reset;

  Set.prototype.merge = f_merge;

  Set.prototype.add = f_item(f_merge);

  Set.prototype.append = f_item(f_merge);

  Set.prototype.reject = f_remove;

  Set.prototype.del = f_item(f_remove);

  Set.prototype.remove = f_item(f_remove);

  Set.prototype.clear_cache = f_clear;

  Set.prototype.refresh = f_clear;

  Set.prototype.rehash = f_clear;

  return Set;
}.call(undefined);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(9);

var _keys2 = _interopRequireDefault(_keys);

var _values = __webpack_require__(25);

var _values2 = _interopRequireDefault(_values);

var _toConsumableArray2 = __webpack_require__(58);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(8);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toArray2 = __webpack_require__(28);

var _toArray3 = _interopRequireDefault(_toArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Map,
    Query,
    _,
    matrix,
    splice = [].splice,
    indexOf = [].indexOf;

_ = __webpack_require__(6);

var _require = __webpack_require__(7);

Query = _require.Query;


matrix = {
  map: function map(cb) {
    var a, i, item, j, len, len1, list, ref;
    list = [];
    ref = this;
    for (i = 0, len = ref.length; i < len; i++) {
      a = ref[i];
      if (a) {
        for (j = 0, len1 = a.length; j < len1; j++) {
          item = a[j];
          list.push(cb(item));
        }
      }
    }
    return list;
  }
};

module.exports = Map = function () {
  function Map() {
    (0, _classCallCheck3.default)(this, Map);
  }

  (0, _createClass3.default)(Map, null, [{
    key: "bless",
    value: function bless(o) {
      o.__proto__ = this.prototype;
      return o;
    }
  }, {
    key: "$deploy",
    value: function $deploy(model, format, all, item, parent) {
      var o;
      o = {
        item: item,
        $group: []
      };
      model.$deploy(item, parent);
      this.$deploy_reduce(model, item, format, o);
      this.$deploy_sort(model, item, all);
      return o;
    }
  }, {
    key: "$deploy_reduce",
    value: function $deploy_reduce(model, item, format, o) {
      var _this = this;

      var emit, id;
      id = item.id;

      emit = function emit() {
        var _ref, _ref2, _splice$call, _splice$call2;

        for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
          keys[_key] = arguments[_key];
        }

        var cmd, map, path, ref;
        ref = keys, (_ref = ref, _ref2 = (0, _toArray3.default)(_ref), keys = _ref2.slice(0), _ref), (_splice$call = splice.call(keys, -1), _splice$call2 = (0, _slicedToArray3.default)(_splice$call, 1), cmd = _splice$call2[0], _splice$call);
        path = ["_reduce"].concat((0, _toConsumableArray3.default)(keys)).join('.');
        o.$group.push([path, cmd]);
        map = format[path] != null ? format[path] : format[path] = {};
        return _this.init(map, cmd);
      };
      emit({
        list: id,
        set: id
      });
      return model.map_reduce(item, emit);
    }
  }, {
    key: "$deploy_sort",
    value: function $deploy_sort(model, item, all) {
      var emit;
      emit = function emit() {
        var _ref3, _ref4, _splice$call3, _splice$call4;

        for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          keys[_key2] = arguments[_key2];
        }

        var cmd, path, ref;
        ref = keys, (_ref3 = ref, _ref4 = (0, _toArray3.default)(_ref3), keys = _ref4.slice(0), _ref3), (_splice$call3 = splice.call(keys, -1), _splice$call4 = (0, _slicedToArray3.default)(_splice$call3, 1), cmd = _splice$call4[0], _splice$call3);
        path = ["_reduce"].concat((0, _toConsumableArray3.default)(keys)).join('.');
        return all.$sort[path] = cmd;
      };
      emit("list", {});
      return model.order(item, emit);
    }
  }, {
    key: "init",
    value: function init(o, map) {
      if (map.id) {
        o.id = map.id;
      }
      if (map.list) {
        o.list = [];
      }
      if (map.count) {
        o.count = 0;
      }
      if (map.all) {
        o.all = 0;
      }
      if (map.set) {
        return o.hash = {};
      }
    }
  }, {
    key: "order",
    value: function order(query, path, from, map, list, cb) {
      var ___, a, counts, i, id, idx, j, k, key, len, len1, len2, o, oo, per, val;
      o = from;
      if (Object === from.constructor) {
        if (map.belongs_to) {
          for (id in from) {
            val = from[id];
            val.__proto__ = Query[map.belongs_to].find(id);
          }
        } else {
          for (id in from) {
            val = from[id];
            val.id = id;
          }
        }
      } else {
        if (map.belongs_to) {
          for (i = 0, len = from.length; i < len; i++) {
            val = from[i];
            val.__proto__ = Query[map.belongs_to].find(val.id);
          }
        }
      }
      if (map.sort) {
        var _ref5;

        o = (_ref5 = _).orderBy.apply(_ref5, [o].concat((0, _toConsumableArray3.default)(map.sort)));
      }
      if (map.pluck) {
        o = o.map(function (val) {
          return _.get(val, map.pluck);
        });
      }
      if (key = map.group_by) {
        from = o;
        o = _.groupBy(o, function (oo) {
          return _.get(oo, key);
        });
        for (a in o) {
          if (a) {
            cb(a);
          }
        }
      }
      if (per = map.page_by) {
        idx = 0;
        from = o;
        o = (0, _values2.default)(_.groupBy(o, function (oo) {
          return Math.floor(idx++ / per);
        }));
        o.all = idx;
        o.page_idx = function (item) {
          var j, len1, page_idx, ref;
          ref = this;
          for (page_idx = j = 0, len1 = ref.length; j < len1; page_idx = ++j) {
            a = ref[page_idx];
            if (indexOf.call(a, item) >= 0) {
              return page_idx;
            }
          }
          return null;
        };
        for (j = 0, len1 = o.length; j < len1; j++) {
          a = o[j];
          if (a) {
            cb(a);
          }
        }
      }
      if (key = map.index) {
        counts = [];
        for (___ in o) {
          oo = o[___];
          idx = _.get(oo, key);
          if (counts[idx] == null) {
            counts[idx] = [];
          }
          counts[idx].push(oo);
        }
        o = counts;
        for (k = 0, len2 = o.length; k < len2; k++) {
          a = o[k];
          if (a) {
            cb(a);
          }
        }
      }
      cb(o);
      return o;
    }
  }, {
    key: "finish",
    value: function finish(query, path, o, list) {
      if (o.hash) {
        o.set = (0, _keys2.default)(o.hash);
      }
      if (o.count && o.pow != null) {
        o.avg = Math.pow(o.all, 1 / o.count);
      }
      if (o.count && o.all != null) {
        o.avg = o.all * (1 / o.count);
      }
      if (o.min != null && o.max != null) {
        o.range = o.max - o.min;
        if (o.all) {
          return o.density = o.all / o.range;
        }
      }
    }
  }, {
    key: "reduce",
    value: function reduce(query, path, item, o, map) {
      if (map.count) {
        o.count += map.count;
      }
      if (map.all) {
        o.all += map.all;
      }
      if (map.pow) {
        o.pow *= map.pow;
      }
      if (map.list) {
        o.list.push(item);
      }
      if (map.set) {
        o.hash[map.set] = item;
      }
      if (map.max) {
        if (!(map.max <= o.max)) {
          o.max_is = item;
          o.max = map.max;
        }
      }
      if (map.min) {
        if (!(o.min <= map.min)) {
          o.min_is = item;
          return o.min = map.min;
        }
      }
    }
  }]);
  return Map;
}();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(12);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  return Array.isArray(arr) ? arr : (0, _from2.default)(arr);
};

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("date-fns/format");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("date-fns/locale/ja");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(21);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(10);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/assign");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/promise");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(40), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/is-iterable");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/get-iterator");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(14);

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = __webpack_require__(10);

var _assign2 = _interopRequireDefault(_assign);

var _defineProperties = __webpack_require__(19);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = __webpack_require__(9);

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = __webpack_require__(34);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Finder,
    List,
    Map,
    Mem,
    Model,
    Query,
    Rule,
    Set,
    _,
    rename,
    indexOf = [].indexOf;

_ = __webpack_require__(6);

Mem = __webpack_require__(7);

Finder = __webpack_require__(22);

Query = __webpack_require__(11);

Model = __webpack_require__(23);

List = __webpack_require__(24);

Set = __webpack_require__(26);

Map = __webpack_require__(27);

rename = function rename(base) {
  var depends, deploys, id, ids, list, name;
  base = _.snakeCase(base).replace(/s$/, "");
  name = Mem.Name[base];
  if (name) {
    return name;
  }
  id = base + "_id";
  ids = base + "_ids";
  list = base + "s";
  deploys = [];
  depends = [];
  return Mem.Name[list] = Mem.Name[base] = { id: id, ids: ids, list: list, base: base, deploys: deploys, depends: depends };
};

module.exports = Rule = function () {
  function Rule(base, cb) {
    (0, _classCallCheck3.default)(this, Rule);

    this.$name = rename(base);
    this.model = Model;
    this.list = List;
    this.set = Set;
    this.map = Map;
    this.all = Query.build();
    this.all.cache = {};
    this.all._finder = new Finder(this.$name);
    this.depend_on(base);
    this.map_property = {};
    base = this.$name.base;

    this.model_property = (0, _defineProperty3.default)({
      id: {
        enumerable: true,
        get: function get() {
          return this._id;
        }
      }
    }, "" + this.$name.id, {
      enumerable: true,
      get: function get() {
        return this._id;
      }
    });
    this.form_property = {
      changes: {
        enumerable: true,
        value: function value(key) {
          if (_.isEqual(this[key], this.find[key])) {
            return null;
          } else {
            return this.$model[key];
          }
        }
      },
      isChanged: {
        enumerable: true,
        get: function get() {
          var i, key, keys, len;
          keys = (0, _keys2.default)(this);
          for (i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            if (!_.isEqual(this[key], this.$model[key])) {
              return true;
            }
          }
          return false;
        }
      }
    };
    this.list_property = {
      first: {
        enumerable: false,
        get: function get() {
          return this[0];
        }
      },
      head: {
        enumerable: false,
        get: function get() {
          return this[0];
        }
      },
      tail: {
        enumerable: false,
        get: function get() {
          return this[this.length - 1];
        }
      },
      last: {
        enumerable: false,
        get: function get() {
          return this[this.length - 1];
        }
      },
      uniq: {
        enumerable: false,
        get: function get() {
          return this.constructor.bless(_.uniq(this));
        }
      },
      pluck: {
        enumerable: false,
        value: function value() {
          for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
            keys[_key] = arguments[_key];
          }

          cb = function () {
            switch (keys.length) {
              case 0:
                return function () {
                  return null;
                };
              case 1:
                return _.property(keys[0]);
              default:
                return function (o) {
                  var _ref;

                  return (_ref = _).at.apply(_ref, [o].concat(keys));
                };
            }
          }();
          return this.constructor.bless(this.map(cb));
        }
      }
    };
    this.set_property = {};
    if (cb) {
      this.schema(cb);
    }
    return;
  }

  (0, _createClass3.default)(Rule, [{
    key: "schema",
    value: function schema(cb) {
      var _set, finder, list;
      cb.call(this);
      if (this.model === Model) {
        this.model = function (_model) {
          (0, _inherits3.default)(model, _model);

          function model() {
            (0, _classCallCheck3.default)(this, model);
            return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
          }

          return model;
        }(this.model);
      }
      (0, _defineProperties2.default)(this.model.prototype, this.model_property);
      if (this.list === List) {
        this.list = function (_list) {
          (0, _inherits3.default)(list, _list);

          function list() {
            (0, _classCallCheck3.default)(this, list);
            return (0, _possibleConstructorReturn3.default)(this, (list.__proto__ || (0, _getPrototypeOf2.default)(list)).apply(this, arguments));
          }

          return list;
        }(this.list);
      }
      (0, _defineProperties2.default)(this.list.prototype, this.list_property);
      if (this.set === Set) {
        this.set = function (_set2) {
          (0, _inherits3.default)(set, _set2);

          function set() {
            (0, _classCallCheck3.default)(this, set);
            return (0, _possibleConstructorReturn3.default)(this, (set.__proto__ || (0, _getPrototypeOf2.default)(set)).apply(this, arguments));
          }

          return set;
        }(this.set);
      }
      (0, _defineProperties2.default)(this.set.prototype, this.set_property);
      if (this.map === Map) {
        this.map = function (_map) {
          (0, _inherits3.default)(map, _map);

          function map() {
            (0, _classCallCheck3.default)(this, map);
            return (0, _possibleConstructorReturn3.default)(this, (map.__proto__ || (0, _getPrototypeOf2.default)(map)).apply(this, arguments));
          }

          return map;
        }(this.map);
      }
      (0, _defineProperties2.default)(this.map.prototype, this.map_property);
      this.model.$name = this.set.$name = this.map.$name = this.$name;
      Mem.Query[this.$name.list] = this.all;
      Mem.Set[this.$name.base] = _set = new this.set();
      _set.all = this.all;
      _set.$name = this.$name;
      list = this.list.bless([], this.all);
      Mem.Finder[this.$name.base] = finder = this.all._finder;
      finder.set = this.set;
      finder.map = this.map;
      finder.list = this.list;
      finder.model = this.model;
      finder.format = {};
      return this;
    }
  }, {
    key: "key_by",
    value: function key_by(keys) {
      var cb;
      cb = function () {
        switch (keys != null ? keys.constructor : void 0) {
          case void 0:
            return function (o) {
              return o;
            };
          case Function:
            return keys;
          case String:
          case Array:
            return _.property(keys);
          default:
            throw Error("unimplemented " + keys);
        }
      }();
      return this.model_property.id = {
        enumerable: true,
        get: cb
      };
    }
  }, {
    key: "deploy",
    value: function deploy(cb) {
      return Mem.set_deploy(this.$name.base, cb);
    }
  }, {
    key: "depend_on",
    value: function depend_on(parent) {
      var _finder;
      _finder = this.all._finder;

      return Mem.set_depend(parent, function () {
        return _finder.clear_cache();
      });
    }
  }, {
    key: "scope",
    value: function scope(cb) {
      var key, ref, results, val;
      ref = cb(this.all);
      results = [];
      for (key in ref) {
        val = ref[key];
        results.push(this.use_cache(key, val));
      }
      return results;
    }
  }, {
    key: "property",
    value: function property(type, o) {
      return (0, _assign2.default)(this[type + "_property"], o);
    }
  }, {
    key: "default_scope",
    value: function default_scope(scope) {
      return this.all._copy(scope(this.all));
    }
  }, {
    key: "shuffle",
    value: function shuffle() {
      return this.default_scope(function (all) {
        return all.shuffle();
      });
    }
  }, {
    key: "order",
    value: function order() {
      for (var _len2 = arguments.length, sort = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        sort[_key2] = arguments[_key2];
      }

      return this.default_scope(function (all) {
        return all.sort.apply(all, sort);
      });
    }
  }, {
    key: "relation_to_one",
    value: function relation_to_one(key, target, ik, else_id) {
      return this.model_property[key] = {
        enumerable: true,
        get: function get() {
          var id;
          id = _.get(this, ik);
          return Mem.Query[target].find(id, else_id);
        }
      };
    }
  }, {
    key: "relation_to_many",
    value: function relation_to_many(key, target, cmd, ik, qk) {
      var all;
      all = this.all;
      this.use_cache(key, function (id) {
        return Mem.Query[target][cmd]((0, _defineProperty3.default)({}, "" + qk, id));
      });
      return this.model_property[key] = {
        enumerable: true,
        get: function get() {
          return all[key](this[ik]);
        }
      };
    }
  }, {
    key: "relation_tree",
    value: function relation_tree(key, ik) {
      var all;
      all = this.all;
      this.use_cache(key, function (_id, n) {
        var q;
        if (n) {
          q = all.where((0, _defineProperty3.default)({}, "" + ik, _id));
          return all[key](q.ids, n - 1);
        } else {
          return all.where({
            _id: _id
          });
        }
      });
      return this.model_property[key] = {
        enumerable: true,
        value: function value(n) {
          return all[key]([this._id], n);
        }
      };
    }
  }, {
    key: "relation_graph",
    value: function relation_graph(key, ik) {
      var all;
      all = this.all;
      this.use_cache(key, function (_id, n) {
        var _ids, a, i, j, k, len, len1, q, ref;
        q = all.where({
          _id: _id
        });
        if (n) {
          _ids = [];
          ref = q.pluck(ik);
          for (i = 0, len = ref.length; i < len; i++) {
            a = ref[i];
            if (a != null) {
              for (j = 0, len1 = a.length; j < len1; j++) {
                k = a[j];
                if (k != null) {
                  _ids.push(k);
                }
              }
            }
          }
          return all[key](_.uniq(_ids), n - 1);
        } else {
          return q;
        }
      });
      return this.model_property[key] = {
        enumerable: true,
        value: function value(n) {
          return all[key]([this._id], n);
        }
      };
    }
  }, {
    key: "use_cache",
    value: function use_cache(key, val) {
      var _this5 = this;

      switch (val != null ? val.constructor : void 0) {
        case Function:
          return this.all[key] = function () {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            var base1, name1;
            return (base1 = _this5.all.cache)[name1 = key + ":" + (0, _stringify2.default)(args)] != null ? base1[name1] : base1[name1] = val.apply(undefined, args);
          };
        default:
          return this.all[key] = val;
      }
    }
  }, {
    key: "path",
    value: function path() {
      for (var _len4 = arguments.length, keys = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        keys[_key4] = arguments[_key4];
      }

      var all, i, key, len, pk;
      for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        this.belongs_to(key);
      }
      this.deploy(function () {
        var idx, j, len1, results, subids;
        subids = this._id.split("-");
        this.idx = subids[keys.length];
        results = [];
        for (idx = j = 0, len1 = keys.length; j < len1; idx = ++j) {
          key = keys[idx];
          results.push(this[key + "_id"] = subids.slice(0, +idx + 1 || 9e9).join('-'));
        }
        return results;
      });
      all = this.all;

      pk = keys.slice(-1)[0] + "_id";
      return this.model_property.siblings = {
        get: function get() {
          var q;
          q = {};
          q[pk] = this[pk];
          return all.where(q);
        }
      };
    }
  }, {
    key: "belongs_to",
    value: function belongs_to(to) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var key, miss, name, target;
      name = rename(to);
      var _option$key = option.key;
      key = _option$key === undefined ? name.id : _option$key;
      var _option$target = option.target;
      target = _option$target === undefined ? name.list : _option$target;
      miss = option.miss;

      return this.relation_to_one(name.base, target, key, miss);
    }
  }, {
    key: "habtm",
    value: function habtm(to) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var key, name, target;
      name = rename(to);
      if (option.reverse) {
        var _option$key2 = option.key;
        key = _option$key2 === undefined ? this.$name.ids : _option$key2;
        var _option$target2 = option.target;
        target = _option$target2 === undefined ? to : _option$target2;

        return this.relation_to_many(name.list, target, "in", "_id", key);
      } else {
        var _option$key3 = option.key;
        key = _option$key3 === undefined ? name.ids : _option$key3;
        var _option$target3 = option.target;
        target = _option$target3 === undefined ? name.list : _option$target3;

        return this.relation_to_many(name.list, target, "where", key, "_id");
      }
    }
  }, {
    key: "has_many",
    value: function has_many(to) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var key, name, target;
      name = rename(to);
      var _option$key4 = option.key;
      key = _option$key4 === undefined ? this.$name.id : _option$key4;
      var _option$target4 = option.target;
      target = _option$target4 === undefined ? name.list : _option$target4;

      return this.relation_to_many(name.list, target, "where", "_id", key);
    }
  }, {
    key: "tree",
    value: function tree() {
      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var fk;
      fk = this.$name.id;
      this.relation_tree("nodes", fk);
      this.belongs_to(this.$name.base, option);
      return (0, _defineProperties2.default)(this.all, {
        leaf: {
          get: function get() {
            var not_leaf;
            not_leaf = _.uniq(this.pluck(fk));
            return this.where(function (o) {
              var ref;
              return ref = o._id, indexOf.call(not_leaf, ref) < 0;
            });
          }
        }
      });
    }
  }, {
    key: "graph",
    value: function graph() {
      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var cost, directed, ik;
      directed = option.directed;
      cost = option.cost;

      ik = this.$name.ids;
      this.relation_to_many(this.$name.list, this.$name.list, "where", ik, "_id");
      this.relation_graph("path", ik);
      if (!directed) {
        return true; // todo
      }
    }
  }]);
  return Rule;
}();

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/json/stringify");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-properties");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-prototype-of");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol/iterator");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/set-prototype-of");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/create");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/keys");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/values");

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(12);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/array/from");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = {"regend":{"sow_locale_id":"regend","label":"議事☆伝承"},"village":{"sow_locale_id":"all","label":"オール☆スター","help":"すべての役職、恩恵、事件を楽しむことができる、「全部入り」のセットです。","intro":["この村にも恐るべき**人狼**の噂が流れてきた。ひそかに人間と入れ替わり、夜になると人間を襲うという魔物。不安に駆られた村人たちは、集会所へと集まるのだった……。","きみは自らの正体を知った。さあ、村人なら敵である人狼を退治しよう。人狼なら……狡猾に振る舞って人間たちを確実に仕留めていくのだ。","噂は現実だった。血塗られた定めに従う魔物**人狼**は、確かにこの中にいるのだ。\n\n非力な人間が人狼に対抗するため、村人たちは一つのルールを定めた。投票により怪しい者を処刑していこうと。罪のない者を処刑してしまう事もあるだろうが、それも村のためにはやむを得ないと……。"]},"heavy":{"sow_locale_id":"heavy","label":"絶望☠議事","help":"すべての役職、恩恵、事件を楽しむことができる、「全部入り」のセットです。","intro":["狩人も立ち入らない深い森の奥からやってくる、**人狼**は、ひそかに人間と入れ替わり夜になると人間を襲うという。隣国の出身でありながら戦功名高く、Sirの称号を賜った若き英雄、Cointossと配下の聖貨騎士団は、この魔物の噂を重く見ていた。\n\n恒例になりつつあった臨時徴税を収めた村人たちは、水車小屋で招集の命令を受け、不安を覚えつつも集会所へと集まるのだった……。","教会の鐘が鳴らされ、聖貨騎士団が到着した。村の名士が応対する中、集まった人々はわけも知らされず、言い知れぬ不安を感じていた……。\nきみは自らの正体を知った。さあ、村人なら敵である人狼を退治しよう。人狼なら……狡猾に振る舞って人間たちを確実に仕留めていくのだ。","噂は現実だった。血塗られた定めに従う魔物“人狼”は、確かにこの中にいるのだ。\n戦慄の走るなか教会の鐘が鳴り、新しい法律が発行された。今夜より解決のときまでひとりずつ、人狼が成り代わった村人を処断する義務を負うという。\n\n聖貨騎士団の物々しい姿に追いつめられ、集められた「容疑者」たちはルールを定めた。投票により怪しい者を決定すると。罪のない者を処刑してしまう事もあるだろう。それも村のためにはやむを得ないのだ……。"]},"secret":{"label":"陰謀に集う胡蝶","help":"すべての役職、恩恵、事件を楽しむことができます。ぜひ見物人を黒幕にし、翻弄される参加者たちの運命を味わいましょう。","intro":["閉鎖された空間。\n閉じ込められたプレイヤーたち。\nトランプを模した仕掛けが外れない。\n与えられたゲームの条件をクリアしなければ、この仕掛けは爆発するという。プレイヤーたちは突如突きつけられた条件に半信半疑ながらも、互いに情報を交換するべく集い始めた。","**ゲームの開始が告げられた**。\nこのようなゲームが現実なわけがない。そう理性を働かせながらも、プレイヤーたちは自らに与えられた勝利条件を確認した。心の片隅から湧きあがる不安に突き動かされ、生き残るために行動を開始したのだ。","目の前に転がる、かつて人間だったモノ。\nゲームは現実だった。プレイヤーは否応なくこの状況を受け入れる。それは仕掛けの解除条件はそれぞれ異なり、誰がどの仕掛けを持っているのかわからないというゲーム。\n\n^自分の条件は隠さなければ。^ ~しかし単独行動は不利。~ ^ほかのプレイヤーと共闘するべきだ。^ ~あえて条件を明かそう。~\n^……いや、まて。^ ~あいつは嘘をついているんじゃないか？~\n「ならば、殺される前にいっそ―」\n\n疑心暗鬼、そして死への恐怖が、何よりもプレイヤーたちの道徳と理性を蝕んでいく。"]},"complex":{"sow_locale_id":"complexx","label":"ParanoiA","help":"すべての役職、恩恵、事件を楽しむことができる、「全部入り」のセットです。","intro":["*[善良]: かんぺき\n*[IntSec]: ひみつけいさつ\n*[Power]: げんしりょく\n_HOUR_時のニュースです。\n非認可の組織が親愛なるコンピューター・_NPC_を破壊するたくらみを持っていると、さきほどIntSecが明らかにしました。善良な市民はすみやかに所定の緊急避難場所へ集まりましょう。\n\n大変な事態ですね。秘密結社というと、屋外を散歩したり、を拒否するといった奇行が知られていますが……","*[善良]: かんぺき\n*[ゴシゴシボット]: squeeze bot\n*[R&D]: けんきゅうじょ\n*[Power]: げんしりょく\n*[PLC]: はいきゅうじょ\n*[フィールドテストし]: ためしにつかってみて\n_HOUR_時のニュースです。\nR&Dは、結社対抗措置の一環として新装備を開発しました。\n善良な市民はPLCから装備を受領、フィールドテストし、結社を発見しましょう。\n\n支給品の機密は善良に管理されているので、口を滑らせないことですね。次のニュース。ゴシゴシボット量産工場で、大量のチョコレートが……","*[培養槽]: ほいくえん\n_HOUR_時のニュースです。\n昨夜未明、培養槽が襲撃を受けました。_NPC_が破壊され、クローンと記憶の備蓄は失われました。\n次のクローンはなにひとつうまくやることができないので、今日からの▼zap▼は~ブツン~\n（**すべてのニュース**・**チャンネルは沈黙し**、**天井は真っ暗に消灯した**。）\n\nそして静寂の中、誰かが言い出します。今日からは、▼zap▼は一日ひとりに制限しよう。厳しい制限だが、我慢するんだ。"]},"orbit":{"sow_locale_id":"star","label":"Orbital☆Star","help":"宇宙時代に突入した「全部入り」のセットです。村落共同体は渓谷や高原ではなく、小惑星帯や移民船、軌道エレベーターの途中にあるでしょう。事件が始まるまでは、とても充実した近代的なインフラが整っていたのですが……","intro":["夜更けに響いた破滅の音に起こされ、不安に駆られた乗客たちは集会所へと集まった。単純な直接通信の機能しか果たさなくなった携帯を携えて。","送信機は作動しない。救助には何日もかかる。それが結論だった。\n実りのない努力を尽くした末に、誰もが厳しい状況を理解し、きみは自らの使命に目覚めた。しかし、未知の生命体**人狼**は、確かにこの中にいるのだ。\nさあ、人間なら敵である人狼を退治しよう。人狼なら……狡猾に振る舞って人間たちを確実に仕留めていくのだ。","物資もエネルギーも限られた中、人狼に対抗するために乗客たちは一つのルールを定めた。投票により怪しい者をここから放り出そうと。宇宙服ひとつでは命の保証がないが、それもやむを得ないと……。"]},"alien":{"label":"Alien☆Star","help":"宇宙時代に突入した「全部入り」のセットです。村落共同体は渓谷や高原ではなく、小惑星帯や移民船、軌道エレベーターの途中にあるでしょう。事件が始まるまでは、とても充実した近代的なインフラが整っていたのですが……","intro":["この村落共同体にも恐るべき噂が流れてきた。ライフラインを寸断し、軌道変更の推進力を奪う**人狼**の脅威。ひそかに人間と入れ替わり、夜になると人間を襲う未知の生命体。なぜか単純な直接通信の機能しか果たさなくなった携帯を携え、不安に駆られた村人たちは集会所へと集まった。","きみは自らの正体を知った。さあ、村人なら敵である人狼を退治しよう。人狼なら……狡猾に振る舞って人間たちを確実に仕留めていくのだ。","噂は現実だった。血塗られた活動を開始した未知の生命体**人狼**は、確かにこの中にいるのだ。\n\n非力な人間が人狼に対抗するため、村人たちは一つのルールを定めた。投票により怪しい者を処刑していこうと。罪のない者を処刑してしまう事もあるだろうが、それも共同体のためにはやむを得ないと……。"]}}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model, Query, Rule, Set, _, _id, i, idx1, idx2, j, key, label, len, len1, number, o, oo, rank, ratio, ref, ref1, ref2, suite, suite_code, type;

_ = __webpack_require__(6);

var _require = __webpack_require__(2);

Set = _require.Set;
Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;


new Rule("random").schema(function () {
  this.scope(function (all) {
    return {
      deck: function deck(type) {
        return all.where({ type: type });
      }
    };
  });
  this.deploy(function () {
    var t0, t1;
    t0 = this.toString(0);
    t1 = this.toString(1);
    return this.texts = t0 !== t1 ? [t0, t1] : [t0];
  });
  return this.model = function (_model) {
    (0, _inherits3.default)(model, _model);

    function model() {
      (0, _classCallCheck3.default)(this, model);
      return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
    }

    (0, _createClass3.default)(model, [{
      key: "toString",
      value: function toString() {
        var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        switch (this.type) {
          case 'chess':
            return this.symbols[side] + " " + ["白", "黒"][side] + this.label;
          case 'tarot':
            return ["正", "逆"][side] + " " + this.roman + "." + this.label;
          case 'zodiac':
            return this.symbol + " " + this.roman + "." + this.label;
          case 'planet':
          case 'weather':
            return this.symbol + " " + this.label;
          default:
            return "" + this.label;
        }
      }
    }], [{
      key: "order",
      value: function order(o, emit) {
        emit("list", {
          sort: ['ratio', 'desc']
        });
        return emit("type", {
          sort: ['count', 'asc']
        });
      }
    }, {
      key: "map_reduce",
      value: function map_reduce(o, emit) {
        emit("type", o.type, {
          count: 1
        });
        return emit("ratio", {
          count: 1,
          all: o.ratio
        });
      }
    }]);
    return model;
  }(this.model);
});

Query.randoms.choice = function (type) {
  var at, i, len, list, o, reduce;

  var _deck = this.deck(type);

  list = _deck.list;
  reduce = _deck.reduce;

  at = _.random(0, reduce.ratio.all - 1);
  o = void 0;
  for (i = 0, len = list.length; i < len; i++) {
    o = list[i];
    at -= o.ratio;
    if (at < 0) {
      break;
    }
  }
  return o.toString(_.random(0, 1));
};

type = "trump";

ratio = 1;

ref = ["♢", "♡", "♣", "♠"];
for (idx1 = i = 0, len = ref.length; i < len; idx1 = ++i) {
  suite = ref[idx1];
  ref1 = "A 2 3 4 5 6 7 8 9 10 J Q K".split(" ");
  for (idx2 = j = 0, len1 = ref1.length; j < len1; idx2 = ++j) {
    rank = ref1[idx2];
    label = "" + suite + rank;
    suite_code = idx1 + 1;
    number = idx2 + 1;
    _id = 100 * suite_code + number;
    Set.random.add({ _id: _id, type: type, ratio: ratio, number: number, suite: suite, rank: rank, label: label });
  }
}

Set.random.add({
  _id: 501,
  type: "trump",
  ratio: 1,
  number: 0,
  suite: "",
  rank: "",
  label: "JOKER"
});

Set.random.add({
  _id: 502,
  type: "trump",
  ratio: 1,
  number: 0,
  suite: "",
  rank: "",
  label: "joker"
});

ref2 = __webpack_require__(62);
for (type in ref2) {
  o = ref2[type];
  for (key in o) {
    oo = o[key];
    oo._id = type + "_" + key;
    oo.type = type;
    if (oo.ratio == null) {
      oo.ratio = 1;
    }
    Set.random.add(oo);
  }
}

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = {"tarot":{"jester":{"name":"Jester","label":"愚者","roman":"","hebrew":"א"},"magus":{"name":"Magus","label":"魔術師","roman":"I","hebrew":"ב"},"popess":{"name":"Popess","label":"女教皇","roman":"II","hebrew":"ג"},"empress":{"name":"Empress","label":"女帝","roman":"III","hebrew":"ד"},"emperor":{"name":"Emperor","label":"皇帝","roman":"IV","hebrew":"צ"},"pope":{"name":"Pope","label":"教皇","roman":"V","hebrew":"ו"},"lovers":{"name":"Lovers","label":"恋人","roman":"VI","hebrew":"ז"},"chariot":{"name":"Chariot","label":"戦車","roman":"VII","hebrew":"ח"},"justice":{"name":"Justice","label":"正義","roman":"VIII","hebrew":"ל"},"hermit":{"name":"Hermit","label":"隠者","roman":"IX","hebrew":"י"},"wheel":{"name":"Wheel of Fortune","label":"運命の輪","roman":"X","hebrew":"כ"},"fortitude":{"name":"Fortitude","label":"剛毅","roman":"XI","hebrew":"ט"},"hanged":{"name":"Hanged Man","label":"吊られ人","roman":"XII","hebrew":"מ"},"death":{"name":"Death","label":"死神","roman":"XIII","hebrew":"נ"},"temperance":{"name":"Temperance","label":"節制","roman":"XIV","hebrew":"ס"},"devil":{"name":"Devil","label":"悪魔","roman":"XV","hebrew":"ע"},"tower":{"name":"Tower","label":"塔","roman":"XVI","hebrew":"פ"},"star":{"name":"Star","label":"星","roman":"XVII","hebrew":"ה"},"moon":{"name":"Moon","label":"月","roman":"XVIII","hebrew":"ק"},"sun":{"name":"Sun","label":"太陽","roman":"XIX","hebrew":"ר"},"judgement":{"name":"Judgement","label":"審判","roman":"XX","hebrew":"ש"},"world":{"name":"World","label":"世界","roman":"XXI","hebrew":"ת"}},"zodiac":{"aries":{"symbol":"♈","label":"白羊宮","roman":"I","hebrew":"פ"},"taurus":{"symbol":"♉","label":"金牛宮","roman":"II","hebrew":"א"},"gemini":{"symbol":"♊️","label":"双児宮","roman":"III","hebrew":"ב"},"cancer":{"symbol":"♋️","label":"巨蟹宮","roman":"IV","hebrew":"ג"},"leo":{"symbol":"♌","label":"獅子宮","roman":"V","hebrew":"ד"},"virgo":{"symbol":"️♍️","label":"処女宮","roman":"VI","hebrew":"ה"},"libra":{"symbol":"♎️","label":"天秤宮","roman":"VII","hebrew":"ו"},"scorpius":{"symbol":"♏️","label":"天蝎宮","roman":"VIII","hebrew":"י"},"sagittarius":{"symbol":"♐️","label":"人馬宮","roman":"IX","hebrew":"כ"},"capricorn":{"symbol":"♑️","label":"磨羯宮","roman":"X","hebrew":"ל"},"aquarius":{"symbol":"♒️","label":"宝瓶宮","roman":"XI","hebrew":"מ"},"pisces":{"symbol":"♓️","label":"双魚宮","roman":"XII","hebrew":"ס"},"ophiuchus":{"symbol":"⛎","label":"蛇遣座","roman":"XIII","hebrew":""}},"planet":{"sun":{"symbol":"☉","label":"太陽"},"mercury":{"symbol":"☿","label":"水星"},"venus":{"symbol":"♀","label":"金星"},"earth":{"symbol":"🜨","label":"地球"},"moon":{"symbol":"☾","label":"月"},"mars":{"symbol":"♂","label":"火星"},"jupiter":{"symbol":"♃","label":"木星"},"saturn":{"symbol":"♄","label":"土星"},"uranus":{"symbol":"⛢","label":"天王星"},"neptune":{"symbol":"♆","label":"海王星"},"pluto":{"symbol":"♇","label":"冥王星"},"ceres":{"symbol":"⚳","label":"ケレス"},"pallas":{"symbol":"⚴","label":"パラス"},"juno":{"symbol":"⚵","label":"ジュノー"},"vesta":{"symbol":"⚶","label":"ヴェスタ"},"chiron":{"symbol":"⚷","label":"キロン"},"lilith":{"symbol":"⚸","label":"リリス"},"dragonhead":{"symbol":"☊","label":"羅睺"},"dragontail":{"symbol":"☋","label":"計都"},"comet":{"symbol":"☄","label":"彗星"}},"chess":{"king":{"ratio":1,"symbols":"♔♚","label":"王"},"queen":{"ratio":1,"symbols":"♕♛","label":"妃"},"rook":{"ratio":2,"symbols":"♖♜","label":"塔"},"bishop":{"ratio":2,"symbols":"♗♝","label":"僧"},"knight":{"ratio":2,"symbols":"♘♞","label":"騎"},"pawn":{"ratio":8,"symbols":"♙♟","label":"兵"}},"weather":{"fine":{"ratio":8,"symbol":"☀","label":"晴天"},"partly":{"ratio":8,"symbol":"🌤️","label":"曇晴"},"cloudy":{"ratio":8,"symbol":"☁","label":"曇天"},"fog":{"ratio":1,"symbol":"🌁","label":"霧中"},"rainy":{"ratio":8,"symbol":"☂","label":"降雨"},"outrain":{"ratio":8,"symbol":"🌂","label":"雨後"},"shower":{"ratio":8,"symbol":"☔","label":"俄雨"},"thunder":{"ratio":1,"symbol":"⚡","label":"落雷"},"twister":{"ratio":1,"symbol":"🌪","label":"竜巻"},"thunderstorm":{"ratio":1,"symbol":"⛈️","label":"雷雨"},"rainbow":{"ratio":2,"symbol":"🌈","label":"虹天"}},"coin":{"front":{"ratio":500,"label":"表"},"back":{"ratio":500,"label":"裏"},"stand":{"ratio":1,"label":"立った"}}}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model, Query, Rule, Set, chr_set_id, cs_key, face, face_id, i, j, job, key, len, len1, list, o, order, ref, say;

var _require = __webpack_require__(2);

Set = _require.Set;
Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;


order = ["ririnra", "wa", "time", "sf", "fable", "mad", "ger", "changed", "animal", "school", "all"];

new Rule("tag").schema(function () {
  this.belongs_to("chr_set");
  this.habtm("faces", {
    reverse: true
  });
  this.tree();
  this.property('model', {
    chr_job: {
      value: function value(face_id) {
        return Query.chr_jobs.find(this.chr_set_id + "_" + face_id);
      }
    }
  });
  return this.scope(function (all) {
    return {
      enable: function enable() {
        return all.where(function (o) {
          return !o.disabled;
        });
      }
    };
  });
});

new Rule("face").schema(function () {
  var map;
  this.habtm("tags");
  this.has_many("chr_jobs");
  this.has_many("chr_npcs");
  this.scope(function (all) {
    return {
      tag: function tag(tag_id) {
        switch (tag_id) {
          case "all":
            return all;
          default:
            return all.in({
              tag_ids: tag_id
            });
        }
      },
      name_blank: function name_blank() {
        var i, idx, key, ref, ref1, results;
        results = [];
        for (idx = i = ref = "ア".charCodeAt(0), ref1 = "ン".charCodeAt(0); ref <= ref1 ? i <= ref1 : i >= ref1; idx = ref <= ref1 ? ++i : --i) {
          key = String.fromCharCode(idx);
          if (all.reduce.name_head.from[key]) {
            continue;
          }
          results.push(key);
        }
        return results;
      },
      name_head: function name_head() {
        var tag_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "all";

        return all.tag(tag_id).reduce.name_head;
      }
    };
  });
  this.deploy(function () {
    this.aggregate = {
      sow_auths: [],
      mestypes: [],
      folders: [],
      roles: [],
      lives: [],
      log: {
        date_min: 0xfffffffffffff,
        date_max: -0xfffffffffffff,
        story_ids: []
      },
      fav: {
        _id: {
          sow_auth_id: null
        },
        count: 0
      }
    };
    return this.summary_url = "/summary/faces/show?id=" + this._id;
  });
  map = {
    count: 1
  };
  this.model = function (_model) {
    (0, _inherits3.default)(model, _model);

    function model() {
      (0, _classCallCheck3.default)(this, model);
      return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
    }

    (0, _createClass3.default)(model, null, [{
      key: "order",
      value: function order(o, emit) {
        emit("list", {
          sort: ["order"]
        });
        return emit("name_head", {
          sort: ["id"],
          index: "set.length"
        });
      }
    }, {
      key: "map_reduce",
      value: function map_reduce(o, emit) {
        var head, i, len, ref, results, tag;
        head = o.name[0];
        if (["†"].includes(o.name[0])) {
          head = o.name[1];
        }
        if (["D."].includes(o.name.slice(0, 2))) {
          head = o.name[2];
        }
        head = head.replace(/[\u3041-\u3096]/g, function (hira) {
          return String.fromCharCode(hira.charCodeAt(0) + 0x60);
        });
        emit("all", "all", map);
        emit("name_head", head, {
          set: o.name
        });
        ref = o.tag_ids;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          tag = ref[i];
          results.push(emit("tag", tag, map));
        }
        return results;
      }
    }]);
    return model;
  }(this.model);
  return this.property('model', {
    roles: {
      get: function get() {
        return this.aggregate.roles;
      }
    },
    lives: {
      get: function get() {
        return this.aggregate.lives;
      }
    },
    sow_auths: {
      get: function get() {
        return this.aggregate.sow_auths;
      }
    },
    mestypes: {
      get: function get() {
        return this.aggregate.mestypes;
      }
    },
    folders: {
      get: function get() {
        return this.aggregate.folders;
      }
    },
    story_length: {
      get: function get() {
        return this.aggregate.log.story_ids.length;
      }
    },
    sow_auth_id: {
      get: function get() {
        return this.aggregate.fav._id.sow_auth_id;
      }
    },
    fav_count: {
      get: function get() {
        return this.aggregate.fav.count;
      }
    },
    date_max: {
      get: function get() {
        return new Date(this.aggregate.log.date_max) - 0;
      }
    },
    date_min: {
      get: function get() {
        return new Date(this.aggregate.log.date_min) - 0;
      }
    },
    date_range: {
      get: function get() {
        return this.date_max - this.date_min;
      }
    },
    jobs: {
      get: function get() {
        return this.chr_jobs.pluck("job").uniq;
      }
    }
  });
});

new Rule("chr_set").schema(function () {
  this.order("label");
  this.has_many("chr_jobs");
  return this.has_many("chr_npcs");
});

new Rule("chr_npc").schema(function () {
  this.order("label");
  this.belongs_to("chr_set");
  this.belongs_to("face");
  return this.deploy(function () {
    this._id = this.chr_set_id + "_" + this.face_id;
    return this.chr_set_idx = order.indexOf(this.chr_set_id);
  });
});

new Rule("chr_job").schema(function () {
  this.belongs_to("chr_set");
  this.belongs_to("face");
  this.deploy(function () {
    this._id = this.chr_set_id + "_" + this.face_id;
    this.chr_set_idx = order.indexOf(this.chr_set_id);
    return this.q = {
      search_words: this.face ? ["animal", "school"].includes(this.chr_set_id) ? this.face.name : this.job + " " + this.face.name : ""
    };
  });
  this.scope(function (all) {
    return {
      tag: function tag(tag_id) {
        var chr_set_id;

        var _Query$tags$find = Query.tags.find(tag_id);

        chr_set_id = _Query$tags$find.chr_set_id;

        switch (tag_id) {
          case "all":
            return all.where({ chr_set_id: chr_set_id });
          default:
            return all.where({ chr_set_id: chr_set_id }).in({
              'face.tag_ids': tag_id
            });
        }
      }
    };
  });
  return this.model = function (_model2) {
    (0, _inherits3.default)(model, _model2);

    function model() {
      (0, _classCallCheck3.default)(this, model);
      return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
    }

    (0, _createClass3.default)(model, null, [{
      key: "order",
      value: function order(o, emit) {
        return emit("list", {
          sort: ["face.order"]
        });
      }
    }]);
    return model;
  }(this.model);
});

Set.tag.set(__webpack_require__(64));

Set.face.set(__webpack_require__(65));

ref = __webpack_require__(66);
for (i = 0, len = ref.length; i < len; i++) {
  var _ref$i = ref[i];
  face_id = _ref$i.face_id;
  say = _ref$i.say;

  Query.faces.find(face_id).npc = { say: say };
}

for (j = 0, len1 = order.length; j < len1; j++) {
  key = order[j];
  o = __webpack_require__(67)("./cs_" + key + ".yml");
  Set.chr_set.append(o.chr_set);
  chr_set_id = o.chr_set.chr_set_id;

  cs_key = { chr_set_id: chr_set_id };
  Set.chr_npc.merge(o.chr_npc, cs_key);
  Set.chr_job.merge(o.chr_job, cs_key);
}

list = function () {
  var k, len2, ref1, ref2, results;
  ref1 = Query.faces.list;
  results = [];
  for (k = 0, len2 = ref1.length; k < len2; k++) {
    face = ref1[k];
    chr_set_id = "all";
    face_id = face._id;
    job = (ref2 = face.chr_jobs.list.sort("chr_set_idx")[0]) != null ? ref2.job : void 0;
    if (job == null) {
      continue;
    }
    results.push({ chr_set_id: chr_set_id, face_id: face_id, job: job });
  }
  return results;
}();

Set.chr_job.merge(list);

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = {"all":{"label":"すべて","long":"「人狼議事 ちゃんぷる」のキャラクター","chr_set_id":"all"},"giji":{"label":"人狼議事","long":"「人狼議事」のキャラクター","tag_id":"all","chr_set_id":"ririnra"},"animal":{"label":"うきうきサバンナ","long":"「うきうきサバンナ」のキャラクター","tag_id":"all","chr_set_id":"animal"},"school":{"label":"私立七転学園","long":"「私立七転学園」のキャラクター","tag_id":"all","chr_set_id":"school"},"shoji":{"label":"てやんでえ","long":"「和の国てやんでえ」のキャラクター","tag_id":"all","chr_set_id":"wa"},"travel":{"label":"帰還者議事","long":"「帰還者議事」のキャラクター","tag_id":"all","chr_set_id":"time"},"stratos":{"label":"明後日への道標","long":"「明後日への道標」のキャラクター","tag_id":"all","chr_set_id":"sf"},"myth":{"label":"はおうのひろば","long":"「はおうのひろば」のキャラクター","tag_id":"all","chr_set_id":"changed"},"asia":{"label":"大陸議事","long":"「大陸議事」のキャラクター","tag_id":"all","chr_set_id":"ger"},"fable":{"label":"幻日世界","long":"「幻日世界」のキャラクター","tag_id":"all","chr_set_id":"fable"},"marchen":{"label":"狂騒議事","long":"「狂騒議事」のキャラクター","tag_id":"all","chr_set_id":"mad"},"kid":{"label":"(児童)","long":"児童のキャラクター","tag_id":"giji","chr_set_id":"ririnra"},"young":{"label":"(若者)","long":"若者のキャラクター","tag_id":"giji","chr_set_id":"ririnra"},"middle":{"label":"(中年)","long":"中年のキャラクター","tag_id":"giji","chr_set_id":"ririnra"},"elder":{"label":"(老人)","long":"老人のキャラクター","tag_id":"giji","chr_set_id":"ririnra"},"pair":{"label":"=双対=","long":"お揃いのキャラクター","tag_id":"pair","chr_set_id":"all"},"river":{"label":"-運河-","long":"往く人来る人休む人","tag_id":"giji","chr_set_id":"ririnra"},"road":{"label":"-往来-","long":"往く人来る人休む人","tag_id":"giji","chr_set_id":"ririnra"},"immoral":{"label":"-裏道-","long":"街灯の裏の背徳達","tag_id":"giji","chr_set_id":"ririnra"},"guild":{"label":"-商工会-","long":"商人と職人の集うギルド","tag_id":"giji","chr_set_id":"ririnra"},"elegant":{"label":"-舞踏会-","long":"瀟洒な館の舞踏会","tag_id":"giji","chr_set_id":"ririnra"},"ecclesia":{"label":"-公教会-","long":"信仰と道徳と学識の源泉","tag_id":"giji","chr_set_id":"ririnra"},"medical":{"label":"-施療院-","long":"病苦毒霊と戦う砦","tag_id":"giji","chr_set_id":"ririnra"},"market":{"label":"-歌劇酒場-","long":"芸の極みに華が咲く","tag_id":"giji","chr_set_id":"ririnra"},"apartment":{"label":"-自室の窓-","long":"窓から外を眺めると","tag_id":"giji","chr_set_id":"ririnra"},"servant":{"label":"-使用人-","long":"良家を支えるスタッフ","tag_id":"giji","chr_set_id":"ririnra"},"farm":{"label":"-森の農場-","long":"森に接する田畑","tag_id":"giji","chr_set_id":"ririnra"},"government":{"label":"-統治公共-","long":"所領を治める権能者","tag_id":"giji","chr_set_id":"ririnra"},"god":{"label":"-かみさま-","long":"かみさま","tag_id":"all","chr_set_id":"all"}}

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = [{"_id":"c49","comment":"test","name":"ボリス","order":1,"tag_ids":["animal","school","giji","guild","young"]},{"_id":"c38","order":2,"name":"コリーン","tag_ids":["animal","school","giji","market","young"]},{"_id":"c77","order":3,"name":"キャロライナ","tag_ids":["animal","school","giji","servant","road","farm","young"]},{"_id":"c35","order":4,"name":"ダン","tag_ids":["animal","school","giji","guild","middle"]},{"_id":"c53","order":5,"name":"ゼルダ","tag_ids":["animal","school","giji","government","farm","elegant","elder"]},{"_id":"c74","order":6,"name":"フランシスカ","tag_ids":["animal","school","giji","market","young"]},{"_id":"c50","order":8,"name":"ディーン","tag_ids":["animal","school","giji","government","guild","young"]},{"_id":"c36","order":8.1,"name":"ミッシェル","tag_ids":["animal","school","giji","guild","servant","young"]},{"_id":"c26","order":8.2,"name":"モニカ","tag_ids":["animal","school","giji","guild","young"]},{"_id":"c09","order":9,"name":"ヒロシ","tag_ids":["animal","school","giji","immoral","travel","river","middle"]},{"_id":"c55","order":10,"name":"パピヨン","tag_ids":["animal","school","giji","apartment","elegant","middle"]},{"_id":"c29","order":11,"name":"イアン","tag_ids":["animal","school","giji","guild","young"]},{"_id":"c12","order":12,"name":"バーナバス","tag_ids":["school","giji","servant","road","middle"]},{"_id":"c16","order":900.127,"name":"マリアンヌ","tag_ids":["animal","school","giji","apartment","market","medical","young"]},{"_id":"c34","order":14,"name":"トニー","tag_ids":["animal","animal","school","giji","road","servant","kid"]},{"_id":"c44","order":15,"name":"ドナルド","tag_ids":["animal","animal","school","giji","immoral","young"]},{"_id":"c11","order":16,"name":"カルヴィン","tag_ids":["animal","animal","school","giji","elegant","apartment","kid"]},{"_id":"c10","order":17,"name":"ゾーイ","tag_ids":["animal","travel","animal","school","giji","apartment","kid"]},{"_id":"c70","order":18,"name":"パティ","tag_ids":["animal","school","giji","servant","apartment","young"]},{"_id":"c56","order":19,"name":"ゴドウィン","tag_ids":["animal","school","giji","guild","market","middle"]},{"_id":"c07","order":20,"name":"ティモシー","tag_ids":["animal","school","giji","guild","elder"]},{"_id":"c41","order":21,"name":"ヤニク","tag_ids":["animal","school","giji","immoral","river","young","pair"]},{"_id":"c58","order":22,"name":"ブルーノ","tag_ids":["animal","school","giji","ecclesia","middle","elder"]},{"_id":"c17","order":23,"name":"ユリシーズ","tag_ids":["animal","school","giji","market","middle"]},{"_id":"c39","order":24,"name":"シビル","tag_ids":["animal","school","giji","servant","guild","middle"]},{"_id":"c40","order":25,"name":"ハワード","tag_ids":["animal","school","giji","servant","elder"]},{"_id":"c65","order":26,"name":"ズリエル","tag_ids":["animal","school","giji","immoral","middle"]},{"_id":"c59","order":27,"name":"ムパムピス","tag_ids":["animal","school","giji","ecclesia","young"]},{"_id":"c57","order":28,"name":"ツェツィーリヤ","tag_ids":["animal","school","giji","ecclesia","young","middle"]},{"_id":"c04","order":29,"name":"ノーリーン","tag_ids":["animal","animal","school","giji","servant","middle"]},{"_id":"c46","order":30,"name":"ゲイル","tag_ids":["animal","school","giji","apartment","medical","young","middle"]},{"_id":"c14","order":31,"name":"レティーシャ","tag_ids":["animal","school","giji","ecclesia","kid"]},{"_id":"c42","order":33,"name":"ラルフ","tag_ids":["animal","school","giji","servant","young"]},{"_id":"c37","order":34,"name":"セシル","tag_ids":["animal","school","giji","market","young","pair"]},{"_id":"c75","order":35,"name":"ビリー","tag_ids":["animal","school","giji","market","middle","pair"]},{"_id":"c32","order":36,"name":"オスカー","tag_ids":["animal","school","giji","apartment","kid","pair"]},{"_id":"c33","order":37,"name":"ホリー","tag_ids":["animal","school","giji","apartment","kid","pair"]},{"_id":"c02","order":38,"name":"アルフレッド","tag_ids":["animal","animal","school","giji","government","middle"]},{"_id":"c66","order":39,"name":"クリストファー","tag_ids":["animal","school","giji","servant","guild","farm","middle"]},{"_id":"c24","order":41,"name":"ナタリア","tag_ids":["animal","school","giji","government","apartment","elder"]},{"_id":"c79","order":42,"name":"マーゴ","tag_ids":["animal","school","giji","government","apartment","young"]},{"_id":"c61","order":43,"name":"ヌマタロウ","tag_ids":["animal","school","giji","river","farm","elder"]},{"_id":"c23","order":44,"name":"チャールズ","tag_ids":["animal","school","giji","ecclesia","middle"]},{"_id":"c28","comment":"","name":"ケイト","order":47,"tag_ids":["animal","school","giji","apartment","young"]},{"_id":"c68","order":48,"name":"ヨアヒム","tag_ids":["animal","school","giji","market","immoral","elegant","middle","elder"]},{"_id":"c30","order":49,"name":"フィリップ","tag_ids":["animal","school","giji","road","river","market","young"]},{"_id":"c21","order":50,"name":"ニール","tag_ids":["animal","school","giji","farm","guild","young","middle"]},{"_id":"c52","order":52,"name":"ギリアン","tag_ids":["animal","school","giji","medical","ecclesia","young"]},{"_id":"c51","order":53,"name":"ヨーランダ","tag_ids":["animal","school","giji","medical","ecclesia","young"]},{"_id":"c01","comment":"","name":"メアリー","order":55,"tag_ids":["animal","animal","school","giji","market","road","young"]},{"_id":"c69","order":56,"name":"ギネス","tag_ids":["animal","school","giji","guild","market","middle"]},{"_id":"c63","order":57,"name":"ピッパ","tag_ids":["animal","school","giji","guild","young"]},{"_id":"c05","order":59,"name":"キャサリン","tag_ids":["animal","animal","school","giji","medical","young"]},{"_id":"c22","order":60,"name":"ワット","tag_ids":["animal","school","giji","farm","middle"]},{"_id":"c62","order":61,"name":"ヴェラ","tag_ids":["animal","school","giji","immoral","river","middle"]},{"_id":"c13","order":62,"name":"ロミオ","tag_ids":["animal","school","giji","medical","elder"]},{"_id":"c18","order":63,"name":"エマ","tag_ids":["animal","school","giji","medical","elder"]},{"_id":"c27","order":65,"name":"リンダ","tag_ids":["animal","school","giji","farm","young"]},{"_id":"c08","order":66,"name":"ベネット","tag_ids":["animal","school","giji","guild","young"]},{"_id":"c19","order":67,"name":"タバサ","tag_ids":["animal","school","giji","immoral","market","young"]},{"_id":"c71","order":70,"name":"ノックス","tag_ids":["animal","school","giji","road","farm","young"]},{"_id":"c03","order":71,"name":"スティーブン","tag_ids":["animal","animal","school","giji","medical","middle"]},{"_id":"c43","order":72,"name":"ガストン","tag_ids":["animal","school","giji","farm","middle"]},{"_id":"c15","order":73,"name":"ウェーズリー","tag_ids":["animal","school","giji","government","road","middle"]},{"_id":"c54","order":75,"name":"ザック","tag_ids":["animal","school","giji","guild","medical","young"]},{"_id":"c25","order":77,"name":"ルーカス","tag_ids":["animal","school","giji","elegant","young"]},{"_id":"c20","order":79,"name":"グロリア","tag_ids":["animal","school","giji","elegant","young"]},{"_id":"c72","order":81,"name":"ヴェスパタイン","tag_ids":["animal","school","giji","guild","young"]},{"_id":"c73","order":900.195,"name":"ローズマリー","tag_ids":["animal","school","giji","immoral","market","young"]},{"_id":"c47","order":21.1,"name":"ペラジー","tag_ids":["animal","school","giji","ecclesia","river","young","pair"]},{"_id":"c80","order":87,"name":"テッド","tag_ids":["animal","school","giji","road","apartment","young"]},{"_id":"c96","name":"レオナルド","comment":"2011/12/11","order":89,"tag_ids":["animal","school","giji","government","ecclesia","middle"]},{"_id":"c95","name":"モリス","comment":"2011/12/11","order":91,"tag_ids":["animal","school","giji","guild","road","young"]},{"_id":"c97","name":"ジェフ","comment":"2011/12/14 超常現象はあるんだ…","order":93,"tag_ids":["animal","school","giji","government","river","young","middle"]},{"_id":"c98","name":"オズワルド","comment":"2011/12/29 この髭はぜったいワックス使ってる。","order":95,"tag_ids":["animal","school","giji","immoral","river","middle"]},{"_id":"c100","name":"グレッグ","comment":"2012/12/30 スポーツ系中学生くらいに見える","order":97,"tag_ids":["animal","school","giji","guild","young"]},{"_id":"c101","name":"クラリッサ","comment":"2011/12/30 美人さん♪","order":99,"tag_ids":["animal","school","giji","servant","apartment","young"]},{"_id":"c90","name":"ケヴィン","comment":"2011/12/06","order":125.2,"tag_ids":["animal","school","giji","government","river","farm","young"]},{"_id":"c88","name":"ピエール","order":125.8,"comment":"2011/12/05","tag_ids":["animal","school","giji","servant","market","middle"]},{"_id":"c89","name":"カトリーナ","comment":"2011/12/06","order":900.128,"tag_ids":["animal","school","giji","apartment","young"]},{"_id":"c84","name":"ブレンダ","order":900.129,"comment":"2011/12/05","tag_ids":["animal","school","giji","apartment","middle"]},{"_id":"c85","name":"ハナ","order":900.13,"comment":"2011/12/05","tag_ids":["animal","school","giji","road","servant","kid"]},{"_id":"c91","comment":"2011/12/06 姦しい奥様♪","name":"ドロシー","order":900.143,"tag_ids":["animal","school","giji","river","servant","middle"]},{"_id":"c92","comment":"2011/12/06 姦し娘ーず♪","name":"セレスト","order":900.144,"tag_ids":["animal","school","giji","river","servant","young"]},{"_id":"c93","comment":"2011/12/06 えー○○が許されるのは小学生までだよねー♪","name":"ベッキー","order":900.145,"tag_ids":["animal","school","giji","river","servant","young"]},{"_id":"c78","order":900.15,"name":"ネイサン","tag_ids":["animal","school","giji","market","middle"]},{"_id":"c82","order":900.148,"name":"ロビン","tag_ids":["animal","school","giji","servant","kid"]},{"_id":"c94","name":"ダーラ","comment":"2011/12/11","order":900.17,"tag_ids":["animal","school","giji","elegant","immoral","market","middle"]},{"_id":"c64","order":900.185,"name":"ヘクター","tag_ids":["animal","school","giji","immoral","middle"]},{"_id":"c81","order":900.19,"name":"サイラス","tag_ids":["animal","school","giji","medical","guild","farm","young"]},{"_id":"c67","order":900.2,"name":"ソフィア","tag_ids":["animal","school","giji","guild","young","pair"]},{"_id":"c76","order":900.202,"name":"ジョージ","tag_ids":["animal","school","giji","apartment","kid","pair"]},{"_id":"c60","order":900.197,"name":"ポーチュラカ","tag_ids":["animal","school","giji","elegant","kid"]},{"_id":"c87","name":"エリアス","order":900.217,"comment":"2011/12/05","tag_ids":["animal","school","giji","elegant","medical","young"]},{"_id":"c45","order":900.222,"name":"プリシラ","tag_ids":["animal","school","giji","immoral","young"]},{"_id":"c48","order":900.228,"name":"ビアンカ","tag_ids":["animal","school","giji","elegant","middle","elder"]},{"_id":"c86","name":"ホレーショー","order":900.233,"comment":"2011/12/05","tag_ids":["animal","school","giji","immoral","apartment","middle"]},{"_id":"c83","order":900.24,"name":"アイリス","tag_ids":["marchen","animal","school","giji","road","medical","market","young"]},{"_id":"c31","order":900.25,"name":"ネル","tag_ids":["animal","school","giji","guild","apartment","young"]},{"_id":"c99","order":900.26,"name":"サイモン","tag_ids":["animal","school","giji","apartment","young","middle","pair"]},{"order":10001,"name":"露蝶","comment":"中国女性名","_id":"g01","tag_ids":["asia"]},{"order":900.215,"name":"志偉","comment":"台湾男性名 越南の名前も探したかったが、見つからぬ…","_id":"g02","tag_ids":["asia"]},{"order":10003,"name":"芙蓉","comment":"里帰り","_id":"g03","tag_ids":["asia"]},{"order":10004,"name":"沼太郎","comment":"里帰り","_id":"gc61","tag_ids":["asia"]},{"name":"デメテル","comment":"阿片窟からきました","order":900.213,"_id":"mad01","tag_ids":["marchen"]},{"name":"エルゴット","comment":"阿片窟からきました","order":900.27,"_id":"mad02","tag_ids":["marchen"]},{"name":"シーシャ","comment":"阿片窟からきました","order":900.22,"_id":"mad03","tag_ids":["marchen"]},{"name":"ドリベル","comment":"阿片窟からきました","order":20004,"_id":"mad04","tag_ids":["marchen"]},{"name":"ヤヘイ","comment":"阿片窟からきました","order":900.28,"_id":"mad05","tag_ids":["marchen"]},{"name":"アヤワスカ","comment":"阿片窟からきました","order":900.236,"_id":"mad06","tag_ids":["marchen"]},{"name":"チアキ","comment":"時をかける少女","order":30001,"_id":"t01","tag_ids":["travel"]},{"name":"リッキィ","comment":"夏への扉","order":30002,"_id":"t02","tag_ids":["travel"]},{"name":"ミナカタ","comment":"ー仁ー","order":900.156,"_id":"t03","tag_ids":["travel"]},{"name":"カイル","comment":"サラ・コナー・クロニクルズ","order":30004,"_id":"t04","tag_ids":["travel"]},{"name":"ジェニファー","comment":"バック・トゥ・ザ・フューチャー","order":30005,"_id":"t05","tag_ids":["travel"]},{"_id":"m99","order":70000.01,"name":"パルック","tag_ids":["myth"]},{"_id":"m06","order":70000.21,"name":"リリンラ","tag_ids":["myth"]},{"_id":"m03","order":70000.22,"name":"トノサマ","tag_ids":["myth"]},{"_id":"m05","order":70000.23,"name":"ナナコロ","tag_ids":["myth"]},{"_id":"m15","order":70000.24,"name":"ミソチャ","tag_ids":["myth"]},{"_id":"m07","order":70000.11,"name":"アリス","tag_ids":["myth"]},{"_id":"r30","order":70000.31,"name":"トリ","tag_ids":["myth"]},{"_id":"m01","order":70001,"name":"ケムシ","tag_ids":["myth"]},{"_id":"m02","order":70002,"name":"ポプラ","tag_ids":["myth"]},{"_id":"m04","order":70004,"name":"アオイ","tag_ids":["myth"]},{"_id":"b44","comment":"","name":"ドナルド","order":70007.9,"tag_ids":["myth"]},{"_id":"m08","order":70008,"name":"おっぱい","tag_ids":["myth"]},{"_id":"m09","order":70009,"name":"カミジャー","tag_ids":["myth"]},{"_id":"r12","order":12,"name":"バーナバス","tag_ids":[]},{"_id":"b49","comment":"","name":"ボリス","order":70008.1,"tag_ids":["myth"]},{"_id":"m10","order":70010,"name":"アチャポ","tag_ids":["myth"]},{"_id":"m12","comment":"","name":"トルニトス","order":70012,"tag_ids":["myth","pair"]},{"_id":"m11","order":70011,"name":"ライトニング","tag_ids":["myth","pair"]},{"_id":"m13","order":70000.12,"name":"ミケ","tag_ids":["myth"]},{"_id":"m14","order":70014,"name":"カリュクス","tag_ids":["myth"]},{"_id":"sf01","order":80000,"name":"ラッシード","comment":"りしあさん＆かれやなぎさん","tag_ids":["stratos"]},{"_id":"sf02","order":80001,"name":"エスペラント","comment":"ふらぅさん＆かれやなぎさん","tag_ids":["stratos"]},{"_id":"sf03","order":80002,"name":"ピート","comment":"たるっとさん＆りちゃさん","tag_ids":["stratos"]},{"_id":"sf04","order":80003,"name":"アシモフ","comment":"あすたん＆りりんら","tag_ids":["stratos"]},{"_id":"sf05","order":80004,"name":"モナリザ","comment":"ななころび＆りりんら","tag_ids":["stratos"]},{"_id":"sf06","order":80005,"name":"ワレンチナ","comment":"まりもさん＆あずまさん","tag_ids":["stratos"]},{"_id":"sf07","order":80007,"name":"ヤンファ","comment":"りしあさん＆はむおくん","tag_ids":["stratos"]},{"_id":"sf08","order":80008,"name":"ＰＪ","comment":"りしあさん＆ふらぅさん","tag_ids":["stratos"]},{"_id":"sf09","order":80009,"name":"キリシマ","comment":"ななころび＆ふらぅさん","tag_ids":["stratos"]},{"_id":"sf10","order":80010,"name":"ナユタ","comment":"かれやなぎさん＆かいさん","tag_ids":["stratos"]},{"_id":"sf11","order":80011,"name":"イワノフ","comment":"かれやなぎさん＆りちゃさん","tag_ids":["stratos"]},{"order":80012,"name":"†ルシフェル†","comment":null,"_id":"sf12","tag_ids":["stratos"]},{"order":80013,"name":"トルドヴィン","comment":null,"_id":"sf13","tag_ids":["stratos"]},{"order":80014,"name":"玖休","comment":null,"_id":"sf18","tag_ids":["stratos","pair"]},{"order":80015,"name":"参休","comment":null,"_id":"sf19","tag_ids":["stratos","pair"]},{"order":80016,"name":"クリスマス","comment":null,"_id":"sf14","tag_ids":["stratos"]},{"order":80017,"name":"ジェームス","comment":null,"_id":"sf15","tag_ids":["stratos"]},{"order":80018,"name":"ライジ","comment":null,"_id":"sf16","tag_ids":["stratos"]},{"order":80019,"name":"ジャック","comment":null,"_id":"sf17","tag_ids":["stratos"]},{"_id":"w05","order":90001,"name":"定吉","comment":"ぷえるとりこの旅人　エージ―エー","tag_ids":["shoji"]},{"_id":"w21","order":90002,"name":"鉄平","comment":"日本の伝統　熊木彫","tag_ids":["shoji"]},{"_id":"w22","order":90003,"name":"竹三","comment":"雪国の風雅　熊木彫","tag_ids":["shoji"]},{"_id":"w36","order":90004,"name":"ウト","tag_ids":["shoji"]},{"_id":"w16","order":90005,"name":"勢","comment":"ぶたさん印の　あおいジンギスカン","tag_ids":["shoji"]},{"_id":"w18","order":90006,"name":"菊","tag_ids":["shoji"]},{"_id":"w26","order":90007,"name":"勝丸","tag_ids":["shoji"]},{"_id":"w35","comment":"","name":"奈須麿","order":90008,"tag_ids":["shoji"]},{"_id":"w24","order":90009,"name":"辰次","comment":"桃源郷ぐた国のめぐみ　ふらう乳業","tag_ids":["shoji"]},{"_id":"w37","order":90010,"name":"芙蓉","tag_ids":["shoji"]},{"_id":"w29","order":90011,"name":"志乃","tag_ids":["shoji"]},{"_id":"w20","order":90012,"name":"藤之助","tag_ids":["shoji"]},{"_id":"w31","order":90013,"name":"日向","tag_ids":["shoji"]},{"_id":"w12","order":90014,"name":"おみつ","comment":"道を外して60年　GEDOU協会","tag_ids":["shoji"]},{"_id":"w10","order":90015,"name":"博史","tag_ids":["shoji"]},{"_id":"w25","order":90016,"name":"法泉","tag_ids":["shoji"]},{"_id":"w09","order":90017,"name":"チャールズ","comment":"チャールズ派遣ならおまかせ　O-ririn","tag_ids":["shoji"]},{"_id":"w30","order":90018,"name":"雪代","tag_ids":["shoji"]},{"_id":"w14","order":90019,"name":"華月斎","comment":"めげないゼラチン作り　MEGEゼラチン","tag_ids":["shoji"]},{"_id":"w13","order":90020,"name":"たまこ","comment":"世界の道をつなぐ　議事国地図","tag_ids":["shoji"]},{"_id":"w11","order":90021,"name":"沼太郎","tag_ids":["shoji"]},{"_id":"w03","order":90022,"name":"朔","comment":"新しい議事をつくる　たき学会","tag_ids":["shoji"]},{"_id":"w34","order":90023,"name":"余四朗","tag_ids":["shoji"]},{"_id":"w27","order":90024,"name":"源蔵","tag_ids":["shoji"]},{"_id":"w28","order":90025,"name":"甚六","tag_ids":["shoji"]},{"_id":"w17","order":90026,"name":"雷門","comment":"輝く月に未来を託す　暁月商事","tag_ids":["shoji"]},{"_id":"w39","comment":"","name":"沙耶","order":90027,"tag_ids":["shoji"]},{"_id":"w08","order":90028,"name":"朝顔","tag_ids":["shoji","pair"]},{"_id":"w43","order":90029,"name":"春松","tag_ids":["shoji"]},{"_id":"w07","order":90030,"name":"夕顔","tag_ids":["shoji","pair"]},{"_id":"w40","order":90031,"name":"朧","tag_ids":["shoji"]},{"_id":"w33","comment":"","name":"団十郎","order":90032,"tag_ids":["shoji"]},{"_id":"w23","order":90033,"name":"仁右衛門","tag_ids":["shoji"]},{"_id":"w04","order":90034,"name":"小鈴","comment":"お口の愛人　タルッティ・タルット","tag_ids":["shoji"]},{"_id":"w06","order":90035,"name":"ゆり","comment":"道を外して60年　GEDOU協会","tag_ids":["shoji"]},{"_id":"w38","comment":"","name":"一平太","order":90037,"tag_ids":["shoji"]},{"_id":"w01","order":90038,"name":"鏡花","comment":"輝く月に未来を託す　暁月商事","tag_ids":["shoji"]},{"_id":"w15","order":90039,"name":"八重","comment":"桃源郷ぐた国のめぐみ　ふらう乳業","tag_ids":["shoji"]},{"_id":"w32","order":90040,"name":"明之進","tag_ids":["shoji"]},{"_id":"w02","order":90041,"name":"慶三郎","comment":"カメラのことなら　MISEKI","tag_ids":["shoji"]},{"_id":"w44","name":"雪客","comment":"りりんラハウス呑んだくれ大会","order":90042,"tag_ids":["shoji"]},{"_id":"w45","name":"亀吉","comment":"りりんラハウス呑んだくれ大会","order":90043,"tag_ids":["shoji"]},{"_id":"w46","name":"梅子","order":90044,"comment":"お誕生日記念☆","tag_ids":["shoji"]},{"face_id":"w47","name":"置壱","comment":"日本の美徳強化月間","order":90045,"_id":"w47","tag_ids":["shoji"]},{"face_id":"all","name":"パルック","order":99999,"_id":"all","tag_ids":["god"]},{"_id":"g04","name":"攻芸","comment":"台湾男性名","order":10005,"tag_ids":["asia"]},{"_id":"g05","name":"麻雀","comment":"中国女性名","order":900.175,"tag_ids":["asia"]},{"_id":"g06","name":"黍炉","comment":"ダリダイ・オッチギン","order":10007,"tag_ids":["asia"]},{"_id":"mad07","name":"ダイミ","comment":"阿片窟からきました","order":20007,"tag_ids":["marchen"]},{"_id":"mad08","name":"エフェドラ","comment":"阿片窟からきました","order":20008,"tag_ids":["marchen"]},{"_id":"t06","name":"サミュエル","comment":"トランスフォーマー","order":30006,"tag_ids":["travel"]},{"_id":"t07","name":"アカリ","comment":"時をかける少女","order":30019,"tag_ids":["travel"]},{"_id":"t08","name":"ミルフィ","comment":"海賊戦隊ゴーカイジャー","order":900.224,"tag_ids":["travel"]},{"_id":"t09","name":"ゴロウ","comment":"時をかける少女","order":30009,"tag_ids":["travel"]},{"_id":"t10","name":"トレイル","comment":"ゼルダの伝説 ムジュラの仮面","order":30010,"tag_ids":["travel"]},{"_id":"t11","name":"マドカ","comment":"宇宙戦艦ヤマモト・ヨーコ","order":30019,"tag_ids":["travel"]},{"_id":"t12","name":"フランク","comment":"オーロラの彼方へ","order":30012,"tag_ids":["travel"]},{"_id":"t13","name":"ジャニス","comment":"フラッシュフォワード","order":30013,"tag_ids":["travel"]},{"_id":"c105","comment":"年末カウントダウン♪","name":"シメオン","order":82,"tag_ids":["animal","school","giji","apartment","ecclesia","young"]},{"_id":"c104","comment":"年末カウントダウン♪","name":"ヒュー","order":89,"tag_ids":["animal","school","giji","medical","young"]},{"_id":"c106","comment":"年末カウントダウン♪","name":"ワンダ","order":90,"tag_ids":["animal","school","giji","river","guild","middle"]},{"_id":"c108","name":"ブローリン","comment":"年末カウントダウン♪","order":91,"tag_ids":["animal","school","giji","farm","young","middle"]},{"_id":"c109","name":"ラディスラヴァ","comment":"年末カウントダウン♪","order":900.18,"tag_ids":["animal","school","giji","apartment","young"]},{"_id":"c102","comment":"年末カウントダウン♪","name":"ウォーレン","order":900.155,"tag_ids":["animal","school","giji","market","elder"]},{"_id":"c107","name":"イヴォン","comment":"年末カウントダウン♪","order":900.205,"tag_ids":["animal","school","giji","elegant","middle","elder"]},{"_id":"c103","comment":"年末カウントダウン♪","name":"ナンシー","order":900.234,"tag_ids":["animal","school","giji","apartment","young","pair"]},{"_id":"t14","name":"クシャミ","comment":"吾輩は猫である。","order":30014,"tag_ids":["travel"]},{"_id":"t15","name":"ガーディ","comment":"ベイカー街少年探偵団","order":30015,"tag_ids":["travel"]},{"_id":"sf20","name":"ティソ","comment":null,"order":80020,"tag_ids":["stratos"]},{"_id":"g07","name":"ジリヤ","comment":"ロシア女性名","order":10008,"tag_ids":["asia"]},{"_id":"t16","name":"アラン","comment":"映画監督たちの共用偽名","order":30016,"tag_ids":["travel"]},{"_id":"w48","name":"直円","comment":"和算復活月間","order":90048,"tag_ids":["shoji"]},{"_id":"w49","name":"錠","comment":"ポルトガル人にジオゴっているんだぜ。へー。かっこいー。","order":90049,"tag_ids":["shoji"]},{"_id":"w50","name":"丁助","comment":"負けるたびに追い博打","order":90050,"tag_ids":["shoji"]},{"_id":"t17","name":"ススム","comment":"おもいっきり探偵団 覇悪怒組","order":30018,"tag_ids":["travel"]},{"_id":"t18","name":"マユミ","comment":"まんがはじめて物語（二代目）","order":30018,"tag_ids":["travel"]},{"_id":"c110","name":"リー","comment":"","order":92,"tag_ids":["giji","immoral","apartment","young"]},{"_id":"t19","name":"ハルカ","comment":"はるかリフレイン","order":30017,"tag_ids":["travel"]},{"_id":"w51","name":"鬼丞","comment":"リニューアル記念！","order":90051,"tag_ids":["shoji"]},{"_id":"w52","name":"櫻子","comment":"リニューアル記念！","order":90052,"tag_ids":["shoji"]},{"_id":"c111","name":"スージー","comment":"リニューアル記念！ 弟がいるという噂が…","order":900.165,"tag_ids":["giji","apartment","elegant","immoral","young"]},{"_id":"c113","name":"ジェレミー","comment":"リニューアル記念！","order":900.2308,"tag_ids":["giji","apartment","immoral","young","middle"]},{"_id":"c112","name":"ニコラス","comment":"！？","order":112,"tag_ids":["giji","elegant","young"]},{"_id":"m16","name":"アーサー","comment":"円卓の騎士","order":70016,"tag_ids":["myth"]},{"_id":"t20","name":"エリ","comment":"英国情報局秘密組織チェラブ (CHERUB)","order":30022,"tag_ids":["travel"]},{"_id":"g08","name":"イワン","comment":"Иван-дурак","order":10009,"tag_ids":["asia"]},{"_id":"c114","name":"モンド","comment":"８８件のご応募、ありがとう。そして、ありがとう。","order":114,"tag_ids":["giji","government","immoral","middle"]},{"_id":"m18","name":"ミーム","comment":"インターネット・ミームから。 えんいー","order":70018,"tag_ids":["myth"]},{"_id":"m19","name":"タルト","comment":"https://twitter.com/7korobi/status/510069062974447617","order":70019,"tag_ids":["myth","pair"]},{"_id":"m20","name":"ショコラ","comment":"https://twitter.com/noa_marimo/status/510100541536358400","order":70020,"tag_ids":["myth","pair"]},{"_id":"c115","name":"マリオ","comment":"じつは、牧場育ちらしいよ。","order":115,"tag_ids":["giji","guild","road","kid"]},{"_id":"t21","name":"トシミ","comment":"代紋TAKE2","order":30019,"tag_ids":["travel"]},{"_id":"t22","name":"ケイイチ","comment":"ひぐらしのなく頃に","order":30021,"tag_ids":["travel"]},{"_id":"w53","name":"おもん","comment":"三拾糎程の「もふもふねこひよこ」　せんいち","order":90053,"tag_ids":["shoji"]},{"_id":"sf021","name":"アンタレス","comment":"","order":80022,"tag_ids":["stratos"]},{"_id":"sf023","name":"エフ","comment":"","order":80023,"tag_ids":["stratos"]},{"_id":"sf024","name":"アイライト","comment":"","order":80024,"tag_ids":["stratos"]},{"_id":"sf025","name":"アマルテア","comment":"","order":80006,"tag_ids":["stratos"]},{"_id":"sf026","name":"ポーラ","comment":"","order":80026,"tag_ids":["stratos"]},{"_id":"sf022","name":"チェビイ","comment":"","order":80027,"tag_ids":["stratos"]},{"_id":"sf027","name":"モスキート","comment":"","order":80028,"tag_ids":["stratos"]},{"_id":"sf032","name":"ワクラバ","comment":"","order":80029,"tag_ids":["stratos"]},{"_id":"sf028","name":"コータ","comment":"","order":80030,"tag_ids":["stratos"]},{"_id":"sf029","name":"ミツボシ","comment":"","order":80031,"tag_ids":["stratos"]},{"_id":"sf030","name":"クレパスキュール","comment":"","order":80032,"tag_ids":["stratos"]},{"_id":"sf031","name":"シルク","comment":"","order":80033,"tag_ids":["stratos"]},{"_id":"t23","name":"ナナオ","comment":"","order":30023,"tag_ids":["travel"]},{"_id":"t24","name":"キルロイ","comment":"「キルロイここに現る」","order":30024,"tag_ids":["travel"]},{"_id":"t25","name":"ミサキ","comment":"","order":30025,"tag_ids":["travel"]},{"_id":"t26","name":"アツタネ","comment":"平田篤胤","order":30026,"tag_ids":["travel"]},{"_id":"t27","name":"みょんこ","comment":"","order":30027,"tag_ids":["travel"]},{"_id":"t28","name":"リツ","comment":"","order":30028,"tag_ids":["travel"]},{"_id":"t29","name":"ヒナコ","comment":"","order":30020,"tag_ids":["travel"]},{"_id":"t30","name":"ワタヌキ","comment":"四月朔日","order":30030,"tag_ids":["travel"]},{"_id":"t31","name":"ホウイチ","comment":"","order":900.158,"tag_ids":["travel"]},{"_id":"t32","name":"トヨタ","comment":"洋画の日本人名","order":30032,"tag_ids":["travel"]},{"_id":"t33","name":"エツコ","comment":"","order":30033,"tag_ids":["travel"]},{"_id":"t34","name":"ドン","comment":"","order":17.1,"tag_ids":["travel"]},{"_id":"c116","name":"メルヤ","comment":"","order":116,"tag_ids":["giji","medical","immoral","young"]},{"_id":"c117","name":"ルパート","comment":"","order":117,"tag_ids":["giji","road","guild","elder"]},{"_id":"c118","name":"ユージン","comment":"","order":900.2306,"tag_ids":["giji","river","young","middle"]},{"_id":"c119","name":"オーレリア","comment":"","order":900.21,"tag_ids":["giji","ecclesia","young"]},{"_id":"c120","name":"ノア","comment":"","order":120,"tag_ids":["giji","servant","young","middle"]},{"_id":"t35","name":"イスルギ","comment":"","order":900.208,"tag_ids":["travel"]},{"_id":"c121","name":"ブッカ","comment":"ブッカ・ホワイト氏から。","order":900.159,"tag_ids":["giji","farm"]},{"_id":"mad09","name":"カナビス","comment":"ウパニシャッドの精神で","order":20009,"tag_ids":["marchen"]},{"_id":"mad10","name":"ルグレ","comment":"後悔あとをたたず","order":900.2302,"tag_ids":["marchen"]},{"_id":"mad11","name":"オルギア","comment":"ええじゃないかええじゃないかー！","order":900.2304,"tag_ids":["marchen"]},{"_id":"sf033","name":"イースター","comment":null,"order":80033,"tag_ids":["stratos"]},{"_id":"sf034","name":"アニュ","order":80034,"tag_ids":["stratos"]},{"_id":"sf035","name":"キャンディ","comment":null,"order":80035,"tag_ids":["stratos"]},{"_id":"sf036","name":"キカ","order":80036,"tag_ids":["stratos"]},{"_id":"sf037","name":"バンアレン","order":80037,"tag_ids":["stratos"]},{"_id":"sf038","name":"パラチーノ","order":80038,"tag_ids":["stratos"]},{"_id":"t36","name":"イルマ","comment":"","order":30036,"tag_ids":["travel"]},{"_id":"t37","name":"シュンタロ","comment":"","order":30009,"tag_ids":["travel"]},{"_id":"t38","name":"スズキ","comment":"","order":30038,"tag_ids":["travel"]},{"_id":"t39","name":"ガモウ","comment":"","order":30018.1,"tag_ids":["travel"]},{"_id":"c122","name":"フローラ","comment":"","order":900.226,"tag_ids":["giji","young","market"]},{"_id":"c123","name":"フェルゼ","comment":"かかとって意味らしい　フェチっぽいね！","order":123,"tag_ids":["giji","young","guild"]},{"_id":"c124","name":"セイルズ","comment":"","order":124,"tag_ids":["giji","middle","government"]},{"_id":"c125","name":"ピスティオ","comment":"","order":125,"tag_ids":["giji","young","servant"]},{"_id":"t40","name":"マスタ","comment":"","order":30039,"tag_ids":["travel"]},{"_id":"w54","name":"舷之丈","comment":"","order":90054,"tag_ids":["shoji"]},{"_id":"t41","name":"アオ","comment":"","order":30041,"tag_ids":["travel"]},{"_id":"t42","name":"レン","comment":"","order":30042,"tag_ids":["travel"]},{"_id":"t43","name":"こころ","comment":"","order":30043,"tag_ids":["travel"]},{"_id":"t44","name":"ナツミ","comment":"","order":30044,"tag_ids":["travel"]},{"_id":"t45","name":"クロエ","comment":"","order":30018.1,"tag_ids":["travel"]},{"_id":"t46","name":"サダミツ","comment":"","order":30046,"tag_ids":["travel"]},{"_id":"t47","name":"ノッカ","comment":"","order":30047,"tag_ids":["travel"]},{"_id":"t48","name":"Ａ","comment":"","order":30048,"tag_ids":["travel"]},{"_id":"t49","name":"Ａ","comment":"","order":30049,"tag_ids":["travel"]},{"_id":"t50","name":"ヨスガ","comment":"","order":30050,"tag_ids":["travel","pair"]},{"_id":"t51","name":"エニシ","comment":"","order":30051,"tag_ids":["travel","pair"]},{"_id":"t52","name":"ニトカ","comment":"","order":30052,"tag_ids":["travel"]},{"_id":"t53","name":"ツヅラ","comment":"","order":900.16,"tag_ids":["travel"]},{"_id":"t54","name":"ウツギ","comment":"","order":30054,"tag_ids":["travel"]},{"_id":"t55","name":"セイカ","comment":"","order":30055,"tag_ids":["travel"]},{"_id":"t56","name":"ヤスリ","comment":"","order":30056,"tag_ids":["travel"]},{"_id":"t57","name":"はのん","comment":"","order":30057,"tag_ids":["travel"]},{"_id":"t58","name":"シンイチ","comment":"","order":30058,"tag_ids":["travel"]},{"_id":"c126","name":"ロイエ","comment":"","order":126,"tag_ids":["giji","young","servant"]},{"_id":"w55","name":"網斎","comment":"","order":90055,"tag_ids":["shoji"]},{"_id":"mad12","name":"パカロロ","comment":"","order":900.235,"tag_ids":["marchen"]},{"_id":"t59","name":"メイ","comment":"","order":30059,"tag_ids":["travel"]},{"_id":"t60","name":"タツミ","comment":"","order":30060,"tag_ids":["travel"]},{"_id":"f000","name":"ロゴス","comment":"","order":60000,"tag_ids":["fable"]},{"_id":"f1","name":"ヨグラージ","comment":"凡ての哺乳類からの敬意をこめて。","order":60001,"tag_ids":["fable"]},{"_id":"f2","name":"アーサー","comment":"シリアスなりゅうきへい。コーラに乗るといい。","order":60002,"tag_ids":["fable"]},{"_id":"f3","name":"ロバート","comment":"使役されたりする、楽園ではない感を出したいな。という肩書。","order":60003,"tag_ids":["fable"]},{"_id":"f4","name":"ハラフ","comment":"エジプト人名 犬なので、不動産業をやらせたかった。","order":60004,"tag_ids":["fable"]},{"_id":"f5","name":"コーラ","comment":"植物の実とそこから作る炭酸飲料 オークションにかけると高値が付きそうな命に見えるので。","order":60005,"tag_ids":["fable"]},{"_id":"f6","name":"タイム","comment":"一応鸚鵡の産地パプワニューギニア人名 伝令的なところを考えていて、こやつは文字通りの飛ぶ脚なのでは、と。タイムリミット指定をする（速達）と高い運び賃がとれる職業なので。","order":60006,"tag_ids":["fable"]},{"_id":"f7","name":"タプル","comment":"幾何学、音楽用語でまとめたかった。 こいつには、？？？なんだこれ？？？と思ってほしい。","order":60007,"tag_ids":["fable"]},{"_id":"f8","name":"ソランジュ","comment":"（肩書）思春期の少女の身振り、態度又はユーモア","order":60008,"tag_ids":["fable"]},{"_id":"f9","name":"ヘリンヘイモ","comment":"フィンランド人名　品物を経る魔法、というのをやらせたかった。","order":60009,"tag_ids":["fable"]},{"_id":"f10","name":"ンゴティエク","comment":"アフリカ人名  虹を肩書にいれたかったところと神話の虹蛇から。","order":60010,"tag_ids":["fable"]},{"_id":"f11","name":"D.バルベルデ","comment":"スペイン人名  領地をもった貴族であってほしいので、龍伝承のある土地に封じた。","order":60011,"tag_ids":["fable"]},{"_id":"f12","name":"ソルフリッツィ","comment":"イタリア人名","order":60013,"tag_ids":["fable"]},{"_id":"fw01","name":"ツェン","comment":"中国人名から。","order":61001,"tag_ids":["fable"]},{"_id":"fw02","name":"ディ♪ジアン","comment":"帝江（ていこう di4jiang1 ディジアン）から。","order":61002,"tag_ids":["fable"]},{"_id":"fw03","name":"ヤツデ","comment":null,"order":61003,"tag_ids":["fable"]},{"_id":"c127","name":"ザーゴ","comment":null,"order":127,"tag_ids":["giji","young","guild"]},{"_id":"t61","name":"ムギタ","comment":null,"order":30061,"tag_ids":["travel"]},{"_id":"t62","name":"ヘイタロウ","comment":null,"order":30062,"tag_ids":["travel"]},{"_id":"t63","name":"ソウスケ","comment":null,"order":30063,"tag_ids":["travel"]},{"_id":"t64","name":"ユエ","comment":null,"order":30064,"tag_ids":["travel"]},{"_id":"t65","name":"カコ","comment":null,"order":30065,"tag_ids":["travel"]},{"_id":"t66","name":"ココア","comment":null,"order":30066,"tag_ids":["travel"]},{"_id":"t67","name":"マコト","comment":null,"order":30067,"tag_ids":["travel"]},{"_id":"t68","name":"ワカナ","comment":null,"order":30068,"tag_ids":["travel"]},{"_id":"t69","name":"ヤマト","comment":null,"order":30069,"tag_ids":["travel"]},{"_id":"c128","name":"ペトラ","comment":null,"order":128,"tag_ids":["giji","young","ecclesia"]},{"_id":"c129","name":"ヌヴィル","comment":null,"order":129,"tag_ids":["giji","middle","immoral"]},{"_id":"t70","name":"ニジノ","comment":null,"order":30070,"tag_ids":["travel"]},{"_id":"t71","name":"ワカバヤシ","comment":"ズッコケ時間旅行記から。","order":30071,"tag_ids":["travel"]},{"_id":"t72","name":"カガ","comment":"推理小説の主人公から","order":30072,"tag_ids":["travel"]},{"_id":"t73","name":"ワタル","comment":null,"order":30073,"tag_ids":["travel"]},{"_id":"t74","name":"フウタ","comment":"カミナリに対して風っぽく","order":30074,"tag_ids":["travel"]},{"_id":"t75","name":"ルリ","comment":"日本酒「瑠璃色の海」","order":30075,"tag_ids":["travel"]},{"_id":"f13","name":"ティム","comment":"冒険作家ティム・セヴェリン","order":60013,"tag_ids":["fable"]},{"_id":"f14","name":"インティJr","comment":"南米の太陽神「インティ」の息子、という意味のリングネーム","order":60014,"tag_ids":["fable"]},{"_id":"fw04","name":"ギョウブ","comment":"隠神刑部（ぎょうぶたぬき）","order":61004,"tag_ids":["fable"]},{"_id":"fw05","name":"イナリ","comment":"稲荷神社","order":61005,"tag_ids":["fable"]},{"_id":"w56","name":"大八郎","comment":"江戸時代の実業家からもじって。","order":90056,"tag_ids":["shoji"]},{"_id":"w57","name":"稲荷","comment":"稲荷神社","order":90057,"tag_ids":["shoji"]},{"_id":"sf039","name":"ハロウィン","comment":"おまつり","order":90057,"tag_ids":["stratos"]}]

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = [{"label":"和の国てやんでえ","face_id":"w17","say":["嗚呼、聞こえる。やつの足音が聞こえる……。","逃げろ。逃げろ！おまえらだけでも逃げろ。"]},{"label":"和の国てやんでえ（仁右衛門）","face_id":"w23","say":["なんと、これは奇っ怪……分かったゾ！","やっぱり人狼は実在するんだヨ！　うっひょひょーい！"]},{"label":"エクスパンション・セット「帰還者議事」","face_id":"c10","say":["M4ライフルを持ってさえいれば…、なーんて、思っててもしょうがないね。鍵かけとこう。","やっぱさ、銃を持った善人がいないとさ。\n\nちょっと出かけてくる！プリン食べちゃダメだよ！"]},{"label":"明後日への道標","face_id":"sf04","say":["とたたたたんっ。\n\n> めざましい速さで木の洞に駆け込むと、じっと潜んだ暗闇に瞳がふたつ。いちど大好きな閉所に収まると、そうかんたんに出てはこないのだ。","ちゅー！\n\n　ちゅー！\n\n> がりがり、がりがり。ケージの縁をひっかくと、うろうろ、うろうろ右へ左へ駆け回る。木の洞に目もくれず、夜中じゅう走り続けるのだった……"]},{"label":"明後日への道標（ナユタ）","face_id":"sf10","say":["f\\*ck！またチオチモリンと二酸化炭素分圧だし！\nエアコンがコンタミるしスタグるしf\\*ck'nオーロラの季節だし、ガルタイトもサクラダイトもf\\*ck'n高っけーし…\n\n> #### 同日 整備日誌\n> 　定期点検。ただちに健康に影響はないが、擦過痕…","よーf\\*ck'nおまえら。\nマジ聞け。エヴァってでかい１０円キズ見つけた。誰だし？\nマジ怒んねーから手ぇ挙げ\n\n###### ぷつん\n\nっと。瞬停った…。f\\*ck。\nちょっと外の様子見てくる。俺のプリン残しといてくれよ。"]},{"label":"人狼議事（キャサリン）","face_id":"c05","say":["たいへん、たいへん、たいへん！","大変、人狼が出たよ！　いつもは嘘だけど、今度は本当の本当に本当！"]},{"label":"人狼議事（ベネット）","face_id":"c08","say":["壁の向こうだ、やつの足音が聞こえる。いよいよ隣室に迫る。\n明日は、もう……","足音が部屋の前で止まった。そして、ドアノブがゆっくりと回る音が聞こえる。振り向いてはいけない、振り向けば\n\n> 日記はそこで途切れ、発見されるまで打ち捨てられていた。"]},{"label":"人狼議事（タバサ）","face_id":"c19","say":["ねぇ、遊んでかない？今夜はあなたが狼よ……","人狼なんているわけないじゃん？みんな大げさなのさ。"]},{"label":"人狼議事（ソフィア）","face_id":"c67","say":["こんばんわ、こんな遅くにたいへんですね。\n\n………\n行っちゃった。へんなの。","まさかあの時、あのひとが……？\n人殺しと一緒にいるなんて……！へや…、部屋に戻らせてもらいます！"]},{"label":"人狼議事（ヨアヒム）","face_id":"c68","say":["ふひ、ふひひ！人狼になど……くれてやるものかヨ！","人殺しと一緒にいるなんてごめんだヨ！へ…へっ、部屋に戻らせてもらうヨ！"]},{"label":"人狼議事（ヴェスパタイン）","face_id":"c72","say":["嗚呼、聞こえる。やつの足音が聞こえる……。","逃げろ。逃げろ！おまえらだけでも逃げろ。"]},{"label":"人狼議事（ヨーランダ）","face_id":"c51","say":["夜風に乗って、遠くから声がとどきます。昨夜は幽かに。今夜は響き。きっと明日は……","……あの、わたし。この騒ぎが落ち着いたら此処を出たいんです。\n幼馴染から手紙が来たの。お金を貯めたから、遠くで一緒に暮らそうって。"]},{"label":"人狼議事（グロリア）","face_id":"c20","say":["紳士ならびに淑女の皆様、わたくしの館へようこそ。\n世間の噂など唯の噂話、此処でひととき御寛ぎなさいな。","ちょっと！そこの貴方、何をしているの！\n聞いたでしょう人狼がいるのよ、はやく見つけて処刑なさい！"]},{"label":"人狼議事（オスカー）","face_id":"c32","say":["…そっちじゃないよ、こっちだよ。\nここ、秘密基地なんだ。雨もへいきだし暖かいよ。","ねえ。見て見て。パン持ってきたんだ。\nみんなにはナイショだよ？"]},{"label":"人狼議事","face_id":"c99","say":["嗚呼、聞こえ る。やつの足音が聞こえる……。","逃げろ。逃げろ！おまえらだけでも逃げろ。"]},{"label":"エクスパンション・セット「狂騒議事」","face_id":"c83","say":["どうせ、殺されるわみんな。…みんな\n\n\n~~死ねばいいのに~~","１人になるのゎ私ばっか。どっちの道ぉ選んでも、\n私ゎ十分です。明日も待っててね。お願いだから、\n離れて行かないで？\nいつまでも、\nなんで私ばっか\n\n> 日記はそこで途切れ、発見されるまで打ち捨てられていた。"]},{"label":"エクスパンション・セット「狂騒議事」（ヤヘイ）","face_id":"mad05","say":["…うん。もうな、だいぶまえだ。\n借家住まいでさ、天井板がずれて、開いているから入り込んでみたんだ。\n\n結構広くてさ。奥へ、奥へ、這い進んでたら明かりが切れてさ。\nもう右も左もわからなくってさあ…。\n\n必死に暴れたら、明るいとこに出た。\n知らない街だった。","…うん。そうだよ。\nまだ、その街から出られないんだ。おまえだって、そうなんだろう？\n\nあー、あっち。いや、こっちかも？\nそっちの先はまだ手繰ってないかもしれねえよ？\nウケッ、ウケッ、ウケコッ、ウコケ、ウコケ、ウヒャホ、コケコケコケ！"]},{"label":"エクスパンション・セット「大陸議事」","face_id":"g03","say":["まさか……これは……？\n\n真相が分かったわ！\n日が出たらすぐ、麓の皆に知らせないと！","飛車が…壊れてる……\n葛橋が…焼けてる……\n\n！　なんだ、猫か……。おどかさないでよ。\nん？"]},{"label":"とのさま広場","face_id":"m08","say":["じんろう？\nそんななまえのこ、いたかしら……","さあ、ぼうやたちいらっしゃい。ごはんのじかんよ。"]},{"label":"はおうの広場","face_id":"m05","say":["ママ？ママなの？\n…もう大丈夫なの？ここには人狼なんていないのかい？\n\n…そっかあ…\n\n\n人狼だって？！","誰にも、腰抜けなんて…言わせないぞっ"]},{"label":"人狼議事 ちゃんぷる","face_id":"all","say":["ちゃんとご注文通り、さまざまな人たちをお呼びしましたよ。\nいたるところから…そう、地平の果てや、宇宙の彼方からも。\n\n中には、主様を消してくださるような方もいらっしゃるかもしれません。","皆さまお集まりありがとうございます。えー、ごほん。\nこの催し物、しっかりと楽しんでくださいませ。\n\n…何があっても、文句は言いませんよう、ご了承くださいませ。"]}]

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./cs_all.yml": 68,
	"./cs_animal.yml": 69,
	"./cs_changed.yml": 70,
	"./cs_fable.yml": 71,
	"./cs_ger.yml": 72,
	"./cs_mad.yml": 73,
	"./cs_ririnra.yml": 74,
	"./cs_school.yml": 75,
	"./cs_sf.yml": 76,
	"./cs_time.yml": 77,
	"./cs_wa.yml": 78
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 67;

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"all","admin":"闇の呟き","maker":"天のお告げ","label":"人狼議事 ちゃんぷる"},"chr_npc":[{"label":"人狼議事 ちゃんぷる","csid":"all","face_id":"all","say_0":"ちゃんとご注文通り、さまざまな人たちをお呼びしましたよ。\nいたるところから…そう、地平の果てや、宇宙の彼方からも。\n\n中には、主様を消してくださるような方もいらっしゃるかもしれません。","say_1":"皆さまお集まりありがとうございます。えー、ごほん。\nこの催し物、しっかりと楽しんでくださいませ。\n\n…何があっても、文句は言いませんよう、ご了承くださいませ。"}],"chr_job":[{"face_id":"all","job":"かみさま"}]}

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"animal","admin":"大地の震動","maker":"草原のざわめき","label":"うきうきサバンナ"},"chr_npc":[{"label":"うきうきサバンナ","csid":"animal","face_id":"c99","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"こじか"},{"face_id":"c02","job":"よーくしゃーてりあ"},{"face_id":"c03","job":"かもすぞ"},{"face_id":"c04","job":"くろひょう"},{"face_id":"c05","job":"いとまきえい"},{"face_id":"c06","job":"へび"},{"face_id":"c07","job":"てのりぶんちょう"},{"face_id":"c08","job":"たぬき"},{"face_id":"c09","job":"にほんおおかみ"},{"face_id":"c10","job":"そまり"},{"face_id":"c11","job":"みけ"},{"face_id":"r12","job":"うえきばち"},{"face_id":"c13","job":"かたつむり"},{"face_id":"c14","job":"くらげ"},{"face_id":"c15","job":"しゃち"},{"face_id":"c16","job":"あふりかぞう"},{"face_id":"c17","job":"おらうーたん"},{"face_id":"c18","job":"かまきり"},{"face_id":"c19","job":"あげはちょう"},{"face_id":"c20","job":"とら"},{"face_id":"c21","job":"おおたこ"},{"face_id":"c22","job":"うちゅうせん"},{"face_id":"c23","job":"ぱんだ"},{"face_id":"c24","job":"ぶるどっぐ"},{"face_id":"c25","job":"うし"},{"face_id":"c26","job":"えりまきとかげ"},{"face_id":"c27","job":"ひつじ"},{"face_id":"c28","job":"うさぎ"},{"face_id":"c29","job":"しまうま"},{"face_id":"c30","job":"おうむ"},{"face_id":"c31","job":"かえる"},{"face_id":"c32","job":"きんぎょ"},{"face_id":"c33","job":"ねったいぎょ"},{"face_id":"c34","job":"すなねずみ"},{"face_id":"c35","job":"ごりら"},{"face_id":"c36","job":"さらぶれっど"},{"face_id":"c37","job":"ぺるしゃ"},{"face_id":"c38","job":"だいおういか"},{"face_id":"c39","job":"もみのき"},{"face_id":"c40","job":"らいおん"},{"face_id":"c41","job":"ろぶすたー"},{"face_id":"c42","job":"みつりょうしゃ"},{"face_id":"c43","job":"くまー"},{"face_id":"c44","job":"いわとびぺんぎん"},{"face_id":"c45","job":"はいえな"},{"face_id":"c46","job":"あらいぐま"},{"face_id":"c47","job":"しろまどうし"},{"face_id":"c48","job":"くじゃく"},{"face_id":"c49","job":"にほんざる"},{"face_id":"c50","job":"きつね"},{"face_id":"c51","job":"かげろう"},{"face_id":"c52","job":"ありじごく"},{"face_id":"c53","job":"やみふくろう"},{"face_id":"c54","job":"さめ"},{"face_id":"c55","job":"もるふぉちょう"},{"face_id":"c56","job":"ぶた"},{"face_id":"c57","job":"らくだ"},{"face_id":"c58","job":"ゆにこーん"},{"face_id":"c59","job":"れとりばー"},{"face_id":"c60","job":"はむすたー"},{"face_id":"c61","job":"すっぽん"},{"face_id":"c62","job":"きつねりす"},{"face_id":"c63","job":"おこじょ"},{"face_id":"c64","job":"やまあらし"},{"face_id":"c65","job":"ちすいこうもり"},{"face_id":"c66","job":"ばいにん"},{"face_id":"c67","job":"りす"},{"face_id":"c68","job":"なまこ"},{"face_id":"c69","job":"びーる"},{"face_id":"c70","job":"かんがるー"},{"face_id":"c71","job":"なまけもの"},{"face_id":"c72","job":"ほたる"},{"face_id":"c73","job":"くりおね"},{"face_id":"c74","job":"はいびすかす"},{"face_id":"c75","job":"いえてぃ"},{"face_id":"c76","job":"めがねざる"},{"face_id":"c77","job":"にんじん"},{"face_id":"c78","job":"かめれおん"},{"face_id":"c79","job":"わかめ"},{"face_id":"c80","job":"りかおん"},{"face_id":"c81","job":"ふぇねっく"},{"face_id":"c82","job":"どぶねずみ"},{"face_id":"c83","job":"いそぎんちゃく"},{"face_id":"c84","job":"しろへび"},{"face_id":"c85","job":"かみつきがめ"},{"face_id":"c86","job":"かも"},{"face_id":"c87","job":"りゅう"},{"face_id":"c88","job":"ゆでたまご"},{"face_id":"c89","job":"かば"},{"face_id":"c90","job":"さい"},{"face_id":"c91","job":"あるぱか"},{"face_id":"c92","job":"さば"},{"face_id":"c93","job":"わらいかわせみ"},{"face_id":"c94","job":"あかまむし"},{"face_id":"c95","job":"やもり"},{"face_id":"c96","job":"せあかごけぐも"},{"face_id":"c97","job":"しぇぱーど"},{"face_id":"c98","job":"はしびろこう"},{"face_id":"c99","job":"しんかいぎょ"},{"face_id":"c100","job":"びーばー"},{"face_id":"c101","job":"すずらん"},{"face_id":"c102","job":"さんた"},{"face_id":"c103","job":"おうむがい"},{"face_id":"c104","job":"みいら"},{"face_id":"c105","job":"うみねこ"},{"face_id":"c106","job":"まんぼう"},{"face_id":"c107","job":"いぼいのしし"},{"face_id":"c108","job":"ぶろっこりー"},{"face_id":"c109","job":"しろちゃとら"}]}

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"changed","admin":"闇の呟き","maker":"広場のお告げ","label":"はおうの広場"},"chr_npc":[{"label":"とのさま広場","csid":"changed","face_id":"m08","say_0":"じんろう？\nそんななまえのこ、いたかしら……","say_1":"さあ、ぼうやたちいらっしゃい。ごはんのじかんよ。"},{"_id":"m05","label":"はおうの広場","csid":"changed_m05","face_id":"m05","say_0":"ママ？ママなの？\n…もう大丈夫なの？ここには人狼なんていないのかい？\n\n…そっかあ…\n\n\n人狼だって？！","say_1":"誰にも、腰抜けなんて…言わせないぞっ"}],"chr_job":[{"face_id":"b44","job":"こあくとう"},{"face_id":"b49","job":"いしく"},{"face_id":"m01","job":"ようせい"},{"face_id":"m02","job":"ようせい"},{"face_id":"m03","job":"しょうぐん"},{"face_id":"m04","job":"すくみず"},{"face_id":"m05","job":"はおう"},{"face_id":"m06","job":"きゅうていがか"},{"face_id":"m07","job":"こひつじ"},{"face_id":"m08","job":"おふくろのあじ"},{"face_id":"m09","job":"しーさー"},{"face_id":"m10","job":"ころぽっくる"},{"face_id":"m11","job":"神聖騎士"},{"face_id":"m12","job":"暗黒騎士"},{"face_id":"m13","job":"調律師"},{"face_id":"m14","job":"奇跡の子"},{"face_id":"m15","job":"びじん"},{"face_id":"m16","job":"りゅうきへい"},{"face_id":"m18","job":"記号の妖精"},{"face_id":"m19","job":"おひめさま"},{"face_id":"m20","job":"げぼく"},{"face_id":"m99","job":"かみさま"},{"face_id":"r30","job":"ひとづかい"},{"face_id":"m21","job":"三等兵"},{"face_id":"f1-1","job":"候補"},{"face_id":"f1-2","job":"候補"},{"face_id":"f1-3","job":"候補"},{"face_id":"f2-1","job":"候補"},{"face_id":"f2-2","job":"候補"},{"face_id":"f3-1","job":"候補"},{"face_id":"f3-2","job":"候補"},{"face_id":"f4-1","job":"候補"},{"face_id":"f4-2","job":"候補"},{"face_id":"f5-1","job":"候補"},{"face_id":"f5-2","job":"候補"}]}

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"fable","admin":"混沌の海の寝返り","maker":"日輪の煌めき","label":"エクスパンション・セット「幻日世界」"},"chr_npc":[{"label":"エクスパンション・セット「幻日世界」","csid":"fable","face_id":"f000","say_0":"おはよう。熾火の子供達。\n希望の朝はまだだけれど、マナとなり、パンとなる日輪の朝がきたよ。\n\nさあ、戦をよそう。\n吾と汝とわかちあい、育み、創り、愛して生きよう。","say_1":"汝は大嵐を起こそうとしている。\n希望はその箱にはもうないのだ。\n\nよしなさい。黄昏よりも昏き者よ。\n\nだが、それでも。\n信じて待てば、かならず――"}],"chr_job":[{"face_id":"f000","job":"日輪代理"},{"face_id":"f1","job":"酪農家"},{"face_id":"f2","job":"竜騎兵"},{"face_id":"f3","job":"三等兵"},{"face_id":"f4","job":"測量座"},{"face_id":"f5","job":"宝珠"},{"face_id":"f6","job":"飛脚座"},{"face_id":"f7","job":"八元ʃ∫干渉"},{"face_id":"f8","job":"キンジン"},{"face_id":"f9","job":"類感呪術師"},{"face_id":"f10","job":"食通虹蛇"},{"face_id":"f11","job":"アララー伯"},{"face_id":"f12","job":"鉄騎兵"},{"face_id":"f13","job":"空挺帆走"},{"face_id":"f14","job":"炎天の雷光"},{"face_id":"fw01","job":"尸解仙道"},{"face_id":"fw02","job":"奏楽神"},{"face_id":"fw03","job":"護法善隊"},{"face_id":"fw04","job":"御免株"},{"face_id":"fw05","job":"羽化昇天道"}]}

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"ger","admin":"闇の呟き","maker":"馬頭琴の調","label":"エクスパンション・セット「大陸議事」"},"chr_npc":[{"label":"エクスパンション・セット「大陸議事」","csid":"ger","face_id":"g03","say_0":"まさか……これは……？\n\n真相が分かったわ！\n日が出たらすぐ、麓の皆に知らせないと！","say_1":"飛車が…壊れてる……\n葛橋が…焼けてる……\n\n！　なんだ、猫か……。おどかさないでよ。\nん？"}],"chr_job":[{"face_id":"g01","job":"三元道士"},{"face_id":"g02","job":"白鶴拳"},{"face_id":"g03","job":"吹牛方士"},{"face_id":"gc61","job":"釣り師"},{"face_id":"g04","job":"心意六合拳"},{"face_id":"g05","job":"本草方士"},{"face_id":"g06","job":"宝飾交易"},{"face_id":"g07","job":"お針子"},{"face_id":"g08","job":"馬鹿"}]}

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"mad","admin":"闇の呟き","maker":"天上の調べ","label":"エクスパンション・セット「狂騒議事」"},"chr_npc":[{"label":"エクスパンション・セット「狂騒議事」","csid":"mad","face_id":"c83","say_0":"どうせ、殺されるわみんな。…みんな\n\n\n~~死ねばいいのに~~","say_1":"１人になるのゎ私ばっか。どっちの道ぉ選んでも、\n私ゎ十分です。明日も待っててね。お願いだから、\n離れて行かないで？\nいつまでも、\nなんで私ばっか\n\n> 日記はそこで途切れ、発見されるまで打ち捨てられていた。"},{"label":"エクスパンション・セット「狂騒議事」（ヤヘイ）","csid":"mad_mad05","face_id":"mad05","say_0":"…うん。もうな、だいぶまえだ。\n借家住まいでさ、天井板がずれて、開いているから入り込んでみたんだ。\n\n結構広くてさ。奥へ、奥へ、這い進んでたら明かりが切れてさ。\nもう右も左もわからなくってさあ…。\n\n必死に暴れたら、明るいとこに出た。\n知らない街だった。","say_1":"…うん。そうだよ。\nまだ、その街から出られないんだ。おまえだって、そうなんだろう？\n\nあー、あっち。いや、こっちかも？\nそっちの先はまだ手繰ってないかもしれねえよ？\nウケッ、ウケッ、ウケコッ、ウコケ、ウコケ、ウヒャホ、コケコケコケ！"}],"chr_job":[{"face_id":"c103","job":"厭世家"},{"face_id":"c83","job":"虹追い"},{"face_id":"mad01","job":"青い鳥"},{"face_id":"mad02","job":"蟻塚崩し"},{"face_id":"mad03","job":"露店巡り"},{"face_id":"mad04","job":"酸味探し"},{"face_id":"mad05","job":"天井手繰り"},{"face_id":"mad06","job":"隠れん坊"},{"face_id":"mad07","job":"早口言葉"},{"face_id":"mad08","job":"妄執の誓い"},{"face_id":"mad09","job":"隣席座り"},{"face_id":"mad10","job":"追憶探り"},{"face_id":"mad11","job":"乱痴気"},{"face_id":"mad12","job":"自由滑落"}]}

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"ririnra","admin":"闇の呟き","maker":"天のお告げ","label":"人狼議事"},"chr_npc":[{"label":"人狼議事（キャサリン）","csid":"ririnra_c05","face_id":"c05","say_0":"たいへん、たいへん、たいへん！","say_1":"大変、人狼が出たよ！　いつもは嘘だけど、今度は本当の本当に本当！"},{"label":"人狼議事（ベネット）","csid":"ririnra_c08","face_id":"c08","say_0":"壁の向こうだ、やつの足音が聞こえる。いよいよ隣室に迫る。\n明日は、もう……","say_1":"足音が部屋の前で止まった。そして、ドアノブがゆっくりと回る音が聞こえる。振り向いてはいけない、振り向けば\n\n> 日記はそこで途切れ、発見されるまで打ち捨てられていた。"},{"label":"人狼議事（タバサ）","csid":"ririnra_c19","face_id":"c19","say_0":"ねぇ、遊んでかない？今夜はあなたが狼よ……","say_1":"人狼なんているわけないじゃん？みんな大げさなのさ。"},{"label":"人狼議事（ソフィア）","csid":"ririnra_c67","face_id":"c67","say_0":"こんばんわ、こんな遅くにたいへんですね。\n\n………\n行っちゃった。へんなの。","say_1":"まさかあの時、あのひとが……？\n人殺しと一緒にいるなんて……！へや…、部屋に戻らせてもらいます！"},{"label":"人狼議事（ヨアヒム）","csid":"ririnra_c68","face_id":"c68","say_0":"ふひ、ふひひ！人狼になど……くれてやるものかヨ！","say_1":"人殺しと一緒にいるなんてごめんだヨ！へ…へっ、部屋に戻らせてもらうヨ！"},{"label":"人狼議事（ヴェスパタイン）","csid":"ririnra_c72","face_id":"c72","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"},{"label":"人狼議事（ヨーランダ）","csid":"ririnra_c51","face_id":"c51","say_0":"夜風に乗って、遠くから声がとどきます。昨夜は幽かに。今夜は響き。きっと明日は……","say_1":"……あの、わたし。この騒ぎが落ち着いたら此処を出たいんです。\n幼馴染から手紙が来たの。お金を貯めたから、遠くで一緒に暮らそうって。"},{"label":"人狼議事（グロリア）","csid":"ririnra_c20","face_id":"c20","say_0":"紳士ならびに淑女の皆様、わたくしの館へようこそ。\n世間の噂など唯の噂話、此処でひととき御寛ぎなさいな。","say_1":"ちょっと！そこの貴方、何をしているの！\n聞いたでしょう人狼がいるのよ、はやく見つけて処刑なさい！"},{"label":"人狼議事（オスカー）","csid":"ririnra_c32","face_id":"c32","say_0":"…そっちじゃないよ、こっちだよ。\nここ、秘密基地なんだ。雨もへいきだし暖かいよ。","say_1":"ねえ。見て見て。パン持ってきたんだ。\nみんなにはナイショだよ？"},{"label":"人狼議事","csid":"ririnra","face_id":"c99","say_0":"嗚呼、聞こえ る。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"花売り"},{"face_id":"c02","job":"村長"},{"face_id":"c03","job":"見習い医師"},{"face_id":"c04","job":"女中"},{"face_id":"c05","job":"病人"},{"face_id":"c06","job":"紐"},{"face_id":"c07","job":"雑貨屋"},{"face_id":"c08","job":"本屋"},{"face_id":"c09","job":"刺客"},{"face_id":"c10","job":"小娘"},{"face_id":"c11","job":"小僧"},{"face_id":"c12","job":"御者"},{"face_id":"c13","job":"ベテラン医師"},{"face_id":"c14","job":"聖歌隊員"},{"face_id":"c15","job":"郵便屋"},{"face_id":"c16","job":"食いしん坊"},{"face_id":"c17","job":"詩人"},{"face_id":"c18","job":"ベテラン看護婦"},{"face_id":"c19","job":"水商売"},{"face_id":"c20","job":"良家の娘"},{"face_id":"c21","job":"肉屋"},{"face_id":"c22","job":"百姓"},{"face_id":"c23","job":"伝道師"},{"face_id":"c24","job":"長老"},{"face_id":"c25","job":"良家の息子"},{"face_id":"c26","job":"楽器職人"},{"face_id":"c27","job":"牧人"},{"face_id":"c28","job":"読書家"},{"face_id":"c29","job":"記者"},{"face_id":"c30","job":"鳥使い"},{"face_id":"c31","job":"童話作家"},{"face_id":"c32","job":"双生児"},{"face_id":"c33","job":"双生児"},{"face_id":"c34","job":"靴磨き"},{"face_id":"c35","job":"親方"},{"face_id":"c36","job":"飾り職"},{"face_id":"c37","job":"奏者"},{"face_id":"c38","job":"歌い手"},{"face_id":"c39","job":"仕立て屋"},{"face_id":"c40","job":"執事"},{"face_id":"c41","job":"さすらい人"},{"face_id":"c42","job":"掃除夫"},{"face_id":"c43","job":"森番"},{"face_id":"c44","job":"小悪党"},{"face_id":"c45","job":"博徒"},{"face_id":"c46","job":"助手"},{"face_id":"c47","job":"流浪者"},{"face_id":"c48","job":"宝石収集家"},{"face_id":"c49","job":"石工"},{"face_id":"c50","job":"会計士"},{"face_id":"c51","job":"墓守"},{"face_id":"c52","job":"墓堀"},{"face_id":"c53","job":"大地主"},{"face_id":"c54","job":"理髪師"},{"face_id":"c55","job":"寡婦"},{"face_id":"c56","job":"酒屋"},{"face_id":"c57","job":"修道女"},{"face_id":"c58","job":"司祭"},{"face_id":"c59","job":"修道士"},{"face_id":"c60","job":"良家の末娘"},{"face_id":"c61","job":"釣り師"},{"face_id":"c62","job":"風来坊"},{"face_id":"c63","job":"漂白工"},{"face_id":"c64","job":"墓荒らし"},{"face_id":"c65","job":"始末屋"},{"face_id":"c66","job":"紅茶屋"},{"face_id":"c67","job":"店番"},{"face_id":"c68","job":"賭場の主"},{"face_id":"c69","job":"美術家"},{"face_id":"c70","job":"子守り"},{"face_id":"c71","job":"道案内"},{"face_id":"c72","job":"ランタン職人"},{"face_id":"c73","job":"水商売"},{"face_id":"c74","job":"踊り手"},{"face_id":"c75","job":"奏者"},{"face_id":"c76","job":"留守番"},{"face_id":"c77","job":"馬飼い"},{"face_id":"c78","job":"道化師"},{"face_id":"c79","job":"長老の孫"},{"face_id":"c80","job":"若者"},{"face_id":"c81","job":"薬屋"},{"face_id":"c82","job":"執事見習い"},{"face_id":"c83","job":"受付"},{"face_id":"c84","job":"妻"},{"face_id":"c85","job":"お使い"},{"face_id":"c86","job":"放蕩者"},{"face_id":"c87","job":"病人"},{"face_id":"c88","job":"料理人"},{"face_id":"c99","job":"厭世家"},{"job":"新妻","face_id":"c89"},{"job":"粉ひき","face_id":"c90"},{"job":"洗濯婦","face_id":"c91"},{"job":"洗濯婦","face_id":"c92"},{"job":"洗濯婦","face_id":"c93"},{"face_id":"c94","job":"女主人"},{"face_id":"c95","job":"新聞配達"},{"face_id":"c96","job":"学者"},{"job":"捜査官","face_id":"c97"},{"job":"探偵","face_id":"c98"},{"job":"徒弟","face_id":"c100"},{"job":"手伝い","face_id":"c101"},{"face_id":"c102","job":"指揮者"},{"face_id":"c103","job":"厭世家"},{"face_id":"c104","job":"負傷兵"},{"face_id":"c105","job":"教え子"},{"face_id":"c106","job":"魚屋"},{"face_id":"c107","job":"成金"},{"face_id":"c108","job":"採集人"},{"face_id":"c109","job":"村娘"},{"face_id":"c110","job":"ろくでなし"},{"face_id":"c111","job":"愛人"},{"face_id":"c112","job":"許婚"},{"face_id":"c113","job":"紐"},{"face_id":"c114","job":"革命家"},{"face_id":"c115","job":"廃品回収"},{"face_id":"c116","job":"逃亡者"},{"face_id":"c117","job":"宿屋"},{"face_id":"c118","job":"渡し船"},{"face_id":"c119","job":"信徒"},{"face_id":"c120","job":"庭師"},{"face_id":"c121","job":"農薬売"},{"face_id":"c122","job":"ビール配り"},{"face_id":"c123","job":"蝋燭職人"},{"face_id":"c124","job":"公証人"},{"face_id":"c125","job":"下働き"},{"face_id":"c126","job":"姉妹"},{"face_id":"c127","job":"銀行屋"},{"face_id":"c128","job":"一日乞食"},{"face_id":"c129","job":"奴隷運び"}]}

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"school","admin":"校内放送","maker":"校内放送","label":"私立七転学園"},"chr_npc":[{"label":"私立七転学園","csid":"school","face_id":"c99","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"}],"chr_job":[{"face_id":"c01","job":"華道部"},{"face_id":"c02","job":"校長"},{"face_id":"c03","job":"化学教師"},{"face_id":"c04","job":"ＳＯＳ団"},{"face_id":"c05","job":"留年生"},{"face_id":"c06","job":"保健体育教師"},{"face_id":"c07","job":"歴史教師"},{"face_id":"c08","job":"図書委員"},{"face_id":"c09","job":"動く銅像"},{"face_id":"c10","job":"ミーハー"},{"face_id":"c11","job":"優等生"},{"face_id":"c12","job":"用務員"},{"face_id":"c13","job":"生物教師"},{"face_id":"c14","job":"コーラス部"},{"face_id":"c15","job":"地理教師"},{"face_id":"c16","job":"食堂のおねいさん"},{"face_id":"c17","job":"演劇部顧問"},{"face_id":"c18","job":"数学教師"},{"face_id":"c19","job":"チアリーダー"},{"face_id":"c20","job":"理事長の孫"},{"face_id":"c21","job":"球部顧問"},{"face_id":"c22","job":"農業科"},{"face_id":"c23","job":"現国教師"},{"face_id":"c24","job":"理事長"},{"face_id":"c25","job":"校長の孫"},{"face_id":"c26","job":"吹奏楽部"},{"face_id":"c27","job":"手芸部"},{"face_id":"c28","job":"文芸部"},{"face_id":"c29","job":"新聞部"},{"face_id":"c30","job":"飼育委員"},{"face_id":"c31","job":"漫画研究部"},{"face_id":"c32","job":"演劇部"},{"face_id":"c33","job":"演劇部"},{"face_id":"c34","job":"球児"},{"face_id":"c35","job":"体育教師"},{"face_id":"c36","job":"美術部"},{"face_id":"c37","job":"音楽教師"},{"face_id":"c38","job":"軽音楽部"},{"face_id":"c39","job":"家政科教師"},{"face_id":"c40","job":"教頭先生"},{"face_id":"c41","job":"登山部"},{"face_id":"c42","job":"生徒会執行部"},{"face_id":"c43","job":"番長"},{"face_id":"c44","job":"問題児"},{"face_id":"c45","job":"スケバン"},{"face_id":"c46","job":"保険医"},{"face_id":"c47","job":"転校生"},{"face_id":"c48","job":"美術教師"},{"face_id":"c49","job":"技術教師"},{"face_id":"c50","job":"風紀委員"},{"face_id":"c51","job":"幽霊部員"},{"face_id":"c52","job":"映画研究会"},{"face_id":"c53","job":"寮管理人"},{"face_id":"c54","job":"野球部"},{"face_id":"c55","job":"肖像画"},{"face_id":"c56","job":"世界史教師"},{"face_id":"c57","job":"修士"},{"face_id":"c58","job":"名誉教授"},{"face_id":"c59","job":"修士"},{"face_id":"c60","job":"ラクロス部"},{"face_id":"c61","job":"魚拓部"},{"face_id":"c62","job":"守衛"},{"face_id":"c63","job":"マネージャー"},{"face_id":"c64","job":"格闘技同好会"},{"face_id":"c65","job":"教育実習"},{"face_id":"c66","job":"茶道部顧問"},{"face_id":"c67","job":"購買部"},{"face_id":"c68","job":"後援者"},{"face_id":"c69","job":"陶芸部"},{"face_id":"c70","job":"先輩"},{"face_id":"c71","job":"帰宅部"},{"face_id":"c72","job":"ヴィジュアル系バンド部"},{"face_id":"c73","job":"チアガール"},{"face_id":"c74","job":"社交ダンス部"},{"face_id":"c75","job":"演奏講師"},{"face_id":"c76","job":"委員長"},{"face_id":"c77","job":"いきもの係"},{"face_id":"c78","job":"演劇部"},{"face_id":"c79","job":"水泳部"},{"face_id":"c80","job":"陸上部"},{"face_id":"c81","job":"科学部"},{"face_id":"c82","job":"ガリ勉"},{"face_id":"c83","job":"放送部"},{"face_id":"c84","job":"講師"},{"face_id":"c85","job":"おてんば"},{"face_id":"c86","job":"柔道部"},{"face_id":"c87","job":"天文部"},{"face_id":"c88","job":"栄養士"},{"face_id":"c89","job":"新任教師"},{"face_id":"c90","job":"ラグビー部"},{"face_id":"c91","job":"緑のおばさん"},{"face_id":"c92","job":"テニス部"},{"face_id":"c93","job":"書道部"},{"face_id":"c94","job":"PTA会長"},{"face_id":"c95","job":"人体模型"},{"face_id":"c96","job":"助教授"},{"face_id":"c97","job":"駐在さん"},{"face_id":"c98","job":"教授"},{"face_id":"c99","job":"不登校児"},{"face_id":"c100","job":"サッカー部"},{"face_id":"c101","job":"園芸部"},{"face_id":"c102","job":"前校長"},{"face_id":"c103","job":"オカルト同好会"},{"face_id":"c104","job":"剣道部"},{"face_id":"c105","job":"弓道部"},{"face_id":"c106","job":"水泳部顧問"},{"face_id":"c107","job":"前理事長"},{"face_id":"c108","job":"無線部"},{"face_id":"c109","job":"占い研究会"}]}

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"sf","admin":"黒体放射のエヴェレット解釈","maker":"重ね合せ猫のユニタリ変換","label":"明後日への道標"},"chr_npc":[{"label":"明後日への道標","csid":"SF","face_id":"sf04","say_0":"とたたたたんっ。\n\n<b>めざましい速さで木の洞に駆け込むと、じっと潜んだ暗闇に瞳がふたつ。\nいちど大好きな閉所に収まると、そうかんたんに出てはこないのだ。</b>","say_1":"ちゅー！\n\n　ちゅー！\n\n> がりがり、がりがり。ケージの縁をひっかくと、うろうろ、うろうろ右へ左へ駆け回る。木の洞に目もくれず、夜中じゅう走り続けるのだった……"},{"label":"明後日への道標（ナユタ）","csid":"SF_sf10","face_id":"sf10","say_0":"f*ck！またチオチモリンと二酸化炭素分圧だし！\nエアコンがコンタミるしスタグるしf*ck'nオーロラの季節だし、ガルタイトもサクラダイトもf*ck'n高っけーし…\n\n> 同日\n> 整備日誌\n> 　定期点検。ただちに健康に影響はないが、擦過痕…","say_1":"よーf*ck'nおまえら。\nマジ聞け。エヴァってでかい１０円キズ見つけた。誰だし？\nマジ怒んねーから手ぇ挙げ\n\n### ぷつん\n\nっと。瞬停った…。f*ck。\nちょっと外の様子見てくる。俺のプリン残しといてくれよ。"},{"label":"明後日への道標（ワクラバ）","csid":"SF_sf032","face_id":"sf032","say_0":"待てよ。ちょっと待てって。\n悪かったって言ってるじゃないか。\n\nオッケー、こうしよう。\n冷蔵庫、２段目だ。取り分は守れよ。\n悪いニュースは聞きたくないぜ、またな。","say_1":"待て待て待て、話を聞いていたのか？そのまさかだ。\n\n掟の３番を思い出せ！お前ならやれる！頑張るんだ！"}],"chr_job":[{"face_id":"sf01","job":"通信士"},{"face_id":"sf02","job":"哲学者"},{"face_id":"sf03","job":"道案内"},{"face_id":"sf04","job":"お散歩隊長"},{"face_id":"sf05","job":"新製品"},{"face_id":"sf06","job":"士官"},{"face_id":"sf07","job":"遊泳員"},{"face_id":"sf08","job":"服飾商"},{"face_id":"sf09","job":"研修生"},{"face_id":"sf10","job":"保安技師"},{"face_id":"sf11","job":"艇長"},{"face_id":"sf12","job":"廃神"},{"face_id":"sf13","job":"消防隊長"},{"face_id":"sf14","job":"対面販売"},{"face_id":"sf15","job":"忍者隊"},{"face_id":"sf16","job":"保険調査"},{"face_id":"sf17","job":"幽閉児"},{"face_id":"sf18","job":"感性子"},{"face_id":"sf19","job":"理性子"},{"face_id":"sf20","job":"測量士"},{"face_id":"sf021","job":"星間帆走"},{"face_id":"sf022","job":"鉱滓地区"},{"face_id":"sf023","job":"地下軌道"},{"face_id":"sf024","job":"光彩楽団"},{"face_id":"sf025","job":"救星隊"},{"face_id":"sf026","job":"星先案内"},{"face_id":"sf027","job":"鉱滓皇帝"},{"face_id":"sf028","job":"溶接技師"},{"face_id":"sf029","job":"機巧忍軍"},{"face_id":"sf030","job":"閉鎖管理"},{"face_id":"sf031","job":"意匠造形"},{"face_id":"sf032","job":"鉱滓地区"},{"face_id":"sf033","job":"重層培養"},{"face_id":"sf034","job":"華美人"},{"face_id":"sf035","job":"銀河ギャル"},{"face_id":"sf036","job":"好奇診"},{"face_id":"sf037","job":"執行隊"},{"face_id":"sf038","job":"複眼レフ"},{"face_id":"sf039","job":"秘術販売"}]}

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"time","admin":"第四の壁の深奥","maker":"次元X式コンピューター","label":"エクスパンション・セット「帰還者議事」"},"chr_npc":[{"label":"エクスパンション・セット「帰還者議事」","csid":"time","face_id":"c10","say_0":"M4ライフルを持ってさえいれば…、なーんて、思っててもしょうがないね。鍵かけとこう。","say_1":"やっぱさ、銃を持った善人がいないとさ。\n\nちょっと出かけてくる！プリン食べちゃダメだよ！"},{"label":"エクスパンション・セット「帰還者議事」（ナツミ）","csid":"time_t44","face_id":"t44","say_0":"> 日差しがプリーツからこぼれると、パンをくわえた黒髪はもう、庇からの校舎入りを達成していた。\n\nごめんね！\n急いでるから、拳遊びは放課後！\n\nおはよー。宿題やった？ちょっと教えてー\nああうん、食べちゃうし、上履きはね、持ってる。だいじょぶ。","say_1":"まったく、いくら放課後っていってもさ…。\n\nもうさー、お風呂して、頭洗って、歯磨きしちゃおうよ。\nダメ、か…\n\nじゃあ、はじめますね。\n\n呀！"},{"label":"エクスパンション・セット「帰還者議事」（少年Ａ）","csid":"time_t48","face_id":"t48","say_0":"> （着信音）\n\nうぇ、絡まれてる？\n言葉通じてないなー。削除削除。ハハハ\n\n> ぽち。ぽち。簡単な操作をしてケータイをしまう。","say_1":"> （着信音）\n\n誰なんだよ。何回目だよ。ウケないっつーの\n\n> （着信音）\n\nほんと痛々しいから…これ、やめて…\n\n> （着信音）\n\nやめてよ…\n\n> （着信音）"},{"label":"エクスパンション・セット「帰還者議事」（少女Ａ）","csid":"time","face_id":"t49","say_0":"次は私の順番ね。この教室で、ほんとうにあったはなし。\n\nある女の子を無視すると決めたことがあるの。給食のとき、トイレ、移動教室、放課後も。\nやがて、その子は教室の真ん中で、死んでしまいます。黒板には血糊でびっしり、恨み言が書かれているの。\n\nそれからは同じ教室で、今度は首を吊ったり、血塗れになったり、飛び降りたりする人が相次ぐそうよ…","say_1":"その調子よ…《人狼》。頼んだ通り、お願い…\nそして…最後に…呪いを…かける…\n\n> 痙攣しながらも黒板まで這いずると、傷からあふれる血を塗り付け、文字を綴る。\n\nこれで、私の番は、おわり。\n次は、…オマエダ…！"}],"chr_job":[{"face_id":"c10","job":"小銃協会"},{"face_id":"t01","job":"友愛組合"},{"face_id":"t02","job":"幸運の科学"},{"face_id":"t03","job":"FSM団"},{"face_id":"t04","job":"截拳道"},{"face_id":"t05","job":"開放的市民"},{"face_id":"c09","job":"暗殺教団"},{"face_id":"t06","job":"死ね死ね団"},{"face_id":"t07","job":"勧善懲悪委"},{"face_id":"t08","job":"覆面嫉妬団"},{"face_id":"t09","job":"匿名軍団"},{"face_id":"t10","job":"営利政府"},{"face_id":"t11","job":"鷹の爪団"},{"face_id":"t12","job":"地下鉄道"},{"face_id":"t13","job":"MNU機関"},{"face_id":"t14","job":"猫の集会"},{"face_id":"t15","job":"少年探偵団"},{"face_id":"t16","job":"安全保障局"},{"face_id":"t17","job":"薔薇∴十字"},{"face_id":"t18","job":"白銀∴秘星"},{"face_id":"t19","job":"聖戦士募集"},{"face_id":"t20","job":"MI:18"},{"face_id":"t21","job":"九未知会"},{"face_id":"t22","job":"学園特警"},{"face_id":"t23","job":"孤高天使連合"},{"face_id":"t24","job":"トレーサー"},{"face_id":"t25","job":"2.14革命機構"},{"face_id":"t26","job":"法隆寺"},{"face_id":"t27","job":"硯友社"},{"face_id":"t28","job":"樫の樹の子ら"},{"face_id":"t29","job":"透明女子会"},{"face_id":"t30","job":"旅団✡肘笠雨"},{"face_id":"t31","job":"呵呵老会"},{"face_id":"t32","job":"安全調査局"},{"face_id":"t33","job":"亡命同盟"},{"face_id":"t34","job":"大銃協会"},{"face_id":"t35","job":"紅客連盟"},{"face_id":"t36","job":"PPP","comment":"由来：KKKてきな何か。"},{"face_id":"t37","job":"素顔連盟","comment":"由来：国語の教科書から。"},{"face_id":"t38","job":"北後家蜘蛛会","comment":"由来：人の死なない推理小説『黒後家蜘蛛の会』のそばに"},{"face_id":"t39","job":"黄金∴黎明","comment":"そろそろ聖戦士が欲しかった！"},{"face_id":"t40","job":"一杯と自由","comment":"由来：ロシア結社「土地と自由」"},{"face_id":"t41","job":"常世倶楽部","comment":"由来：ボヘミアンクラブ"},{"face_id":"t42","job":"架空惑星","comment":"由来：ゾルタクスゼイアン"},{"face_id":"t43","job":"季節巡回","comment":"由来：季節協会とか季節社"},{"face_id":"t44","job":"七星拳","comment":"由来：回教徒の中国武術"},{"face_id":"t45","job":"明仄∴暁星","comment":"由来：曙の星"},{"face_id":"t46","job":"革神会","comment":"由来：格神会"},{"face_id":"t47","job":"聖愛色同胞","comment":"由来：聖白色同胞団"},{"face_id":"t48","job":"少年"},{"face_id":"t49","job":"少女"},{"face_id":"t50","job":"天道居士","comment":"由来：神道天行居"},{"face_id":"t51","job":"地道居士","comment":"由来：神道天行居"},{"face_id":"t52","job":"忘我共同体","comment":"学校で地味に無個性に振舞う的な…"},{"face_id":"t53","job":"独尊隊","comment":"由来：コーサ・ノストラ「われらのもの」"},{"face_id":"t54","job":"宇宙原理衆","comment":"由来：宇宙元始神教"},{"face_id":"t55","job":"鉄血の福音","comment":"由来：栄光の福音キリスト教団"},{"face_id":"t56","job":"一切一門","comment":"由来：一切宗"},{"face_id":"t57","job":"共信の友","comment":"由来：同信の友（ブナイ・ブリス）"},{"face_id":"t58","job":"真向一気","comment":"由来：一向一揆"},{"face_id":"t59","job":"夜笑国","comment":"由来：古代の夜郎国"},{"face_id":"t60","job":"大太刀源流","comment":"由来：示現流"},{"face_id":"t61","job":"愚連隊","comment":"由来：一般名詞の愚連隊"},{"face_id":"t62","job":"頭蓋骨と骨","comment":"由来：スカル＆ボーンズ"},{"face_id":"t63","job":"朝茶会","comment":"由来：朝活。朝茶をする集まり、みたいなイメージです。"},{"face_id":"t64","job":"食養会","comment":"由来：食養会（まま）"},{"face_id":"t65","job":"啓明結社","comment":"由来：イルミナティ"},{"face_id":"t66","job":"更なる前進","comment":"由来：PLUS ULTRA"},{"face_id":"t67","job":"領事裁判所","comment":"由来：横浜英国領事裁判所"},{"face_id":"t68","job":"天文学会","comment":"由来：公益社団法人 日本天文学会"},{"face_id":"t69","job":"校庭番長","comment":"由来：番長学園！（TRPG）"},{"face_id":"t70","job":"ラプター","comment":"由来：中世から続く、ロシアの球技"},{"face_id":"t71","job":"月光学会","comment":"由来：ルナ・ソサイエティ"},{"face_id":"t72","job":"公安部","comment":"由来：公安警察"},{"face_id":"t73","job":"会堂長老会","comment":"由来：サンヘドリン"},{"face_id":"t74","job":"カミナリ族","comment":"由来：マフラー改造車での爆音走行"},{"face_id":"t75","job":"珊瑚宮連邦","comment":"由来：海底都市、冷泉山龍宮寺、八尾比丘尼伝説"}]}

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = {"chr_set":{"_id":"wa","admin":"闇の呟き","maker":"稲荷のお告げ","label":"和の国てやんでえ"},"chr_npc":[{"label":"和の国てやんでえ","csid":"wa","face_id":"w17","say_0":"嗚呼、聞こえる。やつの足音が聞こえる……。","say_1":"逃げろ。逃げろ！おまえらだけでも逃げろ。"},{"label":"和の国てやんでえ（仁右衛門）","csid":"wa_w23","face_id":"w23","say_0":"なんと、これは奇っ怪……分かったゾ！","say_1":"やっぱり人狼は実在するんだヨ！　うっひょひょーい！"}],"chr_job":[{"face_id":"w01","job":"役者"},{"face_id":"w02","job":"浪人"},{"face_id":"w03","job":"忍者"},{"face_id":"w04","job":"町娘"},{"face_id":"w05","job":"飴師"},{"face_id":"w06","job":"巫女"},{"face_id":"w07","job":"双子"},{"face_id":"w08","job":"双子"},{"face_id":"w09","job":"宣教師"},{"face_id":"w10","job":"刺客"},{"face_id":"w11","job":"釣り師"},{"face_id":"w12","job":"女中"},{"face_id":"w13","job":"団子屋"},{"face_id":"w14","job":"手妻師"},{"face_id":"w15","job":"山姥"},{"face_id":"w16","job":"髪結い"},{"face_id":"w17","job":"病人"},{"face_id":"w18","job":"後妻"},{"face_id":"w20","job":"呉服問屋"},{"face_id":"w21","job":"うどん職人"},{"face_id":"w22","job":"そば職人"},{"face_id":"w23","job":"弁士"},{"face_id":"w24","job":"喧嘩屋"},{"face_id":"w25","job":"説法師"},{"face_id":"w26","job":"餓鬼大将"},{"face_id":"w27","job":"発明家"},{"face_id":"w28","job":"飛脚"},{"face_id":"w29","job":"琴弾き"},{"face_id":"w30","job":"宗主"},{"face_id":"w31","job":"子守り"},{"face_id":"w32","job":"落胤"},{"face_id":"w33","job":"船大工"},{"face_id":"w34","job":"野伏り"},{"face_id":"w35","job":"神主"},{"face_id":"w36","job":"楽士"},{"face_id":"w37","job":"薬売り"},{"face_id":"w38","job":"門下生"},{"face_id":"w39","job":"武家の娘"},{"face_id":"w40","job":"懐刀"},{"face_id":"w41","job":"物乞い"},{"face_id":"w43","job":"丁稚"},{"face_id":"w44","job":"機織り"},{"face_id":"w45","job":"座敷守"},{"face_id":"w46","job":"屍漁り"},{"face_id":"w47","job":"肥代取り"},{"face_id":"w48","job":"和算家"},{"face_id":"w49","job":"抜荷"},{"face_id":"w50","job":"半の目"},{"face_id":"w51","job":"真剣師"},{"face_id":"w52","job":"看板娘"},{"face_id":"w53","job":"旅籠"},{"face_id":"w54","job":"大旦那"},{"face_id":"w55","job":"丑の刻参り"},{"face_id":"w56","job":"御免株"},{"face_id":"w57","job":"陰陽師"}]}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = __webpack_require__(9);

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = __webpack_require__(8);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model, Query, Rule, Set;

var _require = __webpack_require__(2);

Set = _require.Set;
Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;


new Rule("potof").schema(function () {
  this.order("write_at");
  this.path("folder", "book");
  this.belongs_to("part");
  this.belongs_to("face");
  this.belongs_to("winner");
  this.has_many("cards");
  this.has_many("stats");
  this.has_many("chats");
  this.habtm("roles");
  this.habtm("ables");
  this.scope(function (all) {
    return {
      by_face: function by_face(book_id, face_id) {
        return all.where({ face_id: face_id, book_id: book_id });
      },
      my: function my(book_id, uid) {
        return all.where({ book_id: book_id, uid: uid }).order({
          sort: ['write_at', 'desc']
        }).list[0];
      },
      catalog: function catalog(book_id, part_id, sort, order) {
        var a1, a2;

        var _sort$split = sort.split(".");

        var _sort$split2 = (0, _slicedToArray3.default)(_sort$split, 2);

        a1 = _sort$split2[0];
        a2 = _sort$split2[1];

        if ("say" === a1) {
          sort = function sort(o) {
            return o.say(part_id)[a2];
          };
        }
        return Query.books.find(book_id).potofs.sort(sort, order);
      },
      sow_id: function sow_id(book_id, face_id, sign, is_merge) {
        var i, j, len, len1, list, o;

        var _all$by_face = all.by_face(book_id, face_id);

        list = _all$by_face.list;

        for (i = 0, len = list.length; i < len; i++) {
          o = list[i];
          if (o.sign === sign) {
            return o.id;
          }
        }
        if (is_merge) {
          for (j = 0, len1 = list.length; j < len1; j++) {
            o = list[j];
            if (o.cards.list.length) {
              return o.id;
            }
          }
        }
        return null;
      }
    };
  });
  this.deploy(function () {
    var _id, able_id_set, base, card, i, j, len, len1, ref, ref1, role_id_set;
    role_id_set = {};
    able_id_set = {};
    ref = this.cards.list;
    for (i = 0, len = ref.length; i < len; i++) {
      card = ref[i];
      if (!card.role) {
        continue;
      }
      role_id_set[card.role_id] = true;
      switch (card.idx) {
        case "request":
          delete role_id_set[card.role_id];
      }
      ref1 = card.role.ables.list;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        _id = ref1[j]._id;

        able_id_set[_id] = true;
      }
    }
    this.role_ids = (0, _keys2.default)(role_id_set);
    this.able_ids = (0, _keys2.default)(able_id_set);
    if (this.live) {
      return (base = this.live).date != null ? base.date : base.date = 2e308;
    }
  });
  this.property('model', {
    role_labels: {
      get: function get() {
        var head, i, len, o, ref, ref1, results, stat;
        ref = this.roles.list;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          o = ref[i];
          if (!("LIVE" !== o.group)) {
            continue;
          }
          stat = this.stats.find(this._id + "-" + o._id);
          head = (ref1 = stat != null ? stat.label : void 0) != null ? ref1 : "";
          results.push("" + head + o.label);
        }
        return results;
      }
    },
    win: {
      get: function get() {
        var ref, ref1;
        if (["suddendead", "leave"].includes((ref = this.live) != null ? ref.role_id : void 0)) {
          return "";
        }
        if (!this) {
          return "";
        }
        if ((ref1 = this.book) != null ? ref1.winner_id : void 0) {
          if (this.book.winner_id === this.winner_id) {
            return "勝利";
          } else {
            return "敗北";
          }
        } else {
          return "参加";
        }
      }
    },
    live: {
      get: function get() {
        return this.cards.find(this._id + "-live");
      }
    },
    request: {
      get: function get() {
        return this.cards.find(this._id + "-request");
      }
    },
    commit: {
      get: function get() {
        return this.stats.find(this._id + "-commit");
      }
    },
    give: {
      get: function get() {
        return this.stats.find(this._id + "-give");
      }
    },
    winner_id: {
      get: function get() {
        var ref;
        return (ref = this.find(this.cards, ["bond", "gift", "role", "live"], function (o) {
          return o.role.win;
        })) != null ? ref : "NONE";
      }
    },
    head: {
      get: function get() {
        var job, name;
        if (this.face != null) {
          var _face = this.face;
          job = _face.job;
          name = _face.name;
        }
        return [this.job || job, this.name || name].join(" ");
      }
    }
  });
  return this.model = function (_model) {
    (0, _inherits3.default)(model, _model);

    function model() {
      (0, _classCallCheck3.default)(this, model);
      return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
    }

    (0, _createClass3.default)(model, [{
      key: "side",
      value: function side(part_id) {
        var i, idx, len, o, ref, ref1, ref2;
        ref = ["SM", "S", "GM", "G", "VM", "V"];
        for (i = 0, len = ref.length; i < len; i++) {
          idx = ref[i];
          if (o = (ref1 = this.book.chats.reduce.side) != null ? (ref2 = ref1[part_id + "-" + idx]) != null ? ref2[this.id] : void 0 : void 0) {
            return o;
          }
        }
        return {
          max_is: {}
        };
      }
    }, {
      key: "say",
      value: function say(part_id) {
        var i, idx, len, o, ref, ref1, ref2;
        ref = ["SS", "S", "GS", "G", "VS", "V"];
        for (i = 0, len = ref.length; i < len; i++) {
          idx = ref[i];
          if (o = (ref1 = this.book.chats.reduce.potof) != null ? (ref2 = ref1[part_id + "-" + idx]) != null ? ref2[this.id] : void 0 : void 0) {
            return o;
          }
        }
        return {
          count: 0,
          all: 0,
          max: null,
          min: null
        };
      }
    }, {
      key: "say_handle",
      value: function say_handle(part_id) {
        var max_is, ref, ref1;

        var _say = this.say(part_id);

        max_is = _say.max_is;

        return (ref = max_is != null ? (ref1 = max_is.phase) != null ? ref1.handle : void 0 : void 0) != null ? ref : "TSAY";
      }
    }, {
      key: "find",
      value: function find(q, keys) {
        var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (o) {
          return o;
        };

        var i, key, len, o;
        for (i = 0, len = keys.length; i < len; i++) {
          key = keys[i];
          o = q.find(this._id + "-" + key);
          if (!o) {
            continue;
          }
          o = cb(o);
          if (!o) {
            continue;
          }
          return o;
        }
      }
    }], [{
      key: "map_reduce",
      value: function map_reduce(o, emit) {}
    }, {
      key: "order",
      value: function order(o, emit) {}
    }]);
    return model;
  }(this.model);
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model, Query, Rule, Set;

var _require = __webpack_require__(2);

Set = _require.Set;
Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;


new Rule("card").schema(function () {
  this.order("write_at");
  this.path("folder", "book", "potof");
  this.belongs_to("role");
  this.property('model', {
    stat: {
      get: function get() {
        return Query.stats.find(this.potof_id + "-" + this.idx);
      }
    }
  });
  return this.scope(function (all) {
    return {
      for_part: function for_part(part_id) {
        return all.where({ part_id: part_id });
      },
      for_phase: function for_phase(phase_id) {
        return all.where({ phase_id: phase_id });
      }
    };
  });
});

new Rule("stat").schema(function () {
  this.path("folder", "book", "potof");
  this.belongs_to("able");
  this.deploy(function () {
    return this.able_id = this.idx;
  });
  return this.property('model', {
    card: {
      get: function get() {
        return Query.stats.find(this.potof_id + "-" + this.idx);
      }
    }
  });
});

new Rule("role").schema(function () {
  this.habtm("ables");
  return this.model = function (_model) {
    (0, _inherits3.default)(model, _model);

    function model() {
      (0, _classCallCheck3.default)(this, model);
      return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
    }

    (0, _createClass3.default)(model, null, [{
      key: "map_reduce",
      value: function map_reduce(o, emit) {
        return emit("group", o.group, {
          list: o.id
        });
      }
    }]);
    return model;
  }(this.model);
});

new Rule("trap").schema(function () {
  this.order("write_at");
  this.belongs_to("book");
  return this.belongs_to("potof");
});

new Rule("able").schema(function () {
  this.habtm("roles", {
    reverse: true
  });
  return this.model = function (_model2) {
    (0, _inherits3.default)(model, _model2);

    function model() {
      (0, _classCallCheck3.default)(this, model);
      return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
    }

    (0, _createClass3.default)(model, null, [{
      key: "map_reduce",
      value: function map_reduce(o, emit) {
        return emit("group", o.group, {
          list: o.id
        });
      }
    }]);
    return model;
  }(this.model);
});

Set.role.set(__webpack_require__(81));

Set.trap.set(__webpack_require__(82));

Set.able.set(__webpack_require__(83));

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = {"51":{"label":"?51?","win":null,"group":"EVIL","able_ids":[],"cmd":"role","help":""},"57":{"label":"?57?","win":null,"group":"EVIL","able_ids":[],"cmd":"role","help":""},"dyingpossess":{"label":"衰退狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust"],"cmd":"role","help":""},"aurawolf":{"label":"気狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","spy_aura","vote","entrust","WSAY"],"cmd":"role","help":""},"nothing":{"label":"普通の日","win":null,"group":"EVENT","able_ids":[],"help":""},"aprilfool":{"label":"四月馬鹿","win":null,"group":"EVENT","able_ids":[],"help":""},"turnfink":{"label":"二重スパイ","win":null,"group":"EVENT","able_ids":[],"help":""},"turnfairy":{"label":"妖精の輪","win":null,"group":"EVENT","able_ids":[],"help":""},"eclipse":{"label":"日蝕","win":null,"group":"EVENT","able_ids":[],"help":""},"cointoss":{"label":"Sir Cointoss","win":null,"group":"EVENT","able_ids":[],"help":""},"force":{"label":"影響力","win":null,"group":"EVENT","able_ids":[],"help":""},"miracle":{"label":"奇跡","win":null,"group":"EVENT","able_ids":[],"help":""},"prophecy":{"label":"聖者のお告げ","win":null,"group":"EVENT","able_ids":[],"help":""},"clamor":{"label":"不満","win":null,"group":"EVENT","able_ids":[],"help":""},"fire":{"label":"熱意","win":null,"group":"EVENT","able_ids":[],"help":""},"nightmare":{"label":"悪夢","win":null,"group":"EVENT","able_ids":[],"help":""},"ghost":{"label":"亡霊","win":null,"group":"EVENT","able_ids":[],"help":""},"escape":{"label":"逃亡","win":null,"group":"EVENT","able_ids":[],"help":""},"seance":{"label":"降霊会","win":null,"group":"EVENT","able_ids":[],"help":""},"entry":{"label":"エントリー","win":null,"group":"TURN","able_ids":["ENTRY"],"help":""},"start":{"label":"初日","win":null,"group":"TURN","able_ids":[],"help":""},"main":{"label":"二日目以降","win":null,"group":"TURN","able_ids":[],"help":""},"prologue":{"label":"プロローグ","win":"NONE","group":"TURN","able_ids":["exit"],"help":""},"epilogue":{"label":"エピローグ","win":null,"group":"TURN","able_ids":[],"help":""},"live":{"label":"生存者","win":null,"group":"LIVE","able_ids":["SSAY","TSAY","AIM","commit"],"help":""},"executed":{"label":"処刑","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"victim":{"label":"襲撃","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"cursed":{"label":"呪詛","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"droop":{"label":"衰退","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"suicide":{"label":"後追","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"feared":{"label":"恐怖","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"suddendead":{"label":"突然死","win":null,"group":"LIVE","able_ids":["GSAY","TSAY"],"help":""},"leave":{"label":"―","win":null,"group":null,"able_ids":[],"help":""},"none":{"label":"","win":null,"group":null,"able_ids":[],"help":""},"bind":{"label":"―","win":null,"group":null,"able_ids":[],"help":""},"hide":{"label":"？？？","win":null,"group":null,"able_ids":["hike","vote","entrust"],"help":"あなたは正体不明です。"},"mob":{"label":"見物人","win":"MOB","group":null,"able_ids":[],"help":"見物人全般のための仮想役職です。"},"visiter":{"label":"客席","win":"MOB","group":"MOB","able_ids":["VSAY","TSAY"],"help":"進行中会話は客席同士のみ"},"grave":{"label":"裏方","win":"MOB","group":"MOB","able_ids":["VGSAY","TSAY"],"help":"進行中会話は墓下と"},"alive":{"label":"舞台","win":"MOB","group":"MOB","able_ids":["VSAY","TSAY"],"help":"進行中会話は地上、墓下、両方と"},"juror":{"label":"陪審","win":"HUMAN","group":"MOB","able_ids":["VSAY","TSAY","vote","entrust"],"help":"進行中会話は陪審同士のみ。陪審（＆決定者）だけが投票する。"},"gamemaster":{"label":"黒幕","win":"MOB","group":"MOB","able_ids":["gm_droop","gm_live","gm_disable_vote","gm_enable_vote","VSAY","TSAY"],"help":"進行中会話は地上、墓下、両方と。場を支配する特権をもつ。"},"master":{"label":"村立て人","win":null,"group":"SPECIAL","able_ids":["maker","kick","muster","editvilform","update","MAKER"]},"admin":{"label":"管理人","win":null,"group":"SPECIAL","able_ids":["maker","kick","muster","editvilform","update","scrapvil","ADMIN"]},"lost":{"label":"喪失","win":null,"group":"OTHER","able_ids":[],"cmd":"gift","help":"あなたは贈り物を<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_LOST\" TARGET=\"_blank\">喪失</A>しました。 もう二度と手にすることはないでしょう。もしまたあなたの手に贈り物があっても、消え去ってしまいます。そして、あなたがそれに気付くことはないでしょう。"},"shield":{"label":"光の輪","win":null,"group":"OTHER","able_ids":["circular","guard"],"cmd":"gift","help":"あなたを<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_SHIELD\" TARGET=\"_blank\">光の輪</A>が取り巻きます。 あなたはもし昨夜、襲撃されていたとしても守られました。 光の輪はひとりを一度しか守りません。"},"glass":{"label":"魔鏡","win":null,"group":"OTHER","able_ids":["circular","see"],"cmd":"gift","help":"あなたを<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_GLASS\" TARGET=\"_blank\">魔鏡</A>が照らします。 あなたは、魔鏡を渡す相手を占います。 魔鏡はひとりを一度しか照らしません。"},"ogre":{"label":"悪鬼","win":"WOLF","group":"WOLF","able_ids":["wolf","hunt","friend","WSAY"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_OGRE\" TARGET=\"_blank\">悪鬼</A>です。 表向きは他の役目を帯びていますが、あなたは人を襲う悪い鬼なのです。"},"fairy":{"label":"妖精の子","win":"PIXI","group":"PIXI","able_ids":["pixi"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_FAIRY\" TARGET=\"_blank\">妖精から生まれた子</A>です。 表向きは他の役目を帯びていますが、あなたは人ならぬ存在なのです。 占い師、霊能者にどう判別されるかは、もともとの役職によります。"},"fink":{"label":"半端者","win":"EVIL","group":"EVIL","able_ids":["evil"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_FINK\" TARGET=\"_blank\">半端者</A>です。 表向きは他の役目を帯びていますが、あなたは人ともつかぬ、人狼ともつかぬ、半端な正体を隠しています。"},"decide":{"label":"決定者","win":null,"group":"OTHER","able":"投票","able_ids":["vote_role"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_DECIDE\" TARGET=\"_blank\">決定者</A>です。 あなたは追加票を投じる権利を持ちつづけます。行使することで、健在を示すこともできるでしょう。"},"seeronce":{"label":"夢占師","win":null,"group":"OTHER","able":"占う","able_ids":["once","see","spy_wolf"],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_SEERONCE\" TARGET=\"_blank\">夢占師</A>です。"},"dipsy":{"label":"酔払い","win":null,"group":"OTHER","able_ids":[],"cmd":"gift","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_DIPSY\" TARGET=\"_blank\">酔払い</A>です。 あなたが人外もしくは村人に相対するものであれば、自分の役割を見失うことはありません。 また、光の輪や魔鏡といった贈り物を受け取った場合、酔いが醒めることでしょう。"},"lover":{"label":"弟子","win":null,"group":"OTHER","able":"入門","able_ids":["aura","bond","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVER\" TARGET=\"_blank\">弟子</A>です。 好きな人物を師匠として選び、弟子入りします。次の朝、あなたは頭角をあらわし、絆の師匠と同じ役職になっています。"},"robber":{"label":"盗賊","win":null,"group":"OTHER","able_ids":["aura","rob","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ROBBER\" TARGET=\"_blank\">盗賊</A>です。"},"tangle":{"label":"怨念","win":null,"group":"OTHER","able_ids":["aura","revenge","tangle","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_TANGLE\" TARGET=\"_blank\">怨念</A>です。"},"villager":{"label":"村人","win":"HUMAN","group":"HUMAN","able_ids":["human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_VILLAGER\" TARGET=\"_blank\">村人</A>です。 特殊な能力はもっていません。"},"stigma":{"label":"聖痕者","win":"HUMAN","group":"HUMAN","able_ids":["aura","stigma","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_STIGMA\" TARGET=\"_blank\">聖痕者</A>です。"},"fm":{"label":"結社員","win":"HUMAN","group":"HUMAN","able_ids":["aura","fm","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FM\" TARGET=\"_blank\">結社員</A>です。 独自の人脈を持つ秘密結社の一員です。"},"sympathy":{"label":"共鳴者","win":"HUMAN","group":"HUMAN","able_ids":["aura","fm","human","vote","entrust","SPSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SYMPATHY\" TARGET=\"_blank\">共鳴者</A>です。"},"seer":{"label":"占い師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEER\" TARGET=\"_blank\">占い師</A>です。"},"seerwin":{"label":"信仰占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_win","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEERWIN\" TARGET=\"_blank\">信仰占師</A>です。"},"aura":{"label":"気占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_aura","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_AURA\" TARGET=\"_blank\">気（オーラ）占い師</A>です。"},"oura":{"label":"気占師","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_aura","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_AURA\" TARGET=\"_blank\">気（オーラ）占い師</A>です。"},"seerrole":{"label":"賢者","win":"HUMAN","group":"HUMAN","able_ids":["aura","see","spy_role","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEERROLE\" TARGET=\"_blank\">賢者</A>です。"},"guard":{"label":"守護者","win":"HUMAN","group":"HUMAN","able_ids":["aura","guard","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GUARD\" TARGET=\"_blank\">守護者</A>です。"},"medium":{"label":"霊能者","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUM\" TARGET=\"_blank\">霊能者</A>です。"},"mediumwin":{"label":"信仰霊能者","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_win","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUMWIN\" TARGET=\"_blank\">信仰霊能者</A>です。"},"mediumrole":{"label":"導師","win":"HUMAN","group":"HUMAN","able_ids":["aura","medium","spy_role","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUMROLE\" TARGET=\"_blank\">導師</A>です。"},"necromancer":{"label":"降霊者","win":"HUMAN","group":"HUMAN","able_ids":["aura","chkGSAY","medium","spy_wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_NECROMANCER\" TARGET=\"_blank\">降霊者</A>です。"},"follow":{"label":"追従者","win":"HUMAN","group":"HUMAN","able_ids":["aura","human","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FOLLOW\" TARGET=\"_blank\">追従者</A>です。 だれかを信じ、委ねましょう。"},"fan":{"label":"煽動者","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","riot","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FAN\" TARGET=\"_blank\">煽動者</A>です。"},"hunter":{"label":"賞金稼","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","sneak","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HUNTER\" TARGET=\"_blank\">賞金稼</A>です。 毎夜、一人を付け狙います。"},"weredog":{"label":"人犬","win":"HUMAN","group":"HUMAN","able_ids":["aura","tafness","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WEREDOG\" TARGET=\"_blank\">人犬</A>です。"},"prince":{"label":"王子様","win":"HUMAN","group":"HUMAN","able_ids":["aura","august","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PRINCE\" TARGET=\"_blank\">王子様</A>です。"},"rightwolf":{"label":"狼血族","win":"HUMAN","group":"HUMAN","able_ids":["aura","blind","wolf","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_VILLAGER\" TARGET=\"_blank\">村人</A>です。 特殊な能力はもっていません。\n狼血族のあなたは、占い師、霊能者に人狼と判定されます。ですが、あなたは村人で、勝利条件も変わりません。 勝利を目指して頑張りましょう。占われると、正体を自覚し表示が増えます。"},"doctor":{"label":"医師","win":"HUMAN","group":"HUMAN","able":"診察","able_ids":["aura","cure","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DOCTOR\" TARGET=\"_blank\">医師</A>です。"},"curse":{"label":"呪人","win":"HUMAN","group":"HUMAN","able_ids":["aura","curse","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSE\" TARGET=\"_blank\">呪人</A>です。"},"dying":{"label":"預言者","win":"HUMAN","group":"HUMAN","able_ids":["aura","droop","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYING\" TARGET=\"_blank\">預言者</A>です。"},"invalid":{"label":"病人","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","seal","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_INVALID\" TARGET=\"_blank\">病人</A>です。 あなたが命を落としたとき、犯人は病気に感染します。"},"alchemist":{"label":"錬金術師","win":"HUMAN","group":"HUMAN","able_ids":["aura","once","revenge","cling","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ALCHEMIST\" TARGET=\"_blank\">錬金術師</A>です。 あなたは一度だけ、薬を飲むことが出来ます。"},"witch":{"label":"魔女","win":"HUMAN","group":"HUMAN","able_ids":["aura","analeptic","poison","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WITCH\" TARGET=\"_blank\">魔女</A>です。 あなたは二日目に、毒薬と蘇生薬をひとつずつ完成させます。"},"girl":{"label":"少女","win":"HUMAN","group":"HUMAN","able_ids":["aura","night","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GIRL\" TARGET=\"_blank\">少女</A>です。"},"scapegoat":{"label":"生贄","win":"HUMAN","group":"HUMAN","able":"疑う","able_ids":["aura","scapegoat","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SCAPEGOAT\" TARGET=\"_blank\">生贄</A>です。"},"elder":{"label":"長老","win":"HUMAN","group":"HUMAN","able_ids":["aura","revenge","seal","twolife","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ELDER\" TARGET=\"_blank\">長老</A>です。 もしも命を落としたら、あなたの恨みは犯人を襲います。"},"jammer":{"label":"邪魔之民","win":"EVIL","group":"EVIL","able":"隠す","able_ids":["aura","jammer","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_JAMMER\" TARGET=\"_blank\">邪魔之民</A>です。"},"snatch":{"label":"宿借之民","win":"EVIL","group":"EVIL","able_ids":["aura","snatch","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SNATCH\" TARGET=\"_blank\">宿借之民</A>です。"},"bat":{"label":"念波之民","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","XSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BAT\" TARGET=\"_blank\">念波之民</A>です。"},"possess":{"label":"狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_POSSESS\" TARGET=\"_blank\">狂人</A>です。"},"fanatic":{"label":"狂信者","win":"EVIL","group":"EVIL","able_ids":["aura","fanatic","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FANATIC\" TARGET=\"_blank\">狂信者</A>です。"},"muppeting":{"label":"人形使い","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","MSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MUPPETER\" TARGET=\"_blank\">人形使い</A>です。"},"wisper":{"label":"囁き狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WISPER\" TARGET=\"_blank\">囁き狂人</A>です。 少人数になると勝敗が確定する状況もあります、ですがこの場合も自動で終了することはありません。"},"cpossess":{"label":"囁き狂人","win":"EVIL","group":"EVIL","able_ids":["aura","human","evil","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WISPER\" TARGET=\"_blank\">囁き狂人</A>です。 少人数になると勝敗が確定する状況もあります、ですがこの場合も自動で終了することはありません。"},"semiwolf":{"label":"半狼","win":"EVIL","group":"EVIL","able_ids":["aura","wolfify","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEMIWOLF\" TARGET=\"_blank\">半狼</A>です。"},"oracle":{"label":"魔神官","win":"EVIL","group":"EVIL","able_ids":["aura","medium","spy_role","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ORACLE\" TARGET=\"_blank\">魔神官</A>です。"},"sorcerer":{"label":"魔術師","win":"EVIL","group":"EVIL","able_ids":["aura","see","spy_role","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SORCERER\" TARGET=\"_blank\">魔術師</A>です。"},"walpurgis":{"label":"魔法少年","win":"EVIL","group":"EVIL","able_ids":["aura","grave","analeptic","poison","human","evil","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WALPURGIS\" TARGET=\"_blank\">魔法少年</A>です。 やがて命を落とすと魔女になると宿命付けられています。"},"headless":{"label":"首無騎士","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HEADLESS\" TARGET=\"_blank\">首のない騎士</A>です。 あなたは人狼仲間を斬り捨てることも厭いません。"},"wolf":{"label":"人狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WOLF\" TARGET=\"_blank\">人狼</A>です。"},"intwolf":{"label":"智狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","friend","spy_role","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_INTWOLF\" TARGET=\"_blank\">智狼</A>です。特殊な能力を持つ人狼です。"},"cwolf":{"label":"呪狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","curse","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSEWOLF\" TARGET=\"_blank\">呪狼</A>です。特殊な能力を持つ人狼です。"},"cursewolf":{"label":"呪狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","curse","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSEWOLF\" TARGET=\"_blank\">呪狼</A>です。特殊な能力を持つ人狼です。"},"whitewolf":{"label":"白狼","win":"WOLF","group":"WOLF","able":"襲う","able_ids":["hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WHITEWOLF\" TARGET=\"_blank\">白狼</A>です。特殊な能力を持つ人狼です。 あなたを占った占い師は、あなたを人間とみなします。あなたは能力者特有のオーラを発しません。"},"childwolf":{"label":"仔狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","revenge","grudge","hunt","friend","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CHILDWOLF\" TARGET=\"_blank\">仔狼</A>です。特殊な能力を持つ人狼です。"},"dyingwolf":{"label":"衰狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","droop","hunt","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYINGWOLF\" TARGET=\"_blank\">衰狼</A>です。特殊な能力を持つ人狼です。"},"silentwolf":{"label":"黙狼","win":"WOLF","group":"WOLF","able_ids":["aura","wolf","hunt","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SILENTWOLF\" TARGET=\"_blank\">黙狼</A>です。 人狼の襲撃対象となることはありませんが、人狼（と囁き狂人、擬狼妖精）同士にしか聞こえない会話は、あなたには聞こえません。"},"hamster":{"label":"栗鼠妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PIXI\" TARGET=\"_blank\">栗鼠妖精</A>です。"},"werebat":{"label":"蝙蝠妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BAT\" TARGET=\"_blank\">蝙蝠妖精</A>です。 あなたは他の妖精が誰であるか知っていますし、新たに生まれた妖精を知ることもできます。ただし、姿を換えてしまった宿借妖精の行方はわかりません。 また、蝙蝠妖精同士にしか聞こえない会話が可能です。"},"mimicry":{"label":"擬狼妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","vote","entrust","WSAY"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MIMICRY\" TARGET=\"_blank\">擬狼妖精</A>です。"},"dyingpixi":{"label":"風花妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","droop","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYINGPIXI\" TARGET=\"_blank\">風花妖精</A>です。"},"trickster":{"label":"悪戯妖精","win":"PIXI","group":"PIXI","able_ids":["aura","pixi","armor","bonds","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_TRICKSTER\" TARGET=\"_blank\">悪戯妖精</A>です。 結ばれた人たちにとっては、単なるはた迷惑な悪戯にすぎません。"},"hatedevil":{"label":"邪気悪魔","win":"HATER","group":"OTHER","able_ids":["aura","bonds","hate","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HATEDEVIL\" TARGET=\"_blank\">邪気悪魔</A>です。 結びつけた二人のうち、どちらか片方だけが生き延びれば、あなたの勝利となります。あなたにその絆が結ばれていない限り、あなた自身の死は勝敗には直接関係しません。"},"hate":{"label":"宿敵","win":"HATER","group":"BIND","able_ids":["aura","bonds","hate","human","vote","entrust"],"cmd":"role","help":"あなたには<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HATEDEVIL\" TARGET=\"_blank\">宿敵</A>がいます。"},"love":{"label":"恋人","win":"LOVER","group":"BIND","able_ids":["aura","bonds","love","human","vote","entrust"],"cmd":"role","help":"あなたには<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVEANGEL\" TARGET=\"_blank\">恋人</A>がいます。"},"loveangel":{"label":"恋愛天使","win":"LOVER","group":"OTHER","able_ids":["aura","bonds","love","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVEANGEL\" TARGET=\"_blank\">恋愛天使</A>です。 結びつけた二人が生き延びれば、あなたの勝利となります。あなたにその絆が結ばれていない限り、あなた自身の死は勝敗には直接関係しません。"},"passion":{"label":"片思い","win":"LOVER","group":"OTHER","able_ids":["aura","bond","love","human","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PASSION\" TARGET=\"_blank\">片想い</A>です。 選んだ人が生き延び、あなたが生き延びれば、あなたの勝利となります。"},"lonewolf":{"label":"一匹狼","win":"LONEWOLF","group":"WOLF","able_ids":["aura","wolf","armor","kill","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LONEWOLF\" TARGET=\"_blank\">一匹狼</A>です。 襲撃先はあなた以外であれば誰でもかまいません。"},"guru":{"label":"笛吹き","win":"GURU","group":"OTHER","able_ids":["aura","human","guru","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GURU\" TARGET=\"_blank\">笛吹き</A>です。"},"dish":{"label":"鱗魚人","win":"DISH","group":"OTHER","able_ids":["aura","human","dish","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DISH\" TARGET=\"_blank\">鱗魚人</A>です。新鮮なふぃーっしゅ。です。"},"bitch":{"label":"遊び人","win":"LOVER","group":"OTHER","able_ids":["aura","human","bitch","vote","entrust"],"cmd":"role","help":"あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BITCH\" TARGET=\"_blank\">遊び人</A>です。 本命とあなたが生き延びれば、あなたの勝利です。"}}

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = {"blank":{"label":"普通の日","help":""},"nothing":{"label":"普通の日","cmd":"trap","help":"今日は、特別なことのない一日のようだ。さあ普段通り、誰かを処刑台にかけよう。"},"aprilfool":{"label":"四月馬鹿","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_APRIL_FOOL\" TARGET=\"_blank\">四月馬鹿</A></b>\n<br>\n大変、大変、大変なことになった。きみの役職は変化しているかもしれない。もしも誰かと絆を結んでいるなら、急に相手が憎くなってしまい、絆の相手だけにしか投票できない。\nそして悟ってしまった。今夜だけは、相方の後を追うことはないと……。\n<br>\n<table class=\"table\">\n<tr>\n<th colspan=3>役職の変貌\n<th rowspan=4>※一日で元に戻る\n<tr>\n<td>賢者\n<td>←→\n<td>魔女\n<tr>\n<td>守護者\n<td>←→\n<td>長老\n<tr>\n<td>賞金稼\n<td>←→\n<td>少女\n</table>"},"turnfink":{"label":"二重スパイ","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_TURN_FINK\" TARGET=\"_blank\">二重スパイ</A></b>\n<br>\nなんということだろう！一人が村側を裏切り、狼に与する半端者になってしまった。明日以降も、彼は村人を裏切り続けるだろう……。\n<br>\n決定者や光の輪の持ち主なら、このときにその力を手放してしまう。"},"turnfairy":{"label":"妖精の輪","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_TURN_FAIRY\" TARGET=\"_blank\">妖精の輪</A></b>\n<br>\nなんということだろう！一人が森に立ち入り、妖精の養子になってしまった。明日以降も、彼は村人を裏切り続けるだろう……。\n<br>\n決定者や光の輪の持ち主なら、このときにその力を手放してしまう。"},"eclipse":{"label":"日蝕","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_ECLIPSE\" TARGET=\"_blank\">日蝕</A></b>\n<br>\n暗い日蝕が村中を覆い、お互い顔も名前も解らない。この闇夜は丸一日続くだろう。他人になりすまし、議論を混乱させることもできてしまうかもしれない。"},"cointoss":{"label":"Sir Cointoss","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_COINTOSS\" TARGET=\"_blank\">Sir Cointoss</A></b>\n<br>\nお控えなさい。お控えなさい。コイントス卿はこの村の投票結果に意見があるようでございます。\n卿の御意向によっては、投票結果に基づいた処刑を取り止めにすることもあります。\n五分五分くらいかな。"},"force":{"label":"影響力","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_FORCE\" TARGET=\"_blank\">影響力</A></b>\n<br>\n今日の投票箱は無色透明だ。だれかが投票した瞬間にその内容はハッキリと見えるから、投票をセットするときは気を付けて！"},"miracle":{"label":"奇跡","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_MIRACLE\" TARGET=\"_blank\">奇跡</A></b>\n<br>\n帰ってきた！黄泉の国から、今日の襲撃で死んだ犠牲者がかえってきた！能力を失ったかもしれないけれど、それは些細なことだよ！ね！\n<br>\n人狼、一匹狼、賞金稼ぎなどに襲われた死者は生き返る。ただし、その能力は失われる。"},"prophecy":{"label":"聖者のお告げ","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_PROPHECY\" TARGET=\"_blank\">聖者のお告げ</A></b>\n<br>\n聖者は民の夢枕に告げられました。今の任より、<b>決定者</b>にふさわしい人物がいると。\n旧き任務は解かれ、あたらしい<b>決定者</b>は皆に喝采で迎え入れられるだろう。"},"clamor":{"label":"不満","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_CLAMOR\" TARGET=\"_blank\">不満</A></b>\n<br>\n村には不満が鬱屈している。今夜の投票でまた人間を処刑してしまったら……悪夢が始まる。\nはじけた不満に背中を押され、話し合いもなしに、さらに一人の首を必要とするだろう。"},"fire":{"label":"熱意","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_FIRE\" TARGET=\"_blank\">熱意</A></b>\n<br>\n村には期待に満ちた熱意が渦巻いている。今夜の投票がひとならぬものを処刑できたなら……悪夢が始まるのだ。\nはじけた熱意に背中を押され、話し合いもなしに、さらに一人の首を必要とするだろう。"},"nightmare":{"label":"悪夢","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_NIGHTMARE\" TARGET=\"_blank\">悪夢</A></b>\n<br>\n恐ろしい一日が始まる。今日は投票だけができる。発言も、能力も使えない。そして、突然死は発生しない。\n<br>\nさあ投票して、こんな日が早く過ぎ去ってしまうよう、ひとり祈りを捧げよう。"},"ghost":{"label":"亡霊","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_GHOST\" TARGET=\"_blank\">亡霊</A></b>\n<br>\n今夜、人狼に殺された人は人狼になる。また、襲撃を実行した人狼は命を落としてしまうだろう。人狼となった者は報復行動を行わない。ただし、命拾いをしたならば人狼にはならない。\n<br>\n一匹狼は亡霊を作らない。"},"escape":{"label":"逃亡","cmd":null,"help":"<b>逃亡</b>\n<br>\nせめて一人だけでも、なんとかして逃がそう。今夜の投票で逃亡者を一人決め、夜中の処刑のかわりに密かに逃がすのだ。\n<br>\nしかし逃亡者は一日のあいだ逃亡生活を続け、ついに村へと帰還してしまう。帰還者の票は通常の三倍尊重されるだろう。\n実装がめんどうだから、このまま未定義にしておこうかな。"},"seance":{"label":"降霊会","cmd":"trap","help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_SEANSE\" TARGET=\"_blank\">降霊会</A></b>\n<br>\nこっくりさん、こっくりさん……<br>秘密の儀式で、墓場の霊魂がかえってきた。今日に限り、生者も姿の見えぬ死者も屋根を共にし、議論するだろう。"}}

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = {"editvilform":{"group":"GM","at":"around","cmd":"editvilform","btn":"村を編集する","change":"村の編集フォームを確認、修正します。","help":""},"muster":{"group":"GM","at":"prologue","cmd":"muster","btn":"点呼！","change":"全員を未発言状態にします。未発言者は１日そのまま発言がないと、自動退出します。","help":""},"update":{"group":"GM","at":"all","cmd":"update","btn":"更新！","change":"ただちに更新し、次の日を迎えます。お覚悟はよろしいですか？","help":""},"scrapvil":{"group":"GM","at":"all","cmd":"scrapvil","btn":"廃村！","change":"ただちに村を廃村にします。廃村になった村はエピローグになります。お覚悟はよろしいですか？","help":""},"exit":{"group":"POTOF","at":"prologue","cmd":"exit","btn":"退出…","change":"村を立ち去ります。","help":""},"commit":{"group":"POTOF","at":"progress","cmd":"commit","sw":"時間を進める","pass":"（時間を進めない）","change":"時間を進めるかどうか、選択してください。","help":"全員が「時間を進める」を選ぶと前倒しで更新されます。\n最低一発言して確定しないと、時間を進める事ができません。"},"night":{"at":"main","sw":"夜遊びする","pass":"（夜遊びしない）","change":"夜遊びをして、深夜の囁きを聞いてしまうかどうか、選択してください。","help":"あなたは二日目以降、夜に出歩くことができます。\n人狼の囁き、民の念話、共鳴者の共鳴を誰のものとも判別せず聞いちゃうので、朝になって昨日を振り返ると思い出せることでしょう。\n顔や名前はわかりませんが。\nただしこのとき、もしあなたが人狼の、誰かひとりにでも襲撃される矛先に含まれていると、恐怖のあまり、実際に襲われる犠牲者とは別に死んでしまいます。\nこの死亡を護衛する方法はありません。また、息を引き取るあなたを尻目に、狼達は別の人物を襲撃するでしょう。"},"dish":{"at":"progress","sw":"跳ねる","pass":"（跳ねない）","change":"跳ねるアピールをするかどうか、選択してください。","help":"美味しく食べて貰うことを悦びとし、活き活きと跳ねることができます。わたしをたべて、わたしをたべて、とアピールしましょう。"},"cling":{"at":"main","sw":"飲薬する","pass":"（飲薬しない）","change":"あなたが殺害されたとしたら、犯人を道連れにするかどうか、選択してください。","help":"薬を服用した夜、もし処刑以外の要因で命を落とした場合、その犯人を道連れにします。人狼の襲撃の場合、襲撃実行者が対象となります。"},"guru":{"for":"live","at":"progress","targets":"誘う","pass":"（パス）","change":"誘い込む犠牲者を選択してください。","help":"毎晩ふたりずつ、好きな人物をひそかに誘い込むことができます。自分自身を誘うことはできません。\n誘い込まれた当人たちは夜な夜な踊り明かし、そのことを覚えています。しかし、彼らの能力や所属陣営などに変化はありません。"},"bitch":{"for":"live","at":"start","targets":"遊ぶ","change":"絆を結ぶ相手と、弄ぶ遊び相手を選択してください。","help":"一日目、一人目に選択した人物を本命の恋人として“運命の絆”を結びつけ、二人目は絆を結ぶふりをして手玉にとります。\n“運命の絆”を結んだ二人は、片方が死亡すると後を追って死亡します。もう一人はどうでもよいのですが、そう思わせないこまめなケアが大切です。"},"bonds":{"for":"live","at":"start","targets":"結ぶ","change":"絆で結ぶ二人を選択してください。","help":"一日目、好きな二人に“運命の絆”を結びつける事ができます。“運命の絆”を結んだ二人は、片方が死亡すると後を追って死亡します。"},"bond":{"for":"live","at":"start","target":"結ぶ","change":"あなたとの絆を結ぶ相手を選択してください。","help":"一日目、あなたから好きな人に“運命の絆”を結びつける事ができます。“運命の絆”を結んだ相手が死亡すると、あなたは後を追って死亡します。"},"guard":{"for":"live","at":"main","target":"守る","pass":"（パス）","change":"守護する対象を選択してください。","help":"一人を狼の襲撃、もしくは付け狙う賞金稼の手から守ることが出来ます。\n自分自身を守ることは出来ません。"},"see":{"for":"live","at":"progress","target":"占う","pass":"（パス）","change":"正体を知りたい相手を選択してください。","help":"ひとりを占い対象に指定します。"},"sneak":{"for":"live","at":"progress","target":"狙う","pass":"（パス）","change":"付け狙う相手を選択してください。","help":"殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"hunt":{"for":"live","at":"progress","target":"襲う","pass":"（パス）","change":"殺害する相手を選択してください。","help":"人狼全員で多数決をし、一人だけ殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"kill":{"for":"live","at":"progress","target":"襲う","pass":"（パス）","change":"殺害する相手を選択してください。","help":"殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"},"cure":{"for":"live","at":"main","target":"診察","pass":"（パス）","change":"診察する相手を選択してください。","help":"ひとりを診察し、人狼の牙に感染しているかを確認します。その場合は治療します。治療した人は生存者として数えますが、能力は取り戻しません。"},"tangle":{"for":"dead","at":"progress","target":"憑依","pass":"（パス）","change":"付け狙う相手を選択してください。","help":"死者の埋葬地をうろつきまわっています。\n指定した故人の役職と勝利条件を写しとり、対象を蘇生させます。\nこのため、あなたは死亡しなくては、勝利がありません。"},"analeptic":{"for":"dead","at":"progress","require":"role1","target":"投薬","pass":"（パス）","change":"薬を投与する相手を選択してください。","help":"死者に投薬して蘇生させます。\n蘇生は一度だけおこなうことができ、それっきり薬は失われます。"},"poison":{"for":"live","at":"progress","require":"role2","target":"投薬","pass":"（パス）","change":"薬を投与する相手を選択してください。","help":"生きている者に投薬して毒殺します。\n毒殺は一度ずつだけおこなうことができ、それっきり薬は失われます。"},"scapegoat":{"for":"live","at":"main","target":"疑う","pass":"（パス）","change":"あなたが最後になったとしたら、指差す相手を選択してください。","help":"もし投票数が同数になり処刑する相手が定まらないと、混乱した村人達に処刑されてしまいます。\nあなたが最後に指差した人は、後悔する村人達に翌日、処刑されるでしょう。皆、そうするより他にないのです。"},"hike":{"for":"cast","at":"progress","target":"外出する","pass":"（パス）","change":"会いに行く相手を選択してください。","help":"特殊な能力があるかどうか自覚していません。夜は積極的に外出して、様子をさぐりましょう。"},"vote":{"group":"POTOF","for":"live","at":"main","cmd":"vote","target":"投票","pass":"（委任する）","change":"処刑する相手を選択してください。","help":"全員で多数決をし、一人だけ処刑します。"},"vote_role":{"for":"live","at":"main","target":"投票","pass":"（パス）","change":"処刑する相手を選択してください。","help":""},"entrust":{"group":"POTOF","for":"live","at":"main","cmd":"vote","target":"委任","pass":"（投票する）","change":"処刑を棄権し、一票を委ねる相手を選択してください。","help":"投票は棄権し、他人の投票と同じとすることができます。"},"jammer":{"for":"live","at":"progress","target":"邪魔","pass":"（パス）","change":"占いから保護する相手を選択してください。","help":"毎夜、一人をあらゆる占いから包み隠すことができます。\n自分自身を隠すことはできません。"},"snatch":{"for":"live","at":"progress","target":"換わる","pass":"（パス）","change":"顔と名前を簒奪する相手を選択してください。","help":"好きな人物の顔と名前を奪い、自身のそれと入れ替えることができます。この能力は非常に露顕しやすいので、行使には注意が必要です。\nもしも夜の間に屍体になった人を対象に選んだなら、旧いあなたは命を落とし、あなたとなったその屍体は息を吹き返すでしょう。\nまた、結ばれた絆や、笛吹きに誘われたことは姿とともにあり、姿を移し替えたときに引き継ぐことがあります。\n一度移し替えた姿は、永遠にあなたのものです。二度と元には戻りません。"},"gm_droop":{"group":"GM","for":"gm_live","at":"all","cmd":"gamemaster","target":"すぐに墓下へ","pass":"―――","change":"参加者として死なせる相手を選択してください。","help":""},"gm_live":{"group":"GM","for":"gm_dead","at":"all","cmd":"gamemaster","target":"すぐに表舞台へ","pass":"―――","change":"参加者として蘇生させる相手を選択してください。","help":""},"gm_disable_vote":{"group":"GM","for":"live","at":"all","cmd":"gamemaster","target":"投票から保護する","pass":"―――","change":"投票対象に選ぶことを認めない相手を選択してください。","help":""},"gm_enable_vote":{"group":"GM","for":"live","at":"all","cmd":"gamemaster","target":"投票を認可する","pass":"―――","change":"投票対象に選ぶこと許可する相手を選択してください。","help":""},"maker":{"group":"GM","for":"all","at":"all","cmd":"maker","target":"村を任せる","pass":"―――","change":"村の管理を任せる相手を選択してください。","help":""},"kick":{"group":"GM","for":"all","at":"prologue","cmd":"kick","target":"退去！","pass":"―――","change":"退去いただこう、かな…、と思った相手を選択してください。","help":""},"blind":{"label":"本人に秘密","help":"（サーバーは、この役職を保有していることを本人に通知しません。）"},"wolf":{"help":"あなたは人狼と判定されます。"},"pixi":{"help":"占いの対象となると死亡します。勝利判定では人間にも人狼にも数えられません。"},"human":{"help":"勝利判定では人間として数えられます。"},"evil":{"help":"人間でありながら、人外に協力する裏切り者です。場合によっては敢えて死ぬ必要があります。"},"circular":{"help":"この贈り物は、次に渡す相手を選び渡すことになっています。\n将来もしふたたびあなたの手に渡ったら、贈り物は消え去ってしまいます。"},"friend":{"help":"仲間に向けては能力を使いません。"},"once":{"help":"能力を持ちますが、その能力はたった一度しか使うことができません。"},"hate":{"help":"絆の運命は悲しい殺し合いを強いるでしょう。彼らは本来の勝利条件ではなく、ただ一人生き残ることが勝利条件となります。"},"love":{"help":"絆の運命は彼らを、愛で固く結ぶでしょう。彼らは本来の勝利条件ではなく、共存が勝利条件となります。"},"droop":{"help":"あなたは、生きた人狼の人数の二日後に、命を落とします。"},"curse":{"help":"あなたを占ってしまった占い師は死亡します。"},"aura":{"help":"あなたはオーラを持ちます。"},"rob":{"help":"誰もならなかった残り役職をすべて知ります。\n次の夜、その中から運命の導くままひとつの役職を選び、仮面の役職に成り代わるでしょう。\n運命は、あなたになにを課すでしょうか？"},"grave":{"help":"命を落とすと、能力を発揮することができます。"},"armor":{"help":"狼の襲撃や賞金稼の手により殺されることはありません。"},"medium":{"help":"処刑や突然死で死んだ全員を対象にします。\n無惨な死体について判断することは出来ません。"},"spy_role":{"help":"その人が持つ役職がわかります。恩恵は、役職とは別個のものです。このため半端者、悪鬼、妖精の子を直接見分けることはできません。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"spy_win":{"help":"その人が持つ陣営（勝利条件）がわかります。多くは役職を思わせるものです。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"spy_aura":{"help":"その人が能力を持つか判別出来ます。あなたにとって、村人、人狼、白狼は能力のオーラを持ちませんが、そうでない人物は能力のオーラを纏っていると感じられます。"},"spy_wolf":{"help":"その人が人間か人狼か判別できます。ただし狼血族は人狼と誤認し、白狼は人間と誤認してしまいます。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"},"stigma":{"help":"独特の印を持つため、あなたの正体は比較的信用されやすいでしょう。"},"fm":{"help":"結社員・共鳴者が誰なのか知っています。"},"fanatic":{"help":"人狼にはあなたの正体はわかりませんが、あなたは人狼が誰か知っています。また、新たに人狼となったものを知ることもできます。\nですが、あなたは狼血族や擬狼妖精も人狼であると誤認してしまいますし、一匹狼の正体を知ることはできません。"},"tafness":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされると傷を負うものの、一日だけ生き長らえます。"},"hurt":{"group":"STATUS","label":"負傷","help":""},"sheep":{"group":"STATUS","help":"踊り狂ったおぼろげな記憶がある。"},"infected":{"group":"STATUS","label":"感染","help":""},"hide_for_vote":{"group":"STATUS","hide":["vote"],"label":"投票対象外","help":""},"hide_for_role":{"group":"STATUS","hide":["role"],"label":"能力対象外","help":""},"hide_for_gift":{"group":"STATUS","hide":["gift"],"label":"恩恵対象外","help":""},"disable_vote":{"group":"STATUS","disable":["vote"],"label":"<s>投票</s>","help":""},"disable_special":{"group":"STATUS","disable":["gift","role"],"label":"<s>全能力</s>","help":"あなたはもう特殊能力を使うことができません。"},"disable_gift":{"group":"STATUS","disable":["gift"],"label":"<s>恩恵</s>","help":"あなたはもう恩恵能力を使うことができません。"},"disable_role":{"group":"STATUS","disable":["role"],"label":"<s>能力</s>","help":"あなたはもう役職能力を使うことができません。"},"disable_poison":{"group":"STATUS","disable":["poison"],"label":"<s>毒薬</s>","help":"あなたはもう毒薬を使うことができません。"},"disable_analeptic":{"group":"STATUS","disable":["analeptic"],"label":"<s>蘇生薬</s>","help":"あなたはもう蘇生薬を使うことができません。"},"twolife":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされても、一度だけは命が助かります。"},"august":{"help":"あなたが処刑されることに決まると一度だけは、その処刑はとりやめになります。"},"revenge":{"help":"どんな理由であれ、あなたが命を落とすと、その夜のうちに能力を発揮します。"},"seal":{"help":"ひとりの犯人が特定できるのであれば、犯人はいっさいの能力を行使できなくなります。"},"grudge":{"help":"あなたが命を落とした翌日、人狼は二つの襲撃をおこない、二人を一度に殺害します。"},"riot":{"help":"あなたが死亡した翌日は、村人達が暴力的に二つの投票をおこない、二人を一度に処刑します。"},"wolfify":{"help":"あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされると、あなたは人狼になります。"},"chkGSAY":{"help":"顔や名前はわかりませんが、あなたの耳には死者の声が届いちゃうことでしょう。"},"ENTRY":{"group":"POTOF","cmd":"entry","text":["talk"],"label":"導入","help":"キャラクターを選択し、エントリーしましょう。"},"MAKER":{"group":"GM","cmd":"write","text":["talk","memo","act"],"label":"村立て話","help":"あなたは村立て人です。"},"ADMIN":{"group":"GM","cmd":"write","text":["talk","memo","act"],"label":"管理者話","help":"あなたは管理人です。"},"SPSAY":{"cmd":"write","text":["talk","memo"],"label":"共鳴","help":"あなたは、共鳴者同士にしか聞こえない会話が可能です。"},"WSAY":{"cmd":"write","text":["talk","memo"],"label":"囁き","help":"あなたは、人狼（と囁き狂人、擬狼妖精）同士にしか聞こえない会話が可能です。"},"XSAY":{"cmd":"write","text":["talk","memo"],"label":"念話","help":"あなたは、念波星でしか聞こえない会話が可能です。"},"GSAY":{"group":"POTOF","cmd":"write","text":["talk","memo","act"],"label":"会話","help":"あなたは、死者にしか聞こえない会話が可能です。"},"MSAY":{"cmd":"write","text":["talk","memo"],"label":"口借り","help":"あなたは<b>_NPC_</b>の口を借り、好きな言葉を伝えることができます。"},"AIM":{"group":"POTOF","for":"near","cmd":"write","text":["talk","memo"],"label":"内緒話","help":null},"TSAY":{"group":"POTOF","cmd":"write","text":["talk","memo"],"label":"独り言","help":null},"SSAY":{"group":"POTOF","cmd":"write","text":["talk","memo","act"],"label":"会話","help":null},"VSAY":{"group":"POTOF","cmd":"write","text":["talk","memo","act"],"label":"会話","help":null},"VGSAY":{"group":"POTOF","cmd":"write","text":["talk","memo","act"],"label":"会話","help":null}}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Model, Query, Rule, Set, game;

var _require = __webpack_require__(2);

Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;
Set = _require.Set;

var _require2 = __webpack_require__(13);

game = _require2.game;


new Rule("book").schema(function () {
  this.order("write_at");
  this.path("folder");
  this.has_many("parts");
  this.has_many("phases");
  this.has_many("sections");
  this.has_many("chats");
  this.has_many("potofs");
  this.belongs_to("winner");
  this.property('model', {
    head: {
      get: function get() {
        return this.idx + ": " + this.label;
      }
    }
  });
  return this.scope(function (all) {
    return {};
  });
});

new Rule("winner").schema(function () {
  return this.scope(function (all) {});
});

new Rule("option").schema(function () {
  return this.scope(function (all) {});
});

new Rule("say").schema(function () {
  this.scope(function (all) {
    return {
      active: all.in({
        for: game.folder_id
      })
    };
  });
  return this.deploy(function () {
    return this.for != null ? this.for : this.for = [];
  });
});

new Rule("game").schema(function () {
  return this.scope(function (all) {});
});

Set.option.set(__webpack_require__(85));

Set.winner.set(__webpack_require__(86));

Set.say.set(__webpack_require__(87));

Set.game.set(__webpack_require__(88));

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = {"select-role":{"label":"役職希望","help":"役職希望を受け付ける"},"random-target":{"label":"ランダム","help":"投票・能力の対象に「ランダム」を含める"},"seq-event":{"label":"整列事件","help":"事件が順序どおりに発生する"},"show-id":{"label":"ID公開","help":"ユーザーIDを公開する"},"entrust":{"label":"委任投票","help":"委任投票をする"},"undead-talk":{"label":"死後の会話","help":"狼・妖精と死者との間で、会話ができる"},"aiming-talk":{"label":"内緒話","help":"ふたりだけの内緒話をすることができる"}}

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = {"HUMAN":{"label":"村人陣営","group":"村人陣営","order":1,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_HUMAN\" TARGET=\"_blank\">村人陣営</A></b>\n<br>\n人間(妖精や人外の者を除く)の数が人狼以下になるまでに人狼と妖精が全滅すれば勝利です。\n<br>\nただし、狼を全滅させた時点で妖精、もしくは恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"EVIL":{"label":"裏切りの陣営","group":"敵側の人間","label_human":"敵側の人間","order":2,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_EVIL\" TARGET=\"_blank\">裏切りの陣営</A></b>\n<br>\n村人・恋人が敗北すれば勝利者の一員に加わります。\n<br>\nあなたは破滅を望んでいるのです。人狼や妖精やそれ以外の勝利、または、誰もいなくなることを目指しましょう。"},"WOLF":{"label":"人狼陣営","group":"人狼陣営","label_human":"人狼陣営の人間","order":3,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_WOLF\" TARGET=\"_blank\">人狼陣営</A></b>\n<br>\nルール「タブラの人狼」「死んだら負け」「Trouble☆Aliens」では人間(妖精や人外の者を除く)の数を人狼と同数以下まで減らせば、ルール「ミラーズホロウ」「深い霧の夜」では役職「村人」を全滅させれば勝利です。\n<br>\nただし、最後まで妖精、もしくは恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"LONEWOLF":{"label":"一匹狼","group":"その他","order":4,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_LONEWOLF\" TARGET=\"_blank\">一匹狼陣営</A></b>\n<br>\nルール「タブラの人狼」「死んだら負け」「Trouble☆Aliens」では人間(妖精や人外の者を除く)の数を一匹狼と同数以下まで減らせば、ルール「ミラーズホロウ」「深い霧の夜」では役職「村人」を全滅させ、かつ、人狼陣営の狼が生きていなければ勝利です。\n<br>\nただし、最後まで妖精、もしくは恋人が生き残っていると敗北になり、他にも勝利を掻っ攫うもの達が存在します。"},"PIXI":{"label":"妖精","group":"妖精","order":5,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_PIXI\" TARGET=\"_blank\">妖精陣営</A></b>\n<br>\n人狼が全滅するか、人間(妖精や人外の者を除く)の数が人狼と同数以下まで減るまで「生き残れば」勝利です。\n<br>\nただし、恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"},"OTHER":{"label":"その他","group":"その他","order":6},"GURU":{"label":"笛吹き","group":"その他","order":7,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_GURU\" TARGET=\"_blank\">笛吹き</A></b>\n<br>\n笛吹き以外の生存者が勧誘された者だけになれば勝利となります。笛吹き自身は、最終的に生き残っていなくとも構いません。\n<br>\nただし、横から勝利を掻っ攫うもの達が存在します。"},"LOVER":{"label":"恋人陣営","group":"その他","order":8,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_LOVER\" TARGET=\"_blank\">恋人陣営</A></b>\n<br>\n恋人達だけが生き残る、もしくはいずこかの陣営が勝利を手にしたとき、絆の恋人達が生存していれば勝利です。\n<br>\nただし、ひとりだけ蘇生したなどの不幸で、恋を成就できない恋人は、勝利しません。"},"HATER":{"label":"邪気陣営","group":"その他","order":9,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_HATER\" TARGET=\"_blank\">邪気陣営</A></b>\n<br>\nいずこかの陣営が勝利を手にしたとき、運命に決着をつけていれば勝利します。決着とは、絆の天敵をすべて倒し、一人だけが生き残っていることです。\n殺し合いの絆を断ち切りましょう。絆の相手が死んでも、後を追うことはありません。\n<br>\n絆の天敵とは、たとえあなた自身には関係のなくとも、あらゆる絆を結んでいるもの全てを指します。"},"DISH":{"label":"据え膳","group":"その他","order":10,"help":"<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_DISH\" TARGET=\"_blank\">据え膳</A></b>\n<br>\nすべてに決着がついたとき、あなたが狼の襲撃、もしくは賞金稼の道連れにより死亡していれば、勝利者の一員に加わります。"},"NONE":{"label":"―","group":"その他","order":98,"help":"あなたは勝負を眺めています。勝利したり、敗北したりといったことはありません。"},"MOB":{"label":"見物人","group":"その他","order":99,"help":"あなたは<b>_ROLE_の<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MOB\" TARGET=\"_blank\">見物人</A></b>です。いかなる陣営の人数にも含まれません。"},"LEAVE":{"label":"―","group":"その他","order":100,"help":"あなたは村を去りました。勝利したり、敗北したりといったことは、もうありません。"}}

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = {"sow":{"CAPTION":"人狼議事","disabled":true},"say5":{"CAPTION":"寡黙への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10},"point":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999},"count":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0},"lobby":{"CAPTION":"ロビー","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"say1":{"CAPTION":"静寂への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":1,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 300字x1回/1act'","MAX_MESCNT":300},"say5x200":{"CAPTION":"寡黙への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 200字x5回/5act'","MAX_MESCNT":200},"say5x300":{"CAPTION":"小論文への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 300字x5回/15act'","MAX_MESCNT":300},"saving":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"節約","HELP":"250字x20回/15act","RECOVERY":0,"MAX_SAY":20,"MAX_TSAY":10,"MAX_SPSAY":10,"MAX_WSAY":30,"MAX_GSAY":20,"MAX_PSAY":20,"MAX_ESAY":999,"MAX_SAY_ACT":15,"MAX_MESCNT":250,"MAX_MESLINE":10},"wbbs":{"COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"人狼BBS","HELP":"200字x20回","RECOVERY":0,"MAX_SAY":20,"MAX_TSAY":5,"MAX_SPSAY":20,"MAX_WSAY":40,"MAX_GSAY":20,"MAX_PSAY":20,"MAX_ESAY":999,"MAX_SAY_ACT":0,"MAX_MESCNT":200,"MAX_MESLINE":5},"euro":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"欧州","HELP":"（24h回復） 800字x30回/30act","RECOVERY":1,"MAX_SAY":30,"MAX_TSAY":999,"MAX_SPSAY":999,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":30,"MAX_ESAY":999,"MAX_SAY_ACT":30,"MAX_MESCNT":800,"MAX_MESLINE":20},"tiny":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"たりない","HELP":"（24h回復）（メモは20pt） 333pt/9act","RECOVERY":1,"MAX_SAY":333,"MAX_TSAY":999,"MAX_SPSAY":333,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":999,"MAX_SAY_ACT":9,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":300,"MAX_MESLINE":10},"weak":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"むりせず","HELP":"（24h回復）（メモは20pt） 777pt/15act","RECOVERY":1,"MAX_SAY":777,"MAX_TSAY":777,"MAX_SPSAY":777,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":1200,"MAX_SAY_ACT":15,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":600,"MAX_MESLINE":15},"juna":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"しんもん","HELP":"（24h回復） 1200pt/24act","RECOVERY":1,"MAX_SAY":1200,"MAX_TSAY":700,"MAX_SPSAY":700,"MAX_WSAY":3000,"MAX_GSAY":2000,"MAX_PSAY":2000,"MAX_SAY_ACT":24,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"vulcan":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"いっぱい","HELP":"（24h回復） 1000pt+++300pt/36act","RECOVERY":1,"MAX_SAY":1000,"MAX_TSAY":1000,"MAX_SPSAY":1500,"MAX_WSAY":4000,"MAX_GSAY":3000,"MAX_PSAY":3000,"MAX_SAY_ACT":36,"ADD_SAY":300,"MAX_ADDSAY":3,"MAX_MESCNT":1000,"MAX_MESLINE":20},"infinity":{"CAPTION":"むげん","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20,"for":["beta"]},"weak_braid":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"むりせず","HELP":"（24h回復）（メモは20pt） 600pt++100pt/15act","RECOVERY":1,"MAX_SAY":600,"MAX_TSAY":600,"MAX_SPSAY":600,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":1200,"MAX_SAY_ACT":15,"ADD_SAY":100,"MAX_ADDSAY":2,"MAX_MESCNT":600,"MAX_MESLINE":15},"juna_braid":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"しんもん","HELP":"（24h回復） 800pt++200pt/24act","RECOVERY":1,"MAX_SAY":800,"MAX_TSAY":700,"MAX_SPSAY":700,"MAX_WSAY":3000,"MAX_GSAY":2000,"MAX_PSAY":2000,"MAX_SAY_ACT":24,"ADD_SAY":200,"MAX_ADDSAY":2,"MAX_MESCNT":1000,"MAX_MESLINE":20},"vulcan_braid":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"いっぱい","HELP":"（24h回復） 1000pt+++300pt/36act","RECOVERY":1,"MAX_SAY":1000,"MAX_TSAY":1000,"MAX_SPSAY":1500,"MAX_WSAY":4000,"MAX_GSAY":3000,"MAX_PSAY":3000,"MAX_SAY_ACT":36,"ADD_SAY":300,"MAX_ADDSAY":3,"MAX_MESCNT":1000,"MAX_MESLINE":20},"infinity_braid":{"CAPTION":"むげん","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20}}

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = {"TABULA":{"label":"タブラの人狼","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"},"MILLERHOLLOW":{"label":"ミラーズホロウ","help":"<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>すべての死者は役職が公開される。\n<li>狼を全滅させると、村勝利。\n<li>「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"},"LIVE_TABULA":{"label":"タブラの人狼（死んだら負け）","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"},"LIVE_MILLERHOLLOW":{"label":"ミラーズホロウ（死んだら負け）","help":"<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>「村人」を全滅させると、狼勝利。役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"},"TROUBLE":{"label":"Trouble☆Aliens","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>守護者は、より大人数の人狼からは守りきることができず、身代わりに感染する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村側の生存者が勝利（村側は死んだら負ける）。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼と感染者の勝利。\n"},"MISTERY":{"label":"深い霧の夜","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>村側は自分の役職を自覚しない。\n<li>村側は、能力の結果不審者を見かけることがある。\n<li>人狼の行動対象に選ばれると、不審者を見かける。\n<li>狼を全滅させると、村勝利。\n<li>役職「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"},"VOV":{"disabled":true,"label":"狂犬病の谷","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"},"SECRET":{"label":"陰謀に集う胡蝶","help":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼の生存者が勝利。\n<li>いかなる場合も、死んでしまったものは敗北である。\n"}}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model, Query, Rule;

var _require = __webpack_require__(2);

Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;


new Rule("part").schema(function () {
  this.path("folder", "book");
  this.has_many("sections");
  this.has_many("phases");
  this.has_many("cards");
  this.has_many("stats");
  this.has_many("chats");
  this.scope(function (all) {
    return {};
  });
  return this.model = function (_model) {
    (0, _inherits3.default)(model, _model);

    function model() {
      (0, _classCallCheck3.default)(this, model);
      return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
    }

    (0, _createClass3.default)(model, null, [{
      key: "order",
      value: function order(o, emit) {
        return emit("list", {
          sort: ["chats.list.0.0.write_at", "asc"]
        });
      }
    }]);
    return model;
  }(this.model);
});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model, Query, Rule;

var _require = __webpack_require__(2);

Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;


new Rule("phase").schema(function () {
  this.path("folder", "book", "part");
  this.has_many("chats");
  this.scope(function (all) {
    return {};
  });
  this.deploy(function () {});
  return this.model = function (_model) {
    (0, _inherits3.default)(model, _model);

    function model() {
      (0, _classCallCheck3.default)(this, model);
      return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
    }

    (0, _createClass3.default)(model, null, [{
      key: "map_reduce",
      value: function map_reduce(o, emit) {
        emit("group", o.group, {
          count: 1
        });
        return emit("handle", o.handle, {
          count: 1
        });
      }
    }, {
      key: "order",
      value: function order(o, emit) {
        emit("list", {
          sort: ["write_at"]
        });
        emit("group", {
          sort: ["count", "desc"]
        });
        return emit("handle", {
          sort: ["count", "desc"]
        });
      }
    }]);
    return model;
  }(this.model);
});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Model, Query, Rule, format;

var _require = __webpack_require__(2);

Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;


format = {
  head: new Intl.DateTimeFormat('ja-JP', {
    weekday: "short",
    hour: "2-digit"
  }),
  tail: new Intl.DateTimeFormat('ja-JP', {
    hour: "2-digit"
  })
};

new Rule("section").schema(function () {
  this.order("write_at");
  this.path("folder", "book", "part");
  this.has_many("chats");
  this.scope(function (all) {
    return {};
  });
  this.deploy(function () {
    return this.label != null ? this.label : this.label = this.idx;
  });
  return this.property('model', {
    label: {
      get: function get() {
        var begin, write;
        begin = format.head.format(this.begin_at);
        write = format.head.format(this.write_at);
        if (begin === write) {
          return begin;
        } else {
          write = format.tail.format(this.write_at);
          return begin.replace("時", "-" + write);
        }
      }
    }
  });
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _set = __webpack_require__(93);

var _set2 = _interopRequireDefault(_set);

var _from = __webpack_require__(12);

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model,
    Query,
    Rule,
    indexOf = [].indexOf;

var _require = __webpack_require__(2);

Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;


new Rule("chat").schema(function () {
  var anker, blank, pages;
  this.path("folder", "book", "part", "phase");
  this.belongs_to("section");
  this.belongs_to("potof");
  blank = [];
  blank.all = 0;
  pages = function pages(group, q) {
    return function (hides, words, part_id) {
      return q.where(function (o) {
        var ref, ref1;
        return part_id === o.part_id && !(ref = o.potof_id, indexOf.call(hides, ref) >= 0) && (ref1 = o.phase.group, indexOf.call(group, ref1) >= 0);
      }).search(words);
    };
  };
  this.scope(function (all) {
    return {
      wiki: function wiki(hides, words, part_id) {
        return all.where(function (o) {
          var ref;
          return part_id === o.part_id && !(ref = o.potof_id, indexOf.call(hides, ref) >= 0);
        }).search(words);
      },
      memo: pages('M', all),
      full: pages('SAI', all),
      normal: pages('SAI', all.where(function (o) {
        var ref;
        return (ref = o.phase.handle) === 'SSAY' || ref === 'VSSAY' || ref === 'MAKER' || ref === 'ADMIN' || ref === 'public';
      })),
      solo: pages('SAI', all.where(function (o) {
        var ref;
        return (ref = o.phase.handle) === 'TSAY' || ref === 'private';
      })),
      extra: pages('SAI', all.where(function (o) {
        var ref;
        return !((ref = o.phase.handle) === 'SSAY' || ref === 'VSSAY' || ref === 'MAKER' || ref === 'ADMIN' || ref === 'dark' || ref === 'GSAY' || ref === 'TSAY' || ref === 'public');
      })),
      rest: pages('SAI', all.where(function (o) {
        var ref;
        return (ref = o.phase.handle) === 'GSAY';
      })),
      ankers: function ankers(book_id, a) {
        var ids;
        ids = a.map(function (idx) {
          return book_id + idx;
        });
        return all.where({
          _id: ids
        }).sort("write_at", "desc");
      },
      sow_cite: function sow_cite(a) {
        var b, c;
        b = a.split('-');
        if ('TS' === b[3]) {
          b[3] = 'AIM';
        }
        c = a.split('-');
        if (c[2]) {
          c[2]--;
        }
        return all.find(a, b.join('-'), c.join('-'));
      },
      now: function now() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return {
          memo: function memo(part_id) {
            var ref, ref1;
            return (ref = (ref1 = all.memo.apply(all, args.concat([part_id])).reduce) != null ? ref1.last : void 0) != null ? ref : blank;
          },
          memos: function memos(part_id) {
            var ref, ref1;
            return (ref = (ref1 = all.memo.apply(all, args.concat([part_id])).reduce) != null ? ref1.list : void 0) != null ? ref : blank;
          },
          full: function full(part_id) {
            var ref, ref1;
            return (ref = (ref1 = all.full.apply(all, args.concat([part_id])).reduce) != null ? ref1.list : void 0) != null ? ref : blank;
          },
          normal: function normal(part_id) {
            var ref, ref1;
            return (ref = (ref1 = all.normal.apply(all, args.concat([part_id])).reduce) != null ? ref1.list : void 0) != null ? ref : blank;
          },
          solo: function solo(part_id) {
            var ref, ref1;
            return (ref = (ref1 = all.solo.apply(all, args.concat([part_id])).reduce) != null ? ref1.list : void 0) != null ? ref : blank;
          },
          extra: function extra(part_id) {
            var ref, ref1;
            return (ref = (ref1 = all.extra.apply(all, args.concat([part_id])).reduce) != null ? ref1.list : void 0) != null ? ref : blank;
          },
          rest: function rest(part_id) {
            var ref, ref1;
            return (ref = (ref1 = all.rest.apply(all, args.concat([part_id])).reduce) != null ? ref1.list : void 0) != null ? ref : blank;
          },
          wiki: function wiki(part_id) {
            var ref, ref1;
            return (ref = (ref1 = all.wiki.apply(all, args.concat([part_id])).reduce) != null ? ref1.list : void 0) != null ? ref : blank;
          }
        };
      }
    };
  });
  anker = {
    belongs_to: 'chats',
    sort: ["count", "desc"]
  };
  this.deploy(function () {
    if (this.mention_ids == null) {
      this.mention_ids = [];
    }
    return this.q = {
      group: [this.potof_id, this.phase_id].join('+'),
      search_words: this.log
    };
  });
  return this.model = function () {
    var model = function (_model) {
      (0, _inherits3.default)(model, _model);

      function model() {
        (0, _classCallCheck3.default)(this, model);
        return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
      }

      (0, _createClass3.default)(model, [{
        key: "make_ankers",
        value: function make_ankers() {
          for (var _len2 = arguments.length, ids = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            ids[_key2] = arguments[_key2];
          }

          var book_id;
          book_id = this.book_id;

          ids.push(this.id);
          ids = (0, _from2.default)(new _set2.default(ids));
          return [book_id, ids.map(function (id) {
            return id.slice(book_id.length);
          })];
        }
      }, {
        key: "anker",
        value: function anker(part_id) {
          var guide, mark;
          var _phase = this.phase;
          mark = _phase.mark;
          guide = _phase.guide;

          switch (false) {
            case !!guide:
              return "";
            case mark == null:
              if (part_id === this.part_id) {
                return "" + mark + this.idx;
              } else {
                return "" + mark + this.part.idx + ":" + this.idx;
              }
              break;
            default:
              if (part_id === this.part_id) {
                return this.id.slice(this.part_id.length);
              } else {
                return this.id.slice(this.book_id.length);
              }
          }
        }
      }], [{
        key: "map_reduce",
        value: function map_reduce(o, emit) {
          var all, all_phase_id, i, len, mention_id, ref, results;
          emit("last", o.q.group, {
            max: o.write_at
          });
          emit("say", {
            max: o.write_at + 1,
            min: o.write_at,
            count: 1,
            all: o.log.length
          });
          if (o.phase_id.match(/-[SGV]S?$/)) {
            all = o.phase_id.split("-");
            all[2] = 'top';
            all_phase_id = all.join("-");
            emit("potof", all_phase_id, o.potof_id, {
              count: 1,
              all: o.log.length,
              max: o.write_at + 1,
              min: o.write_at
            });
            emit("potof", o.phase_id, o.potof_id, {
              count: 1,
              all: o.log.length,
              max: o.write_at + 1,
              min: o.write_at
            });
          }
          if (o.phase_id.match(/-.M?$/)) {
            emit("side", o.phase_id, o.potof_id, {
              max: o.write_at + 1
            });
          }
          ref = o.mention_ids;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            mention_id = ref[i];
            emit("mention", mention_id, {
              count: 1
            });
            results.push(emit("mention_to", mention_id, o.id, {
              count: 1
            }));
          }
          return results;
        }
      }, {
        key: "order",
        value: function order(o, emit) {
          var i, len, mention_id, ref, results;
          emit("last", {
            pluck: "max_is",
            sort: [["max_is.phase.id", "max_is.write_at"], ["desc", "desc"]],
            page_by: this.page_by
          });
          emit("list", {
            sort: ["write_at", "asc"],
            page_by: this.page_by
          });
          emit("mention", anker);
          ref = o.mention_ids;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            mention_id = ref[i];
            results.push(emit("mention_to", mention_id, anker));
          }
          return results;
        }
      }]);
      return model;
    }(this.model);

    ;

    model.page_by = 30;

    return model;
  }.call(this);
});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/set");

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Base, Base59, Set, edit;

__webpack_require__(17);

var _require = __webpack_require__(2);

Set = _require.Set;


Base = function Base(table) {
  var size;
  size = table.length;
  return {
    num2str: function num2str(num) {
      var at, str;
      str = "";
      while (num) {
        at = num % size;
        str = table[at] + str;
        num = Math.floor(num / size);
      }
      return str;
    }
  };
};

Base59 = Base("ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789");

module.exports = edit = {
  potof: {
    _id: 'edit-edit-self',
    tag_id: "",
    face_id: "",
    job: "",
    sign: "ななころび"
  },
  phase: {
    _id: 'edit-edit-edit-edit',
    handle: 'SSAY'
  },
  chat: {
    _id: 'edit-edit-edit-edit-edit',
    potof_id: "edit-edit-self",
    write_at: 0,
    show: "talk",
    deco: "giji",
    to: null,
    head: "",
    log: "",
    random: [],
    new_idx: function new_idx() {
      var zero = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return Base59.num2str(new Date() - zero);
    }
  }
};

edit.org_chat = edit.chat;

Set.chat.add(edit.chat);

Set.phase.add(edit.phase);

Set.potof.add(edit.potof);

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toArray2 = __webpack_require__(28);

var _toArray3 = _interopRequireDefault(_toArray2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mem, Model, Query, Rule, Set, format, locale, url, welcome;

var _Mem = Mem = __webpack_require__(2);

Set = _Mem.Set;
Model = _Mem.Model;
Query = _Mem.Query;
Rule = _Mem.Rule;

var _require = __webpack_require__(13);

url = _require.url;


format = __webpack_require__(32);

locale = __webpack_require__(33);

new Rule("sow_roletable").schema(function () {});

new Rule("sow_turn").schema(function () {
  this.order("turn", "asc");
  return this.belongs_to("village", {
    target: "sow_villages",
    key: "story_id"
  });
});

new Rule("sow_village").schema(function () {
  var cmd;
  this.has_many("turns", {
    target: "sow_turns",
    key: "story_id"
  });
  this.habtm("option_datas", {
    target: "options",
    key: "options"
  });
  this.belongs_to("say", {
    target: "says",
    key: "q.say"
  });
  this.belongs_to("mob", {
    target: "roles",
    key: "q.mob"
  });
  this.belongs_to("game", {
    target: "games",
    key: "q.game"
  });
  this.scope(function (all) {
    return {
      prologue: all.where({
        mode: "prologue"
      }).sort("timer.nextcommitdt", "desc"),
      progress: all.where({
        mode: "progress"
      }).sort("timer.nextcommitdt", "desc"),
      mode: function mode(_mode) {
        return all.where({ mode: _mode });
      },
      summary: function summary(mode, query_in, query_where, search_word) {
        return all.where({ mode: mode }).in(query_in).where(query_where).search(search_word);
      },
      all_contents: function all_contents(mode, query_in, query_where, search_word, order, asc) {
        return all.where({ mode: mode }).in(query_in).where(query_where).search(search_word).order({
          sort: [order, asc],
          page_by: 25
        });
      }
    };
  });
  this.deploy(function () {
    var hour, in_month, interval, list, minute, monthry, ref, ref1, ref2, ref3, updated_at, yeary;
    var _upd = this.upd;
    interval = _upd.interval;
    hour = _upd.hour;
    minute = _upd.minute;

    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    updated_at = new Date(this.timer.updateddt);
    this.write_at = updated_at;
    in_month = format(updated_at, 'MM月', { locale: locale });
    yeary = format(updated_at, 'YYYY年', { locale: locale });
    monthry = yeary + in_month;
    this.q = {
      yeary: yeary,
      monthry: monthry,
      in_month: in_month,
      sow_auth_id: this.sow_auth_id.replace(/\./g, '&#2e'),
      folder_id: this.folder.toUpperCase(),
      size: "x" + this.vpl[0],
      say: this.type.say,
      mob: this.type.mob,
      game: this.type.game,
      upd_at: hour + ":" + minute,
      upd_range: interval * 24 + "h",
      rating: this.rating,
      search_words: this.name
    };
    if ((ref = this.rating) === null || ref === 0 || ref === "0" || ref === "null" || ref === "view") {
      this.q.rating = "default";
    }
    if ((ref1 = this.rating) === "R15" || ref1 === "r15" || ref1 === "r18") {
      this.q.rating = "alert";
    }
    if ((ref2 = this.rating) === "gro") {
      this.q.rating = "violence";
    }
    list = (ref3 = Query.sow_roletables.find(this.type.roletable).role_ids_list) != null ? ref3[this.q.size] : void 0;
    if ((list != null ? list.length : void 0) && !this.card.config.length) {
      this.card.config = list;
    }
    this.card.option = this.options;
    this.folder = Query.folders.find(this.q.folder_id);
    if (this.is_epilogue && this.is_finish) {
      this.href = url.store + "/stories/" + this._id;
      this.mode = "oldlog";
    } else {
      if (this.turns.list[0]) {
        this.mode = "progress";
      } else {
        this.mode = "prologue";
      }
    }
    return this.aggregate = {
      face_ids: []
    };
  });
  this.property('model', {
    query: {
      get: function get() {
        return Query.sow_villages.where({ id: this.id });
      }
    },
    roles: {
      get: function get() {
        var ref;
        return (ref = this.query.reduce) != null ? ref : [];
      }
    },
    event_length: {
      get: function get() {
        var ref, ref1;
        return (ref = (ref1 = this.query.reduce.event) != null ? ref1.length : void 0) != null ? ref : 0;
      }
    }
  });
  cmd = {
    count: 1
  };
  return this.model = function (_model) {
    (0, _inherits3.default)(model, _model);

    function model() {
      (0, _classCallCheck3.default)(this, model);
      return (0, _possibleConstructorReturn3.default)(this, (model.__proto__ || (0, _getPrototypeOf2.default)(model)).apply(this, arguments));
    }

    (0, _createClass3.default)(model, null, [{
      key: "order",
      value: function order(o, emit) {
        emit("yeary", {
          sort: ['id', 'desc']
        });
        emit("in_month", {
          sort: ['id', 'asc']
        });
        emit("upd_at", {
          sort: ['id', 'asc']
        });
        emit("folder_id", {
          sort: ['count', 'desc']
        });
        emit("upd_range", {
          sort: ['count', 'desc']
        });
        emit("sow_auth_id", {
          sort: ['count', 'desc']
        });
        emit("rating", {
          sort: ['count', 'desc']
        });
        emit("size", {
          sort: ['count', 'desc']
        });
        emit("say", {
          sort: ['count', 'desc'],
          belongs_to: "says"
        });
        emit("game", {
          sort: ['count', 'desc'],
          belongs_to: "games"
        });
        emit("mob", {
          sort: ['count', 'desc'],
          belongs_to: "roles"
        });
        emit("option", {
          sort: ['count', 'desc'],
          belongs_to: "options"
        });
        emit("event", {
          sort: ['count', 'desc'],
          belongs_to: "roles"
        });
        emit("discard", {
          sort: ['count', 'desc'],
          belongs_to: "roles"
        });
        return emit("config", {
          sort: ['count', 'desc'],
          belongs_to: "roles"
        });
      }
    }, {
      key: "map_reduce",
      value: function map_reduce(o, emit) {
        var card_id, i, j, k, l, len, len1, len2, len3, opt_id, ref, ref1, ref2, ref3, results;
        emit("mode", o.mode, o.q.folder_id, cmd);
        emit("in_month", o.q.in_month, cmd);
        emit("yeary", o.q.yeary, cmd);
        emit("monthry", o.q.monthry, cmd);
        emit("folder_id", o.q.folder_id, cmd);
        emit("upd_range", o.q.upd_range, cmd);
        emit("upd_at", o.q.upd_at, cmd);
        emit("sow_auth_id", o.q.sow_auth_id, cmd);
        emit("rating", o.q.rating, cmd);
        emit("size", o.q.size, cmd);
        emit("say", o.q.say, cmd);
        emit("game", o.q.game, cmd);
        emit("mob", o.q.mob, cmd);
        ref = o.card.option;
        for (i = 0, len = ref.length; i < len; i++) {
          opt_id = ref[i];
          emit("option", opt_id, cmd);
        }
        ref1 = o.card.event;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          card_id = ref1[j];
          emit("event", card_id, cmd);
        }
        ref2 = o.card.discard;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          card_id = ref2[k];
          emit("discard", card_id, cmd);
        }
        ref3 = o.card.config;
        results = [];
        for (l = 0, len3 = ref3.length; l < len3; l++) {
          card_id = ref3[l];
          results.push(emit("config", card_id, cmd));
        }
        return results;
      }
    }]);
    return model;
  }(this.model);
});

new Rule("folder").schema(function () {
  this.scope(function (all) {
    return {
      enable: all.where(function (o) {
        return !o.disabled;
      }),
      host: function host(hostname) {
        return all.where({ hostname: hostname });
      }
    };
  });
  return this.deploy(function () {
    var _, hostname, o, path, path_dir, protocol, ref;
    if (o = (ref = this.config) != null ? ref.cfg : void 0) {
      this.rule = o.RULE;
      this.title = o.NAME_HOME;
      this.max_vils = o.MAX_VILLAGES;
      if (this.max_vils) {
        this.href = this.config.cfg.URL_SW + "/sow.cgi";

        var _href$split = this.href.split("/");

        var _href$split2 = (0, _toArray3.default)(_href$split);

        protocol = _href$split2[0];
        _ = _href$split2[1];
        hostname = _href$split2[2];
        path_dir = _href$split2.slice(3);

        this.hostname = hostname;
        path = "/" + path_dir.join("/");
      }
    }
    switch (this.folder) {
      case "LOBBY":
        this.max_vils = 0;
    }
    if (this.disabled = !path) {
      return;
    }
    return this.route = {
      path: path,
      name: this._id
    };
  });
});

Set.folder.set(__webpack_require__(97));

Set.sow_roletable.set(__webpack_require__(98));

welcome = function welcome(h) {
  var chats, face_id, key, phases, potofs;
  chats = {};
  phases = {};
  potofs = {};
  for (key in h) {
    face_id = h[key];
    potofs[key] = {
      write_at: 1484445101000,
      face_id: face_id,
      job: "ようこそ！",
      name: ""
    };
    phases[key] = {
      write_at: 1484445101000,
      name: "通常発言",
      handle: "SSAY"
    };
    chats[key + "-1"] = {
      write_at: 1169852700003,
      potof_id: key,
      show: "post",
      style: "plain",
      log: "祝！人狼議事１０周年！"
    };
  }
  Set.phase.merge(phases);
  Set.potof.merge(potofs);
  return Set.chat.merge(chats);
};

welcome({
  "LOBBY-top-0-0": "c20",
  "CIEL-top-0-0": "c24",
  "BRAID-top-0-0": "c24",
  "PERJURY-top-0-0": "c25",
  "CABALA-top-0-0": "c78",
  "top-top-0-0": "t31"
});

Set.chat.merge({
  "LOBBY-top-0-0-2": {
    write_at: 1370662886000,
    potof_id: "LOBBY-top-0-0",
    show: "talk",
    style: "plain",
    log: "みなさまの助けになるよう、ロビーを用意いたしました。\n相談や困りごと、ちょっとした疑問などをお持ちでしたら、どうぞ、ごゆっくりなさいませ。"
  },
  "CIEL-top-0-0-2": {
    write_at: 1379511895000,
    potof_id: "CIEL-top-0-0",
    show: "talk",
    style: "plain",
    log: "<b>勝利を求めないRP村や、勝利も追求するRP村</b>用に、このページは調整してあるよ。\n早い者勝ちがよいのだけれど、<a href=\"http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD\">企画村予定表</a>という便利なページも見てみましょうね。"
  },
  "BRAID-top-0-0-2": {
    write_at: 1484445101002,
    potof_id: "BRAID-top-0-0",
    show: "talk",
    style: "plain",
    log: "こちらのページは<b>（陣営勝利を求めない）完全RP村、勝利追求を含むRP村</b>用に調整してあるよ。\n早い者勝ちが原則だけれど、<a href=\"http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD\" ng-href=\"{{link.plan}}\">企画村予定表</a>という便利なページも見てみよう。\n\n以下がおおざっぱな、他州との相違点なんだ。\n<ul>\n<li><a href=\"sow.cgi?cmd=rule#mind\">参加者の心構え</a>。ガチとは違うのだよ。ガチとは。\n</li><li><a href=\"http://crazy-crazy.sakura.ne.jp/giji/?(List)SayCnt\">発言ptの量</a>。\n</li><li>村の説明は4000字まで記述できます。\n</li><li>他、細かい調整が入っています。<a href=\"http://crazy-crazy.sakura.ne.jp/giji/\">仕様変更</a>を参考にしましょう。\n</li></ul>"
  },
  "PERJURY-top-0-0-2": {
    write_at: 1393597313000,
    potof_id: "PERJURY-top-0-0",
    show: "talk",
    style: "plain",
    log: "<b>勝利を求めないRP村や、勝利も追求するRP村</b>用に、このページは調整してあるのだ。\n紳士淑女の諸君には、<a href=\"http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD\">企画村予定表</a>を参考に、譲り合いの精神で調整してほしい。"
  },
  "CABALA-top-0-0-2": {
    write_at: 1420047938191,
    potof_id: "CABALA-top-0-0",
    show: "talk",
    style: "plain",
    log: "こちらのページは<b>RP村も、勝負も楽しみたい村</b>用に調整してあるよ。\n早い者勝ちが原則だけれど、企画村予定表という便利なページも見てみよう。\nもし君がRPに没頭したいなら、専用の州でどっぷり楽しもう。きっとそのほうが楽しめる。"
  }
});

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = {"PERL_DEFAULT":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[0,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]}}},"PERL_NEW":{"config":{"trsid":["all","star","regend","heavy","complexx","secret"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"]}},"PERL_GAME":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"}}},"UNION":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"UNION","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"}}},"BRAID":{"story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"}}},"all":{"nation":"- すべて -"},"TEST":{"nation":"人狼議事テスト","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","say5x200","say5x300","wbbs","saving","euro","vulcan","infinity"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"../testbed/lib","DIR_HTML":"../testbed/html","DIR_RS":"../testbed/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":1,"TIMEOUT_SCRAP":1,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/testbed","BASEDIR_CGIERR":"http://utage.family.jp//testbed","NAME_HOME":"人狼議事 手元テスト","MAX_VILLAGES":9},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[0,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/testbed/config.pl"}},"PERJURY_OLD":{"folder":"PERJURY_OLD","nation":"人狼議事RP:Bp","vid_code":"Bp","server":"utage.family.jp","oldlog":"/perjury/sow.cgi?cmd=oldlog&rowall=on","livelog":"/perjury/sow.cgi?cmd=rss","info_url":"/perjury/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/perjury/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"CABALA","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/perjury","BASEDIR_CGIERR":"http://utage.family.jp//perjury","NAME_HOME":"人狼議事 Role Play braid perjury","MAX_VILLAGES":0},"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/perjury/config.pl"}},"PRETENSE":{"folder":"PRETENSE","nation":"人狼議事RP:Advance","vid_code":"A","server":"utage.family.jp","oldlog":"/pretense/sow.cgi?cmd=oldlog&rowall=on","info_url":"/pretense/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/pretense/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true}},"RP":{"folder":"RP","nation":"人狼議事RP:","vid_code":"","server":"utage.family.jp","oldlog":"/rp/sow.cgi?cmd=oldlog&rowall=on","info_url":"/rp/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/rp/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true}},"CABALA_OLD":{"folder":"CABALA","nation":"人狼議事陰謀:","vid_code":"C","server":"utage.family.jp","oldlog":"/cabala/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cabala/sow.cgi?cmd=rss","info_url":"/cabala/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/cabala/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"../cafe/data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"CABALA","RULE":"CABALA","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/cabala","BASEDIR_CGIERR":"http://utage.family.jp//cabala","NAME_HOME":"人狼議事 陰謀の苑","MAX_VILLAGES":0},"pl":"/www/giji_log/cabala/config.pl"}},"ALLSTAR_OLD":{"folder":"ALLSTAR","nation":"人狼議事大乱闘:A","vid_code":"A","server":"utage.family.jp","oldlog":"/allstar/sow.cgi?cmd=oldlog&rowall=on","livelog":"/allstar/sow.cgi?cmd=rss","info_url":"/allstar/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/allstar/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"../jksy/data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/allstar","BASEDIR_CGIERR":"http://utage.family.jp//allstar","NAME_HOME":"人狼議事 大乱闘オールスター","MAX_VILLAGES":0},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/allstar/config.pl"}},"ULTIMATE":{"folder":"ULTIMATE","nation":"人狼議事大乱闘:","vid_code":"","server":"utage.family.jp","oldlog":"/ultimate/sow.cgi?cmd=oldlog&rowall=on","info_url":"/ultimate/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/ultimate/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false}},"WOLF":{"folder":"WOLF","nation":"人狼議事標準","vid_code":"","server":"utage.family.jp","oldlog":"/wolf/sow.cgi?cmd=oldlog&rowall=on","livelog":"/wolf/sow.cgi?cmd=rss","info_url":"/wolf/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/wolf/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":false}},"PAN":{"folder":"PAN","nation":"似顔絵人狼","server":"soy-bean.sakura.ne.jp","oldlog":"/pan/sow.cgi?cmd=oldlog&rowall=on","livelog":"/pan/sow.cgi?cmd=rss","info_url":"/pan/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/pan/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":false},"config":{"csid":["sow","juna","name","bloody","orange","15girls","tmmi","cat","bunmei"],"erb":"./asset/sow/pan.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"cfg":{"TYPE":"CABALA","RULE":"PAN","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://soy-bean.sakura.ne.jp/pan","BASEDIR_CGIERR":"http://soy-bean.sakura.ne.jp/pan//","NAME_HOME":"似顔絵人狼","MAX_VILLAGES":1},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[0,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[0,"0:ランダムイベント 1:順序通りのイベント"]},"pl":"/www/giji_log/pan/config.pl","is_angular":"show-fix"}},"MORPHE":{"folder":"MORPHE","nation":"人狼議事 モルペウス","vid_code":"M","server":"morphe.sakura.ne.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"MORPHE","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://morphe.sakura.ne.jp/morphe","BASEDIR_CGIERR":"http://morphe.sakura.ne.jp/morphe//","NAME_HOME":"人狼議事 夢の形","MAX_VILLAGES":0},"pl":"/www/giji_log/morphe/config.pl"}},"SOYBEAN":{"folder":"SOYBEAN","nation":"人狼議事鯖の味噌煮","vid_code":"Bs","server":"soy-bean.sakura.ne.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[1,"1:事件正順の選択を有効にする。"],"ENABLED_TEST_ROLE":[1,"1:テスト中役職を有効にする。"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://soy-bean.sakura.ne.jp/soy-bean","BASEDIR_CGIERR":"http://soy-bean.sakura.ne.jp/soy-bean//","NAME_HOME":"人狼議事 鯖の味噌煮","MAX_VILLAGES":2},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/soy-bean/config.pl","is_angular":"show-fix"}},"CIEL":{"folder":"CIEL","nation":"人狼議事RP:Cheat Ciel","vid_code":"Cc","server":"ciel.moo.jp","oldlog":"/cheat/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cheat/sow.cgi?cmd=rss","info_url":"/cheat/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/cheat/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"CHEAT","RULE":"CIEL","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","BASEDIR_CGIERR":"http://ciel.moo.jp//cheat","URL_SW":"http://ciel.moo.jp/cheat","MAX_VILLAGES":2,"NAME_HOME":"人狼議事 ciel\n- Role Play Cheat -"},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/ciel/config.pl","is_angular":"show-fix"}},"PERJURY":{"folder":"PERJURY","nation":"人狼議事RP:Braid Perjury","vid_code":"Bp","server":"perjury.rulez.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"PERJURY","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://perjury.rulez.jp","BASEDIR_CGIERR":"http://perjury.rulez.jp//","MAX_VILLAGES":2,"NAME_HOME":"人狼議事 perjury rulez\n- Role Play braid -"},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/vage/config.pl"}},"XEBEC":{"folder":"XEBEC","nation":"人狼議事RP:Braid XEBEC","vid_code":"Bx","server":"xebec.x0.to","oldlog":"/xebec/sow.cgi?cmd=oldlog&rowall=on","livelog":"/xebec/sow.cgi?cmd=rss","info_url":"/xebec/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/xebec/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://xebec.x0.to/xebec","BASEDIR_CGIERR":"http://xebec.x0.to//xebec","NAME_HOME":"人狼議事 xebec\n- Role Play braid -","MAX_VILLAGES":3},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/xebec/config.pl"}},"CRAZY":{"folder":"CRAZY","nation":"人狼議事RP:Braid Crazy","vid_code":"Bc","server":"crazy-crazy.sakura.ne.jp","oldlog":"/crazy/sow.cgi?cmd=oldlog&rowall=on","livelog":"/crazy/sow.cgi?cmd=rss","info_url":"/crazy/sow.cgi?\\ua=mb&vid=%s&cmd=vinfo","epi_url":"/crazy/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"WOLF","role_play":true},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://crazy-crazy.sakura.ne.jp/crazy","BASEDIR_CGIERR":"http://crazy-crazy.sakura.ne.jp//crazy","NAME_HOME":"人狼議事 crazy\n- Role Play braid -","MAX_VILLAGES":2},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/crazy/config.pl"}},"CABALA":{"folder":"CABALA","nation":"人狼議事CabalaCafe","vid_code":"C","server":"cabala.halfmoon.jp","oldlog":"/cafe/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cafe/sow.cgi?cmd=rss","info_url":"/cafe/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/cafe/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say1","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"CABALA","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://cabala.halfmoon.jp/cafe","BASEDIR_CGIERR":"http://cabala.halfmoon.jp//cafe","NAME_HOME":"人狼議事 Cabala Cafe","MAX_VILLAGES":0},"pl":"/www/giji_log/cafe/config.pl"}},"ALLSTAR":{"folder":"ALLSTAR","nation":"人狼議事大乱闘:AllStar","vid_code":"A","server":"jinro.jksy.org","oldlog":"/~nanakorobi?cmd=oldlog&rowall=on","livelog":"/~nanakorobi?cmd=rss","info_url":"/~nanakorobi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/~nanakorobi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"BRAID","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://jinro.jksy.org/~nanakorobi","BASEDIR_CGIERR":"http://jinro.jksy.org//~nanakorobi","NAME_HOME":"人狼議事 大乱闘All☆Star","MAX_VILLAGES":0},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/jksy/config.pl"}},"LOBBY_OLD":{"folder":"LOBBY_OLD","nation":"人狼議事旧ロビー","vid_code":"O"},"LOBBY":{"folder":"LOBBY","nation":"人狼議事ロビー","vid_code":"L","server":"crazy-crazy.sakura.ne.jp","oldlog":"/giji_lobby/lobby/sow.cgi?cmd=oldlog&rowall=on","livelog":"/giji_lobby/lobby/sow.cgi?cmd=rss","info_url":"/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false},"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","mad_mad05","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./asset/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["lobby"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../data/user"},"cfg":{"TYPE":"BRAID","RULE":"LOBBY","USERID_NPC":"master","USERID_ADMIN":"master","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":365,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://crazy-crazy.sakura.ne.jp/giji_lobby/lobby","BASEDIR_CGIERR":"http://crazy-crazy.sakura.ne.jp//giji_lobby/lobby","NAME_HOME":"人狼議事 ロビー","MAX_VILLAGES":10,"MAX_LOG":750},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[0,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[0,"0:ランダムイベント 1:順序通りのイベント"]},"pl":"/www/giji_log/lobby/config.pl","is_angular":"show-fix"}},"OFFPARTY":{"folder":"OFFPARTY","nation":"人狼議事オフ相談所","vid_code":"P","server":"party.ps.land.to","oldlog":"/kitchen/sow.cgi?cmd=oldlog&rowall=on","livelog":"/kitchen/sow.cgi?cmd=rss","info_url":"/kitchen/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/kitchen/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","story":{"evil":"EVIL","role_play":false}}}

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = {"secret":{"label":"詳細は黒幕だけが知っています。","disabled":true,"role_ids_list":[]},"ultimate":{"label":"アルティメット","disabled":true,"role_ids_list":[]},"lover":{"label":"恋愛天使","disabled":true,"role_ids_list":[]},"hamster":{"label":"ハムスター","disabled":true,"role_ids_list":[]},"random":{"label":"ランダム","disabled":true,"role_ids_list":[]},"custom":{"label":"自由設定","role_ids_list":[]},"default":{"label":"標準","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","fanatic","medium","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","stigma"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","stigma","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","wisper","medium","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","decide","wolf","guard","possess","medium","villager","possess","fm","fm","villager","villager","villager","villager","villager","villager"]]},"mistery":{"label":"深い霧の夜","role_ids_list":[null,null,null,null,["villager","villager","seer","lonewolf"],["villager","villager","seer","lonewolf","alchemist"],["villager","villager","guard","lonewolf","alchemist","possess"],["villager","villager","guard","lonewolf","alchemist","decide","possess","fan"],["villager","villager","guard","wolf","wolf","alchemist","decide","aura","doctor"],["villager","villager","guard","wolf","wolf","alchemist","decide","aura","doctor","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","villager"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","alchemist"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl","fan"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl","fan","guru"],["villager","villager","guard","wolf","childwolf","alchemist","decide","aura","doctor","villager","seer","hunter","medium","jammer","curse","witch","wolf","girl","fan","guru","alchemist"]]},"test1st":{"label":"人狼審問試験壱型","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","possess","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","stigma"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","stigma","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","stigma","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","villager","fm","fm","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","stigma","villager","wolf","villager","villager","fm","fm","possess","villager"]]},"test2nd":{"label":"人狼審問試験弐型","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","fanatic","guard","villager","villager","wolf","fm","fm","villager","villager","villager","villager"]]},"wbbs_c":{"label":"人狼BBS-C国","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","wisper","guard","villager","villager","wolf","fm","fm","villager","villager","villager","villager"]]},"wbbs_f":{"label":"人狼BBS-F国","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","villager","wolf","fm","fm","villager","villager","villager","villager"]]},"wbbs_g":{"label":"人狼BBS-G国","role_ids_list":[null,null,null,null,["villager","villager","seer","wolf"],["villager","villager","seer","wolf","villager"],["villager","villager","seer","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager","villager","villager"],["villager","villager","seer","wolf","villager","villager","villager","wolf","medium","possess","guard","villager","wolf","villager","villager","villager","villager","villager","villager","villager"]]}}

/***/ }),
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(14);

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = __webpack_require__(35);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(8);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comlink, FetchApi, Finder, Model, Query, Rule, Set, State, broadcasts;

Comlink = __webpack_require__(106);

var _require = __webpack_require__(2);

State = _require.State;
Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;
Set = _require.Set;
Finder = _require.Finder;


FetchApi = __webpack_require__(107);

broadcasts = [];

self.onconnect = function (e) {
  var port;

  var _e$ports = (0, _slicedToArray3.default)(e.ports, 1);

  port = _e$ports[0];

  return Comlink.expose((0, _extends3.default)({}, FetchApi, {
    add: function add(cb) {
      broadcasts.push(cb);
      return broadcasts.length - 1;
    },
    del: function del(idx) {
      return delete broadcasts[idx];
    },
    copy: function copy() {
      for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      return (0, _stringify2.default)(keys.map(function (key) {
        return [Query[key].$sort, Query[key]._finder.format, Query[key].memory];
      }));
    }
  }), port);
};

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = require("comlink");

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defineProperty2 = __webpack_require__(34);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _slicedToArray2 = __webpack_require__(8);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__(15);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(16);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = __webpack_require__(10);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Finder,
    Model,
    Query,
    Rule,
    Set,
    State,
    attrs,
    nation,
    phase_attr,
    titles,
    slice = [].slice;

__webpack_require__(17);

var _require = __webpack_require__(2);

State = _require.State;
Model = _require.Model;
Query = _require.Query;
Rule = _require.Rule;
Set = _require.Set;
Finder = _require.Finder;

var _require2 = __webpack_require__(108);

nation = _require2.nation;


titles = {
  SS: ["SSAY", "通常の発言"],
  SA: ["SSAY", "通常ACT"],
  VS: ["VSSAY", "見物人発言"],
  VA: ["VSSAY", "見物人のACT"],
  TS: ["TSAY", "独り言/内緒話"],
  TA: ["TSAY", "栞"],
  GS: ["GSAY", "墓下の発言"],
  GA: ["GSAY", "墓下のACT"],
  PS: ["PSAY", "共鳴の会話"],
  PA: ["PSAY", "共鳴のACT"],
  WS: ["WSAY", "人狼のささやき"],
  WA: ["WSAY", "人狼のACT"],
  XS: ["XSAY", "念話（念波の民）"],
  XA: ["XSAY", "念act（念波の民）"],
  BS: ["XSAY", "念話（蝙蝠人間）"],
  BA: ["XSAY", "念act（蝙蝠人間）"]
};

attrs = {
  TITLE: {
    mark: '',
    label: '表題'
  },
  public: {
    label: '活動'
  },
  private: {
    label: '秘密'
  },
  SSAY: {
    mark: '',
    label: '会話'
  },
  TSAY: {
    mark: '-',
    label: '独言'
  },
  AIM: {
    mark: '-',
    label: '内緒'
  },
  MAKER: {
    mark: '#',
    label: '村建'
  },
  ADMIN: {
    mark: '%',
    label: '管理'
  },
  VSSAY: {
    mark: '@',
    label: '見物'
  },
  VGSAY: {
    mark: '@',
    label: '見物'
  },
  MSAY: {
    mark: '',
    label: '会話'
  },
  WSAY: {
    mark: '*',
    label: '人狼'
  },
  GSAY: {
    mark: '+',
    label: '墓下'
  },
  PSAY: {
    mark: '=',
    label: '共鳴'
  },
  XSAY: {
    mark: '!',
    label: '念波'
  }
};

phase_attr = function phase_attr(self) {
  var o;
  if (o = attrs[self.handle]) {
    (0, _assign2.default)(self, o);
  }
  return self;
};

module.exports = {
  fetch: function (_fetch) {
    function fetch(_x) {
      return _fetch.apply(this, arguments);
    }

    fetch.toString = function () {
      return _fetch.toString();
    };

    return fetch;
  }(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url) {
      var res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(url);

            case 2:
              res = _context.sent;
              _context.next = 5;
              return res.json();

            case 5:
              return _context.abrupt("return", _context.sent);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }()),
  'aggregate/faces': function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url) {
      var data, face, i, j, k, len, len1, len2, o, ref, ref1, ref2;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.fetch(url);

            case 2:
              data = _context2.sent;

              ref = data.faces;
              for (i = 0, len = ref.length; i < len; i++) {
                o = ref[i];
                if (face = Query.faces.find(o._id.face_id)) {
                  face.aggregate.log = o;
                }
              }
              ref1 = data.m_faces;
              for (j = 0, len1 = ref1.length; j < len1; j++) {
                o = ref1[j];
                if (face = Query.faces.find(o._id.face_id)) {
                  face.aggregate.log.date_min = o.date_min;
                }
              }
              ref2 = data.sow_auths;
              for (k = 0, len2 = ref2.length; k < len2; k++) {
                o = ref2[k];
                if (face = Query.faces.find(o._id.face_id)) {
                  face.aggregate.fav = o;
                }
              }
              return _context2.abrupt("return", ['faces']);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function aggregateFaces(_x3) {
      return _ref2.apply(this, arguments);
    }

    return aggregateFaces;
  }(),
  'aggregate/face': function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(url, id) {
      var data, face, folders, handle, key, keys, list, loghd, mestypes, o, per, sum, title;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.fetch(url);

            case 2:
              data = _context3.sent;

              face = Query.faces.find(id);
              face.aggregate.log = data.faces[0];
              face.aggregate.log.date_min = data.m_faces[0].date_min;
              face.aggregate.sow_auths = _.sortBy(data.sow_auths, function (o) {
                return -o.story_ids.length;
              });
              face.aggregate.lives = _.sortBy(data.lives, function (o) {
                return -o.story_ids.length;
              });
              sum = 0;
              face.aggregate.lives = function () {
                var i, len, ref, results;
                ref = face.aggregate.lives;
                results = [];
                for (i = 0, len = ref.length; i < len; i++) {
                  o = ref[i];
                  o.role = Query.roles.find(o._id.live, "mob");
                  if (o._id.live === "leave") {
                    continue;
                  }
                  sum += o.story_ids.length;
                  results.push(o);
                }
                return results;
              }();
              face.aggregate.lives.sum = sum;
              face.aggregate.roles = _.sortBy(data.roles, function (o) {
                return -o.story_ids.length;
              });
              sum = 0;
              face.aggregate.roles = function () {
                var i, len, ref, results;
                ref = face.aggregate.roles;
                results = [];
                for (i = 0, len = ref.length; i < len; i++) {
                  o = ref[i];
                  o.role = Query.roles.find(o._id.role_id, "mob");
                  sum += o.story_ids.length;
                  results.push(o);
                }
                return results;
              }();
              face.aggregate.roles.sum = sum;
              mestypes = _.keyBy(data.mestypes, '_id.mestype');
              sum = {
                handle: "dark",
                title: "－合計－",
                per: face.story_length,
                all: 0,
                max: 0,
                count: 0
              };
              face.aggregate.mestypes = function () {
                var results;
                results = [];
                for (loghd in titles) {
                  var _titles$loghd = (0, _slicedToArray3.default)(titles[loghd], 2);

                  handle = _titles$loghd[0];
                  title = _titles$loghd[1];

                  if (!(o = mestypes[loghd])) {
                    continue;
                  }
                  sum.all += o.all;
                  sum.count += o.count;
                  if (sum.max < o.max) {
                    sum.max = o.max;
                  }
                  per = o.story_ids.length;
                  results.push(_.merge({ handle: handle, title: title, per: per }, o));
                }
                return results;
              }();
              face.aggregate.mestypes.push(sum);
              keys = face.aggregate.log.story_ids.map(function (key) {
                return key.split("-");
              }).filter(function (o) {
                return o[0] && o[1];
              });
              folders = _.groupBy(keys, function (o) {
                return o[0];
              });
              for (key in folders) {
                list = folders[key];
                folders[key] = _.sortBy(list, function (o) {
                  return o[1] - 0;
                });
                folders[key].nation = Query.folders.find(key.toUpperCase()).nation;
              }
              face.aggregate.folders = _.sortBy(folders, function (list, key) {
                return -list.length;
              });
              return _context3.abrupt("return", ['faces']);

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function aggregateFace(_x4, _x5) {
      return _ref3.apply(this, arguments);
    }

    return aggregateFace;
  }(),
  'sow/progress': function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(url) {
      var data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.fetch(url);

            case 2:
              data = _context4.sent;

              Set.sow_turn.merge(data.events);
              Set.sow_village.merge(data.stories);
              return _context4.abrupt("return", ['sow_villages', 'sow_turns']);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function sowProgress(_x6) {
      return _ref4.apply(this, arguments);
    }

    return sowProgress;
  }(),
  'sow/oldlog': function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(url) {
      var _id, data, i, j, len, len1, ref, story_id, story_ids, vil, _ref$i;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.fetch(url);

            case 2:
              data = _context5.sent;

              Set.sow_village.merge(data.stories);
              ref = data.faces;
              for (i = 0, len = ref.length; i < len; i++) {
                _ref$i = ref[i];
                _id = _ref$i._id;
                story_ids = _ref$i.story_ids;

                for (j = 0, len1 = story_ids.length; j < len1; j++) {
                  story_id = story_ids[j];
                  if (vil = Query.sow_villages.find(story_id)) {
                    vil.aggregate.face_ids.push(_id.face_id);
                  }
                }
              }
              return _context5.abrupt("return", ['sow_villages']);

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function sowOldlog(_x7) {
      return _ref5.apply(this, arguments);
    }

    return sowOldlog;
  }(),
  'sow/story': function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(url) {
      var _phases, _ref7, _ref8, _slice$call, _slice$call2;

      var book_id, chat_foot, chat_head, chats, csid, data, date, head, i, idx, job, len, n_rules, o, phases, potof_id, potof_idx, potofs, ref, ref1, ref2, ref3, ref4, ref5, ref6, sign, v_rules, welcome, write_at, _o$comment$split, _o$comment$split2, _o$comment$split2$;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.fetch(url);

            case 2:
              data = _context6.sent;

              book_id = data.stories[0]._id;
              potof_idx = 0;
              ref = data.potofs;
              for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
                o = ref[idx];
                csid = o.csid;
                if (csid === 'SF') {
                  csid = 'sf';
                }
                potof_idx = idx;
                potof_id = o.story_id + "-" + potof_idx;
                Set.stat.add({
                  _id: "" + o.event_id
                });
                if (Query.roles.find(o.live)) {
                  date = o.deathday;
                  if (!(0 < o.deathday)) {
                    date = void 0;
                  }
                  if (o.role[0] && o.live !== "mob") {
                    Set.card.add({
                      _id: potof_id + "-live",
                      role_id: o.live,
                      date: date
                    });
                  } else {
                    Set.card.add({
                      _id: potof_id + "-live",
                      role_id: 'leave',
                      date: 0
                    });
                  }
                }
                if (Query.roles.find(o.select)) {
                  Set.card.add({
                    _id: potof_id + "-request",
                    role_id: o.select
                  });
                }
                if (Query.roles.find(o.role[0])) {
                  Set.card.add({
                    _id: potof_id + "-role",
                    role_id: o.role[0]
                  });
                }
                if (Query.roles.find(o.role[1])) {
                  Set.card.add({
                    _id: potof_id + "-gift",
                    role_id: o.role[1]
                  });
                }
                Set.stat.merge([{
                  _id: potof_id + "-give",
                  give: o.point.actaddpt
                }]);
                if (o.live === "live") {
                  Set.stat.add({
                    _id: potof_id + "-commit",
                    sw: !!o.commit
                  });
                }
                if (o.zapcount) {
                  job = ["IR", "R", "O", "Y", "G", "B", "I", "V", "UV"][o.clearance] + "-";
                } else {
                  job = (ref1 = Query.chr_jobs.find(csid + "_" + o.face_id)) != null ? ref1.job : void 0;
                }
                Set.potof.add({
                  _id: potof_id,
                  part_id: o.event_id,
                  job: job,
                  pno: o.pno,
                  face_id: o.face_id,
                  sign: o.sow_auth_id,
                  text: (ref2 = o.history) != null ? ref2.replace(/<[^>]+>/g, "") : void 0
                });
              }
              potofs = Query.potofs.where({ book_id: book_id }).sort("live.date", "desc");
              phases = (_phases = {}, (0, _defineProperty3.default)(_phases, book_id + "-top-mA", phase_attr({
                handle: "MAKER",
                group: "A",
                update: false,
                guide: false
              })), (0, _defineProperty3.default)(_phases, book_id + "-top-mS", phase_attr({
                handle: "TITLE",
                group: "A",
                update: false,
                guide: true
              })), _phases);
              write_at = 0;
              data.messages.map(function (o) {
                var _id, deco, face_id, guide, handle, head, list, live, log, mention_ids, name, phase_group, phase_id, phase_idx, phase_type, ref3, ref4, ref5, show, sign, to;
                o.name = o.name.replace(/&#x([0-9A-F]+);/g, function (str, code) {
                  return String.fromCharCode(parseInt(code, 16));
                });
                face_id = o.face_id;
                to = o.to;
                log = o.log;
                date = o.date;
                csid = o.csid;

                write_at = new Date(date) - 0;
                if (csid === 'SF') {
                  csid = 'sf';
                }
                if (face_id === "maker" || face_id === "admin" || face_id === "c06") {
                  face_id = void 0;
                }
                if (o.event_id == null) {
                  o.event_id = o._id.split("-").slice(0, 3).join("-");
                }
                if ("*CAST*" === log) {
                  phase_id = o.event_id + "-mS";
                  list = function () {
                    var j, len1, ref3, results;
                    ref3 = potofs.pluck('sign', 'job', 'face.name', 'live.role_id');
                    results = [];
                    for (j = 0, len1 = ref3.length; j < len1; j++) {
                      var _ref3$j = (0, _slicedToArray3.default)(ref3[j], 4);

                      sign = _ref3$j[0];
                      job = _ref3$j[1];
                      name = _ref3$j[2];
                      live = _ref3$j[3];

                      if ('leave' !== live) {
                        results.push("| " + job + " | " + name + " | \u2026 | " + sign + " |");
                      }
                    }
                    return results;
                  }();
                  log = "|   |   |   |   |\n|--:|:--|:-:|:-:|\n" + list.join("\n");
                  if (phases[phase_id] == null) {
                    phases[phase_id] = phase_attr({
                      handle: 'TITLE',
                      group: 'A',
                      update: false,
                      guide: true
                    });
                  }
                  Set.chat.add({
                    _id: phase_id + "-CAST",
                    phase_id: phase_id,
                    write_at: write_at,
                    show: "report",
                    deco: "giji",
                    log: log
                  });
                  return;
                }
                guide = true;
                handle = o.mestype;
                phase_group = o.subid;
                phase_type = o.subid + o.mestype;
                phase_idx = o.logid.slice(0, 2);
                idx = Number(o.logid.slice(2));
                if (o.story_id && face_id) {
                  potof_id = Query.potofs.sow_id(o.story_id, face_id, o.sow_auth_id, o.story_id + "-0" !== o.event_id);
                  if (!potof_id) {
                    potof_idx += 1;
                    Set.card.add({
                      _id: [o.story_id, potof_idx, "live"].join("-"),
                      role_id: "leave",
                      date: 0
                    });
                    Set.stat.add({
                      _id: [o.story_id, potof_idx, "SSAY"].join("-"),
                      said: 0
                    });
                    Set.potof.add({
                      _id: [o.story_id, potof_idx].join("-"),
                      face_id: face_id,
                      job: (ref3 = Query.chr_jobs.find([csid, face_id].join("_"))) != null ? ref3.job : void 0,
                      sign: o.sow_auth_id,
                      pno: ""
                    });
                  }
                }
                switch (o.logid.slice(0, 2)) {
                  case "-S":
                    phase_idx = "iI";
                    phase_group = "I";
                }
                switch (o.subid) {
                  case "M":
                    show = "report";
                    break;
                  case "S":
                    switch (o.logid.slice(0, 2)) {
                      case "II":
                        show = "post";
                        break;
                      default:
                        show = "talk";
                    }
                    break;
                  case "I":
                    potof_id = void 0;
                    if ((log != null ? (ref4 = log.match(/。|、/g)) != null ? ref4.length : void 0 : void 0) > 3) {
                      show = "report";
                    } else {
                      show = "post";
                    }
                    guide = false;
                    break;
                  case "A":
                  case "B":
                    potof_id = void 0;
                    show = "post";
                    log = o.name + "は、" + log;
                    guide = false;
                }
                switch (handle) {
                  case "DELETED":
                    return;
                  case "MAKER":
                  case "ADMIN":
                    potof_id = void 0;
                    if (show === "talk") {
                      show = "report";
                    }
                    break;
                  case "INFONOM":
                    handle = "public";
                    break;
                  case "INFOSP":
                    handle = "private";
                    break;
                  case "INFOWOLF":
                    handle = "WSAY";
                    break;
                  case "VSAY":
                    handle = "VSSAY";
                    break;
                  case "BSAY":
                    handle = "XSAY";
                    break;
                  case "SPSAY":
                    handle = "PSAY";
                    break;
                  case "SAY":
                    handle = "SSAY";
                }
                if (to) {
                  phase_idx = "AIM";
                  handle = "AIM";
                }
                mention_ids = [];
                if (log) {
                  log = log.replace(/<mw +(..)(\d+),(\d+),(.+?)>/g, function (str, _phase_idx, $1, _part_idx, _code) {
                    var _idx, _mention_id;
                    if (_phase_idx === 'MM') {
                      _phase_idx = phase_idx.slice(-2)[0] + 'M';
                    }
                    _idx = Number($1);
                    mention_ids.push(_mention_id = [book_id, _part_idx, _phase_idx, _idx].join("-"));
                    return "<q class=\"class-bottom\" cite=\"" + _mention_id + "\"><b>&gt;&gt;</b>" + _code + "</q>";
                  });
                } else {
                  log = "メモをはがした。";
                  show = "post";
                }
                phase_id = o.event_id + "-" + phase_idx;
                _id = phase_id + "-" + idx;
                deco = (ref5 = o.style) != null ? ref5 : "sow";
                head = potof_id && o.name;
                if (phases[phase_id] == null) {
                  phases[phase_id] = phase_attr({
                    handle: handle,
                    guide: guide,
                    type: phase_type,
                    group: phase_group,
                    update: false
                  });
                }
                Set.chat.add({ _id: _id, potof_id: potof_id, write_at: write_at, to: to, show: show, deco: deco, log: log, head: head, handle: handle, mention_ids: mention_ids });
                return o;
              });
              Set.phase.merge(phases);
              Set.part.merge(data.events.map(function (o) {
                var ref3;
                return {
                  _id: o._id,
                  label: (ref3 = o.name) != null ? ref3 : o.turn + "\u65E5\u76EE"
                };
              }));
              o = data.stories[0];
              sign = o.sow_auth_id.replace(/\./g, '&#2e');
              ref3 = chats = Query.chats.where({
                book_id: o._id
              }).list, (ref4 = ref3[0], (_ref7 = ref4, _ref8 = (0, _slicedToArray3.default)(_ref7, 1), chat_head = _ref8[0], _ref7)), ref5 = slice.call(ref3, -1), (ref6 = ref5[0], (_slice$call = slice.call(ref6, -1), _slice$call2 = (0, _slicedToArray3.default)(_slice$call, 1), chat_foot = _slice$call2[0], _slice$call));
              Set.book.add({
                _id: o._id,
                label: o.name,
                winner_id: null, // data.events[-1..][0].winner?[4..]
                potof_size: potofs.list.length,
                sign: sign,
                write_at: chat_head.write_at - 4
              });
              _o$comment$split = o.comment.split(/■村のルール<br>/);
              _o$comment$split2 = (0, _slicedToArray3.default)(_o$comment$split, 2);
              _o$comment$split2$ = _o$comment$split2[0];
              welcome = _o$comment$split2$ === undefined ? "" : _o$comment$split2$;
              v_rules = _o$comment$split2[1];

              Set.part.add({
                _id: o._id + "-top",
                label: "📖タイトル"
              });
              Set.chat.add({
                _id: o._id + "-top-mS-title",
                phase_id: o._id + "-top-mS",
                write_at: chat_head.write_at - 4,
                show: "report",
                deco: "center",
                sign: sign,
                head: o.folder + "-" + o.vid + " by " + sign,
                log: "\n## " + o.name + "\n\n"
              });
              Set.chat.add({
                _id: o._id + "-top-mS-welcome",
                phase_id: o._id + "-top-mS",
                write_at: chat_head.write_at - 3,
                show: "report",
                deco: "head",
                sign: sign,
                log: welcome
              });
              if (v_rules) {
                Set.chat.add({
                  _id: o._id + "-top-mS-vrule",
                  phase_id: o._id + "-top-mS",
                  write_at: chat_head.write_at - 2,
                  show: "report",
                  deco: "giji",
                  sign: sign,
                  log: "### \u6751\u306E\u30EB\u30FC\u30EB\n" + v_rules.split("<br>").join("\n")
                });
              }
              n_rules = function () {
                var j, len1, ref7, results;
                ref7 = nation.list;
                results = [];
                for (idx = j = 0, len1 = ref7.length; j < len1; idx = ++j) {
                  head = ref7[idx].head;

                  results.push(idx + 1 + ". " + head);
                }
                return results;
              }();
              Set.chat.add({
                _id: o._id + "-top-mS-nrule",
                phase_id: o._id + "-top-mS",
                write_at: chat_head.write_at - 1,
                show: "report",
                deco: "giji",
                sign: sign,
                log: "### \u56FD\u306E\u30EB\u30FC\u30EB\n" + n_rules.join("\n")
              });
              return _context6.abrupt("return", ['books', 'potofs', 'roles', 'stats', 'phases', 'parts', 'chats']);

            case 29:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function sowStory(_x8) {
      return _ref6.apply(this, arguments);
    }

    return sowStory;
  }()
};

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = {"nation":{"head":"国のルール","list":[{"head":"ここは長期人狼サーバーだ。短期はできない。","log":"ネット上の人狼ゲームの種類は、[リンク先を参考][guide]にしよう。\n人狼議事は長期人狼を遊ぶ場所なので、[短期人狼][short]には対応していない。\nアクセスが集中すると、あの白くて殺風景な、忌々しい霧が発生するかもしれないんだ。２３時～２時(２６時)の範囲は利用が集中しているので、特にあぶない。\nこういう遊びかたには、もっとふさわしい[別の場所][other]があるから、そちらで思いっきり楽しむといい。\n\n[guide]: <http://crazy-crazy.sakura.ne.jp/giji/?%28Knowledge%29Guidance#l1> \"手引き\"\n[other]: http://wolfbbs.jp/%BF%CD%CF%B5%A5%AF%A5%ED%A1%BC%A5%F3.html#content_1_18 \"短期サーバー紹介\"\n[short]: # \"１０分とか、５分とか。……ひどいときは１分だぜ。クール！\""},{"head":"情報ページ（ここ）を熟読する。","log":"参加したらもう、知らなかった、忘れてた、はナシだ。そしてそんなふうに言われないよう、解りやすいルールを見やすい場所に記そう。"},{"head":"ルールを守り、つねに心構えに気を配る。","log":"もし不明な部分、迷う部分があったら、抱えていることはない。プロローグのうちに積極的に問いかけて明らかにしておこう。\nルール違反で迷惑を被ったなら、遠慮なく非難しよう。\n気付かなかった、はナシだ。"},{"head":"進行中は、どんな嘘でもＯＫ。","log":"プロローグ終了からエピローグ開始までが、ゲームの進行中だ。この期間は全員、勝利のためにあらゆる手段を講じている。\nだから、あらゆる発言が嘘かもしれないし、嘘と受け取られる可能性があるんだ。\nただしプロローグとエピローグだけは特殊で、ルールそのものを作っていく場であり、すべて明らかになっての反省会でもある。\nひょっとしたらルール違反の指摘もあるかもしれない。だから[勝つためと思われたくない主張][sorry]を本気でしたいときは、誤解の少ないエピローグまで待つ方が確実だ。\nこれはゲームを楽しむためのルールだけれど、村建て人と、管理人だけはそれでは困るんだ。彼等から特別な発言があったら、そこに嘘やハッタリは含まれていない。\n勝敗よりも優先することを発表したり、問いかけたりするから、疑わずに聞いてほしい。\n\n[sorry]: # \"ホントごめん！仕事が終わらなかったんだ！とか、そういうやつ。\""},{"head":"ただし、村建て人、管理人、の発言では嘘をつかないこと。","log":""},{"head":"突然死をしない。","log":"丸一日のあいだ発言を一切しないと、その人物は死んでしまう。このことを突然死と呼んでいるんだ。\n人狼議事は会話を楽しむゲームだってことを思い出してほしい。これじゃ、なんのために村に参加したのか、わからないよね。だから死んでしまうことにしている。\n事情があってなかなか喋れないとき、事情よりもゲームを優先するのはとても難しいことだ。だから、ゲームの時間が残るように、計算高くいろいろ企むといい。\n突然死をすると有利になる状況は、よく探すとごろごろしてる。けれど狙わないこと。それはルール違反だ。"}]},"village":{"head":"村のルール（編集可能）","list":[{"head":"多重ログインをしない。","log":"つまり、同じ人が同じ村に、複数のキャラクターで参加してはいけない。それは狡いし、簡単に勝てるチョロい方法なんだ。そんな程度の勝ち方じゃつまらないだろ？"},{"head":"システムの出力内容を、そのまま書き写さない。","log":"きみなりの言葉で、伝えるべき内容を主張するんだ。そのほうが面白いし、きみの言葉を人間の綴る発言として読んで貰える。\nコンピューターのアウトプットしたオクテットストリングスなんかではなくてね。\nそして読むときにも、機械っぽい正確さに頼らないこと。そんな考え方をしたせいで推理を誤ったって、誰のせいにもできない。"},{"head":"エピローグまで秘密を守る。参加中の村の内容は秘密だ。","log":"きみ自身の役職、相方の存在、判定、思考していることなど、村に関わることを村の外で話してはいけない。場外乱闘はせず、[リングで戦う][10count]こと。\n\n[10count]: # \"プロレスと違って、１０秒以内でもダメ。\""},{"head":"エピローグまで秘密を守る。希望した能力、画面を見ているきみが何者なのかは秘密だ。","log":"これらの情報は、一方的に有利に働いたり、進行中に思考を変質させたりする。もう知っていることは忘れなくてかまわないが、黙ってること。"},{"head":"エピローグまで勝利を目指す。","log":"誰かに急ぎ決着したい事情があろうと、誰かに諦めろと唆されようと、見るに耐えない仲間割れがあろうと、きみ自身に勝ち目がまったく考え出せなかろうと、\nルールを守り、そして、勝利を目指すこと。特殊な勝敗ルールがある村では、その勝利を目指すんだ。"}]},"maker":{"head":"村を建てるかたへ","list":[{"head":"村のルールは、プロローグ終了までに取り決めよう。","log":"村建てフォームには標準的なルールが最初から記してある。賛同する内容はそのまま残し、不足なら筆を加え、余分と思ったルールは削除して村を建てよう。\n一部の項目（国のルール）は編集できないようになってる。それは必須事項で、必ず守らなくてはならないからなんだ。村のルールで国のルールを否定しないこと。\n書き忘れはないかな？１日目が始まると参加者に役職がつき、先を予測して行動し始める。\n途中でルールに加筆・修正があると予測が御破算になり、それでも既にしてしまった発言は元に戻らないんだ。"},{"head":"プロローグでは、村にふさわしくないと感じた参加者を追い払える。","log":"できるならば、どういった点がふさわしくないか説明し、反省と改善を促そう。もしも気持ちが通じて、まずいところを改めて参加しなおして貰えれば最高だ。\nいやな予感がしたのによく考えず、そのまま開始するのはやめておこう。引き返せなくなってから破綻して、当人を含め皆が不幸せになる。"},{"head":"必要なら、本来の更新日を一日のばせる。","log":"在席困難なひとにチャンスを与え、全員に考える時間がたっぷり与えることが可能だ。\nこの機能は２度まで使えるけれど、嘘をつかなくていい陣営にとって有利に働くので、慎重に扱うこと。最初に予想していたゲームバランスとは、違ってくるだろうね。\nどういった事態になったらこの機能を使うのか、また、機能行使のポリシーを予め表明しておけるかどうか、考えておくといい。"},{"head":"ルールは全員が理解してる？そうでないなら、どうしよう？","log":"ルールを守れるのは、解ってる人が集まるからだ。\n複雑なルールを加えていない？\n難解千萬ナル國語表現ニ陥リテ如何（むずかしい言葉をつかってない）？\nルールは見やすく掲示してある？\n疑問にすっきり答えきっている？"},{"head":"この村のモラルの程度と方向性は？","log":"「こだわり」アイコンは、もしもあらかじめやりたいことがあれば、それを表現するためにある。\nだけどきみの思いはアイコン一つじゃ伝わりきらないかもね。キーボードをもっと使って、言葉でとっくり説明したほうがいいかも！"},{"head":"記号など（■、*、[]）の扱い方を取り決める？決めるならどう決める？","log":"ちょっと暗記しておくと便利な記号の使い方があるんだ。詳しい人に聞いて、気に入ったら使ってみるといい。\nただし、取り決めてないなら、黙っていきなり使っても理解して貰えるとは思わないこと。"},{"head":"黒幕見物人（場を支配する特権を持つ）のご紹介","log":"黒幕見物人という、強力な役割があるんだ。とても強力な４つの特殊能力がある。ルール違反について、罰則を黒幕が執り行うというやり方も考えられる。\nただし、どの程度の罰則を課すのか予め示しておこう。"}]},"player":{"head":"参加者の心構え","list":[{"head":"これは会話を楽しむゲームだ。","log":"きみの会話内容は評価される。絶賛されることも、酷評されることもあるだろうね。"},{"head":"キャラクターを通して発言しよう。","log":"もしも画面を見ているきみ自身が言葉を綴りたくなったなら、ちょっと落ち着いてみよう。ほんとうにその言葉は、キャラクターでは口にできないことかな？\nそして、落ち着いて考えてもその言葉が必要だと判断したら、もう躊躇わなくていい。"},{"head":"発言や行動に、うまく思いやりをこめられた？","log":"きみ以外の参加者にも、尊重されるべき人格がある。彼等は敬意を受けるべきだ。それは味方に限らず、その村のライバルたちにも等しくね。きみの腕前の見せどころだ。\nただ、キャラクターがキャラクターに敬意を払うか、尊重するかはご自由に。"},{"head":"発言や行動に、棘や毒がまだ残ってない？","log":"紳士・淑女でいよう。きみがここにいるのは、周囲に刺々しさや毒気をばらまくためではなかったはずだ。"},{"head":"言いたいことを言い尽くせた？そうでないなら、なぜ？","log":"更新までの時間や発言は、とても限られている。思いやりが不十分だったり、刺々しさや毒気が残ってしまったとしても、懸命に考えたならやむを得ない。\n自分自身の未熟さを認めて発言ボタンを押そう。"},{"head":"きみへの論評に反論する？それとも受け入れる？それはなんのため？","log":"多くの評価がきみに向けられる。どう対応するのかで、きみは味方にも、敵にも、美しくも、情けなくも見えるだろうね。今日のきみは、周囲からどう見えると好都合だろう。"},{"head":"その嘘、ほんと？","log":"言葉はどれも嘘かもしれないし、本当かもしれない。あっていい言葉が欠けているかもしれない。どうやって見極めよう？どうして見極めきれないんだろう？"},{"head":"参加時間はお好みで。","log":"きみが好む時間に参加したいのと同様に、他の同村者も好む時間に参加したい。さて、どうやって両立させようか？"},{"head":"この村がすべてという姿勢を貫こう。","log":"もし浮気がばれてしまうと、悲しいことになる。皆が傷つき、きみは信用を失う。事実がどうであれ、掛け持ちで別村にいた、他の娯楽に現を抜かしていた、などと白状しないこと。\nたとえ厳しい追及にあっても、しらを切るほうがいい。\n最初から浮気しない方法は、正直でいられる点でとても強力な防衛手段になる。"},{"head":"能力には期待がかかる。受け止めきれるかな？","log":"投票、占い、襲撃、守護、etc...。これらの能力をあてにして、皆が作戦を立てたり決断をしたりする。特に投票や占いでは、はっきりと要望されることも珍しくない。\nそれらの要求に、きみは応えきれるだろうか。また、応えきれないなら、どうしたらいいだろう。"},{"head":"役割には期待がかかる。受け止めきれるかな？","log":"まとめ役、役職CO、白黒つかない灰、etc...。こうした役割が決まってくると、どう振る舞うか期待されはじめるんだ。それを把握できているかな。\nわからないなら、どうやって知っていこう。そして、きみは期待に応えきれるだろうか。"},{"head":"楽しく参加できた？","log":"楽しく語り、聞き、素敵なひとときを過ごせたろうか。また、同様に楽しみたいと集まっている村の友人達は楽しめているだろうか。\n残念にもそうでないとしたら、どうしたら楽しくなるだろう。"},{"head":"今日も健康でいられた？","log":"健康を維持するのはとても大変なことだ。今日のきみはやり遂げただろうか。このゲームを楽しむことが引き金になって、健康を害してしまってはつまらないね。"}]}}

/***/ })
/******/ ])));
//# sourceMappingURL=comlink.js.map