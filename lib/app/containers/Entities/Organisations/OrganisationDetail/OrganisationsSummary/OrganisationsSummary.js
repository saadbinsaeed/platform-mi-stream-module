"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _ContactDetails = _interopRequireDefault(require("app/components/molecules/ContactDetails/ContactDetails"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Location = _interopRequireDefault(require("app/components/molecules/Map/Location/Location"));

var _RecentAttachments = _interopRequireDefault(require("app/components/RecentAttachments/RecentAttachments"));

var _Summary = _interopRequireDefault(require("app/components/molecules/Summary/Summary"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _lo = require("app/utils/lo/lo");

var _classificationUtils = require("app/utils/classification/classificationUtils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Render the Organisations summary tab.
 */
class OrganisationsSummary extends _react.PureComponent {
  constructor(props) {
    super(props);
    props.loadOrganisation(props.organisation.id);
  }

  /**
   * @override
   */
  render() {
    const {
      organisation,
      recentAttachments
    } = this.props;
    const iconInfo = {
      name: organisation.iconName,
      color: organisation.iconColor
    };
    const id = organisation.id;
    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Summary.default, {
      values: organisation._summary,
      metadata: (0, _lo.keyBy)((0, _classificationUtils.getSummaryElements)(organisation._structure), 'f_uri')
    }), _react.default.createElement(_Container.default, null, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 3
    }, _react.default.createElement(_Card.default, {
      title: "Company Profile",
      description: _react.default.createElement(_Text.default, {
        overflowHidden: true
      }, organisation.description || 'There is no description available.', " ")
    }), _react.default.createElement(_Card.default, {
      title: "Contact Details",
      description: _react.default.createElement(_ContactDetails.default, {
        contactInfo: organisation.contactInfo
      }, " ")
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 3
    }, _react.default.createElement(_Card.default, {
      title: "Location",
      headerActions: _react.default.createElement(_reactRouterDom.Link, {
        to: {
          pathname: `/organisations/${id}/about`,
          state: {
            scrollIntoView: true
          }
        }
      }, _react.default.createElement(_Icon.default, {
        name: "window-maximize",
        size: "sm"
      })),
      description: _react.default.createElement(_Location.default, {
        latitude: (0, _lo.get)(organisation, 'locationInfo.latitude'),
        longitude: (0, _lo.get)(organisation, 'locationInfo.longitude'),
        writeMode: false,
        iconInfo: iconInfo
      })
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 3
    }, _react.default.createElement(_Card.default, {
      title: "Recent Attachments",
      headerActions: _react.default.createElement(_reactRouterDom.Link, {
        to: `/organisations/${id}/attachments`
      }, _react.default.createElement(_Icon.default, {
        name: "window-maximize",
        size: "sm"
      })),
      description: _react.default.createElement(_RecentAttachments.default, {
        recentAttachments: recentAttachments
      })
    })))));
  }

}

_defineProperty(OrganisationsSummary, "propTypes", {
  organisation: _propTypes.default.object,
  loadOrganisation: _propTypes.default.func,
  recentAttachments: _propTypes.default.arrayOf(_propTypes.default.object)
});

var _default = OrganisationsSummary;
exports.default = _default;