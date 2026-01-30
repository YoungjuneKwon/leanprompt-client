var jr = Object.defineProperty;
var Lr = (n, t, o) => t in n ? jr(n, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : n[t] = o;
var I = (n, t, o) => Lr(n, typeof t != "symbol" ? t + "" : t, o);
import G, { createContext as kr, useContext as xr, useRef as Mr, useCallback as le, useEffect as Ir } from "react";
function Wr(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var pe = { exports: {} }, q = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ue;
function Vr() {
  if (Ue) return q;
  Ue = 1;
  var n = G, t = Symbol.for("react.element"), o = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, f = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(R, _, S) {
    var c, d = {}, v = null, l = null;
    S !== void 0 && (v = "" + S), _.key !== void 0 && (v = "" + _.key), _.ref !== void 0 && (l = _.ref);
    for (c in _) a.call(_, c) && !y.hasOwnProperty(c) && (d[c] = _[c]);
    if (R && R.defaultProps) for (c in _ = R.defaultProps, _) d[c] === void 0 && (d[c] = _[c]);
    return { $$typeof: t, type: R, key: v, ref: l, props: d, _owner: f.current };
  }
  return q.Fragment = o, q.jsx = h, q.jsxs = h, q;
}
var Q = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ge;
function Fr() {
  return Ge || (Ge = 1, process.env.NODE_ENV !== "production" && function() {
    var n = G, t = Symbol.for("react.element"), o = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), R = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), l = Symbol.for("react.offscreen"), m = Symbol.iterator, i = "@@iterator";
    function w(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = m && e[m] || e[i];
      return typeof r == "function" ? r : null;
    }
    var T = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(e) {
      {
        for (var r = arguments.length, s = new Array(r > 1 ? r - 1 : 0), u = 1; u < r; u++)
          s[u - 1] = arguments[u];
        x("error", e, s);
      }
    }
    function x(e, r, s) {
      {
        var u = T.ReactDebugCurrentFrame, g = u.getStackAddendum();
        g !== "" && (r += "%s", s = s.concat([g]));
        var O = s.map(function(E) {
          return String(E);
        });
        O.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, O);
      }
    }
    var M = !1, F = !1, C = !1, D = !1, $ = !1, Ee;
    Ee = Symbol.for("react.module.reference");
    function tr(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === a || e === y || $ || e === f || e === S || e === c || D || e === l || M || F || C || typeof e == "object" && e !== null && (e.$$typeof === v || e.$$typeof === d || e.$$typeof === h || e.$$typeof === R || e.$$typeof === _ || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Ee || e.getModuleId !== void 0));
    }
    function nr(e, r, s) {
      var u = e.displayName;
      if (u)
        return u;
      var g = r.displayName || r.name || "";
      return g !== "" ? s + "(" + g + ")" : s;
    }
    function Se(e) {
      return e.displayName || "Context";
    }
    function V(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case a:
          return "Fragment";
        case o:
          return "Portal";
        case y:
          return "Profiler";
        case f:
          return "StrictMode";
        case S:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var r = e;
            return Se(r) + ".Consumer";
          case h:
            var s = e;
            return Se(s._context) + ".Provider";
          case _:
            return nr(e, e.render, "ForwardRef");
          case d:
            var u = e.displayName || null;
            return u !== null ? u : V(e.type) || "Memo";
          case v: {
            var g = e, O = g._payload, E = g._init;
            try {
              return V(E(O));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var N = Object.assign, K = 0, ge, he, ye, be, Oe, Re, we;
    function Te() {
    }
    Te.__reactDisabledLog = !0;
    function or() {
      {
        if (K === 0) {
          ge = console.log, he = console.info, ye = console.warn, be = console.error, Oe = console.group, Re = console.groupCollapsed, we = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Te,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        K++;
      }
    }
    function sr() {
      {
        if (K--, K === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: N({}, e, {
              value: ge
            }),
            info: N({}, e, {
              value: he
            }),
            warn: N({}, e, {
              value: ye
            }),
            error: N({}, e, {
              value: be
            }),
            group: N({}, e, {
              value: Oe
            }),
            groupCollapsed: N({}, e, {
              value: Re
            }),
            groupEnd: N({}, e, {
              value: we
            })
          });
        }
        K < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var te = T.ReactCurrentDispatcher, ne;
    function J(e, r, s) {
      {
        if (ne === void 0)
          try {
            throw Error();
          } catch (g) {
            var u = g.stack.trim().match(/\n( *(at )?)/);
            ne = u && u[1] || "";
          }
        return `
` + ne + e;
      }
    }
    var oe = !1, X;
    {
      var ir = typeof WeakMap == "function" ? WeakMap : Map;
      X = new ir();
    }
    function Ce(e, r) {
      if (!e || oe)
        return "";
      {
        var s = X.get(e);
        if (s !== void 0)
          return s;
      }
      var u;
      oe = !0;
      var g = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var O;
      O = te.current, te.current = null, or();
      try {
        if (r) {
          var E = function() {
            throw Error();
          };
          if (Object.defineProperty(E.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(E, []);
            } catch (L) {
              u = L;
            }
            Reflect.construct(e, [], E);
          } else {
            try {
              E.call();
            } catch (L) {
              u = L;
            }
            e.call(E.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (L) {
            u = L;
          }
          e();
        }
      } catch (L) {
        if (L && u && typeof L.stack == "string") {
          for (var p = L.stack.split(`
`), j = u.stack.split(`
`), P = p.length - 1, A = j.length - 1; P >= 1 && A >= 0 && p[P] !== j[A]; )
            A--;
          for (; P >= 1 && A >= 0; P--, A--)
            if (p[P] !== j[A]) {
              if (P !== 1 || A !== 1)
                do
                  if (P--, A--, A < 0 || p[P] !== j[A]) {
                    var k = `
` + p[P].replace(" at new ", " at ");
                    return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), typeof e == "function" && X.set(e, k), k;
                  }
                while (P >= 1 && A >= 0);
              break;
            }
        }
      } finally {
        oe = !1, te.current = O, sr(), Error.prepareStackTrace = g;
      }
      var H = e ? e.displayName || e.name : "", U = H ? J(H) : "";
      return typeof e == "function" && X.set(e, U), U;
    }
    function ar(e, r, s) {
      return Ce(e, !1);
    }
    function ur(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function Z(e, r, s) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ce(e, ur(e));
      if (typeof e == "string")
        return J(e);
      switch (e) {
        case S:
          return J("Suspense");
        case c:
          return J("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case _:
            return ar(e.render);
          case d:
            return Z(e.type, r, s);
          case v: {
            var u = e, g = u._payload, O = u._init;
            try {
              return Z(O(g), r, s);
            } catch {
            }
          }
        }
      return "";
    }
    var z = Object.prototype.hasOwnProperty, Pe = {}, Ae = T.ReactDebugCurrentFrame;
    function ee(e) {
      if (e) {
        var r = e._owner, s = Z(e.type, e._source, r ? r.type : null);
        Ae.setExtraStackFrame(s);
      } else
        Ae.setExtraStackFrame(null);
    }
    function cr(e, r, s, u, g) {
      {
        var O = Function.call.bind(z);
        for (var E in e)
          if (O(e, E)) {
            var p = void 0;
            try {
              if (typeof e[E] != "function") {
                var j = Error((u || "React class") + ": " + s + " type `" + E + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[E] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw j.name = "Invariant Violation", j;
              }
              p = e[E](r, E, u, s, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (P) {
              p = P;
            }
            p && !(p instanceof Error) && (ee(g), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", u || "React class", s, E, typeof p), ee(null)), p instanceof Error && !(p.message in Pe) && (Pe[p.message] = !0, ee(g), b("Failed %s type: %s", s, p.message), ee(null));
          }
      }
    }
    var lr = Array.isArray;
    function se(e) {
      return lr(e);
    }
    function fr(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, s = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return s;
      }
    }
    function dr(e) {
      try {
        return De(e), !1;
      } catch {
        return !0;
      }
    }
    function De(e) {
      return "" + e;
    }
    function je(e) {
      if (dr(e))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", fr(e)), De(e);
    }
    var Le = T.ReactCurrentOwner, vr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ke, xe;
    function mr(e) {
      if (z.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function pr(e) {
      if (z.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function _r(e, r) {
      typeof e.ref == "string" && Le.current;
    }
    function Er(e, r) {
      {
        var s = function() {
          ke || (ke = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        s.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: s,
          configurable: !0
        });
      }
    }
    function Sr(e, r) {
      {
        var s = function() {
          xe || (xe = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        s.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: s,
          configurable: !0
        });
      }
    }
    var gr = function(e, r, s, u, g, O, E) {
      var p = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: s,
        props: E,
        // Record the component responsible for creating this element.
        _owner: O
      };
      return p._store = {}, Object.defineProperty(p._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(p, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.defineProperty(p, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: g
      }), Object.freeze && (Object.freeze(p.props), Object.freeze(p)), p;
    };
    function hr(e, r, s, u, g) {
      {
        var O, E = {}, p = null, j = null;
        s !== void 0 && (je(s), p = "" + s), pr(r) && (je(r.key), p = "" + r.key), mr(r) && (j = r.ref, _r(r, g));
        for (O in r)
          z.call(r, O) && !vr.hasOwnProperty(O) && (E[O] = r[O]);
        if (e && e.defaultProps) {
          var P = e.defaultProps;
          for (O in P)
            E[O] === void 0 && (E[O] = P[O]);
        }
        if (p || j) {
          var A = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          p && Er(E, A), j && Sr(E, A);
        }
        return gr(e, p, j, g, u, Le.current, E);
      }
    }
    var ie = T.ReactCurrentOwner, Me = T.ReactDebugCurrentFrame;
    function Y(e) {
      if (e) {
        var r = e._owner, s = Z(e.type, e._source, r ? r.type : null);
        Me.setExtraStackFrame(s);
      } else
        Me.setExtraStackFrame(null);
    }
    var ae;
    ae = !1;
    function ue(e) {
      return typeof e == "object" && e !== null && e.$$typeof === t;
    }
    function Ie() {
      {
        if (ie.current) {
          var e = V(ie.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function yr(e) {
      return "";
    }
    var We = {};
    function br(e) {
      {
        var r = Ie();
        if (!r) {
          var s = typeof e == "string" ? e : e.displayName || e.name;
          s && (r = `

Check the top-level render call using <` + s + ">.");
        }
        return r;
      }
    }
    function Ve(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var s = br(r);
        if (We[s])
          return;
        We[s] = !0;
        var u = "";
        e && e._owner && e._owner !== ie.current && (u = " It was passed a child from " + V(e._owner.type) + "."), Y(e), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', s, u), Y(null);
      }
    }
    function Fe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (se(e))
          for (var s = 0; s < e.length; s++) {
            var u = e[s];
            ue(u) && Ve(u, r);
          }
        else if (ue(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var g = w(e);
          if (typeof g == "function" && g !== e.entries)
            for (var O = g.call(e), E; !(E = O.next()).done; )
              ue(E.value) && Ve(E.value, r);
        }
      }
    }
    function Or(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var s;
        if (typeof r == "function")
          s = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === _ || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === d))
          s = r.propTypes;
        else
          return;
        if (s) {
          var u = V(r);
          cr(s, e.props, "prop", u, e);
        } else if (r.PropTypes !== void 0 && !ae) {
          ae = !0;
          var g = V(r);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", g || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Rr(e) {
      {
        for (var r = Object.keys(e.props), s = 0; s < r.length; s++) {
          var u = r[s];
          if (u !== "children" && u !== "key") {
            Y(e), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", u), Y(null);
            break;
          }
        }
        e.ref !== null && (Y(e), b("Invalid attribute `ref` supplied to `React.Fragment`."), Y(null));
      }
    }
    var $e = {};
    function Ne(e, r, s, u, g, O) {
      {
        var E = tr(e);
        if (!E) {
          var p = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var j = yr();
          j ? p += j : p += Ie();
          var P;
          e === null ? P = "null" : se(e) ? P = "array" : e !== void 0 && e.$$typeof === t ? (P = "<" + (V(e.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : P = typeof e, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", P, p);
        }
        var A = hr(e, r, s, g, O);
        if (A == null)
          return A;
        if (E) {
          var k = r.children;
          if (k !== void 0)
            if (u)
              if (se(k)) {
                for (var H = 0; H < k.length; H++)
                  Fe(k[H], e);
                Object.freeze && Object.freeze(k);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Fe(k, e);
        }
        if (z.call(r, "key")) {
          var U = V(e), L = Object.keys(r).filter(function(Dr) {
            return Dr !== "key";
          }), ce = L.length > 0 ? "{key: someKey, " + L.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!$e[U + ce]) {
            var Ar = L.length > 0 ? "{" + L.join(": ..., ") + ": ...}" : "{}";
            b(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ce, U, Ar, U), $e[U + ce] = !0;
          }
        }
        return e === a ? Rr(A) : Or(A), A;
      }
    }
    function wr(e, r, s) {
      return Ne(e, r, s, !0);
    }
    function Tr(e, r, s) {
      return Ne(e, r, s, !1);
    }
    var Cr = Tr, Pr = wr;
    Q.Fragment = a, Q.jsx = Cr, Q.jsxs = Pr;
  }()), Q;
}
process.env.NODE_ENV === "production" ? pe.exports = Vr() : pe.exports = Fr();
var $r = pe.exports;
const Ze = kr(null), ot = ({
  children: n,
  config: t
}) => {
  const o = { config: t };
  return /* @__PURE__ */ $r.jsx(Ze.Provider, { value: o, children: n });
}, Nr = () => {
  const n = xr(Ze);
  if (!n)
    throw new Error("useLeanPromptContext must be used within a LeanPromptProvider");
  return n;
}, Ur = {}, Ye = (n) => {
  let t;
  const o = /* @__PURE__ */ new Set(), a = (c, d) => {
    const v = typeof c == "function" ? c(t) : c;
    if (!Object.is(v, t)) {
      const l = t;
      t = d ?? (typeof v != "object" || v === null) ? v : Object.assign({}, t, v), o.forEach((m) => m(t, l));
    }
  }, f = () => t, _ = { setState: a, getState: f, getInitialState: () => S, subscribe: (c) => (o.add(c), () => o.delete(c)), destroy: () => {
    (Ur ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), o.clear();
  } }, S = t = n(a, f, _);
  return _;
}, Gr = (n) => n ? Ye(n) : Ye;
var _e = { exports: {} }, fe = {}, re = { exports: {} }, de = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var He;
function Yr() {
  if (He) return de;
  He = 1;
  var n = G;
  function t(d, v) {
    return d === v && (d !== 0 || 1 / d === 1 / v) || d !== d && v !== v;
  }
  var o = typeof Object.is == "function" ? Object.is : t, a = n.useState, f = n.useEffect, y = n.useLayoutEffect, h = n.useDebugValue;
  function R(d, v) {
    var l = v(), m = a({ inst: { value: l, getSnapshot: v } }), i = m[0].inst, w = m[1];
    return y(
      function() {
        i.value = l, i.getSnapshot = v, _(i) && w({ inst: i });
      },
      [d, l, v]
    ), f(
      function() {
        return _(i) && w({ inst: i }), d(function() {
          _(i) && w({ inst: i });
        });
      },
      [d]
    ), h(l), l;
  }
  function _(d) {
    var v = d.getSnapshot;
    d = d.value;
    try {
      var l = v();
      return !o(d, l);
    } catch {
      return !0;
    }
  }
  function S(d, v) {
    return v();
  }
  var c = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? S : R;
  return de.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : c, de;
}
var ve = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Be;
function Hr() {
  return Be || (Be = 1, process.env.NODE_ENV !== "production" && function() {
    function n(l, m) {
      return l === m && (l !== 0 || 1 / l === 1 / m) || l !== l && m !== m;
    }
    function t(l, m) {
      c || f.startTransition === void 0 || (c = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var i = m();
      if (!d) {
        var w = m();
        y(i, w) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), d = !0);
      }
      w = h({
        inst: { value: i, getSnapshot: m }
      });
      var T = w[0].inst, b = w[1];
      return _(
        function() {
          T.value = i, T.getSnapshot = m, o(T) && b({ inst: T });
        },
        [l, i, m]
      ), R(
        function() {
          return o(T) && b({ inst: T }), l(function() {
            o(T) && b({ inst: T });
          });
        },
        [l]
      ), S(i), i;
    }
    function o(l) {
      var m = l.getSnapshot;
      l = l.value;
      try {
        var i = m();
        return !y(l, i);
      } catch {
        return !0;
      }
    }
    function a(l, m) {
      return m();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var f = G, y = typeof Object.is == "function" ? Object.is : n, h = f.useState, R = f.useEffect, _ = f.useLayoutEffect, S = f.useDebugValue, c = !1, d = !1, v = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? a : t;
    ve.useSyncExternalStore = f.useSyncExternalStore !== void 0 ? f.useSyncExternalStore : v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), ve;
}
var Ke;
function er() {
  return Ke || (Ke = 1, process.env.NODE_ENV === "production" ? re.exports = Yr() : re.exports = Hr()), re.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ze;
function Br() {
  if (ze) return fe;
  ze = 1;
  var n = G, t = er();
  function o(S, c) {
    return S === c && (S !== 0 || 1 / S === 1 / c) || S !== S && c !== c;
  }
  var a = typeof Object.is == "function" ? Object.is : o, f = t.useSyncExternalStore, y = n.useRef, h = n.useEffect, R = n.useMemo, _ = n.useDebugValue;
  return fe.useSyncExternalStoreWithSelector = function(S, c, d, v, l) {
    var m = y(null);
    if (m.current === null) {
      var i = { hasValue: !1, value: null };
      m.current = i;
    } else i = m.current;
    m = R(
      function() {
        function T(C) {
          if (!b) {
            if (b = !0, x = C, C = v(C), l !== void 0 && i.hasValue) {
              var D = i.value;
              if (l(D, C))
                return M = D;
            }
            return M = C;
          }
          if (D = M, a(x, C)) return D;
          var $ = v(C);
          return l !== void 0 && l(D, $) ? (x = C, D) : (x = C, M = $);
        }
        var b = !1, x, M, F = d === void 0 ? null : d;
        return [
          function() {
            return T(c());
          },
          F === null ? void 0 : function() {
            return T(F());
          }
        ];
      },
      [c, d, v, l]
    );
    var w = f(S, m[0], m[1]);
    return h(
      function() {
        i.hasValue = !0, i.value = w;
      },
      [w]
    ), _(w), w;
  }, fe;
}
var me = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qe;
function Kr() {
  return qe || (qe = 1, process.env.NODE_ENV !== "production" && function() {
    function n(S, c) {
      return S === c && (S !== 0 || 1 / S === 1 / c) || S !== S && c !== c;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = G, o = er(), a = typeof Object.is == "function" ? Object.is : n, f = o.useSyncExternalStore, y = t.useRef, h = t.useEffect, R = t.useMemo, _ = t.useDebugValue;
    me.useSyncExternalStoreWithSelector = function(S, c, d, v, l) {
      var m = y(null);
      if (m.current === null) {
        var i = { hasValue: !1, value: null };
        m.current = i;
      } else i = m.current;
      m = R(
        function() {
          function T(C) {
            if (!b) {
              if (b = !0, x = C, C = v(C), l !== void 0 && i.hasValue) {
                var D = i.value;
                if (l(D, C))
                  return M = D;
              }
              return M = C;
            }
            if (D = M, a(x, C))
              return D;
            var $ = v(C);
            return l !== void 0 && l(D, $) ? (x = C, D) : (x = C, M = $);
          }
          var b = !1, x, M, F = d === void 0 ? null : d;
          return [
            function() {
              return T(c());
            },
            F === null ? void 0 : function() {
              return T(F());
            }
          ];
        },
        [c, d, v, l]
      );
      var w = f(S, m[0], m[1]);
      return h(
        function() {
          i.hasValue = !0, i.value = w;
        },
        [w]
      ), _(w), w;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), me;
}
process.env.NODE_ENV === "production" ? _e.exports = Br() : _e.exports = Kr();
var zr = _e.exports;
const qr = /* @__PURE__ */ Wr(zr), rr = {}, { useDebugValue: Qr } = G, { useSyncExternalStoreWithSelector: Jr } = qr;
let Qe = !1;
const Xr = (n) => n;
function Zr(n, t = Xr, o) {
  (rr ? "production" : void 0) !== "production" && o && !Qe && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), Qe = !0);
  const a = Jr(
    n.subscribe,
    n.getState,
    n.getServerState || n.getInitialState,
    t,
    o
  );
  return Qr(a), a;
}
const Je = (n) => {
  (rr ? "production" : void 0) !== "production" && typeof n != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const t = typeof n == "function" ? Gr(n) : n, o = (a, f) => Zr(t, a, f);
  return Object.assign(o, t), o;
}, et = (n) => n ? Je(n) : Je, Xe = () => ({
  messages: [],
  status: "idle"
}), W = et((n, t) => ({
  sessions: {},
  connectionStatus: "disconnected",
  connectionError: void 0,
  setSessionStatus: (o, a) => n((f) => ({
    sessions: {
      ...f.sessions,
      [o]: {
        ...f.sessions[o],
        status: a
      }
    }
  })),
  addMessage: (o, a) => n((f) => {
    const y = f.sessions[o] || Xe();
    return {
      sessions: {
        ...f.sessions,
        [o]: {
          ...y,
          messages: [...y.messages, { ...a, timestamp: Date.now() }]
        }
      }
    };
  }),
  setSessionError: (o, a) => n((f) => ({
    sessions: {
      ...f.sessions,
      [o]: {
        ...f.sessions[o],
        status: "error",
        error: a
      }
    }
  })),
  clearSession: (o) => n((a) => ({
    sessions: {
      ...a.sessions,
      [o]: Xe()
    }
  })),
  setConnectionStatus: (o) => n({ connectionStatus: o, connectionError: void 0 }),
  setConnectionError: (o) => n({ connectionStatus: "error", connectionError: o })
}));
class rt {
  constructor(t) {
    I(this, "ws", null);
    I(this, "config");
    I(this, "reconnectAttempts", 0);
    I(this, "reconnectTimer", null);
    I(this, "messageQueue", /* @__PURE__ */ new Map());
    I(this, "debounceTimers", /* @__PURE__ */ new Map());
    I(this, "messageHandlers", /* @__PURE__ */ new Set());
    I(this, "connectionHandlers", /* @__PURE__ */ new Set());
    this.config = {
      baseUrl: t.baseUrl.replace(/\/$/, ""),
      // Remove trailing slash
      clientId: t.clientId || `client-${Math.random().toString(36).substr(2, 9)}`,
      reconnectAttempts: t.reconnectAttempts || 5,
      reconnectDelay: t.reconnectDelay || 1e3,
      debounceMs: t.debounceMs || 300
    };
  }
  connect() {
    return new Promise((t, o) => {
      var y;
      if (((y = this.ws) == null ? void 0 : y.readyState) === WebSocket.OPEN) {
        t();
        return;
      }
      this.setConnectionStatus("connecting");
      const a = `${this.config.baseUrl}/ws/${this.config.clientId}`;
      this.ws = new WebSocket(a);
      const f = setTimeout(() => {
        o(new Error("Connection timeout"));
      }, 1e4);
      this.ws.onopen = () => {
        clearTimeout(f), this.reconnectAttempts = 0, this.setConnectionStatus("connected"), this.processMessageQueue(), t();
      }, this.ws.onmessage = (h) => {
        try {
          const R = JSON.parse(h.data);
          this.messageHandlers.forEach((_) => _(R));
        } catch (R) {
          console.error("Failed to parse WebSocket message:", R);
        }
      }, this.ws.onclose = () => {
        clearTimeout(f), this.setConnectionStatus("disconnected"), this.handleReconnect();
      }, this.ws.onerror = (h) => {
        clearTimeout(f), this.setConnectionStatus("error"), console.error("WebSocket error:", h), o(h);
      };
    });
  }
  disconnect() {
    this.reconnectTimer && (clearTimeout(this.reconnectTimer), this.reconnectTimer = null), this.debounceTimers.forEach((t) => clearTimeout(t)), this.debounceTimers.clear(), this.ws && (this.ws.close(), this.ws = null), this.setConnectionStatus("disconnected");
  }
  send(t, o) {
    return new Promise((a, f) => {
      const y = { path: t, message: o };
      this.messageQueue.has(t) || this.messageQueue.set(t, []), this.messageQueue.get(t).push(y), this.debounceSend(t), a();
    });
  }
  debounceSend(t) {
    const o = this.debounceTimers.get(t);
    o && clearTimeout(o);
    const a = window.setTimeout(() => {
      this.processQueueForPath(t), this.debounceTimers.delete(t);
    }, this.config.debounceMs);
    this.debounceTimers.set(t, a);
  }
  processQueueForPath(t) {
    var f;
    if (((f = this.ws) == null ? void 0 : f.readyState) !== WebSocket.OPEN)
      return;
    const o = this.messageQueue.get(t);
    if (!o || o.length === 0)
      return;
    const a = o[o.length - 1];
    try {
      this.ws.send(JSON.stringify(a)), this.messageQueue.set(t, []);
    } catch (y) {
      console.error("Failed to send WebSocket message:", y);
    }
  }
  processMessageQueue() {
    var t;
    ((t = this.ws) == null ? void 0 : t.readyState) === WebSocket.OPEN && Array.from(this.messageQueue.keys()).forEach((o) => {
      this.processQueueForPath(o);
    });
  }
  handleReconnect() {
    if (this.reconnectAttempts >= this.config.reconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }
    this.reconnectAttempts++;
    const t = this.config.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    this.reconnectTimer = window.setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.config.reconnectAttempts})`), this.connect().catch((o) => {
        console.error("Reconnection failed:", o);
      });
    }, t);
  }
  setConnectionStatus(t) {
    this.connectionHandlers.forEach((o) => o(t === "connected"));
  }
  onMessage(t) {
    return this.messageHandlers.add(t), () => this.messageHandlers.delete(t);
  }
  onConnectionChange(t) {
    return this.connectionHandlers.add(t), () => this.connectionHandlers.delete(t);
  }
  isConnected() {
    var t;
    return ((t = this.ws) == null ? void 0 : t.readyState) === WebSocket.OPEN;
  }
  getConnectionStatus() {
    var t, o, a;
    return ((t = this.ws) == null ? void 0 : t.readyState) === WebSocket.OPEN ? "connected" : ((o = this.ws) == null ? void 0 : o.readyState) === WebSocket.CONNECTING ? "connecting" : ((a = this.ws) == null ? void 0 : a.readyState) === WebSocket.CLOSED ? "disconnected" : "error";
  }
}
let B = null;
const st = (n) => {
  const { config: t } = Nr(), o = Mr(null), a = W((i) => i.sessions[n]), f = W((i) => i.connectionStatus), y = W((i) => i.connectionError), h = W((i) => i.setSessionStatus), R = W((i) => i.addMessage), _ = W((i) => i.setSessionError), S = W((i) => i.clearSession), c = W((i) => i.setConnectionStatus), d = W((i) => i.setConnectionError), v = le(() => (B || (B = new rt(t), o.current = B, B.onConnectionChange((i) => {
    c(i ? "connected" : "disconnected");
  }), B.onMessage((i) => {
    i.error ? (_(n, i.error), h(n, "error")) : i.response && (R(n, {
      role: "assistant",
      content: i.response
    }), h(n, "idle"));
  })), B), [t, c, _, h, R, n]);
  Ir(() => {
    const i = v();
    return a || h(n, "idle"), i.getConnectionStatus() === "disconnected" && i.connect().catch((w) => {
      d(w.message);
    }), () => {
    };
  }, [n, a, v, h, d]);
  const l = le(
    async (i) => {
      const w = v();
      try {
        h(n, "streaming"), R(n, {
          role: "user",
          content: i
        }), await w.send(n, i);
      } catch (T) {
        const b = T instanceof Error ? T.message : "Unknown error";
        _(n, b), h(n, "error");
      }
    },
    [n, v, h, R, _]
  ), m = le(() => {
    S(n);
  }, [n, S]);
  return {
    messages: (a == null ? void 0 : a.messages) || [],
    status: (a == null ? void 0 : a.status) || "idle",
    connectionStatus: f,
    connectionError: y,
    isConnected: f === "connected",
    isLoading: (a == null ? void 0 : a.status) === "connecting" || (a == null ? void 0 : a.status) === "streaming",
    isStreaming: (a == null ? void 0 : a.status) === "streaming",
    error: (a == null ? void 0 : a.error) || y,
    send: l,
    clear: m
  };
};
export {
  ot as LeanPromptProvider,
  rt as WebSocketManager,
  st as useLeanPrompt,
  Nr as useLeanPromptContext,
  W as useLeanPromptStore
};
