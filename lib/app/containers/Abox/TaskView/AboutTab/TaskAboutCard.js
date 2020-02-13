"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _recompose = require("recompose");

var _ItemInfo = _interopRequireDefault(require("app/components/molecules/ItemInfo/ItemInfo"));

var _InputText = _interopRequireDefault(require("app/components/atoms/Input/InputText"));

var _AboxCircularProgressBar = _interopRequireDefault(require("app/components/atoms/CircularProgressBar/AboxCircularProgressBar"));

var _TextArea = _interopRequireDefault(require("app/components/atoms/TextArea/TextArea"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _EditableRow = _interopRequireDefault(require("app/components/molecules/EditableRow/EditableRow"));

var _TaskCandidateAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/TaskCandidateAutocomplete"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _statefulInput = _interopRequireDefault(require("app/utils/hoc/statefulInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const CircularProgressBarContainer = _styledComponents.default.div.withConfig({
  displayName: "TaskAboutCard__CircularProgressBarContainer",
  componentId: "sc-1vd56id-0"
})(["padding:10px;text-align:center;& svg{margin:auto;}"]);

const Expand = _styledComponents.default.div.withConfig({
  displayName: "TaskAboutCard__Expand",
  componentId: "sc-1vd56id-1"
})(["width:100%;& textarea{width:100% !important;min-height:109px;word-break:break-all;}"]);

const Label = _styledComponents.default.strong.withConfig({
  displayName: "TaskAboutCard__Label",
  componentId: "sc-1vd56id-2"
})([""]);

const TextAreaHoc = (0, _statefulInput.default)(_TextArea.default);
const formatDescription = (0, _memoizeOne.default)(description => description && description.split('\n').map((line, index) => _react.default.createElement(_react.Fragment, {
  key: index
}, line, _react.default.createElement("br", null))) || 'No Description');
const TaskAboutCard = (0, _recompose.onlyUpdateForKeys)(['details'])(props => {
  const {
    details,
    updateField
  } = props;
  const {
    id,
    name,
    description,
    assignee = {},
    variable,
    endDate,
    priority
  } = details || {};
  const disabled = !!endDate;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(CircularProgressBarContainer, null, _react.default.createElement(_AboxCircularProgressBar.default, {
    disabled: disabled,
    priority: priority,
    percentage: variable && variable.completion || 0,
    size: 100
  })), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Task Name"), _react.default.createElement(_EditableRow.default, {
    name: "name",
    value: name || '',
    EditComponent: editProps => _react.default.createElement(_InputText.default, _extends({}, editProps, {
      type: "text",
      initialValue: name || ''
    })),
    save: updateField,
    disabled: disabled
  }, _react.default.createElement(_Text.default, null, name || 'No Name'))), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Task ID"), _react.default.createElement("div", null, "#", id)), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Description"), _react.default.createElement(_EditableRow.default, {
    name: "description",
    value: description || '',
    EditComponent: editProps => _react.default.createElement(Expand, null, _react.default.createElement(TextAreaHoc, _extends({}, editProps, {
      rows: 5
    }))),
    save: updateField,
    disabled: disabled,
    showClose: true
  }, _react.default.createElement(_Text.default, null, formatDescription(description)))), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Assignee"), _react.default.createElement(_EditableRow.default, {
    name: "assignee",
    value: assignee,
    EditComponent: editProps => _react.default.createElement(Expand, null, _react.default.createElement(_TaskCandidateAutocomplete.default, _extends({}, editProps, {
      taskId: id,
      placeholder: "Select Assignee"
    }))),
    save: updateField,
    disabled: disabled,
    showClose: true
  }, !assignee ? _react.default.createElement("div", null, "No Assignee") : _react.default.createElement(_ItemInfo.default, {
    icon: _react.default.createElement(_Avatar.default, {
      src: assignee.image,
      name: assignee.name,
      size: "lg"
    }),
    title: _react.default.createElement(_PeopleLink.default, {
      id: assignee.id
    }, assignee.name),
    subtitle: _react.default.createElement("em", null, "@", assignee.login)
  }))));
});
var _default = TaskAboutCard;
exports.default = _default;