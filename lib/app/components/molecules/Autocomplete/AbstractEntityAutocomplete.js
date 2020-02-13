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
 * Select one or more entities using lazy loading.
 */
class AbstractEntityAutocomplete extends _AbstractLazyAutocomplete.default {
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
        filterBy,
        orderBy = [{
          field: 'name',
          direction: 'asc'
        }]
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
            }]
          });
        } else {
          filters.push({
            field: 'name',
            op: 'contains',
            value: event.query
          });
        }
      }

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

      loadOptions({
        page: 1,
        pageSize: 50,
        filterBy: filters,
        orderBy: orderBy
      });
    }, 500));
  }

}

_defineProperty(AbstractEntityAutocomplete, "propTypes", { ..._AbstractLazyAutocomplete.default.propTypes
});

;
var _default = AbstractEntityAutocomplete;
exports.default = _default;