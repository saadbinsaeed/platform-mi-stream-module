"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTableFullHeight = exports.DataTableContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _FullHeight = _interopRequireDefault(require("app/components/atoms/FullHeight/FullHeight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DataTableContainer = _styledComponents.default.div.withConfig({
  displayName: "DataTableStyle__DataTableContainer",
  componentId: "j4bwgn-0"
})(["max-width:100%;overflow-y:auto;overflow-x:auto;height:100%;& .ui-datatable-thead th{position:relative;}& .ui-datatable{& .ui-cell-data{display:block;overflow:hidden;& div{overflow:hidden;}}}.ui-datatable-odd:not(.ui-state-highlight){background:rgba(0,0,0,0.1);}.ui-state-highlight .Icon{color:white;}"]);

exports.DataTableContainer = DataTableContainer;
const DataTableFullHeight = (0, _styledComponents.default)(_FullHeight.default).withConfig({
  displayName: "DataTableStyle__DataTableFullHeight",
  componentId: "j4bwgn-1"
})(["background:", ";"], ({
  theme
}) => theme.base.background);
exports.DataTableFullHeight = DataTableFullHeight;