"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _moment = _interopRequireDefault(require("moment"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _TaskCandidateAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/TaskCandidateAutocomplete"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _PriorityRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Priority/PriorityRenderer"));

var _AboxProgressSlider = _interopRequireDefault(require("app/components/atoms/ProgressSlider/AboxProgressSlider"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _EditableRow = _interopRequireDefault(require("app/components/molecules/EditableRow/EditableRow"));

var _DateTimePickerModal = _interopRequireDefault(require("app/components/molecules/DataTimePicker/DateTimePickerModal"));

var _Select = _interopRequireDefault(require("app/components/molecules/Autocomplete/Select"));

var _ItemInfo = _interopRequireDefault(require("app/components/molecules/ItemInfo/ItemInfo"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _Carousel = _interopRequireDefault(require("app/components/atoms/Carousel/Carousel"));

var _FormGenerator = _interopRequireDefault(require("app/containers/Designer/Form/components/FormGenerator"));

var _bpmnEngineUtils = require("app/utils/bpmn/bpmnEngineUtils");

var _statefulInput = _interopRequireDefault(require("app/utils/hoc/statefulInput"));

var _lo = require("app/utils/lo/lo");

var _date = require("app/utils/date/date");

var _aboxConfig = require("app/config/aboxConfig");

var _formUtils = require("app/utils/designer/form/formUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CarouselStyled = (0, _styledComponents.default)(_Carousel.default).withConfig({
  displayName: "TaskFormTab__CarouselStyled",
  componentId: "sc-7p72km-0"
})(["background:rgba(0,0,0,.2);padding:0 .5rem;"]);

const Label = _styledComponents.default.strong.withConfig({
  displayName: "TaskFormTab__Label",
  componentId: "sc-7p72km-1"
})(["display:block;font-size:.7rem;margin-bottom:0.5rem;"]);

const Expand = _styledComponents.default.div.withConfig({
  displayName: "TaskFormTab__Expand",
  componentId: "sc-7p72km-2"
})(["width:100%;"]);

const SliderItemStyled = _styledComponents.default.div.withConfig({
  displayName: "TaskFormTab__SliderItemStyled",
  componentId: "sc-7p72km-3"
})(["min-height:4rem;padding:1rem 2.5rem;"]);

const StatefulDropdown = (0, _statefulInput.default)(_Select.default);
/**
 *
 */

class TaskFormTab extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "normalizeFormDefinitionFields", (0, _memoizeOne.default)(fields => (0, _formUtils.normalizeFields)(fields)));

    _defineProperty(this, "normalizeVariables", (0, _memoizeOne.default)((taskVariables, processVariables) => ({
      global: (0, _bpmnEngineUtils.bmpnVariablesToObject)(processVariables),
      local: (0, _bpmnEngineUtils.bmpnVariablesToObject)(taskVariables)
    })));
  }

  /**
   * @override
   */
  render() {
    const {
      details,
      updateField
    } = this.props;
    const {
      id,
      variable,
      priority,
      endDate,
      dueDate,
      assignee,
      children,
      process
    } = details || {};
    const variables = this.normalizeVariables((0, _lo.get)(details, 'bpmnVariables'), (0, _lo.get)(process, 'bpmnVariables'));
    const start = variables.local.startDate ? new Date(variables.local.startDate) : null;
    const due = dueDate ? new Date(dueDate) : null;
    const priorityOption = _aboxConfig.PRIORITY_OPTIONS[priority - 1];
    const disabled = !!endDate;
    const hasSubtasks = !!(children && children.length);
    const progress = Math.floor(Number((0, _lo.get)(variable, 'completion', 0)));
    const CarouselPortal = document && document.getElementById('carousel-item');
    const version = (0, _lo.get)(details, 'form.definition.version');
    let components;

    if (version) {
      components = this.normalizeFormDefinitionFields((0, _lo.get)(details, 'form.definition.fields'));
    }

    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_react.Fragment, null, _react.default.createElement(CarouselStyled, {
      responsive: TaskFormTab.sliderResponsiveConfig,
      items: [_react.default.createElement(SliderItemStyled, null, _react.default.createElement(Label, null, "Assignee"), _react.default.createElement(_EditableRow.default, {
        name: "assignee",
        value: assignee,
        EditComponent: editProps => _react.default.createElement(Expand, null, _react.default.createElement(_TaskCandidateAutocomplete.default, _extends({}, editProps, {
          taskId: id,
          appendTo: CarouselPortal,
          placeholder: "Select Assignee"
        }))),
        save: updateField,
        disabled: disabled,
        showClose: true
      }, !assignee ? _react.default.createElement("div", null, "No Assignee") : _react.default.createElement(_ItemInfo.default, {
        icon: _react.default.createElement(_Avatar.default, {
          src: (0, _lo.get)(assignee, 'image'),
          name: (0, _lo.get)(assignee, 'name'),
          size: "lg"
        }),
        title: _react.default.createElement(_PeopleLink.default, {
          id: (0, _lo.get)(assignee, 'id')
        }, (0, _lo.get)(assignee, 'name')),
        subtitle: _react.default.createElement("em", null, "@", (0, _lo.get)(assignee, 'login'))
      }))), _react.default.createElement(SliderItemStyled, null, _react.default.createElement(Label, null, "Start date"), _react.default.createElement(_EditableRow.default, {
        name: "bpmnVariables.startDate",
        value: start,
        EditComponent: ({
          name,
          value,
          onChange
        }) => _react.default.createElement(Expand, null, _react.default.createElement(_DateTimePickerModal.default, {
          name: name,
          maxDate: due || null,
          onChange: onChange,
          value: value
        })),
        save: updateField,
        showClose: true,
        disabled: disabled
      }, _react.default.createElement(_ItemInfo.default, {
        icon: _react.default.createElement(_Icon.default, {
          name: "calendar-blank"
        }),
        title: variables.local.startDate && (0, _date.formatDate)(variables.local.startDate) || 'No Start Date',
        subtitle: variables.local.startDate && (0, _moment.default)(variables.local.startDate).from((0, _moment.default)())
      }))), _react.default.createElement(SliderItemStyled, null, _react.default.createElement(Label, null, "Due date"), _react.default.createElement(_EditableRow.default, {
        name: "dueDate",
        value: due,
        EditComponent: ({
          name,
          value,
          onChange
        }) => _react.default.createElement(Expand, null, _react.default.createElement(_DateTimePickerModal.default, {
          name: name,
          minDate: start || null,
          onChange: onChange,
          value: value
        })),
        save: updateField,
        showClose: true,
        disabled: disabled
      }, _react.default.createElement(_ItemInfo.default, {
        icon: _react.default.createElement(_Icon.default, {
          name: "calendar-blank"
        }),
        title: dueDate && (0, _date.formatDate)(dueDate) || 'No Due Date',
        subtitle: dueDate && (0, _moment.default)(dueDate).from((0, _moment.default)())
      }))), _react.default.createElement(SliderItemStyled, null, _react.default.createElement(Label, null, "Priority"), _react.default.createElement(_EditableRow.default, {
        name: "priority",
        value: priority === 50 ? 3 : priority,
        EditComponent: editProps => _react.default.createElement(Expand, null, _react.default.createElement(StatefulDropdown, _extends({}, editProps, {
          placeholder: "Select Priority",
          options: _aboxConfig.PRIORITY_OPTIONS,
          appendTo: CarouselPortal
        }))),
        save: updateField,
        disabled: disabled,
        showClose: true
      }, _react.default.createElement(_ItemInfo.default, {
        icon: _react.default.createElement(_PriorityRenderer.default, {
          value: priority,
          data: {
            endDate
          }
        }),
        title: (0, _lo.get)(priorityOption, 'label')
      }))), _react.default.createElement(SliderItemStyled, null, _react.default.createElement(Label, null, "Progress ", progress, "%"), hasSubtasks && _react.default.createElement(Label, null, '(based on the subtasks\' progress)'), _react.default.createElement(_AboxProgressSlider.default, {
        name: "progress",
        value: progress,
        priority: priority,
        onChange: updateField,
        disabled: disabled || hasSubtasks
      }))]
    }), version && _react.default.createElement(_FormGenerator.default, {
      components: components,
      variables: variables
    })));
  }

}

_defineProperty(TaskFormTab, "propTypes", {
  details: _propTypes.default.object,
  updateField: _propTypes.default.func
});

_defineProperty(TaskFormTab, "sliderResponsiveConfig", {
  '0': {
    items: 1
  },
  '1024': {
    items: 5
  }
});

var _default = TaskFormTab;
exports.default = _default;