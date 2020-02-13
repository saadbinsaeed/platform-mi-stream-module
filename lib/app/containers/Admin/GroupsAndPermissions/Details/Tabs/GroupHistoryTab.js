"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _immer = _interopRequireDefault(require("immer"));

var _Changelog = _interopRequireDefault(require("app/components/organisms/Changelog/Changelog"));

var _lo = require("app/utils/lo/lo");

var _groupsActions = require("store/actions/admin/groupsActions");

var _decoratorUtils = require("app/utils/decorators/decoratorUtils");

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Render the Task's changelog tab.
 */
let GroupHistoryTab = (_dec = (0, _decoratorUtils.memoize)(), (_class = (_temp = _class2 = class GroupHistoryTab extends _react.PureComponent {
  loadData(options) {
    return this.props.loadGroupChangelog(Math.ceil(this.props.id), options);
  }

  normalizeChanges(changelog) {
    const normalizedList = [];
    (changelog || []).forEach(log => {
      const entities = (0, _lo.get)(log, 'changes[0].item.entities') || [];

      if (entities.length > 1) {
        const change = (0, _lo.get)(log, 'changes[0]');
        const logPermission = (0, _lo.set)(log, 'changes', []);
        entities.forEach((permission, index) => {
          logPermission.changes.push((0, _lo.set)(change, 'item.entities[0]', permission));
        });
        normalizedList.push(logPermission);
      } else if ((0, _lo.get)(log, 'changes[0].path[0]') === 'users') {
        let change = (0, _lo.set)(log, 'changes', []);
        change = (0, _lo.set)(change, 'changes[0]', { ...log.changes[0],
          item: [],
          path: ['group.users']
        });

        if (log.changes.length > 1) {
          log.changes.forEach(({
            item
          }) => {
            change.changes[0].item.push(item.id);
          });
        } else {
          change = (0, _lo.set)(change, 'changes[0]', { ...log.changes[0],
            path: ['user']
          });
        }

        normalizedList.push(change);
      } else {
        const nextLog = (0, _immer.default)(log, draftLog => {
          draftLog.changes.forEach((ch, i) => {
            if ((0, _lo.get)(ch, 'path[0]') === 'classificationUris') {
              draftLog.changes[i].path[0] = 'group.classificationUris';
            }
          });
        });
        normalizedList.push(nextLog);
      }
    });
    return normalizedList;
  }
  /**
   * @override
   */


  render() {
    const {
      isLoading,
      startIndex,
      changelog,
      count
    } = this.props;
    return _react.default.createElement(_Changelog.default, {
      entityType: "group",
      isLoading: isLoading,
      startIndex: startIndex,
      changelog: this.normalizeChanges(changelog),
      count: count,
      loadData: this.loadData
    });
  }

}, _defineProperty(_class2, "propTypes", {
  id: _propTypes.default.string.isRequired,
  loadGroupChangelog: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  startIndex: _propTypes.default.number.isRequired,
  changelog: _propTypes.default.arrayOf(_propTypes.default.object),
  count: _propTypes.default.number
}), _temp), (_applyDecoratedDescriptor(_class.prototype, "loadData", [_decoratorUtils.bind], Object.getOwnPropertyDescriptor(_class.prototype, "loadData"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "normalizeChanges", [_decoratorUtils.bind, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "normalizeChanges"), _class.prototype)), _class));

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.admin.groups.changelog.isLoading,
  changelog: (0, _lo.get)(state, 'admin.groups.changelog.data.changes'),
  startIndex: (0, _lo.get)(state, 'admin.groups.changelog.data.startIndex') || 0,
  count: (0, _lo.get)(state, 'admin.groups.changelog.data.count')
}), {
  loadGroupChangelog: _groupsActions.loadGroupChangelog
})(GroupHistoryTab);

exports.default = _default;