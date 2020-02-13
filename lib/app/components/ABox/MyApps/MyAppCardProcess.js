"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Hr = _interopRequireDefault(require("app/components/atoms/Hr/Hr"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _mdi = require("app/utils/styles/mdi");

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CollapsedContent = _styledComponents.default.div.withConfig({
  displayName: "MyAppCardProcess__CollapsedContent",
  componentId: "sc-1qkw3a5-0"
})(["", ";"], ({
  collapsed
}) => collapsed ? 'display: none' : '');

const ProcessActionIcons = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "MyAppCardProcess__ProcessActionIcons",
  componentId: "sc-1qkw3a5-1"
})(["display:inline-block;vertical-align:top;font-size:1rem;margin-top:-5px;margin-left:5px;"]);
const ProcessDescription = (0, _styledComponents.default)(CollapsedContent).withConfig({
  displayName: "MyAppCardProcess__ProcessDescription",
  componentId: "sc-1qkw3a5-2"
})(["font-size:.75rem;margin-bottom:10px;width:100%;"]);

const Italic = _styledComponents.default.span.withConfig({
  displayName: "MyAppCardProcess__Italic",
  componentId: "sc-1qkw3a5-3"
})(["display:block;font-style:italic;font-size:0.7rem;& > a{color:white;}"]);

const ProcessRow = _styledComponents.default.article.withConfig({
  displayName: "MyAppCardProcess__ProcessRow",
  componentId: "sc-1qkw3a5-4"
})(["display:flex;justify-content:start;overflow:hidden;"]);

const ProcessContent = _styledComponents.default.div.withConfig({
  displayName: "MyAppCardProcess__ProcessContent",
  componentId: "sc-1qkw3a5-5"
})(["flex:3;padding-left:0.6rem;overflow:hidden;"]);

const ProcessTitle = _styledComponents.default.h2.withConfig({
  displayName: "MyAppCardProcess__ProcessTitle",
  componentId: "sc-1qkw3a5-6"
})(["margin:0;font-size:0.9rem;font-weight:normal;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"]);

const ProcessSubContent = _styledComponents.default.div.withConfig({
  displayName: "MyAppCardProcess__ProcessSubContent",
  componentId: "sc-1qkw3a5-7"
})(["display:flex;justify-content:space-between;align-items:center;"]);

const HrTyled = (0, _styledComponents.default)(_Hr.default).withConfig({
  displayName: "MyAppCardProcess__HrTyled",
  componentId: "sc-1qkw3a5-8"
})(["margin-top:0.6rem;"]);
/**
 *
 */

class MyAppCardProcess extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isDescriptionOpen: false
    });

    _defineProperty(this, "openProcess", () => this.props.openProcess((0, _lo.get)(this.props, 'processDefinition.key')));

    _defineProperty(this, "toggleProcessDescription", () => {
      this.setState({
        isDescriptionOpen: !this.state.isDescriptionOpen
      });
      this.props.updateCard();
    });

    _defineProperty(this, "toggleFavorite", () => {
      const {
        processDefinition
      } = this.props;
      this.props.toggleFavorite && this.props.toggleFavorite((0, _lo.get)(processDefinition, 'key'), (0, _lo.get)(processDefinition, 'deployedModel.name'));
    });
  }

  render() {
    const {
      processDefinition,
      isFavorite
    } = this.props;
    const {
      deployedModel,
      description
    } = processDefinition;
    const {
      isDescriptionOpen
    } = this.state;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(ProcessRow, null, _react.default.createElement(_Icon.default, {
      name: _mdi.iconsSet.has(deployedModel.modelData.icon) ? deployedModel.modelData.icon : 'arrange-bring-to-front',
      onClick: this.openProcess,
      size: "md",
      hexColor: deployedModel.modelData.iconColor
    }), _react.default.createElement(ProcessContent, null, _react.default.createElement(ProcessTitle, {
      alt: deployedModel.name
    }, deployedModel.name), _react.default.createElement(ProcessSubContent, null, _react.default.createElement(Italic, null, "Version ", deployedModel.version), _react.default.createElement("div", null, _react.default.createElement(ProcessActionIcons, {
      alt: "Start process",
      color: "success",
      name: "play-circle",
      onClick: this.openProcess,
      size: "sm"
    }), _react.default.createElement(ProcessActionIcons, {
      alt: isFavorite ? 'Remove from favorites' : 'Add to favorites',
      name: isFavorite ? 'star' : 'star-outline',
      onClick: this.toggleFavorite,
      size: "sm"
    }), _react.default.createElement(ProcessActionIcons, {
      alt: isDescriptionOpen ? 'Close' : 'Description',
      onClick: this.toggleProcessDescription,
      name: isDescriptionOpen ? 'close-circle-outline' : 'information',
      size: "sm"
    }))))), _react.default.createElement(ProcessDescription, {
      collapsed: !isDescriptionOpen
    }, description || 'No description.', _react.default.createElement(HrTyled, null)));
  }

}

;
var _default = MyAppCardProcess;
exports.default = _default;