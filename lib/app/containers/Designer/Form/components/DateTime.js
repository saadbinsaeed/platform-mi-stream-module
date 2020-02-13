"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _platformUi = require("@mic3/platform-ui");

var _Immutable = require("app/utils/immutable/Immutable");

var _dec, _class;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let DateTime = (_dec = (0, _decoratorUtils.memoize)(), (_class = class DateTime extends _react.PureComponent {
  getDialogProps(DialogProps) {
    return (0, _Immutable.set)(DialogProps, 'style.zIndex', 3000);
  }

  render() {
    const {
      DialogProps,
      ...rest
    } = this.props;
    const newDialogProps = this.getDialogProps(DialogProps);
    return _react.default.createElement(_platformUi.DateTimePicker, _extends({
      DialogProps: newDialogProps
    }, rest));
  }

}, (_applyDecoratedDescriptor(_class.prototype, "getDialogProps", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "getDialogProps"), _class.prototype)), _class));
var _default = DateTime;
exports.default = _default;