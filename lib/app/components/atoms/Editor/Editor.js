"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Editor = require("primereact/components/editor/Editor");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const filterMap = {
  color: /color:(.*?);/g,
  background: /background:(.*?);/g,
  backgroundColor: /background-color:(.*?);/g
};
/**
 * Our checkbox component
 */

class Editor extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onTextChange", event => {
      const {
        onTextChange,
        filters
      } = this.props;
      const filteredHtml = filters.reduce((html, filter) => {
        if (filterMap[filter]) html = html.replace(filterMap[filter], '');
        return html;
      }, event.htmlValue || '');
      onTextChange({ ...event,
        htmlValue: filteredHtml
      });
    });

    _defineProperty(this, "renderDefaultHeader", (0, _memoizeOne.default)(() => _react.default.createElement("span", {
      className: "ql-formats"
    }, _react.default.createElement("button", {
      className: "ql-bold",
      "aria-label": "Bold"
    }), _react.default.createElement("button", {
      className: "ql-italic",
      "aria-label": "Italic"
    }), _react.default.createElement("button", {
      className: "ql-underline",
      "aria-label": "Underline"
    }), _react.default.createElement("button", {
      className: "ql-strike",
      "aria-label": "Strike"
    }), _react.default.createElement("button", {
      className: "ql-list",
      value: "ordered",
      "aria-label": "Ordered list"
    }), _react.default.createElement("button", {
      className: "ql-list",
      value: "bullet",
      "aria-label": "Bullet list"
    }), _react.default.createElement("button", {
      className: "ql-link",
      "aria-label": "Insert Link"
    }))));
  }

  render() {
    const defaultHeader = this.renderDefaultHeader();
    const {
      headerTemplate,
      style,
      value
    } = this.props;
    return _react.default.createElement("div", null, _react.default.createElement(_Editor.Editor, {
      headerTemplate: headerTemplate || defaultHeader,
      style: style || {
        height: '100px',
        color: 'black'
      },
      value: value,
      onTextChange: this.onTextChange
    }));
  }

}

_defineProperty(Editor, "propTypes", {
  headerTemplate: _propTypes.default.object,
  style: _propTypes.default.object,
  value: _propTypes.default.string,
  filters: _propTypes.default.array
});

_defineProperty(Editor, "defaultProps", {
  filters: []
});

var _default = Editor;
exports.default = _default;