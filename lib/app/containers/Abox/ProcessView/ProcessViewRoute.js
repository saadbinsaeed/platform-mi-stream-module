"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _common = require("app/utils/propTypes/common");

var _ProcessRoute = _interopRequireDefault(require("app/containers/Abox/ProcessView/ProcessRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Abox Process Routes
 */
class ProcessViewRoute extends _react.PureComponent {
  /**
   * @override
   */
  render() {
    const {
      match
    } = this.props;
    return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/`,
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: "/"
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/:id`,
      component: _ProcessRoute.default
    }));
  }

}

_defineProperty(ProcessViewRoute, "propTypes", {
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string
  })
});

var _default = ProcessViewRoute;
exports.default = _default;