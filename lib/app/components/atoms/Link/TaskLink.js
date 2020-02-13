"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Link = _interopRequireDefault(require("app/components/atoms/Link/Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TaskLink = props => {
  const {
    id,
    children,
    noDecoration,
    path,
    ...restProps
  } = props;
  const extraPath = path ? `/${path}` : '';
  return _react.default.createElement(_Link.default, _extends({
    to: `/abox/task/${id}${extraPath}`,
    noDecoration: noDecoration
  }, restProps), children);
};

TaskLink.propTypes = {
  id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
  noDecoration: _propTypes.default.bool,
  path: _propTypes.default.string
};

var _default = (0, _react.memo)(TaskLink);

exports.default = _default;