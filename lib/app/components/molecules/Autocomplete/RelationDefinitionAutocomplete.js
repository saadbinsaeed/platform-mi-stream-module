"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _utils = require("app/utils/utils");

var _relationshipsActions = require("store/actions/entities/relationshipsActions");

var _AbstractLazyAutocomplete = _interopRequireDefault(require("./AbstractLazyAutocomplete"));

var _common = require("app/utils/propTypes/common");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select one or more relations' definitions using lazy loading.
 */
class RelationDefinitionAutocomplete extends _AbstractLazyAutocomplete.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "itemTemplate", ({
      id,
      name
    }) => `${name || 'Relation not available'}`);

    _defineProperty(this, "normalizeOptions", (0, _memoizeOne.default)(options => {
      const {
        type1
      } = this.props;
      return (options || []).reduce((opts, option) => {
        const {
          entityType1,
          entityType2
        } = option;

        if (entityType1 === entityType2) {
          return [...opts, { ...option,
            name: option.relation
          }, { ...option,
            name: option.reverseRelation,
            isReverse: true
          }];
        }

        return [...opts, { ...option,
          name: type1 === entityType1 ? option.relation : option.reverseRelation
        }];
      }, []).filter((item, idx, arr) => {
        return idx === arr.findIndex(i => i.name === item.name && i.id === item.id);
      });
    }));

    _defineProperty(this, "suggest", (0, _utils.debounce)(event => {
      const {
        value,
        loadOptions,
        type1,
        type2,
        filterBy
      } = this.props;
      const filters = [{
        or: [[{
          field: 'entityType1',
          op: '=',
          value: type1
        }, {
          field: 'entityType2',
          op: '=',
          value: type2
        }], [{
          field: 'entityType2',
          op: '=',
          value: type1
        }, {
          field: 'entityType1',
          op: '=',
          value: type2
        }]]
      }];

      if (event.query) {
        if (Number.isInteger(Number(event.query))) {
          filters.push({
            or: [{
              field: 'id',
              op: '=',
              value: Number(event.query)
            }, {
              field: 'relation',
              op: 'contains',
              value: event.query
            }, {
              field: 'reverseRelation',
              op: 'contains',
              value: event.query
            }]
          });
        } else {
          filters.push({
            or: [{
              field: 'relation',
              op: 'contains',
              value: event.query
            }, {
              field: 'reverseRelation',
              op: 'contains',
              value: event.query
            }]
          });
        }
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

      loadOptions({
        page: 1,
        pageSize: 50,
        filterBy: filters,
        orderBy: [{
          field: 'relation',
          direction: 'asc'
        }, {
          field: 'reverseRelation',
          direction: 'asc'
        }]
      });
    }, 500));
  }

}

_defineProperty(RelationDefinitionAutocomplete, "propTypes", { ..._AbstractLazyAutocomplete.default.propTypes,
  type1: _common.allTypesProps.isRequired,
  type2: _common.allTypesProps.isRequired
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.common.autocomplete.relationDefinition.isLoading,
  options: state.common.autocomplete.relationDefinition.data
}), {
  loadOptions: _relationshipsActions.loadRelationDefinitionAutocomplete
})(RelationDefinitionAutocomplete);

exports.default = _default;