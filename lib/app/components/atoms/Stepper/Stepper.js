"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _Title = _interopRequireDefault(require("app/components/atoms/Title/Title"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commonStyles = (0, _styledComponents.css)(["white-space:nowrap;max-width:300px;overflow:hidden;"]);
const HeaderSubTitle = (0, _styledComponents.default)(_Title.default).withConfig({
  displayName: "Stepper__HeaderSubTitle",
  componentId: "sc-1b84yxf-0"
})(["color:rgba(255,255,255,0.75);font-size:0.7rem;font-weight:300;min-height:16px;", ""], commonStyles);
HeaderSubTitle.displayName = 'HeaderSubTitle';
const HeaderTitle = (0, _styledComponents.default)(_Title.default).withConfig({
  displayName: "Stepper__HeaderTitle",
  componentId: "sc-1b84yxf-1"
})(["", ""], commonStyles);
HeaderTitle.displayName = 'HeaderTitle';
const StyledRow = (0, _styledComponents.default)(_reactStyledFlexboxgrid.Row).withConfig({
  displayName: "Stepper__StyledRow",
  componentId: "sc-1b84yxf-2"
})(["background:", ";"], ({
  color,
  theme
}) => color || theme.header.background);
const ButtonStyle = (0, _styledComponents.default)(_Button.default).withConfig({
  displayName: "Stepper__ButtonStyle",
  componentId: "sc-1b84yxf-3"
})(["font-size:16px;height:50px;&:disabled{background-color:#2890d9 !important;}"]);
ButtonStyle.displayName = 'ButtonStyle';

const NextButton = ({
  title,
  subTitle,
  children,
  step,
  steps,
  onPrevious,
  onClose,
  formId,
  disabled,
  hideOnSave
}) => {
  if (step < steps) {
    return _react.default.createElement(ButtonStyle, {
      title: "Go to the next step",
      type: "submit",
      form: formId
    }, "Next", _react.default.createElement(_Icon.default, {
      style: {
        marginLeft: '10px'
      },
      name: "chevron-right",
      size: "lg"
    }));
  }

  const doneProps = {
    title: 'Click to complete',
    type: 'submit',
    form: formId,
    disabled,
    style: {
      marginLeft: '15px'
    }
  };

  if (step > 1) {
    return _react.default.createElement(ButtonStyle, doneProps, "Done");
  }

  if (!hideOnSave) {
    return _react.default.createElement(ButtonStyle, doneProps, "Save");
  }

  return null;
};

const StepperComponent = props => {
  const {
    title,
    subTitle,
    children,
    step,
    steps,
    onPrevious,
    onClose
  } = props;
  return _react.default.createElement("div", null, _react.default.createElement(StyledRow, {
    middle: "xs"
  }, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
    xs: 1
  }, _react.default.createElement(_ButtonIcon.default, {
    icon: "close",
    title: "Close Current View",
    onClick: onClose
  })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
    xs: 11
  }, _react.default.createElement(HeaderTitle, {
    as: "h1"
  }, title), _react.default.createElement(HeaderSubTitle, {
    as: "h2"
  }, subTitle))), _react.default.createElement(StyledRow, {
    middle: "xs"
  }, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
    xs: 1
  }, step > 1 ? _react.default.createElement(_ButtonIcon.default, {
    icon: "chevron-left",
    title: "Go to the previous step",
    onClick: onPrevious
  }) : null), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
    xs: 8,
    md: 10
  }, _react.default.createElement("span", {
    className: "step-status"
  }, "STEP ", step, " / ", steps)), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
    xs: 3,
    sm: 2,
    md: 1
  }, _react.default.createElement(NextButton, props))), _react.default.createElement("div", {
    className: "content-wrap"
  }, children));
};

StepperComponent.propTypes = {
  title: _propTypes.default.string.isRequired,
  step: _propTypes.default.number.isRequired,
  steps: _propTypes.default.number.isRequired,
  onClose: _propTypes.default.func.isRequired,
  children: _propTypes.default.element.isRequired,
  subTitle: _propTypes.default.string
};
StepperComponent.defaultProps = {
  subTitle: ''
};
var _default = StepperComponent;
exports.default = _default;