"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassificationFormBuilder = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _PeopleDropdownDeprecated = _interopRequireDefault(require("app/containers/Common/DropDowns/PeopleDropdownDeprecated"));

var _OrganisationsDropdownDeprecated = _interopRequireDefault(require("app/containers/Common/DropDowns/OrganisationsDropdownDeprecated"));

var _DirectoriesDropdown = _interopRequireDefault(require("app/containers/Common/DropDowns/DirectoriesDropdown/DirectoriesDropdown"));

var _ThingsDropdownDeprecated = _interopRequireDefault(require("app/containers/Common/DropDowns/ThingsDropdownDeprecated"));

var _Field = _interopRequireDefault(require("app/components/molecules/Field/Field"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _event = require("app/utils/http/event");

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Builds a form
 */
class ClassificationFormBuilder {
  /**
   * Generate a form
   *
   * @param fields
   * @param formData
   * @param classificationName
   * @param onChange
   * @return {*}
   */
  static generateForm(fields, formData, classificationUri, classificationPermissions, onChange, canEdit = true) {
    // By default user is able to edit attributes
    const disabled = !(classificationPermissions.includes('edit') || classificationPermissions.includes('write'));

    if (!fields || !fields.length) {
      return _react.default.createElement(_Card.default, {
        collapsible: true,
        title: classificationUri || 'Classification Data',
        description: _react.default.createElement("span", null, " No classification data is available for ", classificationUri || 'this entity', ". ")
      });
    }

    return ClassificationFormBuilder.generateGroups(fields, formData, disabled, onChange, canEdit);
  }
  /**
   * Generate groups, wrapped in a cards, for a set of fields, based on the group_name.
   *
   * @param fields
   * @param formData
   * @param onChange
   */


  static generateGroups(fields, formData, disabled, onChange, canEdit) {
    // API sometimes returns null, sometimes undefined, sometimes empty string.
    // We need to sort this out before grouping:
    const consolidatedFields = fields.map(({
      group_name,
      ...others
    }) => ({ ...others,
      group_name: group_name || 'Ungrouped'
    })); //1. Group the types by group_name:

    const groupedFields = (0, _lo.groupBy)(consolidatedFields, 'group_name'); //2. For every group, we will generate the fields,

    return (0, _lo.map)(groupedFields, (group, groupName) => _react.default.createElement(_Card.default, {
      key: groupName,
      collapsible: true,
      collapsed: true,
      title: groupName,
      description: _react.default.createElement("div", null, " ", ClassificationFormBuilder.generateFieldComponents(group, formData, disabled, onChange), " "),
      footer: canEdit && _react.default.createElement(_Button.default, {
        color: "primary"
      }, " Save ") || _react.default.createElement("div", null)
    }));
  }
  /**
   * Generates an array of fields based on the inputted JSON.
   *
   * @param fields
   * @param formData
   * @param onChange
   * @return {Array|Iterable<K, M>}
   */


  static generateFieldComponents(fields, formData, disabled, onChange) {
    return fields.map(field => {
      const value = formData[field.f_uri] === undefined ? (0, _lo.get)(field, 'default_value') : formData[field.f_uri];
      return ClassificationFormBuilder.getControlFromType(field, value, disabled, onChange);
    });
  }
  /**
   * Gets a control from a specific type.
   *
   * Datatype of the value of the field. One of:
   * - text
   * - int
   * - float
   * - bool
   * - timestamp
   * - enum (static) values (key, value)
   * - things (Filtered by specified classification or by specified tag)
   * - people (Filtered by specified classification or by specified tag)
   * - organisations (Filtered by specified classification or by specified tag)
   * - directory (Filtered by domain)
   */


  static getControlFromType(field, value, disabled, onChange) {
    const type = ((0, _lo.get)(field, 'type') || '').toLowerCase();
    const name = String((0, _lo.get)(field, 'f_uri') || '');
    const text_ext = (0, _lo.get)(field, 'text_ext');
    const text_ext_position = (0, _lo.get)(field, 'text_ext_position');
    const label = (0, _lo.get)(field, 'name') || name || 'Unknown Field';
    const enumValues = (0, _lo.get)(field, 'enum_values');
    const domain = (0, _lo.get)(field, 'dir_domain');
    const props = {
      value,
      onChange,
      label,
      text_ext,
      text_ext_position,
      disabled
    };

    switch (type) {
      case 'text':
        return _react.default.createElement(_Field.default, _extends({
          key: name,
          label: label,
          name: name,
          type: "text"
        }, props));

      case 'int':
      case 'integer':
        return _react.default.createElement(_Field.default, _extends({
          key: name,
          label: label,
          name: name,
          type: "number",
          max: "2147483647",
          min: "-2147483648"
        }, props));

      case 'float':
        return _react.default.createElement(_Field.default, _extends({
          key: name,
          label: label,
          name: name,
          type: "number",
          step: ".1"
        }, props));

      case 'bool':
        return _react.default.createElement(_CheckBox.default, {
          key: name,
          label: label,
          name: name,
          checked: Boolean(value),
          onChange: onChange,
          disabled: disabled
        });

      case 'timestamp':
      case 'datetime':
        {
          const {
            value,
            onChange,
            ...fieldProps
          } = props;
          const formatted = value && (0, _moment.default)(value).format('YYYY-MM-DDTHH:mm');

          const handleChange = event => {
            const {
              name,
              value,
              type
            } = event.target;
            const datetime = value && (0, _moment.default)(value).format();
            onChange((0, _event.createEvent)('change', {
              name,
              type,
              value: datetime
            }));
          };

          return _react.default.createElement(_Field.default, _extends({
            key: name,
            label: label,
            name: name,
            type: "datetime-local"
          }, fieldProps, {
            value: formatted,
            onChange: handleChange
          }));
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
          return _react.default.createElement(_Dropdown.default, {
            key: name,
            name: name,
            label: label,
            value: value,
            onChange: onChange,
            options: options,
            disabled: disabled
          });
        }

      case 'directory':
        return _react.default.createElement("div", {
          key: name
        }, _react.default.createElement(_DirectoriesDropdown.default, _extends({
          name: name,
          directoryType: domain || 'country'
        }, props)));

      case 'people':
        return _react.default.createElement("div", {
          key: name
        }, _react.default.createElement(_PeopleDropdownDeprecated.default, {
          label: label,
          name: name,
          onChange: onChange,
          value: value,
          disabled: disabled
        }));

      case 'organisations':
        return _react.default.createElement("div", {
          key: name
        }, _react.default.createElement(_OrganisationsDropdownDeprecated.default, {
          label: label,
          name: name,
          onChange: onChange,
          value: value,
          disabled: disabled
        }));

      case 'things':
        return _react.default.createElement("div", {
          key: name
        }, _react.default.createElement(_ThingsDropdownDeprecated.default, {
          label: label,
          name: name,
          onChange: onChange,
          value: value,
          disabled: disabled
        }));

      default:
        return _react.default.createElement("div", {
          key: name,
          style: {
            fontSize: 'small'
          }
        }, `The field "${name}" of type "${type}" is not supported.`);
    }
  }

}

exports.ClassificationFormBuilder = ClassificationFormBuilder;