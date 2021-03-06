module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1640919233033, function(require, module, exports) {
/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true newcap: true undef: true es5: true node: true devel: true
         forin: false */
/*global define: true */

(typeof define === "undefined" ? function ($) { $(require, exports, module) } : define)(function (require, exports, module, undefined) {



var ESC = '\u001b['

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
var SGR_STYLES = {
  bold:           [ 1,  22 ],
  italic:         [ 3,  23 ],
  underline:      [ 4,  24 ],
  blink:          [ 5,  25 ],

  inverse:        [ 7,  27 ],

  frame:         [ 51, 54 ],
  encircle:      [ 52, 54 ],

  overline:       [ 53, 55 ],
  strikethrough:  [ 53, 55 ]
}
var SGR_COLORS = {}
var SGR_BACKROUNDS = {}
var COLORS = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white'
]

COLORS.forEach(function(color, index) {
  SGR_COLORS[color] = [ 30 + index, 39 ]
  SGR_BACKROUNDS[color] = [ 40 + index, 49 ]
})

function sgr(options, id, message) {
  var params = options[id]
  if (params) message = ESC + params[0] + 'm' + message + ESC + params[1] + 'm'
  return message
}

exports.style = sgr.bind(null, SGR_STYLES)
exports.color = sgr.bind(null, SGR_COLORS)
exports.background = sgr.bind(null, SGR_BACKROUNDS)

Object.keys(SGR_STYLES).forEach(function(name) {
  exports[name] = exports.style.bind(null, name)
})
Object.keys(SGR_COLORS).forEach(function(name) {
  exports[name] = exports.color.bind(null, name)
  exports['bg' + name] = exports.background.bind(null, name)
})

var index = 0
while(index++ < 256) {
  SGR_COLORS[index] = ['38;5;' + index, 39]
  SGR_BACKROUNDS[index] = ['48;5;' + index, 39]
}

});

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1640919233033);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map