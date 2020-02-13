"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _PersonAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/PersonAutocomplete"));

var _RelationDefinitionAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/RelationDefinitionAutocomplete"));

var _OrganisationAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/OrganisationAutocomplete"));

var _ThingAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/ThingAutocomplete"));

var _CustomEntitesAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/CustomEntitesAutocomplete"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Form = _interopRequireDefault(require("app/components/atoms/Form/Form"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _lo = require("app/utils/lo/lo");

var _History = _interopRequireDefault(require("store/History"));

var _relationshipsActions = require("store/actions/entities/relationshipsActions");

var _ModalFooter = _interopRequireDefault(require("app/components/molecules/Modal/ModalFooter"));

var _common = require("app/utils/propTypes/common");

var _ProcessesAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/ProcessesAutocomplete"));

var _TasksAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/TasksAutocomplete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the view to add a relationship.
 */
class AddRelationship extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      data: {},
      isDisabled: true
    });

    _defineProperty(this, "aboxTypes", ['process', 'task']);

    _defineProperty(this, "onFormSubmit", event => {
      event.preventDefault();
      const {
        entityId,
        type1,
        type2,
        location
      } = this.props;
      const data = this.state.data || {};
      const {
        relationDefinition,
        entity2
      } = data;

      if (!relationDefinition || !relationDefinition.id || !relationDefinition.entityType1 || !relationDefinition.entityType2) {
        return this.props.toster;
      }

      if (!entity2 || !entity2.id) {
        return this.props.toster;
      }

      const record = {
        relationDefinitionId: relationDefinition.id,
        nodeId1: 0,
        nodeId2: 0
      };
      const {
        entityType1,
        entityType2,
        isReverse
      } = relationDefinition;

      if (entityType1 === type1 && entityType2 === type2 && !isReverse) {
        record.nodeId1 = Number(entityId);
        record.nodeId2 = Number(entity2.id);
      } else if (entityType1 === type2 && entityType2 === type1) {
        record.nodeId1 = Number(entity2.id);
        record.nodeId2 = Number(entityId);
      } else {
        return this.props.toster;
      }

      this.setState({
        isDisabled: true
      });
      this.props.createRelationship(record).then(mbError => {
        if (!(mbError instanceof Error)) {
          this.setState({
            data: {},
            isDisabled: true
          });

          _History.default.push(location.pathname.replace('/add', ''));
        } else {
          this.setState({
            isDisabled: false
          });
        }
      });
    });

    _defineProperty(this, "onChange", event => {
      const {
        name,
        value
      } = event.target;
      const data = (0, _lo.set)(this.state.data, name, value);
      this.setState({
        data,
        isDisabled: !(data.relationDefinition && data.entity2)
      });
    });

    _defineProperty(this, "_buildFilterBy", (0, _memoizeOne.default)((data, entityId, type1, type2, isAdmin = false) => {
      const nType1 = type1 === 'custom' ? 'customEntity' : type1;
      const filterBy = [];

      if (type1 === type2) {
        filterBy.push({
          field: 'id',
          op: '<>',
          value: entityId
        });
      }

      if (data.relationDefinition) {
        filterBy.push({
          or: [[{
            field: `relationships.${nType1}1.id`,
            op: '<>',
            value: entityId
          }, {
            field: `relationships.relationDefinition.id`,
            op: '<>',
            value: data.relationDefinition.id
          }], [{
            field: `relationships.${nType1}2.id`,
            op: '<>',
            value: entityId
          }, {
            field: `relationships.relationDefinition.id`,
            op: '<>',
            value: data.relationDefinition.id
          }]]
        });
      }

      if (!isAdmin && !this.aboxTypes.includes(type2)) {
        filterBy.push({
          field: 'active',
          op: '=',
          value: true
        });
      }

      return filterBy;
    }));
  }

  renderEntitySelect() {
    const {
      type1,
      type2,
      entityId,
      userProfile: {
        isAdmin
      }
    } = this.props;
    const {
      data = {}
    } = this.state;

    if (!data.relationDefinition) {
      return null;
    }

    const props = {
      key: data.entity2 && data.entity2.id,
      name: 'entity2',
      value: data.entity2,
      onChange: this.onChange,
      filterBy: this._buildFilterBy(data, entityId, type1, type2, isAdmin),
      required: true
    };

    if (type2 === 'thing') {
      return _react.default.createElement(_ThingAutocomplete.default, _extends({}, props, {
        label: "Choose a thing"
      }));
    } else if (type2 === 'person') {
      return _react.default.createElement(_PersonAutocomplete.default, _extends({}, props, {
        label: "Choose a person"
      }));
    } else if (type2 === 'organisation') {
      return _react.default.createElement(_OrganisationAutocomplete.default, _extends({}, props, {
        label: "Choose an organisation"
      }));
    } else if (type2 === 'custom') {
      return _react.default.createElement(_CustomEntitesAutocomplete.default, _extends({}, props, {
        label: "Choose a custom entity"
      }));
    } else if (type2 === 'process') {
      return _react.default.createElement(_ProcessesAutocomplete.default, _extends({}, props, {
        label: "Choose a process"
      }));
    } else if (type2 === 'task') {
      return _react.default.createElement(_TasksAutocomplete.default, _extends({}, props, {
        label: "Choose a task"
      }));
    }

    return _react.default.createElement("h2", null, "Unsupported type");
  }
  /**
   * @override
   */


  render() {
    const {
      type1,
      type2,
      location,
      userProfile: {
        isAdmin
      }
    } = this.props;
    const {
      data,
      isDisabled
    } = this.state;
    const {
      relationDefinition
    } = data;
    const filterBy = isAdmin ? [] : [{
      field: 'customEntity.active',
      op: '=',
      value: true
    }];
    return _react.default.createElement(_Modal.default, {
      title: "Add a relationship",
      open: true,
      closeUrl: location.pathname.replace('/add', '')
    }, _react.default.createElement(_Form.default, {
      onSubmit: this.onFormSubmit
    }, _react.default.createElement(_RelationDefinitionAutocomplete.default, {
      name: "relationDefinition",
      label: "Choose a relationship type",
      value: relationDefinition,
      onChange: this.onChange,
      type1: type1,
      type2: type2,
      filterBy: filterBy,
      required: true,
      key: relationDefinition && relationDefinition.id
    }), this.renderEntitySelect(), _react.default.createElement(_ModalFooter.default, null, _react.default.createElement(_Button.default, {
      type: "button",
      onClick: _History.default.pushBack
    }, "Cancel"), _react.default.createElement(_Button.default, {
      type: "submit",
      color: "primary",
      disabled: isDisabled
    }, "Submit"))));
  }

}

_defineProperty(AddRelationship, "propTypes", {
  entityId: _propTypes.default.string.isRequired,
  type1: _common.allTypesProps.isRequired,
  type2: _common.allTypesProps.isRequired,
  location: _propTypes.default.object.isRequired,
  userProfile: _propTypes.default.object,
  createRelationship: _propTypes.default.func.isRequired
});

var _default = (0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile
}), {
  createRelationship: _relationshipsActions.createRelationship
})(AddRelationship);

exports.default = _default;