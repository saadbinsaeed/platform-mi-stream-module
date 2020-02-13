"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Layout = _interopRequireDefault(require("app/components/molecules/Layout/Layout"));

var _common = require("app/utils/propTypes/common");

var _OrganisationChildrenGrid = _interopRequireDefault(require("app/components/Entities/Organisations/OrganisationChildrenGrid/OrganisationChildrenGrid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class
 * Container that is used to display the Children of a thing
 */
class OrganisationChildrenTab extends _react.Component {
  /**
   * @override
   */
  render() {
    const id = this.props.match.params.id;

    const grid = _react.default.createElement(_OrganisationChildrenGrid.default, {
      id: id
    });

    return _react.default.createElement(_Layout.default, {
      content: grid,
      noPadding: true
    });
  }

}

_defineProperty(OrganisationChildrenTab, "propTypes", {
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string.isRequired
  })
});

;
var _default = OrganisationChildrenTab;
exports.default = _default;