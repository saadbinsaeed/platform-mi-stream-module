"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _HeaderActions = _interopRequireDefault(require("app/components/atoms/HeaderActions/HeaderActions"));

var _RoundedIndicator = _interopRequireDefault(require("app/components/atoms/RoundedIndicator/RoundedIndicator"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// UI IMPORTS
// STYLE IMPORTS
const MenuItemStyle = _styledComponents.default.li.withConfig({
  displayName: "MenuItem__MenuItemStyle",
  componentId: "sc-1m4ody2-0"
})(["display:flex;justify-content:space-between;align-items:stretch;padding:1rem 0;cursor:pointer;flex:1;position:relative;margin:0;list-style:none;i{line-height:0;}a{color:#fff;}&.active{color:", ";background:", ";}& .Menu{position:absolute;display:none;background:white;border:solid 1px ", ";top:0;z-index:10;}&:hover{background:", ";.Menu{display:block;}}"], ({
  theme
}) => theme.color.primary, ({
  theme
}) => theme.menu.hover.background, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.menu.hover.background);

const MenuItemStyleWithLink = (0, _styledComponents.default)(MenuItemStyle).withConfig({
  displayName: "MenuItem__MenuItemStyleWithLink",
  componentId: "sc-1m4ody2-1"
})(["padding:0;"]);

const MenuItemText = _styledComponents.default.div.withConfig({
  displayName: "MenuItem__MenuItemText",
  componentId: "sc-1m4ody2-2"
})(["flex:1;display:flex !important;align-items:center;cursor:pointer;padding-left:1rem;padding-right:1rem;"]);

const MenuCount = (0, _styledComponents.default)(_RoundedIndicator.default).withConfig({
  displayName: "MenuItem__MenuCount",
  componentId: "sc-1m4ody2-3"
})(["width:1.5rem;height:1rem;font-size:.7rem;margin-left:.5rem;"]);

const IconWrap = _styledComponents.default.div.withConfig({
  displayName: "MenuItem__IconWrap",
  componentId: "sc-1m4ody2-4"
})(["padding:0 0 0 1rem;display:flex;align-items:center;"]);

const StyledHeaderActions = (0, _styledComponents.default)(_HeaderActions.default).withConfig({
  displayName: "MenuItem__StyledHeaderActions",
  componentId: "sc-1m4ody2-5"
})(["padding:1rem;"]);
const StyledLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "MenuItem__StyledLink",
  componentId: "sc-1m4ody2-6"
})(["width:100%;text-decoration:none;padding:1rem 0;display:flex;justify-content:space-between;align-items:stretch;"]);

const MenuItem = props => {
  const {
    children,
    name,
    icon,
    iconColor,
    iconSize,
    iconType,
    count,
    actions,
    to,
    isModal,
    className,
    ...rest
  } = props;

  if (!to) {
    return _react.default.createElement(MenuItemStyle, _extends({
      className: className,
      to: to
    }, rest), icon && _react.default.createElement(IconWrap, null, _react.default.createElement(_Icon.default, {
      name: icon,
      color: iconColor,
      type: iconType,
      size: iconSize
    })), _react.default.createElement(MenuItemText, {
      to: to,
      icon: icon,
      className: 'MenuItemText'
    }, name && _react.default.createElement("span", null, name), " ", children && _react.default.createElement("span", {
      style: {
        width: '100%'
      }
    }, children), " ", count && _react.default.createElement(MenuCount, {
      count: count
    })), actions && _react.default.createElement(_HeaderActions.default, null, actions));
  }

  let path = {};

  if (typeof to === 'object') {
    path = isModal ? {
      pathname: to.to,
      state: { ...to.state,
        modal: isModal
      }
    } : to;
  } else {
    path = {
      pathname: to
    };
  }

  return _react.default.createElement(MenuItemStyleWithLink, _extends({
    className: className,
    to: path
  }, rest), _react.default.createElement(StyledLink, {
    to: path.pathname
  }, icon && _react.default.createElement(IconWrap, null, _react.default.createElement(_Icon.default, {
    name: icon,
    color: iconColor,
    type: iconType,
    size: iconSize
  })), _react.default.createElement(MenuItemText, {
    to: to,
    icon: icon,
    className: 'MenuItemText'
  }, name && _react.default.createElement("span", null, name), children && _react.default.createElement("span", {
    style: {
      width: '100%'
    }
  }, children), count && _react.default.createElement(MenuCount, {
    count: count
  }))), actions && _react.default.createElement(StyledHeaderActions, null, actions));
};

MenuItem.propTypes = {
  name: _propTypes.default.string,
  count: _propTypes.default.number,
  icon: _propTypes.default.string,
  iconColor: _propTypes.default.string,
  iconSize: _propTypes.default.string,
  iconType: _propTypes.default.string,
  className: _propTypes.default.string,
  to: _propTypes.default.any,
  isModal: _propTypes.default.bool,
  activeOnlyWhenExact: _propTypes.default.bool,
  children: _common.ChildrenProp,
  actions: _common.ChildrenProp
};
var _default = MenuItem;
exports.default = _default;