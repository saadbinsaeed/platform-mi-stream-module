"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _moment = _interopRequireDefault(require("moment"));

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _appActions = require("store/actions/app/appActions");

var _broadcastsActions = require("store/actions/broadcasts/broadcastsActions");

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _Calendar = _interopRequireDefault(require("app/components/molecules/Calendar/Calendar"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Displays the broadcasts in a calendar view.
 */
class BroadcastCalendar extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "loadBroadcastUrl", ({
      id
    }) => {
      const permissions = this.props.userProfile.permissions;
      const isAdmin = this.props.userProfile.isAdmin;
      const permissionsSet = new Set(permissions || []);
      const canEdit = isAdmin || permissionsSet.has('broadcast.edit');

      if (canEdit) {
        this.props.history.push(`/broadcasts/edit/${id}`);
      } else {
        this.props.showToastr({
          severity: 'info',
          detail: 'You don\'t have permission to edit !'
        });
      }
    });

    _defineProperty(this, "onNavigate", data => {
      this.fetchBroadcastsOfMonth(data);
    });

    _defineProperty(this, "buildEvents", (0, _fastMemoize.default)(broadcasts => (broadcasts || []).map(item => ({
      id: item.id,
      title: item.message ? item.message : 'No message set',
      start: new Date(item.startDate),
      end: new Date(item.expireDate)
    })).filter(({
      start,
      end
    }) => start instanceof Date && end instanceof Date && start < end)));
  }

  /**
   * Fetch broadcasts on mount
   */
  componentDidMount() {
    this.fetchBroadcastsOfMonth(new Date());
  }

  fetchBroadcastsOfMonth(date) {
    const firstOfTheMonth = (0, _moment.default)(date).date(1).hour(0).minute(0).second(0).millisecond(1);
    const firstOfTheNextMonth = (0, _moment.default)(firstOfTheMonth).add(1, 'month');
    this.props.fetchBroadcastsCalendar({
      where: [{
        field: 'startDate',
        op: '<',
        value: firstOfTheNextMonth
      }, {
        field: 'expireDate',
        op: '>',
        value: firstOfTheMonth
      }, {
        field: 'priority',
        op: '=',
        value: 'broadcast'
      }]
    });
  }
  /**
   * Load our broadcast edit dialog via the URL
   */


  /**
   * @override
   */
  render() {
    const {
      broadcasts
    } = this.props;
    return _react.default.createElement(_PageTemplate.default, {
      title: "Broadcast Calendar",
      overflowHidden: true
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Calendar.default, _extends({
      calendarId: 'broadcast',
      isLoading: this.props.isLoading,
      onNavigate: this.onNavigate,
      popup: true,
      events: this.buildEvents(broadcasts),
      showMultiDayTimes: true,
      onSelectEvent: this.loadBroadcastUrl
    }, this.props))));
  }

}

_defineProperty(BroadcastCalendar, "propTypes", {
  fetchBroadcastsCalendar: _propTypes.default.func,
  showToastr: _propTypes.default.func,
  records: _propTypes.default.array,
  history: _propTypes.default.object,
  userProfile: _propTypes.default.object
});

const mapStateToProps = state => ({
  broadcasts: state.broadcasts.calendar.data,
  isLoading: state.broadcasts.calendar.isLoading,
  userProfile: state.user.profile
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  fetchBroadcastsCalendar: _broadcastsActions.fetchBroadcastsCalendar,
  showToastr: _appActions.showToastr
})(BroadcastCalendar);

exports.default = _default;