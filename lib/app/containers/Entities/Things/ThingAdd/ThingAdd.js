"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _ThingAdd = _interopRequireDefault(require("app/components/Entities/Things/ThingAdd/ThingAdd"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _thingsActions = require("store/actions/entities/thingsActions");

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the view to add a Thing.
 */
class ThingAddContainer extends _react.Component {
  /**
   * @override
   */
  render() {
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canAdd = isAdmin || permissionsSet.has('entity.thing.add');

    if (!canAdd) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Things"
      });
    }

    return _react.default.createElement(_Modal.default, {
      title: "Add Thing",
      open: true
    }, _react.default.createElement(_ThingAdd.default, {
      addThingFn: this.props.saveThing
    }));
  }

}

_defineProperty(ThingAddContainer, "propTypes", {
  saveThing: _propTypes.default.func.isRequired,
  userProfile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile
}), {
  saveThing: _thingsActions.saveThing
})(ThingAddContainer);

exports.default = _default;