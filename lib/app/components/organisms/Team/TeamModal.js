"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _Team = _interopRequireDefault(require("./Team"));

var _Modal = _interopRequireDefault(require("../../molecules/Modal/Modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// import PropTypes from 'prop-types';

/**
 * If we want to show our team member list in a modal
 */
class TeamModal extends _react.PureComponent {
  /**
   * Render our modal with the team-list using props.team
   */
  render() {
    return _react.default.createElement(_Modal.default, {
      title: "Team",
      open: true
    }, _react.default.createElement(_reactRouterDom.MemoryRouter, null, _react.default.createElement(_Team.default, null)));
  }

}

var _default = TeamModal;
exports.default = _default;