"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _TabRow = _interopRequireDefault(require("app/components/molecules/Tabs/TabRow"));

var _TabItem = _interopRequireDefault(require("app/components/molecules/Tabs/TabItem"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _date = require("app/utils/date/date");

var _lo = require("app/utils/lo/lo");

var _classificationsActions = require("store/actions/classifications/classificationsActions");

var _History = _interopRequireDefault(require("store/History"));

var _appActions = require("store/actions/app/appActions");

var _ClassificationDetailAbout = _interopRequireDefault(require("app/components/Classifications/ClassificationDetailAbout/ClassificationDetailAbout"));

var _ClassificationDetailAttributes = require("app/components/Classifications/ClassificationDetailAttributes/ClassificationDetailAttributes");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _ClassificationEntitiesTab = _interopRequireDefault(require("./Tabs/ClassificationEntitiesTab"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Classification container
 */
class ClassificationDetail extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "addAttribute", () => {
      _History.default.push(`/classifications/${this.props.id}/attributes/new`);
    });

    _defineProperty(this, "buildInfo", (0, _fastMemoize.default)((createdBy, modified, status) => [{
      key: 'Created by',
      value: createdBy
    }, {
      key: 'Last Modified',
      value: modified
    }, {
      key: 'Status',
      value: status
    }]));
  }

  /**
   * @override
   */
  componentDidMount() {
    this.props.loadClassification(this.props.id);
  }
  /**
   * @override
   * @param prevProps the properties that the component will receive.
   */


  componentDidUpdate(prevProps) {
    const {
      id
    } = this.props;

    if (id !== prevProps.id && id !== 'add') {
      this.props.loadClassification(id);
    }
  }
  /** Add an attribute */


  /**
   * @override
   */
  render() {
    const {
      classification,
      match,
      userProfile,
      isLoading,
      id,
      showToastr,
      updateClassification
    } = this.props;
    const {
      createdBy,
      createdDate,
      modifiedDate,
      active
    } = classification || {};

    if (!isLoading && !classification.id) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: `Classification. (ID:${id})`
      });
    }

    const createdInfo = `${createdBy ? `${String((0, _lo.get)(createdBy, 'name') || '')} on ` : ''} ${(0, _date.formatDate)(createdDate)}`;
    const modified = (0, _date.formatDate)(modifiedDate);
    const status = active ? 'Active' : 'Inactive';
    return _react.default.createElement(_react.Fragment, null, isLoading && _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    }), _react.default.createElement(_PageTemplate.default, {
      title: (0, _lo.get)(classification, 'name'),
      subTitle: `#${String((0, _lo.get)(classification, 'uri') || '')}`,
      info: this.buildInfo(createdInfo, modified, status),
      right: _react.default.createElement(_ButtonIcon.default, {
        icon: "plus",
        onClick: this.addAttribute
      })
    }, _react.default.createElement(_TabRow.default, null, _react.default.createElement(_TabItem.default, {
      label: "About",
      to: `/classifications/${id}/about`
    }), _react.default.createElement(_TabItem.default, {
      label: "Attributes",
      to: `/classifications/${id}/attributes`
    }), _react.default.createElement(_TabItem.default, {
      label: "Entities",
      to: `/classifications/${id}/entities`
    })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: match.url,
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `${match.url}/about`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/about`,
      render: () => _react.default.createElement(_ClassificationDetailAbout.default, {
        classification: classification,
        showToastr: showToastr,
        updateClassification: updateClassification,
        userProfile: userProfile
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/attributes`,
      render: () => _react.default.createElement(_ClassificationDetailAttributes.ClassificationDetailAttributes, {
        classification: classification,
        updateClassification: this.props.updateClassification,
        addAttribute: this.addAttribute,
        userProfile: userProfile,
        match: match
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: `${match.url}/entities`,
      component: _ClassificationEntitiesTab.default
    }))));
  }

}

_defineProperty(ClassificationDetail, "propTypes", {
  id: _propTypes.default.string.isRequired,
  isLoading: _propTypes.default.bool,
  classification: _propTypes.default.object,
  loadClassification: _propTypes.default.func,
  updateClassification: _propTypes.default.func,
  showToastr: _propTypes.default.func,
  userProfile: _propTypes.default.object
});

_defineProperty(ClassificationDetail, "defaultProps", {});

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.classifications.details.isLoading || state.classifications.update.isLoading,
    classification: state.classifications.details.data || {},
    userProfile: state.user.profile,
    id: ownProps.match.params.id
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadClassification: _classificationsActions.loadClassification,
  updateClassification: _classificationsActions.updateClassification,
  showToastr: _appActions.showToastr
})((0, _reactRouter.withRouter)(ClassificationDetail));

exports.default = _default;