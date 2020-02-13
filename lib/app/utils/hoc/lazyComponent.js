"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _ErrorBoundary = _interopRequireDefault(require("app/components/atoms/ErrorBoundary/ErrorBoundary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// $FlowFixMe
const lazyComponent = Component => props => _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_react.Suspense, {
  fallback: _react.default.createElement(_Loader.default, {
    absolute: true,
    backdrop: true
  })
}, _react.default.createElement(Component, props)));

var _default = lazyComponent;
exports.default = _default;