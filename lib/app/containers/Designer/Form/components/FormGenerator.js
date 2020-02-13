"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _platformUi = require("@mic3/platform-ui");

var _FormValidator = _interopRequireDefault(require("app/utils/validator/FormValidator"));

var _fieldUtils = require("app/utils/designer/form/fieldUtils");

var _lo = require("app/utils/lo/lo");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const ListStyled = (0, _styledComponents.default)(_platformUi.List).withConfig({
  displayName: "FormGenerator__ListStyled",
  componentId: "sc-1e1k8i1-0"
})(["padding-top:0 !important;padding-bottom:0 !important;& li{padding-top:0 !important;padding-bottom:0 !important;}"]);
let FormGenerator = (_dec = (0, _decoratorUtils.debounce)(), _dec2 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class FormGenerator extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "validator", void 0);

    const {
      components
    } = props;
    this.validator = new _FormValidator.default(components);
    this.state = {
      data: props.data || {},
      onChangeSet: new Set(),
      globalValidation: false,
      errors: null
    };
  }

  componentDidUpdate(prevProps) {
    const {
      components,
      data
    } = this.props;

    if (components !== prevProps.components || data !== prevProps.data) {
      if (components !== prevProps.components) {
        this.validator = new _FormValidator.default(components);
      }

      this.setState({
        data,
        components
      });
    }
  }

  onChange() {
    this.validate(() => {
      if (!this.state.errors && this.props.onChange) {
        this.props.onChange(this.state.data);
      }
    });
  }

  changeVariable({
    name,
    value
  }) {
    return new Promise(resolve => {
      const data = (0, _lo.set)(this.state.data, name, value);
      const onChangeSet = new Set([...this.state.onChangeSet.values(), name]);
      this.setState({
        data,
        onChangeSet
      }, () => {
        this.onChange();
        resolve(this.state.data);
      });
    });
  }

  async isValidForm() {
    return new Promise((resolve, reject) => {
      this.setState({
        globalValidation: true
      }, () => this.validate(() => {
        const {
          errors,
          data
        } = this.state;
        resolve({
          data,
          errors
        });
      }));
    });
  }

  validate(fn = () => {}) {
    const errors = this.validator.getErrors(this.state.data);
    this.setState({
      errors
    }, fn);
    this.props.onValidate && this.props.onValidate(errors);
  } // helped function for keeping buildComponents memoized


  _buildComponents(components, data, useDataContext, validator, errors, ListItemProps) {
    return components.map((component, index) => this._buildComponent(component, index, data, useDataContext, validator, errors, ListItemProps));
  }

  _buildComponent(component, index, data, useDataContext, validator, errors, ListItemProps) {
    const {
      onChangeSet,
      globalValidation
    } = this.state;
    const {
      changeVariable
    } = this;
    const {
      type,
      defaults,
      constraints
    } = component;
    const {
      required
    } = constraints || {};
    const properties = (0, _fieldUtils.fillProperties)(component.properties, defaults);
    let name = properties.name;

    if (useDataContext) {
      const prefix = properties.local ? 'local' : 'global';
      name = properties.name && `${prefix}.${properties.name}`;
    }

    const value = name && (0, _lo.get)(data, name);
    const children = component.children ? this._buildComponents(component.children, data, useDataContext, validator, errors, ListItemProps) : null; // Render error propertires

    let errorProps = {};

    if (onChangeSet.has(name) || globalValidation) {
      const messages = validator.formatMessages(name, component);
      errorProps = messages ? {
        error: errors && true,
        helperText: messages.join('\n')
      } : {};
    }

    const {
      onValue,
      ...componentProperties
    } = properties;
    const variables = (0, _Immutable.default)(this.state.data);
    const builtComponent = (0, _fieldUtils.getFieldByType)(type, { ...componentProperties,
      ...errorProps,
      name,
      value,
      required,
      changeVariable,
      variables
    }, children);
    return _react.default.createElement(_platformUi.ListItem, _extends({
      ContainerComponent: component.type === 'panel' ? 'div' : 'li',
      key: index
    }, ListItemProps), builtComponent);
  }

  buildComponents(...args) {
    return this._buildComponents(...args);
  }

  render() {
    const {
      components,
      useDataContext,
      ListItemProps
    } = this.props;
    const {
      data,
      errors
    } = this.state;
    return _react.default.createElement(ListStyled, null, this.buildComponents(components || [], data, useDataContext, this.validator, errors, ListItemProps));
  }

}, _defineProperty(_class2, "propTypes", {
  components: _propTypes.default.arrayOf(_propTypes.default.object),
  data: _propTypes.default.object,
  useDataContext: _propTypes.default.bool,
  ListItemProps: _propTypes.default.object
}), _defineProperty(_class2, "defaultProps", {
  components: [],
  data: {},
  action: '#',
  ListItemProps: {}
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "onChange", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "changeVariable", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "changeVariable"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isValidForm", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "isValidForm"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "validate", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "validate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_buildComponents", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_buildComponents"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_buildComponent", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_buildComponent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildComponents", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "buildComponents"), _class.prototype)), _class));
var _default = FormGenerator;
exports.default = _default;