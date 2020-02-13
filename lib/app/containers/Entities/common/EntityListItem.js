"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _EntityLink = _interopRequireDefault(require("app/components/atoms/Link/EntityLink"));

var _EntityAvatar = _interopRequireDefault(require("app/components/atoms/Avatar/EntityAvatar"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ListItemStyled = (0, _styledComponents.default)(_ListItem.default).withConfig({
  displayName: "EntityListItem__ListItemStyled",
  componentId: "d4tzze-0"
})(["width:100%;max-width:1024px;margin:0 auto;@media (max-width:1100px ){padding-right:2rem;}"]);
/**
 * A single entity item
 */

class EntityListItem extends _react.PureComponent {
  render() {
    const {
      data: {
        name,
        id
      },
      type,
      selected,
      ...rest
    } = this.props;
    return _react.default.createElement(ListItemStyled, _extends({}, rest, {
      component: this.renderAvatar(),
      title: _react.default.createElement(_EntityLink.default, {
        id: id,
        type: type
      }, name || 'No Name'),
      subTitle: _react.default.createElement(_EntityLink.default, {
        id: id,
        type: type
      }, "#", id),
      raised: true
    }));
  }

  renderAvatar() {
    const {
      selected,
      type,
      data
    } = this.props;

    if (selected) {
      const {
        name
      } = data;
      return _react.default.createElement(_Avatar.default, {
        name: name,
        alt: name,
        iconName: "check",
        width: "40px",
        height: "40px",
        lineHeight: "40px"
      });
    }

    return _react.default.createElement(_EntityAvatar.default, {
      data: data,
      type: type
    });
  }

}

var _default = EntityListItem;
exports.default = _default;