"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const CarotRight = _styledComponents.default.span.withConfig({
  displayName: "CaretRenderer__CarotRight",
  componentId: "sc-1whpyab-0"
})(["position:relative;margin-left:", ";cursor:pointer;padding-left:20px;&:before{content:'';position:absolute;top:25%;left:0px;border-top:6px solid transparent;border-left:6px solid #999;border-bottom:6px solid transparent;}&:hover{border-top-color:#222;}"], ({
  indentation
}) => `${indentation}rem`);

const CarotDown = _styledComponents.default.span.withConfig({
  displayName: "CaretRenderer__CarotDown",
  componentId: "sc-1whpyab-1"
})(["position:relative;margin-left:", ";cursor:pointer;padding-left:20px;&:before{content:'';position:absolute;top:25%;left:0px;border-top:6px solid #999;border-left:6px solid transparent;border-right:6px solid transparent;}&:hover{border-top-color:#222;}"], ({
  indentation
}) => `${indentation}rem`);

const CaretRenderer = props => {
  const {
    data,
    children
  } = props;
  const indentationLevel = data.level * 0.5;

  if (data.children && data.children.length > 0) {
    const Carot = data.isOpen ? CarotDown : CarotRight;
    return _react.default.createElement(Carot, {
      indentation: indentationLevel,
      className: "carot"
    }, children);
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("span", {
    style: {
      paddingLeft: `${indentationLevel + 1.2}rem`,
      display: 'inline-block'
    }
  }), _react.default.createElement("span", null, children));
};

CaretRenderer.propTypes = {
  data: _propTypes.default.object,
  parent: _propTypes.default.object,
  children: _propTypes.default.array
};
var _default = CaretRenderer;
exports.default = _default;