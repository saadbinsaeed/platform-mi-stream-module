"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _DateRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Date/DateRenderer"));

var _dataTableIds = require("app/config/dataTableIds");

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _BroadcastEditRenderer = _interopRequireDefault(require("app/components/molecules/DataTable/Renderers/BroadcastEditRenderer"));

var _BroadcastParentRenderer = _interopRequireDefault(require("app/components/molecules/DataTable/Renderers/BroadcastParentRenderer"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _lo = require("app/utils/lo/lo");

var _broadcastsActions = require("store/actions/broadcasts/broadcastsActions");

var _BroadcastMembers = _interopRequireDefault(require("./BroadcastMembers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A component that displays a list of broadcasts
 */
class BroadcastsList extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "tableRef", _react.default.createRef());

    _defineProperty(this, "permissions", this.props.userProfile.permissions);

    _defineProperty(this, "isAdmin", this.props.userProfile.isAdmin);

    _defineProperty(this, "permissionsSet", new Set(this.permissions || []));

    _defineProperty(this, "canEdit", this.isAdmin || this.permissionsSet.has('broadcast.edit'));

    _defineProperty(this, "broadcastMembersTemplate", ({
      id
    }) => {
      return _react.default.createElement(_BroadcastMembers.default, {
        broadcastId: id,
        members: (0, _lo.get)(this.props, `members.${id}.data`),
        isLoading: (0, _lo.get)(this.props, `members.${id}.isLoading`)
      });
    });

    _defineProperty(this, "columnDefinitions", [{
      field: '__none__',
      header: '',
      expander: true,
      exportable: false,
      filter: false,
      sortable: false,
      style: {
        width: '40px'
      }
    }, {
      field: 'id',
      header: 'Broadcast ID',
      bodyComponent: !this.canEdit ? null : _BroadcastEditRenderer.default,
      type: 'number',
      style: {
        width: '140px'
      }
    }, {
      field: 'message',
      header: 'Broadcast'
    }, {
      field: 'recipients',
      header: 'Recipients',
      filter: false,
      sortable: false,
      bodyComponent: BroadcastsList.sumRecepients,
      renderValue: BroadcastsList.sumRecepients,
      style: {
        width: '100px'
      }
    }, {
      header: 'Active',
      field: 'active',
      type: 'boolean',
      sortable: false,
      bodyComponent: _BooleanRenderer.default,
      renderValue: ({
        value
      }) => value ? 'Active' : 'Inactive',
      options: [{
        label: 'All',
        value: ''
      }, {
        label: 'Active',
        value: true
      }, {
        label: 'Inactive',
        value: false
      }],
      style: {
        width: '150px',
        textAlign: 'center'
      }
    }, {
      field: 'parent.id',
      header: 'Parent ID',
      type: 'number',
      bodyComponent: !this.canEdit ? null : _BroadcastParentRenderer.default,
      style: {
        width: '100px'
      }
    }, {
      field: 'readStatus',
      header: 'Read Status',
      options: [{
        label: 'Mixed',
        value: 'Mixed'
      }, {
        label: 'ALL READ',
        value: 'ALL READ'
      }],
      style: {
        width: '130px'
      }
    }, {
      field: 'startDate',
      header: 'Start Time',
      type: 'date',
      body: ({
        startDate
      }) => _react.default.createElement(_DateRenderer.default, {
        value: startDate
      })
    }, {
      field: 'expireDate',
      header: 'Expiry Time',
      type: 'date',
      body: ({
        expireDate
      }) => _react.default.createElement(_DateRenderer.default, {
        value: expireDate
      })
    }]);

    _defineProperty(this, "gridSettings", {
      pageSize: 10,
      filters: {},
      sort: [],
      globalFilter: {
        value: ''
      }
    });

    _defineProperty(this, "onRowExpand", ({
      originalEvent,
      data
    }) => {
      const broadcastId = data.id;
      const isBroadcastLoading = (0, _lo.get)(this.props.memebers, `${String(broadcastId)}.isLoading`);

      if (broadcastId && !isBroadcastLoading) {
        this.props.fetchBroadcastMembers(broadcastId);
      }
    });
  }

  /**
   * Render our broadcast list
   */
  render() {
    const {
      isLoading,
      isDownloading,
      records
    } = this.props;
    return _react.default.createElement(_PageTemplate.default, {
      title: "Broadcasts"
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      innerRef: this.tableRef,
      dataTableId: _dataTableIds.BROADCASTS_DATA_TABLE,
      savePreferences: true,
      gridSettings: this.gridSettings,
      columnDefinitions: this.columnDefinitions,
      loadRows: this.props.fetchBroadcasts,
      isLoading: isLoading,
      isDownloading: isDownloading,
      disableCountdown: true,
      name: "broadcast_list",
      value: records,
      totalRecords: this.props.recordsCount,
      countMax: this.props.recordsCountMax,
      rowExpansionTemplate: this.broadcastMembersTemplate,
      now: Date.now() // we need this to load the data (async) in the rowExpansionTemplate
      ,
      onRowExpand: this.onRowExpand,
      dataKey: "id",
      selectionMode: "multiple"
    })));
  }

}

_defineProperty(BroadcastsList, "propTypes", {
  fetchBroadcasts: _propTypes.default.func,
  isLoading: _propTypes.default.bool.isRequired,
  isDownloading: _propTypes.default.bool.isRequired,
  records: _propTypes.default.array,
  recordsCount: _propTypes.default.number,
  recordsCountMax: _propTypes.default.number,
  userProfile: _propTypes.default.object
});

_defineProperty(BroadcastsList, "sumRecepients", ({
  data
}) => {
  const {
    users,
    groups
  } = data || {};

  const lengthOrZero = users => users && users.length || 0;

  let sum = lengthOrZero(users);
  groups && groups.map(({
    users
  }) => sum += lengthOrZero(users));
  return sum;
});

const mapStateToProps = (state, props) => ({
  isLoading: state.broadcasts.list.isLoading,
  isDownloading: state.broadcasts.list.isDownloading,
  records: state.broadcasts.list.records,
  recordsCount: state.broadcasts.list.count,
  recordsCountMax: state.broadcasts.list.countMax,
  userProfile: state.user.profile,
  members: state.broadcasts.members
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  fetchBroadcasts: _broadcastsActions.fetchBroadcasts,
  fetchBroadcastMembers: _broadcastsActions.fetchBroadcastMembers
})(BroadcastsList);

exports.default = _default;