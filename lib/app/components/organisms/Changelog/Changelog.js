"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _VirtualListManaged = _interopRequireDefault(require("app/components/molecules/VirtualList/VirtualListManaged"));

var _ResizableListItem = _interopRequireDefault(require("app/components/molecules/VirtualList/ResizableListItem"));

var _Filters = _interopRequireDefault(require("app/components/organisms/Filters/Filters"));

var _ChangelogItem = _interopRequireDefault(require("app/components/organisms/Changelog/ChangelogItem"));

var _Layout = _interopRequireDefault(require("app/components/molecules/Layout/Layout"));

var _utils = require("app/utils/utils");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _lo = require("app/utils/lo/lo");

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Renders the given changelog.
 */
let Changelog = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class Changelog extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "listRef", _react.default.createRef());

    _defineProperty(this, "filterDefinitions", [{
      field: 'changes',
      type: 'text',
      properties: {
        label: 'Filter',
        name: 'changes'
      },
      sort: false,
      filters: false
    }]);

    _defineProperty(this, "searchBar", ['changes']);

    _defineProperty(this, "defaultOrder", [{
      field: 'modifiedDate',
      direction: 'desc'
    }]);
  }

  getTranslation(key) {
    if (this.props.translations) {
      return this.props.translations[key] || Changelog.translations[key];
    }

    return Changelog.translations[key];
  }

  translate(path) {
    const translated = this.getTranslation(path.join('.'));

    if (translated) {
      return translated;
    }

    return path.map(token => this.getTranslation(token) || token).join(' ');
  }

  renderComponent({
    index,
    data,
    resize,
    style
  }) {
    return _react.default.createElement(_Container.default, {
      key: data.id,
      width: "1024",
      noPadding: true
    }, _react.default.createElement(_ResizableListItem.default, {
      style: style,
      index: index,
      resize: resize,
      padding: 8
    }, resizeRow => _react.default.createElement(_ChangelogItem.default, {
      entityType: this.props.entityType,
      logEntry: data,
      translate: this.translate,
      resizeRow: resizeRow,
      updateHeight: this.listRef.current && this.listRef.current.updateHeight
    })));
  }

  loadRecords(options) {
    const filterByChanges = options.filterBy && options.filterBy[0] && { ...options.filterBy[0],
      value: options.filterBy[0].value && options.filterBy[0].value.trim(),
      cast: 'text'
    };
    const filterBy = filterByChanges && filterByChanges.value ? [filterByChanges] : [];
    return this.props.loadData({ ...options,
      filterBy
    });
  }

  normalizeChangelog(changelog) {
    return (changelog || []).map(change => {
      const changes = change.changes.filter(({
        path
      }) => !['modifiedDate', 'parentIds'].includes(path[0]));
      const nextChanges = [];
      changes.forEach(ch => {
        if ((0, _lo.get)(ch, 'path[0]') === 'attributes' && (0, _utils.isObject)((0, _lo.get)(ch, 'rhs'))) {
          const rhs = (0, _lo.get)(ch, 'rhs') || {};
          nextChanges.push(...Object.keys(rhs).map(key => ({
            path: ['attributes', key],
            rhs: rhs[key],
            kind: 'E'
          })));
        } else if ((0, _lo.get)(ch, 'path[1]') === 'attributes' && (0, _utils.isObject)((0, _lo.get)(ch, 'rhs'))) {
          const rhs = (0, _lo.get)(ch, 'rhs') || {};
          nextChanges.push(...Object.keys(rhs).map(key => ({
            path: ['relations', 'attributes', key],
            rhs: rhs[key],
            kind: 'E'
          })));
        } else {
          nextChanges.push(ch);
        }
      });
      return (0, _utils.isEmpty)(nextChanges) ? change : { ...change,
        changes: nextChanges
      };
    });
  }
  /**
   * @override
   */


  render() {
    const {
      isLoading,
      startIndex,
      changelog,
      count,
      match,
      entityType
    } = this.props;
    const normalizedChangelog = this.normalizeChangelog(changelog);
    return _react.default.createElement(_Layout.default, {
      noPadding: true
    }, _react.default.createElement(_Filters.default, {
      id: `Changelog.${entityType}.${match.params.id}`,
      filterDefinitions: this.filterDefinitions,
      defaultOrder: this.defaultOrder,
      searchBar: this.searchBar
    }, (filterBy, orderBy) => _react.default.createElement(_VirtualListManaged.default, {
      ref: this.listRef,
      renderComponent: this.renderComponent,
      itemSize: 54,
      itemCount: count || 0,
      loadData: this.loadRecords,
      isLoading: isLoading,
      filterBy: filterBy,
      orderBy: orderBy,
      list: normalizedChangelog,
      startIndex: startIndex,
      maxWidth: "1024"
    })));
  }

}, _defineProperty(_class2, "propTypes", {
  entityType: _propTypes.default.string.isRequired,
  loadData: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  startIndex: _propTypes.default.number.isRequired,
  changelog: _propTypes.default.arrayOf(_propTypes.default.object),
  count: _propTypes.default.number
}), _defineProperty(_class2, "translations", {
  'attachments': 'attachment',
  'attributes': 'attribute',
  'bpmnVariable': 'variable',
  'classes': 'classification',
  'classificationUris': 'classification uri',
  'group.classificationUris': 'classification uri',
  'comments': 'comment',
  'contactInfo': 'contact info',
  'dateOfBirth': 'birthday',
  'dueDate': 'due date',
  'enableGis': 'show on situational awareness',
  'endDate': 'end date',
  'fullName': 'full name',
  'iconColor': 'icon color',
  'iconName': 'icon',
  'parentId': 'parent',
  'organisationId': 'organisation',
  'relations': 'relation',
  'teamMembers': 'team member',
  'thingId': 'unique external reference',
  'entities.permissions': 'permissions',
  'proc_def': 'process definition',
  'custom': 'custom entity',
  'group.users': 'users',
  'modifiedByLogin': 'modified by',
  'dataOwnerLogin': 'data owner',
  'contactPersonId': 'contact person',
  'is_manual': 'custom address',
  'bpmnVariable.startDate': 'start date',
  'locationInfo.address.city': 'city',
  'locationInfo.address.code': 'post/zip code',
  'locationInfo.address.country': 'country',
  'locationInfo.address.line1': 'address line 1',
  'locationInfo.address.line2': 'addresss line 2',
  'locationInfo.address.province': 'state/province',
  'locationInfo.latitude': 'latitude',
  'locationInfo.longitude': 'longitude',
  'locationInfo.name': 'location name',
  'variable.completion': 'progress'
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "getTranslation", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "getTranslation"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "translate", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "translate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "renderComponent", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "renderComponent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadRecords", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "loadRecords"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "normalizeChangelog", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "normalizeChangelog"), _class.prototype)), _class));

var _default = (0, _reactRouterDom.withRouter)(Changelog);

exports.default = _default;