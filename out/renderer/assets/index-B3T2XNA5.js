function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReact_production_min;
function requireReact_production_min() {
  if (hasRequiredReact_production_min) return react_production_min;
  hasRequiredReact_production_min = 1;
  var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u2 = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z2 = Symbol.iterator;
  function A2(a2) {
    if (null === a2 || "object" !== typeof a2) return null;
    a2 = z2 && a2[z2] || a2["@@iterator"];
    return "function" === typeof a2 ? a2 : null;
  }
  var B = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, C = Object.assign, D = {};
  function E2(a2, b, e2) {
    this.props = a2;
    this.context = b;
    this.refs = D;
    this.updater = e2 || B;
  }
  E2.prototype.isReactComponent = {};
  E2.prototype.setState = function(a2, b) {
    if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a2, b, "setState");
  };
  E2.prototype.forceUpdate = function(a2) {
    this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
  };
  function F2() {
  }
  F2.prototype = E2.prototype;
  function G(a2, b, e2) {
    this.props = a2;
    this.context = b;
    this.refs = D;
    this.updater = e2 || B;
  }
  var H = G.prototype = new F2();
  H.constructor = G;
  C(H, E2.prototype);
  H.isPureReactComponent = true;
  var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L2 = { key: true, ref: true, __self: true, __source: true };
  function M(a2, b, e2) {
    var d, c = {}, k = null, h = null;
    if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L2.hasOwnProperty(d) && (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g) c.children = e2;
    else if (1 < g) {
      for (var f2 = Array(g), m = 0; m < g; m++) f2[m] = arguments[m + 2];
      c.children = f2;
    }
    if (a2 && a2.defaultProps) for (d in g = a2.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
    return { $$typeof: l, type: a2, key: k, ref: h, props: c, _owner: K.current };
  }
  function N(a2, b) {
    return { $$typeof: l, type: a2.type, key: b, ref: a2.ref, props: a2.props, _owner: a2._owner };
  }
  function O(a2) {
    return "object" === typeof a2 && null !== a2 && a2.$$typeof === l;
  }
  function escape(a2) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + a2.replace(/[=:]/g, function(a3) {
      return b[a3];
    });
  }
  var P = /\/+/g;
  function Q(a2, b) {
    return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b.toString(36);
  }
  function R(a2, b, e2, d, c) {
    var k = typeof a2;
    if ("undefined" === k || "boolean" === k) a2 = null;
    var h = false;
    if (null === a2) h = true;
    else switch (k) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a2.$$typeof) {
          case l:
          case n:
            h = true;
        }
    }
    if (h) return h = a2, c = c(h), a2 = "" === d ? "." + Q(h, 0) : d, I(c) ? (e2 = "", null != a2 && (e2 = a2.replace(P, "$&/") + "/"), R(c, b, e2, "", function(a3) {
      return a3;
    })) : null != c && (O(c) && (c = N(c, e2 + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a2)), b.push(c)), 1;
    h = 0;
    d = "" === d ? "." : d + ":";
    if (I(a2)) for (var g = 0; g < a2.length; g++) {
      k = a2[g];
      var f2 = d + Q(k, g);
      h += R(k, b, e2, f2, c);
    }
    else if (f2 = A2(a2), "function" === typeof f2) for (a2 = f2.call(a2), g = 0; !(k = a2.next()).done; ) k = k.value, f2 = d + Q(k, g++), h += R(k, b, e2, f2, c);
    else if ("object" === k) throw b = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h;
  }
  function S(a2, b, e2) {
    if (null == a2) return a2;
    var d = [], c = 0;
    R(a2, d, "", "", function(a3) {
      return b.call(e2, a3, c++);
    });
    return d;
  }
  function T2(a2) {
    if (-1 === a2._status) {
      var b = a2._result;
      b = b();
      b.then(function(b2) {
        if (0 === a2._status || -1 === a2._status) a2._status = 1, a2._result = b2;
      }, function(b2) {
        if (0 === a2._status || -1 === a2._status) a2._status = 2, a2._result = b2;
      });
      -1 === a2._status && (a2._status = 0, a2._result = b);
    }
    if (1 === a2._status) return a2._result.default;
    throw a2._result;
  }
  var U2 = { current: null }, V2 = { transition: null }, W = { ReactCurrentDispatcher: U2, ReactCurrentBatchConfig: V2, ReactCurrentOwner: K };
  function X() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S, forEach: function(a2, b, e2) {
    S(a2, function() {
      b.apply(this, arguments);
    }, e2);
  }, count: function(a2) {
    var b = 0;
    S(a2, function() {
      b++;
    });
    return b;
  }, toArray: function(a2) {
    return S(a2, function(a3) {
      return a3;
    }) || [];
  }, only: function(a2) {
    if (!O(a2)) throw Error("React.Children.only expected to receive a single React element child.");
    return a2;
  } };
  react_production_min.Component = E2;
  react_production_min.Fragment = p;
  react_production_min.Profiler = r;
  react_production_min.PureComponent = G;
  react_production_min.StrictMode = q;
  react_production_min.Suspense = w;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
  react_production_min.act = X;
  react_production_min.cloneElement = function(a2, b, e2) {
    if (null === a2 || void 0 === a2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
    var d = C({}, a2.props), c = a2.key, k = a2.ref, h = a2._owner;
    if (null != b) {
      void 0 !== b.ref && (k = b.ref, h = K.current);
      void 0 !== b.key && (c = "" + b.key);
      if (a2.type && a2.type.defaultProps) var g = a2.type.defaultProps;
      for (f2 in b) J.call(b, f2) && !L2.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
    }
    var f2 = arguments.length - 2;
    if (1 === f2) d.children = e2;
    else if (1 < f2) {
      g = Array(f2);
      for (var m = 0; m < f2; m++) g[m] = arguments[m + 2];
      d.children = g;
    }
    return { $$typeof: l, type: a2.type, key: c, ref: k, props: d, _owner: h };
  };
  react_production_min.createContext = function(a2) {
    a2 = { $$typeof: u2, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a2.Provider = { $$typeof: t, _context: a2 };
    return a2.Consumer = a2;
  };
  react_production_min.createElement = M;
  react_production_min.createFactory = function(a2) {
    var b = M.bind(null, a2);
    b.type = a2;
    return b;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a2) {
    return { $$typeof: v, render: a2 };
  };
  react_production_min.isValidElement = O;
  react_production_min.lazy = function(a2) {
    return { $$typeof: y, _payload: { _status: -1, _result: a2 }, _init: T2 };
  };
  react_production_min.memo = function(a2, b) {
    return { $$typeof: x, type: a2, compare: void 0 === b ? null : b };
  };
  react_production_min.startTransition = function(a2) {
    var b = V2.transition;
    V2.transition = {};
    try {
      a2();
    } finally {
      V2.transition = b;
    }
  };
  react_production_min.unstable_act = X;
  react_production_min.useCallback = function(a2, b) {
    return U2.current.useCallback(a2, b);
  };
  react_production_min.useContext = function(a2) {
    return U2.current.useContext(a2);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a2) {
    return U2.current.useDeferredValue(a2);
  };
  react_production_min.useEffect = function(a2, b) {
    return U2.current.useEffect(a2, b);
  };
  react_production_min.useId = function() {
    return U2.current.useId();
  };
  react_production_min.useImperativeHandle = function(a2, b, e2) {
    return U2.current.useImperativeHandle(a2, b, e2);
  };
  react_production_min.useInsertionEffect = function(a2, b) {
    return U2.current.useInsertionEffect(a2, b);
  };
  react_production_min.useLayoutEffect = function(a2, b) {
    return U2.current.useLayoutEffect(a2, b);
  };
  react_production_min.useMemo = function(a2, b) {
    return U2.current.useMemo(a2, b);
  };
  react_production_min.useReducer = function(a2, b, e2) {
    return U2.current.useReducer(a2, b, e2);
  };
  react_production_min.useRef = function(a2) {
    return U2.current.useRef(a2);
  };
  react_production_min.useState = function(a2) {
    return U2.current.useState(a2);
  };
  react_production_min.useSyncExternalStore = function(a2, b, e2) {
    return U2.current.useSyncExternalStore(a2, b, e2);
  };
  react_production_min.useTransition = function() {
    return U2.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  return react_production_min;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production_min();
  }
  return react.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f2 = requireReact(), k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a2, g) {
    var b, d = {}, e2 = null, h = null;
    void 0 !== g && (e2 = "" + g);
    void 0 !== a2.key && (e2 = "" + a2.key);
    void 0 !== a2.ref && (h = a2.ref);
    for (b in a2) m.call(a2, b) && !p.hasOwnProperty(b) && (d[b] = a2[b]);
    if (c && c.defaultProps) for (b in a2 = c.defaultProps, a2) void 0 === d[b] && (d[b] = a2[b]);
    return { $$typeof: k, type: c, key: e2, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredScheduler_production_min;
function requireScheduler_production_min() {
  if (hasRequiredScheduler_production_min) return scheduler_production_min;
  hasRequiredScheduler_production_min = 1;
  (function(exports$1) {
    function f2(a2, b) {
      var c = a2.length;
      a2.push(b);
      a: for (; 0 < c; ) {
        var d = c - 1 >>> 1, e2 = a2[d];
        if (0 < g(e2, b)) a2[d] = b, a2[c] = e2, c = d;
        else break a;
      }
    }
    function h(a2) {
      return 0 === a2.length ? null : a2[0];
    }
    function k(a2) {
      if (0 === a2.length) return null;
      var b = a2[0], c = a2.pop();
      if (c !== b) {
        a2[0] = c;
        a: for (var d = 0, e2 = a2.length, w = e2 >>> 1; d < w; ) {
          var m = 2 * (d + 1) - 1, C = a2[m], n = m + 1, x = a2[n];
          if (0 > g(C, c)) n < e2 && 0 > g(x, C) ? (a2[d] = x, a2[n] = c, d = n) : (a2[d] = C, a2[m] = c, d = m);
          else if (n < e2 && 0 > g(x, c)) a2[d] = x, a2[n] = c, d = n;
          else break a;
        }
      }
      return b;
    }
    function g(a2, b) {
      var c = a2.sortIndex - b.sortIndex;
      return 0 !== c ? c : a2.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l = performance;
      exports$1.unstable_now = function() {
        return l.now();
      };
    } else {
      var p = Date, q = p.now();
      exports$1.unstable_now = function() {
        return p.now() - q;
      };
    }
    var r = [], t = [], u2 = 1, v = null, y = 3, z2 = false, A2 = false, B = false, D = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G(a2) {
      for (var b = h(t); null !== b; ) {
        if (null === b.callback) k(t);
        else if (b.startTime <= a2) k(t), b.sortIndex = b.expirationTime, f2(r, b);
        else break;
        b = h(t);
      }
    }
    function H(a2) {
      B = false;
      G(a2);
      if (!A2) if (null !== h(r)) A2 = true, I(J);
      else {
        var b = h(t);
        null !== b && K(H, b.startTime - a2);
      }
    }
    function J(a2, b) {
      A2 = false;
      B && (B = false, E2(L2), L2 = -1);
      z2 = true;
      var c = y;
      try {
        G(b);
        for (v = h(r); null !== v && (!(v.expirationTime > b) || a2 && !M()); ) {
          var d = v.callback;
          if ("function" === typeof d) {
            v.callback = null;
            y = v.priorityLevel;
            var e2 = d(v.expirationTime <= b);
            b = exports$1.unstable_now();
            "function" === typeof e2 ? v.callback = e2 : v === h(r) && k(r);
            G(b);
          } else k(r);
          v = h(r);
        }
        if (null !== v) var w = true;
        else {
          var m = h(t);
          null !== m && K(H, m.startTime - b);
          w = false;
        }
        return w;
      } finally {
        v = null, y = c, z2 = false;
      }
    }
    var N = false, O = null, L2 = -1, P = 5, Q = -1;
    function M() {
      return exports$1.unstable_now() - Q < P ? false : true;
    }
    function R() {
      if (null !== O) {
        var a2 = exports$1.unstable_now();
        Q = a2;
        var b = true;
        try {
          b = O(true, a2);
        } finally {
          b ? S() : (N = false, O = null);
        }
      } else N = false;
    }
    var S;
    if ("function" === typeof F2) S = function() {
      F2(R);
    };
    else if ("undefined" !== typeof MessageChannel) {
      var T2 = new MessageChannel(), U2 = T2.port2;
      T2.port1.onmessage = R;
      S = function() {
        U2.postMessage(null);
      };
    } else S = function() {
      D(R, 0);
    };
    function I(a2) {
      O = a2;
      N || (N = true, S());
    }
    function K(a2, b) {
      L2 = D(function() {
        a2(exports$1.unstable_now());
      }, b);
    }
    exports$1.unstable_IdlePriority = 5;
    exports$1.unstable_ImmediatePriority = 1;
    exports$1.unstable_LowPriority = 4;
    exports$1.unstable_NormalPriority = 3;
    exports$1.unstable_Profiling = null;
    exports$1.unstable_UserBlockingPriority = 2;
    exports$1.unstable_cancelCallback = function(a2) {
      a2.callback = null;
    };
    exports$1.unstable_continueExecution = function() {
      A2 || z2 || (A2 = true, I(J));
    };
    exports$1.unstable_forceFrameRate = function(a2) {
      0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a2 ? Math.floor(1e3 / a2) : 5;
    };
    exports$1.unstable_getCurrentPriorityLevel = function() {
      return y;
    };
    exports$1.unstable_getFirstCallbackNode = function() {
      return h(r);
    };
    exports$1.unstable_next = function(a2) {
      switch (y) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y;
      }
      var c = y;
      y = b;
      try {
        return a2();
      } finally {
        y = c;
      }
    };
    exports$1.unstable_pauseExecution = function() {
    };
    exports$1.unstable_requestPaint = function() {
    };
    exports$1.unstable_runWithPriority = function(a2, b) {
      switch (a2) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a2 = 3;
      }
      var c = y;
      y = a2;
      try {
        return b();
      } finally {
        y = c;
      }
    };
    exports$1.unstable_scheduleCallback = function(a2, b, c) {
      var d = exports$1.unstable_now();
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a2) {
        case 1:
          var e2 = -1;
          break;
        case 2:
          e2 = 250;
          break;
        case 5:
          e2 = 1073741823;
          break;
        case 4:
          e2 = 1e4;
          break;
        default:
          e2 = 5e3;
      }
      e2 = c + e2;
      a2 = { id: u2++, callback: b, priorityLevel: a2, startTime: c, expirationTime: e2, sortIndex: -1 };
      c > d ? (a2.sortIndex = c, f2(t, a2), null === h(r) && a2 === h(t) && (B ? (E2(L2), L2 = -1) : B = true, K(H, c - d))) : (a2.sortIndex = e2, f2(r, a2), A2 || z2 || (A2 = true, I(J)));
      return a2;
    };
    exports$1.unstable_shouldYield = M;
    exports$1.unstable_wrapCallback = function(a2) {
      var b = y;
      return function() {
        var c = y;
        y = b;
        try {
          return a2.apply(this, arguments);
        } finally {
          y = c;
        }
      };
    };
  })(scheduler_production_min);
  return scheduler_production_min;
}
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler.exports;
  hasRequiredScheduler = 1;
  {
    scheduler.exports = requireScheduler_production_min();
  }
  return scheduler.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDom_production_min;
function requireReactDom_production_min() {
  if (hasRequiredReactDom_production_min) return reactDom_production_min;
  hasRequiredReactDom_production_min = 1;
  var aa = requireReact(), ca = requireScheduler();
  function p(a2) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = /* @__PURE__ */ new Set(), ea = {};
  function fa(a2, b) {
    ha(a2, b);
    ha(a2 + "Capture", b);
  }
  function ha(a2, b) {
    ea[a2] = b;
    for (a2 = 0; a2 < b.length; a2++) da.add(b[a2]);
  }
  var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
  function oa(a2) {
    if (ja.call(ma, a2)) return true;
    if (ja.call(la, a2)) return false;
    if (ka.test(a2)) return ma[a2] = true;
    la[a2] = true;
    return false;
  }
  function pa(a2, b, c, d) {
    if (null !== c && 0 === c.type) return false;
    switch (typeof b) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d) return false;
        if (null !== c) return !c.acceptsBooleans;
        a2 = a2.toLowerCase().slice(0, 5);
        return "data-" !== a2 && "aria-" !== a2;
      default:
        return false;
    }
  }
  function qa(a2, b, c, d) {
    if (null === b || "undefined" === typeof b || pa(a2, b, c, d)) return true;
    if (d) return false;
    if (null !== c) switch (c.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
    return false;
  }
  function v(a2, b, c, d, e2, f2, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = e2;
    this.mustUseProperty = c;
    this.propertyName = a2;
    this.type = b;
    this.sanitizeURL = f2;
    this.removeEmptyString = g;
  }
  var z2 = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
    z2[a2] = new v(a2, 0, false, a2, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
    var b = a2[0];
    z2[b] = new v(b, 1, false, a2[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
    z2[a2] = new v(a2, 2, false, a2.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
    z2[a2] = new v(a2, 2, false, a2, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
    z2[a2] = new v(a2, 3, false, a2.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a2) {
    z2[a2] = new v(a2, 3, true, a2, null, false, false);
  });
  ["capture", "download"].forEach(function(a2) {
    z2[a2] = new v(a2, 4, false, a2, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a2) {
    z2[a2] = new v(a2, 6, false, a2, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a2) {
    z2[a2] = new v(a2, 5, false, a2.toLowerCase(), null, false, false);
  });
  var ra = /[\-:]([a-z])/g;
  function sa(a2) {
    return a2[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
    var b = a2.replace(
      ra,
      sa
    );
    z2[b] = new v(b, 1, false, a2, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
    var b = a2.replace(ra, sa);
    z2[b] = new v(b, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
    var b = a2.replace(ra, sa);
    z2[b] = new v(b, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a2) {
    z2[a2] = new v(a2, 1, false, a2.toLowerCase(), null, false, false);
  });
  z2.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a2) {
    z2[a2] = new v(a2, 1, false, a2.toLowerCase(), null, true, true);
  });
  function ta(a2, b, c, d) {
    var e2 = z2.hasOwnProperty(b) ? z2[b] : null;
    if (null !== e2 ? 0 !== e2.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e2, d) && (c = null), d || null === e2 ? oa(b) && (null === c ? a2.removeAttribute(b) : a2.setAttribute(b, "" + c)) : e2.mustUseProperty ? a2[e2.propertyName] = null === c ? 3 === e2.type ? false : "" : c : (b = e2.attributeName, d = e2.attributeNamespace, null === c ? a2.removeAttribute(b) : (e2 = e2.type, c = 3 === e2 || 4 === e2 && true === c ? "" : "" + c, d ? a2.setAttributeNS(d, b, c) : a2.setAttribute(b, c)));
  }
  var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
  var Ia = Symbol.for("react.offscreen");
  var Ja = Symbol.iterator;
  function Ka(a2) {
    if (null === a2 || "object" !== typeof a2) return null;
    a2 = Ja && a2[Ja] || a2["@@iterator"];
    return "function" === typeof a2 ? a2 : null;
  }
  var A2 = Object.assign, La;
  function Ma(a2) {
    if (void 0 === La) try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
    return "\n" + La + a2;
  }
  var Na = false;
  function Oa(a2, b) {
    if (!a2 || Na) return "";
    Na = true;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b) if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l) {
          var d = l;
        }
        Reflect.construct(a2, [], b);
      } else {
        try {
          b.call();
        } catch (l) {
          d = l;
        }
        a2.call(b.prototype);
      }
      else {
        try {
          throw Error();
        } catch (l) {
          d = l;
        }
        a2();
      }
    } catch (l) {
      if (l && d && "string" === typeof l.stack) {
        for (var e2 = l.stack.split("\n"), f2 = d.stack.split("\n"), g = e2.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e2[g] !== f2[h]; ) h--;
        for (; 1 <= g && 0 <= h; g--, h--) if (e2[g] !== f2[h]) {
          if (1 !== g || 1 !== h) {
            do
              if (g--, h--, 0 > h || e2[g] !== f2[h]) {
                var k = "\n" + e2[g].replace(" at new ", " at ");
                a2.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a2.displayName));
                return k;
              }
            while (1 <= g && 0 <= h);
          }
          break;
        }
      }
    } finally {
      Na = false, Error.prepareStackTrace = c;
    }
    return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
  }
  function Pa(a2) {
    switch (a2.tag) {
      case 5:
        return Ma(a2.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a2 = Oa(a2.type, false), a2;
      case 11:
        return a2 = Oa(a2.type.render, false), a2;
      case 1:
        return a2 = Oa(a2.type, true), a2;
      default:
        return "";
    }
  }
  function Qa(a2) {
    if (null == a2) return null;
    if ("function" === typeof a2) return a2.displayName || a2.name || null;
    if ("string" === typeof a2) return a2;
    switch (a2) {
      case ya:
        return "Fragment";
      case wa:
        return "Portal";
      case Aa:
        return "Profiler";
      case za:
        return "StrictMode";
      case Ea:
        return "Suspense";
      case Fa:
        return "SuspenseList";
    }
    if ("object" === typeof a2) switch (a2.$$typeof) {
      case Ca:
        return (a2.displayName || "Context") + ".Consumer";
      case Ba:
        return (a2._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b.displayName || b.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case Ga:
        return b = a2.displayName || null, null !== b ? b : Qa(a2.type) || "Memo";
      case Ha:
        b = a2._payload;
        a2 = a2._init;
        try {
          return Qa(a2(b));
        } catch (c) {
        }
    }
    return null;
  }
  function Ra(a2) {
    var b = a2.type;
    switch (a2.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b.displayName || "Context") + ".Consumer";
      case 10:
        return (b._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a2 = b.render, a2 = a2.displayName || a2.name || "", b.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Qa(b);
      case 8:
        return b === za ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b) return b.displayName || b.name || null;
        if ("string" === typeof b) return b;
    }
    return null;
  }
  function Sa(a2) {
    switch (typeof a2) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a2;
      case "object":
        return a2;
      default:
        return "";
    }
  }
  function Ta(a2) {
    var b = a2.type;
    return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b || "radio" === b);
  }
  function Ua(a2) {
    var b = Ta(a2) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b), d = "" + a2[b];
    if (!a2.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
      var e2 = c.get, f2 = c.set;
      Object.defineProperty(a2, b, { configurable: true, get: function() {
        return e2.call(this);
      }, set: function(a3) {
        d = "" + a3;
        f2.call(this, a3);
      } });
      Object.defineProperty(a2, b, { enumerable: c.enumerable });
      return { getValue: function() {
        return d;
      }, setValue: function(a3) {
        d = "" + a3;
      }, stopTracking: function() {
        a2._valueTracker = null;
        delete a2[b];
      } };
    }
  }
  function Va(a2) {
    a2._valueTracker || (a2._valueTracker = Ua(a2));
  }
  function Wa(a2) {
    if (!a2) return false;
    var b = a2._valueTracker;
    if (!b) return true;
    var c = b.getValue();
    var d = "";
    a2 && (d = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
    a2 = d;
    return a2 !== c ? (b.setValue(a2), true) : false;
  }
  function Xa(a2) {
    a2 = a2 || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a2) return null;
    try {
      return a2.activeElement || a2.body;
    } catch (b) {
      return a2.body;
    }
  }
  function Ya(a2, b) {
    var c = b.checked;
    return A2({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a2._wrapperState.initialChecked });
  }
  function Za(a2, b) {
    var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
    c = Sa(null != b.value ? b.value : c);
    a2._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
  }
  function ab(a2, b) {
    b = b.checked;
    null != b && ta(a2, "checked", b, false);
  }
  function bb(a2, b) {
    ab(a2, b);
    var c = Sa(b.value), d = b.type;
    if (null != c) if ("number" === d) {
      if (0 === c && "" === a2.value || a2.value != c) a2.value = "" + c;
    } else a2.value !== "" + c && (a2.value = "" + c);
    else if ("submit" === d || "reset" === d) {
      a2.removeAttribute("value");
      return;
    }
    b.hasOwnProperty("value") ? cb(a2, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a2, b.type, Sa(b.defaultValue));
    null == b.checked && null != b.defaultChecked && (a2.defaultChecked = !!b.defaultChecked);
  }
  function db(a2, b, c) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
      var d = b.type;
      if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
      b = "" + a2._wrapperState.initialValue;
      c || b === a2.value || (a2.value = b);
      a2.defaultValue = b;
    }
    c = a2.name;
    "" !== c && (a2.name = "");
    a2.defaultChecked = !!a2._wrapperState.initialChecked;
    "" !== c && (a2.name = c);
  }
  function cb(a2, b, c) {
    if ("number" !== b || Xa(a2.ownerDocument) !== a2) null == c ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c && (a2.defaultValue = "" + c);
  }
  var eb = Array.isArray;
  function fb(a2, b, c, d) {
    a2 = a2.options;
    if (b) {
      b = {};
      for (var e2 = 0; e2 < c.length; e2++) b["$" + c[e2]] = true;
      for (c = 0; c < a2.length; c++) e2 = b.hasOwnProperty("$" + a2[c].value), a2[c].selected !== e2 && (a2[c].selected = e2), e2 && d && (a2[c].defaultSelected = true);
    } else {
      c = "" + Sa(c);
      b = null;
      for (e2 = 0; e2 < a2.length; e2++) {
        if (a2[e2].value === c) {
          a2[e2].selected = true;
          d && (a2[e2].defaultSelected = true);
          return;
        }
        null !== b || a2[e2].disabled || (b = a2[e2]);
      }
      null !== b && (b.selected = true);
    }
  }
  function gb(a2, b) {
    if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
    return A2({}, b, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
  }
  function hb(a2, b) {
    var c = b.value;
    if (null == c) {
      c = b.children;
      b = b.defaultValue;
      if (null != c) {
        if (null != b) throw Error(p(92));
        if (eb(c)) {
          if (1 < c.length) throw Error(p(93));
          c = c[0];
        }
        b = c;
      }
      null == b && (b = "");
      c = b;
    }
    a2._wrapperState = { initialValue: Sa(c) };
  }
  function ib(a2, b) {
    var c = Sa(b.value), d = Sa(b.defaultValue);
    null != c && (c = "" + c, c !== a2.value && (a2.value = c), null == b.defaultValue && a2.defaultValue !== c && (a2.defaultValue = c));
    null != d && (a2.defaultValue = "" + d);
  }
  function jb(a2) {
    var b = a2.textContent;
    b === a2._wrapperState.initialValue && "" !== b && null !== b && (a2.value = b);
  }
  function kb(a2) {
    switch (a2) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function lb(a2, b) {
    return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb(b) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a2;
  }
  var mb, nb = (function(a2) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e2) {
      MSApp.execUnsafeLocalFunction(function() {
        return a2(b, c, d, e2);
      });
    } : a2;
  })(function(a2, b) {
    if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2) a2.innerHTML = b;
    else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = mb.firstChild; a2.firstChild; ) a2.removeChild(a2.firstChild);
      for (; b.firstChild; ) a2.appendChild(b.firstChild);
    }
  });
  function ob(a2, b) {
    if (b) {
      var c = a2.firstChild;
      if (c && c === a2.lastChild && 3 === c.nodeType) {
        c.nodeValue = b;
        return;
      }
    }
    a2.textContent = b;
  }
  var pb = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, qb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(pb).forEach(function(a2) {
    qb.forEach(function(b) {
      b = b + a2.charAt(0).toUpperCase() + a2.substring(1);
      pb[b] = pb[a2];
    });
  });
  function rb(a2, b, c) {
    return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b).trim() : b + "px";
  }
  function sb(a2, b) {
    a2 = a2.style;
    for (var c in b) if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"), e2 = rb(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a2.setProperty(c, e2) : a2[c] = e2;
    }
  }
  var tb = A2({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function ub(a2, b) {
    if (b) {
      if (tb[a2] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a2));
      if (null != b.dangerouslySetInnerHTML) {
        if (null != b.children) throw Error(p(60));
        if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
      }
      if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
    }
  }
  function vb(a2, b) {
    if (-1 === a2.indexOf("-")) return "string" === typeof b.is;
    switch (a2) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var wb = null;
  function xb(a2) {
    a2 = a2.target || a2.srcElement || window;
    a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
    return 3 === a2.nodeType ? a2.parentNode : a2;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a2) {
    if (a2 = Cb(a2)) {
      if ("function" !== typeof yb) throw Error(p(280));
      var b = a2.stateNode;
      b && (b = Db(b), yb(a2.stateNode, a2.type, b));
    }
  }
  function Eb(a2) {
    zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
  }
  function Fb() {
    if (zb) {
      var a2 = zb, b = Ab;
      Ab = zb = null;
      Bb(a2);
      if (b) for (a2 = 0; a2 < b.length; a2++) Bb(b[a2]);
    }
  }
  function Gb(a2, b) {
    return a2(b);
  }
  function Hb() {
  }
  var Ib = false;
  function Jb(a2, b, c) {
    if (Ib) return a2(b, c);
    Ib = true;
    try {
      return Gb(a2, b, c);
    } finally {
      if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
    }
  }
  function Kb(a2, b) {
    var c = a2.stateNode;
    if (null === c) return null;
    var d = Db(c);
    if (null === d) return null;
    c = d[b];
    a: switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a2 = a2.type, d = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
        a2 = !d;
        break a;
      default:
        a2 = false;
    }
    if (a2) return null;
    if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
    return c;
  }
  var Lb = false;
  if (ia) try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a2) {
    Lb = false;
  }
  function Nb(a2, b, c, d, e2, f2, g, h, k) {
    var l = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c, l);
    } catch (m) {
      this.onError(m);
    }
  }
  var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a2) {
    Ob = true;
    Pb = a2;
  } };
  function Tb(a2, b, c, d, e2, f2, g, h, k) {
    Ob = false;
    Pb = null;
    Nb.apply(Sb, arguments);
  }
  function Ub(a2, b, c, d, e2, f2, g, h, k) {
    Tb.apply(this, arguments);
    if (Ob) {
      if (Ob) {
        var l = Pb;
        Ob = false;
        Pb = null;
      } else throw Error(p(198));
      Qb || (Qb = true, Rb = l);
    }
  }
  function Vb(a2) {
    var b = a2, c = a2;
    if (a2.alternate) for (; b.return; ) b = b.return;
    else {
      a2 = b;
      do
        b = a2, 0 !== (b.flags & 4098) && (c = b.return), a2 = b.return;
      while (a2);
    }
    return 3 === b.tag ? c : null;
  }
  function Wb(a2) {
    if (13 === a2.tag) {
      var b = a2.memoizedState;
      null === b && (a2 = a2.alternate, null !== a2 && (b = a2.memoizedState));
      if (null !== b) return b.dehydrated;
    }
    return null;
  }
  function Xb(a2) {
    if (Vb(a2) !== a2) throw Error(p(188));
  }
  function Yb(a2) {
    var b = a2.alternate;
    if (!b) {
      b = Vb(a2);
      if (null === b) throw Error(p(188));
      return b !== a2 ? null : a2;
    }
    for (var c = a2, d = b; ; ) {
      var e2 = c.return;
      if (null === e2) break;
      var f2 = e2.alternate;
      if (null === f2) {
        d = e2.return;
        if (null !== d) {
          c = d;
          continue;
        }
        break;
      }
      if (e2.child === f2.child) {
        for (f2 = e2.child; f2; ) {
          if (f2 === c) return Xb(e2), a2;
          if (f2 === d) return Xb(e2), b;
          f2 = f2.sibling;
        }
        throw Error(p(188));
      }
      if (c.return !== d.return) c = e2, d = f2;
      else {
        for (var g = false, h = e2.child; h; ) {
          if (h === c) {
            g = true;
            c = e2;
            d = f2;
            break;
          }
          if (h === d) {
            g = true;
            d = e2;
            c = f2;
            break;
          }
          h = h.sibling;
        }
        if (!g) {
          for (h = f2.child; h; ) {
            if (h === c) {
              g = true;
              c = f2;
              d = e2;
              break;
            }
            if (h === d) {
              g = true;
              d = f2;
              c = e2;
              break;
            }
            h = h.sibling;
          }
          if (!g) throw Error(p(189));
        }
      }
      if (c.alternate !== d) throw Error(p(190));
    }
    if (3 !== c.tag) throw Error(p(188));
    return c.stateNode.current === c ? a2 : b;
  }
  function Zb(a2) {
    a2 = Yb(a2);
    return null !== a2 ? $b(a2) : null;
  }
  function $b(a2) {
    if (5 === a2.tag || 6 === a2.tag) return a2;
    for (a2 = a2.child; null !== a2; ) {
      var b = $b(a2);
      if (null !== b) return b;
      a2 = a2.sibling;
    }
    return null;
  }
  var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
  function mc(a2) {
    if (lc && "function" === typeof lc.onCommitFiberRoot) try {
      lc.onCommitFiberRoot(kc, a2, void 0, 128 === (a2.current.flags & 128));
    } catch (b) {
    }
  }
  var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
  function nc(a2) {
    a2 >>>= 0;
    return 0 === a2 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
  }
  var rc = 64, sc = 4194304;
  function tc(a2) {
    switch (a2 & -a2) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a2 & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a2 & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a2;
    }
  }
  function uc(a2, b) {
    var c = a2.pendingLanes;
    if (0 === c) return 0;
    var d = 0, e2 = a2.suspendedLanes, f2 = a2.pingedLanes, g = c & 268435455;
    if (0 !== g) {
      var h = g & ~e2;
      0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
    } else g = c & ~e2, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
    if (0 === d) return 0;
    if (0 !== b && b !== d && 0 === (b & e2) && (e2 = d & -d, f2 = b & -b, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240))) return b;
    0 !== (d & 4) && (d |= c & 16);
    b = a2.entangledLanes;
    if (0 !== b) for (a2 = a2.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e2 = 1 << c, d |= a2[c], b &= ~e2;
    return d;
  }
  function vc(a2, b) {
    switch (a2) {
      case 1:
      case 2:
      case 4:
        return b + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return b + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc(a2, b) {
    for (var c = a2.suspendedLanes, d = a2.pingedLanes, e2 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
      var g = 31 - oc(f2), h = 1 << g, k = e2[g];
      if (-1 === k) {
        if (0 === (h & c) || 0 !== (h & d)) e2[g] = vc(h, b);
      } else k <= b && (a2.expiredLanes |= h);
      f2 &= ~h;
    }
  }
  function xc(a2) {
    a2 = a2.pendingLanes & -1073741825;
    return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
  }
  function yc() {
    var a2 = rc;
    rc <<= 1;
    0 === (rc & 4194240) && (rc = 64);
    return a2;
  }
  function zc(a2) {
    for (var b = [], c = 0; 31 > c; c++) b.push(a2);
    return b;
  }
  function Ac(a2, b, c) {
    a2.pendingLanes |= b;
    536870912 !== b && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
    a2 = a2.eventTimes;
    b = 31 - oc(b);
    a2[b] = c;
  }
  function Bc(a2, b) {
    var c = a2.pendingLanes & ~b;
    a2.pendingLanes = b;
    a2.suspendedLanes = 0;
    a2.pingedLanes = 0;
    a2.expiredLanes &= b;
    a2.mutableReadLanes &= b;
    a2.entangledLanes &= b;
    b = a2.entanglements;
    var d = a2.eventTimes;
    for (a2 = a2.expirationTimes; 0 < c; ) {
      var e2 = 31 - oc(c), f2 = 1 << e2;
      b[e2] = 0;
      d[e2] = -1;
      a2[e2] = -1;
      c &= ~f2;
    }
  }
  function Cc(a2, b) {
    var c = a2.entangledLanes |= b;
    for (a2 = a2.entanglements; c; ) {
      var d = 31 - oc(c), e2 = 1 << d;
      e2 & b | a2[d] & b && (a2[d] |= b);
      c &= ~e2;
    }
  }
  var C = 0;
  function Dc(a2) {
    a2 &= -a2;
    return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Sc(a2, b) {
    switch (a2) {
      case "focusin":
      case "focusout":
        Lc = null;
        break;
      case "dragenter":
      case "dragleave":
        Mc = null;
        break;
      case "mouseover":
      case "mouseout":
        Nc = null;
        break;
      case "pointerover":
      case "pointerout":
        Oc.delete(b.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pc.delete(b.pointerId);
    }
  }
  function Tc(a2, b, c, d, e2, f2) {
    if (null === a2 || a2.nativeEvent !== f2) return a2 = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e2] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a2;
    a2.eventSystemFlags |= d;
    b = a2.targetContainers;
    null !== e2 && -1 === b.indexOf(e2) && b.push(e2);
    return a2;
  }
  function Uc(a2, b, c, d, e2) {
    switch (b) {
      case "focusin":
        return Lc = Tc(Lc, a2, b, c, d, e2), true;
      case "dragenter":
        return Mc = Tc(Mc, a2, b, c, d, e2), true;
      case "mouseover":
        return Nc = Tc(Nc, a2, b, c, d, e2), true;
      case "pointerover":
        var f2 = e2.pointerId;
        Oc.set(f2, Tc(Oc.get(f2) || null, a2, b, c, d, e2));
        return true;
      case "gotpointercapture":
        return f2 = e2.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a2, b, c, d, e2)), true;
    }
    return false;
  }
  function Vc(a2) {
    var b = Wc(a2.target);
    if (null !== b) {
      var c = Vb(b);
      if (null !== c) {
        if (b = c.tag, 13 === b) {
          if (b = Wb(c), null !== b) {
            a2.blockedOn = b;
            Ic(a2.priority, function() {
              Gc(c);
            });
            return;
          }
        } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
          a2.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a2.blockedOn = null;
  }
  function Xc(a2) {
    if (null !== a2.blockedOn) return false;
    for (var b = a2.targetContainers; 0 < b.length; ) {
      var c = Yc(a2.domEventName, a2.eventSystemFlags, b[0], a2.nativeEvent);
      if (null === c) {
        c = a2.nativeEvent;
        var d = new c.constructor(c.type, c);
        wb = d;
        c.target.dispatchEvent(d);
        wb = null;
      } else return b = Cb(c), null !== b && Fc(b), a2.blockedOn = c, false;
      b.shift();
    }
    return true;
  }
  function Zc(a2, b, c) {
    Xc(a2) && c.delete(b);
  }
  function $c() {
    Jc = false;
    null !== Lc && Xc(Lc) && (Lc = null);
    null !== Mc && Xc(Mc) && (Mc = null);
    null !== Nc && Xc(Nc) && (Nc = null);
    Oc.forEach(Zc);
    Pc.forEach(Zc);
  }
  function ad(a2, b) {
    a2.blockedOn === b && (a2.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
  }
  function bd(a2) {
    function b(b2) {
      return ad(b2, a2);
    }
    if (0 < Kc.length) {
      ad(Kc[0], a2);
      for (var c = 1; c < Kc.length; c++) {
        var d = Kc[c];
        d.blockedOn === a2 && (d.blockedOn = null);
      }
    }
    null !== Lc && ad(Lc, a2);
    null !== Mc && ad(Mc, a2);
    null !== Nc && ad(Nc, a2);
    Oc.forEach(b);
    Pc.forEach(b);
    for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a2 && (d.blockedOn = null);
    for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
  }
  var cd = ua.ReactCurrentBatchConfig, dd = true;
  function ed(a2, b, c, d) {
    var e2 = C, f2 = cd.transition;
    cd.transition = null;
    try {
      C = 1, fd(a2, b, c, d);
    } finally {
      C = e2, cd.transition = f2;
    }
  }
  function gd(a2, b, c, d) {
    var e2 = C, f2 = cd.transition;
    cd.transition = null;
    try {
      C = 4, fd(a2, b, c, d);
    } finally {
      C = e2, cd.transition = f2;
    }
  }
  function fd(a2, b, c, d) {
    if (dd) {
      var e2 = Yc(a2, b, c, d);
      if (null === e2) hd(a2, b, d, id, c), Sc(a2, d);
      else if (Uc(e2, a2, b, c, d)) d.stopPropagation();
      else if (Sc(a2, d), b & 4 && -1 < Rc.indexOf(a2)) {
        for (; null !== e2; ) {
          var f2 = Cb(e2);
          null !== f2 && Ec(f2);
          f2 = Yc(a2, b, c, d);
          null === f2 && hd(a2, b, d, id, c);
          if (f2 === e2) break;
          e2 = f2;
        }
        null !== e2 && d.stopPropagation();
      } else hd(a2, b, d, null, c);
    }
  }
  var id = null;
  function Yc(a2, b, c, d) {
    id = null;
    a2 = xb(d);
    a2 = Wc(a2);
    if (null !== a2) if (b = Vb(a2), null === b) a2 = null;
    else if (c = b.tag, 13 === c) {
      a2 = Wb(b);
      if (null !== a2) return a2;
      a2 = null;
    } else if (3 === c) {
      if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
      a2 = null;
    } else b !== a2 && (a2 = null);
    id = a2;
    return null;
  }
  function jd(a2) {
    switch (a2) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ec()) {
          case fc:
            return 1;
          case gc:
            return 4;
          case hc:
          case ic:
            return 16;
          case jc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md) return md;
    var a2, b = ld, c = b.length, d, e2 = "value" in kd ? kd.value : kd.textContent, f2 = e2.length;
    for (a2 = 0; a2 < c && b[a2] === e2[a2]; a2++) ;
    var g = c - a2;
    for (d = 1; d <= g && b[c - d] === e2[f2 - d]; d++) ;
    return md = e2.slice(a2, 1 < d ? 1 - d : void 0);
  }
  function od(a2) {
    var b = a2.keyCode;
    "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b && (a2 = 13)) : a2 = b;
    10 === a2 && (a2 = 13);
    return 32 <= a2 || 13 === a2 ? a2 : 0;
  }
  function pd() {
    return true;
  }
  function qd() {
    return false;
  }
  function rd(a2) {
    function b(b2, d, e2, f2, g) {
      this._reactName = b2;
      this._targetInst = e2;
      this.type = d;
      this.nativeEvent = f2;
      this.target = g;
      this.currentTarget = null;
      for (var c in a2) a2.hasOwnProperty(c) && (b2 = a2[c], this[c] = b2 ? b2(f2) : f2[c]);
      this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
      this.isPropagationStopped = qd;
      return this;
    }
    A2(b.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a3 = this.nativeEvent;
      a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a3 = this.nativeEvent;
      a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd });
    return b;
  }
  var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
    return a2.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A2({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A2({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
    return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
  }, movementX: function(a2) {
    if ("movementX" in a2) return a2.movementX;
    a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
    return wd;
  }, movementY: function(a2) {
    return "movementY" in a2 ? a2.movementY : xd;
  } }), Bd = rd(Ad), Cd = A2({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A2({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A2({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A2({}, sd, { clipboardData: function(a2) {
    return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = A2({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Pd(a2) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a2) : (a2 = Od[a2]) ? !!b[a2] : false;
  }
  function zd() {
    return Pd;
  }
  var Qd = A2({}, ud, { key: function(a2) {
    if (a2.key) {
      var b = Md[a2.key] || a2.key;
      if ("Unidentified" !== b) return b;
    }
    return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
    return "keypress" === a2.type ? od(a2) : 0;
  }, keyCode: function(a2) {
    return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
  }, which: function(a2) {
    return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
  } }), Rd = rd(Qd), Sd = A2({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A2({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A2({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A2({}, Ad, {
    deltaX: function(a2) {
      return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
    },
    deltaY: function(a2) {
      return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
  ia && "documentMode" in document && (be = document.documentMode);
  var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
  function ge(a2, b) {
    switch (a2) {
      case "keyup":
        return -1 !== $d.indexOf(b.keyCode);
      case "keydown":
        return 229 !== b.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function he(a2) {
    a2 = a2.detail;
    return "object" === typeof a2 && "data" in a2 ? a2.data : null;
  }
  var ie = false;
  function je(a2, b) {
    switch (a2) {
      case "compositionend":
        return he(b);
      case "keypress":
        if (32 !== b.which) return null;
        fe = true;
        return ee;
      case "textInput":
        return a2 = b.data, a2 === ee && fe ? null : a2;
      default:
        return null;
    }
  }
  function ke(a2, b) {
    if (ie) return "compositionend" === a2 || !ae && ge(a2, b) ? (a2 = nd(), md = ld = kd = null, ie = false, a2) : null;
    switch (a2) {
      case "paste":
        return null;
      case "keypress":
        if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
          if (b.char && 1 < b.char.length) return b.char;
          if (b.which) return String.fromCharCode(b.which);
        }
        return null;
      case "compositionend":
        return de && "ko" !== b.locale ? null : b.data;
      default:
        return null;
    }
  }
  var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function me(a2) {
    var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
    return "input" === b ? !!le[a2.type] : "textarea" === b ? true : false;
  }
  function ne(a2, b, c, d) {
    Eb(d);
    b = oe(b, "onChange");
    0 < b.length && (c = new td("onChange", "change", null, c, d), a2.push({ event: c, listeners: b }));
  }
  var pe = null, qe = null;
  function re(a2) {
    se(a2, 0);
  }
  function te(a2) {
    var b = ue(a2);
    if (Wa(b)) return a2;
  }
  function ve(a2, b) {
    if ("change" === a2) return b;
  }
  var we = false;
  if (ia) {
    var xe;
    if (ia) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a2) {
    if ("value" === a2.propertyName && te(qe)) {
      var b = [];
      ne(b, qe, a2, xb(a2));
      Jb(re, b);
    }
  }
  function Ce(a2, b, c) {
    "focusin" === a2 ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a2 && Ae();
  }
  function De(a2) {
    if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2) return te(qe);
  }
  function Ee(a2, b) {
    if ("click" === a2) return te(b);
  }
  function Fe(a2, b) {
    if ("input" === a2 || "change" === a2) return te(b);
  }
  function Ge(a2, b) {
    return a2 === b && (0 !== a2 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
  }
  var He = "function" === typeof Object.is ? Object.is : Ge;
  function Ie(a2, b) {
    if (He(a2, b)) return true;
    if ("object" !== typeof a2 || null === a2 || "object" !== typeof b || null === b) return false;
    var c = Object.keys(a2), d = Object.keys(b);
    if (c.length !== d.length) return false;
    for (d = 0; d < c.length; d++) {
      var e2 = c[d];
      if (!ja.call(b, e2) || !He(a2[e2], b[e2])) return false;
    }
    return true;
  }
  function Je(a2) {
    for (; a2 && a2.firstChild; ) a2 = a2.firstChild;
    return a2;
  }
  function Ke(a2, b) {
    var c = Je(a2);
    a2 = 0;
    for (var d; c; ) {
      if (3 === c.nodeType) {
        d = a2 + c.textContent.length;
        if (a2 <= b && d >= b) return { node: c, offset: b - a2 };
        a2 = d;
      }
      a: {
        for (; c; ) {
          if (c.nextSibling) {
            c = c.nextSibling;
            break a;
          }
          c = c.parentNode;
        }
        c = void 0;
      }
      c = Je(c);
    }
  }
  function Le(a2, b) {
    return a2 && b ? a2 === b ? true : a2 && 3 === a2.nodeType ? false : b && 3 === b.nodeType ? Le(a2, b.parentNode) : "contains" in a2 ? a2.contains(b) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b) & 16) : false : false;
  }
  function Me() {
    for (var a2 = window, b = Xa(); b instanceof a2.HTMLIFrameElement; ) {
      try {
        var c = "string" === typeof b.contentWindow.location.href;
      } catch (d) {
        c = false;
      }
      if (c) a2 = b.contentWindow;
      else break;
      b = Xa(a2.document);
    }
    return b;
  }
  function Ne(a2) {
    var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
    return b && ("input" === b && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b || "true" === a2.contentEditable);
  }
  function Oe(a2) {
    var b = Me(), c = a2.focusedElem, d = a2.selectionRange;
    if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
      if (null !== d && Ne(c)) {
        if (b = d.start, a2 = d.end, void 0 === a2 && (a2 = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a2, c.value.length);
        else if (a2 = (b = c.ownerDocument || document) && b.defaultView || window, a2.getSelection) {
          a2 = a2.getSelection();
          var e2 = c.textContent.length, f2 = Math.min(d.start, e2);
          d = void 0 === d.end ? f2 : Math.min(d.end, e2);
          !a2.extend && f2 > d && (e2 = d, d = f2, f2 = e2);
          e2 = Ke(c, f2);
          var g = Ke(
            c,
            d
          );
          e2 && g && (1 !== a2.rangeCount || a2.anchorNode !== e2.node || a2.anchorOffset !== e2.offset || a2.focusNode !== g.node || a2.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e2.node, e2.offset), a2.removeAllRanges(), f2 > d ? (a2.addRange(b), a2.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a2.addRange(b)));
        }
      }
      b = [];
      for (a2 = c; a2 = a2.parentNode; ) 1 === a2.nodeType && b.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
      "function" === typeof c.focus && c.focus();
      for (c = 0; c < b.length; c++) a2 = b[c], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
    }
  }
  var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
  function Ue(a2, b, c) {
    var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
    Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a2.push({ event: b, listeners: d }), b.target = Qe)));
  }
  function Ve(a2, b) {
    var c = {};
    c[a2.toLowerCase()] = b.toLowerCase();
    c["Webkit" + a2] = "webkit" + b;
    c["Moz" + a2] = "moz" + b;
    return c;
  }
  var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
  ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
  function Ze(a2) {
    if (Xe[a2]) return Xe[a2];
    if (!We[a2]) return a2;
    var b = We[a2], c;
    for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a2] = b[c];
    return a2;
  }
  var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a2, b) {
    df.set(a2, b);
    fa(b, [a2]);
  }
  for (var gf = 0; gf < ef.length; gf++) {
    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
    ff(jf, "on" + kf);
  }
  ff($e, "onAnimationEnd");
  ff(af, "onAnimationIteration");
  ff(bf, "onAnimationStart");
  ff("dblclick", "onDoubleClick");
  ff("focusin", "onFocus");
  ff("focusout", "onBlur");
  ff(cf, "onTransitionEnd");
  ha("onMouseEnter", ["mouseout", "mouseover"]);
  ha("onMouseLeave", ["mouseout", "mouseover"]);
  ha("onPointerEnter", ["pointerout", "pointerover"]);
  ha("onPointerLeave", ["pointerout", "pointerover"]);
  fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
  function nf(a2, b, c) {
    var d = a2.type || "unknown-event";
    a2.currentTarget = c;
    Ub(d, b, void 0, a2);
    a2.currentTarget = null;
  }
  function se(a2, b) {
    b = 0 !== (b & 4);
    for (var c = 0; c < a2.length; c++) {
      var d = a2[c], e2 = d.event;
      d = d.listeners;
      a: {
        var f2 = void 0;
        if (b) for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k = h.instance, l = h.currentTarget;
          h = h.listener;
          if (k !== f2 && e2.isPropagationStopped()) break a;
          nf(e2, h, l);
          f2 = k;
        }
        else for (g = 0; g < d.length; g++) {
          h = d[g];
          k = h.instance;
          l = h.currentTarget;
          h = h.listener;
          if (k !== f2 && e2.isPropagationStopped()) break a;
          nf(e2, h, l);
          f2 = k;
        }
      }
    }
    if (Qb) throw a2 = Rb, Qb = false, Rb = null, a2;
  }
  function D(a2, b) {
    var c = b[of];
    void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
    var d = a2 + "__bubble";
    c.has(d) || (pf(b, a2, 2, false), c.add(d));
  }
  function qf(a2, b, c) {
    var d = 0;
    b && (d |= 4);
    pf(c, a2, d, b);
  }
  var rf = "_reactListening" + Math.random().toString(36).slice(2);
  function sf(a2) {
    if (!a2[rf]) {
      a2[rf] = true;
      da.forEach(function(b2) {
        "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a2), qf(b2, true, a2));
      });
      var b = 9 === a2.nodeType ? a2 : a2.ownerDocument;
      null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
    }
  }
  function pf(a2, b, c, d) {
    switch (jd(b)) {
      case 1:
        var e2 = ed;
        break;
      case 4:
        e2 = gd;
        break;
      default:
        e2 = fd;
    }
    c = e2.bind(null, b, c, a2);
    e2 = void 0;
    !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e2 = true);
    d ? void 0 !== e2 ? a2.addEventListener(b, c, { capture: true, passive: e2 }) : a2.addEventListener(b, c, true) : void 0 !== e2 ? a2.addEventListener(b, c, { passive: e2 }) : a2.addEventListener(b, c, false);
  }
  function hd(a2, b, c, d, e2) {
    var f2 = d;
    if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
      if (null === d) return;
      var g = d.tag;
      if (3 === g || 4 === g) {
        var h = d.stateNode.containerInfo;
        if (h === e2 || 8 === h.nodeType && h.parentNode === e2) break;
        if (4 === g) for (g = d.return; null !== g; ) {
          var k = g.tag;
          if (3 === k || 4 === k) {
            if (k = g.stateNode.containerInfo, k === e2 || 8 === k.nodeType && k.parentNode === e2) return;
          }
          g = g.return;
        }
        for (; null !== h; ) {
          g = Wc(h);
          if (null === g) return;
          k = g.tag;
          if (5 === k || 6 === k) {
            d = f2 = g;
            continue a;
          }
          h = h.parentNode;
        }
      }
      d = d.return;
    }
    Jb(function() {
      var d2 = f2, e3 = xb(c), g2 = [];
      a: {
        var h2 = df.get(a2);
        if (void 0 !== h2) {
          var k2 = td, n = a2;
          switch (a2) {
            case "keypress":
              if (0 === od(c)) break a;
            case "keydown":
            case "keyup":
              k2 = Rd;
              break;
            case "focusin":
              n = "focus";
              k2 = Fd;
              break;
            case "focusout":
              n = "blur";
              k2 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k2 = Fd;
              break;
            case "click":
              if (2 === c.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k2 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k2 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k2 = Vd;
              break;
            case $e:
            case af:
            case bf:
              k2 = Hd;
              break;
            case cf:
              k2 = Xd;
              break;
            case "scroll":
              k2 = vd;
              break;
            case "wheel":
              k2 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k2 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k2 = Td;
          }
          var t = 0 !== (b & 4), J = !t && "scroll" === a2, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
          t = [];
          for (var w = d2, u2; null !== w; ) {
            u2 = w;
            var F2 = u2.stateNode;
            5 === u2.tag && null !== F2 && (u2 = F2, null !== x && (F2 = Kb(w, x), null != F2 && t.push(tf(w, F2, u2))));
            if (J) break;
            w = w.return;
          }
          0 < t.length && (h2 = new k2(h2, n, null, c, e3), g2.push({ event: h2, listeners: t }));
        }
      }
      if (0 === (b & 7)) {
        a: {
          h2 = "mouseover" === a2 || "pointerover" === a2;
          k2 = "mouseout" === a2 || "pointerout" === a2;
          if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
          if (k2 || h2) {
            h2 = e3.window === e3 ? e3 : (h2 = e3.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
            if (k2) {
              if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
            } else k2 = null, n = d2;
            if (k2 !== n) {
              t = Bd;
              F2 = "onMouseLeave";
              x = "onMouseEnter";
              w = "mouse";
              if ("pointerout" === a2 || "pointerover" === a2) t = Td, F2 = "onPointerLeave", x = "onPointerEnter", w = "pointer";
              J = null == k2 ? h2 : ue(k2);
              u2 = null == n ? h2 : ue(n);
              h2 = new t(F2, w + "leave", k2, c, e3);
              h2.target = J;
              h2.relatedTarget = u2;
              F2 = null;
              Wc(e3) === d2 && (t = new t(x, w + "enter", n, c, e3), t.target = u2, t.relatedTarget = J, F2 = t);
              J = F2;
              if (k2 && n) b: {
                t = k2;
                x = n;
                w = 0;
                for (u2 = t; u2; u2 = vf(u2)) w++;
                u2 = 0;
                for (F2 = x; F2; F2 = vf(F2)) u2++;
                for (; 0 < w - u2; ) t = vf(t), w--;
                for (; 0 < u2 - w; ) x = vf(x), u2--;
                for (; w--; ) {
                  if (t === x || null !== x && t === x.alternate) break b;
                  t = vf(t);
                  x = vf(x);
                }
                t = null;
              }
              else t = null;
              null !== k2 && wf(g2, h2, k2, t, false);
              null !== n && null !== J && wf(g2, J, n, t, true);
            }
          }
        }
        a: {
          h2 = d2 ? ue(d2) : window;
          k2 = h2.nodeName && h2.nodeName.toLowerCase();
          if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
          else if (me(h2)) if (we) na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
          else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
          if (na && (na = na(a2, d2))) {
            ne(g2, na, c, e3);
            break a;
          }
          xa && xa(a2, h2, d2);
          "focusout" === a2 && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
        }
        xa = d2 ? ue(d2) : window;
        switch (a2) {
          case "focusin":
            if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = false;
            Ue(g2, c, e3);
            break;
          case "selectionchange":
            if (Pe) break;
          case "keydown":
          case "keyup":
            Ue(g2, c, e3);
        }
        var $a;
        if (ae) b: {
          switch (a2) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
        else ie ? ge(a2, c) && (ba = "onCompositionEnd") : "keydown" === a2 && 229 === c.keyCode && (ba = "onCompositionStart");
        ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e3, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a2, null, c, e3), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
        if ($a = ce ? je(a2, c) : ke(a2, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c, e3), g2.push({ event: e3, listeners: d2 }), e3.data = $a);
      }
      se(g2, b);
    });
  }
  function tf(a2, b, c) {
    return { instance: a2, listener: b, currentTarget: c };
  }
  function oe(a2, b) {
    for (var c = b + "Capture", d = []; null !== a2; ) {
      var e2 = a2, f2 = e2.stateNode;
      5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb(a2, c), null != f2 && d.unshift(tf(a2, f2, e2)), f2 = Kb(a2, b), null != f2 && d.push(tf(a2, f2, e2)));
      a2 = a2.return;
    }
    return d;
  }
  function vf(a2) {
    if (null === a2) return null;
    do
      a2 = a2.return;
    while (a2 && 5 !== a2.tag);
    return a2 ? a2 : null;
  }
  function wf(a2, b, c, d, e2) {
    for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
      var h = c, k = h.alternate, l = h.stateNode;
      if (null !== k && k === d) break;
      5 === h.tag && null !== l && (h = l, e2 ? (k = Kb(c, f2), null != k && g.unshift(tf(c, k, h))) : e2 || (k = Kb(c, f2), null != k && g.push(tf(c, k, h))));
      c = c.return;
    }
    0 !== g.length && a2.push({ event: b, listeners: g });
  }
  var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
  function zf(a2) {
    return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
  }
  function Af(a2, b, c) {
    b = zf(b);
    if (zf(a2) !== b && c) throw Error(p(425));
  }
  function Bf() {
  }
  var Cf = null, Df = null;
  function Ef(a2, b) {
    return "textarea" === a2 || "noscript" === a2 || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
  }
  var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
    return Hf.resolve(null).then(a2).catch(If);
  } : Ff;
  function If(a2) {
    setTimeout(function() {
      throw a2;
    });
  }
  function Kf(a2, b) {
    var c = b, d = 0;
    do {
      var e2 = c.nextSibling;
      a2.removeChild(c);
      if (e2 && 8 === e2.nodeType) if (c = e2.data, "/$" === c) {
        if (0 === d) {
          a2.removeChild(e2);
          bd(b);
          return;
        }
        d--;
      } else "$" !== c && "$?" !== c && "$!" !== c || d++;
      c = e2;
    } while (c);
    bd(b);
  }
  function Lf(a2) {
    for (; null != a2; a2 = a2.nextSibling) {
      var b = a2.nodeType;
      if (1 === b || 3 === b) break;
      if (8 === b) {
        b = a2.data;
        if ("$" === b || "$!" === b || "$?" === b) break;
        if ("/$" === b) return null;
      }
    }
    return a2;
  }
  function Mf(a2) {
    a2 = a2.previousSibling;
    for (var b = 0; a2; ) {
      if (8 === a2.nodeType) {
        var c = a2.data;
        if ("$" === c || "$!" === c || "$?" === c) {
          if (0 === b) return a2;
          b--;
        } else "/$" === c && b++;
      }
      a2 = a2.previousSibling;
    }
    return null;
  }
  var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
  function Wc(a2) {
    var b = a2[Of];
    if (b) return b;
    for (var c = a2.parentNode; c; ) {
      if (b = c[uf] || c[Of]) {
        c = b.alternate;
        if (null !== b.child || null !== c && null !== c.child) for (a2 = Mf(a2); null !== a2; ) {
          if (c = a2[Of]) return c;
          a2 = Mf(a2);
        }
        return b;
      }
      a2 = c;
      c = a2.parentNode;
    }
    return null;
  }
  function Cb(a2) {
    a2 = a2[Of] || a2[uf];
    return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
  }
  function ue(a2) {
    if (5 === a2.tag || 6 === a2.tag) return a2.stateNode;
    throw Error(p(33));
  }
  function Db(a2) {
    return a2[Pf] || null;
  }
  var Sf = [], Tf = -1;
  function Uf(a2) {
    return { current: a2 };
  }
  function E2(a2) {
    0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
  }
  function G(a2, b) {
    Tf++;
    Sf[Tf] = a2.current;
    a2.current = b;
  }
  var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
  function Yf(a2, b) {
    var c = a2.type.contextTypes;
    if (!c) return Vf;
    var d = a2.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
    var e2 = {}, f2;
    for (f2 in c) e2[f2] = b[f2];
    d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b, a2.__reactInternalMemoizedMaskedChildContext = e2);
    return e2;
  }
  function Zf(a2) {
    a2 = a2.childContextTypes;
    return null !== a2 && void 0 !== a2;
  }
  function $f() {
    E2(Wf);
    E2(H);
  }
  function ag(a2, b, c) {
    if (H.current !== Vf) throw Error(p(168));
    G(H, b);
    G(Wf, c);
  }
  function bg(a2, b, c) {
    var d = a2.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();
    for (var e2 in d) if (!(e2 in b)) throw Error(p(108, Ra(a2) || "Unknown", e2));
    return A2({}, c, d);
  }
  function cg(a2) {
    a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
    Xf = H.current;
    G(H, a2);
    G(Wf, Wf.current);
    return true;
  }
  function dg(a2, b, c) {
    var d = a2.stateNode;
    if (!d) throw Error(p(169));
    c ? (a2 = bg(a2, b, Xf), d.__reactInternalMemoizedMergedChildContext = a2, E2(Wf), E2(H), G(H, a2)) : E2(Wf);
    G(Wf, c);
  }
  var eg = null, fg = false, gg = false;
  function hg(a2) {
    null === eg ? eg = [a2] : eg.push(a2);
  }
  function ig(a2) {
    fg = true;
    hg(a2);
  }
  function jg() {
    if (!gg && null !== eg) {
      gg = true;
      var a2 = 0, b = C;
      try {
        var c = eg;
        for (C = 1; a2 < c.length; a2++) {
          var d = c[a2];
          do
            d = d(true);
          while (null !== d);
        }
        eg = null;
        fg = false;
      } catch (e2) {
        throw null !== eg && (eg = eg.slice(a2 + 1)), ac(fc, jg), e2;
      } finally {
        C = b, gg = false;
      }
    }
    return null;
  }
  var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
  function tg(a2, b) {
    kg[lg++] = ng;
    kg[lg++] = mg;
    mg = a2;
    ng = b;
  }
  function ug(a2, b, c) {
    og[pg++] = rg;
    og[pg++] = sg;
    og[pg++] = qg;
    qg = a2;
    var d = rg;
    a2 = sg;
    var e2 = 32 - oc(d) - 1;
    d &= ~(1 << e2);
    c += 1;
    var f2 = 32 - oc(b) + e2;
    if (30 < f2) {
      var g = e2 - e2 % 5;
      f2 = (d & (1 << g) - 1).toString(32);
      d >>= g;
      e2 -= g;
      rg = 1 << 32 - oc(b) + e2 | c << e2 | d;
      sg = f2 + a2;
    } else rg = 1 << f2 | c << e2 | d, sg = a2;
  }
  function vg(a2) {
    null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
  }
  function wg(a2) {
    for (; a2 === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
    for (; a2 === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
  }
  var xg = null, yg = null, I = false, zg = null;
  function Ag(a2, b) {
    var c = Bg(5, null, null, 0);
    c.elementType = "DELETED";
    c.stateNode = b;
    c.return = a2;
    b = a2.deletions;
    null === b ? (a2.deletions = [c], a2.flags |= 16) : b.push(c);
  }
  function Cg(a2, b) {
    switch (a2.tag) {
      case 5:
        var c = a2.type;
        b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
        return null !== b ? (a2.stateNode = b, xg = a2, yg = Lf(b.firstChild), true) : false;
      case 6:
        return b = "" === a2.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a2.stateNode = b, xg = a2, yg = null, true) : false;
      case 13:
        return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a2, a2.child = c, xg = a2, yg = null, true) : false;
      default:
        return false;
    }
  }
  function Dg(a2) {
    return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
  }
  function Eg(a2) {
    if (I) {
      var b = yg;
      if (b) {
        var c = b;
        if (!Cg(a2, b)) {
          if (Dg(a2)) throw Error(p(418));
          b = Lf(c.nextSibling);
          var d = xg;
          b && Cg(a2, b) ? Ag(d, c) : (a2.flags = a2.flags & -4097 | 2, I = false, xg = a2);
        }
      } else {
        if (Dg(a2)) throw Error(p(418));
        a2.flags = a2.flags & -4097 | 2;
        I = false;
        xg = a2;
      }
    }
  }
  function Fg(a2) {
    for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; ) a2 = a2.return;
    xg = a2;
  }
  function Gg(a2) {
    if (a2 !== xg) return false;
    if (!I) return Fg(a2), I = true, false;
    var b;
    (b = 3 !== a2.tag) && !(b = 5 !== a2.tag) && (b = a2.type, b = "head" !== b && "body" !== b && !Ef(a2.type, a2.memoizedProps));
    if (b && (b = yg)) {
      if (Dg(a2)) throw Hg(), Error(p(418));
      for (; b; ) Ag(a2, b), b = Lf(b.nextSibling);
    }
    Fg(a2);
    if (13 === a2.tag) {
      a2 = a2.memoizedState;
      a2 = null !== a2 ? a2.dehydrated : null;
      if (!a2) throw Error(p(317));
      a: {
        a2 = a2.nextSibling;
        for (b = 0; a2; ) {
          if (8 === a2.nodeType) {
            var c = a2.data;
            if ("/$" === c) {
              if (0 === b) {
                yg = Lf(a2.nextSibling);
                break a;
              }
              b--;
            } else "$" !== c && "$!" !== c && "$?" !== c || b++;
          }
          a2 = a2.nextSibling;
        }
        yg = null;
      }
    } else yg = xg ? Lf(a2.stateNode.nextSibling) : null;
    return true;
  }
  function Hg() {
    for (var a2 = yg; a2; ) a2 = Lf(a2.nextSibling);
  }
  function Ig() {
    yg = xg = null;
    I = false;
  }
  function Jg(a2) {
    null === zg ? zg = [a2] : zg.push(a2);
  }
  var Kg = ua.ReactCurrentBatchConfig;
  function Lg(a2, b, c) {
    a2 = c.ref;
    if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
      if (c._owner) {
        c = c._owner;
        if (c) {
          if (1 !== c.tag) throw Error(p(309));
          var d = c.stateNode;
        }
        if (!d) throw Error(p(147, a2));
        var e2 = d, f2 = "" + a2;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
        b = function(a3) {
          var b2 = e2.refs;
          null === a3 ? delete b2[f2] : b2[f2] = a3;
        };
        b._stringRef = f2;
        return b;
      }
      if ("string" !== typeof a2) throw Error(p(284));
      if (!c._owner) throw Error(p(290, a2));
    }
    return a2;
  }
  function Mg(a2, b) {
    a2 = Object.prototype.toString.call(b);
    throw Error(p(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b).join(", ") + "}" : a2));
  }
  function Ng(a2) {
    var b = a2._init;
    return b(a2._payload);
  }
  function Og(a2) {
    function b(b2, c2) {
      if (a2) {
        var d2 = b2.deletions;
        null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
      }
    }
    function c(c2, d2) {
      if (!a2) return null;
      for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
      return null;
    }
    function d(a3, b2) {
      for (a3 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a3.set(b2.key, b2) : a3.set(b2.index, b2), b2 = b2.sibling;
      return a3;
    }
    function e2(a3, b2) {
      a3 = Pg(a3, b2);
      a3.index = 0;
      a3.sibling = null;
      return a3;
    }
    function f2(b2, c2, d2) {
      b2.index = d2;
      if (!a2) return b2.flags |= 1048576, c2;
      d2 = b2.alternate;
      if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
      b2.flags |= 2;
      return c2;
    }
    function g(b2) {
      a2 && null === b2.alternate && (b2.flags |= 2);
      return b2;
    }
    function h(a3, b2, c2, d2) {
      if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a3.mode, d2), b2.return = a3, b2;
      b2 = e2(b2, c2);
      b2.return = a3;
      return b2;
    }
    function k(a3, b2, c2, d2) {
      var f3 = c2.type;
      if (f3 === ya) return m(a3, b2, c2.props.children, d2, c2.key);
      if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e2(b2, c2.props), d2.ref = Lg(a3, b2, c2), d2.return = a3, d2;
      d2 = Rg(c2.type, c2.key, c2.props, null, a3.mode, d2);
      d2.ref = Lg(a3, b2, c2);
      d2.return = a3;
      return d2;
    }
    function l(a3, b2, c2, d2) {
      if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a3.mode, d2), b2.return = a3, b2;
      b2 = e2(b2, c2.children || []);
      b2.return = a3;
      return b2;
    }
    function m(a3, b2, c2, d2, f3) {
      if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a3.mode, d2, f3), b2.return = a3, b2;
      b2 = e2(b2, c2);
      b2.return = a3;
      return b2;
    }
    function q(a3, b2, c2) {
      if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a3.mode, c2), b2.return = a3, b2;
      if ("object" === typeof b2 && null !== b2) {
        switch (b2.$$typeof) {
          case va:
            return c2 = Rg(b2.type, b2.key, b2.props, null, a3.mode, c2), c2.ref = Lg(a3, null, b2), c2.return = a3, c2;
          case wa:
            return b2 = Sg(b2, a3.mode, c2), b2.return = a3, b2;
          case Ha:
            var d2 = b2._init;
            return q(a3, d2(b2._payload), c2);
        }
        if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a3.mode, c2, null), b2.return = a3, b2;
        Mg(a3, b2);
      }
      return null;
    }
    function r(a3, b2, c2, d2) {
      var e3 = null !== b2 ? b2.key : null;
      if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e3 ? null : h(a3, b2, "" + c2, d2);
      if ("object" === typeof c2 && null !== c2) {
        switch (c2.$$typeof) {
          case va:
            return c2.key === e3 ? k(a3, b2, c2, d2) : null;
          case wa:
            return c2.key === e3 ? l(a3, b2, c2, d2) : null;
          case Ha:
            return e3 = c2._init, r(
              a3,
              b2,
              e3(c2._payload),
              d2
            );
        }
        if (eb(c2) || Ka(c2)) return null !== e3 ? null : m(a3, b2, c2, d2, null);
        Mg(a3, c2);
      }
      return null;
    }
    function y(a3, b2, c2, d2, e3) {
      if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a3 = a3.get(c2) || null, h(b2, a3, "" + d2, e3);
      if ("object" === typeof d2 && null !== d2) {
        switch (d2.$$typeof) {
          case va:
            return a3 = a3.get(null === d2.key ? c2 : d2.key) || null, k(b2, a3, d2, e3);
          case wa:
            return a3 = a3.get(null === d2.key ? c2 : d2.key) || null, l(b2, a3, d2, e3);
          case Ha:
            var f3 = d2._init;
            return y(a3, b2, c2, f3(d2._payload), e3);
        }
        if (eb(d2) || Ka(d2)) return a3 = a3.get(c2) || null, m(b2, a3, d2, e3, null);
        Mg(b2, d2);
      }
      return null;
    }
    function n(e3, g2, h2, k2) {
      for (var l2 = null, m2 = null, u2 = g2, w = g2 = 0, x = null; null !== u2 && w < h2.length; w++) {
        u2.index > w ? (x = u2, u2 = null) : x = u2.sibling;
        var n2 = r(e3, u2, h2[w], k2);
        if (null === n2) {
          null === u2 && (u2 = x);
          break;
        }
        a2 && u2 && null === n2.alternate && b(e3, u2);
        g2 = f2(n2, g2, w);
        null === m2 ? l2 = n2 : m2.sibling = n2;
        m2 = n2;
        u2 = x;
      }
      if (w === h2.length) return c(e3, u2), I && tg(e3, w), l2;
      if (null === u2) {
        for (; w < h2.length; w++) u2 = q(e3, h2[w], k2), null !== u2 && (g2 = f2(u2, g2, w), null === m2 ? l2 = u2 : m2.sibling = u2, m2 = u2);
        I && tg(e3, w);
        return l2;
      }
      for (u2 = d(e3, u2); w < h2.length; w++) x = y(u2, e3, w, h2[w], k2), null !== x && (a2 && null !== x.alternate && u2.delete(null === x.key ? w : x.key), g2 = f2(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
      a2 && u2.forEach(function(a3) {
        return b(e3, a3);
      });
      I && tg(e3, w);
      return l2;
    }
    function t(e3, g2, h2, k2) {
      var l2 = Ka(h2);
      if ("function" !== typeof l2) throw Error(p(150));
      h2 = l2.call(h2);
      if (null == h2) throw Error(p(151));
      for (var u2 = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
        m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
        var t2 = r(e3, m2, n2.value, k2);
        if (null === t2) {
          null === m2 && (m2 = x);
          break;
        }
        a2 && m2 && null === t2.alternate && b(e3, m2);
        g2 = f2(t2, g2, w);
        null === u2 ? l2 = t2 : u2.sibling = t2;
        u2 = t2;
        m2 = x;
      }
      if (n2.done) return c(
        e3,
        m2
      ), I && tg(e3, w), l2;
      if (null === m2) {
        for (; !n2.done; w++, n2 = h2.next()) n2 = q(e3, n2.value, k2), null !== n2 && (g2 = f2(n2, g2, w), null === u2 ? l2 = n2 : u2.sibling = n2, u2 = n2);
        I && tg(e3, w);
        return l2;
      }
      for (m2 = d(e3, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e3, w, n2.value, k2), null !== n2 && (a2 && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f2(n2, g2, w), null === u2 ? l2 = n2 : u2.sibling = n2, u2 = n2);
      a2 && m2.forEach(function(a3) {
        return b(e3, a3);
      });
      I && tg(e3, w);
      return l2;
    }
    function J(a3, d2, f3, h2) {
      "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
      if ("object" === typeof f3 && null !== f3) {
        switch (f3.$$typeof) {
          case va:
            a: {
              for (var k2 = f3.key, l2 = d2; null !== l2; ) {
                if (l2.key === k2) {
                  k2 = f3.type;
                  if (k2 === ya) {
                    if (7 === l2.tag) {
                      c(a3, l2.sibling);
                      d2 = e2(l2, f3.props.children);
                      d2.return = a3;
                      a3 = d2;
                      break a;
                    }
                  } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                    c(a3, l2.sibling);
                    d2 = e2(l2, f3.props);
                    d2.ref = Lg(a3, l2, f3);
                    d2.return = a3;
                    a3 = d2;
                    break a;
                  }
                  c(a3, l2);
                  break;
                } else b(a3, l2);
                l2 = l2.sibling;
              }
              f3.type === ya ? (d2 = Tg(f3.props.children, a3.mode, h2, f3.key), d2.return = a3, a3 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a3.mode, h2), h2.ref = Lg(a3, d2, f3), h2.return = a3, a3 = h2);
            }
            return g(a3);
          case wa:
            a: {
              for (l2 = f3.key; null !== d2; ) {
                if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                  c(a3, d2.sibling);
                  d2 = e2(d2, f3.children || []);
                  d2.return = a3;
                  a3 = d2;
                  break a;
                } else {
                  c(a3, d2);
                  break;
                }
                else b(a3, d2);
                d2 = d2.sibling;
              }
              d2 = Sg(f3, a3.mode, h2);
              d2.return = a3;
              a3 = d2;
            }
            return g(a3);
          case Ha:
            return l2 = f3._init, J(a3, d2, l2(f3._payload), h2);
        }
        if (eb(f3)) return n(a3, d2, f3, h2);
        if (Ka(f3)) return t(a3, d2, f3, h2);
        Mg(a3, f3);
      }
      return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a3, d2.sibling), d2 = e2(d2, f3), d2.return = a3, a3 = d2) : (c(a3, d2), d2 = Qg(f3, a3.mode, h2), d2.return = a3, a3 = d2), g(a3)) : c(a3, d2);
    }
    return J;
  }
  var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
  function $g() {
    Zg = Yg = Xg = null;
  }
  function ah(a2) {
    var b = Wg.current;
    E2(Wg);
    a2._currentValue = b;
  }
  function bh(a2, b, c) {
    for (; null !== a2; ) {
      var d = a2.alternate;
      (a2.childLanes & b) !== b ? (a2.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
      if (a2 === c) break;
      a2 = a2.return;
    }
  }
  function ch(a2, b) {
    Xg = a2;
    Zg = Yg = null;
    a2 = a2.dependencies;
    null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b) && (dh = true), a2.firstContext = null);
  }
  function eh(a2) {
    var b = a2._currentValue;
    if (Zg !== a2) if (a2 = { context: a2, memoizedValue: b, next: null }, null === Yg) {
      if (null === Xg) throw Error(p(308));
      Yg = a2;
      Xg.dependencies = { lanes: 0, firstContext: a2 };
    } else Yg = Yg.next = a2;
    return b;
  }
  var fh = null;
  function gh(a2) {
    null === fh ? fh = [a2] : fh.push(a2);
  }
  function hh(a2, b, c, d) {
    var e2 = b.interleaved;
    null === e2 ? (c.next = c, gh(b)) : (c.next = e2.next, e2.next = c);
    b.interleaved = c;
    return ih(a2, d);
  }
  function ih(a2, b) {
    a2.lanes |= b;
    var c = a2.alternate;
    null !== c && (c.lanes |= b);
    c = a2;
    for (a2 = a2.return; null !== a2; ) a2.childLanes |= b, c = a2.alternate, null !== c && (c.childLanes |= b), c = a2, a2 = a2.return;
    return 3 === c.tag ? c.stateNode : null;
  }
  var jh = false;
  function kh(a2) {
    a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function lh(a2, b) {
    a2 = a2.updateQueue;
    b.updateQueue === a2 && (b.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
  }
  function mh(a2, b) {
    return { eventTime: a2, lane: b, tag: 0, payload: null, callback: null, next: null };
  }
  function nh(a2, b, c) {
    var d = a2.updateQueue;
    if (null === d) return null;
    d = d.shared;
    if (0 !== (K & 2)) {
      var e2 = d.pending;
      null === e2 ? b.next = b : (b.next = e2.next, e2.next = b);
      d.pending = b;
      return ih(a2, c);
    }
    e2 = d.interleaved;
    null === e2 ? (b.next = b, gh(d)) : (b.next = e2.next, e2.next = b);
    d.interleaved = b;
    return ih(a2, c);
  }
  function oh(a2, b, c) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
      var d = b.lanes;
      d &= a2.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a2, c);
    }
  }
  function ph2(a2, b) {
    var c = a2.updateQueue, d = a2.alternate;
    if (null !== d && (d = d.updateQueue, c === d)) {
      var e2 = null, f2 = null;
      c = c.firstBaseUpdate;
      if (null !== c) {
        do {
          var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
          null === f2 ? e2 = f2 = g : f2 = f2.next = g;
          c = c.next;
        } while (null !== c);
        null === f2 ? e2 = f2 = b : f2 = f2.next = b;
      } else e2 = f2 = b;
      c = { baseState: d.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
      a2.updateQueue = c;
      return;
    }
    a2 = c.lastBaseUpdate;
    null === a2 ? c.firstBaseUpdate = b : a2.next = b;
    c.lastBaseUpdate = b;
  }
  function qh(a2, b, c, d) {
    var e2 = a2.updateQueue;
    jh = false;
    var f2 = e2.firstBaseUpdate, g = e2.lastBaseUpdate, h = e2.shared.pending;
    if (null !== h) {
      e2.shared.pending = null;
      var k = h, l = k.next;
      k.next = null;
      null === g ? f2 = l : g.next = l;
      g = k;
      var m = a2.alternate;
      null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
    }
    if (null !== f2) {
      var q = e2.baseState;
      g = 0;
      m = l = k = null;
      h = f2;
      do {
        var r = h.lane, y = h.eventTime;
        if ((d & r) === r) {
          null !== m && (m = m.next = {
            eventTime: y,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          a: {
            var n = a2, t = h;
            r = b;
            y = c;
            switch (t.tag) {
              case 1:
                n = t.payload;
                if ("function" === typeof n) {
                  q = n.call(y, q, r);
                  break a;
                }
                q = n;
                break a;
              case 3:
                n.flags = n.flags & -65537 | 128;
              case 0:
                n = t.payload;
                r = "function" === typeof n ? n.call(y, q, r) : n;
                if (null === r || void 0 === r) break a;
                q = A2({}, q, r);
                break a;
              case 2:
                jh = true;
            }
          }
          null !== h.callback && 0 !== h.lane && (a2.flags |= 64, r = e2.effects, null === r ? e2.effects = [h] : r.push(h));
        } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
        h = h.next;
        if (null === h) if (h = e2.shared.pending, null === h) break;
        else r = h, h = r.next, r.next = null, e2.lastBaseUpdate = r, e2.shared.pending = null;
      } while (1);
      null === m && (k = q);
      e2.baseState = k;
      e2.firstBaseUpdate = l;
      e2.lastBaseUpdate = m;
      b = e2.shared.interleaved;
      if (null !== b) {
        e2 = b;
        do
          g |= e2.lane, e2 = e2.next;
        while (e2 !== b);
      } else null === f2 && (e2.shared.lanes = 0);
      rh |= g;
      a2.lanes = g;
      a2.memoizedState = q;
    }
  }
  function sh(a2, b, c) {
    a2 = b.effects;
    b.effects = null;
    if (null !== a2) for (b = 0; b < a2.length; b++) {
      var d = a2[b], e2 = d.callback;
      if (null !== e2) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e2) throw Error(p(191, e2));
        e2.call(d);
      }
    }
  }
  var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
  function xh(a2) {
    if (a2 === th) throw Error(p(174));
    return a2;
  }
  function yh(a2, b) {
    G(wh, b);
    G(vh, a2);
    G(uh, th);
    a2 = b.nodeType;
    switch (a2) {
      case 9:
      case 11:
        b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
        break;
      default:
        a2 = 8 === a2 ? b.parentNode : b, b = a2.namespaceURI || null, a2 = a2.tagName, b = lb(b, a2);
    }
    E2(uh);
    G(uh, b);
  }
  function zh() {
    E2(uh);
    E2(vh);
    E2(wh);
  }
  function Ah(a2) {
    xh(wh.current);
    var b = xh(uh.current);
    var c = lb(b, a2.type);
    b !== c && (G(vh, a2), G(uh, c));
  }
  function Bh(a2) {
    vh.current === a2 && (E2(uh), E2(vh));
  }
  var L2 = Uf(0);
  function Ch(a2) {
    for (var b = a2; null !== b; ) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 128)) return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }
      if (b === a2) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a2) return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
    return null;
  }
  var Dh = [];
  function Eh() {
    for (var a2 = 0; a2 < Dh.length; a2++) Dh[a2]._workInProgressVersionPrimary = null;
    Dh.length = 0;
  }
  var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
  function P() {
    throw Error(p(321));
  }
  function Mh(a2, b) {
    if (null === b) return false;
    for (var c = 0; c < b.length && c < a2.length; c++) if (!He(a2[c], b[c])) return false;
    return true;
  }
  function Nh(a2, b, c, d, e2, f2) {
    Hh = f2;
    M = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Fh.current = null === a2 || null === a2.memoizedState ? Oh : Ph;
    a2 = c(d, e2);
    if (Jh) {
      f2 = 0;
      do {
        Jh = false;
        Kh = 0;
        if (25 <= f2) throw Error(p(301));
        f2 += 1;
        O = N = null;
        b.updateQueue = null;
        Fh.current = Qh;
        a2 = c(d, e2);
      } while (Jh);
    }
    Fh.current = Rh;
    b = null !== N && null !== N.next;
    Hh = 0;
    O = N = M = null;
    Ih = false;
    if (b) throw Error(p(300));
    return a2;
  }
  function Sh() {
    var a2 = 0 !== Kh;
    Kh = 0;
    return a2;
  }
  function Th() {
    var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === O ? M.memoizedState = O = a2 : O = O.next = a2;
    return O;
  }
  function Uh() {
    if (null === N) {
      var a2 = M.alternate;
      a2 = null !== a2 ? a2.memoizedState : null;
    } else a2 = N.next;
    var b = null === O ? M.memoizedState : O.next;
    if (null !== b) O = b, N = a2;
    else {
      if (null === a2) throw Error(p(310));
      N = a2;
      a2 = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
      null === O ? M.memoizedState = O = a2 : O = O.next = a2;
    }
    return O;
  }
  function Vh(a2, b) {
    return "function" === typeof b ? b(a2) : b;
  }
  function Wh(a2) {
    var b = Uh(), c = b.queue;
    if (null === c) throw Error(p(311));
    c.lastRenderedReducer = a2;
    var d = N, e2 = d.baseQueue, f2 = c.pending;
    if (null !== f2) {
      if (null !== e2) {
        var g = e2.next;
        e2.next = f2.next;
        f2.next = g;
      }
      d.baseQueue = e2 = f2;
      c.pending = null;
    }
    if (null !== e2) {
      f2 = e2.next;
      d = d.baseState;
      var h = g = null, k = null, l = f2;
      do {
        var m = l.lane;
        if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a2(d, l.action);
        else {
          var q = {
            lane: m,
            action: l.action,
            hasEagerState: l.hasEagerState,
            eagerState: l.eagerState,
            next: null
          };
          null === k ? (h = k = q, g = d) : k = k.next = q;
          M.lanes |= m;
          rh |= m;
        }
        l = l.next;
      } while (null !== l && l !== f2);
      null === k ? g = d : k.next = h;
      He(d, b.memoizedState) || (dh = true);
      b.memoizedState = d;
      b.baseState = g;
      b.baseQueue = k;
      c.lastRenderedState = d;
    }
    a2 = c.interleaved;
    if (null !== a2) {
      e2 = a2;
      do
        f2 = e2.lane, M.lanes |= f2, rh |= f2, e2 = e2.next;
      while (e2 !== a2);
    } else null === e2 && (c.lanes = 0);
    return [b.memoizedState, c.dispatch];
  }
  function Xh(a2) {
    var b = Uh(), c = b.queue;
    if (null === c) throw Error(p(311));
    c.lastRenderedReducer = a2;
    var d = c.dispatch, e2 = c.pending, f2 = b.memoizedState;
    if (null !== e2) {
      c.pending = null;
      var g = e2 = e2.next;
      do
        f2 = a2(f2, g.action), g = g.next;
      while (g !== e2);
      He(f2, b.memoizedState) || (dh = true);
      b.memoizedState = f2;
      null === b.baseQueue && (b.baseState = f2);
      c.lastRenderedState = f2;
    }
    return [f2, d];
  }
  function Yh() {
  }
  function Zh(a2, b) {
    var c = M, d = Uh(), e2 = b(), f2 = !He(d.memoizedState, e2);
    f2 && (d.memoizedState = e2, dh = true);
    d = d.queue;
    $h(ai.bind(null, c, d, a2), [a2]);
    if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
      c.flags |= 2048;
      bi(9, ci.bind(null, c, d, e2, b), void 0, null);
      if (null === Q) throw Error(p(349));
      0 !== (Hh & 30) || di(c, b, e2);
    }
    return e2;
  }
  function di(a2, b, c) {
    a2.flags |= 16384;
    a2 = { getSnapshot: b, value: c };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a2]) : (c = b.stores, null === c ? b.stores = [a2] : c.push(a2));
  }
  function ci(a2, b, c, d) {
    b.value = c;
    b.getSnapshot = d;
    ei(b) && fi(a2);
  }
  function ai(a2, b, c) {
    return c(function() {
      ei(b) && fi(a2);
    });
  }
  function ei(a2) {
    var b = a2.getSnapshot;
    a2 = a2.value;
    try {
      var c = b();
      return !He(a2, c);
    } catch (d) {
      return true;
    }
  }
  function fi(a2) {
    var b = ih(a2, 1);
    null !== b && gi(b, a2, 1, -1);
  }
  function hi(a2) {
    var b = Th();
    "function" === typeof a2 && (a2 = a2());
    b.memoizedState = b.baseState = a2;
    a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
    b.queue = a2;
    a2 = a2.dispatch = ii.bind(null, M, a2);
    return [b.memoizedState, a2];
  }
  function bi(a2, b, c, d) {
    a2 = { tag: a2, create: b, destroy: c, deps: d, next: null };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a2.next = a2) : (c = b.lastEffect, null === c ? b.lastEffect = a2.next = a2 : (d = c.next, c.next = a2, a2.next = d, b.lastEffect = a2));
    return a2;
  }
  function ji() {
    return Uh().memoizedState;
  }
  function ki(a2, b, c, d) {
    var e2 = Th();
    M.flags |= a2;
    e2.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
  }
  function li(a2, b, c, d) {
    var e2 = Uh();
    d = void 0 === d ? null : d;
    var f2 = void 0;
    if (null !== N) {
      var g = N.memoizedState;
      f2 = g.destroy;
      if (null !== d && Mh(d, g.deps)) {
        e2.memoizedState = bi(b, c, f2, d);
        return;
      }
    }
    M.flags |= a2;
    e2.memoizedState = bi(1 | b, c, f2, d);
  }
  function mi(a2, b) {
    return ki(8390656, 8, a2, b);
  }
  function $h(a2, b) {
    return li(2048, 8, a2, b);
  }
  function ni(a2, b) {
    return li(4, 2, a2, b);
  }
  function oi(a2, b) {
    return li(4, 4, a2, b);
  }
  function pi(a2, b) {
    if ("function" === typeof b) return a2 = a2(), b(a2), function() {
      b(null);
    };
    if (null !== b && void 0 !== b) return a2 = a2(), b.current = a2, function() {
      b.current = null;
    };
  }
  function qi(a2, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a2]) : null;
    return li(4, 4, pi.bind(null, b, a2), c);
  }
  function ri() {
  }
  function si(a2, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
    c.memoizedState = [a2, b];
    return a2;
  }
  function ti(a2, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
    a2 = a2();
    c.memoizedState = [a2, b];
    return a2;
  }
  function ui(a2, b, c) {
    if (0 === (Hh & 21)) return a2.baseState && (a2.baseState = false, dh = true), a2.memoizedState = c;
    He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a2.baseState = true);
    return b;
  }
  function vi(a2, b) {
    var c = C;
    C = 0 !== c && 4 > c ? c : 4;
    a2(true);
    var d = Gh.transition;
    Gh.transition = {};
    try {
      a2(false), b();
    } finally {
      C = c, Gh.transition = d;
    }
  }
  function wi() {
    return Uh().memoizedState;
  }
  function xi(a2, b, c) {
    var d = yi(a2);
    c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a2)) Ai(b, c);
    else if (c = hh(a2, b, c, d), null !== c) {
      var e2 = R();
      gi(c, a2, d, e2);
      Bi(c, b, d);
    }
  }
  function ii(a2, b, c) {
    var d = yi(a2), e2 = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a2)) Ai(b, e2);
    else {
      var f2 = a2.alternate;
      if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
        var g = b.lastRenderedState, h = f2(g, c);
        e2.hasEagerState = true;
        e2.eagerState = h;
        if (He(h, g)) {
          var k = b.interleaved;
          null === k ? (e2.next = e2, gh(b)) : (e2.next = k.next, k.next = e2);
          b.interleaved = e2;
          return;
        }
      } catch (l) {
      } finally {
      }
      c = hh(a2, b, e2, d);
      null !== c && (e2 = R(), gi(c, a2, d, e2), Bi(c, b, d));
    }
  }
  function zi(a2) {
    var b = a2.alternate;
    return a2 === M || null !== b && b === M;
  }
  function Ai(a2, b) {
    Jh = Ih = true;
    var c = a2.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a2.pending = b;
  }
  function Bi(a2, b, c) {
    if (0 !== (c & 4194240)) {
      var d = b.lanes;
      d &= a2.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a2, c);
    }
  }
  var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a2, b) {
    Th().memoizedState = [a2, void 0 === b ? null : b];
    return a2;
  }, useContext: eh, useEffect: mi, useImperativeHandle: function(a2, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a2]) : null;
    return ki(
      4194308,
      4,
      pi.bind(null, b, a2),
      c
    );
  }, useLayoutEffect: function(a2, b) {
    return ki(4194308, 4, a2, b);
  }, useInsertionEffect: function(a2, b) {
    return ki(4, 2, a2, b);
  }, useMemo: function(a2, b) {
    var c = Th();
    b = void 0 === b ? null : b;
    a2 = a2();
    c.memoizedState = [a2, b];
    return a2;
  }, useReducer: function(a2, b, c) {
    var d = Th();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b };
    d.queue = a2;
    a2 = a2.dispatch = xi.bind(null, M, a2);
    return [d.memoizedState, a2];
  }, useRef: function(a2) {
    var b = Th();
    a2 = { current: a2 };
    return b.memoizedState = a2;
  }, useState: hi, useDebugValue: ri, useDeferredValue: function(a2) {
    return Th().memoizedState = a2;
  }, useTransition: function() {
    var a2 = hi(false), b = a2[0];
    a2 = vi.bind(null, a2[1]);
    Th().memoizedState = a2;
    return [b, a2];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(a2, b, c) {
    var d = M, e2 = Th();
    if (I) {
      if (void 0 === c) throw Error(p(407));
      c = c();
    } else {
      c = b();
      if (null === Q) throw Error(p(349));
      0 !== (Hh & 30) || di(d, b, c);
    }
    e2.memoizedState = c;
    var f2 = { value: c, getSnapshot: b };
    e2.queue = f2;
    mi(ai.bind(
      null,
      d,
      f2,
      a2
    ), [a2]);
    d.flags |= 2048;
    bi(9, ci.bind(null, d, f2, c, b), void 0, null);
    return c;
  }, useId: function() {
    var a2 = Th(), b = Q.identifierPrefix;
    if (I) {
      var c = sg;
      var d = rg;
      c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
      b = ":" + b + "R" + c;
      c = Kh++;
      0 < c && (b += "H" + c.toString(32));
      b += ":";
    } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
    return a2.memoizedState = b;
  }, unstable_isNewReconciler: false }, Ph = {
    readContext: eh,
    useCallback: si,
    useContext: eh,
    useEffect: $h,
    useImperativeHandle: qi,
    useInsertionEffect: ni,
    useLayoutEffect: oi,
    useMemo: ti,
    useReducer: Wh,
    useRef: ji,
    useState: function() {
      return Wh(Vh);
    },
    useDebugValue: ri,
    useDeferredValue: function(a2) {
      var b = Uh();
      return ui(b, N.memoizedState, a2);
    },
    useTransition: function() {
      var a2 = Wh(Vh)[0], b = Uh().memoizedState;
      return [a2, b];
    },
    useMutableSource: Yh,
    useSyncExternalStore: Zh,
    useId: wi,
    unstable_isNewReconciler: false
  }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
    return Xh(Vh);
  }, useDebugValue: ri, useDeferredValue: function(a2) {
    var b = Uh();
    return null === N ? b.memoizedState = a2 : ui(b, N.memoizedState, a2);
  }, useTransition: function() {
    var a2 = Xh(Vh)[0], b = Uh().memoizedState;
    return [a2, b];
  }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
  function Ci(a2, b) {
    if (a2 && a2.defaultProps) {
      b = A2({}, b);
      a2 = a2.defaultProps;
      for (var c in a2) void 0 === b[c] && (b[c] = a2[c]);
      return b;
    }
    return b;
  }
  function Di(a2, b, c, d) {
    b = a2.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : A2({}, b, c);
    a2.memoizedState = c;
    0 === a2.lanes && (a2.updateQueue.baseState = c);
  }
  var Ei = { isMounted: function(a2) {
    return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
  }, enqueueSetState: function(a2, b, c) {
    a2 = a2._reactInternals;
    var d = R(), e2 = yi(a2), f2 = mh(d, e2);
    f2.payload = b;
    void 0 !== c && null !== c && (f2.callback = c);
    b = nh(a2, f2, e2);
    null !== b && (gi(b, a2, e2, d), oh(b, a2, e2));
  }, enqueueReplaceState: function(a2, b, c) {
    a2 = a2._reactInternals;
    var d = R(), e2 = yi(a2), f2 = mh(d, e2);
    f2.tag = 1;
    f2.payload = b;
    void 0 !== c && null !== c && (f2.callback = c);
    b = nh(a2, f2, e2);
    null !== b && (gi(b, a2, e2, d), oh(b, a2, e2));
  }, enqueueForceUpdate: function(a2, b) {
    a2 = a2._reactInternals;
    var c = R(), d = yi(a2), e2 = mh(c, d);
    e2.tag = 2;
    void 0 !== b && null !== b && (e2.callback = b);
    b = nh(a2, e2, d);
    null !== b && (gi(b, a2, d, c), oh(b, a2, d));
  } };
  function Fi(a2, b, c, d, e2, f2, g) {
    a2 = a2.stateNode;
    return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e2, f2) : true;
  }
  function Gi(a2, b, c) {
    var d = false, e2 = Vf;
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e2 = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a2, e2) : Vf);
    b = new b(c, f2);
    a2.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Ei;
    a2.stateNode = b;
    b._reactInternals = a2;
    d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e2, a2.__reactInternalMemoizedMaskedChildContext = f2);
    return b;
  }
  function Hi(a2, b, c, d) {
    a2 = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a2 && Ei.enqueueReplaceState(b, b.state, null);
  }
  function Ii(a2, b, c, d) {
    var e2 = a2.stateNode;
    e2.props = c;
    e2.state = a2.memoizedState;
    e2.refs = {};
    kh(a2);
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? e2.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e2.context = Yf(a2, f2));
    e2.state = a2.memoizedState;
    f2 = b.getDerivedStateFromProps;
    "function" === typeof f2 && (Di(a2, b, f2, c), e2.state = a2.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b !== e2.state && Ei.enqueueReplaceState(e2, e2.state, null), qh(a2, c, e2, d), e2.state = a2.memoizedState);
    "function" === typeof e2.componentDidMount && (a2.flags |= 4194308);
  }
  function Ji(a2, b) {
    try {
      var c = "", d = b;
      do
        c += Pa(d), d = d.return;
      while (d);
      var e2 = c;
    } catch (f2) {
      e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
    }
    return { value: a2, source: b, stack: e2, digest: null };
  }
  function Ki(a2, b, c) {
    return { value: a2, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
  }
  function Li(a2, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  var Mi = "function" === typeof WeakMap ? WeakMap : Map;
  function Ni(a2, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    c.payload = { element: null };
    var d = b.value;
    c.callback = function() {
      Oi || (Oi = true, Pi = d);
      Li(a2, b);
    };
    return c;
  }
  function Qi(a2, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    var d = a2.type.getDerivedStateFromError;
    if ("function" === typeof d) {
      var e2 = b.value;
      c.payload = function() {
        return d(e2);
      };
      c.callback = function() {
        Li(a2, b);
      };
    }
    var f2 = a2.stateNode;
    null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
      Li(a2, b);
      "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var c2 = b.stack;
      this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
    });
    return c;
  }
  function Si(a2, b, c) {
    var d = a2.pingCache;
    if (null === d) {
      d = a2.pingCache = new Mi();
      var e2 = /* @__PURE__ */ new Set();
      d.set(b, e2);
    } else e2 = d.get(b), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d.set(b, e2));
    e2.has(c) || (e2.add(c), a2 = Ti.bind(null, a2, b, c), b.then(a2, a2));
  }
  function Ui(a2) {
    do {
      var b;
      if (b = 13 === a2.tag) b = a2.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
      if (b) return a2;
      a2 = a2.return;
    } while (null !== a2);
    return null;
  }
  function Vi(a2, b, c, d, e2) {
    if (0 === (a2.mode & 1)) return a2 === b ? a2.flags |= 65536 : (a2.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a2;
    a2.flags |= 65536;
    a2.lanes = e2;
    return a2;
  }
  var Wi = ua.ReactCurrentOwner, dh = false;
  function Xi(a2, b, c, d) {
    b.child = null === a2 ? Vg(b, null, c, d) : Ug(b, a2.child, c, d);
  }
  function Yi(a2, b, c, d, e2) {
    c = c.render;
    var f2 = b.ref;
    ch(b, e2);
    d = Nh(a2, b, c, d, f2, e2);
    c = Sh();
    if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b, e2);
    I && c && vg(b);
    b.flags |= 1;
    Xi(a2, b, d, e2);
    return b.child;
  }
  function $i(a2, b, c, d, e2) {
    if (null === a2) {
      var f2 = c.type;
      if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a2, b, f2, d, e2);
      a2 = Rg(c.type, null, d, b, b.mode, e2);
      a2.ref = b.ref;
      a2.return = b;
      return b.child = a2;
    }
    f2 = a2.child;
    if (0 === (a2.lanes & e2)) {
      var g = f2.memoizedProps;
      c = c.compare;
      c = null !== c ? c : Ie;
      if (c(g, d) && a2.ref === b.ref) return Zi(a2, b, e2);
    }
    b.flags |= 1;
    a2 = Pg(f2, d);
    a2.ref = b.ref;
    a2.return = b;
    return b.child = a2;
  }
  function bj(a2, b, c, d, e2) {
    if (null !== a2) {
      var f2 = a2.memoizedProps;
      if (Ie(f2, d) && a2.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a2.lanes & e2)) 0 !== (a2.flags & 131072) && (dh = true);
      else return b.lanes = a2.lanes, Zi(a2, b, e2);
    }
    return cj(a2, b, c, d, e2);
  }
  function dj(a2, b, c) {
    var d = b.pendingProps, e2 = d.children, f2 = null !== a2 ? a2.memoizedState : null;
    if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
    else {
      if (0 === (c & 1073741824)) return a2 = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a2, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d = null !== f2 ? f2.baseLanes : c;
      G(ej, fj);
      fj |= d;
    }
    else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
    Xi(a2, b, e2, c);
    return b.child;
  }
  function gj(a2, b) {
    var c = b.ref;
    if (null === a2 && null !== c || null !== a2 && a2.ref !== c) b.flags |= 512, b.flags |= 2097152;
  }
  function cj(a2, b, c, d, e2) {
    var f2 = Zf(c) ? Xf : H.current;
    f2 = Yf(b, f2);
    ch(b, e2);
    c = Nh(a2, b, c, d, f2, e2);
    d = Sh();
    if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b, e2);
    I && d && vg(b);
    b.flags |= 1;
    Xi(a2, b, c, e2);
    return b.child;
  }
  function hj(a2, b, c, d, e2) {
    if (Zf(c)) {
      var f2 = true;
      cg(b);
    } else f2 = false;
    ch(b, e2);
    if (null === b.stateNode) ij(a2, b), Gi(b, c, d), Ii(b, c, d, e2), d = true;
    else if (null === a2) {
      var g = b.stateNode, h = b.memoizedProps;
      g.props = h;
      var k = g.context, l = c.contextType;
      "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
      var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
      q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
      jh = false;
      var r = b.memoizedState;
      g.state = r;
      qh(b, d, g, e2);
      k = b.memoizedState;
      h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
    } else {
      g = b.stateNode;
      lh(a2, b);
      h = b.memoizedProps;
      l = b.type === b.elementType ? h : Ci(b.type, h);
      g.props = l;
      q = b.pendingProps;
      r = g.context;
      k = c.contextType;
      "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
      var y = c.getDerivedStateFromProps;
      (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
      jh = false;
      r = b.memoizedState;
      g.state = r;
      qh(b, d, g, e2);
      var n = b.memoizedState;
      h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a2.memoizedProps && r === a2.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a2.memoizedProps && r === a2.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a2.memoizedProps && r === a2.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a2.memoizedProps && r === a2.memoizedState || (b.flags |= 1024), d = false);
    }
    return jj(a2, b, c, d, f2, e2);
  }
  function jj(a2, b, c, d, e2, f2) {
    gj(a2, b);
    var g = 0 !== (b.flags & 128);
    if (!d && !g) return e2 && dg(b, c, false), Zi(a2, b, f2);
    d = b.stateNode;
    Wi.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a2 && g ? (b.child = Ug(b, a2.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a2, b, h, f2);
    b.memoizedState = d.state;
    e2 && dg(b, c, true);
    return b.child;
  }
  function kj(a2) {
    var b = a2.stateNode;
    b.pendingContext ? ag(a2, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a2, b.context, false);
    yh(a2, b.containerInfo);
  }
  function lj(a2, b, c, d, e2) {
    Ig();
    Jg(e2);
    b.flags |= 256;
    Xi(a2, b, c, d);
    return b.child;
  }
  var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
  function nj(a2) {
    return { baseLanes: a2, cachePool: null, transitions: null };
  }
  function oj(a2, b, c) {
    var d = b.pendingProps, e2 = L2.current, f2 = false, g = 0 !== (b.flags & 128), h;
    (h = g) || (h = null !== a2 && null === a2.memoizedState ? false : 0 !== (e2 & 2));
    if (h) f2 = true, b.flags &= -129;
    else if (null === a2 || null !== a2.memoizedState) e2 |= 1;
    G(L2, e2 & 1);
    if (null === a2) {
      Eg(b);
      a2 = b.memoizedState;
      if (null !== a2 && (a2 = a2.dehydrated, null !== a2)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a2.data ? b.lanes = 8 : b.lanes = 1073741824, null;
      g = d.children;
      a2 = d.fallback;
      return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a2 = Tg(a2, d, c, null), f2.return = b, a2.return = b, f2.sibling = a2, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a2) : qj(b, g);
    }
    e2 = a2.memoizedState;
    if (null !== e2 && (h = e2.dehydrated, null !== h)) return rj(a2, b, g, d, h, e2, c);
    if (f2) {
      f2 = d.fallback;
      g = b.mode;
      e2 = a2.child;
      h = e2.sibling;
      var k = { mode: "hidden", children: d.children };
      0 === (g & 1) && b.child !== e2 ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e2, k), d.subtreeFlags = e2.subtreeFlags & 14680064);
      null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
      f2.return = b;
      d.return = b;
      d.sibling = f2;
      b.child = d;
      d = f2;
      f2 = b.child;
      g = a2.child.memoizedState;
      g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
      f2.memoizedState = g;
      f2.childLanes = a2.childLanes & ~c;
      b.memoizedState = mj;
      return d;
    }
    f2 = a2.child;
    a2 = f2.sibling;
    d = Pg(f2, { mode: "visible", children: d.children });
    0 === (b.mode & 1) && (d.lanes = c);
    d.return = b;
    d.sibling = null;
    null !== a2 && (c = b.deletions, null === c ? (b.deletions = [a2], b.flags |= 16) : c.push(a2));
    b.child = d;
    b.memoizedState = null;
    return d;
  }
  function qj(a2, b) {
    b = pj({ mode: "visible", children: b }, a2.mode, 0, null);
    b.return = a2;
    return a2.child = b;
  }
  function sj(a2, b, c, d) {
    null !== d && Jg(d);
    Ug(b, a2.child, null, c);
    a2 = qj(b, b.pendingProps.children);
    a2.flags |= 2;
    b.memoizedState = null;
    return a2;
  }
  function rj(a2, b, c, d, e2, f2, g) {
    if (c) {
      if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a2, b, g, d);
      if (null !== b.memoizedState) return b.child = a2.child, b.flags |= 128, null;
      f2 = d.fallback;
      e2 = b.mode;
      d = pj({ mode: "visible", children: d.children }, e2, 0, null);
      f2 = Tg(f2, e2, g, null);
      f2.flags |= 2;
      d.return = b;
      f2.return = b;
      d.sibling = f2;
      b.child = d;
      0 !== (b.mode & 1) && Ug(b, a2.child, null, g);
      b.child.memoizedState = nj(g);
      b.memoizedState = mj;
      return f2;
    }
    if (0 === (b.mode & 1)) return sj(a2, b, g, null);
    if ("$!" === e2.data) {
      d = e2.nextSibling && e2.nextSibling.dataset;
      if (d) var h = d.dgst;
      d = h;
      f2 = Error(p(419));
      d = Ki(f2, d, void 0);
      return sj(a2, b, g, d);
    }
    h = 0 !== (g & a2.childLanes);
    if (dh || h) {
      d = Q;
      if (null !== d) {
        switch (g & -g) {
          case 4:
            e2 = 2;
            break;
          case 16:
            e2 = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            e2 = 32;
            break;
          case 536870912:
            e2 = 268435456;
            break;
          default:
            e2 = 0;
        }
        e2 = 0 !== (e2 & (d.suspendedLanes | g)) ? 0 : e2;
        0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, ih(a2, e2), gi(d, a2, e2, -1));
      }
      tj();
      d = Ki(Error(p(421)));
      return sj(a2, b, g, d);
    }
    if ("$?" === e2.data) return b.flags |= 128, b.child = a2.child, b = uj.bind(null, a2), e2._reactRetry = b, null;
    a2 = f2.treeContext;
    yg = Lf(e2.nextSibling);
    xg = b;
    I = true;
    zg = null;
    null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b);
    b = qj(b, d.children);
    b.flags |= 4096;
    return b;
  }
  function vj(a2, b, c) {
    a2.lanes |= b;
    var d = a2.alternate;
    null !== d && (d.lanes |= b);
    bh(a2.return, b, c);
  }
  function wj(a2, b, c, d, e2) {
    var f2 = a2.memoizedState;
    null === f2 ? a2.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e2 } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e2);
  }
  function xj(a2, b, c) {
    var d = b.pendingProps, e2 = d.revealOrder, f2 = d.tail;
    Xi(a2, b, d.children, c);
    d = L2.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
    else {
      if (null !== a2 && 0 !== (a2.flags & 128)) a: for (a2 = b.child; null !== a2; ) {
        if (13 === a2.tag) null !== a2.memoizedState && vj(a2, c, b);
        else if (19 === a2.tag) vj(a2, c, b);
        else if (null !== a2.child) {
          a2.child.return = a2;
          a2 = a2.child;
          continue;
        }
        if (a2 === b) break a;
        for (; null === a2.sibling; ) {
          if (null === a2.return || a2.return === b) break a;
          a2 = a2.return;
        }
        a2.sibling.return = a2.return;
        a2 = a2.sibling;
      }
      d &= 1;
    }
    G(L2, d);
    if (0 === (b.mode & 1)) b.memoizedState = null;
    else switch (e2) {
      case "forwards":
        c = b.child;
        for (e2 = null; null !== c; ) a2 = c.alternate, null !== a2 && null === Ch(a2) && (e2 = c), c = c.sibling;
        c = e2;
        null === c ? (e2 = b.child, b.child = null) : (e2 = c.sibling, c.sibling = null);
        wj(b, false, e2, c, f2);
        break;
      case "backwards":
        c = null;
        e2 = b.child;
        for (b.child = null; null !== e2; ) {
          a2 = e2.alternate;
          if (null !== a2 && null === Ch(a2)) {
            b.child = e2;
            break;
          }
          a2 = e2.sibling;
          e2.sibling = c;
          c = e2;
          e2 = a2;
        }
        wj(b, true, c, null, f2);
        break;
      case "together":
        wj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
    return b.child;
  }
  function ij(a2, b) {
    0 === (b.mode & 1) && null !== a2 && (a2.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Zi(a2, b, c) {
    null !== a2 && (b.dependencies = a2.dependencies);
    rh |= b.lanes;
    if (0 === (c & b.childLanes)) return null;
    if (null !== a2 && b.child !== a2.child) throw Error(p(153));
    if (null !== b.child) {
      a2 = b.child;
      c = Pg(a2, a2.pendingProps);
      b.child = c;
      for (c.return = b; null !== a2.sibling; ) a2 = a2.sibling, c = c.sibling = Pg(a2, a2.pendingProps), c.return = b;
      c.sibling = null;
    }
    return b.child;
  }
  function yj(a2, b, c) {
    switch (b.tag) {
      case 3:
        kj(b);
        Ig();
        break;
      case 5:
        Ah(b);
        break;
      case 1:
        Zf(b.type) && cg(b);
        break;
      case 4:
        yh(b, b.stateNode.containerInfo);
        break;
      case 10:
        var d = b.type._context, e2 = b.memoizedProps.value;
        G(Wg, d._currentValue);
        d._currentValue = e2;
        break;
      case 13:
        d = b.memoizedState;
        if (null !== d) {
          if (null !== d.dehydrated) return G(L2, L2.current & 1), b.flags |= 128, null;
          if (0 !== (c & b.child.childLanes)) return oj(a2, b, c);
          G(L2, L2.current & 1);
          a2 = Zi(a2, b, c);
          return null !== a2 ? a2.sibling : null;
        }
        G(L2, L2.current & 1);
        break;
      case 19:
        d = 0 !== (c & b.childLanes);
        if (0 !== (a2.flags & 128)) {
          if (d) return xj(a2, b, c);
          b.flags |= 128;
        }
        e2 = b.memoizedState;
        null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
        G(L2, L2.current);
        if (d) break;
        else return null;
      case 22:
      case 23:
        return b.lanes = 0, dj(a2, b, c);
    }
    return Zi(a2, b, c);
  }
  var zj, Aj, Bj, Cj;
  zj = function(a2, b) {
    for (var c = b.child; null !== c; ) {
      if (5 === c.tag || 6 === c.tag) a2.appendChild(c.stateNode);
      else if (4 !== c.tag && null !== c.child) {
        c.child.return = c;
        c = c.child;
        continue;
      }
      if (c === b) break;
      for (; null === c.sibling; ) {
        if (null === c.return || c.return === b) return;
        c = c.return;
      }
      c.sibling.return = c.return;
      c = c.sibling;
    }
  };
  Aj = function() {
  };
  Bj = function(a2, b, c, d) {
    var e2 = a2.memoizedProps;
    if (e2 !== d) {
      a2 = b.stateNode;
      xh(uh.current);
      var f2 = null;
      switch (c) {
        case "input":
          e2 = Ya(a2, e2);
          d = Ya(a2, d);
          f2 = [];
          break;
        case "select":
          e2 = A2({}, e2, { value: void 0 });
          d = A2({}, d, { value: void 0 });
          f2 = [];
          break;
        case "textarea":
          e2 = gb(a2, e2);
          d = gb(a2, d);
          f2 = [];
          break;
        default:
          "function" !== typeof e2.onClick && "function" === typeof d.onClick && (a2.onclick = Bf);
      }
      ub(c, d);
      var g;
      c = null;
      for (l in e2) if (!d.hasOwnProperty(l) && e2.hasOwnProperty(l) && null != e2[l]) if ("style" === l) {
        var h = e2[l];
        for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
      } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f2 || (f2 = []) : (f2 = f2 || []).push(l, null));
      for (l in d) {
        var k = d[l];
        h = null != e2 ? e2[l] : void 0;
        if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
          for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
          for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
        } else c || (f2 || (f2 = []), f2.push(
          l,
          c
        )), c = k;
        else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f2 = f2 || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f2 = f2 || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a2), f2 || h === k || (f2 = [])) : (f2 = f2 || []).push(l, k));
      }
      c && (f2 = f2 || []).push("style", c);
      var l = f2;
      if (b.updateQueue = l) b.flags |= 4;
    }
  };
  Cj = function(a2, b, c, d) {
    c !== d && (b.flags |= 4);
  };
  function Dj(a2, b) {
    if (!I) switch (a2.tailMode) {
      case "hidden":
        b = a2.tail;
        for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a2.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a2.tail;
        for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d.sibling = null;
    }
  }
  function S(a2) {
    var b = null !== a2.alternate && a2.alternate.child === a2.child, c = 0, d = 0;
    if (b) for (var e2 = a2.child; null !== e2; ) c |= e2.lanes | e2.childLanes, d |= e2.subtreeFlags & 14680064, d |= e2.flags & 14680064, e2.return = a2, e2 = e2.sibling;
    else for (e2 = a2.child; null !== e2; ) c |= e2.lanes | e2.childLanes, d |= e2.subtreeFlags, d |= e2.flags, e2.return = a2, e2 = e2.sibling;
    a2.subtreeFlags |= d;
    a2.childLanes = c;
    return b;
  }
  function Ej(a2, b, c) {
    var d = b.pendingProps;
    wg(b);
    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return S(b), null;
      case 1:
        return Zf(b.type) && $f(), S(b), null;
      case 3:
        d = b.stateNode;
        zh();
        E2(Wf);
        E2(H);
        Eh();
        d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
        if (null === a2 || null === a2.child) Gg(b) ? b.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
        Aj(a2, b);
        S(b);
        return null;
      case 5:
        Bh(b);
        var e2 = xh(wh.current);
        c = b.type;
        if (null !== a2 && null != b.stateNode) Bj(a2, b, c, d, e2), a2.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        else {
          if (!d) {
            if (null === b.stateNode) throw Error(p(166));
            S(b);
            return null;
          }
          a2 = xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.type;
            var f2 = b.memoizedProps;
            d[Of] = b;
            d[Pf] = f2;
            a2 = 0 !== (b.mode & 1);
            switch (c) {
              case "dialog":
                D("cancel", d);
                D("close", d);
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", d);
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++) D(lf[e2], d);
                break;
              case "source":
                D("error", d);
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  d
                );
                D("load", d);
                break;
              case "details":
                D("toggle", d);
                break;
              case "input":
                Za(d, f2);
                D("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!f2.multiple };
                D("invalid", d);
                break;
              case "textarea":
                hb(d, f2), D("invalid", d);
            }
            ub(c, f2);
            e2 = null;
            for (var g in f2) if (f2.hasOwnProperty(g)) {
              var h = f2[g];
              "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a2), e2 = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
                d.textContent,
                h,
                a2
              ), e2 = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
            }
            switch (c) {
              case "input":
                Va(d);
                db(d, f2, true);
                break;
              case "textarea":
                Va(d);
                jb(d);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" === typeof f2.onClick && (d.onclick = Bf);
            }
            d = e2;
            b.updateQueue = d;
            null !== d && (b.flags |= 4);
          } else {
            g = 9 === e2.nodeType ? e2 : e2.ownerDocument;
            "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb(c));
            "http://www.w3.org/1999/xhtml" === a2 ? "script" === c ? (a2 = g.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d.is ? a2 = g.createElement(c, { is: d.is }) : (a2 = g.createElement(c), "select" === c && (g = a2, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a2 = g.createElementNS(a2, c);
            a2[Of] = b;
            a2[Pf] = d;
            zj(a2, b, false, false);
            b.stateNode = a2;
            a: {
              g = vb(c, d);
              switch (c) {
                case "dialog":
                  D("cancel", a2);
                  D("close", a2);
                  e2 = d;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", a2);
                  e2 = d;
                  break;
                case "video":
                case "audio":
                  for (e2 = 0; e2 < lf.length; e2++) D(lf[e2], a2);
                  e2 = d;
                  break;
                case "source":
                  D("error", a2);
                  e2 = d;
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    a2
                  );
                  D("load", a2);
                  e2 = d;
                  break;
                case "details":
                  D("toggle", a2);
                  e2 = d;
                  break;
                case "input":
                  Za(a2, d);
                  e2 = Ya(a2, d);
                  D("invalid", a2);
                  break;
                case "option":
                  e2 = d;
                  break;
                case "select":
                  a2._wrapperState = { wasMultiple: !!d.multiple };
                  e2 = A2({}, d, { value: void 0 });
                  D("invalid", a2);
                  break;
                case "textarea":
                  hb(a2, d);
                  e2 = gb(a2, d);
                  D("invalid", a2);
                  break;
                default:
                  e2 = d;
              }
              ub(c, e2);
              h = e2;
              for (f2 in h) if (h.hasOwnProperty(f2)) {
                var k = h[f2];
                "style" === f2 ? sb(a2, k) : "dangerouslySetInnerHTML" === f2 ? (k = k ? k.__html : void 0, null != k && nb(a2, k)) : "children" === f2 ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a2, k) : "number" === typeof k && ob(a2, "" + k) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k && "onScroll" === f2 && D("scroll", a2) : null != k && ta(a2, f2, k, g));
              }
              switch (c) {
                case "input":
                  Va(a2);
                  db(a2, d, false);
                  break;
                case "textarea":
                  Va(a2);
                  jb(a2);
                  break;
                case "option":
                  null != d.value && a2.setAttribute("value", "" + Sa(d.value));
                  break;
                case "select":
                  a2.multiple = !!d.multiple;
                  f2 = d.value;
                  null != f2 ? fb(a2, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                    a2,
                    !!d.multiple,
                    d.defaultValue,
                    true
                  );
                  break;
                default:
                  "function" === typeof e2.onClick && (a2.onclick = Bf);
              }
              switch (c) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d = !!d.autoFocus;
                  break a;
                case "img":
                  d = true;
                  break a;
                default:
                  d = false;
              }
            }
            d && (b.flags |= 4);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        S(b);
        return null;
      case 6:
        if (a2 && null != b.stateNode) Cj(a2, b, a2.memoizedProps, d);
        else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
          c = xh(wh.current);
          xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.memoizedProps;
            d[Of] = b;
            if (f2 = d.nodeValue !== c) {
              if (a2 = xg, null !== a2) switch (a2.tag) {
                case 3:
                  Af(d.nodeValue, c, 0 !== (a2.mode & 1));
                  break;
                case 5:
                  true !== a2.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a2.mode & 1));
              }
            }
            f2 && (b.flags |= 4);
          } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
        }
        S(b);
        return null;
      case 13:
        E2(L2);
        d = b.memoizedState;
        if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
          if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
          else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
            if (null === a2) {
              if (!f2) throw Error(p(318));
              f2 = b.memoizedState;
              f2 = null !== f2 ? f2.dehydrated : null;
              if (!f2) throw Error(p(317));
              f2[Of] = b;
            } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            S(b);
            f2 = false;
          } else null !== zg && (Fj(zg), zg = null), f2 = true;
          if (!f2) return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128)) return b.lanes = c, b;
        d = null !== d;
        d !== (null !== a2 && null !== a2.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a2 || 0 !== (L2.current & 1) ? 0 === T2 && (T2 = 3) : tj()));
        null !== b.updateQueue && (b.flags |= 4);
        S(b);
        return null;
      case 4:
        return zh(), Aj(a2, b), null === a2 && sf(b.stateNode.containerInfo), S(b), null;
      case 10:
        return ah(b.type._context), S(b), null;
      case 17:
        return Zf(b.type) && $f(), S(b), null;
      case 19:
        E2(L2);
        f2 = b.memoizedState;
        if (null === f2) return S(b), null;
        d = 0 !== (b.flags & 128);
        g = f2.rendering;
        if (null === g) if (d) Dj(f2, false);
        else {
          if (0 !== T2 || null !== a2 && 0 !== (a2.flags & 128)) for (a2 = b.child; null !== a2; ) {
            g = Ch(a2);
            if (null !== g) {
              b.flags |= 128;
              Dj(f2, false);
              d = g.updateQueue;
              null !== d && (b.updateQueue = d, b.flags |= 4);
              b.subtreeFlags = 0;
              d = c;
              for (c = b.child; null !== c; ) f2 = c, a2 = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a2 = g.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c = c.sibling;
              G(L2, L2.current & 1 | 2);
              return b.child;
            }
            a2 = a2.sibling;
          }
          null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        }
        else {
          if (!d) if (a2 = Ch(g), null !== a2) {
            if (b.flags |= 128, d = true, c = a2.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
          } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
          f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
        }
        if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L2.current, G(L2, d ? c & 1 | 2 : c & 1), b;
        S(b);
        return null;
      case 22:
      case 23:
        return Hj(), d = null !== b.memoizedState, null !== a2 && null !== a2.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p(156, b.tag));
  }
  function Ij(a2, b) {
    wg(b);
    switch (b.tag) {
      case 1:
        return Zf(b.type) && $f(), a2 = b.flags, a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
      case 3:
        return zh(), E2(Wf), E2(H), Eh(), a2 = b.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b.flags = a2 & -65537 | 128, b) : null;
      case 5:
        return Bh(b), null;
      case 13:
        E2(L2);
        a2 = b.memoizedState;
        if (null !== a2 && null !== a2.dehydrated) {
          if (null === b.alternate) throw Error(p(340));
          Ig();
        }
        a2 = b.flags;
        return a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
      case 19:
        return E2(L2), null;
      case 4:
        return zh(), null;
      case 10:
        return ah(b.type._context), null;
      case 22:
      case 23:
        return Hj(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Jj = false, U2 = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V2 = null;
  function Lj(a2, b) {
    var c = a2.ref;
    if (null !== c) if ("function" === typeof c) try {
      c(null);
    } catch (d) {
      W(a2, b, d);
    }
    else c.current = null;
  }
  function Mj(a2, b, c) {
    try {
      c();
    } catch (d) {
      W(a2, b, d);
    }
  }
  var Nj = false;
  function Oj(a2, b) {
    Cf = dd;
    a2 = Me();
    if (Ne(a2)) {
      if ("selectionStart" in a2) var c = { start: a2.selectionStart, end: a2.selectionEnd };
      else a: {
        c = (c = a2.ownerDocument) && c.defaultView || window;
        var d = c.getSelection && c.getSelection();
        if (d && 0 !== d.rangeCount) {
          c = d.anchorNode;
          var e2 = d.anchorOffset, f2 = d.focusNode;
          d = d.focusOffset;
          try {
            c.nodeType, f2.nodeType;
          } catch (F2) {
            c = null;
            break a;
          }
          var g = 0, h = -1, k = -1, l = 0, m = 0, q = a2, r = null;
          b: for (; ; ) {
            for (var y; ; ) {
              q !== c || 0 !== e2 && 3 !== q.nodeType || (h = g + e2);
              q !== f2 || 0 !== d && 3 !== q.nodeType || (k = g + d);
              3 === q.nodeType && (g += q.nodeValue.length);
              if (null === (y = q.firstChild)) break;
              r = q;
              q = y;
            }
            for (; ; ) {
              if (q === a2) break b;
              r === c && ++l === e2 && (h = g);
              r === f2 && ++m === d && (k = g);
              if (null !== (y = q.nextSibling)) break;
              q = r;
              r = q.parentNode;
            }
            q = y;
          }
          c = -1 === h || -1 === k ? null : { start: h, end: k };
        } else c = null;
      }
      c = c || { start: 0, end: 0 };
    } else c = null;
    Df = { focusedElem: a2, selectionRange: c };
    dd = false;
    for (V2 = b; null !== V2; ) if (b = V2, a2 = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a2) a2.return = b, V2 = a2;
    else for (; null !== V2; ) {
      b = V2;
      try {
        var n = b.alternate;
        if (0 !== (b.flags & 1024)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (null !== n) {
              var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
              x.__reactInternalSnapshotBeforeUpdate = w;
            }
            break;
          case 3:
            var u2 = b.stateNode.containerInfo;
            1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(p(163));
        }
      } catch (F2) {
        W(b, b.return, F2);
      }
      a2 = b.sibling;
      if (null !== a2) {
        a2.return = b.return;
        V2 = a2;
        break;
      }
      V2 = b.return;
    }
    n = Nj;
    Nj = false;
    return n;
  }
  function Pj(a2, b, c) {
    var d = b.updateQueue;
    d = null !== d ? d.lastEffect : null;
    if (null !== d) {
      var e2 = d = d.next;
      do {
        if ((e2.tag & a2) === a2) {
          var f2 = e2.destroy;
          e2.destroy = void 0;
          void 0 !== f2 && Mj(b, c, f2);
        }
        e2 = e2.next;
      } while (e2 !== d);
    }
  }
  function Qj(a2, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;
    if (null !== b) {
      var c = b = b.next;
      do {
        if ((c.tag & a2) === a2) {
          var d = c.create;
          c.destroy = d();
        }
        c = c.next;
      } while (c !== b);
    }
  }
  function Rj(a2) {
    var b = a2.ref;
    if (null !== b) {
      var c = a2.stateNode;
      switch (a2.tag) {
        case 5:
          a2 = c;
          break;
        default:
          a2 = c;
      }
      "function" === typeof b ? b(a2) : b.current = a2;
    }
  }
  function Sj(a2) {
    var b = a2.alternate;
    null !== b && (a2.alternate = null, Sj(b));
    a2.child = null;
    a2.deletions = null;
    a2.sibling = null;
    5 === a2.tag && (b = a2.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
    a2.stateNode = null;
    a2.return = null;
    a2.dependencies = null;
    a2.memoizedProps = null;
    a2.memoizedState = null;
    a2.pendingProps = null;
    a2.stateNode = null;
    a2.updateQueue = null;
  }
  function Tj(a2) {
    return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
  }
  function Uj(a2) {
    a: for (; ; ) {
      for (; null === a2.sibling; ) {
        if (null === a2.return || Tj(a2.return)) return null;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
        if (a2.flags & 2) continue a;
        if (null === a2.child || 4 === a2.tag) continue a;
        else a2.child.return = a2, a2 = a2.child;
      }
      if (!(a2.flags & 2)) return a2.stateNode;
    }
  }
  function Vj(a2, b, c) {
    var d = a2.tag;
    if (5 === d || 6 === d) a2 = a2.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a2, b) : c.insertBefore(a2, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a2, c)) : (b = c, b.appendChild(a2)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
    else if (4 !== d && (a2 = a2.child, null !== a2)) for (Vj(a2, b, c), a2 = a2.sibling; null !== a2; ) Vj(a2, b, c), a2 = a2.sibling;
  }
  function Wj(a2, b, c) {
    var d = a2.tag;
    if (5 === d || 6 === d) a2 = a2.stateNode, b ? c.insertBefore(a2, b) : c.appendChild(a2);
    else if (4 !== d && (a2 = a2.child, null !== a2)) for (Wj(a2, b, c), a2 = a2.sibling; null !== a2; ) Wj(a2, b, c), a2 = a2.sibling;
  }
  var X = null, Xj = false;
  function Yj(a2, b, c) {
    for (c = c.child; null !== c; ) Zj(a2, b, c), c = c.sibling;
  }
  function Zj(a2, b, c) {
    if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
      lc.onCommitFiberUnmount(kc, c);
    } catch (h) {
    }
    switch (c.tag) {
      case 5:
        U2 || Lj(c, b);
      case 6:
        var d = X, e2 = Xj;
        X = null;
        Yj(a2, b, c);
        X = d;
        Xj = e2;
        null !== X && (Xj ? (a2 = X, c = c.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c) : a2.removeChild(c)) : X.removeChild(c.stateNode));
        break;
      case 18:
        null !== X && (Xj ? (a2 = X, c = c.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c) : 1 === a2.nodeType && Kf(a2, c), bd(a2)) : Kf(X, c.stateNode));
        break;
      case 4:
        d = X;
        e2 = Xj;
        X = c.stateNode.containerInfo;
        Xj = true;
        Yj(a2, b, c);
        X = d;
        Xj = e2;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!U2 && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
          e2 = d = d.next;
          do {
            var f2 = e2, g = f2.destroy;
            f2 = f2.tag;
            void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
            e2 = e2.next;
          } while (e2 !== d);
        }
        Yj(a2, b, c);
        break;
      case 1:
        if (!U2 && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          W(c, b, h);
        }
        Yj(a2, b, c);
        break;
      case 21:
        Yj(a2, b, c);
        break;
      case 22:
        c.mode & 1 ? (U2 = (d = U2) || null !== c.memoizedState, Yj(a2, b, c), U2 = d) : Yj(a2, b, c);
        break;
      default:
        Yj(a2, b, c);
    }
  }
  function ak(a2) {
    var b = a2.updateQueue;
    if (null !== b) {
      a2.updateQueue = null;
      var c = a2.stateNode;
      null === c && (c = a2.stateNode = new Kj());
      b.forEach(function(b2) {
        var d = bk.bind(null, a2, b2);
        c.has(b2) || (c.add(b2), b2.then(d, d));
      });
    }
  }
  function ck(a2, b) {
    var c = b.deletions;
    if (null !== c) for (var d = 0; d < c.length; d++) {
      var e2 = c[d];
      try {
        var f2 = a2, g = b, h = g;
        a: for (; null !== h; ) {
          switch (h.tag) {
            case 5:
              X = h.stateNode;
              Xj = false;
              break a;
            case 3:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
            case 4:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
          }
          h = h.return;
        }
        if (null === X) throw Error(p(160));
        Zj(f2, g, e2);
        X = null;
        Xj = false;
        var k = e2.alternate;
        null !== k && (k.return = null);
        e2.return = null;
      } catch (l) {
        W(e2, b, l);
      }
    }
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a2), b = b.sibling;
  }
  function dk(a2, b) {
    var c = a2.alternate, d = a2.flags;
    switch (a2.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ck(b, a2);
        ek(a2);
        if (d & 4) {
          try {
            Pj(3, a2, a2.return), Qj(3, a2);
          } catch (t) {
            W(a2, a2.return, t);
          }
          try {
            Pj(5, a2, a2.return);
          } catch (t) {
            W(a2, a2.return, t);
          }
        }
        break;
      case 1:
        ck(b, a2);
        ek(a2);
        d & 512 && null !== c && Lj(c, c.return);
        break;
      case 5:
        ck(b, a2);
        ek(a2);
        d & 512 && null !== c && Lj(c, c.return);
        if (a2.flags & 32) {
          var e2 = a2.stateNode;
          try {
            ob(e2, "");
          } catch (t) {
            W(a2, a2.return, t);
          }
        }
        if (d & 4 && (e2 = a2.stateNode, null != e2)) {
          var f2 = a2.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a2.type, k = a2.updateQueue;
          a2.updateQueue = null;
          if (null !== k) try {
            "input" === h && "radio" === f2.type && null != f2.name && ab(e2, f2);
            vb(h, g);
            var l = vb(h, f2);
            for (g = 0; g < k.length; g += 2) {
              var m = k[g], q = k[g + 1];
              "style" === m ? sb(e2, q) : "dangerouslySetInnerHTML" === m ? nb(e2, q) : "children" === m ? ob(e2, q) : ta(e2, m, q, l);
            }
            switch (h) {
              case "input":
                bb(e2, f2);
                break;
              case "textarea":
                ib(e2, f2);
                break;
              case "select":
                var r = e2._wrapperState.wasMultiple;
                e2._wrapperState.wasMultiple = !!f2.multiple;
                var y = f2.value;
                null != y ? fb(e2, !!f2.multiple, y, false) : r !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e2,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e2[Pf] = f2;
          } catch (t) {
            W(a2, a2.return, t);
          }
        }
        break;
      case 6:
        ck(b, a2);
        ek(a2);
        if (d & 4) {
          if (null === a2.stateNode) throw Error(p(162));
          e2 = a2.stateNode;
          f2 = a2.memoizedProps;
          try {
            e2.nodeValue = f2;
          } catch (t) {
            W(a2, a2.return, t);
          }
        }
        break;
      case 3:
        ck(b, a2);
        ek(a2);
        if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
          bd(b.containerInfo);
        } catch (t) {
          W(a2, a2.return, t);
        }
        break;
      case 4:
        ck(b, a2);
        ek(a2);
        break;
      case 13:
        ck(b, a2);
        ek(a2);
        e2 = a2.child;
        e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (fk = B()));
        d & 4 && ak(a2);
        break;
      case 22:
        m = null !== c && null !== c.memoizedState;
        a2.mode & 1 ? (U2 = (l = U2) || m, ck(b, a2), U2 = l) : ck(b, a2);
        ek(a2);
        if (d & 8192) {
          l = null !== a2.memoizedState;
          if ((a2.stateNode.isHidden = l) && !m && 0 !== (a2.mode & 1)) for (V2 = a2, m = a2.child; null !== m; ) {
            for (q = V2 = m; null !== V2; ) {
              r = V2;
              y = r.child;
              switch (r.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r, r.return);
                  break;
                case 1:
                  Lj(r, r.return);
                  var n = r.stateNode;
                  if ("function" === typeof n.componentWillUnmount) {
                    d = r;
                    c = r.return;
                    try {
                      b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                    } catch (t) {
                      W(d, c, t);
                    }
                  }
                  break;
                case 5:
                  Lj(r, r.return);
                  break;
                case 22:
                  if (null !== r.memoizedState) {
                    gk(q);
                    continue;
                  }
              }
              null !== y ? (y.return = r, V2 = y) : gk(q);
            }
            m = m.sibling;
          }
          a: for (m = null, q = a2; ; ) {
            if (5 === q.tag) {
              if (null === m) {
                m = q;
                try {
                  e2 = q.stateNode, l ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                } catch (t) {
                  W(a2, a2.return, t);
                }
              }
            } else if (6 === q.tag) {
              if (null === m) try {
                q.stateNode.nodeValue = l ? "" : q.memoizedProps;
              } catch (t) {
                W(a2, a2.return, t);
              }
            } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a2) && null !== q.child) {
              q.child.return = q;
              q = q.child;
              continue;
            }
            if (q === a2) break a;
            for (; null === q.sibling; ) {
              if (null === q.return || q.return === a2) break a;
              m === q && (m = null);
              q = q.return;
            }
            m === q && (m = null);
            q.sibling.return = q.return;
            q = q.sibling;
          }
        }
        break;
      case 19:
        ck(b, a2);
        ek(a2);
        d & 4 && ak(a2);
        break;
      case 21:
        break;
      default:
        ck(
          b,
          a2
        ), ek(a2);
    }
  }
  function ek(a2) {
    var b = a2.flags;
    if (b & 2) {
      try {
        a: {
          for (var c = a2.return; null !== c; ) {
            if (Tj(c)) {
              var d = c;
              break a;
            }
            c = c.return;
          }
          throw Error(p(160));
        }
        switch (d.tag) {
          case 5:
            var e2 = d.stateNode;
            d.flags & 32 && (ob(e2, ""), d.flags &= -33);
            var f2 = Uj(a2);
            Wj(a2, f2, e2);
            break;
          case 3:
          case 4:
            var g = d.stateNode.containerInfo, h = Uj(a2);
            Vj(a2, h, g);
            break;
          default:
            throw Error(p(161));
        }
      } catch (k) {
        W(a2, a2.return, k);
      }
      a2.flags &= -3;
    }
    b & 4096 && (a2.flags &= -4097);
  }
  function hk(a2, b, c) {
    V2 = a2;
    ik(a2);
  }
  function ik(a2, b, c) {
    for (var d = 0 !== (a2.mode & 1); null !== V2; ) {
      var e2 = V2, f2 = e2.child;
      if (22 === e2.tag && d) {
        var g = null !== e2.memoizedState || Jj;
        if (!g) {
          var h = e2.alternate, k = null !== h && null !== h.memoizedState || U2;
          h = Jj;
          var l = U2;
          Jj = g;
          if ((U2 = k) && !l) for (V2 = e2; null !== V2; ) g = V2, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e2) : null !== k ? (k.return = g, V2 = k) : jk(e2);
          for (; null !== f2; ) V2 = f2, ik(f2), f2 = f2.sibling;
          V2 = e2;
          Jj = h;
          U2 = l;
        }
        kk(a2);
      } else 0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V2 = f2) : kk(a2);
    }
  }
  function kk(a2) {
    for (; null !== V2; ) {
      var b = V2;
      if (0 !== (b.flags & 8772)) {
        var c = b.alternate;
        try {
          if (0 !== (b.flags & 8772)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U2 || Qj(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !U2) if (null === c) d.componentDidMount();
              else {
                var e2 = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                d.componentDidUpdate(e2, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var f2 = b.updateQueue;
              null !== f2 && sh(b, f2, d);
              break;
            case 3:
              var g = b.updateQueue;
              if (null !== g) {
                c = null;
                if (null !== b.child) switch (b.child.tag) {
                  case 5:
                    c = b.child.stateNode;
                    break;
                  case 1:
                    c = b.child.stateNode;
                }
                sh(b, g, c);
              }
              break;
            case 5:
              var h = b.stateNode;
              if (null === c && b.flags & 4) {
                c = h;
                var k = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k.autoFocus && c.focus();
                    break;
                  case "img":
                    k.src && (c.src = k.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b.memoizedState) {
                var l = b.alternate;
                if (null !== l) {
                  var m = l.memoizedState;
                  if (null !== m) {
                    var q = m.dehydrated;
                    null !== q && bd(q);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p(163));
          }
          U2 || b.flags & 512 && Rj(b);
        } catch (r) {
          W(b, b.return, r);
        }
      }
      if (b === a2) {
        V2 = null;
        break;
      }
      c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V2 = c;
        break;
      }
      V2 = b.return;
    }
  }
  function gk(a2) {
    for (; null !== V2; ) {
      var b = V2;
      if (b === a2) {
        V2 = null;
        break;
      }
      var c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V2 = c;
        break;
      }
      V2 = b.return;
    }
  }
  function jk(a2) {
    for (; null !== V2; ) {
      var b = V2;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c = b.return;
            try {
              Qj(4, b);
            } catch (k) {
              W(b, c, k);
            }
            break;
          case 1:
            var d = b.stateNode;
            if ("function" === typeof d.componentDidMount) {
              var e2 = b.return;
              try {
                d.componentDidMount();
              } catch (k) {
                W(b, e2, k);
              }
            }
            var f2 = b.return;
            try {
              Rj(b);
            } catch (k) {
              W(b, f2, k);
            }
            break;
          case 5:
            var g = b.return;
            try {
              Rj(b);
            } catch (k) {
              W(b, g, k);
            }
        }
      } catch (k) {
        W(b, b.return, k);
      }
      if (b === a2) {
        V2 = null;
        break;
      }
      var h = b.sibling;
      if (null !== h) {
        h.return = b.return;
        V2 = h;
        break;
      }
      V2 = b.return;
    }
  }
  var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z2 = 0, fj = 0, ej = Uf(0), T2 = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
  function R() {
    return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
  }
  function yi(a2) {
    if (0 === (a2.mode & 1)) return 1;
    if (0 !== (K & 2) && 0 !== Z2) return Z2 & -Z2;
    if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
    a2 = C;
    if (0 !== a2) return a2;
    a2 = window.event;
    a2 = void 0 === a2 ? 16 : jd(a2.type);
    return a2;
  }
  function gi(a2, b, c, d) {
    if (50 < yk) throw yk = 0, zk = null, Error(p(185));
    Ac(a2, c, d);
    if (0 === (K & 2) || a2 !== Q) a2 === Q && (0 === (K & 2) && (qk |= c), 4 === T2 && Ck(a2, Z2)), Dk(a2, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
  }
  function Dk(a2, b) {
    var c = a2.callbackNode;
    wc(a2, b);
    var d = uc(a2, a2 === Q ? Z2 : 0);
    if (0 === d) null !== c && bc(c), a2.callbackNode = null, a2.callbackPriority = 0;
    else if (b = d & -d, a2.callbackPriority !== b) {
      null != c && bc(c);
      if (1 === b) 0 === a2.tag ? ig(Ek.bind(null, a2)) : hg(Ek.bind(null, a2)), Jf(function() {
        0 === (K & 6) && jg();
      }), c = null;
      else {
        switch (Dc(d)) {
          case 1:
            c = fc;
            break;
          case 4:
            c = gc;
            break;
          case 16:
            c = hc;
            break;
          case 536870912:
            c = jc;
            break;
          default:
            c = hc;
        }
        c = Fk(c, Gk.bind(null, a2));
      }
      a2.callbackPriority = b;
      a2.callbackNode = c;
    }
  }
  function Gk(a2, b) {
    Ak = -1;
    Bk = 0;
    if (0 !== (K & 6)) throw Error(p(327));
    var c = a2.callbackNode;
    if (Hk() && a2.callbackNode !== c) return null;
    var d = uc(a2, a2 === Q ? Z2 : 0);
    if (0 === d) return null;
    if (0 !== (d & 30) || 0 !== (d & a2.expiredLanes) || b) b = Ik(a2, d);
    else {
      b = d;
      var e2 = K;
      K |= 2;
      var f2 = Jk();
      if (Q !== a2 || Z2 !== b) uk = null, Gj = B() + 500, Kk(a2, b);
      do
        try {
          Lk();
          break;
        } catch (h) {
          Mk(a2, h);
        }
      while (1);
      $g();
      mk.current = f2;
      K = e2;
      null !== Y ? b = 0 : (Q = null, Z2 = 0, b = T2);
    }
    if (0 !== b) {
      2 === b && (e2 = xc(a2), 0 !== e2 && (d = e2, b = Nk(a2, e2)));
      if (1 === b) throw c = pk, Kk(a2, 0), Ck(a2, d), Dk(a2, B()), c;
      if (6 === b) Ck(a2, d);
      else {
        e2 = a2.current.alternate;
        if (0 === (d & 30) && !Ok(e2) && (b = Ik(a2, d), 2 === b && (f2 = xc(a2), 0 !== f2 && (d = f2, b = Nk(a2, f2))), 1 === b)) throw c = pk, Kk(a2, 0), Ck(a2, d), Dk(a2, B()), c;
        a2.finishedWork = e2;
        a2.finishedLanes = d;
        switch (b) {
          case 0:
          case 1:
            throw Error(p(345));
          case 2:
            Pk(a2, tk, uk);
            break;
          case 3:
            Ck(a2, d);
            if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
              if (0 !== uc(a2, 0)) break;
              e2 = a2.suspendedLanes;
              if ((e2 & d) !== d) {
                R();
                a2.pingedLanes |= a2.suspendedLanes & e2;
                break;
              }
              a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), b);
              break;
            }
            Pk(a2, tk, uk);
            break;
          case 4:
            Ck(a2, d);
            if ((d & 4194240) === d) break;
            b = a2.eventTimes;
            for (e2 = -1; 0 < d; ) {
              var g = 31 - oc(d);
              f2 = 1 << g;
              g = b[g];
              g > e2 && (e2 = g);
              d &= ~f2;
            }
            d = e2;
            d = B() - d;
            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
            if (10 < d) {
              a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), d);
              break;
            }
            Pk(a2, tk, uk);
            break;
          case 5:
            Pk(a2, tk, uk);
            break;
          default:
            throw Error(p(329));
        }
      }
    }
    Dk(a2, B());
    return a2.callbackNode === c ? Gk.bind(null, a2) : null;
  }
  function Nk(a2, b) {
    var c = sk;
    a2.current.memoizedState.isDehydrated && (Kk(a2, b).flags |= 256);
    a2 = Ik(a2, b);
    2 !== a2 && (b = tk, tk = c, null !== b && Fj(b));
    return a2;
  }
  function Fj(a2) {
    null === tk ? tk = a2 : tk.push.apply(tk, a2);
  }
  function Ok(a2) {
    for (var b = a2; ; ) {
      if (b.flags & 16384) {
        var c = b.updateQueue;
        if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
          var e2 = c[d], f2 = e2.getSnapshot;
          e2 = e2.value;
          try {
            if (!He(f2(), e2)) return false;
          } catch (g) {
            return false;
          }
        }
      }
      c = b.child;
      if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
      else {
        if (b === a2) break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a2) return true;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
    }
    return true;
  }
  function Ck(a2, b) {
    b &= ~rk;
    b &= ~qk;
    a2.suspendedLanes |= b;
    a2.pingedLanes &= ~b;
    for (a2 = a2.expirationTimes; 0 < b; ) {
      var c = 31 - oc(b), d = 1 << c;
      a2[c] = -1;
      b &= ~d;
    }
  }
  function Ek(a2) {
    if (0 !== (K & 6)) throw Error(p(327));
    Hk();
    var b = uc(a2, 0);
    if (0 === (b & 1)) return Dk(a2, B()), null;
    var c = Ik(a2, b);
    if (0 !== a2.tag && 2 === c) {
      var d = xc(a2);
      0 !== d && (b = d, c = Nk(a2, d));
    }
    if (1 === c) throw c = pk, Kk(a2, 0), Ck(a2, b), Dk(a2, B()), c;
    if (6 === c) throw Error(p(345));
    a2.finishedWork = a2.current.alternate;
    a2.finishedLanes = b;
    Pk(a2, tk, uk);
    Dk(a2, B());
    return null;
  }
  function Qk(a2, b) {
    var c = K;
    K |= 1;
    try {
      return a2(b);
    } finally {
      K = c, 0 === K && (Gj = B() + 500, fg && jg());
    }
  }
  function Rk(a2) {
    null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
    var b = K;
    K |= 1;
    var c = ok.transition, d = C;
    try {
      if (ok.transition = null, C = 1, a2) return a2();
    } finally {
      C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
    }
  }
  function Hj() {
    fj = ej.current;
    E2(ej);
  }
  function Kk(a2, b) {
    a2.finishedWork = null;
    a2.finishedLanes = 0;
    var c = a2.timeoutHandle;
    -1 !== c && (a2.timeoutHandle = -1, Gf(c));
    if (null !== Y) for (c = Y.return; null !== c; ) {
      var d = c;
      wg(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && $f();
          break;
        case 3:
          zh();
          E2(Wf);
          E2(H);
          Eh();
          break;
        case 5:
          Bh(d);
          break;
        case 4:
          zh();
          break;
        case 13:
          E2(L2);
          break;
        case 19:
          E2(L2);
          break;
        case 10:
          ah(d.type._context);
          break;
        case 22:
        case 23:
          Hj();
      }
      c = c.return;
    }
    Q = a2;
    Y = a2 = Pg(a2.current, null);
    Z2 = fj = b;
    T2 = 0;
    pk = null;
    rk = qk = rh = 0;
    tk = sk = null;
    if (null !== fh) {
      for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
        c.interleaved = null;
        var e2 = d.next, f2 = c.pending;
        if (null !== f2) {
          var g = f2.next;
          f2.next = e2;
          d.next = g;
        }
        c.pending = d;
      }
      fh = null;
    }
    return a2;
  }
  function Mk(a2, b) {
    do {
      var c = Y;
      try {
        $g();
        Fh.current = Rh;
        if (Ih) {
          for (var d = M.memoizedState; null !== d; ) {
            var e2 = d.queue;
            null !== e2 && (e2.pending = null);
            d = d.next;
          }
          Ih = false;
        }
        Hh = 0;
        O = N = M = null;
        Jh = false;
        Kh = 0;
        nk.current = null;
        if (null === c || null === c.return) {
          T2 = 1;
          pk = b;
          Y = null;
          break;
        }
        a: {
          var f2 = a2, g = c.return, h = c, k = b;
          b = Z2;
          h.flags |= 32768;
          if (null !== k && "object" === typeof k && "function" === typeof k.then) {
            var l = k, m = h, q = m.tag;
            if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
              var r = m.alternate;
              r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
            }
            var y = Ui(g);
            if (null !== y) {
              y.flags &= -257;
              Vi(y, g, h, f2, b);
              y.mode & 1 && Si(f2, l, b);
              b = y;
              k = l;
              var n = b.updateQueue;
              if (null === n) {
                var t = /* @__PURE__ */ new Set();
                t.add(k);
                b.updateQueue = t;
              } else n.add(k);
              break a;
            } else {
              if (0 === (b & 1)) {
                Si(f2, l, b);
                tj();
                break a;
              }
              k = Error(p(426));
            }
          } else if (I && h.mode & 1) {
            var J = Ui(g);
            if (null !== J) {
              0 === (J.flags & 65536) && (J.flags |= 256);
              Vi(J, g, h, f2, b);
              Jg(Ji(k, h));
              break a;
            }
          }
          f2 = k = Ji(k, h);
          4 !== T2 && (T2 = 2);
          null === sk ? sk = [f2] : sk.push(f2);
          f2 = g;
          do {
            switch (f2.tag) {
              case 3:
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var x = Ni(f2, k, b);
                ph2(f2, x);
                break a;
              case 1:
                h = k;
                var w = f2.type, u2 = f2.stateNode;
                if (0 === (f2.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                  f2.flags |= 65536;
                  b &= -b;
                  f2.lanes |= b;
                  var F2 = Qi(f2, h, b);
                  ph2(f2, F2);
                  break a;
                }
            }
            f2 = f2.return;
          } while (null !== f2);
        }
        Sk(c);
      } catch (na) {
        b = na;
        Y === c && null !== c && (Y = c = c.return);
        continue;
      }
      break;
    } while (1);
  }
  function Jk() {
    var a2 = mk.current;
    mk.current = Rh;
    return null === a2 ? Rh : a2;
  }
  function tj() {
    if (0 === T2 || 3 === T2 || 2 === T2) T2 = 4;
    null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z2);
  }
  function Ik(a2, b) {
    var c = K;
    K |= 2;
    var d = Jk();
    if (Q !== a2 || Z2 !== b) uk = null, Kk(a2, b);
    do
      try {
        Tk();
        break;
      } catch (e2) {
        Mk(a2, e2);
      }
    while (1);
    $g();
    K = c;
    mk.current = d;
    if (null !== Y) throw Error(p(261));
    Q = null;
    Z2 = 0;
    return T2;
  }
  function Tk() {
    for (; null !== Y; ) Uk(Y);
  }
  function Lk() {
    for (; null !== Y && !cc(); ) Uk(Y);
  }
  function Uk(a2) {
    var b = Vk(a2.alternate, a2, fj);
    a2.memoizedProps = a2.pendingProps;
    null === b ? Sk(a2) : Y = b;
    nk.current = null;
  }
  function Sk(a2) {
    var b = a2;
    do {
      var c = b.alternate;
      a2 = b.return;
      if (0 === (b.flags & 32768)) {
        if (c = Ej(c, b, fj), null !== c) {
          Y = c;
          return;
        }
      } else {
        c = Ij(c, b);
        if (null !== c) {
          c.flags &= 32767;
          Y = c;
          return;
        }
        if (null !== a2) a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
        else {
          T2 = 6;
          Y = null;
          return;
        }
      }
      b = b.sibling;
      if (null !== b) {
        Y = b;
        return;
      }
      Y = b = a2;
    } while (null !== b);
    0 === T2 && (T2 = 5);
  }
  function Pk(a2, b, c) {
    var d = C, e2 = ok.transition;
    try {
      ok.transition = null, C = 1, Wk(a2, b, c, d);
    } finally {
      ok.transition = e2, C = d;
    }
    return null;
  }
  function Wk(a2, b, c, d) {
    do
      Hk();
    while (null !== wk);
    if (0 !== (K & 6)) throw Error(p(327));
    c = a2.finishedWork;
    var e2 = a2.finishedLanes;
    if (null === c) return null;
    a2.finishedWork = null;
    a2.finishedLanes = 0;
    if (c === a2.current) throw Error(p(177));
    a2.callbackNode = null;
    a2.callbackPriority = 0;
    var f2 = c.lanes | c.childLanes;
    Bc(a2, f2);
    a2 === Q && (Y = Q = null, Z2 = 0);
    0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
      Hk();
      return null;
    }));
    f2 = 0 !== (c.flags & 15990);
    if (0 !== (c.subtreeFlags & 15990) || f2) {
      f2 = ok.transition;
      ok.transition = null;
      var g = C;
      C = 1;
      var h = K;
      K |= 4;
      nk.current = null;
      Oj(a2, c);
      dk(c, a2);
      Oe(Df);
      dd = !!Cf;
      Df = Cf = null;
      a2.current = c;
      hk(c);
      dc();
      K = h;
      C = g;
      ok.transition = f2;
    } else a2.current = c;
    vk && (vk = false, wk = a2, xk = e2);
    f2 = a2.pendingLanes;
    0 === f2 && (Ri = null);
    mc(c.stateNode);
    Dk(a2, B());
    if (null !== b) for (d = a2.onRecoverableError, c = 0; c < b.length; c++) e2 = b[c], d(e2.value, { componentStack: e2.stack, digest: e2.digest });
    if (Oi) throw Oi = false, a2 = Pi, Pi = null, a2;
    0 !== (xk & 1) && 0 !== a2.tag && Hk();
    f2 = a2.pendingLanes;
    0 !== (f2 & 1) ? a2 === zk ? yk++ : (yk = 0, zk = a2) : yk = 0;
    jg();
    return null;
  }
  function Hk() {
    if (null !== wk) {
      var a2 = Dc(xk), b = ok.transition, c = C;
      try {
        ok.transition = null;
        C = 16 > a2 ? 16 : a2;
        if (null === wk) var d = false;
        else {
          a2 = wk;
          wk = null;
          xk = 0;
          if (0 !== (K & 6)) throw Error(p(331));
          var e2 = K;
          K |= 4;
          for (V2 = a2.current; null !== V2; ) {
            var f2 = V2, g = f2.child;
            if (0 !== (V2.flags & 16)) {
              var h = f2.deletions;
              if (null !== h) {
                for (var k = 0; k < h.length; k++) {
                  var l = h[k];
                  for (V2 = l; null !== V2; ) {
                    var m = V2;
                    switch (m.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pj(8, m, f2);
                    }
                    var q = m.child;
                    if (null !== q) q.return = m, V2 = q;
                    else for (; null !== V2; ) {
                      m = V2;
                      var r = m.sibling, y = m.return;
                      Sj(m);
                      if (m === l) {
                        V2 = null;
                        break;
                      }
                      if (null !== r) {
                        r.return = y;
                        V2 = r;
                        break;
                      }
                      V2 = y;
                    }
                  }
                }
                var n = f2.alternate;
                if (null !== n) {
                  var t = n.child;
                  if (null !== t) {
                    n.child = null;
                    do {
                      var J = t.sibling;
                      t.sibling = null;
                      t = J;
                    } while (null !== t);
                  }
                }
                V2 = f2;
              }
            }
            if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V2 = g;
            else b: for (; null !== V2; ) {
              f2 = V2;
              if (0 !== (f2.flags & 2048)) switch (f2.tag) {
                case 0:
                case 11:
                case 15:
                  Pj(9, f2, f2.return);
              }
              var x = f2.sibling;
              if (null !== x) {
                x.return = f2.return;
                V2 = x;
                break b;
              }
              V2 = f2.return;
            }
          }
          var w = a2.current;
          for (V2 = w; null !== V2; ) {
            g = V2;
            var u2 = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V2 = u2;
            else b: for (g = w; null !== V2; ) {
              h = V2;
              if (0 !== (h.flags & 2048)) try {
                switch (h.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Qj(9, h);
                }
              } catch (na) {
                W(h, h.return, na);
              }
              if (h === g) {
                V2 = null;
                break b;
              }
              var F2 = h.sibling;
              if (null !== F2) {
                F2.return = h.return;
                V2 = F2;
                break b;
              }
              V2 = h.return;
            }
          }
          K = e2;
          jg();
          if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
            lc.onPostCommitFiberRoot(kc, a2);
          } catch (na) {
          }
          d = true;
        }
        return d;
      } finally {
        C = c, ok.transition = b;
      }
    }
    return false;
  }
  function Xk(a2, b, c) {
    b = Ji(c, b);
    b = Ni(a2, b, 1);
    a2 = nh(a2, b, 1);
    b = R();
    null !== a2 && (Ac(a2, 1, b), Dk(a2, b));
  }
  function W(a2, b, c) {
    if (3 === a2.tag) Xk(a2, a2, c);
    else for (; null !== b; ) {
      if (3 === b.tag) {
        Xk(b, a2, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
          a2 = Ji(c, a2);
          a2 = Qi(b, a2, 1);
          b = nh(b, a2, 1);
          a2 = R();
          null !== b && (Ac(b, 1, a2), Dk(b, a2));
          break;
        }
      }
      b = b.return;
    }
  }
  function Ti(a2, b, c) {
    var d = a2.pingCache;
    null !== d && d.delete(b);
    b = R();
    a2.pingedLanes |= a2.suspendedLanes & c;
    Q === a2 && (Z2 & c) === c && (4 === T2 || 3 === T2 && (Z2 & 130023424) === Z2 && 500 > B() - fk ? Kk(a2, 0) : rk |= c);
    Dk(a2, b);
  }
  function Yk(a2, b) {
    0 === b && (0 === (a2.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
    var c = R();
    a2 = ih(a2, b);
    null !== a2 && (Ac(a2, b, c), Dk(a2, c));
  }
  function uj(a2) {
    var b = a2.memoizedState, c = 0;
    null !== b && (c = b.retryLane);
    Yk(a2, c);
  }
  function bk(a2, b) {
    var c = 0;
    switch (a2.tag) {
      case 13:
        var d = a2.stateNode;
        var e2 = a2.memoizedState;
        null !== e2 && (c = e2.retryLane);
        break;
      case 19:
        d = a2.stateNode;
        break;
      default:
        throw Error(p(314));
    }
    null !== d && d.delete(b);
    Yk(a2, c);
  }
  var Vk;
  Vk = function(a2, b, c) {
    if (null !== a2) if (a2.memoizedProps !== b.pendingProps || Wf.current) dh = true;
    else {
      if (0 === (a2.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a2, b, c);
      dh = 0 !== (a2.flags & 131072) ? true : false;
    }
    else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d = b.type;
        ij(a2, b);
        a2 = b.pendingProps;
        var e2 = Yf(b, H.current);
        ch(b, c);
        e2 = Nh(null, b, d, a2, e2, c);
        var f2 = Sh();
        b.flags |= 1;
        "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, kh(b), e2.updater = Ei, b.stateNode = e2, e2._reactInternals = b, Ii(b, d, a2, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e2, c), b = b.child);
        return b;
      case 16:
        d = b.elementType;
        a: {
          ij(a2, b);
          a2 = b.pendingProps;
          e2 = d._init;
          d = e2(d._payload);
          b.type = d;
          e2 = b.tag = Zk(d);
          a2 = Ci(d, a2);
          switch (e2) {
            case 0:
              b = cj(null, b, d, a2, c);
              break a;
            case 1:
              b = hj(null, b, d, a2, c);
              break a;
            case 11:
              b = Yi(null, b, d, a2, c);
              break a;
            case 14:
              b = $i(null, b, d, Ci(d.type, a2), c);
              break a;
          }
          throw Error(p(
            306,
            d,
            ""
          ));
        }
        return b;
      case 0:
        return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), cj(a2, b, d, e2, c);
      case 1:
        return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), hj(a2, b, d, e2, c);
      case 3:
        a: {
          kj(b);
          if (null === a2) throw Error(p(387));
          d = b.pendingProps;
          f2 = b.memoizedState;
          e2 = f2.element;
          lh(a2, b);
          qh(b, d, null, c);
          var g = b.memoizedState;
          d = g.element;
          if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
            e2 = Ji(Error(p(423)), b);
            b = lj(a2, b, d, c, e2);
            break a;
          } else if (d !== e2) {
            e2 = Ji(Error(p(424)), b);
            b = lj(a2, b, d, c, e2);
            break a;
          } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
          else {
            Ig();
            if (d === e2) {
              b = Zi(a2, b, c);
              break a;
            }
            Xi(a2, b, d, c);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ah(b), null === a2 && Eg(b), d = b.type, e2 = b.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g = e2.children, Ef(d, e2) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a2, b), Xi(a2, b, g, c), b.child;
      case 6:
        return null === a2 && Eg(b), null;
      case 13:
        return oj(a2, b, c);
      case 4:
        return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a2 ? b.child = Ug(b, null, d, c) : Xi(a2, b, d, c), b.child;
      case 11:
        return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), Yi(a2, b, d, e2, c);
      case 7:
        return Xi(a2, b, b.pendingProps, c), b.child;
      case 8:
        return Xi(a2, b, b.pendingProps.children, c), b.child;
      case 12:
        return Xi(a2, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context;
          e2 = b.pendingProps;
          f2 = b.memoizedProps;
          g = e2.value;
          G(Wg, d._currentValue);
          d._currentValue = g;
          if (null !== f2) if (He(f2.value, g)) {
            if (f2.children === e2.children && !Wf.current) {
              b = Zi(a2, b, c);
              break a;
            }
          } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
            var h = f2.dependencies;
            if (null !== h) {
              g = f2.child;
              for (var k = h.firstContext; null !== k; ) {
                if (k.context === d) {
                  if (1 === f2.tag) {
                    k = mh(-1, c & -c);
                    k.tag = 2;
                    var l = f2.updateQueue;
                    if (null !== l) {
                      l = l.shared;
                      var m = l.pending;
                      null === m ? k.next = k : (k.next = m.next, m.next = k);
                      l.pending = k;
                    }
                  }
                  f2.lanes |= c;
                  k = f2.alternate;
                  null !== k && (k.lanes |= c);
                  bh(
                    f2.return,
                    c,
                    b
                  );
                  h.lanes |= c;
                  break;
                }
                k = k.next;
              }
            } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
            else if (18 === f2.tag) {
              g = f2.return;
              if (null === g) throw Error(p(341));
              g.lanes |= c;
              h = g.alternate;
              null !== h && (h.lanes |= c);
              bh(g, c, b);
              g = f2.sibling;
            } else g = f2.child;
            if (null !== g) g.return = f2;
            else for (g = f2; null !== g; ) {
              if (g === b) {
                g = null;
                break;
              }
              f2 = g.sibling;
              if (null !== f2) {
                f2.return = g.return;
                g = f2;
                break;
              }
              g = g.return;
            }
            f2 = g;
          }
          Xi(a2, b, e2.children, c);
          b = b.child;
        }
        return b;
      case 9:
        return e2 = b.type, d = b.pendingProps.children, ch(b, c), e2 = eh(e2), d = d(e2), b.flags |= 1, Xi(a2, b, d, c), b.child;
      case 14:
        return d = b.type, e2 = Ci(d, b.pendingProps), e2 = Ci(d.type, e2), $i(a2, b, d, e2, c);
      case 15:
        return bj(a2, b, b.type, b.pendingProps, c);
      case 17:
        return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), ij(a2, b), b.tag = 1, Zf(d) ? (a2 = true, cg(b)) : a2 = false, ch(b, c), Gi(b, d, e2), Ii(b, d, e2, c), jj(null, b, d, true, a2, c);
      case 19:
        return xj(a2, b, c);
      case 22:
        return dj(a2, b, c);
    }
    throw Error(p(156, b.tag));
  };
  function Fk(a2, b) {
    return ac(a2, b);
  }
  function $k(a2, b, c, d) {
    this.tag = a2;
    this.key = c;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Bg(a2, b, c, d) {
    return new $k(a2, b, c, d);
  }
  function aj(a2) {
    a2 = a2.prototype;
    return !(!a2 || !a2.isReactComponent);
  }
  function Zk(a2) {
    if ("function" === typeof a2) return aj(a2) ? 1 : 0;
    if (void 0 !== a2 && null !== a2) {
      a2 = a2.$$typeof;
      if (a2 === Da) return 11;
      if (a2 === Ga) return 14;
    }
    return 2;
  }
  function Pg(a2, b) {
    var c = a2.alternate;
    null === c ? (c = Bg(a2.tag, b, a2.key, a2.mode), c.elementType = a2.elementType, c.type = a2.type, c.stateNode = a2.stateNode, c.alternate = a2, a2.alternate = c) : (c.pendingProps = b, c.type = a2.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
    c.flags = a2.flags & 14680064;
    c.childLanes = a2.childLanes;
    c.lanes = a2.lanes;
    c.child = a2.child;
    c.memoizedProps = a2.memoizedProps;
    c.memoizedState = a2.memoizedState;
    c.updateQueue = a2.updateQueue;
    b = a2.dependencies;
    c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
    c.sibling = a2.sibling;
    c.index = a2.index;
    c.ref = a2.ref;
    return c;
  }
  function Rg(a2, b, c, d, e2, f2) {
    var g = 2;
    d = a2;
    if ("function" === typeof a2) aj(a2) && (g = 1);
    else if ("string" === typeof a2) g = 5;
    else a: switch (a2) {
      case ya:
        return Tg(c.children, e2, f2, b);
      case za:
        g = 8;
        e2 |= 8;
        break;
      case Aa:
        return a2 = Bg(12, c, b, e2 | 2), a2.elementType = Aa, a2.lanes = f2, a2;
      case Ea:
        return a2 = Bg(13, c, b, e2), a2.elementType = Ea, a2.lanes = f2, a2;
      case Fa:
        return a2 = Bg(19, c, b, e2), a2.elementType = Fa, a2.lanes = f2, a2;
      case Ia:
        return pj(c, e2, f2, b);
      default:
        if ("object" === typeof a2 && null !== a2) switch (a2.$$typeof) {
          case Ba:
            g = 10;
            break a;
          case Ca:
            g = 9;
            break a;
          case Da:
            g = 11;
            break a;
          case Ga:
            g = 14;
            break a;
          case Ha:
            g = 16;
            d = null;
            break a;
        }
        throw Error(p(130, null == a2 ? a2 : typeof a2, ""));
    }
    b = Bg(g, c, b, e2);
    b.elementType = a2;
    b.type = d;
    b.lanes = f2;
    return b;
  }
  function Tg(a2, b, c, d) {
    a2 = Bg(7, a2, d, b);
    a2.lanes = c;
    return a2;
  }
  function pj(a2, b, c, d) {
    a2 = Bg(22, a2, d, b);
    a2.elementType = Ia;
    a2.lanes = c;
    a2.stateNode = { isHidden: false };
    return a2;
  }
  function Qg(a2, b, c) {
    a2 = Bg(6, a2, null, b);
    a2.lanes = c;
    return a2;
  }
  function Sg(a2, b, c) {
    b = Bg(4, null !== a2.children ? a2.children : [], a2.key, b);
    b.lanes = c;
    b.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
    return b;
  }
  function al(a2, b, c, d, e2) {
    this.tag = b;
    this.containerInfo = a2;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = zc(0);
    this.expirationTimes = zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = zc(0);
    this.identifierPrefix = d;
    this.onRecoverableError = e2;
    this.mutableSourceEagerHydrationData = null;
  }
  function bl(a2, b, c, d, e2, f2, g, h, k) {
    a2 = new al(a2, b, c, h, k);
    1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
    f2 = Bg(3, null, null, b);
    a2.current = f2;
    f2.stateNode = a2;
    f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
    kh(f2);
    return a2;
  }
  function cl(a2, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: wa, key: null == d ? null : "" + d, children: a2, containerInfo: b, implementation: c };
  }
  function dl(a2) {
    if (!a2) return Vf;
    a2 = a2._reactInternals;
    a: {
      if (Vb(a2) !== a2 || 1 !== a2.tag) throw Error(p(170));
      var b = a2;
      do {
        switch (b.tag) {
          case 3:
            b = b.stateNode.context;
            break a;
          case 1:
            if (Zf(b.type)) {
              b = b.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b = b.return;
      } while (null !== b);
      throw Error(p(171));
    }
    if (1 === a2.tag) {
      var c = a2.type;
      if (Zf(c)) return bg(a2, c, b);
    }
    return b;
  }
  function el(a2, b, c, d, e2, f2, g, h, k) {
    a2 = bl(c, d, true, a2, e2, f2, g, h, k);
    a2.context = dl(null);
    c = a2.current;
    d = R();
    e2 = yi(c);
    f2 = mh(d, e2);
    f2.callback = void 0 !== b && null !== b ? b : null;
    nh(c, f2, e2);
    a2.current.lanes = e2;
    Ac(a2, e2, d);
    Dk(a2, d);
    return a2;
  }
  function fl(a2, b, c, d) {
    var e2 = b.current, f2 = R(), g = yi(e2);
    c = dl(c);
    null === b.context ? b.context = c : b.pendingContext = c;
    b = mh(f2, g);
    b.payload = { element: a2 };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    a2 = nh(e2, b, g);
    null !== a2 && (gi(a2, e2, g, f2), oh(a2, e2, g));
    return g;
  }
  function gl(a2) {
    a2 = a2.current;
    if (!a2.child) return null;
    switch (a2.child.tag) {
      case 5:
        return a2.child.stateNode;
      default:
        return a2.child.stateNode;
    }
  }
  function hl(a2, b) {
    a2 = a2.memoizedState;
    if (null !== a2 && null !== a2.dehydrated) {
      var c = a2.retryLane;
      a2.retryLane = 0 !== c && c < b ? c : b;
    }
  }
  function il(a2, b) {
    hl(a2, b);
    (a2 = a2.alternate) && hl(a2, b);
  }
  function jl() {
    return null;
  }
  var kl = "function" === typeof reportError ? reportError : function(a2) {
    console.error(a2);
  };
  function ll(a2) {
    this._internalRoot = a2;
  }
  ml.prototype.render = ll.prototype.render = function(a2) {
    var b = this._internalRoot;
    if (null === b) throw Error(p(409));
    fl(a2, b, null, null);
  };
  ml.prototype.unmount = ll.prototype.unmount = function() {
    var a2 = this._internalRoot;
    if (null !== a2) {
      this._internalRoot = null;
      var b = a2.containerInfo;
      Rk(function() {
        fl(null, a2, null, null);
      });
      b[uf] = null;
    }
  };
  function ml(a2) {
    this._internalRoot = a2;
  }
  ml.prototype.unstable_scheduleHydration = function(a2) {
    if (a2) {
      var b = Hc();
      a2 = { blockedOn: null, target: a2, priority: b };
      for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
      Qc.splice(c, 0, a2);
      0 === c && Vc(a2);
    }
  };
  function nl(a2) {
    return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
  }
  function ol(a2) {
    return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
  }
  function pl() {
  }
  function ql(a2, b, c, d, e2) {
    if (e2) {
      if ("function" === typeof d) {
        var f2 = d;
        d = function() {
          var a3 = gl(g);
          f2.call(a3);
        };
      }
      var g = el(b, d, a2, 0, null, false, false, "", pl);
      a2._reactRootContainer = g;
      a2[uf] = g.current;
      sf(8 === a2.nodeType ? a2.parentNode : a2);
      Rk();
      return g;
    }
    for (; e2 = a2.lastChild; ) a2.removeChild(e2);
    if ("function" === typeof d) {
      var h = d;
      d = function() {
        var a3 = gl(k);
        h.call(a3);
      };
    }
    var k = bl(a2, 0, false, null, null, false, false, "", pl);
    a2._reactRootContainer = k;
    a2[uf] = k.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    Rk(function() {
      fl(b, k, c, d);
    });
    return k;
  }
  function rl(a2, b, c, d, e2) {
    var f2 = c._reactRootContainer;
    if (f2) {
      var g = f2;
      if ("function" === typeof e2) {
        var h = e2;
        e2 = function() {
          var a3 = gl(g);
          h.call(a3);
        };
      }
      fl(b, g, a2, e2);
    } else g = ql(c, b, a2, e2, d);
    return gl(g);
  }
  Ec = function(a2) {
    switch (a2.tag) {
      case 3:
        var b = a2.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c = tc(b.pendingLanes);
          0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
        }
        break;
      case 13:
        Rk(function() {
          var b2 = ih(a2, 1);
          if (null !== b2) {
            var c2 = R();
            gi(b2, a2, 1, c2);
          }
        }), il(a2, 1);
    }
  };
  Fc = function(a2) {
    if (13 === a2.tag) {
      var b = ih(a2, 134217728);
      if (null !== b) {
        var c = R();
        gi(b, a2, 134217728, c);
      }
      il(a2, 134217728);
    }
  };
  Gc = function(a2) {
    if (13 === a2.tag) {
      var b = yi(a2), c = ih(a2, b);
      if (null !== c) {
        var d = R();
        gi(c, a2, b, d);
      }
      il(a2, b);
    }
  };
  Hc = function() {
    return C;
  };
  Ic = function(a2, b) {
    var c = C;
    try {
      return C = a2, b();
    } finally {
      C = c;
    }
  };
  yb = function(a2, b, c) {
    switch (b) {
      case "input":
        bb(a2, c);
        b = c.name;
        if ("radio" === c.type && null != b) {
          for (c = a2; c.parentNode; ) c = c.parentNode;
          c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
          for (b = 0; b < c.length; b++) {
            var d = c[b];
            if (d !== a2 && d.form === a2.form) {
              var e2 = Db(d);
              if (!e2) throw Error(p(90));
              Wa(d);
              bb(d, e2);
            }
          }
        }
        break;
      case "textarea":
        ib(a2, c);
        break;
      case "select":
        b = c.value, null != b && fb(a2, !!c.multiple, b, false);
    }
  };
  Gb = Qk;
  Hb = Rk;
  var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
    a2 = Zb(a2);
    return null === a2 ? null : a2.stateNode;
  }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber) try {
      kc = vl.inject(ul), lc = vl;
    } catch (a2) {
    }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
  reactDom_production_min.createPortal = function(a2, b) {
    var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!nl(b)) throw Error(p(200));
    return cl(a2, b, null, c);
  };
  reactDom_production_min.createRoot = function(a2, b) {
    if (!nl(a2)) throw Error(p(299));
    var c = false, d = "", e2 = kl;
    null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e2 = b.onRecoverableError));
    b = bl(a2, 1, false, null, null, c, false, d, e2);
    a2[uf] = b.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    return new ll(b);
  };
  reactDom_production_min.findDOMNode = function(a2) {
    if (null == a2) return null;
    if (1 === a2.nodeType) return a2;
    var b = a2._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a2.render) throw Error(p(188));
      a2 = Object.keys(a2).join(",");
      throw Error(p(268, a2));
    }
    a2 = Zb(b);
    a2 = null === a2 ? null : a2.stateNode;
    return a2;
  };
  reactDom_production_min.flushSync = function(a2) {
    return Rk(a2);
  };
  reactDom_production_min.hydrate = function(a2, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a2, b, true, c);
  };
  reactDom_production_min.hydrateRoot = function(a2, b, c) {
    if (!nl(a2)) throw Error(p(405));
    var d = null != c && c.hydratedSources || null, e2 = false, f2 = "", g = kl;
    null !== c && void 0 !== c && (true === c.unstable_strictMode && (e2 = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
    b = el(b, null, a2, 1, null != c ? c : null, e2, false, f2, g);
    a2[uf] = b.current;
    sf(a2);
    if (d) for (a2 = 0; a2 < d.length; a2++) c = d[a2], e2 = c._getVersion, e2 = e2(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e2] : b.mutableSourceEagerHydrationData.push(
      c,
      e2
    );
    return new ml(b);
  };
  reactDom_production_min.render = function(a2, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a2, b, false, c);
  };
  reactDom_production_min.unmountComponentAtNode = function(a2) {
    if (!ol(a2)) throw Error(p(40));
    return a2._reactRootContainer ? (Rk(function() {
      rl(null, null, a2, false, function() {
        a2._reactRootContainer = null;
        a2[uf] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Qk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b, c, d) {
    if (!ol(c)) throw Error(p(200));
    if (null == a2 || void 0 === a2._reactInternals) throw Error(p(38));
    return rl(a2, b, c, false, d);
  };
  reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
  return reactDom_production_min;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = requireReactDom_production_min();
  }
  return reactDom.exports;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client;
  hasRequiredClient = 1;
  var m = requireReactDom();
  {
    client.createRoot = m.createRoot;
    client.hydrateRoot = m.hydrateRoot;
  }
  return client;
}
var clientExports = requireClient();
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(clientExports);
var reactExports = requireReact();
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    getRandomValues = crypto.getRandomValues.bind(crypto);
  }
  return getRandomValues(rnds8);
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = { randomUUID };
function v4(options, buf, offset) {
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random ?? options.rng?.() ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return unsafeStringify(rnds);
}
const DEFAULT_SETTINGS = {
  judgeFirstName: "",
  judgeLastName: "",
  position: "Окружной судья",
  storagePath: ""
};
let _dataPath = "";
let _storagePath = "";
async function getDataPath() {
  if (_dataPath) return _dataPath;
  _dataPath = await window.api.getDataPath();
  return _dataPath;
}
async function getStoragePath() {
  if (_storagePath) return _storagePath;
  const settings = await loadSettings();
  if (settings.storagePath) {
    _storagePath = settings.storagePath;
  } else {
    _storagePath = await getDataPath() + "/CourtAssistant";
  }
  return _storagePath;
}
function resetStorageCache() {
  _storagePath = "";
}
async function loadSettings() {
  const dataPath = await getDataPath();
  const raw = await window.api.readFile(dataPath + "/settings.json");
  if (!raw) return { ...DEFAULT_SETTINGS };
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}
async function saveSettings(settings) {
  const dataPath = await getDataPath();
  await window.api.writeFile(dataPath + "/settings.json", JSON.stringify(settings, null, 2));
  _storagePath = settings.storagePath || _storagePath;
}
async function loadCases() {
  const base = await getStoragePath();
  const casesDir = base + "/cases";
  const dirs = await window.api.readDir(casesDir);
  const cases = [];
  for (const dir of dirs) {
    const filePath = `${casesDir}/${dir}/case.json`;
    const raw = await window.api.readFile(filePath);
    if (raw) {
      try {
        cases.push(JSON.parse(raw));
      } catch {
      }
    }
  }
  return cases.sort((a2, b) => {
    if (a2.isPinned && !b.isPinned) return -1;
    if (!a2.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a2.updatedAt).getTime();
  });
}
async function saveCase(c) {
  const base = await getStoragePath();
  const filePath = `${base}/cases/${c.id}/case.json`;
  await window.api.writeFile(filePath, JSON.stringify(c, null, 2));
}
async function deleteCase(id) {
  const base = await getStoragePath();
  await window.api.deleteDir(`${base}/cases/${id}`);
}
async function archiveCase(c) {
  const base = await getStoragePath();
  const archivePath = `${base}/archive/${c.id}`;
  await window.api.mkdir(archivePath);
  await window.api.writeFile(archivePath + "/case.json", JSON.stringify(c, null, 2));
}
async function saveStamp(srcPath) {
  return window.api.readBinary(srcPath);
}
function formatDateForTimeline(date) {
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}
const AppContext = reactExports.createContext(null);
const useApp = () => reactExports.useContext(AppContext);
function defaultSettings() {
  return { judgeFirstName: "", judgeLastName: "", position: "Окружной судья", storagePath: "" };
}
function AppProvider({ children }) {
  const [cases, setCases] = reactExports.useState([]);
  const [settings, setSettings] = reactExports.useState(defaultSettings());
  const [loading, setLoading] = reactExports.useState(true);
  const [view, setView] = reactExports.useState({ type: "active-cases" });
  const caseNumberRef = reactExports.useRef(1);
  reactExports.useEffect(() => {
    (async () => {
      const s = await loadSettings();
      setSettings(s);
      if (!s.storagePath) {
        const dataPath = await window.api.getDataPath();
        const defaultPath = dataPath + "/CourtAssistant";
        await window.api.mkdir(defaultPath);
        const updated = { ...s, storagePath: defaultPath };
        setSettings(updated);
        await saveSettings(updated);
      }
      const loaded = await loadCases();
      setCases(loaded);
      const nums = loaded.map((c) => parseInt(c.caseNumber.replace(/\D/g, "")) || 0);
      caseNumberRef.current = nums.length > 0 ? Math.max(...nums) + 1 : 1e3;
      setLoading(false);
    })();
  }, []);
  const openCase = reactExports.useCallback((id, tab) => {
    setView({ type: "case-workspace", caseId: id, tab });
  }, []);
  const nextCaseNumber = reactExports.useCallback(() => {
    return String(caseNumberRef.current++);
  }, []);
  const persistCase = reactExports.useCallback(async (c) => {
    await saveCase(c);
  }, []);
  const createCase = reactExports.useCallback(async (data) => {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newCase = {
      id: v4(),
      status: "active",
      isPinned: false,
      documents: [],
      materials: [],
      participants: [
        { id: v4(), role: "plaintiff", firstName: data.plaintiff.split(" ")[0] || "", lastName: data.plaintiff.split(" ").slice(1).join(" ") || "" },
        { id: v4(), role: "defendant", firstName: data.defendant.split(" ")[0] || "", lastName: data.defendant.split(" ").slice(1).join(" ") || "" },
        { id: v4(), role: "judge", firstName: settings.judgeFirstName, lastName: settings.judgeLastName, position: settings.position }
      ],
      notes: [],
      timeline: [{
        id: v4(),
        date: formatDateForTimeline(/* @__PURE__ */ new Date()),
        event: "Дело создано",
        type: "created"
      }],
      createdAt: now,
      updatedAt: now,
      ...data
    };
    if (data.prosecutor) {
      newCase.participants.push({ id: v4(), role: "prosecutor", firstName: data.prosecutor.split(" ")[0] || "", lastName: data.prosecutor.split(" ").slice(1).join(" ") || "" });
    }
    if (data.lawyer) {
      newCase.participants.push({ id: v4(), role: "lawyer", firstName: data.lawyer.split(" ")[0] || "", lastName: data.lawyer.split(" ").slice(1).join(" ") || "" });
    }
    await persistCase(newCase);
    setCases((prev) => [newCase, ...prev]);
    return newCase;
  }, [settings, persistCase]);
  const updateCase = reactExports.useCallback(async (id, patch) => {
    setCases((prev) => prev.map((c) => {
      if (c.id !== id) return c;
      const updated = { ...c, ...patch, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      persistCase(updated);
      return updated;
    }));
  }, [persistCase]);
  const deleteCase$1 = reactExports.useCallback(async (id) => {
    await deleteCase(id);
    setCases((prev) => prev.filter((c) => c.id !== id));
    setView((prev) => prev.type === "active-cases" ? prev : { type: "active-cases" });
  }, []);
  const closeCase = reactExports.useCallback(async (id) => {
    setCases((prev) => prev.map((c) => {
      if (c.id !== id) return c;
      const updated = {
        ...c,
        status: "closed",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        timeline: [...c.timeline, {
          id: v4(),
          date: formatDateForTimeline(/* @__PURE__ */ new Date()),
          event: "Дело закрыто",
          type: "closed"
        }]
      };
      persistCase(updated);
      archiveCase(updated);
      return updated;
    }));
    setView({ type: "active-cases" });
  }, [persistCase]);
  const pinCase = reactExports.useCallback(async (id) => {
    setCases((prev) => prev.map((c) => {
      if (c.id !== id) return c;
      const updated = { ...c, isPinned: !c.isPinned, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      persistCase(updated);
      return updated;
    }));
  }, [persistCase]);
  const duplicateCase = reactExports.useCallback(async (id) => {
    const original = cases.find((c) => c.id === id);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const dup = {
      ...original,
      id: v4(),
      caseNumber: nextCaseNumber(),
      title: original.title + " (копия)",
      status: "active",
      isPinned: false,
      createdAt: now,
      updatedAt: now,
      timeline: [{ id: v4(), date: formatDateForTimeline(/* @__PURE__ */ new Date()), event: "Дело создано (дублирование)", type: "created" }]
    };
    await persistCase(dup);
    setCases((prev) => [dup, ...prev]);
    return dup;
  }, [cases, nextCaseNumber, persistCase]);
  const updateSettings = reactExports.useCallback(async (patch) => {
    const updated = { ...settings, ...patch };
    setSettings(updated);
    if (patch.storagePath && patch.storagePath !== settings.storagePath) {
      resetStorageCache();
      await window.api.mkdir(patch.storagePath);
    }
    await saveSettings(updated);
  }, [settings]);
  const addTimelineEvent = reactExports.useCallback(async (caseId, event) => {
    const ev = { id: v4(), date: formatDateForTimeline(/* @__PURE__ */ new Date()), ...event };
    await updateCase(caseId, {
      timeline: [...cases.find((c) => c.id === caseId)?.timeline || [], ev]
    });
  }, [cases, updateCase]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppContext.Provider, { value: {
    cases,
    settings,
    loading,
    view,
    setView,
    openCase,
    createCase,
    updateCase,
    deleteCase: deleteCase$1,
    closeCase,
    pinCase,
    duplicateCase,
    updateSettings,
    nextCaseNumber,
    addTimelineEvent
  }, children });
}
const NAV = [
  { icon: "⚖️", label: "Иски в работе", view: { type: "active-cases" }, section: "active-cases" },
  { icon: "✅", label: "Закрытые иски", view: { type: "closed-cases" }, section: "closed-cases" },
  { icon: "📄", label: "Шаблоны документов", view: { type: "templates" }, section: "templates" },
  { icon: "📂", label: "Дополнительные шаблоны", view: { type: "additional-templates" }, section: "additional-templates" },
  { icon: "⚙️", label: "Настройки", view: { type: "settings" }, section: "settings" }
];
function Sidebar() {
  const { view, setView, cases } = useApp();
  const currentSection = view.type === "case-workspace" || view.type === "document-editor" ? "active-cases" : view.type === "template-editor" ? view.from ?? "templates" : view.type;
  const activeCount = cases.filter((c) => c.status === "active").length;
  const closedCount = cases.filter((c) => c.status === "closed").length;
  const badges = {
    "active-cases": activeCount,
    "closed-cases": closedCount
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "sidebar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sidebar-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.05em", textTransform: "uppercase" }, children: "Навигация" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sidebar-nav", children: NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `sidebar-nav-item ${currentSection === item.section ? "active" : ""}`,
        onClick: () => setView(item.view),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-icon", children: item.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1 }, children: item.label }),
          badges[item.section] !== void 0 && badges[item.section] > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-badge", children: badges[item.section] })
        ]
      },
      item.section
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-footer", children: [
      "Разработано Prince Cursed",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "по всем вопросам ds: saint.prince"
    ] })
  ] });
}
function RightPanel() {
  const { view, cases, settings } = useApp();
  const renderContent = () => {
    if (view.type === "case-workspace") {
      const c = cases.find((x) => x.id === view.caseId);
      if (!c) return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyPanel, {});
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Номер дела" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field-value", style: { color: "var(--text-accent)", fontWeight: 600 }, children: [
            "№",
            c.caseNumber
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Истец" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", children: c.plaintiff })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Ответчик" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", children: c.defendant })
        ] }),
        c.prosecutor && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Прокурор" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", children: c.prosecutor })
        ] }),
        c.lawyer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Адвокат" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", children: c.lawyer })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Статус" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `case-status ${c.status}`, children: c.status === "active" ? "● В работе" : "● Закрыто" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Документов" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", children: c.documents.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Материалов" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", children: c.materials.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Дата создания" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", style: { fontSize: 12 }, children: new Date(c.createdAt).toLocaleDateString("ru-RU") })
        ] }),
        c.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Описание" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", style: { fontSize: 12, color: "var(--text-2)", lineHeight: 1.5 }, children: c.description })
        ] })
      ] });
    }
    if (view.type === "active-cases" || view.type === "closed-cases") {
      const filtered = cases.filter(
        (c) => view.type === "active-cases" ? c.status === "active" : c.status === "closed"
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Всего дел" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", style: { fontSize: 22, fontWeight: 700, color: "var(--text-accent)" }, children: filtered.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Судья" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", children: settings.judgeFirstName || settings.judgeLastName ? `${settings.judgeFirstName} ${settings.judgeLastName}`.trim() : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-3)" }, children: "Не указано" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Должность" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", children: settings.position })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Дата" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", style: { fontSize: 12 }, children: (/* @__PURE__ */ new Date()).toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) })
        ] }),
        filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Последнее обновление" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", style: { fontSize: 12 }, children: filtered[0].title })
        ] })
      ] });
    }
    if (view.type === "settings") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Профиль" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", children: settings.judgeFirstName || settings.judgeLastName ? `${settings.judgeFirstName} ${settings.judgeLastName}`.trim() : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-3)" }, children: "Не настроено" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Должность" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-value", children: settings.position })
        ] }),
        settings.stampBase64 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-field-label", children: "Печать" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: settings.stampBase64, alt: "Печать", className: "stamp-preview" })
        ] })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyPanel, {});
  };
  const title = view.type === "case-workspace" ? "Детали дела" : view.type === "settings" ? "Профиль судьи" : "Контекст";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "right-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "right-panel-header", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "right-panel-body", children: renderContent() })
  ] });
}
function EmptyPanel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "var(--text-3)", fontSize: 12, textAlign: "center", paddingTop: 24 }, children: "Выберите дело или раздел" });
}
function Layout({ children }) {
  const { view } = useApp();
  const isEditor = view.type === "document-editor";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Titlebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "main-area", children }),
      !isEditor && /* @__PURE__ */ jsxRuntimeExports.jsx(RightPanel, {})
    ] })
  ] });
}
function Titlebar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "titlebar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "titlebar-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "titlebar-logo", children: "⚖" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "titlebar-title", children: "Court Assistant" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "titlebar-controls", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "titlebar-btn", onClick: () => window.api.minimizeWindow(), title: "Свернуть", children: "−" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "titlebar-btn", onClick: () => window.api.maximizeWindow(), title: "Развернуть", children: "□" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "titlebar-btn close", onClick: () => window.api.closeWindow(), title: "Закрыть", children: "✕" })
    ] })
  ] });
}
function CaseCard({ case_: c, onOpen, onEdit }) {
  const { pinCase, deleteCase: deleteCase2, closeCase, duplicateCase, setView } = useApp();
  const [menu, setMenu] = reactExports.useState(false);
  const [menuPos, setMenuPos] = reactExports.useState({ x: 0, y: 0 });
  const menuRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!menu) return;
    const close = (e2) => {
      if (menuRef.current && !menuRef.current.contains(e2.target)) setMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menu]);
  const openMenu = (e2) => {
    e2.stopPropagation();
    const rect = e2.currentTarget.getBoundingClientRect();
    setMenuPos({ x: rect.right, y: rect.bottom + 4 });
    setMenu(true);
  };
  const fmt = (iso) => new Date(iso).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `card case-card ${c.isPinned ? "pinned" : ""}`, onClick: onOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-number", children: [
          c.isPinned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "case-pin-icon", style: { marginRight: 5 }, children: "📌" }),
          "№",
          c.caseNumber
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-title", children: c.title || `${c.plaintiff} vs ${c.defendant}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-vs", children: [
          c.plaintiff,
          " · ",
          c.defendant
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "case-actions", onClick: (e2) => e2.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-icon btn-ghost", onClick: openMenu, title: "Действия", children: "⋯" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "case-meta", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `case-status ${c.status}`, children: c.status === "active" ? "● В работе" : "● Закрыто" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "case-meta-item", children: [
        "📅 ",
        fmt(c.createdAt)
      ] }),
      c.documents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "case-meta-item", children: [
        "📋 ",
        c.documents.length
      ] }),
      c.materials.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "case-meta-item", children: [
        "📎 ",
        c.materials.length
      ] })
    ] }),
    menu && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: menuRef,
        className: "ctx-menu",
        style: { top: menuPos.y, left: menuPos.x - 190, position: "fixed" },
        onClick: (e2) => e2.stopPropagation(),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ctx-item", onClick: () => {
            onOpen();
            setMenu(false);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔍" }),
            " Открыть"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ctx-item", onClick: () => {
            pinCase(c.id);
            setMenu(false);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📌" }),
            " ",
            c.isPinned ? "Открепить" : "Закрепить"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ctx-item", onClick: () => {
            onEdit();
            setMenu(false);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✏️" }),
            " Редактировать"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ctx-item", onClick: async () => {
            const d = await duplicateCase(c.id);
            setView({ type: "case-workspace", caseId: d.id });
            setMenu(false);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📋" }),
            " Дублировать"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ctx-divider" }),
          c.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ctx-item", onClick: () => {
            closeCase(c.id);
            setMenu(false);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✅" }),
            " Закрыть дело"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ctx-item danger", onClick: () => {
            if (window.confirm(`Удалить дело №${c.caseNumber}?`)) {
              deleteCase2(c.id);
              setMenu(false);
            }
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🗑️" }),
            " Удалить"
          ] })
        ]
      }
    )
  ] });
}
function Modal({ title, onClose, children, footer, width = 520 }) {
  reactExports.useEffect(() => {
    const onKey = (e2) => {
      if (e2.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: (e2) => {
    if (e2.target === e2.currentTarget) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal", style: { width: `min(${width}px, calc(100vw - 48px))` }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "modal-title", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-icon btn-ghost modal-close", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-body", children }),
    footer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-footer", children: footer })
  ] }) });
}
function ActiveCases() {
  const { cases, createCase, updateCase, setView, openCase, nextCaseNumber } = useApp();
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [editCase, setEditCase] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [form, setForm] = reactExports.useState({
    caseNumber: "",
    title: "",
    plaintiff: "",
    defendant: "",
    prosecutor: "",
    lawyer: "",
    description: ""
  });
  const active = cases.filter((c) => c.status === "active").filter((c) => !search || [c.caseNumber, c.title, c.plaintiff, c.defendant].some((f2) => f2.toLowerCase().includes(search.toLowerCase())));
  reactExports.useEffect(() => {
    const handler = () => openNewCase();
    document.addEventListener("new-case", handler);
    return () => document.removeEventListener("new-case", handler);
  }, []);
  const openNewCase = () => {
    setForm({ caseNumber: nextCaseNumber(), title: "", plaintiff: "", defendant: "", prosecutor: "", lawyer: "", description: "" });
    setShowCreate(true);
  };
  const openEdit = (c) => {
    setForm({
      caseNumber: c.caseNumber,
      title: c.title,
      plaintiff: c.plaintiff,
      defendant: c.defendant,
      prosecutor: c.prosecutor || "",
      lawyer: c.lawyer || "",
      description: c.description || ""
    });
    setEditCase(c);
  };
  const handleCreate = async () => {
    if (!form.plaintiff.trim() || !form.defendant.trim()) return;
    const c = await createCase({
      caseNumber: form.caseNumber || nextCaseNumber(),
      title: form.title || `${form.plaintiff} vs ${form.defendant}`,
      plaintiff: form.plaintiff,
      defendant: form.defendant,
      prosecutor: form.prosecutor || void 0,
      lawyer: form.lawyer || void 0,
      description: form.description || void 0
    });
    setShowCreate(false);
    openCase(c.id);
  };
  const handleEdit = async () => {
    if (!editCase) return;
    await updateCase(editCase.id, {
      caseNumber: form.caseNumber,
      title: form.title || `${form.plaintiff} vs ${form.defendant}`,
      plaintiff: form.plaintiff,
      defendant: form.defendant,
      prosecutor: form.prosecutor || void 0,
      lawyer: form.lawyer || void 0,
      description: form.description || void 0
    });
    setEditCase(null);
  };
  const ff = (key) => (e2) => setForm((p) => ({ ...p, [key]: e2.target.value }));
  const formContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row form-row-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Номер дела" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.caseNumber, onChange: ff("caseNumber"), placeholder: "Автоматически" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Название дела (необязательно)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.title, onChange: ff("title"), placeholder: "Авто: Истец vs Ответчик" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row form-row-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Истец *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.plaintiff, onChange: ff("plaintiff"), placeholder: "Имя истца" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Ответчик *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.defendant, onChange: ff("defendant"), placeholder: "Имя ответчика" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row form-row-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Прокурор" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.prosecutor, onChange: ff("prosecutor"), placeholder: "Необязательно" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Адвокат" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.lawyer, onChange: ff("lawyer"), placeholder: "Необязательно" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Краткое описание" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "textarea", value: form.description, onChange: ff("description"), placeholder: "Описание дела...", rows: 3 })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-title", children: "⚖️ Иски в работе" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-subtitle", children: [
          active.length,
          " ",
          active.length === 1 ? "дело" : "дел"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            style: { width: 220 },
            placeholder: "🔍  Поиск дел...",
            value: search,
            onChange: (e2) => setSearch(e2.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: openNewCase, children: "+ Новый иск" })
      ] })
    ] }),
    active.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: "⚖️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-text", children: search ? "Ничего не найдено" : "Нет активных дел" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-sub", children: !search && "Нажмите «+ Новый иск» или Ctrl+N" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cases-grid", children: active.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CaseCard, { case_: c, onOpen: () => openCase(c.id), onEdit: () => openEdit(c) }, c.id)) }),
    showCreate && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        title: "Новый иск",
        onClose: () => setShowCreate(false),
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setShowCreate(false), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: handleCreate, children: "Создать дело" })
        ] }),
        children: formContent
      }
    ),
    editCase && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        title: `Редактировать №${editCase.caseNumber}`,
        onClose: () => setEditCase(null),
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setEditCase(null), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: handleEdit, children: "Сохранить" })
        ] }),
        children: formContent
      }
    )
  ] });
}
function ClosedCases() {
  const { cases, openCase } = useApp();
  const [search, setSearch] = reactExports.useState("");
  const closed = cases.filter((c) => c.status === "closed").filter((c) => !search || [c.caseNumber, c.title, c.plaintiff, c.defendant].some((f2) => f2.toLowerCase().includes(search.toLowerCase())));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-title", children: "✅ Закрытые иски" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-subtitle", children: [
          closed.length,
          " закрытых дел"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          style: { width: 220 },
          placeholder: "🔍  Поиск...",
          value: search,
          onChange: (e2) => setSearch(e2.target.value)
        }
      )
    ] }),
    closed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: "✅" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-text", children: search ? "Ничего не найдено" : "Закрытых дел нет" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-sub", children: !search && "Закрытые дела появятся здесь" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cases-grid", children: closed.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CaseCard, { case_: c, onOpen: () => openCase(c.id), onEdit: () => {
    } }, c.id)) })
  ] });
}
const DOCUMENT_TYPE_LABELS = {
  rejection: "Об отказе в принятии искового заявления",
  "no-move-reasons": "Об оставлении заявления без движения (по основаниям)",
  "no-move-fee": "Об оставлении заявления без движения (по госпошлине)",
  return: "О возвращении искового заявления",
  accept: "О принятии искового заявления к производству",
  "accept-prosecutor": "О принятии заявления к производству (с прокурором)",
  schedule: "О назначении дела к судебному разбирательству",
  decision: "Финальное решение",
  motivation: "Мотивировочная часть решения",
  order: "Определение",
  "hearing-notes": "Заметки заседания",
  "counter-claim": "О принятии встречного искового заявления к производству",
  "expand-participants": "О расширении круга лиц, участвующих в деле",
  "state-lawyer": "О предоставлении государственного адвоката",
  "jurisdiction-transfer": "О передаче дела по подсудности",
  recusal: "Об отводе лица, участвующего в деле",
  "correct-typo": "Об исправлении описки",
  collegial: "О коллегиальном рассмотрении дела",
  consolidate: "Об объединении дел в одно производство",
  terminate: "О прекращении производства по делу",
  petition: "О рассмотрении ходатайства"
};
const DOCUMENT_TYPE_GROUPS = [
  {
    label: "Исковые определения",
    types: ["rejection", "no-move-reasons", "no-move-fee", "return", "accept", "accept-prosecutor"]
  },
  {
    label: "Судебный процесс",
    types: ["schedule", "hearing-notes"]
  },
  {
    label: "Итоговые акты",
    types: ["decision", "motivation", "order"]
  }
];
const ADDITIONAL_TEMPLATE_CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "production", label: "Производство" },
  { id: "petitions", label: "Ходатайства" },
  { id: "participants", label: "Участники дела" },
  { id: "jurisdiction", label: "Подсудность" },
  { id: "corrections", label: "Исправления" },
  { id: "org", label: "Организационные" }
];
const ADDITIONAL_TEMPLATE_CATEGORY = {
  "counter-claim": "production",
  "consolidate": "production",
  "terminate": "production",
  "petition": "petitions",
  "expand-participants": "participants",
  "state-lawyer": "participants",
  "jurisdiction-transfer": "jurisdiction",
  "correct-typo": "corrections",
  "collegial": "org",
  "recusal": "org"
};
const ADDITIONAL_TEMPLATE_TYPES = [
  "counter-claim",
  "expand-participants",
  "state-lawyer",
  "jurisdiction-transfer",
  "recusal",
  "correct-typo",
  "collegial",
  "consolidate",
  "terminate",
  "petition"
];
const PARTICIPANT_ROLE_LABELS = {
  plaintiff: "Истец",
  defendant: "Ответчик",
  prosecutor: "Прокурор",
  lawyer: "Адвокат",
  judge: "Судья"
};
const TYPE_ICONS$2 = {
  rejection: "🚫",
  "no-move-reasons": "⏸️",
  "no-move-fee": "💰",
  return: "↩️",
  accept: "✅",
  "accept-prosecutor": "👮",
  schedule: "📅",
  decision: "⚖️",
  motivation: "📝",
  order: "📋",
  "hearing-notes": "🗒️"
};
const TYPE_DESC$1 = {
  rejection: "Отказ в принятии искового заявления",
  "no-move-reasons": "Оставление без движения по нарушениям",
  "no-move-fee": "Оставление без движения по госпошлине",
  return: "Возврат искового заявления заявителю",
  accept: "Принятие к производству",
  "accept-prosecutor": "Принятие к производству с прокурором",
  schedule: "Назначение дела к разбирательству",
  decision: "Финальное решение суда",
  motivation: "Мотивировочная часть решения",
  order: "Ордер суда",
  "hearing-notes": "Рабочие заметки заседания"
};
function Templates() {
  const { settings, setView } = useApp();
  const [savedTypes, setSavedTypes] = reactExports.useState(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    if (!settings.storagePath) return;
    (async () => {
      const all = DOCUMENT_TYPE_GROUPS.flatMap((g) => g.types);
      const exists = [];
      for (const type of all) {
        const has = await window.api.fileExists(`${settings.storagePath}/templates/${type}.html`);
        if (has) exists.push(type);
      }
      setSavedTypes(new Set(exists));
    })();
  }, [settings.storagePath]);
  const openTemplate = (type) => {
    setView({ type: "template-editor", docType: type });
  };
  const resetTemplate = async (type, e2) => {
    e2.stopPropagation();
    if (!window.confirm("Сбросить шаблон к стандартному?")) return;
    await window.api.deleteFile(`${settings.storagePath}/templates/${type}.html`);
    setSavedTypes((prev) => {
      const n = new Set(prev);
      n.delete(type);
      return n;
    });
  };
  const totalTypes = DOCUMENT_TYPE_GROUPS.flatMap((g) => g.types).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-title", children: "📄 Шаблоны документов" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-subtitle", children: "Нажмите на шаблон, чтобы открыть редактор" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "var(--green)", display: "inline-block" } }),
        savedTypes.size,
        " из ",
        totalTypes,
        " настроены"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, overflow: "auto", padding: "20px 28px" }, children: [
      DOCUMENT_TYPE_GROUPS.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 28 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }, children: group.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: group.types.map((type) => {
          const isCustom = savedTypes.has(type);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card",
              style: {
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                transition: "all var(--t-base)",
                border: isCustom ? "1px solid rgba(99,102,241,0.35)" : "1px solid var(--border-1)"
              },
              onClick: () => openTemplate(type),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  width: 40,
                  height: 40,
                  borderRadius: "var(--r-md)",
                  background: isCustom ? "var(--accent-dim)" : "var(--bg-overlay)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                  border: isCustom ? "1px solid var(--border-accent)" : "1px solid var(--border-1)"
                }, children: TYPE_ICONS$2[type] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, fontWeight: 500, color: "var(--text-1)", marginBottom: 2 }, children: DOCUMENT_TYPE_LABELS[type] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-3)" }, children: TYPE_DESC$1[type] || "Судебный документ" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }, children: [
                  isCustom ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, padding: "2px 8px", background: "var(--accent-dim)", color: "var(--text-accent)", border: "1px solid var(--border-accent)", borderRadius: "var(--r-f)" }, children: "✏️ Настроен" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        className: "btn btn-ghost btn-icon",
                        title: "Сбросить шаблон",
                        style: { fontSize: 12, color: "var(--red)" },
                        onClick: (e2) => resetTemplate(type, e2),
                        children: "↺"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, padding: "2px 8px", background: "var(--bg-overlay)", color: "var(--text-3)", border: "1px solid var(--border-1)", borderRadius: "var(--r-f)" }, children: "Стандартный" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 14, color: "var(--text-3)" }, children: "›" })
                ] })
              ]
            },
            type
          );
        }) })
      ] }, group.label)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 8, padding: "16px 20px", background: "var(--bg-elevated)", border: "1px solid var(--border-1)", borderRadius: "var(--r-lg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, fontWeight: 500, color: "var(--text-1)", marginBottom: 6 }, children: "💡 Как работают шаблоны" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, color: "var(--text-2)", lineHeight: 1.6 }, children: [
          "Кликните на шаблон — откроется редактор. Отредактируйте и сохраните (Ctrl+S). При создании документа в деле используется ваша версия шаблона. Переменные ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { fontSize: 11, background: "var(--bg-overlay)", padding: "0 4px", borderRadius: 4, color: "var(--text-accent)" }, children: "[ИСТЕЦ]" }),
          " и другие заменяются данными дела автоматически."
        ] })
      ] })
    ] })
  ] });
}
const TYPE_ICONS$1 = {
  "counter-claim": "🔄",
  "expand-participants": "👥",
  "state-lawyer": "🧑‍⚖️",
  "jurisdiction-transfer": "🏛️",
  recusal: "🚷",
  "correct-typo": "✏️",
  collegial: "👨‍👩‍👧",
  consolidate: "🗂️",
  terminate: "🛑",
  petition: "📨"
};
const TYPE_DESC = {
  "counter-claim": "Принятие встречных исковых требований ответчика",
  "expand-participants": "Привлечение новых лиц к участию в деле",
  "state-lawyer": "Назначение государственного защитника",
  "jurisdiction-transfer": "Передача дела в Верховный суд",
  recusal: "Отвод участника процесса",
  "correct-typo": "Исправление технической ошибки в акте",
  collegial: "Назначение коллегии судей для рассмотрения",
  consolidate: "Объединение нескольких дел в одно производство",
  terminate: "Прекращение производства по делу",
  petition: "Рассмотрение ходатайства адвоката или стороны"
};
function AdditionalTemplates() {
  const { settings, setView } = useApp();
  const [savedTypes, setSavedTypes] = reactExports.useState(/* @__PURE__ */ new Set());
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  reactExports.useEffect(() => {
    if (!settings.storagePath) return;
    (async () => {
      const exists = [];
      for (const type of ADDITIONAL_TEMPLATE_TYPES) {
        const has = await window.api.fileExists(`${settings.storagePath}/templates/${type}.html`);
        if (has) exists.push(type);
      }
      setSavedTypes(new Set(exists));
    })();
  }, [settings.storagePath]);
  const openTemplate = (type) => {
    setView({ type: "template-editor", docType: type, from: "additional-templates" });
  };
  const resetTemplate = async (type, e2) => {
    e2.stopPropagation();
    if (!window.confirm("Сбросить шаблон к стандартному?")) return;
    await window.api.deleteFile(`${settings.storagePath}/templates/${type}.html`);
    setSavedTypes((prev) => {
      const n = new Set(prev);
      n.delete(type);
      return n;
    });
  };
  const q = search.toLowerCase().trim();
  const filtered = ADDITIONAL_TEMPLATE_TYPES.filter((type) => {
    const matchCat = activeCategory === "all" || ADDITIONAL_TEMPLATE_CATEGORY[type] === activeCategory;
    if (!matchCat) return false;
    if (!q) return true;
    const label = DOCUMENT_TYPE_LABELS[type].toLowerCase();
    const desc = (TYPE_DESC[type] || "").toLowerCase();
    const cat = ADDITIONAL_TEMPLATE_CATEGORY[type] || "";
    return label.includes(q) || desc.includes(q) || cat.includes(q);
  });
  const savedCount = ADDITIONAL_TEMPLATE_TYPES.filter((t) => savedTypes.has(t)).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-title", children: "📂 Дополнительные шаблоны" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-subtitle", children: "Процессуальные и организационные определения" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "var(--green)", display: "inline-block" } }),
        savedCount,
        " из ",
        ADDITIONAL_TEMPLATE_TYPES.length,
        " настроены"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 28px", borderBottom: "1px solid var(--border-0)", flexShrink: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          placeholder: "Поиск по названию, категории или содержимому...",
          value: search,
          onChange: (e2) => setSearch(e2.target.value),
          style: { marginBottom: 10 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" }, children: ADDITIONAL_TEMPLATE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setActiveCategory(cat.id),
          style: {
            padding: "4px 12px",
            borderRadius: "var(--r-f)",
            border: "1px solid",
            fontSize: 11,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--font)",
            background: activeCategory === cat.id ? "var(--accent)" : "var(--bg-elevated)",
            color: activeCategory === cat.id ? "#fff" : "var(--text-2)",
            borderColor: activeCategory === cat.id ? "var(--accent)" : "var(--border-1)",
            transition: "all var(--t-fast)"
          },
          children: cat.label
        },
        cat.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, overflow: "auto", padding: "20px 28px" }, children: [
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: "🔍" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-text", children: "Шаблоны не найдены" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-sub", children: "Попробуйте изменить запрос или категорию" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: filtered.map((type) => {
        const isCustom = savedTypes.has(type);
        const catId = ADDITIONAL_TEMPLATE_CATEGORY[type];
        const catLabel = ADDITIONAL_TEMPLATE_CATEGORIES.find((c) => c.id === catId)?.label || "";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card",
            style: {
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
              transition: "all var(--t-base)",
              border: isCustom ? "1px solid rgba(99,102,241,0.35)" : "1px solid var(--border-1)"
            },
            onClick: () => openTemplate(type),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                width: 40,
                height: 40,
                borderRadius: "var(--r-md)",
                background: isCustom ? "var(--accent-dim)" : "var(--bg-overlay)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
                border: isCustom ? "1px solid var(--border-accent)" : "1px solid var(--border-1)"
              }, children: TYPE_ICONS$1[type] || "📄" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, fontWeight: 500, color: "var(--text-1)", marginBottom: 2 }, children: DOCUMENT_TYPE_LABELS[type] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 8 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: TYPE_DESC[type] || "Судебный документ" }),
                  catLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    padding: "1px 6px",
                    borderRadius: "var(--r-f)",
                    fontSize: 10,
                    background: "var(--bg-overlay)",
                    border: "1px solid var(--border-1)",
                    color: "var(--text-3)"
                  }, children: catLabel })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }, children: [
                isCustom ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontSize: 10,
                    padding: "2px 8px",
                    background: "var(--accent-dim)",
                    color: "var(--text-accent)",
                    border: "1px solid var(--border-accent)",
                    borderRadius: "var(--r-f)"
                  }, children: "✏️ Настроен" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "btn btn-ghost btn-icon",
                      title: "Сбросить шаблон",
                      style: { fontSize: 12, color: "var(--red)" },
                      onClick: (e2) => resetTemplate(type, e2),
                      children: "↺"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                  fontSize: 10,
                  padding: "2px 8px",
                  background: "var(--bg-overlay)",
                  color: "var(--text-3)",
                  border: "1px solid var(--border-1)",
                  borderRadius: "var(--r-f)"
                }, children: "Стандартный" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 14, color: "var(--text-3)" }, children: "›" })
              ] })
            ]
          },
          type
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 20, padding: "16px 20px", background: "var(--bg-elevated)", border: "1px solid var(--border-1)", borderRadius: "var(--r-lg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, fontWeight: 500, color: "var(--text-1)", marginBottom: 6 }, children: "💡 Как работают дополнительные шаблоны" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "var(--text-2)", lineHeight: 1.6 }, children: "Дополнительные шаблоны работают так же, как основные: открываются в редакторе, поддерживают плейсхолдеры с автозаполнением, экспорт в PDF и предпросмотр A4. При создании документа в деле они доступны в том же меню выбора типа." })
      ] })
    ] })
  ] });
}
function today() {
  return (/* @__PURE__ */ new Date()).toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
}
function judgeFullName$1(s) {
  return `${s.judgeFirstName} ${s.judgeLastName}`.trim() || "Судья";
}
function ph(text, type) {
  const typeAttr = type ? ` data-ph-type="${type}"` : "";
  return `<mark class="doc-placeholder"${typeAttr} data-ph-key="${text}">[${text}]</mark>`;
}
function preamblePlaintiff(c) {
  const list = c.participants.filter((p) => p.role === "plaintiff");
  if (list.length === 0) return c.plaintiff || ph("Имя Фамилия истца", "person");
  if (list.length === 1) return `${list[0].firstName} ${list[0].lastName}`;
  return list.map((p) => `${p.firstName} ${p.lastName}`).join(", ");
}
function preambleDefendants(c) {
  const list = c.participants.filter((p) => p.role === "defendant");
  if (list.length === 0) {
    if (c.defendant) {
      return `против ${c.defendant} (далее - ответчик №1)`;
    }
    return `против сотрудника ${ph("Гос. структура", "gov-org")} ${ph("Имя Фамилия/Жетон", "person")} (далее - ответчик №1)`;
  }
  return "против " + list.map((p, i) => {
    const org = p.position || ph("Гос. структура", "gov-org");
    const name = `${p.firstName} ${p.lastName}${p.documentId ? `/${p.documentId}` : ""}`;
    return `сотрудника ${org} ${name} (далее - ответчик №${i + 1})`;
  }).join(", ");
}
function defendantAuditBlocks(c) {
  const list = c.participants.filter((p) => p.role === "defendant");
  function oneBlock(org, idx) {
    return `<p><strong>${org}:</strong></p>
<p>В отношении ответчика №${idx}:</p>
<ul>
<li>кадровый аудит сотрудника;</li>
<li>подтверждение соответствия жетона и кадрового аудита;</li>
<li>подтверждение уведомления сотрудника;</li>
<li>Обязать сотрудника предоставить видеофиксацию процессуальных действий в отношении истца от ${ph("день.месяц.год", "date")}.</li>
</ul>`;
  }
  if (list.length === 0) {
    return oneBlock(ph("Гос. структура", "gov-org"), 1) + "\n" + oneBlock(ph("Гос. структура", "gov-org"), 2);
  }
  const byOrg = /* @__PURE__ */ new Map();
  list.forEach((p, i) => {
    const org = p.position || ph("Гос. структура", "gov-org");
    if (!byOrg.has(org)) byOrg.set(org, []);
    byOrg.get(org).push({ p, idx: i + 1 });
  });
  const parts = [];
  for (const [org, entries] of byOrg) {
    parts.push(`<p><strong>${org}:</strong></p>`);
    for (const { idx } of entries) {
      parts.push(`<p>В отношении ответчика №${idx}:</p>
<ul>
<li>кадровый аудит сотрудника;</li>
<li>подтверждение соответствия жетона и кадрового аудита;</li>
<li>подтверждение уведомления сотрудника;</li>
<li>Обязать сотрудника предоставить видеофиксацию процессуальных действий в отношении истца от ${ph("день.месяц.год", "date")}.</li>
</ul>`);
    }
  }
  return parts.join("\n");
}
function preamble(judge, num, plaintiff, defendants) {
  return `<p>Окружной суд штата Сан-Андреас, в составе судьи <strong>${judge}</strong>, рассмотрев материалы искового заявления № <strong>${num}</strong> от гражданина <strong>${plaintiff}</strong> (далее - истец) ${defendants},</p>`;
}
function generateDocumentContent(type, c, settings) {
  const judge = judgeFullName$1(settings);
  const date = today();
  const num = c.caseNumber;
  const pPlain = preamblePlaintiff(c);
  const dPreamble = preambleDefendants(c);
  const auditBlocks = defendantAuditBlocks(c);
  const geo = `<p style="text-align:right">Штат Сан-Андреас, г. Лос-Сантос ${date}</p>`;
  const templates = {
    // ── 1. Оставление без движения (Вариант 1 — с причиной) ──────────────────
    "no-move-reasons": `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>ОБ ОСТАВЛЕНИИ ИСКОВОГО ЗАЯВЛЕНИЯ БЕЗ ДВИЖЕНИЯ (ВАРИАНТ 1)</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Истец ${ph("день.месяц.год", "date")} обратился в Окружной суд штата Сан-Андреас с исковым заявлением №${num}.</p>
<p>&nbsp;</p>
<p>Лицо, подающее заявление в суд (истец), обязано уплатить судебную пошлину в размере $15.000 за исковое заявление в Окружной суд штата Сан-Андреас. Уплата пошлины производится банковским переводом на имя судьи.</p>
<p>&nbsp;</p>
<p>Между тем исковое заявление подано с нарушением положений процессуального законодательства. Так, согласно статье 1 главы III Правил подачи исковых заявлений (далее - Правила) суд вправе оставить исковое заявление без движения, если: ${ph("причина", "text")}</p>
<p>&nbsp;</p>
<p>Вместе с тем, исходя из принципа процессуальной экономии и принимая во внимание отсутствие непреодолимых препятствий для дальнейшего принятия и рассмотрения запроса, суд полагает, что в настоящем деле допустимо оставить поступившее обращение без движения, предоставив заявителю время для устранения выявленных недостатков.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами II-IV Судебного кодекса штата Сан-Андреас, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Исковое заявление №${num} - оставить без движения.</p>
<p>&nbsp;</p>
<p>2. Предложить истцу в течение 48 часов предоставить в суд ходатайство об уплате судебной пошлины в размере 15.000$.</p>
<p>&nbsp;</p>
<p>3. Обязать Секретную службу штата Сан-Андреас в течение 48 часов уведомить стороны о возбуждении судебного разбирательства, передать копии искового заявления и настоящего определения, незамедлительно по выполнении требований судебного акта письменно известив об этом суд с представлением доказательств вручения документов.</p>
<p>&nbsp;</p>
<p>4. Обязать руководство соответствующих структур (если не указано иное) предоставить суду:</p>
<p>&nbsp;</p>
${auditBlocks}
<p>&nbsp;</p>
<p>5. Наложить запрет на перевод и увольнение ответчиков на все время судебного разбирательства.</p>
<p>&nbsp;</p>
<p>6. В случае если обстоятельства, послужившие основанием для оставления искового заявления без движения, не будут устранены в срок, установленный в настоящем определении, исковое заявление будет возвращено согласно части «г» статьи 1 главы IV Правил.</p>
<p>&nbsp;</p>
<p>7. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 2. Оставление без движения (Вариант 2 — только пошлина) ─────────────
    "no-move-fee": `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>ОБ ОСТАВЛЕНИИ ИСКОВОГО ЗАЯВЛЕНИЯ БЕЗ ДВИЖЕНИЯ (ВАРИАНТ 2)</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Истец ${ph("день.месяц.год", "date")} обратился в Окружной суд штата Сан-Андреас с исковым заявлением №${num}.</p>
<p>&nbsp;</p>
<p>Лицо, подающее заявление в суд (истец), обязано уплатить судебную пошлину в размере $15.000 за исковое заявление в Окружной суд штата Сан-Андреас. Уплата пошлины производится банковским переводом на имя судьи.</p>
<p>&nbsp;</p>
<p>Вместе с тем, исходя из принципа процессуальной экономии и принимая во внимание отсутствие непреодолимых препятствий для дальнейшего принятия и рассмотрения запроса, суд полагает, что в настоящем деле допустимо оставить поступившее обращение без движения, предоставив заявителю время для устранения выявленных недостатков.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами I и V Конституции, главами III и IX Судебного кодекса, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Исковое заявление №${num} - оставить без движения.</p>
<p>&nbsp;</p>
<p>2. Предложить истцу в течение 48 часов предоставить в суд ходатайство об уплате судебной пошлины в размере 15.000$.</p>
<p>&nbsp;</p>
<p>3. Обязать Секретную службу штата Сан-Андреас в течение 48 часов уведомить стороны о возбуждении судебного разбирательства, передать копии искового заявления и настоящего определения, незамедлительно по выполнении требований судебного акта письменно известив об этом суд с представлением доказательств вручения документов.</p>
<p>&nbsp;</p>
<p>4. Обязать руководство соответствующих структур (если не указано иное) предоставить суду:</p>
<p>&nbsp;</p>
${auditBlocks}
<p>&nbsp;</p>
<p>5. Наложить запрет на перевод и увольнение ответчиков на все время судебного разбирательства.</p>
<p>&nbsp;</p>
<p>6. В случае если обстоятельства, послужившие основанием для оставления искового заявления без движения, не будут устранены в срок, установленный в настоящем определении, исковое заявление будет возвращено согласно части «г» статьи 1 главы IV Правил.</p>
<p>&nbsp;</p>
<p>7. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 3. Принятие к производству (с прокуратурой) ──────────────────────────
    "accept-prosecutor": `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О ПРИНЯТИИ ИСКОВОГО ЗАЯВЛЕНИЯ К ПРОИЗВОДСТВУ (С ПРОКУРАТУРОЙ)</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Исковое заявление подано с соблюдением требований, предусмотренных Правилами подачи исковых заявлений, в связи с чем оно подлежит принятию к производству.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами I и V Конституции, Судебным кодексом, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Принять настоящее исковое заявление к производству.</p>
<p>&nbsp;</p>
<p>2. Обязать прокуратуру в течение 48 часов инициировать расследование по обстоятельствам, изложенным в исковом заявлении с изъятием необходимых материалов (доказательств) если таковые требуются.</p>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 4. Принятие к производству (без прокуратуры) ─────────────────────────
    accept: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О ПРИНЯТИИ ИСКОВОГО ЗАЯВЛЕНИЯ К ПРОИЗВОДСТВУ (БЕЗ ПРОКУРАТУРЫ)</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Исковое заявление подано с соблюдением требований, предусмотренных Правилами подачи исковых заявлений, в связи с чем оно подлежит принятию к производству.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами I и V Конституции, Судебным кодексом, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Принять настоящее исковое заявление к производству.</p>
<p>&nbsp;</p>
<p>2. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 5. Возвращение искового заявления ─────────────────────────────────────
    return: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О ВОЗВРАЩЕНИИ ИСКОВОГО ЗАЯВЛЕНИЯ</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Исковое заявление подано с нарушением положений процессуального законодательства. Так, согласно статье 1 главы IV Правил подачи исковых заявлений суд вправе возвратить исковое заявление в случае, если:</p>
<ul>
<li>Исковое заявление, жалоба были отредактированы без соответствующего ходатайства об уточнении своих требований.</li>
<li>В производстве этого или другого суда имеется дело по спору между теми же сторонами, о том же предмете и по тем же основаниям.</li>
<li>До вынесения определения суда о принятии искового заявления к производству суда от истца поступило заявление о возвращении искового заявления.</li>
<li>Не устранены обстоятельства, послужившие основаниями для оставления искового заявления без движения, в срок, установленный в определении суда.</li>
<li>Дело неподсудно данному суду.</li>
<li>Нарушены несколько требований к форме, содержанию или наименованию иска.</li>
<li>Ответчик не является субъектом оспариваемых правоотношений или не может нести обязанности, которые истец требует на него возложить.</li>
</ul>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами I и V Конституции, Судебным Кодексом, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Возвратить настоящее исковое заявление.</p>
<p>&nbsp;</p>
<p>2. Возвращение искового заявления не препятствует повторному обращению истца в суд с иском к тому же ответчику, о том же предмете и по тем же основаниям.</p>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 6. Отказ в принятии ───────────────────────────────────────────────────
    rejection: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>ОБ ОТКАЗЕ В ПРИНЯТИИ ИСКОВОГО ЗАЯВЛЕНИЯ</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Исковое заявление подано с нарушением положений процессуального законодательства. Так, согласно статье 1 главы V Правил подачи исковых заявлений суд вправе отказать в принятии искового заявления в случае, если:</p>
<ul>
<li>С момента, как произошли обстоятельства, на которых истец основывает свои исковые требования прошло более 36 часов.</li>
<li>Исковое заявление, жалоба предъявлены в защиту прав, свобод или законных интересов другого лица, гражданином (организацией), которому не предоставлено такое право.</li>
<li>В исковом заявлении оспариваются действия, которые не затрагивают права, свободы или законные интересы заявителя.</li>
</ul>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами I и V Конституции, Судебным Кодексом, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Отказать в принятии настоящего искового заявления.</p>
<p>&nbsp;</p>
<p>2. Отказ в принятии искового заявления препятствует повторному обращению заявителя в суд с иском к тому же ответчику, о том же предмете и по тем же основаниям.</p>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 7. Назначение дела к судебному процессу ──────────────────────────────
    schedule: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О НАЗНАЧЕНИИ ДЕЛА К СУДЕБНОМУ ПРОЦЕССУ</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Судебное заседание по рассмотрению дела по исковому заявлению №${num} назначить на ${ph("Дата", "date")} в ${ph("Время", "time")} в помещении зала суда здания Капитолия г. Лос-Сантос. Разбирательство дела подлежит осуществлению в ${ph("Открытом/Закрытом", "session-type")} судебном процессе.</p>
<p>&nbsp;</p>
<p>2. Признать обязательной явку в судебное заседание лиц, участвующих в деле, и вызвать их в судебное заседание для дачи объяснений. В случае неявки лиц, вызванных в судебное заседание, суд вправе вынести решение по имеющимся доказательствам. Неявка лиц, вызванных в судебное заседание, является основанием для привлечения к уголовной ответственности.</p>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 8. Решение (резолютивная часть) ──────────────────────────────────────
    decision: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>РЕШЕНИЕ</strong></p>
<p style="text-align:center"><strong>(резолютивная часть)</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">РЕШИЛ:</div>
<p>&nbsp;</p>
<p>1. Исковые требования — ${ph("удовлетворить частично / полностью / отказать", "text")}.</p>
<p>&nbsp;</p>
<p>2. Признать гражданина ${ph("Имя Фамилия", "person")} с номером паспорта ${ph("Номер паспорта", "text")} виновным в совершении преступления, предусмотренного ст. ${ph("Статьи", "article")} Уголовного кодекса штата Сан-Андреас.</p>
<p>&nbsp;</p>
<p>3. Освободить от занимаемой должности, назначить наказание в виде тюремного заключения сроком на ${ph("Лет", "text")} лет. Местом отбытия наказания назначить ${ph("СИЗО Федеральной тюрьмы / Федеральную тюрьму / КПЗ LSPD", "text")}.</p>
<p>&nbsp;</p>
<p>4. Назначить наказание в виде судебного штрафа в размере ${ph("Сумма", "money")}$.</p>
<p>&nbsp;</p>
<p>5. Взыскать с сотрудника ${ph("Структура", "gov-org")} ${ph("Имя Фамилия", "person")} в пользу истца ${ph("Сумма", "money")}$ в качестве компенсации морального вреда и судебных издержек. Выплату осуществить через руководящий состав МЮ.</p>
<p>&nbsp;</p>
<p>6. Признать невиновным гражданина ${ph("Имя Фамилия", "person")} с номером паспорта ${ph("Номер паспорта", "text")} в совершении ${ph("Дата", "date")} преступлений, предусмотренных ст.ст. ${ph("Статьи", "article")} Уголовного кодекса.</p>
<p>&nbsp;</p>
<p>7. Аннулировать запись о нарушении Уголовного кодекса в базе данных гражданина ${ph("Имя Фамилия", "person")} с номером паспорта ${ph("номер паспорта", "text")} за ${ph("Дата", "date")} по ст.ст. ${ph("Статьи", "article")}.</p>
<p>&nbsp;</p>
<p>8. В удовлетворении остальных исковых требований истца — отказать.</p>
<p>&nbsp;</p>
<p>9. Настоящее решение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 9. Приговор (мотивировочная часть) ───────────────────────────────────
    motivation: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ПРИГОВОР</strong></p>
<p style="text-align:center"><strong>(мотивировочная часть)</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
<p>Окружной суд штата Сан-Андреас, в составе судьи <strong>${judge}</strong>, рассмотрев в открытом судебном процессе уголовное дело по исковому заявлению №${num} от гражданина <strong>${pPlain}</strong> против сотрудника ${ph("Имя Фамилия ответчика", "person")} о привлечении к ответственности,</p>
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>${ph("Дата", "date")} в Окружной суд штата Сан-Андреас поступило исковое заявление от гражданина <strong>${pPlain}</strong>.</p>
<p>&nbsp;</p>
<p>${ph("Мотивировка — изложить суть дела, доказательства, позиции сторон и правовой анализ", "text")}</p>
<p>&nbsp;</p>
<p>На основании всего вышеперечисленного, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ПРИГОВОРИЛ:</div>
<p>&nbsp;</p>
<p>1. ${ph("Решение суда", "text")}</p>
<p>2. ${ph("Дополнительное решение", "text")}</p>
<p>3. ${ph("Итоговые распоряжения", "text")}</p>`,
    // ── 10. Судебный ордер ────────────────────────────────────────────────────
    order: `<p style="text-align:center"><strong>СУБЪЕКТЫ ОРДЕРА</strong></p>
<p>&nbsp;</p>
<p>Лицо, на которое выдан ордер: ${ph("Имя Фамилия", "person")}.</p>
<p>Паспортные данные: ${ph("ID-Идентификатор", "text")}.</p>
<p>Задержать и арестовать субъект ордера по статьям Уголовного кодекса, а именно: ${ph("Статья", "article")}.</p>
<p>Предусмотренная ордером мера наказания: ${ph("Количество", "text")} лет заключения в ${ph("СИЗО Федеральной тюрьмы / Федеральной тюрьме", "text")}.</p>
<hr class="page-break">
<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>СУДЕБНЫЙ ОРДЕР</strong></p>
<p style="text-align:center"><strong>Federal Wanted</strong></p>
<p>&nbsp;</p>
<p style="text-align:center">РоС-СЛА-${(/* @__PURE__ */ new Date()).toLocaleDateString("ru-RU", { month: "long" })}-${num}</p>
<p>&nbsp;</p>
<p>Судья Окружного суда штата Сан-Андреас <strong>${judge}</strong>, в соответствии со статьёй 5 главы V Конституции штата Сан-Андреас, положениями которой установлено, что требования и распоряжения судов и судей при осуществлении ими полномочий обязательны для всех без исключения государственных органов, должностных лиц, организаций и граждан. В рамках судопроизводства судом выдаётся настоящий акт, а именно судебный ордер, являющий собой официальное постановление судьи (или коллегии судей), определяющее правоотношения между сторонами судебного, апелляционного или иного судебного разбирательства. Такое постановление требует или санкционирует выполнение определённых действий одной или несколькими сторонами дела.</p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>АВТОРИЗАЦИЯ И ИСПОЛНЕНИЕ</strong></p>
<p>&nbsp;</p>
<p>Орган, выдавший ордер: Окружной суд штата Сан-Андреас.</p>
<p>Должностное лицо, выдавшее ордер: Судья Окружного суда штата Сан-Андреас <strong>${judge}</strong>.</p>
<p>Основание для выдачи ордера: Решение по исковому заявлению №${num}.</p>
<p>Начало действия ордера: 00:00, ${ph("день месяц год", "date")}.</p>
<p>Конец действия ордера: 00:00, ${ph("день месяц год", "date")}.</p>
<p>Ответственные за передачу ордера: USSS.</p>
<p>Ответственные за исполнение ордера: USSS, NG, FIB, LSPD, LSSD, SASPA.</p>`,
    // ── Заметки заседания (внутренний рабочий документ) ──────────────────────
    "hearing-notes": `<p style="text-align:center"><strong>ЗАМЕТКИ СУДЕБНОГО ЗАСЕДАНИЯ</strong></p>
<p style="text-align:center">Дело №${num} &nbsp;·&nbsp; ${date}</p>
<p style="text-align:center">Судья: ${judge}</p>
<p>&nbsp;</p>
<div class="doc-section">ПОЗИЦИЯ ИСТЦА:</div>
<p><strong>${pPlain}</strong> заявил(а):</p>
<p>${ph("Позиция истца", "text")}</p>
<p>&nbsp;</p>
<div class="doc-section">ПОЗИЦИЯ ОТВЕТЧИКА:</div>
<p>${ph("Позиция ответчика", "text")}</p>
<p>&nbsp;</p>
<div class="doc-section">ПОЗИЦИЯ ПРОКУРАТУРЫ:</div>
<p>${ph("Позиция прокуратуры", "text")}</p>
<p>&nbsp;</p>
<div class="doc-section">СЛАБЫЕ МЕСТА:</div>
<p>${ph("Слабые места и противоречия в деле", "text")}</p>
<p>&nbsp;</p>
<div class="doc-section">ПРЕДВАРИТЕЛЬНЫЕ ВЫВОДЫ:</div>
<p>${ph("Выводы суда", "text")}</p>`,
    // ── 1. О принятии встречного искового заявления ───────────────────────
    "counter-claim": `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О ПРИНЯТИИ ВСТРЕЧНОГО ИСКОВОГО ЗАЯВЛЕНИЯ К ПРОИЗВОДСТВУ</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
<p>Окружной суд штата Сан-Андреас, в составе судьи <strong>${judge}</strong>, рассмотрев материалы искового заявления №<strong>${num}</strong> гражданина <strong>${pPlain}</strong> к сотруднику ${ph("Гос. структура", "gov-org")} ${ph("Имя Фамилия/Жетон", "person")} о выдвижении встречных исковых требований,</p>
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Встречное исковое заявление представляет собой заявление, подаваемое ответчиком в ответ на первоначальное исковое заявление истца, в рамках которого ответчик вправе изложить свои возражения, доводы, а также предъявить самостоятельные требования, непосредственно связанные с предметом рассматриваемого спора.</p>
<p>&nbsp;</p>
<p>Встречный иск может быть предъявлен исключительно ответчиком и исключительно к истцу по делу. Предъявление встречного иска к третьим лицам, прокурору либо иным лицам, представляющим интересы участников процесса, не допускается.</p>
<p>&nbsp;</p>
<p>На основании судебного прецедента Верховного суда штата Сан-Андреас от 09 июля 2024 года по исковому заявлению №638, суд считает возможным объединить исковые заявления №${ph("Номер иска 1", "case-number")} и №${ph("Номер иска 2", "case-number")} для их совместного рассмотрения по существу.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами I и V Конституции, Судебным кодексом штата Сан-Андреас, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Объединить исковые заявления №${ph("Номер иска 1", "case-number")} и №${ph("Номер иска 2", "case-number")} в одно производство.</p>
<p>&nbsp;</p>
<p>2. Принять встречное исковое заявление №${ph("Номер иска", "case-number")} к производству суда.</p>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 2. О расширении круга лиц ─────────────────────────────────────────
    "expand-participants": `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О РАСШИРЕНИИ КРУГА ЛИЦ, УЧАСТВУЮЩИХ В ДЕЛЕ</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Изучив материалы дела, представленные сторонами, а также иные доказательства, имеющиеся в распоряжении суда, суд приходит к выводу о необходимости определения полного круга лиц, участвующих в деле, поскольку принятое по настоящему спору решение может затронуть права, обязанности и законные интересы иных субъектов правоотношений.</p>
<p>&nbsp;</p>
<p>Из материалов дела следует необходимость привлечения к участию в деле гражданина ${ph("Имя Фамилия", "person")}, являющегося непосредственным участником обстоятельств, имеющих значение для правильного рассмотрения настоящего дела.</p>
<p>&nbsp;</p>
<p>При таких обстоятельствах суд считает необходимым привлечь указанное лицо к участию в деле в процессуальном статусе ${ph("ответчика / свидетеля / эксперта", "text")}.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами I и V Конституции, Судебным кодексом штата Сан-Андреас, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Привлечь гражданина ${ph("Имя Фамилия", "person")} к участию в деле в качестве ${ph("ответчика / свидетеля / эксперта", "text")}.</p>
<p>&nbsp;</p>
<p>2. Обязать Секретную службу штата Сан-Андреас в течение 48 часов уведомить стороны о настоящем определении и представить суду подтверждение вручения процессуальных документов.</p>
<p>&nbsp;</p>
<p>3. Наложить запрет на любые кадровые изменения в отношении указанного сотрудника до завершения судебного разбирательства.</p>
<p>&nbsp;</p>
<p>4. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 3. О предоставлении государственного адвоката ────────────────────
    "state-lawyer": `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О ПРЕДОСТАВЛЕНИИ ГОСУДАРСТВЕННОГО АДВОКАТА</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>${ph("Дата", "date")} в Окружной суд штата Сан-Андреас поступило ходатайство от гражданина ${ph("Имя Фамилия", "person")} о предоставлении государственного адвоката для представления и защиты его прав и законных интересов в рамках настоящего судебного разбирательства.</p>
<p>&nbsp;</p>
<p>Согласно статье 6 главы VI Судебного кодекса штата Сан-Андреас, сторона процесса вправе обратиться в суд с ходатайством о предоставлении государственного адвоката при наличии оснований, предусмотренных законом.</p>
<p>&nbsp;</p>
<p>Суд, изучив доводы ходатайства, приходит к выводу о наличии оснований для его удовлетворения.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами I и V Конституции, Судебным кодексом штата Сан-Андреас, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Удовлетворить ходатайство гражданина ${ph("Имя Фамилия", "person")} о предоставлении государственного адвоката.</p>
<p>&nbsp;</p>
<p>2. Обязать руководство Коллегии адвокатов штата Сан-Андреас в течение 24 часов назначить государственного адвоката для защиты прав и законных интересов ${ph("Имя Фамилия", "person")}.</p>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 4. О передаче дела по подсудности ────────────────────────────────
    "jurisdiction-transfer": `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О ПЕРЕДАЧЕ ДЕЛА ПО ПОДСУДНОСТИ</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
<p>Окружной суд штата Сан-Андреас, в составе судьи <strong>${judge}</strong>, рассмотрев материалы искового заявления №<strong>${num}</strong> от гражданина <strong>${pPlain}</strong> ${dPreamble},</p>
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Согласно статье 11.1 главы V Конституции штата Сан-Андреас, Верховный суд штата Сан-Андреас рассматривает дела против высокопоставленных должностных лиц, дела, по которым санкция предусматривает пожизненное лишение свободы, дела, вытекающие из конституционных либо законодательных споров, а также иные дела особой государственной важности.</p>
<p>&nbsp;</p>
<p>Поскольку настоящее дело относится к категории ${ph("в отношении высокопоставленного лица / конституционный спор / дело особой государственной важности", "text")}, его рассмотрение относится к исключительной подсудности Верховного суда штата Сан-Андреас.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами I и V Конституции, Судебным кодексом штата Сан-Андреас, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Передать исковое заявление №${num} по подсудности в Верховный суд штата Сан-Андреас.</p>
<p>&nbsp;</p>
<p>2. Закрепить за настоящим делом регистрационный номер Верховного суда №${ph("Номер иска ВС", "case-number")}.</p>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 5. Об отводе лица ─────────────────────────────────────────────────
    recusal: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>ОБ ОТВОДЕ ЛИЦА, УЧАСТВУЮЩЕГО В ДЕЛЕ</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
<p>Окружной суд штата Сан-Андреас, в составе судьи <strong>${judge}</strong>, рассмотрев материалы искового заявления №<strong>${num}</strong>,</p>
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>${ph("Дата", "date")} в адрес суда поступило заявление об отводе лица, участвующего в деле, а именно ${ph("Имя Фамилия", "person")}.</p>
<p>&nbsp;</p>
<p>Согласно главе VIII Судебного кодекса штата Сан-Андреас, основанием для отвода могут являться обстоятельства, вызывающие сомнение в объективности, беспристрастности либо независимости участника процесса, в том числе наличие родственных связей, заинтересованности в исходе дела либо ранее совершённых процессуальных действий по тому же предмету спора.</p>
<p>&nbsp;</p>
<p>Изучив представленные материалы, суд приходит к выводу о наличии оснований для удовлетворения заявления об отводе.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь Конституцией и Судебным кодексом штата Сан-Андреас, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Удовлетворить заявление об отводе ${ph("Имя Фамилия", "person")} от участия в деле по исковому заявлению №${num}.</p>
<p>&nbsp;</p>
<p>2. Обязать прокуратуру штата Сан-Андреас в течение 24 часов инициировать необходимые процессуальные мероприятия по установленным обстоятельствам.</p>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 6. Об исправлении описки ──────────────────────────────────────────
    "correct-typo": `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>ОБ ИСПРАВЛЕНИИ ОПИСКИ</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
${preamble(judge, num, pPlain, dPreamble)}
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>При изучении материалов дела судом установлено, что в ранее вынесенном судебном акте по исковому заявлению №${num} допущена описка, а именно: указано — ${ph("Ошибочная формулировка", "text")}, тогда как фактически и юридически верной формулировкой является — ${ph("Правильная формулировка", "text")}.</p>
<p>&nbsp;</p>
<p>Указанная описка носит технический характер, не затрагивает существа принятого судебного акта, однако подлежит исправлению в целях обеспечения правовой определённости и точности судебного документа.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь главами I и V Конституции, главами III и IX Судебного кодекса штата Сан-Андреас, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Исправить допущенную описку в судебном акте по исковому заявлению №${num}.</p>
<p>&nbsp;</p>
<p>2. Считать правильной следующую формулировку: ${ph("Правильная формулировка", "text")}.</p>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 7. О коллегиальном рассмотрении дела ─────────────────────────────
    collegial: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О КОЛЛЕГИАЛЬНОМ РАССМОТРЕНИИ ДЕЛА</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
<p>Окружной суд штата Сан-Андреас, в составе судьи <strong>${judge}</strong>, рассмотрев материалы искового заявления №<strong>${num}</strong>,</p>
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Для обеспечения принципов законности, объективности, всестороннего исследования обстоятельств дела и беспристрастного разрешения спора суд приходит к выводу о необходимости коллегиального рассмотрения настоящего дела составом нескольких судей.</p>
<p>&nbsp;</p>
<p>Коллегиальное рассмотрение позволит дать надлежащую правовую оценку всем обстоятельствам дела и исключить риск принятия необоснованного либо противоречивого судебного акта.</p>
<p>&nbsp;</p>
<p>На основании изложенного, руководствуясь Конституцией штата Сан-Андреас и Судебным кодексом штата Сан-Андреас, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Назначить коллегиальное рассмотрение дела по исковому заявлению №${num}.</p>
<p>&nbsp;</p>
<p>2. Включить в состав коллегии судей:</p>
<ul>
<li>Окружной судья ${ph("Имя Фамилия", "person")}</li>
<li>Окружной судья ${ph("Имя Фамилия", "person")}</li>
<li>Окружной судья ${ph("Имя Фамилия", "person")}</li>
</ul>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 8. Об объединении дел в одно производство ─────────────────────────
    consolidate: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>ОБ ОБЪЕДИНЕНИИ ДЕЛ В ОДНО ПРОИЗВОДСТВО</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
<p>Окружной суд штата Сан-Андреас, в составе судьи <strong>${judge}</strong>, рассмотрев материалы исковых заявлений №${ph("Номер иска 1", "case-number")} и №${ph("Номер иска 2", "case-number")},</p>
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>${ph("Дата", "date")} в производство суда поступили исковые заявления №${ph("Номер иска 1", "case-number")} и №${ph("Номер иска 2", "case-number")}.</p>
<p>&nbsp;</p>
<p>Изучив предмет заявленных требований, представленные доказательства, а также юридические основания заявленных требований, суд приходит к выводу, что указанные дела связаны между собой по предмету спора и фактическим обстоятельствам.</p>
<p>&nbsp;</p>
<p>Их раздельное рассмотрение может повлечь вынесение противоречащих друг другу судебных актов.</p>
<p>&nbsp;</p>
<p>На основании правового прецедента Верховного суда штата Сан-Андреас от 09 июля 2024 года по исковому заявлению №638, суд считает необходимым объединить данные дела в одно производство.</p>
<p>&nbsp;</p>
<p>На основании изложенного, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Объединить исковые заявления №${ph("Номер иска 1", "case-number")} и №${ph("Номер иска 2", "case-number")} в одно производство.</p>
<p>&nbsp;</p>
<p>2. Продолжить рассмотрение дела в рамках искового заявления №${ph("Основной номер иска", "case-number")}.</p>
<p>&nbsp;</p>
<p>3. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 9. О прекращении производства по делу ────────────────────────────
    terminate: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О ПРЕКРАЩЕНИИ ПРОИЗВОДСТВА ПО ДЕЛУ</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
<p>Окружной суд штата Сан-Андреас, в составе судьи <strong>${judge}</strong>, рассмотрев материалы искового заявления №<strong>${num}</strong>,</p>
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>Судом исследованы материалы искового заявления, а также дополнительные доказательства, включая материалы прокурорской проверки по обстоятельствам, изложенным в исковом заявлении.</p>
<p>&nbsp;</p>
<p>По результатам анализа представленных материалов суд приходит к выводу о невозможности дальнейшего рассмотрения дела по существу в связи с отсутствием объективной возможности установить фактические обстоятельства, имеющие юридическое значение для вынесения судебного решения.</p>
<p>&nbsp;</p>
<p>При таких обстоятельствах продолжение производства невозможно.</p>
<p>&nbsp;</p>
<p>На основании изложенного, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Производство по делу №${num} прекратить.</p>
<p>&nbsp;</p>
<p>2. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`,
    // ── 10. О рассмотрении ходатайства ───────────────────────────────────
    petition: `<p style="text-align:center"><strong>ОКРУЖНОЙ СУД ШТАТА САН-АНДРЕАС</strong></p>
<p>&nbsp;</p>
<p style="text-align:center"><strong>ОПРЕДЕЛЕНИЕ</strong></p>
<p style="text-align:center"><strong>О РАССМОТРЕНИИ ХОДАТАЙСТВА</strong></p>
<p>&nbsp;</p>
${geo}
<p>&nbsp;</p>
<p>Окружной суд штата Сан-Андреас, в составе судьи <strong>${judge}</strong>, рассмотрев материалы искового заявления №<strong>${num}</strong>,</p>
<p>&nbsp;</p>
<div class="doc-section">УСТАНОВИЛ:</div>
<p>&nbsp;</p>
<p>${ph("Дата", "date")} в адрес суда поступило ходатайство от адвоката ${ph("Имя Фамилия", "person")} о допуске его к участию в деле в качестве защитника ${ph("Имя Фамилия", "person")}, а также о предоставлении материалов дела для ознакомления.</p>
<p>&nbsp;</p>
<p>Согласно главе VI Судебного кодекса штата Сан-Андреас, лица, участвующие в деле, а также их представители вправе знакомиться с материалами дела, представлять доказательства, заявлять ходатайства, возражать против доводов иных лиц и пользоваться иными процессуальными правами, предусмотренными законом.</p>
<p>&nbsp;</p>
<p>Изучив материалы ходатайства, суд приходит к выводу о наличии оснований для его удовлетворения.</p>
<p>&nbsp;</p>
<p>На основании изложенного, суд</p>
<p>&nbsp;</p>
<div class="doc-section">ОПРЕДЕЛИЛ:</div>
<p>&nbsp;</p>
<p>1. Удовлетворить ходатайство адвоката ${ph("Имя Фамилия", "person")}.</p>
<p>&nbsp;</p>
<p>2. Допустить адвоката ${ph("Имя Фамилия", "person")} к участию в деле в качестве защитника ${ph("Имя Фамилия", "person")}.</p>
<p>&nbsp;</p>
<p>3. Предоставить материалы дела для ознакомления.</p>
<p>&nbsp;</p>
<p>4. Настоящее определение вступает в законную силу немедленно и может быть обжаловано в Апелляционный суд штата Сан-Андреас в течение 36 часов.</p>`
  };
  return templates[type] || "<p>Введите текст документа...</p>";
}
function getTemplatePreview(type, settings) {
  const fakeCase = {
    caseNumber: ph("НОМЕР ДЕЛА", "case-number"),
    plaintiff: ph("Имя Фамилия истца", "person"),
    defendant: ph("Гос. структура / Имя Фамилия / Жетон ответчика", "person"),
    participants: []
  };
  return generateDocumentContent(type, fakeCase, settings);
}
function fillTemplatePlaceholders(html, c, settings) {
  const judge = judgeFullName$1(settings);
  const date = today();
  const pPlain = preamblePlaintiff(c);
  const dFull = preambleDefendants(c);
  function replaceMark(key, value) {
    if (!value) return;
    const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    html = html.replace(
      new RegExp(`<mark[^>]*class="doc-placeholder"[^>]*>\\[${esc}\\]<\\/mark>`, "gi"),
      value
    );
  }
  replaceMark("НОМЕР ДЕЛА", c.caseNumber);
  replaceMark("Номер иска", c.caseNumber);
  replaceMark("ДАТА", date);
  replaceMark("Имя Фамилия истца", pPlain);
  replaceMark("ИСТЕЦ", pPlain);
  const dShort = c.participants.filter((p) => p.role === "defendant").map((p) => `${p.firstName} ${p.lastName}`.trim()).join(", ") || c.defendant;
  if (dShort) replaceMark("ОТВЕТЧИК", dShort);
  const DEF_MARK_KEY = "Гос\\. структура \\/ Имя Фамилия \\/ Жетон ответчика";
  const contextualPattern = new RegExp(
    `против\\s+<mark[^>]*class="doc-placeholder"[^>]*>\\[${DEF_MARK_KEY}\\]<\\/mark>\\s*\\(далее\\s*-\\s*ответчик\\s*№1\\)`,
    "gi"
  );
  if (contextualPattern.test(html)) {
    html = html.replace(contextualPattern, dFull);
  } else {
    replaceMark("Гос. структура / Имя Фамилия / Жетон ответчика", dFull);
  }
  const defOrgs = c.participants.filter((p) => p.role === "defendant").map((p) => p.position).filter(Boolean);
  if (defOrgs.length === 1) {
    replaceMark("Гос. структура", defOrgs[0]);
  } else if (defOrgs.length > 1) {
    defOrgs.forEach((org) => {
      const esc = "Гос\\. структура";
      html = html.replace(
        new RegExp(`<mark[^>]*class="doc-placeholder"[^>]*>\\[${esc}\\]<\\/mark>`, "i"),
        org
      );
    });
  }
  replaceMark("Имя Фамилия судьи", judge);
  replaceMark("СУДЬЯ", judge);
  return html;
}
function htmlToBBCode(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent || "";
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    const el = node;
    const tag = el.tagName.toLowerCase();
    const children = Array.from(el.childNodes).map(processNode).join("");
    switch (tag) {
      case "mark":
        if (el.classList.contains("doc-placeholder")) return children;
        return children;
      case "strong":
      case "b":
        return `[B]${children}[/B]`;
      case "em":
      case "i":
        return `[I]${children}[/I]`;
      case "u":
        return `[U]${children}[/U]`;
      case "s":
      case "strike":
        return `[S]${children}[/S]`;
      case "h1":
        return `[SIZE=6][B]${children}[/B][/SIZE]
`;
      case "h2":
        return `[SIZE=5][B]${children}[/B][/SIZE]
`;
      case "h3":
        return `[SIZE=4][B]${children}[/B][/SIZE]
`;
      case "blockquote":
        return `[QUOTE]${children}[/QUOTE]
`;
      case "ul":
        return `[LIST]
${children}[/LIST]
`;
      case "ol":
        return `[LIST=1]
${children}[/LIST]
`;
      case "li":
        return `[*]${children}
`;
      case "br":
        return "\n";
      case "p": {
        const align = el.style.textAlign;
        if (align === "center") return `[CENTER]${children}[/CENTER]
`;
        if (align === "right") return `[RIGHT]${children}[/RIGHT]
`;
        return children + "\n";
      }
      case "div": {
        if (el.classList.contains("doc-section")) return `
[B]${children}[/B]
`;
        if (el.classList.contains("page-break")) return "\n[HR]\n";
        const align = el.style.textAlign;
        if (align === "center") return `[CENTER]${children}[/CENTER]
`;
        return children + "\n";
      }
      case "hr":
        return "[HR]\n";
      default:
        return children;
    }
  }
  return processNode(div).replace(/\n{3,}/g, "\n\n").trim();
}
const SECTION_BUTTONS = ["УСТАНОВИЛ", "ПОСТАНОВИЛ", "ОПРЕДЕЛИЛ", "РЕШИЛ"];
function TemplateEditor({ docType, onBack, from }) {
  const { settings } = useApp();
  const editorRef = reactExports.useRef(null);
  const [saved, setSaved] = reactExports.useState(false);
  const [loaded, setLoaded] = reactExports.useState(false);
  const [bbcopyDone, setBbcopyDone] = reactExports.useState(false);
  const templatePath = reactExports.useCallback(() => {
    return `${settings.storagePath}/templates/${docType}.html`;
  }, [settings.storagePath, docType]);
  reactExports.useEffect(() => {
    if (!settings.storagePath) return;
    (async () => {
      const content2 = await window.api.readFile(templatePath());
      if (editorRef.current) {
        editorRef.current.innerHTML = content2 || getTemplatePreview(docType, settings);
      }
      setLoaded(true);
    })();
  }, [docType, settings.storagePath]);
  const handleSave = async () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    await window.api.writeFile(templatePath(), html);
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  const exec = (cmd, val) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
  };
  const insertSection = (name) => {
    exec("insertHTML", `<div class="doc-section">${name}:</div><p><br></p>`);
  };
  const insertPageBreak = () => {
    exec("insertHTML", '<hr class="page-break"><p><br></p>');
  };
  const jumpToNextPlaceholder = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const marks = Array.from(editor.querySelectorAll("mark.doc-placeholder"));
    if (marks.length === 0) return;
    const sel = window.getSelection();
    let currentIdx = -1;
    if (sel && sel.rangeCount > 0) {
      const range2 = sel.getRangeAt(0);
      for (let i = 0; i < marks.length; i++) {
        if (marks[i].contains(range2.startContainer) || marks[i] === range2.startContainer) {
          currentIdx = i;
          break;
        }
      }
    }
    const nextIdx = (currentIdx + 1) % marks.length;
    const target = marks[nextIdx];
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    const range = document.createRange();
    range.selectNodeContents(target);
    sel?.removeAllRanges();
    sel?.addRange(range);
    editor.focus();
  };
  const copyBBCode = () => {
    const html = editorRef.current?.innerHTML || "";
    navigator.clipboard.writeText(htmlToBBCode(html));
    setBbcopyDone(true);
    setTimeout(() => setBbcopyDone(false), 2e3);
  };
  const handleKeyDown = (e2) => {
    if (e2.ctrlKey) {
      if (e2.key === "b") {
        e2.preventDefault();
        exec("bold");
      }
      if (e2.key === "i") {
        e2.preventDefault();
        exec("italic");
      }
      if (e2.key === "u") {
        e2.preventDefault();
        exec("underline");
      }
      if (e2.key === "z") {
        e2.preventDefault();
        exec("undo");
      }
      if (e2.key === "y") {
        e2.preventDefault();
        exec("redo");
      }
      if (e2.key === "s") {
        e2.preventDefault();
        handleSave();
      }
    }
  };
  const ToolBtn = ({ title, onClick, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "toolbar-btn", title, onMouseDown: (e2) => {
    e2.preventDefault();
    onClick();
  }, children });
  const Sep = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-divider" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", style: { flexShrink: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: onBack, children: from === "additional-templates" ? "← Доп. шаблоны" : "← Шаблоны" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-title", style: { fontSize: 15 }, children: [
            "✏️ ",
            DOCUMENT_TYPE_LABELS[docType]
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-subtitle", children: "Редактирование шаблона документа" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-ghost btn-sm",
            title: "Сбросить к стандартному шаблону",
            onClick: () => {
              if (!window.confirm("Сбросить шаблон к стандартному? Все ваши правки будут потеряны.")) return;
              if (editorRef.current) {
                editorRef.current.innerHTML = getTemplatePreview(docType, settings);
              }
            },
            children: "↺ Сбросить"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary btn-sm", onClick: copyBBCode, children: bbcopyDone ? "✓ Скопировано!" : "[ ] BBCode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-sm", onClick: handleSave, children: saved ? "✓ Сохранено" : "💾 Сохранить (Ctrl+S)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toolbar", style: { flexShrink: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Жирный (Ctrl+B)", onClick: () => exec("bold"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "B" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Курсив (Ctrl+I)", onClick: () => exec("italic"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { children: "I" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Подчёркнутый (Ctrl+U)", onClick: () => exec("underline"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("u", { children: "U" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Зачёркнутый", onClick: () => exec("strikeThrough"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("s", { children: "S" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "По левому краю", onClick: () => exec("justifyLeft"), children: "≡" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "По центру", onClick: () => exec("justifyCenter"), children: "≡̈" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "По правому краю", onClick: () => exec("justifyRight"), children: "≡̄" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Список", onClick: () => exec("insertUnorderedList"), children: "•≡" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Нумерованный список", onClick: () => exec("insertOrderedList"), children: "1≡" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Увеличить отступ", onClick: () => exec("indent"), children: "→" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Уменьшить отступ", onClick: () => exec("outdent"), children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: "toolbar-select",
          defaultValue: "",
          onChange: (e2) => {
            exec("formatBlock", e2.target.value);
            e2.target.value = "";
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Заголовок" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "h1", children: "H1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "h2", children: "H2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "h3", children: "H3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "p", children: "Абзац" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Разрыв страницы", onClick: insertPageBreak, children: "⊟" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Следующий плейсхолдер [→]", onClick: jumpToNextPlaceholder, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, fontFamily: "monospace", color: "#818cf8" }, children: "[▶]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
      SECTION_BUTTONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "section-btn", onMouseDown: (e2) => {
        e2.preventDefault();
        insertSection(s);
      }, children: s }, s)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginLeft: "auto", fontSize: 10, color: "var(--text-3)", alignSelf: "center", paddingRight: 4 }, children: "Используйте [ПЕРЕМЕННАЯ] для автозаполнения" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflow: "auto", padding: "20px 40px", background: "#e8e8e8" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          maxWidth: 794,
          margin: "0 auto",
          background: "#ffffff",
          minHeight: 400,
          padding: "40px 50px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
          fontFamily: "'Times New Roman', Georgia, serif",
          fontSize: 13,
          lineHeight: 1.35,
          color: "#111"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: editorRef,
            contentEditable: true,
            suppressContentEditableWarning: true,
            onKeyDown: handleKeyDown,
            spellCheck: false,
            style: { outline: "none", minHeight: 300 }
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "8px 16px",
      borderTop: "1px solid var(--border-1)",
      background: "var(--bg-elevated)",
      flexShrink: 0,
      display: "flex",
      gap: 16,
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-3)" }, children: "Переменные автозаполнения:" }),
      ["[ИСТЕЦ]", "[ОТВЕТЧИК]", "[СУДЬЯ]", "[НОМЕР ДЕЛА]", "[ДАТА]", "[НАРУШЕНИЕ]", "[СРОК]"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn btn-ghost",
          style: { fontSize: 10, padding: "2px 8px", color: "var(--text-accent)", fontFamily: "monospace" },
          onClick: () => {
            editorRef.current?.focus();
            document.execCommand("insertText", false, v);
          },
          children: v
        },
        v
      ))
    ] })
  ] });
}
function Settings() {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = reactExports.useState({ ...settings });
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setForm({ ...settings });
  }, [settings]);
  const ff = (key) => (e2) => setForm((p) => ({ ...p, [key]: e2.target.value }));
  const handleSave = async () => {
    await updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  const handleSelectFolder = async () => {
    const path = await window.api.selectFolder();
    if (path) setForm((p) => ({ ...p, storagePath: path }));
  };
  const handleStampUpload = async () => {
    const path = await window.api.selectFile([
      { name: "Изображения", extensions: ["png", "jpg", "jpeg", "gif", "webp"] }
    ]);
    if (path) {
      const base642 = await saveStamp(path);
      if (base642) setForm((p) => ({ ...p, stampBase64: base642 }));
    }
  };
  const handleHeraldryUpload = async (field) => {
    const path = await window.api.selectFile([
      { name: "Изображения", extensions: ["png", "jpg", "jpeg", "gif", "webp"] }
    ]);
    if (path) {
      const base642 = await window.api.readBinary(path);
      if (base642) setForm((p) => ({ ...p, [field]: base642 }));
    }
  };
  const HeraldryCard = ({
    label,
    field,
    hint
  }) => {
    const value = form[field];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8, minWidth: 160 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "input-label", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-3)", marginBottom: 2 }, children: hint }),
      value ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: value,
          alt: label,
          style: { width: 80, height: 80, objectFit: "contain", borderRadius: 8, background: "#fff", border: "1px solid var(--border-2)", padding: 4 }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: 80,
        height: 80,
        borderRadius: 8,
        border: "2px dashed var(--border-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        color: "var(--text-3)"
      }, children: "🏛️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-secondary btn-sm", onClick: () => handleHeraldryUpload(field), children: [
        "📤 ",
        value ? "Заменить" : "Загрузить"
      ] }),
      value && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setForm((p) => ({ ...p, [field]: void 0 })), children: "Удалить" })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-title", children: "⚙️ Настройки" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-subtitle", children: "Профиль судьи и параметры приложения" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: handleSave, children: saved ? "✓ Сохранено" : "💾 Сохранить" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-section-title", children: "👤 Профиль судьи" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-grid settings-grid-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Имя" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.judgeFirstName, onChange: ff("judgeFirstName"), placeholder: "Имя" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Фамилия" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.judgeLastName, onChange: ff("judgeLastName"), placeholder: "Фамилия" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", style: { marginTop: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Должность (отображается в документах)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.position, onChange: ff("position"), placeholder: "Окружной судья" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-section-title", children: "🖊️ Подпись и печать" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "input-label", style: { marginBottom: 8 }, children: "Предварительный просмотр подписи" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              fontFamily: "var(--font-sign)",
              fontSize: 36,
              color: "#6366f1",
              padding: "10px 16px",
              background: "#fff",
              borderRadius: 8,
              minWidth: 200,
              textAlign: "center"
            }, children: form.judgeFirstName || form.judgeLastName ? `${form.judgeFirstName} ${form.judgeLastName}`.trim() : "Подпись судьи" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "input-label", style: { marginBottom: 8 }, children: "Печать" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
              form.stampBase64 ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: form.stampBase64, alt: "Печать", style: { width: 80, height: 80, objectFit: "contain" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                width: 80,
                height: 80,
                borderRadius: 8,
                border: "2px dashed var(--border-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                color: "var(--text-3)"
              }, children: "🔏" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-secondary btn-sm", onClick: handleStampUpload, children: [
                "📤 ",
                form.stampBase64 ? "Заменить" : "Загрузить",
                " печать"
              ] }),
              form.stampBase64 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setForm((p) => ({ ...p, stampBase64: void 0 })), children: "Удалить" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 16, fontSize: 11, color: "var(--text-3)", marginBottom: 8 }, children: "Печать отображается справа от подписи на последней странице документа." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-grid settings-grid-2", style: { maxWidth: 480 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Печать: сдвиг вправо (px)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input",
                type: "number",
                min: 0,
                max: 200,
                value: form.stampOffsetX ?? 0,
                onChange: (e2) => setForm((p) => ({ ...p, stampOffsetX: Number(e2.target.value) }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Печать: сдвиг вниз (px)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input",
                type: "number",
                min: 0,
                max: 200,
                value: form.stampOffsetY ?? 0,
                onChange: (e2) => setForm((p) => ({ ...p, stampOffsetY: Number(e2.target.value) }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Печать: размер (px)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 40,
                  max: 300,
                  step: 4,
                  value: form.stampScale ?? 120,
                  onChange: (e2) => setForm((p) => ({ ...p, stampScale: Number(e2.target.value) })),
                  style: { flex: 1 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: "var(--text-1)", minWidth: 36, textAlign: "right" }, children: form.stampScale ?? 120 })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-section-title", children: "🏛️ Оформление документов (геральдика)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "var(--text-2)", marginBottom: 16 }, children: "Логотипы отображаются в шапке соответствующих документов. Рекомендуется PNG с прозрачным фоном." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 20 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HeraldryCard,
            {
              label: "Логотип определений",
              field: "heraldryDeterminationBase64",
              hint: "Все определения, принятия, отказы"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HeraldryCard,
            {
              label: "Логотип ордеров",
              field: "heraldryOrderBase64",
              hint: "Ордера и предписания суда"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-grid settings-grid-2", style: { maxWidth: 480 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Размер логотипа (px)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 40,
                  max: 200,
                  step: 4,
                  value: form.heraldrySize ?? 80,
                  onChange: (e2) => setForm((p) => ({ ...p, heraldrySize: Number(e2.target.value) })),
                  style: { flex: 1 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: "var(--text-1)", minWidth: 36, textAlign: "right" }, children: form.heraldrySize ?? 80 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Отступ слева (px)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input",
                type: "number",
                min: 0,
                max: 300,
                value: form.heraldryOffsetX ?? 60,
                onChange: (e2) => setForm((p) => ({ ...p, heraldryOffsetX: Number(e2.target.value) }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Отступ сверху (px)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input",
                type: "number",
                min: 0,
                max: 300,
                value: form.heraldryOffsetY ?? 60,
                onChange: (e2) => setForm((p) => ({ ...p, heraldryOffsetY: Number(e2.target.value) }))
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-section-title", children: "💾 Хранение данных" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Путь к папке хранения" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input",
                value: form.storagePath,
                onChange: ff("storagePath"),
                placeholder: "C:\\CourtAssistant",
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary", onClick: handleSelectFolder, children: "📂 Выбрать" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-3)", marginTop: 6 }, children: "Здесь будут храниться все дела, документы и материалы" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", style: { background: "var(--bg-overlay)", border: "1px solid var(--border-0)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-section-title", children: "🗺️ Горячие клавиши" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }, children: [
          ["Ctrl+N", "Новый иск"],
          ["Ctrl+S", "Сохранить документ"],
          ["Ctrl+P", "Экспорт в JPEG"],
          ["Ctrl+B", "Жирный текст"],
          ["Ctrl+I", "Курсив"],
          ["Ctrl+U", "Подчёркивание"],
          ["Ctrl+Z", "Отменить"],
          ["Ctrl+Y", "Повторить"],
          ["Ctrl+Shift+C", "Скопировать BBCode"],
          ["/ (в редакторе)", "Быстрые вставки"]
        ].map(([key, desc]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { style: { background: "var(--bg-overlay)", border: "1px solid var(--border-2)", borderRadius: 4, padding: "2px 7px", fontSize: 11, fontFamily: "monospace", color: "var(--text-accent)" }, children: key }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, color: "var(--text-2)" }, children: desc })
        ] }, key)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-footer", children: [
        "Разработано Prince Cursed",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "по всем вопросам ds: saint.prince"
      ] })
    ] })
  ] });
}
const TYPE_ICONS = {
  rejection: "🚫",
  "no-move-reasons": "⏸️",
  "no-move-fee": "💰",
  return: "↩️",
  accept: "✅",
  "accept-prosecutor": "👮",
  schedule: "📅",
  decision: "⚖️",
  motivation: "📝",
  order: "📋",
  "hearing-notes": "🗒️",
  "counter-claim": "🔄",
  "expand-participants": "👥",
  "state-lawyer": "🧑‍⚖️",
  "jurisdiction-transfer": "🏛️",
  recusal: "🚷",
  "correct-typo": "✏️",
  collegial: "👨‍👩‍👧",
  consolidate: "🗂️",
  terminate: "🛑",
  petition: "📨"
};
const FLOW_TREE = {
  id: "root",
  type: "root",
  label: "Окружной суд",
  icon: "⚖️",
  children: [
    {
      id: "q-claim",
      type: "question",
      label: "Исковое заявление",
      children: [
        {
          id: "q-no",
          type: "question",
          label: "Не соответствует требованиям",
          children: [
            { id: "doc-reject", type: "doc", icon: "🚫", label: "Отказ в принятии", docType: "rejection" },
            { id: "doc-no-r", type: "doc", icon: "⏸️", label: "Без движения (нарушения)", docType: "no-move-reasons" },
            { id: "doc-no-f", type: "doc", icon: "💰", label: "Без движения (пошлина)", docType: "no-move-fee" },
            { id: "doc-return", type: "doc", icon: "↩️", label: "Возврат иска", docType: "return" }
          ]
        },
        {
          id: "q-yes",
          type: "question",
          label: "Соответствует — принять",
          children: [
            { id: "doc-accept", type: "doc", icon: "✅", label: "Без прокурора", docType: "accept" },
            { id: "doc-accept-p", type: "doc", icon: "👮", label: "С прокурором", docType: "accept-prosecutor" }
          ]
        }
      ]
    },
    {
      id: "q-process",
      type: "question",
      label: "Судебный процесс",
      children: [
        { id: "doc-schedule", type: "doc", icon: "📅", label: "Назначение заседания", docType: "schedule" },
        { id: "doc-notes", type: "doc", icon: "🗒️", label: "Заметки заседания", docType: "hearing-notes" }
      ]
    },
    {
      id: "q-final",
      type: "question",
      label: "Итоговые акты",
      children: [
        { id: "doc-decision", type: "doc", icon: "⚖️", label: "Финальное решение", docType: "decision" },
        { id: "doc-motivation", type: "doc", icon: "📝", label: "Мотивировка", docType: "motivation" },
        { id: "doc-order", type: "doc", icon: "📋", label: "Ордер", docType: "order" }
      ]
    },
    {
      id: "q-additional",
      type: "question",
      label: "Дополнительные определения",
      children: [
        { id: "doc-counter", type: "doc", icon: "🔄", label: "Встречный иск", docType: "counter-claim" },
        { id: "doc-expand", type: "doc", icon: "👥", label: "Расширение круга лиц", docType: "expand-participants" },
        { id: "doc-lawyer", type: "doc", icon: "🧑‍⚖️", label: "Гос. адвокат", docType: "state-lawyer" },
        { id: "doc-juris", type: "doc", icon: "🏛️", label: "Передача по подсудности", docType: "jurisdiction-transfer" },
        { id: "doc-recusal", type: "doc", icon: "🚷", label: "Отвод лица", docType: "recusal" },
        { id: "doc-typo", type: "doc", icon: "✏️", label: "Исправление описки", docType: "correct-typo" },
        { id: "doc-collegial", type: "doc", icon: "👨‍👩‍👧", label: "Коллегиальное рассмотрение", docType: "collegial" },
        { id: "doc-consol", type: "doc", icon: "🗂️", label: "Объединение дел", docType: "consolidate" },
        { id: "doc-terminate", type: "doc", icon: "🛑", label: "Прекращение производства", docType: "terminate" },
        { id: "doc-petition", type: "doc", icon: "📨", label: "Ходатайство", docType: "petition" }
      ]
    }
  ]
};
function FlowNodeCard({ node, onSelect, depth = 0 }) {
  const [expanded, setExpanded] = React.useState(depth < 2);
  if (node.type === "doc") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 12px",
          background: "var(--accent-dim)",
          border: "1px solid var(--border-accent)",
          borderRadius: 8,
          cursor: "pointer",
          transition: "all 0.15s",
          marginBottom: 4
        },
        onClick: () => node.docType && onSelect(node.docType),
        onMouseEnter: (e2) => {
          e2.currentTarget.style.background = "rgba(99,102,241,0.25)";
        },
        onMouseLeave: (e2) => {
          e2.currentTarget.style.background = "var(--accent-dim)";
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 15 }, children: node.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1, fontSize: 12, fontWeight: 500, color: "var(--text-1)" }, children: node.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, color: "var(--text-accent)" }, children: "Создать →" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 4 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 10px",
          background: node.type === "root" ? "var(--bg-overlay)" : "var(--bg-elevated)",
          border: "1px solid var(--border-1)",
          borderRadius: 8,
          cursor: "pointer",
          marginBottom: 4
        },
        onClick: () => setExpanded((e2) => !e2),
        children: [
          node.icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 14 }, children: node.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1, fontSize: 12, fontWeight: node.type === "root" ? 600 : 500, color: "var(--text-1)" }, children: node.label }),
          !!node.children?.length && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            fontSize: 12,
            color: "var(--text-3)",
            transform: expanded ? "rotate(90deg)" : "none",
            display: "inline-block",
            transition: "transform 0.15s"
          }, children: "›" })
        ]
      }
    ),
    expanded && node.children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { paddingLeft: 16, borderLeft: "2px solid var(--border-1)", marginLeft: 10 }, children: node.children.map((child) => /* @__PURE__ */ jsxRuntimeExports.jsx(FlowNodeCard, { node: child, onSelect, depth: depth + 1 }, child.id)) })
  ] });
}
function Documents({ case_: c }) {
  const { updateCase, settings, addTimelineEvent, setView } = useApp();
  const [showPicker, setShowPicker] = reactExports.useState(false);
  const [pickerMode, setPickerMode] = reactExports.useState("flow");
  const createDocument = async (type) => {
    setShowPicker(false);
    const templateHtml = await window.api.readFile(
      `${settings.storagePath}/templates/${type}.html`
    );
    const content2 = templateHtml ? fillTemplatePlaceholders(templateHtml, c, settings) : generateDocumentContent(type, c, settings);
    const doc = {
      id: v4(),
      type,
      title: DOCUMENT_TYPE_LABELS[type],
      content: content2,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await updateCase(c.id, { documents: [...c.documents, doc] });
    await addTimelineEvent(c.id, { event: "Документ создан: " + doc.title, type: "document-added" });
    setView({ type: "document-editor", caseId: c.id, documentId: doc.id });
  };
  const deleteDocument = async (docId) => {
    if (!window.confirm("Удалить документ?")) return;
    await updateCase(c.id, { documents: c.documents.filter((d) => d.id !== docId) });
  };
  const openDocument = (doc) => {
    setView({ type: "document-editor", caseId: c.id, documentId: doc.id });
  };
  const fmt = (iso) => new Date(iso).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "doc-list", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "doc-list-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, fontWeight: 500, color: "var(--text-2)" }, children: c.documents.length === 0 ? "Документов нет" : `${c.documents.length} документов` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: () => setShowPicker(true), disabled: c.status === "closed", children: "+ Новый документ" })
    ] }),
    showPicker && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 400,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        onClick: () => setShowPicker(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "var(--bg-surface)",
              border: "1px solid var(--border-2)",
              borderRadius: "var(--r-xl)",
              padding: 24,
              width: 460,
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "var(--sh-lg)"
            },
            onClick: (e2) => e2.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 15, fontWeight: 600, color: "var(--text-1)" }, children: "Выбор документа" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--text-3)" }, children: [
                    "Дело №",
                    c.caseNumber,
                    " · ",
                    c.title
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: `btn btn-sm ${pickerMode === "flow" ? "btn-secondary" : "btn-ghost"}`,
                      onClick: () => setPickerMode("flow"),
                      children: "🌿 Дерево"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: `btn btn-sm ${pickerMode === "list" ? "btn-secondary" : "btn-ghost"}`,
                      onClick: () => setPickerMode("list"),
                      children: "≡ Список"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-icon btn-sm", onClick: () => setShowPicker(false), children: "✕" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflow: "auto" }, children: pickerMode === "flow" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FlowNodeCard, { node: FLOW_TREE, onSelect: createDocument }) : DOCUMENT_TYPE_GROUPS.map((group, gi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 14 }, children: [
                gi > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: "var(--border-1)", marginBottom: 10 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 6
                }, children: group.label }),
                group.types.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 10px",
                      borderRadius: 8,
                      cursor: "pointer",
                      marginBottom: 2
                    },
                    onClick: () => createDocument(type),
                    onMouseEnter: (e2) => {
                      e2.currentTarget.style.background = "var(--bg-overlay)";
                    },
                    onMouseLeave: (e2) => {
                      e2.currentTarget.style.background = "transparent";
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 14, width: 22, textAlign: "center" }, children: TYPE_ICONS[type] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, color: "var(--text-1)" }, children: DOCUMENT_TYPE_LABELS[type] })
                    ]
                  },
                  type
                ))
              ] }, group.label)) })
            ]
          }
        )
      }
    ),
    c.documents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", style: { height: "auto", paddingTop: 60 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: "📋" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-text", children: "Нет документов" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-sub", children: "Нажмите «+ Новый документ» для создания" })
    ] }) : c.documents.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card doc-card", onClick: () => openDocument(doc), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "doc-card-icon", children: TYPE_ICONS[doc.type] || "📄" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "doc-card-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "doc-card-title", children: doc.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "doc-card-meta", children: [
          "Обновлено ",
          fmt(doc.updatedAt),
          doc.versions && doc.versions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { marginLeft: 8, color: "var(--text-accent)", fontSize: 10 }, children: [
            "· v",
            Math.max(...doc.versions.map((v) => v.version)) + 1
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4, flexShrink: 0 }, onClick: (e2) => e2.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-icon btn-ghost", onClick: () => openDocument(doc), title: "Редактировать", children: "✏️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-icon btn-ghost", onClick: () => deleteDocument(doc.id), title: "Удалить", style: { color: "var(--red)" }, children: "🗑️" })
      ] })
    ] }, doc.id))
  ] });
}
const MATERIAL_ICONS = {
  "google-docs": "📊",
  pdf: "📕",
  docx: "📘",
  txt: "📄",
  zip: "🗜️",
  image: "🖼️",
  video: "🎬",
  note: "📝",
  other: "📎"
};
const TYPE_LABELS = {
  "google-docs": "Google Docs",
  pdf: "PDF",
  docx: "Word",
  txt: "Текст",
  zip: "Архив",
  image: "Изображение",
  video: "Видео",
  note: "Заметка",
  other: "Файл"
};
function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}
function TxtViewer({ path }) {
  const [text, setText] = React.useState(null);
  React.useEffect(() => {
    window.api.readFile(path).then((t) => setText(t || ""));
  }, [path]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflow: "auto", padding: "24px 32px", background: "var(--bg-surface)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: { fontSize: 13, color: "var(--text-1)", lineHeight: 1.7, fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }, children: text === null ? "Загрузка..." : text || "(пустой файл)" }) });
}
function Materials({ case_: c }) {
  const { updateCase, addTimelineEvent } = useApp();
  const [dragover, setDragover] = reactExports.useState(false);
  const [showGdocs, setShowGdocs] = reactExports.useState(false);
  const [showNote, setShowNote] = reactExports.useState(false);
  const [gdocsUrl, setGdocsUrl] = reactExports.useState("");
  const [gdocsName, setGdocsName] = reactExports.useState("");
  const [noteText, setNoteText] = reactExports.useState("");
  const [lightbox, setLightbox] = reactExports.useState(null);
  const [viewNote, setViewNote] = reactExports.useState(null);
  const [mediaViewer, setMediaViewer] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const addMaterial = async (mat) => {
    await updateCase(c.id, { materials: [...c.materials, mat] });
    await addTimelineEvent(c.id, { event: `Материал добавлен: ${mat.name}`, type: "material-added" });
  };
  const removeMaterial = async (id) => {
    if (!window.confirm("Удалить материал?")) return;
    await updateCase(c.id, { materials: c.materials.filter((m) => m.id !== id) });
  };
  const toLocalUrl = (filePath) => "localfile://" + encodeURIComponent(filePath.replace(/\\/g, "/"));
  const openMaterial = (mat) => {
    if (mat.type === "image" && mat.preview) {
      setLightbox(mat);
    } else if (mat.type === "note") {
      setViewNote(mat);
    } else if (mat.type === "pdf" && mat.path) {
      setMediaViewer(mat);
    } else if (mat.type === "video" && mat.path) {
      setMediaViewer(mat);
    } else if (mat.type === "txt" && mat.path) {
      setMediaViewer(mat);
    } else if (mat.url) {
      window.api.openExternal(mat.url);
    } else if (mat.path) {
      window.api.openFile(mat.path);
    }
  };
  const handleFiles = async (files) => {
    for (const file of files) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      const type = ["pdf"].includes(ext) ? "pdf" : ["docx", "doc"].includes(ext) ? "docx" : ["txt"].includes(ext) ? "txt" : ["zip", "rar", "7z"].includes(ext) ? "zip" : ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"].includes(ext) ? "image" : ["mp4", "avi", "mov", "mkv", "webm"].includes(ext) ? "video" : "other";
      let preview;
      if (type === "image") {
        preview = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e2) => resolve(e2.target?.result);
          reader.readAsDataURL(file);
        });
      }
      await addMaterial({
        id: v4(),
        type,
        name: file.name,
        path: file.path || "",
        size: file.size,
        preview,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  };
  const onDrop = (e2) => {
    e2.preventDefault();
    setDragover(false);
    handleFiles(Array.from(e2.dataTransfer.files));
  };
  const addGdocs = async () => {
    if (!gdocsUrl.trim()) return;
    await addMaterial({
      id: v4(),
      type: "google-docs",
      name: gdocsName.trim() || "Google Docs",
      url: gdocsUrl.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    setGdocsUrl("");
    setGdocsName("");
    setShowGdocs(false);
  };
  const addNote = async () => {
    if (!noteText.trim()) return;
    await addMaterial({
      id: v4(),
      type: "note",
      name: "Заметка",
      note: noteText.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    setNoteText("");
    setShowNote(false);
  };
  const fmt = (iso) => new Date(iso).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit" });
  const images = c.materials.filter((m) => m.type === "image");
  const others = c.materials.filter((m) => m.type !== "image");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "materials-area", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `drop-zone ${dragover ? "dragover" : ""}`,
        onDragOver: (e2) => {
          e2.preventDefault();
          setDragover(true);
        },
        onDragLeave: () => setDragover(false),
        onDrop,
        onClick: () => fileInputRef.current?.click(),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "drop-zone-icon", children: "📎" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "drop-zone-text", children: "Перетащите файлы или нажмите для выбора" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "drop-zone-sub", children: "PDF, DOCX, TXT, ZIP, изображения, видео" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              multiple: true,
              style: { display: "none" },
              onChange: (e2) => handleFiles(Array.from(e2.target.files || []))
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary btn-sm", onClick: () => setShowGdocs(true), children: "📊 Google Docs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary btn-sm", onClick: () => setShowNote(true), children: "📝 Заметка" })
    ] }),
    c.materials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", style: { height: "auto", paddingTop: 40 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: "📎" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-text", children: "Материалов нет" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-sub", children: "Перетащите файлы или добавьте ссылку" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: [
          "Изображения (",
          images.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: images.map((mat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "relative",
              width: 100,
              height: 100,
              borderRadius: 10,
              overflow: "hidden",
              cursor: "pointer",
              border: "1px solid var(--border-2)",
              flexShrink: 0
            },
            onClick: () => openMaterial(mat),
            title: mat.name,
            children: [
              mat.preview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: mat.preview,
                  alt: mat.name,
                  style: { width: "100%", height: "100%", objectFit: "cover" }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-elevated)", fontSize: 28 }, children: "🖼️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    opacity: 0,
                    transition: "opacity 0.15s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6
                  },
                  onMouseEnter: (e2) => e2.currentTarget.style.opacity = "1",
                  onMouseLeave: (e2) => e2.currentTarget.style.opacity = "0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 18 }, children: "🔍" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        className: "btn btn-icon btn-ghost",
                        style: { color: "var(--red)", fontSize: 14 },
                        onClick: (e2) => {
                          e2.stopPropagation();
                          removeMaterial(mat.id);
                        },
                        title: "Удалить",
                        children: "🗑️"
                      }
                    )
                  ]
                }
              )
            ]
          },
          mat.id
        )) })
      ] }),
      others.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: [
          "Файлы и документы (",
          others.length,
          ")"
        ] }),
        others.map((mat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card material-card", style: { cursor: "pointer" }, onClick: () => openMaterial(mat), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "material-icon", children: MATERIAL_ICONS[mat.type] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "material-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "material-name", children: mat.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "material-meta", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: "var(--bg-overlay)", color: "var(--text-3)", padding: "1px 6px", borderRadius: 4, fontSize: 10, marginRight: 6 }, children: TYPE_LABELS[mat.type] }),
              fmt(mat.createdAt),
              mat.size ? ` · ${formatSize(mat.size)}` : "",
              mat.note ? ` · ${mat.note.slice(0, 60)}` : "",
              mat.url ? ` · ${mat.url.slice(0, 40)}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "material-actions", onClick: (e2) => e2.stopPropagation(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn btn-icon btn-ghost",
                onClick: () => openMaterial(mat),
                title: "Открыть",
                style: { fontSize: 14 },
                children: mat.url ? "🔗" : mat.type === "note" ? "👁" : "📂"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-icon btn-ghost", onClick: () => removeMaterial(mat.id), title: "Удалить", style: { color: "var(--red)" }, children: "🗑️" })
          ] })
        ] }, mat.id))
      ] })
    ] }),
    lightbox && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 1e3,
          background: "rgba(0,0,0,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12
        },
        onClick: () => setLightbox(null),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: 16, right: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setLightbox(null), style: { fontSize: 18, color: "var(--text-2)" }, children: "✕" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: lightbox.preview,
              alt: lightbox.name,
              style: { maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 8, boxShadow: "0 8px 60px rgba(0,0,0,0.8)" },
              onClick: (e2) => e2.stopPropagation()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, color: "var(--text-3)" }, children: lightbox.name }),
            lightbox.path && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn btn-secondary btn-sm",
                onClick: (e2) => {
                  e2.stopPropagation();
                  window.api.openFile(lightbox.path);
                },
                children: "📂 Открыть в проводнике"
              }
            )
          ] }),
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: images.map((img) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              onClick: (e2) => {
                e2.stopPropagation();
                setLightbox(img);
              },
              style: {
                width: 48,
                height: 48,
                borderRadius: 6,
                overflow: "hidden",
                border: `2px solid ${img.id === lightbox.id ? "var(--accent)" : "transparent"}`,
                cursor: "pointer",
                flexShrink: 0
              },
              children: img.preview && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img.preview, alt: img.name, style: { width: "100%", height: "100%", objectFit: "cover" } })
            },
            img.id
          )) })
        ]
      }
    ),
    mediaViewer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: { position: "fixed", inset: 0, zIndex: 1e3, background: "rgba(0,0,0,0.9)", display: "flex", flexDirection: "column" },
        onClick: () => setMediaViewer(null),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 20px",
                background: "var(--bg-surface)",
                borderBottom: "1px solid var(--border-1)",
                flexShrink: 0
              },
              onClick: (e2) => e2.stopPropagation(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 18 }, children: MATERIAL_ICONS[mediaViewer.type] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, fontWeight: 500, color: "var(--text-1)" }, children: mediaViewer.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-3)" }, children: TYPE_LABELS[mediaViewer.type] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
                  mediaViewer.path && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary btn-sm", onClick: () => window.api.openFile(mediaViewer.path), children: "📂 Открыть внешне" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setMediaViewer(null), children: "✕ Закрыть" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, overflow: "hidden", display: "flex" }, onClick: (e2) => e2.stopPropagation(), children: [
            mediaViewer.type === "pdf" && mediaViewer.path && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "iframe",
              {
                src: toLocalUrl(mediaViewer.path),
                style: { flex: 1, border: "none", background: "#fff" },
                title: mediaViewer.name
              }
            ),
            mediaViewer.type === "video" && mediaViewer.path && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                src: toLocalUrl(mediaViewer.path),
                controls: true,
                autoPlay: true,
                style: { maxWidth: "100%", maxHeight: "100%" }
              }
            ) }),
            mediaViewer.type === "txt" && mediaViewer.path && /* @__PURE__ */ jsxRuntimeExports.jsx(TxtViewer, { path: mediaViewer.path })
          ] })
        ]
      }
    ),
    viewNote && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        title: `📝 ${viewNote.name}`,
        onClose: () => setViewNote(null),
        footer: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setViewNote(null), children: "Закрыть" }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { whiteSpace: "pre-wrap", fontSize: 13, color: "var(--text-1)", lineHeight: 1.7, minHeight: 80 }, children: viewNote.note })
      }
    ),
    showGdocs && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        title: "Добавить Google Docs",
        onClose: () => setShowGdocs(false),
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setShowGdocs(false), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: addGdocs, children: "Добавить" })
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Название (необязательно)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: gdocsName, onChange: (e2) => setGdocsName(e2.target.value), placeholder: "Google Docs документ" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Ссылка *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: gdocsUrl, onChange: (e2) => setGdocsUrl(e2.target.value), placeholder: "https://docs.google.com/...", autoFocus: true })
          ] })
        ] })
      }
    ),
    showNote && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        title: "Добавить заметку",
        onClose: () => setShowNote(false),
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setShowNote(false), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: addNote, children: "Добавить" })
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "textarea", value: noteText, onChange: (e2) => setNoteText(e2.target.value), placeholder: "Текст заметки...", rows: 5, autoFocus: true })
      }
    )
  ] });
}
function judgeFullName(s) {
  return `${s.judgeFirstName} ${s.judgeLastName}`.trim() || "Судья";
}
const ROLE_ORDER = ["plaintiff", "defendant", "prosecutor", "lawyer", "judge"];
const ROLE_COLORS = {
  judge: { bg: "#1a3a6e", border: "#c8a84b", text: "#c8a84b" },
  plaintiff: { bg: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.5)", text: "#a5b4fc" },
  defendant: { bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.4)", text: "#f87171" },
  prosecutor: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.4)", text: "#fbbf24" },
  lawyer: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.4)", text: "#34d399" }
};
function ParticipantCard({ p, onEdit, onDelete, disabled }) {
  const colors = ROLE_COLORS[p.role];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    background: colors.bg,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: "14px 16px",
    minWidth: 160,
    maxWidth: 220,
    flex: "0 0 auto",
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, fontWeight: 700, color: colors.text, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }, children: PARTICIPANT_ROLE_LABELS[p.role] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 14, fontWeight: 600, color: "var(--text-1)", lineHeight: 1.3 }, children: [
      p.firstName,
      " ",
      p.lastName
    ] }),
    p.position && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-2)", marginTop: 4 }, children: p.position }),
    p.documentId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 10, color: "var(--text-3)", marginTop: 4 }, children: [
      "ID: ",
      p.documentId
    ] }),
    p.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-2)", marginTop: 6, lineHeight: 1.4, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 6 }, children: p.comment }),
    !disabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4, marginTop: 10, justifyContent: "flex-end" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm btn-icon", onClick: onEdit, title: "Редактировать", children: "✏️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm btn-icon", style: { color: "var(--red)" }, onClick: onDelete, title: "Удалить", children: "🗑️" })
    ] })
  ] });
}
function ConnectorLine({ direction: direction2 = "down" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 36,
    justifyContent: "center"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 2, height: 36, background: "linear-gradient(to bottom, rgba(99,102,241,0.4), rgba(99,102,241,0.1))" } }) });
}
function HConnector() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", marginBottom: 0, width: "100%", justifyContent: "center" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 2, flex: 1, maxWidth: 120, background: "linear-gradient(to right, rgba(99,102,241,0.1), rgba(99,102,241,0.3))" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 8, height: 8, borderRadius: "50%", background: "rgba(99,102,241,0.4)", margin: "0 4px" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, fontWeight: 600, color: "var(--text-3)", padding: "4px 16px", border: "1px solid var(--border-1)", borderRadius: 20, background: "var(--bg-elevated)" }, children: "VS" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 8, height: 8, borderRadius: "50%", background: "rgba(248,113,113,0.4)", margin: "0 4px" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 2, flex: 1, maxWidth: 120, background: "linear-gradient(to left, rgba(248,113,113,0.1), rgba(248,113,113,0.3))" } })
  ] });
}
function Participants({ case_: c }) {
  const { updateCase, settings } = useApp();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editP, setEditP] = reactExports.useState(null);
  const [viewMode, setViewMode] = reactExports.useState("diagram");
  const [form, setForm] = reactExports.useState({
    role: "plaintiff",
    firstName: "",
    lastName: "",
    documentId: "",
    position: "",
    comment: ""
  });
  const ff = (key) => (e2) => setForm((p) => ({ ...p, [key]: e2.target.value }));
  const openAdd = () => {
    setForm({ role: "plaintiff", firstName: "", lastName: "", documentId: "", position: "", comment: "" });
    setShowAdd(true);
  };
  const openEdit = (p) => {
    setForm({ role: p.role, firstName: p.firstName, lastName: p.lastName, documentId: p.documentId || "", position: p.position || "", comment: p.comment || "" });
    setEditP(p);
  };
  const handleAdd = async () => {
    if (!form.firstName.trim() && !form.lastName.trim()) return;
    await updateCase(c.id, { participants: [...c.participants, { id: v4(), ...form }] });
    setShowAdd(false);
  };
  const handleEdit = async () => {
    if (!editP) return;
    await updateCase(c.id, {
      participants: c.participants.map((p) => p.id === editP.id ? { ...editP, ...form } : p)
    });
    setEditP(null);
  };
  const handleDelete = async (id) => {
    await updateCase(c.id, { participants: c.participants.filter((p) => p.id !== id) });
  };
  const byRole = (role) => c.participants.filter((p) => p.role === role);
  const judge = byRole("judge")[0];
  const plaintiffs = byRole("plaintiff");
  const defendants = byRole("defendant");
  const prosecutors = byRole("prosecutor");
  const lawyers = byRole("lawyer");
  const disabled = c.status === "closed";
  const formContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row form-row-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Роль *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "select", value: form.role, onChange: ff("role"), children: ROLE_ORDER.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: PARTICIPANT_ROLE_LABELS[r] }, r)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Документ / ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.documentId, onChange: ff("documentId"), placeholder: "Паспорт, ИНН..." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row form-row-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Имя *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.firstName, onChange: ff("firstName"), placeholder: "Имя" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Фамилия *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.lastName, onChange: ff("lastName"), placeholder: "Фамилия" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Должность" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: form.position, onChange: ff("position"), placeholder: "Должность или звание" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "input-label", children: "Комментарий" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "textarea", value: form.comment, onChange: ff("comment"), placeholder: "Дополнительная информация...", rows: 2 })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "participants-area", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `btn btn-sm ${viewMode === "diagram" ? "btn-secondary" : "btn-ghost"}`,
            onClick: () => setViewMode("diagram"),
            children: "⬡ Схема"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `btn btn-sm ${viewMode === "list" ? "btn-secondary" : "btn-ghost"}`,
            onClick: () => setViewMode("list"),
            children: "≡ Список"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-sm", onClick: openAdd, disabled, children: "+ Участник" })
    ] }),
    c.participants.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", style: { height: "auto", paddingTop: 60 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: "👥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-text", children: "Участников нет" })
    ] }) : viewMode === "list" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "participant-grid", children: [...c.participants].sort((a2, b) => ROLE_ORDER.indexOf(a2.role) - ROLE_ORDER.indexOf(b.role)).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card participant-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `participant-role-badge role-${p.role}`, children: PARTICIPANT_ROLE_LABELS[p.role] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "participant-name", children: [
        p.firstName,
        " ",
        p.lastName
      ] }),
      p.position && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "participant-detail", children: p.position }),
      p.documentId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "participant-detail", style: { color: "var(--text-3)", fontSize: 11, marginTop: 4 }, children: [
        "ID: ",
        p.documentId
      ] }),
      p.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "participant-detail", style: { fontSize: 11, marginTop: 6, color: "var(--text-2)", lineHeight: 1.4 }, children: p.comment }),
      !disabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4, marginTop: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => openEdit(p), children: "✏️ Ред." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", style: { color: "var(--red)" }, onClick: () => handleDelete(p.id), children: "🗑️" })
      ] })
    ] }, p.id)) }) : (
      /* Diagram view */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 0, paddingBottom: 40, minHeight: 400 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          background: "#1a3a6e",
          border: "2px solid #c8a84b",
          borderRadius: 12,
          padding: "10px 32px",
          textAlign: "center",
          marginBottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, letterSpacing: "0.1em", color: "#c8a84b", textTransform: "uppercase", marginBottom: 2 }, children: "ОКРУЖНОЙ СУД" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "#8ca8d4" }, children: [
            "⚖️ ",
            judgeFullName(settings)
          ] }),
          settings.position && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, color: "#6a8ab4", marginTop: 2 }, children: settings.position })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectorLine, {}),
        judge ? /* @__PURE__ */ jsxRuntimeExports.jsx(ParticipantCard, { p: judge, onEdit: () => openEdit(judge), onDelete: () => handleDelete(judge.id), disabled }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { border: "1px dashed var(--border-2)", borderRadius: 12, padding: "12px 24px", color: "var(--text-3)", fontSize: 12 }, children: "Судья не назначен" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectorLine, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 0, width: "100%", maxWidth: 600 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }, children: plaintiffs.length > 0 ? plaintiffs.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ParticipantCard, { p, onEdit: () => openEdit(p), onDelete: () => handleDelete(p.id), disabled }, p.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { border: "1px dashed rgba(99,102,241,0.3)", borderRadius: 12, padding: "12px 20px", color: "var(--text-3)", fontSize: 12, minWidth: 140, textAlign: "center" }, children: "Истец не указан" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 12px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(HConnector, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }, children: defendants.length > 0 ? defendants.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ParticipantCard, { p, onEdit: () => openEdit(p), onDelete: () => handleDelete(p.id), disabled }, p.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { border: "1px dashed rgba(248,113,113,0.3)", borderRadius: 12, padding: "12px 20px", color: "var(--text-3)", fontSize: 12, minWidth: 140, textAlign: "center" }, children: "Ответчик не указан" }) })
        ] }),
        (prosecutors.length > 0 || lawyers.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", width: "100%", maxWidth: 600 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, display: "flex", justifyContent: "center" }, children: prosecutors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectorLine, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 80 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, display: "flex", justifyContent: "center" }, children: lawyers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectorLine, {}) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", width: "100%", maxWidth: 600, gap: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }, children: prosecutors.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ParticipantCard, { p, onEdit: () => openEdit(p), onDelete: () => handleDelete(p.id), disabled }, p.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 80 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }, children: lawyers.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ParticipantCard, { p, onEdit: () => openEdit(p), onDelete: () => handleDelete(p.id), disabled }, p.id)) })
          ] })
        ] })
      ] })
    ),
    showAdd && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        title: "Новый участник",
        onClose: () => setShowAdd(false),
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setShowAdd(false), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: handleAdd, children: "Добавить" })
        ] }),
        children: formContent
      }
    ),
    editP && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        title: "Редактировать участника",
        onClose: () => setEditP(null),
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setEditP(null), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: handleEdit, children: "Сохранить" })
        ] }),
        children: formContent
      }
    )
  ] });
}
function Notes({ case_: c }) {
  const { updateCase } = useApp();
  const [newText, setNewText] = reactExports.useState("");
  const [editNote, setEditNote] = reactExports.useState(null);
  const [editText, setEditText] = reactExports.useState("");
  const addNote = async () => {
    if (!newText.trim()) return;
    const note = {
      id: v4(),
      content: newText.trim(),
      isPinned: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await updateCase(c.id, { notes: [...c.notes, note] });
    setNewText("");
  };
  const saveEdit = async () => {
    if (!editNote) return;
    await updateCase(c.id, {
      notes: c.notes.map(
        (n) => n.id === editNote ? { ...n, content: editText, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : n
      )
    });
    setEditNote(null);
  };
  const pinNote = async (id) => {
    await updateCase(c.id, {
      notes: c.notes.map((n) => n.id === id ? { ...n, isPinned: !n.isPinned } : n)
    });
  };
  const deleteNote = async (id) => {
    await updateCase(c.id, { notes: c.notes.filter((n) => n.id !== id) });
  };
  const sorted = [...c.notes].sort((a2, b) => {
    if (a2.isPinned && !b.isPinned) return -1;
    if (!a2.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a2.updatedAt).getTime();
  });
  const fmt = (iso) => new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notes-area", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "note-textarea",
          value: newText,
          onChange: (e2) => setNewText(e2.target.value),
          placeholder: "Новая заметка судьи... (Ctrl+Enter для сохранения)",
          rows: 3,
          onKeyDown: (e2) => {
            if (e2.key === "Enter" && e2.ctrlKey) {
              e2.preventDefault();
              addNote();
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-sm", onClick: addNote, disabled: !newText.trim(), children: "+ Добавить заметку" }) })
    ] }),
    sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", style: { height: "auto", paddingTop: 40 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: "📝" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-text", children: "Заметок нет" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-sub", children: "Добавьте заметку судьи выше" })
    ] }) : sorted.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `card note-card ${note.isPinned ? "pinned" : ""}`, children: editNote === note.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "note-textarea",
          value: editText,
          onChange: (e2) => setEditText(e2.target.value),
          rows: 4,
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-sm", onClick: saveEdit, children: "Сохранить" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setEditNote(null), children: "Отмена" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      note.isPinned && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, fontWeight: 600, color: "var(--text-accent)", marginBottom: 6, letterSpacing: "0.05em" }, children: "📌 ЗАКРЕПЛЕНО" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "note-content", children: note.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "note-meta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(note.updatedAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { marginLeft: "auto", display: "flex", gap: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-icon btn-ghost btn-sm", onClick: () => pinNote(note.id), title: note.isPinned ? "Открепить" : "Закрепить", children: note.isPinned ? "📌" : "📍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-icon btn-ghost btn-sm", onClick: () => {
            setEditNote(note.id);
            setEditText(note.content);
          }, title: "Редактировать", children: "✏️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-icon btn-ghost btn-sm", onClick: () => deleteNote(note.id), title: "Удалить", style: { color: "var(--red)" }, children: "🗑️" })
        ] })
      ] })
    ] }) }, note.id))
  ] });
}
function Timeline({ case_: c }) {
  const { updateCase } = useApp();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [text, setText] = reactExports.useState("");
  const addEvent = async () => {
    if (!text.trim()) return;
    const ev = {
      id: v4(),
      date: formatDateForTimeline(/* @__PURE__ */ new Date()),
      event: text.trim(),
      type: "custom"
    };
    await updateCase(c.id, { timeline: [...c.timeline, ev] });
    setText("");
    setShowAdd(false);
  };
  const sorted = [...c.timeline].sort((a2, b) => {
    const da = new Date(a2.date.split(".").reverse().join("-"));
    const db = new Date(b.date.split(".").reverse().join("-"));
    return db.getTime() - da.getTime();
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "timeline-area", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, fontWeight: 500, color: "var(--text-2)" }, children: "Хронология дела" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary btn-sm", onClick: () => setShowAdd((p) => !p), children: "+ Событие" })
    ] }),
    showAdd && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16, display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          value: text,
          onChange: (e2) => setText(e2.target.value),
          placeholder: "Описание события...",
          autoFocus: true,
          onKeyDown: (e2) => {
            if (e2.key === "Enter") addEvent();
          },
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: addEvent, children: "Добавить" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setShowAdd(false), children: "✕" })
    ] }),
    sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", style: { height: "auto", paddingTop: 40 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: "🕐" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-text", children: "Хронология пуста" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "timeline-list", children: sorted.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "timeline-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `timeline-dot dot-${ev.type}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "timeline-date", children: ev.date }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "timeline-event", children: ev.event })
    ] }, ev.id)) })
  ] });
}
const TABS = [
  { id: "documents", icon: "📋", label: "Документы" },
  { id: "materials", icon: "📎", label: "Материалы" },
  { id: "participants", icon: "👥", label: "Участники" },
  { id: "notes", icon: "📝", label: "Заметки" },
  { id: "timeline", icon: "🕐", label: "Хронология" }
];
function CaseWorkspace({ caseId, initialTab }) {
  const { cases, setView, closeCase } = useApp();
  const [tab, setTab] = reactExports.useState(initialTab || "documents");
  const [showClose, setShowClose] = reactExports.useState(false);
  const [closeOpts, setCloseOpts] = reactExports.useState({
    moveToArchive: true,
    keepDocuments: true,
    keepMaterials: true,
    makeReadonly: true
  });
  const c = cases.find((x) => x.id === caseId);
  if (!c) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-text", children: "Дело не найдено" }) });
  const handleClose = async () => {
    await closeCase(c.id);
    setShowClose(false);
  };
  const renderTab = () => {
    switch (tab) {
      case "documents":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Documents, { case_: c });
      case "materials":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Materials, { case_: c });
      case "participants":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Participants, { case_: c });
      case "notes":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Notes, { case_: c });
      case "timeline":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { case_: c });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "workspace", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "workspace-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "workspace-back", onClick: () => setView({ type: "active-cases" }), title: "Назад", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "workspace-case-number", children: [
          "№",
          c.caseNumber
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "workspace-case-title", style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: c.title || `${c.plaintiff} vs ${c.defendant}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, flexShrink: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `case-status ${c.status}`, children: c.status === "active" ? "● В работе" : "● Закрыто" }),
        c.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary btn-sm", onClick: () => setShowClose(true), children: "✅ Закрыть дело" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "workspace-tabs", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `workspace-tab ${tab === t.id ? "active" : ""}`,
        onClick: () => setTab(t.id),
        children: [
          t.icon,
          " ",
          t.label
        ]
      },
      t.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "workspace-content", children: renderTab() }),
    showClose && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Modal,
      {
        title: "Закрыть дело",
        onClose: () => setShowClose(false),
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setShowClose(false), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: handleClose, children: "Закрыть дело" })
        ] }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16, fontSize: 13, color: "var(--text-2)" }, children: [
            "Дело №",
            c.caseNumber,
            " будет перемещено в архив."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "close-check", children: [
            ["moveToArchive", "Переместить в закрытые дела"],
            ["keepDocuments", "Сохранить все документы"],
            ["keepMaterials", "Сохранить все материалы"],
            ["makeReadonly", "Сделать дело только для чтения"]
          ].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "close-check-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: closeOpts[key],
                onChange: (e2) => setCloseOpts((p) => ({ ...p, [key]: e2.target.checked }))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "close-check-label", children: label })
          ] }, key)) })
        ]
      }
    )
  ] });
}
/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f2, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f2) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e2) {
      op = [6, e2];
      y = 0;
    } finally {
      f2 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __spreadArray(to, from, pack2) {
  if (arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || from);
}
var Bounds = (
  /** @class */
  (function() {
    function Bounds2(left, top, width, height) {
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
    }
    Bounds2.prototype.add = function(x, y, w, h) {
      return new Bounds2(this.left + x, this.top + y, this.width + w, this.height + h);
    };
    Bounds2.fromClientRect = function(context, clientRect) {
      return new Bounds2(clientRect.left + context.windowBounds.left, clientRect.top + context.windowBounds.top, clientRect.width, clientRect.height);
    };
    Bounds2.fromDOMRectList = function(context, domRectList) {
      var domRect = Array.from(domRectList).find(function(rect) {
        return rect.width !== 0;
      });
      return domRect ? new Bounds2(domRect.left + context.windowBounds.left, domRect.top + context.windowBounds.top, domRect.width, domRect.height) : Bounds2.EMPTY;
    };
    Bounds2.EMPTY = new Bounds2(0, 0, 0, 0);
    return Bounds2;
  })()
);
var parseBounds = function(context, node) {
  return Bounds.fromClientRect(context, node.getBoundingClientRect());
};
var parseDocumentSize = function(document2) {
  var body = document2.body;
  var documentElement = document2.documentElement;
  if (!body || !documentElement) {
    throw new Error("Unable to get document size");
  }
  var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
  var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
  return new Bounds(0, 0, width, height);
};
var toCodePoints$1 = function(str) {
  var codePoints = [];
  var i = 0;
  var length = str.length;
  while (i < length) {
    var value = str.charCodeAt(i++);
    if (value >= 55296 && value <= 56319 && i < length) {
      var extra = str.charCodeAt(i++);
      if ((extra & 64512) === 56320) {
        codePoints.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        codePoints.push(value);
        i--;
      }
    } else {
      codePoints.push(value);
    }
  }
  return codePoints;
};
var fromCodePoint$1 = function() {
  var codePoints = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    codePoints[_i] = arguments[_i];
  }
  if (String.fromCodePoint) {
    return String.fromCodePoint.apply(String, codePoints);
  }
  var length = codePoints.length;
  if (!length) {
    return "";
  }
  var codeUnits = [];
  var index = -1;
  var result = "";
  while (++index < length) {
    var codePoint = codePoints[index];
    if (codePoint <= 65535) {
      codeUnits.push(codePoint);
    } else {
      codePoint -= 65536;
      codeUnits.push((codePoint >> 10) + 55296, codePoint % 1024 + 56320);
    }
    if (index + 1 === length || codeUnits.length > 16384) {
      result += String.fromCharCode.apply(String, codeUnits);
      codeUnits.length = 0;
    }
  }
  return result;
};
var chars$2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup$2 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i$2 = 0; i$2 < chars$2.length; i$2++) {
  lookup$2[chars$2.charCodeAt(i$2)] = i$2;
}
var chars$1$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup$1$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i$1$1 = 0; i$1$1 < chars$1$1.length; i$1$1++) {
  lookup$1$1[chars$1$1.charCodeAt(i$1$1)] = i$1$1;
}
var decode$1 = function(base642) {
  var bufferLength = base642.length * 0.75, len = base642.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
  if (base642[base642.length - 1] === "=") {
    bufferLength--;
    if (base642[base642.length - 2] === "=") {
      bufferLength--;
    }
  }
  var buffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined" && typeof Uint8Array.prototype.slice !== "undefined" ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
  var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup$1$1[base642.charCodeAt(i)];
    encoded2 = lookup$1$1[base642.charCodeAt(i + 1)];
    encoded3 = lookup$1$1[base642.charCodeAt(i + 2)];
    encoded4 = lookup$1$1[base642.charCodeAt(i + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return buffer;
};
var polyUint16Array$1 = function(buffer) {
  var length = buffer.length;
  var bytes = [];
  for (var i = 0; i < length; i += 2) {
    bytes.push(buffer[i + 1] << 8 | buffer[i]);
  }
  return bytes;
};
var polyUint32Array$1 = function(buffer) {
  var length = buffer.length;
  var bytes = [];
  for (var i = 0; i < length; i += 4) {
    bytes.push(buffer[i + 3] << 24 | buffer[i + 2] << 16 | buffer[i + 1] << 8 | buffer[i]);
  }
  return bytes;
};
var UTRIE2_SHIFT_2$1 = 5;
var UTRIE2_SHIFT_1$1 = 6 + 5;
var UTRIE2_INDEX_SHIFT$1 = 2;
var UTRIE2_SHIFT_1_2$1 = UTRIE2_SHIFT_1$1 - UTRIE2_SHIFT_2$1;
var UTRIE2_LSCP_INDEX_2_OFFSET$1 = 65536 >> UTRIE2_SHIFT_2$1;
var UTRIE2_DATA_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_2$1;
var UTRIE2_DATA_MASK$1 = UTRIE2_DATA_BLOCK_LENGTH$1 - 1;
var UTRIE2_LSCP_INDEX_2_LENGTH$1 = 1024 >> UTRIE2_SHIFT_2$1;
var UTRIE2_INDEX_2_BMP_LENGTH$1 = UTRIE2_LSCP_INDEX_2_OFFSET$1 + UTRIE2_LSCP_INDEX_2_LENGTH$1;
var UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 = UTRIE2_INDEX_2_BMP_LENGTH$1;
var UTRIE2_UTF8_2B_INDEX_2_LENGTH$1 = 2048 >> 6;
var UTRIE2_INDEX_1_OFFSET$1 = UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 + UTRIE2_UTF8_2B_INDEX_2_LENGTH$1;
var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 = 65536 >> UTRIE2_SHIFT_1$1;
var UTRIE2_INDEX_2_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_1_2$1;
var UTRIE2_INDEX_2_MASK$1 = UTRIE2_INDEX_2_BLOCK_LENGTH$1 - 1;
var slice16$1 = function(view, start, end) {
  if (view.slice) {
    return view.slice(start, end);
  }
  return new Uint16Array(Array.prototype.slice.call(view, start, end));
};
var slice32$1 = function(view, start, end) {
  if (view.slice) {
    return view.slice(start, end);
  }
  return new Uint32Array(Array.prototype.slice.call(view, start, end));
};
var createTrieFromBase64$1 = function(base642, _byteLength) {
  var buffer = decode$1(base642);
  var view32 = Array.isArray(buffer) ? polyUint32Array$1(buffer) : new Uint32Array(buffer);
  var view16 = Array.isArray(buffer) ? polyUint16Array$1(buffer) : new Uint16Array(buffer);
  var headerLength = 24;
  var index = slice16$1(view16, headerLength / 2, view32[4] / 2);
  var data = view32[5] === 2 ? slice16$1(view16, (headerLength + view32[4]) / 2) : slice32$1(view32, Math.ceil((headerLength + view32[4]) / 4));
  return new Trie$1(view32[0], view32[1], view32[2], view32[3], index, data);
};
var Trie$1 = (
  /** @class */
  (function() {
    function Trie2(initialValue, errorValue, highStart, highValueIndex, index, data) {
      this.initialValue = initialValue;
      this.errorValue = errorValue;
      this.highStart = highStart;
      this.highValueIndex = highValueIndex;
      this.index = index;
      this.data = data;
    }
    Trie2.prototype.get = function(codePoint) {
      var ix;
      if (codePoint >= 0) {
        if (codePoint < 55296 || codePoint > 56319 && codePoint <= 65535) {
          ix = this.index[codePoint >> UTRIE2_SHIFT_2$1];
          ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
          return this.data[ix];
        }
        if (codePoint <= 65535) {
          ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET$1 + (codePoint - 55296 >> UTRIE2_SHIFT_2$1)];
          ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
          return this.data[ix];
        }
        if (codePoint < this.highStart) {
          ix = UTRIE2_INDEX_1_OFFSET$1 - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 + (codePoint >> UTRIE2_SHIFT_1$1);
          ix = this.index[ix];
          ix += codePoint >> UTRIE2_SHIFT_2$1 & UTRIE2_INDEX_2_MASK$1;
          ix = this.index[ix];
          ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
          return this.data[ix];
        }
        if (codePoint <= 1114111) {
          return this.data[this.highValueIndex];
        }
      }
      return this.errorValue;
    };
    return Trie2;
  })()
);
var chars$3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup$3 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i$3 = 0; i$3 < chars$3.length; i$3++) {
  lookup$3[chars$3.charCodeAt(i$3)] = i$3;
}
var base64$1 = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==";
var LETTER_NUMBER_MODIFIER = 50;
var BK = 1;
var CR$1 = 2;
var LF$1 = 3;
var CM = 4;
var NL = 5;
var WJ = 7;
var ZW = 8;
var GL = 9;
var SP = 10;
var ZWJ$1 = 11;
var B2 = 12;
var BA = 13;
var BB = 14;
var HY = 15;
var CB = 16;
var CL = 17;
var CP = 18;
var EX = 19;
var IN = 20;
var NS = 21;
var OP = 22;
var QU = 23;
var IS = 24;
var NU = 25;
var PO = 26;
var PR = 27;
var SY = 28;
var AI = 29;
var AL = 30;
var CJ = 31;
var EB = 32;
var EM = 33;
var H2 = 34;
var H3 = 35;
var HL = 36;
var ID = 37;
var JL = 38;
var JV = 39;
var JT = 40;
var RI$1 = 41;
var SA = 42;
var XX = 43;
var ea_OP = [9001, 65288];
var BREAK_MANDATORY = "!";
var BREAK_NOT_ALLOWED$1 = "×";
var BREAK_ALLOWED$1 = "÷";
var UnicodeTrie$1 = createTrieFromBase64$1(base64$1);
var ALPHABETICS = [AL, HL];
var HARD_LINE_BREAKS = [BK, CR$1, LF$1, NL];
var SPACE$1 = [SP, ZW];
var PREFIX_POSTFIX = [PR, PO];
var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE$1);
var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
var HYPHEN = [HY, BA];
var codePointsToCharacterClasses = function(codePoints, lineBreak2) {
  if (lineBreak2 === void 0) {
    lineBreak2 = "strict";
  }
  var types = [];
  var indices = [];
  var categories = [];
  codePoints.forEach(function(codePoint, index) {
    var classType = UnicodeTrie$1.get(codePoint);
    if (classType > LETTER_NUMBER_MODIFIER) {
      categories.push(true);
      classType -= LETTER_NUMBER_MODIFIER;
    } else {
      categories.push(false);
    }
    if (["normal", "auto", "loose"].indexOf(lineBreak2) !== -1) {
      if ([8208, 8211, 12316, 12448].indexOf(codePoint) !== -1) {
        indices.push(index);
        return types.push(CB);
      }
    }
    if (classType === CM || classType === ZWJ$1) {
      if (index === 0) {
        indices.push(index);
        return types.push(AL);
      }
      var prev = types[index - 1];
      if (LINE_BREAKS.indexOf(prev) === -1) {
        indices.push(indices[index - 1]);
        return types.push(prev);
      }
      indices.push(index);
      return types.push(AL);
    }
    indices.push(index);
    if (classType === CJ) {
      return types.push(lineBreak2 === "strict" ? NS : ID);
    }
    if (classType === SA) {
      return types.push(AL);
    }
    if (classType === AI) {
      return types.push(AL);
    }
    if (classType === XX) {
      if (codePoint >= 131072 && codePoint <= 196605 || codePoint >= 196608 && codePoint <= 262141) {
        return types.push(ID);
      } else {
        return types.push(AL);
      }
    }
    types.push(classType);
  });
  return [indices, types, categories];
};
var isAdjacentWithSpaceIgnored = function(a2, b, currentIndex, classTypes) {
  var current = classTypes[currentIndex];
  if (Array.isArray(a2) ? a2.indexOf(current) !== -1 : a2 === current) {
    var i = currentIndex;
    while (i <= classTypes.length) {
      i++;
      var next = classTypes[i];
      if (next === b) {
        return true;
      }
      if (next !== SP) {
        break;
      }
    }
  }
  if (current === SP) {
    var i = currentIndex;
    while (i > 0) {
      i--;
      var prev = classTypes[i];
      if (Array.isArray(a2) ? a2.indexOf(prev) !== -1 : a2 === prev) {
        var n = currentIndex;
        while (n <= classTypes.length) {
          n++;
          var next = classTypes[n];
          if (next === b) {
            return true;
          }
          if (next !== SP) {
            break;
          }
        }
      }
      if (prev !== SP) {
        break;
      }
    }
  }
  return false;
};
var previousNonSpaceClassType = function(currentIndex, classTypes) {
  var i = currentIndex;
  while (i >= 0) {
    var type = classTypes[i];
    if (type === SP) {
      i--;
    } else {
      return type;
    }
  }
  return 0;
};
var _lineBreakAtIndex = function(codePoints, classTypes, indicies, index, forbiddenBreaks) {
  if (indicies[index] === 0) {
    return BREAK_NOT_ALLOWED$1;
  }
  var currentIndex = index - 1;
  if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
    return BREAK_NOT_ALLOWED$1;
  }
  var beforeIndex = currentIndex - 1;
  var afterIndex = currentIndex + 1;
  var current = classTypes[currentIndex];
  var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
  var next = classTypes[afterIndex];
  if (current === CR$1 && next === LF$1) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
    return BREAK_MANDATORY;
  }
  if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (SPACE$1.indexOf(next) !== -1) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
    return BREAK_ALLOWED$1;
  }
  if (UnicodeTrie$1.get(codePoints[currentIndex]) === ZWJ$1) {
    return BREAK_NOT_ALLOWED$1;
  }
  if ((current === EB || current === EM) && UnicodeTrie$1.get(codePoints[afterIndex]) === ZWJ$1) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (current === WJ || next === WJ) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (current === GL) {
    return BREAK_NOT_ALLOWED$1;
  }
  if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
    return BREAK_NOT_ALLOWED$1;
  }
  if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (current === SP) {
    return BREAK_ALLOWED$1;
  }
  if (current === QU || next === QU) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (next === CB || current === CB) {
    return BREAK_ALLOWED$1;
  }
  if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (before === HL && HYPHEN.indexOf(current) !== -1) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (current === SY && next === HL) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (next === IN) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (ALPHABETICS.indexOf(next) !== -1 && current === NU || ALPHABETICS.indexOf(current) !== -1 && next === NU) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (current === PR && [ID, EB, EM].indexOf(next) !== -1 || [ID, EB, EM].indexOf(current) !== -1 && next === PO) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1 || PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (
    // (PR | PO) × ( OP | HY )? NU
    [PR, PO].indexOf(current) !== -1 && (next === NU || [OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU) || // ( OP | HY ) × NU
    [OP, HY].indexOf(current) !== -1 && next === NU || // NU ×	(NU | SY | IS)
    current === NU && [NU, SY, IS].indexOf(next) !== -1
  ) {
    return BREAK_NOT_ALLOWED$1;
  }
  if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
    var prevIndex = currentIndex;
    while (prevIndex >= 0) {
      var type = classTypes[prevIndex];
      if (type === NU) {
        return BREAK_NOT_ALLOWED$1;
      } else if ([SY, IS].indexOf(type) !== -1) {
        prevIndex--;
      } else {
        break;
      }
    }
  }
  if ([PR, PO].indexOf(next) !== -1) {
    var prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
    while (prevIndex >= 0) {
      var type = classTypes[prevIndex];
      if (type === NU) {
        return BREAK_NOT_ALLOWED$1;
      } else if ([SY, IS].indexOf(type) !== -1) {
        prevIndex--;
      } else {
        break;
      }
    }
  }
  if (JL === current && [JL, JV, H2, H3].indexOf(next) !== -1 || [JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1 || [JT, H3].indexOf(current) !== -1 && next === JT) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1 || KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (ALPHABETICS.concat(NU).indexOf(current) !== -1 && next === OP && ea_OP.indexOf(codePoints[afterIndex]) === -1 || ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP) {
    return BREAK_NOT_ALLOWED$1;
  }
  if (current === RI$1 && next === RI$1) {
    var i = indicies[currentIndex];
    var count = 1;
    while (i > 0) {
      i--;
      if (classTypes[i] === RI$1) {
        count++;
      } else {
        break;
      }
    }
    if (count % 2 !== 0) {
      return BREAK_NOT_ALLOWED$1;
    }
  }
  if (current === EB && next === EM) {
    return BREAK_NOT_ALLOWED$1;
  }
  return BREAK_ALLOWED$1;
};
var cssFormattedClasses = function(codePoints, options) {
  if (!options) {
    options = { lineBreak: "normal", wordBreak: "normal" };
  }
  var _a = codePointsToCharacterClasses(codePoints, options.lineBreak), indicies = _a[0], classTypes = _a[1], isLetterNumber = _a[2];
  if (options.wordBreak === "break-all" || options.wordBreak === "break-word") {
    classTypes = classTypes.map(function(type) {
      return [NU, AL, SA].indexOf(type) !== -1 ? ID : type;
    });
  }
  var forbiddenBreakpoints = options.wordBreak === "keep-all" ? isLetterNumber.map(function(letterNumber, i) {
    return letterNumber && codePoints[i] >= 19968 && codePoints[i] <= 40959;
  }) : void 0;
  return [indicies, classTypes, forbiddenBreakpoints];
};
var Break = (
  /** @class */
  (function() {
    function Break2(codePoints, lineBreak2, start, end) {
      this.codePoints = codePoints;
      this.required = lineBreak2 === BREAK_MANDATORY;
      this.start = start;
      this.end = end;
    }
    Break2.prototype.slice = function() {
      return fromCodePoint$1.apply(void 0, this.codePoints.slice(this.start, this.end));
    };
    return Break2;
  })()
);
var LineBreaker = function(str, options) {
  var codePoints = toCodePoints$1(str);
  var _a = cssFormattedClasses(codePoints, options), indicies = _a[0], classTypes = _a[1], forbiddenBreakpoints = _a[2];
  var length = codePoints.length;
  var lastEnd = 0;
  var nextIndex = 0;
  return {
    next: function() {
      if (nextIndex >= length) {
        return { done: true, value: null };
      }
      var lineBreak2 = BREAK_NOT_ALLOWED$1;
      while (nextIndex < length && (lineBreak2 = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) === BREAK_NOT_ALLOWED$1) {
      }
      if (lineBreak2 !== BREAK_NOT_ALLOWED$1 || nextIndex === length) {
        var value = new Break(codePoints, lineBreak2, lastEnd, nextIndex);
        lastEnd = nextIndex;
        return { value, done: false };
      }
      return { done: true, value: null };
    }
  };
};
var FLAG_UNRESTRICTED = 1 << 0;
var FLAG_ID = 1 << 1;
var FLAG_INTEGER = 1 << 2;
var FLAG_NUMBER = 1 << 3;
var LINE_FEED = 10;
var SOLIDUS = 47;
var REVERSE_SOLIDUS = 92;
var CHARACTER_TABULATION = 9;
var SPACE = 32;
var QUOTATION_MARK = 34;
var EQUALS_SIGN = 61;
var NUMBER_SIGN = 35;
var DOLLAR_SIGN = 36;
var PERCENTAGE_SIGN = 37;
var APOSTROPHE = 39;
var LEFT_PARENTHESIS = 40;
var RIGHT_PARENTHESIS = 41;
var LOW_LINE = 95;
var HYPHEN_MINUS = 45;
var EXCLAMATION_MARK = 33;
var LESS_THAN_SIGN = 60;
var GREATER_THAN_SIGN = 62;
var COMMERCIAL_AT = 64;
var LEFT_SQUARE_BRACKET = 91;
var RIGHT_SQUARE_BRACKET = 93;
var CIRCUMFLEX_ACCENT = 61;
var LEFT_CURLY_BRACKET = 123;
var QUESTION_MARK = 63;
var RIGHT_CURLY_BRACKET = 125;
var VERTICAL_LINE = 124;
var TILDE = 126;
var CONTROL = 128;
var REPLACEMENT_CHARACTER = 65533;
var ASTERISK = 42;
var PLUS_SIGN = 43;
var COMMA = 44;
var COLON = 58;
var SEMICOLON = 59;
var FULL_STOP = 46;
var NULL = 0;
var BACKSPACE = 8;
var LINE_TABULATION = 11;
var SHIFT_OUT = 14;
var INFORMATION_SEPARATOR_ONE = 31;
var DELETE = 127;
var EOF = -1;
var ZERO = 48;
var a = 97;
var e = 101;
var f = 102;
var u = 117;
var z = 122;
var A = 65;
var E = 69;
var F = 70;
var U = 85;
var Z = 90;
var isDigit = function(codePoint) {
  return codePoint >= ZERO && codePoint <= 57;
};
var isSurrogateCodePoint = function(codePoint) {
  return codePoint >= 55296 && codePoint <= 57343;
};
var isHex = function(codePoint) {
  return isDigit(codePoint) || codePoint >= A && codePoint <= F || codePoint >= a && codePoint <= f;
};
var isLowerCaseLetter = function(codePoint) {
  return codePoint >= a && codePoint <= z;
};
var isUpperCaseLetter = function(codePoint) {
  return codePoint >= A && codePoint <= Z;
};
var isLetter = function(codePoint) {
  return isLowerCaseLetter(codePoint) || isUpperCaseLetter(codePoint);
};
var isNonASCIICodePoint = function(codePoint) {
  return codePoint >= CONTROL;
};
var isWhiteSpace = function(codePoint) {
  return codePoint === LINE_FEED || codePoint === CHARACTER_TABULATION || codePoint === SPACE;
};
var isNameStartCodePoint = function(codePoint) {
  return isLetter(codePoint) || isNonASCIICodePoint(codePoint) || codePoint === LOW_LINE;
};
var isNameCodePoint = function(codePoint) {
  return isNameStartCodePoint(codePoint) || isDigit(codePoint) || codePoint === HYPHEN_MINUS;
};
var isNonPrintableCodePoint = function(codePoint) {
  return codePoint >= NULL && codePoint <= BACKSPACE || codePoint === LINE_TABULATION || codePoint >= SHIFT_OUT && codePoint <= INFORMATION_SEPARATOR_ONE || codePoint === DELETE;
};
var isValidEscape = function(c1, c2) {
  if (c1 !== REVERSE_SOLIDUS) {
    return false;
  }
  return c2 !== LINE_FEED;
};
var isIdentifierStart = function(c1, c2, c3) {
  if (c1 === HYPHEN_MINUS) {
    return isNameStartCodePoint(c2) || isValidEscape(c2, c3);
  } else if (isNameStartCodePoint(c1)) {
    return true;
  } else if (c1 === REVERSE_SOLIDUS && isValidEscape(c1, c2)) {
    return true;
  }
  return false;
};
var isNumberStart = function(c1, c2, c3) {
  if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
    if (isDigit(c2)) {
      return true;
    }
    return c2 === FULL_STOP && isDigit(c3);
  }
  if (c1 === FULL_STOP) {
    return isDigit(c2);
  }
  return isDigit(c1);
};
var stringToNumber = function(codePoints) {
  var c = 0;
  var sign = 1;
  if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
    if (codePoints[c] === HYPHEN_MINUS) {
      sign = -1;
    }
    c++;
  }
  var integers = [];
  while (isDigit(codePoints[c])) {
    integers.push(codePoints[c++]);
  }
  var int = integers.length ? parseInt(fromCodePoint$1.apply(void 0, integers), 10) : 0;
  if (codePoints[c] === FULL_STOP) {
    c++;
  }
  var fraction = [];
  while (isDigit(codePoints[c])) {
    fraction.push(codePoints[c++]);
  }
  var fracd = fraction.length;
  var frac = fracd ? parseInt(fromCodePoint$1.apply(void 0, fraction), 10) : 0;
  if (codePoints[c] === E || codePoints[c] === e) {
    c++;
  }
  var expsign = 1;
  if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
    if (codePoints[c] === HYPHEN_MINUS) {
      expsign = -1;
    }
    c++;
  }
  var exponent = [];
  while (isDigit(codePoints[c])) {
    exponent.push(codePoints[c++]);
  }
  var exp = exponent.length ? parseInt(fromCodePoint$1.apply(void 0, exponent), 10) : 0;
  return sign * (int + frac * Math.pow(10, -fracd)) * Math.pow(10, expsign * exp);
};
var LEFT_PARENTHESIS_TOKEN = {
  type: 2
  /* LEFT_PARENTHESIS_TOKEN */
};
var RIGHT_PARENTHESIS_TOKEN = {
  type: 3
  /* RIGHT_PARENTHESIS_TOKEN */
};
var COMMA_TOKEN = {
  type: 4
  /* COMMA_TOKEN */
};
var SUFFIX_MATCH_TOKEN = {
  type: 13
  /* SUFFIX_MATCH_TOKEN */
};
var PREFIX_MATCH_TOKEN = {
  type: 8
  /* PREFIX_MATCH_TOKEN */
};
var COLUMN_TOKEN = {
  type: 21
  /* COLUMN_TOKEN */
};
var DASH_MATCH_TOKEN = {
  type: 9
  /* DASH_MATCH_TOKEN */
};
var INCLUDE_MATCH_TOKEN = {
  type: 10
  /* INCLUDE_MATCH_TOKEN */
};
var LEFT_CURLY_BRACKET_TOKEN = {
  type: 11
  /* LEFT_CURLY_BRACKET_TOKEN */
};
var RIGHT_CURLY_BRACKET_TOKEN = {
  type: 12
  /* RIGHT_CURLY_BRACKET_TOKEN */
};
var SUBSTRING_MATCH_TOKEN = {
  type: 14
  /* SUBSTRING_MATCH_TOKEN */
};
var BAD_URL_TOKEN = {
  type: 23
  /* BAD_URL_TOKEN */
};
var BAD_STRING_TOKEN = {
  type: 1
  /* BAD_STRING_TOKEN */
};
var CDO_TOKEN = {
  type: 25
  /* CDO_TOKEN */
};
var CDC_TOKEN = {
  type: 24
  /* CDC_TOKEN */
};
var COLON_TOKEN = {
  type: 26
  /* COLON_TOKEN */
};
var SEMICOLON_TOKEN = {
  type: 27
  /* SEMICOLON_TOKEN */
};
var LEFT_SQUARE_BRACKET_TOKEN = {
  type: 28
  /* LEFT_SQUARE_BRACKET_TOKEN */
};
var RIGHT_SQUARE_BRACKET_TOKEN = {
  type: 29
  /* RIGHT_SQUARE_BRACKET_TOKEN */
};
var WHITESPACE_TOKEN = {
  type: 31
  /* WHITESPACE_TOKEN */
};
var EOF_TOKEN = {
  type: 32
  /* EOF_TOKEN */
};
var Tokenizer = (
  /** @class */
  (function() {
    function Tokenizer2() {
      this._value = [];
    }
    Tokenizer2.prototype.write = function(chunk) {
      this._value = this._value.concat(toCodePoints$1(chunk));
    };
    Tokenizer2.prototype.read = function() {
      var tokens = [];
      var token = this.consumeToken();
      while (token !== EOF_TOKEN) {
        tokens.push(token);
        token = this.consumeToken();
      }
      return tokens;
    };
    Tokenizer2.prototype.consumeToken = function() {
      var codePoint = this.consumeCodePoint();
      switch (codePoint) {
        case QUOTATION_MARK:
          return this.consumeStringToken(QUOTATION_MARK);
        case NUMBER_SIGN:
          var c1 = this.peekCodePoint(0);
          var c2 = this.peekCodePoint(1);
          var c3 = this.peekCodePoint(2);
          if (isNameCodePoint(c1) || isValidEscape(c2, c3)) {
            var flags = isIdentifierStart(c1, c2, c3) ? FLAG_ID : FLAG_UNRESTRICTED;
            var value = this.consumeName();
            return { type: 5, value, flags };
          }
          break;
        case DOLLAR_SIGN:
          if (this.peekCodePoint(0) === EQUALS_SIGN) {
            this.consumeCodePoint();
            return SUFFIX_MATCH_TOKEN;
          }
          break;
        case APOSTROPHE:
          return this.consumeStringToken(APOSTROPHE);
        case LEFT_PARENTHESIS:
          return LEFT_PARENTHESIS_TOKEN;
        case RIGHT_PARENTHESIS:
          return RIGHT_PARENTHESIS_TOKEN;
        case ASTERISK:
          if (this.peekCodePoint(0) === EQUALS_SIGN) {
            this.consumeCodePoint();
            return SUBSTRING_MATCH_TOKEN;
          }
          break;
        case PLUS_SIGN:
          if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeNumericToken();
          }
          break;
        case COMMA:
          return COMMA_TOKEN;
        case HYPHEN_MINUS:
          var e1 = codePoint;
          var e2 = this.peekCodePoint(0);
          var e3 = this.peekCodePoint(1);
          if (isNumberStart(e1, e2, e3)) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeNumericToken();
          }
          if (isIdentifierStart(e1, e2, e3)) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeIdentLikeToken();
          }
          if (e2 === HYPHEN_MINUS && e3 === GREATER_THAN_SIGN) {
            this.consumeCodePoint();
            this.consumeCodePoint();
            return CDC_TOKEN;
          }
          break;
        case FULL_STOP:
          if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeNumericToken();
          }
          break;
        case SOLIDUS:
          if (this.peekCodePoint(0) === ASTERISK) {
            this.consumeCodePoint();
            while (true) {
              var c = this.consumeCodePoint();
              if (c === ASTERISK) {
                c = this.consumeCodePoint();
                if (c === SOLIDUS) {
                  return this.consumeToken();
                }
              }
              if (c === EOF) {
                return this.consumeToken();
              }
            }
          }
          break;
        case COLON:
          return COLON_TOKEN;
        case SEMICOLON:
          return SEMICOLON_TOKEN;
        case LESS_THAN_SIGN:
          if (this.peekCodePoint(0) === EXCLAMATION_MARK && this.peekCodePoint(1) === HYPHEN_MINUS && this.peekCodePoint(2) === HYPHEN_MINUS) {
            this.consumeCodePoint();
            this.consumeCodePoint();
            return CDO_TOKEN;
          }
          break;
        case COMMERCIAL_AT:
          var a1 = this.peekCodePoint(0);
          var a2 = this.peekCodePoint(1);
          var a3 = this.peekCodePoint(2);
          if (isIdentifierStart(a1, a2, a3)) {
            var value = this.consumeName();
            return { type: 7, value };
          }
          break;
        case LEFT_SQUARE_BRACKET:
          return LEFT_SQUARE_BRACKET_TOKEN;
        case REVERSE_SOLIDUS:
          if (isValidEscape(codePoint, this.peekCodePoint(0))) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeIdentLikeToken();
          }
          break;
        case RIGHT_SQUARE_BRACKET:
          return RIGHT_SQUARE_BRACKET_TOKEN;
        case CIRCUMFLEX_ACCENT:
          if (this.peekCodePoint(0) === EQUALS_SIGN) {
            this.consumeCodePoint();
            return PREFIX_MATCH_TOKEN;
          }
          break;
        case LEFT_CURLY_BRACKET:
          return LEFT_CURLY_BRACKET_TOKEN;
        case RIGHT_CURLY_BRACKET:
          return RIGHT_CURLY_BRACKET_TOKEN;
        case u:
        case U:
          var u1 = this.peekCodePoint(0);
          var u2 = this.peekCodePoint(1);
          if (u1 === PLUS_SIGN && (isHex(u2) || u2 === QUESTION_MARK)) {
            this.consumeCodePoint();
            this.consumeUnicodeRangeToken();
          }
          this.reconsumeCodePoint(codePoint);
          return this.consumeIdentLikeToken();
        case VERTICAL_LINE:
          if (this.peekCodePoint(0) === EQUALS_SIGN) {
            this.consumeCodePoint();
            return DASH_MATCH_TOKEN;
          }
          if (this.peekCodePoint(0) === VERTICAL_LINE) {
            this.consumeCodePoint();
            return COLUMN_TOKEN;
          }
          break;
        case TILDE:
          if (this.peekCodePoint(0) === EQUALS_SIGN) {
            this.consumeCodePoint();
            return INCLUDE_MATCH_TOKEN;
          }
          break;
        case EOF:
          return EOF_TOKEN;
      }
      if (isWhiteSpace(codePoint)) {
        this.consumeWhiteSpace();
        return WHITESPACE_TOKEN;
      }
      if (isDigit(codePoint)) {
        this.reconsumeCodePoint(codePoint);
        return this.consumeNumericToken();
      }
      if (isNameStartCodePoint(codePoint)) {
        this.reconsumeCodePoint(codePoint);
        return this.consumeIdentLikeToken();
      }
      return { type: 6, value: fromCodePoint$1(codePoint) };
    };
    Tokenizer2.prototype.consumeCodePoint = function() {
      var value = this._value.shift();
      return typeof value === "undefined" ? -1 : value;
    };
    Tokenizer2.prototype.reconsumeCodePoint = function(codePoint) {
      this._value.unshift(codePoint);
    };
    Tokenizer2.prototype.peekCodePoint = function(delta) {
      if (delta >= this._value.length) {
        return -1;
      }
      return this._value[delta];
    };
    Tokenizer2.prototype.consumeUnicodeRangeToken = function() {
      var digits = [];
      var codePoint = this.consumeCodePoint();
      while (isHex(codePoint) && digits.length < 6) {
        digits.push(codePoint);
        codePoint = this.consumeCodePoint();
      }
      var questionMarks = false;
      while (codePoint === QUESTION_MARK && digits.length < 6) {
        digits.push(codePoint);
        codePoint = this.consumeCodePoint();
        questionMarks = true;
      }
      if (questionMarks) {
        var start_1 = parseInt(fromCodePoint$1.apply(void 0, digits.map(function(digit) {
          return digit === QUESTION_MARK ? ZERO : digit;
        })), 16);
        var end = parseInt(fromCodePoint$1.apply(void 0, digits.map(function(digit) {
          return digit === QUESTION_MARK ? F : digit;
        })), 16);
        return { type: 30, start: start_1, end };
      }
      var start = parseInt(fromCodePoint$1.apply(void 0, digits), 16);
      if (this.peekCodePoint(0) === HYPHEN_MINUS && isHex(this.peekCodePoint(1))) {
        this.consumeCodePoint();
        codePoint = this.consumeCodePoint();
        var endDigits = [];
        while (isHex(codePoint) && endDigits.length < 6) {
          endDigits.push(codePoint);
          codePoint = this.consumeCodePoint();
        }
        var end = parseInt(fromCodePoint$1.apply(void 0, endDigits), 16);
        return { type: 30, start, end };
      } else {
        return { type: 30, start, end: start };
      }
    };
    Tokenizer2.prototype.consumeIdentLikeToken = function() {
      var value = this.consumeName();
      if (value.toLowerCase() === "url" && this.peekCodePoint(0) === LEFT_PARENTHESIS) {
        this.consumeCodePoint();
        return this.consumeUrlToken();
      } else if (this.peekCodePoint(0) === LEFT_PARENTHESIS) {
        this.consumeCodePoint();
        return { type: 19, value };
      }
      return { type: 20, value };
    };
    Tokenizer2.prototype.consumeUrlToken = function() {
      var value = [];
      this.consumeWhiteSpace();
      if (this.peekCodePoint(0) === EOF) {
        return { type: 22, value: "" };
      }
      var next = this.peekCodePoint(0);
      if (next === APOSTROPHE || next === QUOTATION_MARK) {
        var stringToken = this.consumeStringToken(this.consumeCodePoint());
        if (stringToken.type === 0) {
          this.consumeWhiteSpace();
          if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
            this.consumeCodePoint();
            return { type: 22, value: stringToken.value };
          }
        }
        this.consumeBadUrlRemnants();
        return BAD_URL_TOKEN;
      }
      while (true) {
        var codePoint = this.consumeCodePoint();
        if (codePoint === EOF || codePoint === RIGHT_PARENTHESIS) {
          return { type: 22, value: fromCodePoint$1.apply(void 0, value) };
        } else if (isWhiteSpace(codePoint)) {
          this.consumeWhiteSpace();
          if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
            this.consumeCodePoint();
            return { type: 22, value: fromCodePoint$1.apply(void 0, value) };
          }
          this.consumeBadUrlRemnants();
          return BAD_URL_TOKEN;
        } else if (codePoint === QUOTATION_MARK || codePoint === APOSTROPHE || codePoint === LEFT_PARENTHESIS || isNonPrintableCodePoint(codePoint)) {
          this.consumeBadUrlRemnants();
          return BAD_URL_TOKEN;
        } else if (codePoint === REVERSE_SOLIDUS) {
          if (isValidEscape(codePoint, this.peekCodePoint(0))) {
            value.push(this.consumeEscapedCodePoint());
          } else {
            this.consumeBadUrlRemnants();
            return BAD_URL_TOKEN;
          }
        } else {
          value.push(codePoint);
        }
      }
    };
    Tokenizer2.prototype.consumeWhiteSpace = function() {
      while (isWhiteSpace(this.peekCodePoint(0))) {
        this.consumeCodePoint();
      }
    };
    Tokenizer2.prototype.consumeBadUrlRemnants = function() {
      while (true) {
        var codePoint = this.consumeCodePoint();
        if (codePoint === RIGHT_PARENTHESIS || codePoint === EOF) {
          return;
        }
        if (isValidEscape(codePoint, this.peekCodePoint(0))) {
          this.consumeEscapedCodePoint();
        }
      }
    };
    Tokenizer2.prototype.consumeStringSlice = function(count) {
      var SLICE_STACK_SIZE = 5e4;
      var value = "";
      while (count > 0) {
        var amount = Math.min(SLICE_STACK_SIZE, count);
        value += fromCodePoint$1.apply(void 0, this._value.splice(0, amount));
        count -= amount;
      }
      this._value.shift();
      return value;
    };
    Tokenizer2.prototype.consumeStringToken = function(endingCodePoint) {
      var value = "";
      var i = 0;
      do {
        var codePoint = this._value[i];
        if (codePoint === EOF || codePoint === void 0 || codePoint === endingCodePoint) {
          value += this.consumeStringSlice(i);
          return { type: 0, value };
        }
        if (codePoint === LINE_FEED) {
          this._value.splice(0, i);
          return BAD_STRING_TOKEN;
        }
        if (codePoint === REVERSE_SOLIDUS) {
          var next = this._value[i + 1];
          if (next !== EOF && next !== void 0) {
            if (next === LINE_FEED) {
              value += this.consumeStringSlice(i);
              i = -1;
              this._value.shift();
            } else if (isValidEscape(codePoint, next)) {
              value += this.consumeStringSlice(i);
              value += fromCodePoint$1(this.consumeEscapedCodePoint());
              i = -1;
            }
          }
        }
        i++;
      } while (true);
    };
    Tokenizer2.prototype.consumeNumber = function() {
      var repr = [];
      var type = FLAG_INTEGER;
      var c1 = this.peekCodePoint(0);
      if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
        repr.push(this.consumeCodePoint());
      }
      while (isDigit(this.peekCodePoint(0))) {
        repr.push(this.consumeCodePoint());
      }
      c1 = this.peekCodePoint(0);
      var c2 = this.peekCodePoint(1);
      if (c1 === FULL_STOP && isDigit(c2)) {
        repr.push(this.consumeCodePoint(), this.consumeCodePoint());
        type = FLAG_NUMBER;
        while (isDigit(this.peekCodePoint(0))) {
          repr.push(this.consumeCodePoint());
        }
      }
      c1 = this.peekCodePoint(0);
      c2 = this.peekCodePoint(1);
      var c3 = this.peekCodePoint(2);
      if ((c1 === E || c1 === e) && ((c2 === PLUS_SIGN || c2 === HYPHEN_MINUS) && isDigit(c3) || isDigit(c2))) {
        repr.push(this.consumeCodePoint(), this.consumeCodePoint());
        type = FLAG_NUMBER;
        while (isDigit(this.peekCodePoint(0))) {
          repr.push(this.consumeCodePoint());
        }
      }
      return [stringToNumber(repr), type];
    };
    Tokenizer2.prototype.consumeNumericToken = function() {
      var _a = this.consumeNumber(), number = _a[0], flags = _a[1];
      var c1 = this.peekCodePoint(0);
      var c2 = this.peekCodePoint(1);
      var c3 = this.peekCodePoint(2);
      if (isIdentifierStart(c1, c2, c3)) {
        var unit = this.consumeName();
        return { type: 15, number, flags, unit };
      }
      if (c1 === PERCENTAGE_SIGN) {
        this.consumeCodePoint();
        return { type: 16, number, flags };
      }
      return { type: 17, number, flags };
    };
    Tokenizer2.prototype.consumeEscapedCodePoint = function() {
      var codePoint = this.consumeCodePoint();
      if (isHex(codePoint)) {
        var hex = fromCodePoint$1(codePoint);
        while (isHex(this.peekCodePoint(0)) && hex.length < 6) {
          hex += fromCodePoint$1(this.consumeCodePoint());
        }
        if (isWhiteSpace(this.peekCodePoint(0))) {
          this.consumeCodePoint();
        }
        var hexCodePoint = parseInt(hex, 16);
        if (hexCodePoint === 0 || isSurrogateCodePoint(hexCodePoint) || hexCodePoint > 1114111) {
          return REPLACEMENT_CHARACTER;
        }
        return hexCodePoint;
      }
      if (codePoint === EOF) {
        return REPLACEMENT_CHARACTER;
      }
      return codePoint;
    };
    Tokenizer2.prototype.consumeName = function() {
      var result = "";
      while (true) {
        var codePoint = this.consumeCodePoint();
        if (isNameCodePoint(codePoint)) {
          result += fromCodePoint$1(codePoint);
        } else if (isValidEscape(codePoint, this.peekCodePoint(0))) {
          result += fromCodePoint$1(this.consumeEscapedCodePoint());
        } else {
          this.reconsumeCodePoint(codePoint);
          return result;
        }
      }
    };
    return Tokenizer2;
  })()
);
var Parser = (
  /** @class */
  (function() {
    function Parser2(tokens) {
      this._tokens = tokens;
    }
    Parser2.create = function(value) {
      var tokenizer = new Tokenizer();
      tokenizer.write(value);
      return new Parser2(tokenizer.read());
    };
    Parser2.parseValue = function(value) {
      return Parser2.create(value).parseComponentValue();
    };
    Parser2.parseValues = function(value) {
      return Parser2.create(value).parseComponentValues();
    };
    Parser2.prototype.parseComponentValue = function() {
      var token = this.consumeToken();
      while (token.type === 31) {
        token = this.consumeToken();
      }
      if (token.type === 32) {
        throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
      }
      this.reconsumeToken(token);
      var value = this.consumeComponentValue();
      do {
        token = this.consumeToken();
      } while (token.type === 31);
      if (token.type === 32) {
        return value;
      }
      throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
    };
    Parser2.prototype.parseComponentValues = function() {
      var values = [];
      while (true) {
        var value = this.consumeComponentValue();
        if (value.type === 32) {
          return values;
        }
        values.push(value);
        values.push();
      }
    };
    Parser2.prototype.consumeComponentValue = function() {
      var token = this.consumeToken();
      switch (token.type) {
        case 11:
        case 28:
        case 2:
          return this.consumeSimpleBlock(token.type);
        case 19:
          return this.consumeFunction(token);
      }
      return token;
    };
    Parser2.prototype.consumeSimpleBlock = function(type) {
      var block = { type, values: [] };
      var token = this.consumeToken();
      while (true) {
        if (token.type === 32 || isEndingTokenFor(token, type)) {
          return block;
        }
        this.reconsumeToken(token);
        block.values.push(this.consumeComponentValue());
        token = this.consumeToken();
      }
    };
    Parser2.prototype.consumeFunction = function(functionToken) {
      var cssFunction = {
        name: functionToken.value,
        values: [],
        type: 18
        /* FUNCTION */
      };
      while (true) {
        var token = this.consumeToken();
        if (token.type === 32 || token.type === 3) {
          return cssFunction;
        }
        this.reconsumeToken(token);
        cssFunction.values.push(this.consumeComponentValue());
      }
    };
    Parser2.prototype.consumeToken = function() {
      var token = this._tokens.shift();
      return typeof token === "undefined" ? EOF_TOKEN : token;
    };
    Parser2.prototype.reconsumeToken = function(token) {
      this._tokens.unshift(token);
    };
    return Parser2;
  })()
);
var isDimensionToken = function(token) {
  return token.type === 15;
};
var isNumberToken = function(token) {
  return token.type === 17;
};
var isIdentToken = function(token) {
  return token.type === 20;
};
var isStringToken = function(token) {
  return token.type === 0;
};
var isIdentWithValue = function(token, value) {
  return isIdentToken(token) && token.value === value;
};
var nonWhiteSpace = function(token) {
  return token.type !== 31;
};
var nonFunctionArgSeparator = function(token) {
  return token.type !== 31 && token.type !== 4;
};
var parseFunctionArgs = function(tokens) {
  var args = [];
  var arg = [];
  tokens.forEach(function(token) {
    if (token.type === 4) {
      if (arg.length === 0) {
        throw new Error("Error parsing function args, zero tokens for arg");
      }
      args.push(arg);
      arg = [];
      return;
    }
    if (token.type !== 31) {
      arg.push(token);
    }
  });
  if (arg.length) {
    args.push(arg);
  }
  return args;
};
var isEndingTokenFor = function(token, type) {
  if (type === 11 && token.type === 12) {
    return true;
  }
  if (type === 28 && token.type === 29) {
    return true;
  }
  return type === 2 && token.type === 3;
};
var isLength = function(token) {
  return token.type === 17 || token.type === 15;
};
var isLengthPercentage = function(token) {
  return token.type === 16 || isLength(token);
};
var parseLengthPercentageTuple = function(tokens) {
  return tokens.length > 1 ? [tokens[0], tokens[1]] : [tokens[0]];
};
var ZERO_LENGTH = {
  type: 17,
  number: 0,
  flags: FLAG_INTEGER
};
var FIFTY_PERCENT = {
  type: 16,
  number: 50,
  flags: FLAG_INTEGER
};
var HUNDRED_PERCENT = {
  type: 16,
  number: 100,
  flags: FLAG_INTEGER
};
var getAbsoluteValueForTuple = function(tuple, width, height) {
  var x = tuple[0], y = tuple[1];
  return [getAbsoluteValue(x, width), getAbsoluteValue(typeof y !== "undefined" ? y : x, height)];
};
var getAbsoluteValue = function(token, parent) {
  if (token.type === 16) {
    return token.number / 100 * parent;
  }
  if (isDimensionToken(token)) {
    switch (token.unit) {
      case "rem":
      case "em":
        return 16 * token.number;
      // TODO use correct font-size
      case "px":
      default:
        return token.number;
    }
  }
  return token.number;
};
var DEG = "deg";
var GRAD = "grad";
var RAD = "rad";
var TURN = "turn";
var angle = {
  name: "angle",
  parse: function(_context, value) {
    if (value.type === 15) {
      switch (value.unit) {
        case DEG:
          return Math.PI * value.number / 180;
        case GRAD:
          return Math.PI / 200 * value.number;
        case RAD:
          return value.number;
        case TURN:
          return Math.PI * 2 * value.number;
      }
    }
    throw new Error("Unsupported angle type");
  }
};
var isAngle = function(value) {
  if (value.type === 15) {
    if (value.unit === DEG || value.unit === GRAD || value.unit === RAD || value.unit === TURN) {
      return true;
    }
  }
  return false;
};
var parseNamedSide = function(tokens) {
  var sideOrCorner = tokens.filter(isIdentToken).map(function(ident) {
    return ident.value;
  }).join(" ");
  switch (sideOrCorner) {
    case "to bottom right":
    case "to right bottom":
    case "left top":
    case "top left":
      return [ZERO_LENGTH, ZERO_LENGTH];
    case "to top":
    case "bottom":
      return deg(0);
    case "to bottom left":
    case "to left bottom":
    case "right top":
    case "top right":
      return [ZERO_LENGTH, HUNDRED_PERCENT];
    case "to right":
    case "left":
      return deg(90);
    case "to top left":
    case "to left top":
    case "right bottom":
    case "bottom right":
      return [HUNDRED_PERCENT, HUNDRED_PERCENT];
    case "to bottom":
    case "top":
      return deg(180);
    case "to top right":
    case "to right top":
    case "left bottom":
    case "bottom left":
      return [HUNDRED_PERCENT, ZERO_LENGTH];
    case "to left":
    case "right":
      return deg(270);
  }
  return 0;
};
var deg = function(deg2) {
  return Math.PI * deg2 / 180;
};
var color$1 = {
  name: "color",
  parse: function(context, value) {
    if (value.type === 18) {
      var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
      if (typeof colorFunction === "undefined") {
        throw new Error('Attempting to parse an unsupported color function "' + value.name + '"');
      }
      return colorFunction(context, value.values);
    }
    if (value.type === 5) {
      if (value.value.length === 3) {
        var r = value.value.substring(0, 1);
        var g = value.value.substring(1, 2);
        var b = value.value.substring(2, 3);
        return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1);
      }
      if (value.value.length === 4) {
        var r = value.value.substring(0, 1);
        var g = value.value.substring(1, 2);
        var b = value.value.substring(2, 3);
        var a2 = value.value.substring(3, 4);
        return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), parseInt(a2 + a2, 16) / 255);
      }
      if (value.value.length === 6) {
        var r = value.value.substring(0, 2);
        var g = value.value.substring(2, 4);
        var b = value.value.substring(4, 6);
        return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
      }
      if (value.value.length === 8) {
        var r = value.value.substring(0, 2);
        var g = value.value.substring(2, 4);
        var b = value.value.substring(4, 6);
        var a2 = value.value.substring(6, 8);
        return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a2, 16) / 255);
      }
    }
    if (value.type === 20) {
      var namedColor = COLORS[value.value.toUpperCase()];
      if (typeof namedColor !== "undefined") {
        return namedColor;
      }
    }
    return COLORS.TRANSPARENT;
  }
};
var isTransparent = function(color2) {
  return (255 & color2) === 0;
};
var asString = function(color2) {
  var alpha = 255 & color2;
  var blue = 255 & color2 >> 8;
  var green = 255 & color2 >> 16;
  var red = 255 & color2 >> 24;
  return alpha < 255 ? "rgba(" + red + "," + green + "," + blue + "," + alpha / 255 + ")" : "rgb(" + red + "," + green + "," + blue + ")";
};
var pack = function(r, g, b, a2) {
  return (r << 24 | g << 16 | b << 8 | Math.round(a2 * 255) << 0) >>> 0;
};
var getTokenColorValue = function(token, i) {
  if (token.type === 17) {
    return token.number;
  }
  if (token.type === 16) {
    var max = i === 3 ? 1 : 255;
    return i === 3 ? token.number / 100 * max : Math.round(token.number / 100 * max);
  }
  return 0;
};
var rgb = function(_context, args) {
  var tokens = args.filter(nonFunctionArgSeparator);
  if (tokens.length === 3) {
    var _a = tokens.map(getTokenColorValue), r = _a[0], g = _a[1], b = _a[2];
    return pack(r, g, b, 1);
  }
  if (tokens.length === 4) {
    var _b = tokens.map(getTokenColorValue), r = _b[0], g = _b[1], b = _b[2], a2 = _b[3];
    return pack(r, g, b, a2);
  }
  return 0;
};
function hue2rgb(t1, t2, hue) {
  if (hue < 0) {
    hue += 1;
  }
  if (hue >= 1) {
    hue -= 1;
  }
  if (hue < 1 / 6) {
    return (t2 - t1) * hue * 6 + t1;
  } else if (hue < 1 / 2) {
    return t2;
  } else if (hue < 2 / 3) {
    return (t2 - t1) * 6 * (2 / 3 - hue) + t1;
  } else {
    return t1;
  }
}
var hsl = function(context, args) {
  var tokens = args.filter(nonFunctionArgSeparator);
  var hue = tokens[0], saturation = tokens[1], lightness = tokens[2], alpha = tokens[3];
  var h = (hue.type === 17 ? deg(hue.number) : angle.parse(context, hue)) / (Math.PI * 2);
  var s = isLengthPercentage(saturation) ? saturation.number / 100 : 0;
  var l = isLengthPercentage(lightness) ? lightness.number / 100 : 0;
  var a2 = typeof alpha !== "undefined" && isLengthPercentage(alpha) ? getAbsoluteValue(alpha, 1) : 1;
  if (s === 0) {
    return pack(l * 255, l * 255, l * 255, 1);
  }
  var t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  var t1 = l * 2 - t2;
  var r = hue2rgb(t1, t2, h + 1 / 3);
  var g = hue2rgb(t1, t2, h);
  var b = hue2rgb(t1, t2, h - 1 / 3);
  return pack(r * 255, g * 255, b * 255, a2);
};
var SUPPORTED_COLOR_FUNCTIONS = {
  hsl,
  hsla: hsl,
  rgb,
  rgba: rgb
};
var parseColor = function(context, value) {
  return color$1.parse(context, Parser.create(value).parseComponentValue());
};
var COLORS = {
  ALICEBLUE: 4042850303,
  ANTIQUEWHITE: 4209760255,
  AQUA: 16777215,
  AQUAMARINE: 2147472639,
  AZURE: 4043309055,
  BEIGE: 4126530815,
  BISQUE: 4293182719,
  BLACK: 255,
  BLANCHEDALMOND: 4293643775,
  BLUE: 65535,
  BLUEVIOLET: 2318131967,
  BROWN: 2771004159,
  BURLYWOOD: 3736635391,
  CADETBLUE: 1604231423,
  CHARTREUSE: 2147418367,
  CHOCOLATE: 3530104575,
  CORAL: 4286533887,
  CORNFLOWERBLUE: 1687547391,
  CORNSILK: 4294499583,
  CRIMSON: 3692313855,
  CYAN: 16777215,
  DARKBLUE: 35839,
  DARKCYAN: 9145343,
  DARKGOLDENROD: 3095837695,
  DARKGRAY: 2846468607,
  DARKGREEN: 6553855,
  DARKGREY: 2846468607,
  DARKKHAKI: 3182914559,
  DARKMAGENTA: 2332068863,
  DARKOLIVEGREEN: 1433087999,
  DARKORANGE: 4287365375,
  DARKORCHID: 2570243327,
  DARKRED: 2332033279,
  DARKSALMON: 3918953215,
  DARKSEAGREEN: 2411499519,
  DARKSLATEBLUE: 1211993087,
  DARKSLATEGRAY: 793726975,
  DARKSLATEGREY: 793726975,
  DARKTURQUOISE: 13554175,
  DARKVIOLET: 2483082239,
  DEEPPINK: 4279538687,
  DEEPSKYBLUE: 12582911,
  DIMGRAY: 1768516095,
  DIMGREY: 1768516095,
  DODGERBLUE: 512819199,
  FIREBRICK: 2988581631,
  FLORALWHITE: 4294635775,
  FORESTGREEN: 579543807,
  FUCHSIA: 4278255615,
  GAINSBORO: 3705462015,
  GHOSTWHITE: 4177068031,
  GOLD: 4292280575,
  GOLDENROD: 3668254975,
  GRAY: 2155905279,
  GREEN: 8388863,
  GREENYELLOW: 2919182335,
  GREY: 2155905279,
  HONEYDEW: 4043305215,
  HOTPINK: 4285117695,
  INDIANRED: 3445382399,
  INDIGO: 1258324735,
  IVORY: 4294963455,
  KHAKI: 4041641215,
  LAVENDER: 3873897215,
  LAVENDERBLUSH: 4293981695,
  LAWNGREEN: 2096890111,
  LEMONCHIFFON: 4294626815,
  LIGHTBLUE: 2916673279,
  LIGHTCORAL: 4034953471,
  LIGHTCYAN: 3774873599,
  LIGHTGOLDENRODYELLOW: 4210742015,
  LIGHTGRAY: 3553874943,
  LIGHTGREEN: 2431553791,
  LIGHTGREY: 3553874943,
  LIGHTPINK: 4290167295,
  LIGHTSALMON: 4288707327,
  LIGHTSEAGREEN: 548580095,
  LIGHTSKYBLUE: 2278488831,
  LIGHTSLATEGRAY: 2005441023,
  LIGHTSLATEGREY: 2005441023,
  LIGHTSTEELBLUE: 2965692159,
  LIGHTYELLOW: 4294959359,
  LIME: 16711935,
  LIMEGREEN: 852308735,
  LINEN: 4210091775,
  MAGENTA: 4278255615,
  MAROON: 2147483903,
  MEDIUMAQUAMARINE: 1724754687,
  MEDIUMBLUE: 52735,
  MEDIUMORCHID: 3126187007,
  MEDIUMPURPLE: 2473647103,
  MEDIUMSEAGREEN: 1018393087,
  MEDIUMSLATEBLUE: 2070474495,
  MEDIUMSPRINGGREEN: 16423679,
  MEDIUMTURQUOISE: 1221709055,
  MEDIUMVIOLETRED: 3340076543,
  MIDNIGHTBLUE: 421097727,
  MINTCREAM: 4127193855,
  MISTYROSE: 4293190143,
  MOCCASIN: 4293178879,
  NAVAJOWHITE: 4292783615,
  NAVY: 33023,
  OLDLACE: 4260751103,
  OLIVE: 2155872511,
  OLIVEDRAB: 1804477439,
  ORANGE: 4289003775,
  ORANGERED: 4282712319,
  ORCHID: 3664828159,
  PALEGOLDENROD: 4008225535,
  PALEGREEN: 2566625535,
  PALETURQUOISE: 2951671551,
  PALEVIOLETRED: 3681588223,
  PAPAYAWHIP: 4293907967,
  PEACHPUFF: 4292524543,
  PERU: 3448061951,
  PINK: 4290825215,
  PLUM: 3718307327,
  POWDERBLUE: 2967529215,
  PURPLE: 2147516671,
  REBECCAPURPLE: 1714657791,
  RED: 4278190335,
  ROSYBROWN: 3163525119,
  ROYALBLUE: 1097458175,
  SADDLEBROWN: 2336560127,
  SALMON: 4202722047,
  SANDYBROWN: 4104413439,
  SEAGREEN: 780883967,
  SEASHELL: 4294307583,
  SIENNA: 2689740287,
  SILVER: 3233857791,
  SKYBLUE: 2278484991,
  SLATEBLUE: 1784335871,
  SLATEGRAY: 1887473919,
  SLATEGREY: 1887473919,
  SNOW: 4294638335,
  SPRINGGREEN: 16744447,
  STEELBLUE: 1182971135,
  TAN: 3535047935,
  TEAL: 8421631,
  THISTLE: 3636451583,
  TOMATO: 4284696575,
  TRANSPARENT: 0,
  TURQUOISE: 1088475391,
  VIOLET: 4001558271,
  WHEAT: 4125012991,
  WHITE: 4294967295,
  WHITESMOKE: 4126537215,
  YELLOW: 4294902015,
  YELLOWGREEN: 2597139199
};
var backgroundClip = {
  name: "background-clip",
  initialValue: "border-box",
  prefix: false,
  type: 1,
  parse: function(_context, tokens) {
    return tokens.map(function(token) {
      if (isIdentToken(token)) {
        switch (token.value) {
          case "padding-box":
            return 1;
          case "content-box":
            return 2;
        }
      }
      return 0;
    });
  }
};
var backgroundColor = {
  name: "background-color",
  initialValue: "transparent",
  prefix: false,
  type: 3,
  format: "color"
};
var parseColorStop = function(context, args) {
  var color2 = color$1.parse(context, args[0]);
  var stop = args[1];
  return stop && isLengthPercentage(stop) ? { color: color2, stop } : { color: color2, stop: null };
};
var processColorStops = function(stops, lineLength) {
  var first = stops[0];
  var last = stops[stops.length - 1];
  if (first.stop === null) {
    first.stop = ZERO_LENGTH;
  }
  if (last.stop === null) {
    last.stop = HUNDRED_PERCENT;
  }
  var processStops = [];
  var previous = 0;
  for (var i = 0; i < stops.length; i++) {
    var stop_1 = stops[i].stop;
    if (stop_1 !== null) {
      var absoluteValue = getAbsoluteValue(stop_1, lineLength);
      if (absoluteValue > previous) {
        processStops.push(absoluteValue);
      } else {
        processStops.push(previous);
      }
      previous = absoluteValue;
    } else {
      processStops.push(null);
    }
  }
  var gapBegin = null;
  for (var i = 0; i < processStops.length; i++) {
    var stop_2 = processStops[i];
    if (stop_2 === null) {
      if (gapBegin === null) {
        gapBegin = i;
      }
    } else if (gapBegin !== null) {
      var gapLength = i - gapBegin;
      var beforeGap = processStops[gapBegin - 1];
      var gapValue = (stop_2 - beforeGap) / (gapLength + 1);
      for (var g = 1; g <= gapLength; g++) {
        processStops[gapBegin + g - 1] = gapValue * g;
      }
      gapBegin = null;
    }
  }
  return stops.map(function(_a, i2) {
    var color2 = _a.color;
    return { color: color2, stop: Math.max(Math.min(1, processStops[i2] / lineLength), 0) };
  });
};
var getAngleFromCorner = function(corner, width, height) {
  var centerX = width / 2;
  var centerY = height / 2;
  var x = getAbsoluteValue(corner[0], width) - centerX;
  var y = centerY - getAbsoluteValue(corner[1], height);
  return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
};
var calculateGradientDirection = function(angle2, width, height) {
  var radian = typeof angle2 === "number" ? angle2 : getAngleFromCorner(angle2, width, height);
  var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
  var halfWidth = width / 2;
  var halfHeight = height / 2;
  var halfLineLength = lineLength / 2;
  var yDiff = Math.sin(radian - Math.PI / 2) * halfLineLength;
  var xDiff = Math.cos(radian - Math.PI / 2) * halfLineLength;
  return [lineLength, halfWidth - xDiff, halfWidth + xDiff, halfHeight - yDiff, halfHeight + yDiff];
};
var distance = function(a2, b) {
  return Math.sqrt(a2 * a2 + b * b);
};
var findCorner = function(width, height, x, y, closest) {
  var corners = [
    [0, 0],
    [0, height],
    [width, 0],
    [width, height]
  ];
  return corners.reduce(function(stat, corner) {
    var cx = corner[0], cy = corner[1];
    var d = distance(x - cx, y - cy);
    if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
      return {
        optimumCorner: corner,
        optimumDistance: d
      };
    }
    return stat;
  }, {
    optimumDistance: closest ? Infinity : -Infinity,
    optimumCorner: null
  }).optimumCorner;
};
var calculateRadius = function(gradient, x, y, width, height) {
  var rx = 0;
  var ry = 0;
  switch (gradient.size) {
    case 0:
      if (gradient.shape === 0) {
        rx = ry = Math.min(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
      } else if (gradient.shape === 1) {
        rx = Math.min(Math.abs(x), Math.abs(x - width));
        ry = Math.min(Math.abs(y), Math.abs(y - height));
      }
      break;
    case 2:
      if (gradient.shape === 0) {
        rx = ry = Math.min(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
      } else if (gradient.shape === 1) {
        var c = Math.min(Math.abs(y), Math.abs(y - height)) / Math.min(Math.abs(x), Math.abs(x - width));
        var _a = findCorner(width, height, x, y, true), cx = _a[0], cy = _a[1];
        rx = distance(cx - x, (cy - y) / c);
        ry = c * rx;
      }
      break;
    case 1:
      if (gradient.shape === 0) {
        rx = ry = Math.max(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
      } else if (gradient.shape === 1) {
        rx = Math.max(Math.abs(x), Math.abs(x - width));
        ry = Math.max(Math.abs(y), Math.abs(y - height));
      }
      break;
    case 3:
      if (gradient.shape === 0) {
        rx = ry = Math.max(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
      } else if (gradient.shape === 1) {
        var c = Math.max(Math.abs(y), Math.abs(y - height)) / Math.max(Math.abs(x), Math.abs(x - width));
        var _b = findCorner(width, height, x, y, false), cx = _b[0], cy = _b[1];
        rx = distance(cx - x, (cy - y) / c);
        ry = c * rx;
      }
      break;
  }
  if (Array.isArray(gradient.size)) {
    rx = getAbsoluteValue(gradient.size[0], width);
    ry = gradient.size.length === 2 ? getAbsoluteValue(gradient.size[1], height) : rx;
  }
  return [rx, ry];
};
var linearGradient = function(context, tokens) {
  var angle$1 = deg(180);
  var stops = [];
  parseFunctionArgs(tokens).forEach(function(arg, i) {
    if (i === 0) {
      var firstToken = arg[0];
      if (firstToken.type === 20 && firstToken.value === "to") {
        angle$1 = parseNamedSide(arg);
        return;
      } else if (isAngle(firstToken)) {
        angle$1 = angle.parse(context, firstToken);
        return;
      }
    }
    var colorStop = parseColorStop(context, arg);
    stops.push(colorStop);
  });
  return {
    angle: angle$1,
    stops,
    type: 1
    /* LINEAR_GRADIENT */
  };
};
var prefixLinearGradient = function(context, tokens) {
  var angle$1 = deg(180);
  var stops = [];
  parseFunctionArgs(tokens).forEach(function(arg, i) {
    if (i === 0) {
      var firstToken = arg[0];
      if (firstToken.type === 20 && ["top", "left", "right", "bottom"].indexOf(firstToken.value) !== -1) {
        angle$1 = parseNamedSide(arg);
        return;
      } else if (isAngle(firstToken)) {
        angle$1 = (angle.parse(context, firstToken) + deg(270)) % deg(360);
        return;
      }
    }
    var colorStop = parseColorStop(context, arg);
    stops.push(colorStop);
  });
  return {
    angle: angle$1,
    stops,
    type: 1
    /* LINEAR_GRADIENT */
  };
};
var webkitGradient = function(context, tokens) {
  var angle2 = deg(180);
  var stops = [];
  var type = 1;
  var shape = 0;
  var size = 3;
  var position2 = [];
  parseFunctionArgs(tokens).forEach(function(arg, i) {
    var firstToken = arg[0];
    if (i === 0) {
      if (isIdentToken(firstToken) && firstToken.value === "linear") {
        type = 1;
        return;
      } else if (isIdentToken(firstToken) && firstToken.value === "radial") {
        type = 2;
        return;
      }
    }
    if (firstToken.type === 18) {
      if (firstToken.name === "from") {
        var color2 = color$1.parse(context, firstToken.values[0]);
        stops.push({ stop: ZERO_LENGTH, color: color2 });
      } else if (firstToken.name === "to") {
        var color2 = color$1.parse(context, firstToken.values[0]);
        stops.push({ stop: HUNDRED_PERCENT, color: color2 });
      } else if (firstToken.name === "color-stop") {
        var values = firstToken.values.filter(nonFunctionArgSeparator);
        if (values.length === 2) {
          var color2 = color$1.parse(context, values[1]);
          var stop_1 = values[0];
          if (isNumberToken(stop_1)) {
            stops.push({
              stop: { type: 16, number: stop_1.number * 100, flags: stop_1.flags },
              color: color2
            });
          }
        }
      }
    }
  });
  return type === 1 ? {
    angle: (angle2 + deg(180)) % deg(360),
    stops,
    type
  } : { size, shape, stops, position: position2, type };
};
var CLOSEST_SIDE = "closest-side";
var FARTHEST_SIDE = "farthest-side";
var CLOSEST_CORNER = "closest-corner";
var FARTHEST_CORNER = "farthest-corner";
var CIRCLE = "circle";
var ELLIPSE = "ellipse";
var COVER = "cover";
var CONTAIN = "contain";
var radialGradient = function(context, tokens) {
  var shape = 0;
  var size = 3;
  var stops = [];
  var position2 = [];
  parseFunctionArgs(tokens).forEach(function(arg, i) {
    var isColorStop = true;
    if (i === 0) {
      var isAtPosition_1 = false;
      isColorStop = arg.reduce(function(acc, token) {
        if (isAtPosition_1) {
          if (isIdentToken(token)) {
            switch (token.value) {
              case "center":
                position2.push(FIFTY_PERCENT);
                return acc;
              case "top":
              case "left":
                position2.push(ZERO_LENGTH);
                return acc;
              case "right":
              case "bottom":
                position2.push(HUNDRED_PERCENT);
                return acc;
            }
          } else if (isLengthPercentage(token) || isLength(token)) {
            position2.push(token);
          }
        } else if (isIdentToken(token)) {
          switch (token.value) {
            case CIRCLE:
              shape = 0;
              return false;
            case ELLIPSE:
              shape = 1;
              return false;
            case "at":
              isAtPosition_1 = true;
              return false;
            case CLOSEST_SIDE:
              size = 0;
              return false;
            case COVER:
            case FARTHEST_SIDE:
              size = 1;
              return false;
            case CONTAIN:
            case CLOSEST_CORNER:
              size = 2;
              return false;
            case FARTHEST_CORNER:
              size = 3;
              return false;
          }
        } else if (isLength(token) || isLengthPercentage(token)) {
          if (!Array.isArray(size)) {
            size = [];
          }
          size.push(token);
          return false;
        }
        return acc;
      }, isColorStop);
    }
    if (isColorStop) {
      var colorStop = parseColorStop(context, arg);
      stops.push(colorStop);
    }
  });
  return {
    size,
    shape,
    stops,
    position: position2,
    type: 2
    /* RADIAL_GRADIENT */
  };
};
var prefixRadialGradient = function(context, tokens) {
  var shape = 0;
  var size = 3;
  var stops = [];
  var position2 = [];
  parseFunctionArgs(tokens).forEach(function(arg, i) {
    var isColorStop = true;
    if (i === 0) {
      isColorStop = arg.reduce(function(acc, token) {
        if (isIdentToken(token)) {
          switch (token.value) {
            case "center":
              position2.push(FIFTY_PERCENT);
              return false;
            case "top":
            case "left":
              position2.push(ZERO_LENGTH);
              return false;
            case "right":
            case "bottom":
              position2.push(HUNDRED_PERCENT);
              return false;
          }
        } else if (isLengthPercentage(token) || isLength(token)) {
          position2.push(token);
          return false;
        }
        return acc;
      }, isColorStop);
    } else if (i === 1) {
      isColorStop = arg.reduce(function(acc, token) {
        if (isIdentToken(token)) {
          switch (token.value) {
            case CIRCLE:
              shape = 0;
              return false;
            case ELLIPSE:
              shape = 1;
              return false;
            case CONTAIN:
            case CLOSEST_SIDE:
              size = 0;
              return false;
            case FARTHEST_SIDE:
              size = 1;
              return false;
            case CLOSEST_CORNER:
              size = 2;
              return false;
            case COVER:
            case FARTHEST_CORNER:
              size = 3;
              return false;
          }
        } else if (isLength(token) || isLengthPercentage(token)) {
          if (!Array.isArray(size)) {
            size = [];
          }
          size.push(token);
          return false;
        }
        return acc;
      }, isColorStop);
    }
    if (isColorStop) {
      var colorStop = parseColorStop(context, arg);
      stops.push(colorStop);
    }
  });
  return {
    size,
    shape,
    stops,
    position: position2,
    type: 2
    /* RADIAL_GRADIENT */
  };
};
var isLinearGradient = function(background) {
  return background.type === 1;
};
var isRadialGradient = function(background) {
  return background.type === 2;
};
var image = {
  name: "image",
  parse: function(context, value) {
    if (value.type === 22) {
      var image_1 = {
        url: value.value,
        type: 0
        /* URL */
      };
      context.cache.addImage(value.value);
      return image_1;
    }
    if (value.type === 18) {
      var imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
      if (typeof imageFunction === "undefined") {
        throw new Error('Attempting to parse an unsupported image function "' + value.name + '"');
      }
      return imageFunction(context, value.values);
    }
    throw new Error("Unsupported image type " + value.type);
  }
};
function isSupportedImage(value) {
  return !(value.type === 20 && value.value === "none") && (value.type !== 18 || !!SUPPORTED_IMAGE_FUNCTIONS[value.name]);
}
var SUPPORTED_IMAGE_FUNCTIONS = {
  "linear-gradient": linearGradient,
  "-moz-linear-gradient": prefixLinearGradient,
  "-ms-linear-gradient": prefixLinearGradient,
  "-o-linear-gradient": prefixLinearGradient,
  "-webkit-linear-gradient": prefixLinearGradient,
  "radial-gradient": radialGradient,
  "-moz-radial-gradient": prefixRadialGradient,
  "-ms-radial-gradient": prefixRadialGradient,
  "-o-radial-gradient": prefixRadialGradient,
  "-webkit-radial-gradient": prefixRadialGradient,
  "-webkit-gradient": webkitGradient
};
var backgroundImage = {
  name: "background-image",
  initialValue: "none",
  type: 1,
  prefix: false,
  parse: function(context, tokens) {
    if (tokens.length === 0) {
      return [];
    }
    var first = tokens[0];
    if (first.type === 20 && first.value === "none") {
      return [];
    }
    return tokens.filter(function(value) {
      return nonFunctionArgSeparator(value) && isSupportedImage(value);
    }).map(function(value) {
      return image.parse(context, value);
    });
  }
};
var backgroundOrigin = {
  name: "background-origin",
  initialValue: "border-box",
  prefix: false,
  type: 1,
  parse: function(_context, tokens) {
    return tokens.map(function(token) {
      if (isIdentToken(token)) {
        switch (token.value) {
          case "padding-box":
            return 1;
          case "content-box":
            return 2;
        }
      }
      return 0;
    });
  }
};
var backgroundPosition = {
  name: "background-position",
  initialValue: "0% 0%",
  type: 1,
  prefix: false,
  parse: function(_context, tokens) {
    return parseFunctionArgs(tokens).map(function(values) {
      return values.filter(isLengthPercentage);
    }).map(parseLengthPercentageTuple);
  }
};
var backgroundRepeat = {
  name: "background-repeat",
  initialValue: "repeat",
  prefix: false,
  type: 1,
  parse: function(_context, tokens) {
    return parseFunctionArgs(tokens).map(function(values) {
      return values.filter(isIdentToken).map(function(token) {
        return token.value;
      }).join(" ");
    }).map(parseBackgroundRepeat);
  }
};
var parseBackgroundRepeat = function(value) {
  switch (value) {
    case "no-repeat":
      return 1;
    case "repeat-x":
    case "repeat no-repeat":
      return 2;
    case "repeat-y":
    case "no-repeat repeat":
      return 3;
    case "repeat":
    default:
      return 0;
  }
};
var BACKGROUND_SIZE;
(function(BACKGROUND_SIZE2) {
  BACKGROUND_SIZE2["AUTO"] = "auto";
  BACKGROUND_SIZE2["CONTAIN"] = "contain";
  BACKGROUND_SIZE2["COVER"] = "cover";
})(BACKGROUND_SIZE || (BACKGROUND_SIZE = {}));
var backgroundSize = {
  name: "background-size",
  initialValue: "0",
  prefix: false,
  type: 1,
  parse: function(_context, tokens) {
    return parseFunctionArgs(tokens).map(function(values) {
      return values.filter(isBackgroundSizeInfoToken);
    });
  }
};
var isBackgroundSizeInfoToken = function(value) {
  return isIdentToken(value) || isLengthPercentage(value);
};
var borderColorForSide = function(side) {
  return {
    name: "border-" + side + "-color",
    initialValue: "transparent",
    prefix: false,
    type: 3,
    format: "color"
  };
};
var borderTopColor = borderColorForSide("top");
var borderRightColor = borderColorForSide("right");
var borderBottomColor = borderColorForSide("bottom");
var borderLeftColor = borderColorForSide("left");
var borderRadiusForSide = function(side) {
  return {
    name: "border-radius-" + side,
    initialValue: "0 0",
    prefix: false,
    type: 1,
    parse: function(_context, tokens) {
      return parseLengthPercentageTuple(tokens.filter(isLengthPercentage));
    }
  };
};
var borderTopLeftRadius = borderRadiusForSide("top-left");
var borderTopRightRadius = borderRadiusForSide("top-right");
var borderBottomRightRadius = borderRadiusForSide("bottom-right");
var borderBottomLeftRadius = borderRadiusForSide("bottom-left");
var borderStyleForSide = function(side) {
  return {
    name: "border-" + side + "-style",
    initialValue: "solid",
    prefix: false,
    type: 2,
    parse: function(_context, style) {
      switch (style) {
        case "none":
          return 0;
        case "dashed":
          return 2;
        case "dotted":
          return 3;
        case "double":
          return 4;
      }
      return 1;
    }
  };
};
var borderTopStyle = borderStyleForSide("top");
var borderRightStyle = borderStyleForSide("right");
var borderBottomStyle = borderStyleForSide("bottom");
var borderLeftStyle = borderStyleForSide("left");
var borderWidthForSide = function(side) {
  return {
    name: "border-" + side + "-width",
    initialValue: "0",
    type: 0,
    prefix: false,
    parse: function(_context, token) {
      if (isDimensionToken(token)) {
        return token.number;
      }
      return 0;
    }
  };
};
var borderTopWidth = borderWidthForSide("top");
var borderRightWidth = borderWidthForSide("right");
var borderBottomWidth = borderWidthForSide("bottom");
var borderLeftWidth = borderWidthForSide("left");
var color = {
  name: "color",
  initialValue: "transparent",
  prefix: false,
  type: 3,
  format: "color"
};
var direction = {
  name: "direction",
  initialValue: "ltr",
  prefix: false,
  type: 2,
  parse: function(_context, direction2) {
    switch (direction2) {
      case "rtl":
        return 1;
      case "ltr":
      default:
        return 0;
    }
  }
};
var display = {
  name: "display",
  initialValue: "inline-block",
  prefix: false,
  type: 1,
  parse: function(_context, tokens) {
    return tokens.filter(isIdentToken).reduce(
      function(bit, token) {
        return bit | parseDisplayValue(token.value);
      },
      0
      /* NONE */
    );
  }
};
var parseDisplayValue = function(display2) {
  switch (display2) {
    case "block":
    case "-webkit-box":
      return 2;
    case "inline":
      return 4;
    case "run-in":
      return 8;
    case "flow":
      return 16;
    case "flow-root":
      return 32;
    case "table":
      return 64;
    case "flex":
    case "-webkit-flex":
      return 128;
    case "grid":
    case "-ms-grid":
      return 256;
    case "ruby":
      return 512;
    case "subgrid":
      return 1024;
    case "list-item":
      return 2048;
    case "table-row-group":
      return 4096;
    case "table-header-group":
      return 8192;
    case "table-footer-group":
      return 16384;
    case "table-row":
      return 32768;
    case "table-cell":
      return 65536;
    case "table-column-group":
      return 131072;
    case "table-column":
      return 262144;
    case "table-caption":
      return 524288;
    case "ruby-base":
      return 1048576;
    case "ruby-text":
      return 2097152;
    case "ruby-base-container":
      return 4194304;
    case "ruby-text-container":
      return 8388608;
    case "contents":
      return 16777216;
    case "inline-block":
      return 33554432;
    case "inline-list-item":
      return 67108864;
    case "inline-table":
      return 134217728;
    case "inline-flex":
      return 268435456;
    case "inline-grid":
      return 536870912;
  }
  return 0;
};
var float = {
  name: "float",
  initialValue: "none",
  prefix: false,
  type: 2,
  parse: function(_context, float2) {
    switch (float2) {
      case "left":
        return 1;
      case "right":
        return 2;
      case "inline-start":
        return 3;
      case "inline-end":
        return 4;
    }
    return 0;
  }
};
var letterSpacing = {
  name: "letter-spacing",
  initialValue: "0",
  prefix: false,
  type: 0,
  parse: function(_context, token) {
    if (token.type === 20 && token.value === "normal") {
      return 0;
    }
    if (token.type === 17) {
      return token.number;
    }
    if (token.type === 15) {
      return token.number;
    }
    return 0;
  }
};
var LINE_BREAK;
(function(LINE_BREAK2) {
  LINE_BREAK2["NORMAL"] = "normal";
  LINE_BREAK2["STRICT"] = "strict";
})(LINE_BREAK || (LINE_BREAK = {}));
var lineBreak = {
  name: "line-break",
  initialValue: "normal",
  prefix: false,
  type: 2,
  parse: function(_context, lineBreak2) {
    switch (lineBreak2) {
      case "strict":
        return LINE_BREAK.STRICT;
      case "normal":
      default:
        return LINE_BREAK.NORMAL;
    }
  }
};
var lineHeight = {
  name: "line-height",
  initialValue: "normal",
  prefix: false,
  type: 4
  /* TOKEN_VALUE */
};
var computeLineHeight = function(token, fontSize2) {
  if (isIdentToken(token) && token.value === "normal") {
    return 1.2 * fontSize2;
  } else if (token.type === 17) {
    return fontSize2 * token.number;
  } else if (isLengthPercentage(token)) {
    return getAbsoluteValue(token, fontSize2);
  }
  return fontSize2;
};
var listStyleImage = {
  name: "list-style-image",
  initialValue: "none",
  type: 0,
  prefix: false,
  parse: function(context, token) {
    if (token.type === 20 && token.value === "none") {
      return null;
    }
    return image.parse(context, token);
  }
};
var listStylePosition = {
  name: "list-style-position",
  initialValue: "outside",
  prefix: false,
  type: 2,
  parse: function(_context, position2) {
    switch (position2) {
      case "inside":
        return 0;
      case "outside":
      default:
        return 1;
    }
  }
};
var listStyleType = {
  name: "list-style-type",
  initialValue: "none",
  prefix: false,
  type: 2,
  parse: function(_context, type) {
    switch (type) {
      case "disc":
        return 0;
      case "circle":
        return 1;
      case "square":
        return 2;
      case "decimal":
        return 3;
      case "cjk-decimal":
        return 4;
      case "decimal-leading-zero":
        return 5;
      case "lower-roman":
        return 6;
      case "upper-roman":
        return 7;
      case "lower-greek":
        return 8;
      case "lower-alpha":
        return 9;
      case "upper-alpha":
        return 10;
      case "arabic-indic":
        return 11;
      case "armenian":
        return 12;
      case "bengali":
        return 13;
      case "cambodian":
        return 14;
      case "cjk-earthly-branch":
        return 15;
      case "cjk-heavenly-stem":
        return 16;
      case "cjk-ideographic":
        return 17;
      case "devanagari":
        return 18;
      case "ethiopic-numeric":
        return 19;
      case "georgian":
        return 20;
      case "gujarati":
        return 21;
      case "gurmukhi":
        return 22;
      case "hebrew":
        return 22;
      case "hiragana":
        return 23;
      case "hiragana-iroha":
        return 24;
      case "japanese-formal":
        return 25;
      case "japanese-informal":
        return 26;
      case "kannada":
        return 27;
      case "katakana":
        return 28;
      case "katakana-iroha":
        return 29;
      case "khmer":
        return 30;
      case "korean-hangul-formal":
        return 31;
      case "korean-hanja-formal":
        return 32;
      case "korean-hanja-informal":
        return 33;
      case "lao":
        return 34;
      case "lower-armenian":
        return 35;
      case "malayalam":
        return 36;
      case "mongolian":
        return 37;
      case "myanmar":
        return 38;
      case "oriya":
        return 39;
      case "persian":
        return 40;
      case "simp-chinese-formal":
        return 41;
      case "simp-chinese-informal":
        return 42;
      case "tamil":
        return 43;
      case "telugu":
        return 44;
      case "thai":
        return 45;
      case "tibetan":
        return 46;
      case "trad-chinese-formal":
        return 47;
      case "trad-chinese-informal":
        return 48;
      case "upper-armenian":
        return 49;
      case "disclosure-open":
        return 50;
      case "disclosure-closed":
        return 51;
      case "none":
      default:
        return -1;
    }
  }
};
var marginForSide = function(side) {
  return {
    name: "margin-" + side,
    initialValue: "0",
    prefix: false,
    type: 4
    /* TOKEN_VALUE */
  };
};
var marginTop = marginForSide("top");
var marginRight = marginForSide("right");
var marginBottom = marginForSide("bottom");
var marginLeft = marginForSide("left");
var overflow = {
  name: "overflow",
  initialValue: "visible",
  prefix: false,
  type: 1,
  parse: function(_context, tokens) {
    return tokens.filter(isIdentToken).map(function(overflow2) {
      switch (overflow2.value) {
        case "hidden":
          return 1;
        case "scroll":
          return 2;
        case "clip":
          return 3;
        case "auto":
          return 4;
        case "visible":
        default:
          return 0;
      }
    });
  }
};
var overflowWrap = {
  name: "overflow-wrap",
  initialValue: "normal",
  prefix: false,
  type: 2,
  parse: function(_context, overflow2) {
    switch (overflow2) {
      case "break-word":
        return "break-word";
      case "normal":
      default:
        return "normal";
    }
  }
};
var paddingForSide = function(side) {
  return {
    name: "padding-" + side,
    initialValue: "0",
    prefix: false,
    type: 3,
    format: "length-percentage"
  };
};
var paddingTop = paddingForSide("top");
var paddingRight = paddingForSide("right");
var paddingBottom = paddingForSide("bottom");
var paddingLeft = paddingForSide("left");
var textAlign = {
  name: "text-align",
  initialValue: "left",
  prefix: false,
  type: 2,
  parse: function(_context, textAlign2) {
    switch (textAlign2) {
      case "right":
        return 2;
      case "center":
      case "justify":
        return 1;
      case "left":
      default:
        return 0;
    }
  }
};
var position = {
  name: "position",
  initialValue: "static",
  prefix: false,
  type: 2,
  parse: function(_context, position2) {
    switch (position2) {
      case "relative":
        return 1;
      case "absolute":
        return 2;
      case "fixed":
        return 3;
      case "sticky":
        return 4;
    }
    return 0;
  }
};
var textShadow = {
  name: "text-shadow",
  initialValue: "none",
  type: 1,
  prefix: false,
  parse: function(context, tokens) {
    if (tokens.length === 1 && isIdentWithValue(tokens[0], "none")) {
      return [];
    }
    return parseFunctionArgs(tokens).map(function(values) {
      var shadow = {
        color: COLORS.TRANSPARENT,
        offsetX: ZERO_LENGTH,
        offsetY: ZERO_LENGTH,
        blur: ZERO_LENGTH
      };
      var c = 0;
      for (var i = 0; i < values.length; i++) {
        var token = values[i];
        if (isLength(token)) {
          if (c === 0) {
            shadow.offsetX = token;
          } else if (c === 1) {
            shadow.offsetY = token;
          } else {
            shadow.blur = token;
          }
          c++;
        } else {
          shadow.color = color$1.parse(context, token);
        }
      }
      return shadow;
    });
  }
};
var textTransform = {
  name: "text-transform",
  initialValue: "none",
  prefix: false,
  type: 2,
  parse: function(_context, textTransform2) {
    switch (textTransform2) {
      case "uppercase":
        return 2;
      case "lowercase":
        return 1;
      case "capitalize":
        return 3;
    }
    return 0;
  }
};
var transform$1 = {
  name: "transform",
  initialValue: "none",
  prefix: true,
  type: 0,
  parse: function(_context, token) {
    if (token.type === 20 && token.value === "none") {
      return null;
    }
    if (token.type === 18) {
      var transformFunction = SUPPORTED_TRANSFORM_FUNCTIONS[token.name];
      if (typeof transformFunction === "undefined") {
        throw new Error('Attempting to parse an unsupported transform function "' + token.name + '"');
      }
      return transformFunction(token.values);
    }
    return null;
  }
};
var matrix = function(args) {
  var values = args.filter(function(arg) {
    return arg.type === 17;
  }).map(function(arg) {
    return arg.number;
  });
  return values.length === 6 ? values : null;
};
var matrix3d = function(args) {
  var values = args.filter(function(arg) {
    return arg.type === 17;
  }).map(function(arg) {
    return arg.number;
  });
  var a1 = values[0], b1 = values[1];
  values[2];
  values[3];
  var a2 = values[4], b2 = values[5];
  values[6];
  values[7];
  values[8];
  values[9];
  values[10];
  values[11];
  var a4 = values[12], b4 = values[13];
  values[14];
  values[15];
  return values.length === 16 ? [a1, b1, a2, b2, a4, b4] : null;
};
var SUPPORTED_TRANSFORM_FUNCTIONS = {
  matrix,
  matrix3d
};
var DEFAULT_VALUE = {
  type: 16,
  number: 50,
  flags: FLAG_INTEGER
};
var DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
var transformOrigin = {
  name: "transform-origin",
  initialValue: "50% 50%",
  prefix: true,
  type: 1,
  parse: function(_context, tokens) {
    var origins = tokens.filter(isLengthPercentage);
    if (origins.length !== 2) {
      return DEFAULT;
    }
    return [origins[0], origins[1]];
  }
};
var visibility = {
  name: "visible",
  initialValue: "none",
  prefix: false,
  type: 2,
  parse: function(_context, visibility2) {
    switch (visibility2) {
      case "hidden":
        return 1;
      case "collapse":
        return 2;
      case "visible":
      default:
        return 0;
    }
  }
};
var WORD_BREAK;
(function(WORD_BREAK2) {
  WORD_BREAK2["NORMAL"] = "normal";
  WORD_BREAK2["BREAK_ALL"] = "break-all";
  WORD_BREAK2["KEEP_ALL"] = "keep-all";
})(WORD_BREAK || (WORD_BREAK = {}));
var wordBreak = {
  name: "word-break",
  initialValue: "normal",
  prefix: false,
  type: 2,
  parse: function(_context, wordBreak2) {
    switch (wordBreak2) {
      case "break-all":
        return WORD_BREAK.BREAK_ALL;
      case "keep-all":
        return WORD_BREAK.KEEP_ALL;
      case "normal":
      default:
        return WORD_BREAK.NORMAL;
    }
  }
};
var zIndex = {
  name: "z-index",
  initialValue: "auto",
  prefix: false,
  type: 0,
  parse: function(_context, token) {
    if (token.type === 20) {
      return { auto: true, order: 0 };
    }
    if (isNumberToken(token)) {
      return { auto: false, order: token.number };
    }
    throw new Error("Invalid z-index number parsed");
  }
};
var time = {
  name: "time",
  parse: function(_context, value) {
    if (value.type === 15) {
      switch (value.unit.toLowerCase()) {
        case "s":
          return 1e3 * value.number;
        case "ms":
          return value.number;
      }
    }
    throw new Error("Unsupported time type");
  }
};
var opacity = {
  name: "opacity",
  initialValue: "1",
  type: 0,
  prefix: false,
  parse: function(_context, token) {
    if (isNumberToken(token)) {
      return token.number;
    }
    return 1;
  }
};
var textDecorationColor = {
  name: "text-decoration-color",
  initialValue: "transparent",
  prefix: false,
  type: 3,
  format: "color"
};
var textDecorationLine = {
  name: "text-decoration-line",
  initialValue: "none",
  prefix: false,
  type: 1,
  parse: function(_context, tokens) {
    return tokens.filter(isIdentToken).map(function(token) {
      switch (token.value) {
        case "underline":
          return 1;
        case "overline":
          return 2;
        case "line-through":
          return 3;
        case "none":
          return 4;
      }
      return 0;
    }).filter(function(line) {
      return line !== 0;
    });
  }
};
var fontFamily = {
  name: "font-family",
  initialValue: "",
  prefix: false,
  type: 1,
  parse: function(_context, tokens) {
    var accumulator = [];
    var results = [];
    tokens.forEach(function(token) {
      switch (token.type) {
        case 20:
        case 0:
          accumulator.push(token.value);
          break;
        case 17:
          accumulator.push(token.number.toString());
          break;
        case 4:
          results.push(accumulator.join(" "));
          accumulator.length = 0;
          break;
      }
    });
    if (accumulator.length) {
      results.push(accumulator.join(" "));
    }
    return results.map(function(result) {
      return result.indexOf(" ") === -1 ? result : "'" + result + "'";
    });
  }
};
var fontSize = {
  name: "font-size",
  initialValue: "0",
  prefix: false,
  type: 3,
  format: "length"
};
var fontWeight = {
  name: "font-weight",
  initialValue: "normal",
  type: 0,
  prefix: false,
  parse: function(_context, token) {
    if (isNumberToken(token)) {
      return token.number;
    }
    if (isIdentToken(token)) {
      switch (token.value) {
        case "bold":
          return 700;
        case "normal":
        default:
          return 400;
      }
    }
    return 400;
  }
};
var fontVariant = {
  name: "font-variant",
  initialValue: "none",
  type: 1,
  prefix: false,
  parse: function(_context, tokens) {
    return tokens.filter(isIdentToken).map(function(token) {
      return token.value;
    });
  }
};
var fontStyle = {
  name: "font-style",
  initialValue: "normal",
  prefix: false,
  type: 2,
  parse: function(_context, overflow2) {
    switch (overflow2) {
      case "oblique":
        return "oblique";
      case "italic":
        return "italic";
      case "normal":
      default:
        return "normal";
    }
  }
};
var contains = function(bit, value) {
  return (bit & value) !== 0;
};
var content = {
  name: "content",
  initialValue: "none",
  type: 1,
  prefix: false,
  parse: function(_context, tokens) {
    if (tokens.length === 0) {
      return [];
    }
    var first = tokens[0];
    if (first.type === 20 && first.value === "none") {
      return [];
    }
    return tokens;
  }
};
var counterIncrement = {
  name: "counter-increment",
  initialValue: "none",
  prefix: true,
  type: 1,
  parse: function(_context, tokens) {
    if (tokens.length === 0) {
      return null;
    }
    var first = tokens[0];
    if (first.type === 20 && first.value === "none") {
      return null;
    }
    var increments = [];
    var filtered = tokens.filter(nonWhiteSpace);
    for (var i = 0; i < filtered.length; i++) {
      var counter = filtered[i];
      var next = filtered[i + 1];
      if (counter.type === 20) {
        var increment = next && isNumberToken(next) ? next.number : 1;
        increments.push({ counter: counter.value, increment });
      }
    }
    return increments;
  }
};
var counterReset = {
  name: "counter-reset",
  initialValue: "none",
  prefix: true,
  type: 1,
  parse: function(_context, tokens) {
    if (tokens.length === 0) {
      return [];
    }
    var resets = [];
    var filtered = tokens.filter(nonWhiteSpace);
    for (var i = 0; i < filtered.length; i++) {
      var counter = filtered[i];
      var next = filtered[i + 1];
      if (isIdentToken(counter) && counter.value !== "none") {
        var reset = next && isNumberToken(next) ? next.number : 0;
        resets.push({ counter: counter.value, reset });
      }
    }
    return resets;
  }
};
var duration = {
  name: "duration",
  initialValue: "0s",
  prefix: false,
  type: 1,
  parse: function(context, tokens) {
    return tokens.filter(isDimensionToken).map(function(token) {
      return time.parse(context, token);
    });
  }
};
var quotes = {
  name: "quotes",
  initialValue: "none",
  prefix: true,
  type: 1,
  parse: function(_context, tokens) {
    if (tokens.length === 0) {
      return null;
    }
    var first = tokens[0];
    if (first.type === 20 && first.value === "none") {
      return null;
    }
    var quotes2 = [];
    var filtered = tokens.filter(isStringToken);
    if (filtered.length % 2 !== 0) {
      return null;
    }
    for (var i = 0; i < filtered.length; i += 2) {
      var open_1 = filtered[i].value;
      var close_1 = filtered[i + 1].value;
      quotes2.push({ open: open_1, close: close_1 });
    }
    return quotes2;
  }
};
var getQuote = function(quotes2, depth, open) {
  if (!quotes2) {
    return "";
  }
  var quote = quotes2[Math.min(depth, quotes2.length - 1)];
  if (!quote) {
    return "";
  }
  return open ? quote.open : quote.close;
};
var boxShadow = {
  name: "box-shadow",
  initialValue: "none",
  type: 1,
  prefix: false,
  parse: function(context, tokens) {
    if (tokens.length === 1 && isIdentWithValue(tokens[0], "none")) {
      return [];
    }
    return parseFunctionArgs(tokens).map(function(values) {
      var shadow = {
        color: 255,
        offsetX: ZERO_LENGTH,
        offsetY: ZERO_LENGTH,
        blur: ZERO_LENGTH,
        spread: ZERO_LENGTH,
        inset: false
      };
      var c = 0;
      for (var i = 0; i < values.length; i++) {
        var token = values[i];
        if (isIdentWithValue(token, "inset")) {
          shadow.inset = true;
        } else if (isLength(token)) {
          if (c === 0) {
            shadow.offsetX = token;
          } else if (c === 1) {
            shadow.offsetY = token;
          } else if (c === 2) {
            shadow.blur = token;
          } else {
            shadow.spread = token;
          }
          c++;
        } else {
          shadow.color = color$1.parse(context, token);
        }
      }
      return shadow;
    });
  }
};
var paintOrder = {
  name: "paint-order",
  initialValue: "normal",
  prefix: false,
  type: 1,
  parse: function(_context, tokens) {
    var DEFAULT_VALUE2 = [
      0,
      1,
      2
      /* MARKERS */
    ];
    var layers = [];
    tokens.filter(isIdentToken).forEach(function(token) {
      switch (token.value) {
        case "stroke":
          layers.push(
            1
            /* STROKE */
          );
          break;
        case "fill":
          layers.push(
            0
            /* FILL */
          );
          break;
        case "markers":
          layers.push(
            2
            /* MARKERS */
          );
          break;
      }
    });
    DEFAULT_VALUE2.forEach(function(value) {
      if (layers.indexOf(value) === -1) {
        layers.push(value);
      }
    });
    return layers;
  }
};
var webkitTextStrokeColor = {
  name: "-webkit-text-stroke-color",
  initialValue: "currentcolor",
  prefix: false,
  type: 3,
  format: "color"
};
var webkitTextStrokeWidth = {
  name: "-webkit-text-stroke-width",
  initialValue: "0",
  type: 0,
  prefix: false,
  parse: function(_context, token) {
    if (isDimensionToken(token)) {
      return token.number;
    }
    return 0;
  }
};
var CSSParsedDeclaration = (
  /** @class */
  (function() {
    function CSSParsedDeclaration2(context, declaration) {
      var _a, _b;
      this.animationDuration = parse(context, duration, declaration.animationDuration);
      this.backgroundClip = parse(context, backgroundClip, declaration.backgroundClip);
      this.backgroundColor = parse(context, backgroundColor, declaration.backgroundColor);
      this.backgroundImage = parse(context, backgroundImage, declaration.backgroundImage);
      this.backgroundOrigin = parse(context, backgroundOrigin, declaration.backgroundOrigin);
      this.backgroundPosition = parse(context, backgroundPosition, declaration.backgroundPosition);
      this.backgroundRepeat = parse(context, backgroundRepeat, declaration.backgroundRepeat);
      this.backgroundSize = parse(context, backgroundSize, declaration.backgroundSize);
      this.borderTopColor = parse(context, borderTopColor, declaration.borderTopColor);
      this.borderRightColor = parse(context, borderRightColor, declaration.borderRightColor);
      this.borderBottomColor = parse(context, borderBottomColor, declaration.borderBottomColor);
      this.borderLeftColor = parse(context, borderLeftColor, declaration.borderLeftColor);
      this.borderTopLeftRadius = parse(context, borderTopLeftRadius, declaration.borderTopLeftRadius);
      this.borderTopRightRadius = parse(context, borderTopRightRadius, declaration.borderTopRightRadius);
      this.borderBottomRightRadius = parse(context, borderBottomRightRadius, declaration.borderBottomRightRadius);
      this.borderBottomLeftRadius = parse(context, borderBottomLeftRadius, declaration.borderBottomLeftRadius);
      this.borderTopStyle = parse(context, borderTopStyle, declaration.borderTopStyle);
      this.borderRightStyle = parse(context, borderRightStyle, declaration.borderRightStyle);
      this.borderBottomStyle = parse(context, borderBottomStyle, declaration.borderBottomStyle);
      this.borderLeftStyle = parse(context, borderLeftStyle, declaration.borderLeftStyle);
      this.borderTopWidth = parse(context, borderTopWidth, declaration.borderTopWidth);
      this.borderRightWidth = parse(context, borderRightWidth, declaration.borderRightWidth);
      this.borderBottomWidth = parse(context, borderBottomWidth, declaration.borderBottomWidth);
      this.borderLeftWidth = parse(context, borderLeftWidth, declaration.borderLeftWidth);
      this.boxShadow = parse(context, boxShadow, declaration.boxShadow);
      this.color = parse(context, color, declaration.color);
      this.direction = parse(context, direction, declaration.direction);
      this.display = parse(context, display, declaration.display);
      this.float = parse(context, float, declaration.cssFloat);
      this.fontFamily = parse(context, fontFamily, declaration.fontFamily);
      this.fontSize = parse(context, fontSize, declaration.fontSize);
      this.fontStyle = parse(context, fontStyle, declaration.fontStyle);
      this.fontVariant = parse(context, fontVariant, declaration.fontVariant);
      this.fontWeight = parse(context, fontWeight, declaration.fontWeight);
      this.letterSpacing = parse(context, letterSpacing, declaration.letterSpacing);
      this.lineBreak = parse(context, lineBreak, declaration.lineBreak);
      this.lineHeight = parse(context, lineHeight, declaration.lineHeight);
      this.listStyleImage = parse(context, listStyleImage, declaration.listStyleImage);
      this.listStylePosition = parse(context, listStylePosition, declaration.listStylePosition);
      this.listStyleType = parse(context, listStyleType, declaration.listStyleType);
      this.marginTop = parse(context, marginTop, declaration.marginTop);
      this.marginRight = parse(context, marginRight, declaration.marginRight);
      this.marginBottom = parse(context, marginBottom, declaration.marginBottom);
      this.marginLeft = parse(context, marginLeft, declaration.marginLeft);
      this.opacity = parse(context, opacity, declaration.opacity);
      var overflowTuple = parse(context, overflow, declaration.overflow);
      this.overflowX = overflowTuple[0];
      this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
      this.overflowWrap = parse(context, overflowWrap, declaration.overflowWrap);
      this.paddingTop = parse(context, paddingTop, declaration.paddingTop);
      this.paddingRight = parse(context, paddingRight, declaration.paddingRight);
      this.paddingBottom = parse(context, paddingBottom, declaration.paddingBottom);
      this.paddingLeft = parse(context, paddingLeft, declaration.paddingLeft);
      this.paintOrder = parse(context, paintOrder, declaration.paintOrder);
      this.position = parse(context, position, declaration.position);
      this.textAlign = parse(context, textAlign, declaration.textAlign);
      this.textDecorationColor = parse(context, textDecorationColor, (_a = declaration.textDecorationColor) !== null && _a !== void 0 ? _a : declaration.color);
      this.textDecorationLine = parse(context, textDecorationLine, (_b = declaration.textDecorationLine) !== null && _b !== void 0 ? _b : declaration.textDecoration);
      this.textShadow = parse(context, textShadow, declaration.textShadow);
      this.textTransform = parse(context, textTransform, declaration.textTransform);
      this.transform = parse(context, transform$1, declaration.transform);
      this.transformOrigin = parse(context, transformOrigin, declaration.transformOrigin);
      this.visibility = parse(context, visibility, declaration.visibility);
      this.webkitTextStrokeColor = parse(context, webkitTextStrokeColor, declaration.webkitTextStrokeColor);
      this.webkitTextStrokeWidth = parse(context, webkitTextStrokeWidth, declaration.webkitTextStrokeWidth);
      this.wordBreak = parse(context, wordBreak, declaration.wordBreak);
      this.zIndex = parse(context, zIndex, declaration.zIndex);
    }
    CSSParsedDeclaration2.prototype.isVisible = function() {
      return this.display > 0 && this.opacity > 0 && this.visibility === 0;
    };
    CSSParsedDeclaration2.prototype.isTransparent = function() {
      return isTransparent(this.backgroundColor);
    };
    CSSParsedDeclaration2.prototype.isTransformed = function() {
      return this.transform !== null;
    };
    CSSParsedDeclaration2.prototype.isPositioned = function() {
      return this.position !== 0;
    };
    CSSParsedDeclaration2.prototype.isPositionedWithZIndex = function() {
      return this.isPositioned() && !this.zIndex.auto;
    };
    CSSParsedDeclaration2.prototype.isFloating = function() {
      return this.float !== 0;
    };
    CSSParsedDeclaration2.prototype.isInlineLevel = function() {
      return contains(
        this.display,
        4
        /* INLINE */
      ) || contains(
        this.display,
        33554432
        /* INLINE_BLOCK */
      ) || contains(
        this.display,
        268435456
        /* INLINE_FLEX */
      ) || contains(
        this.display,
        536870912
        /* INLINE_GRID */
      ) || contains(
        this.display,
        67108864
        /* INLINE_LIST_ITEM */
      ) || contains(
        this.display,
        134217728
        /* INLINE_TABLE */
      );
    };
    return CSSParsedDeclaration2;
  })()
);
var CSSParsedPseudoDeclaration = (
  /** @class */
  /* @__PURE__ */ (function() {
    function CSSParsedPseudoDeclaration2(context, declaration) {
      this.content = parse(context, content, declaration.content);
      this.quotes = parse(context, quotes, declaration.quotes);
    }
    return CSSParsedPseudoDeclaration2;
  })()
);
var CSSParsedCounterDeclaration = (
  /** @class */
  /* @__PURE__ */ (function() {
    function CSSParsedCounterDeclaration2(context, declaration) {
      this.counterIncrement = parse(context, counterIncrement, declaration.counterIncrement);
      this.counterReset = parse(context, counterReset, declaration.counterReset);
    }
    return CSSParsedCounterDeclaration2;
  })()
);
var parse = function(context, descriptor, style) {
  var tokenizer = new Tokenizer();
  var value = style !== null && typeof style !== "undefined" ? style.toString() : descriptor.initialValue;
  tokenizer.write(value);
  var parser = new Parser(tokenizer.read());
  switch (descriptor.type) {
    case 2:
      var token = parser.parseComponentValue();
      return descriptor.parse(context, isIdentToken(token) ? token.value : descriptor.initialValue);
    case 0:
      return descriptor.parse(context, parser.parseComponentValue());
    case 1:
      return descriptor.parse(context, parser.parseComponentValues());
    case 4:
      return parser.parseComponentValue();
    case 3:
      switch (descriptor.format) {
        case "angle":
          return angle.parse(context, parser.parseComponentValue());
        case "color":
          return color$1.parse(context, parser.parseComponentValue());
        case "image":
          return image.parse(context, parser.parseComponentValue());
        case "length":
          var length_1 = parser.parseComponentValue();
          return isLength(length_1) ? length_1 : ZERO_LENGTH;
        case "length-percentage":
          var value_1 = parser.parseComponentValue();
          return isLengthPercentage(value_1) ? value_1 : ZERO_LENGTH;
        case "time":
          return time.parse(context, parser.parseComponentValue());
      }
      break;
  }
};
var elementDebuggerAttribute = "data-html2canvas-debug";
var getElementDebugType = function(element) {
  var attribute = element.getAttribute(elementDebuggerAttribute);
  switch (attribute) {
    case "all":
      return 1;
    case "clone":
      return 2;
    case "parse":
      return 3;
    case "render":
      return 4;
    default:
      return 0;
  }
};
var isDebugging = function(element, type) {
  var elementType = getElementDebugType(element);
  return elementType === 1 || type === elementType;
};
var ElementContainer = (
  /** @class */
  /* @__PURE__ */ (function() {
    function ElementContainer2(context, element) {
      this.context = context;
      this.textNodes = [];
      this.elements = [];
      this.flags = 0;
      if (isDebugging(
        element,
        3
        /* PARSE */
      )) {
        debugger;
      }
      this.styles = new CSSParsedDeclaration(context, window.getComputedStyle(element, null));
      if (isHTMLElementNode(element)) {
        if (this.styles.animationDuration.some(function(duration2) {
          return duration2 > 0;
        })) {
          element.style.animationDuration = "0s";
        }
        if (this.styles.transform !== null) {
          element.style.transform = "none";
        }
      }
      this.bounds = parseBounds(this.context, element);
      if (isDebugging(
        element,
        4
        /* RENDER */
      )) {
        this.flags |= 16;
      }
    }
    return ElementContainer2;
  })()
);
var base64 = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=";
var chars$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i$1 = 0; i$1 < chars$1.length; i$1++) {
  lookup$1[chars$1.charCodeAt(i$1)] = i$1;
}
var decode = function(base642) {
  var bufferLength = base642.length * 0.75, len = base642.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
  if (base642[base642.length - 1] === "=") {
    bufferLength--;
    if (base642[base642.length - 2] === "=") {
      bufferLength--;
    }
  }
  var buffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined" && typeof Uint8Array.prototype.slice !== "undefined" ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
  var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup$1[base642.charCodeAt(i)];
    encoded2 = lookup$1[base642.charCodeAt(i + 1)];
    encoded3 = lookup$1[base642.charCodeAt(i + 2)];
    encoded4 = lookup$1[base642.charCodeAt(i + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return buffer;
};
var polyUint16Array = function(buffer) {
  var length = buffer.length;
  var bytes = [];
  for (var i = 0; i < length; i += 2) {
    bytes.push(buffer[i + 1] << 8 | buffer[i]);
  }
  return bytes;
};
var polyUint32Array = function(buffer) {
  var length = buffer.length;
  var bytes = [];
  for (var i = 0; i < length; i += 4) {
    bytes.push(buffer[i + 3] << 24 | buffer[i + 2] << 16 | buffer[i + 1] << 8 | buffer[i]);
  }
  return bytes;
};
var UTRIE2_SHIFT_2 = 5;
var UTRIE2_SHIFT_1 = 6 + 5;
var UTRIE2_INDEX_SHIFT = 2;
var UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;
var UTRIE2_LSCP_INDEX_2_OFFSET = 65536 >> UTRIE2_SHIFT_2;
var UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
var UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;
var UTRIE2_LSCP_INDEX_2_LENGTH = 1024 >> UTRIE2_SHIFT_2;
var UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
var UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
var UTRIE2_UTF8_2B_INDEX_2_LENGTH = 2048 >> 6;
var UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;
var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 65536 >> UTRIE2_SHIFT_1;
var UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
var UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;
var slice16 = function(view, start, end) {
  if (view.slice) {
    return view.slice(start, end);
  }
  return new Uint16Array(Array.prototype.slice.call(view, start, end));
};
var slice32 = function(view, start, end) {
  if (view.slice) {
    return view.slice(start, end);
  }
  return new Uint32Array(Array.prototype.slice.call(view, start, end));
};
var createTrieFromBase64 = function(base642, _byteLength) {
  var buffer = decode(base642);
  var view32 = Array.isArray(buffer) ? polyUint32Array(buffer) : new Uint32Array(buffer);
  var view16 = Array.isArray(buffer) ? polyUint16Array(buffer) : new Uint16Array(buffer);
  var headerLength = 24;
  var index = slice16(view16, headerLength / 2, view32[4] / 2);
  var data = view32[5] === 2 ? slice16(view16, (headerLength + view32[4]) / 2) : slice32(view32, Math.ceil((headerLength + view32[4]) / 4));
  return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
};
var Trie = (
  /** @class */
  (function() {
    function Trie2(initialValue, errorValue, highStart, highValueIndex, index, data) {
      this.initialValue = initialValue;
      this.errorValue = errorValue;
      this.highStart = highStart;
      this.highValueIndex = highValueIndex;
      this.index = index;
      this.data = data;
    }
    Trie2.prototype.get = function(codePoint) {
      var ix;
      if (codePoint >= 0) {
        if (codePoint < 55296 || codePoint > 56319 && codePoint <= 65535) {
          ix = this.index[codePoint >> UTRIE2_SHIFT_2];
          ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
          return this.data[ix];
        }
        if (codePoint <= 65535) {
          ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + (codePoint - 55296 >> UTRIE2_SHIFT_2)];
          ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
          return this.data[ix];
        }
        if (codePoint < this.highStart) {
          ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
          ix = this.index[ix];
          ix += codePoint >> UTRIE2_SHIFT_2 & UTRIE2_INDEX_2_MASK;
          ix = this.index[ix];
          ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
          return this.data[ix];
        }
        if (codePoint <= 1114111) {
          return this.data[this.highValueIndex];
        }
      }
      return this.errorValue;
    };
    return Trie2;
  })()
);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
var Prepend = 1;
var CR = 2;
var LF = 3;
var Control = 4;
var Extend = 5;
var SpacingMark = 7;
var L = 8;
var V = 9;
var T = 10;
var LV = 11;
var LVT = 12;
var ZWJ = 13;
var Extended_Pictographic = 14;
var RI = 15;
var toCodePoints = function(str) {
  var codePoints = [];
  var i = 0;
  var length = str.length;
  while (i < length) {
    var value = str.charCodeAt(i++);
    if (value >= 55296 && value <= 56319 && i < length) {
      var extra = str.charCodeAt(i++);
      if ((extra & 64512) === 56320) {
        codePoints.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        codePoints.push(value);
        i--;
      }
    } else {
      codePoints.push(value);
    }
  }
  return codePoints;
};
var fromCodePoint = function() {
  var codePoints = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    codePoints[_i] = arguments[_i];
  }
  if (String.fromCodePoint) {
    return String.fromCodePoint.apply(String, codePoints);
  }
  var length = codePoints.length;
  if (!length) {
    return "";
  }
  var codeUnits = [];
  var index = -1;
  var result = "";
  while (++index < length) {
    var codePoint = codePoints[index];
    if (codePoint <= 65535) {
      codeUnits.push(codePoint);
    } else {
      codePoint -= 65536;
      codeUnits.push((codePoint >> 10) + 55296, codePoint % 1024 + 56320);
    }
    if (index + 1 === length || codeUnits.length > 16384) {
      result += String.fromCharCode.apply(String, codeUnits);
      codeUnits.length = 0;
    }
  }
  return result;
};
var UnicodeTrie = createTrieFromBase64(base64);
var BREAK_NOT_ALLOWED = "×";
var BREAK_ALLOWED = "÷";
var codePointToClass = function(codePoint) {
  return UnicodeTrie.get(codePoint);
};
var _graphemeBreakAtIndex = function(_codePoints, classTypes, index) {
  var prevIndex = index - 2;
  var prev = classTypes[prevIndex];
  var current = classTypes[index - 1];
  var next = classTypes[index];
  if (current === CR && next === LF) {
    return BREAK_NOT_ALLOWED;
  }
  if (current === CR || current === LF || current === Control) {
    return BREAK_ALLOWED;
  }
  if (next === CR || next === LF || next === Control) {
    return BREAK_ALLOWED;
  }
  if (current === L && [L, V, LV, LVT].indexOf(next) !== -1) {
    return BREAK_NOT_ALLOWED;
  }
  if ((current === LV || current === V) && (next === V || next === T)) {
    return BREAK_NOT_ALLOWED;
  }
  if ((current === LVT || current === T) && next === T) {
    return BREAK_NOT_ALLOWED;
  }
  if (next === ZWJ || next === Extend) {
    return BREAK_NOT_ALLOWED;
  }
  if (next === SpacingMark) {
    return BREAK_NOT_ALLOWED;
  }
  if (current === Prepend) {
    return BREAK_NOT_ALLOWED;
  }
  if (current === ZWJ && next === Extended_Pictographic) {
    while (prev === Extend) {
      prev = classTypes[--prevIndex];
    }
    if (prev === Extended_Pictographic) {
      return BREAK_NOT_ALLOWED;
    }
  }
  if (current === RI && next === RI) {
    var countRI = 0;
    while (prev === RI) {
      countRI++;
      prev = classTypes[--prevIndex];
    }
    if (countRI % 2 === 0) {
      return BREAK_NOT_ALLOWED;
    }
  }
  return BREAK_ALLOWED;
};
var GraphemeBreaker = function(str) {
  var codePoints = toCodePoints(str);
  var length = codePoints.length;
  var index = 0;
  var lastEnd = 0;
  var classTypes = codePoints.map(codePointToClass);
  return {
    next: function() {
      if (index >= length) {
        return { done: true, value: null };
      }
      var graphemeBreak = BREAK_NOT_ALLOWED;
      while (index < length && (graphemeBreak = _graphemeBreakAtIndex(codePoints, classTypes, ++index)) === BREAK_NOT_ALLOWED) {
      }
      if (graphemeBreak !== BREAK_NOT_ALLOWED || index === length) {
        var value = fromCodePoint.apply(null, codePoints.slice(lastEnd, index));
        lastEnd = index;
        return { value, done: false };
      }
      return { done: true, value: null };
    }
  };
};
var splitGraphemes = function(str) {
  var breaker = GraphemeBreaker(str);
  var graphemes = [];
  var bk;
  while (!(bk = breaker.next()).done) {
    if (bk.value) {
      graphemes.push(bk.value.slice());
    }
  }
  return graphemes;
};
var testRangeBounds = function(document2) {
  var TEST_HEIGHT = 123;
  if (document2.createRange) {
    var range = document2.createRange();
    if (range.getBoundingClientRect) {
      var testElement = document2.createElement("boundtest");
      testElement.style.height = TEST_HEIGHT + "px";
      testElement.style.display = "block";
      document2.body.appendChild(testElement);
      range.selectNode(testElement);
      var rangeBounds = range.getBoundingClientRect();
      var rangeHeight = Math.round(rangeBounds.height);
      document2.body.removeChild(testElement);
      if (rangeHeight === TEST_HEIGHT) {
        return true;
      }
    }
  }
  return false;
};
var testIOSLineBreak = function(document2) {
  var testElement = document2.createElement("boundtest");
  testElement.style.width = "50px";
  testElement.style.display = "block";
  testElement.style.fontSize = "12px";
  testElement.style.letterSpacing = "0px";
  testElement.style.wordSpacing = "0px";
  document2.body.appendChild(testElement);
  var range = document2.createRange();
  testElement.innerHTML = typeof "".repeat === "function" ? "&#128104;".repeat(10) : "";
  var node = testElement.firstChild;
  var textList = toCodePoints$1(node.data).map(function(i) {
    return fromCodePoint$1(i);
  });
  var offset = 0;
  var prev = {};
  var supports = textList.every(function(text, i) {
    range.setStart(node, offset);
    range.setEnd(node, offset + text.length);
    var rect = range.getBoundingClientRect();
    offset += text.length;
    var boundAhead = rect.x > prev.x || rect.y > prev.y;
    prev = rect;
    if (i === 0) {
      return true;
    }
    return boundAhead;
  });
  document2.body.removeChild(testElement);
  return supports;
};
var testCORS = function() {
  return typeof new Image().crossOrigin !== "undefined";
};
var testResponseType = function() {
  return typeof new XMLHttpRequest().responseType === "string";
};
var testSVG = function(document2) {
  var img = new Image();
  var canvas = document2.createElement("canvas");
  var ctx = canvas.getContext("2d");
  if (!ctx) {
    return false;
  }
  img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
  try {
    ctx.drawImage(img, 0, 0);
    canvas.toDataURL();
  } catch (e2) {
    return false;
  }
  return true;
};
var isGreenPixel = function(data) {
  return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
};
var testForeignObject = function(document2) {
  var canvas = document2.createElement("canvas");
  var size = 100;
  canvas.width = size;
  canvas.height = size;
  var ctx = canvas.getContext("2d");
  if (!ctx) {
    return Promise.reject(false);
  }
  ctx.fillStyle = "rgb(0, 255, 0)";
  ctx.fillRect(0, 0, size, size);
  var img = new Image();
  var greenImageSrc = canvas.toDataURL();
  img.src = greenImageSrc;
  var svg = createForeignObjectSVG(size, size, 0, 0, img);
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, size, size);
  return loadSerializedSVG$1(svg).then(function(img2) {
    ctx.drawImage(img2, 0, 0);
    var data = ctx.getImageData(0, 0, size, size).data;
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, size, size);
    var node = document2.createElement("div");
    node.style.backgroundImage = "url(" + greenImageSrc + ")";
    node.style.height = size + "px";
    return isGreenPixel(data) ? loadSerializedSVG$1(createForeignObjectSVG(size, size, 0, 0, node)) : Promise.reject(false);
  }).then(function(img2) {
    ctx.drawImage(img2, 0, 0);
    return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
  }).catch(function() {
    return false;
  });
};
var createForeignObjectSVG = function(width, height, x, y, node) {
  var xmlns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(xmlns, "svg");
  var foreignObject = document.createElementNS(xmlns, "foreignObject");
  svg.setAttributeNS(null, "width", width.toString());
  svg.setAttributeNS(null, "height", height.toString());
  foreignObject.setAttributeNS(null, "width", "100%");
  foreignObject.setAttributeNS(null, "height", "100%");
  foreignObject.setAttributeNS(null, "x", x.toString());
  foreignObject.setAttributeNS(null, "y", y.toString());
  foreignObject.setAttributeNS(null, "externalResourcesRequired", "true");
  svg.appendChild(foreignObject);
  foreignObject.appendChild(node);
  return svg;
};
var loadSerializedSVG$1 = function(svg) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = function() {
      return resolve(img);
    };
    img.onerror = reject;
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
  });
};
var FEATURES = {
  get SUPPORT_RANGE_BOUNDS() {
    var value = testRangeBounds(document);
    Object.defineProperty(FEATURES, "SUPPORT_RANGE_BOUNDS", { value });
    return value;
  },
  get SUPPORT_WORD_BREAKING() {
    var value = FEATURES.SUPPORT_RANGE_BOUNDS && testIOSLineBreak(document);
    Object.defineProperty(FEATURES, "SUPPORT_WORD_BREAKING", { value });
    return value;
  },
  get SUPPORT_SVG_DRAWING() {
    var value = testSVG(document);
    Object.defineProperty(FEATURES, "SUPPORT_SVG_DRAWING", { value });
    return value;
  },
  get SUPPORT_FOREIGNOBJECT_DRAWING() {
    var value = typeof Array.from === "function" && typeof window.fetch === "function" ? testForeignObject(document) : Promise.resolve(false);
    Object.defineProperty(FEATURES, "SUPPORT_FOREIGNOBJECT_DRAWING", { value });
    return value;
  },
  get SUPPORT_CORS_IMAGES() {
    var value = testCORS();
    Object.defineProperty(FEATURES, "SUPPORT_CORS_IMAGES", { value });
    return value;
  },
  get SUPPORT_RESPONSE_TYPE() {
    var value = testResponseType();
    Object.defineProperty(FEATURES, "SUPPORT_RESPONSE_TYPE", { value });
    return value;
  },
  get SUPPORT_CORS_XHR() {
    var value = "withCredentials" in new XMLHttpRequest();
    Object.defineProperty(FEATURES, "SUPPORT_CORS_XHR", { value });
    return value;
  },
  get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
    var value = !!(typeof Intl !== "undefined" && Intl.Segmenter);
    Object.defineProperty(FEATURES, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value });
    return value;
  }
};
var TextBounds = (
  /** @class */
  /* @__PURE__ */ (function() {
    function TextBounds2(text, bounds) {
      this.text = text;
      this.bounds = bounds;
    }
    return TextBounds2;
  })()
);
var parseTextBounds = function(context, value, styles, node) {
  var textList = breakText(value, styles);
  var textBounds = [];
  var offset = 0;
  textList.forEach(function(text) {
    if (styles.textDecorationLine.length || text.trim().length > 0) {
      if (FEATURES.SUPPORT_RANGE_BOUNDS) {
        var clientRects = createRange(node, offset, text.length).getClientRects();
        if (clientRects.length > 1) {
          var subSegments = segmentGraphemes(text);
          var subOffset_1 = 0;
          subSegments.forEach(function(subSegment) {
            textBounds.push(new TextBounds(subSegment, Bounds.fromDOMRectList(context, createRange(node, subOffset_1 + offset, subSegment.length).getClientRects())));
            subOffset_1 += subSegment.length;
          });
        } else {
          textBounds.push(new TextBounds(text, Bounds.fromDOMRectList(context, clientRects)));
        }
      } else {
        var replacementNode = node.splitText(text.length);
        textBounds.push(new TextBounds(text, getWrapperBounds(context, node)));
        node = replacementNode;
      }
    } else if (!FEATURES.SUPPORT_RANGE_BOUNDS) {
      node = node.splitText(text.length);
    }
    offset += text.length;
  });
  return textBounds;
};
var getWrapperBounds = function(context, node) {
  var ownerDocument = node.ownerDocument;
  if (ownerDocument) {
    var wrapper = ownerDocument.createElement("html2canvaswrapper");
    wrapper.appendChild(node.cloneNode(true));
    var parentNode = node.parentNode;
    if (parentNode) {
      parentNode.replaceChild(wrapper, node);
      var bounds = parseBounds(context, wrapper);
      if (wrapper.firstChild) {
        parentNode.replaceChild(wrapper.firstChild, wrapper);
      }
      return bounds;
    }
  }
  return Bounds.EMPTY;
};
var createRange = function(node, offset, length) {
  var ownerDocument = node.ownerDocument;
  if (!ownerDocument) {
    throw new Error("Node has no owner document");
  }
  var range = ownerDocument.createRange();
  range.setStart(node, offset);
  range.setEnd(node, offset + length);
  return range;
};
var segmentGraphemes = function(value) {
  if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
    var segmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
    return Array.from(segmenter.segment(value)).map(function(segment) {
      return segment.segment;
    });
  }
  return splitGraphemes(value);
};
var segmentWords = function(value, styles) {
  if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
    var segmenter = new Intl.Segmenter(void 0, {
      granularity: "word"
    });
    return Array.from(segmenter.segment(value)).map(function(segment) {
      return segment.segment;
    });
  }
  return breakWords(value, styles);
};
var breakText = function(value, styles) {
  return styles.letterSpacing !== 0 ? segmentGraphemes(value) : segmentWords(value, styles);
};
var wordSeparators = [32, 160, 4961, 65792, 65793, 4153, 4241];
var breakWords = function(str, styles) {
  var breaker = LineBreaker(str, {
    lineBreak: styles.lineBreak,
    wordBreak: styles.overflowWrap === "break-word" ? "break-word" : styles.wordBreak
  });
  var words = [];
  var bk;
  var _loop_1 = function() {
    if (bk.value) {
      var value = bk.value.slice();
      var codePoints = toCodePoints$1(value);
      var word_1 = "";
      codePoints.forEach(function(codePoint) {
        if (wordSeparators.indexOf(codePoint) === -1) {
          word_1 += fromCodePoint$1(codePoint);
        } else {
          if (word_1.length) {
            words.push(word_1);
          }
          words.push(fromCodePoint$1(codePoint));
          word_1 = "";
        }
      });
      if (word_1.length) {
        words.push(word_1);
      }
    }
  };
  while (!(bk = breaker.next()).done) {
    _loop_1();
  }
  return words;
};
var TextContainer = (
  /** @class */
  /* @__PURE__ */ (function() {
    function TextContainer2(context, node, styles) {
      this.text = transform(node.data, styles.textTransform);
      this.textBounds = parseTextBounds(context, this.text, styles, node);
    }
    return TextContainer2;
  })()
);
var transform = function(text, transform2) {
  switch (transform2) {
    case 1:
      return text.toLowerCase();
    case 3:
      return text.replace(CAPITALIZE, capitalize);
    case 2:
      return text.toUpperCase();
    default:
      return text;
  }
};
var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
var capitalize = function(m, p1, p2) {
  if (m.length > 0) {
    return p1 + p2.toUpperCase();
  }
  return m;
};
var ImageElementContainer = (
  /** @class */
  (function(_super) {
    __extends(ImageElementContainer2, _super);
    function ImageElementContainer2(context, img) {
      var _this = _super.call(this, context, img) || this;
      _this.src = img.currentSrc || img.src;
      _this.intrinsicWidth = img.naturalWidth;
      _this.intrinsicHeight = img.naturalHeight;
      _this.context.cache.addImage(_this.src);
      return _this;
    }
    return ImageElementContainer2;
  })(ElementContainer)
);
var CanvasElementContainer = (
  /** @class */
  (function(_super) {
    __extends(CanvasElementContainer2, _super);
    function CanvasElementContainer2(context, canvas) {
      var _this = _super.call(this, context, canvas) || this;
      _this.canvas = canvas;
      _this.intrinsicWidth = canvas.width;
      _this.intrinsicHeight = canvas.height;
      return _this;
    }
    return CanvasElementContainer2;
  })(ElementContainer)
);
var SVGElementContainer = (
  /** @class */
  (function(_super) {
    __extends(SVGElementContainer2, _super);
    function SVGElementContainer2(context, img) {
      var _this = _super.call(this, context, img) || this;
      var s = new XMLSerializer();
      var bounds = parseBounds(context, img);
      img.setAttribute("width", bounds.width + "px");
      img.setAttribute("height", bounds.height + "px");
      _this.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
      _this.intrinsicWidth = img.width.baseVal.value;
      _this.intrinsicHeight = img.height.baseVal.value;
      _this.context.cache.addImage(_this.svg);
      return _this;
    }
    return SVGElementContainer2;
  })(ElementContainer)
);
var LIElementContainer = (
  /** @class */
  (function(_super) {
    __extends(LIElementContainer2, _super);
    function LIElementContainer2(context, element) {
      var _this = _super.call(this, context, element) || this;
      _this.value = element.value;
      return _this;
    }
    return LIElementContainer2;
  })(ElementContainer)
);
var OLElementContainer = (
  /** @class */
  (function(_super) {
    __extends(OLElementContainer2, _super);
    function OLElementContainer2(context, element) {
      var _this = _super.call(this, context, element) || this;
      _this.start = element.start;
      _this.reversed = typeof element.reversed === "boolean" && element.reversed === true;
      return _this;
    }
    return OLElementContainer2;
  })(ElementContainer)
);
var CHECKBOX_BORDER_RADIUS = [
  {
    type: 15,
    flags: 0,
    unit: "px",
    number: 3
  }
];
var RADIO_BORDER_RADIUS = [
  {
    type: 16,
    flags: 0,
    number: 50
  }
];
var reformatInputBounds = function(bounds) {
  if (bounds.width > bounds.height) {
    return new Bounds(bounds.left + (bounds.width - bounds.height) / 2, bounds.top, bounds.height, bounds.height);
  } else if (bounds.width < bounds.height) {
    return new Bounds(bounds.left, bounds.top + (bounds.height - bounds.width) / 2, bounds.width, bounds.width);
  }
  return bounds;
};
var getInputValue = function(node) {
  var value = node.type === PASSWORD ? new Array(node.value.length + 1).join("•") : node.value;
  return value.length === 0 ? node.placeholder || "" : value;
};
var CHECKBOX = "checkbox";
var RADIO = "radio";
var PASSWORD = "password";
var INPUT_COLOR = 707406591;
var InputElementContainer = (
  /** @class */
  (function(_super) {
    __extends(InputElementContainer2, _super);
    function InputElementContainer2(context, input) {
      var _this = _super.call(this, context, input) || this;
      _this.type = input.type.toLowerCase();
      _this.checked = input.checked;
      _this.value = getInputValue(input);
      if (_this.type === CHECKBOX || _this.type === RADIO) {
        _this.styles.backgroundColor = 3739148031;
        _this.styles.borderTopColor = _this.styles.borderRightColor = _this.styles.borderBottomColor = _this.styles.borderLeftColor = 2779096575;
        _this.styles.borderTopWidth = _this.styles.borderRightWidth = _this.styles.borderBottomWidth = _this.styles.borderLeftWidth = 1;
        _this.styles.borderTopStyle = _this.styles.borderRightStyle = _this.styles.borderBottomStyle = _this.styles.borderLeftStyle = 1;
        _this.styles.backgroundClip = [
          0
          /* BORDER_BOX */
        ];
        _this.styles.backgroundOrigin = [
          0
          /* BORDER_BOX */
        ];
        _this.bounds = reformatInputBounds(_this.bounds);
      }
      switch (_this.type) {
        case CHECKBOX:
          _this.styles.borderTopRightRadius = _this.styles.borderTopLeftRadius = _this.styles.borderBottomRightRadius = _this.styles.borderBottomLeftRadius = CHECKBOX_BORDER_RADIUS;
          break;
        case RADIO:
          _this.styles.borderTopRightRadius = _this.styles.borderTopLeftRadius = _this.styles.borderBottomRightRadius = _this.styles.borderBottomLeftRadius = RADIO_BORDER_RADIUS;
          break;
      }
      return _this;
    }
    return InputElementContainer2;
  })(ElementContainer)
);
var SelectElementContainer = (
  /** @class */
  (function(_super) {
    __extends(SelectElementContainer2, _super);
    function SelectElementContainer2(context, element) {
      var _this = _super.call(this, context, element) || this;
      var option = element.options[element.selectedIndex || 0];
      _this.value = option ? option.text || "" : "";
      return _this;
    }
    return SelectElementContainer2;
  })(ElementContainer)
);
var TextareaElementContainer = (
  /** @class */
  (function(_super) {
    __extends(TextareaElementContainer2, _super);
    function TextareaElementContainer2(context, element) {
      var _this = _super.call(this, context, element) || this;
      _this.value = element.value;
      return _this;
    }
    return TextareaElementContainer2;
  })(ElementContainer)
);
var IFrameElementContainer = (
  /** @class */
  (function(_super) {
    __extends(IFrameElementContainer2, _super);
    function IFrameElementContainer2(context, iframe) {
      var _this = _super.call(this, context, iframe) || this;
      _this.src = iframe.src;
      _this.width = parseInt(iframe.width, 10) || 0;
      _this.height = parseInt(iframe.height, 10) || 0;
      _this.backgroundColor = _this.styles.backgroundColor;
      try {
        if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.documentElement) {
          _this.tree = parseTree(context, iframe.contentWindow.document.documentElement);
          var documentBackgroundColor = iframe.contentWindow.document.documentElement ? parseColor(context, getComputedStyle(iframe.contentWindow.document.documentElement).backgroundColor) : COLORS.TRANSPARENT;
          var bodyBackgroundColor = iframe.contentWindow.document.body ? parseColor(context, getComputedStyle(iframe.contentWindow.document.body).backgroundColor) : COLORS.TRANSPARENT;
          _this.backgroundColor = isTransparent(documentBackgroundColor) ? isTransparent(bodyBackgroundColor) ? _this.styles.backgroundColor : bodyBackgroundColor : documentBackgroundColor;
        }
      } catch (e2) {
      }
      return _this;
    }
    return IFrameElementContainer2;
  })(ElementContainer)
);
var LIST_OWNERS = ["OL", "UL", "MENU"];
var parseNodeTree = function(context, node, parent, root) {
  for (var childNode = node.firstChild, nextNode = void 0; childNode; childNode = nextNode) {
    nextNode = childNode.nextSibling;
    if (isTextNode(childNode) && childNode.data.trim().length > 0) {
      parent.textNodes.push(new TextContainer(context, childNode, parent.styles));
    } else if (isElementNode(childNode)) {
      if (isSlotElement(childNode) && childNode.assignedNodes) {
        childNode.assignedNodes().forEach(function(childNode2) {
          return parseNodeTree(context, childNode2, parent, root);
        });
      } else {
        var container = createContainer(context, childNode);
        if (container.styles.isVisible()) {
          if (createsRealStackingContext(childNode, container, root)) {
            container.flags |= 4;
          } else if (createsStackingContext(container.styles)) {
            container.flags |= 2;
          }
          if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
            container.flags |= 8;
          }
          parent.elements.push(container);
          childNode.slot;
          if (childNode.shadowRoot) {
            parseNodeTree(context, childNode.shadowRoot, container, root);
          } else if (!isTextareaElement(childNode) && !isSVGElement(childNode) && !isSelectElement(childNode)) {
            parseNodeTree(context, childNode, container, root);
          }
        }
      }
    }
  }
};
var createContainer = function(context, element) {
  if (isImageElement(element)) {
    return new ImageElementContainer(context, element);
  }
  if (isCanvasElement(element)) {
    return new CanvasElementContainer(context, element);
  }
  if (isSVGElement(element)) {
    return new SVGElementContainer(context, element);
  }
  if (isLIElement(element)) {
    return new LIElementContainer(context, element);
  }
  if (isOLElement(element)) {
    return new OLElementContainer(context, element);
  }
  if (isInputElement(element)) {
    return new InputElementContainer(context, element);
  }
  if (isSelectElement(element)) {
    return new SelectElementContainer(context, element);
  }
  if (isTextareaElement(element)) {
    return new TextareaElementContainer(context, element);
  }
  if (isIFrameElement(element)) {
    return new IFrameElementContainer(context, element);
  }
  return new ElementContainer(context, element);
};
var parseTree = function(context, element) {
  var container = createContainer(context, element);
  container.flags |= 4;
  parseNodeTree(context, element, container, container);
  return container;
};
var createsRealStackingContext = function(node, container, root) {
  return container.styles.isPositionedWithZIndex() || container.styles.opacity < 1 || container.styles.isTransformed() || isBodyElement(node) && root.styles.isTransparent();
};
var createsStackingContext = function(styles) {
  return styles.isPositioned() || styles.isFloating();
};
var isTextNode = function(node) {
  return node.nodeType === Node.TEXT_NODE;
};
var isElementNode = function(node) {
  return node.nodeType === Node.ELEMENT_NODE;
};
var isHTMLElementNode = function(node) {
  return isElementNode(node) && typeof node.style !== "undefined" && !isSVGElementNode(node);
};
var isSVGElementNode = function(element) {
  return typeof element.className === "object";
};
var isLIElement = function(node) {
  return node.tagName === "LI";
};
var isOLElement = function(node) {
  return node.tagName === "OL";
};
var isInputElement = function(node) {
  return node.tagName === "INPUT";
};
var isHTMLElement = function(node) {
  return node.tagName === "HTML";
};
var isSVGElement = function(node) {
  return node.tagName === "svg";
};
var isBodyElement = function(node) {
  return node.tagName === "BODY";
};
var isCanvasElement = function(node) {
  return node.tagName === "CANVAS";
};
var isVideoElement = function(node) {
  return node.tagName === "VIDEO";
};
var isImageElement = function(node) {
  return node.tagName === "IMG";
};
var isIFrameElement = function(node) {
  return node.tagName === "IFRAME";
};
var isStyleElement = function(node) {
  return node.tagName === "STYLE";
};
var isScriptElement = function(node) {
  return node.tagName === "SCRIPT";
};
var isTextareaElement = function(node) {
  return node.tagName === "TEXTAREA";
};
var isSelectElement = function(node) {
  return node.tagName === "SELECT";
};
var isSlotElement = function(node) {
  return node.tagName === "SLOT";
};
var isCustomElement = function(node) {
  return node.tagName.indexOf("-") > 0;
};
var CounterState = (
  /** @class */
  (function() {
    function CounterState2() {
      this.counters = {};
    }
    CounterState2.prototype.getCounterValue = function(name) {
      var counter = this.counters[name];
      if (counter && counter.length) {
        return counter[counter.length - 1];
      }
      return 1;
    };
    CounterState2.prototype.getCounterValues = function(name) {
      var counter = this.counters[name];
      return counter ? counter : [];
    };
    CounterState2.prototype.pop = function(counters) {
      var _this = this;
      counters.forEach(function(counter) {
        return _this.counters[counter].pop();
      });
    };
    CounterState2.prototype.parse = function(style) {
      var _this = this;
      var counterIncrement2 = style.counterIncrement;
      var counterReset2 = style.counterReset;
      var canReset = true;
      if (counterIncrement2 !== null) {
        counterIncrement2.forEach(function(entry) {
          var counter = _this.counters[entry.counter];
          if (counter && entry.increment !== 0) {
            canReset = false;
            if (!counter.length) {
              counter.push(1);
            }
            counter[Math.max(0, counter.length - 1)] += entry.increment;
          }
        });
      }
      var counterNames = [];
      if (canReset) {
        counterReset2.forEach(function(entry) {
          var counter = _this.counters[entry.counter];
          counterNames.push(entry.counter);
          if (!counter) {
            counter = _this.counters[entry.counter] = [];
          }
          counter.push(entry.reset);
        });
      }
      return counterNames;
    };
    return CounterState2;
  })()
);
var ROMAN_UPPER = {
  integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
  values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
};
var ARMENIAN = {
  integers: [
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    900,
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "Ք",
    "Փ",
    "Ւ",
    "Ց",
    "Ր",
    "Տ",
    "Վ",
    "Ս",
    "Ռ",
    "Ջ",
    "Պ",
    "Չ",
    "Ո",
    "Շ",
    "Ն",
    "Յ",
    "Մ",
    "Ճ",
    "Ղ",
    "Ձ",
    "Հ",
    "Կ",
    "Ծ",
    "Խ",
    "Լ",
    "Ի",
    "Ժ",
    "Թ",
    "Ը",
    "Է",
    "Զ",
    "Ե",
    "Դ",
    "Գ",
    "Բ",
    "Ա"
  ]
};
var HEBREW = {
  integers: [
    1e4,
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    19,
    18,
    17,
    16,
    15,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "י׳",
    "ט׳",
    "ח׳",
    "ז׳",
    "ו׳",
    "ה׳",
    "ד׳",
    "ג׳",
    "ב׳",
    "א׳",
    "ת",
    "ש",
    "ר",
    "ק",
    "צ",
    "פ",
    "ע",
    "ס",
    "נ",
    "מ",
    "ל",
    "כ",
    "יט",
    "יח",
    "יז",
    "טז",
    "טו",
    "י",
    "ט",
    "ח",
    "ז",
    "ו",
    "ה",
    "ד",
    "ג",
    "ב",
    "א"
  ]
};
var GEORGIAN = {
  integers: [
    1e4,
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    900,
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "ჵ",
    "ჰ",
    "ჯ",
    "ჴ",
    "ხ",
    "ჭ",
    "წ",
    "ძ",
    "ც",
    "ჩ",
    "შ",
    "ყ",
    "ღ",
    "ქ",
    "ფ",
    "ჳ",
    "ტ",
    "ს",
    "რ",
    "ჟ",
    "პ",
    "ო",
    "ჲ",
    "ნ",
    "მ",
    "ლ",
    "კ",
    "ი",
    "თ",
    "ჱ",
    "ზ",
    "ვ",
    "ე",
    "დ",
    "გ",
    "ბ",
    "ა"
  ]
};
var createAdditiveCounter = function(value, min, max, symbols, fallback, suffix) {
  if (value < min || value > max) {
    return createCounterText(value, fallback, suffix.length > 0);
  }
  return symbols.integers.reduce(function(string, integer, index) {
    while (value >= integer) {
      value -= integer;
      string += symbols.values[index];
    }
    return string;
  }, "") + suffix;
};
var createCounterStyleWithSymbolResolver = function(value, codePointRangeLength, isNumeric, resolver) {
  var string = "";
  do {
    if (!isNumeric) {
      value--;
    }
    string = resolver(value) + string;
    value /= codePointRangeLength;
  } while (value * codePointRangeLength >= codePointRangeLength);
  return string;
};
var createCounterStyleFromRange = function(value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
  var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;
  return (value < 0 ? "-" : "") + (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function(codePoint) {
    return fromCodePoint$1(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
  }) + suffix);
};
var createCounterStyleFromSymbols = function(value, symbols, suffix) {
  if (suffix === void 0) {
    suffix = ". ";
  }
  var codePointRangeLength = symbols.length;
  return createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function(codePoint) {
    return symbols[Math.floor(codePoint % codePointRangeLength)];
  }) + suffix;
};
var CJK_ZEROS = 1 << 0;
var CJK_TEN_COEFFICIENTS = 1 << 1;
var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
var CJK_HUNDRED_COEFFICIENTS = 1 << 3;
var createCJKCounter = function(value, numbers, multipliers, negativeSign, suffix, flags) {
  if (value < -9999 || value > 9999) {
    return createCounterText(value, 4, suffix.length > 0);
  }
  var tmp = Math.abs(value);
  var string = suffix;
  if (tmp === 0) {
    return numbers[0] + string;
  }
  for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
    var coefficient = tmp % 10;
    if (coefficient === 0 && contains(flags, CJK_ZEROS) && string !== "") {
      string = numbers[coefficient] + string;
    } else if (coefficient > 1 || coefficient === 1 && digit === 0 || coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_COEFFICIENTS) || coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100 || coefficient === 1 && digit > 1 && contains(flags, CJK_HUNDRED_COEFFICIENTS)) {
      string = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : "") + string;
    } else if (coefficient === 1 && digit > 0) {
      string = multipliers[digit - 1] + string;
    }
    tmp = Math.floor(tmp / 10);
  }
  return (value < 0 ? negativeSign : "") + string;
};
var CHINESE_INFORMAL_MULTIPLIERS = "十百千萬";
var CHINESE_FORMAL_MULTIPLIERS = "拾佰仟萬";
var JAPANESE_NEGATIVE = "マイナス";
var KOREAN_NEGATIVE = "마이너스";
var createCounterText = function(value, type, appendSuffix) {
  var defaultSuffix = appendSuffix ? ". " : "";
  var cjkSuffix = appendSuffix ? "、" : "";
  var koreanSuffix = appendSuffix ? ", " : "";
  var spaceSuffix = appendSuffix ? " " : "";
  switch (type) {
    case 0:
      return "•" + spaceSuffix;
    case 1:
      return "◦" + spaceSuffix;
    case 2:
      return "◾" + spaceSuffix;
    case 5:
      var string = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
      return string.length < 4 ? "0" + string : string;
    case 4:
      return createCounterStyleFromSymbols(value, "〇一二三四五六七八九", cjkSuffix);
    case 6:
      return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3, defaultSuffix).toLowerCase();
    case 7:
      return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3, defaultSuffix);
    case 8:
      return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
    case 9:
      return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
    case 10:
      return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
    case 11:
      return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
    case 12:
    case 49:
      return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3, defaultSuffix);
    case 35:
      return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3, defaultSuffix).toLowerCase();
    case 13:
      return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
    case 14:
    case 30:
      return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
    case 15:
      return createCounterStyleFromSymbols(value, "子丑寅卯辰巳午未申酉戌亥", cjkSuffix);
    case 16:
      return createCounterStyleFromSymbols(value, "甲乙丙丁戊己庚辛壬癸", cjkSuffix);
    case 17:
    case 48:
      return createCJKCounter(value, "零一二三四五六七八九", CHINESE_INFORMAL_MULTIPLIERS, "負", cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
    case 47:
      return createCJKCounter(value, "零壹貳參肆伍陸柒捌玖", CHINESE_FORMAL_MULTIPLIERS, "負", cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
    case 42:
      return createCJKCounter(value, "零一二三四五六七八九", CHINESE_INFORMAL_MULTIPLIERS, "负", cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
    case 41:
      return createCJKCounter(value, "零壹贰叁肆伍陆柒捌玖", CHINESE_FORMAL_MULTIPLIERS, "负", cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
    case 26:
      return createCJKCounter(value, "〇一二三四五六七八九", "十百千万", JAPANESE_NEGATIVE, cjkSuffix, 0);
    case 25:
      return createCJKCounter(value, "零壱弐参四伍六七八九", "拾百千万", JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
    case 31:
      return createCJKCounter(value, "영일이삼사오육칠팔구", "십백천만", KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
    case 33:
      return createCJKCounter(value, "零一二三四五六七八九", "十百千萬", KOREAN_NEGATIVE, koreanSuffix, 0);
    case 32:
      return createCJKCounter(value, "零壹貳參四五六七八九", "拾百千", KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
    case 18:
      return createCounterStyleFromRange(value, 2406, 2415, true, defaultSuffix);
    case 20:
      return createAdditiveCounter(value, 1, 19999, GEORGIAN, 3, defaultSuffix);
    case 21:
      return createCounterStyleFromRange(value, 2790, 2799, true, defaultSuffix);
    case 22:
      return createCounterStyleFromRange(value, 2662, 2671, true, defaultSuffix);
    case 22:
      return createAdditiveCounter(value, 1, 10999, HEBREW, 3, defaultSuffix);
    case 23:
      return createCounterStyleFromSymbols(value, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
    case 24:
      return createCounterStyleFromSymbols(value, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
    case 27:
      return createCounterStyleFromRange(value, 3302, 3311, true, defaultSuffix);
    case 28:
      return createCounterStyleFromSymbols(value, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", cjkSuffix);
    case 29:
      return createCounterStyleFromSymbols(value, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", cjkSuffix);
    case 34:
      return createCounterStyleFromRange(value, 3792, 3801, true, defaultSuffix);
    case 37:
      return createCounterStyleFromRange(value, 6160, 6169, true, defaultSuffix);
    case 38:
      return createCounterStyleFromRange(value, 4160, 4169, true, defaultSuffix);
    case 39:
      return createCounterStyleFromRange(value, 2918, 2927, true, defaultSuffix);
    case 40:
      return createCounterStyleFromRange(value, 1776, 1785, true, defaultSuffix);
    case 43:
      return createCounterStyleFromRange(value, 3046, 3055, true, defaultSuffix);
    case 44:
      return createCounterStyleFromRange(value, 3174, 3183, true, defaultSuffix);
    case 45:
      return createCounterStyleFromRange(value, 3664, 3673, true, defaultSuffix);
    case 46:
      return createCounterStyleFromRange(value, 3872, 3881, true, defaultSuffix);
    case 3:
    default:
      return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
  }
};
var IGNORE_ATTRIBUTE = "data-html2canvas-ignore";
var DocumentCloner = (
  /** @class */
  (function() {
    function DocumentCloner2(context, element, options) {
      this.context = context;
      this.options = options;
      this.scrolledElements = [];
      this.referenceElement = element;
      this.counters = new CounterState();
      this.quoteDepth = 0;
      if (!element.ownerDocument) {
        throw new Error("Cloned element does not have an owner document");
      }
      this.documentElement = this.cloneNode(element.ownerDocument.documentElement, false);
    }
    DocumentCloner2.prototype.toIFrame = function(ownerDocument, windowSize) {
      var _this = this;
      var iframe = createIFrameContainer(ownerDocument, windowSize);
      if (!iframe.contentWindow) {
        return Promise.reject("Unable to find iframe window");
      }
      var scrollX = ownerDocument.defaultView.pageXOffset;
      var scrollY = ownerDocument.defaultView.pageYOffset;
      var cloneWindow = iframe.contentWindow;
      var documentClone = cloneWindow.document;
      var iframeLoad = iframeLoader(iframe).then(function() {
        return __awaiter(_this, void 0, void 0, function() {
          var onclone, referenceElement;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                this.scrolledElements.forEach(restoreNodeScroll);
                if (cloneWindow) {
                  cloneWindow.scrollTo(windowSize.left, windowSize.top);
                  if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (cloneWindow.scrollY !== windowSize.top || cloneWindow.scrollX !== windowSize.left)) {
                    this.context.logger.warn("Unable to restore scroll position for cloned document");
                    this.context.windowBounds = this.context.windowBounds.add(cloneWindow.scrollX - windowSize.left, cloneWindow.scrollY - windowSize.top, 0, 0);
                  }
                }
                onclone = this.options.onclone;
                referenceElement = this.clonedReferenceElement;
                if (typeof referenceElement === "undefined") {
                  return [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")];
                }
                if (!(documentClone.fonts && documentClone.fonts.ready)) return [3, 2];
                return [4, documentClone.fonts.ready];
              case 1:
                _a.sent();
                _a.label = 2;
              case 2:
                if (!/(AppleWebKit)/g.test(navigator.userAgent)) return [3, 4];
                return [4, imagesReady(documentClone)];
              case 3:
                _a.sent();
                _a.label = 4;
              case 4:
                if (typeof onclone === "function") {
                  return [2, Promise.resolve().then(function() {
                    return onclone(documentClone, referenceElement);
                  }).then(function() {
                    return iframe;
                  })];
                }
                return [2, iframe];
            }
          });
        });
      });
      documentClone.open();
      documentClone.write(serializeDoctype(document.doctype) + "<html></html>");
      restoreOwnerScroll(this.referenceElement.ownerDocument, scrollX, scrollY);
      documentClone.replaceChild(documentClone.adoptNode(this.documentElement), documentClone.documentElement);
      documentClone.close();
      return iframeLoad;
    };
    DocumentCloner2.prototype.createElementClone = function(node) {
      if (isDebugging(
        node,
        2
        /* CLONE */
      )) {
        debugger;
      }
      if (isCanvasElement(node)) {
        return this.createCanvasClone(node);
      }
      if (isVideoElement(node)) {
        return this.createVideoClone(node);
      }
      if (isStyleElement(node)) {
        return this.createStyleClone(node);
      }
      var clone = node.cloneNode(false);
      if (isImageElement(clone)) {
        if (isImageElement(node) && node.currentSrc && node.currentSrc !== node.src) {
          clone.src = node.currentSrc;
          clone.srcset = "";
        }
        if (clone.loading === "lazy") {
          clone.loading = "eager";
        }
      }
      if (isCustomElement(clone)) {
        return this.createCustomElementClone(clone);
      }
      return clone;
    };
    DocumentCloner2.prototype.createCustomElementClone = function(node) {
      var clone = document.createElement("html2canvascustomelement");
      copyCSSStyles(node.style, clone);
      return clone;
    };
    DocumentCloner2.prototype.createStyleClone = function(node) {
      try {
        var sheet = node.sheet;
        if (sheet && sheet.cssRules) {
          var css = [].slice.call(sheet.cssRules, 0).reduce(function(css2, rule) {
            if (rule && typeof rule.cssText === "string") {
              return css2 + rule.cssText;
            }
            return css2;
          }, "");
          var style = node.cloneNode(false);
          style.textContent = css;
          return style;
        }
      } catch (e2) {
        this.context.logger.error("Unable to access cssRules property", e2);
        if (e2.name !== "SecurityError") {
          throw e2;
        }
      }
      return node.cloneNode(false);
    };
    DocumentCloner2.prototype.createCanvasClone = function(canvas) {
      var _a;
      if (this.options.inlineImages && canvas.ownerDocument) {
        var img = canvas.ownerDocument.createElement("img");
        try {
          img.src = canvas.toDataURL();
          return img;
        } catch (e2) {
          this.context.logger.info("Unable to inline canvas contents, canvas is tainted", canvas);
        }
      }
      var clonedCanvas = canvas.cloneNode(false);
      try {
        clonedCanvas.width = canvas.width;
        clonedCanvas.height = canvas.height;
        var ctx = canvas.getContext("2d");
        var clonedCtx = clonedCanvas.getContext("2d");
        if (clonedCtx) {
          if (!this.options.allowTaint && ctx) {
            clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
          } else {
            var gl = (_a = canvas.getContext("webgl2")) !== null && _a !== void 0 ? _a : canvas.getContext("webgl");
            if (gl) {
              var attribs = gl.getContextAttributes();
              if ((attribs === null || attribs === void 0 ? void 0 : attribs.preserveDrawingBuffer) === false) {
                this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", canvas);
              }
            }
            clonedCtx.drawImage(canvas, 0, 0);
          }
        }
        return clonedCanvas;
      } catch (e2) {
        this.context.logger.info("Unable to clone canvas as it is tainted", canvas);
      }
      return clonedCanvas;
    };
    DocumentCloner2.prototype.createVideoClone = function(video) {
      var canvas = video.ownerDocument.createElement("canvas");
      canvas.width = video.offsetWidth;
      canvas.height = video.offsetHeight;
      var ctx = canvas.getContext("2d");
      try {
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          if (!this.options.allowTaint) {
            ctx.getImageData(0, 0, canvas.width, canvas.height);
          }
        }
        return canvas;
      } catch (e2) {
        this.context.logger.info("Unable to clone video as it is tainted", video);
      }
      var blankCanvas = video.ownerDocument.createElement("canvas");
      blankCanvas.width = video.offsetWidth;
      blankCanvas.height = video.offsetHeight;
      return blankCanvas;
    };
    DocumentCloner2.prototype.appendChildNode = function(clone, child, copyStyles) {
      if (!isElementNode(child) || !isScriptElement(child) && !child.hasAttribute(IGNORE_ATTRIBUTE) && (typeof this.options.ignoreElements !== "function" || !this.options.ignoreElements(child))) {
        if (!this.options.copyStyles || !isElementNode(child) || !isStyleElement(child)) {
          clone.appendChild(this.cloneNode(child, copyStyles));
        }
      }
    };
    DocumentCloner2.prototype.cloneChildNodes = function(node, clone, copyStyles) {
      var _this = this;
      for (var child = node.shadowRoot ? node.shadowRoot.firstChild : node.firstChild; child; child = child.nextSibling) {
        if (isElementNode(child) && isSlotElement(child) && typeof child.assignedNodes === "function") {
          var assignedNodes = child.assignedNodes();
          if (assignedNodes.length) {
            assignedNodes.forEach(function(assignedNode) {
              return _this.appendChildNode(clone, assignedNode, copyStyles);
            });
          }
        } else {
          this.appendChildNode(clone, child, copyStyles);
        }
      }
    };
    DocumentCloner2.prototype.cloneNode = function(node, copyStyles) {
      if (isTextNode(node)) {
        return document.createTextNode(node.data);
      }
      if (!node.ownerDocument) {
        return node.cloneNode(false);
      }
      var window2 = node.ownerDocument.defaultView;
      if (window2 && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
        var clone = this.createElementClone(node);
        clone.style.transitionProperty = "none";
        var style = window2.getComputedStyle(node);
        var styleBefore = window2.getComputedStyle(node, ":before");
        var styleAfter = window2.getComputedStyle(node, ":after");
        if (this.referenceElement === node && isHTMLElementNode(clone)) {
          this.clonedReferenceElement = clone;
        }
        if (isBodyElement(clone)) {
          createPseudoHideStyles(clone);
        }
        var counters = this.counters.parse(new CSSParsedCounterDeclaration(this.context, style));
        var before = this.resolvePseudoContent(node, clone, styleBefore, PseudoElementType.BEFORE);
        if (isCustomElement(node)) {
          copyStyles = true;
        }
        if (!isVideoElement(node)) {
          this.cloneChildNodes(node, clone, copyStyles);
        }
        if (before) {
          clone.insertBefore(before, clone.firstChild);
        }
        var after = this.resolvePseudoContent(node, clone, styleAfter, PseudoElementType.AFTER);
        if (after) {
          clone.appendChild(after);
        }
        this.counters.pop(counters);
        if (style && (this.options.copyStyles || isSVGElementNode(node)) && !isIFrameElement(node) || copyStyles) {
          copyCSSStyles(style, clone);
        }
        if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
          this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
        }
        if ((isTextareaElement(node) || isSelectElement(node)) && (isTextareaElement(clone) || isSelectElement(clone))) {
          clone.value = node.value;
        }
        return clone;
      }
      return node.cloneNode(false);
    };
    DocumentCloner2.prototype.resolvePseudoContent = function(node, clone, style, pseudoElt) {
      var _this = this;
      if (!style) {
        return;
      }
      var value = style.content;
      var document2 = clone.ownerDocument;
      if (!document2 || !value || value === "none" || value === "-moz-alt-content" || style.display === "none") {
        return;
      }
      this.counters.parse(new CSSParsedCounterDeclaration(this.context, style));
      var declaration = new CSSParsedPseudoDeclaration(this.context, style);
      var anonymousReplacedElement = document2.createElement("html2canvaspseudoelement");
      copyCSSStyles(style, anonymousReplacedElement);
      declaration.content.forEach(function(token) {
        if (token.type === 0) {
          anonymousReplacedElement.appendChild(document2.createTextNode(token.value));
        } else if (token.type === 22) {
          var img = document2.createElement("img");
          img.src = token.value;
          img.style.opacity = "1";
          anonymousReplacedElement.appendChild(img);
        } else if (token.type === 18) {
          if (token.name === "attr") {
            var attr = token.values.filter(isIdentToken);
            if (attr.length) {
              anonymousReplacedElement.appendChild(document2.createTextNode(node.getAttribute(attr[0].value) || ""));
            }
          } else if (token.name === "counter") {
            var _a = token.values.filter(nonFunctionArgSeparator), counter = _a[0], counterStyle = _a[1];
            if (counter && isIdentToken(counter)) {
              var counterState = _this.counters.getCounterValue(counter.value);
              var counterType = counterStyle && isIdentToken(counterStyle) ? listStyleType.parse(_this.context, counterStyle.value) : 3;
              anonymousReplacedElement.appendChild(document2.createTextNode(createCounterText(counterState, counterType, false)));
            }
          } else if (token.name === "counters") {
            var _b = token.values.filter(nonFunctionArgSeparator), counter = _b[0], delim = _b[1], counterStyle = _b[2];
            if (counter && isIdentToken(counter)) {
              var counterStates = _this.counters.getCounterValues(counter.value);
              var counterType_1 = counterStyle && isIdentToken(counterStyle) ? listStyleType.parse(_this.context, counterStyle.value) : 3;
              var separator = delim && delim.type === 0 ? delim.value : "";
              var text = counterStates.map(function(value2) {
                return createCounterText(value2, counterType_1, false);
              }).join(separator);
              anonymousReplacedElement.appendChild(document2.createTextNode(text));
            }
          } else ;
        } else if (token.type === 20) {
          switch (token.value) {
            case "open-quote":
              anonymousReplacedElement.appendChild(document2.createTextNode(getQuote(declaration.quotes, _this.quoteDepth++, true)));
              break;
            case "close-quote":
              anonymousReplacedElement.appendChild(document2.createTextNode(getQuote(declaration.quotes, --_this.quoteDepth, false)));
              break;
            default:
              anonymousReplacedElement.appendChild(document2.createTextNode(token.value));
          }
        }
      });
      anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
      var newClassName = pseudoElt === PseudoElementType.BEFORE ? " " + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE : " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
      if (isSVGElementNode(clone)) {
        clone.className.baseValue += newClassName;
      } else {
        clone.className += newClassName;
      }
      return anonymousReplacedElement;
    };
    DocumentCloner2.destroy = function(container) {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
        return true;
      }
      return false;
    };
    return DocumentCloner2;
  })()
);
var PseudoElementType;
(function(PseudoElementType2) {
  PseudoElementType2[PseudoElementType2["BEFORE"] = 0] = "BEFORE";
  PseudoElementType2[PseudoElementType2["AFTER"] = 1] = "AFTER";
})(PseudoElementType || (PseudoElementType = {}));
var createIFrameContainer = function(ownerDocument, bounds) {
  var cloneIframeContainer = ownerDocument.createElement("iframe");
  cloneIframeContainer.className = "html2canvas-container";
  cloneIframeContainer.style.visibility = "hidden";
  cloneIframeContainer.style.position = "fixed";
  cloneIframeContainer.style.left = "-10000px";
  cloneIframeContainer.style.top = "0px";
  cloneIframeContainer.style.border = "0";
  cloneIframeContainer.width = bounds.width.toString();
  cloneIframeContainer.height = bounds.height.toString();
  cloneIframeContainer.scrolling = "no";
  cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, "true");
  ownerDocument.body.appendChild(cloneIframeContainer);
  return cloneIframeContainer;
};
var imageReady = function(img) {
  return new Promise(function(resolve) {
    if (img.complete) {
      resolve();
      return;
    }
    if (!img.src) {
      resolve();
      return;
    }
    img.onload = resolve;
    img.onerror = resolve;
  });
};
var imagesReady = function(document2) {
  return Promise.all([].slice.call(document2.images, 0).map(imageReady));
};
var iframeLoader = function(iframe) {
  return new Promise(function(resolve, reject) {
    var cloneWindow = iframe.contentWindow;
    if (!cloneWindow) {
      return reject("No window assigned for iframe");
    }
    var documentClone = cloneWindow.document;
    cloneWindow.onload = iframe.onload = function() {
      cloneWindow.onload = iframe.onload = null;
      var interval = setInterval(function() {
        if (documentClone.body.childNodes.length > 0 && documentClone.readyState === "complete") {
          clearInterval(interval);
          resolve(iframe);
        }
      }, 50);
    };
  });
};
var ignoredStyleProperties = [
  "all",
  "d",
  "content"
  // Safari shows pseudoelements if content is set
];
var copyCSSStyles = function(style, target) {
  for (var i = style.length - 1; i >= 0; i--) {
    var property = style.item(i);
    if (ignoredStyleProperties.indexOf(property) === -1) {
      target.style.setProperty(property, style.getPropertyValue(property));
    }
  }
  return target;
};
var serializeDoctype = function(doctype) {
  var str = "";
  if (doctype) {
    str += "<!DOCTYPE ";
    if (doctype.name) {
      str += doctype.name;
    }
    if (doctype.internalSubset) {
      str += doctype.internalSubset;
    }
    if (doctype.publicId) {
      str += '"' + doctype.publicId + '"';
    }
    if (doctype.systemId) {
      str += '"' + doctype.systemId + '"';
    }
    str += ">";
  }
  return str;
};
var restoreOwnerScroll = function(ownerDocument, x, y) {
  if (ownerDocument && ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
    ownerDocument.defaultView.scrollTo(x, y);
  }
};
var restoreNodeScroll = function(_a) {
  var element = _a[0], x = _a[1], y = _a[2];
  element.scrollLeft = x;
  element.scrollTop = y;
};
var PSEUDO_BEFORE = ":before";
var PSEUDO_AFTER = ":after";
var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";
var PSEUDO_HIDE_ELEMENT_STYLE = '{\n    content: "" !important;\n    display: none !important;\n}';
var createPseudoHideStyles = function(body) {
  createStyles(body, "." + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + "\n         ." + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
};
var createStyles = function(body, styles) {
  var document2 = body.ownerDocument;
  if (document2) {
    var style = document2.createElement("style");
    style.textContent = styles;
    body.appendChild(style);
  }
};
var CacheStorage = (
  /** @class */
  (function() {
    function CacheStorage2() {
    }
    CacheStorage2.getOrigin = function(url) {
      var link = CacheStorage2._link;
      if (!link) {
        return "about:blank";
      }
      link.href = url;
      link.href = link.href;
      return link.protocol + link.hostname + link.port;
    };
    CacheStorage2.isSameOrigin = function(src) {
      return CacheStorage2.getOrigin(src) === CacheStorage2._origin;
    };
    CacheStorage2.setContext = function(window2) {
      CacheStorage2._link = window2.document.createElement("a");
      CacheStorage2._origin = CacheStorage2.getOrigin(window2.location.href);
    };
    CacheStorage2._origin = "about:blank";
    return CacheStorage2;
  })()
);
var Cache = (
  /** @class */
  (function() {
    function Cache2(context, _options) {
      this.context = context;
      this._options = _options;
      this._cache = {};
    }
    Cache2.prototype.addImage = function(src) {
      var result = Promise.resolve();
      if (this.has(src)) {
        return result;
      }
      if (isBlobImage(src) || isRenderable(src)) {
        (this._cache[src] = this.loadImage(src)).catch(function() {
        });
        return result;
      }
      return result;
    };
    Cache2.prototype.match = function(src) {
      return this._cache[src];
    };
    Cache2.prototype.loadImage = function(key) {
      return __awaiter(this, void 0, void 0, function() {
        var isSameOrigin, useCORS, useProxy, src;
        var _this = this;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              isSameOrigin = CacheStorage.isSameOrigin(key);
              useCORS = !isInlineImage(key) && this._options.useCORS === true && FEATURES.SUPPORT_CORS_IMAGES && !isSameOrigin;
              useProxy = !isInlineImage(key) && !isSameOrigin && !isBlobImage(key) && typeof this._options.proxy === "string" && FEATURES.SUPPORT_CORS_XHR && !useCORS;
              if (!isSameOrigin && this._options.allowTaint === false && !isInlineImage(key) && !isBlobImage(key) && !useProxy && !useCORS) {
                return [
                  2
                  /*return*/
                ];
              }
              src = key;
              if (!useProxy) return [3, 2];
              return [4, this.proxy(src)];
            case 1:
              src = _a.sent();
              _a.label = 2;
            case 2:
              this.context.logger.debug("Added image " + key.substring(0, 256));
              return [4, new Promise(function(resolve, reject) {
                var img = new Image();
                img.onload = function() {
                  return resolve(img);
                };
                img.onerror = reject;
                if (isInlineBase64Image(src) || useCORS) {
                  img.crossOrigin = "anonymous";
                }
                img.src = src;
                if (img.complete === true) {
                  setTimeout(function() {
                    return resolve(img);
                  }, 500);
                }
                if (_this._options.imageTimeout > 0) {
                  setTimeout(function() {
                    return reject("Timed out (" + _this._options.imageTimeout + "ms) loading image");
                  }, _this._options.imageTimeout);
                }
              })];
            case 3:
              return [2, _a.sent()];
          }
        });
      });
    };
    Cache2.prototype.has = function(key) {
      return typeof this._cache[key] !== "undefined";
    };
    Cache2.prototype.keys = function() {
      return Promise.resolve(Object.keys(this._cache));
    };
    Cache2.prototype.proxy = function(src) {
      var _this = this;
      var proxy = this._options.proxy;
      if (!proxy) {
        throw new Error("No proxy defined");
      }
      var key = src.substring(0, 256);
      return new Promise(function(resolve, reject) {
        var responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? "blob" : "text";
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          if (xhr.status === 200) {
            if (responseType === "text") {
              resolve(xhr.response);
            } else {
              var reader_1 = new FileReader();
              reader_1.addEventListener("load", function() {
                return resolve(reader_1.result);
              }, false);
              reader_1.addEventListener("error", function(e2) {
                return reject(e2);
              }, false);
              reader_1.readAsDataURL(xhr.response);
            }
          } else {
            reject("Failed to proxy resource " + key + " with status code " + xhr.status);
          }
        };
        xhr.onerror = reject;
        var queryString = proxy.indexOf("?") > -1 ? "&" : "?";
        xhr.open("GET", "" + proxy + queryString + "url=" + encodeURIComponent(src) + "&responseType=" + responseType);
        if (responseType !== "text" && xhr instanceof XMLHttpRequest) {
          xhr.responseType = responseType;
        }
        if (_this._options.imageTimeout) {
          var timeout_1 = _this._options.imageTimeout;
          xhr.timeout = timeout_1;
          xhr.ontimeout = function() {
            return reject("Timed out (" + timeout_1 + "ms) proxying " + key);
          };
        }
        xhr.send();
      });
    };
    return Cache2;
  })()
);
var INLINE_SVG = /^data:image\/svg\+xml/i;
var INLINE_BASE64 = /^data:image\/.*;base64,/i;
var INLINE_IMG = /^data:image\/.*/i;
var isRenderable = function(src) {
  return FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src);
};
var isInlineImage = function(src) {
  return INLINE_IMG.test(src);
};
var isInlineBase64Image = function(src) {
  return INLINE_BASE64.test(src);
};
var isBlobImage = function(src) {
  return src.substr(0, 4) === "blob";
};
var isSVG = function(src) {
  return src.substr(-3).toLowerCase() === "svg" || INLINE_SVG.test(src);
};
var Vector = (
  /** @class */
  (function() {
    function Vector2(x, y) {
      this.type = 0;
      this.x = x;
      this.y = y;
    }
    Vector2.prototype.add = function(deltaX, deltaY) {
      return new Vector2(this.x + deltaX, this.y + deltaY);
    };
    return Vector2;
  })()
);
var lerp = function(a2, b, t) {
  return new Vector(a2.x + (b.x - a2.x) * t, a2.y + (b.y - a2.y) * t);
};
var BezierCurve = (
  /** @class */
  (function() {
    function BezierCurve2(start, startControl, endControl, end) {
      this.type = 1;
      this.start = start;
      this.startControl = startControl;
      this.endControl = endControl;
      this.end = end;
    }
    BezierCurve2.prototype.subdivide = function(t, firstHalf) {
      var ab = lerp(this.start, this.startControl, t);
      var bc = lerp(this.startControl, this.endControl, t);
      var cd = lerp(this.endControl, this.end, t);
      var abbc = lerp(ab, bc, t);
      var bccd = lerp(bc, cd, t);
      var dest = lerp(abbc, bccd, t);
      return firstHalf ? new BezierCurve2(this.start, ab, abbc, dest) : new BezierCurve2(dest, bccd, cd, this.end);
    };
    BezierCurve2.prototype.add = function(deltaX, deltaY) {
      return new BezierCurve2(this.start.add(deltaX, deltaY), this.startControl.add(deltaX, deltaY), this.endControl.add(deltaX, deltaY), this.end.add(deltaX, deltaY));
    };
    BezierCurve2.prototype.reverse = function() {
      return new BezierCurve2(this.end, this.endControl, this.startControl, this.start);
    };
    return BezierCurve2;
  })()
);
var isBezierCurve = function(path) {
  return path.type === 1;
};
var BoundCurves = (
  /** @class */
  /* @__PURE__ */ (function() {
    function BoundCurves2(element) {
      var styles = element.styles;
      var bounds = element.bounds;
      var _a = getAbsoluteValueForTuple(styles.borderTopLeftRadius, bounds.width, bounds.height), tlh = _a[0], tlv = _a[1];
      var _b = getAbsoluteValueForTuple(styles.borderTopRightRadius, bounds.width, bounds.height), trh = _b[0], trv = _b[1];
      var _c = getAbsoluteValueForTuple(styles.borderBottomRightRadius, bounds.width, bounds.height), brh = _c[0], brv = _c[1];
      var _d = getAbsoluteValueForTuple(styles.borderBottomLeftRadius, bounds.width, bounds.height), blh = _d[0], blv = _d[1];
      var factors = [];
      factors.push((tlh + trh) / bounds.width);
      factors.push((blh + brh) / bounds.width);
      factors.push((tlv + blv) / bounds.height);
      factors.push((trv + brv) / bounds.height);
      var maxFactor = Math.max.apply(Math, factors);
      if (maxFactor > 1) {
        tlh /= maxFactor;
        tlv /= maxFactor;
        trh /= maxFactor;
        trv /= maxFactor;
        brh /= maxFactor;
        brv /= maxFactor;
        blh /= maxFactor;
        blv /= maxFactor;
      }
      var topWidth = bounds.width - trh;
      var rightHeight = bounds.height - brv;
      var bottomWidth = bounds.width - brh;
      var leftHeight = bounds.height - blv;
      var borderTopWidth2 = styles.borderTopWidth;
      var borderRightWidth2 = styles.borderRightWidth;
      var borderBottomWidth2 = styles.borderBottomWidth;
      var borderLeftWidth2 = styles.borderLeftWidth;
      var paddingTop2 = getAbsoluteValue(styles.paddingTop, element.bounds.width);
      var paddingRight2 = getAbsoluteValue(styles.paddingRight, element.bounds.width);
      var paddingBottom2 = getAbsoluteValue(styles.paddingBottom, element.bounds.width);
      var paddingLeft2 = getAbsoluteValue(styles.paddingLeft, element.bounds.width);
      this.topLeftBorderDoubleOuterBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 3, bounds.top + borderTopWidth2 / 3, tlh - borderLeftWidth2 / 3, tlv - borderTopWidth2 / 3, CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 3, bounds.top + borderTopWidth2 / 3);
      this.topRightBorderDoubleOuterBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth2 / 3, trh - borderRightWidth2 / 3, trv - borderTopWidth2 / 3, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 3, bounds.top + borderTopWidth2 / 3);
      this.bottomRightBorderDoubleOuterBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth2 / 3, brv - borderBottomWidth2 / 3, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 3, bounds.top + bounds.height - borderBottomWidth2 / 3);
      this.bottomLeftBorderDoubleOuterBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 3, bounds.top + leftHeight, blh - borderLeftWidth2 / 3, blv - borderBottomWidth2 / 3, CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 3, bounds.top + bounds.height - borderBottomWidth2 / 3);
      this.topLeftBorderDoubleInnerBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + borderTopWidth2 * 2 / 3, tlh - borderLeftWidth2 * 2 / 3, tlv - borderTopWidth2 * 2 / 3, CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + borderTopWidth2 * 2 / 3);
      this.topRightBorderDoubleInnerBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth2 * 2 / 3, trh - borderRightWidth2 * 2 / 3, trv - borderTopWidth2 * 2 / 3, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 * 2 / 3, bounds.top + borderTopWidth2 * 2 / 3);
      this.bottomRightBorderDoubleInnerBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth2 * 2 / 3, brv - borderBottomWidth2 * 2 / 3, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 * 2 / 3, bounds.top + bounds.height - borderBottomWidth2 * 2 / 3);
      this.bottomLeftBorderDoubleInnerBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + leftHeight, blh - borderLeftWidth2 * 2 / 3, blv - borderBottomWidth2 * 2 / 3, CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + bounds.height - borderBottomWidth2 * 2 / 3);
      this.topLeftBorderStroke = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 2, bounds.top + borderTopWidth2 / 2, tlh - borderLeftWidth2 / 2, tlv - borderTopWidth2 / 2, CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 2, bounds.top + borderTopWidth2 / 2);
      this.topRightBorderStroke = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth2 / 2, trh - borderRightWidth2 / 2, trv - borderTopWidth2 / 2, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 2, bounds.top + borderTopWidth2 / 2);
      this.bottomRightBorderStroke = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth2 / 2, brv - borderBottomWidth2 / 2, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 2, bounds.top + bounds.height - borderBottomWidth2 / 2);
      this.bottomLeftBorderStroke = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 2, bounds.top + leftHeight, blh - borderLeftWidth2 / 2, blv - borderBottomWidth2 / 2, CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 2, bounds.top + bounds.height - borderBottomWidth2 / 2);
      this.topLeftBorderBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT) : new Vector(bounds.left, bounds.top);
      this.topRightBorderBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width, bounds.top);
      this.bottomRightBorderBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width, bounds.top + bounds.height);
      this.bottomLeftBorderBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT) : new Vector(bounds.left, bounds.top + bounds.height);
      this.topLeftPaddingBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2, bounds.top + borderTopWidth2, Math.max(0, tlh - borderLeftWidth2), Math.max(0, tlv - borderTopWidth2), CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2, bounds.top + borderTopWidth2);
      this.topRightPaddingBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width - borderRightWidth2), bounds.top + borderTopWidth2, topWidth > bounds.width + borderRightWidth2 ? 0 : Math.max(0, trh - borderRightWidth2), Math.max(0, trv - borderTopWidth2), CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2, bounds.top + borderTopWidth2);
      this.bottomRightPaddingBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borderLeftWidth2), bounds.top + Math.min(rightHeight, bounds.height - borderBottomWidth2), Math.max(0, brh - borderRightWidth2), Math.max(0, brv - borderBottomWidth2), CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2, bounds.top + bounds.height - borderBottomWidth2);
      this.bottomLeftPaddingBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2, bounds.top + Math.min(leftHeight, bounds.height - borderBottomWidth2), Math.max(0, blh - borderLeftWidth2), Math.max(0, blv - borderBottomWidth2), CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2, bounds.top + bounds.height - borderBottomWidth2);
      this.topLeftContentBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + borderTopWidth2 + paddingTop2, Math.max(0, tlh - (borderLeftWidth2 + paddingLeft2)), Math.max(0, tlv - (borderTopWidth2 + paddingTop2)), CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + borderTopWidth2 + paddingTop2);
      this.topRightContentBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth2 + paddingLeft2), bounds.top + borderTopWidth2 + paddingTop2, topWidth > bounds.width + borderLeftWidth2 + paddingLeft2 ? 0 : trh - borderLeftWidth2 + paddingLeft2, trv - (borderTopWidth2 + paddingTop2), CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - (borderRightWidth2 + paddingRight2), bounds.top + borderTopWidth2 + paddingTop2);
      this.bottomRightContentBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - (borderLeftWidth2 + paddingLeft2)), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth2 + paddingTop2), Math.max(0, brh - (borderRightWidth2 + paddingRight2)), brv - (borderBottomWidth2 + paddingBottom2), CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - (borderRightWidth2 + paddingRight2), bounds.top + bounds.height - (borderBottomWidth2 + paddingBottom2));
      this.bottomLeftContentBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + leftHeight, Math.max(0, blh - (borderLeftWidth2 + paddingLeft2)), blv - (borderBottomWidth2 + paddingBottom2), CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + bounds.height - (borderBottomWidth2 + paddingBottom2));
    }
    return BoundCurves2;
  })()
);
var CORNER;
(function(CORNER2) {
  CORNER2[CORNER2["TOP_LEFT"] = 0] = "TOP_LEFT";
  CORNER2[CORNER2["TOP_RIGHT"] = 1] = "TOP_RIGHT";
  CORNER2[CORNER2["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
  CORNER2[CORNER2["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
})(CORNER || (CORNER = {}));
var getCurvePoints = function(x, y, r1, r2, position2) {
  var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
  var ox = r1 * kappa;
  var oy = r2 * kappa;
  var xm = x + r1;
  var ym = y + r2;
  switch (position2) {
    case CORNER.TOP_LEFT:
      return new BezierCurve(new Vector(x, ym), new Vector(x, ym - oy), new Vector(xm - ox, y), new Vector(xm, y));
    case CORNER.TOP_RIGHT:
      return new BezierCurve(new Vector(x, y), new Vector(x + ox, y), new Vector(xm, ym - oy), new Vector(xm, ym));
    case CORNER.BOTTOM_RIGHT:
      return new BezierCurve(new Vector(xm, y), new Vector(xm, y + oy), new Vector(x + ox, ym), new Vector(x, ym));
    case CORNER.BOTTOM_LEFT:
    default:
      return new BezierCurve(new Vector(xm, ym), new Vector(xm - ox, ym), new Vector(x, y + oy), new Vector(x, y));
  }
};
var calculateBorderBoxPath = function(curves) {
  return [curves.topLeftBorderBox, curves.topRightBorderBox, curves.bottomRightBorderBox, curves.bottomLeftBorderBox];
};
var calculateContentBoxPath = function(curves) {
  return [
    curves.topLeftContentBox,
    curves.topRightContentBox,
    curves.bottomRightContentBox,
    curves.bottomLeftContentBox
  ];
};
var calculatePaddingBoxPath = function(curves) {
  return [
    curves.topLeftPaddingBox,
    curves.topRightPaddingBox,
    curves.bottomRightPaddingBox,
    curves.bottomLeftPaddingBox
  ];
};
var TransformEffect = (
  /** @class */
  /* @__PURE__ */ (function() {
    function TransformEffect2(offsetX, offsetY, matrix2) {
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.matrix = matrix2;
      this.type = 0;
      this.target = 2 | 4;
    }
    return TransformEffect2;
  })()
);
var ClipEffect = (
  /** @class */
  /* @__PURE__ */ (function() {
    function ClipEffect2(path, target) {
      this.path = path;
      this.target = target;
      this.type = 1;
    }
    return ClipEffect2;
  })()
);
var OpacityEffect = (
  /** @class */
  /* @__PURE__ */ (function() {
    function OpacityEffect2(opacity2) {
      this.opacity = opacity2;
      this.type = 2;
      this.target = 2 | 4;
    }
    return OpacityEffect2;
  })()
);
var isTransformEffect = function(effect) {
  return effect.type === 0;
};
var isClipEffect = function(effect) {
  return effect.type === 1;
};
var isOpacityEffect = function(effect) {
  return effect.type === 2;
};
var equalPath = function(a2, b) {
  if (a2.length === b.length) {
    return a2.some(function(v, i) {
      return v === b[i];
    });
  }
  return false;
};
var transformPath = function(path, deltaX, deltaY, deltaW, deltaH) {
  return path.map(function(point, index) {
    switch (index) {
      case 0:
        return point.add(deltaX, deltaY);
      case 1:
        return point.add(deltaX + deltaW, deltaY);
      case 2:
        return point.add(deltaX + deltaW, deltaY + deltaH);
      case 3:
        return point.add(deltaX, deltaY + deltaH);
    }
    return point;
  });
};
var StackingContext = (
  /** @class */
  /* @__PURE__ */ (function() {
    function StackingContext2(container) {
      this.element = container;
      this.inlineLevel = [];
      this.nonInlineLevel = [];
      this.negativeZIndex = [];
      this.zeroOrAutoZIndexOrTransformedOrOpacity = [];
      this.positiveZIndex = [];
      this.nonPositionedFloats = [];
      this.nonPositionedInlineLevel = [];
    }
    return StackingContext2;
  })()
);
var ElementPaint = (
  /** @class */
  (function() {
    function ElementPaint2(container, parent) {
      this.container = container;
      this.parent = parent;
      this.effects = [];
      this.curves = new BoundCurves(this.container);
      if (this.container.styles.opacity < 1) {
        this.effects.push(new OpacityEffect(this.container.styles.opacity));
      }
      if (this.container.styles.transform !== null) {
        var offsetX = this.container.bounds.left + this.container.styles.transformOrigin[0].number;
        var offsetY = this.container.bounds.top + this.container.styles.transformOrigin[1].number;
        var matrix2 = this.container.styles.transform;
        this.effects.push(new TransformEffect(offsetX, offsetY, matrix2));
      }
      if (this.container.styles.overflowX !== 0) {
        var borderBox = calculateBorderBoxPath(this.curves);
        var paddingBox2 = calculatePaddingBoxPath(this.curves);
        if (equalPath(borderBox, paddingBox2)) {
          this.effects.push(new ClipEffect(
            borderBox,
            2 | 4
            /* CONTENT */
          ));
        } else {
          this.effects.push(new ClipEffect(
            borderBox,
            2
            /* BACKGROUND_BORDERS */
          ));
          this.effects.push(new ClipEffect(
            paddingBox2,
            4
            /* CONTENT */
          ));
        }
      }
    }
    ElementPaint2.prototype.getEffects = function(target) {
      var inFlow = [
        2,
        3
        /* FIXED */
      ].indexOf(this.container.styles.position) === -1;
      var parent = this.parent;
      var effects = this.effects.slice(0);
      while (parent) {
        var croplessEffects = parent.effects.filter(function(effect) {
          return !isClipEffect(effect);
        });
        if (inFlow || parent.container.styles.position !== 0 || !parent.parent) {
          effects.unshift.apply(effects, croplessEffects);
          inFlow = [
            2,
            3
            /* FIXED */
          ].indexOf(parent.container.styles.position) === -1;
          if (parent.container.styles.overflowX !== 0) {
            var borderBox = calculateBorderBoxPath(parent.curves);
            var paddingBox2 = calculatePaddingBoxPath(parent.curves);
            if (!equalPath(borderBox, paddingBox2)) {
              effects.unshift(new ClipEffect(
                paddingBox2,
                2 | 4
                /* CONTENT */
              ));
            }
          }
        } else {
          effects.unshift.apply(effects, croplessEffects);
        }
        parent = parent.parent;
      }
      return effects.filter(function(effect) {
        return contains(effect.target, target);
      });
    };
    return ElementPaint2;
  })()
);
var parseStackTree = function(parent, stackingContext, realStackingContext, listItems) {
  parent.container.elements.forEach(function(child) {
    var treatAsRealStackingContext = contains(
      child.flags,
      4
      /* CREATES_REAL_STACKING_CONTEXT */
    );
    var createsStackingContext2 = contains(
      child.flags,
      2
      /* CREATES_STACKING_CONTEXT */
    );
    var paintContainer = new ElementPaint(child, parent);
    if (contains(
      child.styles.display,
      2048
      /* LIST_ITEM */
    )) {
      listItems.push(paintContainer);
    }
    var listOwnerItems = contains(
      child.flags,
      8
      /* IS_LIST_OWNER */
    ) ? [] : listItems;
    if (treatAsRealStackingContext || createsStackingContext2) {
      var parentStack = treatAsRealStackingContext || child.styles.isPositioned() ? realStackingContext : stackingContext;
      var stack = new StackingContext(paintContainer);
      if (child.styles.isPositioned() || child.styles.opacity < 1 || child.styles.isTransformed()) {
        var order_1 = child.styles.zIndex.order;
        if (order_1 < 0) {
          var index_1 = 0;
          parentStack.negativeZIndex.some(function(current, i) {
            if (order_1 > current.element.container.styles.zIndex.order) {
              index_1 = i;
              return false;
            } else if (index_1 > 0) {
              return true;
            }
            return false;
          });
          parentStack.negativeZIndex.splice(index_1, 0, stack);
        } else if (order_1 > 0) {
          var index_2 = 0;
          parentStack.positiveZIndex.some(function(current, i) {
            if (order_1 >= current.element.container.styles.zIndex.order) {
              index_2 = i + 1;
              return false;
            } else if (index_2 > 0) {
              return true;
            }
            return false;
          });
          parentStack.positiveZIndex.splice(index_2, 0, stack);
        } else {
          parentStack.zeroOrAutoZIndexOrTransformedOrOpacity.push(stack);
        }
      } else {
        if (child.styles.isFloating()) {
          parentStack.nonPositionedFloats.push(stack);
        } else {
          parentStack.nonPositionedInlineLevel.push(stack);
        }
      }
      parseStackTree(paintContainer, stack, treatAsRealStackingContext ? stack : realStackingContext, listOwnerItems);
    } else {
      if (child.styles.isInlineLevel()) {
        stackingContext.inlineLevel.push(paintContainer);
      } else {
        stackingContext.nonInlineLevel.push(paintContainer);
      }
      parseStackTree(paintContainer, stackingContext, realStackingContext, listOwnerItems);
    }
    if (contains(
      child.flags,
      8
      /* IS_LIST_OWNER */
    )) {
      processListItems(child, listOwnerItems);
    }
  });
};
var processListItems = function(owner, elements) {
  var numbering = owner instanceof OLElementContainer ? owner.start : 1;
  var reversed = owner instanceof OLElementContainer ? owner.reversed : false;
  for (var i = 0; i < elements.length; i++) {
    var item = elements[i];
    if (item.container instanceof LIElementContainer && typeof item.container.value === "number" && item.container.value !== 0) {
      numbering = item.container.value;
    }
    item.listValue = createCounterText(numbering, item.container.styles.listStyleType, true);
    numbering += reversed ? -1 : 1;
  }
};
var parseStackingContexts = function(container) {
  var paintContainer = new ElementPaint(container, null);
  var root = new StackingContext(paintContainer);
  var listItems = [];
  parseStackTree(paintContainer, root, root, listItems);
  processListItems(paintContainer.container, listItems);
  return root;
};
var parsePathForBorder = function(curves, borderSide) {
  switch (borderSide) {
    case 0:
      return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftPaddingBox, curves.topRightBorderBox, curves.topRightPaddingBox);
    case 1:
      return createPathFromCurves(curves.topRightBorderBox, curves.topRightPaddingBox, curves.bottomRightBorderBox, curves.bottomRightPaddingBox);
    case 2:
      return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox);
    case 3:
    default:
      return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox, curves.topLeftBorderBox, curves.topLeftPaddingBox);
  }
};
var parsePathForBorderDoubleOuter = function(curves, borderSide) {
  switch (borderSide) {
    case 0:
      return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox, curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox);
    case 1:
      return createPathFromCurves(curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox, curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox);
    case 2:
      return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox, curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox);
    case 3:
    default:
      return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox, curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox);
  }
};
var parsePathForBorderDoubleInner = function(curves, borderSide) {
  switch (borderSide) {
    case 0:
      return createPathFromCurves(curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox, curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox);
    case 1:
      return createPathFromCurves(curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox, curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox);
    case 2:
      return createPathFromCurves(curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox);
    case 3:
    default:
      return createPathFromCurves(curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox, curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox);
  }
};
var parsePathForBorderStroke = function(curves, borderSide) {
  switch (borderSide) {
    case 0:
      return createStrokePathFromCurves(curves.topLeftBorderStroke, curves.topRightBorderStroke);
    case 1:
      return createStrokePathFromCurves(curves.topRightBorderStroke, curves.bottomRightBorderStroke);
    case 2:
      return createStrokePathFromCurves(curves.bottomRightBorderStroke, curves.bottomLeftBorderStroke);
    case 3:
    default:
      return createStrokePathFromCurves(curves.bottomLeftBorderStroke, curves.topLeftBorderStroke);
  }
};
var createStrokePathFromCurves = function(outer1, outer2) {
  var path = [];
  if (isBezierCurve(outer1)) {
    path.push(outer1.subdivide(0.5, false));
  } else {
    path.push(outer1);
  }
  if (isBezierCurve(outer2)) {
    path.push(outer2.subdivide(0.5, true));
  } else {
    path.push(outer2);
  }
  return path;
};
var createPathFromCurves = function(outer1, inner1, outer2, inner2) {
  var path = [];
  if (isBezierCurve(outer1)) {
    path.push(outer1.subdivide(0.5, false));
  } else {
    path.push(outer1);
  }
  if (isBezierCurve(outer2)) {
    path.push(outer2.subdivide(0.5, true));
  } else {
    path.push(outer2);
  }
  if (isBezierCurve(inner2)) {
    path.push(inner2.subdivide(0.5, true).reverse());
  } else {
    path.push(inner2);
  }
  if (isBezierCurve(inner1)) {
    path.push(inner1.subdivide(0.5, false).reverse());
  } else {
    path.push(inner1);
  }
  return path;
};
var paddingBox = function(element) {
  var bounds = element.bounds;
  var styles = element.styles;
  return bounds.add(styles.borderLeftWidth, styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth), -(styles.borderTopWidth + styles.borderBottomWidth));
};
var contentBox = function(element) {
  var styles = element.styles;
  var bounds = element.bounds;
  var paddingLeft2 = getAbsoluteValue(styles.paddingLeft, bounds.width);
  var paddingRight2 = getAbsoluteValue(styles.paddingRight, bounds.width);
  var paddingTop2 = getAbsoluteValue(styles.paddingTop, bounds.width);
  var paddingBottom2 = getAbsoluteValue(styles.paddingBottom, bounds.width);
  return bounds.add(paddingLeft2 + styles.borderLeftWidth, paddingTop2 + styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth + paddingLeft2 + paddingRight2), -(styles.borderTopWidth + styles.borderBottomWidth + paddingTop2 + paddingBottom2));
};
var calculateBackgroundPositioningArea = function(backgroundOrigin2, element) {
  if (backgroundOrigin2 === 0) {
    return element.bounds;
  }
  if (backgroundOrigin2 === 2) {
    return contentBox(element);
  }
  return paddingBox(element);
};
var calculateBackgroundPaintingArea = function(backgroundClip2, element) {
  if (backgroundClip2 === 0) {
    return element.bounds;
  }
  if (backgroundClip2 === 2) {
    return contentBox(element);
  }
  return paddingBox(element);
};
var calculateBackgroundRendering = function(container, index, intrinsicSize) {
  var backgroundPositioningArea = calculateBackgroundPositioningArea(getBackgroundValueForIndex(container.styles.backgroundOrigin, index), container);
  var backgroundPaintingArea = calculateBackgroundPaintingArea(getBackgroundValueForIndex(container.styles.backgroundClip, index), container);
  var backgroundImageSize = calculateBackgroundSize(getBackgroundValueForIndex(container.styles.backgroundSize, index), intrinsicSize, backgroundPositioningArea);
  var sizeWidth = backgroundImageSize[0], sizeHeight = backgroundImageSize[1];
  var position2 = getAbsoluteValueForTuple(getBackgroundValueForIndex(container.styles.backgroundPosition, index), backgroundPositioningArea.width - sizeWidth, backgroundPositioningArea.height - sizeHeight);
  var path = calculateBackgroundRepeatPath(getBackgroundValueForIndex(container.styles.backgroundRepeat, index), position2, backgroundImageSize, backgroundPositioningArea, backgroundPaintingArea);
  var offsetX = Math.round(backgroundPositioningArea.left + position2[0]);
  var offsetY = Math.round(backgroundPositioningArea.top + position2[1]);
  return [path, offsetX, offsetY, sizeWidth, sizeHeight];
};
var isAuto = function(token) {
  return isIdentToken(token) && token.value === BACKGROUND_SIZE.AUTO;
};
var hasIntrinsicValue = function(value) {
  return typeof value === "number";
};
var calculateBackgroundSize = function(size, _a, bounds) {
  var intrinsicWidth = _a[0], intrinsicHeight = _a[1], intrinsicProportion = _a[2];
  var first = size[0], second = size[1];
  if (!first) {
    return [0, 0];
  }
  if (isLengthPercentage(first) && second && isLengthPercentage(second)) {
    return [getAbsoluteValue(first, bounds.width), getAbsoluteValue(second, bounds.height)];
  }
  var hasIntrinsicProportion = hasIntrinsicValue(intrinsicProportion);
  if (isIdentToken(first) && (first.value === BACKGROUND_SIZE.CONTAIN || first.value === BACKGROUND_SIZE.COVER)) {
    if (hasIntrinsicValue(intrinsicProportion)) {
      var targetRatio = bounds.width / bounds.height;
      return targetRatio < intrinsicProportion !== (first.value === BACKGROUND_SIZE.COVER) ? [bounds.width, bounds.width / intrinsicProportion] : [bounds.height * intrinsicProportion, bounds.height];
    }
    return [bounds.width, bounds.height];
  }
  var hasIntrinsicWidth = hasIntrinsicValue(intrinsicWidth);
  var hasIntrinsicHeight = hasIntrinsicValue(intrinsicHeight);
  var hasIntrinsicDimensions = hasIntrinsicWidth || hasIntrinsicHeight;
  if (isAuto(first) && (!second || isAuto(second))) {
    if (hasIntrinsicWidth && hasIntrinsicHeight) {
      return [intrinsicWidth, intrinsicHeight];
    }
    if (!hasIntrinsicProportion && !hasIntrinsicDimensions) {
      return [bounds.width, bounds.height];
    }
    if (hasIntrinsicDimensions && hasIntrinsicProportion) {
      var width_1 = hasIntrinsicWidth ? intrinsicWidth : intrinsicHeight * intrinsicProportion;
      var height_1 = hasIntrinsicHeight ? intrinsicHeight : intrinsicWidth / intrinsicProportion;
      return [width_1, height_1];
    }
    var width_2 = hasIntrinsicWidth ? intrinsicWidth : bounds.width;
    var height_2 = hasIntrinsicHeight ? intrinsicHeight : bounds.height;
    return [width_2, height_2];
  }
  if (hasIntrinsicProportion) {
    var width_3 = 0;
    var height_3 = 0;
    if (isLengthPercentage(first)) {
      width_3 = getAbsoluteValue(first, bounds.width);
    } else if (isLengthPercentage(second)) {
      height_3 = getAbsoluteValue(second, bounds.height);
    }
    if (isAuto(first)) {
      width_3 = height_3 * intrinsicProportion;
    } else if (!second || isAuto(second)) {
      height_3 = width_3 / intrinsicProportion;
    }
    return [width_3, height_3];
  }
  var width = null;
  var height = null;
  if (isLengthPercentage(first)) {
    width = getAbsoluteValue(first, bounds.width);
  } else if (second && isLengthPercentage(second)) {
    height = getAbsoluteValue(second, bounds.height);
  }
  if (width !== null && (!second || isAuto(second))) {
    height = hasIntrinsicWidth && hasIntrinsicHeight ? width / intrinsicWidth * intrinsicHeight : bounds.height;
  }
  if (height !== null && isAuto(first)) {
    width = hasIntrinsicWidth && hasIntrinsicHeight ? height / intrinsicHeight * intrinsicWidth : bounds.width;
  }
  if (width !== null && height !== null) {
    return [width, height];
  }
  throw new Error("Unable to calculate background-size for element");
};
var getBackgroundValueForIndex = function(values, index) {
  var value = values[index];
  if (typeof value === "undefined") {
    return values[0];
  }
  return value;
};
var calculateBackgroundRepeatPath = function(repeat, _a, _b, backgroundPositioningArea, backgroundPaintingArea) {
  var x = _a[0], y = _a[1];
  var width = _b[0], height = _b[1];
  switch (repeat) {
    case 2:
      return [
        new Vector(Math.round(backgroundPositioningArea.left), Math.round(backgroundPositioningArea.top + y)),
        new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(backgroundPositioningArea.top + y)),
        new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(height + backgroundPositioningArea.top + y)),
        new Vector(Math.round(backgroundPositioningArea.left), Math.round(height + backgroundPositioningArea.top + y))
      ];
    case 3:
      return [
        new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top)),
        new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top)),
        new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top)),
        new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top))
      ];
    case 1:
      return [
        new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y)),
        new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y)),
        new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y + height)),
        new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y + height))
      ];
    default:
      return [
        new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.top)),
        new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.top)),
        new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top)),
        new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top))
      ];
  }
};
var SMALL_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var SAMPLE_TEXT = "Hidden Text";
var FontMetrics = (
  /** @class */
  (function() {
    function FontMetrics2(document2) {
      this._data = {};
      this._document = document2;
    }
    FontMetrics2.prototype.parseMetrics = function(fontFamily2, fontSize2) {
      var container = this._document.createElement("div");
      var img = this._document.createElement("img");
      var span = this._document.createElement("span");
      var body = this._document.body;
      container.style.visibility = "hidden";
      container.style.fontFamily = fontFamily2;
      container.style.fontSize = fontSize2;
      container.style.margin = "0";
      container.style.padding = "0";
      container.style.whiteSpace = "nowrap";
      body.appendChild(container);
      img.src = SMALL_IMAGE;
      img.width = 1;
      img.height = 1;
      img.style.margin = "0";
      img.style.padding = "0";
      img.style.verticalAlign = "baseline";
      span.style.fontFamily = fontFamily2;
      span.style.fontSize = fontSize2;
      span.style.margin = "0";
      span.style.padding = "0";
      span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
      container.appendChild(span);
      container.appendChild(img);
      var baseline = img.offsetTop - span.offsetTop + 2;
      container.removeChild(span);
      container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
      container.style.lineHeight = "normal";
      img.style.verticalAlign = "super";
      var middle = img.offsetTop - container.offsetTop + 2;
      body.removeChild(container);
      return { baseline, middle };
    };
    FontMetrics2.prototype.getMetrics = function(fontFamily2, fontSize2) {
      var key = fontFamily2 + " " + fontSize2;
      if (typeof this._data[key] === "undefined") {
        this._data[key] = this.parseMetrics(fontFamily2, fontSize2);
      }
      return this._data[key];
    };
    return FontMetrics2;
  })()
);
var Renderer = (
  /** @class */
  /* @__PURE__ */ (function() {
    function Renderer2(context, options) {
      this.context = context;
      this.options = options;
    }
    return Renderer2;
  })()
);
var MASK_OFFSET = 1e4;
var CanvasRenderer = (
  /** @class */
  (function(_super) {
    __extends(CanvasRenderer2, _super);
    function CanvasRenderer2(context, options) {
      var _this = _super.call(this, context, options) || this;
      _this._activeEffects = [];
      _this.canvas = options.canvas ? options.canvas : document.createElement("canvas");
      _this.ctx = _this.canvas.getContext("2d");
      if (!options.canvas) {
        _this.canvas.width = Math.floor(options.width * options.scale);
        _this.canvas.height = Math.floor(options.height * options.scale);
        _this.canvas.style.width = options.width + "px";
        _this.canvas.style.height = options.height + "px";
      }
      _this.fontMetrics = new FontMetrics(document);
      _this.ctx.scale(_this.options.scale, _this.options.scale);
      _this.ctx.translate(-options.x, -options.y);
      _this.ctx.textBaseline = "bottom";
      _this._activeEffects = [];
      _this.context.logger.debug("Canvas renderer initialized (" + options.width + "x" + options.height + ") with scale " + options.scale);
      return _this;
    }
    CanvasRenderer2.prototype.applyEffects = function(effects) {
      var _this = this;
      while (this._activeEffects.length) {
        this.popEffect();
      }
      effects.forEach(function(effect) {
        return _this.applyEffect(effect);
      });
    };
    CanvasRenderer2.prototype.applyEffect = function(effect) {
      this.ctx.save();
      if (isOpacityEffect(effect)) {
        this.ctx.globalAlpha = effect.opacity;
      }
      if (isTransformEffect(effect)) {
        this.ctx.translate(effect.offsetX, effect.offsetY);
        this.ctx.transform(effect.matrix[0], effect.matrix[1], effect.matrix[2], effect.matrix[3], effect.matrix[4], effect.matrix[5]);
        this.ctx.translate(-effect.offsetX, -effect.offsetY);
      }
      if (isClipEffect(effect)) {
        this.path(effect.path);
        this.ctx.clip();
      }
      this._activeEffects.push(effect);
    };
    CanvasRenderer2.prototype.popEffect = function() {
      this._activeEffects.pop();
      this.ctx.restore();
    };
    CanvasRenderer2.prototype.renderStack = function(stack) {
      return __awaiter(this, void 0, void 0, function() {
        var styles;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              styles = stack.element.container.styles;
              if (!styles.isVisible()) return [3, 2];
              return [4, this.renderStackContent(stack)];
            case 1:
              _a.sent();
              _a.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer2.prototype.renderNode = function(paint) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (contains(
                paint.container.flags,
                16
                /* DEBUG_RENDER */
              )) {
                debugger;
              }
              if (!paint.container.styles.isVisible()) return [3, 3];
              return [4, this.renderNodeBackgroundAndBorders(paint)];
            case 1:
              _a.sent();
              return [4, this.renderNodeContent(paint)];
            case 2:
              _a.sent();
              _a.label = 3;
            case 3:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer2.prototype.renderTextWithLetterSpacing = function(text, letterSpacing2, baseline) {
      var _this = this;
      if (letterSpacing2 === 0) {
        this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + baseline);
      } else {
        var letters = segmentGraphemes(text.text);
        letters.reduce(function(left, letter) {
          _this.ctx.fillText(letter, left, text.bounds.top + baseline);
          return left + _this.ctx.measureText(letter).width;
        }, text.bounds.left);
      }
    };
    CanvasRenderer2.prototype.createFontStyle = function(styles) {
      var fontVariant2 = styles.fontVariant.filter(function(variant) {
        return variant === "normal" || variant === "small-caps";
      }).join("");
      var fontFamily2 = fixIOSSystemFonts(styles.fontFamily).join(", ");
      var fontSize2 = isDimensionToken(styles.fontSize) ? "" + styles.fontSize.number + styles.fontSize.unit : styles.fontSize.number + "px";
      return [
        [styles.fontStyle, fontVariant2, styles.fontWeight, fontSize2, fontFamily2].join(" "),
        fontFamily2,
        fontSize2
      ];
    };
    CanvasRenderer2.prototype.renderTextNode = function(text, styles) {
      return __awaiter(this, void 0, void 0, function() {
        var _a, font, fontFamily2, fontSize2, _b, baseline, middle, paintOrder2;
        var _this = this;
        return __generator(this, function(_c) {
          _a = this.createFontStyle(styles), font = _a[0], fontFamily2 = _a[1], fontSize2 = _a[2];
          this.ctx.font = font;
          this.ctx.direction = styles.direction === 1 ? "rtl" : "ltr";
          this.ctx.textAlign = "left";
          this.ctx.textBaseline = "alphabetic";
          _b = this.fontMetrics.getMetrics(fontFamily2, fontSize2), baseline = _b.baseline, middle = _b.middle;
          paintOrder2 = styles.paintOrder;
          text.textBounds.forEach(function(text2) {
            paintOrder2.forEach(function(paintOrderLayer) {
              switch (paintOrderLayer) {
                case 0:
                  _this.ctx.fillStyle = asString(styles.color);
                  _this.renderTextWithLetterSpacing(text2, styles.letterSpacing, baseline);
                  var textShadows = styles.textShadow;
                  if (textShadows.length && text2.text.trim().length) {
                    textShadows.slice(0).reverse().forEach(function(textShadow2) {
                      _this.ctx.shadowColor = asString(textShadow2.color);
                      _this.ctx.shadowOffsetX = textShadow2.offsetX.number * _this.options.scale;
                      _this.ctx.shadowOffsetY = textShadow2.offsetY.number * _this.options.scale;
                      _this.ctx.shadowBlur = textShadow2.blur.number;
                      _this.renderTextWithLetterSpacing(text2, styles.letterSpacing, baseline);
                    });
                    _this.ctx.shadowColor = "";
                    _this.ctx.shadowOffsetX = 0;
                    _this.ctx.shadowOffsetY = 0;
                    _this.ctx.shadowBlur = 0;
                  }
                  if (styles.textDecorationLine.length) {
                    _this.ctx.fillStyle = asString(styles.textDecorationColor || styles.color);
                    styles.textDecorationLine.forEach(function(textDecorationLine2) {
                      switch (textDecorationLine2) {
                        case 1:
                          _this.ctx.fillRect(text2.bounds.left, Math.round(text2.bounds.top + baseline), text2.bounds.width, 1);
                          break;
                        case 2:
                          _this.ctx.fillRect(text2.bounds.left, Math.round(text2.bounds.top), text2.bounds.width, 1);
                          break;
                        case 3:
                          _this.ctx.fillRect(text2.bounds.left, Math.ceil(text2.bounds.top + middle), text2.bounds.width, 1);
                          break;
                      }
                    });
                  }
                  break;
                case 1:
                  if (styles.webkitTextStrokeWidth && text2.text.trim().length) {
                    _this.ctx.strokeStyle = asString(styles.webkitTextStrokeColor);
                    _this.ctx.lineWidth = styles.webkitTextStrokeWidth;
                    _this.ctx.lineJoin = !!window.chrome ? "miter" : "round";
                    _this.ctx.strokeText(text2.text, text2.bounds.left, text2.bounds.top + baseline);
                  }
                  _this.ctx.strokeStyle = "";
                  _this.ctx.lineWidth = 0;
                  _this.ctx.lineJoin = "miter";
                  break;
              }
            });
          });
          return [
            2
            /*return*/
          ];
        });
      });
    };
    CanvasRenderer2.prototype.renderReplacedElement = function(container, curves, image2) {
      if (image2 && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
        var box = contentBox(container);
        var path = calculatePaddingBoxPath(curves);
        this.path(path);
        this.ctx.save();
        this.ctx.clip();
        this.ctx.drawImage(image2, 0, 0, container.intrinsicWidth, container.intrinsicHeight, box.left, box.top, box.width, box.height);
        this.ctx.restore();
      }
    };
    CanvasRenderer2.prototype.renderNodeContent = function(paint) {
      return __awaiter(this, void 0, void 0, function() {
        var container, curves, styles, _i, _a, child, image2, image2, iframeRenderer, canvas, size, _b, fontFamily2, fontSize2, baseline, bounds, x, textBounds, img, image2, url, fontFamily2, bounds;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              this.applyEffects(paint.getEffects(
                4
                /* CONTENT */
              ));
              container = paint.container;
              curves = paint.curves;
              styles = container.styles;
              _i = 0, _a = container.textNodes;
              _c.label = 1;
            case 1:
              if (!(_i < _a.length)) return [3, 4];
              child = _a[_i];
              return [4, this.renderTextNode(child, styles)];
            case 2:
              _c.sent();
              _c.label = 3;
            case 3:
              _i++;
              return [3, 1];
            case 4:
              if (!(container instanceof ImageElementContainer)) return [3, 8];
              _c.label = 5;
            case 5:
              _c.trys.push([5, 7, , 8]);
              return [4, this.context.cache.match(container.src)];
            case 6:
              image2 = _c.sent();
              this.renderReplacedElement(container, curves, image2);
              return [3, 8];
            case 7:
              _c.sent();
              this.context.logger.error("Error loading image " + container.src);
              return [3, 8];
            case 8:
              if (container instanceof CanvasElementContainer) {
                this.renderReplacedElement(container, curves, container.canvas);
              }
              if (!(container instanceof SVGElementContainer)) return [3, 12];
              _c.label = 9;
            case 9:
              _c.trys.push([9, 11, , 12]);
              return [4, this.context.cache.match(container.svg)];
            case 10:
              image2 = _c.sent();
              this.renderReplacedElement(container, curves, image2);
              return [3, 12];
            case 11:
              _c.sent();
              this.context.logger.error("Error loading svg " + container.svg.substring(0, 255));
              return [3, 12];
            case 12:
              if (!(container instanceof IFrameElementContainer && container.tree)) return [3, 14];
              iframeRenderer = new CanvasRenderer2(this.context, {
                scale: this.options.scale,
                backgroundColor: container.backgroundColor,
                x: 0,
                y: 0,
                width: container.width,
                height: container.height
              });
              return [4, iframeRenderer.render(container.tree)];
            case 13:
              canvas = _c.sent();
              if (container.width && container.height) {
                this.ctx.drawImage(canvas, 0, 0, container.width, container.height, container.bounds.left, container.bounds.top, container.bounds.width, container.bounds.height);
              }
              _c.label = 14;
            case 14:
              if (container instanceof InputElementContainer) {
                size = Math.min(container.bounds.width, container.bounds.height);
                if (container.type === CHECKBOX) {
                  if (container.checked) {
                    this.ctx.save();
                    this.path([
                      new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79),
                      new Vector(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549),
                      new Vector(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071),
                      new Vector(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649),
                      new Vector(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23),
                      new Vector(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085),
                      new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)
                    ]);
                    this.ctx.fillStyle = asString(INPUT_COLOR);
                    this.ctx.fill();
                    this.ctx.restore();
                  }
                } else if (container.type === RADIO) {
                  if (container.checked) {
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.arc(container.bounds.left + size / 2, container.bounds.top + size / 2, size / 4, 0, Math.PI * 2, true);
                    this.ctx.fillStyle = asString(INPUT_COLOR);
                    this.ctx.fill();
                    this.ctx.restore();
                  }
                }
              }
              if (isTextInputElement(container) && container.value.length) {
                _b = this.createFontStyle(styles), fontFamily2 = _b[0], fontSize2 = _b[1];
                baseline = this.fontMetrics.getMetrics(fontFamily2, fontSize2).baseline;
                this.ctx.font = fontFamily2;
                this.ctx.fillStyle = asString(styles.color);
                this.ctx.textBaseline = "alphabetic";
                this.ctx.textAlign = canvasTextAlign(container.styles.textAlign);
                bounds = contentBox(container);
                x = 0;
                switch (container.styles.textAlign) {
                  case 1:
                    x += bounds.width / 2;
                    break;
                  case 2:
                    x += bounds.width;
                    break;
                }
                textBounds = bounds.add(x, 0, 0, -bounds.height / 2 + 1);
                this.ctx.save();
                this.path([
                  new Vector(bounds.left, bounds.top),
                  new Vector(bounds.left + bounds.width, bounds.top),
                  new Vector(bounds.left + bounds.width, bounds.top + bounds.height),
                  new Vector(bounds.left, bounds.top + bounds.height)
                ]);
                this.ctx.clip();
                this.renderTextWithLetterSpacing(new TextBounds(container.value, textBounds), styles.letterSpacing, baseline);
                this.ctx.restore();
                this.ctx.textBaseline = "alphabetic";
                this.ctx.textAlign = "left";
              }
              if (!contains(
                container.styles.display,
                2048
                /* LIST_ITEM */
              )) return [3, 20];
              if (!(container.styles.listStyleImage !== null)) return [3, 19];
              img = container.styles.listStyleImage;
              if (!(img.type === 0)) return [3, 18];
              image2 = void 0;
              url = img.url;
              _c.label = 15;
            case 15:
              _c.trys.push([15, 17, , 18]);
              return [4, this.context.cache.match(url)];
            case 16:
              image2 = _c.sent();
              this.ctx.drawImage(image2, container.bounds.left - (image2.width + 10), container.bounds.top);
              return [3, 18];
            case 17:
              _c.sent();
              this.context.logger.error("Error loading list-style-image " + url);
              return [3, 18];
            case 18:
              return [3, 20];
            case 19:
              if (paint.listValue && container.styles.listStyleType !== -1) {
                fontFamily2 = this.createFontStyle(styles)[0];
                this.ctx.font = fontFamily2;
                this.ctx.fillStyle = asString(styles.color);
                this.ctx.textBaseline = "middle";
                this.ctx.textAlign = "right";
                bounds = new Bounds(container.bounds.left, container.bounds.top + getAbsoluteValue(container.styles.paddingTop, container.bounds.width), container.bounds.width, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 1);
                this.renderTextWithLetterSpacing(new TextBounds(paint.listValue, bounds), styles.letterSpacing, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 2);
                this.ctx.textBaseline = "bottom";
                this.ctx.textAlign = "left";
              }
              _c.label = 20;
            case 20:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer2.prototype.renderStackContent = function(stack) {
      return __awaiter(this, void 0, void 0, function() {
        var _i, _a, child, _b, _c, child, _d, _e, child, _f, _g, child, _h, _j, child, _k, _l, child, _m, _o, child;
        return __generator(this, function(_p) {
          switch (_p.label) {
            case 0:
              if (contains(
                stack.element.container.flags,
                16
                /* DEBUG_RENDER */
              )) {
                debugger;
              }
              return [4, this.renderNodeBackgroundAndBorders(stack.element)];
            case 1:
              _p.sent();
              _i = 0, _a = stack.negativeZIndex;
              _p.label = 2;
            case 2:
              if (!(_i < _a.length)) return [3, 5];
              child = _a[_i];
              return [4, this.renderStack(child)];
            case 3:
              _p.sent();
              _p.label = 4;
            case 4:
              _i++;
              return [3, 2];
            case 5:
              return [4, this.renderNodeContent(stack.element)];
            case 6:
              _p.sent();
              _b = 0, _c = stack.nonInlineLevel;
              _p.label = 7;
            case 7:
              if (!(_b < _c.length)) return [3, 10];
              child = _c[_b];
              return [4, this.renderNode(child)];
            case 8:
              _p.sent();
              _p.label = 9;
            case 9:
              _b++;
              return [3, 7];
            case 10:
              _d = 0, _e = stack.nonPositionedFloats;
              _p.label = 11;
            case 11:
              if (!(_d < _e.length)) return [3, 14];
              child = _e[_d];
              return [4, this.renderStack(child)];
            case 12:
              _p.sent();
              _p.label = 13;
            case 13:
              _d++;
              return [3, 11];
            case 14:
              _f = 0, _g = stack.nonPositionedInlineLevel;
              _p.label = 15;
            case 15:
              if (!(_f < _g.length)) return [3, 18];
              child = _g[_f];
              return [4, this.renderStack(child)];
            case 16:
              _p.sent();
              _p.label = 17;
            case 17:
              _f++;
              return [3, 15];
            case 18:
              _h = 0, _j = stack.inlineLevel;
              _p.label = 19;
            case 19:
              if (!(_h < _j.length)) return [3, 22];
              child = _j[_h];
              return [4, this.renderNode(child)];
            case 20:
              _p.sent();
              _p.label = 21;
            case 21:
              _h++;
              return [3, 19];
            case 22:
              _k = 0, _l = stack.zeroOrAutoZIndexOrTransformedOrOpacity;
              _p.label = 23;
            case 23:
              if (!(_k < _l.length)) return [3, 26];
              child = _l[_k];
              return [4, this.renderStack(child)];
            case 24:
              _p.sent();
              _p.label = 25;
            case 25:
              _k++;
              return [3, 23];
            case 26:
              _m = 0, _o = stack.positiveZIndex;
              _p.label = 27;
            case 27:
              if (!(_m < _o.length)) return [3, 30];
              child = _o[_m];
              return [4, this.renderStack(child)];
            case 28:
              _p.sent();
              _p.label = 29;
            case 29:
              _m++;
              return [3, 27];
            case 30:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer2.prototype.mask = function(paths) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.canvas.width, 0);
      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      this.ctx.lineTo(0, this.canvas.height);
      this.ctx.lineTo(0, 0);
      this.formatPath(paths.slice(0).reverse());
      this.ctx.closePath();
    };
    CanvasRenderer2.prototype.path = function(paths) {
      this.ctx.beginPath();
      this.formatPath(paths);
      this.ctx.closePath();
    };
    CanvasRenderer2.prototype.formatPath = function(paths) {
      var _this = this;
      paths.forEach(function(point, index) {
        var start = isBezierCurve(point) ? point.start : point;
        if (index === 0) {
          _this.ctx.moveTo(start.x, start.y);
        } else {
          _this.ctx.lineTo(start.x, start.y);
        }
        if (isBezierCurve(point)) {
          _this.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
        }
      });
    };
    CanvasRenderer2.prototype.renderRepeat = function(path, pattern, offsetX, offsetY) {
      this.path(path);
      this.ctx.fillStyle = pattern;
      this.ctx.translate(offsetX, offsetY);
      this.ctx.fill();
      this.ctx.translate(-offsetX, -offsetY);
    };
    CanvasRenderer2.prototype.resizeImage = function(image2, width, height) {
      var _a;
      if (image2.width === width && image2.height === height) {
        return image2;
      }
      var ownerDocument = (_a = this.canvas.ownerDocument) !== null && _a !== void 0 ? _a : document;
      var canvas = ownerDocument.createElement("canvas");
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image2, 0, 0, image2.width, image2.height, 0, 0, width, height);
      return canvas;
    };
    CanvasRenderer2.prototype.renderBackgroundImage = function(container) {
      return __awaiter(this, void 0, void 0, function() {
        var index, _loop_1, this_1, _i, _a, backgroundImage2;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              index = container.styles.backgroundImage.length - 1;
              _loop_1 = function(backgroundImage3) {
                var image2, url, _c, path, x, y, width, height, pattern, _d, path, x, y, width, height, _e, lineLength, x0, x1, y0, y1, canvas, ctx, gradient_1, pattern, _f, path, left, top_1, width, height, position2, x, y, _g, rx, ry, radialGradient_1, midX, midY, f2, invF;
                return __generator(this, function(_h) {
                  switch (_h.label) {
                    case 0:
                      if (!(backgroundImage3.type === 0)) return [3, 5];
                      image2 = void 0;
                      url = backgroundImage3.url;
                      _h.label = 1;
                    case 1:
                      _h.trys.push([1, 3, , 4]);
                      return [4, this_1.context.cache.match(url)];
                    case 2:
                      image2 = _h.sent();
                      return [3, 4];
                    case 3:
                      _h.sent();
                      this_1.context.logger.error("Error loading background-image " + url);
                      return [3, 4];
                    case 4:
                      if (image2) {
                        _c = calculateBackgroundRendering(container, index, [
                          image2.width,
                          image2.height,
                          image2.width / image2.height
                        ]), path = _c[0], x = _c[1], y = _c[2], width = _c[3], height = _c[4];
                        pattern = this_1.ctx.createPattern(this_1.resizeImage(image2, width, height), "repeat");
                        this_1.renderRepeat(path, pattern, x, y);
                      }
                      return [3, 6];
                    case 5:
                      if (isLinearGradient(backgroundImage3)) {
                        _d = calculateBackgroundRendering(container, index, [null, null, null]), path = _d[0], x = _d[1], y = _d[2], width = _d[3], height = _d[4];
                        _e = calculateGradientDirection(backgroundImage3.angle, width, height), lineLength = _e[0], x0 = _e[1], x1 = _e[2], y0 = _e[3], y1 = _e[4];
                        canvas = document.createElement("canvas");
                        canvas.width = width;
                        canvas.height = height;
                        ctx = canvas.getContext("2d");
                        gradient_1 = ctx.createLinearGradient(x0, y0, x1, y1);
                        processColorStops(backgroundImage3.stops, lineLength).forEach(function(colorStop) {
                          return gradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                        });
                        ctx.fillStyle = gradient_1;
                        ctx.fillRect(0, 0, width, height);
                        if (width > 0 && height > 0) {
                          pattern = this_1.ctx.createPattern(canvas, "repeat");
                          this_1.renderRepeat(path, pattern, x, y);
                        }
                      } else if (isRadialGradient(backgroundImage3)) {
                        _f = calculateBackgroundRendering(container, index, [
                          null,
                          null,
                          null
                        ]), path = _f[0], left = _f[1], top_1 = _f[2], width = _f[3], height = _f[4];
                        position2 = backgroundImage3.position.length === 0 ? [FIFTY_PERCENT] : backgroundImage3.position;
                        x = getAbsoluteValue(position2[0], width);
                        y = getAbsoluteValue(position2[position2.length - 1], height);
                        _g = calculateRadius(backgroundImage3, x, y, width, height), rx = _g[0], ry = _g[1];
                        if (rx > 0 && ry > 0) {
                          radialGradient_1 = this_1.ctx.createRadialGradient(left + x, top_1 + y, 0, left + x, top_1 + y, rx);
                          processColorStops(backgroundImage3.stops, rx * 2).forEach(function(colorStop) {
                            return radialGradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                          });
                          this_1.path(path);
                          this_1.ctx.fillStyle = radialGradient_1;
                          if (rx !== ry) {
                            midX = container.bounds.left + 0.5 * container.bounds.width;
                            midY = container.bounds.top + 0.5 * container.bounds.height;
                            f2 = ry / rx;
                            invF = 1 / f2;
                            this_1.ctx.save();
                            this_1.ctx.translate(midX, midY);
                            this_1.ctx.transform(1, 0, 0, f2, 0, 0);
                            this_1.ctx.translate(-midX, -midY);
                            this_1.ctx.fillRect(left, invF * (top_1 - midY) + midY, width, height * invF);
                            this_1.ctx.restore();
                          } else {
                            this_1.ctx.fill();
                          }
                        }
                      }
                      _h.label = 6;
                    case 6:
                      index--;
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              };
              this_1 = this;
              _i = 0, _a = container.styles.backgroundImage.slice(0).reverse();
              _b.label = 1;
            case 1:
              if (!(_i < _a.length)) return [3, 4];
              backgroundImage2 = _a[_i];
              return [5, _loop_1(backgroundImage2)];
            case 2:
              _b.sent();
              _b.label = 3;
            case 3:
              _i++;
              return [3, 1];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer2.prototype.renderSolidBorder = function(color2, side, curvePoints) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          this.path(parsePathForBorder(curvePoints, side));
          this.ctx.fillStyle = asString(color2);
          this.ctx.fill();
          return [
            2
            /*return*/
          ];
        });
      });
    };
    CanvasRenderer2.prototype.renderDoubleBorder = function(color2, width, side, curvePoints) {
      return __awaiter(this, void 0, void 0, function() {
        var outerPaths, innerPaths;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!(width < 3)) return [3, 2];
              return [4, this.renderSolidBorder(color2, side, curvePoints)];
            case 1:
              _a.sent();
              return [
                2
                /*return*/
              ];
            case 2:
              outerPaths = parsePathForBorderDoubleOuter(curvePoints, side);
              this.path(outerPaths);
              this.ctx.fillStyle = asString(color2);
              this.ctx.fill();
              innerPaths = parsePathForBorderDoubleInner(curvePoints, side);
              this.path(innerPaths);
              this.ctx.fill();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer2.prototype.renderNodeBackgroundAndBorders = function(paint) {
      return __awaiter(this, void 0, void 0, function() {
        var styles, hasBackground, borders, backgroundPaintingArea, side, _i, borders_1, border;
        var _this = this;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              this.applyEffects(paint.getEffects(
                2
                /* BACKGROUND_BORDERS */
              ));
              styles = paint.container.styles;
              hasBackground = !isTransparent(styles.backgroundColor) || styles.backgroundImage.length;
              borders = [
                { style: styles.borderTopStyle, color: styles.borderTopColor, width: styles.borderTopWidth },
                { style: styles.borderRightStyle, color: styles.borderRightColor, width: styles.borderRightWidth },
                { style: styles.borderBottomStyle, color: styles.borderBottomColor, width: styles.borderBottomWidth },
                { style: styles.borderLeftStyle, color: styles.borderLeftColor, width: styles.borderLeftWidth }
              ];
              backgroundPaintingArea = calculateBackgroundCurvedPaintingArea(getBackgroundValueForIndex(styles.backgroundClip, 0), paint.curves);
              if (!(hasBackground || styles.boxShadow.length)) return [3, 2];
              this.ctx.save();
              this.path(backgroundPaintingArea);
              this.ctx.clip();
              if (!isTransparent(styles.backgroundColor)) {
                this.ctx.fillStyle = asString(styles.backgroundColor);
                this.ctx.fill();
              }
              return [4, this.renderBackgroundImage(paint.container)];
            case 1:
              _a.sent();
              this.ctx.restore();
              styles.boxShadow.slice(0).reverse().forEach(function(shadow) {
                _this.ctx.save();
                var borderBoxArea = calculateBorderBoxPath(paint.curves);
                var maskOffset = shadow.inset ? 0 : MASK_OFFSET;
                var shadowPaintingArea = transformPath(borderBoxArea, -maskOffset + (shadow.inset ? 1 : -1) * shadow.spread.number, (shadow.inset ? 1 : -1) * shadow.spread.number, shadow.spread.number * (shadow.inset ? -2 : 2), shadow.spread.number * (shadow.inset ? -2 : 2));
                if (shadow.inset) {
                  _this.path(borderBoxArea);
                  _this.ctx.clip();
                  _this.mask(shadowPaintingArea);
                } else {
                  _this.mask(borderBoxArea);
                  _this.ctx.clip();
                  _this.path(shadowPaintingArea);
                }
                _this.ctx.shadowOffsetX = shadow.offsetX.number + maskOffset;
                _this.ctx.shadowOffsetY = shadow.offsetY.number;
                _this.ctx.shadowColor = asString(shadow.color);
                _this.ctx.shadowBlur = shadow.blur.number;
                _this.ctx.fillStyle = shadow.inset ? asString(shadow.color) : "rgba(0,0,0,1)";
                _this.ctx.fill();
                _this.ctx.restore();
              });
              _a.label = 2;
            case 2:
              side = 0;
              _i = 0, borders_1 = borders;
              _a.label = 3;
            case 3:
              if (!(_i < borders_1.length)) return [3, 13];
              border = borders_1[_i];
              if (!(border.style !== 0 && !isTransparent(border.color) && border.width > 0)) return [3, 11];
              if (!(border.style === 2)) return [3, 5];
              return [4, this.renderDashedDottedBorder(
                border.color,
                border.width,
                side,
                paint.curves,
                2
                /* DASHED */
              )];
            case 4:
              _a.sent();
              return [3, 11];
            case 5:
              if (!(border.style === 3)) return [3, 7];
              return [4, this.renderDashedDottedBorder(
                border.color,
                border.width,
                side,
                paint.curves,
                3
                /* DOTTED */
              )];
            case 6:
              _a.sent();
              return [3, 11];
            case 7:
              if (!(border.style === 4)) return [3, 9];
              return [4, this.renderDoubleBorder(border.color, border.width, side, paint.curves)];
            case 8:
              _a.sent();
              return [3, 11];
            case 9:
              return [4, this.renderSolidBorder(border.color, side, paint.curves)];
            case 10:
              _a.sent();
              _a.label = 11;
            case 11:
              side++;
              _a.label = 12;
            case 12:
              _i++;
              return [3, 3];
            case 13:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer2.prototype.renderDashedDottedBorder = function(color2, width, side, curvePoints, style) {
      return __awaiter(this, void 0, void 0, function() {
        var strokePaths, boxPaths, startX, startY, endX, endY, length, dashLength, spaceLength, useLineDash, multiplier, numberOfDashes, minSpace, maxSpace, path1, path2, path1, path2;
        return __generator(this, function(_a) {
          this.ctx.save();
          strokePaths = parsePathForBorderStroke(curvePoints, side);
          boxPaths = parsePathForBorder(curvePoints, side);
          if (style === 2) {
            this.path(boxPaths);
            this.ctx.clip();
          }
          if (isBezierCurve(boxPaths[0])) {
            startX = boxPaths[0].start.x;
            startY = boxPaths[0].start.y;
          } else {
            startX = boxPaths[0].x;
            startY = boxPaths[0].y;
          }
          if (isBezierCurve(boxPaths[1])) {
            endX = boxPaths[1].end.x;
            endY = boxPaths[1].end.y;
          } else {
            endX = boxPaths[1].x;
            endY = boxPaths[1].y;
          }
          if (side === 0 || side === 2) {
            length = Math.abs(startX - endX);
          } else {
            length = Math.abs(startY - endY);
          }
          this.ctx.beginPath();
          if (style === 3) {
            this.formatPath(strokePaths);
          } else {
            this.formatPath(boxPaths.slice(0, 2));
          }
          dashLength = width < 3 ? width * 3 : width * 2;
          spaceLength = width < 3 ? width * 2 : width;
          if (style === 3) {
            dashLength = width;
            spaceLength = width;
          }
          useLineDash = true;
          if (length <= dashLength * 2) {
            useLineDash = false;
          } else if (length <= dashLength * 2 + spaceLength) {
            multiplier = length / (2 * dashLength + spaceLength);
            dashLength *= multiplier;
            spaceLength *= multiplier;
          } else {
            numberOfDashes = Math.floor((length + spaceLength) / (dashLength + spaceLength));
            minSpace = (length - numberOfDashes * dashLength) / (numberOfDashes - 1);
            maxSpace = (length - (numberOfDashes + 1) * dashLength) / numberOfDashes;
            spaceLength = maxSpace <= 0 || Math.abs(spaceLength - minSpace) < Math.abs(spaceLength - maxSpace) ? minSpace : maxSpace;
          }
          if (useLineDash) {
            if (style === 3) {
              this.ctx.setLineDash([0, dashLength + spaceLength]);
            } else {
              this.ctx.setLineDash([dashLength, spaceLength]);
            }
          }
          if (style === 3) {
            this.ctx.lineCap = "round";
            this.ctx.lineWidth = width;
          } else {
            this.ctx.lineWidth = width * 2 + 1.1;
          }
          this.ctx.strokeStyle = asString(color2);
          this.ctx.stroke();
          this.ctx.setLineDash([]);
          if (style === 2) {
            if (isBezierCurve(boxPaths[0])) {
              path1 = boxPaths[3];
              path2 = boxPaths[0];
              this.ctx.beginPath();
              this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
              this.ctx.stroke();
            }
            if (isBezierCurve(boxPaths[1])) {
              path1 = boxPaths[1];
              path2 = boxPaths[2];
              this.ctx.beginPath();
              this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
              this.ctx.stroke();
            }
          }
          this.ctx.restore();
          return [
            2
            /*return*/
          ];
        });
      });
    };
    CanvasRenderer2.prototype.render = function(element) {
      return __awaiter(this, void 0, void 0, function() {
        var stack;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (this.options.backgroundColor) {
                this.ctx.fillStyle = asString(this.options.backgroundColor);
                this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height);
              }
              stack = parseStackingContexts(element);
              return [4, this.renderStack(stack)];
            case 1:
              _a.sent();
              this.applyEffects([]);
              return [2, this.canvas];
          }
        });
      });
    };
    return CanvasRenderer2;
  })(Renderer)
);
var isTextInputElement = function(container) {
  if (container instanceof TextareaElementContainer) {
    return true;
  } else if (container instanceof SelectElementContainer) {
    return true;
  } else if (container instanceof InputElementContainer && container.type !== RADIO && container.type !== CHECKBOX) {
    return true;
  }
  return false;
};
var calculateBackgroundCurvedPaintingArea = function(clip, curves) {
  switch (clip) {
    case 0:
      return calculateBorderBoxPath(curves);
    case 2:
      return calculateContentBoxPath(curves);
    case 1:
    default:
      return calculatePaddingBoxPath(curves);
  }
};
var canvasTextAlign = function(textAlign2) {
  switch (textAlign2) {
    case 1:
      return "center";
    case 2:
      return "right";
    case 0:
    default:
      return "left";
  }
};
var iOSBrokenFonts = ["-apple-system", "system-ui"];
var fixIOSSystemFonts = function(fontFamilies) {
  return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? fontFamilies.filter(function(fontFamily2) {
    return iOSBrokenFonts.indexOf(fontFamily2) === -1;
  }) : fontFamilies;
};
var ForeignObjectRenderer = (
  /** @class */
  (function(_super) {
    __extends(ForeignObjectRenderer2, _super);
    function ForeignObjectRenderer2(context, options) {
      var _this = _super.call(this, context, options) || this;
      _this.canvas = options.canvas ? options.canvas : document.createElement("canvas");
      _this.ctx = _this.canvas.getContext("2d");
      _this.options = options;
      _this.canvas.width = Math.floor(options.width * options.scale);
      _this.canvas.height = Math.floor(options.height * options.scale);
      _this.canvas.style.width = options.width + "px";
      _this.canvas.style.height = options.height + "px";
      _this.ctx.scale(_this.options.scale, _this.options.scale);
      _this.ctx.translate(-options.x, -options.y);
      _this.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
      return _this;
    }
    ForeignObjectRenderer2.prototype.render = function(element) {
      return __awaiter(this, void 0, void 0, function() {
        var svg, img;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              svg = createForeignObjectSVG(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, element);
              return [4, loadSerializedSVG(svg)];
            case 1:
              img = _a.sent();
              if (this.options.backgroundColor) {
                this.ctx.fillStyle = asString(this.options.backgroundColor);
                this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale);
              }
              this.ctx.drawImage(img, -this.options.x * this.options.scale, -this.options.y * this.options.scale);
              return [2, this.canvas];
          }
        });
      });
    };
    return ForeignObjectRenderer2;
  })(Renderer)
);
var loadSerializedSVG = function(svg) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = function() {
      resolve(img);
    };
    img.onerror = reject;
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
  });
};
var Logger = (
  /** @class */
  (function() {
    function Logger2(_a) {
      var id = _a.id, enabled = _a.enabled;
      this.id = id;
      this.enabled = enabled;
      this.start = Date.now();
    }
    Logger2.prototype.debug = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.enabled) {
        if (typeof window !== "undefined" && window.console && typeof console.debug === "function") {
          console.debug.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
        } else {
          this.info.apply(this, args);
        }
      }
    };
    Logger2.prototype.getTime = function() {
      return Date.now() - this.start;
    };
    Logger2.prototype.info = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.enabled) {
        if (typeof window !== "undefined" && window.console && typeof console.info === "function") {
          console.info.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
        }
      }
    };
    Logger2.prototype.warn = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.enabled) {
        if (typeof window !== "undefined" && window.console && typeof console.warn === "function") {
          console.warn.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
        } else {
          this.info.apply(this, args);
        }
      }
    };
    Logger2.prototype.error = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.enabled) {
        if (typeof window !== "undefined" && window.console && typeof console.error === "function") {
          console.error.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
        } else {
          this.info.apply(this, args);
        }
      }
    };
    Logger2.instances = {};
    return Logger2;
  })()
);
var Context = (
  /** @class */
  (function() {
    function Context2(options, windowBounds) {
      var _a;
      this.windowBounds = windowBounds;
      this.instanceName = "#" + Context2.instanceCount++;
      this.logger = new Logger({ id: this.instanceName, enabled: options.logging });
      this.cache = (_a = options.cache) !== null && _a !== void 0 ? _a : new Cache(this, options);
    }
    Context2.instanceCount = 1;
    return Context2;
  })()
);
var html2canvas = function(element, options) {
  if (options === void 0) {
    options = {};
  }
  return renderElement(element, options);
};
if (typeof window !== "undefined") {
  CacheStorage.setContext(window);
}
var renderElement = function(element, opts) {
  return __awaiter(void 0, void 0, void 0, function() {
    var ownerDocument, defaultView, resourceOptions, contextOptions, windowOptions, windowBounds, context, foreignObjectRendering, cloneOptions, documentCloner, clonedElement, container, _a, width, height, left, top, backgroundColor2, renderOptions, canvas, renderer, root, renderer;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    return __generator(this, function(_u) {
      switch (_u.label) {
        case 0:
          if (!element || typeof element !== "object") {
            return [2, Promise.reject("Invalid element provided as first argument")];
          }
          ownerDocument = element.ownerDocument;
          if (!ownerDocument) {
            throw new Error("Element is not attached to a Document");
          }
          defaultView = ownerDocument.defaultView;
          if (!defaultView) {
            throw new Error("Document is not attached to a Window");
          }
          resourceOptions = {
            allowTaint: (_b = opts.allowTaint) !== null && _b !== void 0 ? _b : false,
            imageTimeout: (_c = opts.imageTimeout) !== null && _c !== void 0 ? _c : 15e3,
            proxy: opts.proxy,
            useCORS: (_d = opts.useCORS) !== null && _d !== void 0 ? _d : false
          };
          contextOptions = __assign({ logging: (_e = opts.logging) !== null && _e !== void 0 ? _e : true, cache: opts.cache }, resourceOptions);
          windowOptions = {
            windowWidth: (_f = opts.windowWidth) !== null && _f !== void 0 ? _f : defaultView.innerWidth,
            windowHeight: (_g = opts.windowHeight) !== null && _g !== void 0 ? _g : defaultView.innerHeight,
            scrollX: (_h = opts.scrollX) !== null && _h !== void 0 ? _h : defaultView.pageXOffset,
            scrollY: (_j = opts.scrollY) !== null && _j !== void 0 ? _j : defaultView.pageYOffset
          };
          windowBounds = new Bounds(windowOptions.scrollX, windowOptions.scrollY, windowOptions.windowWidth, windowOptions.windowHeight);
          context = new Context(contextOptions, windowBounds);
          foreignObjectRendering = (_k = opts.foreignObjectRendering) !== null && _k !== void 0 ? _k : false;
          cloneOptions = {
            allowTaint: (_l = opts.allowTaint) !== null && _l !== void 0 ? _l : false,
            onclone: opts.onclone,
            ignoreElements: opts.ignoreElements,
            inlineImages: foreignObjectRendering,
            copyStyles: foreignObjectRendering
          };
          context.logger.debug("Starting document clone with size " + windowBounds.width + "x" + windowBounds.height + " scrolled to " + -windowBounds.left + "," + -windowBounds.top);
          documentCloner = new DocumentCloner(context, element, cloneOptions);
          clonedElement = documentCloner.clonedReferenceElement;
          if (!clonedElement) {
            return [2, Promise.reject("Unable to find element in cloned iframe")];
          }
          return [4, documentCloner.toIFrame(ownerDocument, windowBounds)];
        case 1:
          container = _u.sent();
          _a = isBodyElement(clonedElement) || isHTMLElement(clonedElement) ? parseDocumentSize(clonedElement.ownerDocument) : parseBounds(context, clonedElement), width = _a.width, height = _a.height, left = _a.left, top = _a.top;
          backgroundColor2 = parseBackgroundColor(context, clonedElement, opts.backgroundColor);
          renderOptions = {
            canvas: opts.canvas,
            backgroundColor: backgroundColor2,
            scale: (_o = (_m = opts.scale) !== null && _m !== void 0 ? _m : defaultView.devicePixelRatio) !== null && _o !== void 0 ? _o : 1,
            x: ((_p = opts.x) !== null && _p !== void 0 ? _p : 0) + left,
            y: ((_q = opts.y) !== null && _q !== void 0 ? _q : 0) + top,
            width: (_r = opts.width) !== null && _r !== void 0 ? _r : Math.ceil(width),
            height: (_s = opts.height) !== null && _s !== void 0 ? _s : Math.ceil(height)
          };
          if (!foreignObjectRendering) return [3, 3];
          context.logger.debug("Document cloned, using foreign object rendering");
          renderer = new ForeignObjectRenderer(context, renderOptions);
          return [4, renderer.render(clonedElement)];
        case 2:
          canvas = _u.sent();
          return [3, 5];
        case 3:
          context.logger.debug("Document cloned, element located at " + left + "," + top + " with size " + width + "x" + height + " using computed rendering");
          context.logger.debug("Starting DOM parsing");
          root = parseTree(context, clonedElement);
          if (backgroundColor2 === root.styles.backgroundColor) {
            root.styles.backgroundColor = COLORS.TRANSPARENT;
          }
          context.logger.debug("Starting renderer for element at " + renderOptions.x + "," + renderOptions.y + " with size " + renderOptions.width + "x" + renderOptions.height);
          renderer = new CanvasRenderer(context, renderOptions);
          return [4, renderer.render(root)];
        case 4:
          canvas = _u.sent();
          _u.label = 5;
        case 5:
          if ((_t = opts.removeContainer) !== null && _t !== void 0 ? _t : true) {
            if (!DocumentCloner.destroy(container)) {
              context.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore");
            }
          }
          context.logger.debug("Finished rendering");
          return [2, canvas];
      }
    });
  });
};
var parseBackgroundColor = function(context, element, backgroundColorOverride) {
  var ownerDocument = element.ownerDocument;
  var documentBackgroundColor = ownerDocument.documentElement ? parseColor(context, getComputedStyle(ownerDocument.documentElement).backgroundColor) : COLORS.TRANSPARENT;
  var bodyBackgroundColor = ownerDocument.body ? parseColor(context, getComputedStyle(ownerDocument.body).backgroundColor) : COLORS.TRANSPARENT;
  var defaultBackgroundColor = typeof backgroundColorOverride === "string" ? parseColor(context, backgroundColorOverride) : backgroundColorOverride === null ? COLORS.TRANSPARENT : 4294967295;
  return element === ownerDocument.documentElement ? isTransparent(documentBackgroundColor) ? isTransparent(bodyBackgroundColor) ? defaultBackgroundColor : bodyBackgroundColor : documentBackgroundColor : defaultBackgroundColor;
};
function EagleLogo({ src, size = 100 }) {
  if (src) return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "Герб", style: { width: size, height: size, objectFit: "contain" } });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, viewBox: "0 0 200 200", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "115", rx: "22", ry: "30", fill: "#2c3e6b" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "75", r: "16", fill: "#e8e0c8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M107 78 L116 82 L107 85 Z", fill: "#c8900a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "104", cy: "76", r: "2.5", fill: "#111" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M100 100 C85 95 60 85 20 70 C30 75 50 90 78 105 Z", fill: "#2c3e6b" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M100 108 C80 105 50 98 15 88 C28 91 55 100 80 112 Z", fill: "#2c3e6b" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M100 116 C82 114 52 110 18 106 C32 107 58 112 82 118 Z", fill: "#1a2a4a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M100 100 C115 95 140 85 180 70 C170 75 150 90 122 105 Z", fill: "#2c3e6b" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M100 108 C120 105 150 98 185 88 C172 91 145 100 120 112 Z", fill: "#2c3e6b" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M100 116 C118 114 148 110 182 106 C168 107 142 112 118 118 Z", fill: "#1a2a4a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "88", y: "138", width: "24", height: "18", rx: "2", fill: "#c0392b" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "88", y: "138", width: "6", height: "18", rx: "1", fill: "#f0f0f0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "97", y: "138", width: "6", height: "18", rx: "1", fill: "#f0f0f0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "75", y1: "145", x2: "88", y2: "138", stroke: "#888", strokeWidth: "2.5", strokeLinecap: "round" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "70", y1: "140", x2: "88", y2: "138", stroke: "#888", strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "72", y1: "150", x2: "88", y2: "143", stroke: "#888", strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "125", y1: "145", x2: "112", y2: "138", stroke: "#888", strokeWidth: "2.5", strokeLinecap: "round" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "130", y1: "140", x2: "112", y2: "138", stroke: "#888", strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "128", y1: "150", x2: "112", y2: "143", stroke: "#888", strokeWidth: "2", strokeLinecap: "round" }),
    [35, 55, 75, 95, 115, 135, 155, 175].map((x, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x, y: "58", textAnchor: "middle", fontSize: "10", fill: "#c8900a", children: "★" }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "60", y: "158", width: "80", height: "13", rx: "2", fill: "#c8900a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "100", y: "168", textAnchor: "middle", fontSize: "7", fontFamily: "serif", fontWeight: "bold", fill: "#fff", letterSpacing: "1", children: "E PLURIBUS UNUM" })
  ] });
}
const A4_CONTENT_WIDTH = 694;
const A4_CONTENT_HEIGHT = 1043;
const SIGNATURE_RESERVED = 110;
function stripTokensForPreview(html) {
  if (!html) return html;
  const div = document.createElement("div");
  div.innerHTML = html;
  div.querySelectorAll("span.smart-field-filled").forEach((span) => {
    span.replaceWith(document.createTextNode(span.textContent || ""));
  });
  div.querySelectorAll("mark.doc-placeholder").forEach((mark) => {
    mark.replaceWith(document.createTextNode(mark.textContent || ""));
  });
  div.querySelectorAll("p").forEach((p) => {
    const t = p.innerHTML.trim();
    if (t === "&nbsp;" || t === "<br>" || t === "" || t === " ") {
      p.remove();
    }
  });
  return div.innerHTML;
}
function stripSignatureBlock(html) {
  if (!html.includes("doc-signature-block")) return html;
  const div = document.createElement("div");
  div.innerHTML = html;
  const sig = div.querySelector(".doc-signature-block");
  if (!sig) return html;
  let prev = sig.previousElementSibling;
  while (prev) {
    const text = prev.innerHTML?.trim();
    if (text === "" || text === "&nbsp;") {
      const toRemove = prev;
      prev = prev.previousElementSibling;
      toRemove.parentElement?.removeChild(toRemove);
    } else {
      break;
    }
  }
  sig.parentElement?.removeChild(sig);
  return div.innerHTML;
}
function paginateHtml(html, firstPageReserved = 0, lastPageReserved = SIGNATURE_RESERVED) {
  const clean = stripSignatureBlock(html);
  if (!clean.trim()) return [""];
  const container = document.createElement("div");
  container.style.cssText = [
    "position: fixed",
    "left: -9999px",
    "top: 0",
    `width: ${A4_CONTENT_WIDTH}px`,
    "font-family: 'Times New Roman', Georgia, serif",
    "font-size: 13px",
    "line-height: 1.35",
    "text-align: justify",
    "word-break: break-word",
    "visibility: hidden",
    "pointer-events: none",
    "z-index: -9999"
  ].join("; ");
  const measureStyle = document.createElement("style");
  measureStyle.textContent = `
    .a4-measure p { margin: 0; text-indent: 0; }
    .a4-measure p[style*="text-align:center"],
    .a4-measure p[style*="text-align: center"] { text-align: center; }
    .a4-measure p[style*="text-align:right"],
    .a4-measure p[style*="text-align: right"]  { text-align: right; }
    .a4-measure h1 { font-size: 13px; font-weight: 700; margin: 4px 0; text-indent: 0; text-align: center; }
    .a4-measure h2 { font-size: 13px; font-weight: 700; margin: 3px 0 2px; text-indent: 0; }
    .a4-measure h3 { font-size: 13px; font-weight: 600; margin: 3px 0 2px; text-indent: 0; }
    .a4-measure ul, .a4-measure ol { padding-left: 20px; margin: 2px 0; text-indent: 0; }
    .a4-measure li { margin: 1px 0; text-align: justify; }
    .a4-measure blockquote { margin: 3px 0; padding-left: 10px; text-indent: 0; }
    .a4-measure .doc-section {
      display: block; font-weight: 700; font-size: 13px;
      text-transform: uppercase; margin: 10px 0 5px;
      text-indent: 0; text-align: center;
    }
  `;
  document.head.appendChild(measureStyle);
  container.className = "a4-measure";
  document.body.appendChild(container);
  const temp = document.createElement("div");
  temp.innerHTML = clean;
  const nodes = Array.from(temp.childNodes);
  function paginate(nodeList, firstReserved, lastReserved) {
    const pages = [];
    let curHtml = "";
    let curH = 0;
    let isFirst = true;
    for (const node of nodeList) {
      const el = node;
      if (el.nodeName === "HR" && el.classList?.contains("page-break")) {
        pages.push(curHtml || "<p></p>");
        curHtml = "";
        curH = 0;
        isFirst = false;
        continue;
      }
      const elHtml = el.outerHTML || "";
      if (!elHtml.trim()) continue;
      container.innerHTML = elHtml;
      const elH = container.offsetHeight + 8;
      const avail = A4_CONTENT_HEIGHT - (isFirst ? firstReserved : 0);
      if (curH + elH > avail && curHtml.trim()) {
        pages.push(curHtml);
        curHtml = "";
        curH = 0;
        isFirst = false;
      }
      curHtml += elHtml;
      curH += elH;
    }
    if (curHtml.trim()) pages.push(curHtml);
    return pages.length > 0 ? pages : [""];
  }
  const firstPass = paginate(nodes, firstPageReserved);
  if (firstPass.length > 0) {
    const lastIdx = firstPass.length - 1;
    container.innerHTML = firstPass[lastIdx];
    const lastH = container.offsetHeight;
    const lastAvail = A4_CONTENT_HEIGHT - (firstPass.length === 1 ? firstPageReserved : 0) - lastPageReserved;
    if (lastH > lastAvail && firstPass.length === 1) {
      const temp2 = document.createElement("div");
      temp2.innerHTML = clean;
      const nodes2 = Array.from(temp2.childNodes);
      const pages2 = [];
      let curHtml2 = "";
      let curH2 = 0;
      let isFirst2 = true;
      for (const node of nodes2) {
        const el = node;
        if (el.nodeName === "HR" && el.classList?.contains("page-break")) {
          pages2.push(curHtml2 || "<p></p>");
          curHtml2 = "";
          curH2 = 0;
          isFirst2 = false;
          continue;
        }
        const elHtml = el.outerHTML || "";
        if (!elHtml.trim()) continue;
        container.innerHTML = elHtml;
        const elH = container.offsetHeight + 8;
        const avail = A4_CONTENT_HEIGHT - (isFirst2 ? firstPageReserved : 0) - lastPageReserved;
        if (curH2 + elH > avail && curHtml2.trim()) {
          pages2.push(curHtml2);
          curHtml2 = "";
          curH2 = 0;
          isFirst2 = false;
        }
        curHtml2 += elHtml;
        curH2 += elH;
      }
      if (curHtml2.trim()) pages2.push(curHtml2);
      try {
        document.body.removeChild(container);
      } catch {
      }
      try {
        document.head.removeChild(measureStyle);
      } catch {
      }
      return pages2.length > 0 ? pages2 : [""];
    }
  }
  try {
    document.body.removeChild(container);
  } catch {
  }
  try {
    document.head.removeChild(measureStyle);
  } catch {
  }
  return firstPass.length > 0 ? firstPass : [""];
}
function DocumentPreview({ content: content2, case_: c, settings, docTitle, docType }) {
  const { settings: appSettings } = useApp();
  const pagesContainerRef = reactExports.useRef(null);
  const [exporting, setExporting] = reactExports.useState(false);
  const [pages, setPages] = reactExports.useState([content2 || ""]);
  const determinationLogo = appSettings.heraldryDeterminationBase64 || null;
  const orderLogo = appSettings.heraldryOrderBase64 || null;
  const heraldrySize = appSettings.heraldrySize ?? 130;
  const stampOffsetX = appSettings.stampOffsetX ?? 0;
  const stampOffsetY = appSettings.stampOffsetY ?? 0;
  const stampScale = appSettings.stampScale ?? 120;
  const judgeName = `${settings.judgeFirstName} ${settings.judgeLastName}`.trim() || "Судья";
  const judgePosition = settings.position || "Судья Окружного суда";
  reactExports.useEffect(() => {
    const logoReserved = heraldrySize + 28;
    const timer = setTimeout(() => {
      setPages(paginateHtml(stripTokensForPreview(content2), logoReserved, SIGNATURE_RESERVED));
    }, 350);
    return () => clearTimeout(timer);
  }, [content2, heraldrySize]);
  const exportJpeg = reactExports.useCallback(async () => {
    setExporting(true);
    try {
      const folder = await window.api.saveJpegFolder();
      if (!folder) {
        setExporting(false);
        return;
      }
      const pageEls = pagesContainerRef.current?.querySelectorAll(".a4-page");
      if (!pageEls || pageEls.length === 0) {
        setExporting(false);
        return;
      }
      for (let i = 0; i < pageEls.length; i++) {
        const canvas = await html2canvas(pageEls[i], {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          width: 794,
          windowWidth: 794,
          onclone: (_clonedDoc, clonedEl) => {
            clonedEl.querySelectorAll("*").forEach((el) => {
              el.style.opacity = "1";
              el.style.filter = "none";
              el.style.mixBlendMode = "normal";
              el.style.backdropFilter = "none";
              const tag = el.tagName.toLowerCase();
              if (["p", "li", "span", "b", "strong", "i", "em", "u", "s", "h1", "h2", "h3"].includes(tag)) {
                el.style.color = "#000";
                el.style.webkitTextFillColor = "#000";
              }
            });
          }
        });
        const base642 = canvas.toDataURL("image/jpeg", 0.95);
        const filename = `№${c.caseNumber} стр.${i + 1}.jpg`;
        await window.api.saveJpeg(folder, filename, base642);
      }
      alert(`✓ Экспортировано ${pageEls.length} стр. в:
${folder}`);
    } catch (e2) {
      alert("Ошибка: " + String(e2));
    }
    setExporting(false);
  }, [c.caseNumber]);
  reactExports.useEffect(() => {
    const handler = () => exportJpeg();
    document.addEventListener("do-export-jpeg", handler);
    return () => document.removeEventListener("do-export-jpeg", handler);
  }, [exportJpeg]);
  const activeLogoSrc = determinationLogo || orderLogo || null;
  const LogoEl = /* @__PURE__ */ jsxRuntimeExports.jsx(EagleLogo, { src: activeLogoSrc, size: heraldrySize || 130 });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-pane", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-toolbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "preview-label", children: "Preview A4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 11, color: "var(--text-3)" }, children: [
          pages.length,
          " стр."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-sm", onClick: exportJpeg, disabled: exporting, children: exporting ? "Экспорт..." : "⬇ JPEG (Ctrl+P)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-scroll", ref: pagesContainerRef, children: pages.map((pageHtml, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === pages.length - 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "a4-page", children: [
        isFirst && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 0 }, children: [
          LogoEl,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            height: 1,
            background: "#222",
            width: "90%",
            margin: "15px auto 20px"
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "a4-page-content", dangerouslySetInnerHTML: { __html: pageHtml } }),
        isLast && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "a4-page-stamp", style: {
          bottom: 40,
          left: 50,
          right: 50,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              fontSize: 12,
              color: "#000",
              fontFamily: "'Times New Roman', Georgia, serif",
              marginBottom: 5
            }, children: judgePosition }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              fontSize: 14,
              fontWeight: 700,
              color: "#000",
              marginBottom: 6
            }, children: judgeName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              fontFamily: "'Dancing Script', cursive",
              fontSize: 36,
              color: "#000",
              lineHeight: 1.1
            }, children: judgeName })
          ] }),
          settings.stampBase64 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: settings.stampBase64,
              alt: "Печать",
              style: {
                width: stampScale,
                height: stampScale,
                objectFit: "contain",
                flexShrink: 0,
                marginLeft: 24,
                marginBottom: stampOffsetY,
                marginRight: stampOffsetX
              }
            }
          )
        ] }),
        pages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-number", children: [
          idx + 1,
          " / ",
          pages.length
        ] })
      ] }, idx);
    }) })
  ] });
}
var reactDomExports = requireReactDom();
const GOV_ORGS = ["GOV", "FIB", "LSPD", "LSSD", "NG", "SASPA", "EMS", "USSS", "МЮ", "Прокуратура"];
function detectPhType(el) {
  const attr = el.getAttribute("data-ph-type");
  if (attr) return attr;
  const raw = (el.getAttribute("data-ph-key") || el.textContent || "").replace(/^\[|\]$/g, "").trim().toLowerCase();
  if (raw === "сумма") return "money";
  if (raw === "время") return "time";
  if (raw.includes("открытом") || raw.includes("закрытом")) return "session-type";
  if (raw.includes("обвинитель")) return "prosecutor";
  if (raw.includes("статья") || raw.includes("статьи")) return "article";
  if (raw === "дата" || raw.includes("день") || raw.includes("месяц") && raw.includes("год")) return "date";
  if (raw.includes("номер") && (raw.includes("иска") || raw.includes("дела"))) return "case-number";
  if (raw.includes("порядковый")) return "ordinal";
  if (raw.includes("гос") && raw.includes("структур") || raw === "структура") return "gov-org";
  if (raw.includes("имя") && raw.includes("фамилия")) return "person";
  return "text";
}
function SmartFieldPopup({
  anchorRect,
  phType,
  phKey,
  currentValue,
  case_,
  duplicateCount,
  onFill,
  onClose
}) {
  const todayDate = /* @__PURE__ */ new Date();
  const toIso = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };
  const toDisplay = (iso) => {
    if (!iso) return "";
    try {
      const [y, m, d] = iso.split("-");
      if (y && m && d) return `${d}.${m}.${y}`;
    } catch {
    }
    return iso;
  };
  const fromDisplay = (display2) => {
    if (!display2) return "";
    try {
      const [d, m, y] = display2.split(".");
      if (d && m && y) return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    } catch {
    }
    return display2;
  };
  const initValue = () => {
    if (!currentValue) {
      if (phType === "date") return toIso(todayDate);
      if (phType === "time") return todayDate.toTimeString().slice(0, 5);
      return "";
    }
    if (phType === "date" && currentValue.includes(".")) return fromDisplay(currentValue);
    return currentValue;
  };
  const [value, setValue] = reactExports.useState(initValue);
  const [articles, setArticles] = reactExports.useState(() => {
    if (phType !== "article" || !currentValue) return [];
    return currentValue.split(/,\s*/).filter(Boolean);
  });
  const [articleInput, setArticleInput] = reactExports.useState("");
  const popupRef = reactExports.useRef(null);
  const POPUP_W = 300;
  const POPUP_EST_H = {
    "gov-org": 270,
    "date": 180,
    "time": 160,
    "session-type": 100,
    "money": 220,
    "article": 240,
    "person": 220,
    "case-number": 120,
    "ordinal": 120,
    "prosecutor": 200,
    "text": 200
  };
  const estimatedH = POPUP_EST_H[phType] || 200;
  const spaceBelow = window.innerHeight - anchorRect.bottom - 10;
  const top = spaceBelow >= estimatedH ? anchorRect.bottom + 6 : Math.max(10, anchorRect.top - estimatedH - 6);
  const left = Math.max(10, Math.min(anchorRect.left, window.innerWidth - POPUP_W - 10));
  reactExports.useEffect(() => {
    const handle = (e2) => {
      if (popupRef.current && !popupRef.current.contains(e2.target)) {
        onClose();
      }
    };
    const timer = setTimeout(() => document.addEventListener("mousedown", handle), 60);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handle);
    };
  }, [onClose]);
  reactExports.useEffect(() => {
    const handle = (e2) => {
      if (e2.key === "Escape") {
        e2.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", handle, true);
    return () => document.removeEventListener("keydown", handle, true);
  }, [onClose]);
  const submit = (v, fillAll = false) => {
    const trimmed = v.trim();
    if (!trimmed) return;
    onFill(trimmed, fillAll);
  };
  const SectionLabel = ({ label }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 8 }, children: label });
  const FillButtons = ({ v }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 12 }, children: [
    duplicateCount > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "btn btn-ghost btn-sm",
        style: { flex: 1, fontSize: 11 },
        onClick: () => submit(v, true),
        children: [
          "Все ",
          duplicateCount,
          " ▸"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "btn btn-primary btn-sm",
        style: { flex: duplicateCount > 1 ? 1 : void 0, minWidth: 90 },
        onClick: () => submit(v),
        children: "Заполнить"
      }
    )
  ] });
  const renderGovOrg = () => {
    const isCustom = !!value && !GOV_ORGS.includes(value);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { label: "Гос. структура" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 8 }, children: GOV_ORGS.map((org) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `btn btn-sm ${value === org ? "btn-primary" : "btn-secondary"}`,
          onClick: () => setValue(org),
          children: org
        },
        org
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          style: { fontSize: 12 },
          placeholder: "Другая структура...",
          value: isCustom ? value : "",
          onChange: (e2) => setValue(e2.target.value),
          onKeyDown: (e2) => {
            if (e2.key === "Enter" && value) submit(value);
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FillButtons, { v: value })
    ] });
  };
  const renderDate = () => {
    const yesterday = new Date(todayDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(todayDate);
    weekAgo.setDate(weekAgo.getDate() - 7);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { label: "Дата" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 5, marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", style: { flex: 1, fontSize: 11 }, onClick: () => setValue(toIso(todayDate)), children: "Сегодня" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", style: { flex: 1, fontSize: 11 }, onClick: () => setValue(toIso(yesterday)), children: "Вчера" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", style: { flex: 1, fontSize: 11 }, onClick: () => setValue(toIso(weekAgo)), children: "7 дней назад" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          type: "date",
          value,
          onChange: (e2) => setValue(e2.target.value),
          style: { fontSize: 13 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FillButtons, { v: toDisplay(value) })
    ] });
  };
  const renderTime = () => {
    const fmtTime = (d) => d.toTimeString().slice(0, 5);
    const plus = (h) => {
      const d = new Date(todayDate);
      d.setHours(d.getHours() + h);
      return fmtTime(d);
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { label: "Время" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 5, marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", style: { flex: 1, fontSize: 11 }, onClick: () => setValue(fmtTime(todayDate)), children: "Сейчас" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", style: { flex: 1, fontSize: 11 }, onClick: () => setValue(plus(1)), children: "+1ч" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", style: { flex: 1, fontSize: 11 }, onClick: () => setValue(plus(2)), children: "+2ч" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          type: "time",
          step: 300,
          value: value || fmtTime(todayDate),
          onChange: (e2) => setValue(e2.target.value),
          style: { fontSize: 13 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FillButtons, { v: value || fmtTime(todayDate) })
    ] });
  };
  const renderSessionType = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { label: "Тип заседания" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `btn btn-sm ${value === "открытом" ? "btn-primary" : "btn-secondary"}`,
          style: { flex: 1 },
          onClick: () => submit("открытом", false),
          children: "🔓 Открытом"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `btn btn-sm ${value === "закрытом" ? "btn-primary" : "btn-secondary"}`,
          style: { flex: 1 },
          onClick: () => submit("закрытом", false),
          children: "🔒 Закрытом"
        }
      )
    ] }),
    duplicateCount > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 6 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost btn-sm", style: { flex: 1, fontSize: 11 }, onClick: () => submit("открытом", true), children: [
        "Открытом — везде (",
        duplicateCount,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", style: { flex: 1, fontSize: 11 }, onClick: () => submit("закрытом", true), children: "Закрытом — везде" })
    ] })
  ] });
  const renderMoney = () => {
    const num = parseFloat(value) || 0;
    const PRESETS = [5e3, 15e3, 25e3, 5e4, 1e5];
    const formatMoney = (n) => n > 0 ? n.toLocaleString("de-DE").replace(/,/g, ".") + "$" : "";
    const formatted = formatMoney(num);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { label: "Сумма" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }, children: PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `btn btn-ghost btn-sm ${num === p ? "active" : ""}`,
          style: { fontSize: 11 },
          onClick: () => setValue(String(p)),
          children: formatMoney(p)
        },
        p
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          type: "number",
          min: 0,
          step: 500,
          placeholder: "0",
          value,
          onChange: (e2) => setValue(e2.target.value),
          onKeyDown: (e2) => {
            if (e2.key === "Enter" && formatted) submit(formatted);
          },
          style: { fontSize: 13 }
        }
      ),
      num > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--text-accent)", marginTop: 4, fontWeight: 600 }, children: [
        "= ",
        formatted
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FillButtons, { v: formatted || value })
    ] });
  };
  const renderArticle = () => {
    const addArticle = () => {
      const v = articleInput.trim();
      if (!v || articles.includes(v)) return;
      setArticles((prev) => [...prev, v]);
      setArticleInput("");
    };
    const articlesStr = articles.join(", ");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { label: "Статья(и)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8, minHeight: 28 }, children: [
        articles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-3)", fontSize: 11 }, children: "Добавьте статьи..." }),
        articles.map((a2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "var(--accent-dim)",
              color: "var(--text-accent)",
              padding: "2px 8px",
              borderRadius: "var(--r-f)",
              fontSize: 11,
              fontWeight: 600
            },
            children: [
              a2,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: { cursor: "pointer", opacity: 0.7, lineHeight: 1 },
                  onClick: () => setArticles((prev) => prev.filter((x) => x !== a2)),
                  children: "×"
                }
              )
            ]
          },
          a2
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            autoFocus: true,
            className: "input",
            style: { flex: 1, fontSize: 12 },
            placeholder: "Ст. 132 УК СА...",
            value: articleInput,
            onChange: (e2) => setArticleInput(e2.target.value),
            onKeyDown: (e2) => {
              if (e2.key === "Enter") {
                e2.preventDefault();
                addArticle();
              }
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary btn-sm", onClick: addArticle, style: { flexShrink: 0 }, children: "+" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FillButtons, { v: articlesStr || value })
    ] });
  };
  const renderPerson = (label, roles) => {
    const people = case_.participants.filter((p) => roles.includes(p.role)).map((p) => `${p.firstName} ${p.lastName}`.trim()).filter(Boolean);
    const isCustom = !!value && !people.includes(value);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { label }),
      people.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }, children: people.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `btn btn-sm ${value === name ? "btn-primary" : "btn-secondary"}`,
          style: { justifyContent: "flex-start", textAlign: "left" },
          onClick: () => setValue(name),
          children: name
        },
        name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          style: { fontSize: 12 },
          placeholder: "Имя Фамилия...",
          value: isCustom || people.length === 0 ? value : "",
          onChange: (e2) => setValue(e2.target.value),
          onKeyDown: (e2) => {
            if (e2.key === "Enter" && value) submit(value);
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FillButtons, { v: value })
    ] });
  };
  const renderCaseNumber = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { label: "Номер дела" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      fontSize: 18,
      fontWeight: 700,
      color: "var(--text-accent)",
      textAlign: "center",
      padding: "12px 0"
    }, children: [
      "№",
      case_.caseNumber
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-sm", style: { width: "100%" }, onClick: () => submit(case_.caseNumber), children: "Вставить автоматически" })
  ] });
  const renderOrdinal = () => {
    const defCount = case_.participants.filter((p) => p.role === "defendant").length || 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { label: "Порядковый номер" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, color: "var(--text-2)", marginBottom: 8 }, children: [
        "Ответчиков в деле: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: defCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          type: "number",
          min: 1,
          max: 99,
          value: value || "1",
          onChange: (e2) => setValue(e2.target.value),
          style: { fontSize: 13, textAlign: "center" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FillButtons, { v: value || "1" })
    ] });
  };
  const renderText = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { label: phKey.length > 30 ? phKey.slice(0, 30) + "…" : phKey }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        autoFocus: true,
        className: "textarea",
        style: { fontSize: 12, minHeight: 72, resize: "vertical", width: "100%" },
        placeholder: "Введите значение...",
        value,
        onChange: (e2) => setValue(e2.target.value),
        onKeyDown: (e2) => {
          if (e2.key === "Enter" && (e2.ctrlKey || e2.metaKey)) submit(value);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, color: "var(--text-3)", marginTop: 3 }, children: "Ctrl+Enter для заполнения" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FillButtons, { v: value })
  ] });
  const renderContent = () => {
    switch (phType) {
      case "gov-org":
        return renderGovOrg();
      case "date":
        return renderDate();
      case "time":
        return renderTime();
      case "session-type":
        return renderSessionType();
      case "money":
        return renderMoney();
      case "article":
        return renderArticle();
      case "person":
        return renderPerson("Имя Фамилия", ["plaintiff", "defendant", "judge", "witness"]);
      case "case-number":
        return renderCaseNumber();
      case "ordinal":
        return renderOrdinal();
      case "prosecutor":
        return renderPerson("Гос. обвинитель", ["prosecutor", "plaintiff"]);
      default:
        return renderText();
    }
  };
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: popupRef,
        className: "smart-field-popup",
        style: { position: "fixed", top, left, width: POPUP_W, zIndex: 1e4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            paddingBottom: 8,
            borderBottom: "1px solid var(--border-1)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, fontWeight: 600, color: "var(--text-1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }, children: [
              "✏️ ",
              phKey.length > 28 ? phKey.slice(0, 28) + "…" : phKey
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn btn-icon btn-ghost",
                onClick: onClose,
                style: { fontSize: 12, width: 22, height: 22, flexShrink: 0, marginLeft: 6 },
                children: "✕"
              }
            )
          ] }),
          renderContent()
        ]
      }
    ),
    document.body
  );
}
const SLASH_COMMANDS = [
  { key: "установил", label: "§ УСТАНОВИЛ", html: '<div class="doc-section">УСТАНОВИЛ:</div><p><br></p>' },
  { key: "определил", label: "§ ОПРЕДЕЛИЛ", html: '<div class="doc-section">ОПРЕДЕЛИЛ:</div><p><br></p>' },
  { key: "решил", label: "§ РЕШИЛ", html: '<div class="doc-section">РЕШИЛ:</div><p><br></p>' },
  { key: "постановил", label: "§ ПОСТАНОВИЛ", html: '<div class="doc-section">ПОСТАНОВИЛ:</div><p><br></p>' },
  { key: "приговорил", label: "§ ПРИГОВОРИЛ", html: '<div class="doc-section">ПРИГОВОРИЛ:</div><p><br></p>' },
  {
    key: "принять",
    label: "✅ Принять иск",
    html: '<div class="doc-section">ОПРЕДЕЛИЛ:</div><p>Принять исковое заявление к производству.</p><p>Обязать прокуратуру в течение 48 часов провести проверку по обстоятельствам дела.</p><p><br></p>'
  },
  {
    key: "оставить",
    label: "⏸ Оставить без движения",
    html: '<div class="doc-section">ОПРЕДЕЛИЛ:</div><p>Оставить исковое заявление без движения до <strong>[УСЛОВИЕ]</strong>.</p><p>Предложить заявителю в течение <strong>[СРОК]</strong> устранить нарушения: <strong>[ТРЕБУЕМЫЕ ДЕЙСТВИЯ]</strong>.</p><p><br></p>'
  },
  {
    key: "возврат",
    label: "↩ Возвратить иск",
    html: '<div class="doc-section">ОПРЕДЕЛИЛ:</div><p>Возвратить исковое заявление заявителю.</p><p>Разъяснить, что после устранения нарушений заявитель вправе обратиться в суд повторно.</p><p><br></p>'
  },
  {
    key: "отказать",
    label: "🚫 Отказать в принятии",
    html: '<div class="doc-section">ОПРЕДЕЛИЛ:</div><p>Отказать в принятии искового заявления.</p><p>Настоящее определение вступает в силу со дня принятия и не подлежит обжалованию.</p><p><br></p>'
  },
  {
    key: "назначить",
    label: "📅 Назначить заседание",
    html: '<div class="doc-section">ОПРЕДЕЛИЛ:</div><p>Назначить судебное заседание на <strong>[ДАТА ЗАСЕДАНИЯ]</strong> в <strong>[ВРЕМЯ]</strong> в зале суда Капитолия.</p><p>Признать явку сторон обязательной.</p><p><br></p>'
  },
  {
    key: "решение",
    label: "⚖ Вставить решение",
    html: '<div class="doc-section">РЕШИЛ:</div><ol><li><strong>[ПУНКТ 1]</strong></li><li><strong>[ПУНКТ 2]</strong></li><li><strong>[ПУНКТ 3]</strong></li></ol><p>Решение вступает в законную силу с момента публикации.</p><p><br></p>'
  }
];
function DocumentEditor({ case_: c, document: doc, onSave, onSaveWithVersions: _onSaveWithVersions, onSaveComments: _onSaveComments, onBack }) {
  const { settings } = useApp();
  const onSaveWithVersions = _onSaveWithVersions || (async (html, _v) => onSave(html));
  const onSaveComments = _onSaveComments || (async (_c) => {
  });
  const editorRef = reactExports.useRef(null);
  const [content2, setContent] = reactExports.useState(doc.content);
  const [saved, setSaved] = reactExports.useState(false);
  const [bbcopyDone, setBbcopyDone] = reactExports.useState(false);
  const [bookmarks, setBookmarks] = reactExports.useState([]);
  const [showVersions, setShowVersions] = reactExports.useState(false);
  const [restoreConfirm, setRestoreConfirm] = reactExports.useState(null);
  const [comments, setComments] = reactExports.useState(doc.comments || []);
  const [showComments, setShowComments] = reactExports.useState(false);
  const [newCommentText, setNewCommentText] = reactExports.useState("");
  const [pendingCommentQuote, setPendingCommentQuote] = reactExports.useState("");
  const [addingComment, setAddingComment] = reactExports.useState(false);
  const [activeCommentId, setActiveCommentId] = reactExports.useState(null);
  const [slashMenu, setSlashMenu] = reactExports.useState(null);
  const [slashIdx, setSlashIdx] = reactExports.useState(0);
  const slashStartRef = reactExports.useRef(null);
  const [activeField, setActiveField] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = doc.content;
      parseBookmarks();
    }
  }, [doc.id]);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      const html = editorRef.current?.innerHTML || "";
      if (html && html !== doc.content) onSave(html);
    }, 3e4);
    return () => clearInterval(interval);
  }, [doc.content, onSave]);
  reactExports.useEffect(() => {
    const handler = () => {
      const html = editorRef.current?.innerHTML || "";
      if (html) onSave(html);
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [onSave]);
  const handleSaveRef = reactExports.useRef(() => {
  });
  reactExports.useEffect(() => {
    const handler = () => handleSaveRef.current();
    document.addEventListener("save-doc", handler);
    return () => document.removeEventListener("save-doc", handler);
  }, []);
  reactExports.useEffect(() => {
    const handler = () => document.dispatchEvent(new CustomEvent("do-export-jpeg"));
    document.addEventListener("export-jpeg", handler);
    return () => document.removeEventListener("export-jpeg", handler);
  }, []);
  const parseBookmarks = reactExports.useCallback(() => {
    if (!editorRef.current) return;
    const sections = editorRef.current.querySelectorAll(".doc-section");
    const bm = [];
    sections.forEach((el, i) => {
      const label = el.textContent?.trim() || "";
      if (label) {
        el.setAttribute("data-bookmark-id", `bm-${i}`);
        bm.push({ id: `bm-${i}`, label });
      }
    });
    setBookmarks(bm);
  }, []);
  const handleChange = reactExports.useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
      parseBookmarks();
    }
  }, [parseBookmarks]);
  const handleEditorClick = reactExports.useCallback((e2) => {
    const target = e2.target;
    const placeholder = target.closest("mark.doc-placeholder, span.smart-field-filled");
    if (!placeholder) return;
    const anchorRect = placeholder.getBoundingClientRect();
    const phType = detectPhType(placeholder);
    const phKey = placeholder.getAttribute("data-ph-key") || placeholder.textContent?.replace(/^\[|\]$/g, "").trim() || "";
    const isFilled = placeholder.tagName === "SPAN" && placeholder.classList.contains("smart-field-filled");
    const currentValue = isFilled ? placeholder.textContent || "" : void 0;
    setActiveField({ element: placeholder, anchorRect, phType, phKey, currentValue });
  }, []);
  const duplicateCount = reactExports.useMemo(() => {
    if (!activeField || !editorRef.current) return 1;
    const { phKey } = activeField;
    return Array.from(editorRef.current.querySelectorAll("mark.doc-placeholder")).filter((m) => m.getAttribute("data-ph-key") === phKey).length;
  }, [activeField]);
  const handleFieldFill = reactExports.useCallback((value, fillAll) => {
    if (!activeField || !editorRef.current) return;
    const { element, phType, phKey } = activeField;
    const createFilled = (v) => {
      const span = document.createElement("span");
      span.className = "smart-field-filled";
      span.setAttribute("data-ph-type", phType);
      span.setAttribute("data-ph-key", phKey);
      span.textContent = v;
      return span;
    };
    element.replaceWith(createFilled(value));
    if (fillAll) {
      const allMarks = Array.from(editorRef.current.querySelectorAll("mark.doc-placeholder")).filter((m) => m.getAttribute("data-ph-key") === phKey);
      allMarks.forEach((m) => m.replaceWith(createFilled(value)));
    }
    handleChange();
    setActiveField(null);
    editorRef.current.focus();
  }, [activeField, handleChange]);
  const startAddComment = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      alert("Выделите текст для добавления комментария");
      return;
    }
    const quote = sel.toString().slice(0, 120);
    setPendingCommentQuote(quote);
    setNewCommentText("");
    setAddingComment(true);
    setShowComments(true);
  };
  const confirmAddComment = async () => {
    if (!newCommentText.trim()) return;
    const cid = v4();
    const newComment = {
      id: cid,
      text: newCommentText.trim(),
      quote: pendingCommentQuote,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      resolved: false
    };
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && editorRef.current) {
      const range = sel.getRangeAt(0);
      const mark = document.createElement("mark");
      mark.className = "comment-mark";
      mark.setAttribute("data-cid", cid);
      mark.onclick = () => {
        setActiveCommentId(cid);
        setShowComments(true);
      };
      range.surroundContents(mark);
      sel.removeAllRanges();
      handleChange();
    }
    const updated = [...comments, newComment];
    setComments(updated);
    await onSaveComments(updated);
    setAddingComment(false);
    setPendingCommentQuote("");
    setNewCommentText("");
    setActiveCommentId(cid);
  };
  const resolveComment = async (cid) => {
    const updated = comments.map((c2) => c2.id === cid ? { ...c2, resolved: true } : c2);
    setComments(updated);
    await onSaveComments(updated);
    if (editorRef.current) {
      const mark = editorRef.current.querySelector('[data-cid="' + cid + '"]');
      if (mark) {
        const parent = mark.parentNode;
        while (mark.firstChild) parent?.insertBefore(mark.firstChild, mark);
        parent?.removeChild(mark);
      }
      handleChange();
    }
  };
  const deleteComment = async (cid) => {
    const updated = comments.filter((c2) => c2.id !== cid);
    setComments(updated);
    await onSaveComments(updated);
    if (editorRef.current) {
      const mark = editorRef.current.querySelector('[data-cid="' + cid + '"]');
      if (mark) {
        const parent = mark.parentNode;
        while (mark.firstChild) parent?.insertBefore(mark.firstChild, mark);
        parent?.removeChild(mark);
      }
      handleChange();
    }
  };
  const scrollToComment = (cid) => {
    setActiveCommentId(cid);
    const mark = editorRef.current?.querySelector('[data-cid="' + cid + '"]');
    mark?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const handleSave = async () => {
    const html = editorRef.current?.innerHTML || "";
    const existingVersions = doc.versions || [];
    const nextVersion = (existingVersions.length > 0 ? Math.max(...existingVersions.map((v) => v.version)) : 0) + 1;
    const newVersion = {
      version: nextVersion,
      content: doc.content,
      savedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const updatedVersions = [...existingVersions, newVersion].slice(-20);
    await onSaveWithVersions(html, updatedVersions);
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  handleSaveRef.current = handleSave;
  const exec = (cmd, val) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    handleChange();
  };
  const align = (dir) => exec(`justify${dir}`);
  const insertSection = (name) => {
    exec("insertHTML", `<div class="doc-section">${name}:</div><p><br></p>`);
  };
  const insertPageBreak = () => {
    exec("insertHTML", '<hr class="page-break"><p><br></p>');
  };
  const jumpToNextPlaceholder = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const marks = Array.from(editor.querySelectorAll("mark.doc-placeholder"));
    if (marks.length === 0) return;
    const sel = window.getSelection();
    let currentIdx = -1;
    if (sel && sel.rangeCount > 0) {
      const range2 = sel.getRangeAt(0);
      for (let i = 0; i < marks.length; i++) {
        if (marks[i].compareDocumentPosition(range2.startContainer) & Node.DOCUMENT_POSITION_FOLLOWING || marks[i] === range2.startContainer || marks[i].contains(range2.startContainer)) {
          currentIdx = i;
          break;
        }
      }
    }
    const nextIdx = (currentIdx + 1) % marks.length;
    const target = marks[nextIdx];
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    const range = document.createRange();
    range.selectNodeContents(target);
    sel?.removeAllRanges();
    sel?.addRange(range);
    editor.focus();
  };
  const copyBBCode = () => {
    const html = editorRef.current?.innerHTML || "";
    navigator.clipboard.writeText(htmlToBBCode(html));
    setBbcopyDone(true);
    setTimeout(() => setBbcopyDone(false), 2e3);
  };
  const scrollToBookmark = (id) => {
    const el = editorRef.current?.querySelector(`[data-bookmark-id="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const getSlashFilter = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    const node = range.startContainer;
    if (node.nodeType !== Node.TEXT_NODE) return null;
    const text = node.textContent || "";
    const offset = range.startOffset;
    const before = text.slice(0, offset);
    const slashIdx2 = before.lastIndexOf("/");
    if (slashIdx2 === -1) return null;
    const afterSlash = before.slice(slashIdx2 + 1);
    if (afterSlash.includes(" ")) return null;
    slashStartRef.current = { node, offset: slashIdx2 };
    return afterSlash.toLowerCase();
  };
  const applySlashCmd = (cmd) => {
    if (!slashStartRef.current) return;
    const { node, offset } = slashStartRef.current;
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.setStart(node, offset);
    const curRange = sel.getRangeAt(0);
    range.setEnd(curRange.startContainer, curRange.startOffset);
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("delete", false);
    document.execCommand("insertHTML", false, cmd.html);
    setSlashMenu(null);
    slashStartRef.current = null;
    handleChange();
  };
  const filteredCmds = slashMenu ? SLASH_COMMANDS.filter((c2) => c2.key.startsWith(slashMenu.filter)) : [];
  const handleKeyDown = (e2) => {
    if (slashMenu) {
      if (e2.key === "ArrowDown") {
        e2.preventDefault();
        setSlashIdx((i) => Math.min(i + 1, filteredCmds.length - 1));
        return;
      }
      if (e2.key === "ArrowUp") {
        e2.preventDefault();
        setSlashIdx((i) => Math.max(i - 1, 0));
        return;
      }
      if (e2.key === "Enter" || e2.key === "Tab") {
        e2.preventDefault();
        if (filteredCmds[slashIdx]) applySlashCmd(filteredCmds[slashIdx]);
        return;
      }
      if (e2.key === "Escape") {
        setSlashMenu(null);
        return;
      }
    }
    if (e2.ctrlKey) {
      if (e2.key === "b") {
        e2.preventDefault();
        exec("bold");
      }
      if (e2.key === "i") {
        e2.preventDefault();
        exec("italic");
      }
      if (e2.key === "u") {
        e2.preventDefault();
        exec("underline");
      }
      if (e2.key === "z") {
        e2.preventDefault();
        exec("undo");
      }
      if (e2.key === "y") {
        e2.preventDefault();
        exec("redo");
      }
      if (e2.key === "s" && !e2.shiftKey) {
        e2.preventDefault();
        handleSave();
      }
      if (e2.key === "p") {
        e2.preventDefault();
        document.dispatchEvent(new CustomEvent("do-export-jpeg"));
      }
      if (e2.key === "C" && e2.shiftKey) {
        e2.preventDefault();
        copyBBCode();
      }
    }
  };
  const handleInput = reactExports.useCallback(() => {
    handleChange();
    const filter = getSlashFilter();
    if (filter !== null) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        setSlashMenu({ x: rect.left, y: rect.bottom + 4, filter });
        setSlashIdx(0);
      }
    } else {
      setSlashMenu(null);
    }
  }, [handleChange]);
  const ToolBtn = ({ title, onClick, active, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: `toolbar-btn ${active ? "active" : ""}`,
      title,
      onMouseDown: (e2) => {
        e2.preventDefault();
        onClick();
      },
      children
    }
  );
  const Sep = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-divider" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-layout", children: [
    bookmarks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bookmarks-sidebar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bookmarks-title", children: "Разделы" }),
      bookmarks.map((bm) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "bookmark-item",
          onClick: () => scrollToBookmark(bm.id),
          children: bm.label.replace(":", "")
        },
        bm.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-pane", style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toolbar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Жирный (Ctrl+B)", onClick: () => exec("bold"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "B" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Курсив (Ctrl+I)", onClick: () => exec("italic"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { children: "I" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Подчёркнутый (Ctrl+U)", onClick: () => exec("underline"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("u", { children: "U" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Зачёркнутый", onClick: () => exec("strikeThrough"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("s", { children: "S" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "По левому краю", onClick: () => align("Left"), children: "≡" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "По центру", onClick: () => align("Center"), children: "≡̈" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "По правому краю", onClick: () => align("Right"), children: "≡̄" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Список", onClick: () => exec("insertUnorderedList"), children: "•≡" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Нумерованный список", onClick: () => exec("insertOrderedList"), children: "1≡" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Увеличить отступ", onClick: () => exec("indent"), children: "→" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Уменьшить отступ", onClick: () => exec("outdent"), children: "←" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Цитата", onClick: () => exec("formatBlock", "blockquote"), children: "❝" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "toolbar-select",
            defaultValue: "",
            onChange: (e2) => {
              exec("formatBlock", e2.target.value);
              e2.target.value = "";
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Заголовок" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "h1", children: "H1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "h2", children: "H2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "h3", children: "H3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "p", children: "Абзац" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Разрыв страницы", onClick: insertPageBreak, children: "⊟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { title: "Следующий плейсхолдер (Tab по [ПОЛЯМ])", onClick: jumpToNextPlaceholder, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, fontFamily: "monospace", color: "#818cf8" }, children: "[▶]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sep, {}),
        ["УСТАНОВИЛ", "ПОСТАНОВИЛ", "ОПРЕДЕЛИЛ", "РЕШИЛ"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "section-btn", onMouseDown: (e2) => {
          e2.preventDefault();
          insertSection(s);
        }, children: s }, s)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, paddingRight: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: showComments ? "toolbar-btn active" : "toolbar-btn",
              title: "Комментарии",
              onMouseDown: (e2) => {
                e2.preventDefault();
                setShowComments((v) => !v);
              },
              style: { position: "relative" },
              children: [
                "💬",
                comments.filter((c2) => !c2.resolved).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { position: "absolute", top: -4, right: -4, background: "var(--accent)", color: "#fff", fontSize: 9, borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }, children: comments.filter((c2) => !c2.resolved).length })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "toolbar-btn",
              title: "Добавить комментарий к выделенному тексту",
              onMouseDown: (e2) => {
                e2.preventDefault();
                startAddComment();
              },
              children: "💬+"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, color: "var(--text-3)" }, children: "Tip: / для команд" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: editorRef,
          className: "editor-area",
          contentEditable: true,
          suppressContentEditableWarning: true,
          onInput: handleInput,
          onKeyDown: handleKeyDown,
          onClick: handleEditorClick,
          spellCheck: false
        }
      ),
      slashMenu && filteredCmds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "slash-menu",
          style: { position: "fixed", top: slashMenu.y, left: slashMenu.x, zIndex: 600 },
          children: filteredCmds.map((cmd, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `slash-item ${i === slashIdx ? "active" : ""}`,
              onMouseDown: (e2) => {
                e2.preventDefault();
                applySlashCmd(cmd);
              },
              children: cmd.label
            },
            cmd.key
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderTop: "1px solid var(--border-1)",
        background: "var(--bg-elevated)",
        flexShrink: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: onBack, children: "← Назад" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, fontSize: 11, color: "var(--text-3)", textAlign: "center" }, children: [
          doc.title,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: 8, color: "var(--text-3)", opacity: 0.6 }, children: "· автосохранение каждые 30 сек" })
        ] }),
        (doc.versions?.length || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "btn btn-ghost btn-sm",
            onClick: () => setShowVersions((v) => !v),
            title: "История версий",
            children: [
              "🕐 ",
              doc.versions.length,
              " версий"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary btn-sm", onClick: copyBBCode, children: bbcopyDone ? "✓ Скопировано!" : "[ ] BBCode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-sm", onClick: handleSave, children: saved ? "✓ Сохранено" : "💾 Сохранить" })
      ] }),
      showVersions && doc.versions && doc.versions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        position: "absolute",
        bottom: 54,
        right: 16,
        zIndex: 500,
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-2)",
        borderRadius: "var(--r-lg)",
        padding: "12px 0",
        minWidth: 260,
        maxHeight: 300,
        overflow: "auto",
        boxShadow: "var(--sh-lg)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 14px 8px" }, children: "История версий" }),
        [...doc.versions].reverse().map((ver) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "6px 14px", display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, color: "var(--text-1)", fontWeight: 500 }, children: [
              "v",
              ver.version
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, color: "var(--text-3)" }, children: new Date(ver.savedAt).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn btn-ghost btn-sm",
              style: { fontSize: 11 },
              onClick: () => setRestoreConfirm(ver),
              children: "Восстановить"
            }
          )
        ] }, ver.version))
      ] }),
      activeField && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SmartFieldPopup,
        {
          anchorRect: activeField.anchorRect,
          phType: activeField.phType,
          phKey: activeField.phKey,
          currentValue: activeField.currentValue,
          case_: c,
          duplicateCount,
          onFill: handleFieldFill,
          onClose: () => setActiveField(null)
        }
      ),
      restoreConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "fixed",
        inset: 0,
        zIndex: 1e3,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "var(--bg-elevated)", border: "1px solid var(--border-2)", borderRadius: "var(--r-xl)", padding: 24, maxWidth: 360 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 8 }, children: [
          "Восстановить версию v",
          restoreConfirm.version,
          "?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "var(--text-3)", marginBottom: 20 }, children: "Текущее содержимое будет заменено. Вы можете сохранить его как новую версию сначала." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setRestoreConfirm(null), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-sm", onClick: () => {
            if (editorRef.current) editorRef.current.innerHTML = restoreConfirm.content;
            handleChange();
            setRestoreConfirm(null);
            setShowVersions(false);
          }, children: "Восстановить" })
        ] })
      ] }) })
    ] }),
    showComments && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      width: 260,
      flexShrink: 0,
      background: "var(--bg-surface)",
      borderLeft: "1px solid var(--border-1)",
      borderRight: "1px solid var(--border-1)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "10px 14px",
        borderBottom: "1px solid var(--border-1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, fontWeight: 600, color: "var(--text-1)" }, children: [
          "💬 Комментарии",
          comments.filter((c2) => !c2.resolved).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: 6, fontSize: 10, background: "var(--accent)", color: "#fff", padding: "1px 6px", borderRadius: "var(--r-f)" }, children: comments.filter((c2) => !c2.resolved).length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-icon", onClick: () => setShowComments(false), style: { fontSize: 12 }, children: "✕" })
      ] }),
      addingComment && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 14px", borderBottom: "1px solid var(--border-1)", background: "var(--bg-elevated)", flexShrink: 0 }, children: [
        pendingCommentQuote && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--text-3)", background: "var(--bg-overlay)", borderLeft: "3px solid var(--accent)", padding: "4px 8px", marginBottom: 8, borderRadius: "0 4px 4px 0", fontStyle: "italic" }, children: [
          "«",
          pendingCommentQuote,
          "»"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            autoFocus: true,
            className: "textarea",
            style: { fontSize: 12, minHeight: 64, resize: "vertical" },
            placeholder: "Добавить комментарий...",
            value: newCommentText,
            onChange: (e2) => setNewCommentText(e2.target.value),
            onKeyDown: (e2) => {
              if (e2.key === "Enter" && (e2.ctrlKey || e2.metaKey)) confirmAddComment();
              if (e2.key === "Escape") setAddingComment(false);
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 6, justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setAddingComment(false), children: "Отмена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary btn-sm", onClick: confirmAddComment, children: "Добавить" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflow: "auto", padding: "8px 0" }, children: comments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "24px 14px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 20, marginBottom: 6 }, children: "💬" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "var(--text-3)" }, children: "Нет комментариев" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-3)", marginTop: 4 }, children: "Выделите текст и нажмите 💬+" })
      ] }) : comments.map((cm) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "10px 14px",
            marginBottom: 2,
            borderLeft: `3px solid ${activeCommentId === cm.id ? "var(--accent)" : cm.resolved ? "var(--border-1)" : "var(--yellow)"}`,
            opacity: cm.resolved ? 0.5 : 1,
            cursor: "pointer",
            background: activeCommentId === cm.id ? "var(--accent-dim)" : "transparent",
            transition: "all 0.15s"
          },
          onClick: () => scrollToComment(cm.id),
          children: [
            cm.quote && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 10, color: "var(--text-3)", fontStyle: "italic", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
              "«",
              cm.quote,
              "»"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "var(--text-1)", lineHeight: 1.5 }, children: cm.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 10, color: "var(--text-3)", marginTop: 4 }, children: [
              new Date(cm.createdAt).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }),
              cm.resolved && " · решено"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4, marginTop: 6 }, children: [
              !cm.resolved && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "btn btn-ghost btn-sm",
                  style: { fontSize: 10 },
                  onClick: (e2) => {
                    e2.stopPropagation();
                    resolveComment(cm.id);
                  },
                  children: "✓ Решено"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "btn btn-ghost btn-sm",
                  style: { fontSize: 10, color: "var(--red)" },
                  onClick: (e2) => {
                    e2.stopPropagation();
                    deleteComment(cm.id);
                  },
                  children: "🗑️"
                }
              )
            ] })
          ]
        },
        cm.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DocumentPreview,
      {
        content: content2,
        case_: c,
        settings,
        docTitle: doc.title,
        docType: doc.type
      }
    )
  ] });
}
function App() {
  const { view, setView, updateCase, cases } = useApp();
  reactExports.useEffect(() => {
    const onKey = (e2) => {
      const tag = e2.target.tagName;
      const isEditing = tag === "INPUT" || tag === "TEXTAREA" || e2.target.contentEditable === "true";
      if (e2.ctrlKey && e2.key === "n" && !isEditing) {
        e2.preventDefault();
        setView({ type: "active-cases" });
        document.dispatchEvent(new CustomEvent("new-case"));
      }
      if (e2.ctrlKey && e2.key === "s" && !isEditing) {
        e2.preventDefault();
        document.dispatchEvent(new CustomEvent("save-doc"));
      }
      if (e2.ctrlKey && e2.key === "p" && !isEditing) {
        e2.preventDefault();
        document.dispatchEvent(new CustomEvent("export-jpeg"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setView]);
  const renderMain = () => {
    switch (view.type) {
      case "active-cases":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveCases, {});
      case "closed-cases":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ClosedCases, {});
      case "templates":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Templates, {});
      case "additional-templates":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdditionalTemplates, {});
      case "settings":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {});
      case "case-workspace":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CaseWorkspace, { caseId: view.caseId, initialTab: view.tab });
      case "template-editor":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateEditor, { docType: view.docType, from: view.from, onBack: () => setView({ type: view.from ?? "templates" }) });
      case "document-editor": {
        const c = cases.find((x) => x.id === view.caseId);
        const doc = c?.documents.find((d) => d.id === view.documentId);
        if (!c || !doc) return /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveCases, {});
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          DocumentEditor,
          {
            case_: c,
            document: doc,
            onSave: async (html) => {
              const updated = c.documents.map(
                (d) => d.id === doc.id ? { ...d, content: html, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : d
              );
              await updateCase(c.id, { documents: updated });
            },
            onSaveWithVersions: async (html, versions) => {
              const updated = c.documents.map(
                (d) => d.id === doc.id ? { ...d, content: html, versions, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : d
              );
              await updateCase(c.id, { documents: updated });
            },
            onSaveComments: async (comments) => {
              const updated = c.documents.map(
                (d) => d.id === doc.id ? { ...d, comments } : d
              );
              await updateCase(c.id, { documents: updated });
            },
            onBack: () => setView({ type: "case-workspace", caseId: view.caseId, tab: "documents" })
          }
        );
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: renderMain() });
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(AppProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
