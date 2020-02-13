"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Select = _interopRequireDefault(require("./Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FreeTextSelect extends _Select.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "suggest", ({
      query
    }) => {
      const {
        options,
        value
      } = this.props;
      const filteredOptions = this.filterOptions(options, value, query);

      if (query) {
        filteredOptions.push({
          value: query,
          label: query,
          custom: true
        });
      }

      this.setState({
        filteredOptions
      });
    });

    _defineProperty(this, "itemTemplate", option => {
      const {
        label,
        custom
      } = option;
      const text = this.props.itemTemplate ? this.props.itemTemplate(label) : label;
      return custom ? `Create option "${label}"` : text;
    });
  }

}

var _default = FreeTextSelect;
exports.default = _default;