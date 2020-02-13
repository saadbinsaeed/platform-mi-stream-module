"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _FormDesigner = _interopRequireDefault(require("app/containers/Designer/Form/FormDesigner"));

var _Forms = _interopRequireDefault(require("app/containers/Designer/Forms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Defines the routes for the Designer views
 */
class DesignerRoute extends _react.Component {
  /**
   * @override
   */
  render() {
    const {
      match
    } = this.props;
    return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/forms`,
      component: _Forms.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/form/:id`,
      component: _FormDesigner.default
    }));
  }

}

_defineProperty(DesignerRoute, "propTypes", {
  match: _propTypes.default.object.isRequired
});

var _default = DesignerRoute;
exports.default = _default;