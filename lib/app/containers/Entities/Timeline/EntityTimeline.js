"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reactRedux = require("react-redux");

var _Changelog = _interopRequireDefault(require("app/components/organisms/Changelog/Changelog"));

var _lo = require("app/utils/lo/lo");

var _entitiesActions = require("store/actions/entities/entitiesActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Render the Thing's changelog tab.
 */
class EntityTimeline extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "loadData", options => {
      return this.props.loadEntityChangelog(this.props.entityId, options);
    });

    _defineProperty(this, "cleanUpChanges", (0, _memoizeOne.default)(changelog => {
      return changelog && changelog.map(entry => {
        if (!entry.changes || entry.changes.length < 1) {
          return entry;
        }

        const changes = entry.changes.filter(({
          path
        }) => {
          if (!path || path.lenth > 2) {
            return true;
          }

          const property = path.join('.');

          if (property !== 'modifiedDate' && property !== 'locationInfo.geom') {
            return true;
          }

          return false;
        });
        return { ...entry,
          changes: changes.length >= 1 ? changes : entry.changes
        };
      });
    }));
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
      entityType
    } = this.props;
    return _react.default.createElement(_Changelog.default, {
      entityType: entityType,
      isLoading: isLoading,
      startIndex: startIndex,
      changelog: this.cleanUpChanges(changelog),
      count: count,
      loadData: this.loadData
    });
  }

}

_defineProperty(EntityTimeline, "propTypes", {
  entityId: _propTypes.default.string,
  entityType: _propTypes.default.string,
  isLoading: _propTypes.default.bool,
  changelog: _propTypes.default.arrayOf(_propTypes.default.object)
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.entities.common.changelog.isLoading || false,
  changelog: (0, _lo.get)(state, 'entities.common.changelog.data.changes'),
  startIndex: (0, _lo.get)(state, 'entities.common.changelog.data.startIndex') || 0,
  count: (0, _lo.get)(state, 'entities.common.changelog.data.count')
}), {
  loadEntityChangelog: _entitiesActions.loadEntityChangelog
})(EntityTimeline);

exports.default = _default;