"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Recipient Renderer displays the user group and recipient information
 */
class BroadcastEditRenderer extends _react.PureComponent {
  /**
   * Render
   */
  render() {
    const {
      data
    } = this.props;
    return _react.default.createElement(_reactRouterDom.Link, {
      to: `/broadcasts/edit/${data.id}`
    }, data.id);
  }

}

var _default = BroadcastEditRenderer;
exports.default = _default;