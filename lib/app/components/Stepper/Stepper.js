"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StepperContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Stepper = _interopRequireDefault(require("app/components/atoms/Stepper/Stepper"));

var _reactRedux = require("react-redux");

var _appActions = require("store/actions/app/appActions");

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _History = _interopRequireDefault(require("store/History"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 *
 */
let StepperContainer = (_class = (_temp = _class2 = class StepperContainer extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      disabled: false
    };
    this.props.toggleAppHeader(true);
    this.props.showStepperSave();
  }

  componentWillUnmount() {
    this.props.toggleAppHeader(false);
  }

  mbHandleError(mbError) {
    this.setState({
      disabled: false
    });

    if (mbError instanceof Error) {
      // if there was error navigate back to the last step
      return this.onPrevious();
    }

    this.onClose();
  }

  onNext() {
    const {
      step
    } = this.state;
    step <= this.props.steps.length && this.setState(prevState => ({
      step: prevState.step + 1
    }));
  }

  onPrevious() {
    const {
      step
    } = this.state;
    step > 1 && this.setState(prevState => ({
      step: prevState.step - 1
    }));
  }

  onDone() {
    const {
      onDone
    } = this.props;

    if (onDone) {
      const res = this.props.onDone();
      this.setState({
        disabled: true
      });

      if (res.then && typeof res.then === 'function') {
        res.then(this.mbHandleError, this.mbHandleError);
      } else {
        this.onClose();
      }
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    } else {
      _History.default.pushBack();
    }
  }

  onFormSubmit(event) {
    event.preventDefault();

    if (this.state.step === this.props.steps.length) {
      this.onDone();
    } else {
      this.onNext();
    }
  }

  render() {
    const {
      step,
      disabled
    } = this.state;
    const {
      config
    } = this.props;
    const {
      title,
      subTitle,
      formId,
      content
    } = this.props.steps[step - 1] || {};
    return _react.default.createElement(_Stepper.default, {
      title: step > this.props.steps.length ? 'Loading' : title,
      subTitle: step > this.props.steps.length ? '' : subTitle,
      step: step,
      steps: this.props.steps && this.props.steps.length,
      onNext: this.onNext,
      onPrevious: this.onPrevious,
      onClose: this.onClose,
      formId: formId,
      disabled: disabled,
      hideOnSave: config.hideOnSave
    }, _react.default.createElement(_Form.default, {
      onSubmit: this.onFormSubmit,
      id: formId
    }, content));
  }

}, _defineProperty(_class2, "propTypes", {
  steps: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string.isRequired,
    subTitle: _propTypes.default.string,
    formId: _propTypes.default.string
  })).isRequired,
  onClose: _propTypes.default.func,
  onDone: _propTypes.default.func.isRequired,
  toggleAppHeader: _propTypes.default.func.isRequired,
  showStepperSave: _propTypes.default.func.isRequired
}), _defineProperty(_class2, "defaultProps", {}), _temp), (_applyDecoratedDescriptor(_class.prototype, "mbHandleError", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "mbHandleError"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onNext", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onNext"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onPrevious", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onPrevious"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onDone", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onDone"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onClose", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onClose"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFormSubmit", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onFormSubmit"), _class.prototype)), _class);
exports.StepperContainer = StepperContainer;

var _default = (0, _reactRedux.connect)(state => ({
  config: state.app.stepper
}), {
  toggleAppHeader: _appActions.toggleAppHeader,
  showStepperSave: _appActions.showStepperSave
})(StepperContainer);

exports.default = _default;