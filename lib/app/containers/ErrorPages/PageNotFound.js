"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _react = _interopRequireWildcard(require("react"));

var _Alert = _interopRequireDefault(require("app/components/molecules/Alert/Alert"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 404 page container
 */
class PageNotFound extends _react.Component {
  /**
   * @override
   */
  render() {
    return _react.default.createElement(_PageTemplate.default, {
      title: "Page not found",
      overflowHidden: true
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Flex.default, {
      grow: true,
      style: {
        height: '100%',
        justifyContent: 'center'
      }
    }, _react.default.createElement(_Alert.default, {
      type: "error"
    }, _react.default.createElement("h2", null, "Page Not Found.")))));
  }

}

var _default = PageNotFound;
exports.default = _default;