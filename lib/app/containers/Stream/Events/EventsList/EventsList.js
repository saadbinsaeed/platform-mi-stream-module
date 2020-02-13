"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _PersonAvatarRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Icon/PersonAvatarRenderer"));

var _EventActionRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/EventAction/EventActionRenderer"));

var _SeverityRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Severity/SeverityRenderer"));

var _DateDifferenceRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/DateDifference/DateDifferenceRenderer"));

var _StatusRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Status/StatusRenderer"));

var _BooleanRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/BooleanRenderer/BooleanRenderer"));

var _StreamDataRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/StreamData/StreamDataRenderer"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _dataTableIds = require("app/config/dataTableIds");

var _eventsActions = require("store/actions/stream/eventsActions");

var _DataTable = _interopRequireDefault(require("app/components/molecules/DataTable/DataTableServer/DataTable"));

var _RegionMultiSelect = _interopRequireDefault(require("app/components/molecules/MultiSelect/RegionMultiSelect"));

var _TenantMultiSelect = _interopRequireDefault(require("app/components/molecules/MultiSelect/TenantMultiSelect"));

var _GatewayMultiSelect = _interopRequireDefault(require("app/components/molecules/MultiSelect/GatewayMultiSelect"));

var _VendorMultiSelect = _interopRequireDefault(require("app/components/molecules/MultiSelect/VendorMultiSelect"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _eventsTranslation = _interopRequireDefault(require("app/config/eventsTranslation.json"));

var _utils = require("app/utils/utils");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _dec2, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const getValuesFromEventsTranslaion = field => {
  return Object.values(_eventsTranslation.default).map(map => {
    // $FlowFixMe
    if (map && map[field]) return map[field];
    return undefined;
  }).filter(Boolean).filter((o, i, a) => a.indexOf(o) === i).map(value => ({
    label: value,
    value
  }));
};

const EventEntityLinkRenderer = ({
  data,
  value
}) => {
  if (!value) return null;
  return _react.default.createElement(_reactRouterDom.Link, {
    to: `/things/${data.device.id}/summary`
  }, value);
};
/**
 * Renders the view to display the Events.
 */


let EventsList = (_dec = (0, _decoratorUtils.memoize)(), _dec2 = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class EventsList extends _react.PureComponent {
  /**
   *
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "refreshTable", null);

    _defineProperty(this, "gridSettings", {});

    this.props.loadVTR(); // load vendor, tenant, region info

    this.props.loadTranslationRuleDescription(); // load translated event descriptions

    this.gridSettings = {
      pageSize: 100,
      filters: {
        status: {
          value: ['UNA']
        }
      },
      sort: [{
        field: 'eventDate',
        order: -1
      }],
      globalFilter: {
        value: ''
      }
    };
  }

  refresh() {
    this.refreshTable && this.refreshTable();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.vtr !== this.props.vtr) {
      this.refresh();
    }

    if (prevProps.translationRuleDescription !== this.props.translationRuleDescription) {
      this.refresh();
    }
  }

  normalizeTranslationRule(data) {
    return (data || []).filter(({
      translation
    }) => translation).map(({
      translation
    }) => ({
      label: translation,
      value: translation
    }));
  }

  buildColumnDefinitions(userProfile, vtr, translationRuleDescriptions) {
    const permissions = new Set(userProfile.permissions || []);
    const isAdmin = userProfile.isAdmin;
    const canEdit = isAdmin || permissions.has('mistream.events.edit');
    const translatedEventDescriptions = this.normalizeTranslationRule(translationRuleDescriptions);
    const columns = [{
      field: '_fake_field_action_',
      header: 'MY CUSTOM ACTION',
      exportable: false,
      bodyComponent: _EventActionRenderer.default,
      bodyComponentProps: {
        color: 'white',
        canEdit,
        refresh: this.refresh
      },
      filter: false,
      sortable: false,
      style: {
        textAlign: 'center',
        width: '200px'
      }
    }, {
      field: 'device.thingId',
      header: 'Entity ID',
      style: {
        width: '160px'
      }
    }, {
      field: 'device.name',
      header: 'Entity Name',
      bodyComponent: EventEntityLinkRenderer,
      style: {
        width: '200px'
      }
    }];
    const isVTR = Array.isArray(vtr);
    const vendor = vtr && vtr.find(cls => cls.uri === 'UMS/Vendor');

    if (!isVTR || vendor) {
      columns.push({
        field: 'device.attributes.Sites/vendor',
        header: 'Vendor',
        filterMatchMode: '=',
        selectFilterComponent: _VendorMultiSelect.default,
        style: {
          width: '160px'
        }
      });
    }

    const region = vtr && vtr.find(cls => cls.uri === 'region');

    if (!isVTR || region) {
      columns.push({
        field: 'device.attributes.Sites/region',
        header: 'Region',
        filterMatchMode: '=',
        selectFilterComponent: _RegionMultiSelect.default,
        style: {
          width: '160px'
        }
      });
    }

    const tenant = vtr && vtr.find(cls => cls.uri === 'UMS/Tenant');

    if (!isVTR || tenant) {
      columns.push({
        field: 'device.attributes.Sites/tenants',
        header: 'Tenants',
        filterMatchMode: '=',
        selectFilterComponent: _TenantMultiSelect.default,
        style: {
          width: '160px'
        }
      });
    }

    columns.push(...[{
      field: 'dataPayload.impact',
      header: 'Translated Event Impact',
      filterMatchMode: '=',
      options: (0, _utils.sortAscending)(getValuesFromEventsTranslaion('impact'), 'label'),
      style: {
        width: '200px'
      }
    }, {
      field: 'status',
      header: 'Event Status',
      filterMatchMode: '=',
      options: ['ACK', 'CLE', 'DIS', 'DUP', 'ERR', 'PRO', 'UNA'].map(value => ({
        label: value,
        value
      })),
      bodyComponent: _StatusRenderer.default,
      style: {
        textAlign: 'center',
        width: '120px'
      }
    }, {
      field: 'severity',
      header: 'Translated Event Severity',
      type: 'number',
      options: [0, 1, 2, 3, 4].map(value => ({
        label: String(value),
        value
      })),
      bodyComponent: _SeverityRenderer.default,
      style: {
        textAlign: 'center',
        width: '200px'
      }
    }, {
      field: 'dataPayload.type',
      header: 'Translated Event Type',
      filterMatchMode: '=',
      renderValue: ({
        value
      }) => value ? value : '',
      options: (0, _utils.sortAscending)(getValuesFromEventsTranslaion('type'), 'label'),
      style: {
        textAlign: 'center',
        width: '200px'
      }
    }, {
      field: 'description',
      header: 'Translated Event Description',
      filterMatchMode: '=',
      options: translatedEventDescriptions,
      style: {
        width: '320px'
      }
    }, {
      field: 'eventDate',
      header: 'EPET',
      type: 'date'
    }, {
      field: '__alarmDuration__',
      header: 'Alarm Duration',
      filter: false,
      sortable: false,
      bodyComponent: ({
        data
      }) => _react.default.createElement(_DateDifferenceRenderer.default, {
        value: data && data.receivedDate
      }),
      renderValue: ({
        data
      }) => (0, _DateDifferenceRenderer.default)({
        value: data && data.receivedDate,
        textOnly: true
      }),
      style: {
        width: '320px'
      }
    }, {
      field: 'eventSource.name',
      header: 'IOT Gateway Name',
      selectFilterComponent: _GatewayMultiSelect.default,
      style: {
        width: '160px'
      }
    }, {
      field: 'alarmCode',
      header: 'Original IOT Device Signal Code',
      style: {
        width: '260px'
      }
    }, {
      field: 'displayPayload',
      header: 'IOT Gateway Original Signal Data',
      bodyComponent: _StreamDataRenderer.default,
      renderValue: ({
        data,
        value
      }) => (0, _StreamDataRenderer.default)({
        data,
        value,
        textOnly: true
      }),
      style: {
        width: '700px'
      },
      filter: false,
      sortable: false
    }, {
      field: 'id',
      header: 'Event ID',
      type: 'number',
      style: {
        width: '100px'
      }
    }, {
      field: 'streamReceivedDate',
      header: 'Mi-Stream Time',
      type: 'date'
    }, {
      field: 'receivedDate',
      header: 'Affectli Event Time',
      type: 'date'
    }, {
      field: 'device.description',
      header: 'Entity Description',
      style: {
        width: '200px'
      }
    }, {
      field: 'modifiedDate',
      header: 'Modified Date',
      type: 'date'
    }, {
      field: 'updatedBy.name',
      header: 'Modified By',
      bodyComponent: _PersonAvatarRenderer.default,
      bodyComponentProps: {
        idProperty: 'updatedBy.id',
        imageProperty: 'updatedBy.image',
        nameProperty: 'updatedBy.name'
      }
    }, {
      field: 'sourceDevice',
      header: 'Device Serial No.',
      style: {
        width: '160px'
      }
    }, {
      field: 'device.modifiedDate',
      type: 'date',
      header: 'Last Comms From Device',
      style: {
        width: '240px'
      }
    }, {
      field: 'streamId',
      type: 'uuid',
      header: 'Stream ID',
      style: {
        width: '160px'
      }
    }, {
      field: 'device.active',
      header: 'Related IOT Entity Status',
      type: 'boolean',
      bodyComponent: _BooleanRenderer.default,
      sortable: false,
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
        width: '200px'
      }
    }, {
      field: 'device.id',
      header: 'Related IOT Entity ID',
      type: 'number',
      style: {
        width: '200px'
      }
    }, {
      field: '__fake__device__name',
      header: 'Related IOT Entity Name',
      bodyComponent: ({
        data
      }) => _react.default.createElement(EventEntityLinkRenderer, {
        data: data,
        value: data && data.device && data.device.name
      }),
      renderValue: ({
        data
      }) => data && data.device && data.device.name,
      filter: false,
      sortable: false,
      style: {
        width: '250px'
      }
    }, {
      field: '__fake_device_description',
      header: 'Related IOT Entity description',
      renderValue: ({
        data
      }) => data && data.device && data.device.description,
      filter: false,
      sortable: false,
      style: {
        width: '200px'
      }
    }, {
      header: 'Device Found',
      field: 'deviceFound',
      bodyComponent: _BooleanRenderer.default,
      renderValue: ({
        value
      }) => value ? 'Found' : 'Not Found',
      options: [{
        label: 'All',
        value: ''
      }, {
        label: 'Found',
        value: true
      }, {
        label: 'Not Found',
        value: false
      }],
      style: {
        width: '150px'
      },
      sortable: false,
      type: 'boolean'
    }, {
      field: 'eventType.id',
      header: 'Event Type',
      style: {
        width: '160px'
      }
    }]);
    return columns;
  }
  /**
   * @override
   */


  render() {
    const {
      isLoading,
      isDownloading,
      events,
      eventsCount,
      eventsCountMax,
      userProfile,
      vtr,
      translationRuleDescription
    } = this.props;
    return _react.default.createElement(_PageTemplate.default, {
      title: "Events Monitor"
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_DataTable.default, {
      refreshRef: refresh => {
        this.refreshTable = refresh;
      },
      dataTableId: _dataTableIds.EVENTS_DATA_TABLE,
      savePreferences: true,
      gridSettings: this.gridSettings,
      columnDefinitions: this.buildColumnDefinitions(userProfile, vtr, translationRuleDescription),
      loadRows: this.props.loadEvents,
      isLoading: isLoading,
      isDownloading: isDownloading,
      disableGlobalFilter: true,
      name: "events_monitor",
      value: events,
      totalRecords: eventsCount,
      countMax: eventsCountMax,
      dataKey: "id",
      selectionMode: "multiple"
    })));
  }

}, _defineProperty(_class2, "propTypes", {
  loadEvents: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  events: _propTypes.default.array,
  eventsCount: _propTypes.default.number,
  eventsCountMax: _propTypes.default.number,
  userProfile: _propTypes.default.object,
  loadVTR: _propTypes.default.func.isRequired,
  vtr: _propTypes.default.array,
  loadTranslationRuleDescription: _propTypes.default.func.isRequired,
  translationRuleDescription: _propTypes.default.array
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "refresh", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "refresh"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "normalizeTranslationRule", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "normalizeTranslationRule"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildColumnDefinitions", [_decoratorUtils.bind, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "buildColumnDefinitions"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.stream.events.list.isLoading || state.stream.vtr.isLoading || state.stream.translationRule.description.isLoading,
  isDownloading: state.stream.events.list.isDownloading,
  events: state.stream.events.list.records,
  eventsCount: state.stream.events.list.count,
  eventsCountMax: state.stream.events.list.countMax,
  userProfile: state.user.profile,
  vtr: state.stream.vtr.data,
  translationRuleDescription: state.stream.translationRule.description.data
}), {
  loadEvents: _eventsActions.loadEvents,
  loadVTR: _eventsActions.loadVTR,
  loadTranslationRuleDescription: _eventsActions.loadTranslationRuleDescription
})(EventsList);

exports.default = _default;