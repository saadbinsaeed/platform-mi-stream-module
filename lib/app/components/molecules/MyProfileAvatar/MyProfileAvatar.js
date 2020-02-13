"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _Popover = _interopRequireDefault(require("app/components/molecules/Popover/Popover"));

var _MyProfilePopoverContent = _interopRequireDefault(require("./MyProfilePopoverContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the logged user avatar.
 */
class MyProfileAvatar extends _react.PureComponent {
  /**
   * @override
   */
  render() {
    const {
      profile
    } = this.props;
    return _react.default.createElement("div", null, _react.default.createElement(_Popover.default, {
      placement: "top right",
      width: "260px",
      content: _react.default.createElement(_MyProfilePopoverContent.default, null)
    }, _react.default.createElement(_Avatar.default, {
      src: profile.image,
      size: "lg",
      name: profile.name
    })));
  }

}

_defineProperty(MyProfileAvatar, "propTypes", {
  profile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  profile: state.user.profile
}))(MyProfileAvatar);

exports.default = _default;