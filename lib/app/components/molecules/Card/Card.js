"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Image = _interopRequireDefault(require("app/components/atoms/Image/Image"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _HeaderActions = _interopRequireDefault(require("app/components/atoms/HeaderActions/HeaderActions"));

var _common = require("app/utils/propTypes/common");

var _ButtonIcon = _interopRequireDefault(require("../ButtonIcon/ButtonIcon"));

var _CardHeader = _interopRequireDefault(require("./CardHeader"));

var _CardFooter = _interopRequireDefault(require("./CardFooter"));

var _CardContent = _interopRequireDefault(require("./CardContent"));

var _CardMeta = _interopRequireDefault(require("./CardMeta"));

var _CardDescription = _interopRequireDefault(require("./CardDescription"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CardStyle = _styledComponents.default.div.withConfig({
  displayName: "Card__CardStyle",
  componentId: "sc-9m3nwx-0"
})(["position:relative;display:block;border-radius:.2rem;margin:0 0 1rem 0;background:", ";box-shadow:", ";"], ({
  theme,
  transparent
}) => transparent ? 'transparent' : theme.widget.background, ({
  theme
}) => theme.shadow.z1); // workaround for #4051


const CollapsibleContainer = _styledComponents.default.div.withConfig({
  displayName: "Card__CollapsibleContainer",
  componentId: "sc-9m3nwx-1"
})(["display:block;", ";"], ({
  isCollapsed
}) => isCollapsed ? 'display: none;' : '');
/**
 * Create our card component
 */


class Card extends _react.Component {
  /**
   * PropTypes
   */

  /**
   * Create our default state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleCollapse", e => {
      e.preventDefault();
      const isCollapsed = !this.state.isCollapsed;
      this.setState({
        isCollapsed
      }, () => {
        const {
          handleCollapsed
        } = this.props;

        if (handleCollapsed) {
          handleCollapsed(isCollapsed);
        }
      });
    });

    _defineProperty(this, "renderTitle", title => {
      return (0, _utils.isObject)(title) ? title : title && _react.default.createElement(_Title.default, null, title || []);
    });

    this.state = {
      isCollapsed: this.props.collapsed || false
    };
  }
  /**
   * @override
   */


  componentDidUpdate(prevProps, prevState) {
    const {
      collapsed
    } = this.props;

    if ((0, _utils.isDefined)(collapsed) && collapsed !== prevProps.collapsed) {
      this.setState({
        isCollapsed: collapsed
      });
    }
  }
  /**
   * Toggle our dropdown content
   */


  /**
   * Render our card component
   */
  render() {
    const {
      headerPadding,
      image,
      icon,
      title,
      className,
      headerActions,
      meta,
      description,
      footer,
      collapsible,
      titleActions,
      children,
      descriptionPadding,
      headerColor,
      transparent
    } = this.props;
    return _react.default.createElement(CardStyle, {
      className: className,
      transparent: transparent
    }, children, title || titleActions || headerActions || collapsible ? _react.default.createElement(_CardHeader.default, {
      headerColor: headerColor,
      headerPadding: headerPadding,
      isCollapsed: this.state.isCollapsed
    }, this.renderTitle(title), titleActions && _react.default.createElement("span", {
      style: {
        width: '100%',
        paddingRight: '9px'
      }
    }, " ", titleActions, " "), _react.default.createElement(_HeaderActions.default, {
      headerPadding: headerPadding
    }, headerActions || [], collapsible && _react.default.createElement(_ButtonIcon.default, {
      icon: this.state.isCollapsed ? 'arrow-down' : 'arrow-up',
      size: "sm",
      onClick: this.toggleCollapse
    }))) : null, image && _react.default.createElement("div", null, _react.default.createElement(_Image.default, {
      src: image,
      fluid: true
    })), icon && _react.default.createElement("div", null, _react.default.createElement(_Icon.default, {
      name: image
    })), _react.default.createElement(CollapsibleContainer, {
      isCollapsed: this.state.isCollapsed
    }, _react.default.createElement(_CardContent.default, null, meta && _react.default.createElement(_CardMeta.default, null, meta), description && _react.default.createElement(_CardDescription.default, {
      descriptionPadding: descriptionPadding
    }, description)), footer && _react.default.createElement(_CardFooter.default, null, footer)));
  }

}

_defineProperty(Card, "propTypes", {
  className: _propTypes.default.string,
  image: _propTypes.default.string,
  icon: _propTypes.default.string,
  title: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  headerActions: _propTypes.default.element,
  headerPadding: _propTypes.default.bool,
  headerColor: _propTypes.default.string,
  descriptionPadding: _propTypes.default.bool,
  titleActions: _propTypes.default.element,
  meta: _propTypes.default.arrayOf(_propTypes.default.element),
  collapsible: _propTypes.default.bool,
  collapsed: _propTypes.default.bool,
  handleCollapsed: _propTypes.default.func,
  description: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  footer: _propTypes.default.element,
  transparent: _propTypes.default.bool,
  children: _common.ChildrenProp
});

_defineProperty(Card, "defaultProps", {
  headerPadding: true,
  descriptionPadding: true,
  transparent: false
});

var _default = Card;
exports.default = _default;