"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _appActions = require("store/actions/app/appActions");

var _common = require("app/utils/propTypes/common");

var _PageContent = _interopRequireDefault(require("app/components/molecules/PageContent/PageContent"));

var _ErrorBoundary = _interopRequireDefault(require("app/components/atoms/ErrorBoundary/ErrorBoundary"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Layout that controls the page
 */
class PageTemplate extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "setHeaderProps", props => {
      const {
        title,
        subTitle,
        info,
        pillText,
        actions,
        menuItems,
        color
      } = props;
      const Headers = {
        title: title || '',
        subTitle: subTitle || '',
        headerInfo: info || [],
        pillText: pillText || '',
        actions: actions || '',
        menuItems: menuItems || '',
        color: color || {}
      };
      this.props.setHeader(Headers);
    });
  }

  /**
   * Try push to store onMount
   */
  componentDidMount() {
    this.setHeaderProps(this.props);
  }
  /**
   * Update state when changes are pushed
   * @param prevProps
   */


  componentDidUpdate(prevProps) {
    const {
      title,
      subTitle,
      info,
      menuItems,
      color
    } = this.props;

    if (prevProps.title !== title || prevProps.subTitle !== subTitle || !(0, _utils.deepEquals)(prevProps.info, info) || prevProps.menuItems !== menuItems || prevProps.color !== color) {
      this.setHeaderProps(this.props);
    }
  }
  /**
   * Update our headers func
   */


  /**
   * Render our page template
   */
  render() {
    // console.log('PageTemplateProps', this.props);
    const {
      overflowHidden,
      children
    } = this.props;
    return _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_PageContent.default, {
      overflowHidden: overflowHidden
    }, children));
  }

}

_defineProperty(PageTemplate, "propTypes", {
  title: _propTypes.default.string,
  subTitle: _propTypes.default.string,
  info: _propTypes.default.array,
  color: _propTypes.default.object,
  // app: PropTypes.object,
  overflowHidden: _propTypes.default.bool,
  children: _common.ChildrenProp,
  setHeader: _propTypes.default.func
});

var _default = (0, _reactRedux.connect)(null, {
  setHeader: _appActions.setHeader
})(PageTemplate);

exports.default = _default;