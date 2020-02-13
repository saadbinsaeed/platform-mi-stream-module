"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("app/utils/propTypes/common");

var _taskActions = require("store/actions/abox/taskActions");

var _lo = require("app/utils/lo/lo");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const StyledFlex = (0, _styledComponents.default)(_Flex.default).withConfig({
  displayName: "ActivityActions__StyledFlex",
  componentId: "yq4zxg-0"
})(["flex-direction:column;justify-content:center;text-align:center;height:100%;color:#777777;"]);
const StyledIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "ActivityActions__StyledIcon",
  componentId: "yq4zxg-1"
})(["&.Icon:before{font-size:6rem !important;color:#777777;}"]);
const StyledText = (0, _styledComponents.default)(_Text.default).withConfig({
  displayName: "ActivityActions__StyledText",
  componentId: "yq4zxg-2"
})(["font-size:1.2rem;"]);
/**
 *
 */

class ActivityActions extends _react.PureComponent {
  /**
   * constructor - description
   *
   * @return {type}  description
   */
  constructor(props) {
    super(props);
    const id = String((0, _lo.get)(props, 'match.params.id'));
    const type = String((0, _lo.get)(props, 'match.params.type'));
    this.state = {
      isLoading: true
    };

    if (id && type && props.sendTaskMessage) {
      props.sendTaskMessage(`activiti-app/app/rest/message/${type}/task/${id}`).then(response => {
        this.setState({
          isLoading: !this.state.isLoading
        });
      });
    }
  }
  /**
   * render - description
   *
   * @return {type}  description
   */


  render() {
    const {
      errorOptions = {}
    } = this.props;
    const id = String((0, _lo.get)(this.props, 'match.params.id'));
    if (this.state.isLoading) return _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    });
    return _react.default.createElement(_PageTemplate.default, {
      title: "Task",
      subTitle: id,
      overflowHidden: true
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(StyledFlex, {
      grow: true
    }, _react.default.createElement(StyledIcon, {
      name: errorOptions.isError ? 'alert-circle-outline' : 'check'
    }), _react.default.createElement(StyledText, null, errorOptions.isError ? 'Error, couldn\'t perform' : 'Successfully performed', " action on task", ' ', _react.default.createElement(_reactRouterDom.Link, {
      to: `/abox/task/${id}`
    }, id)), errorOptions.detail ? _react.default.createElement(StyledText, null, errorOptions.detail) : null)));
  }

}

_defineProperty(ActivityActions, "propTypes", {
  match: (0, _common.RouterMatchPropTypeBuilder)({
    id: _propTypes.default.string,
    type: _propTypes.default.string
  }),
  sendTaskMessage: _propTypes.default.func.isRequired
});

var _default = (0, _reactRedux.connect)(state => ({
  errorOptions: state.app.errorOptions
}), {
  sendTaskMessage: _taskActions.sendTaskMessage
})(ActivityActions);

exports.default = _default;