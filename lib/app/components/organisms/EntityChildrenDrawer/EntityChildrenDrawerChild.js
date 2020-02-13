"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _moment = _interopRequireDefault(require("moment"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _Tag = _interopRequireDefault(require("app/components/atoms/Tag/Tag"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SubTitle = _styledComponents.default.span.withConfig({
  displayName: "EntityChildrenDrawerChild__SubTitle",
  componentId: "sc-1ov51wu-0"
})(["font-size:0.8rem;color:", ";font-weight:normal;"], ({
  theme
}) => theme.color.gray);

const StyledLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "EntityChildrenDrawerChild__StyledLink",
  componentId: "sc-1ov51wu-1"
})(["text-decoration:none;&:hover{text-decoration:underline;}"]);
const StyledTag = (0, _styledComponents.default)(_Tag.default).withConfig({
  displayName: "EntityChildrenDrawerChild__StyledTag",
  componentId: "sc-1ov51wu-2"
})(["padding:1px 7px;font-size:11px;line-height:1.5;"]);
const StyledTitleText = (0, _styledComponents.default)(_Text.default).withConfig({
  displayName: "EntityChildrenDrawerChild__StyledTitleText",
  componentId: "sc-1ov51wu-3"
})(["max-width:165px;display:block;"]);

const StyledText = _styledComponents.default.div.withConfig({
  displayName: "EntityChildrenDrawerChild__StyledText",
  componentId: "sc-1ov51wu-4"
})(["white-space:normal;"]);

const StyledListItem = (0, _styledComponents.default)(_ListItem.default).withConfig({
  displayName: "EntityChildrenDrawerChild__StyledListItem",
  componentId: "sc-1ov51wu-5"
})(["border-bottom:1px solid #607076;&.selected{background-color:#364951;}&:last-item{border-bottom:none;}"]);
/**
 * EntityChildrenDrawer to display children navigation for entities
 *
 * if in the future we would need prefetch children list for each child do it in componentDidMount
 */

class EntityChildrenDrawerChild extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      showAllClasses: false
    });

    _defineProperty(this, "showAllClasses", event => {
      event.preventDefault();
      this.setState({
        showAllClasses: true
      });
    });

    _defineProperty(this, "hideExtraClasses", event => {
      event.preventDefault();
      this.setState({
        showAllClasses: false
      });
    });

    _defineProperty(this, "onNavigateRightClick", event => {
      event.preventDefault();
      this.props.load(this.props.id);
    });
  }

  render() {
    const {
      modifiedDate,
      className
    } = this.props;
    const id = String(this.props.id);
    const lastUpdate = this.constructor.lastUpdate(modifiedDate);
    const subTitle = `#${id} • ${lastUpdate}`;
    const subTitleTitle = `ID: #${id} • Last Time Updated: ${lastUpdate}`;
    return _react.default.createElement(StyledListItem, {
      className: className,
      component: _react.default.createElement(StyledLink, {
        to: this.props.getLink(this.props.id)
      }, _react.default.createElement(_Avatar.default, {
        src: this.props.image,
        name: this.props.name,
        size: "xl"
      })),
      title: _react.default.createElement(StyledLink, {
        to: this.props.getLink(this.props.id)
      }, _react.default.createElement(StyledTitleText, {
        title: this.props.name
      }, this.props.name)),
      subTitle: _react.default.createElement(SubTitle, null, _react.default.createElement(StyledTitleText, {
        title: subTitleTitle
      }, subTitle)),
      text: _react.default.createElement(StyledText, null, this.renderClasses()),
      actions: _react.default.createElement(_ButtonIcon.default, {
        icon: "chevron-right",
        onClick: this.onNavigateRightClick
      })
    });
  }

  renderClasses() {
    const classes = this.constructor.getClasses(this.props.classes, this.props.classesLimit, this.state.showAllClasses);

    if (!classes) {
      return null;
    }

    const more = ((0, _utils.getNum)(this, 'props.classes.length') || 0) - ((0, _utils.getNum)(this, 'props.classesLimit') || 0);
    return _react.default.createElement(_react.Fragment, null, classes.map(({
      id,
      name,
      uri,
      color
    }, index) => _react.default.createElement(StyledTag, {
      title: uri,
      color: color,
      key: index
    }, name)), more > 0 && (!this.state.showAllClasses ? _react.default.createElement(StyledTag, {
      title: 'Click to see more classifications',
      onClick: this.showAllClasses,
      color: 'gray'
    }, "+", more) : _react.default.createElement(StyledTag, {
      title: 'Click to see less classifications',
      onClick: this.hideExtraClasses,
      color: 'gray'
    }, "-", more)));
  }

}

_defineProperty(EntityChildrenDrawerChild, "defaultProps", {
  image: null,
  classes: [],
  classesLimit: 3
});

_defineProperty(EntityChildrenDrawerChild, "getClasses", (0, _memoizeOne.default)((classes, limit = 3, showAll = false) => {
  if (!classes || classes.length === 0) {
    return null;
  }

  if (showAll) {
    return classes;
  }

  return classes.slice(0, limit);
}));

_defineProperty(EntityChildrenDrawerChild, "lastUpdate", (0, _memoizeOne.default)(date => {
  return (0, _moment.default)(date).fromNow();
}));

var _default = EntityChildrenDrawerChild;
exports.default = _default;