"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = exports.FiltersTimeline = exports.TimelineToolbarSelect = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _platformUi = require("@mic3/platform-ui");

var _Filters = _interopRequireDefault(require("app/components/organisms/Filters/Filters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TimelineToolbarSelect = (0, _styledComponents.default)(_platformUi.Select).withConfig({
  displayName: "style__TimelineToolbarSelect",
  componentId: "cfo9f1-0"
})(["min-width:150px;margin-left:12px;#select-range{&:focus{background-color:transparent;}}"]);
exports.TimelineToolbarSelect = TimelineToolbarSelect;
const FiltersTimeline = (0, _styledComponents.default)(_Filters.default).withConfig({
  displayName: "style__FiltersTimeline",
  componentId: "cfo9f1-1"
})(["background:#343a45;.filter-toolbar{box-shadow:0 0 3px #000;padding-bottom:0;}.filter-chips{margin:24px 12px;}.page-content{height:100%;}div[class*='Filters__Content']{max-height:100%;}"]);
exports.FiltersTimeline = FiltersTimeline;

const Label = _styledComponents.default.strong.withConfig({
  displayName: "style__Label",
  componentId: "cfo9f1-2"
})([""]);

exports.Label = Label;