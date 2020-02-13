"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _Alert = _interopRequireDefault(require("app/components/molecules/Alert/Alert"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * If the user is not allowed to see the page.
 */
class PageNotAllowed extends _react.Component {
  /**
   * @override
   */
  render() {
    const {
      title,
      errorOptions
    } = this.props;
    return _react.default.createElement(_PageTemplate.default, {
      title: errorOptions.isError ? 'Error' : 'User is not allowed',
      overflowHidden: true
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Flex.default, {
      grow: true,
      style: {
        height: '100%',
        justifyContent: 'center'
      }
    }, _react.default.createElement(_Alert.default, {
      type: "error"
    }, _react.default.createElement("div", null, errorOptions.isError ? errorOptions.detail : _react.default.createElement("p", null, "You have no permission to see selected ", _react.default.createElement("b", null, title))), _react.default.createElement("div", null, "Click here to navigate to ", _react.default.createElement(_reactRouterDom.Link, {
      to: "/",
      style: {
        color: 'purple'
      }
    }, "homepage"), ".")))));
  }

}

_defineProperty(PageNotAllowed, "propTypes", {
  title: _propTypes.default.string,
  errorOptions: _propTypes.default.object
});

const mapStateToProps = state => {
  return {
    errorOptions: state.app.errorOptions
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {})(PageNotAllowed);

exports.default = _default;