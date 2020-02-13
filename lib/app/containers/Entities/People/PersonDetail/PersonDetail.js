"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _ClassificationsTab = _interopRequireDefault(require("app/containers/Common/ClassificationsTab/ClassificationsTab"));

var _EntityAttachmentsView = _interopRequireDefault(require("app/containers/Entities/Attachments/EntityAttachmentsView"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _PageNotAllowed = _interopRequireDefault(require("app/containers/ErrorPages/PageNotAllowed"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _TabItem = _interopRequireDefault(require("app/components/molecules/Tabs/TabItem"));

var _TabRow = _interopRequireDefault(require("app/components/molecules/Tabs/TabRow"));

var _EntityTimeline = _interopRequireDefault(require("app/containers/Entities/Timeline/EntityTimeline"));

var _date = require("app/utils/date/date");

var _lo = require("app/utils/lo/lo");

var _peopleActions = require("store/actions/entities/peopleActions");

var _dataTableIds = require("app/config/dataTableIds");

var _entitiesActions = require("store/actions/entities/entitiesActions");

var _PeopleSummary = _interopRequireDefault(require("./PeopleSummary/PeopleSummary"));

var _PersonAbout = _interopRequireDefault(require("./PersonAbout/PersonAbout"));

var _RelationshipsTab = _interopRequireDefault(require("app/containers/Entities/Relationships/RelationshipsTab"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Person container
 */
class PeopleDetail extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "actionTypes", [_peopleActions.UPDATE_PERSON, _entitiesActions.UPLOAD_IMAGE]);

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

    props.loadPerson(props.id);
  }

  /**
   * @override
   * @param prevProps the properties that the component will receive.
   */
  componentDidUpdate(prevProps) {
    const {
      lastActionError,
      lastActionType,
      id
    } = this.props;

    if (prevProps.id !== id && id !== 'add' || !lastActionError && this.actionTypes.includes(lastActionType)) {
      this.props.loadPerson(id);
    }
  }

  /**
   * @override
   */
  render() {
    const {
      id,
      isLoading,
      person,
      recentAttachments,
      loadPerson
    } = this.props;

    if (!isLoading && !person) {
      return _react.default.createElement(_PageNotAllowed.default, {
        title: `People (ID:${id})`
      });
    }

    const {
      active,
      createdBy,
      createdDate,
      modifiedDate
    } = person || {};
    const createdByCompile = `${createdBy ? `${String((0, _lo.get)(createdBy, 'name'))} on ` : ''} ${(0, _date.formatDate)(createdDate)}`;
    const modified = `${String((0, _lo.get)(person, 'modifiedBy.name') || '')} on ${(0, _date.formatDate)(modifiedDate)}`;
    const status = active ? 'Active' : 'Inactive';
    const infoArray = this.buildInfo(createdByCompile, modified, status);
    return _react.default.createElement(_react.Fragment, null, isLoading && _react.default.createElement(_Loader.default, {
      absolute: true,
      backdrop: true
    }), person && _react.default.createElement(_PageTemplate.default, {
      title: (0, _lo.get)(person, 'name'),
      subTitle: ` #${id} `,
      info: infoArray,
      overflowHidden: true
    }, _react.default.createElement(_TabRow.default, null, _react.default.createElement(_TabItem.default, {
      label: "Summary",
      to: `/people/${id}/summary`
    }), _react.default.createElement(_TabItem.default, {
      label: "About",
      to: `/people/${id}/about`
    }), _react.default.createElement(_TabItem.default, {
      label: "Classifications",
      to: `/people/${id}/classifications`
    }), _react.default.createElement(_TabItem.default, {
      label: "Relationships",
      to: `/people/${id}/relationships`
    }), _react.default.createElement(_TabItem.default, {
      label: "Attachments",
      to: `/people/${id}/attachments`
    }), _react.default.createElement(_TabItem.default, {
      label: "History",
      to: `/people/${id}/history`
    })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
      path: `/people/:id`,
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/people/${id}/summary`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/people/:id/summary'
    }, _react.default.createElement(_PeopleSummary.default, {
      person: person,
      recentAttachments: recentAttachments,
      loadPerson: loadPerson
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/people/:id/about'
    }, _react.default.createElement(_PersonAbout.default, {
      person: person,
      location: this.props.location
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/people/:id/classifications'
    }, _react.default.createElement(_ClassificationsTab.default, {
      type: "person"
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/people/:id/relationships',
      exact: true,
      component: () => _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/people/${id}/relationships/thing`
      })
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/people/:entityId/relationships/:type2',
      render: ({
        match: {
          params
        }
      }) => _react.default.createElement(_RelationshipsTab.default, _extends({}, params, {
        dataTableId: _dataTableIds.PERSON_RELATIONSHIPS_DATA_TABLE,
        baseUri: `/people/${id}/relationships`,
        type1: 'person'
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: '/people/:id/attachments'
    }, _react.default.createElement(_EntityAttachmentsView.default, {
      entityId: this.props.id,
      entityType: "person",
      dataGridId: _dataTableIds.PERSON_ATTACHMENTS_DATA_TABLE
    })), _react.default.createElement(_reactRouterDom.Route, {
      path: '/people/:id/history'
    }, _react.default.createElement(_EntityTimeline.default, {
      entityType: "person",
      entityId: this.props.id
    })))));
  }

}

_defineProperty(PeopleDetail, "propTypes", {
  id: _propTypes.default.string.isRequired,
  loadPerson: _propTypes.default.func.isRequired,
  person: _propTypes.default.object,
  isLoading: _propTypes.default.bool,
  lastActionError: _propTypes.default.bool,
  lastActionType: _propTypes.default.string,
  recentAttachments: _propTypes.default.arrayOf(_propTypes.default.object)
});

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  userProfile: state.user.profile,
  isLoading: state.entities.people.details.isLoading,
  person: (0, _lo.get)(state.entities.people.details.data, 'person'),
  lastActionType: state.global.lastActionType,
  lastActionError: state.global.lastActionError,
  recentAttachments: (0, _lo.get)(state.entities.people.details.data, 'recentAttachments')
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadPerson: _peopleActions.loadPerson
})((0, _reactRouterDom.withRouter)(PeopleDetail));

exports.default = _default;