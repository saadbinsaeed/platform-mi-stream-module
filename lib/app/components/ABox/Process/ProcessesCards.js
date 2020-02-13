"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ProcessCard = _interopRequireDefault(require("app/components/ABox/Process/ProcessCard"));

var _Filters = _interopRequireDefault(require("app/components/organisms/Filters/Filters"));

var _VirtualListManaged = _interopRequireDefault(require("app/components/molecules/VirtualList/VirtualListManaged"));

var _ResizableListItem = _interopRequireDefault(require("app/components/molecules/VirtualList/ResizableListItem"));

var _processActions = require("store/actions/abox/processActions");

var _messengerActions = require("store/actions/messenger/messengerActions");

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ProcessCardContainer = _styledComponents.default.div.withConfig({
  displayName: "ProcessesCards__ProcessCardContainer",
  componentId: "sc-14ofojr-0"
})(["width:100%;max-width:1024px;margin:0 auto;"]);
/**
 *
 */


class ProcessesCards extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      deleted: {}
    });

    _defineProperty(this, "virtualListRef", _react.default.createRef());

    _defineProperty(this, "filterDefinitions", [{
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
        label: 'Process ID',
        name: 'id'
      },
      condition: '='
    }, {
      field: 'createdBy.id',
      type: 'userTypeahead',
      properties: {
        label: 'Created by',
        name: 'createdById'
      },
      condition: '='
    }, {
      field: 'createDate',
      type: 'dateTimeRange',
      properties: {
        label: 'Created date',
        name: 'createDate'
      }
    }, {
      field: 'status.lastUpdate',
      type: 'dateTimeRange',
      properties: {
        label: 'Last updated',
        name: 'statusLastUpdate'
      }
    }, {
      field: 'processDefinition.name',
      type: 'processTypeTypeahead',
      properties: {
        label: 'Process Type',
        name: 'processDefinitionName'
      },
      condition: '='
    }]);

    _defineProperty(this, "searchBar", ['name', 'id']);

    _defineProperty(this, "defaultOrder", [{
      field: 'createDate',
      direction: 'desc'
    }]);

    _defineProperty(this, "cancelProcess", id => {
      this.props.cancelProcess(id).then(response => {
        if (response instanceof Error) return;
        this.setState({
          deleted: (0, _lo.set)(this.state.deleted, id, true)
        }, this.forceUpdateGrid);
      });
    });

    _defineProperty(this, "renderComponent", ({
      index,
      data,
      resize,
      style
    }) => {
      const {
        deleted
      } = this.state;
      const id = data && data.id;
      return _react.default.createElement(_ResizableListItem.default, {
        key: index,
        style: style,
        index: index,
        resize: resize,
        padding: 15
      }, resizeRow => _react.default.createElement(ProcessCardContainer, null, _react.default.createElement(_ProcessCard.default, {
        index: index,
        data: data,
        addProcessComment: this.props.addProcessComment,
        cancelProcess: this.cancelProcess,
        isDeleted: id && deleted[id],
        forceUpdateGrid: this.forceUpdateGrid,
        resetView: this.resetView,
        user: this.props.profile,
        resizeRow: resizeRow
      })));
    });

    _defineProperty(this, "forceUpdateGrid", () => {
      this.virtualListRef.current && this.virtualListRef.current.forceUpdate();
    });

    _defineProperty(this, "resetView", () => {
      this.virtualListRef.current && this.virtualListRef.current.resetView();
    });
  }

  /**
   * @override
   */
  render() {
    const {
      records,
      isLoading,
      totalRecords,
      startIndex,
      loadProcessesCards
    } = this.props;
    return _react.default.createElement(_Filters.default, {
      id: "ProcessesCards",
      filterDefinitions: this.filterDefinitions,
      defaultOrder: this.defaultOrder,
      searchBar: this.searchBar
    }, (filterBy, orderBy) => _react.default.createElement(_VirtualListManaged.default, {
      ref: this.virtualListRef,
      renderComponent: this.renderComponent,
      itemSize: 310,
      itemCount: totalRecords || 0,
      loadData: loadProcessesCards,
      isLoading: isLoading,
      startIndex: startIndex || 0,
      filterBy: filterBy,
      orderBy: orderBy,
      list: records,
      maxWidth: "1024",
      title: `${totalRecords >= 1000 ? '999+' : totalRecords} Processes`
    }));
  }

}

_defineProperty(ProcessesCards, "propTypes", {
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  startIndex: _propTypes.default.number,
  totalRecords: _propTypes.default.number,
  loadProcessesCards: _propTypes.default.func.isRequired,
  addProcessComment: _propTypes.default.func
});

_defineProperty(ProcessesCards, "defaultProps", {
  isLoading: false
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.processesCards.isLoading,
  startIndex: state.abox.processesCards.startIndex,
  records: state.abox.processesCards.records,
  totalRecords: state.abox.processesCards.count,
  profile: state.user.profile
}), {
  loadProcessesCards: _processActions.loadProcessesCards,
  cancelProcess: _processActions.cancelProcess,
  addProcessComment: _messengerActions.addProcessComment
})(ProcessesCards);

exports.default = _default;