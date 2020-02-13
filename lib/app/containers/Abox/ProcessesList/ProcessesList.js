"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _reactRedux = require("react-redux");

var _reactDeviceDetect = require("react-device-detect");

var _dataTableIds = require("app/config/dataTableIds");

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _AboxExpandedProcessTemplate = _interopRequireDefault(require("app/components/ABox/AboxExpandedProcessTemplate"));

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

var _ProcessLinkRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Link/ProcessLinkRenderer"));

var _PriorityRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Priority/PriorityRenderer"));

var _ProgressRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Progress/ProgressRenderer"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _ViewTemplate = _interopRequireDefault(require("app/components/templates/ViewTemplate"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _ProcessesCards = _interopRequireDefault(require("app/components/ABox/Process/ProcessesCards"));

var _lo = require("app/utils/lo/lo");

var _processActions = require("store/actions/abox/processActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 */
class ProcessesList extends _react.PureComponent {
  /**
   * @const propTypes - describes the properties of the component
   * @const defaultProps - define the defaults values of the properties
   * @const columnDefinitions -definition for columns that we need to display in our grid
   */

  /**
   * @param {Object} props - component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "columnDefinitions", void 0);

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      sort: [{
        field: 'createDate',
        order: -1
      }],
      globalFilter: {
        value: ''
      }
    });

    _defineProperty(this, "rowExpansionTemplate", ({
      id
    }) => {
      const {
        expanded
      } = this.props;
      return _react.default.createElement(_AboxExpandedProcessTemplate.default, {
        data: (0, _lo.get)(expanded, `${id}.data`),
        isLoading: (0, _lo.get)(expanded, `${id}.isLoading`)
      });
    });

    _defineProperty(this, "onRowExpand", ({
      originalEvent,
      data
    }) => {
      const processId = data.id;
      const isLoading = (0, _lo.get)(this.props.expanded, `${processId}.isLoading`);

      if (processId && !isLoading) {
        this.props.loadExpandedProcess(processId);
      }
    });

    _defineProperty(this, "loadRows", options => {
      const opts = (0, _immer.default)(options, draft => {
        options.where.push({
          field: 'endDate',
          op: 'is null'
        });
      });
      return this.props.loadProcesses(opts);
    });

    _defineProperty(this, "toggleView", () => {
      const {
        saveProcessPageView,
        isCardView
      } = this.props;
      saveProcessPageView({
        isCardView: !isCardView
      }, _dataTableIds.ABOX_PROCESSES_DATA_TABLE);
    });

    this.columnDefinitions = [{
      header: '',
      field: '__none__',
      expander: true,
      exportable: false,
      filter: false,
      sortable: false,
      style: {
        width: '40px'
      }
    }, {
      header: 'Process Name',
      field: 'name',
      bodyComponent: _ProcessLinkRenderer.default
    }, {
      header: 'Process ID',
      field: 'id',
      type: 'number',
      bodyComponent: _ProcessLinkRenderer.default,
      style: {
        width: '120px'
      }
    }, {
      header: 'Process Type',
      field: 'processDefinition.name'
    }, {
      header: 'Parent Process',
      field: 'status.initiatedBy.id',
      type: 'number',
      bodyComponent: _ProcessLinkRenderer.default,
      bodyComponentProps: {
        field: 'status.initiatedBy.id'
      },
      style: {
        width: '140px'
      }
    }, {
      header: 'Tasks',
      field: 'tasks',
      filter: false,
      sortable: false,
      renderValue: ({
        value
      }) => value && value.length,
      style: {
        width: '100px'
      }
    }, {
      header: 'Modified',
      field: 'status.lastUpdate',
      type: 'date'
    }, {
      header: 'Created',
      field: 'createDate',
      type: 'date'
    }, {
      header: 'Created By',
      field: 'createdBy.name',
      bodyComponent: _PersonAvatarRenderer.default,
      bodyComponentProps: {
        imageProperty: 'createdBy.image',
        idProperty: 'createdBy.id',
        nameProperty: 'createdBy.name'
      }
    }, {
      header: 'Organisation',
      field: 'businessKey'
    }, {
      header: 'Progress',
      field: 'variables.progress',
      type: 'number',
      bodyComponent: _ProgressRenderer.default,
      filter: false,
      sortable: false,
      style: {
        textAlign: 'center',
        width: '100px'
      },
      renderValue: ({
        value
      }) => value || 0
    }, {
      header: 'Priority',
      field: 'variables.priority',
      type: 'number',
      bodyComponent: _PriorityRenderer.default,
      filter: false,
      sortable: false,
      style: {
        textAlign: 'center',
        width: '100px'
      },
      renderValue: ({
        value
      }) => value || 3
    }, {
      header: 'Region',
      field: 'status.payload.maintenancesite.region',
      style: {
        width: '100px'
      }
    }, {
      header: 'Affected Tenants',
      field: 'status.payload.maintenancesite.tenants',
      renderValue: ({
        value,
        data
      }) => {
        const selectedTenants = (0, _lo.get)(data, 'status.payload.selectedTenants') || [];

        if (!value || !value.length) {
          return null;
        }

        const affected = `${selectedTenants.length} / ${value.length}`;
        return affected;
      },
      filter: false,
      sortable: false,
      style: {
        width: '160px'
      }
    }, {
      header: 'FSE',
      field: 'status.payload.maintenancesite.fse_obj.display_name',
      style: {
        width: '100px'
      }
    }, {
      header: 'RTO',
      field: 'status.payload.maintenancesite.rto_obj.display_name',
      style: {
        width: '100px'
      }
    }, {
      header: 'SFOM',
      field: 'status.payload.maintenancesite.sfom_obj.display_name',
      style: {
        width: '100px'
      }
    }, {
      header: 'Site',
      field: 'status.payload.maintenancesite.new_ihs_id',
      style: {
        width: '100px'
      }
    }];
    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
  }
  /**
   * rowExpansionTemplate - description
   *
   * @param  {type} data description
   * @return {type}      description
   */


  /**
   * @override
   */
  render() {
    const {
      isCardView,
      isLoading,
      isDownloading,
      records,
      recordsCount,
      recordsCountMax
    } = this.props;
    return _react.default.createElement(_react.Fragment, null, !isCardView && _reactDeviceDetect.isBrowser ? _react.default.createElement(_PageTemplate.default, {
      key: String(isCardView),
      title: "A-Box",
      icon: "account-multiple",
      actions: _reactDeviceDetect.isBrowser && _react.default.createElement(_ButtonIcon.default, {
        icon: 'view-list',
        onClick: this.toggleView
      })
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      dataTableId: _dataTableIds.ABOX_PROCESSES_DATA_TABLE,
      savePreferences: true,
      gridSettings: this.gridSettings,
      columnDefinitions: this.columnDefinitions,
      loadRows: this.loadRows,
      isLoading: isLoading,
      isDownloading: isDownloading,
      disableCountdown: true,
      value: records,
      totalRecords: recordsCount,
      countMax: recordsCountMax,
      onRowExpand: this.onRowExpand,
      rowExpansionTemplate: this.rowExpansionTemplate,
      now: Date.now() // we need this to load the data (async) in the rowExpansionTemplate
      ,
      dataKey: "id",
      selectionMode: "multiple"
    }))) : _react.default.createElement(_ViewTemplate.default, {
      key: String(isCardView),
      title: "A-Box",
      icon: "account-multiple",
      actions: _reactDeviceDetect.isBrowser && _react.default.createElement(_ButtonIcon.default, {
        icon: 'table',
        onClick: this.toggleView
      })
    }, _react.default.createElement(_ProcessesCards.default, null)));
  }

}

_defineProperty(ProcessesList, "propTypes", {
  isLoading: _propTypes.default.bool.isRequired,
  isDownloading: _propTypes.default.bool.isRequired,
  records: _propTypes.default.array,
  recordsCount: _propTypes.default.number,
  recordsCountMax: _propTypes.default.number
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.list.isLoading,
  isDownloading: state.abox.list.isDownloading,
  records: state.abox.list.records,
  recordsCount: state.abox.list.count,
  recordsCountMax: state.abox.list.countMax,
  expanded: state.abox.expanded,
  isCardView: (0, _lo.get)(state, `user.preferences.pageView.${_dataTableIds.ABOX_PROCESSES_DATA_TABLE}.isCardView`)
}), {
  loadProcesses: _processActions.loadProcesses,
  loadExpandedProcess: _processActions.loadExpandedProcess,
  saveProcessPageView: _processActions.saveProcessPageView
})(ProcessesList);

exports.default = _default;