"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _UserAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/UserAutocomplete"));

var _TaskMemberAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/TaskMemberAutocomplete"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _GroupAutocomplete = _interopRequireDefault(require("app/components/molecules/Autocomplete/GroupAutocomplete"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A modal for search and add team members
 */
class AddTeamMemberModal extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      team: [],
      groups: [],
      filteredTeam: null
    });

    _defineProperty(this, "submit", () => {
      const {
        onChange
      } = this.props;
      const {
        team,
        groups
      } = this.state;
      this.setState({
        team: [],
        groups: []
      }, () => onChange && onChange({
        team,
        groups
      }));
    });

    _defineProperty(this, "updateTeamValue", event => this.setState({
      team: event.value
    }));

    _defineProperty(this, "updateGroupValue", event => this.setState({
      groups: event.value
    }));
  }

  render() {
    const {
      type,
      id,
      open,
      userFilterBy,
      groupFilterBy,
      onToggle,
      loading
    } = this.props;
    const {
      team,
      groups
    } = this.state;
    const MemberAutocomplete = type === 'task' ? _TaskMemberAutocomplete.default : _UserAutocomplete.default;
    const userAutocompleteProps = {
      name: 'team',
      placeholder: 'Search for a user...',
      onChange: this.updateTeamValue,
      value: team,
      filterBy: userFilterBy,
      multiple: true
    };

    if (type === 'task') {
      userAutocompleteProps.taskId = id;
    }

    return _react.default.createElement(_Modal.default, {
      title: "Add team members",
      open: open,
      disableBack: true,
      onToggle: onToggle,
      height: 300,
      footer: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Button.default, {
        onClick: onToggle
      }, "Cancel"), _react.default.createElement(_Button.default, {
        color: "primary",
        onClick: this.submit,
        disabled: team.length <= 0 && groups.length <= 0
      }, "Add team members"))
    }, loading && _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    }), _react.default.createElement(MemberAutocomplete, userAutocompleteProps), _react.default.createElement(_GroupAutocomplete.default, {
      name: 'groups',
      placeholder: 'Search for a group...',
      onChange: this.updateGroupValue,
      value: groups,
      filterBy: groupFilterBy,
      multiple: true
    }));
  }

}

_defineProperty(AddTeamMemberModal, "propTypes", {
  id: _propTypes.default.string.isRequired,
  type: _propTypes.default.oneOf(['task', 'process']).isRequired,
  open: _propTypes.default.bool,
  loading: _propTypes.default.bool,
  filterBy: _propTypes.default.arrayOf(_propTypes.default.object),
  onChange: _propTypes.default.func.isRequired,
  onToggle: _propTypes.default.func.isRequired
});

;
var _default = AddTeamMemberModal;
exports.default = _default;