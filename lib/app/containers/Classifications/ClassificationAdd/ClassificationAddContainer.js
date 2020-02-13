"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _ClassificationAdd = _interopRequireDefault(require("app/components/Classifications/ClassificationAdd/ClassificationAdd"));

var _classificationsActions = require("store/actions/classifications/classificationsActions");

var _Modal = _interopRequireDefault(require("app/components/molecules/Modal/Modal"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders the view to add a Thing.
 */
class ClassificationAddContainer extends _react.PureComponent {
  /**
   * @override
   */
  render() {
    const {
      permissions,
      isAdmin
    } = this.props.userProfile;
    const permissionsSet = new Set(permissions || []);
    const canAdd = isAdmin || permissionsSet.has('entity.classification.add');

    if (!canAdd) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: "Classification"
      });
    }

    return _react.default.createElement(_Modal.default, {
      title: "Add Classification",
      open: true
    }, _react.default.createElement(_ClassificationAdd.default, {
      addClassificationFn: this.props.createClassification
    }));
  }

}

_defineProperty(ClassificationAddContainer, "propTypes", {
  createClassification: _propTypes.default.func.isRequired,
  userProfile: _propTypes.default.object
});

var _default = (0, _reactRedux.connect)(state => ({
  userProfile: state.user.profile
}), {
  createClassification: _classificationsActions.createClassification
})(ClassificationAddContainer);

exports.default = _default;