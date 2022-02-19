module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1640919233073, function(require, module, exports) {


var Assert = require("./assert").Assert
var Logger = require("./logger").Logger


var ERR_COMPLETED_ASSERT = "Assert in completed test"
var ERR_COMPLETED_COMPLETE = "Attemt to complete test more then one times"
var ERR_EXPECT = "AssertionError"


/**
 * Creates a test function.
 */
function Test(name, unit, logger, Assert) {
  var isSync = unit.length <= 1
  var isFailFast = !unit.length
  var isDone = false
  return function test(next) {
    logger = logger.section(name)
    var assert = Assert(logger)
    assert.end = function end() {
      if (isDone) return logger.error(Error(ERR_COMPLETED_COMPLETE))
      isDone = true
      next()
    }

    try {
      var result = unit(assert, assert.end)
      // If it"s async test that returns a promise.
      if (result && typeof(result.then) === "function") {
        result.then(function passed() {
          logger.pass("passed")
          assert.end()
        }, function failed(reason) {
          logger.fail(reason)
          assert.end()
        })
      } else {
        if (isFailFast) logger.pass("passed")
        if (isSync) assert.end()
      }
    } catch (exception) {
      if (ERR_EXPECT === exception.name) assert.fail(exception)
      else logger.error(exception)
      assert.end()
    }
  }
}

function isTest(name) { return name.indexOf("test") === 0 }

/**
 * Creates a test suite / group. Calling returned function will execute
 * all test in the given suite.
 */
function Suite(name, units, logger, Assert) {
  // Collecting properties that represent test functions or suits.
  var names = Object.keys(units).filter(isTest)
  Assert = units.Assert || Assert
  // Returning a function that executes all test in this suite and all it"s
  // sub-suits.
  return function suite(end) {
    // Chaining test / suits so that each is executed after last is done.
    function next() {
      if (!names.length) return end()
      var name = names.shift()
      var unit = Unit(name, units[name], logger, units.Assert || Assert)
      unit(next)
    }
    next((logger = logger.section(name)))
  }
}
function Unit(name, units, logger, Assert) {
  return typeof(units) === "function" ? Test(name, units, logger, Assert)
                                      : Suite(name, units, logger, Assert)
}


/**
 * Test runner function.
 */
exports.run = function run(units, logger) {
  var exit = logger ? false : true
  logger = logger || new Logger()
  var unit = Unit("Running all tests:", units, logger, Assert)
  unit(function done() {
    logger.report()
    var failed = logger.errors.length !== 0 || logger.fails.length !== 0
    // Exit only if `process.exit` exist and if no logger was provided.
    if (exit && process.exit) process.exit(failed ? 1 : 0)
  })
}

}, function(modId) {var map = {"./assert":1640919233074,"./logger":1640919233076}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1640919233074, function(require, module, exports) {


var utils = require("./utils")


/**
 * The `AssertionError` is defined in assert.
 * @extends Error
 * @example
 *  new assert.AssertionError({
 *    message: message,
 *    actual: actual,
 *    expected: expected
 *  })
 */
function AssertionError(options) {
  var assertionError = Object.create(AssertionError.prototype);

  if (utils.isString(options))
    options = { message: options };
  if ("actual" in options)
    assertionError.actual = options.actual;
  if ("expected" in options)
    assertionError.expected = options.expected;
  if ("operator" in options)
    assertionError.operator = options.operator;

  assertionError.message = options.message;
  assertionError.stack = new Error().stack;
  return assertionError;
}
AssertionError.prototype = Object.create(Error.prototype, {
  constructor: { value: AssertionError },
  name: { value: "AssertionError", enumerable: true },
  toString: { value: function toString() {
    var value;
    if (this.message) {
      value = this.name + " : " + this.message;
    }
    else {
      value = [
        this.name + " : ",
        utils.source(this.expected),
        this.operator,
        utils.source(this.actual)
      ].join(" ");
    }
    return value;
  }}
});
exports.AssertionError = AssertionError;

function Assert(logger) {
  return Object.create(Assert.prototype, { _log: { value: logger }});
}
Assert.prototype = {
  fail: function fail(e) {
    this._log.fail(e);
  },
  pass: function pass(message) {
    this._log.pass(message);
  },
  error: function error(e) {
    this._log.error(e);
  },
  ok: function ok(value, message) {
    if (!!!value) {
      this.fail({
        actual: value,
        expected: true,
        message: message,
        operator: "=="
      });
    }
    else {
      this.pass(message);
    }
  },

  /**
   * The equality assertion tests shallow, coercive equality with `==`.
   * @example
   *    assert.equal(1, 1, "one is one");
   */
  equal: function equal(actual, expected, message) {
    if (actual == expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "=="
      });
    }
  },

  /**
   * The non-equality assertion tests for whether two objects are not equal
   * with `!=`.
   * @example
   *    assert.notEqual(1, 2, "one is not two");
   */
  notEqual: function notEqual(actual, expected, message) {
    if (actual != expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "!=",
      });
    }
  },

  /**
   * The equivalence assertion tests a deep (with `===`) equality relation.
   * @example
   *    assert.deepEqual({ a: "foo" }, { a: "foo" }, "equivalent objects")
   */
   deepEqual: function deepEqual(actual, expected, message) {
    if (isDeepEqual(actual, expected)) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "deepEqual"
      });
    }
  },

  /**
   * The non-equivalence assertion tests for any deep (with `===`) inequality.
   * @example
   *    assert.notDeepEqual({ a: "foo" }, Object.create({ a: "foo" }),
   *                        "object"s inherit from different prototypes");
   */
  notDeepEqual: function notDeepEqual(actual, expected, message) {
    if (!isDeepEqual(actual, expected)) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "notDeepEqual"
      });
    }
  },

  /**
   * The strict equality assertion tests strict equality, as determined by
   * `===`.
   * @example
   *    assert.strictEqual(null, null, "`null` is `null`")
   */
  strictEqual: function strictEqual(actual, expected, message) {
    if (actual === expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "==="
      });
    }
  },

  /**
   * The strict non-equality assertion tests for strict inequality, as
   * determined by `!==`.
   * @example
   *    assert.notStrictEqual(null, undefined, "`null` is not `undefined`");
   */
  notStrictEqual: function notStrictEqual(actual, expected, message) {
    if (actual !== expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "!=="
      })
    }
  },

  /**
   * The assertion whether or not given `block` throws an exception. If optional
   * `Error` argument is provided and it"s type of function thrown error is
   * asserted to be an instance of it, if type of `Error` is string then message
   * of throw exception is asserted to contain it.
   * @param {Function} block
   *    Function that is expected to throw.
   * @param {Error|RegExp} [Error]
   *    Error constructor that is expected to be thrown or a string that
   *    must be contained by a message of the thrown exception, or a RegExp
   *    matching a message of the thrown exception.
   * @param {String} message
   *    Description message
   *
   * @examples
   *
   *    assert.throws(function block() {
   *      doSomething(4)
   *    }, "Object is expected", "Incorrect argument is passed");
   *
   *    assert.throws(function block() {
   *      Object.create(5)
   *    }, TypeError, "TypeError is thrown");
   */
  throws: function throws(block, Error, message) {
    var threw = false;
    var exception = null;

    // If third argument is not provided and second argument is a string it
    // means that optional `Error` argument was not passed, so we shift
    // arguments.
    if (utils.isString(Error) && utils.isUndefined(message)) {
      message = Error;
      Error = undefined;
    }

    // Executing given `block`.
    try {
      block();
    }
    catch (e) {
      threw = true;
      exception = e;
    }

    // If exception was thrown and `Error` argument was not passed assert is
    // passed.
    if (threw && (utils.isUndefined(Error) ||
                 // If Error is thrown exception
                 (Error == exception) ||
                 // If passed `Error` is RegExp using it"s test method to
                 // assert thrown exception message.
                 (utils.isRegExp(Error) && Error.test(exception.message)) ||
                 // If passed `Error` is a constructor function testing if
                 // thrown exception is an instance of it.
                 (utils.isFunction(Error) && utils.instanceOf(exception, Error))))
    {
      this.pass(message);
    }

    // Otherwise we report assertion failure.
    else {
      var failure = {
        message: message,
        operator: "throws"
      };

      if (exception)
        failure.actual = exception;

      if (Error)
        failure.expected = Error;

      this.fail(failure);
    }
  }
};
exports.Assert = Assert;

function isDeepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  }

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  else if (utils.isDate(actual) && utils.isDate(expected)) {
    return actual.getTime() === expected.getTime();
  }

  // XXX specification bug: this should be specified
  else if (utils.isPrimitive(actual) || utils.isPrimitive(expected)) {
    return expected === actual;
  }

  else if (utils.instanceOf(actual, Error) ||
           utils.instanceOf(expected, Error)) {
    return actual.message === expected.message &&
           actual.type === expected.type &&
           actual.name === expected.name &&
           (actual.constructor && expected.constructor &&
            actual.constructor.name === expected.constructor.name)
  }

  // 7.3. Other pairs that do not both pass typeof value == "object",
  // equivalence is determined by ==.
  else if (!utils.isObject(actual) && !utils.isObject(expected)) {
    return actual == expected;
  }

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical "prototype" property. Note: this
  // accounts for both named and indexed properties on Arrays.
  else {
    return actual.prototype === expected.prototype &&
           isEquivalent(actual, expected);
  }
}

function isEquivalent(a, b, stack) {
  return isArrayEquivalent(Object.keys(a).sort(),
                           Object.keys(b).sort()) &&
          Object.keys(a).every(function(key) {
            return isDeepEqual(a[key], b[key], stack)
          });
}

function isArrayEquivalent(a, b, stack) {
  return utils.isArray(a) && utils.isArray(b) && a.length === b.length &&
         a.every(function(value, index) {
           return isDeepEqual(value, b[index]);
         });
}

}, function(modId) { var map = {"./utils":1640919233075}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1640919233075, function(require, module, exports) {


/**
 * Returns `true` if `value` is `undefined`.
 * @examples
 *    var foo; isUndefined(foo); // true
 *    isUndefined(0); // false
 */
function isUndefined(value) {
  return value === undefined;
}
exports.isUndefined = isUndefined;

/**
 * Returns `true` if value is `null`.
 * @examples
 *    isNull(null); // true
 *    isNull(undefined); // false
 */
function isNull(value) {
  return value === null;
}
exports.isNull = isNull;

/**
 * Returns `true` if value is a string.
 * @examples
 *    isString("moe"); // true
 */
function isString(value) {
  return typeof value === "string";
}
exports.isString = isString;

/**
 * Returns `true` if `value` is a number.
 * @examples
 *    isNumber(8.4 * 5); // true
 */
function isNumber(value) {
  return typeof value === "number";
}
exports.isNumber = isNumber;

/**
 * Returns `true` if `value` is a `RegExp`.
 * @examples
 *    isRegExp(/moe/); // true
 */
function isRegExp(value) {
  return instanceOf(value, RegExp);
}
exports.isRegExp = isRegExp;

/**
 * Returns true if `value` is a `Date`.
 * @examples
 *    isDate(new Date()); // true
 */
function isDate(value) {
  return isObject(value) && instanceOf(value, Date);
}
exports.isDate = isDate;

/**
 * Returns true if object is a Function.
 * @examples
 *    isFunction(function foo(){}) // true
 */
function isFunction(value) {
    return typeof value === "function" && value.call && value.apply;
}
exports.isFunction = isFunction;

/**
 * Returns `true` if `value` is an object (please note that `null` is considered
 * to be an atom and not an object).
 * @examples
 *    isObject({}) // true
 *    isObject(null) // false
 */
function isObject(value) {
    return typeof value === "object" && value !== null;
}
exports.isObject = isObject;

/**
 * Returns true if `value` is an Array.
 * @examples
 *    isArray([1, 2, 3])  // true
 *    isArray({ 0: "foo", length: 1 }) // false
 */
var isArray = Array.isArray || function isArray(value) {
  Object.prototype.toString.call(value) === "[object Array]";
}
exports.isArray = isArray;

/**
 * Returns `true` if `value` is an Arguments object.
 * @examples
 *    (function(){ return isArguments(arguments); })(1, 2, 3); // true
 *    isArguments([1,2,3]); // false
 */
function isArguments(value) {
  Object.prototype.toString.call(value) === "[object Arguments]";
}
exports.isArguments = isArguments;

/**
 * Returns true if it is a primitive `value`. (null, undefined, number,
 * boolean, string)
 * @examples
 *    isPrimitive(3) // true
 *    isPrimitive("foo") // true
 *    isPrimitive({ bar: 3 }) // false
 */
function isPrimitive(value) {
  return !isFunction(value) && !isObject(value);
}
exports.isPrimitive = isPrimitive;

/**
 * Returns `true` if given `object` is flat (it is direct decedent of
 * `Object.prototype` or `null`).
 * @examples
 *    isFlat({}) // true
 *    isFlat(new Type()) // false
 */
function isFlat(object) {
  return isObject(object) && (isNull(Object.getPrototypeOf(object)) ||
                              isNull(Object.getPrototypeOf(
                                     Object.getPrototypeOf(object))));
}
exports.isFlat = isFlat;

/**
 * Returns `true` if object contains no values.
 */
function isEmpty(object) {
  if (isObject(object)) {
    for (var key in object)
      return false;
    return true;
  }
  return false;
}
exports.isEmpty = isEmpty;

/**
 * Returns `true` if `value` is an array / flat object containing only atomic
 * values and other flat objects.
 */
function isJSON(value, visited) {
    // Adding value to array of visited values.
    (visited || (visited = [])).push(value);
            // If `value` is an atom return `true` cause it"s valid JSON.
    return  isPrimitive(value) ||
            // If `value` is an array of JSON values that has not been visited
            // yet.
            (isArray(value) &&  value.every(function(element) {
                                  return isJSON(element, visited);
                                })) ||
            // If `value` is a plain object containing properties with a JSON
            // values it"s a valid JSON.
            (isFlat(value) && Object.keys(value).every(function(key) {
                var $ = Object.getOwnPropertyDescriptor(value, key);
                // Check every proprety of a plain object to verify that
                // it"s neither getter nor setter, but a JSON value, that
                // has not been visited yet.
                return  ((!isObject($.value) || !~visited.indexOf($.value)) &&
                        !("get" in $) && !("set" in $) &&
                        isJSON($.value, visited));
            }));
}
exports.isJSON = function (value) {
  return isJSON(value);
};

/**
 * Returns if `value` is an instance of a given `Type`. This is exactly same as
 * `value instanceof Type` with a difference that `Type` can be from a scope
 * that has a different top level object. (Like in case where `Type` is a
 * function from different iframe / jetpack module / sandbox).
 */
function instanceOf(value, Type) {
  var isConstructorNameSame;
  var isConstructorSourceSame;

  // If `instanceof` returned `true` we know result right away.
  var isInstanceOf = value instanceof Type;

  // If `instanceof` returned `false` we do ducktype check since `Type` may be
  // from a different sandbox. If a constructor of the `value` or a constructor
  // of the value"s prototype has same name and source we assume that it"s an
  // instance of the Type.
  if (!isInstanceOf && value) {
    isConstructorNameSame = value.constructor.name === Type.name;
    isConstructorSourceSame = String(value.constructor) == String(Type);
    isInstanceOf = (isConstructorNameSame && isConstructorSourceSame) ||
                    instanceOf(Object.getPrototypeOf(value), Type);
  }
  return isInstanceOf;
}
exports.instanceOf = instanceOf;

/**
 * Function returns textual representation of a value passed to it. Function
 * takes additional `indent` argument that is used for indentation. Also
 * optional `limit` argument may be passed to limit amount of detail returned.
 * @param {Object} value
 * @param {String} [indent="    "]
 * @param {Number} [limit]
 */
function source(value, indent, limit, offset, visited) {
  var result;
  var names;
  var nestingIndex;
  var isCompact = !isUndefined(limit);

  indent = indent || "    ";
  offset = (offset || "");
  result = "";
  visited = visited || [];

  if (isUndefined(value)) {
    result += "undefined";
  }
  else if (isNull(value)) {
    result += "null";
  }
  else if (isString(value)) {
    result += "\"" + value + "\"";
  }
  else if (isFunction(value)) {
    value = String(value).split("\n");
    if (isCompact && value.length > 2) {
      value = value.splice(0, 2);
      value.push("...}");
    }
    result += value.join("\n" + offset);
  }
  else if (isArray(value)) {
    if ((nestingIndex = (visited.indexOf(value) + 1))) {
      result = "#" + nestingIndex + "#";
    }
    else {
      visited.push(value);

      if (isCompact)
        value = value.slice(0, limit);

      result += "[\n";
      result += value.map(function(value) {
        return offset + indent + source(value, indent, limit, offset + indent,
                                        visited);
      }).join(",\n");
      result += isCompact && value.length > limit ?
                ",\n" + offset + "...]" : "\n" + offset + "]";
    }
  }
  else if (isObject(value)) {
    if ((nestingIndex = (visited.indexOf(value) + 1))) {
      result = "#" + nestingIndex + "#"
    }
    else {
      visited.push(value)

      names = Object.keys(value);

      result += "{ // " + value + "\n";
      result += (isCompact ? names.slice(0, limit) : names).map(function(name) {
        var _limit = isCompact ? limit - 1 : limit;
        var descriptor = Object.getOwnPropertyDescriptor(value, name);
        var result = offset + indent + "// ";
        var accessor;
        if (0 <= name.indexOf(" "))
          name = "\"" + name + "\"";

        if (descriptor.writable)
          result += "writable ";
        if (descriptor.configurable)
          result += "configurable ";
        if (descriptor.enumerable)
          result += "enumerable ";

        result += "\n";
        if ("value" in descriptor) {
          result += offset + indent + name + ": ";
          result += source(descriptor.value, indent, _limit, indent + offset,
                           visited);
        }
        else {

          if (descriptor.get) {
            result += offset + indent + "get " + name + " ";
            accessor = source(descriptor.get, indent, _limit, indent + offset,
                              visited);
            result += accessor.substr(accessor.indexOf("{"));
          }

          if (descriptor.set) {
            if (descriptor.get) result += ",\n";
            result += offset + indent + "set " + name + " ";
            accessor = source(descriptor.set, indent, _limit, indent + offset,
                              visited);
            result += accessor.substr(accessor.indexOf("{"));
          }
        }
        return result;
      }).join(",\n");

      if (isCompact) {
        if (names.length > limit && limit > 0) {
          result += ",\n" + offset  + indent + "//...";
        }
      }
      else {
        if (names.length)
          result += ",";

        result += "\n" + offset + indent + "\"__proto__\": ";
        result += source(Object.getPrototypeOf(value), indent, 0,
                         offset + indent);
      }

      result += "\n" + offset + "}";
    }
  }
  else {
    result += String(value);
  }
  return result;
}
exports.source = function (value, indentation, limit) {
  return source(value, indentation, limit);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1640919233076, function(require, module, exports) {


var font = require("ansi-font/index")
var toSource = require("./utils").source

var INDENT = "  "

var report = console.log.bind(console)

function passed(message) {
  return font.green("\u2713 " + message)
}
function failed(message) {
  return font.red("\u2717 " + message)
}
function errored(message) {
  return font.magenta("\u26A1 " + message)
}

function indent(message, indentation) {
  indentation = undefined === indentation ? INDENT : indentation
  message = message || ""
  return message.replace(/^/gm, indentation)
}

function Logger(options) {
  if (!(this instanceof Logger)) return new Logger(options)

  options = options || {}
  var print = options.print || report
  var indentation = options.indentation || ""
  var results = options.results || { passes: [], fails: [], errors: [] }
  this.passes = results.passes
  this.fails = results.fails
  this.errors = results.errors
  results = this


  this.pass = function pass(message) {
    results.passes.push(message)
    print(indent(passed(message), indentation))
  }

  this.fail = function fail(error) {
    results.fails.push(error)
    var message = error.message
    if ("expected" in error)
      message += "\n  Expected: \n" + toSource(error.expected, INDENT)
    if ("actual" in error)
      message += "\n  Actual: \n" + toSource(error.actual, INDENT)
    if ("operator" in error)
      message += "\n  Operator: " + toSource(error.operator, INDENT)
    print(indent(failed(message), indentation))
  }

  this.error = function error(exception) {
    results.errors.push(exception)
    print(indent(errored(exception.stack || exception), indentation))
  }

  this.section = function section(title) {
    print(indent(title, indentation))
    return new Logger({
      print: print,
      indentation: indent(indentation),
      results: results
    })
  }

  this.report = function report() {
    print("Passed:" + results.passes.length +
          " Failed:" + results.fails.length +
          " Errors:" + results.errors.length)
  }
}

Logger.Logger = Logger
module.exports = Logger

}, function(modId) { var map = {"./utils":1640919233075}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1640919233073);
})()
//miniprogram-npm-outsideDeps=["ansi-font/index"]
//# sourceMappingURL=index.js.map