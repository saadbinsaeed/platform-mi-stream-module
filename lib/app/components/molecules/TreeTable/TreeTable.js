"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _TreeTable = require("primereact/components/treetable/TreeTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
class BaseTreeTable extends _TreeTable.TreeTable {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);
    this.selection = props.selection;
  }
  /**
   * @override
   */


  componentWillReceiveProps(nextProps) {
    // super.componentWillReceiveProps(nextProps);
    const {
      selection
    } = nextProps;
    this.selection = selection;
  }
  /**
   * @override
   */


  findIndexInSelection(node) {
    let index = -1;

    if (this.props.selectionMode && this.selection && node.id) {
      if (this.isSingleSelectionMode()) {
        index = this.selection.id === node.id ? 1 : 0;
      } else {
        for (let i = 0; i < this.selection.length; i++) {
          if (this.selection[i].id === node.id) {
            index = i;
            break;
          }
        }
      }
    } // index >= 0 && this.propagateSelectionUp(node, true);


    return index;
  }

}

const TreeTableStyle = (0, _styledComponents.default)(BaseTreeTable).withConfig({
  displayName: "TreeTable__TreeTableStyle",
  componentId: "sc-167tu5j-0"
})([""]);

const TreeTable = props => _react.default.createElement(TreeTableStyle, props);

var _default = TreeTable;
exports.default = _default;