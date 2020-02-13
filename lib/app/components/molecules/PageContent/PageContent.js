"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const PageContentStyle = _styledComponents.default.section.withConfig({
  displayName: "PageContent__PageContentStyle",
  componentId: "ds2v4v-0"
})(["grid-area:content;display:grid;grid-template-rows:auto auto 1fr auto;grid-template-areas:\"pTabs\" \"pActions\" \"pContent\" \"pFooter\";position:relative;", ";"], ({
  overflowHidden
}) => overflowHidden ? 'overflow: hidden' : 'overflow: auto');
/**
 * Our container that holds all page content
 */


class PageContent extends _react.PureComponent {
  /**
  * Render our page content with the correct height
  */
  render() {
    const {
      overflowHidden,
      style
    } = this.props;
    return _react.default.createElement(PageContentStyle, {
      className: 'page-content',
      overflowHidden: overflowHidden,
      style: style
    }, this.props.children);
  }

}

PageContent.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  overflowHidden: _propTypes.default.bool
};
var _default = PageContent;
exports.default = _default;