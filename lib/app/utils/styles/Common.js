"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CssGrid = exports.breakText = void 0;

var _styledComponents = require("styled-components");

const breakText = (0, _styledComponents.css)(["text-overflow:ellipsis;overflow-wrap:break-word;word-wrap:break-word;-ms-word-break:break-all;word-break:break-word;"]);
exports.breakText = breakText;
const CssGrid = (0, _styledComponents.css)(["display:grid;grid-template-columns:repeat(12,1fr);"]);
exports.CssGrid = CssGrid;