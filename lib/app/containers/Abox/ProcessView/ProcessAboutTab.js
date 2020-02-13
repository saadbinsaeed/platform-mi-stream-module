"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _Dropdown = _interopRequireDefault(require("app/components/atoms/Dropdown/Dropdown"));

var _PeopleLink = _interopRequireDefault(require("app/components/atoms/Link/PeopleLink"));

var _ProcessLink = _interopRequireDefault(require("app/components/atoms/Link/ProcessLink"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _ItemInfo = _interopRequireDefault(require("app/components/molecules/ItemInfo/ItemInfo"));

var _Avatar = _interopRequireDefault(require("app/components/molecules/Avatar/Avatar"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _ProgressRenderer = _interopRequireDefault(require("app/components/molecules/Grid/Renderers/Progress/ProgressRenderer"));

var _ProcessDiagramCard = _interopRequireDefault(require("app/components/ABox/Cards/ProcessDiagramCard"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _processActions = require("store/actions/abox/processActions");

var _date = require("app/utils/date/date");

var _utils = require("app/utils/utils");

var _lo = require("app/utils/lo/lo");

var _aboxConfig = require("app/config/aboxConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Label = _styledComponents.default.strong.withConfig({
  displayName: "ProcessAboutTab__Label",
  componentId: "sc-3cxku9-0"
})([""]);

const RowStyled = _styledComponents.default.div.withConfig({
  displayName: "ProcessAboutTab__RowStyled",
  componentId: "sc-3cxku9-1"
})(["padding:1rem 0;"]);

const P = (0, _styledComponents.default)(_Text.default).withConfig({
  displayName: "ProcessAboutTab__P",
  componentId: "sc-3cxku9-2"
})(["margin:1rem 0;display:block;"]);

const AboutCard = props => {
  const {
    processDefinition,
    priority,
    businessKey,
    endDate
  } = props.data;
  const application = (0, _lo.get)(processDefinition, 'application');
  const {
    name,
    image,
    id,
    login
  } = (0, _lo.get)(application, 'createdBy') || {};
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("b", null, "Description"), _react.default.createElement(P, null, processDefinition && processDefinition.description || 'None'), _react.default.createElement("b", null, "Company"), _react.default.createElement(P, null, businessKey || 'None'), _react.default.createElement("b", null, "Application Owner"), _react.default.createElement(RowStyled, null, application && id && _react.default.createElement(_ItemInfo.default, {
    icon: _react.default.createElement(_Avatar.default, {
      src: image,
      name: name,
      size: "lg"
    }),
    title: _react.default.createElement(_PeopleLink.default, {
      id: id
    }, name),
    subtitle: login
  }) || 'None'), _react.default.createElement("b", null, "Application Name"), _react.default.createElement(P, null, processDefinition && processDefinition.application && processDefinition.application.name || 'None'), _react.default.createElement("b", null, "Definition Name"), _react.default.createElement(P, null, processDefinition && processDefinition.name || 'None'), _react.default.createElement("b", null, "Priority"), _react.default.createElement("div", {
    title: endDate && 'Process is closed so you can not change the priority'
  }, _react.default.createElement(_Dropdown.default, {
    name: "Priority",
    placeholder: "Select Priority",
    onChange: props.changePriority,
    value: priority,
    disabled: endDate ? true : false,
    options: _aboxConfig.PRIORITY_OPTIONS
  })));
};
/**
 *
 * @example <AboxProcessAboutTab />
 */


class ProcessAboutTab extends _react.PureComponent {
  /**
   * constructor - description
   *
   * @param  {type} props: Object description
   * @return {type}               description
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "properties", void 0);

    _defineProperty(this, "changePriority", event => {
      const {
        details: {
          id
        },
        setProcessPriority
      } = this.props;
      const priority = (0, _utils.getNum)(event, 'value');

      if (priority) {
        setProcessPriority(id, priority);
      }

      ;
    });

    _defineProperty(this, "buildAboutCardData", (0, _memoizeOne.default)((variables, processDefinition, businessKey, endDate) => ({
      priority: (0, _utils.getNum)(variables, 'priority', 3),
      processDefinition,
      businessKey,
      endDate
    })));

    _defineProperty(this, "generatePropertiesCard", (0, _memoizeOne.default)(({
      parent,
      properties
    }) => _react.default.createElement(_react.Fragment, null, parent && _react.default.createElement(_InputWrapper.default, null, _react.default.createElement(Label, null, "Parent Process"), _react.default.createElement(_ItemInfo.default, {
      icon: _react.default.createElement(_ProgressRenderer.default, {
        value: (0, _lo.get)(parent, 'variables.progress'),
        data: {
          endDate: (0, _lo.get)(parent, 'endDate'),
          variables: {
            priority: (0, _lo.get)(parent, 'variables.priority')
          }
        }
      }),
      title: _react.default.createElement(_ProcessLink.default, {
        id: parent.id
      }, parent.name || 'No Name'),
      subtitle: _react.default.createElement("em", null, "#", parent.id)
    })), _react.default.createElement(_react.Fragment, null, this.generatePropertiesItems(properties)))));

    const {
      createdBy,
      status,
      createDate,
      endDate: _endDate
    } = props.details || {};
    const {
      image,
      name,
      id: _id,
      login
    } = createdBy || {};
    const lastUpdate = (0, _lo.get)(status, 'lastUpdate');
    this.properties = [{
      label: 'Created By',
      component: createdBy && _react.default.createElement(_ItemInfo.default, {
        icon: _react.default.createElement(_Avatar.default, {
          src: image,
          name: name,
          size: "lg"
        }),
        title: _react.default.createElement(_PeopleLink.default, {
          id: _id
        }, name),
        subtitle: login
      })
    }, {
      label: 'Created Date',
      value: createDate && (0, _date.formatDate)(createDate) || 'none'
    }, {
      label: 'Last Modified Date',
      value: lastUpdate && (0, _date.formatDate)(lastUpdate) || 'none'
    }, {
      label: 'Status',
      value: !_endDate ? 'Open' : 'Closed'
    }];
  }
  /**
   * changePriority - description
   *
   * @param  {type} event: Object description
   * @return {type}               description
   */


  generatePropertiesItems(properties) {
    return (properties || []).map(({
      label,
      value,
      component
    }) => _react.default.createElement("div", {
      key: label
    }, _react.default.createElement("b", null, label), _react.default.createElement(RowStyled, null, component || value)));
  }

  /**
   * @override
   */
  render() {
    const {
      isLoading,
      details
    } = this.props;

    if (isLoading && (0, _utils.isEmpty)(details)) {
      return _react.default.createElement(_Loader.default, {
        absolute: true
      });
    }

    const {
      processDefinition,
      businessKey,
      endDate,
      variables,
      parent
    } = details;
    const aboutCardData = this.buildAboutCardData(variables, processDefinition, businessKey, endDate);
    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Container.default, null, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6
    }, _react.default.createElement(_Card.default, {
      title: "About",
      collapsible: true,
      description: _react.default.createElement(AboutCard, {
        data: aboutCardData,
        changePriority: this.changePriority
      })
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6
    }, _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Properties",
      description: _react.default.createElement(_react.Fragment, null, this.generatePropertiesCard({
        parent,
        properties: this.properties
      }))
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12
    }, _react.default.createElement(_Card.default, {
      collapsible: true,
      title: "Process Diagram",
      description: _react.default.createElement(_ProcessDiagramCard.default, {
        processDefinition: processDefinition
      })
    })))));
  }

}

_defineProperty(ProcessAboutTab, "propTypes", {
  details: _propTypes.default.object,
  isLoading: _propTypes.default.bool
});

_defineProperty(ProcessAboutTab, "defaultProps", {
  details: {},
  isLoading: false
});

var _default = (0, _reactRedux.connect)(state => ({
  isLoading: state.abox.process.details.isLoading,
  details: state.abox.process.details.data
}), {
  setProcessPriority: _processActions.setProcessPriority
})(ProcessAboutTab);

exports.default = _default;