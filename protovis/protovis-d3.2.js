// f0612471111ad6c74a0db1e22ca2daf95b0e1cad
/**
 * @class The built-in Array class.
 * @name Array
 */

/**
 * Creates a new array with the results of calling a provided function on every
 * element in this array. Implemented in Javascript 1.6.
 *
 * @see <a
 * href="https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Objects/Array/Map">map</a>
 * documentation.
 * @param {function} f function that produces an element of the new Array from
 * an element of the current one.
 * @param [o] object to use as <tt>this</tt> when executing <tt>f</tt>.
 */
if (!Array.prototype.map) Array.prototype.map = function(f, o) {
  var n = this.length;
  var result = new Array(n);
  for (var i = 0; i < n; i++) {
    if (i in this) {
      result[i] = f.call(o, this[i], i, this);
    }
  }
  return result;
};

/**
 * Creates a new array with all elements that pass the test implemented by the
 * provided function. Implemented in Javascript 1.6.
 *
 * @see <a
 * href="https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Objects/Array/filter">filter</a>
 * documentation.
 * @param {function} f function to test each element of the array.
 * @param [o] object to use as <tt>this</tt> when executing <tt>f</tt>.
 */
if (!Array.prototype.filter) Array.prototype.filter = function(f, o) {
  var n = this.length;
  var result = new Array();
  for (var i = 0; i < n; i++) {
    if (i in this) {
      var v = this[i];
      if (f.call(o, v, i, this)) result.push(v);
    }
  }
  return result;
};

/**
 * Executes a provided function once per array element. Implemented in
 * Javascript 1.6.
 *
 * @see <a
 * href="https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Objects/Array/ForEach">forEach</a>
 * documentation.
 * @param {function} f function to execute for each element.
 * @param [o] object to use as <tt>this</tt> when executing <tt>f</tt>.
 */
if (!Array.prototype.forEach) Array.prototype.forEach = function(f, o) {
  var n = this.length >>> 0;
  for (var i = 0; i < n; i++) {
    if (i in this) f.call(o, this[i], i, this);
  }
};

/**
 * Apply a function against an accumulator and each value of the array (from
 * left-to-right) as to reduce it to a single value. Implemented in Javascript
 * 1.8.
 *
 * @see <a
 * href="https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Objects/Array/Reduce">reduce</a>
 * documentation.
 * @param {function} f function to execute on each value in the array.
 * @param [v] object to use as the first argument to the first call of
 * <tt>t</tt>.
 */
if (!Array.prototype.reduce) Array.prototype.reduce = function(f, v) {
  var len = this.length;
  if (!len && (arguments.length == 1)) {
    throw new Error("reduce: empty array, no initial value");
  }

  var i = 0;
  if (arguments.length < 2) {
    while (true) {
      if (i in this) {
        v = this[i++];
        break;
      }
      if (++i >= len) {
        throw new Error("reduce: no values, no initial value");
      }
    }
  }

  for (; i < len; i++) {
    if (i in this) {
      v = f(v, this[i], i, this);
    }
  }
  return v;
};
/**
 * The top-level Protovis namespace. All public methods and fields should be
 * registered on this object. Note that core Protovis source is surrounded by an
 * anonymous function, so any other declared globals will not be visible outside
 * of core methods. This also allows multiple versions of Protovis to coexist,
 * since each version will see their own <tt>pv</tt> namespace.
 *
 * @namespace The top-level Protovis namespace, <tt>pv</tt>.
 */
var pv = {};

/**
 * Protovis major and minor version numbers.
 *
 * @namespace Protovis major and minor version numbers.
 */
pv.version = {
  /**
   * The major version number.
   *
   * @type number
   * @constant
   */
  major: 3,

  /**
   * The minor version number.
   *
   * @type number
   * @constant
   */
  minor: 2
};

/**
 * Returns the passed-in argument, <tt>x</tt>; the identity function. This method
 * is provided for convenience since it is used as the default behavior for a
 * number of property functions.
 *
 * @param x a value.
 * @returns the value <tt>x</tt>.
 */
pv.identity = function(x) { return x; };

/**
 * Returns <tt>this.index</tt>. This method is provided for convenience for use
 * with scales. For example, to color bars by their index, say:
 *
 * <pre>.fillStyle(pv.Colors.category10().by(pv.index))</pre>
 *
 * This method is equivalent to <tt>function() this.index</tt>, but more
 * succinct. Note that the <tt>index</tt> property is also supported for
 * accessor functions with {@link pv.max}, {@link pv.min} and other array
 * utility methods.
 *
 * @see pv.Scale
 * @see pv.Mark#index
 */
pv.index = function() { return this.index; };

/**
 * Returns <tt>this.childIndex</tt>. This method is provided for convenience for
 * use with scales. For example, to color bars by their child index, say:
 *
 * <pre>.fillStyle(pv.Colors.category10().by(pv.child))</pre>
 *
 * This method is equivalent to <tt>function() this.childIndex</tt>, but more
 * succinct.
 *
 * @see pv.Scale
 * @see pv.Mark#childIndex
 */
pv.child = function() { return this.childIndex; };

/**
 * Returns <tt>this.parent.index</tt>. This method is provided for convenience
 * for use with scales. This method is provided for convenience for use with
 * scales. For example, to color bars by their parent index, say:
 *
 * <pre>.fillStyle(pv.Colors.category10().by(pv.parent))</pre>
 *
 * Tthis method is equivalent to <tt>function() this.parent.index</tt>, but more
 * succinct.
 *
 * @see pv.Scale
 * @see pv.Mark#index
 */
pv.parent = function() { return this.parent.index; };

/**
 * Stores the current event. This field is only set within event handlers.
 *
 * @type Event
 * @name pv.event
 */
/**
 * @private Returns a prototype object suitable for extending the given class
 * <tt>f</tt>. Rather than constructing a new instance of <tt>f</tt> to serve as
 * the prototype (which unnecessarily runs the constructor on the created
 * prototype object, potentially polluting it), an anonymous function is
 * generated internally that shares the same prototype:
 *
 * <pre>function g() {}
 * g.prototype = f.prototype;
 * return new g();</pre>
 *
 * For more details, see Douglas Crockford's essay on prototypal inheritance.
 *
 * @param {function} f a constructor.
 * @returns a suitable prototype object.
 * @see Douglas Crockford's essay on <a
 * href="http://javascript.crockford.com/prototypal.html">prototypal
 * inheritance</a>.
 */
pv.extend = function(f) {
  function g() {}
  g.prototype = f.prototype || f;
  return new g();
};

try {
  eval("pv.parse = function(x) x;"); // native support
} catch (e) {

/**
 * @private Parses a Protovis specification, which may use JavaScript 1.8
 * function expresses, replacing those function expressions with proper
 * functions such that the code can be run by a JavaScript 1.6 interpreter. This
 * hack only supports function expressions (using clumsy regular expressions, no
 * less), and not other JavaScript 1.8 features such as let expressions.
 *
 * @param {string} s a Protovis specification (i.e., a string of JavaScript 1.8
 * source code).
 * @returns {string} a conformant JavaScript 1.6 source code.
 */
  pv.parse = function(js) { // hacky regex support
    var re = new RegExp("function(\\s+\\w+)?\\([^)]*\\)\\s*", "mg"), m, d, i = 0, s = "";
    while (m = re.exec(js)) {
      var j = m.index + m[0].length;
      if (js.charAt(j--) != '{') {
        s += js.substring(i, j) + "{return ";
        i = j;
        for (var p = 0; p >= 0 && j < js.length; j++) {
          var c = js.charAt(j);
          switch (c) {
            case '"': case '\'': {
              while (++j < js.length && (d = js.charAt(j)) != c) {
                if (d == '\\') j++;
              }
              break;
            }
            case '[': case '(': p++; break;
            case ']': case ')': p--; break;
            case ';':
            case ',': if (p == 0) p--; break;
          }
        }
        s += pv.parse(js.substring(i, --j)) + ";}";
        i = j;
      }
      re.lastIndex = j;
    }
    s += js.substring(i);
    return s;
  };
}

/**
 * @private Computes the value of the specified CSS property <tt>p</tt> on the
 * specified element <tt>e</tt>.
 *
 * @param {string} p the name of the CSS property.
 * @param e the element on which to compute the CSS property.
 */
pv.css = function(e, p) {
  return window.getComputedStyle
      ? window.getComputedStyle(e, null).getPropertyValue(p)
      : e.currentStyle[p];
};

/**
 * @private Reports the specified error to the JavaScript console. Mozilla only
 * allows logging to the console for privileged code; if the console is
 * unavailable, the alert dialog box is used instead.
 *
 * @param e the exception that triggered the error.
 */
pv.error = function(e) {
  (typeof console == "undefined") ? alert(e) : console.error(e);
};

/**
 * @private Registers the specified listener for events of the specified type on
 * the specified target. For standards-compliant browsers, this method uses
 * <tt>addEventListener</tt>; for Internet Explorer, <tt>attachEvent</tt>.
 *
 * @param target a DOM element.
 * @param {string} type the type of event, such as "click".
 * @param {function} the event handler callback.
 */
pv.listen = function(target, type, listener) {
  listener = pv.listener(listener);
  return target.addEventListener
      ? target.addEventListener(type, listener, false)
      : target.attachEvent("on" + type, listener);
};

/**
 * @private Returns a wrapper for the specified listener function such that the
 * {@link pv.event} is set for the duration of the listener's invocation.
 *
 * @param {function} an event handler.
 * @returns {function} the wrapped event handler.
 */
pv.listener = function(listener) {
  return function(e) {
      try {
        pv.event = e;
        return listener(e);
      } finally {
        delete pv.event;
      }
    };
};
/**
 * @ignore
 * @class
 */
pv.Format = {};

/**
 * @private Given a string that may be used as part of a regular expression,
 * this methods returns an appropriately quoted version of the specified string,
 * with any special characters escaped.
 *
 * @param {string} s a string to quote.
 * @returns {string} the quoted string.
 */
pv.Format.re = function(s) {
  return s.replace(/[\\\^\$\*\+\?\[\]\(\)\.\{\}]/g, "\\$&");
};

/**
 * @private Optionally pads the specified string <i>s</i> so that it is at least
 * <i>n</i> characters long, using the padding character <i>c</i>.
 *
 * @param {string} c the padding character.
 * @param {number} n the minimum string length.
 * @param {string} s the string to pad.
 * @returns {string} the padded string.
 */
pv.Format.pad = function(c, n, s) {
  var m = n - String(s).length;
  return (m < 1) ? s : new Array(m + 1).join(c) + s;
};
/**
 * The format string is in the same format expected by the <tt>strftime</tt>
 * function in C. The following conversion specifications are supported:<ul>
 *
 * <li>%a - abbreviated weekday name.</li>
 * <li>%A - full weekday name.</li>
 * <li>%b - abbreviated month names.</li>
 * <li>%B - full month names.</li>
 * <li>%c - locale's appropriate date and time.</li>
 * <li>%C - century number.</li>
 * <li>%d - day of month [01,31] (zero padded).</li>
 * <li>%D - same as %m/%d/%y.</li>
 * <li>%e - day of month [ 1,31] (space padded).</li>
 * <li>%h - same as %b.</li>
 * <li>%H - hour (24-hour clock) [00,23] (zero padded).</li>
 * <li>%I - hour (12-hour clock) [01,12] (zero padded).</li>
 * <li>%m - month number [01,12] (zero padded).</li>
 * <li>%M - minute [0,59] (zero padded).</li>
 * <li>%n - newline character.</li>
 * <li>%p - locale's equivalent of a.m. or p.m.</li>
 * <li>%r - same as %I:%M:%S %p.</li>
 * <li>%R - same as %H:%M.</li>
 * <li>%S - second [00,61] (zero padded).</li>
 * <li>%t - tab character.</li>
 * <li>%T - same as %H:%M:%S.</li>
 * <li>%x - same as %m/%d/%y.</li>
 * <li>%X - same as %I:%M:%S %p.</li>
 * <li>%y - year with century [00,99] (zero padded).</li>
 * <li>%Y - year including century.</li>
 * <li>%% - %.</li>
 *
 * </ul>The following conversion specifications are currently <i>unsupported</i>
 * for formatting:<ul>
 *
 * <li>%j - day number [1,366].</li>
 * <li>%u - weekday number [1,7].</li>
 * <li>%U - week number [00,53].</li>
 * <li>%V - week number [01,53].</li>
 * <li>%w - weekday number [0,6].</li>
 * <li>%W - week number [00,53].</li>
 * <li>%Z - timezone name or abbreviation.</li>
 *
 * </ul>In addition, the following conversion specifications are currently
 * <i>unsupported</i> for parsing:<ul>
 *
 * <li>%a - day of week, either abbreviated or full name.</li>
 * <li>%A - same as %a.</li>
 * <li>%c - locale's appropriate date and time.</li>
 * <li>%C - century number.</li>
 * <li>%D - same as %m/%d/%y.</li>
 * <li>%I - hour (12-hour clock) [1,12].</li>
 * <li>%n - any white space.</li>
 * <li>%p - locale's equivalent of a.m. or p.m.</li>
 * <li>%r - same as %I:%M:%S %p.</li>
 * <li>%R - same as %H:%M.</li>
 * <li>%t - same as %n.</li>
 * <li>%T - same as %H:%M:%S.</li>
 * <li>%x - locale's equivalent to %m/%d/%y.</li>
 * <li>%X - locale's equivalent to %I:%M:%S %p.</li>
 *
 * </ul>
 *
 * @see <a
 * href="http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html">strftime</a>
 * documentation.
 * @see <a
 * href="http://www.opengroup.org/onlinepubs/007908799/xsh/strptime.html">strptime</a>
 * documentation.
 */
pv.Format.date = function(pattern) {
  var pad = pv.Format.pad;

  /**
   * Converts a date to a string using the associated formatting pattern.
   *
   * @param {Date} date a date to format.
   * @returns {string} the formatted date as a string.
   */
  function format(d) {
    return pattern.replace(/%[a-zA-Z0-9]/g, function(s) {
        switch (s) {
          case '%a': return [
              "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
            ][d.getDay()];
          case '%A': return [
              "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
              "Saturday"
            ][d.getDay()];
          case '%h':
          case '%b': return [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
              "Oct", "Nov", "Dec"
            ][d.getMonth()];
          case '%B': return [
              "January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"
            ][d.getMonth()];
          case '%c': return d.toLocaleString();
          case '%C': return pad("0", 2, Math.floor(d.getFullYear() / 100) % 100);
          case '%d': return pad("0", 2, d.getDate());
          case '%x':
          case '%D': return pad("0", 2, d.getMonth() + 1)
                    + "/" + pad("0", 2, d.getDate())
                    + "/" + pad("0", 2, d.getFullYear() % 100);
          case '%e': return pad(" ", 2, d.getDate());
          case '%H': return pad("0", 2, d.getHours());
          case '%I': {
            var h = d.getHours() % 12;
            return h ? pad("0", 2, h) : 12;
          }
          // TODO %j: day of year as a decimal number [001,366]
          case '%m': return pad("0", 2, d.getMonth() + 1);
          case '%M': return pad("0", 2, d.getMinutes());
          case '%n': return "\n";
          case '%p': return d.getHours() < 12 ? "AM" : "PM";
          case '%T':
          case '%X':
          case '%r': {
            var h = d.getHours() % 12;
            return (h ? pad("0", 2, h) : 12)
                    + ":" + pad("0", 2, d.getMinutes())
                    + ":" + pad("0", 2, d.getSeconds())
                    + " " + (d.getHours() < 12 ? "AM" : "PM");
          }
          case '%R': return pad("0", 2, d.getHours()) + ":" + pad("0", 2, d.getMinutes());
          case '%S': return pad("0", 2, d.getSeconds());
          case '%Q': return pad("0", 3, d.getMilliseconds());
          case '%t': return "\t";
          case '%u': {
            var w = d.getDay();
            return w ? w : 1;
          }
          // TODO %U: week number (sunday first day) [00,53]
          // TODO %V: week number (monday first day) [01,53] ... with weirdness
          case '%w': return d.getDay();
          // TODO %W: week number (monday first day) [00,53] ... with weirdness
          case '%y': return pad("0", 2, d.getFullYear() % 100);
          case '%Y': return d.getFullYear();
          // TODO %Z: timezone name or abbreviation
          case '%%': return "%";
        }
        return s;
      });
  }

  /**
   * Parses a date from a string using the associated formatting pattern.
   *
   * @param {string} s the string to parse as a date.
   * @param {string} [format] an optional format string.
   * @returns {Date} the parsed date.
   */
  format.parse = function(s) {
    var year = 1970, month = 0, date = 1, hour = 0, minute = 0, second = 0;
    var fields = [function() {}];

    /* Register callbacks for each field in the format pattern. */
    var re = pv.Format.re(pattern).replace(/%[a-zA-Z0-9]/g, function(s) {
        switch (s) {
          // TODO %a: day of week, either abbreviated or full name
          // TODO %A: same as %a
          case '%b': {
            fields.push(function(x) { month = {
                  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7,
                  Sep: 8, Oct: 9, Nov: 10, Dec: 11
                }[x]; });
            return "([A-Za-z]+)";
          }
          case '%h':
          case '%B': {
            fields.push(function(x) { month = {
                  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
                  July: 6, August: 7, September: 8, October: 9, November: 10,
                  December: 11
                }[x]; });
            return "([A-Za-z]+)";
          }
          // TODO %c: locale's appropriate date and time
          // TODO %C: century number[0,99]
          case '%e':
          case '%d': {
            fields.push(function(x) { date = x; });
            return "([0-9]+)";
          }
          // TODO %D: same as %m/%d/%y
          case '%I':
          case '%H': {
            fields.push(function(x) { hour = x; });
            return "([0-9]+)";
          }
          // TODO %j: day number [1,366]
          case '%m': {
            fields.push(function(x) { month = x - 1; });
            return "([0-9]+)";
          }
          case '%M': {
            fields.push(function(x) { minute = x; });
            return "([0-9]+)";
          }
          // TODO %n: any white space
          // TODO %p: locale's equivalent of a.m. or p.m.
          case '%p': { // TODO this is a hack
            fields.push(function(x) {
              if (hour == 12) {
                if (x == "am") hour = 0;
              } else if (x == "pm") {
                hour = Number(hour) + 12;
              }
            });
            return "(am|pm)";
          }
          // TODO %r: %I:%M:%S %p
          // TODO %R: %H:%M
          case '%S': {
            fields.push(function(x) { second = x; });
            return "([0-9]+)";
          }
          // TODO %t: any white space
          // TODO %T: %H:%M:%S
          // TODO %U: week number [00,53]
          // TODO %w: weekday [0,6]
          // TODO %W: week number [00, 53]
          // TODO %x: locale date (%m/%d/%y)
          // TODO %X: locale time (%I:%M:%S %p)
          case '%y': {
            fields.push(function(x) {
                x = Number(x);
                year = x + (((0 <= x) && (x < 69)) ? 2000
                    : (((x >= 69) && (x < 100) ? 1900 : 0)));
              });
            return "([0-9]+)";
          }
          case '%Y': {
            fields.push(function(x) { year = x; });
            return "([0-9]+)";
          }
          case '%%': {
            fields.push(function() {});
            return "%";
          }
        }
        return s;
      });

    var match = s.match(re);
    if (match) match.forEach(function(m, i) { fields[i](m); });
    return new Date(year, month, date, hour, minute, second);
  };

  return format;
};
pv.Format.time = function(type) {
  var pad = pv.Format.pad;

  /*
   * MILLISECONDS = 1
   * SECONDS = 1e3
   * MINUTES = 6e4
   * HOURS = 36e5
   * DAYS = 864e5
   * WEEKS = 6048e5
   * MONTHS = 2592e6
   * YEARS = 31536e6
   */

  /** @private */
  function format(t) {
    t = Number(t); // force conversion from Date
    switch (type) {
      case "short": {
        if (t >= 31536e6) {
          return (t / 31536e6).toFixed(1) + " years";
        } else if (t >= 6048e5) {
          return (t / 6048e5).toFixed(1) + " weeks";
        } else if (t >= 864e5) {
          return (t / 864e5).toFixed(1) + " days";
        } else if (t >= 36e5) {
          return (t / 36e5).toFixed(1) + " hours";
        } else if (t >= 6e4) {
          return (t / 6e4).toFixed(1) + " minutes";
        }
        return (t / 1e3).toFixed(1) + " seconds";
      }
      case "long": {
        var a = [],
            s = ((t % 6e4) / 1e3) >> 0,
            m = ((t % 36e5) / 6e4) >> 0;
        a.push(pad("0", 2, s));
        if (t >= 36e5) {
          var h = ((t % 864e5) / 36e5) >> 0;
          a.push(pad("0", 2, m));
          if (t >= 864e5) {
            a.push(pad("0", 2, h));
            a.push(Math.floor(t / 864e5).toFixed());
          } else {
            a.push(h.toFixed());
          }
        } else {
          a.push(m.toFixed());
        }
        return a.reverse().join(":");
      }
    }
  }

  format.parse = function(s) {
    switch (type) {
      case "short": {
        var re = /([0-9,.]+)\s*([a-z]+)/g, a, t = 0;
        while (a = re.exec(s)) {
          var f = parseFloat(a[0].replace(",", "")), u = 0;
          switch (a[2].toLowerCase()) {
            case "year": case "years": u = 31536e6; break;
            case "week": case "weeks": u = 6048e5; break;
            case "day": case "days": u = 864e5; break;
            case "hour": case "hours": u = 36e5; break;
            case "minute": case "minutes": u = 6e4; break;
            case "second": case "seconds": u = 1e3; break;
          }
          t += f * u;
        }
        return t;
      }
      case "long": {
        var a = s.replace(",", "").split(":").reverse(), t = 0;
        if (a.length) t += parseFloat(a[0]) * 1e3;
        if (a.length > 1) t += parseFloat(a[1]) * 6e4;
        if (a.length > 2) t += parseFloat(a[2]) * 36e5;
        if (a.length > 3) t += parseFloat(a[3]) * 864e5;
        return t;
      }
    }
  }

  return format;
};
/**
 * Returns a default number format.
 *
 * @class Represents a number format, converting between a <tt>number</tt> and a
 * <tt>string</tt>. This class allows numbers to be formatted with variable
 * precision (both for the integral and fractional part of the number), optional
 * thousands grouping, and optional padding. The thousands (",") and decimal
 * (".") separator can be customized.
 *
 * @returns {pv.Format.number} a number format.
 */
pv.Format.number = function() {
  var mini = 0, // default minimum integer digits
      maxi = Infinity, // default maximum integer digits
      mins = 0, // mini, including group separators
      minf = 0, // default minimum fraction digits
      maxf = 0, // default maximum fraction digits
      maxk = 1, // 10^maxf
      padi = "0", // default integer pad
      padf = "0", // default fraction pad
      padg = true, // whether group separator affects integer padding
      decimal = ".", // default decimal separator
      group = ","; // default group separator

  /** @private */
  function format(x) {
    /* Round the fractional part, and split on decimal separator. */
    if (Infinity > maxf) x = Math.round(x * maxk) / maxk;
    var s = String(Math.abs(x)).split(".");

    /* Pad, truncate and group the integral part. */
    var i = s[0], n = (x < 0) ? "-" : "";
    if (i.length > maxi) i = i.substring(i.length - maxi);
    if (padg && (i.length < mini)) i = n + new Array(mini - i.length + 1).join(padi) + i;
    if (i.length > 3) i = i.replace(/\B(?=(?:\d{3})+(?!\d))/g, group);
    if (!padg && (i.length < mins)) i = new Array(mins - i.length + 1).join(padi) + n + i;
    s[0] = i;

    /* Pad the fractional part. */
    var f = s[1] || "";
    if (f.length < minf) s[1] = f + new Array(minf - f.length + 1).join(padf);

    return s.join(decimal);
  }

  /**
   * Parses the specified string as a number. Before parsing, leading and
   * trailing padding is removed. Group separators are also removed, and the
   * decimal separator is replaced with the standard point ("."). The integer
   * part is truncated per the maximum integer digits, and the fraction part is
   * rounded per the maximum fraction digits.
   *
   * @function
   * @name pv.Format.number.prototype.parse
   * @param {string} x the string to parse.
   * @returns {number} the parsed number.
   */
  format.parse = function(x) {
    var re = pv.Format.re;

    /* Remove leading and trailing padding. Split on the decimal separator. */
    var s = String(x)
        .replace(new RegExp("^(" + re(padi) + ")*"), "")
        .replace(new RegExp("(" + re(padf) + ")*$"), "")
        .split(decimal);

    /* Remove grouping and truncate the integral part. */
    var i = s[0].replace(new RegExp(re(group), "g"), "");
    if (i.length > maxi) i = i.substring(i.length - maxi);

    /* Round the fractional part. */
    var f = s[1] ? Number("0." + s[1]) : 0;
    if (Infinity > maxf) f = Math.round(f * maxk) / maxk;

    return Math.round(i) + f;
  };

  /**
   * Sets or gets the minimum and maximum number of integer digits. This
   * controls the number of decimal digits to display before the decimal
   * separator for the integral part of the number. If the number of digits is
   * smaller than the minimum, the digits are padded; if the number of digits is
   * larger, the digits are truncated, showing only the lower-order digits. The
   * default range is [0, Infinity].
   *
   * <p>If only one argument is specified to this method, this value is used as
   * both the minimum and maximum number. If no arguments are specified, a
   * two-element array is returned containing the minimum and the maximum.
   *
   * @function
   * @name pv.Format.number.prototype.integerDigits
   * @param {number} [min] the minimum integer digits.
   * @param {number} [max] the maximum integer digits.
   * @returns {pv.Format.number} <tt>this</tt>, or the current integer digits.
   */
  format.integerDigits = function(min, max) {
    if (arguments.length) {
      mini = Number(min);
      maxi = (arguments.length > 1) ? Number(max) : mini;
      mins = mini + Math.floor(mini / 3) * group.length;
      return this;
    }
    return [mini, maxi];
  };

  /**
   * Sets or gets the minimum and maximum number of fraction digits. The
   * controls the number of decimal digits to display after the decimal
   * separator for the fractional part of the number. If the number of digits is
   * smaller than the minimum, the digits are padded; if the number of digits is
   * larger, the fractional part is rounded, showing only the higher-order
   * digits. The default range is [0, 0].
   *
   * <p>If only one argument is specified to this method, this value is used as
   * both the minimum and maximum number. If no arguments are specified, a
   * two-element array is returned containing the minimum and the maximum.
   *
   * @function
   * @name pv.Format.number.prototype.fractionDigits
   * @param {number} [min] the minimum fraction digits.
   * @param {number} [max] the maximum fraction digits.
   * @returns {pv.Format.number} <tt>this</tt>, or the current fraction digits.
   */
  format.fractionDigits = function(min, max) {
    if (arguments.length) {
      minf = Number(min);
      maxf = (arguments.length > 1) ? Number(max) : minf;
      maxk = Math.pow(10, maxf);
      return this;
    }
    return [minf, maxf];
  };

  /**
   * Sets or gets the character used to pad the integer part. The integer pad is
   * used when the number of integer digits is smaller than the minimum. The
   * default pad character is "0" (zero).
   *
   * @param {string} [x] the new pad character.
   * @returns {pv.Format.number} <tt>this</tt> or the current pad character.
   */
  format.integerPad = function(x) {
    if (arguments.length) {
      padi = String(x);
      padg = /\d/.test(padi);
      return this;
    }
    return padi;
  };

  /**
   * Sets or gets the character used to pad the fration part. The fraction pad
   * is used when the number of fraction digits is smaller than the minimum. The
   * default pad character is "0" (zero).
   *
   * @param {string} [x] the new pad character.
   * @returns {pv.Format.number} <tt>this</tt> or the current pad character.
   */
  format.fractionPad = function(x) {
    if (arguments.length) {
      padf = String(x);
      return this;
    }
    return padf;
  };

  /**
   * Sets or gets the character used as the decimal point, separating the
   * integer and fraction parts of the number. The default decimal point is ".".
   *
   * @param {string} [x] the new decimal separator.
   * @returns {pv.Format.number} <tt>this</tt> or the current decimal separator.
   */
  format.decimal = function(x) {
    if (arguments.length) {
      decimal = String(x);
      return this;
    }
    return decimal;
  };

  /**
   * Sets or gets the character used as the group separator, grouping integer
   * digits by thousands. The default decimal point is ",". Grouping can be
   * disabled by using "" for the separator.
   *
   * @param {string} [x] the new group separator.
   * @returns {pv.Format.number} <tt>this</tt> or the current group separator.
   */
  format.group = function(x) {
    if (arguments.length) {
      group = x ? String(x) : "";
      mins = mini + Math.floor(mini / 3) * group.length;
      return this;
    }
    return group;
  };

  return format;
};
/**
 * Supports CSV parsing and formatting.
 */
pv.Format.csv = function() {
  return new pv.CsvFormat();
};

pv.CsvFormat = function() {};

/**
 * Gets or sets whether this CSV format uses a header line. When parsing and
 * formatting, the first line is the header line which specifies the field names
 * for each column. Note that enabling a header line changes the input and
 * output format: when headers are disabled, a two-dimensional array is used;
 * when headers are enabled, a one-dimensional array of objects is used.
 *
 * @param {boolean} x whether to enable the header line.
 */
pv.CsvFormat.prototype.header = function(x) {
  if (arguments.length) {
    this.$header = x;
    return this;
  }
  return this.$header;
};

/**
 * Parses the specified CSV string. If this formatter is configured to treat the
 * first line as the header line, then the return value will be an array of
 * objects. The attributes of these objects are determined by the field names
 * from the header line. Otherwise, the return value will be an array of arrays.
 *
 * @param {string} s the CSV string.
 * @param {array} an array of elements parsed from CSV.
 */
pv.CsvFormat.prototype.parse = function(s) {
  var EOL = {}, // sentinel value for end-of-line
      EOF = {}, // sentinel value for end-of-file
      rows = [], // output rows
      re = /[,\n]/g, // field separator regex
      t, // the current token
      eol; // is the current token followed by EOL?

  /* Returns the next token. */
  function token() {
    if (re.lastIndex == s.length) return EOF; // special case: end of file
    if (eol) { eol = false; return EOL; } // special case: end of line

    // special case: quotes
    var j = re.lastIndex;
    if (s.charAt(j) == "\"") {
      var i = j;
      out: while (i++ < s.length) {
        switch (s.charAt(i)) {
          case "\"": {
            if (s.charAt(i + 1) == "\"") {
              i++;
              break;
            }
            break out;
          }
        }
      }
      if (s.charAt(i + 1) == "\n") eol = true;
      re.lastIndex = i + 2;
      return s.substring(j + 1, i).replace(/""/g, "\"");
    }

    // common case
    var m = re.exec(s);
    if (m) {
      if (m[0] == "\n") eol = true;
      return s.substring(j, m.index);
    }
    re.lastIndex = s.length;
    return s.substring(j);
  }

  if (this.$header) {
    var keys = [];
    while (((t = token()) !== EOL) && (t !== EOF)) keys.push(t);
    var k = 0;
    while ((t = token()) !== EOF) {
      var o = {}, j = 0;
      rows.push(o);
      while ((t !== EOL) && (t !== EOF)) {
        o[keys[j++]] = t;
        t = token();
      }
    }
  } else {
    while ((t = token()) !== EOF) {
      var a = [];
      rows.push(a);
      while ((t !== EOL) && (t !== EOF)) {
        a.push(t);
        t = token();
      }
    }
  }

  return rows;
};

/**
 * Formats the specified array to a CSV string. If this formatter is configured
 * to output the header line as the first line, then <i>a</i> should be an array
 * of objects. The attributes of the first element will be used to determine the
 * field names. Otherwise, <i>a</i> should be an array of arrays.
 *
 * @param {array} a the array of elements to output as CSV.
 * @returns {string} a CSV string.
 */
pv.CsvFormat.prototype.format = function(a) {
  if (!a.length) return "";
  var lines = [];
  if (this.$header) {
    var keys = pv.keys(a[0]);
    lines.push(keys.map(pv.CsvFormat.quote).join(","));
    for (var i = 0; i < a.length; i++) {
      lines.push(keys.map(function(key) {
          return pv.CsvFormat.quote(a[i][key]);
        }).join(","));
    }
  } else {
    for (var i = 0; i < a.length; i++) {
      lines.push(a[i].map(pv.CsvFormat.quote).join(","));
    }
  }
  return lines.join("\n");
};

/**
 * Quotes the specified string <i>s</i>, but only if necessary. Quoting is
 * necessary for special characters: double quotes, commas, and newlines.
 *
 * @param {string} s a string to quote.
 * @returns {string} the quoted string, or <i>s</i> is quoting is not needed.
 */
pv.CsvFormat.quote = function(s) {
  return /[",\n]/.test(s) ? ("\"" + s.replace(/\"/g, "\"\"") + "\"") : s;
};
/**
 * @private A private variant of Array.prototype.map that supports the index
 * property.
 */
pv.map = function(array, f) {
  var o = {};
  return f
      ? array.map(function(d, i) { o.index = i; return f.call(o, d); })
      : array.slice();
};

/**
 * Concatenates the specified array with itself <i>n</i> times. For example,
 * <tt>pv.repeat([1, 2])</tt> returns [1, 2, 1, 2].
 *
 * @param {array} a an array.
 * @param {number} [n] the number of times to repeat; defaults to two.
 * @returns {array} an array that repeats the specified array.
 */
pv.repeat = function(array, n) {
  if (arguments.length == 1) n = 2;
  return pv.blend(pv.range(n).map(function() { return array; }));
};

/**
 * Given two arrays <tt>a</tt> and <tt>b</tt>, <style
 * type="text/css">sub{line-height:0}</style> returns an array of all possible
 * pairs of elements [a<sub>i</sub>, b<sub>j</sub>]. The outer loop is on array
 * <i>a</i>, while the inner loop is on <i>b</i>, such that the order of
 * returned elements is [a<sub>0</sub>, b<sub>0</sub>], [a<sub>0</sub>,
 * b<sub>1</sub>], ... [a<sub>0</sub>, b<sub>m</sub>], [a<sub>1</sub>,
 * b<sub>0</sub>], [a<sub>1</sub>, b<sub>1</sub>], ... [a<sub>1</sub>,
 * b<sub>m</sub>], ... [a<sub>n</sub>, b<sub>m</sub>]. If either array is empty,
 * an empty array is returned.
 *
 * @param {array} a an array.
 * @param {array} b an array.
 * @returns {array} an array of pairs of elements in <tt>a</tt> and <tt>b</tt>.
 */
pv.cross = function(a, b) {
  var array = [];
  for (var i = 0, n = a.length, m = b.length; i < n; i++) {
    for (var j = 0, x = a[i]; j < m; j++) {
      array.push([x, b[j]]);
    }
  }
  return array;
};

/**
 * Given the specified array of arrays, concatenates the arrays into a single
 * array. If the individual arrays are explicitly known, an alternative to blend
 * is to use JavaScript's <tt>concat</tt> method directly. These two equivalent
 * expressions:<ul>
 *
 * <li><tt>pv.blend([[1, 2, 3], ["a", "b", "c"]])</tt>
 * <li><tt>[1, 2, 3].concat(["a", "b", "c"])</tt>
 *
 * </ul>return [1, 2, 3, "a", "b", "c"].
 *
 * @param {array[]} arrays an array of arrays.
 * @returns {array} an array containing all the elements of each array in
 * <tt>arrays</tt>.
 */
pv.blend = function(arrays) {
  return Array.prototype.concat.apply([], arrays);
};

/**
 * Given the specified array of arrays, <style
 * type="text/css">sub{line-height:0}</style> transposes each element
 * array<sub>ij</sub> with array<sub>ji</sub>. If the array has dimensions
 * <i>n</i>&times;<i>m</i>, it will have dimensions <i>m</i>&times;<i>n</i>
 * after this method returns. This method transposes the elements of the array
 * in place, mutating the array, and returning a reference to the array.
 *
 * @param {array[]} arrays an array of arrays.
 * @returns {array[]} the passed-in array, after transposing the elements.
 */
pv.transpose = function(arrays) {
  var n = arrays.length, m = pv.max(arrays, function(d) { return d.length; });

  if (m > n) {
    arrays.length = m;
    for (var i = n; i < m; i++) {
      arrays[i] = new Array(n);
    }
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < m; j++) {
        var t = arrays[i][j];
        arrays[i][j] = arrays[j][i];
        arrays[j][i] = t;
      }
    }
  } else {
    for (var i = 0; i < m; i++) {
      arrays[i].length = n;
    }
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < i; j++) {
        var t = arrays[i][j];
        arrays[i][j] = arrays[j][i];
        arrays[j][i] = t;
      }
    }
  }

  arrays.length = m;
  for (var i = 0; i < m; i++) {
    arrays[i].length = n;
  }

  return arrays;
};

/**
 * Returns a normalized copy of the specified array, such that the sum of the
 * returned elements sum to one. If the specified array is not an array of
 * numbers, an optional accessor function <tt>f</tt> can be specified to map the
 * elements to numbers. For example, if <tt>array</tt> is an array of objects,
 * and each object has a numeric property "foo", the expression
 *
 * <pre>pv.normalize(array, function(d) d.foo)</pre>
 *
 * returns a normalized array on the "foo" property. If an accessor function is
 * not specified, the identity function is used. Accessor functions can refer to
 * <tt>this.index</tt>.
 *
 * @param {array} array an array of objects, or numbers.
 * @param {function} [f] an optional accessor function.
 * @returns {number[]} an array of numbers that sums to one.
 */
pv.normalize = function(array, f) {
  var norm = pv.map(array, f), sum = pv.sum(norm);
  for (var i = 0; i < norm.length; i++) norm[i] /= sum;
  return norm;
};

/**
 * Returns a permutation of the specified array, using the specified array of
 * indexes. The returned array contains the corresponding element in
 * <tt>array</tt> for each index in <tt>indexes</tt>, in order. For example,
 *
 * <pre>pv.permute(["a", "b", "c"], [1, 2, 0])</pre>
 *
 * returns <tt>["b", "c", "a"]</tt>. It is acceptable for the array of indexes
 * to be a different length from the array of elements, and for indexes to be
 * duplicated or omitted. The optional accessor function <tt>f</tt> can be used
 * to perform a simultaneous mapping of the array elements. Accessor functions
 * can refer to <tt>this.index</tt>.
 *
 * @param {array} array an array.
 * @param {number[]} indexes an array of indexes into <tt>array</tt>.
 * @param {function} [f] an optional accessor function.
 * @returns {array} an array of elements from <tt>array</tt>; a permutation.
 */
pv.permute = function(array, indexes, f) {
  if (!f) f = pv.identity;
  var p = new Array(indexes.length), o = {};
  indexes.forEach(function(j, i) { o.index = j; p[i] = f.call(o, array[j]); });
  return p;
};

/**
 * Returns a map from key to index for the specified <tt>keys</tt> array. For
 * example,
 *
 * <pre>pv.numerate(["a", "b", "c"])</pre>
 *
 * returns <tt>{a: 0, b: 1, c: 2}</tt>. Note that since JavaScript maps only
 * support string keys, <tt>keys</tt> must contain strings, or other values that
 * naturally map to distinct string values. Alternatively, an optional accessor
 * function <tt>f</tt> can be specified to compute the string key for the given
 * element. Accessor functions can refer to <tt>this.index</tt>.
 *
 * @param {array} keys an array, usually of string keys.
 * @param {function} [f] an optional key function.
 * @returns a map from key to index.
 */
pv.numerate = function(keys, f) {
  if (!f) f = pv.identity;
  var map = {}, o = {};
  keys.forEach(function(x, i) { o.index = i; map[f.call(o, x)] = i; });
  return map;
};

/**
 * The comparator function for natural order. This can be used in conjunction with
 * the built-in array <tt>sort</tt> method to sort elements by their natural
 * order, ascending. Note that if no comparator function is specified to the
 * built-in <tt>sort</tt> method, the default order is lexicographic, <i>not</i>
 * natural!
 *
 * @see <a
 * href="http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/sort">Array.sort</a>.
 * @param a an element to compare.
 * @param b an element to compare.
 * @returns {number} negative if a &lt; b; positive if a &gt; b; otherwise 0.
 */
pv.naturalOrder = function(a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

/**
 * The comparator function for reverse natural order. This can be used in
 * conjunction with the built-in array <tt>sort</tt> method to sort elements by
 * their natural order, descending. Note that if no comparator function is
 * specified to the built-in <tt>sort</tt> method, the default order is
 * lexicographic, <i>not</i> natural!
 *
 * @see #naturalOrder
 * @param a an element to compare.
 * @param b an element to compare.
 * @returns {number} negative if a &lt; b; positive if a &gt; b; otherwise 0.
 */
pv.reverseOrder = function(b, a) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

/**
 * Searches the specified array of numbers for the specified value using the
 * binary search algorithm. The array must be sorted (as by the <tt>sort</tt>
 * method) prior to making this call. If it is not sorted, the results are
 * undefined. If the array contains multiple elements with the specified value,
 * there is no guarantee which one will be found.
 *
 * <p>The <i>insertion point</i> is defined as the point at which the value
 * would be inserted into the array: the index of the first element greater than
 * the value, or <tt>array.length</tt>, if all elements in the array are less
 * than the specified value. Note that this guarantees that the return value
 * will be nonnegative if and only if the value is found.
 *
 * @param {number[]} array the array to be searched.
 * @param {number} value the value to be searched for.
 * @returns the index of the search value, if it is contained in the array;
 * otherwise, (-(<i>insertion point</i>) - 1).
 * @param {function} [f] an optional key function.
 */
pv.search = function(array, value, f) {
  if (!f) f = pv.identity;
  var low = 0, high = array.length - 1;
  while (low <= high) {
    var mid = (low + high) >> 1, midValue = f(array[mid]);
    if (midValue < value) low = mid + 1;
    else if (midValue > value) high = mid - 1;
    else return mid;
  }
  return -low - 1;
};

pv.search.index = function(array, value, f) {
  var i = pv.search(array, value, f);
  return (i < 0) ? (-i - 1) : i;
};
/**
 * Returns an array of numbers, starting at <tt>start</tt>, incrementing by
 * <tt>step</tt>, until <tt>stop</tt> is reached. The stop value is exclusive. If
 * only a single argument is specified, this value is interpeted as the
 * <i>stop</i> value, with the <i>start</i> value as zero. If only two arguments
 * are specified, the step value is implied to be one.
 *
 * <p>The method is modeled after the built-in <tt>range</tt> method from
 * Python. See the Python documentation for more details.
 *
 * @see <a href="http://docs.python.org/library/functions.html#range">Python range</a>
 * @param {number} [start] the start value.
 * @param {number} stop the stop value.
 * @param {number} [step] the step value.
 * @returns {number[]} an array of numbers.
 */
pv.range = function(start, stop, step) {
  if (arguments.length == 1) {
    stop = start;
    start = 0;
  }
  if (step == undefined) step = 1;
  else if (!step) throw new Error("step must be non-zero");
  var array = [], i = 0, j;
  if (step < 0) {
    while ((j = start + step * i++) > stop) {
      array.push(j);
    }
  } else {
    while ((j = start + step * i++) < stop) {
      array.push(j);
    }
  }
  return array;
};

/**
 * Returns a random number in the range [<tt>min</tt>, <tt>max</tt>) that is a
 * multiple of <tt>step</tt>. More specifically, the returned number is of the
 * form <tt>min</tt> + <i>n</i> * <tt>step</tt>, where <i>n</i> is a nonnegative
 * integer. If <tt>step</tt> is not specified, it defaults to 1, returning a
 * random integer if <tt>min</tt> is also an integer.
 *
 * @param min {number} minimum value.
 * @param [max] {number} maximum value.
 * @param [step] {numbeR} step value.
 */
pv.random = function(min, max, step) {
  if (arguments.length == 1) {
    max = min;
    min = 0;
  }
  if (step == undefined) {
    step = 1;
  }
  return step
      ? (Math.floor(Math.random() * (max - min) / step) * step + min)
      : (Math.random() * (max - min) + min);
};

/**
 * Returns the sum of the specified array. If the specified array is not an
 * array of numbers, an optional accessor function <tt>f</tt> can be specified
 * to map the elements to numbers. See {@link #normalize} for an example.
 * Accessor functions can refer to <tt>this.index</tt>.
 *
 * @param {array} array an array of objects, or numbers.
 * @param {function} [f] an optional accessor function.
 * @returns {number} the sum of the specified array.
 */
pv.sum = function(array, f) {
  var o = {};
  return array.reduce(f
      ? function(p, d, i) { o.index = i; return p + f.call(o, d); }
      : function(p, d) { return p + d; }, 0);
};

/**
 * Returns the maximum value of the specified array. If the specified array is
 * not an array of numbers, an optional accessor function <tt>f</tt> can be
 * specified to map the elements to numbers. See {@link #normalize} for an
 * example. Accessor functions can refer to <tt>this.index</tt>.
 *
 * @param {array} array an array of objects, or numbers.
 * @param {function} [f] an optional accessor function.
 * @returns {number} the maximum value of the specified array.
 */
pv.max = function(array, f) {
  if (f == pv.index) return array.length - 1;
  return Math.max.apply(null, f ? pv.map(array, f) : array);
};

/**
 * Returns the index of the maximum value of the specified array. If the
 * specified array is not an array of numbers, an optional accessor function
 * <tt>f</tt> can be specified to map the elements to numbers. See
 * {@link #normalize} for an example. Accessor functions can refer to
 * <tt>this.index</tt>.
 *
 * @param {array} array an array of objects, or numbers.
 * @param {function} [f] an optional accessor function.
 * @returns {number} the index of the maximum value of the specified array.
 */
pv.max.index = function(array, f) {
  if (f == pv.index) return array.length - 1;
  if (!f) f = pv.identity;
  var maxi = -1, maxx = -Infinity, o = {};
  for (var i = 0; i < array.length; i++) {
    o.index = i;
    var x = f.call(o, array[i]);
    if (x > maxx) {
      maxx = x;
      maxi = i;
    }
  }
  return maxi;
}

/**
 * Returns the minimum value of the specified array of numbers. If the specified
 * array is not an array of numbers, an optional accessor function <tt>f</tt>
 * can be specified to map the elements to numbers. See {@link #normalize} for
 * an example. Accessor functions can refer to <tt>this.index</tt>.
 *
 * @param {array} array an array of objects, or numbers.
 * @param {function} [f] an optional accessor function.
 * @returns {number} the minimum value of the specified array.
 */
pv.min = function(array, f) {
  if (f == pv.index) return 0;
  return Math.min.apply(null, f ? pv.map(array, f) : array);
};

/**
 * Returns the index of the minimum value of the specified array. If the
 * specified array is not an array of numbers, an optional accessor function
 * <tt>f</tt> can be specified to map the elements to numbers. See
 * {@link #normalize} for an example. Accessor functions can refer to
 * <tt>this.index</tt>.
 *
 * @param {array} array an array of objects, or numbers.
 * @param {function} [f] an optional accessor function.
 * @returns {number} the index of the minimum value of the specified array.
 */
pv.min.index = function(array, f) {
  if (f == pv.index) return 0;
  if (!f) f = pv.identity;
  var mini = -1, minx = Infinity, o = {};
  for (var i = 0; i < array.length; i++) {
    o.index = i;
    var x = f.call(o, array[i]);
    if (x < minx) {
      minx = x;
      mini = i;
    }
  }
  return mini;
}

/**
 * Returns the arithmetic mean, or average, of the specified array. If the
 * specified array is not an array of numbers, an optional accessor function
 * <tt>f</tt> can be specified to map the elements to numbers. See
 * {@link #normalize} for an example. Accessor functions can refer to
 * <tt>this.index</tt>.
 *
 * @param {array} array an array of objects, or numbers.
 * @param {function} [f] an optional accessor function.
 * @returns {number} the mean of the specified array.
 */
pv.mean = function(array, f) {
  return pv.sum(array, f) / array.length;
};

/**
 * Returns the median of the specified array. If the specified array is not an
 * array of numbers, an optional accessor function <tt>f</tt> can be specified
 * to map the elements to numbers. See {@link #normalize} for an example.
 * Accessor functions can refer to <tt>this.index</tt>.
 *
 * @param {array} array an array of objects, or numbers.
 * @param {function} [f] an optional accessor function.
 * @returns {number} the median of the specified array.
 */
pv.median = function(array, f) {
  if (f == pv.index) return (array.length - 1) / 2;
  array = pv.map(array, f).sort(pv.naturalOrder);
  if (array.length % 2) return array[Math.floor(array.length / 2)];
  var i = array.length / 2;
  return (array[i - 1] + array[i]) / 2;
};

/**
 * Returns the variance of the specified array. If the specified array is not an
 * array of numbers, an optional accessor function <tt>f</tt> can be specified
 * to map the elements to numbers. See {@link #normalize} for an
 * example. Accessor functions can refer to <tt>this.index</tt>.
 *
 * @param {array} array an array of objects, or numbers.
 * @param {function} [f] an optional accessor function.
 * @returns {number} the variance of the specified array.
 */
pv.variance = function(array, f) {
  var mean = pv.mean(array, f), sum = 0, o = {};
  if (!f) f = pv.identity;
  for (var i = 0; i < array.length; i++) {
    o.index = i;
    var d = f.call(o, array[i]) - mean;
    sum += d * d;
  }
  return sum;
};

/**
 * Returns the standard deviation of the specified array. If the specified array
 * is not an array of numbers, an optional accessor function <tt>f</tt> can be
 * specified to map the elements to numbers. See {@link #normalize} for an
 * example. Accessor functions can refer to <tt>this.index</tt>.
 *
 * @param {array} array an array of objects, or numbers.
 * @param {function} [f] an optional accessor function.
 * @returns {number} the standard deviation of the specified array.
 */
pv.stddev = function(array, f) {
  return Math.sqrt(pv.variance(array, f) / (array.length - 1));
};

/**
 * Returns the logarithm with a given base value.
 *
 * @param {number} x the number for which to compute the logarithm.
 * @param {number} b the base of the logarithm.
 * @returns {number} the logarithm value.
 */
pv.log = function(x, b) {
  return Math.log(x) / Math.log(b);
};

/**
 * Computes a zero-symmetric logarithm. Computes the logarithm of the absolute
 * value of the input, and determines the sign of the output according to the
 * sign of the input value.
 *
 * @param {number} x the number for which to compute the logarithm.
 * @param {number} b the base of the logarithm.
 * @returns {number} the symmetric log value.
 */
pv.logSymmetric = function(x, b) {
  return (x == 0) ? 0 : ((x < 0) ? -pv.log(-x, b) : pv.log(x, b));
};

/**
 * Computes a zero-symmetric logarithm, with adjustment to values between zero
 * and the logarithm base. This adjustment introduces distortion for values less
 * than the base number, but enables simultaneous plotting of log-transformed
 * data involving both positive and negative numbers.
 *
 * @param {number} x the number for which to compute the logarithm.
 * @param {number} b the base of the logarithm.
 * @returns {number} the adjusted, symmetric log value.
 */
pv.logAdjusted = function(x, b) {
  var negative = x < 0;
  if (x < b) x += (b - x) / b;
  return negative ? -pv.log(x, b) : pv.log(x, b);
};

/**
 * Rounds an input value down according to its logarithm. The method takes the
 * floor of the logarithm of the value and then uses the resulting value as an
 * exponent for the base value.
 *
 * @param {number} x the number for which to compute the logarithm floor.
 * @param {number} b the base of the logarithm.
 * @returns {number} the rounded-by-logarithm value.
 */
pv.logFloor = function(x, b) {
  return (x > 0)
      ? Math.pow(b, Math.floor(pv.log(x, b)))
      : -Math.pow(b, -Math.floor(-pv.log(-x, b)));
};

/**
 * Rounds an input value up according to its logarithm. The method takes the
 * ceiling of the logarithm of the value and then uses the resulting value as an
 * exponent for the base value.
 *
 * @param {number} x the number for which to compute the logarithm ceiling.
 * @param {number} b the base of the logarithm.
 * @returns {number} the rounded-by-logarithm value.
 */
pv.logCeil = function(x, b) {
  return (x > 0)
      ? Math.pow(b, Math.ceil(pv.log(x, b)))
      : -Math.pow(b, -Math.ceil(-pv.log(-x, b)));
};
/**
 * Returns all of the property names (keys) of the specified object (a map). The
 * order of the returned array is not defined.
 *
 * @param map an object.
 * @returns {string[]} an array of strings corresponding to the keys.
 * @see #entries
 */
pv.keys = function(map) {
  var array = [];
  for (var key in map) {
    array.push(key);
  }
  return array;
};

/**
 * Returns all of the entries (key-value pairs) of the specified object (a
 * map). The order of the returned array is not defined. Each key-value pair is
 * represented as an object with <tt>key</tt> and <tt>value</tt> attributes,
 * e.g., <tt>{key: "foo", value: 42}</tt>.
 *
 * @param map an object.
 * @returns {array} an array of key-value pairs corresponding to the keys.
 */
pv.entries = function(map) {
  var array = [];
  for (var key in map) {
    array.push({ key: key, value: map[key] });
  }
  return array;
};

/**
 * Returns all of the values (attribute values) of the specified object (a
 * map). The order of the returned array is not defined.
 *
 * @param map an object.
 * @returns {array} an array of objects corresponding to the values.
 * @see #entries
 */
pv.values = function(map) {
  var array = [];
  for (var key in map) {
    array.push(map[key]);
  }
  return array;
};

/**
 * Returns a map constructed from the specified <tt>keys</tt>, using the
 * function <tt>f</tt> to compute the value for each key. The single argument to
 * the value function is the key. The callback is invoked only for indexes of
 * the array which have assigned values; it is not invoked for indexes which
 * have been deleted or which have never been assigned values.
 *
 * <p>For example, this expression creates a map from strings to string length:
 *
 * <pre>pv.dict(["one", "three", "seventeen"], function(s) s.length)</pre>
 *
 * The returned value is <tt>{one: 3, three: 5, seventeen: 9}</tt>. Accessor
 * functions can refer to <tt>this.index</tt>.
 *
 * @param {array} keys an array.
 * @param {function} f a value function.
 * @returns a map from keys to values.
 */
pv.dict = function(keys, f) {
  var m = {}, o = {};
  for (var i = 0; i < keys.length; i++) {
    if (i in keys) {
      var k = keys[i];
      o.index = i;
      m[k] = f.call(o, k);
    }
  }
  return m;
};
/**
 * Returns a {@link pv.Dom} operator for the given map. This is a convenience
 * factory method, equivalent to <tt>new pv.Dom(map)</tt>. To apply the operator
 * and retrieve the root node, call {@link pv.Dom#root}; to retrieve all nodes
 * flattened, use {@link pv.Dom#nodes}.
 *
 * @see pv.Dom
 * @param map a map from which to construct a DOM.
 * @returns {pv.Dom} a DOM operator for the specified map.
 */
pv.dom = function(map) {
  return new pv.Dom(map);
};

/**
 * Constructs a DOM operator for the specified map. This constructor should not
 * be invoked directly; use {@link pv.dom} instead.
 *
 * @class Represets a DOM operator for the specified map. This allows easy
 * transformation of a hierarchical JavaScript object (such as a JSON map) to a
 * W3C Document Object Model hierarchy. For more information on which attributes
 * and methods from the specification are supported, see {@link pv.Dom.Node}.
 *
 * <p>Leaves in the map are determined using an associated <i>leaf</i> function;
 * see {@link #leaf}. By default, leaves are any value whose type is not
 * "object", such as numbers or strings.
 *
 * @param map a map from which to construct a DOM.
 */
pv.Dom = function(map) {
  this.$map = map;
};

/** @private The default leaf function. */
pv.Dom.prototype.$leaf = function(n) {
  return typeof n != "object";
};

/**
 * Sets or gets the leaf function for this DOM operator. The leaf function
 * identifies which values in the map are leaves, and which are internal nodes.
 * By default, objects are considered internal nodes, and primitives (such as
 * numbers and strings) are considered leaves.
 *
 * @param {function} f the new leaf function.
 * @returns the current leaf function, or <tt>this</tt>.
 */
pv.Dom.prototype.leaf = function(f) {
  if (arguments.length) {
    this.$leaf = f;
    return this;
  }
  return this.$leaf;
};

/**
 * Applies the DOM operator, returning the root node.
 *
 * @returns {pv.Dom.Node} the root node.
 */
pv.Dom.prototype.root = function() {
  var leaf = this.$leaf;

  /** @private */
  function recurse(map) {
    var n = new pv.Dom.Node();
    for (var k in map) {
      var v = map[k];
      n.appendChild(leaf(v) ? new pv.Dom.Node(v) : recurse(v)).nodeName = k;
    }
    return n;
  }

  return recurse(this.$map);
};

/**
 * Applies the DOM operator, returning the array of all nodes in preorder
 * traversal.
 *
 * @returns {array} the array of nodes in preorder traversal.
 */
pv.Dom.prototype.nodes = function() {
  var array = [];

  /** @private */
  function flatten(node) {
    array.push(node);
    node.childNodes.forEach(flatten);
  }

  flatten(this.root(), array);
  return array;
};

/**
 * Constructs a DOM node for the specified value. Instances of this class are
 * not typically created directly; instead they are generated from a JavaScript
 * map using the {@link pv.Dom} operator.
 *
 * @class Represents a <code>Node</tt> in the W3C Document Object Model.
 */
pv.Dom.Node = function(value) {
  this.nodeValue = value;
  this.childNodes = [];
};

/**
 * The node name. When generated from a map, the node name corresponds to the
 * key at the given level in the map. Note that the root node has no associated
 * key, and thus has an undefined node name (and no <tt>parentNode</tt>).
 *
 * @type string
 * @field pv.Dom.Node.prototype.nodeName
 */

/**
 * The node value. When generated from a map, node value corresponds to the leaf
 * value for leaf nodes, and is undefined for internal nodes.
 *
 * @field pv.Dom.Node.prototype.nodeValue
 */

/**
 * The array of child nodes. This array is empty for leaf nodes. An easy way to
 * check if child nodes exist is to query <tt>firstChild</tt>.
 *
 * @type array
 * @field pv.Dom.Node.prototype.childNodes
 */

/**
 * The parent node, which is null for root nodes.
 *
 * @type pv.Dom.Node
 */
pv.Dom.Node.prototype.parentNode = null;

/**
 * The first child, which is null for leaf nodes.
 *
 * @type pv.Dom.Node
 */
pv.Dom.Node.prototype.firstChild = null;

/**
 * The last child, which is null for leaf nodes.
 *
 * @type pv.Dom.Node
 */
pv.Dom.Node.prototype.lastChild = null;

/**
 * The previous sibling node, which is null for the first child.
 *
 * @type pv.Dom.Node
 */
pv.Dom.Node.prototype.previousSibling = null;

/**
 * The next sibling node, which is null for the last child.
 *
 * @type pv.Dom.Node
 */
pv.Dom.Node.prototype.nextSibling = null;

/**
 * Removes the specified child node from this node.
 *
 * @throws Error if the specified child is not a child of this node.
 * @returns {pv.Dom.Node} the removed child.
 */
pv.Dom.Node.prototype.removeChild = function(n) {
  var i = this.childNodes.indexOf(n);
  if (i == -1) throw new Error("child not found");
  this.childNodes.splice(i, 1);
  if (n.previousSibling) n.previousSibling.nextSibling = n.nextSibling;
  else this.firstChild = n.nextSibling;
  if (n.nextSibling) n.nextSibling.previousSibling = n.previousSibling;
  else this.lastChild = n.previousSibling;
  delete n.nextSibling;
  delete n.previousSibling;
  delete n.parentNode;
  return n;
};

/**
 * Appends the specified child node to this node. If the specified child is
 * already part of the DOM, the child is first removed before being added to
 * this node.
 *
 * @returns {pv.Dom.Node} the appended child.
 */
pv.Dom.Node.prototype.appendChild = function(n) {
  if (n.parentNode) n.parentNode.removeChild(n);
  n.parentNode = this;
  n.previousSibling = this.lastChild;
  if (this.lastChild) this.lastChild.nextSibling = n;
  else this.firstChild = n;
  this.lastChild = n;
  this.childNodes.push(n);
  return n;
};

/**
 * Inserts the specified child <i>n</i> before the given reference child
 * <i>r</i> of this node. If <i>r</i> is null, this method is equivalent to
 * {@link #appendChild}. If <i>n</i> is already part of the DOM, it is first
 * removed before being inserted.
 *
 * @throws Error if <i>r</i> is non-null and not a child of this node.
 * @returns {pv.Dom.Node} the inserted child.
 */
pv.Dom.Node.prototype.insertBefore = function(n, r) {
  if (!r) return this.appendChild(n);
  var i = this.childNodes.indexOf(r);
  if (i == -1) throw new Error("child not found");
  if (n.parentNode) n.parentNode.removeChild(n);
  n.parentNode = this;
  n.nextSibling = r;
  n.previousSibling = r.previousSibling;
  if (r.previousSibling) {
    r.previousSibling.nextSibling = n;
  } else {
    if (r == this.lastChild) this.lastChild = n;
    this.firstChild = n;
  }
  this.childNodes.splice(i, 0, n);
  return n;
};

/**
 * Replaces the specified child <i>r</i> of this node with the node <i>n</i>. If
 * <i>n</i> is already part of the DOM, it is first removed before being added.
 *
 * @throws Error if <i>r</i> is not a child of this node.
 */
pv.Dom.Node.prototype.replaceChild = function(n, r) {
  var i = this.childNodes.indexOf(r);
  if (i == -1) throw new Error("child not found");
  if (n.parentNode) n.parentNode.removeChild(n);
  n.parentNode = this;
  n.nextSibling = r.nextSibling;
  n.previousSibling = r.previousSibling;
  if (r.previousSibling) r.previousSibling.nextSibling = n;
  else this.firstChild = n;
  if (r.nextSibling) r.nextSibling.previousSibling = n;
  else this.lastChild = n;
  this.childNodes[i] = n;
  return r;
};

/**
 * Visits each node in the tree in preorder traversal, applying the specified
 * function <i>f</i>. The arguments to the function are:<ol>
 *
 * <li>The current node.
 * <li>The current depth, starting at 0 for the root node.</ol>
 *
 * @param {function} f a function to apply to each node.
 */
pv.Dom.Node.prototype.visitBefore = function(f) {
  function visit(n, i) {
    f(n, i);
    for (var c = n.firstChild; c; c = c.nextSibling) {
      visit(c, i + 1);
    }
  }
  visit(this, 0);
};

/**
 * Visits each node in the tree in postorder traversal, applying the specified
 * function <i>f</i>. The arguments to the function are:<ol>
 *
 * <li>The current node.
 * <li>The current depth, starting at 0 for the root node.</ol>
 *
 * @param {function} f a function to apply to each node.
 */
pv.Dom.Node.prototype.visitAfter = function(f) {
  function visit(n, i) {
    for (var c = n.firstChild; c; c = c.nextSibling) {
      visit(c, i + 1);
    }
    f(n, i);
  }
  visit(this, 0);
};

/**
 * Sorts child nodes of this node, and all descendent nodes recursively, using
 * the specified comparator function <tt>f</tt>. The comparator function is
 * passed two nodes to compare.
 *
 * <p>Note: during the sort operation, the comparator function should not rely
 * on the tree being well-formed; the values of <tt>previousSibling</tt> and
 * <tt>nextSibling</tt> for the nodes being compared are not defined during the
 * sort operation.
 *
 * @param {function} f a comparator function.
 */
pv.Dom.Node.prototype.sort = function(f) {
  if (this.firstChild) {
    this.childNodes.sort(f);
    var p = this.firstChild = this.childNodes[0], c;
    delete p.previousSibling;
    for (var i = 1; i < this.childNodes.length; i++) {
      p.sort(f);
      c = this.childNodes[i];
      c.previousSibling = p;
      p = p.nextSibling = c;
    }
    this.lastChild = p;
    delete p.nextSibling;
    p.sort(f);
  }
};
/**
 * Returns a {@link pv.Tree} operator for the specified array. This is a
 * convenience factory method, equivalent to <tt>new pv.Tree(array)</tt>.
 *
 * @see pv.Tree
 * @param {array} array an array from which to construct a tree.
 * @returns {pv.Tree} a tree operator for the specified array.
 */
pv.tree = function(array) {
  return new pv.Tree(array);
};

/**
 * Constructs a tree operator for the specified array. This constructor should
 * not be invoked directly; use {@link pv.tree} instead.
 *
 * @class Represents a tree operator for the specified array. The tree operator
 * allows a hierarchical map to be constructed from an array; it is similar to
 * the {@link pv.Nest} operator, except the hierarchy is derived dynamically
 * from the array elements.
 *
 * <p>For example, given an array of size information for ActionScript classes:
 *
 * <pre>{ name: "flare.flex.FlareVis", size: 4116 },
 * { name: "flare.physics.DragForce", size: 1082 },
 * { name: "flare.physics.GravityForce", size: 1336 }, ...</pre>
 *
 * To facilitate visualization, it may be useful to nest the elements by their
 * package hierarchy:
 *
 * <pre>var tree = pv.tree(classes)
 *     .keys(function(d) d.name.split("."))
 *     .map();</pre>
 *
 * The resulting tree is:
 *
 * <pre>{ flare: {
 *     flex: {
 *       FlareVis: {
 *         name: "flare.flex.FlareVis",
 *         size: 4116 } },
 *     physics: {
 *       DragForce: {
 *         name: "flare.physics.DragForce",
 *         size: 1082 },
 *       GravityForce: {
 *         name: "flare.physics.GravityForce",
 *         size: 1336 } },
 *     ... } }</pre>
 *
 * By specifying a value function,
 *
 * <pre>var tree = pv.tree(classes)
 *     .keys(function(d) d.name.split("."))
 *     .value(function(d) d.size)
 *     .map();</pre>
 *
 * we can further eliminate redundant data:
 *
 * <pre>{ flare: {
 *     flex: {
 *       FlareVis: 4116 },
 *     physics: {
 *       DragForce: 1082,
 *       GravityForce: 1336 },
 *   ... } }</pre>
 *
 * For visualizations with large data sets, performance improvements may be seen
 * by storing the data in a tree format, and then flattening it into an array at
 * runtime with {@link pv.Flatten}.
 *
 * @param {array} array an array from which to construct a tree.
 */
pv.Tree = function(array) {
  this.array = array;
};

/**
 * Assigns a <i>keys</i> function to this operator; required. The keys function
 * returns an array of <tt>string</tt>s for each element in the associated
 * array; these keys determine how the elements are nested in the tree. The
 * returned keys should be unique for each element in the array; otherwise, the
 * behavior of this operator is undefined.
 *
 * @param {function} k the keys function.
 * @returns {pv.Tree} this.
 */
pv.Tree.prototype.keys = function(k) {
  this.k = k;
  return this;
};

/**
 * Assigns a <i>value</i> function to this operator; optional. The value
 * function specifies an optional transformation of the element in the array
 * before it is inserted into the map. If no value function is specified, it is
 * equivalent to using the identity function.
 *
 * @param {function} k the value function.
 * @returns {pv.Tree} this.
 */
pv.Tree.prototype.value = function(v) {
  this.v = v;
  return this;
};

/**
 * Returns a hierarchical map of values. The hierarchy is determined by the keys
 * function; the values in the map are determined by the value function.
 *
 * @returns a hierarchical map of values.
 */
pv.Tree.prototype.map = function() {
  var map = {}, o = {};
  for (var i = 0; i < this.array.length; i++) {
    o.index = i;
    var value = this.array[i], keys = this.k.call(o, value), node = map;
    for (var j = 0; j < keys.length - 1; j++) {
      node = node[keys[j]] || (node[keys[j]] = {});
    }
    node[keys[j]] = this.v ? this.v.call(o, value) : value;
  }
  return map;
};
/**
 * Returns a {@link pv.Nest} operator for the specified array. This is a
 * convenience factory method, equivalent to <tt>new pv.Nest(array)</tt>.
 *
 * @see pv.Nest
 * @param {array} array an array of elements to nest.
 * @returns {pv.Nest} a nest operator for the specified array.
 */
pv.nest = function(array) {
  return new pv.Nest(array);
};

/**
 * Constructs a nest operator for the specified array. This constructor should
 * not be invoked directly; use {@link pv.nest} instead.
 *
 * @class Represents a {@link Nest} operator for the specified array. Nesting
 * allows elements in an array to be grouped into a hierarchical tree
 * structure. The levels in the tree are specified by <i>key</i> functions. The
 * leaf nodes of the tree can be sorted by value, while the internal nodes can
 * be sorted by key. Finally, the tree can be returned either has a
 * multidimensional array via {@link #entries}, or as a hierarchical map via
 * {@link #map}. The {@link #rollup} routine similarly returns a map, collapsing
 * the elements in each leaf node using a summary function.
 *
 * <p>For example, consider the following tabular data structure of Barley
 * yields, from various sites in Minnesota during 1931-2:
 *
 * <pre>{ yield: 27.00, variety: "Manchuria", year: 1931, site: "University Farm" },
 * { yield: 48.87, variety: "Manchuria", year: 1931, site: "Waseca" },
 * { yield: 27.43, variety: "Manchuria", year: 1931, site: "Morris" }, ...</pre>
 *
 * To facilitate visualization, it may be useful to nest the elements first by
 * year, and then by variety, as follows:
 *
 * <pre>var nest = pv.nest(yields)
 *     .key(function(d) d.year)
 *     .key(function(d) d.variety)
 *     .entries();</pre>
 *
 * This returns a nested array. Each element of the outer array is a key-values
 * pair, listing the values for each distinct key:
 *
 * <pre>{ key: 1931, values: [
 *   { key: "Manchuria", values: [
 *       { yield: 27.00, variety: "Manchuria", year: 1931, site: "University Farm" },
 *       { yield: 48.87, variety: "Manchuria", year: 1931, site: "Waseca" },
 *       { yield: 27.43, variety: "Manchuria", year: 1931, site: "Morris" },
 *       ...
 *     ] },
 *   { key: "Glabron", values: [
 *       { yield: 43.07, variety: "Glabron", year: 1931, site: "University Farm" },
 *       { yield: 55.20, variety: "Glabron", year: 1931, site: "Waseca" },
 *       ...
 *     ] },
 *   ] },
 * { key: 1932, values: ... }</pre>
 *
 * Further details, including sorting and rollup, is provided below on the
 * corresponding methods.
 *
 * @param {array} array an array of elements to nest.
 */
pv.Nest = function(array) {
  this.array = array;
  this.keys = [];
};

/**
 * Nests using the specified key function. Multiple keys may be added to the
 * nest; the array elements will be nested in the order keys are specified.
 *
 * @param {function} key a key function; must return a string or suitable map
 * key.
 * @returns {pv.Nest} this.
 */
pv.Nest.prototype.key = function(key) {
  this.keys.push(key);
  return this;
};

/**
 * Sorts the previously-added keys. The natural sort order is used by default
 * (see {@link pv.naturalOrder}); if an alternative order is desired,
 * <tt>order</tt> should be a comparator function. If this method is not called
 * (i.e., keys are <i>unsorted</i>), keys will appear in the order they appear
 * in the underlying elements array. For example,
 *
 * <pre>pv.nest(yields)
 *     .key(function(d) d.year)
 *     .key(function(d) d.variety)
 *     .sortKeys()
 *     .entries()</pre>
 *
 * groups yield data by year, then variety, and sorts the variety groups
 * lexicographically (since the variety attribute is a string).
 *
 * <p>Key sort order is only used in conjunction with {@link #entries}, which
 * returns an array of key-values pairs. If the nest is used to construct a
 * {@link #map} instead, keys are unsorted.
 *
 * @param {function} [order] an optional comparator function.
 * @returns {pv.Nest} this.
 */
pv.Nest.prototype.sortKeys = function(order) {
  this.keys[this.keys.length - 1].order = order || pv.naturalOrder;
  return this;
};

/**
 * Sorts the leaf values. The natural sort order is used by default (see
 * {@link pv.naturalOrder}); if an alternative order is desired, <tt>order</tt>
 * should be a comparator function. If this method is not called (i.e., values
 * are <i>unsorted</i>), values will appear in the order they appear in the
 * underlying elements array. For example,
 *
 * <pre>pv.nest(yields)
 *     .key(function(d) d.year)
 *     .key(function(d) d.variety)
 *     .sortValues(function(a, b) a.yield - b.yield)
 *     .entries()</pre>
 *
 * groups yield data by year, then variety, and sorts the values for each
 * variety group by yield.
 *
 * <p>Value sort order, unlike keys, applies to both {@link #entries} and
 * {@link #map}. It has no effect on {@link #rollup}.
 *
 * @param {function} [order] an optional comparator function.
 * @returns {pv.Nest} this.
 */
pv.Nest.prototype.sortValues = function(order) {
  this.order = order || pv.naturalOrder;
  return this;
};

/**
 * Returns a hierarchical map of values. Each key adds one level to the
 * hierarchy. With only a single key, the returned map will have a key for each
 * distinct value of the key function; the correspond value with be an array of
 * elements with that key value. If a second key is added, this will be a nested
 * map. For example:
 *
 * <pre>pv.nest(yields)
 *     .key(function(d) d.variety)
 *     .key(function(d) d.site)
 *     .map()</pre>
 *
 * returns a map <tt>m</tt> such that <tt>m[variety][site]</tt> is an array, a subset of
 * <tt>yields</tt>, with each element having the given variety and site.
 *
 * @returns a hierarchical map of values.
 */
pv.Nest.prototype.map = function() {
  var map = {}, values = [];

  /* Build the map. */
  for (var i, j = 0; j < this.array.length; j++) {
    var x = this.array[j];
    var m = map;
    for (i = 0; i < this.keys.length - 1; i++) {
      var k = this.keys[i](x);
      if (!m[k]) m[k] = {};
      m = m[k];
    }
    k = this.keys[i](x);
    if (!m[k]) {
      var a = [];
      values.push(a);
      m[k] = a;
    }
    m[k].push(x);
  }

  /* Sort each leaf array. */
  if (this.order) {
    for (var i = 0; i < values.length; i++) {
      values[i].sort(this.order);
    }
  }

  return map;
};

/**
 * Returns a hierarchical nested array. This method is similar to
 * {@link pv.entries}, but works recursively on the entire hierarchy. Rather
 * than returning a map like {@link #map}, this method returns a nested
 * array. Each element of the array has a <tt>key</tt> and <tt>values</tt>
 * field. For leaf nodes, the <tt>values</tt> array will be a subset of the
 * underlying elements array; for non-leaf nodes, the <tt>values</tt> array will
 * contain more key-values pairs.
 *
 * <p>For an example usage, see the {@link Nest} constructor.
 *
 * @returns a hierarchical nested array.
 */
pv.Nest.prototype.entries = function() {

  /** Recursively extracts the entries for the given map. */
  function entries(map) {
    var array = [];
    for (var k in map) {
      var v = map[k];
      array.push({ key: k, values: (v instanceof Array) ? v : entries(v) });
    };
    return array;
  }

  /** Recursively sorts the values for the given key-values array. */
  function sort(array, i) {
    var o = this.keys[i].order;
    if (o) array.sort(function(a, b) { return o(a.key, b.key); });
    if (++i < this.keys.length) {
      for (var j = 0; j < array.length; j++) {
        sort.call(this, array[j].values, i);
      }
    }
    return array;
  }

  return sort.call(this, entries(this.map()), 0);
};

/**
 * Returns a rollup map. The behavior of this method is the same as
 * {@link #map}, except that the leaf values are replaced with the return value
 * of the specified rollup function <tt>f</tt>. For example,
 *
 * <pre>pv.nest(yields)
 *      .key(function(d) d.site)
 *      .rollup(function(v) pv.median(v, function(d) d.yield))</pre>
 *
 * first groups yield data by site, and then returns a map from site to median
 * yield for the given site.
 *
 * @see #map
 * @param {function} f a rollup function.
 * @returns a hierarchical map, with the leaf values computed by <tt>f</tt>.
 */
pv.Nest.prototype.rollup = function(f) {

  /** Recursively descends to the leaf nodes (arrays) and does rollup. */
  function rollup(map) {
    for (var key in map) {
      var value = map[key];
      if (value instanceof Array) {
        map[key] = f(value);
      } else {
        rollup(value);
      }
    }
    return map;
  }

  return rollup(this.map());
};
/**
 * Returns a {@link pv.Flatten} operator for the specified map. This is a
 * convenience factory method, equivalent to <tt>new pv.Flatten(map)</tt>.
 *
 * @see pv.Flatten
 * @param map a map to flatten.
 * @returns {pv.Flatten} a flatten operator for the specified map.
 */
pv.flatten = function(map) {
  return new pv.Flatten(map);
};

/**
 * Constructs a flatten operator for the specified map. This constructor should
 * not be invoked directly; use {@link pv.flatten} instead.
 *
 * @class Represents a flatten operator for the specified array. Flattening
 * allows hierarchical maps to be flattened into an array. The levels in the
 * input tree are specified by <i>key</i> functions.
 *
 * <p>For example, consider the following hierarchical data structure of Barley
 * yields, from various sites in Minnesota during 1931-2:
 *
 * <pre>{ 1931: {
 *     Manchuria: {
 *       "University Farm": 27.00,
 *       "Waseca": 48.87,
 *       "Morris": 27.43,
 *       ... },
 *     Glabron: {
 *       "University Farm": 43.07,
 *       "Waseca": 55.20,
 *       ... } },
 *   1932: {
 *     ... } }</pre>
 *
 * To facilitate visualization, it may be useful to flatten the tree into a
 * tabular array:
 *
 * <pre>var array = pv.flatten(yields)
 *     .key("year")
 *     .key("variety")
 *     .key("site")
 *     .key("yield")
 *     .array();</pre>
 *
 * This returns an array of object elements. Each element in the array has
 * attributes corresponding to this flatten operator's keys:
 *
 * <pre>{ site: "University Farm", variety: "Manchuria", year: 1931, yield: 27 },
 * { site: "Waseca", variety: "Manchuria", year: 1931, yield: 48.87 },
 * { site: "Morris", variety: "Manchuria", year: 1931, yield: 27.43 },
 * { site: "University Farm", variety: "Glabron", year: 1931, yield: 43.07 },
 * { site: "Waseca", variety: "Glabron", year: 1931, yield: 55.2 }, ...</pre>
 *
 * <p>The flatten operator is roughly the inverse of the {@link pv.Nest} and
 * {@link pv.Tree} operators.
 *
 * @param map a map to flatten.
 */
pv.Flatten = function(map) {
  this.map = map;
  this.keys = [];
};

/**
 * Flattens using the specified key function. Multiple keys may be added to the
 * flatten; the tiers of the underlying tree must correspond to the specified
 * keys, in order. The order of the returned array is undefined; however, you
 * can easily sort it.
 *
 * @param {string} key the key name.
 * @param {function} [f] an optional value map function.
 * @returns {pv.Nest} this.
 */
pv.Flatten.prototype.key = function(key, f) {
  this.keys.push({name: key, value: f});
  return this;
};

/**
 * Returns the flattened array. Each entry in the array is an object; each
 * object has attributes corresponding to this flatten operator's keys.
 *
 * @returns an array of elements from the flattened map.
 */
pv.Flatten.prototype.array = function() {
  var entries = [], stack = [], keys = this.keys;

  /* Recursively visits the specified value. */
  function visit(value, i) {
    if (i < keys.length - 1) {
      for (var key in value) {
        stack.push(key);
        visit(value[key], i + 1);
        stack.pop();
      }
    } else {
      entries.push(stack.concat(value));
    }
  }

  visit(this.map, 0);
  return entries.map(function(stack) {
      var m = {};
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i], v = stack[i];
        m[k.name] = k.value ? k.value.call(null, v) : v;
      }
      return m;
    });
};
/**
 * Returns a {@link pv.Vector} for the specified <i>x</i> and <i>y</i>
 * coordinate. This is a convenience factory method, equivalent to <tt>new
 * pv.Vector(x, y)</tt>.
 *
 * @see pv.Vector
 * @param {number} x the <i>x</i> coordinate.
 * @param {number} y the <i>y</i> coordinate.
 * @returns {pv.Vector} a vector for the specified coordinates.
 */
pv.vector = function(x, y) {
  return new pv.Vector(x, y);
};

/**
 * Constructs a {@link pv.Vector} for the specified <i>x</i> and <i>y</i>
 * coordinate. This constructor should not be invoked directly; use
 * {@link pv.vector} instead.
 *
 * @class Represents a two-dimensional vector; a 2-tuple <i>&#x27e8;x,
 * y&#x27e9;</i>.
 *
 * @param {number} x the <i>x</i> coordinate.
 * @param {number} y the <i>y</i> coordinate.
 */
pv.Vector = function(x, y) {
  this.x = x;
  this.y = y;
};

/**
 * Returns a vector perpendicular to this vector: <i>&#x27e8;-y, x&#x27e9;</i>.
 *
 * @returns {pv.Vector} a perpendicular vector.
 */
pv.Vector.prototype.perp = function() {
  return new pv.Vector(-this.y, this.x);
};

/**
 * Returns a normalized copy of this vector: a vector with the same direction,
 * but unit length. If this vector has zero length this method returns a copy of
 * this vector.
 *
 * @returns {pv.Vector} a unit vector.
 */
pv.Vector.prototype.norm = function() {
  var l = this.length();
  return this.times(l ? (1 / l) : 1);
};

/**
 * Returns the magnitude of this vector, defined as <i>sqrt(x * x + y * y)</i>.
 *
 * @returns {number} a length.
 */
pv.Vector.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * Returns a scaled copy of this vector: <i>&#x27e8;x * k, y * k&#x27e9;</i>.
 * To perform the equivalent divide operation, use <i>1 / k</i>.
 *
 * @param {number} k the scale factor.
 * @returns {pv.Vector} a scaled vector.
 */
pv.Vector.prototype.times = function(k) {
  return new pv.Vector(this.x * k, this.y * k);
};

/**
 * Returns this vector plus the vector <i>v</i>: <i>&#x27e8;x + v.x, y +
 * v.y&#x27e9;</i>. If only one argument is specified, it is interpreted as the
 * vector <i>v</i>.
 *
 * @param {number} x the <i>x</i> coordinate to add.
 * @param {number} y the <i>y</i> coordinate to add.
 * @returns {pv.Vector} a new vector.
 */
pv.Vector.prototype.plus = function(x, y) {
  return (arguments.length == 1)
      ? new pv.Vector(this.x + x.x, this.y + x.y)
      : new pv.Vector(this.x + x, this.y + y);
};

/**
 * Returns this vector minus the vector <i>v</i>: <i>&#x27e8;x - v.x, y -
 * v.y&#x27e9;</i>. If only one argument is specified, it is interpreted as the
 * vector <i>v</i>.
 *
 * @param {number} x the <i>x</i> coordinate to subtract.
 * @param {number} y the <i>y</i> coordinate to subtract.
 * @returns {pv.Vector} a new vector.
 */
pv.Vector.prototype.minus = function(x, y) {
  return (arguments.length == 1)
      ? new pv.Vector(this.x - x.x, this.y - x.y)
      : new pv.Vector(this.x - x, this.y - y);
};

/**
 * Returns the dot product of this vector and the vector <i>v</i>: <i>x * v.x +
 * y * v.y</i>. If only one argument is specified, it is interpreted as the
 * vector <i>v</i>.
 *
 * @param {number} x the <i>x</i> coordinate to dot.
 * @param {number} y the <i>y</i> coordinate to dot.
 * @returns {number} a dot product.
 */
pv.Vector.prototype.dot = function(x, y) {
  return (arguments.length == 1)
      ? this.x * x.x + this.y * x.y
      : this.x * x + this.y * y;
};
pv.Transform = function() {};
pv.Transform.prototype = {k: 1, x: 0, y: 0};

pv.Transform.identity = new pv.Transform();

// k 0 x   1 0 a   k 0 ka+x
// 0 k y * 0 1 b = 0 k kb+y
// 0 0 1   0 0 1   0 0 1

pv.Transform.prototype.translate = function(x, y) {
  var v = new pv.Transform();
  v.k = this.k;
  v.x = this.k * x + this.x;
  v.y = this.k * y + this.y;
  return v;
};

// k 0 x   d 0 0   kd  0 x
// 0 k y * 0 d 0 =  0 kd y
// 0 0 1   0 0 1    0  0 1

pv.Transform.prototype.scale = function(k) {
  var v = new pv.Transform();
  v.k = this.k * k;
  v.x = this.x;
  v.y = this.y;
  return v;
};

pv.Transform.prototype.invert = function() {
  var v = new pv.Transform(), k = 1 / this.k;
  v.k = k;
  v.x = -this.x * k;
  v.y = -this.y * k;
  return v;
};

// k 0 x   d 0 a   kd  0 ka+x
// 0 k y * 0 d b =  0 kd kb+y
// 0 0 1   0 0 1    0  0    1

pv.Transform.prototype.times = function(m) {
  var v = new pv.Transform();
  v.k = this.k * m.k;
  v.x = this.k * m.x + this.x;
  v.y = this.k * m.y + this.y;
  return v;
};
// TODO code-sharing between scales

/**
 * @ignore
 * @class
 */
pv.Scale = function() {};

/**
 * @private Returns a function that interpolators from the start value to the
 * end value, given a parameter <i>t</i> in [0, 1].
 *
 * @param start the start value.
 * @param end the end value.
 */
pv.Scale.interpolator = function(start, end) {
  if (typeof start == "number") {
    return function(t) {
      return t * (end - start) + start;
    };
  }

  /* For now, assume color. */
  start = pv.color(start).rgb();
  end = pv.color(end).rgb();
  return function(t) {
    var a = start.a * (1 - t) + end.a * t;
    if (a < 1e-5) a = 0; // avoid scientific notation
    return (start.a == 0) ? pv.rgb(end.r, end.g, end.b, a)
        : ((end.a == 0) ? pv.rgb(start.r, start.g, start.b, a)
        : pv.rgb(
            Math.round(start.r * (1 - t) + end.r * t),
            Math.round(start.g * (1 - t) + end.g * t),
            Math.round(start.b * (1 - t) + end.b * t), a));
  };
};
/**
 * Returns a linear scale for the specified domain. The arguments to this
 * constructor are optional, and equivalent to calling {@link #domain}.
 *
 * @class Represents a linear scale. <style
 * type="text/css">sub{line-height:0}</style> <img src="../linear.png"
 * width="180" height="175" align="right"> Most commonly, a linear scale
 * represents a 1-dimensional linear transformation from a numeric domain of
 * input data [<i>d<sub>0</sub></i>, <i>d<sub>1</sub></i>] to a numeric range of
 * pixels [<i>r<sub>0</sub></i>, <i>r<sub>1</sub></i>]. The equation for such a
 * scale is:
 *
 * <blockquote><i>f(x) = (x - d<sub>0</sub>) / (d<sub>1</sub> - d<sub>0</sub>) *
 * (r<sub>1</sub> - r<sub>0</sub>) + r<sub>0</sub></i></blockquote>
 *
 * For example, a linear scale from the domain [0, 100] to range [0, 640]:
 *
 * <blockquote><i>f(x) = (x - 0) / (100 - 0) * (640 - 0) + 0</i><br>
 * <i>f(x) = x / 100 * 640</i><br>
 * <i>f(x) = x * 6.4</i><br>
 * </blockquote>
 *
 * Thus, saying
 *
 * <pre>.height(function(d) d * 6.4)</pre>
 *
 * is identical to
 *
 * <pre>.height(pv.Scale.linear(0, 100).range(0, 640))</pre>
 *
 * As you can see, scales do not always make code smaller, but they should make
 * code more explicit and easier to maintain. In addition to readability, scales
 * offer several useful features:
 *
 * <p>1. The range can be expressed in colors, rather than pixels. Changing the
 * example above to
 *
 * <pre>.fillStyle(pv.Scale.linear(0, 100).range("red", "green"))</pre>
 *
 * will cause it to fill the marks "red" on an input value of 0, "green" on an
 * input value of 100, and some color in-between for intermediate values.
 *
 * <p>2. The domain and range can be subdivided for a "poly-linear"
 * transformation. For example, you may want a diverging color scale that is
 * increasingly red for negative values, and increasingly green for positive
 * values:
 *
 * <pre>.fillStyle(pv.Scale.linear(-1, 0, 1).range("red", "white", "green"))</pre>
 *
 * The domain can be specified as a series of <i>n</i> monotonically-increasing
 * values; the range must also be specified as <i>n</i> values, resulting in
 * <i>n - 1</i> contiguous linear scales.
 *
 * <p>3. Linear scales can be inverted for interaction. The {@link #invert}
 * method takes a value in the output range, and returns the corresponding value
 * in the input domain. This is frequently used to convert the mouse location
 * (see {@link pv.Mark#mouse}) to a value in the input domain. Note that
 * inversion is only supported for numeric ranges, and not colors.
 *
 * <p>4. A scale can be queried for reasonable "tick" values. The {@link #ticks}
 * method provides a convenient way to get a series of evenly-spaced rounded
 * values in the input domain. Frequently these are used in conjunction with
 * {@link pv.Rule} to display tick marks or grid lines.
 *
 * <p>5. A scale can be "niced" to extend the domain to suitable rounded
 * numbers. If the minimum and maximum of the domain are messy because they are
 * derived from data, you can use {@link #nice} to round these values down and
 * up to even numbers.
 *
 * @param {number...} domain... domain values.
 * @returns {pv.Scale.linear} a linear scale.
 */
pv.Scale.linear = function() {
  var d = [0, 1], r = [0, 1], i = [pv.identity], type = Number;

  /** @private */
  function newDate(x) {
    return new Date(x);
  }

  /** @private */
  function scale(x) {
    var j = pv.search(d, x);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    return i[j]((x - d[j]) / (d[j + 1] - d[j]));
  }

  /**
   * Sets or gets the input domain. This method can be invoked several ways:
   *
   * <p>1. <tt>domain(min, ..., max)</tt>
   *
   * <p>Specifying the domain as a series of numbers is the most explicit and
   * recommended approach. Most commonly, two numbers are specified: the minimum
   * and maximum value. However, for a diverging scale, or other subdivided
   * poly-linear scales, multiple values can be specified. Values can be derived
   * from data using {@link pv.min} and {@link pv.max}. For example:
   *
   * <pre>.domain(0, pv.max(array))</pre>
   *
   * An alternative method for deriving minimum and maximum values from data
   * follows.
   *
   * <p>2. <tt>domain(array, minf, maxf)</tt>
   *
   * <p>When both the minimum and maximum value are derived from data, the
   * arguments to the <tt>domain</tt> method can be specified as the array of
   * data, followed by zero, one or two accessor functions. For example, if the
   * array of data is just an array of numbers:
   *
   * <pre>.domain(array)</pre>
   *
   * On the other hand, if the array elements are objects representing stock
   * values per day, and the domain should consider the stock's daily low and
   * daily high:
   *
   * <pre>.domain(array, function(d) d.low, function(d) d.high)</pre>
   *
   * The first method of setting the domain is preferred because it is more
   * explicit; setting the domain using this second method should be used only
   * if brevity is required.
   *
   * <p>3. <tt>domain()</tt>
   *
   * <p>Invoking the <tt>domain</tt> method with no arguments returns the
   * current domain as an array of numbers.
   *
   * @function
   * @name pv.Scale.linear.prototype.domain
   * @param {number...} domain... domain values.
   * @returns {pv.Scale.linear} <tt>this</tt>, or the current domain.
   */
  scale.domain = function(array, min, max) {
    if (arguments.length) {
      var o; // the object we use to infer the domain type
      if (array instanceof Array) {
        if (arguments.length < 2) min = pv.identity;
        if (arguments.length < 3) max = min;
        o = array.length && min(array[0]);
        d = [pv.min(array, min), pv.max(array, max)];
      } else {
        o = array;
        d = Array.prototype.slice.call(arguments).map(Number);
      }
      type = (o instanceof Date) ? newDate : Number;
      return this;
    }
    return d.map(type);
  };

  /**
   * Sets or gets the output range. This method can be invoked several ways:
   *
   * <p>1. <tt>range(min, ..., max)</tt>
   *
   * <p>The range may be specified as a series of numbers or colors. Most
   * commonly, two numbers are specified: the minimum and maximum pixel values.
   * For a color scale, values may be specified as {@link pv.Color}s or
   * equivalent strings. For a diverging scale, or other subdivided poly-linear
   * scales, multiple values can be specified. For example:
   *
   * <pre>.range("red", "white", "green")</pre>
   *
   * <p>Currently, only numbers and colors are supported as range values. The
   * number of range values must exactly match the number of domain values, or
   * the behavior of the scale is undefined.
   *
   * <p>2. <tt>range()</tt>
   *
   * <p>Invoking the <tt>range</tt> method with no arguments returns the current
   * range as an array of numbers or colors.
   *
   * @function
   * @name pv.Scale.linear.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Scale.linear} <tt>this</tt>, or the current range.
   */
  scale.range = function() {
    if (arguments.length) {
      r = Array.prototype.slice.call(arguments);
      i = [];
      for (var j = 0; j < r.length - 1; j++) {
        i.push(pv.Scale.interpolator(r[j], r[j + 1]));
      }
      return this;
    }
    return r;
  };

  /**
   * Inverts the specified value in the output range, returning the
   * corresponding value in the input domain. This is frequently used to convert
   * the mouse location (see {@link pv.Mark#mouse}) to a value in the input
   * domain. Inversion is only supported for numeric ranges, and not colors.
   *
   * <p>Note that this method does not do any rounding or bounds checking. If
   * the input domain is discrete (e.g., an array index), the returned value
   * should be rounded. If the specified <tt>y</tt> value is outside the range,
   * the returned value may be equivalently outside the input domain.
   *
   * @function
   * @name pv.Scale.linear.prototype.invert
   * @param {number} y a value in the output range (a pixel location).
   * @returns {number} a value in the input domain.
   */
  scale.invert = function(y) {
    var j = pv.search(r, y);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    return type((y - r[j]) / (r[j + 1] - r[j]) * (d[j + 1] - d[j]) + d[j]);
  };

  /**
   * Returns an array of evenly-spaced, suitably-rounded values in the input
   * domain. This method attempts to return between 5 and 10 tick values. These
   * values are frequently used in conjunction with {@link pv.Rule} to display
   * tick marks or grid lines.
   *
   * @function
   * @name pv.Scale.linear.prototype.ticks
   * @returns {number[]} an array input domain values to use as ticks.
   */
  scale.ticks = function() {
    var min = d[0],
        max = d[d.length - 1],
        span = max - min;

    /* Special case: dates. */
    if (type == newDate) {
      /* Floor the date d given the precision p. */
      function floor(d, p) {
        switch (p) {
          case 31536e6: d.setMonth(0);
          case 2592e6: d.setDate(1);
          case 6048e5: if (p == 6048e5) d.setDate(d.getDate() - d.getDay());
          case 864e5: d.setHours(0);
          case 36e5: d.setMinutes(0);
          case 6e4: d.setSeconds(0);
          case 1e3: d.setMilliseconds(0);
        }
      }

      var precision, format, increment, step = 1;
      if (span >= 2 * 31536e6) {
        precision = 31536e6;
        format = "%Y";
        increment = function(d) { d.setFullYear(d.getFullYear() + step); };
      } else if (span >= 2 * 2592e6) {
        precision = 2592e6;
        format = "%m/%Y";
        increment = function(d) { d.setMonth(d.getMonth() + step); };
      } else if (span >= 2 * 6048e5) {
        precision = 6048e5;
        format = "%m/%d";
        increment = function(d) { d.setDate(d.getDate() + 7 * step); };
      } else if (span >= 2 * 864e5) {
        precision = 864e5;
        format = "%m/%d";
        increment = function(d) { d.setDate(d.getDate() + step); };
      } else if (span >= 2 * 36e5) {
        precision = 36e5;
        format = "%I:%M %p";
        increment = function(d) { d.setHours(d.getHours() + step); };
      } else if (span >= 3 * 6e4) {
        precision = 6e4;
        format = "%I:%M %p";
        increment = function(d) { d.setMinutes(d.getMinutes() + step); };
      } else if (span >= 3 * 1e3) {
        precision = 1e3;
        format = "%I:%M:%S";
        increment = function(d) { d.setSeconds(d.getSeconds() + step); };
      } else {
        precision = 1;
        format = "%S.%Qs";
        increment = function(d) { d.setTime(d.getTime() + step); };
      }

      var date = new Date(min), dates = [];
      floor(date, precision);

      /* If we'd generate too many ticks, skip some!. */
      var n = span / precision;
      if (n > 10) {
        switch (precision) {
          case 36e5: {
            step = (n > 20) ? 6 : 3;
            date.setHours(Math.floor(date.getHours() / step) * step);
            break;
          }
          case 2592e6: {
            step = 3; // seasons
            date.setMonth(Math.floor(date.getMonth() / step) * step);
            break;
          }
          case 6e4: {
            step = (n > 30) ? 15 : ((n > 15) ? 10 : 5);
            date.setMinutes(Math.floor(date.getMinutes() / step) * step);
            break;
          }
          case 1e3: {
            step = (n > 90) ? 15 : ((n > 60) ? 10 : 5);
            date.setSeconds(Math.floor(date.getSeconds() / step) * step);
            break;
          }
          case 1: {
            step = (n > 1000) ? 250 : ((n > 200) ? 100 : ((n > 100) ? 50 : ((n > 50) ? 25 : 5)));
            date.setMilliseconds(Math.floor(date.getMilliseconds() / step) * step);
            break;
          }
          default: {
            step = pv.logCeil(n / 15, 10);
            if (n / step < 2) step /= 2;
            else if (n / step < 5) step /= 2;
            date.setFullYear(Math.floor(date.getFullYear() / step) * step);
            break;
          }
        }
      }

      scale.tickFormat = pv.Format.date(format);

      while (true) {
        increment(date);
        if (date > max) break;
        dates.push(new Date(date));
      }
      return dates;
    }

    /* Normal case: numbers. */
    var step = pv.logCeil(span / 15, 10);
    if (span / step < 2) step /= 5;
    else if (span / step < 5) step /= 2;
    var start = Math.ceil(min / step) * step,
        end = Math.floor(max / step) * step,
        precision = Math.max(0, -Math.floor(pv.log(step, 10) + .01));
    scale.tickFormat = function(x) { return x.toFixed(precision); };
    return pv.range(start, end + step, step);
  };

  /**
   * Formats the specified tick value using the appropriate precision, based on
   * the step interval between tick marks. This method is only defined after
   * {@link #ticks} has been called, since tick generation determines the
   * formatting.
   *
   * @function
   * @name pv.Scale.linear.prototype.tickFormat
   * @param {number} t a tick value.
   * @returns {string} a formatted tick value.
   */

  /**
   * "Nices" this scale, extending the bounds of the input domain to
   * evenly-rounded values. Nicing is useful if the domain is computed
   * dynamically from data, and may be irregular. For example, given a domain of
   * [0.20147987687960267, 0.996679553296417], a call to <tt>nice()</tt> might
   * extend the domain to [0.2, 1].
   *
   * <p>This method must be invoked each time after setting the domain.
   *
   * @function
   * @name pv.Scale.linear.prototype.nice
   * @returns {pv.Scale.linear} <tt>this</tt>.
   */
  scale.nice = function() {
    var min = d[0],
        max = d[d.length - 1],
        step = Math.pow(10, Math.round(Math.log(max - min) / Math.log(10)) - 1);
    d = [Math.floor(min / step) * step, Math.ceil(max / step) * step];
    return this;
  };

  /**
   * Returns a view of this scale by the specified accessor function <tt>f</tt>.
   * Given a scale <tt>y</tt>, <tt>y.by(function(d) d.foo)</tt> is equivalent to
   * <tt>function(d) y(d.foo)</tt>.
   *
   * <p>This method is provided for convenience, such that scales can be
   * succinctly defined inline. For example, given an array of data elements
   * that have a <tt>score</tt> attribute with the domain [0, 1], the height
   * property could be specified as:
   *
   * <pre>.height(pv.Scale.linear().range(0, 480).by(function(d) d.score))</pre>
   *
   * This is equivalent to:
   *
   * <pre>.height(function(d) d.score * 480)</pre>
   *
   * This method should be used judiciously; it is typically more clear to
   * invoke the scale directly, passing in the value to be scaled.
   *
   * @function
   * @name pv.Scale.linear.prototype.by
   * @param {function} f an accessor function.
   * @returns {pv.Scale.linear} a view of this scale by the specified accessor
   * function.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
/**
 * Returns a log scale for the specified domain. The arguments to this
 * constructor are optional, and equivalent to calling {@link #domain}.
 *
 * @class Represents a log scale. <style
 * type="text/css">sub{line-height:0}</style> <img src="../log.png"
 * width="190" height="175" align="right"> Most commonly, a log scale represents
 * a 1-dimensional log transformation from a numeric domain of input data
 * [<i>d<sub>0</sub></i>, <i>d<sub>1</sub></i>] to a numeric range of pixels
 * [<i>r<sub>0</sub></i>, <i>r<sub>1</sub></i>]. The equation for such a scale
 * is:
 *
 * <blockquote><i>f(x) = (log(x) - log(d<sub>0</sub>)) / (log(d<sub>1</sub>) -
 * log(d<sub>0</sub>)) * (r<sub>1</sub> - r<sub>0</sub>) +
 * r<sub>0</sub></i></blockquote>
 *
 * where <i>log(x)</i> represents the zero-symmetric logarthim of <i>x</i> using
 * the scale's associated base (default: 10, see {@link pv.logSymmetric}). For
 * example, a log scale from the domain [1, 100] to range [0, 640]:
 *
 * <blockquote><i>f(x) = (log(x) - log(1)) / (log(100) - log(1)) * (640 - 0) + 0</i><br>
 * <i>f(x) = log(x) / 2 * 640</i><br>
 * <i>f(x) = log(x) * 320</i><br>
 * </blockquote>
 *
 * Thus, saying
 *
 * <pre>.height(function(d) Math.log(d) * 138.974)</pre>
 *
 * is equivalent to
 *
 * <pre>.height(pv.Scale.log(1, 100).range(0, 640))</pre>
 *
 * As you can see, scales do not always make code smaller, but they should make
 * code more explicit and easier to maintain. In addition to readability, scales
 * offer several useful features:
 *
 * <p>1. The range can be expressed in colors, rather than pixels. Changing the
 * example above to
 *
 * <pre>.fillStyle(pv.Scale.log(1, 100).range("red", "green"))</pre>
 *
 * will cause it to fill the marks "red" on an input value of 1, "green" on an
 * input value of 100, and some color in-between for intermediate values.
 *
 * <p>2. The domain and range can be subdivided for a "poly-log"
 * transformation. For example, you may want a diverging color scale that is
 * increasingly red for small values, and increasingly green for large values:
 *
 * <pre>.fillStyle(pv.Scale.log(1, 10, 100).range("red", "white", "green"))</pre>
 *
 * The domain can be specified as a series of <i>n</i> monotonically-increasing
 * values; the range must also be specified as <i>n</i> values, resulting in
 * <i>n - 1</i> contiguous log scales.
 *
 * <p>3. Log scales can be inverted for interaction. The {@link #invert} method
 * takes a value in the output range, and returns the corresponding value in the
 * input domain. This is frequently used to convert the mouse location (see
 * {@link pv.Mark#mouse}) to a value in the input domain. Note that inversion is
 * only supported for numeric ranges, and not colors.
 *
 * <p>4. A scale can be queried for reasonable "tick" values. The {@link #ticks}
 * method provides a convenient way to get a series of evenly-spaced rounded
 * values in the input domain. Frequently these are used in conjunction with
 * {@link pv.Rule} to display tick marks or grid lines.
 *
 * <p>5. A scale can be "niced" to extend the domain to suitable rounded
 * numbers. If the minimum and maximum of the domain are messy because they are
 * derived from data, you can use {@link #nice} to round these values down and
 * up to even numbers.
 *
 * @param {number...} domain... domain values.
 * @returns {pv.Scale.log} a log scale.
 */
pv.Scale.log = function() {
  var d = [1, 10], l = [0, 1], b = 10, r = [0, 1], i = [pv.identity];

  /** @private */
  function scale(x) {
    var j = pv.search(d, x);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    return i[j]((log(x) - l[j]) / (l[j + 1] - l[j]));
  }

  /** @private */
  function log(x) {
    return pv.logSymmetric(x, b);
  }

  /**
   * Sets or gets the input domain. This method can be invoked several ways:
   *
   * <p>1. <tt>domain(min, ..., max)</tt>
   *
   * <p>Specifying the domain as a series of numbers is the most explicit and
   * recommended approach. Most commonly, two numbers are specified: the minimum
   * and maximum value. However, for a diverging scale, or other subdivided
   * poly-log scales, multiple values can be specified. Values can be derived
   * from data using {@link pv.min} and {@link pv.max}. For example:
   *
   * <pre>.domain(1, pv.max(array))</pre>
   *
   * An alternative method for deriving minimum and maximum values from data
   * follows.
   *
   * <p>2. <tt>domain(array, minf, maxf)</tt>
   *
   * <p>When both the minimum and maximum value are derived from data, the
   * arguments to the <tt>domain</tt> method can be specified as the array of
   * data, followed by zero, one or two accessor functions. For example, if the
   * array of data is just an array of numbers:
   *
   * <pre>.domain(array)</pre>
   *
   * On the other hand, if the array elements are objects representing stock
   * values per day, and the domain should consider the stock's daily low and
   * daily high:
   *
   * <pre>.domain(array, function(d) d.low, function(d) d.high)</pre>
   *
   * The first method of setting the domain is preferred because it is more
   * explicit; setting the domain using this second method should be used only
   * if brevity is required.
   *
   * <p>3. <tt>domain()</tt>
   *
   * <p>Invoking the <tt>domain</tt> method with no arguments returns the
   * current domain as an array of numbers.
   *
   * @function
   * @name pv.Scale.log.prototype.domain
   * @param {number...} domain... domain values.
   * @returns {pv.Scale.log} <tt>this</tt>, or the current domain.
   */
  scale.domain = function(array, min, max) {
    if (arguments.length) {
      if (array instanceof Array) {
        if (arguments.length < 2) min = pv.identity;
        if (arguments.length < 3) max = min;
        d = [pv.min(array, min), pv.max(array, max)];
      } else {
        d = Array.prototype.slice.call(arguments);
      }
      l = d.map(log);
      return this;
    }
    return d;
  };

  /**
   * @function
   * @name pv.Scale.log.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Scale.log} <tt>this</tt>.
   */
  scale.range = function() {
    if (arguments.length) {
      r = Array.prototype.slice.call(arguments);
      i = [];
      for (var j = 0; j < r.length - 1; j++) {
        i.push(pv.Scale.interpolator(r[j], r[j + 1]));
      }
      return this;
    }
    return r;
  };

  /**
   * Sets or gets the output range. This method can be invoked several ways:
   *
   * <p>1. <tt>range(min, ..., max)</tt>
   *
   * <p>The range may be specified as a series of numbers or colors. Most
   * commonly, two numbers are specified: the minimum and maximum pixel values.
   * For a color scale, values may be specified as {@link pv.Color}s or
   * equivalent strings. For a diverging scale, or other subdivided poly-log
   * scales, multiple values can be specified. For example:
   *
   * <pre>.range("red", "white", "green")</pre>
   *
   * <p>Currently, only numbers and colors are supported as range values. The
   * number of range values must exactly match the number of domain values, or
   * the behavior of the scale is undefined.
   *
   * <p>2. <tt>range()</tt>
   *
   * <p>Invoking the <tt>range</tt> method with no arguments returns the current
   * range as an array of numbers or colors.
   *
   * @function
   * @name pv.Scale.log.prototype.invert
   * @param {...} range... range values.
   * @returns {pv.Scale.log} <tt>this</tt>, or the current range.
   */
  scale.invert = function(y) {
    var j = pv.search(r, y);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    var t = l[j] + (y - r[j]) / (r[j + 1] - r[j]) * (l[j + 1] - l[j]);
    return (d[j] < 0) ? -Math.pow(b, -t) : Math.pow(b, t);
  };

  /**
   * Returns an array of evenly-spaced, suitably-rounded values in the input
   * domain. These values are frequently used in conjunction with {@link
   * pv.Rule} to display tick marks or grid lines.
   *
   * @function
   * @name pv.Scale.log.prototype.ticks
   * @returns {number[]} an array input domain values to use as ticks.
   */
  scale.ticks = function() {
    // TODO: support multiple domains
    var start = Math.floor(l[0]),
        end = Math.ceil(l[1]),
        ticks = [];
    for (var i = start; i < end; i++) {
      var x = Math.pow(b, i);
      if (d[0] < 0) x = -x;
      for (var j = 1; j < b; j++) {
        ticks.push(x * j);
      }
    }
    ticks.push(Math.pow(b, end));
    if (ticks[0] < d[0]) ticks.shift();
    if (ticks[ticks.length - 1] > d[1]) ticks.pop();
    return ticks;
  };

  /**
   * Formats the specified tick value using the appropriate precision, assuming
   * base 10.
   *
   * @function
   * @name pv.Scale.log.prototype.tickFormat
   * @param {number} t a tick value.
   * @returns {string} a formatted tick value.
   */
  scale.tickFormat = function(t) {
    return t.toPrecision(1);
  };

  /**
   * "Nices" this scale, extending the bounds of the input domain to
   * evenly-rounded values. This method uses {@link pv.logFloor} and {@link
   * pv.logCeil}. Nicing is useful if the domain is computed dynamically from
   * data, and may be irregular. For example, given a domain of
   * [0.20147987687960267, 0.996679553296417], a call to <tt>nice()</tt> might
   * extend the domain to [0.1, 1].
   *
   * <p>This method must be invoked each time after setting the domain (and
   * base).
   *
   * @function
   * @name pv.Scale.log.prototype.nice
   * @returns {pv.Scale.log} <tt>this</tt>.
   */
  scale.nice = function() {
    // TODO: support multiple domains
    d = [pv.logFloor(d[0], b), pv.logCeil(d[1], b)];
    l = d.map(log);
    return this;
  };

  /**
   * Sets or gets the logarithm base. Defaults to 10.
   *
   * @function
   * @name pv.Scale.log.prototype.base
   * @param {number} [v] the new base.
   * @returns {pv.Scale.log} <tt>this</tt>, or the current base.
   */
  scale.base = function(v) {
    if (arguments.length) {
      b = v;
      l = d.map(log);
      return this;
    }
    return b;
  };

  /**
   * Returns a view of this scale by the specified accessor function <tt>f</tt>.
   * Given a scale <tt>y</tt>, <tt>y.by(function(d) d.foo)</tt> is equivalent to
   * <tt>function(d) y(d.foo)</tt>.
   *
   * <p>This method is provided for convenience, such that scales can be
   * succinctly defined inline. For example, given an array of data elements
   * that have a <tt>score</tt> attribute with the domain [0, 1], the height
   * property could be specified as:
   *
   * <pre>.height(pv.Scale.log().range(0, 480).by(function(d) d.score))</pre>
   *
   * This is equivalent to:
   *
   * <pre>.height(function(d) d.score * 480)</pre>
   *
   * This method should be used judiciously; it is typically more clear to
   * invoke the scale directly, passing in the value to be scaled.
   *
   * @function
   * @name pv.Scale.log.prototype.by
   * @param {function} f an accessor function.
   * @returns {pv.Scale.log} a view of this scale by the specified accessor
   * function.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
/**
 * Returns an ordinal scale for the specified domain. The arguments to this
 * constructor are optional, and equivalent to calling {@link #domain}.
 *
 * @class Represents an ordinal scale. <style
 * type="text/css">sub{line-height:0}</style> An ordinal scale represents a
 * pairwise mapping from <i>n</i> discrete values in the input domain to
 * <i>n</i> discrete values in the output range. For example, an ordinal scale
 * might map a domain of species ["setosa", "versicolor", "virginica"] to colors
 * ["red", "green", "blue"]. Thus, saying
 *
 * <pre>.fillStyle(function(d) {
 *     switch (d.species) {
 *       case "setosa": return "red";
 *       case "versicolor": return "green";
 *       case "virginica": return "blue";
 *     }
 *   })</pre>
 *
 * is equivalent to
 *
 * <pre>.fillStyle(pv.Scale.ordinal("setosa", "versicolor", "virginica")
 *     .range("red", "green", "blue")
 *     .by(function(d) d.species))</pre>
 *
 * If the mapping from species to color does not need to be specified
 * explicitly, the domain can be omitted. In this case it will be inferred
 * lazily from the data:
 *
 * <pre>.fillStyle(pv.colors("red", "green", "blue")
 *     .by(function(d) d.species))</pre>
 *
 * When the domain is inferred, the first time the scale is invoked, the first
 * element from the range will be returned. Subsequent calls with unique values
 * will return subsequent elements from the range. If the inferred domain grows
 * larger than the range, range values will be reused. However, it is strongly
 * recommended that the domain and the range contain the same number of
 * elements.
 *
 * <p>A range can be discretized from a continuous interval (e.g., for pixel
 * positioning) by using {@link #split}, {@link #splitFlush} or
 * {@link #splitBanded} after the domain has been set. For example, if
 * <tt>states</tt> is an array of the fifty U.S. state names, the state name can
 * be encoded in the left position:
 *
 * <pre>.left(pv.Scale.ordinal(states)
 *     .split(0, 640)
 *     .by(function(d) d.state))</pre>
 *
 * <p>N.B.: ordinal scales are not invertible (at least not yet), since the
 * domain and range and discontinuous. A workaround is to use a linear scale.
 *
 * @param {...} domain... domain values.
 * @returns {pv.Scale.ordinal} an ordinal scale.
 * @see pv.colors
 */
pv.Scale.ordinal = function() {
  var d = [], i = {}, r = [], band = 0;

  /** @private */
  function scale(x) {
    if (!(x in i)) i[x] = d.push(x) - 1;
    return r[i[x] % r.length];
  }

  /**
   * Sets or gets the input domain. This method can be invoked several ways:
   *
   * <p>1. <tt>domain(values...)</tt>
   *
   * <p>Specifying the domain as a series of values is the most explicit and
   * recommended approach. However, if the domain values are derived from data,
   * you may find the second method more appropriate.
   *
   * <p>2. <tt>domain(array, f)</tt>
   *
   * <p>Rather than enumerating the domain values as explicit arguments to this
   * method, you can specify a single argument of an array. In addition, you can
   * specify an optional accessor function to extract the domain values from the
   * array.
   *
   * <p>3. <tt>domain()</tt>
   *
   * <p>Invoking the <tt>domain</tt> method with no arguments returns the
   * current domain as an array.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.domain
   * @param {...} domain... domain values.
   * @returns {pv.Scale.ordinal} <tt>this</tt>, or the current domain.
   */
  scale.domain = function(array, f) {
    if (arguments.length) {
      array = (array instanceof Array)
          ? ((arguments.length > 1) ? pv.map(array, f) : array)
          : Array.prototype.slice.call(arguments);

      /* Filter the specified ordinals to their unique values. */
      d = [];
      var seen = {};
      for (var j = 0; j < array.length; j++) {
        var o = array[j];
        if (!(o in seen)) {
          seen[o] = true;
          d.push(o);
        }
      }

      i = pv.numerate(d);
      return this;
    }
    return d;
  };

  /**
   * Sets or gets the output range. This method can be invoked several ways:
   *
   * <p>1. <tt>range(values...)</tt>
   *
   * <p>Specifying the range as a series of values is the most explicit and
   * recommended approach. However, if the range values are derived from data,
   * you may find the second method more appropriate.
   *
   * <p>2. <tt>range(array, f)</tt>
   *
   * <p>Rather than enumerating the range values as explicit arguments to this
   * method, you can specify a single argument of an array. In addition, you can
   * specify an optional accessor function to extract the range values from the
   * array.
   *
   * <p>3. <tt>range()</tt>
   *
   * <p>Invoking the <tt>range</tt> method with no arguments returns the
   * current range as an array.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Scale.ordinal} <tt>this</tt>, or the current range.
   */
  scale.range = function(array, f) {
    if (arguments.length) {
      r = (array instanceof Array)
          ? ((arguments.length > 1) ? pv.map(array, f) : array)
          : Array.prototype.slice.call(arguments);
      if (typeof r[0] == "string") r = r.map(pv.color);
      return this;
    }
    return r;
  };

  /**
   * Sets the range from the given continuous interval. The interval
   * [<i>min</i>, <i>max</i>] is subdivided into <i>n</i> equispaced points,
   * where <i>n</i> is the number of (unique) values in the domain. The first
   * and last point are offset from the edge of the range by half the distance
   * between points.
   *
   * <p>This method must be called <i>after</i> the domain is set.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.split
   * @param {number} min minimum value of the output range.
   * @param {number} max maximum value of the output range.
   * @returns {pv.Scale.ordinal} <tt>this</tt>.
   * @see #splitFlush
   * @see #splitBanded
   */
  scale.split = function(min, max) {
    var step = (max - min) / this.domain().length;
    r = pv.range(min + step / 2, max, step);
    return this;
  };

  /**
   * Sets the range from the given continuous interval. The interval
   * [<i>min</i>, <i>max</i>] is subdivided into <i>n</i> equispaced points,
   * where <i>n</i> is the number of (unique) values in the domain. The first
   * and last point are exactly on the edge of the range.
   *
   * <p>This method must be called <i>after</i> the domain is set.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.splitFlush
   * @param {number} min minimum value of the output range.
   * @param {number} max maximum value of the output range.
   * @returns {pv.Scale.ordinal} <tt>this</tt>.
   * @see #split
   */
  scale.splitFlush = function(min, max) {
    var n = this.domain().length, step = (max - min) / (n - 1);
    r = (n == 1) ? [(min + max) / 2]
        : pv.range(min, max + step / 2, step);
    return this;
  };

  /**
   * Sets the range from the given continuous interval. The interval
   * [<i>min</i>, <i>max</i>] is subdivided into <i>n</i> equispaced bands,
   * where <i>n</i> is the number of (unique) values in the domain. The first
   * and last band are offset from the edge of the range by the distance between
   * bands.
   *
   * <p>The band width argument, <tt>band</tt>, is typically in the range [0, 1]
   * and defaults to 1. This fraction corresponds to the amount of space in the
   * range to allocate to the bands, as opposed to padding. A value of 0.5 means
   * that the band width will be equal to the padding width. The computed
   * absolute band width can be retrieved from the range as
   * <tt>scale.range().band</tt>.
   *
   * <p>If the band width argument is negative, this method will allocate bands
   * of a <i>fixed</i> width <tt>-band</tt>, rather than a relative fraction of
   * the available space.
   *
   * <p>Tip: to inset the bands by a fixed amount <tt>p</tt>, specify a minimum
   * value of <tt>min + p</tt> (or simply <tt>p</tt>, if <tt>min</tt> is
   * 0). Then set the mark width to <tt>scale.range().band - p</tt>.
   *
   * <p>This method must be called <i>after</i> the domain is set.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.splitBanded
   * @param {number} min minimum value of the output range.
   * @param {number} max maximum value of the output range.
   * @param {number} [band] the fractional band width in [0, 1]; defaults to 1.
   * @returns {pv.Scale.ordinal} <tt>this</tt>.
   * @see #split
   */
  scale.splitBanded = function(min, max, band) {
    if (arguments.length < 3) band = 1;
    if (band < 0) {
      var n = this.domain().length,
          total = -band * n,
          remaining = max - min - total,
          padding = remaining / (n + 1);
      r = pv.range(min + padding, max, padding - band);
      r.band = -band;
    } else {
      var step = (max - min) / (this.domain().length + (1 - band));
      r = pv.range(min + step * (1 - band), max, step);
      r.band = step * band;
    }
    return this;
  };

  /**
   * Returns a view of this scale by the specified accessor function <tt>f</tt>.
   * Given a scale <tt>y</tt>, <tt>y.by(function(d) d.foo)</tt> is equivalent to
   * <tt>function(d) y(d.foo)</tt>. This method should be used judiciously; it
   * is typically more clear to invoke the scale directly, passing in the value
   * to be scaled.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.by
   * @param {function} f an accessor function.
   * @returns {pv.Scale.ordinal} a view of this scale by the specified accessor
   * function.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
/**
 * Returns the {@link pv.Color} for the specified color format string. Colors
 * may have an associated opacity, or alpha channel. Color formats are specified
 * by CSS Color Modular Level 3, using either in RGB or HSL color space. For
 * example:<ul>
 *
 * <li>#f00 // #rgb
 * <li>#ff0000 // #rrggbb
 * <li>rgb(255, 0, 0)
 * <li>rgb(100%, 0%, 0%)
 * <li>hsl(0, 100%, 50%)
 * <li>rgba(0, 0, 255, 0.5)
 * <li>hsla(120, 100%, 50%, 1)
 *
 * </ul>The SVG 1.0 color keywords names are also supported, such as "aliceblue"
 * and "yellowgreen". The "transparent" keyword is supported for a
 * fully-transparent color.
 *
 * <p>If the <tt>format</tt> argument is already an instance of <tt>Color</tt>,
 * the argument is returned with no further processing.
 *
 * @param {string} format the color specification string, such as "#f00".
 * @returns {pv.Color} the corresponding <tt>Color</tt>.
 * @see <a href="http://www.w3.org/TR/SVG/types.html#ColorKeywords">SVG color
 * keywords</a>
 * @see <a href="http://www.w3.org/TR/css3-color/">CSS3 color module</a>
 */
pv.color = function(format) {
  if (format == "transparent") return pv.Color.transparent;
  if (format instanceof pv.Color) return format.rgb();

  /* Handle hsl, rgb. */
  var m1 = /([a-z]+)\((.*)\)/i.exec(format);
  if (m1) {
    var m2 = m1[2].split(","), a = 1;
    switch (m1[1]) {
      case "hsla":
      case "rgba": {
        a = parseFloat(m2[3]);
        if (!a) return pv.Color.transparent;
        break;
      }
    }
    switch (m1[1]) {
      case "hsla":
      case "hsl": {
        var h = parseFloat(m2[0]), // degrees
            s = parseFloat(m2[1]) / 100, // percentage
            l = parseFloat(m2[2]) / 100; // percentage
        return (new pv.Color.Hsl(h, s, l, a)).rgb();
      }
      case "rgba":
      case "rgb": {
        function parse(c) { // either integer or percentage
          var f = parseFloat(c);
          return (c[c.length - 1] == '%') ? Math.round(f * 2.55) : f;
        }
        var r = parse(m2[0]), g = parse(m2[1]), b = parse(m2[2]);
        return pv.rgb(r, g, b, a);
      }
    }
  }

  /* Named colors. */
  format = pv.Color.names[format] || format;

  /* Hexadecimal colors: #rgb and #rrggbb. */
  if (format.charAt(0) == "#") {
    var r, g, b;
    if (format.length == 4) {
      r = format.charAt(1); r += r;
      g = format.charAt(2); g += g;
      b = format.charAt(3); b += b;
    } else if (format.length == 7) {
      r = format.substring(1, 3);
      g = format.substring(3, 5);
      b = format.substring(5, 7);
    }
    return pv.rgb(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
  }

  /* Otherwise, assume named colors. TODO allow lazy conversion to RGB. */
  return new pv.Color(format, 1);
};

/**
 * Constructs a color with the specified color format string and opacity. This
 * constructor should not be invoked directly; use {@link pv.color} instead.
 *
 * @class Represents an abstract (possibly translucent) color. The color is
 * divided into two parts: the <tt>color</tt> attribute, an opaque color format
 * string, and the <tt>opacity</tt> attribute, a float in [0, 1]. The color
 * space is dependent on the implementing class; all colors support the
 * {@link #rgb} method to convert to RGB color space for interpolation.
 *
 * <p>See also the <a href="../../api/Color.html">Color guide</a>.
 *
 * @param {string} color an opaque color format string, such as "#f00".
 * @param {number} opacity the opacity, in [0,1].
 * @see pv.color
 */
pv.Color = function(color, opacity) {
  /**
   * An opaque color format string, such as "#f00".
   *
   * @type string
   * @see <a href="http://www.w3.org/TR/SVG/types.html#ColorKeywords">SVG color
   * keywords</a>
   * @see <a href="http://www.w3.org/TR/css3-color/">CSS3 color module</a>
   */
  this.color = color;

  /**
   * The opacity, a float in [0, 1].
   *
   * @type number
   */
  this.opacity = opacity;
};

/**
 * Returns a new color that is a brighter version of this color. The behavior of
 * this method may vary slightly depending on the underlying color space.
 * Although brighter and darker are inverse operations, the results of a series
 * of invocations of these two methods might be inconsistent because of rounding
 * errors.
 *
 * @param [k] {number} an optional scale factor; defaults to 1.
 * @see #darker
 * @returns {pv.Color} a brighter color.
 */
pv.Color.prototype.brighter = function(k) {
  return this.rgb().brighter(k);
};

/**
 * Returns a new color that is a brighter version of this color. The behavior of
 * this method may vary slightly depending on the underlying color space.
 * Although brighter and darker are inverse operations, the results of a series
 * of invocations of these two methods might be inconsistent because of rounding
 * errors.
 *
 * @param [k] {number} an optional scale factor; defaults to 1.
 * @see #brighter
 * @returns {pv.Color} a darker color.
 */
pv.Color.prototype.darker = function(k) {
  return this.rgb().darker(k);
};

/**
 * Constructs a new RGB color with the specified channel values.
 *
 * @param {number} r the red channel, an integer in [0,255].
 * @param {number} g the green channel, an integer in [0,255].
 * @param {number} b the blue channel, an integer in [0,255].
 * @param {number} [a] the alpha channel, a float in [0,1].
 * @returns pv.Color.Rgb
 */
pv.rgb = function(r, g, b, a) {
  return new pv.Color.Rgb(r, g, b, (arguments.length == 4) ? a : 1);
};

/**
 * Constructs a new RGB color with the specified channel values.
 *
 * @class Represents a color in RGB space.
 *
 * @param {number} r the red channel, an integer in [0,255].
 * @param {number} g the green channel, an integer in [0,255].
 * @param {number} b the blue channel, an integer in [0,255].
 * @param {number} a the alpha channel, a float in [0,1].
 * @extends pv.Color
 */
pv.Color.Rgb = function(r, g, b, a) {
  pv.Color.call(this, a ? ("rgb(" + r + "," + g + "," + b + ")") : "none", a);

  /**
   * The red channel, an integer in [0, 255].
   *
   * @type number
   */
  this.r = r;

  /**
   * The green channel, an integer in [0, 255].
   *
   * @type number
   */
  this.g = g;

  /**
   * The blue channel, an integer in [0, 255].
   *
   * @type number
   */
  this.b = b;

  /**
   * The alpha channel, a float in [0, 1].
   *
   * @type number
   */
  this.a = a;
};
pv.Color.Rgb.prototype = pv.extend(pv.Color);

/**
 * Constructs a new RGB color with the same green, blue and alpha channels as
 * this color, with the specified red channel.
 *
 * @param {number} r the red channel, an integer in [0,255].
 */
pv.Color.Rgb.prototype.red = function(r) {
  return pv.rgb(r, this.g, this.b, this.a);
};

/**
 * Constructs a new RGB color with the same red, blue and alpha channels as this
 * color, with the specified green channel.
 *
 * @param {number} g the green channel, an integer in [0,255].
 */
pv.Color.Rgb.prototype.green = function(g) {
  return pv.rgb(this.r, g, this.b, this.a);
};

/**
 * Constructs a new RGB color with the same red, green and alpha channels as
 * this color, with the specified blue channel.
 *
 * @param {number} b the blue channel, an integer in [0,255].
 */
pv.Color.Rgb.prototype.blue = function(b) {
  return pv.rgb(this.r, this.g, b, this.a);
};

/**
 * Constructs a new RGB color with the same red, green and blue channels as this
 * color, with the specified alpha channel.
 *
 * @param {number} a the alpha channel, a float in [0,1].
 */
pv.Color.Rgb.prototype.alpha = function(a) {
  return pv.rgb(this.r, this.g, this.b, a);
};

/**
 * Returns the RGB color equivalent to this color. This method is abstract and
 * must be implemented by subclasses.
 *
 * @returns {pv.Color.Rgb} an RGB color.
 * @function
 * @name pv.Color.prototype.rgb
 */

/**
 * Returns this.
 *
 * @returns {pv.Color.Rgb} this.
 */
pv.Color.Rgb.prototype.rgb = function() { return this; };

/**
 * Returns a new color that is a brighter version of this color. This method
 * applies an arbitrary scale factor to each of the three RGB components of this
 * color to create a brighter version of this color. Although brighter and
 * darker are inverse operations, the results of a series of invocations of
 * these two methods might be inconsistent because of rounding errors.
 *
 * @param [k] {number} an optional scale factor; defaults to 1.
 * @see #darker
 * @returns {pv.Color.Rgb} a brighter color.
 */
pv.Color.Rgb.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  var r = this.r, g = this.g, b = this.b, i = 30;
  if (!r && !g && !b) return pv.rgb(i, i, i, this.a);
  if (r && (r < i)) r = i;
  if (g && (g < i)) g = i;
  if (b && (b < i)) b = i;
  return pv.rgb(
      Math.min(255, Math.floor(r / k)),
      Math.min(255, Math.floor(g / k)),
      Math.min(255, Math.floor(b / k)),
      this.a);
};

/**
 * Returns a new color that is a darker version of this color. This method
 * applies an arbitrary scale factor to each of the three RGB components of this
 * color to create a darker version of this color. Although brighter and darker
 * are inverse operations, the results of a series of invocations of these two
 * methods might be inconsistent because of rounding errors.
 *
 * @param [k] {number} an optional scale factor; defaults to 1.
 * @see #brighter
 * @returns {pv.Color.Rgb} a darker color.
 */
pv.Color.Rgb.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return pv.rgb(
      Math.max(0, Math.floor(k * this.r)),
      Math.max(0, Math.floor(k * this.g)),
      Math.max(0, Math.floor(k * this.b)),
      this.a);
};

/**
 * Constructs a new HSL color with the specified values.
 *
 * @param {number} h the hue, an integer in [0, 360].
 * @param {number} s the saturation, a float in [0, 1].
 * @param {number} l the lightness, a float in [0, 1].
 * @param {number} [a] the opacity, a float in [0, 1].
 * @returns pv.Color.Hsl
 */
pv.hsl = function(h, s, l, a) {
  return new pv.Color.Hsl(h, s, l,  (arguments.length == 4) ? a : 1);
};

/**
 * Constructs a new HSL color with the specified values.
 *
 * @class Represents a color in HSL space.
 *
 * @param {number} h the hue, an integer in [0, 360].
 * @param {number} s the saturation, a float in [0, 1].
 * @param {number} l the lightness, a float in [0, 1].
 * @param {number} a the opacity, a float in [0, 1].
 * @extends pv.Color
 */
pv.Color.Hsl = function(h, s, l, a) {
  pv.Color.call(this, "hsl(" + h + "," + (s * 100) + "%," + (l * 100) + "%)", a);

  /**
   * The hue, an integer in [0, 360].
   *
   * @type number
   */
  this.h = h;

  /**
   * The saturation, a float in [0, 1].
   *
   * @type number
   */
  this.s = s;

  /**
   * The lightness, a float in [0, 1].
   *
   * @type number
   */
  this.l = l;

  /**
   * The opacity, a float in [0, 1].
   *
   * @type number
   */
  this.a = a;
};
pv.Color.Hsl.prototype = pv.extend(pv.Color);

/**
 * Constructs a new HSL color with the same saturation, lightness and alpha as
 * this color, and the specified hue.
 *
 * @param {number} h the hue, an integer in [0, 360].
 */
pv.Color.Hsl.prototype.hue = function(h) {
  return pv.hsl(h, this.s, this.l, this.a);
};

/**
 * Constructs a new HSL color with the same hue, lightness and alpha as this
 * color, and the specified saturation.
 *
 * @param {number} s the saturation, a float in [0, 1].
 */
pv.Color.Hsl.prototype.saturation = function(s) {
  return pv.hsl(this.h, s, this.l, this.a);
};

/**
 * Constructs a new HSL color with the same hue, saturation and alpha as this
 * color, and the specified lightness.
 *
 * @param {number} l the lightness, a float in [0, 1].
 */
pv.Color.Hsl.prototype.lightness = function(l) {
  return pv.hsl(this.h, this.s, l, this.a);
};

/**
 * Constructs a new HSL color with the same hue, saturation and lightness as
 * this color, and the specified alpha.
 *
 * @param {number} a the opacity, a float in [0, 1].
 */
pv.Color.Hsl.prototype.alpha = function(a) {
  return pv.hsl(this.h, this.s, this.l, a);
};

/**
 * Returns the RGB color equivalent to this HSL color.
 *
 * @returns {pv.Color.Rgb} an RGB color.
 */
pv.Color.Hsl.prototype.rgb = function() {
  var h = this.h, s = this.s, l = this.l;

  /* Some simple corrections for h, s and l. */
  h = h % 360; if (h < 0) h += 360;
  s = Math.max(0, Math.min(s, 1));
  l = Math.max(0, Math.min(l, 1));

  /* From FvD 13.37, CSS Color Module Level 3 */
  var m2 = (l <= .5) ? (l * (1 + s)) : (l + s - l * s);
  var m1 = 2 * l - m2;
  function v(h) {
    if (h > 360) h -= 360;
    else if (h < 0) h += 360;
    if (h < 60) return m1 + (m2 - m1) * h / 60;
    if (h < 180) return m2;
    if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
    return m1;
  }
  function vv(h) {
    return Math.round(v(h) * 255);
  }

  return pv.rgb(vv(h + 120), vv(h), vv(h - 120), this.a);
};

/**
 * @private SVG color keywords, per CSS Color Module Level 3.
 *
 * @see <a href="http://www.w3.org/TR/SVG/types.html#ColorKeywords">SVG color
 * keywords</a>
 */
pv.Color.names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};

/** @private */
pv.Color.transparent = pv.rgb(0, 0, 0, 0);
/**
 * Returns a new categorical color encoding using the specified colors.  The
 * arguments to this method are an array of colors; see {@link pv.color}. For
 * example, to create a categorical color encoding using the <tt>species</tt>
 * attribute:
 *
 * <pre>pv.colors("red", "green", "blue").by(function(d) d.species)</pre>
 *
 * The result of this expression can be used as a fill- or stroke-style
 * property. This assumes that the data's <tt>species</tt> attribute is a
 * string.
 *
 * @param {string} colors... categorical colors.
 * @see pv.Scale.ordinal
 * @returns {pv.Scale.ordinal} an ordinal color scale.
 */
pv.colors = function() {
  var scale = pv.Scale.ordinal();
  scale.range.apply(scale, arguments);
  return scale;
};

/**
 * A collection of standard color palettes for categorical encoding.
 *
 * @namespace A collection of standard color palettes for categorical encoding.
 */
pv.Colors = {};

/**
 * Returns a new 10-color scheme. The arguments to this constructor are
 * optional, and equivalent to calling {@link pv.Scale.OrdinalScale#domain}. The
 * following colors are used:
 *
 * <div style="background:#1f77b4;">#1f77b4</div>
 * <div style="background:#ff7f0e;">#ff7f0e</div>
 * <div style="background:#2ca02c;">#2ca02c</div>
 * <div style="background:#d62728;">#d62728</div>
 * <div style="background:#9467bd;">#9467bd</div>
 * <div style="background:#8c564b;">#8c564b</div>
 * <div style="background:#e377c2;">#e377c2</div>
 * <div style="background:#7f7f7f;">#7f7f7f</div>
 * <div style="background:#bcbd22;">#bcbd22</div>
 * <div style="background:#17becf;">#17becf</div>
 *
 * @param {number...} domain... domain values.
 * @returns {pv.Scale.ordinal} a new ordinal color scale.
 * @see pv.color
 */
pv.Colors.category10 = function() {
  var scale = pv.colors(
      "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
      "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf");
  scale.domain.apply(scale, arguments);
  return scale;
};

/**
 * Returns a new 20-color scheme. The arguments to this constructor are
 * optional, and equivalent to calling {@link pv.Scale.OrdinalScale#domain}. The
 * following colors are used:
 *
 * <div style="background:#1f77b4;">#1f77b4</div>
 * <div style="background:#aec7e8;">#aec7e8</div>
 * <div style="background:#ff7f0e;">#ff7f0e</div>
 * <div style="background:#ffbb78;">#ffbb78</div>
 * <div style="background:#2ca02c;">#2ca02c</div>
 * <div style="background:#98df8a;">#98df8a</div>
 * <div style="background:#d62728;">#d62728</div>
 * <div style="background:#ff9896;">#ff9896</div>
 * <div style="background:#9467bd;">#9467bd</div>
 * <div style="background:#c5b0d5;">#c5b0d5</div>
 * <div style="background:#8c564b;">#8c564b</div>
 * <div style="background:#c49c94;">#c49c94</div>
 * <div style="background:#e377c2;">#e377c2</div>
 * <div style="background:#f7b6d2;">#f7b6d2</div>
 * <div style="background:#7f7f7f;">#7f7f7f</div>
 * <div style="background:#c7c7c7;">#c7c7c7</div>
 * <div style="background:#bcbd22;">#bcbd22</div>
 * <div style="background:#dbdb8d;">#dbdb8d</div>
 * <div style="background:#17becf;">#17becf</div>
 * <div style="background:#9edae5;">#9edae5</div>
 *
 * @param {number...} domain... domain values.
 * @returns {pv.Scale.ordinal} a new ordinal color scale.
 * @see pv.color
*/
pv.Colors.category20 = function() {
  var scale = pv.colors(
      "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
      "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
      "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
      "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5");
  scale.domain.apply(scale, arguments);
  return scale;
};

/**
 * Returns a new alternative 19-color scheme. The arguments to this constructor
 * are optional, and equivalent to calling
 * {@link pv.Scale.OrdinalScale#domain}. The following colors are used:
 *
 * <div style="background:#9c9ede;">#9c9ede</div>
 * <div style="background:#7375b5;">#7375b5</div>
 * <div style="background:#4a5584;">#4a5584</div>
 * <div style="background:#cedb9c;">#cedb9c</div>
 * <div style="background:#b5cf6b;">#b5cf6b</div>
 * <div style="background:#8ca252;">#8ca252</div>
 * <div style="background:#637939;">#637939</div>
 * <div style="background:#e7cb94;">#e7cb94</div>
 * <div style="background:#e7ba52;">#e7ba52</div>
 * <div style="background:#bd9e39;">#bd9e39</div>
 * <div style="background:#8c6d31;">#8c6d31</div>
 * <div style="background:#e7969c;">#e7969c</div>
 * <div style="background:#d6616b;">#d6616b</div>
 * <div style="background:#ad494a;">#ad494a</div>
 * <div style="background:#843c39;">#843c39</div>
 * <div style="background:#de9ed6;">#de9ed6</div>
 * <div style="background:#ce6dbd;">#ce6dbd</div>
 * <div style="background:#a55194;">#a55194</div>
 * <div style="background:#7b4173;">#7b4173</div>
 *
 * @param {number...} domain... domain values.
 * @returns {pv.Scale.ordinal} a new ordinal color scale.
 * @see pv.color
 */
pv.Colors.category19 = function() {
  var scale = pv.colors(
      "#9c9ede", "#7375b5", "#4a5584", "#cedb9c", "#b5cf6b",
      "#8ca252", "#637939", "#e7cb94", "#e7ba52", "#bd9e39",
      "#8c6d31", "#e7969c", "#d6616b", "#ad494a", "#843c39",
      "#de9ed6", "#ce6dbd", "#a55194", "#7b4173");
  scale.domain.apply(scale, arguments);
  return scale;
};
/**
 * Returns a linear color ramp from the specified <tt>start</tt> color to the
 * specified <tt>end</tt> color. The color arguments may be specified either as
 * <tt>string</tt>s or as {@link pv.Color}s.
 *
 * @param {string} start the start color; may be a <tt>pv.Color</tt>.
 * @param {string} end the end color; may be a <tt>pv.Color</tt>.
 * @returns {Function} a color ramp from <tt>start</tt> to <tt>end</tt>.
 * @see pv.Scale.linear
 */
pv.ramp = function(start, end) {
  var scale = pv.Scale.linear();
  scale.range.apply(scale, arguments);
  return scale;
};
/**
 * @private
 * @namespace
 */
pv.Scene = pv.SvgScene = {
  /* Various namespaces. */
  svg: "http://www.w3.org/2000/svg",
  xmlns: "http://www.w3.org/2000/xmlns",
  xlink: "http://www.w3.org/1999/xlink",

  /** The pre-multipled scale, based on any enclosing transforms. */
  scale: 1,

  /** A globally unique ID used to refer to clip-paths and such. */
  id: 0,

  /** Implicit values for SVG and CSS properties. */
  implicit: {
    svg: {
      "shape-rendering": "auto",
      "x": 0,
      "y": 0,
      "dy": 0,
      "text-anchor": "start",
      "transform": "translate(0,0)",
      "fill": "none",
      "fill-opacity": 1,
      "stroke": "none",
      "stroke-opacity": 1,
      "stroke-width": 1.5
    },
    css: {
      "font": "10px sans-serif"
    }
  }
};

/**
 * Updates the display for the specified array of scene nodes.
 *
 * @param scenes {array} an array of scene nodes.
 */
pv.SvgScene.updateAll = function(scenes) {
  if (!scenes.length) return;
  if ((scenes[0].reverse)
      && (scenes.type != "line")
      && (scenes.type != "area")) {
    var reversed = pv.extend(scenes);
    for (var i = 0, j = scenes.length - 1; j >= 0; i++, j--) {
      reversed[i] = scenes[j];
    }
    scenes = reversed;
  }
  this.removeSiblings(this[scenes.type](scenes));
};

/**
 * Creates a new SVG element of the specified type.
 *
 * @param type {string} an SVG element type, such as "rect".
 * @returns a new SVG element.
 */
pv.SvgScene.create = function(type) {
  return document.createElementNS(this.svg, type);
};

/**
 * Expects the element <i>e</i> to be the specified type. If the element does
 * not exist, a new one is created. If the element does exist but is the wrong
 * type, it is replaced with the specified element.
 *
 * @param e the current SVG element.
 * @param type {string} an SVG element type, such as "rect".
 * @param attributes an optional attribute map.
 * @param style an optional style map.
 * @returns a new SVG element.
 */
pv.SvgScene.expect = function(e, type, attributes, style) {
  if (e) {
    if (e.tagName == "a") e = e.firstChild;
    if (e.tagName != type) {
      var n = this.create(type);
      e.parentNode.replaceChild(n, e);
      e = n;
    }
  } else {
    e = this.create(type);
  }
  for (var name in attributes) {
    var value = attributes[name];
    if (value == this.implicit.svg[name]) value = null;
    if (value == null) e.removeAttribute(name);
    else e.setAttribute(name, value);
  }
  for (var name in style) {
    var value = style[name];
    if (value == this.implicit.css[name]) value = null;
    if (value == null) e.style.removeProperty(name);
    else e.style[name] = value;
  }
  return e;
};

/** TODO */
pv.SvgScene.append = function(e, scenes, index) {
  e.$scene = {scenes:scenes, index:index};
  e = this.title(e, scenes[index]);
  if (!e.parentNode) scenes.$g.appendChild(e);
  return e.nextSibling;
};

/**
 * Applies a title tooltip to the specified element <tt>e</tt>, using the
 * <tt>title</tt> property of the specified scene node <tt>s</tt>. Note that
 * this implementation does not create an SVG <tt>title</tt> element as a child
 * of <tt>e</tt>; although this is the recommended standard, it is only
 * supported in Opera. Instead, an anchor element is created around the element
 * <tt>e</tt>, and the <tt>xlink:title</tt> attribute is set accordingly.
 *
 * @param e an SVG element.
 * @param s a scene node.
 */
pv.SvgScene.title = function(e, s) {
  var a = e.parentNode;
  if (a && (a.tagName != "a")) a = null;
  if (s.title) {
    if (!a) {
      a = this.create("a");
      if (e.parentNode) e.parentNode.replaceChild(a, e);
      a.appendChild(e);
    }
    a.setAttributeNS(this.xlink, "title", s.title);
    return a;
  }
  if (a) a.parentNode.replaceChild(e, a);
  return e;
};

/** TODO */
pv.SvgScene.dispatch = pv.listener(function(e) {
  var t = e.target.$scene;
  if (t) pv.Mark.dispatch(e, t.scenes, t.index);
});

/** TODO */
pv.SvgScene.removeSiblings = function(e) {
  while (e) {
    var n = e.nextSibling;
    e.parentNode.removeChild(e);
    e = n;
  }
};
// TODO strokeStyle for areaSegment?

pv.SvgScene.area = function(scenes) {
  var e = scenes.$g.firstChild;
  if (!scenes.length) return e;
  var s = scenes[0];

  /* segmented */
  if (s.segmented) return this.areaSegment(scenes);

  /* visible */
  if (!s.visible) return e;
  var fill = s.fillStyle, stroke = s.strokeStyle;
  if (!fill.opacity && !stroke.opacity) return e;

  /* points */
  var p1 = "", p2 = "";
  for (var i = 0, j = scenes.length - 1; j >= 0; i++, j--) {
    var si = scenes[i], sj = scenes[j];
    p1 += si.left + "," + si.top + " ";
    p2 += (sj.left + sj.width) + "," + (sj.top + sj.height) + " ";

    /* interpolate (assume linear by default) */
    if (i < scenes.length - 1) {
      var sk = scenes[i + 1], sl = scenes[j - 1];
      switch (s.interpolate) {
        case "step-before": {
          p1 += si.left + "," + sk.top + " ";
          p2 += (sl.left + sl.width) + "," + (sj.top + sj.height) + " ";
          break;
        }
        case "step-after": {
          p1 += sk.left + "," + si.top + " ";
          p2 += (sj.left + sj.width) + "," + (sl.top + sl.height) + " ";
          break;
        }
      }
    }
  }

  e = this.expect(e, "polygon", {
      "shape-rendering": s.antialias ? null : "crispEdges",
      "cursor": s.cursor,
      "points": p1 + p2,
      "fill": fill.color,
      "fill-opacity": fill.opacity || null,
      "stroke": stroke.color,
      "stroke-opacity": stroke.opacity || null,
      "stroke-width": stroke.opacity ? s.lineWidth / this.scale : null
    });
  return this.append(e, scenes, 0);
};

pv.SvgScene.areaSegment = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0, n = scenes.length - 1; i < n; i++) {
    var s1 = scenes[i], s2 = scenes[i + 1];

    /* visible */
    if (!s1.visible || !s2.visible) continue;
    var fill = s1.fillStyle, stroke = s1.strokeStyle;
    if (!fill.opacity && !stroke.opacity) continue;

    /* interpolate */
    var si = s1, sj = s2;
    switch (s1.interpolate) {
      case "step-before": si = s2; break;
      case "step-after": sj = s1; break;
    }

    /* points */
    var p = s1.left + "," + si.top + " "
        + s2.left + "," + sj.top + " "
        + (s2.left + s2.width) + "," + (sj.top + sj.height) + " "
        + (s1.left + s1.width) + "," + (si.top + si.height);

    e = this.expect(e, "polygon", {
        "shape-rendering": s1.antialias ? null : "crispEdges",
        "cursor": s1.cursor,
        "points": p,
        "fill": fill.color,
        "fill-opacity": fill.opacity || null,
        "stroke": stroke.color,
        "stroke-opacity": stroke.opacity || null,
        "stroke-width": stroke.opacity ? s1.lineWidth / this.scale : null
      });
    e = this.append(e, scenes, i);
  }
  return e;
};
pv.SvgScene.bar = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var fill = s.fillStyle, stroke = s.strokeStyle;
    if (!fill.opacity && !stroke.opacity) continue;

    e = this.expect(e, "rect", {
        "shape-rendering": s.antialias ? null : "crispEdges",
        "cursor": s.cursor,
        "x": s.left,
        "y": s.top,
        "width": Math.max(1E-10, s.width),
        "height": Math.max(1E-10, s.height),
        "fill": fill.color,
        "fill-opacity": fill.opacity || null,
        "stroke": stroke.color,
        "stroke-opacity": stroke.opacity || null,
        "stroke-width": stroke.opacity ? s.lineWidth / this.scale : null
      });
    e = this.append(e, scenes, i);
  }
  return e;
};
pv.SvgScene.dot = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var fill = s.fillStyle, stroke = s.strokeStyle;
    if (!fill.opacity && !stroke.opacity) continue;

    /* points */
    var radius = s.radius, path;
    switch (s.shape) {
      case "cross": {
        path = "M" + -radius + "," + -radius
            + "L" + radius + "," + radius
            + "M" + radius + "," + -radius
            + "L" + -radius + "," + radius;
        break;
      }
      case "triangle": {
        var h = radius, w = radius * 1.1547; // 2 / Math.sqrt(3)
        path = "M0," + h
            + "L" + w +"," + -h
            + " " + -w + "," + -h
            + "Z";
        break;
      }
      case "diamond": {
        radius *= 1.414214; // Math.sqrt(2)
        path = "M0," + -radius
            + "L" + radius + ",0"
            + " 0," + radius
            + " " + -radius + ",0"
            + "Z";
        break;
      }
      case "square": {
        path = "M" + -radius + "," + -radius
            + "L" + radius + "," + -radius
            + " " + radius + "," + radius
            + " " + -radius + "," + radius
            + "Z";
        break;
      }
      case "tick": {
        path = "M0,0L0," + -s.size;
        break;
      }
    }

    /* Use <circle> for circles, <path> for everything else. */
    var svg = {
      "shape-rendering": s.antialias ? null : "crispEdges",
      "fill": fill.color,
      "fill-opacity": fill.opacity || null,
      "stroke": stroke.color,
      "stroke-opacity": stroke.opacity || null,
      "stroke-width": stroke.opacity ? s.lineWidth / this.scale : null
    };
    if (path) {
      svg.transform = "translate(" + s.left + "," + s.top + ")";
      if (s.angle) svg.transform += " rotate(" + 180 * s.angle / Math.PI + ")";
      svg.d = path;
      e = this.expect(e, "path", svg);
    } else {
      svg.cx = s.left;
      svg.cy = s.top;
      svg.r = radius;
      e = this.expect(e, "circle", svg);
    }
    e = this.append(e, scenes, i);
  }
  return e;
};
pv.SvgScene.image = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* fill */
    e = this.fill(e, scenes, i);

    /* image */
    e = this.expect(e, "image", {
        "preserveAspectRatio": "none",
        "cursor": s.cursor,
        "x": s.left,
        "y": s.top,
        "width": s.width,
        "height": s.height
      });
    e.setAttributeNS(this.xlink, "href", s.url);
    e = this.append(e, scenes, i);

    /* stroke */
    e = this.stroke(e, scenes, i);
  }
  return e;
};
pv.SvgScene.label = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var fill = s.textStyle;
    if (!fill.opacity || !s.text) continue;

    /* text-baseline, text-align */
    var x = 0, y = 0, dy = 0, anchor = "start";
    switch (s.textBaseline) {
      case "middle": dy = ".35em"; break;
      case "top": dy = ".71em"; y = s.textMargin; break;
      case "bottom": y = "-" + s.textMargin; break;
    }
    switch (s.textAlign) {
      case "right": anchor = "end"; x = "-" + s.textMargin; break;
      case "center": anchor = "middle"; break;
      case "left": x = s.textMargin; break;
    }

    e = this.expect(e, "text", {
        "pointer-events": "none",
        "x": x,
        "y": y,
        "dy": dy,
        "transform": "translate(" + s.left + "," + s.top + ")"
            + (s.textAngle ? " rotate(" + 180 * s.textAngle / Math.PI + ")" : "")
            + (this.scale != 1 ? " scale(" + 1 / this.scale + ")" : ""),
        "fill": fill.color,
        "fill-opacity": fill.opacity || null,
        "text-anchor": anchor
      }, {
        "font": s.font,
        "text-shadow": s.textShadow,
        "text-decoration": s.textDecoration
      });
    if (e.firstChild) e.firstChild.nodeValue = s.text;
    else e.appendChild(document.createTextNode(s.text));
    e = this.append(e, scenes, i);
  }
  return e;
};
// TODO fillStyle for lineSegment?
// TODO lineOffset for flow maps?

pv.SvgScene.line = function(scenes) {
  var e = scenes.$g.firstChild;
  if (scenes.length < 2) return e;
  var s = scenes[0];

  /* segmented */
  if (s.segmented) return this.lineSegment(scenes);

  /* visible */
  if (!s.visible) return e;
  var fill = s.fillStyle, stroke = s.strokeStyle;
  if (!fill.opacity && !stroke.opacity) return e;

  /* points */
  var d = "M" + s.left + "," + s.top;
  for (var i = 1; i < scenes.length; i++) {
    d += this.pathSegment(scenes[i - 1], scenes[i]);
  }

  e = this.expect(e, "path", {
      "shape-rendering": s.antialias ? null : "crispEdges",
      "cursor": s.cursor,
      "d": d,
      "fill": fill.color,
      "fill-opacity": fill.opacity || null,
      "stroke": stroke.color,
      "stroke-opacity": stroke.opacity || null,
      "stroke-width": stroke.opacity ? s.lineWidth / this.scale : null
    });
  return this.append(e, scenes, 0);
};

pv.SvgScene.lineSegment = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0, n = scenes.length - 1; i < n; i++) {
    var s1 = scenes[i], s2 = scenes[i + 1];

    /* visible */
    if (!s1.visible || !s2.visible) continue;
    var stroke = s1.strokeStyle, fill = pv.Color.transparent;
    if (!stroke.opacity) continue;

    /* interpolate */
    var d;
    if (s1.interpolate == "linear") {
      fill = stroke;
      stroke = pv.Color.transparent;
      d = this.pathJoin(scenes[i - 1], s1, s2, scenes[i + 2]);
    } else {
      d = "M" + s1.left + "," + s1.top + this.pathSegment(s1, s2);
    }

    e = this.expect(e, "path", {
        "shape-rendering": s1.antialias ? null : "crispEdges",
        "cursor": s1.cursor,
        "d": d,
        "fill": fill.color,
        "fill-opacity": fill.opacity || null,
        "stroke": stroke.color,
        "stroke-opacity": stroke.opacity || null,
        "stroke-width": stroke.opacity ? s1.lineWidth / this.scale : null
      });
    e = this.append(e, scenes, i);
  }
  return e;
};

/** @private Returns the path segment for the specified points. */
pv.SvgScene.pathSegment = function(s1, s2) {
  switch (s1.interpolate) {
    case "polar": {
      var dx = s2.left - s1.left,
          dy = s2.top - s1.top,
          r = Math.sqrt(dx * dx + dy * dy) / 2;
      return "A" + r + "," + r + " 0 1,1 " + s2.left + "," + s2.top;
    }
    case "step-before": return "V" + s2.top + "H" + s2.left;
    case "step-after": return "H" + s2.left + "V" + s2.top;
  }
  return "L" + s2.left + "," + s2.top;
};

/** @private Line-line intersection, per Akenine-Moller 16.16.1. */
pv.SvgScene.lineIntersect = function(o1, d1, o2, d2) {
  return o1.plus(d1.times(o2.minus(o1).dot(d2.perp()) / d1.dot(d2.perp())));
}

/** @private Returns the miter join path for the specified points. */
pv.SvgScene.pathJoin = function(s0, s1, s2, s3) {
  /*
   * P1-P2 is the current line segment. V is a vector that is perpendicular to
   * the line segment, and has length lineWidth / 2. ABCD forms the initial
   * bounding box of the line segment (i.e., the line segment if we were to do
   * no joins).
   */
  var p1 = pv.vector(s1.left, s1.top),
      p2 = pv.vector(s2.left, s2.top),
      p = p2.minus(p1),
      v = p.perp().norm(),
      w = v.times(s1.lineWidth / (2 * this.scale)),
      a = p1.plus(w),
      b = p2.plus(w),
      c = p2.minus(w),
      d = p1.minus(w);

  /*
   * Start join. P0 is the previous line segment's start point. We define the
   * cutting plane as the average of the vector perpendicular to P0-P1, and
   * the vector perpendicular to P1-P2. This insures that the cross-section of
   * the line on the cutting plane is equal if the line-width is unchanged.
   * Note that we don't implement miter limits, so these can get wild.
   */
  if (s0 && s0.visible) {
    var v1 = p1.minus(s0.left, s0.top).perp().norm().plus(v);
    d = this.lineIntersect(p1, v1, d, p);
    a = this.lineIntersect(p1, v1, a, p);
  }

  /* Similarly, for end join. */
  if (s3 && s3.visible) {
    var v2 = pv.vector(s3.left, s3.top).minus(p2).perp().norm().plus(v);
    c = this.lineIntersect(p2, v2, c, p);
    b = this.lineIntersect(p2, v2, b, p);
  }

  return "M" + a.x + "," + a.y
      + "L" + b.x + "," + b.y
      + " " + c.x + "," + c.y
      + " " + d.x + "," + d.y;
};
pv.SvgScene.panel = function(scenes) {
  var g = scenes.$g, e = g && g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* svg */
    if (!scenes.parent) {
      s.canvas.style.display = "inline-block";
      if (g && (g.parentNode != s.canvas)) {
        g = s.canvas.firstChild;
        e = g && g.firstChild;
      }
      if (!g) {
        g = s.canvas.appendChild(this.create("svg"));
        g.setAttribute("font-size", "10px");
        g.setAttribute("font-family", "sans-serif");
        g.setAttribute("fill", "none");
        g.setAttribute("stroke", "none");
        g.setAttribute("stroke-width", 1.5);
        g.onclick
            = g.onmousedown
            = g.onmouseup
            = g.onmousemove
            = g.onmouseout
            = g.onmouseover
            = g.onmousewheel
            = this.dispatch;
        e = g.firstChild;
      }
      scenes.$g = g;
      g.setAttribute("width", s.width + s.left + s.right);
      g.setAttribute("height", s.height + s.top + s.bottom);
    }

    /* clip (nest children) */
    if (s.overflow == "hidden") {
      var id = (this.id++).toString(36),
          c = this.expect(e, "g", {"clip-path": "url(#" + id + ")"});
      if (!c.parentNode) g.appendChild(c);
      scenes.$g = g = c;
      e = c.firstChild;

      e = this.expect(e, "clipPath", {"id": id});
      var r = e.firstChild || e.appendChild(this.create("rect"));
      r.setAttribute("x", s.left);
      r.setAttribute("y", s.top);
      r.setAttribute("width", s.width);
      r.setAttribute("height", s.height);
      if (!e.parentNode) g.appendChild(e);
      e = e.nextSibling;
    }

    /* fill */
    e = this.fill(e, scenes, i);

    /* transform (push) */
    var k = this.scale,
        t = s.transform,
        x = s.left + t.x,
        y = s.top + t.y;
    this.scale *= t.k;

    /* children */
    for (var j = 0; j < s.children.length; j++) {
      s.children[j].$g = e = this.expect(e, "g", {
          "transform": "translate(" + x + "," + y + ")"
              + (t.k != 1 ? " scale(" + t.k + ")" : "")
        });
      this.updateAll(s.children[j]);
      if (!e.parentNode) g.appendChild(e);
      e = e.nextSibling;
    }

    /* transform (pop) */
    this.scale = k;

    /* stroke */
    e = this.stroke(e, scenes, i);

    /* clip (restore group) */
    if (s.overflow == "hidden") {
      scenes.$g = g = c.parentNode;
      e = c.nextSibling;
    }
  }
  return e;
};

pv.SvgScene.fill = function(e, scenes, i) {
  var s = scenes[i], fill = s.fillStyle;
  if (fill.opacity) {
    e = this.expect(e, "rect", {
        "shape-rendering": s.antialias ? null : "crispEdges",
        "cursor": s.cursor,
        "x": s.left,
        "y": s.top,
        "width": s.width,
        "height": s.height,
        "fill": fill.color,
        "fill-opacity": fill.opacity,
        "stroke": null
      });
    e = this.append(e, scenes, i);
  }
  return e;
};

pv.SvgScene.stroke = function(e, scenes, i) {
  var s = scenes[i], stroke = s.strokeStyle;
  if (stroke.opacity) {
    e = this.expect(e, "rect", {
        "shape-rendering": s.antialias ? null : "crispEdges",
        "cursor": s.cursor,
        "x": s.left,
        "y": s.top,
        "width": Math.max(1E-10, s.width),
        "height": Math.max(1E-10, s.height),
        "fill": null,
        "stroke": stroke.color,
        "stroke-opacity": stroke.opacity,
        "stroke-width": s.lineWidth / this.scale
      });
    e = this.append(e, scenes, i);
  }
  return e;
};
pv.SvgScene.rule = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var stroke = s.strokeStyle;
    if (!stroke.opacity) continue;

    e = this.expect(e, "line", {
        "shape-rendering": s.antialias ? null : "crispEdges",
        "cursor": s.cursor,
        "x1": s.left,
        "y1": s.top,
        "x2": s.left + s.width,
        "y2": s.top + s.height,
        "stroke": stroke.color,
        "stroke-opacity": stroke.opacity,
        "stroke-width": s.lineWidth / this.scale
      });
    e = this.append(e, scenes, i);
  }
  return e;
};
pv.SvgScene.wedge = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var fill = s.fillStyle, stroke = s.strokeStyle;
    if (!fill.opacity && !stroke.opacity) continue;

    /* points */
    var r1 = s.innerRadius, r2 = s.outerRadius, a = Math.abs(s.angle), p;
    if (a >= 2 * Math.PI) {
      if (r1) {
        p = "M0," + r2
            + "A" + r2 + "," + r2 + " 0 1,1 0," + (-r2)
            + "A" + r2 + "," + r2 + " 0 1,1 0," + r2
            + "M0," + r1
            + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
            + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
            + "Z";
      } else {
        p = "M0," + r2
            + "A" + r2 + "," + r2 + " 0 1,1 0," + (-r2)
            + "A" + r2 + "," + r2 + " 0 1,1 0," + r2
            + "Z";
      }
    } else {
      var sa = Math.min(s.startAngle, s.endAngle),
          ea = Math.max(s.startAngle, s.endAngle),
          c1 = Math.cos(sa), c2 = Math.cos(ea),
          s1 = Math.sin(sa), s2 = Math.sin(ea);
      if (r1) {
        p = "M" + r2 * c1 + "," + r2 * s1
            + "A" + r2 + "," + r2 + " 0 "
            + ((a < Math.PI) ? "0" : "1") + ",1 "
            + r2 * c2 + "," + r2 * s2
            + "L" + r1 * c2 + "," + r1 * s2
            + "A" + r1 + "," + r1 + " 0 "
            + ((a < Math.PI) ? "0" : "1") + ",0 "
            + r1 * c1 + "," + r1 * s1 + "Z";
      } else {
        p = "M" + r2 * c1 + "," + r2 * s1
            + "A" + r2 + "," + r2 + " 0 "
            + ((a < Math.PI) ? "0" : "1") + ",1 "
            + r2 * c2 + "," + r2 * s2 + "L0,0Z";
      }
    }

    e = this.expect(e, "path", {
        "shape-rendering": s.antialias ? null : "crispEdges",
        "cursor": s.cursor,
        "transform": "translate(" + s.left + "," + s.top + ")",
        "d": p,
        "fill": fill.color,
        "fill-opacity": fill.opacity || null,
        "stroke": stroke.color,
        "stroke-opacity": stroke.opacity || null,
        "stroke-width": stroke.opacity ? s.lineWidth / this.scale : null
      });
    e = this.append(e, scenes, i);
  }
  return e;
};
/**
 * Constructs a new mark with default properties. Marks, with the exception of
 * the root panel, are not typically constructed directly; instead, they are
 * added to a panel or an existing mark via {@link pv.Mark#add}.
 *
 * @class Represents a data-driven graphical mark. The <tt>Mark</tt> class is
 * the base class for all graphical marks in Protovis; it does not provide any
 * specific rendering functionality, but together with {@link Panel} establishes
 * the core framework.
 *
 * <p>Concrete mark types include familiar visual elements such as bars, lines
 * and labels. Although a bar mark may be used to construct a bar chart, marks
 * know nothing about charts; it is only through their specification and
 * composition that charts are produced. These building blocks permit many
 * combinatorial possibilities.
 *
 * <p>Marks are associated with <b>data</b>: a mark is generated once per
 * associated datum, mapping the datum to visual <b>properties</b> such as
 * position and color. Thus, a single mark specification represents a set of
 * visual elements that share the same data and visual encoding. The type of
 * mark defines the names of properties and their meaning. A property may be
 * static, ignoring the associated datum and returning a constant; or, it may be
 * dynamic, derived from the associated datum or index. Such dynamic encodings
 * can be specified succinctly using anonymous functions. Special properties
 * called event handlers can be registered to add interactivity.
 *
 * <p>Protovis uses <b>inheritance</b> to simplify the specification of related
 * marks: a new mark can be derived from an existing mark, inheriting its
 * properties. The new mark can then override properties to specify new
 * behavior, potentially in terms of the old behavior. In this way, the old mark
 * serves as the <b>prototype</b> for the new mark. Most mark types share the
 * same basic properties for consistency and to facilitate inheritance.
 *
 * <p>The prioritization of redundant properties is as follows:<ol>
 *
 * <li>If the <tt>width</tt> property is not specified (i.e., null), its value
 * is the width of the parent panel, minus this mark's left and right margins;
 * the left and right margins are zero if not specified.
 *
 * <li>Otherwise, if the <tt>right</tt> margin is not specified, its value is
 * the width of the parent panel, minus this mark's width and left margin; the
 * left margin is zero if not specified.
 *
 * <li>Otherwise, if the <tt>left</tt> property is not specified, its value is
 * the width of the parent panel, minus this mark's width and the right margin.
 *
 * </ol>This prioritization is then duplicated for the <tt>height</tt>,
 * <tt>bottom</tt> and <tt>top</tt> properties, respectively.
 *
 * <p>While most properties are <i>variable</i>, some mark types, such as lines
 * and areas, generate a single visual element rather than a distinct visual
 * element per datum. With these marks, some properties may be <b>fixed</b>.
 * Fixed properties can vary per mark, but not <i>per datum</i>! These
 * properties are evaluated solely for the first (0-index) datum, and typically
 * are specified as a constant. However, it is valid to use a function if the
 * property varies between panels or is dynamically generated.
 *
 * <p>See also the <a href="../../api/">Protovis guide</a>.
 */
pv.Mark = function() {
  /*
   * TYPE 0 constant defs
   * TYPE 1 function defs
   * TYPE 2 constant properties
   * TYPE 3 function properties
   * in order of evaluation!
   */
  this.$properties = [];
  this.$handlers = {};
};

/** @private Records which properties are defined on this mark type. */
pv.Mark.prototype.properties = {};

/** @private Records which the cast function for each property. */
pv.Mark.cast = {};

/**
 * @private Defines and registers a property method for the property with the
 * given name.  This method should be called on a mark class prototype to define
 * each exposed property. (Note this refers to the JavaScript
 * <tt>prototype</tt>, not the Protovis mark prototype, which is the {@link
 * #proto} field.)
 *
 * <p>The created property method supports several modes of invocation: <ol>
 *
 * <li>If invoked with a <tt>Function</tt> argument, this function is evaluated
 * for each associated datum. The return value of the function is used as the
 * computed property value. The context of the function (<tt>this</tt>) is this
 * mark. The arguments to the function are the associated data of this mark and
 * any enclosing panels. For example, a linear encoding of numerical data to
 * height is specified as
 *
 * <pre>m.height(function(d) d * 100);</pre>
 *
 * The expression <tt>d * 100</tt> will be evaluated for the height property of
 * each mark instance. The return value of the property method (e.g.,
 * <tt>m.height</tt>) is this mark (<tt>m</tt>)).<p>
 *
 * <li>If invoked with a non-function argument, the property is treated as a
 * constant. The return value of the property method (e.g., <tt>m.height</tt>)
 * is this mark.<p>
 *
 * <li>If invoked with no arguments, the computed property value for the current
 * mark instance in the scene graph is returned. This facilitates <i>property
 * chaining</i>, where one mark's properties are defined in terms of another's.
 * For example, to offset a mark's location from its prototype, you might say
 *
 * <pre>m.top(function() this.proto.top() + 10);</pre>
 *
 * Note that the index of the mark being evaluated (in the above example,
 * <tt>this.proto</tt>) is inherited from the <tt>Mark</tt> class and set by
 * this mark. So, if the fifth element's top property is being evaluated, the
 * fifth instance of <tt>this.proto</tt> will similarly be queried for the value
 * of its top property. If the mark being evaluated has a different number of
 * instances, or its data is unrelated, the behavior of this method is
 * undefined. In these cases it may be better to index the <tt>scene</tt>
 * explicitly to specify the exact instance.
 *
 * </ol><p>Property names should follow standard JavaScript method naming
 * conventions, using lowerCamel-style capitalization.
 *
 * <p>In addition to creating the property method, every property is registered
 * in the {@link #properties} map on the <tt>prototype</tt>. Although this is an
 * instance field, it is considered immutable and shared by all instances of a
 * given mark type. The <tt>properties</tt> map can be queried to see if a mark
 * type defines a particular property, such as width or height.
 *
 * @param {string} name the property name.
 * @param {function} [cast] the cast function for this property.
 */
pv.Mark.prototype.property = function(name, cast) {
  if (!this.hasOwnProperty("properties")) {
    this.properties = pv.extend(this.properties);
  }
  this.properties[name] = true;

  /*
   * Define the setter-getter globally, since the default behavior should be the
   * same for all properties, and since the Protovis inheritance chain is
   * independent of the JavaScript inheritance chain. For example, anchors
   * define a "name" property that is evaluated on derived marks, even though
   * those marks don't normally have a name.
   */
  pv.Mark.prototype[name] = function(v) {
      if (arguments.length) {
        this.propertyValue(name, v);
        return this;
      }
      return this.instance()[name];
    };
  pv.Mark.cast[name] = cast;
  return this;
};

/** @private Sets the value of the property <i>name</i> to <i>v</i>. */
pv.Mark.prototype.propertyValue = function(name, v) {
  /* Replace existing property definition, if found. */
  for (var i = 0; i < this.$properties.length; i++) {
    if (this.$properties[i].name == name) {
      this.$properties.splice(i, 1);
      break;
    }
  }

  /*
   * If a cast function is specified, the property function is wrapped by the
   * cast function, or, if a constant is specified, the constant is immediately
   * cast. Note, however, that if the property value is null, the cast function
   * is not invoked.
   */
  var c = pv.Mark.cast[name], f = typeof v == "function", p = {
      name: name,
      type: f ? 3 : 2,
      value: (f && c) ? function() {
          var x = v.apply(this, arguments);
          return (x != null) ? c(x) : null;
        } : (((v != null) && c) ? c(v) : v)
    };
  this.$properties.push(p);
  return p;
};

/* Define all global properties. */
pv.Mark.prototype
    .property("data")
    .property("visible", Boolean)
    .property("left", Number)
    .property("right", Number)
    .property("top", Number)
    .property("bottom", Number)
    .property("cursor", String)
    .property("title", String)
    .property("reverse", Boolean)
    .property("antialias", Boolean);

/**
 * The mark type; a lower camelCase name. The type name controls rendering
 * behavior, and unless the rendering engine is extended, must be one of the
 * built-in concrete mark types: area, bar, dot, image, label, line, panel,
 * rule, or wedge.
 *
 * @type string
 * @name pv.Mark.prototype.type
 */

/**
 * The mark prototype, possibly undefined, from which to inherit property
 * functions. The mark prototype is not necessarily of the same type as this
 * mark. Any properties defined on this mark will override properties inherited
 * either from the prototype or from the type-specific defaults.
 *
 * @type pv.Mark
 * @name pv.Mark.prototype.proto
 */

/**
 * The enclosing parent panel. The parent panel is generally undefined only for
 * the root panel; however, it is possible to create "offscreen" marks that are
 * used only for inheritance purposes.
 *
 * @type pv.Panel
 * @name pv.Mark.prototype.parent
 */

/**
 * The child index. -1 if the enclosing parent panel is null; otherwise, the
 * zero-based index of this mark into the parent panel's <tt>children</tt> array.
 *
 * @type number
 */
pv.Mark.prototype.childIndex = -1;

/**
 * The mark index. The value of this field depends on which instance (i.e.,
 * which element of the data array) is currently being evaluated. During the
 * build phase, the index is incremented over each datum; when handling events,
 * the index is set to the instance that triggered the event.
 *
 * @type number
 */
pv.Mark.prototype.index = -1;

/**
 * The current scale factor, based on any enclosing transforms. The current
 * scale can be used to create scale-independent graphics. For example, to
 * define a dot that has a radius of 10 irrespective of any zooming, say:
 *
 * <pre>dot.radius(function() 10 / this.scale)</pre>
 *
 * Note that the stroke width and font size are defined irrespective of scale
 * (i.e., in screen space) already. Also note that when a transform is applied
 * to a panel, the scale affects only the child marks, not the panel itself.
 *
 * @type number
 * @see pv.Panel.prototype.transform
 */
pv.Mark.prototype.scale = 1;

/**
 * The scene graph. The scene graph is an array of objects; each object (or
 * "node") corresponds to an instance of this mark and an element in the data
 * array. The scene graph can be traversed to lookup previously-evaluated
 * properties.
 *
 * <p>For instance, consider a stacked area chart. The bottom property of the
 * area can be defined using the <i>cousin</i> instance, which is the current
 * area instance in the previous instantiation of the parent panel. In this
 * sample code,
 *
 * <pre>new pv.Panel()
 *     .width(150).height(150)
 *   .add(pv.Panel)
 *     .data([[1, 1.2, 1.7, 1.5, 1.7],
 *            [.5, 1, .8, 1.1, 1.3],
 *            [.2, .5, .8, .9, 1]])
 *   .add(pv.Area)
 *     .data(function(d) d)
 *     .bottom(function() {
 *         var c = this.cousin();
 *         return c ? (c.bottom + c.height) : 0;
 *       })
 *     .height(function(d) d * 40)
 *     .left(function() this.index * 35)
 *   .root.render();</pre>
 *
 * the bottom property is computed based on the upper edge of the corresponding
 * datum in the previous series. The area's parent panel is instantiated once
 * per series, so the cousin refers to the previous (below) area mark. (Note
 * that the position of the upper edge is not the same as the top property,
 * which refers to the top margin: the distance from the top edge of the panel
 * to the top edge of the mark.)
 *
 * @see #first
 * @see #last
 * @see #sibling
 * @see #cousin
 * @name pv.Mark.prototype.scene
 */

/**
 * The root parent panel. This may be undefined for "offscreen" marks that are
 * created for inheritance purposes only.
 *
 * @type pv.Panel
 * @name pv.Mark.prototype.root
 */

/**
 * The data property; an array of objects. The size of the array determines the
 * number of marks that will be instantiated; each element in the array will be
 * passed to property functions to compute the property values. Typically, the
 * data property is specified as a constant array, such as
 *
 * <pre>m.data([1, 2, 3, 4, 5]);</pre>
 *
 * However, it is perfectly acceptable to define the data property as a
 * function. This function might compute the data dynamically, allowing
 * different data to be used per enclosing panel. For instance, in the stacked
 * area graph example (see {@link #scene}), the data function on the area mark
 * dereferences each series.
 *
 * @type array
 * @name pv.Mark.prototype.data
 */

/**
 * The visible property; a boolean determining whether or not the mark instance
 * is visible. If a mark instance is not visible, its other properties will not
 * be evaluated. Similarly, for panels no child marks will be rendered.
 *
 * @type boolean
 * @name pv.Mark.prototype.visible
 */

/**
 * The left margin; the distance, in pixels, between the left edge of the
 * enclosing panel and the left edge of this mark. Note that in some cases this
 * property may be redundant with the right property, or with the conjunction of
 * right and width.
 *
 * @type number
 * @name pv.Mark.prototype.left
 */

/**
 * The right margin; the distance, in pixels, between the right edge of the
 * enclosing panel and the right edge of this mark. Note that in some cases this
 * property may be redundant with the left property, or with the conjunction of
 * left and width.
 *
 * @type number
 * @name pv.Mark.prototype.right
 */

/**
 * The top margin; the distance, in pixels, between the top edge of the
 * enclosing panel and the top edge of this mark. Note that in some cases this
 * property may be redundant with the bottom property, or with the conjunction
 * of bottom and height.
 *
 * @type number
 * @name pv.Mark.prototype.top
 */

/**
 * The bottom margin; the distance, in pixels, between the bottom edge of the
 * enclosing panel and the bottom edge of this mark. Note that in some cases
 * this property may be redundant with the top property, or with the conjunction
 * of top and height.
 *
 * @type number
 * @name pv.Mark.prototype.bottom
 */

/**
 * The cursor property; corresponds to the CSS cursor property. This is
 * typically used in conjunction with event handlers to indicate interactivity.
 *
 * @type string
 * @name pv.Mark.prototype.cursor
 * @see <a href="http://www.w3.org/TR/CSS2/ui.html#propdef-cursor">CSS2 cursor</a>
 */

/**
 * The title property; corresponds to the HTML/SVG title property, allowing the
 * general of simple plain text tooltips.
 *
 * @type string
 * @name pv.Mark.prototype.title
 */

/**
 * The reverse property; a boolean determining whether marks are ordered from
 * front-to-back or back-to-front. SVG does not support explicit z-ordering;
 * shapes are rendered in the order they appear. Thus, by default, marks are
 * rendered in data order. Setting the reverse property to false reverses the
 * order in which they are rendered; however, the properties are still evaluated
 * (i.e., built) in forward order.
 *
 * @type boolean
 * @name pv.Mark.prototype.reverse
 */

/**
 * Default properties for all mark types. By default, the data array is the
 * parent data as a single-element array; if the data property is not specified,
 * this causes each mark to be instantiated as a singleton with the parents
 * datum. The visible property is true by default, and the reverse property is
 * false.
 *
 * @type pv.Mark
 */
pv.Mark.prototype.defaults = new pv.Mark()
    .data(function(d) { return [d]; })
    .visible(true)
    .reverse(false)
    .antialias(true);

/**
 * Sets the prototype of this mark to the specified mark. Any properties not
 * defined on this mark may be inherited from the specified prototype mark, or
 * its prototype, and so on. The prototype mark need not be the same type of
 * mark as this mark. (Note that for inheritance to be useful, properties with
 * the same name on different mark types should have equivalent meaning.)
 *
 * @param {pv.Mark} proto the new prototype.
 * @returns {pv.Mark} this mark.
 * @see #add
 */
pv.Mark.prototype.extend = function(proto) {
  this.proto = proto;
  return this;
};

/**
 * Adds a new mark of the specified type to the enclosing parent panel, whilst
 * simultaneously setting the prototype of the new mark to be this mark.
 *
 * @param {function} type the type of mark to add; a constructor, such as
 * <tt>pv.Bar</tt>.
 * @returns {pv.Mark} the new mark.
 * @see #extend
 */
pv.Mark.prototype.add = function(type) {
  return this.parent.add(type).extend(this);
};

/**
 * Defines a local variable on this mark. Local variables are initialized once
 * per mark (i.e., per parent panel instance), and can be used to store local
 * state for the mark. Here are a few reasons you might want to use
 * <tt>def</tt>:
 *
 * <p>1. To store local state. For example, say you were visualizing employment
 * statistics, and your root panel had an array of occupations. In a child
 * panel, you might want to initialize a local scale, and reference it from a
 * property function:
 *
 * <pre>.def("y", function(d) pv.Scale.linear(0, pv.max(d.values)).range(0, h))
 * .height(function(d) this.y()(d))</pre>
 *
 * In this example, <tt>this.y()</tt> returns the defined local scale. We then
 * invoke the scale function, passing in the datum, to compute the height.  Note
 * that defs are similar to fixed properties: they are only evaluated once per
 * parent panel, and <tt>this.y()</tt> returns a function, rather than
 * automatically evaluating this function as a property.
 *
 * <p>2. To store temporary state for interaction. Say you have an array of
 * bars, and you want to color the bar differently if the mouse is over it. Use
 * <tt>def</tt> to define a local variable, and event handlers to override this
 * variable interactively:
 *
 * <pre>.def("i", -1)
 * .event("mouseover", function() this.i(this.index))
 * .event("mouseout", function() this.i(-1))
 * .fillStyle(function() this.i() == this.index ? "red" : "blue")</pre>
 *
 * Notice that <tt>this.i()</tt> can be used both to set the value of <i>i</i>
 * (when an argument is specified), and to get the value of <i>i</i> (when no
 * arguments are specified). In this way, it's like other property methods.
 *
 * <p>3. To specify fixed properties efficiently. Sometimes, the value of a
 * property may be locally a constant, but dependent on parent panel data which
 * is variable. In this scenario, you can use <tt>def</tt> to define a property;
 * it will only get computed once per mark, rather than once per datum.
 *
 * @param {string} name the name of the local variable.
 * @param {function} [v] an optional initializer; may be a constant or a
 * function.
 */
pv.Mark.prototype.def = function(name, v) {
  this.propertyValue(name, v).type -= 2;
  return this;
};

/**
 * Returns an anchor with the specified name. While anchor names are typically
 * constants, the anchor name is a true property, which means you can specify a
 * function to compute the anchor name dynamically. See the
 * {@link pv.Anchor#name} property for details.
 *
 * @param {string} name the anchor name; either a string or a property function.
 * @returns {pv.Anchor} the new anchor.
 */
pv.Mark.prototype.anchor = function(name) {
  var target = this;
  return new pv.Anchor(this)
    .name(name)
    .data(function() {
        return target.scene.map(function(s) { return s.data; });
      })
    .visible(function() {
        return target.instance().visible;
      });
};

/**
 * Returns the anchor target of this mark, if it is derived from an anchor;
 * otherwise returns null. For example, if a label is derived from a bar anchor,
 *
 * <pre>bar.anchor("top").add(pv.Label);</pre>
 *
 * then property functions on the label can refer to the bar via the
 * <tt>anchorTarget</tt> method. This method is also useful for mark types
 * defining properties on custom anchors.
 *
 * @returns {pv.Mark} the anchor target of this mark; possibly null.
 */
pv.Mark.prototype.anchorTarget = function() {
  return this.proto.anchorTarget();
};

/**
 * Returns the current instance of this mark in the scene graph. This is
 * typically equivalent to <tt>this.scene[this.index]</tt>, however if the scene
 * or index is unset, the default instance of the mark is returned. If no
 * default is set, the default is the last instance. Similarly, if the scene or
 * index of the parent panel is unset, the default instance of this mark in the
 * last instance of the enclosing panel is returned, and so on.
 *
 * @returns a node in the scene graph.
 */
pv.Mark.prototype.instance = function(defaultIndex) {
  var scene = this.scene || this.parent.instance(-1).children[this.childIndex],
      index = !arguments.length || this.hasOwnProperty("index") ? this.index : defaultIndex;
  return scene[index < 0 ? scene.length - 1 : index];
};

/**
 * Returns the first instance of this mark in the scene graph. This method can
 * only be called when the mark is bound to the scene graph (for example, from
 * an event handler, or within a property function).
 *
 * @returns a node in the scene graph.
 */
pv.Mark.prototype.first = function() {
  return this.scene[0];
};

/**
 * Returns the last instance of this mark in the scene graph. This method can
 * only be called when the mark is bound to the scene graph (for example, from
 * an event handler, or within a property function). In addition, note that mark
 * instances are built sequentially, so the last instance of this mark may not
 * yet be constructed.
 *
 * @returns a node in the scene graph.
 */
pv.Mark.prototype.last = function() {
  return this.scene[this.scene.length - 1];
};

/**
 * Returns the previous instance of this mark in the scene graph, or null if
 * this is the first instance.
 *
 * @returns a node in the scene graph, or null.
 */
pv.Mark.prototype.sibling = function() {
  return (this.index == 0) ? null : this.scene[this.index - 1];
};

/**
 * Returns the current instance in the scene graph of this mark, in the previous
 * instance of the enclosing parent panel. May return null if this instance
 * could not be found. See the {@link pv.Layout.stack} function for an example
 * property function using cousin.
 *
 * @see pv.Layout.stack
 * @returns a node in the scene graph, or null.
 */
pv.Mark.prototype.cousin = function() {
  var p = this.parent, s = p && p.sibling();
  return (s && s.children) ? s.children[this.childIndex][this.index] : null;
};

/**
 * Renders this mark, including recursively rendering all child marks if this is
 * a panel.
 */
pv.Mark.prototype.render = function() {
  var parent = this.parent,
      stack = pv.Mark.stack;

  /* For the first render, take it from the top. */
  if (parent && !this.root.scene) {
    this.root.render();
    return;
  }

  /* Record the path to this mark. */
  var indexes = [];
  for (var mark = this; mark.parent; mark = mark.parent) {
    indexes.unshift(mark.childIndex);
  }

  /**
   * @private Finds all instances of this mark and renders them. This method
   * descends recursively to the level of the mark to be rendered, finding all
   * visible instances of the mark. After the marks are rendered, the scene and
   * index attributes are removed from the mark to restore them to a clean
   * state.
   *
   * <p>If an enclosing panel has an index property set (as is the case inside
   * in an event handler), then only instances of this mark inside the given
   * instance of the panel will be rendered; otherwise, all visible instances of
   * the mark will be rendered.
   */
  function render(mark, depth, scale) {
    mark.scale = scale;
    if (depth < indexes.length) {
      stack.unshift(null);
      if (mark.hasOwnProperty("index")) {
        renderInstance(mark, depth, scale);
      } else {
        for (var i = 0, n = mark.scene.length; i < n; i++) {
          mark.index = i;
          renderInstance(mark, depth, scale);
        }
        delete mark.index;
      }
      stack.shift();
    } else {
      mark.build();

      /*
       * In the update phase, the scene is rendered by creating and updating
       * elements and attributes in the SVG image. No properties are evaluated
       * during the update phase; instead the values computed previously in the
       * build phase are simply translated into SVG. The update phase is
       * decoupled (see pv.Scene) to allow different rendering engines.
       */
      pv.Scene.scale = scale;
      pv.Scene.updateAll(mark.scene);
    }
    delete mark.scale;
  }

  /**
   * @private Recursively renders the current instance of the specified mark.
   * This is slightly tricky because `index` and `scene` properties may or may
   * not already be set; if they are set, it means we are rendering only a
   * specific instance; if they are unset, we are rendering all instances.
   * Furthermore, we must preserve the original context of these properties when
   * rendering completes.
   *
   * <p>Another tricky aspect is that the `scene` attribute should be set for
   * any preceding children, so as to allow property chaining. This is
   * consistent with first-pass rendering.
   */
  function renderInstance(mark, depth, scale) {
    var s = mark.scene[mark.index], i;
    if (s.visible) {
      var childIndex = indexes[depth],
          child = mark.children[childIndex];

      /* Set preceding child scenes. */
      for (i = 0; i < childIndex; i++) {
        mark.children[i].scene = s.children[i];
      }

      /* Set current child scene, if necessary. */
      stack[0] = s.data;
      if (child.scene) {
        render(child, depth + 1, scale * s.transform.k);
      } else {
        child.scene = s.children[childIndex];
        render(child, depth + 1, scale * s.transform.k);
        delete child.scene;
      }

      /* Clear preceding child scenes. */
      for (i = 0; i < childIndex; i++) {
        delete mark.children[i].scene;
      }
    }
  }

  /* Bind this mark's property definitions. */
  this.bind();

  /* The render context is the first ancestor with an explicit index. */
  while (parent && !parent.hasOwnProperty("index")) parent = parent.parent;

  /* Recursively render all instances of this mark. */
  this.context(
      parent ? parent.scene : undefined,
      parent ? parent.index : -1,
      function() { render(this.root, 0, 1); });
};

/** @private Stores the current data stack. */
pv.Mark.stack = [];

/**
 * @private In the bind phase, inherited property definitions are cached so they
 * do not need to be queried during build.
 */
pv.Mark.prototype.bind = function() {
  var seen = {}, types = [[], [], [], []], data, visible;

  /** Scans the proto chain for the specified mark. */
  function bind(mark) {
    do {
      var properties = mark.$properties;
      for (var i = properties.length - 1; i >= 0 ; i--) {
        var p = properties[i];
        if (!(p.name in seen)) {
          seen[p.name] = 1;
          switch (p.name) {
            case "data": data = p; break;
            case "visible": visible = p; break;
            default: types[p.type].push(p); break;
          }
        }
      }
    } while (mark = mark.proto);
  }

  /** Returns a def setter-getter for the specified property. */
  function def(name) {
    return function(v) {
      var defs = this.scene.defs;
      if (arguments.length) {
        if (v == undefined) {
          delete defs.locked[name];
        } else {
          defs.locked[name] = true;
        }
        var c = pv.Mark.cast[name];
        defs.values[name] = ((v != null) && c) ? c(v) : v;
        return this;
      } else {
        return defs.values[name];
      }
    };
  }

  /* Scan the proto chain for all defined properties. */
  bind(this);
  bind(this.defaults);
  types[1].reverse();
  types[3].reverse();

  /* Any undefined properties are null. */
  var mark = this;
  do for (var name in mark.properties) {
    if (!(name in seen)) {
      seen[name] = 1;
      types[2].push({name: name, type: 2, value: null});
    }
  } while (mark = mark.proto);

  /* Define setter-getter for inherited defs. */
  var defs = types[0].concat(types[1]);
  for (var i = 0; i < defs.length; i++) {
    var d = defs[i];
    this[d.name] = def(d.name);
  }

  /* Setup binds to evaluate constants before functions. */
  this.binds = {
    data: data,
    defs: defs,
    required: [visible],
    optional: pv.blend(types)
  };
};

/**
 * @private Evaluates properties and computes implied properties. Properties are
 * stored in the {@link #scene} array for each instance of this mark.
 *
 * <p>As marks are built recursively, the {@link #index} property is updated to
 * match the current index into the data array for each mark. Note that the
 * index property is only set for the mark currently being built and its
 * enclosing parent panels. The index property for other marks is unset, but is
 * inherited from the global <tt>Mark</tt> class prototype. This allows mark
 * properties to refer to properties on other marks <i>in the same panel</i>
 * conveniently; however, in general it is better to reference mark instances
 * specifically through the scene graph rather than depending on the magical
 * behavior of {@link #index}.
 *
 * <p>The root scene array has a special property, <tt>data</tt>, which stores
 * the current data stack. The first element in this stack is the current datum,
 * followed by the datum of the enclosing parent panel, and so on. The data
 * stack should not be accessed directly; instead, property functions are passed
 * the current data stack as arguments.
 *
 * <p>The evaluation of the <tt>data</tt> and <tt>visible</tt> properties is
 * special. The <tt>data</tt> property is evaluated first; unlike the other
 * properties, the data stack is from the parent panel, rather than the current
 * mark, since the data is not defined until the data property is evaluated.
 * The <tt>visisble</tt> property is subsequently evaluated for each instance;
 * only if true will the {@link #buildInstance} method be called, evaluating
 * other properties and recursively building the scene graph.
 *
 * <p>If this mark is being re-built, any old instances of this mark that no
 * longer exist (because the new data array contains fewer elements) will be
 * cleared using {@link #clearInstance}.
 *
 * @param parent the instance of the parent panel from the scene graph.
 */
pv.Mark.prototype.build = function() {
  var scene = this.scene, stack = pv.Mark.stack;
  if (!scene) {
    scene = this.scene = [];
    scene.mark = this;
    scene.type = this.type;
    scene.childIndex = this.childIndex;
    if (this.parent) {
      scene.parent = this.parent.scene;
      scene.parentIndex = this.parent.index;
    }
  }

  /* Evaluate defs. */
  if (this.binds.defs.length) {
    var defs = scene.defs;
    if (!defs) scene.defs = defs = {values: {}, locked: {}};
    for (var i = 0; i < this.binds.defs.length; i++) {
      var d = this.binds.defs[i];
      if (!(d.name in defs.locked)) {
        defs.values[d.name] = d.type == 1
            ? d.value.apply(this, stack)
            : d.value;
      }
    }
  }

  /* Evaluate special data property. */
  var data = this.binds.data;
  switch (data.type) {
    case 0:
    case 1: data = defs.values.data; break;
    case 2: data = data.value; break;
    case 3: data = data.value.apply(this, stack); break;
  }

  /* Create, update and delete scene nodes. */
  stack.unshift(null);
  scene.length = data.length;
  for (var i = 0; i < data.length; i++) {
    pv.Mark.prototype.index = this.index = i;
    var s = scene[i];
    if (!s) scene[i] = s = {};
    s.data = stack[0] = data[i];
    this.buildInstance(s);
  }
  pv.Mark.prototype.index = -1;
  delete this.index;
  stack.shift();

  return this;
};

/**
 * @private Evaluates the specified array of properties for the specified
 * instance <tt>s</tt> in the scene graph.
 *
 * @param s a node in the scene graph; the instance of the mark to build.
 * @param properties an array of properties.
 */
pv.Mark.prototype.buildProperties = function(s, properties) {
  for (var i = 0, n = properties.length; i < n; i++) {
    var p = properties[i], v = p.value; // assume case 2 (constant)
    switch (p.type) {
      case 0:
      case 1: v = this.scene.defs.values[p.name]; break;
      case 3: v = v.apply(this, pv.Mark.stack); break;
    }
    s[p.name] = v;
  }
};

/**
 * @private Evaluates all of the properties for this mark for the specified
 * instance <tt>s</tt> in the scene graph. The set of properties to evaluate is
 * retrieved from the {@link #properties} array for this mark type (see {@link
 * #type}).  After these properties are evaluated, any <b>implied</b> properties
 * may be computed by the mark and set on the scene graph; see
 * {@link #buildImplied}.
 *
 * <p>For panels, this method recursively builds the scene graph for all child
 * marks as well. In general, this method should not need to be overridden by
 * concrete mark types.
 *
 * @param s a node in the scene graph; the instance of the mark to build.
 */
pv.Mark.prototype.buildInstance = function(s) {
  this.buildProperties(s, this.binds.required);
  if (s.visible) {
    this.buildProperties(s, this.binds.optional);
    this.buildImplied(s);
  }
};

/**
 * @private Computes the implied properties for this mark for the specified
 * instance <tt>s</tt> in the scene graph. Implied properties are those with
 * dependencies on multiple other properties; for example, the width property
 * may be implied if the left and right properties are set. This method can be
 * overridden by concrete mark types to define new implied properties, if
 * necessary.
 *
 * @param s a node in the scene graph; the instance of the mark to build.
 */
pv.Mark.prototype.buildImplied = function(s) {
  var l = s.left;
  var r = s.right;
  var t = s.top;
  var b = s.bottom;

  /* Assume width and height are zero if not supported by this mark type. */
  var p = this.properties;
  var w = p.width ? s.width : 0;
  var h = p.height ? s.height : 0;

  /* Compute implied width, right and left. */
  var width = this.parent ? this.parent.width() : (w + l + r);
  if (w == null) {
    w = width - (r = r || 0) - (l = l || 0);
  } else if (r == null) {
    r = width - w - (l = l || 0);
  } else if (l == null) {
    l = width - w - (r = r || 0);
  }

  /* Compute implied height, bottom and top. */
  var height = this.parent ? this.parent.height() : (h + t + b);
  if (h == null) {
    h = height - (t = t || 0) - (b = b || 0);
  } else if (b == null) {
    b = height - h - (t = t || 0);
  } else if (t == null) {
    t = height - h - (b = b || 0);
  }

  s.left = l;
  s.right = r;
  s.top = t;
  s.bottom = b;

  /* Only set width and height if they are supported by this mark type. */
  if (p.width) s.width = w;
  if (p.height) s.height = h;

  /* Set any null colors to pv.Color.transparent. */
  if (p.textStyle && !s.textStyle) s.textStyle = pv.Color.transparent;
  if (p.fillStyle && !s.fillStyle) s.fillStyle = pv.Color.transparent;
  if (p.strokeStyle && !s.strokeStyle) s.strokeStyle = pv.Color.transparent;
};

/**
 * Returns the current location of the mouse (cursor) relative to this mark's
 * parent. The <i>x</i> coordinate corresponds to the left margin, while the
 * <i>y</i> coordinate corresponds to the top margin.
 *
 * @returns {pv.Vector} the mouse location.
 */
pv.Mark.prototype.mouse = function() {
  var x = pv.event.pageX,
      y = pv.event.pageY,
      t = pv.Transform.identity,
      panel = (this instanceof pv.Panel) ? this : this.parent,
      node = this.root.canvas();
  do {
    x -= node.offsetLeft;
    y -= node.offsetTop;
  } while (node = node.offsetParent);
  do {
    t = t.translate(panel.left(), panel.top()).times(panel.transform());
  } while (panel = panel.parent);
  t = t.invert();
  return pv.vector(x * t.k + t.x, y * t.k + t.y);
};

/**
 * Registers an event handler for the specified event type with this mark. When
 * an event of the specified type is triggered, the specified handler will be
 * invoked. The handler is invoked in a similar method to property functions:
 * the context is <tt>this</tt> mark instance, and the arguments are the full
 * data stack. Event handlers can use property methods to manipulate the display
 * properties of the mark:
 *
 * <pre>m.event("click", function() this.fillStyle("red"));</pre>
 *
 * Alternatively, the external data can be manipulated and the visualization
 * redrawn:
 *
 * <pre>m.event("click", function(d) {
 *     data = all.filter(function(k) k.name == d);
 *     vis.render();
 *   });</pre>
 *
 * The return value of the event handler determines which mark gets re-rendered.
 * Use defs ({@link #def}) to set temporary state from event handlers.
 *
 * <p>The complete set of event types is defined by SVG; see the reference
 * below. The set of supported event types is:<ul>
 *
 * <li>click
 * <li>mousedown
 * <li>mouseup
 * <li>mouseover
 * <li>mousemove
 * <li>mouseout
 *
 * </ul>Since Protovis does not specify any concept of focus, it does not
 * support key events; these should be handled outside the visualization using
 * standard JavaScript. In the future, support for interaction may be extended
 * to support additional event types, particularly those most relevant to
 * interactive visualization, such as selection.
 *
 * <p>TODO In the current implementation, event handlers are not inherited from
 * prototype marks. They must be defined explicitly on each interactive mark. In
 * addition, only one event handler for a given event type can be defined; when
 * specifying multiple event handlers for the same type, only the last one will
 * be used.
 *
 * @see <a href="http://www.w3.org/TR/SVGTiny12/interact.html#SVGEvents">SVG events</a>
 * @param {string} type the event type.
 * @param {function} handler the event handler.
 * @returns {pv.Mark} this.
 */
pv.Mark.prototype.event = function(type, handler) {
  this.$handlers[type] = handler;
  return this;
};

/** @private Evaluates the function <i>f</i> with the specified context. */
pv.Mark.prototype.context = function(scene, index, f) {
  var proto = pv.Mark.prototype,
      stack = pv.Mark.stack,
      oscene = pv.Mark.scene,
      oindex = proto.index;

  /** @private Sets the context. */
  function apply(scene, index) {
    pv.Mark.scene = scene;
    proto.index = index;
    if (!scene) return;

    var that = scene.mark,
        mark = that,
        ancestors = [];

    /* Set ancestors' scene and index; populate data stack. */
    do {
      ancestors.push(mark);
      stack.push(scene[index].data);
      mark.index = index;
      mark.scene = scene;
      index = scene.parentIndex;
      scene = scene.parent;
    } while (mark = mark.parent);

    /* Set ancestors' scale; requires top-down. */
    for (var i = ancestors.length - 1, k = 1; i > 0; i--) {
      mark = ancestors[i];
      mark.scale = k *= mark.scene[mark.index].transform.k;
    }

    /* Set children's scene and scale. */
    if (that.children) for (var i = 0, n = that.children.length; i < n; i++) {
      mark = that.children[i];
      mark.scene = that.scene[that.index].children[i];
      mark.scale = k;
    }
  }

  /** @private Clears the context. */
  function clear(scene, index) {
    if (!scene) return;
    var that = scene.mark,
        mark;

    /* Reset children. */
    if (that.children) for (var i = 0, n = that.children.length; i < n; i++) {
      mark = that.children[i];
      delete mark.scene;
      delete mark.scale;
    }

    /* Reset ancestors. */
    mark = that;
    do {
      stack.pop();
      if (mark.parent) {
        delete mark.scene;
        delete mark.scale;
      }
      delete mark.index;
    } while (mark = mark.parent);
  }

  /* Context switch, invoke the function, then switch back. */
  clear(oscene, oindex);
  apply(scene, index);
  try {
    f.apply(this, stack);
  } finally {
    clear(scene, index);
    apply(oscene, oindex);
  }
};

/** @private Execute the event listener, then re-render. */
pv.Mark.dispatch = function(e, scene, index) {
  var m = scene.mark, p = scene.parent, l = m.$handlers[e.type];
  if (!l) return p && pv.Mark.dispatch(e, p, scene.parentIndex);
  m.context(scene, index, function() {
      m = l.apply(m, pv.Mark.stack);
      if (m && m.render) m.render();
      e.preventDefault();
    });
};
/**
 * Constructs a new mark anchor with default properties.
 *
 * @class Represents an anchor on a given mark. An anchor is itself a mark, but
 * without a visual representation. It serves only to provide useful default
 * properties that can be inherited by other marks. Each type of mark can define
 * any number of named anchors for convenience. If the concrete mark type does
 * not define an anchor implementation specifically, one will be inherited from
 * the mark's parent class.
 *
 * <p>For example, the bar mark provides anchors for its four sides: left,
 * right, top and bottom. Adding a label to the top anchor of a bar,
 *
 * <pre>bar.anchor("top").add(pv.Label);</pre>
 *
 * will render a text label on the top edge of the bar; the top anchor defines
 * the appropriate position properties (top and left), as well as text-rendering
 * properties for convenience (textAlign and textBaseline).
 *
 * @extends pv.Mark
 */
pv.Anchor = function(target) {
  pv.Mark.call(this);
  this.target = target;
  this.parent = target.parent;
};

pv.Anchor.prototype = pv.extend(pv.Mark)
    .property("name", String);

/**
 * The anchor name. The set of supported anchor names is dependent on the
 * concrete mark type; see the mark type for details. For example, bars support
 * left, right, top and bottom anchors.
 *
 * <p>While anchor names are typically constants, the anchor name is a true
 * property, which means you can specify a function to compute the anchor name
 * dynamically. For instance, if you wanted to alternate top and bottom anchors,
 * saying
 *
 * <pre>m.anchor(function() (this.index % 2) ? "top" : "bottom").add(pv.Dot);</pre>
 *
 * would have the desired effect.
 *
 * @type string
 * @name pv.Anchor.prototype.name
 */

pv.Anchor.prototype.anchorTarget = function() {
  return this.target;
};
/**
 * Constructs a new area mark with default properties. Areas are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents an area mark: the solid area between two series of
 * connected line segments. Unsurprisingly, areas are used most frequently for
 * area charts.
 *
 * <p>Just as a line represents a polyline, the <tt>Area</tt> mark type
 * represents a <i>polygon</i>. However, an area is not an arbitrary polygon;
 * vertices are paired either horizontally or vertically into parallel
 * <i>spans</i>, and each span corresponds to an associated datum. Either the
 * width or the height must be specified, but not both; this determines whether
 * the area is horizontally-oriented or vertically-oriented.  Like lines, areas
 * can be stroked and filled with arbitrary colors.
 *
 * <p>See also the <a href="../../api/Area.html">Area guide</a>.
 *
 * @extends pv.Mark
 */
pv.Area = function() {
  pv.Mark.call(this);
};

pv.Area.prototype = pv.extend(pv.Mark)
    .property("width", Number)
    .property("height", Number)
    .property("lineWidth", String)
    .property("strokeStyle", pv.color)
    .property("fillStyle", pv.color)
    .property("segmented", Boolean)
    .property("interpolate", String);

pv.Area.prototype.type = "area";

/**
 * The width of a given span, in pixels; used for horizontal spans. If the width
 * is specified, the height property should be 0 (the default). Either the top
 * or bottom property should be used to space the spans vertically, typically as
 * a multiple of the index.
 *
 * @type number
 * @name pv.Area.prototype.width
 */

/**
 * The height of a given span, in pixels; used for vertical spans. If the height
 * is specified, the width property should be 0 (the default). Either the left
 * or right property should be used to space the spans horizontally, typically
 * as a multiple of the index.
 *
 * @type number
 * @name pv.Area.prototype.height
 */

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the perimeter of the area. Unlike the
 * {@link Line} mark type, the entire perimeter is stroked, rather than just one
 * edge. The default value of this property is 1.5, but since the default stroke
 * style is null, area marks are not stroked by default.
 *
 * <p>This property is <i>fixed</i> for non-segmented areas. See
 * {@link pv.Mark}.
 *
 * @type number
 * @name pv.Area.prototype.lineWidth
 */

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the perimeter of the area. Unlike the {@link Line} mark type, the
 * entire perimeter is stroked, rather than just one edge. The default value of
 * this property is null, meaning areas are not stroked by default.
 *
 * <p>This property is <i>fixed</i> for non-segmented areas. See
 * {@link pv.Mark}.
 *
 * @type string
 * @name pv.Area.prototype.strokeStyle
 * @see pv.color
 */

/**
 * The area fill style; if non-null, the interior of the polygon forming the
 * area is filled with the specified color. The default value of this property
 * is a categorical color.
 *
 * <p>This property is <i>fixed</i> for non-segmented areas. See
 * {@link pv.Mark}.
 *
 * @type string
 * @name pv.Area.prototype.fillStyle
 * @see pv.color
 */

/**
 * Whether the area is segmented; whether variations in fill style, stroke
 * style, and the other properties are treated as fixed. Rendering segmented
 * areas is noticeably slower than non-segmented areas.
 *
 * <p>This property is <i>fixed</i>. See {@link pv.Mark}.
 *
 * @type boolean
 * @name pv.Area.prototype.segmented
 */

/**
 * How to interpolate between values. Linear interpolation ("linear") is the
 * default, producing a straight line between points. For piecewise constant
 * functions (i.e., step functions), either "step-before" or "step-after" can be
 * specified.
 *
 * <p>This property is <i>fixed</i>. See {@link pv.Mark}.
 *
 * @type string
 * @name pv.Area.prototype.interpolate
 */

/**
 * Default properties for areas. By default, there is no stroke and the fill
 * style is a categorical color.
 *
 * @type pv.Area
 */
pv.Area.prototype.defaults = new pv.Area()
    .extend(pv.Mark.prototype.defaults)
    .lineWidth(1.5)
    .fillStyle(pv.Colors.category20().by(pv.parent))
    .interpolate("linear");

/**
 * Constructs a new area anchor with default properties. Areas support five
 * different anchors:<ul>
 *
 * <li>top
 * <li>left
 * <li>center
 * <li>bottom
 * <li>right
 *
 * </ul>In addition to positioning properties (left, right, top bottom), the
 * anchors support text rendering properties (text-align, text-baseline). Text is
 * rendered to appear inside the area polygon.
 *
 * <p>To facilitate stacking of areas, the anchors are defined in terms of their
 * opposite edge. For example, the top anchor defines the bottom property, such
 * that the area grows upwards; the bottom anchor instead defines the top
 * property, such that the area grows downwards. Of course, in general it is
 * more robust to use panels and the cousin accessor to define stacked area
 * marks; see {@link pv.Mark#scene} for an example.
 *
 * @param {string} name the anchor name; either a string or a property function.
 * @returns {pv.Anchor}
 */
pv.Area.prototype.anchor = function(name) {
  var target = this;
  return pv.Mark.prototype.anchor.call(this, name)
    .left(function() {
        var s = target.instance();
        switch (this.name()) {
          case "bottom":
          case "top":
          case "center": return s.left + s.width / 2;
          case "right": return s.left + s.width;
        }
        return null;
      })
    .right(function() {
        var s = target.instance();
        switch (this.name()) {
          case "bottom":
          case "top":
          case "center": return s.right + s.width / 2;
          case "left": return s.right + s.width;
        }
        return null;
      })
    .top(function() {
        var s = target.instance();
        switch (this.name()) {
          case "left":
          case "right":
          case "center": return s.top + s.height / 2;
          case "bottom": return s.top + s.height;
        }
        return null;
      })
    .bottom(function() {
        var s = target.instance();
        switch (this.name()) {
          case "left":
          case "right":
          case "center": return s.bottom + s.height / 2;
          case "top": return s.bottom + s.height;
        }
        return null;
      })
    .textAlign(function() {
        var s = target.instance();
        switch (this.name()) {
          case "bottom":
          case "top":
          case "center": return "center";
          case "right": return "right";
        }
        return "left";
      })
    .textBaseline(function() {
        var s = target.instance();
        switch (this.name()) {
          case "right":
          case "left":
          case "center": return "middle";
          case "top": return "top";
        }
        return "bottom";
      });
};

/** @private Sets width and height to zero if null. */
pv.Area.prototype.buildImplied = function(s) {
  if (s.height == null) s.height = 0;
  if (s.width == null) s.width = 0;
  pv.Mark.prototype.buildImplied.call(this, s);
};

/** @private Records which properties may be fixed. */
pv.Area.fixed = {
  lineWidth: 1,
  strokeStyle: 1,
  fillStyle: 1,
  segmented: 1,
  interpolate: 1
};

/**
 * @private Make segmented required, such that this fixed property is always
 * evaluated, even if the first segment is not visible. Also cache which
 * properties are normally fixed.
 */
pv.Area.prototype.bind = function() {
  pv.Mark.prototype.bind.call(this);
  var binds = this.binds,
      required = binds.required,
      optional = binds.optional;
  for (var i = 0, n = optional.length; i < n; i++) {
    var p = optional[i];
    p.fixed = p.name in pv.Area.fixed;
    if (p.name == "segmented") {
      required.push(p);
      optional.splice(i, 1);
      i--;
      n--;
    }
  }

  /* Cache the original arrays so they can be restored on build. */
  this.binds.$required = required;
  this.binds.$optional = optional;
};

/**
 * @private Override the default build behavior such that fixed properties are
 * determined dynamically, based on the value of the (always) fixed segmented
 * property. Any fixed properties are only evaluated on the first instance,
 * although their values are propagated to subsequent instances, so that they
 * are available for property chaining and the like.
 */
pv.Area.prototype.buildInstance = function(s) {
  var binds = this.binds;

  /* Handle fixed properties on secondary instances. */
  if (this.index) {
    var fixed = binds.fixed;

    /* Determine which properties are fixed. */
    if (!fixed) {
      fixed = binds.fixed = [];
      function f(p) { return !p.fixed || (fixed.push(p), false); }
      binds.required = binds.required.filter(f);
      if (!this.scene[0].segmented) binds.optional = binds.optional.filter(f);
    }

    /* Copy fixed property values from the first instance. */
    for (var i = 0, n = fixed.length; i < n; i++) {
      var p = fixed[i].name;
      s[p] = this.scene[0][p];
    }
  }

  /* Evaluate all properties on the first instance. */
  else {
    binds.required = binds.$required;
    binds.optional = binds.$optional;
    binds.fixed = null;
  }

  pv.Mark.prototype.buildInstance.call(this, s);
};
/**
 * Constructs a new bar mark with default properties. Bars are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents a bar: an axis-aligned rectangle that can be stroked and
 * filled. Bars are used for many chart types, including bar charts, histograms
 * and Gantt charts. Bars can also be used as decorations, for example to draw a
 * frame border around a panel; in fact, a panel is a special type (a subclass)
 * of bar.
 *
 * <p>Bars can be positioned in several ways. Most commonly, one of the four
 * corners is fixed using two margins, and then the width and height properties
 * determine the extent of the bar relative to this fixed location. For example,
 * using the bottom and left properties fixes the bottom-left corner; the width
 * then extends to the right, while the height extends to the top. As an
 * alternative to the four corners, a bar can be positioned exclusively using
 * margins; this is convenient as an inset from the containing panel, for
 * example. See {@link pv.Mark} for details on the prioritization of redundant
 * positioning properties.
 *
 * <p>See also the <a href="../../api/Bar.html">Bar guide</a>.
 *
 * @extends pv.Mark
 */
pv.Bar = function() {
  pv.Mark.call(this);
};

pv.Bar.prototype = pv.extend(pv.Mark)
    .property("width", Number)
    .property("height", Number)
    .property("lineWidth", Number)
    .property("strokeStyle", pv.color)
    .property("fillStyle", pv.color);

pv.Bar.prototype.type = "bar";

/**
 * The width of the bar, in pixels. If the left position is specified, the bar
 * extends rightward from the left edge; if the right position is specified, the
 * bar extends leftward from the right edge.
 *
 * @type number
 * @name pv.Bar.prototype.width
 */

/**
 * The height of the bar, in pixels. If the bottom position is specified, the
 * bar extends upward from the bottom edge; if the top position is specified,
 * the bar extends downward from the top edge.
 *
 * @type number
 * @name pv.Bar.prototype.height
 */

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the bar's border.
 *
 * @type number
 * @name pv.Bar.prototype.lineWidth
 */

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the bar's border. The default value of this property is null, meaning
 * bars are not stroked by default.
 *
 * @type string
 * @name pv.Bar.prototype.strokeStyle
 * @see pv.color
 */

/**
 * The bar fill style; if non-null, the interior of the bar is filled with the
 * specified color. The default value of this property is a categorical color.
 *
 * @type string
 * @name pv.Bar.prototype.fillStyle
 * @see pv.color
 */

/**
 * Default properties for bars. By default, there is no stroke and the fill
 * style is a categorical color.
 *
 * @type pv.Bar
 */
pv.Bar.prototype.defaults = new pv.Bar()
    .extend(pv.Mark.prototype.defaults)
    .lineWidth(1.5)
    .fillStyle(pv.Colors.category20().by(pv.parent));

/**
 * Constructs a new bar anchor with default properties. Bars support five
 * different anchors:<ul>
 *
 * <li>top
 * <li>left
 * <li>center
 * <li>bottom
 * <li>right
 *
 * </ul>In addition to positioning properties (left, right, top bottom), the
 * anchors support text rendering properties (text-align, text-baseline). Text
 * is rendered to appear inside the bar.
 *
 * <p>To facilitate stacking of bars, the anchors are defined in terms of their
 * opposite edge. For example, the top anchor defines the bottom property, such
 * that the bar grows upwards; the bottom anchor instead defines the top
 * property, such that the bar grows downwards. Of course, in general it is more
 * robust to use panels and the cousin accessor to define stacked bars; see
 * {@link pv.Mark#scene} for an example.
 *
 * <p>Bar anchors also "smartly" specify position properties based on whether
 * the derived mark type supports the width and height properties. If the
 * derived mark type does not support these properties (e.g., dots), the
 * position will be centered on the corresponding edge. Otherwise (e.g., bars),
 * the position will be in the opposite side.
 *
 * @param {string} name the anchor name; either a string or a property function.
 * @returns {pv.Anchor}
 */
pv.Bar.prototype.anchor = function(name) {
  var target = this;
  return pv.Mark.prototype.anchor.call(this, name)
    .left(function() {
        var s = target.instance();
        switch (this.name()) {
          case "bottom":
          case "top":
          case "center": return s.left + (this.properties.width ? 0 : s.width / 2);
          case "right": return s.left + s.width;
        }
        return null;
      })
    .right(function() {
        var s = target.instance();
        switch (this.name()) {
          case "bottom":
          case "top":
          case "center": return s.right + (this.properties.width ? 0 : s.width / 2);
          case "left": return s.right + s.width;
        }
        return null;
      })
    .top(function() {
        var s = target.instance();
        switch (this.name()) {
          case "left":
          case "right":
          case "center": return s.top + (this.properties.height ? 0 : s.height / 2);
          case "bottom": return s.top + s.height;
        }
        return null;
      })
    .bottom(function() {
        var s = target.instance();
        switch (this.name()) {
          case "left":
          case "right":
          case "center": return s.bottom + (this.properties.height ? 0 : s.height / 2);
          case "top": return s.bottom + s.height;
        }
        return null;
      })
    .textAlign(function() {
        switch (this.name()) {
          case "bottom":
          case "top":
          case "center": return "center";
          case "right": return "right";
        }
        return "left";
      })
    .textBaseline(function() {
        switch (this.name()) {
          case "right":
          case "left":
          case "center": return "middle";
          case "top": return "top";
        }
        return "bottom";
      });
};
/**
 * Constructs a new dot mark with default properties. Dots are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents a dot; a dot is simply a sized glyph centered at a given
 * point that can also be stroked and filled. The <tt>size</tt> property is
 * proportional to the area of the rendered glyph to encourage meaningful visual
 * encodings. Dots can visually encode up to eight dimensions of data, though
 * this may be unwise due to integrality. See {@link pv.Mark} for details on the
 * prioritization of redundant positioning properties.
 *
 * <p>See also the <a href="../../api/Dot.html">Dot guide</a>.
 *
 * @extends pv.Mark
 */
pv.Dot = function() {
  pv.Mark.call(this);
};

pv.Dot.prototype = pv.extend(pv.Mark)
    .property("size", Number)
    .property("radius", Number)
    .property("shape", String)
    .property("angle", Number)
    .property("lineWidth", Number)
    .property("strokeStyle", pv.color)
    .property("fillStyle", pv.color);

pv.Dot.prototype.type = "dot";

/**
 * The size of the dot, in square pixels. Square pixels are used such that the
 * area of the dot is linearly proportional to the value of the size property,
 * facilitating representative encodings.
 *
 * @see #radius
 * @type number
 * @name pv.Dot.prototype.size
 */

/**
 * The shape name. Several shapes are supported:<ul>
 *
 * <li>cross
 * <li>triangle
 * <li>diamond
 * <li>square
 * <li>tick
 * <li>circle
 *
 * </ul>These shapes can be further changed using the {@link #angle} property;
 * for instance, a cross can be turned into a plus by rotating. Similarly, the
 * tick, which is vertical by default, can be rotated horizontally. Note that
 * some shapes (cross and tick) do not have interior areas, and thus do not
 * support fill style meaningfully.
 *
 * <p>Note: it may be more natural to use the {@link pv.Rule} mark for
 * horizontal and vertical ticks. The tick shape is only necessary if angled
 * ticks are needed.
 *
 * @type string
 * @name pv.Dot.prototype.shape
 */

/**
 * The rotation angle, in radians. Used to rotate shapes, such as to turn a
 * cross into a plus.
 *
 * @type number
 * @name pv.Dot.prototype.angle
 */

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the dot's shape.
 *
 * @type number
 * @name pv.Dot.prototype.lineWidth
 */

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the dot's shape. The default value of this property is a categorical
 * color.
 *
 * @type string
 * @name pv.Dot.prototype.strokeStyle
 * @see pv.color
 */

/**
 * The fill style; if non-null, the interior of the dot is filled with the
 * specified color. The default value of this property is null, meaning dots are
 * not filled by default.
 *
 * @type string
 * @name pv.Dot.prototype.fillStyle
 * @see pv.color
 */

/**
 * Default properties for dots. By default, there is no fill and the stroke
 * style is a categorical color. The default shape is "circle" with size 20.
 *
 * @type pv.Dot
 */
pv.Dot.prototype.defaults = new pv.Dot()
    .extend(pv.Mark.prototype.defaults)
    .size(20)
    .shape("circle")
    .lineWidth(1.5)
    .strokeStyle(pv.Colors.category10().by(pv.parent));

/**
 * Constructs a new dot anchor with default properties. Dots support five
 * different anchors:<ul>
 *
 * <li>top
 * <li>left
 * <li>center
 * <li>bottom
 * <li>right
 *
 * </ul>In addition to positioning properties (left, right, top bottom), the
 * anchors support text rendering properties (text-align, text-baseline). Text is
 * rendered to appear outside the dot. Note that this behavior is different from
 * other mark anchors, which default to rendering text <i>inside</i> the mark.
 *
 * <p>For consistency with the other mark types, the anchor positions are
 * defined in terms of their opposite edge. For example, the top anchor defines
 * the bottom property, such that a bar added to the top anchor grows upward.
 *
 * @param {string} name the anchor name; either a string or a property function.
 * @returns {pv.Anchor}
 */
pv.Dot.prototype.anchor = function(name) {
  var target = this;
  return pv.Mark.prototype.anchor.call(this, name)
    .left(function() {
        var s = target.instance();
        switch (this.name()) {
          case "bottom":
          case "top":
          case "center": return s.left;
          case "right": return s.left + s.radius;
        }
        return null;
      })
    .right(function() {
        var s = target.instance();
        switch (this.name()) {
          case "bottom":
          case "top":
          case "center": return s.right;
          case "left": return s.right + s.radius;
        }
        return null;
      })
    .top(function() {
        var s = target.instance();
        switch (this.name()) {
          case "left":
          case "right":
          case "center": return s.top;
          case "bottom": return s.top + s.radius;
        }
        return null;
      })
    .bottom(function() {
        var s = target.instance();
        switch (this.name()) {
          case "left":
          case "right":
          case "center": return s.bottom;
          case "top": return s.bottom + s.radius;
        }
        return null;
      })
    .textAlign(function() {
        switch (this.name()) {
          case "left": return "right";
          case "bottom":
          case "top":
          case "center": return "center";
        }
        return "left";
      })
    .textBaseline(function() {
        switch (this.name()) {
          case "right":
          case "left":
          case "center": return "middle";
          case "bottom": return "top";
        }
        return "bottom";
      });
};

/** @private Sets radius based on size or vice versa. */
pv.Dot.prototype.buildImplied = function(s) {
  if (s.radius == null) s.radius = Math.sqrt(s.size);
  else if (s.size == null) s.size = s.radius * s.radius;
  pv.Mark.prototype.buildImplied.call(this, s);
};
/**
 * Constructs a new label mark with default properties. Labels are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents a text label, allowing textual annotation of other marks or
 * arbitrary text within the visualization. The character data must be plain
 * text (unicode), though the text can be styled using the {@link #font}
 * property. If rich text is needed, external HTML elements can be overlaid on
 * the canvas by hand.
 *
 * <p>Labels are positioned using the box model, similarly to {@link Dot}. Thus,
 * a label has no width or height, but merely a text anchor location. The text
 * is positioned relative to this anchor location based on the
 * {@link #textAlign}, {@link #textBaseline} and {@link #textMargin} properties.
 * Furthermore, the text may be rotated using {@link #textAngle}.
 *
 * <p>Labels ignore events, so as to not interfere with event handlers on
 * underlying marks, such as bars. In the future, we may support event handlers
 * on labels.
 *
 * <p>See also the <a href="../../api/Label.html">Label guide</a>.
 *
 * @extends pv.Mark
 */
pv.Label = function() {
  pv.Mark.call(this);
};

pv.Label.prototype = pv.extend(pv.Mark)
    .property("text", String)
    .property("font", String)
    .property("textAngle", Number)
    .property("textStyle", pv.color)
    .property("textAlign", String)
    .property("textBaseline", String)
    .property("textMargin", Number)
    .property("textDecoration", String)
    .property("textShadow", String);

pv.Label.prototype.type = "label";

/**
 * The character data to render; a string. The default value of the text
 * property is the identity function, meaning the label's associated datum will
 * be rendered using its <tt>toString</tt>.
 *
 * @type string
 * @name pv.Label.prototype.text
 */

/**
 * The font format, per the CSS Level 2 specification. The default font is "10px
 * sans-serif", for consistency with the HTML 5 canvas element specification.
 * Note that since text is not wrapped, any line-height property will be
 * ignored. The other font-style, font-variant, font-weight, font-size and
 * font-family properties are supported.
 *
 * @see <a href="http://www.w3.org/TR/CSS2/fonts.html#font-shorthand">CSS2 fonts</a>
 * @type string
 * @name pv.Label.prototype.font
 */

/**
 * The rotation angle, in radians. Text is rotated clockwise relative to the
 * anchor location. For example, with the default left alignment, an angle of
 * Math.PI / 2 causes text to proceed downwards. The default angle is zero.
 *
 * @type number
 * @name pv.Label.prototype.textAngle
 */

/**
 * The text color. The name "textStyle" is used for consistency with "fillStyle"
 * and "strokeStyle", although it might be better to rename this property (and
 * perhaps use the same name as "strokeStyle"). The default color is black.
 *
 * @type string
 * @name pv.Label.prototype.textStyle
 * @see pv.color
 */

/**
 * The horizontal text alignment. One of:<ul>
 *
 * <li>left
 * <li>center
 * <li>right
 *
 * </ul>The default horizontal alignment is left.
 *
 * @type string
 * @name pv.Label.prototype.textAlign
 */

/**
 * The vertical text alignment. One of:<ul>
 *
 * <li>top
 * <li>middle
 * <li>bottom
 *
 * </ul>The default vertical alignment is bottom.
 *
 * @type string
 * @name pv.Label.prototype.textBaseline
 */

/**
 * The text margin; may be specified in pixels, or in font-dependent units (such
 * as ".1ex"). The margin can be used to pad text away from its anchor location,
 * in a direction dependent on the horizontal and vertical alignment
 * properties. For example, if the text is left- and middle-aligned, the margin
 * shifts the text to the right. The default margin is 3 pixels.
 *
 * @type number
 * @name pv.Label.prototype.textMargin
 */

/**
 * A list of shadow effects to be applied to text, per the CSS Text Level 3
 * text-shadow property. An example specification is "0.1em 0.1em 0.1em
 * rgba(0,0,0,.5)"; the first length is the horizontal offset, the second the
 * vertical offset, and the third the blur radius.
 *
 * @see <a href="http://www.w3.org/TR/css3-text/#text-shadow">CSS3 text</a>
 * @type string
 * @name pv.Label.prototype.textShadow
 */

/**
 * A list of decoration to be applied to text, per the CSS Text Level 3
 * text-decoration property. An example specification is "underline".
 *
 * @see <a href="http://www.w3.org/TR/css3-text/#text-decoration">CSS3 text</a>
 * @type string
 * @name pv.Label.prototype.textDecoration
 */

/**
 * Default properties for labels. See the individual properties for the default
 * values.
 *
 * @type pv.Label
 */
pv.Label.prototype.defaults = new pv.Label()
    .extend(pv.Mark.prototype.defaults)
    .text(pv.identity)
    .font("10px sans-serif")
    .textAngle(0)
    .textStyle("black")
    .textAlign("left")
    .textBaseline("bottom")
    .textMargin(3);
/**
 * Constructs a new line mark with default properties. Lines are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents a series of connected line segments, or <i>polyline</i>,
 * that can be stroked with a configurable color and thickness. Each
 * articulation point in the line corresponds to a datum; for <i>n</i> points,
 * <i>n</i>-1 connected line segments are drawn. The point is positioned using
 * the box model. Arbitrary paths are also possible, allowing radar plots and
 * other custom visualizations.
 *
 * <p>Like areas, lines can be stroked and filled with arbitrary colors. In most
 * cases, lines are only stroked, but the fill style can be used to construct
 * arbitrary polygons.
 *
 * <p>See also the <a href="../../api/Line.html">Line guide</a>.
 *
 * @extends pv.Mark
 */
pv.Line = function() {
  pv.Mark.call(this);
};

pv.Line.prototype = pv.extend(pv.Mark)
    .property("lineWidth", Number)
    .property("strokeStyle", pv.color)
    .property("fillStyle", pv.color)
    .property("segmented", Boolean)
    .property("interpolate", String);

pv.Line.prototype.type = "line";

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the line.
 *
 * @type number
 * @name pv.Line.prototype.lineWidth
 */

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the line. The default value of this property is a categorical color.
 *
 * @type string
 * @name pv.Line.prototype.strokeStyle
 * @see pv.color
 */

/**
 * The line fill style; if non-null, the interior of the line is closed and
 * filled with the specified color. The default value of this property is a
 * null, meaning that lines are not filled by default.
 *
 * @type string
 * @name pv.Line.prototype.fillStyle
 * @see pv.color
 */

/**
 * Whether the line is segmented; whether variations in stroke style, line width
 * and the other properties are treated as fixed. Rendering segmented lines is
 * noticeably slower than non-segmented lines.
 *
 * <p>This property is <i>fixed</i>. See {@link pv.Mark}.
 *
 * @type boolean
 * @name pv.Line.prototype.segmented
 */

/**
 * How to interpolate between values. Linear interpolation ("linear") is the
 * default, producing a straight line between points. For piecewise constant
 * functions (i.e., step functions), either "step-before" or "step-after" can be
 * specified. To draw a clockwise circular arc between points, specify "polar".
 *
 * <p>This property is <i>fixed</i>. See {@link pv.Mark}.
 *
 * @type string
 * @name pv.Line.prototype.interpolate
 */

/**
 * Default properties for lines. By default, there is no fill and the stroke
 * style is a categorical color. The default interpolation is linear.
 *
 * @type pv.Line
 */
pv.Line.prototype.defaults = new pv.Line()
    .extend(pv.Mark.prototype.defaults)
    .lineWidth(1.5)
    .strokeStyle(pv.Colors.category10().by(pv.parent))
    .interpolate("linear");

/** @private Reuse Area's implementation for segmented bind & build. */
pv.Line.prototype.bind = pv.Area.prototype.bind;
pv.Line.prototype.buildInstance = pv.Area.prototype.buildInstance;
/**
 * Constructs a new rule with default properties. Rules are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents a horizontal or vertical rule. Rules are frequently used
 * for axes and grid lines. For example, specifying only the bottom property
 * draws horizontal rules, while specifying only the left draws vertical
 * rules. Rules can also be used as thin bars. The visual style is controlled in
 * the same manner as lines.
 *
 * <p>Rules are positioned exclusively the standard box model properties. The
 * following combinations of properties are supported:
 *
 * <table>
 * <thead><th style="width:12em;">Properties</th><th>Orientation</th></thead>
 * <tbody>
 * <tr><td>left</td><td>vertical</td></tr>
 * <tr><td>right</td><td>vertical</td></tr>
 * <tr><td>left, bottom, top</td><td>vertical</td></tr>
 * <tr><td>right, bottom, top</td><td>vertical</td></tr>
 * <tr><td>top</td><td>horizontal</td></tr>
 * <tr><td>bottom</td><td>horizontal</td></tr>
 * <tr><td>top, left, right</td><td>horizontal</td></tr>
 * <tr><td>bottom, left, right</td><td>horizontal</td></tr>
 * <tr><td>left, top, height</td><td>vertical</td></tr>
 * <tr><td>left, bottom, height</td><td>vertical</td></tr>
 * <tr><td>right, top, height</td><td>vertical</td></tr>
 * <tr><td>right, bottom, height</td><td>vertical</td></tr>
 * <tr><td>left, top, width</td><td>horizontal</td></tr>
 * <tr><td>left, bottom, width</td><td>horizontal</td></tr>
 * <tr><td>right, top, width</td><td>horizontal</td></tr>
 * <tr><td>right, bottom, width</td><td>horizontal</td></tr>
 * </tbody>
 * </table>
 *
 * <p>Small rules can be used as tick marks; alternatively, a {@link Dot} with
 * the "tick" shape can be used.
 *
 * <p>See also the <a href="../../api/Rule.html">Rule guide</a>.
 *
 * @see pv.Line
 * @extends pv.Mark
 */
pv.Rule = function() {
  pv.Mark.call(this);
};

pv.Rule.prototype = pv.extend(pv.Mark)
    .property("width", Number)
    .property("height", Number)
    .property("lineWidth", Number)
    .property("strokeStyle", pv.color);

pv.Rule.prototype.type = "rule";

/**
 * The width of the rule, in pixels. If the left position is specified, the rule
 * extends rightward from the left edge; if the right position is specified, the
 * rule extends leftward from the right edge.
 *
 * @type number
 * @name pv.Rule.prototype.width
 */

/**
 * The height of the rule, in pixels. If the bottom position is specified, the
 * rule extends upward from the bottom edge; if the top position is specified,
 * the rule extends downward from the top edge.
 *
 * @type number
 * @name pv.Rule.prototype.height
 */

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the rule. The default value is 1 pixel.
 *
 * @type number
 * @name pv.Rule.prototype.lineWidth
 */

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the rule. The default value of this property is black.
 *
 * @type string
 * @name pv.Rule.prototype.strokeStyle
 * @see pv.color
 */

/**
 * Default properties for rules. By default, a single-pixel black line is
 * stroked.
 *
 * @type pv.Rule
 */
pv.Rule.prototype.defaults = new pv.Rule()
    .extend(pv.Mark.prototype.defaults)
    .lineWidth(1)
    .strokeStyle("black");

/**
 * Constructs a new rule anchor with default properties. Rules support five
 * different anchors:<ul>
 *
 * <li>top
 * <li>left
 * <li>center
 * <li>bottom
 * <li>right
 *
 * </ul>In addition to positioning properties (left, right, top bottom), the
 * anchors support text rendering properties (text-align, text-baseline). Text is
 * rendered to appear outside the rule. Note that this behavior is different
 * from other mark anchors, which default to rendering text <i>inside</i> the
 * mark.
 *
 * <p>For consistency with the other mark types, the anchor positions are
 * defined in terms of their opposite edge. For example, the top anchor defines
 * the bottom property, such that a bar added to the top anchor grows upward.
 *
 * @param {string} name the anchor name; either a string or a property function.
 * @returns {pv.Anchor}
 */
pv.Rule.prototype.anchor = function(name) {
  return pv.Bar.prototype.anchor.call(this, name)
    .textAlign(function(d) {
        switch (this.name()) {
          case "left": return "right";
          case "bottom":
          case "top":
          case "center": return "center";
          case "right": return "left";
        }
      })
    .textBaseline(function(d) {
        switch (this.name()) {
          case "right":
          case "left":
          case "center": return "middle";
          case "top": return "bottom";
          case "bottom": return "top";
        }
      });
};

/** @private Sets width or height based on orientation. */
pv.Rule.prototype.buildImplied = function(s) {
  var l = s.left, r = s.right, t = s.top, b = s.bottom;

  /* Determine horizontal or vertical orientation. */
  if ((s.width != null)
      || ((l == null) && (r == null))
      || ((r != null) && (l != null))) {
    s.height = 0;
  } else {
    s.width = 0;
  }

  pv.Mark.prototype.buildImplied.call(this, s);
};
/**
 * Constructs a new, empty panel with default properties. Panels, with the
 * exception of the root panel, are not typically constructed directly; instead,
 * they are added to an existing panel or mark via {@link pv.Mark#add}.
 *
 * @class Represents a container mark. Panels allow repeated or nested
 * structures, commonly used in small multiple displays where a small
 * visualization is tiled to facilitate comparison across one or more
 * dimensions. Other types of visualizations may benefit from repeated and
 * possibly overlapping structure as well, such as stacked area charts. Panels
 * can also offset the position of marks to provide padding from surrounding
 * content.
 *
 * <p>All Protovis displays have at least one panel; this is the root panel to
 * which marks are rendered. The box model properties (four margins, width and
 * height) are used to offset the positions of contained marks. The data
 * property determines the panel count: a panel is generated once per associated
 * datum. When nested panels are used, property functions can declare additional
 * arguments to access the data associated with enclosing panels.
 *
 * <p>Panels can be rendered inline, facilitating the creation of sparklines.
 * This allows designers to reuse browser layout features, such as text flow and
 * tables; designers can also overlay HTML elements such as rich text and
 * images.
 *
 * <p>All panels have a <tt>children</tt> array (possibly empty) containing the
 * child marks in the order they were added. Panels also have a <tt>root</tt>
 * field which points to the root (outermost) panel; the root panel's root field
 * points to itself.
 *
 * <p>See also the <a href="../../api/">Protovis guide</a>.
 *
 * @extends pv.Bar
 */
pv.Panel = function() {
  pv.Bar.call(this);

  /**
   * The child marks; zero or more {@link pv.Mark}s in the order they were
   * added.
   *
   * @see #add
   * @type pv.Mark[]
   */
  this.children = [];
  this.root = this;

  /**
   * The internal $dom field is set by the Protovis loader; see lang/init.js. It
   * refers to the script element that contains the Protovis specification, so
   * that the panel knows where in the DOM to insert the generated SVG element.
   *
   * @private
   */
  this.$dom = pv.$ && pv.$.s;
};

pv.Panel.prototype = pv.extend(pv.Bar)
    .property("transform")
    .property("overflow", String)
    .property("canvas", function(c) {
        return (typeof c == "string")
            ? document.getElementById(c)
            : c; // assume that c is the passed-in element
      });

pv.Panel.prototype.type = "panel";

/**
 * The canvas element; either the string ID of the canvas element in the current
 * document, or a reference to the canvas element itself. If null, a canvas
 * element will be created and inserted into the document at the location of the
 * script element containing the current Protovis specification. This property
 * only applies to root panels and is ignored on nested panels.
 *
 * <p>Note: the "canvas" element here refers to a <tt>div</tt> (or other suitable
 * HTML container element), <i>not</i> a <tt>canvas</tt> element. The name of
 * this property is a historical anachronism from the first implementation that
 * used HTML 5 canvas, rather than SVG.
 *
 * @type string
 * @name pv.Panel.prototype.canvas
 */

/**
 * Specifies whether child marks are clipped when they overflow this panel.
 * This affects the clipping of all this panel's descendant marks.
 *
 * @type string
 * @name pv.Panel.prototype.overflow
 * @see http://www.w3.org/TR/CSS2/visufx.html#overflow
 */

/**
 * The transform to be applied to child marks. The default transform is
 * identity, which has no effect. Note that the panel's own fill and stroke are
 * not affected by the transform, and panel's transform only affects the
 * <tt>scale</tt> of child marks, not the panel itself.
 *
 * @type pv.Transform
 * @name pv.Panel.prototype.transform
 * @see pv.Mark.prototype.scale
 */

/**
 * Default properties for panels. By default, the margins are zero, the fill
 * style is transparent.
 *
 * @type pv.Panel
 */
pv.Panel.prototype.defaults = new pv.Panel()
    .extend(pv.Bar.prototype.defaults)
    .fillStyle(null) // override Bar default
    .overflow("visible");

/**
 * Returns an anchor with the specified name. This method is overridden since
 * the behavior of Panel anchors is slightly different from normal anchors:
 * adding to an anchor adds to the anchor target's, rather than the anchor
 * target's parent. To avoid double margins, we override the anchor's proto so
 * that the margins are zero.
 *
 * @param {string} name the anchor name; either a string or a property function.
 * @returns {pv.Anchor} the new anchor.
 */
pv.Panel.prototype.anchor = function(name) {

  /* A "view" of this panel whose margins appear to be zero. */
  function target() { return 0; }
  target.prototype = pv.extend(this);
  target.prototype.parent = this;
  target.prototype.left
      = target.prototype.right
      = target.prototype.top
      = target.prototype.bottom = target;

  return pv.Bar.prototype.anchor.call(new target(), name)
    .data(function(d) { return [d]; });
};

/**
 * Adds a new mark of the specified type to this panel. Unlike the normal
 * {@link Mark#add} behavior, adding a mark to a panel does not cause the mark
 * to inherit from the panel. Since the contained marks are offset by the panel
 * margins already, inheriting properties is generally undesirable; of course,
 * it is always possible to change this behavior by calling {@link Mark#extend}
 * explicitly.
 *
 * @param {function} type the type of the new mark to add.
 * @returns {pv.Mark} the new mark.
 */
pv.Panel.prototype.add = function(type) {
  var child = new type();
  child.parent = this;
  child.root = this.root;
  child.childIndex = this.children.length;
  this.children.push(child);
  return child;
};

/** @private Bind this panel, then any child marks recursively. */
pv.Panel.prototype.bind = function() {
  pv.Mark.prototype.bind.call(this);
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].bind();
  }
};

/**
 * @private Evaluates all of the properties for this panel for the specified
 * instance <tt>s</tt> in the scene graph, including recursively building the
 * scene graph for child marks.
 *
 * @param s a node in the scene graph; the instance of the panel to build.
 * @see Mark#scene
 */
pv.Panel.prototype.buildInstance = function(s) {
  pv.Bar.prototype.buildInstance.call(this, s);
  if (!s.visible) return;
  if (!s.children) s.children = [];

  /*
   * Multiply the current scale factor by this panel's transform. Also clear the
   * default index as we recurse into child marks; it will be reset to the
   * current index when the next panel instance is built.
   */
  var scale = this.scale * s.transform.k, child, n = this.children.length;
  pv.Mark.prototype.index = -1;

  /*
   * Build each child, passing in the parent (this panel) scene graph node. The
   * child mark's scene is initialized from the corresponding entry in the
   * existing scene graph, such that properties from the previous build can be
   * reused; this is largely to facilitate the recycling of SVG elements.
   */
  for (var i = 0; i < n; i++) {
    child = this.children[i];
    child.scene = s.children[i]; // possibly undefined
    child.scale = scale;
    child.build();
  }

  /*
   * Once the child marks have been built, the new scene graph nodes are removed
   * from the child marks and placed into the scene graph. The nodes cannot
   * remain on the child nodes because this panel (or a parent panel) may be
   * instantiated multiple times!
   */
  for (var i = 0; i < n; i++) {
    child = this.children[i];
    s.children[i] = child.scene;
    delete child.scene;
    delete child.scale;
  }

  /* Delete any expired child scenes. */
  s.children.length = n;
};

/**
 * @private Computes the implied properties for this panel for the specified
 * instance <tt>s</tt> in the scene graph. Panels have two implied
 * properties:<ul>
 *
 * <li>The <tt>canvas</tt> property references the DOM element, typically a DIV,
 * that contains the SVG element that is used to display the visualization. This
 * property may be specified as a string, referring to the unique ID of the
 * element in the DOM. The string is converted to a reference to the DOM
 * element. The width and height of the SVG element is inferred from this DOM
 * element. If no canvas property is specified, a new SVG element is created and
 * inserted into the document, using the panel dimensions; see
 * {@link #createCanvas}.
 *
 * <li>The <tt>children</tt> array, while not a property per se, contains the
 * scene graph for each child mark. This array is initialized to be empty, and
 * is populated above in {@link #buildInstance}.
 *
 * </ul>The current implementation creates the SVG element, if necessary, during
 * the build phase; in the future, it may be preferrable to move this to the
 * update phase, although then the canvas property would be undefined. In
 * addition, DOM inspection is necessary to define the implied width and height
 * properties that may be inferred from the DOM.
 *
 * @param s a node in the scene graph; the instance of the panel to build.
 */
pv.Panel.prototype.buildImplied = function(s) {
  if (!this.parent) {
    var c = s.canvas;
    if (c) {
      /* Clear the container if it's not associated with this panel. */
      if (c.$panel != this) {
        c.$panel = this;
        while (c.lastChild) c.removeChild(c.lastChild);
      }

      /* If width and height weren't specified, inspect the container. */
      var w, h;
      if (s.width == null) {
        w = parseFloat(pv.css(c, "width"));
        s.width = w - s.left - s.right;
      }
      if (s.height == null) {
        h = parseFloat(pv.css(c, "height"));
        s.height = h - s.top - s.bottom;
      }
    } else {
      var cache = this.$canvas || (this.$canvas = []);
      if (!(c = cache[this.index])) {
        c = cache[this.index] = document.createElement("span");
        if (this.$dom) { // script element for text/javascript+protovis
          this.$dom.parentNode.insertBefore(c, this.$dom);
        } else { // find the last element in the body
          var n = document.body;
          while (n.lastChild && n.lastChild.tagName) n = n.lastChild;
          if (n != document.body) n = n.parentNode;
          n.appendChild(c);
        }
      }
    }
    s.canvas = c;
  }
  if (!s.transform) s.transform = pv.Transform.identity;
  pv.Mark.prototype.buildImplied.call(this, s);
};
/**
 * Constructs a new dot mark with default properties. Images are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents an image. Images share the same layout and style properties as
 * bars, in conjunction with an external image such as PNG or JPEG. The image is
 * specified via the {@link #url} property. The fill, if specified, appears
 * beneath the image, while the optional stroke appears above the image.
 *
 * <p>TODO Restore support for dynamic images (such as heatmaps). These were
 * supported in the canvas implementation using the pixel buffer API; although
 * SVG does not support pixel manipulation, it is possible to embed a canvas
 * element in SVG using foreign objects.
 *
 * <p>TODO Allow different modes of image placement: "scale" -- scale and
 * preserve aspect ratio, "tile" -- repeat the image, "center" -- center the
 * image, "fill" -- scale without preserving aspect ratio.
 *
 * <p>See {@link pv.Bar} for details on positioning properties.
 *
 * @extends pv.Bar
 */
pv.Image = function() {
  pv.Bar.call(this);
};

pv.Image.prototype = pv.extend(pv.Bar)
    .property("url", String);

pv.Image.prototype.type = "image";

/**
 * The URL of the image to display. The set of supported image types is
 * browser-dependent; PNG and JPEG are recommended.
 *
 * @type string
 * @name pv.Image.prototype.url
 */

/**
 * Default properties for images. By default, there is no stroke or fill style.
 *
 * @type pv.Image
 */
pv.Image.prototype.defaults = new pv.Image()
    .extend(pv.Bar.prototype.defaults)
    .fillStyle(null);
/**
 * Constructs a new wedge with default properties. Wedges are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents a wedge, or pie slice. Specified in terms of start and end
 * angle, inner and outer radius, wedges can be used to construct donut charts
 * and polar bar charts as well. If the {@link #angle} property is used, the end
 * angle is implied by adding this value to start angle. By default, the start
 * angle is the previously-generated wedge's end angle. This design allows
 * explicit control over the wedge placement if desired, while offering
 * convenient defaults for the construction of radial graphs.
 *
 * <p>The center point of the circle is positioned using the standard box model.
 * The wedge can be stroked and filled, similar to {link Bar}.
 *
 * <p>See also the <a href="../../api/Wedge.html">Wedge guide</a>.
 *
 * @extends pv.Mark
 */
pv.Wedge = function() {
  pv.Mark.call(this);
};

pv.Wedge.prototype = pv.extend(pv.Mark)
    .property("startAngle", Number)
    .property("endAngle", Number)
    .property("angle", Number)
    .property("innerRadius", Number)
    .property("outerRadius", Number)
    .property("lineWidth", Number)
    .property("strokeStyle", pv.color)
    .property("fillStyle", pv.color);

pv.Wedge.prototype.type = "wedge";

/**
 * The start angle of the wedge, in radians. The start angle is measured
 * clockwise from the 3 o'clock position. The default value of this property is
 * the end angle of the previous instance (the {@link Mark#sibling}), or -PI / 2
 * for the first wedge; for pie and donut charts, typically only the
 * {@link #angle} property needs to be specified.
 *
 * @type number
 * @name pv.Wedge.prototype.startAngle
 */

/**
 * The end angle of the wedge, in radians. If not specified, the end angle is
 * implied as the start angle plus the {@link #angle}.
 *
 * @type number
 * @name pv.Wedge.prototype.endAngle
 */

/**
 * The angular span of the wedge, in radians. This property is used if end angle
 * is not specified.
 *
 * @type number
 * @name pv.Wedge.prototype.angle
 */

/**
 * The inner radius of the wedge, in pixels. The default value of this property
 * is zero; a positive value will produce a donut slice rather than a pie slice.
 * The inner radius can vary per-wedge.
 *
 * @type number
 * @name pv.Wedge.prototype.innerRadius
 */

/**
 * The outer radius of the wedge, in pixels. This property is required. For
 * pies, only this radius is required; for donuts, the inner radius must be
 * specified as well. The outer radius can vary per-wedge.
 *
 * @type number
 * @name pv.Wedge.prototype.outerRadius
 */

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the wedge's border.
 *
 * @type number
 * @name pv.Wedge.prototype.lineWidth
 */

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the wedge's border. The default value of this property is null,
 * meaning wedges are not stroked by default.
 *
 * @type string
 * @name pv.Wedge.prototype.strokeStyle
 * @see pv.color
 */

/**
 * The wedge fill style; if non-null, the interior of the wedge is filled with
 * the specified color. The default value of this property is a categorical
 * color.
 *
 * @type string
 * @name pv.Wedge.prototype.fillStyle
 * @see pv.color
 */

/**
 * Default properties for wedges. By default, there is no stroke and the fill
 * style is a categorical color.
 *
 * @type pv.Wedge
 */
pv.Wedge.prototype.defaults = new pv.Wedge()
    .extend(pv.Mark.prototype.defaults)
    .startAngle(function() {
        var s = this.sibling();
        return s ? s.endAngle : -Math.PI / 2;
      })
    .innerRadius(0)
    .lineWidth(1.5)
    .strokeStyle(null)
    .fillStyle(pv.Colors.category20().by(pv.index));

/**
 * Returns the mid-radius of the wedge, which is defined as half-way between the
 * inner and outer radii.
 *
 * @see #innerRadius
 * @see #outerRadius
 * @returns {number} the mid-radius, in pixels.
 */
pv.Wedge.prototype.midRadius = function() {
  return (this.innerRadius() + this.outerRadius()) / 2;
};

/**
 * Returns the mid-angle of the wedge, which is defined as half-way between the
 * start and end angles.
 *
 * @see #startAngle
 * @see #endAngle
 * @returns {number} the mid-angle, in radians.
 */
pv.Wedge.prototype.midAngle = function() {
  return (this.startAngle() + this.endAngle()) / 2;
};

/**
 * Constructs a new wedge anchor with default properties. Wedges support five
 * different anchors:<ul>
 *
 * <li>outer
 * <li>inner
 * <li>center
 * <li>start
 * <li>end
 *
 * </ul>In addition to positioning properties (left, right, top bottom), the
 * anchors support text rendering properties (text-align, text-baseline,
 * textAngle). Text is rendered to appear inside the wedge.
 *
 * @param {string} name the anchor name; either a string or a property function.
 * @returns {pv.Anchor}
 */
pv.Wedge.prototype.anchor = function(name) {
  var target = this;
  return pv.Mark.prototype.anchor.call(this, name)
    .left(function() {
        var s = target.instance();
        switch (this.name()) {
          case "outer": return s.left + s.outerRadius * Math.cos(s.midAngle);
          case "inner": return s.left + s.innerRadius * Math.cos(s.midAngle);
          case "start": return s.left + s.midRadius * Math.cos(s.startAngle);
          case "center": return s.left + s.midRadius * Math.cos(s.midAngle);
          case "end": return s.left + s.midRadius * Math.cos(s.endAngle);
        }
      })
    .right(function() {
        var s = target.instance();
        switch (this.name()) {
          case "outer": return s.right + s.outerRadius * Math.cos(s.midAngle);
          case "inner": return s.right + s.innerRadius * Math.cos(s.midAngle);
          case "start": return s.right + s.midRadius * Math.cos(s.startAngle);
          case "center": return s.right + s.midRadius * Math.cos(s.midAngle);
          case "end": return s.right + s.midRadius * Math.cos(s.endAngle);
        }
      })
    .top(function() {
        var s = target.instance();
        switch (this.name()) {
          case "outer": return s.top + s.outerRadius * Math.sin(s.midAngle);
          case "inner": return s.top + s.innerRadius * Math.sin(s.midAngle);
          case "start": return s.top + s.midRadius * Math.sin(s.startAngle);
          case "center": return s.top + s.midRadius * Math.sin(s.midAngle);
          case "end": return s.top + s.midRadius * Math.sin(s.endAngle);
        }
      })
    .bottom(function() {
        var s = target.instance();
        switch (this.name()) {
          case "outer": return s.bottom + s.outerRadius * Math.sin(s.midAngle);
          case "inner": return s.bottom + s.innerRadius * Math.sin(s.midAngle);
          case "start": return s.bottom + s.midRadius * Math.sin(s.startAngle);
          case "center": return s.bottom + s.midRadius * Math.sin(s.midAngle);
          case "end": return s.bottom + s.midRadius * Math.sin(s.endAngle);
        }
      })
    .textAlign(function() {
        var s = target.instance();
        switch (this.name()) {
          case "outer": return pv.Wedge.upright(s.midAngle) ? "right" : "left";
          case "inner": return pv.Wedge.upright(s.midAngle) ? "left" : "right";
        }
        return "center";
      })
    .textBaseline(function() {
        var s = target.instance();
        switch (this.name()) {
          case "start": return pv.Wedge.upright(s.startAngle) ? "top" : "bottom";
          case "end": return pv.Wedge.upright(s.endAngle) ? "bottom" : "top";
        }
        return "middle";
      })
    .textAngle(function() {
        var s = target.instance(), a = 0;
        switch (this.name()) {
          case "center":
          case "inner":
          case "outer": a = s.midAngle; break;
          case "start": a = s.startAngle; break;
          case "end": a = s.endAngle; break;
        }
        return pv.Wedge.upright(a) ? a : (a + Math.PI);
      });
};

/**
 * Returns true if the specified angle is considered "upright", as in, text
 * rendered at that angle would appear upright. If the angle is not upright,
 * text is rotated 180 degrees to be upright, and the text alignment properties
 * are correspondingly changed.
 *
 * @param {number} angle an angle, in radius.
 * @returns {boolean} true if the specified angle is upright.
 */
pv.Wedge.upright = function(angle) {
  angle = angle % (2 * Math.PI);
  angle = (angle < 0) ? (2 * Math.PI + angle) : angle;
  return (angle < Math.PI / 2) || (angle > 3 * Math.PI / 2);
};

/** @private Sets angle based on endAngle or vice versa. */
pv.Wedge.prototype.buildImplied = function(s) {
  if (s.angle == null) s.angle = s.endAngle - s.startAngle;
  else if (s.endAngle == null) s.endAngle = s.startAngle + s.angle;
  pv.Mark.prototype.buildImplied.call(this, s);
};
/**
 * A weighted particle that can participate in a force simulation. There is no
 * explicit constructor corresponding to the class {@code pv.Particle}; this
 * class merely serves to document the attributes that are used on particles in
 * physics simulations.
 *
 * @class pv.Particle
 */

/**
 * The next particle in the simulation.
 *
 * @type pv.Particle
 * @field pv.Particle.prototype.next
 */

/**
 * If true, the particle's position and velocity are fixed and will not be
 * modified during the simulation. (This allows interactive drag and drop.)
 *
 * @type boolean
 * @field pv.Particle.prototype.fixed
 */

/**
 * The <i>x</i>-position of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.x
 */

/**
 * The <i>y</i>-position of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.y
 */

/**
 * The <i>x</i>-velocity of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.vx
 */

/**
 * The <i>y</i>-velocity of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.vy
 */

/**
 * The <i>x</i>-position of the particle at -dt.
 *
 * @type number
 * @field pv.Particle.prototype.px
 */

/**
 * The <i>y</i>-position of the particle at -dt.
 *
 * @type number
 * @field pv.Particle.prototype.py
 */

/**
 * The <i>x</i>-force on the particle.
 *
 * @type number
 * @field pv.Particle.prototype.fx
 */

/**
 * The <i>y</i>-force on the particle.
 *
 * @type number
 * @field pv.Particle.prototype.fy
 */
/**
 * Constructs a new empty simulation.
 */
pv.simulation = function(particles) {
  return new pv.Simulation(particles);
};

/**
 * A particle simulation.
 *
 * @constructor Constructs a new empty simulation.
 */
pv.Simulation = function(particles) {
  for (var i = 0; i < particles.length; i++) this.particle(particles[i]);
};

/**
 * The particles in the simulation. Particles are stored as a linked list; this
 * field represents the first particle in the simulation.
 *
 * @type pv.Particle
 * @field pv.Simulation.prototype.particles
 */

/**
 * The forces in the simulation. Forces are stored as a linked list; this field
 * represents the first force in the simulation.
 *
 * @type pv.Force
 * @field pv.Simulation.prototype.forces
 */

/**
 * The constraints in the simulation. Constraints are stored as a linked list;
 * this field represents the first constraint in the simulation.
 *
 * @type pv.Constraint
 * @field pv.Simulation.prototype.constraints
 */

/**
 * Adds the specified particle to the simulation.
 *
 * @param {pv.Particle} p the new particle.
 * @returns {pv.Simulation} this.
 */
pv.Simulation.prototype.particle = function(p) {
  p.next = this.particles;
  /* Default velocities and forces to zero if unset. */
  if (isNaN(p.px)) p.px = p.x;
  if (isNaN(p.py)) p.py = p.y;
  if (isNaN(p.fx)) p.fx = 0;
  if (isNaN(p.fy)) p.fy = 0;
  this.particles = p;
  return this;
};

/**
 * Adds the specified force to the simulation.
 *
 * @param {pv.Force} f the new force.
 * @returns {pv.Simulation} this.
 */
pv.Simulation.prototype.force = function(f) {
  f.next = this.forces;
  this.forces = f;
  return this;
};

/**
 * Adds the specified constraint to the simulation.
 *
 * @param {pv.Constraint} c the new constraint.
 * @returns {pv.Simulation} this.
 */
pv.Simulation.prototype.constraint = function(c) {
  c.next = this.constraints;
  this.constraints = c;
  return this;
};

/**
 * Apply constraints, and then set the velocities to zero.
 *
 * @returns {pv.Simulation} this.
 */
pv.Simulation.prototype.stabilize = function(n) {
  if (!arguments.length) n = 3; // TODO use cooling schedule
  for (var i = 0; i < n; i++) {
    var q = new pv.Quadtree(this.particles);
    for (c = this.constraints; c; c = c.next) c.apply(this.particles, q);
  }
  for (var p = this.particles; p; p = p.next) {
    p.px = p.x;
    p.py = p.y;
  }
  return this;
};

/**
 * Advances the simulation one time-step.
 */
pv.Simulation.prototype.step = function() {
  var p, f, c;

  /*
   * Assumptions:
   * - The mass (m) of every particles is 1.
   * - The time step (dt) is 1.
   */

  /* Position Verlet integration. */
  for (p = this.particles; p; p = p.next) {
    var px = p.px, py = p.py;
    p.px = p.x;
    p.py = p.y;
    if (p.fixed) continue;
    p.x += p.vx = ((p.x - px) + p.fx);
    p.y += p.vy = ((p.y - py) + p.fy);
  }

  /* Apply constraints, then accumulate new forces. */
  var q = new pv.Quadtree(this.particles);
  for (c = this.constraints; c; c = c.next) c.apply(this.particles, q);
  for (p = this.particles; p; p = p.next) p.fx = p.fy = 0;
  for (f = this.forces; f; f = f.next) f.apply(this.particles, q);

  /* Restore fixed positions, if necessary. */
  for (p = this.particles; p; p = p.next) {
    if (p.fixed) {
      p.x = p.px;
      p.y = p.py;
    }
  }
};
/**
 * A quadtree.
 *
 * @constructor Constructs a new quadtree for the specified array of particles.
 *
 * @param {pv.Particle} particles the linked list of particles.
 */
pv.Quadtree = function(particles) {
  var p;

  /* Compute bounds. */
  var x1 = Number.POSITIVE_INFINITY, y1 = x1,
      x2 = Number.NEGATIVE_INFINITY, y2 = x2;
  for (p = particles; p; p = p.next) {
    if (p.x < x1) x1 = p.x;
    if (p.y < y1) y1 = p.y;
    if (p.x > x2) x2 = p.x;
    if (p.y > y2) y2 = p.y;
  }

  /* Squarify the bounds. */
  var dx = x2 - x1, dy = y2 - y1;
  if (dx > dy) y2 = y1 + dx;
  else x2 = x1 + dy;
  this.xMin = x1;
  this.yMin = y1;
  this.xMax = x2;
  this.yMax = y2;

  /**
   * Recursively inserts the specified particle <i>p</i> at the node <i>n</i> or
   * one of its descendants. The bounds are defined by [<i>x1</i>, <i>x2</i>]
   * and [<i>y1</i>, <i>y2</i>].
   */
  function insert(n, p, x1, y1, x2, y2) {
    if (n.leaf) {
      if (n.p) {
        /*
         * If the particle at this leaf node is at the same position as the new
         * particle we are adding, we leave the particle associated with the
         * internal node while adding the new particle to a child node. This
         * avoids infinite recursion.
         */
        if ((Math.abs(n.p.x - p.x) + Math.abs(n.p.y - p.y)) < .01) {
          insertChild(n, p, x1, y1, x2, y2);
        } else {
          var v = n.p;
          n.p = null;
          insertChild(n, v, x1, y1, x2, y2);
          insertChild(n, p, x1, y1, x2, y2);
        }
      } else {
        n.p = p;
      }
    } else {
      insertChild(n, p, x1, y1, x2, y2);
    }
  }

  /**
   * Recursively inserts the specified particle <i>p</i> into a descendant of
   * node <i>n</i>. The bounds are defined by [<i>x1</i>, <i>x2</i>] and
   * [<i>y1</i>, <i>y2</i>].
   */
  function insertChild(n, p, x1, y1, x2, y2) {
    /* Compute the split point, and the quadrant in which to insert p. */
    var sx = (x1 + x2) * .5,
        sy = (y1 + y2) * .5,
        right = p.x >= sx,
        bottom = p.y >= sy;

    /* Recursively insert into the child node. */
    n.leaf = false;
    switch ((bottom << 1) + right) {
      case 0: n = n.c1 || (n.c1 = new pv.Quadtree.Node()); break;
      case 1: n = n.c2 || (n.c2 = new pv.Quadtree.Node()); break;
      case 2: n = n.c3 || (n.c3 = new pv.Quadtree.Node()); break;
      case 3: n = n.c4 || (n.c4 = new pv.Quadtree.Node()); break;
    }

    /* Update the bounds as we recurse. */
    if (right) x1 = sx; else x2 = sx;
    if (bottom) y1 = sy; else y2 = sy;
    insert(n, p, x1, y1, x2, y2);
  }

  /* Insert all particles. */
  this.root = new pv.Quadtree.Node();
  for (p = particles; p; p = p.next) insert(this.root, p, x1, y1, x2, y2);
};

/**
 * @type pv.Quadtree.Node
 * @field pv.Quadtree.prototype.root
 */

/**
 * @type number
 * @field pv.Quadtree.prototype.xMin
 */

/**
 * @type number
 * @field pv.Quadtree.prototype.xMax
 */

/**
 * @type number
 * @field pv.Quadtree.prototype.yMin
 */

/**
 * @type number
 * @field pv.Quadtree.prototype.yMax
 */

/**
 * A node in a quadtree.
 *
 * @constructor Constructs a new node.
 */
pv.Quadtree.Node = function() {
  /*
   * Prepopulating all attributes significantly increases performance! Also,
   * letting the language interpreter manage garbage collection was moderately
   * faster than creating a cache pool.
   */
  this.leaf = true;
  this.next = null;
  this.c1 = null;
  this.c2 = null;
  this.c3 = null;
  this.c4 = null;
  this.p = null;
};

/**
 * True if this node is a leaf node; i.e., it has no children. Note that both
 * leaf nodes and non-leaf (internal) nodes may have associated particles. If
 * this is a non-leaf node, then at least one of {@link #c1}, {@link #c2},
 * {@link #c3} or {@link #c4} is guaranteed to be non-null.
 *
 * @type boolean
 * @field pv.Quadtree.Node.prototype.leaf
 */

/**
 * @type pv.Quadtree.Node
 * @field pv.Quadtree.Node.prototype.next
 */

/**
 * The particle associated with this node, if any.
 *
 * @type pv.Particle
 * @field pv.Quadtree.Node.prototype.p
 */

/**
 * The child node for the second quadrant, if any.
 *
 * @type pv.Quadtree.Node
 * @field pv.Quadtree.Node.prototype.c2
 */

/**
 * The child node for the third quadrant, if any.
 *
 * @type pv.Quadtree.Node
 * @field pv.Quadtree.Node.prototype.c3
 */

/**
 * The child node for the fourth quadrant, if any.
 *
 * @type pv.Quadtree.Node
 * @field pv.Quadtree.Node.prototype.c4
 */
pv.Force = {};
/**
 * An n-body force, as defined by Coulomb's law or Newton's law of gravitation,
 * inversely proportional to the square of the distance between particles. Note
 * that the force is independent of the <i>mass</i> of the associated particles,
 * and that the particles do not have charges of varying magnitude; instead, the
 * attraction or repulsion of all particles is globally specified as the charge
 * {@link #constant}.
 */
pv.Force.charge = function(k) {
  var min = 2, // minimum distance at which to observe forces
      min1 = 1 / min,
      max = 500, // maximum distance at which to observe forces
      max1 = 1 / max,
      theta = .9, // Barnes-Hut theta approximation constant
      force = {};

  if (!arguments.length) k = -40; // default charge constant (repulsion)

  force.constant = function(x) {
    if (arguments.length) {
      k = Number(x);
      return force;
    }
    return k;
  };

  force.domain = function(a, b) {
    if (arguments.length) {
      min = Number(a);
      min1 = 1 / min;
      max = Number(b);
      max1 = 1 / max;
      return force;
    }
    return [min, max];
  };

  force.theta = function(x) {
    if (arguments.length) {
      theta = Number(x);
      return force;
    }
    return theta;
  };

  /**
   * Recursively computes the center of charge for each node in the quadtree.
   * This is equivalent to the center of mass, assuming that all particles have
   * unit weight.
   */
  function accumulate(n) {
    var cx = 0, cy = 0;
    n.cn = 0;
    function accumulateChild(c) {
      accumulate(c);
      n.cn += c.cn;
      cx += c.cn * c.cx;
      cy += c.cn * c.cy;
    }
    if (!n.leaf) {
      if (n.c1) accumulateChild(n.c1);
      if (n.c2) accumulateChild(n.c2);
      if (n.c3) accumulateChild(n.c3);
      if (n.c4) accumulateChild(n.c4);
    }
    if (n.p) {
      n.cn += k;
      cx += k * n.p.x;
      cy += k * n.p.y;
    }
    n.cx = cx / n.cn;
    n.cy = cy / n.cn;
  }

  /**
   * Recursively computes forces on the given particle using the given quadtree
   * node. The Barnes-Hut approximation criterion is if the ratio of the size of
   * the quadtree node to the distance from the point to the node's center of
   * mass is beneath some threshold.
   */
  function forces(n, p, x1, y1, x2, y2) {
    var dx = n.cx - p.x,
        dy = n.cy - p.y,
        dn = 1 / Math.sqrt(dx * dx + dy * dy);

    /* Barnes-Hut criterion. */
    if ((n.leaf && (n.p != p)) || ((x2 - x1) * dn < theta)) {
      if (dn < max1) return;
      if (dn > min1) dn = min1;
      var kc = n.cn * dn * dn * dn,
          fx = dx * kc,
          fy = dy * kc;
      p.fx += fx;
      p.fy += fy;
    } else if (!n.leaf) {
      var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5;
      if (n.c1) forces(n.c1, p, x1, y1, sx, sy);
      if (n.c2) forces(n.c2, p, sx, y1, x2, sy);
      if (n.c3) forces(n.c3, p, x1, sy, sx, y2);
      if (n.c4) forces(n.c4, p, sx, sy, x2, y2);
      if (dn < max1) return;
      if (dn > min1) dn = min1;
      if (n.p && (n.p != p)) {
        var kc = k * dn * dn * dn,
            fx = dx * kc,
            fy = dy * kc;
        p.fx += fx;
        p.fy += fy;
      }
    }
  }

  force.apply = function(particles, q) {
    accumulate(q.root);
    for (var p = particles; p; p = p.next) {
      forces(q.root, p, q.xMin, q.yMin, q.xMax, q.yMax);
    }
  };

  return force;
};
pv.Force.drag = function(k) {
  var force = {};

  if (!arguments.length) k = .1;

  force.constant = function(x) {
    if (arguments.length) { k = x; return force; }
    return k;
  };

  force.apply = function(particles) {
    if (k) for (var p = particles; p; p = p.next) {
      p.fx -= k * p.vx;
      p.fy -= k * p.vy;
    }
  };

  return force;
};
pv.Force.spring = function(k) {
  var d = .1, // default damping factor
      l = 20, // default rest length
      kl, // per-spring normalization
      force = {};

  if (!arguments.length) k = .1; // default spring constant (tension)

  force.links = function(x) {
    if (arguments.length) {
      links = x;
      kl = x.map(function(l) {
          return 1 / Math.sqrt(Math.max(
              l.sourceNode.linkDegree,
              l.targetNode.linkDegree));
        });
      return force;
    }
    return links;
  };

  force.constant = function(x) {
    if (arguments.length) {
      k = Number(x);
      return force;
    }
    return k;
  };

  force.damping = function(x) {
    if (arguments.length) {
      d = Number(x);
      return force;
    }
    return d;
  };

  force.length = function(x) {
    if (arguments.length) {
      l = Number(x);
      return force;
    }
    return l;
  };

  force.apply = function(particles) {
    for (var i = 0; i < links.length; i++) {
      var a = links[i].sourceNode,
          b = links[i].targetNode,
          dx = a.x - b.x,
          dy = a.y - b.y,
          dn = Math.sqrt(dx * dx + dy * dy),
          dd = dn ? (1 / dn) : 1,
          ks = k * kl[i], // normalized tension
          kd = d * kl[i], // normalized damping
          kk = (ks * (dn - l) + kd * (dx * (a.vx - b.vx) + dy * (a.vy - b.vy)) * dd) * dd,
          fx = -kk * (dn ? dx : (.01 * (.5 - Math.random()))),
          fy = -kk * (dn ? dy : (.01 * (.5 - Math.random())));
      a.fx += fx;
      a.fy += fy;
      b.fx -= fx;
      b.fy -= fy;
    }
  };

  return force;
};
pv.Constraint = {};
pv.Constraint.collision = function(radius) {
  var n = 1, // number of times to repeat the constraint
      r1,
      px1,
      py1,
      px2,
      py2,
      constraint = {};

  if (!arguments.length) r = 10; // default search radius

  constraint.repeat = function(x) {
    if (arguments.length) {
      n = Number(x);
      return constraint;
    }
    return n;
  };

  /** @private */
  function constrain(n, p, x1, y1, x2, y2) {
    if (!n.leaf) {
      var sx = (x1 + x2) * .5,
          sy = (y1 + y2) * .5,
          top = sy > py1,
          bottom = sy < py2,
          left = sx > px1,
          right = sx < px2;
      if (top) {
        if (n.c1 && left) constrain(n.c1, p, x1, y1, sx, sy);
        if (n.c2 && right) constrain(n.c2, p, sx, y1, x2, sy);
      }
      if (bottom) {
        if (n.c3 && left) constrain(n.c3, p, x1, sy, sx, y2);
        if (n.c4 && right) constrain(n.c4, p, sx, sy, x2, y2);
      }
    }
    if (n.p && (n.p != p)) {
      var dx = p.x - n.p.x,
          dy = p.y - n.p.y,
          l = Math.sqrt(dx * dx + dy * dy),
          d = r1 + radius(n.p);
      if (l < d) {
        var k = (l - d) / l * .5;
        dx *= k;
        dy *= k;
        p.x -= dx;
        p.y -= dy;
        n.p.x += dx;
        n.p.y += dy;
      }
    }
  }

  constraint.apply = function(particles, q) {
    var p, r, max = -Infinity;
    for (p = particles; p; p = p.next) {
      r = radius(p);
      if (r > max) max = r;
    }
    for (var i = 0; i < n; i++) {
      for (p = particles; p; p = p.next) {
        r = (r1 = radius(p)) + max;
        px1 = p.x - r;
        px2 = p.x + r;
        py1 = p.y - r;
        py2 = p.y + r;
        constrain(q.root, p, q.xMin, q.yMin, q.xMax, q.yMax);
      }
    }
  };

  return constraint;
};
pv.Constraint.link = function(d) {
  var constraint = {};

  if (!arguments.length) d = 20; // default rest length

  constraint.links = function(x) {
    if (arguments.length) {
      links = x;
      return constraint;
    }
    return links;
  };

  constraint.apply = function(particles) {
    for (var i = 0; i < links.length; i++) {
      var a = links[i].sourceNode,
          b = links[i].targetNode,
          dx = a.x - b.x,
          dy = a.y - b.y,
          l = Math.sqrt(dx * dx + dy * dy),
          k = (l - d) / l * .5;
      dx *= k;
      dy *= k;
      a.x -= dx;
      a.y -= dy;
      b.x += dx;
      b.y += dy;
    }
  };

  return constraint;
};
pv.Constraint.position = function(f) {
  var a = .1, // default alpha
      constraint = {};

  if (!arguments.length) f = pv.identity; // default position

  constraint.alpha = function(x) {
    if (arguments.length) {
      a = Number(x);
      return constraint;
    }
    return a;
  };

  constraint.apply = function(particles) {
    for (var p = particles; p; p = p.next) {
      var v = f(p);
      p.x += (v.x - p.x) * a;
      p.y += (v.y - p.y) * a;
    }
  };

  return constraint;
};
/**
 * @ignore
 * @namespace
 */
pv.Layout = {};
/**
 * Returns a new grid layout.
 *
 * @class A grid layout with regularly-sized rows and columns. <img
 * src="../grid.png" width="160" height="160" align="right"> The number of rows
 * and columns are determined from the array, which should be in row-major
 * order. For example, the 2&times;3 array:
 *
 * <pre>1 2 3
 * 4 5 6</pre>
 *
 * should be represented as:
 *
 * <pre>[[1, 2, 3], [4, 5, 6]]</pre>
 *
 * If your data is in column-major order, you can use {@link pv.transpose} to
 * transpose it.
 *
 * <p>This layout defines left, top, width, height and data properties. The data
 * property will be the associated element in the array. For example, if the
 * array is a two-dimensional array of values in the range [0,1], a simple
 * heatmap can be generated as:
 *
 * <pre>.add(pv.Bar)
 *   .extend(pv.Layout.grid(array))
 *   .fillStyle(pv.ramp("white", "black"))</pre>
 *
 * By default, the grid fills the full width and height of the parent panel.
 *
 * @param {array[]} arrays an array of arrays.
 * @returns {pv.Layout.grid} a grid layout.
 */
pv.Layout.grid = function(arrays) {
  var rows = arrays.length, cols = arrays[0].length;

  /** @private */
  function w() { return this.parent.width() / cols; }

  /** @private */
  function h() { return this.parent.height() / rows; }

  return new pv.Mark()
      .data(pv.blend(arrays))
      .left(function() { return w.call(this) * (this.index % cols); })
      .top(function() { return h.call(this) * Math.floor(this.index / cols); })
      .width(w)
      .height(h);
};
/**
 * Returns a new stack layout.
 *
 * @class A layout for stacking marks vertically or horizontally, using the
 * <i>cousin</i> instance. This layout is designed to be used for one of the
 * four positional properties in the box model, and changes behavior depending
 * on the property being evaluated:<ul>
 *
 * <li>bottom: cousin.bottom + cousin.height
 * <li>top: cousin.top + cousin.height
 * <li>left: cousin.left + cousin.width
 * <li>right: cousin.right + cousin.width
 *
 * </ul>If no cousin instance is available (for example, for first instance),
 * the specified offset is used. If no offset is specified, zero is used. For
 * example,
 *
 * <pre>vis.add(pv.Panel)
 *     .data([[1, 1.2, 1.7, 1.5, 1.7],
 *            [.5, 1, .8, 1.1, 1.3],
 *            [.2, .5, .8, .9, 1]])
 *   .add(pv.Area)
 *     .extend(pv.Layout.stack())
 *     .height(function(d) d * 40)
 *     .left(function() this.index * 35);</pre>
 *
 * specifies a vertically-stacked area chart.
 *
 * @returns {pv.Layout.stack} a stack property function.
 * @see pv.Mark#cousin
 */
pv.Layout.stack = function() {
  var orient = "bottom", // default orientation
      size = "height", // default size
      offset = function() { return 0; }; // default offset

  /** @private Find the previous visible parent instance. */
  function layout() {
    var i = this.parent.index, p, c;
    while ((i-- > 0) && !c) {
      p = this.parent.scene[i];
      if (p.visible) c = p.children[this.childIndex][this.index];
    }
    return c
        ? c[orient] + c[size]
        : offset.apply(this, arguments);
  }

  var mark = new pv.Mark()
      .data(pv.identity)
      .bottom(layout);

  /**
   * Sets or gets the orientation. The default orientation is "left", which
   * means that ...<ul>
   *
   * <li>left - left-to-right.
   * <li>right - right-to-left.
   * <li>top - top-to-bottom.
   * <li>bottom - bottom-to-top.
   * <li>radial - radially, with the root at the center.</ul>
   *
   * @param {string} v the new orientation.
   * @function
   * @name pv.Layout.stack.prototype.orient
   * @returns {pv.Layout.stack} this, or the current orientation.
   */
  mark.orient = function(v) {
    if (arguments.length) {
      mark[orient](null); // delete old property definition
      orient = String(v);
      mark[orient](layout);
      size = (orient == "left") || (orient == "right") ? "width" : "height";
      return this;
    }
    return orient;
  };

  /**
   * Sets the offset for this stack layout. The offset can either be specified
   * as a function or as a constant. If a function, the function is invoked in
   * the same context as a normal property function: <tt>this</tt> refers to the
   * mark, and the arguments are the full data stack. By default the offset is
   * zero.
   *
   * @function
   * @name pv.Layout.stack.prototype.offset
   * @param {function} f offset function, or constant value.
   * @returns {pv.Layout.stack} this.
   */
  mark.offset = function(f) {
    if (arguments.length) {
      offset = (typeof f == "function") ? f : function() { return f; };
      return this;
    }
    return offset;
  };

  return mark;
};
// TODO add `by` function for determining size (and children?)

/**
 * Returns a new treemap tree layout.
 *
 * @class A tree layout in the form of an treemap. <img
 * src="../treemap.png" width="160" height="160" align="right"> Treemaps
 * are a form of space-filling layout that represents nodes as boxes, with child
 * nodes placed within parent boxes. The size of each box is proportional to the
 * size of the node in the tree.
 *
 * <p>This particular algorithm is taken from Bruls, D.M., C. Huizing, and
 * J.J. van Wijk, <a href="http://www.win.tue.nl/~vanwijk/stm.pdf">"Squarified
 * Treemaps"</a> in <i>Data Visualization 2000, Proceedings of the Joint
 * Eurographics and IEEE TCVG Sumposium on Visualization</i>, 2000,
 * pp. 33-42.
 *
 * <p>This tree layout is intended to be extended (see {@link pv.Mark#extend})
 * by a {@link pv.Bar}. The data property returns an array of nodes for use by
 * other property functions. The following node attributes are supported:
 *
 * <ul>
 * <li><tt>left</tt> - the cell left position.
 * <li><tt>top</tt> - the cell top position.
 * <li><tt>width</tt> - the cell width.
 * <li><tt>height</tt> - the cell height.
 * <li><tt>depth</tt> - the node depth (tier; the root is 0).
 * <li><tt>keys</tt> - an array of string keys for the node.
 * <li><tt>size</tt> - the aggregate node size.
 * <li><tt>children</tt> - child nodes, if any.
 * <li><tt>data</tt> - the associated tree element, for leaf nodes.
 * </ul>
 *
 * To produce a default treemap layout, say:
 *
 * <pre>.add(pv.Bar)
 *   .extend(pv.Layout.treemap(tree))</pre>
 *
 * To display internal nodes, and color by depth, say:
 *
 * <pre>.add(pv.Bar)
 *   .extend(pv.Layout.treemap(tree).inset(10))
 *   .fillStyle(pv.Colors.category19().by(function(n) n.depth))</pre>
 *
 * The format of the <tt>tree</tt> argument is a hierarchical object whose leaf
 * nodes are numbers corresponding to their size. For an example, and
 * information on how to convert tabular data into such a tree, see
 * {@link pv.Tree}. If the leaf nodes are not numbers, a {@link #size} function
 * can be specified to override how the tree is interpreted. This size function
 * can also be used to transform the data.
 *
 * <p>By default, the treemap fills the full width and height of the parent
 * panel, and only leaf nodes are rendered. If an {@link #inset} is specified,
 * internal nodes will be rendered, each inset from their parent by the
 * specified margins. Rounding can be enabled using {@link #round}. Finally, an
 * optional root key can be specified using {@link #root} for convenience.
 *
 * @param tree a tree (an object) whose leaf attributes have sizes.
 * @returns {pv.Layout.treemap} a tree layout.
 */
pv.Layout.treemap = function(tree) {
  var keys = [], round, inset, sizeof = Number;

  /** @private */
  function rnd(i) {
    return round ? Math.round(i) : i;
  }

  /** @private */
  function accumulate(map) {
    var node = {size: 0, children: [], keys: keys.slice()};
    for (var key in map) {
      var child = map[key], size = sizeof(child);
      keys.push(key);
      if (isNaN(size)) {
        child = accumulate(child);
      } else {
        child = {size: size, data: child, keys: keys.slice()};
      }
      node.children.push(child);
      node.size += child.size;
      keys.pop();
    }
    node.children.sort(function(a, b) { return a.size - b.size; });
    return node;
  }

  /** @private */
  function scale(node, k) {
    node.size *= k;
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        scale(node.children[i], k);
      }
    }
  }

  /** @private */
  function ratio(row, l) {
    var rmax = -Infinity, rmin = Infinity, s = 0;
    for (var i = 0; i < row.length; i++) {
      var r = row[i].size;
      if (r < rmin) rmin = r;
      if (r > rmax) rmax = r;
      s += r;
    }
    s = s * s;
    l = l * l;
    return Math.max(l * rmax / s, s / (l * rmin));
  }

  /** @private */
  function squarify(node) {
    var row = [], mink = Infinity;
    var x = node.left + (inset ? inset.left : 0),
        y = node.top + (inset ? inset.top : 0),
        w = node.width - (inset ? inset.left + inset.right : 0),
        h = node.height - (inset ? inset.top + inset.bottom : 0),
        l = Math.min(w, h);

    scale(node, w * h / node.size);

    function position(row) {
      var s = pv.sum(row, function(node) { return node.size; }),
          hh = (l == 0) ? 0 : rnd(s / l);

      for (var i = 0, d = 0; i < row.length; i++) {
        var n = row[i], nw = rnd(n.size / hh);
        if (w == l) {
          n.left = x + d;
          n.top = y;
          n.width = nw;
          n.height = hh;
        } else {
          n.left = x;
          n.top = y + d;
          n.width = hh;
          n.height = nw;
        }
        d += nw;
      }

      if (w == l) {
        if (n) n.width += w - d; // correct rounding error
        y += hh;
        h -= hh;
      } else {
        if (n) n.height += h - d; // correct rounding error
        x += hh;
        w -= hh;
      }
      l = Math.min(w, h);
    }

    var children = node.children.slice(); // copy
    while (children.length > 0) {
      var child = children[children.length - 1];
      if (child.size <= 0) {
        children.pop();
        continue;
      }
      row.push(child);

      var k = ratio(row, l);
      if (k <= mink) {
        children.pop();
        mink = k;
      } else {
        row.pop();
        position(row);
        row.length = 0;
        mink = Infinity;
      }
    }

    if (row.length > 0) {
      position(row);
    }

    /* correct rounding error */
    if (w == l) {
      for (var i = 0; i < row.length; i++) {
        row[i].width += w;
      }
    } else {
      for (var i = 0; i < row.length; i++) {
        row[i].height += h;
      }
    }
  }

  /** @private */
  function layout(node) {
    if (node.children) {
      squarify(node);
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        child.depth = node.depth + 1;
        layout(child);
      }
    }
  }

  /** @private */
  function flatten(node, array) {
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        flatten(node.children[i], array);
      }
    }
    if (inset || !node.children) {
      array.push(node)
    }
    return array;
  }

  /** @private */
  function data() {
    var root = accumulate(tree);
    root.left = 0;
    root.top = 0;
    root.width = this.parent.width();
    root.height = this.parent.height();
    root.depth = 0;
    layout(root);
    return flatten(root, []).reverse();
  }

  var mark = new pv.Mark()
      .data(data)
      .left(function(n) { return n.left; })
      .top(function(n) { return n.top; })
      .width(function(n) { return n.width; })
      .height(function(n) { return n.height; });

  /**
   * Enables or disables rounding. When rounding is enabled, the left, top,
   * width and height properties will be rounded to integer pixel values. The
   * rounding algorithm uses error accumulation to ensure an exact fit.
   *
   * @param {boolean} v whether rounding should be enabled.
   * @function
   * @name pv.Layout.treemap.prototype.round
   * @returns {pv.Layout.treemap} this.
   */
  mark.round = function(v) {
    round = v;
    return this;
  };

  /**
   * Specifies the margins to inset child nodes from their parents; as a side
   * effect, this also enables the display of internal nodes, which are hidden
   * by default. If only a single argument is specified, this value is used to
   * inset all four sides.
   *
   * @param {number} top the top margin.
   * @param {number} [right] the right margin.
   * @param {number} [bottom] the bottom margin.
   * @param {number} [left] the left margin.
   * @function
   * @name pv.Layout.treemap.prototype.inset
   * @returns {pv.Layout.treemap} this.
   */
  mark.inset = function(top, right, bottom, left) {
    if (arguments.length) {
      if (arguments.length == 1) right = bottom = left = top;
      inset = {top:top, right:right, bottom:bottom, left:left};
      return this;
    }
    return inset;
  };

  /**
   * Specifies the root key; optional. The root key is prepended to the
   * <tt>keys</tt> attribute for all generated nodes. This method is provided
   * for convenience and does not affect layout.
   *
   * @param {string} v the root key.
   * @function
   * @name pv.Layout.treemap.prototype.root
   * @returns {pv.Layout.treemap} this.
   */
  mark.root = function(v) {
    keys = [v];
    return this;
  };

  /**
   * Specifies the sizing function. By default, the sizing function is
   * <tt>Number</tt>. The sizing function is invoked for each node in the tree
   * (passed to the constructor): the sizing function must return
   * <tt>undefined</tt> or <tt>NaN</tt> for internal nodes, and a number for
   * leaf nodes. The aggregate sizes of internal nodes will be automatically
   * computed by the layout.
   *
   * <p>For example, if the tree data structure represents a file system, with
   * files as leaf nodes, and each file has a <tt>bytes</tt> attribute, you can
   * specify a size function as:
   *
   * <pre>.size(function(d) d.bytes)</pre>
   *
   * This function will return <tt>undefined</tt> for internal nodes (since
   * these do not have a <tt>bytes</tt> attribute), and a number for leaf nodes.
   *
   * <p>Note that the built-in <tt>Math.sqrt</tt> and <tt>Math.log</tt> methods
   * can be used as sizing functions. These function similarly to
   * <tt>Number</tt>, except perform a root and log scale, respectively.
   *
   * @param {function} f the new sizing function.
   * @function
   * @name pv.Layout.treemap.prototype.size
   * @returns {pv.Layout.treemap} this.
   */
  mark.size = function(f) {
    sizeof = f;
    return this;
  };

  return mark;
};
/** @see http://citeseer.ist.psu.edu/buchheim02improving.html */
pv.Layout.tree = function(map) {
  var nodes, // cached pv.dom(map).nodes()
      sort, // optional sort function
      orient = "top", // default orientation
      offset = {depth:60, breadth:15}, // default offsets
      g = 1, // default amount to group siblings
      w, // cached parent panel width
      h; // cached parent panel height

  // TODO support expanded / non-expanded nodes

  /** @private */
  function firstWalk(v) {
    var l, r, a;
    if (!v.firstChild) {
      if (l = v.previousSibling) {
        v.prelim = l.prelim + distance(v.depth, true);
      }
    } else {
      l = v.firstChild;
      r = v.lastChild;
      a = l; // default ancestor
      for (var c = l; c; c = c.nextSibling) {
        firstWalk(c);
        a = apportion(c, a);
      }
      executeShifts(v);
      var midpoint = .5 * (l.prelim + r.prelim);
      if (l = v.previousSibling) {
        v.prelim = l.prelim + distance(v.depth, true);
        v.mod = v.prelim - midpoint;
      } else {
        v.prelim = midpoint;
      }
    }
  }

  /** @private */
  function secondWalk(v, m, depth) {
    v.breadth = v.prelim + m;
    m += v.mod;
    for (var c = v.firstChild; c; c = c.nextSibling) {
      secondWalk(c, m, depth);
    }
  }

  /** @private */
  function apportion(v, a) {
    var w = v.previousSibling;
    if (w) {
      var vip = v,
          vop = v,
          vim = w,
          vom = v.parentNode.firstChild,
          sip = vip.mod,
          sop = vop.mod,
          sim = vim.mod,
          som = vom.mod,
          nr = nextRight(vim),
          nl = nextLeft(vip);
      while (nr && nl) {
        vim = nr;
        vip = nl;
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.ancestor = v;
        var shift = (vim.prelim + sim) - (vip.prelim + sip) + distance(vim.depth, false);
        if (shift > 0) {
          moveSubtree(ancestor(vim, v, a), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.mod;
        sip += vip.mod;
        som += vom.mod;
        sop += vop.mod;
        nr = nextRight(vim);
        nl = nextLeft(vip);
      }
      if (nr && !nextRight(vop)) {
        vop.thread = nr;
        vop.mod += sim - sop;
      }
      if (nl && !nextLeft(vom)) {
        vom.thread = nl;
        vom.mod += sip - som;
        a = v;
      }
    }
    return a;
  }

  /** @private */
  function nextLeft(v) {
    return v.firstChild || v.thread;
  }

  /** @private */
  function nextRight(v) {
    return v.lastChild || v.thread;
  }

  /** @private */
  function moveSubtree(wm, wp, shift) {
    var subtrees = wp.number - wm.number;
    wp.change -= shift / subtrees;
    wp.shift += shift;
    wm.change += shift / subtrees;
    wp.prelim += shift;
    wp.mod += shift;
  }

  /** @private */
  function executeShifts(v) {
    var shift = 0, change = 0;
    for (var c = v.lastChild; c; c = c.previousSibling) {
      c.prelim += shift;
      c.mod += shift;
      change += c.change;
      shift += c.shift + change;
    }
  }

  /** @private */
  function ancestor(vim, v, a) {
    return (vim.ancestor.parentNode == v.parentNode) ? vim.ancestor : a;
  }

  /** @private */
  function distance(depth, siblings) {
    return (siblings ? 1 : (g + 1)) / ((orient == "radial") ? depth : 1);
  }

  /** @private */
  function data() {
    /* Cache the parent panel dimensions to avoid repeated lookup. */
    w = this.parent.width();
    h = this.parent.height();

    /* If the layout was previously computed, use that. */
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();

    /* Sort the tree and initialize temporary layout variables. */
    var root = nodes[0];
    if (sort) root.sort(sort);
    root.visitAfter(function(v, i) {
        v.ancestor = v;
        v.prelim = 0;
        v.mod = 0;
        v.change = 0;
        v.shift = 0;
        v.number = v.previousSibling ? (v.previousSibling.number + 1) : 0;
        v.depth = i;
      });

    /* Compute the layout using Buchheim et al.'s algorithm. */
    firstWalk(root);
    secondWalk(root, -root.prelim, 0);

    /* Clear temporary layout variables; scale depth and breadth. */
    root.visitAfter(function(v) {
        v.breadth *= offset.breadth;
        v.depth *= offset.depth;
        delete v.ancestor;
        delete v.prelim;
        delete v.mod;
        delete v.change;
        delete v.shift;
        delete v.number;
      });

    return nodes;
  }

  /** @private The layout, on which all public methods are registered. */
  var layout = {};

  /**
   * Sets or gets the orientation. The default orientation is "left", which
   * means that the root node is placed on the left edge, leaf nodes appear on
   * the right edge, and internal nodes are in-between. The following
   * orientations are supported:<ul>
   *
   * <li>left - left-to-right.
   * <li>right - right-to-left.
   * <li>top - top-to-bottom.
   * <li>bottom - bottom-to-top.
   * <li>radial - radially, with the root at the center.</ul>
   *
   * @param {string} v the new orientation.
   * @function
   * @name pv.Layout.tree.prototype.orient
   * @returns {pv.Layout.tree} this, or the current orientation.
   */
  layout.orient = function(v) {
    if (arguments.length) {
      orient = v;
      return this;
    }
    return orient;
  };

  /**
   * Sets or gets the sort function. The sort function is applied to the tree
   * before the layout is computed; it is a comparator function which takes two
   * arguments and returns a negative number, a positive number, or zero as
   * appropriate. For example, to sort on the node names:
   *
   * <pre>  .sort(function(a, b) pv.naturalOrder(a.nodeName, b.nodeName))</pre>
   *
   * @param {function} f the new sort function.
   * @function
   * @name pv.Layout.cluster.prototype.sort
   * @returns {pv.Layout.cluster} this, or the current sort function.
   * @see pv.naturalOrder
   * @see pv.Dom.Node.prototype.sort
   */
  layout.sort = function(f) {
    if (arguments.length) {
      sort = f;
      return this;
    }
    return sort;
  };

  /**
   * Specifies the amount to offset child nodes from their parents and
   * siblings. If only a single argument is specified, this value is used to
   * offset both depth (parent) and breadth (siblings).
   *
   * @param {number} depth the depth offset.
   * @param {number} [breadth] the breadth offset.
   * @function
   * @name pv.Layout.tree.prototype.offset
   * @returns {pv.Layout.tree} this, or the current offsets.
   */
  layout.offset = function(depth, breadth) {
    if (arguments.length) {
      if (arguments.length == 1) breadth = depth;
      offset = {breadth: breadth, depth: depth};
      return this;
    }
    return offset;
  };

  /**
   * Sets or gets whether siblings are grouped, i.e., whether differentiating
   * space is placed between sibling groups. The default is 1 (or true), causing
   * sibling leaves to be separated by one breadth offset. Setting this to false
   * (or 0) causes non-siblings to be adjacent.
   *
   * @param {number} x the new group spacing.
   * @function
   * @name pv.Layout.tree.prototype.groupSiblings
   * @returns {pv.Layout.tree} this, or the current group spacing.
   */
  layout.groupSiblings = function(x) {
    if (arguments.length) {
      g = Number(x);
      return this;
    }
    return g;
  };

  /**
   * Returns the nodes associated with this layout.
   *
   * @function
   * @name pv.Layout.tree.prototype.nodes
   * @returns {array}
   */
  layout.nodes = data;

  /**
   * Returns the links associated with this layout. Each link is represented as
   * a two-element array; the first element is the child node, and the second
   * element is the parent node.
   *
   * @function
   * @name pv.Layout.tree.prototype.links
   * @returns {array}
   */
  layout.links = function() {
    return data.call(this)
        .filter(function(n) { return n.parentNode; })
        .map(function(n) { return [n, n.parentNode]; });
  };

  /** @private Returns the angle of the given node. */
  function angle(n) {
    return n.breadth / offset.depth;
  }

  /**
   * The node prototype. This prototype is intended to be used with a Dot mark
   * in conjunction with the link prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.tree.prototype.node
   */
  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) {
          switch (orient) {
            case "left": return n.depth;
            case "right": return w - n.depth;
            case "top":
            case "bottom": return n.breadth + w / 2;
            case "radial": return w / 2 + n.depth * Math.cos(angle(n));
          }
        })
      .top(function(n) {
          switch (orient) {
            case "left":
            case "right": return n.breadth + h / 2;
            case "top": return n.depth;
            case "bottom": return h - n.depth;
            case "radial": return h / 2 + n.depth * Math.sin(angle(n));
          }
        });

  /**
   * The link prototype, which renders edges between child nodes and their
   * parents. This prototype is intended to be used with a Line mark in
   * conjunction with the node prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.tree.prototype.link
   */
  layout.link = new pv.Mark().extend(layout.node)
      .data(pv.identity)
      .fillStyle(null)
      .strokeStyle("#ccc");

  /**
   * The node label prototype, which renders the node name adjacent to the node.
   * This prototype is provided as an alternative to using the anchor on the
   * node mark; it is primarily intended to be used with radial layouts, since
   * it provides a convenient mechanism to set the text angle.
   *
   * @type pv.Mark
   * @name pv.Layout.tree.prototype.label
   */
  layout.label = new pv.Mark()
      .extend(layout.node)
      .textMargin(7)
      .textBaseline("middle")
      .text(function(n) { return n.parentNode ? n.nodeName : "root"; })
      .textAngle(function(n) {
          if (orient != "radial") return 0;
          var a = angle(n);
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textAlign(function(n) {
          if (orient != "radial") return n.firstChild ? "right" : "left";
          return pv.Wedge.upright(angle(n)) ? "left" : "right";
        });

  return layout;
};
pv.Layout.indent = function(map) {
  var nodes,
      bspace = 15,
      dspace = 15,
      ax,
      ay;

  /** @private */
  function position(n, breadth, depth) {
    n.x = ax + depth++ * dspace;
    n.y = ay + breadth++ * bspace;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      breadth = position(c, breadth, depth);
    }
    return breadth;
  }

  /** @private */
  function data() {
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();
    ax = dspace;
    ay = bspace;
    position(nodes[0], 0, 0);
    return nodes;
  }

  var layout = {};

  layout.nodes = data;

  layout.links = function() {
    return data.call(this)
        .filter(function(n) { return n.parentNode; })
        .map(function(n) { return [n, n.parentNode]; });
  };

  layout.spacing = function(depth, breadth) {
    dspace = depth;
    bspace = breadth;
    return this;
  };

  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; });

  layout.link = new pv.Mark().extend(layout.node)
      .data(pv.identity)
      .antialias(false)
      .interpolate("step-after")
      .strokeStyle("#ccc")
      .fillStyle(null);

  return layout;
};
pv.Layout.pack = function(map) {
  var nodes, spacing = 1, radius = function() { return 1; };

  // TODO is it possible for spacing to operate in pixel space?
  // Right now it appears to be multiples of the smallest radius.

  /** @private */
  function packTree(n) {
    var nodes = [];
    for (var c = n.firstChild; c; c = c.nextSibling) {
      c.r = c.firstChild ? packTree(c) : radius(c.nodeValue);
      c.n = c.p = c;
      nodes.push(c);
    }
    nodes.sort(function(a, b) { return a.r - b.r; });
    return packCircle(nodes);
  }

  /** @private */
  function packCircle(nodes) {
    var xMin = Infinity,
        xMax = -Infinity,
        yMin = Infinity,
        yMax = -Infinity,
        a, b, c, j, k;

    /** @private */
    function bound(n) {
      xMin = Math.min(n.x - n.r, xMin);
      xMax = Math.max(n.x + n.r, xMax);
      yMin = Math.min(n.y - n.r, yMin);
      yMax = Math.max(n.y + n.r, yMax);
    }

    /** @private */
    function insert(a, b) {
      var c = a.n;
      a.n = b;
      b.p = a;
      b.n = c;
      c.p = b;
    }

    /** @private */
    function splice(a, b) {
      a.n = b;
      b.p = a;
    }

    /** @private */
    function intersects(a, b) {
      var dx = b.x - a.x,
          dy = b.y - a.y,
          dr = a.r + b.r;
      return (dr * dr - dx * dx - dy * dy) > .001; // within epsilon
    }

    /* Create first node. */
    a = nodes[0];
    a.x = -a.r;
    a.y = 0;
    bound(a);

    /* Create second node. */
    if (nodes.length > 1) {
      b = nodes[1];
      b.x = b.r;
      b.y = 0;
      bound(b);

      /* Create third node and build chain. */
      if (nodes.length > 2) {
        c = nodes[2];
        place(a, b, c);
        bound(c);
        insert(a, c);
        a.p = c;
        insert(c, b);
        b = a.n;

        /* Now iterate through the rest. */
        for (var i = 3; i < nodes.length; i++) {
          place(a, b, c = nodes[i]);

          /* Search for the closest intersection. */
          var isect = 0, s1 = 1, s2 = 1;
          for (j = b.n; j != b; j = j.n, s1++) {
            if (intersects(j, c)) {
              isect = 1;
              break;
            }
          }
          if (isect == 1) {
            for (k = a.p; k != j.p; k = k.p, s2++) {
              if (intersects(k, c)) {
                if (s2 < s1) {
                  isect = -1;
                  j = k;
                }
                break;
              }
            }
          }

          /* Update node chain. */
          if (isect == 0) {
            insert(a, c);
            b = c;
            bound(c);
          } else if (isect > 0) {
            splice(a, j);
            b = j;
            i--;
          } else if (isect < 0) {
            splice(j, b);
            a = j;
            i--;
          }
        }
      }
    }

    /* Re-center the circles and return the encompassing radius. */
    var cx = (xMin + xMax) / 2,
        cy = (yMin + yMax) / 2,
        cr = 0;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x -= cx;
      n.y -= cy;
      cr = Math.max(cr, n.r + Math.sqrt(n.x * n.x + n.y * n.y));
    }
    return cr + spacing;
  }

  /** @private */
  function place(a, b, c) {
    var da = b.r + c.r,
        db = a.r + c.r,
        dx = b.x - a.x,
        dy = b.y - a.y,
        dc = Math.sqrt(dx * dx + dy * dy),
        cos = (db * db + dc * dc - da * da) / (2 * db * dc),
        theta = Math.acos(cos),
        x = cos * db,
        h = Math.sin(theta) * db;
    dx /= dc;
    dy /= dc;
    c.x = a.x + x * dx + h * dy;
    c.y = a.y + x * dy - h * dx;
  }

  /** @private */
  function transform(n, x, y, k) {
    for (var c = n.firstChild; c; c = c.nextSibling) {
      c.x += n.x;
      c.y += n.y;
      transform(c, x, y, k);
    }
    n.x = x + k * n.x;
    n.y = y + k * n.y;
    n.r *= k;
  }

  /** @private */
  function data() {
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();

    var root = nodes[0];
    root.x = 0;
    root.y = 0;
    root.r = packTree(root);

    var w = this.parent.width(),
        h = this.parent.height(),
        k = 1 / Math.max(2 * root.r / w, 2 * root.r / h);
    transform(root, w / 2, h / 2, k);

    return nodes;
  }

  var mark = new pv.Mark()
      .data(data)
      .size(function(n) { return n.r * n.r; })
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; })
      .strokeStyle("rgb(31, 119, 180)")
      .fillStyle("rgba(31, 119, 180, .25)");

  /**
   * Specifies the sizing function. By default, a sizing function is disabled
   * and all nodes are given constant size. The sizing function is invoked for
   * each leaf node in the tree (passed to the constructor).
   *
   * <p>For example, if the tree data structure represents a file system, with
   * files as leaf nodes, and each file has a <tt>bytes</tt> attribute, you can
   * specify a size function as:
   *
   * <pre>.size(function(d) d.bytes)</pre>
   *
   * @param {function} f the new sizing function.
   * @function
   * @name pv.Layout.sunburst.prototype.size
   * @returns {pv.Layout.sunburst} this.
   */
  mark.size = function(f) {
    radius = function(x) { return Math.sqrt(f(x)); };
    return this;
  };

  mark.nodes = data;

  return mark;
};
pv.Layout.force = function(nodes, links) {
  var layout = {
          charge: pv.Force.charge(),
          drag: pv.Force.drag(),
          spring: pv.Force.spring()
        },
      sim;

  /** @private */
  function data() {
    if (!sim) {
      /* Initialize position using a random walk from the center. */
      var x = this.parent.width() / 2,
          y = this.parent.height() / 2;
      for (var i = 0, n, a; i < nodes.length; i++) {
        n = nodes[i];
        a = Math.random() * 2 * Math.PI;
        n.x = x += 4 * Math.cos(a);
        n.y = y += 4 * Math.sin(a);
      }

      sim = pv.simulation(nodes);
      sim.force(layout.charge);
      sim.force(layout.drag);
      sim.force(layout.spring.links(links));
      sim.step();
    }
    return nodes;
  }

  layout.nodes = nodes = nodes.map(function(d, i) {
      return {nodeName: i, nodeValue: d, linkDegree: 0};
    });

  layout.links = links = links.map(function(d) {
      var s = nodes[d.source],
          t = nodes[d.target],
          v = isNaN(d.value) ? 1 : d.value;
      s.linkDegree += v;
      t.linkDegree += v;
      return {sourceNode: s, targetNode: t, linkValue: v};
    });

  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; });

  layout.link = new pv.Mark().extend(layout.node)
      .data(function(p) { return [p.sourceNode, p.targetNode]; })
      .fillStyle(null)
      .lineWidth(function(d, p) { return Math.sqrt(p.linkValue) * 1.5; })
      .strokeStyle("rgba(0,0,0,.2)");

  layout.step = function() { sim.step(); };

  return layout;
};

pv.Layout.cluster = function(map) {
  var nodes, // cached pv.dom(map).nodes()
      sort, // optional sort function
      orient = "top", // default orientation
      g = 0, // amount to group leaves
      w, // cached parent panel width
      h, // cached parent panel height
      r, // cached Math.min(w, h) / 2
      ds; // cached depth step (inverse depth of tree)

  /** @private Compute the maximum depth of descendants for each node. */
  function depth(n) {
    var d = 0;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      d = Math.max(d, 1 + depth(c));
    }
    return n.depth = d;
  }

  /** @private Cache the parent panel dimensions to avoid repeated lookup. */
  function init() {
    w = this.parent.width();
    h = this.parent.height();
    r = Math.min(w, h) / 2;
  }

  /** @private The layout, on which all public methods are registered. */
  function layout() {
    /* If the layout was previously computed, use that. */
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();

    /* Sort the tree and compute the initial depth of each node. */
    var root = nodes[0];
    if (sort) root.sort(sort);
    ds = 1 / depth(root);

    /* Count the number of leaf nodes. */
    var leafCount = 0, p;
    root.visitAfter(function(n) {
        if (!n.firstChild) {
          if (g && (p != n.parentNode)) {
            p = n.parentNode;
            leafCount += g;
          }
          leafCount++;
        }
      });

    /* Compute the unit breadth and depth of each node. */
    var leafIndex = .5 - g / 2, step = 1 / leafCount, p = undefined;
    root.visitAfter(function(n) {
        if (n.firstChild) {
          var b = 0;
          for (var c = n.firstChild; c; c = c.nextSibling) b += c.breadth;
          b /= n.childNodes.length;
        } else {
          if (g && (p != n.parentNode)) {
            p = n.parentNode;
            leafIndex += g;
          }
          b = step * leafIndex++;
        }
        n.breadth = b;
        n.depth = 1 - n.depth / root.depth;
      });

    /* Compute breadth and depth ranges for space-filling layouts. */
    root.visitAfter(function(n) {
        n.minBreadth = n.firstChild ? n.firstChild.minBreadth : (n.breadth - step / 2);
        n.maxBreadth = n.firstChild ? n.lastChild.maxBreadth : (n.breadth + step / 2);
      });
    root.visitBefore(function(n) {
        n.minDepth = n.parentNode ? n.parentNode.maxDepth : 0;
        n.maxDepth = n.parentNode ? (n.depth + root.depth) : (n.minDepth + 2 * root.depth);
      });
    root.minDepth = -ds;
    return nodes;
  }

  /**
   * Sets or gets the orientation. The default orientation is "left", which
   * means that the root node is placed on the left edge, leaf nodes appear on
   * the right edge, and internal nodes are in-between. The following
   * orientations are supported:<ul>
   *
   * <li>left - left-to-right.
   * <li>right - right-to-left.
   * <li>top - top-to-bottom.
   * <li>bottom - bottom-to-top.
   * <li>radial - radially, with the root at the center.</ul>
   *
   * @param {string} v the new orientation.
   * @function
   * @name pv.Layout.cluster.prototype.orient
   * @returns {pv.Layout.cluster} this, or the current orientation.
   */
  layout.orient = function(v) {
    if (arguments.length) {
      orient = String(v);
      return this;
    }
    return orient;
  };

  /**
   * Sets or gets the sort function. The sort function is applied to the tree
   * before the layout is computed; it is a comparator function which takes two
   * arguments and returns a negative number, a positive number, or zero as
   * appropriate. For example, to sort on the node names:
   *
   * <pre>  .sort(function(a, b) pv.naturalOrder(a.nodeName, b.nodeName))</pre>
   *
   * @param {function} f the new sort function.
   * @function
   * @name pv.Layout.cluster.prototype.sort
   * @returns {pv.Layout.cluster} this, or the current sort function.
   * @see pv.naturalOrder
   * @see pv.Dom.Node.prototype.sort
   */
  layout.sort = function(f) {
    if (arguments.length) {
      sort = f;
      return this;
    }
    return sort;
  };

  /**
   * Sets or gets whether leaves of a given parent are grouped, i.e., whether
   * differentiating space is placed between sibling leaf groups. The default is
   * 0 (or false), causing non-sibling leaves to be adjacent. Setting this to
   * true (or 1) uses one leaf's worth of spacing between groups.
   *
   * @param {number} x the new group spacing.
   * @function
   * @name pv.Layout.cluster.prototype.groupLeaves
   * @returns {pv.Layout.cluster} this, or the current group spacing.
   */
  layout.groupLeaves = function(x) {
    if (arguments.length) {
      g = Number(x);
      return this;
    }
    return g;
  };

  /**
   * Returns the nodes associated with this layout.
   *
   * @function
   * @name pv.Layout.cluster.prototype.nodes
   * @returns {array}
   */
  layout.nodes = layout;

  /**
   * Returns the links associated with this layout. Each link is represented as
   * a two-element array; the first element is the child node, and the second
   * element is the parent node.
   *
   * @function
   * @name pv.Layout.cluster.prototype.links
   * @returns {array}
   */
  layout.links = function() {
    return layout().slice(1).map(function(n) { return [n, n.parentNode]; });
  };

  /** @private Returns the radius of the given node. */
  function radius(n) {
    return n.parentNode ? (n.depth * r) : 0;
  }

  /** @private Returns the angle of the given node. */
  function angle(n) {
    return n.parentNode ? (n.breadth - .25) * 2 * Math.PI : 0;
  }

  /** @private Scales the specified depth for a space-filling layout. */
  function scale(d, ds) {
    return (d + ds) / (1 + ds);
  }

  /**
   * The node prototype. This prototype is intended to be used with a Dot mark
   * in conjunction with the link prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.cluster.prototype.node
   */
  layout.node = new pv.Mark()
      .def("init", init)
      .data(layout)
      .strokeStyle("#1f77b4")
      .fillStyle("white")
      .left(function(n) {
          switch (orient) {
            case "left": return n.depth * w;
            case "right": return w - n.depth * w;
            case "top": return n.breadth * w;
            case "bottom": return w - n.breadth * w;
            case "radial": return w / 2 + radius(n) * Math.cos(angle(n));
          }
        })
      .top(function(n) {
          switch (orient) {
            case "left": return n.breadth * h;
            case "right": return h - n.breadth * h;
            case "top": return n.depth * h;
            case "bottom": return h - n.depth * h;
            case "radial": return h / 2 + radius(n) * Math.sin(angle(n));
          }
        });

  /**
   * The link prototype, which renders edges between child nodes and their
   * parents. This prototype is intended to be used with a Line mark in
   * conjunction with the node prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.cluster.prototype.link
   */
  layout.link = new pv.Mark()
      .extend(layout.node)
      .data(pv.identity)
      .antialias(function() { return orient == "radial"; })
      .interpolate(function() {
          switch (orient) {
            case "top":
            case "bottom": return "step-before";
            case "left":
            case "right": return "step-after";
          }
        })
      .strokeStyle("#ccc")
      .fillStyle(null);

  /**
   * The node label prototype, which renders the node name adjacent to the node.
   * This prototype is provided as an alternative to using the anchor on the
   * node or fill mark; it is primarily intended to be used with radial
   * node-link layouts, since it provides a convenient mechanism to set the text
   * angle.
   *
   * @type pv.Mark
   * @name pv.Layout.cluster.prototype.label
   */
  layout.label = new pv.Mark()
      .extend(layout.node)
      .textMargin(7)
      .textBaseline("middle")
      .text(function(n) { return n.parentNode ? n.nodeName : "root"; })
      .textAngle(function(n) {
          if (orient != "radial") return 0;
          var a = angle(n);
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textAlign(function(n) {
          if (orient != "radial") return n.firstChild ? "right" : "left";
          return pv.Wedge.upright(angle(n)) ? "left" : "right";
        });

  /**
   * The fill prototype, used for a space-filling dendrogram. In Cartesian
   * coordinates (i.e., if the orientation is not "radial"), a Bar mark is
   * typically used to fill the space; in polar coordinates ("radial"
   * orientation), a Wedge mark is used instead.
   *
   * @type pv.Mark
   * @name pv.Layout.cluster.prototype.bar
   */
  layout.fill = new pv.Mark()
      .extend(layout.node)
      .strokeStyle("#fff")
      .fillStyle("#ccc")
      .left(function(n) {
          switch (orient) {
            case "left": return scale(n.minDepth, ds) * w;
            case "right": return (1 - scale(n.maxDepth, ds)) * w;
            case "top": return n.minBreadth * w;
            case "bottom": return (1 - n.maxBreadth) * w;
            case "radial": return w / 2;
          }
        })
      .top(function(n) {
          switch (orient) {
            case "left": return n.minBreadth * h;
            case "right": return (1 - n.maxBreadth) * h;
            case "top": return scale(n.minDepth, ds) * h;
            case "bottom": return (1 - scale(n.maxDepth, ds)) * h;
            case "radial": return h / 2;
          }
        })
      .width(function(n) {
          switch (orient) {
            case "left":
            case "right": return (n.maxDepth - n.minDepth) / (1 + ds) * w;
            case "top":
            case "bottom": return (n.maxBreadth - n.minBreadth) * w;
          }
        })
      .height(function(n) {
          switch (orient) {
            case "left":
            case "right": return (n.maxBreadth - n.minBreadth) * h;
            case "top":
            case "bottom": return (n.maxDepth - n.minDepth) / (1 + ds) * h;
          }
        })
      .innerRadius(function(n) { return Math.max(0, scale(n.minDepth, ds / 2)) * r; })
      .outerRadius(function(n) { return scale(n.maxDepth, ds / 2) * r; })
      .startAngle(function(n) { return (n.parentNode ? n.minBreadth - .25 : 0) * 2 * Math.PI; })
      .endAngle(function(n) { return (n.parentNode ? n.maxBreadth - .25 : 1) * 2 * Math.PI; });

  return layout;
};
pv.Layout.partition = function(map) {
  var nodes, // cached pv.dom(map).nodes()
      sort, // optional sort function
      sizeof = function(n) { return 1; }, // default size function
      orient = "top", // default orientation
      w, // cached parent panel width
      h, // cached parent panel height
      r, // cached Math.min(w, h) / 2
      ds; // cached depth step (inverse depth of tree)

  /** @private */
  function size(n) {
    return n.size = n.firstChild
        ? pv.sum(n.childNodes, size)
        : sizeof(n.nodeValue);
  }

  /** @private Compute the maximum depth of descendants for each node. */
  function depth(n) {
    return n.firstChild ? (1 + pv.max(n.childNodes, depth)) : 0;
  }

  /** @private */
  function data() {
    /* Cache the parent panel dimensions to avoid repeated lookup. */
    w = this.parent.width();
    h = this.parent.height();
    r = Math.min(w, h) / 2;

    /* If the layout was previously computed, use that. */
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();

    /* Sort the tree and compute the initial depth of each node. */
    var root = nodes[0];
    size(root);
    if (sort) root.sort(sort);
    ds = 1 / depth(root);

    /* Compute the unit breadth and depth of each node. */
    root.minBreadth = 0;
    root.breadth = .5;
    root.maxBreadth = 1;
    root.visitBefore(function(n) {
        var b = n.minBreadth, s = n.maxBreadth - b;
        for (var c = n.firstChild; c; c = c.nextSibling) {
          c.minBreadth = b;
          c.maxBreadth = b += (c.size / n.size) * s;
          c.breadth = (b + c.minBreadth) / 2;
        }
      });
    root.visitAfter(function(n, i) {
        n.minDepth = (i - 1) * ds;
        n.maxDepth = n.depth = i * ds;
      });

    return nodes;
  }

  /** @private The layout, on which all public methods are registered. */
  var layout = {};

  /**
   * Sets or gets the orientation. The default orientation is "left", which
   * means that the root node is placed on the left edge, leaf nodes appear on
   * the right edge, and internal nodes are in-between. The following
   * orientations are supported:<ul>
   *
   * <li>left - left-to-right.
   * <li>right - right-to-left.
   * <li>top - top-to-bottom.
   * <li>bottom - bottom-to-top.
   * <li>radial - radially, with the root at the center.</ul>
   *
   * @param {string} v the new orientation.
   * @function
   * @name pv.Layout.partition.prototype.orient
   * @returns {pv.Layout.partition} this, or the current orientation.
   */
  layout.orient = function(v) {
    if (arguments.length) {
      orient = v;
      return this;
    }
    return orient;
  };

  /**
   * Sets or gets the sort function. The sort function is applied to the tree
   * before the layout is computed; it is a comparator function which takes two
   * arguments and returns a negative number, a positive number, or zero as
   * appropriate. For example, to sort on the node names:
   *
   * <pre>  .sort(function(a, b) pv.naturalOrder(a.nodeName, b.nodeName))</pre>
   *
   * @param {funtion} f the new sort function.
   * @function
   * @name pv.Layout.partition.prototype.sort
   * @returns {pv.Layout.partition} this, or the current sort function.
   * @see pv.naturalOrder
   * @see pv.Dom.Node.prototype.sort
   */
  layout.sort = function(f) {
    if (arguments.length) {
      sort = f;
      return this;
    }
    return sort;
  };

  /**
   * Returns the nodes associated with this layout.
   *
   * @function
   * @name pv.Layout.partition.prototype.nodes
   * @returns {array}
   */
  layout.nodes = data;

  /**
   * Returns the links associated with this layout. Each link is represented as
   * a two-element array; the first element is the child node, and the second
   * element is the parent node.
   *
   * @function
   * @name pv.Layout.partition.prototype.links
   * @returns {array}
   */
  layout.links = function() {
    return data.call(this)
        .filter(function(n) { return n.parentNode; })
        .map(function(n) { return [n, n.parentNode]; });
  };

  /**
   * Sets or gets the sizing function. By default, the size of all leaf nodes is
   * constant. The aggregate sizes of internal (non-leaf) nodes is computed
   * automatically by the layout.
   *
   * <p>For example, if the tree data structure represents a file system, with
   * files as leaf nodes, and each file has a <tt>bytes</tt> attribute, you can
   * specify a size function as:
   *
   * <pre>.size(function(d) d.bytes)</pre>
   *
   * <p>Note that the built-in <tt>Number</tt>, <tt>Math.sqrt</tt> and
   * <tt>Math.log</tt> methods can be used as sizing functions, provided the
   * node values are numbers.
   *
   * @param {function} f the new sizing function.
   * @function
   * @name pv.Layout.partition.prototype.size
   * @returns {pv.Layout.partition} this.
   */
  layout.size = function(f) {
    if (arguments.length) {
      sizeof = f;
      return this;
    }
    return sizeof;
  };

  /** @private Returns the radius of the given node. */
  function radius(n) {
    return n.parentNode ? (n.depth * r) : 0;
  }

  /** @private Returns the angle of the given node. */
  function angle(n) {
    return n.parentNode ? (n.breadth - .25) * 2 * Math.PI : 0;
  }

  /** @private Scales the specified depth for a space-filling layout. */
  function scale(d, ds) {
    return (d + ds) / (1 + ds);
  }

  /**
   * The node prototype. This prototype is intended to be used with a Dot mark
   * in conjunction with the link prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.partition.prototype.node
   */
  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) {
          switch (orient) {
            case "left": return n.depth * w;
            case "right": return w - n.depth * w;
            case "top": return n.breadth * w;
            case "bottom": return w - n.breadth * w;
            case "radial": return w / 2 + radius(n) * Math.cos(angle(n));
          }
        })
      .top(function(n) {
          switch (orient) {
            case "left": return n.breadth * h;
            case "right": return h - n.breadth * h;
            case "top": return n.depth * h;
            case "bottom": return h - n.depth * h;
            case "radial": return h / 2 + radius(n) * Math.sin(angle(n));
          }
        });

  /**
   * The link prototype, which renders edges between child nodes and their
   * parents. This prototype is intended to be used with a Line mark in
   * conjunction with the node prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.partition.prototype.link
   */
  layout.link = new pv.Mark()
      .extend(layout.node)
      .data(pv.identity)
      .strokeStyle("#ccc")
      .fillStyle(null);

  /**
   * The node label prototype, which renders the node name adjacent to the node.
   * This prototype is provided as an alternative to using the anchor on the
   * node or fill mark; it is primarily intended to be used with radial
   * node-link layouts, since it provides a convenient mechanism to set the text
   * angle.
   *
   * @type pv.Mark
   * @name pv.Layout.partition.prototype.label
   */
  layout.label = new pv.Mark()
      .extend(layout.node)
      .textMargin(7)
      .textBaseline("middle")
      .text(function(n) { return n.parentNode ? n.nodeName : "root"; })
      .textAngle(function(n) {
          if (orient != "radial") return 0;
          var a = angle(n);
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textAlign(function(n) {
          if (orient != "radial") return n.firstChild ? "right" : "left";
          return pv.Wedge.upright(angle(n)) ? "left" : "right";
        });

  /**
   * The fill prototype, used for a space-filling partition. In Cartesian
   * coordinates (i.e., if the orientation is not "radial"), a Bar mark is
   * typically used to fill the space; in polar coordinates ("radial"
   * orientation), a Wedge mark is used instead.
   *
   * @type pv.Mark
   * @name pv.Layout.partition.prototype.bar
   */
  layout.fill = new pv.Mark()
      .data(data)
      .strokeStyle("#fff")
      .fillStyle("#ccc")
      .left(function(n) {
          switch (orient) {
            case "left": return scale(n.minDepth, ds) * w;
            case "right": return (1 - scale(n.maxDepth, ds)) * w;
            case "top": return n.minBreadth * w;
            case "bottom": return (1 - n.maxBreadth) * w;
            case "radial": return w / 2;
          }
        })
      .top(function(n) {
          switch (orient) {
            case "left": return n.minBreadth * h;
            case "right": return (1 - n.maxBreadth) * h;
            case "top": return scale(n.minDepth, ds) * h;
            case "bottom": return (1 - scale(n.maxDepth, ds)) * h;
            case "radial": return h / 2;
          }
        })
      .width(function(n) {
          switch (orient) {
            case "left":
            case "right": return (n.maxDepth - n.minDepth) / (1 + ds) * w;
            case "top":
            case "bottom": return (n.maxBreadth - n.minBreadth) * w;
          }
        })
      .height(function(n) {
          switch (orient) {
            case "left":
            case "right": return (n.maxBreadth - n.minBreadth) * h;
            case "top":
            case "bottom": return (n.maxDepth - n.minDepth) / (1 + ds) * h;
          }
        })
      .innerRadius(function(n) { return Math.max(0, scale(n.minDepth, ds / 2)) * r; })
      .outerRadius(function(n) { return scale(n.maxDepth, ds / 2) * r; })
      .startAngle(function(n) { return (n.minBreadth - .25) * 2 * Math.PI; })
      .endAngle(function(n) { return (n.maxBreadth - .25) * 2 * Math.PI; });

  return layout;
};
pv.Layout.arc = function(nodes, links) {
  var orient = "top",
      directed = false,
      w, // the cached parent panel width
      h, // cached parent panel height
      r; // cached Math.min(w, h) / 2

  /** @private */
  function init() {
    w = this.parent.width();
    h = this.parent.height();
    r = Math.min(w, h) / 2;
    for (var i = 0, n = nodes.length; i < n; i++) {
      nodes[i].breadth = (i + .5) / n;
    }
  }

  /** @private The layout, on which all public methods are registered. */
  var layout = {};

  /**
   * Sets or gets the orientation. The default orientation is "left", which
   * means that the root node is placed on the left edge, leaf nodes appear on
   * the right edge, and internal nodes are in-between. The following
   * orientations are supported:<ul>
   *
   * <li>left - left-to-right.
   * <li>right - right-to-left.
   * <li>top - top-to-bottom.
   * <li>bottom - bottom-to-top.
   * <li>radial - radially, with the root at the center.</ul>
   *
   * @param {string} v the new orientation.
   * @function
   * @name pv.Layout.arc.prototype.orient
   * @returns {pv.Layout.arc} this, or the current orientation.
   */
  layout.orient = function(v) {
    if (arguments.length) {
      orient = String(v);
      return this;
    }
    return orient;
  };

  /**
   * Sets or gets whether this arc digram is directed (bidirectional). By
   * default, arc digrams are undirected, such that all arcs will appear on one
   * side (for non-radial orientations). If the arc digram is directed, then
   * forward links will exist on the conventional side (the same as as
   * undirected links--right, left, bottom and top for left, right, top and
   * bottom, respectively), while reverse links exist on the opposite side.
   *
   * @param {boolean} x whether or not this arc digram is directed.
   * @function
   * @name pv.Layout.arc.prototype.directed
   * @returns {pv.Layout.arc} this, or the current directedness.
   */
  layout.directed = function(x) {
    if (arguments.length) {
      directed = Boolean(x);
      return this;
    }
    return directed;
  };

  /**
   * Returns the nodes associated with this layout.
   *
   * @function
   * @name pv.Layout.arc.prototype.nodes
   * @returns {array}
   */
  layout.nodes = nodes = nodes.map(function(d, i) {
      return {nodeName: i, nodeValue: d, linkDegree: 0};
    });

  /**
   * Returns the links associated with this layout. Each link is represented as
   * a two-element array; the first element is the source node, and the second
   * element is the target node.
   *
   * @function
   * @name pv.Layout.arc.prototype.links
   * @returns {array}
   */
  layout.links = links = links.map(function(d) {
      var s = nodes[d.source],
          t = nodes[d.target],
          l = [s, t],
          v = isNaN(d.value) ? 1 : d.value;
      s.linkDegree += v;
      t.linkDegree += v;
      l.linkValue = v;
      return l;
    });

  /** @private Returns the angle of the given node. */
  function angle(n) {
    return (n.breadth - .25) * 2 * Math.PI;
  }

  /**
   * The node prototype. This prototype is intended to be used with a Dot mark
   * in conjunction with the link prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.arc.prototype.node
   */
  layout.node = new pv.Mark()
      .def("init", init)
      .data(nodes)
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) {
          switch (orient) {
            case "top":
            case "bottom": return n.breadth * w;
            case "left": return 0;
            case "right": return w;
            case "radial": return w / 2 + r * Math.cos(angle(n));
          }
        })
      .top(function top(n) {
          switch (orient) {
            case "top": return 0;
            case "bottom": return h;
            case "left":
            case "right": return n.breadth * h;
            case "radial": return h / 2 + r * Math.sin(angle(n));
          }
        });

  /**
   * The link prototype, which renders edges between child nodes and their
   * parents. This prototype is intended to be used with a Line mark in
   * conjunction with the node prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.arc.prototype.link
   */
  layout.link = new pv.Mark()
      .extend(layout.node)
      .interpolate(function() {
          return (orient == "radial") ? "linear" : "polar";
        })
      .data(function(p) {
          return (directed || (p[0].breadth < p[1].breadth))
              ? p // no reverse necessary, arc will be drawn as intended
              : [p[1], p[0]];
        })
      .fillStyle(null)
      .lineWidth(function(d, p) { return p.linkValue * 1.5; })
      .strokeStyle("rgba(0,0,0,.2)");

  /**
   * The node label prototype, which renders the node name adjacent to the node.
   * This prototype is provided as an alternative to using the anchor on the
   * node mark; it is primarily intended to be used with radial node-link
   * layouts, since it provides a convenient mechanism to set the text angle.
   *
   * @type pv.Mark
   * @name pv.Layout.arc.prototype.label
   */
  layout.label = new pv.Mark()
      .extend(layout.node)
      .textMargin(7)
      .textBaseline("middle")
      .text(function(n) { return n.nodeValue; })
      .textAngle(function(n) {
          switch (orient) {
            case "top":
            case "bottom": return -Math.PI / 2;
            case "left":
            case "right": return 0;
          }
          var a = angle(n);
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textAlign(function(n) {
          switch (orient) {
            case "top":
            case "right": return "left";
            case "bottom":
            case "left": return "right";
          }
          return pv.Wedge.upright(angle(n)) ? "left" : "right";
        });

  return layout;
};

pv.Layout.horizon = function() {
  var bands, // number of bands
      mirror = true, // whether to mirror or offset
      size, // band size
      red, // negative band color
      blue; // positive band color

  /** @private */
  function data() {
    size = Math.round(this.parent.height());
    return pv.range(bands * 2);
  }

  var layout = new pv.Mark()
      .top(function(d, i) { return mirror && (i % 2) ? 0 : null; })
      .bottom(function(d, i) { return mirror && (i % 2) ? null : 0; })
      .fillStyle(function(d, i) { return (i % 2) ? red : blue; });

  layout.band = new pv.Mark()
      .data(data)
      .overflow("hidden")
      .height(function() { return size; })
      .transform(function(i) {
          var y = Math.floor((i + 1) / 2) * size * (!mirror && (i % 2) ? -1 : 1);
          return pv.Transform.identity.translate(0, y);
        });

  layout.bands = function(x) {
    if (arguments.length) {
      bands = Number(x);
      var a = 1 / (bands + 1);
      red = pv.color("red").alpha(a);
      blue = pv.color("blue").alpha(a);
      return this;
    }
    return bands;
  };

  layout.mode = function(x) {
    if (arguments.length) {
      switch (x) {
        case "mirror": mirror = true; break;
        case "offset": mirror = false; break;
      }
      return this;
    }
    return mirror;
  };

  return layout.bands(2);
};
/**
 * @ignore
 * @namespace
 */
pv.Behavior = {};
pv.Behavior.drag = function() {
  var scene, // scene context
      index, // scene context
      p, // particle being dragged
      v1; // initial mouse-particle offset

  function mousedown(d) {
    index = this.index;
    scene = this.scene;
    var m = this.mouse();
    v1 = pv.vector(d.x, d.y).minus(m);
    p = d;
    p.fixed = true;
  }

  function mousemove() {
    if (!scene) return;
    scene.mark.context(scene, index, function() {
        var m = this.mouse();
        p.x = v1.x + m.x;
        p.y = v1.y + m.y;
      });
  }

  function mouseup() {
    if (!scene) return;
    mousemove();
    p.fixed = false;
    p = null;
    scene = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
pv.Behavior.point = function(r) {
  var unpoint, // the current pointer target
      collapse = null, // dimensions to collapse
      kx = 1, // x-dimension cost scale
      ky = 1, // y-dimension cost scale
      r2 = arguments.length ? r * r : 900; // fuzzy radius

  /** @private Creates a fake mouse event of the specified type. */
  function event(type) {
    var e = document.createEvent("MouseEvents");
    e.initEvent(type, true, false);
    return e;
  }

  /** @Private Search for the mark closest to the mouse. */
  function search(scene, index) {
    var v = scene.mark.mouse(),
        s = scene[index],
        point = {cost: Infinity};
    for (var i = 0, n = s.children.length; i < n; i++) {
      var child = s.children[i], p;
      if (child.mark.type == "panel") {
        for (var j = 0, m = child.length; j < m; j++) {
          p = search(child, j);
          if (p.cost < point.cost) point = p;
        }
      } else if (child.mark.$handlers.point) {
        for (var j = 0, m = child.length; j < m; j++) {
          var c = child[j],
              dx = v.x - c.left,
              dy = v.y - c.top,
              dd = kx * dx * dx + ky * dy * dy;
          if (dd < point.cost) {
            point.distance = dx * dx + dy * dy;
            point.cost = dd;
            point.scene = child;
            point.index = j;
          }
        }
      }
    }
    return point;
  }

  function mousemove() {
    /* If the closest mark is far away, clear the current target. */
    var point = search(this.scene, this.index);
    if (point.distance > r2) point = null;

    /* Unpoint the old target, if it's not the new target. */
    if (unpoint) {
      if (point
          && (unpoint.scene == point.scene)
          && (unpoint.index == point.index)) return;
      pv.Mark.dispatch(event("unpoint"), unpoint.scene, unpoint.index);
    }

    /* Point the new target, if there is one. */
    if (unpoint = point) {
      pv.Mark.dispatch(event("point"), point.scene, point.index);
    }
  }

  mousemove.collapse = function(x) {
    if (arguments.length) {
      collapse = String(x);
      switch (collapse) {
        case "y": kx = 1; ky = 0; break;
        case "x": kx = 0; ky = 1; break;
        default: kx = 1; ky = 1; break;
      }
      return mousemove;
    }
    return collapse;
  };

  return mousemove;
};
pv.Behavior.select = function(f) {
  var target, m1, index, scenes, args, region;

  /* Setup the scene stack. */
  function setup() {
    var m = target, s = scenes, i = index;
    do {
      m.index = i;
      m.scene = s;
      i = s.parentIndex;
      s = s.parent;
    } while (m = m.parent);
  }

  function mousedown() {
    target = this;
    index = target.index;
    scenes = target.scene;
    m1 = this.mouse();
    region = {};
    region.left = m1.x;
    region.top = m1.y;
    region.right = target.width() - m1.x;
    region.bottom = target.height() - m1.y;
    region.width = 0;
    region.height = 0;
    args = Array.prototype.concat.apply([region], arguments);
    f.apply(this, args);
  }

  function mousemove() {
    if (!target) return;
    setup();
    var m2 = target.mouse();
    region.left = Math.max(0, Math.min(m1.x, m2.x));
    region.top = Math.max(0, Math.min(m1.y, m2.y));
    region.right = Math.max(0, target.width() - Math.max(m1.x, m2.x));
    region.bottom = Math.max(0, target.height() - Math.max(m1.y, m2.y));
    region.width = Math.max(0, target.width() - region.left - region.right);
    region.height = Math.max(0, target.height() - region.top - region.bottom);
    f.apply(target, args);
  }

  function mouseup() {
    mousemove();
    target = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
pv.Behavior.pan = function() {
  var scene, // scene context
      index, // scene context
      m1, // transformation matrix at the start of panning
      v1, // mouse location at the start of panning
      k; // inverse scale

  function mousedown() {
    index = this.index;
    scene = this.scene;
    v1 = pv.vector(pv.event.pageX, pv.event.pageY);
    m1 = this.transform();
    k = 1 / (m1.k * this.scale);
  }

  function mousemove() {
    if (!scene) return;
    scene.mark.context(scene, index, function() {
        var x = (pv.event.pageX - v1.x) * k,
            y = (pv.event.pageY - v1.y) * k;
        this.transform(m1.translate(x, y)).render();
      });
  }

  function mouseup() {
    mousemove();
    scene = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
pv.Behavior.zoom = function() {
  return function() {
      var v = this.mouse(), k = window.event.wheelDelta;
      this.transform(this.transform().translate(v.x, v.y)
          .scale((k < 0) ? (1000 / (1000 - k)) : ((1000 + k) / 1000))
          .translate(-v.x, -v.y)).render();
    };
};
/*
 * Parses the Protovis specifications on load, allowing the use of JavaScript
 * 1.8 function expressions on browsers that only support JavaScript 1.6.
 *
 * @see pv.parse
 */
pv.listen(window, "load", function() {
   /*
    * Note: in Firefox any variables declared here are visible to the eval'd
    * script below. Even worse, any global variables declared by the script
    * could overwrite local variables here (such as the index, `i`)!  To protect
    * against this, all variables are explicitly scoped on a pv.$ object.
    */
    pv.$ = {i:0, x:document.getElementsByTagName("script")};
    for (; pv.$.i < pv.$.x.length; pv.$.i++) {
      pv.$.s = pv.$.x[pv.$.i];
      if (pv.$.s.type == "text/javascript+protovis") {
        try {
          window.eval(pv.parse(pv.$.s.textContent || pv.$.s.innerHTML));
        } catch (e) {
          pv.error(e);
        }
      }
    }
    delete pv.$;
  });
