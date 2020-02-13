"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DataTable = require("primereact/components/datatable/DataTable");

var _Column = require("primereact/components/column/Column");

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _List = _interopRequireDefault(require("app/components/molecules/List/List"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _lo = require("app/utils/lo/lo");

var _broadcastsActions = require("store/actions/broadcasts/broadcastsActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A component that displays a list of broadcasts
 */
class BroadcastMembers extends _react.PureComponent {
  /**
   * Set default state
   */
  constructor() {
    super();

    _defineProperty(this, "rowExpansionTemplate", void 0);

    _defineProperty(this, "groupTemplate", void 0);

    _defineProperty(this, "loaderWrapperStyle", {
      width: '50px',
      paddingTop: '5px'
    });

    _defineProperty(this, "groupTemplate", data => `${data.gr_name || ''} (${(data.users || []).length})`);

    _defineProperty(this, "onRowToggle", ({
      data
    }) => {
      this.props.expandBroadcastMembers(this.props.broadcastId, data);
    });

    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
  }
  /**
   * Our sub template
   */


  rowExpansionTemplate(data) {
    const users = data.users && data.users.length > 0 ? data.users : null;
    return users && _react.default.createElement(_List.default, null, users.map(user => _react.default.createElement(_ListItem.default, {
      key: user,
      title: user
    })));
  }
  /**
   * Template for group name
   * @param rowData
   */


  /**
   * Render our broadcast list
   */
  render() {
    return this.props.isLoading ? _react.default.createElement("div", {
      style: this.loaderWrapperStyle
    }, _react.default.createElement(_Loader.default, {
      radius: "20"
    }), " ") : _react.default.createElement(_DataTable.DataTable, {
      value: this.props.members || [],
      expandedRows: this.props.expandedRows,
      onRowToggle: this.onRowToggle,
      rowExpansionTemplate: this.rowExpansionTemplate
    }, _react.default.createElement(_Column.Column, {
      expander: true,
      style: {
        width: '2rem'
      }
    }), _react.default.createElement(_Column.Column, {
      field: "gr_name",
      header: "Recipients",
      body: this.groupTemplate
    }));
  }

}

_defineProperty(BroadcastMembers, "propTypes", {
  broadcastId: _propTypes.default.number.isRequired,
  members: _propTypes.default.arrayOf(_propTypes.default.object),
  isLoading: _propTypes.default.bool
});

var _default = (0, _reactRedux.connect)((state, props) => ({
  expandedRows: (0, _lo.get)(state, `broadcasts.members.expandedRows.${props.broadcastId}`)
}), {
  expandBroadcastMembers: _broadcastsActions.expandBroadcastMembers
})(BroadcastMembers);

exports.default = _default;