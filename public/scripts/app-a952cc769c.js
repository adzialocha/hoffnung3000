(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_Component) {
  _inherits(Navigation, _Component);

  function Navigation() {
    _classCallCheck(this, Navigation);

    return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).apply(this, arguments));
  }

  _createClass(Navigation, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'nav',
        { role: 'navigation' },
        _react2.default.createElement(
          'ul',
          { className: 'navigation' },
          _react2.default.createElement(
            'li',
            { className: 'navigation__item' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/' },
              'Home'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'navigation__item' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/test' },
              'Test'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'navigation__item' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/about' },
              'About'
            )
          )
        )
      );
    }
  }]);

  return Navigation;
}(_react.Component);

exports.default = Navigation;
module.exports = exports['default'];

},{"react":undefined,"react-router-dom":undefined}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Navigation = require('./Navigation');

Object.defineProperty(exports, 'Navigation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Navigation).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./Navigation":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'header',
          null,
          _react2.default.createElement(_components.Navigation, null)
        ),
        _react2.default.createElement(
          'main',
          null,
          this.props.children
        ),
        _react2.default.createElement(
          'footer',
          null,
          _react2.default.createElement(
            'p',
            null,
            'Footer'
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

App.propTypes = {
  children: _propTypes2.default.object.isRequired
};
exports.default = App;
module.exports = exports['default'];

},{"../components":2,"prop-types":undefined,"react":undefined}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./App');

Object.defineProperty(exports, 'App', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_App).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./App":3}],5:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _history = require('history');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _containers = require('./containers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {};
var history = (0, _history.createBrowserHistory)();
var store = (0, _store2.default)(initialState, history);

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterRedux.ConnectedRouter,
    { history: history },
    _react2.default.createElement(
      _containers.App,
      null,
      _react2.default.createElement(_routes2.default, null)
    )
  )
), document.getElementById('app'));

},{"./containers":4,"./routes":7,"./store":8,"history":undefined,"react":undefined,"react-dom":undefined,"react-redux":undefined,"react-router-redux":undefined}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var rootReducer = (0, _redux.combineReducers)({
  routing: _reactRouterRedux.routerReducer
});

exports.default = rootReducer;
module.exports = exports['default'];

},{"react-router-redux":undefined,"redux":undefined}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _views = require('./views');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Routes = function (_Component) {
  _inherits(Routes, _Component);

  function Routes() {
    _classCallCheck(this, Routes);

    return _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).apply(this, arguments));
  }

  _createClass(Routes, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactRouter.Route, { component: _views.Home, exact: true, path: '/' }),
        _react2.default.createElement(_reactRouter.Route, { component: _views.About, path: '/about' }),
        _react2.default.createElement(_reactRouter.Route, { component: _views.Test, path: '/test' })
      );
    }
  }]);

  return Routes;
}(_react.Component);

exports.default = Routes;
module.exports = exports['default'];

},{"./views":12,"react":undefined,"react-router":undefined}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reactRouterRedux = require('react-router-redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(initialState, history) {
  var middleware = [_reduxThunk2.default, (0, _reduxLogger.createLogger)(), (0, _reactRouterRedux.routerMiddleware)(history)];
  var store = (0, _redux.createStore)(_reducers2.default, _redux.applyMiddleware.apply(undefined, middleware));

  return store;
}
module.exports = exports['default'];

},{"./reducers":6,"react-router-redux":undefined,"redux":undefined,"redux-logger":undefined,"redux-thunk":undefined}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = function (_Component) {
  _inherits(About, _Component);

  function About() {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
  }

  _createClass(About, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'About'
        )
      );
    }
  }]);

  return About;
}(_react.Component);

exports.default = About;
module.exports = exports['default'];

},{"react":undefined}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Home'
        )
      );
    }
  }]);

  return Home;
}(_react.Component);

exports.default = Home;
module.exports = exports['default'];

},{"react":undefined}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_Component) {
  _inherits(Test, _Component);

  function Test() {
    _classCallCheck(this, Test);

    return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
  }

  _createClass(Test, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Test'
        )
      );
    }
  }]);

  return Test;
}(_react.Component);

exports.default = Test;
module.exports = exports['default'];

},{"react":undefined}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _About = require('./About');

Object.defineProperty(exports, 'About', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_About).default;
  }
});

var _Home = require('./Home');

Object.defineProperty(exports, 'Home', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Home).default;
  }
});

var _Test = require('./Test');

Object.defineProperty(exports, 'Test', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Test).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./About":9,"./Home":10,"./Test":11}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvY29tcG9uZW50cy9OYXZpZ2F0aW9uLmpzIiwiYXBwL2NvbXBvbmVudHMvaW5kZXguanMiLCJhcHAvY29udGFpbmVycy9BcHAuanMiLCJhcHAvY29udGFpbmVycy9pbmRleC5qcyIsImFwcC9pbmRleC5qcyIsImFwcC9yZWR1Y2Vycy9pbmRleC5qcyIsImFwcC9yb3V0ZXMuanMiLCJhcHAvc3RvcmUuanMiLCJhcHAvdmlld3MvQWJvdXQuanMiLCJhcHAvdmlld3MvSG9tZS5qcyIsImFwcC92aWV3cy9UZXN0LmpzIiwiYXBwL3ZpZXdzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRU0sVTs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLE1BQUssWUFBVjtBQUNFO0FBQUE7QUFBQSxZQUFJLFdBQVUsWUFBZDtBQUNFO0FBQUE7QUFBQSxjQUFJLFdBQVUsa0JBQWQ7QUFDRTtBQUFBO0FBQUEsZ0JBQU0sSUFBRyxHQUFUO0FBQUE7QUFBQTtBQURGLFdBREY7QUFJRTtBQUFBO0FBQUEsY0FBSSxXQUFVLGtCQUFkO0FBQ0U7QUFBQTtBQUFBLGdCQUFNLElBQUcsT0FBVDtBQUFBO0FBQUE7QUFERixXQUpGO0FBT0U7QUFBQTtBQUFBLGNBQUksV0FBVSxrQkFBZDtBQUNFO0FBQUE7QUFBQSxnQkFBTSxJQUFHLFFBQVQ7QUFBQTtBQUFBO0FBREY7QUFQRjtBQURGLE9BREY7QUFlRDs7Ozs7O2tCQUdZLFU7Ozs7Ozs7Ozs7Ozs7OzsrQ0N2Qk4sTzs7Ozs7Ozs7Ozs7Ozs7O0FDQVQ7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0lBRU0sRzs7Ozs7Ozs7Ozs7NkJBS0s7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBREYsU0FERjtBQUtFO0FBQUE7QUFBQTtBQUNJLGVBQUssS0FBTCxDQUFXO0FBRGYsU0FMRjtBQVNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQVRGLE9BREY7QUFlRDs7Ozs7O0FBckJHLEcsQ0FDRyxTLEdBQVk7QUFDakIsWUFBVSxvQkFBVSxNQUFWLENBQWlCO0FBRFYsQztrQkF1Qk4sRzs7Ozs7Ozs7Ozs7Ozs7O3dDQzdCTixPOzs7Ozs7Ozs7QUNBVDs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU0sZUFBZSxFQUFyQjtBQUNBLElBQU0sVUFBVSxvQ0FBaEI7QUFDQSxJQUFNLFFBQVEscUJBQWUsWUFBZixFQUE2QixPQUE3QixDQUFkOztBQUVBLHNCQUNFO0FBQUE7QUFBQSxJQUFVLE9BQU8sS0FBakI7QUFDRTtBQUFBO0FBQUEsTUFBaUIsU0FBUyxPQUExQjtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBREY7QUFERjtBQURGLENBREYsRUFRRSxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FSRjs7Ozs7Ozs7O0FDZEE7O0FBQ0E7O0FBRUEsSUFBTSxjQUFjLDRCQUFnQjtBQUNsQztBQURrQyxDQUFoQixDQUFwQjs7a0JBSWUsVzs7Ozs7Ozs7Ozs7O0FDUGY7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7OztJQU1xQixNOzs7Ozs7Ozs7Ozs2QkFDVjtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsNERBQU8sc0JBQVAsRUFBd0IsT0FBTyxJQUEvQixFQUFxQyxNQUFLLEdBQTFDLEdBREY7QUFFRSw0REFBTyx1QkFBUCxFQUF5QixNQUFLLFFBQTlCLEdBRkY7QUFHRSw0REFBTyxzQkFBUCxFQUF3QixNQUFLLE9BQTdCO0FBSEYsT0FERjtBQU9EOzs7Ozs7a0JBVGtCLE07Ozs7Ozs7OztrQkNGRyxjOztBQVB4Qjs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOzs7Ozs7QUFFZSxTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0MsT0FBdEMsRUFBK0M7QUFDNUQsTUFBTSxhQUFhLHVCQUVqQixnQ0FGaUIsRUFHakIsd0NBQWlCLE9BQWpCLENBSGlCLENBQW5CO0FBS0EsTUFBTSxRQUFRLDRDQUVaLHdDQUFtQixVQUFuQixDQUZZLENBQWQ7O0FBS0EsU0FBTyxLQUFQO0FBQ0Q7Ozs7Ozs7Ozs7OztBQ25CRDs7Ozs7Ozs7Ozs7O0lBRU0sSzs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixPQURGO0FBS0Q7Ozs7OztrQkFHWSxLOzs7Ozs7Ozs7Ozs7QUNaZjs7Ozs7Ozs7Ozs7O0lBRU0sSTs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixPQURGO0FBS0Q7Ozs7OztrQkFHWSxJOzs7Ozs7Ozs7Ozs7QUNaZjs7Ozs7Ozs7Ozs7O0lBRU0sSTs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixPQURGO0FBS0Q7Ozs7OztrQkFHWSxJOzs7Ozs7Ozs7Ozs7Ozs7MENDWk4sTzs7Ozs7Ozs7O3lDQUNBLE87Ozs7Ozs7Ozt5Q0FDQSxPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuXG5jbGFzcyBOYXZpZ2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bmF2IHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXZpZ2F0aW9uXCI+XG4gICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdmlnYXRpb25fX2l0ZW1cIj5cbiAgICAgICAgICAgIDxMaW5rIHRvPVwiL1wiPkhvbWU8L0xpbms+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2aWdhdGlvbl9faXRlbVwiPlxuICAgICAgICAgICAgPExpbmsgdG89XCIvdGVzdFwiPlRlc3Q8L0xpbms+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2aWdhdGlvbl9faXRlbVwiPlxuICAgICAgICAgICAgPExpbmsgdG89XCIvYWJvdXRcIj5BYm91dDwvTGluaz5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9uYXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hdmlnYXRpb25cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgTmF2aWdhdGlvbiB9IGZyb20gJy4vTmF2aWdhdGlvbidcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcblxuaW1wb3J0IHsgTmF2aWdhdGlvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMnXG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICA8TmF2aWdhdGlvbiAvPlxuICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICA8bWFpbj5cbiAgICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuICAgICAgICA8L21haW4+XG5cbiAgICAgICAgPGZvb3Rlcj5cbiAgICAgICAgICA8cD5Gb290ZXI8L3A+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBBcHAgfSBmcm9tICcuL0FwcCdcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBDb25uZWN0ZWRSb3V0ZXIgIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4J1xuaW1wb3J0IHsgY3JlYXRlQnJvd3Nlckhpc3RvcnkgfSBmcm9tICdoaXN0b3J5J1xuXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAnLi9zdG9yZSdcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnXG5pbXBvcnQgeyBBcHAgfSBmcm9tICcuL2NvbnRhaW5lcnMnXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHt9XG5jb25zdCBoaXN0b3J5ID0gY3JlYXRlQnJvd3Nlckhpc3RvcnkoKVxuY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZShpbml0aWFsU3RhdGUsIGhpc3RvcnkpXG5cbnJlbmRlcihcbiAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgPENvbm5lY3RlZFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fT5cbiAgICAgIDxBcHA+XG4gICAgICAgIDxSb3V0ZXMgLz5cbiAgICAgIDwvQXBwPlxuICAgIDwvQ29ubmVjdGVkUm91dGVyPlxuICA8L1Byb3ZpZGVyPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4pXG4iLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IHJvdXRlclJlZHVjZXIgYXMgcm91dGluZyB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCdcblxuY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuICByb3V0aW5nLFxufSlcblxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuXG5pbXBvcnQge1xuICBIb21lLFxuICBBYm91dCxcbiAgVGVzdCxcbn0gZnJvbSAnLi92aWV3cydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Um91dGUgY29tcG9uZW50PXtIb21lfSBleGFjdD17dHJ1ZX0gcGF0aD1cIi9cIiAvPlxuICAgICAgICA8Um91dGUgY29tcG9uZW50PXtBYm91dH0gcGF0aD1cIi9hYm91dFwiIC8+XG4gICAgICAgIDxSb3V0ZSBjb21wb25lbnQ9e1Rlc3R9IHBhdGg9XCIvdGVzdFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcbmltcG9ydCB7IHJvdXRlck1pZGRsZXdhcmUgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnXG5cbmltcG9ydCByZWR1Y2VycyBmcm9tICcuL3JlZHVjZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShpbml0aWFsU3RhdGUsIGhpc3RvcnkpIHtcbiAgY29uc3QgbWlkZGxld2FyZSA9IFtcbiAgICB0aHVuayxcbiAgICBjcmVhdGVMb2dnZXIoKSxcbiAgICByb3V0ZXJNaWRkbGV3YXJlKGhpc3RvcnkpLFxuICBdXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXG4gICAgcmVkdWNlcnMsXG4gICAgYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmUpLFxuICApXG5cbiAgcmV0dXJuIHN0b3JlXG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmNsYXNzIEFib3V0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+QWJvdXQ8L2gxPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmNsYXNzIEhvbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5Ib21lPC9oMT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmNsYXNzIFRlc3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5UZXN0PC9oMT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXN0XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIEFib3V0IH0gZnJvbSAnLi9BYm91dCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSG9tZSB9IGZyb20gJy4vSG9tZSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGVzdCB9IGZyb20gJy4vVGVzdCdcbiJdfQ==
