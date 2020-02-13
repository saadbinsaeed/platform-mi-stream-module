"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RelationshipAddSecondStep = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _moment = _interopRequireDefault(require("moment"));

var _VirtualListManaged = _interopRequireDefault(require("app/components/molecules/VirtualList/VirtualListManaged"));

var _Filters = _interopRequireWildcard(require("app/components/organisms/Filters/Filters"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _relationshipsActions = require("store/actions/entities/relationshipsActions");

var _EntityListItem = _interopRequireDefault(require("app/containers/Entities/common/EntityListItem"));

var _filterConditions = require("app/utils/static/filter-conditions");

var _aboxConfig = require("app/config/aboxConfig");

var _event = require("app/utils/http/event");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ListContainer = _styledComponents.default.div.withConfig({
  displayName: "RelationshipAddSecondStep__ListContainer",
  componentId: "sc-1hehbvi-0"
})(["flex-grow:1;"]);

const HiddenInput = _styledComponents.default.input.withConfig({
  displayName: "RelationshipAddSecondStep__HiddenInput",
  componentId: "sc-1hehbvi-1"
})(["position:absolute;opacity:0;width:0px;height:0px;margin-left:50%;top:10rem;"]);

const Container = _styledComponents.default.div.withConfig({
  displayName: "RelationshipAddSecondStep__Container",
  componentId: "sc-1hehbvi-2"
})(["height:calc(100vh - 94px);> *{min-height:100%;}"]);

const StyledFilters = (0, _styledComponents.default)(_Filters.default).withConfig({
  displayName: "RelationshipAddSecondStep__StyledFilters",
  componentId: "sc-1hehbvi-3"
})(["> *:first-child{padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;background:#343a45;box-shadow:0 2px 1px rgba(0,0,0,0.3),0 0 1px rgba(0,0,0,0.1);z-index:1;input{padding:0;line-height:32px;}}", "{display:flex;}"], _Filters.Content);
const StyledEntityListItem = (0, _styledComponents.default)(_EntityListItem.default).withConfig({
  displayName: "RelationshipAddSecondStep__StyledEntityListItem",
  componentId: "sc-1hehbvi-4"
})(["cursor:pointer;background:", ";"], ({
  selected
}) => selected ? 'rgba(30, 168, 207, 0.2)' : '#343a45');
/**
 *  RelationshipAddFirstStep view
 */

class RelationshipAddSecondStep extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "virtualListRef", _react.default.createRef());

    _defineProperty(this, "searchBar", ['name', 'id']);

    _defineProperty(this, "defaultFilters", {});

    _defineProperty(this, "defaultOrder", [{
      field: 'name',
      direction: 'asc'
    }]);

    _defineProperty(this, "buildFilterDefinitions", (0, _memoizeOne.default)((type, isAdmin = false) => {
      const filters = [];

      if (type === 'process') {
        filters.push(...[{
          field: 'name',
          type: 'text',
          properties: {
            label: 'Name',
            name: 'name'
          }
        }, {
          field: 'id',
          type: 'text',
          properties: {
            label: 'ID',
            name: 'id'
          },
          condition: '='
        }, {
          field: 'createdBy.id',
          type: 'userTypeahead',
          properties: {
            label: 'Created By',
            name: 'createdById'
          },
          condition: '='
        }, {
          field: 'createDate',
          type: 'dateTimeRange',
          properties: {
            label: 'Create Date',
            name: 'createDate'
          }
        }, {
          field: 'endDate',
          type: 'dateTimeRange',
          properties: {
            label: 'End date',
            name: 'endDate'
          }
        }, {
          field: 'status.lastUpdate',
          type: 'dateTimeRange',
          properties: {
            label: 'Update Date',
            name: 'statusLastUpdate'
          }
        }]);
      } else if (type === 'task') {
        filters.push(...[{
          field: 'assignee.id',
          type: 'userTypeahead',
          properties: {
            label: 'Assignee',
            name: 'assigneeId'
          },
          condition: '='
        }, {
          field: 'involvement',
          type: 'typeahead',
          properties: {
            label: 'My involvement',
            name: 'involvement',
            options: _filterConditions.involvementConditions
          },
          sort: false
        }, {
          field: 'name',
          type: 'text',
          properties: {
            label: 'Name',
            name: 'name'
          }
        }, {
          field: 'id',
          type: 'text',
          properties: {
            label: 'ID',
            name: 'id'
          },
          condition: '='
        }, {
          field: 'endDate',
          type: 'typeahead',
          properties: {
            label: 'Status',
            name: 'status',
            options: [{
              value: 'is null',
              label: 'Open'
            }, {
              value: 'is not null',
              label: 'Closed'
            }]
          },
          sort: false
        }, {
          field: 'priority',
          type: 'typeahead',
          properties: {
            label: 'Priority',
            name: 'priority',
            options: _aboxConfig.PRIORITY_OPTIONS
          },
          condition: '='
        }, {
          field: 'startDate',
          type: 'dateTimeRange',
          properties: {
            label: 'Create Date',
            name: 'startDate'
          }
        }, {
          field: 'bpmnVariables.startDate',
          type: 'dateTimeRange',
          properties: {
            label: 'Start Date',
            name: 'bpmnVariablesStartDate'
          }
        }, {
          field: 'dueDate',
          type: 'dateTimeRange',
          properties: {
            label: 'Due Date',
            name: 'dueDate'
          }
        }, {
          field: 'endDate',
          type: 'dateTimeRange',
          properties: {
            label: 'End Date',
            name: 'endDate'
          }
        }, {
          field: 'taskStatus.lastUpdate',
          type: 'dateTimeRange',
          properties: {
            label: 'Update Date',
            name: 'taskStatusLastUpdate'
          }
        }]);
      } else {
        filters.push(...[{
          field: 'id',
          type: 'number',
          properties: {
            label: 'ID',
            name: 'id'
          },
          condition: '='
        }, {
          field: 'name',
          type: 'text',
          properties: {
            label: 'Name',
            name: 'name'
          }
        }, {
          field: 'description',
          type: 'text',
          properties: {
            label: 'Description',
            name: 'description'
          }
        }]);

        if (isAdmin) {
          filters.push({
            field: 'active',
            type: 'boolean',
            properties: {
              label: 'Active',
              name: 'active'
            },
            condition: '='
          });
        }

        filters.push(...[{
          field: 'createdDate',
          type: 'dateTimeRange',
          properties: {
            label: 'Create Date',
            name: 'createdDate'
          }
        }, {
          field: 'createdBy.id',
          type: 'userTypeahead',
          properties: {
            label: 'Created By',
            name: 'createdById'
          },
          condition: '='
        }, {
          field: 'modifiedDate',
          type: 'dateTimeRange',
          properties: {
            label: 'Modified Date',
            name: 'modifiedDate'
          }
        }, {
          field: 'modifiedBy.id',
          type: 'userTypeahead',
          properties: {
            label: 'Modified By',
            name: 'modifiedById'
          },
          condition: '='
        }]);
      }

      return filters;
    }));

    _defineProperty(this, "updateList", () => {
      if (this.virtualListRef && this.virtualListRef.current) {
        this.virtualListRef.current.forceUpdate();
      }
    });

    _defineProperty(this, "onClick", (event, entity2) => {
      event.preventDefault();
      this.props.onChange((0, _event.createEvent)('change', {
        name: 'entity2',
        value: entity2
      }));
      this.updateList();
    });

    _defineProperty(this, "renderComponent", ({
      style,
      index,
      data
    }) => _react.default.createElement("div", {
      style: style,
      key: index
    }, _react.default.createElement(StyledEntityListItem, {
      data: data,
      title: "Click to select",
      type: this.props.value && this.props.value.type2,
      onClick: e => this.onClick(e, data),
      selected: this.props.value && this.props.value.entity2 && this.props.value.entity2.id === data.id
    })));

    _defineProperty(this, "loadEntities", (0, _memoizeOne.default)(options => {
      const {
        entityId,
        type1,
        value: {
          type2,
          relationDefinition
        },
        isAdmin
      } = this.props;
      const nType1 = type1 === 'custom' ? 'customEntity' : type1;
      const excludeBy = [...(options.excludeBy || [])];
      const filterBy = [...(options.filterBy || [])];
      const relationshipsKey = type2 === 'process' ? 'relations' : 'relationships';

      if (type1 === type2) {
        filterBy.push({
          field: 'id',
          op: '<>',
          value: entityId
        });
      }

      if (!isAdmin && !['task', 'process'].includes(type2)) {
        filterBy.push({
          field: 'active',
          op: '=',
          value: true
        });
      }

      if (['task', 'process'].includes(type2)) {
        filterBy.push({
          or: [{
            field: 'endDate',
            op: '>',
            value: (0, _moment.default)().subtract(2, 'months').toISOString()
          }, {
            field: 'endDate',
            op: 'is null'
          }]
        });
      }

      excludeBy.push({
        or: [{
          field: `${relationshipsKey}.${nType1}1.id`,
          op: '=',
          value: entityId
        }, {
          field: `${relationshipsKey}.${nType1}2.id`,
          op: '=',
          value: entityId
        }]
      }, {
        field: `${relationshipsKey}.relationDefinition.id`,
        op: '=',
        value: relationDefinition.id
      });
      return this.props.loadRelationshipAddEntities({ ...options,
        filterBy,
        excludeBy
      }, type2);
    }));
  }

  render() {
    const {
      totalRecords,
      isLoading,
      startIndex,
      records,
      isAdmin,
      value: {
        type2,
        entity2
      }
    } = this.props;
    return _react.default.createElement(Container, null, _react.default.createElement(StyledFilters, {
      id: `RelationshipsAddFilters/${type2}`,
      filterDefinitions: this.buildFilterDefinitions(type2, isAdmin),
      searchBar: this.searchBar,
      defaultFilters: this.defaultFilters,
      defaultOrder: this.defaultOrder
    }, (filterBy, orderBy) => _react.default.createElement(ListContainer, null, !entity2 && _react.default.createElement(HiddenInput, {
      name: "fake_entity2",
      type: "text",
      required: true,
      value: "",
      onChange: this.props.onChange,
      onInvalid: e => e.target.setCustomValidity('Please select any record.')
    }), _react.default.createElement(_VirtualListManaged.default, {
      ref: this.virtualListRef,
      renderComponent: this.renderComponent,
      itemSize: 84,
      itemCount: totalRecords || 0,
      loadData: this.loadEntities,
      isLoading: isLoading,
      startIndex: startIndex || 0,
      filterBy: filterBy,
      orderBy: orderBy,
      list: records,
      maxWidth: "1024"
    }))));
  }

}

exports.RelationshipAddSecondStep = RelationshipAddSecondStep;

_defineProperty(RelationshipAddSecondStep, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  entityId: _propTypes.default.string.isRequired,
  type1: _propTypes.default.string.isRequired,
  isAdmin: _propTypes.default.bool,
  value: _propTypes.default.object
});

_defineProperty(RelationshipAddSecondStep, "defaultProps", {
  isAdmin: false,
  value: {}
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.entities.relationshipsAdd.isLoading,
  startIndex: state.entities.relationshipsAdd.startIndex,
  records: state.entities.relationshipsAdd.records,
  totalRecords: state.entities.relationshipsAdd.count
}), {
  loadRelationshipAddEntities: _relationshipsActions.loadRelationshipAddEntities
})(RelationshipAddSecondStep);

exports.default = _default;