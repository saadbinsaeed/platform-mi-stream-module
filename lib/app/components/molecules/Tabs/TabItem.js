"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TabItemStyle = _styledComponents.default.div.withConfig({
  displayName: "TabItem__TabItemStyle",
  componentId: "sc-18ie1mb-0"
})(["display:inline-block;text-align:center;white-space:nowrap;overflow:hidden;min-width:100px;max-width:200px;padding:.8rem 2rem;bottom:0;color:", ";opacity:0.7;& a{display:block;color:", ";}&.active{background:", ";@media(min-width:", "){background:", ";}font-weight:500;opacity:1;}"], ({
  theme
}) => theme.color.white, ({
  theme
}) => theme.color.white, ({
  theme
}) => `linear-gradient(to bottom, transparent 0%, transparent 92%, ${theme.color.white} 92%, ${theme.color.white} 100%)`, ({
  theme
}) => theme.media.sm, ({
  theme
}) => `linear-gradient(to bottom, transparent 0%, transparent 95%, ${theme.color.white} 95%, ${theme.color.white} 100%)`);

const TabLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "TabItem__TabLink",
  componentId: "sc-18ie1mb-1"
})(["display:inline-block;color:", ";"], ({
  theme
}) => theme.base.textColor);
/**
 * Tab Item component
 */

class TabItem extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "setActive", () => {
      this.props.selectTab && this.props.selectTab();
    });
  }

  /**
   * Render our tab item
   */
  render() {
    const {
      label,
      to,
      activeOnlyWhenExact
    } = this.props;
    return _react.default.createElement(_reactRouterDom.Route // eslint-disable-next-line react/no-children-prop
    , {
      path: to,
      exact: activeOnlyWhenExact,
      children: ({
        match
      }) => {
        if (match) {
          setTimeout(this.props.selectTab, 300);
        }

        return _react.default.createElement(TabLink, {
          to: to
        }, _react.default.createElement(TabItemStyle, _extends({
          className: match ? 'active' : '',
          onClick: this.setActive,
          innerRef: el => {
            this.props.register && this.props.register(el);
          }
        }, this.props), label));
      }
    });
  }

}

TabItem.propTypes = {
  label: _propTypes.default.string,
  to: _propTypes.default.any.isRequired,
  activeOnlyWhenExact: _propTypes.default.bool,
  selectTab: _propTypes.default.func,
  register: _propTypes.default.func
};
var _default = TabItem;
exports.default = _default;