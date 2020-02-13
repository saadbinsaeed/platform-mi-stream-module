"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _List = _interopRequireDefault(require("app/components/molecules/List/List"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This component shows recent attachments.
 */
class RecentAttachments extends _react.PureComponent {
  /**
   * Lifecycle hook: Executed on component render.
   * @returns {XML}
   */
  render() {
    let rows = 'There are no recent attachments.';

    if (this.props.recentAttachments && this.props.recentAttachments.length > 0) {
      const rowItems = this.props.recentAttachments.map((m, index) => _react.default.createElement(_ListItem.default, {
        key: index,
        component: _react.default.createElement(_Icon.default, {
          name: "file"
        }),
        title: _react.default.createElement("a", {
          target: "_blank",
          rel: "noopener noreferrer",
          href: m.url
        }, m.name)
      }));
      rows = _react.default.createElement(_List.default, null, " ", rowItems, " ");
    }

    return _react.default.createElement(_react.Fragment, null, rows);
  }

}

exports.default = RecentAttachments;

_defineProperty(RecentAttachments, "propTypes", {
  recentAttachments: _propTypes.default.array
});