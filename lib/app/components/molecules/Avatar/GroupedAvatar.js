"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const GroupedAvatarStyle = _styledComponents.default.div.withConfig({
  displayName: "GroupedAvatar__GroupedAvatarStyle",
  componentId: "hrvpdx-0"
})(["cursor:pointer;display:inline-block;border-radius:500rem;position:relative;", ";", ";overflow:hidden;line-height:0;"], ({
  width
}) => `width: ${width}px; max-width: ${width}px`, ({
  height
}) => `height: ${height}px; max-height: ${height}px`);

const GroupWrapper = _styledComponents.default.div.withConfig({
  displayName: "GroupedAvatar__GroupWrapper",
  componentId: "hrvpdx-1"
})(["display:inline-block;position:absolute;background:white;", ""], ({
  count,
  size,
  index
}) => {
  const i = index + 1;

  if (count === 1 && i === 1) {
    return `left: 0; right: 0;`;
  }

  if (count === 2 && i === 1) {
    return `left: -${size}px;`;
  }

  if (count === 2 && i === 2) {
    return `right: -${size}px;`;
  }

  if (count === 3 && i === 1) {
    return `left: 0;`;
  }

  if (count === 3 && i === 2) {
    return `right: 0;`;
  }

  if (count === 3 && i === 3) {
    return `bottom: -${size}px;`;
  }

  if (count === 4 && i === 1) {
    return `top: 0; left: 0;`;
  }

  if (count === 4 && i === 2) {
    return `top: 0; right: 0;`;
  }

  if (count === 4 && i === 3) {
    return `bottom: 0; left: 0;`;
  }

  if (count === 4 && i === 4) {
    return `bottom: 0; right: 0;`;
  }
});
/**
 * Render multiple images in an avatar
 */


class GroupedAvatar extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildImage", (0, _memoizeOne.default)((list, count, height, width) => {
      const size = (width + height) / 4;
      return list.map((avatar, index) => {
        return _react.default.createElement(GroupWrapper, {
          key: index,
          index: index,
          count: count,
          height: height,
          size: size
        }, _react.default.createElement(_Avatar.default, _extends({
          src: (0, _lo.get)(avatar, 'user.image') || (0, _lo.get)(avatar, 'image'),
          name: (0, _lo.get)(avatar, 'user.name') || (0, _lo.get)(avatar, 'name'),
          rounded: false
        }, this.getAvatarSize(count, index, size))));
      });
    }));
  }

  getAvatarSize(count, index, size) {
    const i = index + 1;

    if (count === 1 || count === 2 || count === 3 && i === 3) {
      return {
        width: `${size * 2}px`,
        height: `${size * 2}px`
      };
    }

    return {
      width: `${size}px`,
      height: `${size}px`
    };
  }

  render() {
    const {
      people,
      width,
      height,
      name
    } = this.props;
    const list = people.slice(0, 4);
    const count = list.length;
    return count ? _react.default.createElement(GroupedAvatarStyle, {
      width: width,
      height: height,
      count: count
    }, this.buildImage(list, count, height, width)) : _react.default.createElement(_Avatar.default, {
      name: name,
      size: "lg"
    });
  }

}

var _default = GroupedAvatar;
exports.default = _default;