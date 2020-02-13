"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactApollo = require("react-apollo");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _platformUi = require("@mic3/platform-ui");

var _AppRoute = _interopRequireDefault(require("app/containers/App/AppRoute"));

var _theme = _interopRequireDefault(require("app/themes/theme.default"));

var _client = require("graphql/client");

var _Store = _interopRequireDefault(require("store/Store"));

require("style/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-unused-expressions
_styledComponents.injectGlobal`
    *, *:after, *:before {
        box-sizing: border-box;
    }
    *:focus {
        outline: none;
    }
   html {
    height: 100%;
    min-height: 100%;
    font-size: 16px;
    line-height: 1.5;
    font-family: 'Roboto', sans-serif;
   }
  body {
    font-size: 1rem;
    height: 100%;
    position: relative;
    margin:0; padding: 0;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Roboto', sans-serif;
    background: ${_theme.default.base.background};
  }
   #root, .AppContainer {
        height: 100%;
        position: relative;
        overflow: hidden;
        font-family: 'Roboto', sans-serif;
    }
    .fullHeight {
       height: 100%;
       min-height: 100%;
    }
    .fullHeight.withTabs {
        height: calc(100% - 51px);
        min-height: calc(100% - 51px);
    }
    .fullHeight.withTabsAndFooter {
        height: calc(100% - 113px);
        min-height: calc(100% - 113px);
        overflow: auto;
    }
    .block {
        display: block;
    }
    a {
      cursor: pointer;
    }
    h1 {
        font-size: 1.2em;
    }
    h2 {
        font-size: 1em;
    }
    h3 {
        font-size: .9em;
    }
    h4 {
        font-size: .8em;
    }
    .ui-datepicker-today .ui-state-highlight {
      color: ${_theme.default.base.textColor};
      background: transparent;
    }
    .ui-autocomplete, .ui-autocomplete-multiple-container {
      width: 100% !important;
    }
`;

const MainApp = () => _react.default.createElement(_platformUi.PuiProvider, null, _react.default.createElement(_styledComponents.ThemeProvider, {
  theme: _theme.default
}, _react.default.createElement(_reactApollo.ApolloProvider, {
  client: _client.client
}, _react.default.createElement(_reactRedux.Provider, {
  store: _Store.default
}, _react.default.createElement("div", {
  className: "app"
}, _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(_reactRouterDom.Route, {
  path: "/",
  component: _AppRoute.default
})))))));

exports.MainApp = MainApp;