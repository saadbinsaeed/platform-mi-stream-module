"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.fieldify = exports.events = void 0;

var _react = _interopRequireWildcard(require("react"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _platformUi = require("@mic3/platform-ui");

var _greenlet = _interopRequireDefault(require("greenlet"));

var _utils = require("app/utils/utils");

var _lo = require("app/utils/lo/lo");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const pick = (object, fields) => !object ? {} : fields.reduce((acc, field) => {
  if ((0, _lo.get)(object, field)) {
    acc = (0, _lo.set)(acc, field, (0, _lo.get)(object, field));
  }

  return acc;
}, {});

const BadgeStyled = (0, _styledComponents.default)(_platformUi.Badge).withConfig({
  displayName: "FormField__BadgeStyled",
  componentId: "sc-108b7ch-0"
})(["width:100%;display:block !important;& > span{display:block;top:1.7rem;position:absolute;right:1rem;}"]);
const events = (0, _Immutable.default)(['onClick', 'onBlur', 'onFocus', 'onChange']);
exports.events = events;

class FormField extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onClickAction", void 0);

    _defineProperty(this, "onBlurAction", void 0);

    _defineProperty(this, "onChangeAction", void 0);

    _defineProperty(this, "onFocusAction", void 0);

    _defineProperty(this, "onClick", this.onClickAction);

    _defineProperty(this, "onBlur", this.onBlurAction);

    _defineProperty(this, "onFocus", this.onFocusAction);

    _defineProperty(this, "onChange", event => {
      if (this.onChangeAction) {
        this.onChangeAction(event);
      } else {
        const {
          target: {
            name,
            type
          }
        } = event;
        let value = event.target.value;

        if (type === 'number') {
          value = Number(value);
        }

        this.props.changeVariable({
          name,
          value
        });
      }
    });

    _defineProperty(this, "isVisible", (0, _memoizeOne.default)((isVisible, variables) => {
      if (!(0, _utils.isDefined)(isVisible)) {
        return true;
      }

      if (typeof isVisible === 'boolean') {
        return isVisible;
      }

      if (typeof isVisible === 'function') {
        return isVisible(variables);
      }

      throw new Error(`${this.props.name}: isVisible contains an invalid value (${typeof isVisible}): ${isVisible}`);
    }));

    this._bindActions(events);
  }

  _bindActions(functionNames) {
    functionNames.forEach(name => {
      if (this.props[name]) {
        const self = this;
        const fnWorkerName = `${name}Worker`;
        const fnActionName = `${name}Action`;
        self[fnWorkerName] = (0, _greenlet.default)(this.props[name]);

        const action = event => {
          const {
            target: {
              name,
              value
            }
          } = event;
          const e = {
            target: {
              name,
              value
            }
          };
          const workerPromise = self[fnWorkerName](e, self.props.variables);
          workerPromise.then(changes => {
            if (changes) {
              if (Array.isArray(changes)) {
                (0, _utils.serialPromises)(changes, change => self.props.changeVariable(change));
              } else {
                self.props.changeVariable(changes);
              }
            }
          });
        };

        self[fnActionName] = action.bind(self);
      }
    });
  }

  componentDidUpdate(prevProps) {
    const {
      props
    } = this;
    const changedHandlers = events.filter(eventHandler => props[eventHandler] !== prevProps[eventHandler]);

    this._bindActions(changedHandlers);
  }

  render() {
    const eventsHandlers = pick(this, events);
    const {
      Component,
      variables,
      changeVariable,
      isVisible,
      local,
      help,
      action,
      ...props
    } = this.props;

    if (!this.isVisible(isVisible, variables)) {
      return null;
    }

    if (action && typeof action === 'function') {
      props.action = action;
    }

    const fieldForm = _react.default.createElement(Component, _extends({
      autoComplete: "off"
    }, props, eventsHandlers));

    const helpHtml = (0, _lo.get)(help, 'innerHTML');

    if (_react.default.isValidElement(help) || helpHtml || typeof help === 'string') {
      const helperComponent = _react.default.isValidElement(help) ? help : _react.default.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: help.innerHTML || ''
        }
      });
      return _react.default.createElement(BadgeStyled, {
        badgeContent: _react.default.createElement(_platformUi.Tooltip, {
          title: helperComponent,
          placement: "top"
        }, _react.default.createElement(_platformUi.MdiIcon, {
          size: 17,
          name: "help-circle",
          color: "secondary"
        }))
      }, fieldForm);
    }

    return fieldForm;
  }

}

const fieldify = Component => props => _react.default.createElement(FormField, _extends({}, props, {
  Component: Component
}));

exports.fieldify = fieldify;
var _default = FormField;
exports.default = _default;