"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _dashboardActions = require("store/actions/dashboard/dashboardActions");

var _Widget = _interopRequireDefault(require("app/components/atoms/Widget/Widget"));

var _LinkList = _interopRequireDefault(require("./LinkList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Widget for displaying tasks assigned to the active user
 */
class ProcessesOwnedByMeWidget extends _react.PureComponent {
  constructor(props) {
    super(props);
    props.loadProcessesOwned(props.user, {
      linkOnly: true
    });
  }

  render() {
    const {
      isLoading,
      records
    } = this.props;
    return _react.default.createElement(_Widget.default, {
      title: "Processes",
      subTitle: "Owned by me",
      content: _react.default.createElement(_LinkList.default, {
        list: records,
        type: "process"
      }),
      url: '/dashboards/processes/owned',
      loading: isLoading
    });
  }

}

_defineProperty(ProcessesOwnedByMeWidget, "propTypes", {
  loadProcessesOwned: _propTypes.default.func,
  isLoading: _propTypes.default.bool,
  records: _propTypes.default.array,
  user: _propTypes.default.object.isRequired
});

const mapStateToProps = state => {
  return {
    user: state.user.profile,
    isLoading: state.dashboard.processesOwned.isLoading,
    records: state.dashboard.processesOwned.records
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadProcessesOwned: _dashboardActions.loadProcessesOwned
})(ProcessesOwnedByMeWidget);

exports.default = _default;