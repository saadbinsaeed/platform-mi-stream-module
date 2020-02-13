"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _AutoComplete = require("primereact/components/autocomplete/AutoComplete");

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

var _lo = require("app/utils/lo/lo");

var _stringUtils = require("app/utils/string/string-utils");

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Auto extends _AutoComplete.AutoComplete {
  /**
   * @override
   */
  alignPanel() {
    super.alignPanel();

    if (this.props.appendTo) {
      const target = this.props.multiple ? this.multiContainer : this.inputEl;
      const {
        left,
        width
      } = target.getBoundingClientRect();
      this.panel.element.style.left = left + 'px';
      this.panel.element.style.minWidth = width + 'px';
      this.panel.element.style.width = width + 'px';
    }
  }

}

const AutoComplete = (0, _styledComponents.default)(Auto).withConfig({
  displayName: "Autocomplete__AutoComplete",
  componentId: "sc-1xwisah-0"
})(["display:flex !important;& button{height:100%;}.ui-autocomplete-multiple-container.ui-inputtext{display:flex;flex-wrap:wrap;padding:.3em;}.ui-autocomplete-token{height:2.2em;margin:.2em .3em;line-height:1.85em;}.ui-autocomplete-token-label{font-size:1.1em;}.ui-autocomplete-input-token{flex-grow:1;min-height:2em;line-height:1.5em;align-items:center;color:", ";input{color:", ";font-size:", ";}}li.ui-autocomplete-list-item{word-wrap:break-word;width:", "px;}input{width:100% !important;}.ui-button-text{padding:.66rem !important;}"], ({
  theme
}) => theme.input.textColor, ({
  theme
}) => theme.input.textColor, ({
  theme
}) => theme.base.fontSize, ({
  optionWidth
}) => optionWidth);
/**
 * A modal for search and add team members
 */

class Autocomplete extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "ref", _react.default.createRef());

    _defineProperty(this, "updateWidth", (0, _utils.debounce)(() => {
      if (this.ref.current && this.ref.current.container) this.setState({
        width: this.ref.current.container.clientWidth - (this.props.multiple ? 42 : 32)
      });
    }, 500));

    _defineProperty(this, "setRequired", (0, _memoizeOne.default)((required, multiple, value) => {
      const input = (0, _lo.get)(this.ref, 'current.inputEl');

      if (input) {
        if (multiple) {
          // this fix the multiple selection "required" behaviour
          input.required = required && !value;
        } else {
          input.required = !!required;
        }
      }
    }));

    _defineProperty(this, "onChange", event => {
      this.setState({
        value: event.value
      });
      const value = event.value || null;

      if (value && (0, _stringUtils.isString)(value)) {
        return;
      }

      const {
        onChange,
        name
      } = this.props;
      onChange && onChange({ ...event,
        target: {
          name,
          value
        }
      });
    });

    _defineProperty(this, "onBlur", event => {
      const {
        value,
        multiple
      } = this.props;
      const input = (0, _lo.get)(this.ref, 'current.inputEl') || {};

      if (multiple) {
        // clean up the "multiple" incomplete research
        input.value = '';
      } else {
        // clean up the "single" incomplete research
        if (value && typeof this.state.value !== 'object') {
          // don't use when there is no value, it will break the single selection "required" behaviour)
          setTimeout(() => {
            this.setState({
              value: this.modifiableValue(this.props.value),
              forceUpdateKey: this.state.forceUpdateKey + 1
            });
          }, 300);
        } else if (!value) {
          // this is necessary to not break for the single selection "required" behaviour
          input.value = '';
        }
      }

      this.props.onBlur && this.props.onBlur(event);
    });

    this.state = {
      value: this.modifiableValue(props.value),
      width: 500,
      forceUpdateKey: 0
    };
  }

  modifiableValue(value) {
    if (!value) {
      return null;
    }

    return Array.isArray(value) ? value.map(e => ({ ...e
    })) : { ...value
    };
  }

  componentDidMount() {
    const container = (0, _lo.get)(this.ref, 'current.container');

    if (!container) {
      return;
    }

    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
    const {
      required,
      multiple,
      value
    } = this.props;
    this.setRequired(required, multiple, value);
  }

  componentDidUpdate(prevProps) {
    const {
      required,
      multiple,
      value
    } = this.props;
    this.setRequired(required, multiple, value);

    if (value !== prevProps.value) {
      this.setState({
        value: this.modifiableValue(this.props.value),
        forceUpdateKey: this.state.forceUpdateKey + 1
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  render() {
    const {
      label,
      ...autocompleteProps
    } = this.props;
    const {
      value,
      width,
      forceUpdateKey
    } = this.state;
    return _react.default.createElement(_InputWrapper.default, null, label && _react.default.createElement(_Label.default, {
      required: this.props.required
    }, label), _react.default.createElement(AutoComplete, _extends({
      key: forceUpdateKey,
      dropdown: true,
      optionWidth: width
    }, autocompleteProps, {
      onChange: this.onChange,
      value: value,
      innerRef: this.ref,
      onBlur: this.onBlur
    })));
  }

}

_defineProperty(Autocomplete, "propTypes", { ...AutoComplete.propTypes,
  required: _propTypes.default.bool // $FlowFixMe

});

;
var _default = Autocomplete;
exports.default = _default;