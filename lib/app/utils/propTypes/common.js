"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterMatchPropTypeBuilder = exports.allTypesProps = exports.allTypes = exports.bpmnTypes = exports.entitiesTypes = exports.UserStatusProps = exports.HeaderTagProps = exports.IconTypeProps = exports.PlacementProps = exports.SizeProps = exports.IdProp = exports.ChildrenProp = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ChildrenProp = _propTypes.default.any;
exports.ChildrenProp = ChildrenProp;
const IdProp = _propTypes.default.any;
exports.IdProp = IdProp;

const SizeProps = _propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']);

exports.SizeProps = SizeProps;

const PlacementProps = _propTypes.default.oneOf(['auto auto', 'top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right']);

exports.PlacementProps = PlacementProps;

const IconTypeProps = _propTypes.default.oneOf(['mdi', 'af']);

exports.IconTypeProps = IconTypeProps;

const HeaderTagProps = _propTypes.default.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']);

exports.HeaderTagProps = HeaderTagProps;

const UserStatusProps = _propTypes.default.oneOf(['online', 'offline', 'disabled', 'busy']);

exports.UserStatusProps = UserStatusProps;
const entitiesTypes = {
  thing: 'Things',
  person: 'People',
  organisation: 'Organisations',
  custom: 'Custom Entities'
};
exports.entitiesTypes = entitiesTypes;
const bpmnTypes = {
  process: 'Processes',
  task: 'Tasks'
};
exports.bpmnTypes = bpmnTypes;
const allTypes = { ...entitiesTypes,
  ...bpmnTypes
};
exports.allTypes = allTypes;

const allTypesProps = _propTypes.default.oneOf(Object.keys(allTypes));
/**
 * Build the match property injected by the redux-router using the function withRouter.
 *
 * @param paramsTypes an object that describe the type of the parameters that are parsed in the url.
 *
 * @example
 *
 * static propTypes = {
 *     match: RouterMatchPropTypeBuilder({ id: PropTypes.string.isRequired }),
 * };
 */


exports.allTypesProps = allTypesProps;

const RouterMatchPropTypeBuilder = paramsTypes => _propTypes.default.shape({
  path: _propTypes.default.string.isRequired,
  url: _propTypes.default.string.isRequired,
  isExact: _propTypes.default.bool.isRequired,
  params: paramsTypes ? _propTypes.default.shape(paramsTypes).isRequired : _propTypes.default.object
}).isRequired;

exports.RouterMatchPropTypeBuilder = RouterMatchPropTypeBuilder;