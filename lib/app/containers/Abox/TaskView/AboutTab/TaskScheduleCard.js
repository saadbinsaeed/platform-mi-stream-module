"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _recompose = require("recompose");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _ItemInfo = _interopRequireDefault(require("app/components/molecules/ItemInfo/ItemInfo"));

var _EditableRow = _interopRequireDefault(require("app/components/molecules/EditableRow/EditableRow"));

var _DateTimePickerModal = _interopRequireDefault(require("app/components/molecules/DataTimePicker/DateTimePickerModal"));

var _utils = require("app/utils/utils");

var _date = require("app/utils/date/date");

var _bpmnEngineUtils = require("app/utils/bpmn/bpmnEngineUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Label = _styledComponents.default.strong.withConfig({
  displayName: "TaskScheduleCard__Label",
  componentId: "sc-15agrgm-0"
})([""]);

const Expand = _styledComponents.default.div.withConfig({
  displayName: "TaskScheduleCard__Expand",
  componentId: "sc-15agrgm-1"
})(["width:100%;"]);

const TaskScheduleCard = (0, _recompose.onlyUpdateForKeys)(['details'])(props => {
  const {
    updateField,
    details
  } = props;
  const {
    startDate,
    lastUpdate,
    claimDate,
    dueDate,
    endDate
  } = details || {};
  const bpmnVariables = (0, _bpmnEngineUtils.bmpnVariablesToObject)(details.bpmnVariables);
  const disabled = !!endDate;
  const start = (0, _utils.datefy)(bpmnVariables.startDate);
  const due = (0, _utils.datefy)(dueDate);
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Created"), _react.default.createElement(_ItemInfo.default, {
    icon: _react.default.createElement(_Icon.default, {
      name: "calendar-blank"
    }),
    title: startDate && (0, _date.formatDate)(startDate) || 'No Date'
  })), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Last Modified"), _react.default.createElement(_ItemInfo.default, {
    icon: _react.default.createElement(_Icon.default, {
      name: "history"
    }),
    title: lastUpdate && (0, _date.formatDate)(lastUpdate) || 'No Modified Date'
  })), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Claimed"), _react.default.createElement(_ItemInfo.default, {
    icon: _react.default.createElement(_Icon.default, {
      name: "history"
    }),
    title: claimDate && (0, _date.formatDate)(claimDate) || 'No Claim Date'
  })), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Start Date"), _react.default.createElement(_EditableRow.default, {
    name: "bpmnVariables.startDate",
    value: start,
    EditComponent: ({
      onChange,
      name,
      value
    }) => _react.default.createElement(Expand, null, _react.default.createElement(_DateTimePickerModal.default, {
      name: name,
      onChange: onChange,
      maxDate: due || null,
      value: value
    })),
    save: updateField,
    showClose: true,
    disabled: disabled
  }, _react.default.createElement(_ItemInfo.default, {
    icon: _react.default.createElement(_Icon.default, {
      name: "calendar-blank"
    }),
    title: bpmnVariables.startDate && (0, _date.formatDate)(bpmnVariables.startDate) || 'No Start Date'
  }))), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Due Date"), _react.default.createElement(_EditableRow.default, {
    name: "dueDate",
    value: due,
    EditComponent: ({
      onChange,
      name,
      value
    }) => _react.default.createElement(Expand, null, _react.default.createElement(_DateTimePickerModal.default, {
      name: name,
      onChange: onChange,
      value: value,
      minDate: start || null
    })),
    save: updateField,
    showClose: true,
    disabled: disabled
  }, _react.default.createElement(_ItemInfo.default, {
    icon: _react.default.createElement(_Icon.default, {
      name: "calendar-blank"
    }),
    title: dueDate && (0, _date.formatDate)(dueDate) || 'No Due Date'
  }))), endDate && _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "End Date"), _react.default.createElement(_ItemInfo.default, {
    icon: _react.default.createElement(_Icon.default, {
      name: "calendar-blank"
    }),
    title: (0, _date.formatDate)(endDate)
  })));
});
var _default = TaskScheduleCard;
exports.default = _default;