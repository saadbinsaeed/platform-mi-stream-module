"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _History = _interopRequireDefault(require("store/History"));

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Renders the form to a add a Classification
 */
let ClassificationAdd = (_class = (_temp = _class2 = class ClassificationAdd extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "formRef", _react.default.createRef());

    _defineProperty(this, "fieldDefinitions", [{
      field: 'name',
      type: 'text',
      properties: {
        label: 'Name',
        name: 'name'
      },
      constraints: {
        required: true,
        minLength: 3,
        maxLength: 60
      }
    }, {
      field: 'uri',
      type: 'text',
      properties: {
        label: 'Class URI',
        name: 'uri'
      },
      constraints: {
        required: true,
        noWhiteSpace: true,
        minLength: 3,
        maxLength: 50
      }
    }]);

    _defineProperty(this, "state", (0, _Immutable.default)({
      formData: {
        name: '',
        uri: ''
      }
    }));
  }

  /**
   * Handle the form submit event.
   * @param e the form submit SyntheticEvent (https://facebook.github.io/react/docs/events.html)
   * @returns {boolean} false.
   */
  onFormSubmit(e) {
    e.preventDefault();
    this.formRef.current.isValidForm().then(({
      data,
      errors
    }) => {
      if (!errors) {
        this.props.addClassificationFn(data);
      }
    });
  }

  /**
   * Handle the on change event of the elements inside of the form.
   * @param event the on change SyntheticEvent (https://facebook.github.io/react/docs/events.html)
   */
  handleChange(data) {
    if (data.uri) {
      data = { ...data,
        uri: this._normalizeValue(data.uri)
      };
    }

    this.setState({
      formData: data
    });
  }

  _normalizeValue(value) {
    if (value !== '') {
      return value.toLowerCase();
    }
  }

  /**
   * @override
   */
  render() {
    const {
      isLoading
    } = this.props;
    const {
      formData
    } = this.state;
    return _react.default.createElement(_Form.default, {
      loading: isLoading
    }, _react.default.createElement(_FormGenerator.default, {
      components: this.fieldDefinitions,
      ref: this.formRef,
      data: formData,
      ListItemProps: {
        disableGutters: true
      }
    }), _react.default.createElement(_ModalFooter.default, null, _react.default.createElement(_Button.default, {
      type: "button",
      onClick: _History.default.pushBack
    }, "Cancel"), _react.default.createElement(_Button.default, {
      type: "submit",
      color: "primary",
      onClick: this.onFormSubmit
    }, "Submit")));
  }

}, _defineProperty(_class2, "propTypes", {
  addClassificationFn: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool
}), _defineProperty(_class2, "defaultProps", {
  isLoading: false
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "onFormSubmit", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onFormSubmit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleChange", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_normalizeValue", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_normalizeValue"), _class.prototype)), _class);

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.classifications.addedClassification.isLoading
}))(ClassificationAdd);

exports.default = _default;