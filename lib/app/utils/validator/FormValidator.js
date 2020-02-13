"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("app/utils/utils");

var _lo = require("app/utils/lo/lo");

var _validate = _interopRequireDefault(require("app/utils/validator/validate"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FormValidator {
  constructor(formComponents) {
    _defineProperty(this, "components", void 0);

    _defineProperty(this, "constraints", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "errors", void 0);

    _defineProperty(this, "nameComponentsMap", void 0);

    this.nameComponentsMap = {};
    this.components = formComponents;
  }

  _buildFormConstraints(components) {
    if (!components) {
      return {};
    }

    this.nameComponentsMap = {};
    let constraints = {};
    components.forEach(component => {
      if (component.children) {
        constraints = { ...constraints,
          ...this._buildFormConstraints(component.children)
        };
        return;
      }

      return this._addComponentConstraints(component, constraints);
    });
    return constraints;
  }

  _addComponentConstraints(component, formConstraints) {
    const {
      type,
      properties
    } = component;
    const {
      name,
      children
    } = properties || {};

    if (!name) {
      return;
    }

    this.nameComponentsMap[name] = this.nameComponentsMap[name] || [];
    this.nameComponentsMap[name].push(component);
    let constraints = component.constraints ? { ...component.constraints
    } : {}; // dont't need validate if is not visible

    const isVisible = (0, _lo.get)(component, 'properties.isVisible');

    if (isVisible) {
      // $FlowFixMe
      constraints = isVisible(this.data) ? constraints : {};
    } // enance constraints adding type:


    if (type) {
      switch (type) {
        case 'text':
          constraints.type = 'string';
          break;

        case 'number':
        case 'boolean':
          constraints.type = type;
          break;

        default:
      }
    }

    if ((0, _utils.isEmpty)(constraints) && (0, _utils.isEmpty)(children)) {
      return null;
    }

    if (!(0, _utils.isEmpty)(constraints) && name) {
      if (formConstraints[name]) {
        console.warn('More than one component is adding constraints to the same property:', name); // eslint-disable-line no-console
      }

      formConstraints[name] = {};
      Object.entries(constraints).forEach(([constraint, value]) => {
        let length;

        switch (constraint) {
          case 'required':
            formConstraints[name].presence = {
              allowEmpty: false,
              message: '{label} is required.'
            };
            break;

          case 'minLength':
            length = formConstraints[name].length || {};
            length.minimum = value;
            length.tooShort = 'Minimum %{count} letters or more.';
            formConstraints[name].length = length;
            break;

          case 'maxLength':
            length = formConstraints[name].length || {};
            length.maximum = value;
            length.tooLong = 'Maximum %{count} letters or less.';
            formConstraints[name].length = length;
            break;

          case 'numericality':
            formConstraints[name].numericality = value;
            break;

          case 'datetime':
            formConstraints[name].datetime = value;
            break;

          case 'email':
            formConstraints[name].email = {
              message: '{label} is not a valid email.'
            };
            break;

          case 'noWhiteSpace':
            formConstraints[name].format = {
              pattern: /^\S*$/,
              message: '{label} can\'t contain space(s).'
            };
            break;

          case 'custom':
            if (typeof value !== 'function') {
              console.warn('Custom constraint have to be function!'); // eslint-disable-line no-console
            } else {
              formConstraints[name] = value(this.data);
            }

            break;

          default:
            formConstraints[name][constraint] = value;
        }
      });
    }

    if (!(0, _utils.isEmpty)(children)) {
      children.forEach(child => this._addComponentConstraints(child, formConstraints));
    }
  }

  _validate() {
    _validate.default.extend(_validate.default.validators.datetime, {
      // The value is guaranteed not to be null or undefined but otherwise it
      // could be anything.
      parse: function (value, options) {
        return +_moment.default.utc(value);
      },
      // Input is a unix timestamp
      format: function (value, options) {
        var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
        return _moment.default.utc(value).format(format);
      }
    }); // $FlowFixMe


    return (0, _validate.default)(this.data, this._buildFormConstraints(this.components), {
      fullMessages: false
    });
  }

  getErrors(data) {
    if (this.data !== data || {}) {
      this.data = data || {};
      this.errors = this._validate();
      return this.errors;
    }

    return this.errors;
  }

  isValid(data) {
    return !this.getErrors(data);
  }

  getComponents(name) {
    return this.nameComponentsMap[name];
  }

  formatMessage(message, component) {
    const {
      properties
    } = component;
    const {
      name,
      label
    } = properties || {};
    return message.replace('{label}', label || name);
  }

  formatMessages(name, component) {
    const messages = this.errors && this.errors[name];

    if (!messages) {
      return null;
    }

    return messages.map(message => this.formatMessage(message, component));
  }

  getMessages() {
    if (!this.errors) {
      return null;
    }

    const messages = [];
    Object.keys(this.errors).forEach(name => {
      const components = this.getComponents(name);
      components.forEach(component => messages.push(...(this.formatMessages(name, component) || [])));
    });
    return messages;
  }

}

exports.default = FormValidator;