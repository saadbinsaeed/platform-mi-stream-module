"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrganisationsList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _OrganisationsGrid = _interopRequireDefault(require("app/components/Entities/Organisations/OrganisationsGrid/OrganisationsGrid"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Renders the view to display the organisations.
 */
class OrganisationsListComponent extends _react.PureComponent {
  /**
   * @override
   */
  render() {
    return _react.default.createElement(_PageTemplate.default, {
      title: "Organisations"
    }, _react.default.createElement(_OrganisationsGrid.default, null));
  }

}

const OrganisationsList = (0, _reactRouter.withRouter)(OrganisationsListComponent);
exports.OrganisationsList = OrganisationsList;