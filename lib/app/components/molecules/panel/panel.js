"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

var _PanelHeader = _interopRequireDefault(require("./PanelHeader"));

var _PanelContent = _interopRequireDefault(require("./PanelContent"));

var _common = require("app/utils/propTypes/common");

var _HeaderActions = _interopRequireDefault(require("app/components/atoms/HeaderActions/HeaderActions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PanelStyle = _styledComponents.default.div.withConfig({
  displayName: "panel__PanelStyle",
  componentId: "n6wb2j-0"
})(["display:flex;flex-direction:column;background:", ";box-shadow:", ";margin-bottom:1rem;", ";"], ({
  theme
}) => theme.widget.background, ({
  theme
}) => theme.shadow.z1, ({
  theme
}) => theme.shadow.z1);
/**
 * Panel component to show a list of collapsible panels
 */


class Panel extends _react.Component {
  /**
   * Set our default state
   */
  constructor(props) {
    super(props);
    this.state = {
      allPanelsOpen: false
    };
  }
  /**
   * Toggle all open panel sections
   */

  /*toggleAll = (e) => {
      e.preventDefault();
      this.setState({
          allPanelsOpen: !this.state.allPanelsOpen
      });
  };*/

  /**
   * Render our panels
   */


  render() {
    const {
      children,
      header,
      title
    } = this.props;
    return _react.default.createElement(PanelStyle, null, _react.default.createElement(_PanelHeader.default, {
      header: header
    }, _react.default.createElement(_Title.default, null, title), _react.default.createElement(_HeaderActions.default, null, header)), _react.default.createElement(_PanelContent.default, {
      allOpen: this.state.allPanelsOpen
    }, children));
  }

}

_defineProperty(Panel, "propTypes", {
  children: _common.ChildrenProp,
  header: _common.ChildrenProp,
  title: _propTypes.default.string
});

var _default = Panel;
exports.default = _default;