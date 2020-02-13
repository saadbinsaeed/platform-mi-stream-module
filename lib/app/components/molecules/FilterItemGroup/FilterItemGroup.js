"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Drawer = _interopRequireDefault(require("app/components/atoms/Drawer/Drawer"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _date = require("app/utils/date/date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FilterItemStyle = _styledComponents.default.div.withConfig({
  displayName: "FilterItemGroup__FilterItemStyle",
  componentId: "sc-1mqwetf-0"
})(["display:block;padding:.8rem .4rem;border-bottom:solid 1px #333;cursor:pointer;"]);

const generateGroupValuesText = (options, value, type) => {
  const hasValue = Array.isArray(value) ? !(0, _utils.isEmpty)(value) : !!value;

  if (hasValue) {
    switch (type) {
      case 'text':
      case 'number':
        return String(value);

      case 'person':
        return (0, _lo.get)(value, 'name') || (0, _lo.get)(value, 'id');

      case 'user':
        return (0, _lo.get)(value, 'name') || (0, _lo.get)(value, 'id');

      case 'select':
      case 'conditionValue':
        const labels = (options || []).filter(el => el.value === value);
        return (0, _lo.get)(labels[0], 'label', value);

      case 'date':
        {
          if (Array.isArray(value)) {
            const from = (0, _date.formatDate)(value[0], _date.DATETIME_DISPLAY_FORMAT);

            if (!value[1]) {
              return from;
            }

            const to = (0, _date.formatDate)(value[1], _date.DATETIME_DISPLAY_FORMAT);
            return `${from} - ${to}`;
          } else {
            return (0, _date.formatDate)(value, _date.DATETIME_DISPLAY_FORMAT);
          }
        }

      default:
        return 'Not a valid type';
    }
  } else {
    return 'Any';
  }
};
/**
 * Component to show a filterable item with selectable options
 */


class FilterItemGroup extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleFilters", () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    });

    _defineProperty(this, "openFilters", () => {
      !this.state.isOpen && this.setState({
        isOpen: true
      });
    });

    _defineProperty(this, "onClick", e => {
      e.stopPropagation();
      const {
        definition: {
          field
        },
        onChange
      } = this.props;
      onChange({
        originalEvent: e,
        name: `${field}.value`,
        value: null
      });
    });

    this.state = {
      isOpen: false
    };
  }

  render() {
    const {
      value,
      children,
      definition
    } = this.props;
    const {
      label,
      type,
      options
    } = definition;
    return _react.default.createElement(FilterItemStyle, {
      onClick: this.openFilters
    }, _react.default.createElement("b", null, label), _react.default.createElement(_Flex.default, {
      spaceBetween: true
    }, _react.default.createElement("div", null, generateGroupValuesText(options, value, type)), _react.default.createElement(_Icon.default, {
      name: "close-circle",
      size: "md",
      onClick: this.onClick
    })), _react.default.createElement(_Drawer.default, {
      title: `${label} filters`,
      isOpen: this.state.isOpen,
      isToggled: this.toggleFilters
    }, _react.default.createElement("div", null, children)));
  }

}

_defineProperty(FilterItemGroup, "propTypes", {
  name: _propTypes.default.string,
  options: _propTypes.default.array,
  value: _propTypes.default.any,
  children: _propTypes.default.any
});

var _default = FilterItemGroup;
exports.default = _default;