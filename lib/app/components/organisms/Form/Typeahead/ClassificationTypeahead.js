"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _platformUi = require("@mic3/platform-ui");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _TypeaheadChip = require("./TypeaheadChip");

var _classificationsActions = require("store/actions/classifications/classificationsActions");

var _theme = _interopRequireDefault(require("app/themes/theme.default"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Select one or more classification using lazy loading.
 */
let ClassificationTypeahead = (_dec = (0, _decoratorUtils.debounce)(), (_class = (_temp = _class2 = class ClassificationTypeahead extends _react.PureComponent {
  optionTemplate({
    id,
    name,
    color
  }) {
    return {
      ChipProps: {
        avatar: _react.default.createElement(_TypeaheadChip.TypeaheadChipInitials, {
          initials: name
        }),
        style: {
          backgroundColor: color,
          color: _theme.default.isLightColor(color) ? 'black' : 'white'
        }
      },
      label: `${name || 'Name not available'} (${id || 'ID not Available'})`
    };
  }

  suggest(event) {
    const {
      value,
      loadOptions,
      filterBy,
      applicableOn
    } = this.props;
    const filters = [];
    const query = event.target.value;

    if (query) {
      if (Number.isInteger(Number(query))) {
        filters.push({
          or: [{
            field: 'id',
            op: '=',
            value: Number(query)
          }, {
            field: 'name',
            op: 'contains',
            value: query
          }, {
            field: 'uri',
            op: 'contains',
            value: query
          }]
        });
      } else {
        filters.push({
          or: [{
            field: 'name',
            op: 'contains',
            value: query
          }, {
            field: 'uri',
            op: 'contains',
            value: query
          }]
        });
      }
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

    if (filterBy) {
      if (typeof filterBy === 'function') {
        filters.push(...filterBy(value));
      } else if (filterBy.length) {
        filters.push(...filterBy);
      }
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
        field: 'name',
        direction: 'asc'
      }]
    });
  }

  render() {
    const {
      loadOptions,
      filterBy,
      isLoading,
      placeholder,
      applicableOn,
      ...typeaheadProps
    } = this.props; // eslint-disable-line no-unused-vars

    return _react.default.createElement(_platformUi.Autocomplete, _extends({}, typeaheadProps, {
      optionTemplate: this.optionTemplate,
      suggest: this.suggest,
      placeholder: placeholder || 'Search for a classification...'
    }));
  }

}, _defineProperty(_class2, "propTypes", { ..._platformUi.Autocomplete.propTypes,
  options: _propTypes.default.array
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "optionTemplate", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "optionTemplate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "suggest", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "suggest"), _class.prototype)), _class));
;

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.common.autocomplete.classification.isLoading,
  options: state.common.autocomplete.classification.data
}), {
  loadOptions: _classificationsActions.loadClassificationAutocomplete
})(ClassificationTypeahead);

exports.default = _default;