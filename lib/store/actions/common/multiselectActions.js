"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadRegions = exports.loadVendors = exports.loadTenants = exports.loadGateways = exports.LOAD_REGIONS = exports.LOAD_REGIONS_STARTED = exports.LOAD_VENDORS = exports.LOAD_VENDORS_STARTED = exports.LOAD_TENANTS = exports.LOAD_TENANTS_STARTED = exports.LOAD_GATEWAYS = exports.LOAD_GATEWAYS_STARTED = void 0;

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _utils = require("app/utils/utils");

var _actionUtils = require("app/utils/redux/action-utils");

var _vendorsQuery = _interopRequireDefault(require("graphql/stream/event/vendorsQuery"));

var _regionsQuery = _interopRequireDefault(require("graphql/stream/event/regionsQuery"));

var _tenantsQuery = _interopRequireDefault(require("graphql/stream/event/tenantsQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_GATEWAYS_STARTED = '@@affectli/common/multiselect/LOAD_GATEWAYS_STARTED';
exports.LOAD_GATEWAYS_STARTED = LOAD_GATEWAYS_STARTED;
const LOAD_GATEWAYS = '@@affectli/common/multiselect/LOAD_GATEWAYS';
exports.LOAD_GATEWAYS = LOAD_GATEWAYS;
const LOAD_TENANTS_STARTED = '@@affectli/common/multiselect/LOAD_TENANTS_STARTED';
exports.LOAD_TENANTS_STARTED = LOAD_TENANTS_STARTED;
const LOAD_TENANTS = '@@affectli/common/multiselect/LOAD_TENANTS';
exports.LOAD_TENANTS = LOAD_TENANTS;
const LOAD_VENDORS_STARTED = '@@affectli/common/multiselect/LOAD_VENDORS_STARTED';
exports.LOAD_VENDORS_STARTED = LOAD_VENDORS_STARTED;
const LOAD_VENDORS = '@@affectli/common/multiselect/LOAD_VENDORS';
exports.LOAD_VENDORS = LOAD_VENDORS;
const LOAD_REGIONS_STARTED = '@@affectli/common/multiselect/LOAD_REGIONS_STARTED';
exports.LOAD_REGIONS_STARTED = LOAD_REGIONS_STARTED;
const LOAD_REGIONS = '@@affectli/common/multiselect/LOAD_REGIONS';
/**
* load the gateways
 */

exports.LOAD_REGIONS = LOAD_REGIONS;

const loadGateways = ({
  where,
  orderBy
} = {}) => {
  return dispatch => {
    dispatch({
      type: LOAD_GATEWAYS_STARTED
    });

    _HttpFetch.default.postResource('api/jrp/people/list', {
      kendo: false,
      continuousScrolling: false,
      fields: [{
        field: 'id'
      }, {
        field: 'display_name'
      }],
      where: [...(where || []), {
        field: 'classifications_text',
        op: 'contains',
        value: 'rms_user'
      }],
      orderBy
    }).then(response => {
      dispatch({
        type: LOAD_GATEWAYS,
        payload: (0, _Immutable.default)(response && (0, _utils.sortAscending)(response.data, 'display_name'))
      });
    }).catch(error => {
      dispatch({
        type: LOAD_GATEWAYS,
        payload: error,
        error: true
      });
    });
  };
};
/**
 * load the tenants
 */


exports.loadGateways = loadGateways;

const loadTenants = ({
  where = []
} = {}) => (0, _actionUtils.loadData)(LOAD_TENANTS_STARTED, LOAD_TENANTS, _tenantsQuery.default)({
  filterBy: [...where, {
    field: 'name',
    op: 'is not null'
  }, // is to fix data that doesn't have name should be removed once DB is ok
  {
    field: 'classes.uri',
    op: '=',
    value: 'UMS/Tenant'
  }],
  orderBy: [{
    field: 'name',
    direction: 'asc'
  }]
});
/**
 * load the vendors
 */


exports.loadTenants = loadTenants;

const loadVendors = ({
  where = []
} = {}) => (0, _actionUtils.loadData)(LOAD_VENDORS_STARTED, LOAD_VENDORS, _vendorsQuery.default)({
  filterBy: [...where, {
    field: 'name',
    op: 'is not null'
  }, // is to fix data that doesn't have name should be removed once DB is ok
  {
    field: 'classes.uri',
    op: '=',
    value: 'UMS/Vendor'
  }],
  orderBy: [{
    field: 'name',
    direction: 'asc'
  }]
});
/**
 * load the regions
 */


exports.loadVendors = loadVendors;

const loadRegions = ({
  where = []
} = {}) => (0, _actionUtils.loadData)(LOAD_REGIONS_STARTED, LOAD_REGIONS, _regionsQuery.default)({
  filterBy: [...where, {
    field: 'name',
    op: 'is not null'
  }, // is to fix data that doesn't have name should be removed once DB is ok
  {
    field: 'classes.uri',
    op: '=',
    value: 'region'
  }],
  orderBy: [{
    field: 'name',
    direction: 'asc'
  }]
});

exports.loadRegions = loadRegions;