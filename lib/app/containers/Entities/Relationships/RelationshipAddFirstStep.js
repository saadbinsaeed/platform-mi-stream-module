"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RelationshipAddFirstStep = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _RelationDefinitionAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/RelationDefinitionAutocomplete"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _event = require("app/utils/http/event");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *  RelationshipAddFirstStep view
 */
class RelationshipAddFirstStep extends _react.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value && this.props.value && prevProps.value.type2 !== this.props.value.type2) {
      const event = (0, _event.createEvent)('change', {
        name: 'relationDefinition',
        value: undefined
      });
      this.props.onChange(event);
    }
  }

  render() {
    const {
      isAdmin,
      type1,
      value
    } = this.props;
    const {
      relationDefinition,
      type2
    } = value;
    return _react.default.createElement(_Container.default, {
      width: "1024"
    }, _react.default.createElement(_Card.default, {
      headerColor: "#384147",
      description: _react.default.createElement("div", null, _react.default.createElement(_Dropdown.default, {
        name: "type2",
        label: "Entity type",
        placeholder: "Select..",
        onChange: this.props.onChange,
        closeOnChange: true,
        value: type2,
        clearable: false,
        required: true,
        options: [{
          value: 'thing',
          label: 'Things'
        }, {
          value: 'person',
          label: 'People'
        }, {
          value: 'organisation',
          label: 'Organisations'
        }, {
          value: 'custom',
          label: 'Custom Entities'
        }, {
          value: 'process',
          label: 'Processes'
        }, {
          value: 'task',
          label: 'Tasks'
        }]
      }), type2 && _react.default.createElement(_RelationDefinitionAutocomplete.default, {
        name: "relationDefinition",
        label: "Relationship type",
        value: relationDefinition,
        onChange: this.props.onChange,
        type1: type1,
        type2: type2,
        filterBy: isAdmin ? [] : [{
          field: 'customEntity.active',
          op: '=',
          value: true
        }],
        required: true,
        key: relationDefinition && relationDefinition.id,
        clearable: false
      }))
    }));
  }

}

exports.RelationshipAddFirstStep = RelationshipAddFirstStep;

_defineProperty(RelationshipAddFirstStep, "propTypes", {
  isAdmin: _propTypes.default.bool,
  type1: _propTypes.default.string,
  value: _propTypes.default.object
});

var _default = RelationshipAddFirstStep;
exports.default = _default;