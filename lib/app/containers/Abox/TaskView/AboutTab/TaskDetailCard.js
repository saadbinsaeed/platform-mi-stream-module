"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _recompose = require("recompose");

var _UserAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/UserAutocomplete"));

var _AboxProgressSlider = _interopRequireDefault(require("app/components/atoms/ProgressSlider/AboxProgressSlider"));

var _ProcessLink = _interopRequireDefault(require("app/components/atoms/Link/ProcessLink"));

var _TaskLink = _interopRequireDefault(require("app/components/atoms/Link/TaskLink"));

var _ItemInfo = _interopRequireDefault(require("app/components/molecules/ItemInfo/ItemInfo"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _EditableRow = _interopRequireDefault(require("app/components/molecules/EditableRow/EditableRow"));

var _ProgressRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Progress/ProgressRenderer"));

var _PriorityRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Priority/PriorityRenderer"));

var _Select = _interopRequireDefault(require("app/components/molecules/Autocomplete/Select"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _statefulInput = _interopRequireDefault(require("app/utils/hoc/statefulInput"));

var _aboxConfig = require("app/config/aboxConfig");

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Label = _styledComponents.default.strong.withConfig({
  displayName: "TaskDetailCard__Label",
  componentId: "sc-172fh7u-0"
})([""]);

const Expand = _styledComponents.default.div.withConfig({
  displayName: "TaskDetailCard__Expand",
  componentId: "sc-172fh7u-1"
})(["width:100%;"]);

const StatefullDropdown = (0, _statefulInput.default)(_Select.default);
const TaskDetailCard = (0, _recompose.onlyUpdateForKeys)(['details'])(props => {
  const {
    updateField,
    details
  } = props;
  const {
    parent,
    owner,
    variable,
    endDate,
    process,
    children
  } = details || {};
  const disabled = !!endDate;
  const hasSubtasks = !!(children && children.length);
  const priority = (0, _utils.getNum)(details, 'priority') || 3;
  const parentEntity = parent || process;
  let completion, parentPriority;

  if (parent) {
    completion = Math.floor(Number((0, _lo.get)(parent, 'variable.completion', 0)));
    parentPriority = (0, _lo.get)(parent, 'priority', 3);
  } else {
    completion = Math.floor(Number((0, _lo.get)(process, 'variables.progress', 0)));
    parentPriority = (0, _lo.get)(process, 'variables.priority', 3);
  }

  const parentEntityId = String((0, _lo.get)(parentEntity, 'id'));
  const progress = Math.floor(Number((0, _lo.get)(variable, 'completion', 0)));
  const LinkComponent = parent ? _TaskLink.default : _ProcessLink.default;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Parent ", parent ? 'Task' : 'Process'), _react.default.createElement(_ItemInfo.default, {
    icon: _react.default.createElement(_ProgressRenderer.default, {
      value: completion,
      data: {
        endDate: (0, _lo.get)(parentEntity, 'endDate'),
        variables: {
          priority: parentPriority
        }
      }
    }),
    title: _react.default.createElement(LinkComponent, {
      id: parentEntityId
    }, (0, _lo.get)(parentEntity, 'name') || 'No Name'),
    subtitle: _react.default.createElement("em", null, "#", parentEntityId)
  })), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Owner"), _react.default.createElement(_EditableRow.default, {
    name: "owner",
    value: owner,
    EditComponent: editProps => _react.default.createElement(Expand, null, _react.default.createElement(_UserAutocomplete.default, _extends({}, editProps, {
      placeholder: "Select Owner"
    }))),
    save: updateField,
    disabled: disabled,
    showClose: true
  }, !owner ? 'No Owner' : _react.default.createElement(_ItemInfo.default, {
    icon: _react.default.createElement(_Avatar.default, {
      src: owner.image,
      name: owner.name,
      size: "lg"
    }),
    title: _react.default.createElement(_PeopleLink.default, {
      id: owner.id
    }, owner.name),
    subtitle: owner.login
  }))), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Priority"), _react.default.createElement(_EditableRow.default, {
    name: "priority",
    value: priority === 50 ? 3 : priority,
    EditComponent: editProps => _react.default.createElement(Expand, null, _react.default.createElement(StatefullDropdown, _extends({}, editProps, {
      placeholder: "Select Priority",
      options: _aboxConfig.PRIORITY_OPTIONS
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
    title: (0, _lo.get)(_aboxConfig.PRIORITY_OPTIONS.find(({
      value
    }) => value === priority), 'label')
  }))), _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Progress ", progress, "%"), hasSubtasks && _react.default.createElement("div", null, _react.default.createElement("small", null, '(progress based on the subtasks\' progress)')), _react.default.createElement(_AboxProgressSlider.default, {
    name: "progress",
    value: progress,
    onChange: updateField,
    priority: priority,
    disabled: disabled || hasSubtasks
  })));
});
var _default = TaskDetailCard;
exports.default = _default;