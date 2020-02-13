"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _PersonAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/PersonAutocomplete"));

var _OrganisationAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/OrganisationAutocomplete"));

var _ThingAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/ThingAutocomplete"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _DirectoriesDropdown = _interopRequireDefault(require("app/containers/Common/DropDowns/DirectoriesDropdown/DirectoriesDropdown"));

var _DateTimePickerModal = _interopRequireDefault(require("app/components/molecules/DataTimePicker/DateTimePickerModal"));

var _lo = require("app/utils/lo/lo");

var _EntityAutocompleteWrapper = _interopRequireDefault(require("./EntityAutocompleteWrapper"));

var _CustomEntitesAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/CustomEntitesAutocomplete"));

var _date = require("app/utils/date/date");

var _ClassificationAutocompleteWrapper = _interopRequireDefault(require("app/components/Entities/Classifications/ClassificationAutocompleteWrapper"));

var _ClassificationAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/ClassificationAutocomplete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const StyledMessage = _styledComponents.default.p.withConfig({
  displayName: "FieldItem__StyledMessage",
  componentId: "sc-1tew8ev-0"
})(["overflow-wrap:break-word;"]);

const AlertLabel = _styledComponents.default.span.withConfig({
  displayName: "FieldItem__AlertLabel",
  componentId: "sc-1tew8ev-1"
})(["color:", ";"], ({
  theme
}) => theme && theme.color.warning);
/**
 * Component that generates field based on type
 */


class FieldItem extends _react.PureComponent {
  static isValidFilter(filter) {
    return typeof filter === 'object' && typeof filter.field === 'string' && filter.field && typeof filter.op === 'string' && filter.op && typeof filter.value !== 'undefined';
  }

  render() {
    const {
      type: old_type = '',
      f_uri: name,
      text_ext = '',
      text_ext_position = '',
      name: label = 'Unknown Field',
      enum_values: enumValues = [],
      dir_domain: domain = 'country',
      disabled,
      updateAttribute: onChange,
      attributes,
      default_value,
      format,
      filter_expression,
      kind = 'datetime',
      canBeAppendTo,
      readOnly = false,
      required = false
    } = this.props; // check for undefined cos value can be 0 or false (false positive values)

    const value = attributes && attributes[name] !== undefined ? attributes[name] : default_value || null;
    const type = old_type.toLowerCase();
    const props = {
      key: name,
      name,
      value,
      onChange,
      label,
      text_ext,
      text_ext_position,
      disabled: disabled || readOnly,
      placeholder: label,
      readOnly,
      required
    };

    switch (type) {
      case 'text':
        const textFix = value === null ? '' : value;
        return _react.default.createElement(_Field.default, _extends({}, props, {
          value: textFix,
          type: "text",
          title: `Text field for ${label}`
        }));

      case 'int':
      case 'integer':
        const numberFix = value === null ? '' : value;
        return _react.default.createElement(_Field.default, _extends({}, props, {
          value: numberFix,
          type: "number",
          max: "2147483647",
          min: "-2147483648",
          title: `Number field for ${label}`
        }));

      case 'float':
        const floatFix = value === null ? '' : value;
        return _react.default.createElement(_Field.default, _extends({}, props, {
          value: floatFix,
          type: "number",
          step: ".1",
          title: `Number field with point for ${label}`
        }));

      case 'bool':
        const checked = Boolean(value);
        return _react.default.createElement(_CheckBox.default, _extends({}, props, {
          required: false,
          checked: checked,
          title: `Checkbox field for ${label} - ${!checked ? 'un' : ''}checked`
        }));

      case 'timestamp':
      case 'datetime':
        {
          const {
            onChange,
            value,
            ...fieldProps
          } = props;
          return _react.default.createElement("div", {
            id: 'date-picker-input'
          }, _react.default.createElement(_DateTimePickerModal.default, _extends({}, fieldProps, {
            value: (0, _date.formatByKind)(kind, value),
            onChange: onChange,
            format: format,
            kind: kind,
            appendElementId: 'date-picker-input',
            canBeAppendTo: canBeAppendTo
          })));
        }

      case 'enum':
        {
          const options = !Array.isArray(enumValues) ? [] : enumValues.filter(_lo.isDefined).map(({
            key,
            value
          }) => ({
            value: key,
            label: value
          }));
          return _react.default.createElement(_Dropdown.default, _extends({}, props, {
            options: options,
            placeholder: "Select...",
            title: `Select field for ${label}`
          }));
        }

      case 'directory':
        return _react.default.createElement(_DirectoriesDropdown.default, _extends({}, props, {
          directoryType: domain,
          placeholder: `Find a ${domain}`,
          title: `"${domain}" autocomplete field for ${label}`
        }));

      case 'people':
        return _react.default.createElement(_EntityAutocompleteWrapper.default, _extends({}, props, {
          filterBy: FieldItem.getFilters(filter_expression),
          Autocomplete: _PersonAutocomplete.default
        }));

      case 'organisations':
        return _react.default.createElement(_EntityAutocompleteWrapper.default, _extends({}, props, {
          filterBy: FieldItem.getFilters(filter_expression),
          Autocomplete: _OrganisationAutocomplete.default
        }));

      case 'things':
        return _react.default.createElement(_EntityAutocompleteWrapper.default, _extends({}, props, {
          filterBy: FieldItem.getFilters(filter_expression),
          Autocomplete: _ThingAutocomplete.default
        }));

      case 'custom':
        const cls = this.props.class;
        const filterBy = [{
          field: 'classes.applicableOn',
          op: '=',
          value: 'custom'
        }];

        if (cls) {
          filterBy.push({
            field: 'classes.uri',
            op: '=',
            value: cls.uri
          });
        }

        const filterExpression = FieldItem.getFilters(filter_expression);
        filterExpression && filterExpression.length && filterBy.push(...filterExpression);
        return _react.default.createElement(_CustomEntitesAutocomplete.default, _extends({}, props, {
          filterBy: filterBy
        }));

      case 'classification':
        return _react.default.createElement(_ClassificationAutocompleteWrapper.default, _extends({}, props, {
          filterBy: FieldItem.getFilters(filter_expression),
          Autocomplete: _ClassificationAutocomplete.default
        }));

      default:
        return _react.default.createElement(StyledMessage, {
          key: name,
          style: {
            fontSize: 'small'
          }
        }, "The field ", _react.default.createElement(AlertLabel, null, name), " of type ", _react.default.createElement(AlertLabel, null, type), " is not supported.");
    }
  }

}

_defineProperty(FieldItem, "getFilters", (0, _memoizeOne.default)(filtersString => {
  if (!filtersString) {
    return null;
  }

  try {
    const filter = JSON.parse(filtersString);
    const filters = Array.isArray(filter) ? filter : [filter];

    if (!filters.every(FieldItem.isValidFilter)) {
      throw new Error('Invalid field');
    }

    return filters.map(({
      field,
      op,
      value
    }) => ({
      field,
      op,
      value
    }));
  } catch (e) {
    // fail silently
    return null;
  }
}));

var _default = FieldItem;
exports.default = _default;