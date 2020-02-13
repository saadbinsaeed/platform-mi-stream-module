"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Growl = require("primereact/components/growl/Growl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ToastrStyle = _styledComponents.default.span.withConfig({
  displayName: "Toastr__ToastrStyle",
  componentId: "ahaa40-0"
})(["p{font-weight:bold !important;}.ui-growl{z-index:99999 !important;}.ui-growl-message-error{background:", " !important;}.ui-growl-message-info{background:", " !important;}.ui-growl-message-warn{background:", " !important;}.ui-growl-message-success{background:", " !important;}"], ({
  theme
}) => theme.color.error, ({
  theme
}) => theme.color.info, ({
  theme
}) => theme.color.warning, ({
  theme
}) => theme.color.success);
/**
 * Toastr container
 */


class ToastrContainer extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "toastr", void 0);
  }

  /**
   * @override
   */
  componentDidUpdate(prevProps) {
    const {
      detail
    } = this.props.options;
    const modifiedWords = (detail || '').split(' ').map(word => {
      if (word.length > 25) {
        return `${word.substring(0, 12)}...${word.slice(-10)}`;
      }

      return word;
    });
    this.toastr.show({ ...this.props.options,
      detail: (modifiedWords || []).join(' '),
      life: 5000
    });
  }
  /**
   * @override
   */


  render() {
    return _react.default.createElement(ToastrStyle, null, _react.default.createElement(_Growl.Growl, {
      ref: el => {
        this.toastr = el;
      }
    }));
  }

}

_defineProperty(ToastrContainer, "propTypes", {
  options: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  options: state.app.toastrOptions
}), null)(ToastrContainer);

exports.default = _default;