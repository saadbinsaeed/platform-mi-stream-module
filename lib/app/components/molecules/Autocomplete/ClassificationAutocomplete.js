"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _utils = require("app/utils/utils");

var _classificationsActions = require("store/actions/classifications/classificationsActions");

var _AbstractLazyAutocomplete = _interopRequireDefault(require("./AbstractLazyAutocomplete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select one or more classifications using lazy loading.
 */
class ClassificationAutocomplete extends _AbstractLazyAutocomplete.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "itemTemplate", ({
      id,
      name
    }) => `${name || 'Name not available'} (${id || 'ID not Available'})`);

    _defineProperty(this, "suggest", (0, _utils.debounce)(event => {
      const {
        value,
        loadOptions,
        onlyActive,
        applicableOn,
        filterBy
      } = this.props;
      const filters = [];

      if (event.query) {
        if (Number.isInteger(Number(event.query))) {
          filters.push({
            or: [{
              field: 'id',
              op: '=',
              value: Number(event.query)
            }, {
              field: 'name',
              op: 'contains',
              value: event.query
            }, {
              field: 'uri',
              op: 'contains',
              value: event.query
            }]
          });
        } else {
          filters.push({
            or: [{
              field: 'name',
              op: 'contains',
              value: event.query
            }, {
              field: 'uri',
              op: 'contains',
              value: event.query
            }]
          });
        }
      }

      if (onlyActive) {
        filters.push({
          field: 'active',
          op: '=',
          value: true
        });
      }

      if (applicableOn) {
        filters.push({
          field: 'abstract',
          op: '=',
          value: false
        });
        filters.push({
          field: 'applicableOn',
          op: '=',
          value: applicableOn
        });
      }

      if (filterBy && filterBy.length) {
        filters.push(...filterBy);
      }

      if (value) {
        const excludes = Array.isArray(value) ? value : [value];
        filters.push(...excludes.filter(({
          id
        }) => Number.isInteger(id)).map(({
          id
        }) => ({
          field: 'id',
          op: '<>',
          value: id
        })));
      }

      filters.push({
        field: 'abstract',
        op: '=',
        value: false
      });
      loadOptions({
        page: 1,
        pageSize: 50,
        filterBy: filters,
        orderBy: [{
          field: 'name',
          direction: 'asc'
        }]
      });
    }, 500));
  }

}

_defineProperty(ClassificationAutocomplete, "propTypes", { ..._AbstractLazyAutocomplete.default.propTypes,
  applicableOn: _propTypes.default.oneOf(['group', 'thing', 'person', 'organisation', 'process', 'custom']),
  onlyActive: _propTypes.default.bool
});

_defineProperty(ClassificationAutocomplete, "defaultProps", {
  onlyActive: false
});

;

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.common.autocomplete.classification.isLoading,
  options: state.common.autocomplete.classification.data
}), {
  loadOptions: _classificationsActions.loadClassificationAutocomplete
})(ClassificationAutocomplete);

exports.default = _default;