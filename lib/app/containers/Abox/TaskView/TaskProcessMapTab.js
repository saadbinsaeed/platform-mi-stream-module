"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _lo = require("app/utils/lo/lo");

var _utils = require("app/utils/utils");

var _mdi = require("app/utils/styles/mdi");

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _ListItem = _interopRequireDefault(require("app/components/molecules/List/ListItem"));

var _ProgressRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Progress/ProgressRenderer"));

var _Tooltip = _interopRequireDefault(require("app/components/atoms/Tooltip/Tooltip"));

var _ProcessDiagramCard = _interopRequireDefault(require("app/components/ABox/Cards/ProcessDiagramCard"));

var _ProcessLink = _interopRequireDefault(require("app/components/atoms/Link/ProcessLink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Title = _styledComponents.default.strong.withConfig({
  displayName: "TaskProcessMapTab__Title",
  componentId: "sc-1eidgwf-0"
})(["margin-left:0.5rem;"]);

const PropertiesCard = ({
  process
}) => {
  const {
    id,
    name,
    processDefinition,
    variables
  } = process || {};
  const icon = (0, _utils.getStr)(processDefinition, 'deployedModel.modelData.icon', ''); // $FlowFixMe

  const progress = Math.floor((0, _lo.get)(variables, 'progress', 0));
  return _react.default.createElement(_Tooltip.default, {
    x: -80,
    y: 0
  }, _react.default.createElement(Title, null, "Parent Process"), _react.default.createElement(_ListItem.default, {
    component: _react.default.createElement(_ProgressRenderer.default, {
      alt: `${progress}%`,
      value: progress,
      data: process,
      foreignObjectContent: _react.default.createElement(_Icon.default, {
        hexColor: (0, _lo.get)(processDefinition, 'deployedModel.modelData.iconColor'),
        name: icon && _mdi.iconsSet.has(icon) ? icon : 'asterisk',
        size: "md"
      })
    }),
    subTitle: `#${id}` || 'No ID',
    title: _react.default.createElement(_ProcessLink.default, {
      id: id
    }, name || 'No Name')
  }));
};
/**
 *
 */


class TaskProcessMapTab extends _react.PureComponent {
  /**
   * @override
   */
  render() {
    const {
      isLoading,
      details
    } = this.props;

    if (isLoading || (0, _utils.isEmpty)(details)) {
      return _react.default.createElement(_Loader.default, {
        absolute: true
      });
    }

    const {
      process
    } = details;
    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Container.default, {
      width: "1024"
    }, process && _react.default.createElement(PropertiesCard, {
      process: process
    }), _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Process Diagram",
      descriptionPadding: false,
      description: _react.default.createElement(_ProcessDiagramCard.default, {
        processDefinition: (0, _lo.get)(process, 'processDefinition')
      })
    })));
  }

}

_defineProperty(TaskProcessMapTab, "propTypes", {
  details: _propTypes.default.object,
  isLoading: _propTypes.default.bool
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.task.isLoading,
  details: state.abox.task.details.data
}), null)(TaskProcessMapTab);

exports.default = _default;