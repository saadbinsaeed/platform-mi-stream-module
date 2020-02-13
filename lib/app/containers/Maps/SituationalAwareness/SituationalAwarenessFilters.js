"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Menu = _interopRequireDefault(require("app/components/molecules/Menu/Menu"));

var _MenuHeader = _interopRequireDefault(require("app/components/molecules/Menu/MenuHeader"));

var _FilterItemGroup = _interopRequireDefault(require("app/components/molecules/FilterItemGroup/FilterItemGroup"));

var _CheckBox = _interopRequireDefault(require("app/components/atoms/CheckBox/CheckBox"));

var _Immutable = _interopRequireWildcard(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * FilterContent
 */
class SituationalAwarenessFilters extends _react.PureComponent {
  /**
   * Set default state
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "handleViewChange", event => {
      const {
        name,
        value
      } = event.target;
      this.setState({
        view: (0, _Immutable.set)(this.state.view, name, value)
      }, this.onChange);
    });

    _defineProperty(this, "onChange", () => {
      this.props.onChange && this.props.onChange(this.state);
    });

    this.state = {
      view: (0, _Immutable.default)({
        mttr: {},
        cause: {},
        priority: {},
        process: {},
        entities: {}
      }),
      group: ''
    };
  }
  /**
   * handleFiltersViewChange
   */


  /**
   * Render
   */
  render() {
    return _react.default.createElement(_Menu.default, null, _react.default.createElement(_MenuHeader.default, null, "Filter Fields"), _react.default.createElement(_FilterItemGroup.default, {
      name: "MTTR Bucket",
      value: this.state.view.mttr
    }, _react.default.createElement(_CheckBox.default, {
      name: "mttr.0",
      checked: this.state.view.mttr[0] || false,
      label: "Not identified",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "mttr.1",
      checked: this.state.view.mttr[1] || false,
      label: "< 2 Hours",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "mttr.2",
      checked: this.state.view.mttr[2] || false,
      label: "2 - 6 Hours",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "mttr.3",
      checked: this.state.view.mttr[3] || false,
      label: "6 - 12 Hours",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "mttr.4",
      checked: this.state.view.mttr[4] || false,
      label: "12 - 24 Hours",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "mttr.5",
      checked: this.state.view.mttr[5] || false,
      label: "> 24 Hours",
      onChange: this.handleViewChange
    })), _react.default.createElement(_FilterItemGroup.default, {
      name: "Root Cause",
      value: this.state.view.cause
    }, _react.default.createElement(_CheckBox.default, {
      name: "cause.na",
      checked: this.state.view.cause.na || false,
      label: "Not identified",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "cause.others",
      checked: this.state.view.cause.others || false,
      label: "Others",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "cause.environmental",
      checked: this.state.view.cause.environmental || false,
      label: "Environmental",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "cause.active",
      checked: this.state.view.cause.active || false,
      label: "Active",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "cause.planned_activity",
      checked: this.state.view.cause.planned_activity || false,
      label: "Planned activity",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "cause.error",
      checked: this.state.view.cause.error || false,
      label: "Error",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "cause.power",
      checked: this.state.view.cause.power || false,
      label: "Power",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "cause.access",
      checked: this.state.view.cause.access || false,
      label: "Access",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "cause.cascaded",
      checked: this.state.view.cause.cascaded || false,
      label: "Cascaded",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "cause.warning",
      checked: this.state.view.cause.warning || false,
      label: "Warning",
      onChange: this.handleViewChange
    })), _react.default.createElement(_FilterItemGroup.default, {
      name: "Priority",
      value: this.state.view.priority
    }, _react.default.createElement(_CheckBox.default, {
      name: "priority.p1",
      checked: this.state.view.priority.p1 || false,
      label: "P1",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "priority.p2",
      checked: this.state.view.priority.p2 || false,
      label: "P2",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "priority.p3",
      checked: this.state.view.priority.p3 || false,
      label: "P3",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "priority.p4",
      checked: this.state.view.priority.p4 || false,
      label: "P4",
      onChange: this.handleViewChange
    })), _react.default.createElement(_FilterItemGroup.default, {
      name: "Processes",
      value: this.state.view.process
    }, _react.default.createElement(_CheckBox.default, {
      name: "process.na",
      checked: this.state.view.process.na || false,
      label: "Not identified",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "process.reduce_image",
      checked: this.state.view.process.reduce_image || false,
      label: "Reduce image",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "process.unauthorised_access_alarm",
      checked: this.state.view.process.unauthorised_access_alarm || false,
      label: "Unauthorised Access Alarm",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "process.customer_service_chat",
      checked: this.state.view.process.customer_service_chat || false,
      label: "Customer Service Chat",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "process.affectli_to_do",
      checked: this.state.view.process.affectli_to_do || false,
      label: "Affectli To Do",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "process.security_incident",
      checked: this.state.view.process.security_incident || false,
      label: "Unauthorised Access Alarm",
      onChange: this.handleViewChange
    })), _react.default.createElement(_FilterItemGroup.default, {
      name: "Entities",
      value: this.state.view.entities
    }, _react.default.createElement(_CheckBox.default, {
      name: "entities.general",
      checked: this.state.view.entities.general || false,
      label: "General",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "entities.things",
      checked: this.state.view.entities.things || false,
      label: "Things",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "entities.people",
      checked: this.state.view.entities.people || false,
      label: "People",
      onChange: this.handleViewChange
    }), _react.default.createElement(_CheckBox.default, {
      name: "entities.organisations",
      checked: this.state.view.entities.organisations || false,
      label: "Organisations",
      onChange: this.handleViewChange
    })));
  }

}

_defineProperty(SituationalAwarenessFilters, "propTypes", {
  onChange: _propTypes.default.func
});

var _default = SituationalAwarenessFilters;
exports.default = _default;