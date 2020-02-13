"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _reactRouterDom = require("react-router-dom");

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _ContactDetails = _interopRequireDefault(require("app/components/molecules/ContactDetails/ContactDetails"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _Location = _interopRequireDefault(require("app/components/molecules/Map/Location/Location"));

var _RecentAttachments = _interopRequireDefault(require("app/components/RecentAttachments/RecentAttachments"));

var _Summary = _interopRequireDefault(require("app/components/molecules/Summary/Summary"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _lo = require("app/utils/lo/lo");

var _classificationUtils = require("app/utils/classification/classificationUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Render the People summary tab.
 */
class PeopleSummary extends _react.PureComponent {
  constructor(props) {
    super(props);
    props.loadPerson(props.person.id);
  }

  /**
   * @override
   */
  render() {
    const {
      person,
      recentAttachments
    } = this.props;
    const id = person.id;
    const iconInfo = {
      name: person.iconName,
      color: person.iconColor
    };
    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Summary.default, {
      values: person._summary,
      metadata: (0, _lo.keyBy)((0, _classificationUtils.getSummaryElements)(person._structure), 'f_uri')
    }), _react.default.createElement(_Container.default, null, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 3
    }, _react.default.createElement(_Card.default, {
      title: 'Profile',
      description: _react.default.createElement(_Text.default, {
        overflowHidden: true
      }, person.description || 'There is no description available.', " ")
    }), _react.default.createElement(_Card.default, {
      title: "Contact Details",
      description: _react.default.createElement(_ContactDetails.default, {
        contactInfo: person.contactInfo
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
          pathname: `/people/${id}/about`,
          state: {
            scrollIntoView: true
          }
        }
      }, _react.default.createElement(_ButtonIcon.default, {
        icon: "window-maximize",
        size: "sm"
      })),
      description: _react.default.createElement(_Location.default, {
        latitude: (0, _lo.get)(person, 'locationInfo.latitude'),
        longitude: (0, _lo.get)(person, 'locationInfo.longitude'),
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
        to: `/people/${id}/attachments`
      }, _react.default.createElement(_ButtonIcon.default, {
        icon: "window-maximize",
        size: "sm"
      })),
      description: _react.default.createElement(_RecentAttachments.default, {
        recentAttachments: recentAttachments
      })
    })))));
  }

}

_defineProperty(PeopleSummary, "propTypes", {
  person: _propTypes.default.object,
  loadPerson: _propTypes.default.func,
  recentAttachments: _propTypes.default.arrayOf(_propTypes.default.object)
});

var _default = PeopleSummary;
exports.default = _default;