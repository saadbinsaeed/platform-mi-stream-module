"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _IFrame = _interopRequireDefault(require("app/components/atoms/IFrame/IFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Renders the view to display the classification.
 */
class Designer extends _react.Component {
  /**
   * @override
   */
  render() {
    return _react.default.createElement(_PageTemplate.default, {
      title: "Designer",
      overflowHidden: true
    }, _react.default.createElement(_IFrame.default, {
      title: "Designer",
      src: "/activiti/editor/"
    }));
  }

}

var _default = Designer;
exports.default = _default;