"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillProperties = exports.addExtraSpace = exports.getFieldByType = exports.getElementsDefinitions = void 0;

var _react = _interopRequireDefault(require("react"));

var _platformUi = require("@mic3/platform-ui");

var _DateTime = _interopRequireDefault(require("app/containers/Designer/Form/components/DateTime"));

var _Group = _interopRequireDefault(require("app/components/atoms/Designer/Group"));

var _ExpansionPanel = _interopRequireDefault(require("app/components/Designer/ExpansionPanel"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _Textarea = _interopRequireDefault(require("app/containers/Designer/Form/components/Textarea"));

var _FormField = require("app/containers/Designer/Form/components/FormField");

var _UserTypeahead = _interopRequireDefault(require("app/components/organisms/Form/Typeahead/UserTypeahead"));

var _GroupTypeahead = _interopRequireDefault(require("app/components/organisms/Form/Typeahead/GroupTypeahead"));

var _ClassificationTypeahead = _interopRequireDefault(require("app/components/organisms/Form/Typeahead/ClassificationTypeahead"));

var _ProcessTypeTypeahead = _interopRequireDefault(require("app/components/organisms/Form/Typeahead/ProcessTypeTypeahead"));

var _OrganisationTypeahead = _interopRequireDefault(require("app/components/organisms/Form/Typeahead/OrganisationTypeahead"));

var _CustomEntitiesTypeahead = _interopRequireDefault(require("app/components/organisms/Form/Typeahead/CustomEntitiesTypeahead"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Text = (0, _FormField.fieldify)(_platformUi.TextField);
const Textarea = (0, _FormField.fieldify)(_Textarea.default);
const Panel = (0, _FormField.fieldify)(_ExpansionPanel.default);
const Group = (0, _FormField.fieldify)(_Group.default);
const Button = (0, _FormField.fieldify)(_platformUi.Button);
const Switch = (0, _FormField.fieldify)(_platformUi.Switch);
const DateTime = (0, _FormField.fieldify)(_DateTime.default);
const DateTimeRange = (0, _FormField.fieldify)(_platformUi.DateTimePickerRange);
const DisplayText = (0, _FormField.fieldify)(_platformUi.Typography);
const Typeahead = (0, _FormField.fieldify)(_platformUi.Autocomplete);
const TypeaheadLazy = (0, _FormField.fieldify)(_platformUi.AutocompleteLazy);
const UserTh = (0, _FormField.fieldify)(_UserTypeahead.default);
const GroupTh = (0, _FormField.fieldify)(_GroupTypeahead.default);
const ClassificationTh = (0, _FormField.fieldify)(_ClassificationTypeahead.default);
const ProcessTypeTh = (0, _FormField.fieldify)(_ProcessTypeTypeahead.default);
const OrganisationTh = (0, _FormField.fieldify)(_OrganisationTypeahead.default);
const CustomEntitiesTh = (0, _FormField.fieldify)(_CustomEntitiesTypeahead.default);
const AvatarEditor = (0, _FormField.fieldify)(_platformUi.AvatarEditor);
/**
 * For customizing properties we have to change `app/utils/designer/form/fieldSettingsUtils.js` file
 */

const elementsDefinitions = (0, _Immutable.default)([{
  type: 'text'
}, {
  type: 'textarea',
  defaults: {
    rows: 5,
    parseAs: 'text'
  }
}, {
  type: 'number'
}, {
  type: 'boolean'
}, {
  type: 'dateTime',
  defaults: {
    fullWidth: true,
    variant: 'filled'
  }
}, {
  type: 'dateTimeRange',
  defaults: {
    fullWidth: true,
    variant: 'filled'
  }
}, {
  type: 'outcome'
}, {
  type: 'group',
  defaults: {
    children: []
  }
}, {
  type: 'panel',
  defaults: {
    children: []
  }
}, {
  type: 'displayText'
}, {
  type: 'header',
  defaults: {
    variant: 'h3'
  }
}, {
  type: 'typeahead',
  defaults: {
    isFetching: false
  }
}]);

const getElementsDefinitions = () => elementsDefinitions;

exports.getElementsDefinitions = getElementsDefinitions;

const getFieldByType = (type, properties, children) => {
  switch (type) {
    case 'panel':
      return _react.default.createElement(Panel, properties, children);

    case 'group':
      return _react.default.createElement(Group, properties, children);

    case 'outcome':
      {
        const {
          label,
          ...rest
        } = properties;
        return _react.default.createElement(Button, rest, label);
      }

    case 'text':
      return _react.default.createElement(Text, properties);

    case 'textarea':
      return _react.default.createElement(Textarea, properties);

    case 'number':
      return _react.default.createElement(Text, _extends({}, properties, {
        type: "number"
      }));

    case 'boolean':
      return _react.default.createElement(Switch, properties);

    case 'dateTime':
      return _react.default.createElement(DateTime, _extends({
        fullWidth: true,
        variant: "filled",
        ampm: false
      }, properties));

    case 'dateTimeRange':
      return _react.default.createElement(DateTimeRange, _extends({
        fullWidth: true,
        variant: "filled"
      }, properties));

    case 'displayText':
      {
        const {
          text,
          ...rest
        } = properties;
        return _react.default.createElement(DisplayText, _extends({
          align: "left",
          variant: "caption"
        }, rest), text);
      }

    case 'header':
      {
        const {
          text,
          ...rest
        } = properties;
        return _react.default.createElement(DisplayText, _extends({
          align: "left"
        }, rest), text);
      }

    case 'typeahead':
      {
        const {
          isFetching,
          fetchData,
          valueField,
          parseAs,
          ...rest
        } = properties;
        return isFetching ? _react.default.createElement(TypeaheadLazy, _extends({}, rest, {
          fetchData: fetchData,
          valueField: valueField
        })) : _react.default.createElement(Typeahead, _extends({}, rest, {
          valueField: "value"
        }));
      }

    case 'processTypeTypeahead':
      {
        return _react.default.createElement(ProcessTypeTh, properties);
      }

    case 'userTypeahead':
      {
        return _react.default.createElement(UserTh, properties);
      }

    case 'groupTypeahead':
      {
        return _react.default.createElement(GroupTh, properties);
      }

    case 'classificationTypeahead':
      {
        return _react.default.createElement(ClassificationTh, properties);
      }

    case 'organisationTypeahead':
      {
        return _react.default.createElement(OrganisationTh, properties);
      }

    case 'customEntitiesTypeahead':
      {
        return _react.default.createElement(CustomEntitiesTh, properties);
      }

    case 'avatarEditor':
      {
        return _react.default.createElement(AvatarEditor, properties);
      }

    default:
      throw new Error(`Unknown type "${type}"`);
  }
};
/**
 * If by the default we have empty DOM element, we need fo fill it for showing in sidebar.
 * @param type specified this behaviour by type of component.
 **/


exports.getFieldByType = getFieldByType;

const addExtraSpace = type => (type === 'group' || type === 'displayText' || type === 'header') && _react.default.createElement("div", {
  style: {
    height: '48px'
  }
});
/**
 * Sets the values of the properties using the defaults values where the properties are not defined.
 *
 * @param properties the properties' values.
 * @param defaults the defaults' values.
 * @return the values of the properties using the defaults values where the properties are not defined.
 */


exports.addExtraSpace = addExtraSpace;

const fillProperties = (properties, defaults) => {
  const propertiesValues = { ...properties
  };
  defaults && Object.entries(defaults).forEach(([key, value]) => {
    if (propertiesValues[key] === undefined) {
      propertiesValues[key] = value;
    }
  });
  return propertiesValues;
};

exports.fillProperties = fillProperties;