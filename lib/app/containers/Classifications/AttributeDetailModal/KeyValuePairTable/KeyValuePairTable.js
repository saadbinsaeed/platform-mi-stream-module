"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _InputText = require("primereact/components/inputtext/InputText");

var _DataTable = require("primereact/components/datatable/DataTable");

var _Column = require("primereact/components/column/Column");

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _event = require("app/utils/http/event");

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TableWrapper = _styledComponents.default.div.withConfig({
  displayName: "KeyValuePairTable__TableWrapper",
  componentId: "rjlqar-0"
})([".ui-datatable .ui-editable-column.ui-cell-editing{display:block;}.ui-cell-data{display:block;overflow:hidden;}"]);

const ButtonStyle = (0, _styledComponents.default)(_Button.default).withConfig({
  displayName: "KeyValuePairTable__ButtonStyle",
  componentId: "rjlqar-1"
})(["margin:5px 0px;"]);
const defGridHeaders = ['Key', 'Value'];

const validateInputHandler = (props, gridData) => {
  const {
    rowIndex
  } = props;
  const length = gridData.length - 1;
  const updatedRow = gridData[rowIndex];

  if (length !== 0) {
    if (gridData[rowIndex]) {
      const {
        key,
        value
      } = updatedRow;

      if (key !== '') {
        const ifValueUniq = gridData.findIndex(kvPair => {
          if (!Object.is(kvPair, updatedRow)) {
            return kvPair.key === key || kvPair.value === value;
          }

          return false;
        });

        if (ifValueUniq !== -1) {
          return {
            severisArrayWithValuesity: 'error',
            detail: 'Please enter unique values'
          };
        }
      }
    }
  }

  return;
};
/**
 * Creates an editable key value pair table.
 */


class KeyValuePairTable extends _react.Component {
  /**
   * @override
   * @param props the Component's properties.
   */
  constructor(_props) {
    super(_props);

    _defineProperty(this, "emitOnChange", gridData => {
      const name = this.props.name;
      const value = gridData;
      const event = (0, _event.createEvent)('change', {
        name,
        value
      });
      this.props.onChange(event);
    });

    _defineProperty(this, "onRowAdd", () => {
      const {
        gridData
      } = this.state;

      if (gridData.length > 0) {
        let update = true;
        gridData.forEach(obj => {
          const dublicateRow = gridData.findIndex(kvPair => {
            if (!Object.is(kvPair, obj)) {
              return kvPair.key === obj.key || kvPair.value === obj.value;
            }

            return false;
          });

          if (dublicateRow !== -1 || obj.value === '' || obj.key === '') {
            this.props.showToastr({
              severity: 'error',
              detail: 'Please fill all the cells with a unique value before adding a new option.'
            });
            update = false;
          }
        });

        if (update) {
          this.setState({
            gridData: [...gridData, {
              key: '',
              value: ''
            }]
          });
        }
      } else {
        this.setState({
          gridData: [...gridData, {
            key: '',
            value: ''
          }]
        });
      }
    });

    _defineProperty(this, "keyEditor", props => {
      return this.inputTextEditor(props, 'key');
    });

    _defineProperty(this, "valueEditor", props => {
      return this.inputTextEditor(props, 'value');
    });

    _defineProperty(this, "removeRow", removeIndex => {
      const {
        gridData
      } = this.state;
      const newData = gridData.filter((kvPair, index) => index !== removeIndex);
      this.setState({
        gridData: newData
      });
      this.emitOnChange(newData);
    });

    _defineProperty(this, "handleRemoveRow", (e, index) => {
      e.preventDefault();
      this.removeRow(index);
    });

    const {
      gridData: _gridData
    } = _props;
    this.state = (0, _Immutable.default)({
      gridData: _gridData
    });
  }
  /**
   * @override
   * @param prevProps the properties that the component will receive.
   */


  componentDidUpdate(prevProps) {
    const {
      gridData
    } = this.props;

    if (gridData !== prevProps.gridData) {
      this.setState((0, _Immutable.default)({
        gridData
      }));
    }
  }
  /**
   * @param props
   * @param newValue
   */


  onEditorValueChange(props, newValue) {
    if (props.field === 'key') {
      if (newValue.length > 50) {
        this.props.showToastr({
          severity: 'warn',
          detail: 'Please enter key less than or equal to 50 characters'
        });
        return;
      }
    } else {
      if (newValue.length > 50) {
        this.props.showToastr({
          severity: 'warn',
          detail: 'Please enter value less than or equal to 50 characters'
        });
        return;
      }
    }

    const gridData = (0, _Immutable.set)(this.state.gridData, `[${props.rowIndex}].${props.field}`, newValue);
    this.setState({
      gridData
    });
    const {
      rowIndex
    } = props;
    const length = gridData.length - 1;
    const updatedRow = gridData[rowIndex];

    if (length !== 0) {
      if (gridData[rowIndex]) {
        const {
          key,
          value
        } = updatedRow;

        if (key !== '') {
          const ifValueUniq = gridData.findIndex(kvPair => {
            if (!Object.is(kvPair, updatedRow)) {
              return kvPair.key === key || kvPair.value === value;
            }

            return false;
          });

          if (key !== '' && value !== '' && ifValueUniq === -1) {
            this.emitOnChange(gridData);
          }
        } else {
          this.props.showToastr({
            severity: 'error',
            detail: 'Please fill all cells'
          });
          return;
        }
      }
    }

    this.emitOnChange(gridData);
  }
  /**
   * Emits a change event
   * @param gridData
   */


  /**
   * @param props
   * @param field
   */
  inputTextEditor(props, field) {
    return _react.default.createElement(_InputText.InputText, {
      type: "text",
      value: this.state.gridData[props.rowIndex][field],
      onBlur: () => validateInputHandler(props, this.state.gridData) && this.props.showToastr(validateInputHandler(props, this.state.gridData)),
      onChange: e => this.onEditorValueChange(props, e.target.value)
    });
  }
  /**
   * @param props
   */


  /**
   * @override
   */
  render() {
    const {
      gridHeaders
    } = this.props;
    return _react.default.createElement(TableWrapper, null, _react.default.createElement(_DataTable.DataTable, {
      editable: true,
      value: [...this.state.gridData]
    }, _react.default.createElement(_Column.Column, {
      field: "key",
      header: gridHeaders[0] || defGridHeaders[0],
      editor: this.keyEditor
    }), _react.default.createElement(_Column.Column, {
      field: "value",
      header: gridHeaders[1] || defGridHeaders[1],
      editor: this.valueEditor
    }), _react.default.createElement(_Column.Column, {
      header: "Action",
      field: "action",
      body: (row, data) => _react.default.createElement(_Button.default, {
        type: "button",
        icon: "delete",
        onClick: e => this.handleRemoveRow(e, data.rowIndex)
      }),
      style: {
        width: '85px'
      }
    })), _react.default.createElement(ButtonStyle, {
      color: "primary",
      type: "button",
      onClick: this.onRowAdd
    }, " Add "));
  }

}

exports.default = KeyValuePairTable;

_defineProperty(KeyValuePairTable, "propTypes", {
  name: _propTypes.default.string,
  gridData: _propTypes.default.arrayOf(_propTypes.default.object),
  gridHeaders: _propTypes.default.arrayOf(_propTypes.default.string),
  onChange: _propTypes.default.func,
  showToastr: _propTypes.default.func
});

_defineProperty(KeyValuePairTable, "defaultProps", {
  gridData: [{
    key: '',
    value: ''
  }],
  gridHeaders: defGridHeaders
});