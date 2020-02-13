"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("app/utils/propTypes/common");

var _ScrollMinStyle = _interopRequireDefault(require("app/utils/styles/ScrollMinStyle"));

var _aboxConfig = require("app/config/aboxConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TabRowStyle = _styledComponents.default.div.withConfig({
  displayName: "TabRow__TabRowStyle",
  componentId: "o1y94n-0"
})(["", ";grid-area:pTabs;display:block;white-space:nowrap;overflow-x:auto;overflow-y:hidden;text-align:center;background:", ";@media(min-width:", "){}margin:0;height:", ";border-bottom:solid 1px ", ";"], _ScrollMinStyle.default, ({
  color,
  theme
}) => color || theme.header.background, ({
  theme
}) => theme.media.md, ({
  theme
}) => theme.tabs.tabRow.height, ({
  theme
}) => theme.base.borderColor);
/**
 * Create the scrollable container for the tabs
 */


class TabRow extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "tabRow", _react.default.createRef());

    _defineProperty(this, "elements", []);

    _defineProperty(this, "setActiveTab", index => {
      const row = this.tabRow.current;
      const element = this.elements[index];

      if (!element) {
        return;
      }

      const elementSize = element.getBoundingClientRect();
      let width = 0;

      for (let i = 0; i <= index; i++) {
        if (this.elements[i]) {
          width += this.elements[i].getBoundingClientRect().width;
        }
      }

      row.scrollLeft = width - row.parentElement.getBoundingClientRect().width / 2 - elementSize.width / 2;
    });

    _defineProperty(this, "register", (index, element) => {
      this.elements[index] = element;
    });
  }

  /**
   * Render our tabs row with children
   */
  render() {
    const {
      color,
      ...rest
    } = this.props;

    const tabs = _react.default.Children.map(this.props.children, (child, index) => child && _react.default.cloneElement(child, {
      selectTab: () => {
        this.setActiveTab(index);
      },
      register: element => {
        this.register(index, element);
      }
    }));

    return _react.default.createElement(TabRowStyle, _extends({}, rest, {
      color: color,
      className: 'tabs',
      innerRef: this.tabRow
    }), tabs);
  }

}

_defineProperty(TabRow, "propTypes", {
  children: _common.ChildrenProp
});

var _default = TabRow;
exports.default = _default;