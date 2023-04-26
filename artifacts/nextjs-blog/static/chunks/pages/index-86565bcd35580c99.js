(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [405],
  {
    2350: function () {},
    3454: function (e, t, n) {
      'use strict';
      var r, i;
      e.exports =
        (null == (r = n.g.process) ? void 0 : r.env) &&
        'object' == typeof (null == (i = n.g.process) ? void 0 : i.env)
          ? n.g.process
          : n(7663);
    },
    5557: function (e, t, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        '/',
        function () {
          return n(6616);
        },
      ]);
    },
    9578: function (e, t, n) {
      var r = n(3454);
      n(2350);
      var i = n(7294),
        s = i && 'object' == typeof i && 'default' in i ? i : { default: i };
      function o(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      var a = void 0 !== r && r.env && !0,
        c = function (e) {
          return '[object String]' === Object.prototype.toString.call(e);
        },
        l = (function () {
          function e(e) {
            var t = void 0 === e ? {} : e,
              n = t.name,
              r = void 0 === n ? 'stylesheet' : n,
              i = t.optimizeForSpeed,
              s = void 0 === i ? a : i;
            u(c(r), '`name` must be a string'),
              (this._name = r),
              (this._deletedRulePlaceholder = '#' + r + '-deleted-rule____{}'),
              u('boolean' == typeof s, '`optimizeForSpeed` must be a boolean'),
              (this._optimizeForSpeed = s),
              (this._serverSheet = void 0),
              (this._tags = []),
              (this._injected = !1),
              (this._rulesCount = 0);
            var o = document.querySelector('meta[property="csp-nonce"]');
            this._nonce = o ? o.getAttribute('content') : null;
          }
          var t,
            n = e.prototype;
          return (
            (n.setOptimizeForSpeed = function (e) {
              u(
                'boolean' == typeof e,
                '`setOptimizeForSpeed` accepts a boolean'
              ),
                u(
                  0 === this._rulesCount,
                  'optimizeForSpeed cannot be when rules have already been inserted'
                ),
                this.flush(),
                (this._optimizeForSpeed = e),
                this.inject();
            }),
            (n.isOptimizeForSpeed = function () {
              return this._optimizeForSpeed;
            }),
            (n.inject = function () {
              var e = this;
              if (
                (u(!this._injected, 'sheet already injected'),
                (this._injected = !0),
                this._optimizeForSpeed)
              ) {
                (this._tags[0] = this.makeStyleTag(this._name)),
                  (this._optimizeForSpeed = 'insertRule' in this.getSheet()),
                  this._optimizeForSpeed ||
                    (a ||
                      console.warn(
                        'StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.'
                      ),
                    this.flush(),
                    (this._injected = !0));
                return;
              }
              this._serverSheet = {
                cssRules: [],
                insertRule: function (t, n) {
                  return (
                    'number' == typeof n
                      ? (e._serverSheet.cssRules[n] = { cssText: t })
                      : e._serverSheet.cssRules.push({ cssText: t }),
                    n
                  );
                },
                deleteRule: function (t) {
                  e._serverSheet.cssRules[t] = null;
                },
              };
            }),
            (n.getSheetForTag = function (e) {
              if (e.sheet) return e.sheet;
              for (var t = 0; t < document.styleSheets.length; t++)
                if (document.styleSheets[t].ownerNode === e)
                  return document.styleSheets[t];
            }),
            (n.getSheet = function () {
              return this.getSheetForTag(this._tags[this._tags.length - 1]);
            }),
            (n.insertRule = function (e, t) {
              if (
                (u(c(e), '`insertRule` accepts only strings'),
                this._optimizeForSpeed)
              ) {
                var n = this.getSheet();
                'number' != typeof t && (t = n.cssRules.length);
                try {
                  n.insertRule(e, t);
                } catch (t) {
                  return (
                    a ||
                      console.warn(
                        'StyleSheet: illegal rule: \n\n' +
                          e +
                          '\n\nSee https://stackoverflow.com/q/20007992 for more info'
                      ),
                    -1
                  );
                }
              } else {
                var r = this._tags[t];
                this._tags.push(this.makeStyleTag(this._name, e, r));
              }
              return this._rulesCount++;
            }),
            (n.replaceRule = function (e, t) {
              if (this._optimizeForSpeed) {
                var n = this.getSheet();
                if (
                  (t.trim() || (t = this._deletedRulePlaceholder),
                  !n.cssRules[e])
                )
                  return e;
                n.deleteRule(e);
                try {
                  n.insertRule(t, e);
                } catch (r) {
                  a ||
                    console.warn(
                      'StyleSheet: illegal rule: \n\n' +
                        t +
                        '\n\nSee https://stackoverflow.com/q/20007992 for more info'
                    ),
                    n.insertRule(this._deletedRulePlaceholder, e);
                }
              } else {
                var r = this._tags[e];
                u(r, 'old rule at index `' + e + '` not found'),
                  (r.textContent = t);
              }
              return e;
            }),
            (n.deleteRule = function (e) {
              if (this._optimizeForSpeed) this.replaceRule(e, '');
              else {
                var t = this._tags[e];
                u(t, 'rule at index `' + e + '` not found'),
                  t.parentNode.removeChild(t),
                  (this._tags[e] = null);
              }
            }),
            (n.flush = function () {
              (this._injected = !1),
                (this._rulesCount = 0),
                this._tags.forEach(function (e) {
                  return e && e.parentNode.removeChild(e);
                }),
                (this._tags = []);
            }),
            (n.cssRules = function () {
              var e = this;
              return this._tags.reduce(function (t, n) {
                return (
                  n
                    ? (t = t.concat(
                        Array.prototype.map.call(
                          e.getSheetForTag(n).cssRules,
                          function (t) {
                            return t.cssText === e._deletedRulePlaceholder
                              ? null
                              : t;
                          }
                        )
                      ))
                    : t.push(null),
                  t
                );
              }, []);
            }),
            (n.makeStyleTag = function (e, t, n) {
              t &&
                u(
                  c(t),
                  'makeStyleTag accepts only strings as second parameter'
                );
              var r = document.createElement('style');
              this._nonce && r.setAttribute('nonce', this._nonce),
                (r.type = 'text/css'),
                r.setAttribute('data-' + e, ''),
                t && r.appendChild(document.createTextNode(t));
              var i = document.head || document.getElementsByTagName('head')[0];
              return n ? i.insertBefore(r, n) : i.appendChild(r), r;
            }),
            o(e.prototype, [
              {
                key: 'length',
                get: function () {
                  return this._rulesCount;
                },
              },
            ]),
            t && o(e, t),
            e
          );
        })();
      function u(e, t) {
        if (!e) throw Error('StyleSheet: ' + t + '.');
      }
      var d = function (e) {
          for (var t = 5381, n = e.length; n; )
            t = (33 * t) ^ e.charCodeAt(--n);
          return t >>> 0;
        },
        h = {};
      function f(e, t) {
        if (!t) return 'jsx-' + e;
        var n = String(t),
          r = e + n;
        return h[r] || (h[r] = 'jsx-' + d(e + '-' + n)), h[r];
      }
      function m(e, t) {
        var n = e + t;
        return (
          h[n] || (h[n] = t.replace(/__jsx-style-dynamic-selector/g, e)), h[n]
        );
      }
      var p = (function () {
          function e(e) {
            var t = void 0 === e ? {} : e,
              n = t.styleSheet,
              r = void 0 === n ? null : n,
              i = t.optimizeForSpeed,
              s = void 0 !== i && i;
            (this._sheet =
              r || new l({ name: 'styled-jsx', optimizeForSpeed: s })),
              this._sheet.inject(),
              r &&
                'boolean' == typeof s &&
                (this._sheet.setOptimizeForSpeed(s),
                (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
              (this._fromServer = void 0),
              (this._indices = {}),
              (this._instancesCounts = {});
          }
          var t = e.prototype;
          return (
            (t.add = function (e) {
              var t = this;
              void 0 === this._optimizeForSpeed &&
                ((this._optimizeForSpeed = Array.isArray(e.children)),
                this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),
                (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
                this._fromServer ||
                  ((this._fromServer = this.selectFromServer()),
                  (this._instancesCounts = Object.keys(this._fromServer).reduce(
                    function (e, t) {
                      return (e[t] = 0), e;
                    },
                    {}
                  )));
              var n = this.getIdAndRules(e),
                r = n.styleId,
                i = n.rules;
              if (r in this._instancesCounts) {
                this._instancesCounts[r] += 1;
                return;
              }
              var s = i
                .map(function (e) {
                  return t._sheet.insertRule(e);
                })
                .filter(function (e) {
                  return -1 !== e;
                });
              (this._indices[r] = s), (this._instancesCounts[r] = 1);
            }),
            (t.remove = function (e) {
              var t = this,
                n = this.getIdAndRules(e).styleId;
              if (
                ((function (e, t) {
                  if (!e) throw Error('StyleSheetRegistry: ' + t + '.');
                })(
                  n in this._instancesCounts,
                  'styleId: `' + n + '` not found'
                ),
                (this._instancesCounts[n] -= 1),
                this._instancesCounts[n] < 1)
              ) {
                var r = this._fromServer && this._fromServer[n];
                r
                  ? (r.parentNode.removeChild(r), delete this._fromServer[n])
                  : (this._indices[n].forEach(function (e) {
                      return t._sheet.deleteRule(e);
                    }),
                    delete this._indices[n]),
                  delete this._instancesCounts[n];
              }
            }),
            (t.update = function (e, t) {
              this.add(t), this.remove(e);
            }),
            (t.flush = function () {
              this._sheet.flush(),
                this._sheet.inject(),
                (this._fromServer = void 0),
                (this._indices = {}),
                (this._instancesCounts = {});
            }),
            (t.cssRules = function () {
              var e = this,
                t = this._fromServer
                  ? Object.keys(this._fromServer).map(function (t) {
                      return [t, e._fromServer[t]];
                    })
                  : [],
                n = this._sheet.cssRules();
              return t.concat(
                Object.keys(this._indices)
                  .map(function (t) {
                    return [
                      t,
                      e._indices[t]
                        .map(function (e) {
                          return n[e].cssText;
                        })
                        .join(e._optimizeForSpeed ? '' : '\n'),
                    ];
                  })
                  .filter(function (e) {
                    return !!e[1];
                  })
              );
            }),
            (t.styles = function (e) {
              var t, n;
              return (
                (t = this.cssRules()),
                void 0 === (n = e) && (n = {}),
                t.map(function (e) {
                  var t = e[0],
                    r = e[1];
                  return s.default.createElement('style', {
                    id: '__' + t,
                    key: '__' + t,
                    nonce: n.nonce ? n.nonce : void 0,
                    dangerouslySetInnerHTML: { __html: r },
                  });
                })
              );
            }),
            (t.getIdAndRules = function (e) {
              var t = e.children,
                n = e.dynamic,
                r = e.id;
              if (n) {
                var i = f(r, n);
                return {
                  styleId: i,
                  rules: Array.isArray(t)
                    ? t.map(function (e) {
                        return m(i, e);
                      })
                    : [m(i, t)],
                };
              }
              return { styleId: f(r), rules: Array.isArray(t) ? t : [t] };
            }),
            (t.selectFromServer = function () {
              return Array.prototype.slice
                .call(document.querySelectorAll('[id^="__jsx-"]'))
                .reduce(function (e, t) {
                  return (e[t.id.slice(2)] = t), e;
                }, {});
            }),
            e
          );
        })(),
        x = i.createContext(null);
      x.displayName = 'StyleSheetContext';
      var b = s.default.useInsertionEffect || s.default.useLayoutEffect,
        _ = new p();
      function y(e) {
        var t = _ || i.useContext(x);
        return (
          t &&
            b(
              function () {
                return (
                  t.add(e),
                  function () {
                    t.remove(e);
                  }
                );
              },
              [e.id, String(e.dynamic)]
            ),
          null
        );
      }
      (y.dynamic = function (e) {
        return e
          .map(function (e) {
            return f(e[0], e[1]);
          })
          .join(' ');
      }),
        (t.style = y);
    },
    6465: function (e, t, n) {
      'use strict';
      e.exports = n(9578).style;
    },
    6616: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return u;
          },
        });
      var r = n(5893),
        i = n(6465),
        s = n.n(i),
        o = n(9008),
        a = n.n(o),
        c = n(9034),
        l = n.n(c);
      function u() {
        return (0, r.jsxs)('div', {
          className: 'jsx-25781291bf750 ' + (l().container || ''),
          children: [
            (0, r.jsxs)(a(), {
              children: [
                (0, r.jsx)('title', {
                  className: 'jsx-25781291bf750',
                  children: 'Create Next App',
                }),
                (0, r.jsx)('link', {
                  rel: 'icon',
                  href: '/favicon.ico',
                  className: 'jsx-25781291bf750',
                }),
              ],
            }),
            (0, r.jsxs)('main', {
              className: 'jsx-25781291bf750',
              children: [
                (0, r.jsxs)('h1', {
                  className: 'jsx-25781291bf750 ' + (l().title || ''),
                  children: [
                    'Welcome to ',
                    (0, r.jsx)('a', {
                      href: 'https://nextjs.org',
                      className: 'jsx-25781291bf750',
                      children: 'Next.js!',
                    }),
                  ],
                }),
                (0, r.jsxs)('p', {
                  className: 'jsx-25781291bf750 ' + (l().description || ''),
                  children: [
                    'Get started by editing ',
                    (0, r.jsx)('code', {
                      className: 'jsx-25781291bf750',
                      children: 'pages/index.js',
                    }),
                  ],
                }),
                (0, r.jsxs)('div', {
                  className: 'jsx-25781291bf750 ' + (l().grid || ''),
                  children: [
                    (0, r.jsxs)('a', {
                      href: 'https://nextjs.org/docs',
                      className: 'jsx-25781291bf750 ' + (l().card || ''),
                      children: [
                        (0, r.jsx)('h3', {
                          className: 'jsx-25781291bf750',
                          children: 'Documentation →',
                        }),
                        (0, r.jsx)('p', {
                          className: 'jsx-25781291bf750',
                          children:
                            'Find in-depth information about Next.js features and API.',
                        }),
                      ],
                    }),
                    (0, r.jsxs)('a', {
                      href: 'https://nextjs.org/learn',
                      className: 'jsx-25781291bf750 ' + (l().card || ''),
                      children: [
                        (0, r.jsx)('h3', {
                          className: 'jsx-25781291bf750',
                          children: 'Learn →',
                        }),
                        (0, r.jsx)('p', {
                          className: 'jsx-25781291bf750',
                          children:
                            'Learn about Next.js in an interactive course with quizzes!',
                        }),
                      ],
                    }),
                    (0, r.jsxs)('a', {
                      href: 'https://github.com/vercel/next.js/tree/master/examples',
                      className: 'jsx-25781291bf750 ' + (l().card || ''),
                      children: [
                        (0, r.jsx)('h3', {
                          className: 'jsx-25781291bf750',
                          children: 'Examples →',
                        }),
                        (0, r.jsx)('p', {
                          className: 'jsx-25781291bf750',
                          children:
                            'Discover and deploy boilerplate example Next.js projects.',
                        }),
                      ],
                    }),
                    (0, r.jsxs)('a', {
                      href: 'https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
                      className: 'jsx-25781291bf750 ' + (l().card || ''),
                      children: [
                        (0, r.jsx)('h3', {
                          className: 'jsx-25781291bf750',
                          children: 'Deploy →',
                        }),
                        (0, r.jsx)('p', {
                          className: 'jsx-25781291bf750',
                          children:
                            'Instantly deploy your Next.js site to a public URL with Vercel.',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, r.jsx)('footer', {
              className: 'jsx-25781291bf750',
              children: (0, r.jsxs)('a', {
                href: 'https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'jsx-25781291bf750',
                children: [
                  'Powered by',
                  ' ',
                  (0, r.jsx)('img', {
                    src: '/vercel.svg',
                    alt: 'Vercel',
                    className: 'jsx-25781291bf750 ' + (l().logo || ''),
                  }),
                ],
              }),
            }),
            (0, r.jsx)(s(), {
              id: 'b934031353334047',
              children:
                'main.jsx-25781291bf750{padding:5rem 0;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}footer.jsx-25781291bf750{width:100%;height:100px;border-top:1px solid#eaeaea;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}footer.jsx-25781291bf750 img.jsx-25781291bf750{margin-left:.5rem}footer.jsx-25781291bf750 a.jsx-25781291bf750{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;text-decoration:none;color:inherit}code.jsx-25781291bf750{background:#fafafa;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:.75rem;font-size:1.1rem;font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}',
            }),
            (0, r.jsx)(s(), {
              id: 'b0cffc484a2fa82a',
              children:
                'html,body{padding:0;margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}',
            }),
          ],
        });
      }
    },
    9034: function (e) {
      e.exports = {
        container: 'Home_container__bCOhY',
        title: 'Home_title__T09hD',
        description: 'Home_description__41Owk',
        grid: 'Home_grid__GxQ85',
        card: 'Home_card___LpL1',
        logo: 'Home_logo__27_tb',
      };
    },
    7663: function (e) {
      !(function () {
        var t = {
            229: function (e) {
              var t,
                n,
                r,
                i = (e.exports = {});
              function s() {
                throw Error('setTimeout has not been defined');
              }
              function o() {
                throw Error('clearTimeout has not been defined');
              }
              function a(e) {
                if (t === setTimeout) return setTimeout(e, 0);
                if ((t === s || !t) && setTimeout)
                  return (t = setTimeout), setTimeout(e, 0);
                try {
                  return t(e, 0);
                } catch (n) {
                  try {
                    return t.call(null, e, 0);
                  } catch (n) {
                    return t.call(this, e, 0);
                  }
                }
              }
              !(function () {
                try {
                  t = 'function' == typeof setTimeout ? setTimeout : s;
                } catch (e) {
                  t = s;
                }
                try {
                  n = 'function' == typeof clearTimeout ? clearTimeout : o;
                } catch (e) {
                  n = o;
                }
              })();
              var c = [],
                l = !1,
                u = -1;
              function d() {
                l &&
                  r &&
                  ((l = !1),
                  r.length ? (c = r.concat(c)) : (u = -1),
                  c.length && h());
              }
              function h() {
                if (!l) {
                  var e = a(d);
                  l = !0;
                  for (var t = c.length; t; ) {
                    for (r = c, c = []; ++u < t; ) r && r[u].run();
                    (u = -1), (t = c.length);
                  }
                  (r = null),
                    (l = !1),
                    (function (e) {
                      if (n === clearTimeout) return clearTimeout(e);
                      if ((n === o || !n) && clearTimeout)
                        return (n = clearTimeout), clearTimeout(e);
                      try {
                        n(e);
                      } catch (t) {
                        try {
                          return n.call(null, e);
                        } catch (t) {
                          return n.call(this, e);
                        }
                      }
                    })(e);
                }
              }
              function f(e, t) {
                (this.fun = e), (this.array = t);
              }
              function m() {}
              (i.nextTick = function (e) {
                var t = Array(arguments.length - 1);
                if (arguments.length > 1)
                  for (var n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
                c.push(new f(e, t)), 1 !== c.length || l || a(h);
              }),
                (f.prototype.run = function () {
                  this.fun.apply(null, this.array);
                }),
                (i.title = 'browser'),
                (i.browser = !0),
                (i.env = {}),
                (i.argv = []),
                (i.version = ''),
                (i.versions = {}),
                (i.on = m),
                (i.addListener = m),
                (i.once = m),
                (i.off = m),
                (i.removeListener = m),
                (i.removeAllListeners = m),
                (i.emit = m),
                (i.prependListener = m),
                (i.prependOnceListener = m),
                (i.listeners = function (e) {
                  return [];
                }),
                (i.binding = function (e) {
                  throw Error('process.binding is not supported');
                }),
                (i.cwd = function () {
                  return '/';
                }),
                (i.chdir = function (e) {
                  throw Error('process.chdir is not supported');
                }),
                (i.umask = function () {
                  return 0;
                });
            },
          },
          n = {};
        function r(e) {
          var i = n[e];
          if (void 0 !== i) return i.exports;
          var s = (n[e] = { exports: {} }),
            o = !0;
          try {
            t[e](s, s.exports, r), (o = !1);
          } finally {
            o && delete n[e];
          }
          return s.exports;
        }
        r.ab = '//';
        var i = r(229);
        e.exports = i;
      })();
    },
    9008: function (e, t, n) {
      e.exports = n(2636);
    },
  },
  function (e) {
    e.O(0, [774, 888, 179], function () {
      return e((e.s = 5557));
    }),
      (_N_E = e.O());
  },
]);
