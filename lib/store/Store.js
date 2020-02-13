"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _history = require("history");

var _middleware = _interopRequireDefault(require("react-router-redux/lib/middleware"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _AffectliMiddleware = _interopRequireDefault(require("store/middleware/AffectliMiddleware"));

var _reducer = _interopRequireDefault(require("store/reducers/reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates the Redux store
 */
const initialState = (0, _Immutable.default)({}); //const sagaMiddleware: Object = createSagaMiddleware();

const routerHistoryMiddleware = (0, _middleware.default)((0, _history.createHashHistory)());
const middleware = [routerHistoryMiddleware, _reduxThunk.default, _AffectliMiddleware.default];
let enhance = null; // eslint-disable-next-line no-undef
// if ( __DEV__ ) {
//
//     const createLogger = require( 'redux-logger' );
//     middleware.push( createLogger( {
//         collapsed: true,
//     } ) );
//
//     const DevTools = require( '../components/dev/DevelopmentTools' ).default;
//
//     enhance = compose(
//         applyMiddleware(...middleware),
//         DevTools.instrument(),
//     );
//
// } else {

let devTool = f => f;

if (typeof window !== 'undefined') {
  devTool = window.devToolsExtension ? window.devToolsExtension() : f => f;
}

enhance = (0, _redux.compose)((0, _redux.applyMiddleware)(...middleware), devTool); // }
// Create the Redux store

const store = (0, _redux.createStore)(_reducer.default, initialState, enhance);
var _default = store;
exports.default = _default;