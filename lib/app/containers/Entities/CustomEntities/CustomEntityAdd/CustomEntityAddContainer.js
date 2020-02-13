"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _CustomEntityAdd = _interopRequireDefault(require("app/components/Entities/CustomEntities/CustomEntityAdd"));

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _customEntitiesActions = require("store/actions/entities/customEntitiesActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the view to add a Custom Entity.
 */
class CustomEntityAddContainer extends _react.Component {
  /**
   * @override
   */
  render() {
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canAdd = isAdmin || permissionsSet.has('entity.custom.add');

    if (!canAdd) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Custom Entity"
      });
    }

    return _react.default.createElement(_Modal.default, {
      title: "Add a custom entity",
      open: true
    }, _react.default.createElement(_CustomEntityAdd.default, {
      saveCustomEntity: this.props.saveCustomEntity
    }));
  }

}

_defineProperty(CustomEntityAddContainer, "propTypes", {
  saveCustomEntity: _propTypes.default.func.isRequired,
  userProfile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile
}), {
  saveCustomEntity: _customEntitiesActions.saveCustomEntity
})(CustomEntityAddContainer);

exports.default = _default;