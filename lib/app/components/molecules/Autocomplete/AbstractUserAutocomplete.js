"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("app/utils/utils");

var _AbstractLazyAutocomplete = _interopRequireDefault(require("./AbstractLazyAutocomplete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select one or more users using lazy loading.
 */
class AbstractUserAutocomplete extends _AbstractLazyAutocomplete.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "itemTemplate", ({
      login,
      name
    }) => `${name || 'Name not available'} (${login || 'Login not available'})`);

    _defineProperty(this, "suggest", (0, _utils.debounce)(event => {
      const {
        value,
        filterBy
      } = this.props;
      const filters = [{
        or: [{
          field: 'name',
          op: 'contains',
          value: event.query
        }, {
          field: 'login',
          op: 'contains',
          value: event.query
        }]
      }];
      if (filterBy && filterBy.length) filters.push(...filterBy);

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

      this.loadOptions({
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

  loadOptions(options) {
    return this.props.loadOptions(options);
  }

}

_defineProperty(AbstractUserAutocomplete, "propTypes", { ..._AbstractLazyAutocomplete.default.propTypes
});

;
var _default = AbstractUserAutocomplete;
exports.default = _default;