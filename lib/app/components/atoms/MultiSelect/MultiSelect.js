"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _MultiSelect = require("primereact/components/multiselect/MultiSelect");

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MultiSelectStyled = (0, _styledComponents.default)(_MultiSelect.MultiSelect).withConfig({
  displayName: "MultiSelect__MultiSelectStyled",
  componentId: "sc-1c9fcfn-0"
})(["", " min-height:2.63rem;line-height:2.2rem;font-size:1rem;& .ui-multiselect-label-container{max-height:32px;}"], ({
  fluid
}) => fluid && 'width: 100% !important;');
/**
 * A Stateful MultiSelect.
 */

class MultiSelect extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", ({
      originalEvent,
      value
    }) => {
      this.setState({
        value
      }, () => {
        this.props.onChange && this.props.onChange({
          originalEvent,
          value,
          target: {
            name: this.props.name,
            value
          }
        });
      });
    });

    this.state = {
      value: props.initialValue
    };
  }

  componentDidUpdate(prevProps) {
    const {
      initialValue
    } = this.props;

    if (initialValue !== prevProps.initialValue) {
      this.setState({
        value: initialValue
      });
    }
  }

  /**
   * @override
   */
  render() {
    const {
      label,
      required,
      fluid,
      filter,
      initialValue,
      ...restProps
    } = this.props;
    return _react.default.createElement(_InputWrapper.default, null, label && _react.default.createElement(_Label.default, {
      required: required
    }, label), _react.default.createElement(MultiSelectStyled, _extends({}, restProps, {
      value: this.state.value,
      onChange: this.onChange,
      fluid: fluid,
      filter: filter
    })));
  }

}

_defineProperty(MultiSelect, "propTypes", _MultiSelect.MultiSelect.propTypes);

_defineProperty(MultiSelect, "defaultProps", {
  filter: true
  /**
   * @param props the Component's properties.
   */

});

var _default = MultiSelect;
exports.default = _default;