"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _env = require("app/utils/env");

var _appActions = require("store/actions/app/appActions");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _PopupMenu = _interopRequireDefault(require("app/components/molecules/PopupMenu/PopupMenu"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _headerSummary = _interopRequireDefault(require("app/components/molecules/header-summary/header-summary"));

var _headerSummaryItem = _interopRequireDefault(require("app/components/molecules/header-summary/header-summary-item"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _Pill = _interopRequireDefault(require("app/components/atoms/Pill/Pill"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const HeaderStyle = _styledComponents.default.header.withConfig({
  displayName: "Header__HeaderStyle",
  componentId: "sc-1sd0wyk-0"
})(["display:block;grid-area:header;width:100%;max-width:100%;z-index:100;height:", ";.inner{display:grid;grid-template-columns:auto 1fr auto;align-items:center;position:relative;max-width:100%;color:", ";font-size:inherit;min-height:", ";padding:0 .8rem;background:", ";z-index:5;}"], ({
  height,
  theme
}) => theme && height ? height : theme.header.height, ({
  textColor,
  theme
}) => theme && textColor ? theme.color[textColor] : theme.header.textColor, ({
  height,
  theme
}) => theme && height ? height : theme.header.height, ({
  color,
  theme
}) => color || theme.header.background);

const TitleContainer = _styledComponents.default.div.withConfig({
  displayName: "Header__TitleContainer",
  componentId: "sc-1sd0wyk-1"
})(["display:flex;flex-grow:1;flex-shrink:1;flex-direction:column;align-items:left;white-space:nowrap;position:relative;cursor:", ";text-overflow:ellipsis;overflow:hidden;"], props => (props.headerInfo || []).length ? 'pointer' : 'auto');

const HeaderTitle = (0, _styledComponents.default)(_Title.default).withConfig({
  displayName: "Header__HeaderTitle",
  componentId: "sc-1sd0wyk-2"
})(["white-space:nowrap;overflow:hidden;"]); // Make arrow bigger

const HeaderSubTitle = (0, _styledComponents.default)(_Title.default).withConfig({
  displayName: "Header__HeaderSubTitle",
  componentId: "sc-1sd0wyk-3"
})(["display:flex;align-items:center;white-space:nowrap;overflow:hidden;color:rgba(255,255,255,0.75);font-size:.7rem;font-weight:300;"]);
const HeaderInfoArrow = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "Header__HeaderInfoArrow",
  componentId: "sc-1sd0wyk-4"
})(["position:absolute;bottom:-11px;display:none;&::before{color:", ";z-index:10;}"], ({
  theme
}) => theme.header.textColor);

const HeaderColumn = _styledComponents.default.div.withConfig({
  displayName: "Header__HeaderColumn",
  componentId: "sc-1sd0wyk-5"
})(["white-space:nowrap;", ""], ({
  menu
}) => menu ? 'padding-right: 1rem' : '');

const HeaderButtonIcon = (0, _styledComponents.default)(_ButtonIcon.default).withConfig({
  displayName: "Header__HeaderButtonIcon",
  componentId: "sc-1sd0wyk-6"
})(["& .Icon:before{color:white;}"]);

const HeaderInfoPanel = _styledComponents.default.div.withConfig({
  displayName: "Header__HeaderInfoPanel",
  componentId: "sc-1sd0wyk-7"
})(["position:absolute;left:0;right:0;top:60px;background:", ";", ";box-shadow:", ";"], ({
  theme
}) => theme.base.background, ({
  active
}) => active ? 'display: block' : 'display: none', ({
  theme
}) => theme.shadow.z2);

const AddMenu = props => {
  const {
    isAdmin,
    permissions
  } = props.profile;
  const permissionsSet = new Set(permissions || []);
  return _react.default.createElement("div", null, _react.default.createElement(_MenuItem.default, {
    name: "My Apps",
    to: "/abox/processes-new"
  }), (isAdmin || permissionsSet.has('admin.group.add')) && _react.default.createElement(_MenuItem.default, {
    name: "Add a group",
    to: "/groups/add",
    isModal: true
  }), (isAdmin || permissionsSet.has('entity.person.add')) && _react.default.createElement(_MenuItem.default, {
    name: "Add a person",
    to: "/people/add",
    isModal: true
  }), (isAdmin || permissionsSet.has('entity.thing.add')) && _react.default.createElement(_MenuItem.default, {
    name: "Add a thing",
    to: "/things/add",
    isModal: true
  }), (isAdmin || permissionsSet.has('entity.organisation.add')) && _react.default.createElement(_MenuItem.default, {
    name: "Add an organisation",
    to: "/organisations/add",
    isModal: true
  }), (isAdmin || permissionsSet.has('entity.custom.add')) && _react.default.createElement(_MenuItem.default, {
    name: "Add a custom entity",
    to: "/custom-entities/add",
    isModal: true
  }), (isAdmin || permissionsSet.has('admin.user.add')) && _react.default.createElement(_MenuItem.default, {
    name: "Add a user",
    to: "/user-management/add",
    isModal: true
  }), (isAdmin || permissionsSet.has('entity.classification.add')) && _react.default.createElement(_MenuItem.default, {
    name: "Add a classification",
    to: "/classifications/add",
    isModal: true
  }), (isAdmin || permissionsSet.has('broadcast.add')) && _react.default.createElement(_MenuItem.default, {
    name: "Add a broadcast",
    to: "/broadcasts/add",
    isModal: true
  }));
};
/**
 * The main application header
 */


class AppHeader extends _react.PureComponent {
  /**
   * Set our default state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleInfo", () => {
      this.setState({
        showInfo: !this.state.showInfo
      });
    });

    this.state = {
      showInfo: false
    };
  }
  /**
   *
   */


  componentDidUpdate(prevProps) {
    const {
      subTitle
    } = this.props.app.headers;
    const prevsSubTitle = prevProps.app.headers.subTitle;

    if (prevsSubTitle !== subTitle && this.state.showInfo) {
      this.setState({
        showInfo: false
      });
    }
  }
  /**
   * Show/Hide the summary panel
   */


  /**
   * Render our page template
   */
  render() {
    // console.log('header', this.props.app || {});
    const {
      title,
      subTitle,
      headerInfo,
      pillText,
      actions,
      menuItems,
      color
    } = this.props.app.headers;
    const summaryItems = headerInfo ? headerInfo.map(item => _react.default.createElement(_headerSummaryItem.default, {
      key: item.key
    }, _react.default.createElement(_Label.default, null, item.key), _react.default.createElement(_Text.default, null, item.value))) : null;
    return _react.default.createElement(HeaderStyle, {
      color: (0, _lo.get)(color, 'background')
    }, _react.default.createElement("div", {
      className: "inner"
    }, _react.default.createElement(HeaderColumn, {
      menu: true
    }, !_env.isIframe && _react.default.createElement(HeaderButtonIcon, {
      icon: "menu",
      iconColor: "white",
      onClick: this.props.toggleNav
    })), _react.default.createElement(TitleContainer, {
      onClick: this.toggleInfo,
      headerInfo: headerInfo
    }, title && title ? _react.default.createElement(HeaderTitle, {
      as: "h1"
    }, title) : _react.default.createElement(_Icon.default, {
      type: "af",
      name: "logo",
      size: "lg"
    }), (subTitle || pillText) && _react.default.createElement(HeaderSubTitle, {
      as: "h2"
    }, pillText && _react.default.createElement(_Pill.default, {
      textColor: "secondary",
      backgroundColor: "white",
      style: {
        marginRight: '5px'
      }
    }, pillText), " ", subTitle), (headerInfo || []).length > 0 && _react.default.createElement(HeaderInfoArrow, {
      name: "arrow-down-bold",
      size: "xs"
    })), _react.default.createElement(HeaderColumn, null, actions, _react.default.createElement(_PopupMenu.default, {
      inline: true,
      right: true,
      content: _react.default.createElement(AddMenu, {
        profile: this.props.profile
      })
    }, _react.default.createElement(HeaderButtonIcon, {
      icon: "plus",
      iconColor: "white"
    })), menuItems && _react.default.createElement(_PopupMenu.default, {
      inline: true,
      right: true,
      content: menuItems
    }, _react.default.createElement(HeaderButtonIcon, {
      icon: "dots-vertical",
      iconColor: "white"
    })))), (headerInfo || []).length > 0 && _react.default.createElement(HeaderInfoPanel, {
      active: this.state.showInfo
    }, _react.default.createElement(_headerSummary.default, null, summaryItems)));
  }

}

_defineProperty(AppHeader, "propTypes", {
  app: _propTypes.default.object,
  title: _propTypes.default.string,
  subTitle: _propTypes.default.string,
  headerInfo: _propTypes.default.object,
  toggleNav: _propTypes.default.func,
  // toggleChat: PropTypes.func,
  // toggleNotifications: PropTypes.func,
  profile: _propTypes.default.object.isRequired
});

const mapStateToProps = state => ({
  app: state.app,
  profile: state.user.profile
});

const mapDispatchToProps = dispatch => ({
  toggleNav: (0, _redux.bindActionCreators)(_appActions.toggleNav, dispatch),
  toggleChat: (0, _redux.bindActionCreators)(_appActions.toggleChat, dispatch),
  toggleNotifications: (0, _redux.bindActionCreators)(_appActions.toggleNotifications, dispatch)
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AppHeader);

exports.default = _default;