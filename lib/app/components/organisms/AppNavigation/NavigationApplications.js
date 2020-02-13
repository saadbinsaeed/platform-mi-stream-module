"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _appActions = require("store/actions/app/appActions");

var _common = require("app/utils/propTypes/common");

var _MyProfileAvatar = _interopRequireDefault(require("app/components/molecules/MyProfileAvatar/MyProfileAvatar"));

var _ScrollMinStyle = _interopRequireDefault(require("app/utils/styles/ScrollMinStyle"));

var _NavApplicationIcon = _interopRequireDefault(require("./NavApplicationIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { loadOrganisationImage } from 'store/actions/organisations';
const ApplicationNav = _styledComponents.default.div.withConfig({
  displayName: "NavigationApplications__ApplicationNav",
  componentId: "sc-1jbt0w5-0"
})(["", ";display:flex;flex-direction:column;justify-content:space-between;align-items:center;background:", ";width:3.5rem;overflow-x:hidden;overflow-y:auto;"], _ScrollMinStyle.default, ({
  theme
}) => theme.navigation.apps.background);

const ApplicationSection = _styledComponents.default.div.withConfig({
  displayName: "NavigationApplications__ApplicationSection",
  componentId: "sc-1jbt0w5-1"
})(["text-align:center;padding:.5rem 0 .5rem 0;&:first-of-type{padding-top:0;}&:last-of-type{padding-bottom:.8rem;}"]);
/**
 * Application list for navigation
 */


class NavigationApplications extends _react.PureComponent {
  /**
   * Load organisation image
   */
  componentDidMount() {
    this.props.loadAppOrganisation();
  }
  /**
   * Created the left navigation application list
   */


  render() {
    const {
      children,
      isLeftOpen,
      organisationImage,
      organisationName
    } = this.props;
    return _react.default.createElement(ApplicationNav, {
      isLeftOpen: isLeftOpen
    }, _react.default.createElement(ApplicationSection, null, children), _react.default.createElement(ApplicationSection, null, _react.default.createElement(_NavApplicationIcon.default, {
      key: "environment",
      image: organisationImage || '',
      name: "process-call-conversation",
      type: "af",
      title: organisationName || ''
    }), _react.default.createElement(_MyProfileAvatar.default, null)));
  }

}

_defineProperty(NavigationApplications, "propTypes", {
  loadAppOrganisation: _propTypes.default.func.isRequired,
  organisationImage: _propTypes.default.string,
  children: _common.ChildrenProp,
  isLeftOpen: _propTypes.default.bool,
  organisationName: _propTypes.default.string
});

const mapStateToProps = state => ({
  organisationImage: state.app.organisation.image,
  organisationName: state.app.organisation.name
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadAppOrganisation: _appActions.loadAppOrganisation
})(NavigationApplications);

exports.default = _default;