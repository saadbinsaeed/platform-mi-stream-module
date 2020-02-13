"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TeamAvatar = (0, _styledComponents.default)(_Avatar.default).withConfig({
  displayName: "AboxTeamCard__TeamAvatar",
  componentId: "j2f5o0-0"
})(["margin-left:0.5rem;"]);

const TeamMembers = _styledComponents.default.div.withConfig({
  displayName: "AboxTeamCard__TeamMembers",
  componentId: "j2f5o0-1"
})(["display:flex;flex-wrap:wrap;"]);

const TeamCount = _styledComponents.default.div.withConfig({
  displayName: "AboxTeamCard__TeamCount",
  componentId: "j2f5o0-2"
})(["text-align:center;width:3.5rem;height:1.5rem;border-radius:200rem;background-color:#f2f2f2;color:#adadad;margin-top:0.25rem;margin-left:0.5rem;cursor:pointer;"]);
/**
 *
 */


class AboxTeamCard extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildUserList", (0, _memoizeOne.default)(teamMembers => teamMembers.filter(member => member && member.user).slice(0, 10).map(({
      user,
      id
    }) => _react.default.createElement(TeamAvatar, {
      key: id,
      title: user && user.name,
      src: user && user.image,
      size: "lg",
      name: user && user.name || 'No Name'
    }))));
  }

  render() {
    const {
      teamMembers,
      action
    } = this.props;
    const len = (teamMembers || []).length;
    const userList = this.buildUserList(teamMembers || []);
    return _react.default.createElement(_Card.default, {
      title: "Team",
      headerActions: _react.default.createElement(_Icon.default, {
        name: "window-maximize",
        size: "sm",
        onClick: action
      }),
      description: !userList.length ? 'No Team Members' : _react.default.createElement(TeamMembers, null, userList, len > 10 && _react.default.createElement(TeamCount, {
        onClick: action
      }, " +", len - 10))
    });
  }

}

_defineProperty(AboxTeamCard, "propTypes", {
  teamMembers: _propTypes.default.array
});

_defineProperty(AboxTeamCard, "defaultProps", {
  teamMembers: []
});

var _default = AboxTeamCard;
exports.default = _default;