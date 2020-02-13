"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _TaskAboutCard = _interopRequireDefault(require("app/containers/Abox/TaskView/AboutTab/TaskAboutCard"));

var _TaskDetailCard = _interopRequireDefault(require("app/containers/Abox/TaskView/AboutTab/TaskDetailCard"));

var _TaskScheduleCard = _interopRequireDefault(require("app/containers/Abox/TaskView/AboutTab/TaskScheduleCard"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 */
class TaskAboutTab extends _react.PureComponent {
  render() {
    const {
      details,
      updateField
    } = this.props;
    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Container.default, null, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6
    }, _react.default.createElement(_Card.default, {
      title: "About",
      collapsible: true,
      description: _react.default.createElement(_TaskAboutCard.default, {
        details: details,
        updateField: updateField
      })
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6
    }, _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Task Detail",
      description: _react.default.createElement(_TaskDetailCard.default, {
        details: details,
        updateField: updateField
      })
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6
    }, _react.default.createElement(_Card.default, {
      title: "Schedule",
      collapsible: true,
      description: _react.default.createElement(_TaskScheduleCard.default, {
        details: details,
        updateField: updateField
      })
    })))));
  }

}

_defineProperty(TaskAboutTab, "propTypes", {
  details: _propTypes.default.object,
  updateField: _propTypes.default.func.isRequired
});

var _default = TaskAboutTab;
exports.default = _default;