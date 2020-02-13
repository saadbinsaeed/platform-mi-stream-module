"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _platformUi = require("@mic3/platform-ui");

var _react = _interopRequireWildcard(require("react"));

var _debouncePromise = _interopRequireDefault(require("debounce-promise"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _greenlet = _interopRequireDefault(require("greenlet"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Textarea extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "inputRef", _react.default.createRef());

    _defineProperty(this, "stringify", (0, _memoizeOne.default)((value, parseAs) => {
      // parseAs is one of 'text', 'JSON', 'HTML', 'javascript'
      try {
        switch (parseAs) {
          case 'text':
            return {
              textValue: value
            };

          case 'JSON':
            return {
              textValue: typeof value === 'object' ? JSON.stringify(value) : null
            };

          case 'HTML':
            {
              if (!value) {
                return null;
              }

              return {
                textValue: value.innerHTML
              };
            }

          case 'javascript':
            return {
              textValue: value && String(value)
            };

          default:
        }
      } catch (e) {
        return {
          error: e && e.message
        };
      }
    }));

    _defineProperty(this, "_parseFunction", (0, _greenlet.default)(value => {
      try {
        const jsFunction = eval(value); // eslint-disable-line no-eval

        if (typeof jsFunction !== 'function') {
          return {
            isValid: false,
            errorMessage: 'You must write a valid javascript function.'
          };
        }

        return {
          isValid: true,
          errorMessage: null
        };
      } catch (e) {
        return {
          isValid: false,
          errorMessage: e && e.message
        };
      }
    }));

    _defineProperty(this, "parse", (0, _debouncePromise.default)((0, _memoizeOne.default)(async (value, parseAs) => {
      // parseAs is one of 'text', 'JSON', 'HTML', 'javascript'
      if (!value) {
        return {
          value: null,
          errorMessage: null
        };
      }

      try {
        switch (parseAs) {
          case 'text':
            return {
              value,
              errorMessage: null
            };

          case 'JSON':
            {
              const json = value && JSON.parse(value);

              if (typeof json !== 'object') {
                throw new Error('The value is not a valid JSON.');
              }

              return {
                value: json,
                errorMessage: null
              };
            }

          case 'HTML':
            {
              if (!value) {
                return null;
              }

              const div = document.createElement('div');
              div.innerHTML = value;
              return {
                value: div,
                errorMessage: null
              };
            }

          case 'javascript':
            {
              const response = await this._parseFunction(value);

              if (response.isValid) {
                return {
                  value: eval(value),
                  errorMessage: null
                }; // eslint-disable-line no-eval
              }

              return {
                value: null,
                errorMessage: response.errorMessage
              };
            }

          default:
        }
      } catch (e) {
        return {
          value: null,
          errorMessage: e && e.message
        };
      }
    }), 300));

    _defineProperty(this, "onChange", ({
      target: {
        name,
        value
      }
    }) => {
      const {
        parseAs
      } = this.props;

      if (parseAs === 'HTML') {
        this.setState({
          textValue: value
        });
        return;
      }

      if (this.state.textValue !== value) {
        this.setState({
          textValue: value
        }, () => {
          this.parse(value, parseAs).then(response => {
            this.setState({ ...response
            }, () => {
              if (!this.state.errorMessage) {
                this.props.onChange && this.props.onChange({
                  target: {
                    name,
                    value: this.state.value
                  }
                });
              }
            });
          });
        });
      }
    });

    _defineProperty(this, "onSave", () => {
      const {
        name,
        parseAs
      } = this.props;
      this.parse(this.state.textValue, parseAs).then(response => {
        this.setState({ ...response
        }, () => {
          if (!this.state.errorMessage) {
            this.props.onChange && this.props.onChange({
              target: {
                name,
                value: this.state.value
              }
            });
          }
        });
      });
    });

    _defineProperty(this, "getHtmlProps", (0, _memoizeOne.default)((disabled, parseAs, InputProps, errorMessage) => {
      const cleareIcon = (0, _lo.get)(this.inputRef, 'current.endAdornment', null);
      return parseAs === 'HTML' ? {
        ref: this.inputRef,
        InputProps: {
          startAdornment: !disabled && [_react.default.createElement(_platformUi.IconButton, {
            key: 0,
            "aria-label": "Save html",
            onClick: this.onSave
          }, _react.default.createElement(_platformUi.MdiIcon, {
            name: "content-save"
          })), cleareIcon]
        }
      } : {};
    }));

    const {
      value: _value,
      parseAs: _parseAs
    } = props;
    this.state = {
      tic: 0,
      value: _value,
      ...this.stringify(_value, _parseAs)
    };
  }

  componentDidUpdate(prevProps) {
    const {
      value,
      parseAs
    } = this.props;

    if (prevProps.value !== value) {
      this.setState({
        value,
        ...this.stringify(value, parseAs)
      });
    }
  }

  render() {
    const {
      onChange,
      value,
      helperText,
      parseAs,
      disabled,
      InputProps,
      ...restProps
    } = this.props;
    const errorMessage = this.state.errorMessage || this.props.errorMessage;
    const htmlTypeProps = this.getHtmlProps(disabled, parseAs, InputProps, errorMessage);
    return _react.default.createElement(_platformUi.TextField, _extends({
      rows: "5",
      multiline: true
    }, restProps, htmlTypeProps, {
      disabled: disabled,
      value: this.state.textValue,
      onChange: this.onChange,
      error: errorMessage,
      helperText: errorMessage && `${parseAs} is not valid: ${errorMessage}` || helperText
    }));
  }

}

exports.default = Textarea;

_defineProperty(Textarea, "defaultProps", {
  parseAs: 'text'
});