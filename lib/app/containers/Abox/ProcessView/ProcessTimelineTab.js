"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _Changelog = _interopRequireDefault(require("app/components/organisms/Changelog/Changelog"));

var _lo = require("app/utils/lo/lo");

var _processActions = require("store/actions/abox/processActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Render the Process's changelog tab.
 */
class ProcessTimelineTab extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "loadData", options => {
      return this.props.loadProcessChangelog(this.props.id, options);
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
      count
    } = this.props;
    return _react.default.createElement(_Changelog.default, {
      entityType: "process",
      isLoading: isLoading,
      startIndex: startIndex,
      changelog: changelog,
      count: count,
      translations: ProcessTimelineTab.translations,
      loadData: this.loadData
    });
  }

}

_defineProperty(ProcessTimelineTab, "propTypes", {
  id: _propTypes.default.string.isRequired,
  loadProcessChangelog: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  startIndex: _propTypes.default.number.isRequired,
  changelog: _propTypes.default.arrayOf(_propTypes.default.object),
  count: _propTypes.default.number
});

_defineProperty(ProcessTimelineTab, "translations", {
  'children': 'subprocess'
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.process.changelog.isLoading || false,
  changelog: (0, _lo.get)(state, 'abox.process.changelog.data.changes'),
  startIndex: (0, _lo.get)(state, 'abox.process.changelog.data.startIndex') || 0,
  count: (0, _lo.get)(state, 'abox.process.changelog.data.count')
}), {
  loadProcessChangelog: _processActions.loadProcessChangelog
})(ProcessTimelineTab);

exports.default = _default;