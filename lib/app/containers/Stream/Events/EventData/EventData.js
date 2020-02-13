"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the subrow to display the data related to the event
 */
class EventData extends _react.Component {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    this.state = {
      visibleData: false,
      visibleId: true
    };
    this.showData = this.showData.bind(this);
  }
  /**
   * changes the state to show/hide the data.
   */


  showData() {
    this.setState({
      visibleData: !this.state.visibleData,
      visibleId: !this.state.visibleId
    });
  }
  /**
   * @override
   * @return {XML}
   */


  render() {
    const {
      streamId,
      alarmId,
      siteId,
      siteName,
      impact
    } = this.props;
    return _react.default.createElement("div", null, this.state.visibleId ? _react.default.createElement(_Button.default, {
      onClick: this.showData
    }, streamId) : null, this.state.visibleData ? _react.default.createElement("div", {
      onClick: this.showData,
      role: "button",
      tabIndex: 0
    }, _react.default.createElement("div", null, _react.default.createElement("b", null, "Alarm Id: "), " ", alarmId, " | ", _react.default.createElement("b", null, "Site Id: "), " ", siteId), _react.default.createElement("div", null, _react.default.createElement("b", null, "Site Name: "), " ", siteName, " | ", _react.default.createElement("b", null, "Impact: "), " ", impact)) : null);
  }

}

_defineProperty(EventData, "propTypes", {
  streamId: _propTypes.default.string,
  alarmId: _propTypes.default.number,
  siteId: _propTypes.default.string,
  siteName: _propTypes.default.string,
  impact: _propTypes.default.string
});

var _default = EventData;
exports.default = _default;