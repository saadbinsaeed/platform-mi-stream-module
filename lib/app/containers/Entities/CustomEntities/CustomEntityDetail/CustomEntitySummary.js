"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactStyledFlexboxgrid = require("react-styled-flexboxgrid");

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _Card = _interopRequireDefault(require("app/components/molecules/Card/Card"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Location = _interopRequireDefault(require("app/components/molecules/Map/Location/Location"));

var _RecentAttachments = _interopRequireDefault(require("app/components/RecentAttachments/RecentAttachments"));

var _Summary = _interopRequireDefault(require("app/components/molecules/Summary/Summary"));

var _lo = require("app/utils/lo/lo");

var _classificationUtils = require("app/utils/classification/classificationUtils");

var _customEntitiesActions = require("store/actions/entities/customEntitiesActions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Render the Custom Entity's summary tab.
 */
class CustomEntitySummary extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "getSummary", (0, _fastMemoize.default)(structure => (0, _lo.keyBy)((0, _classificationUtils.getSummaryElements)(structure), 'f_uri')));

    props.loadCustomEntity(props.customEntity.id);
  }

  /**
   * @override
   */
  render() {
    const {
      customEntity,
      recentAttachments
    } = this.props;
    const latitude = (0, _lo.get)(customEntity, 'locationInfo.latitude');
    const longitude = (0, _lo.get)(customEntity, 'locationInfo.longitude');
    const iconInfo = {
      name: customEntity.iconName,
      color: customEntity.iconColor
    };
    return _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_Summary.default, {
      values: customEntity._summary,
      metadata: this.getSummary(customEntity._structure)
    }), _react.default.createElement(_Container.default, null, _react.default.createElement(_reactStyledFlexboxgrid.Row, null, _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 3
    }, _react.default.createElement(_Card.default, {
      title: "Location",
      headerActions: _react.default.createElement(_reactRouterDom.Link, {
        to: {
          pathname: `/custom-entities/${customEntity.id}/about`,
          state: {
            scrollIntoView: true
          }
        }
      }, _react.default.createElement(_Icon.default, {
        name: "window-maximize",
        size: "sm"
      })),
      description: _react.default.createElement(_Location.default, {
        latitude: latitude,
        longitude: longitude,
        iconInfo: iconInfo,
        writeMode: false
      })
    })), _react.default.createElement(_reactStyledFlexboxgrid.Col, {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 3
    }, _react.default.createElement(_Card.default, {
      title: "Recent Attachments",
      headerActions: _react.default.createElement(_reactRouterDom.Link, {
        to: `/custom-entities/${customEntity.id}/attachments`
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

_defineProperty(CustomEntitySummary, "propTypes", {
  loadCustomEntity: _propTypes.default.func,
  customEntity: _propTypes.default.object.isRequired,
  recentAttachments: _propTypes.default.arrayOf(_propTypes.default.object)
});

const mapStateToProps = state => ({
  customEntity: (0, _lo.get)(state.entities.customEntities.details.data, 'customEntity'),
  recentAttachments: (0, _lo.get)(state.entities.customEntities.details.data, 'recentAttachments')
});

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadCustomEntity: _customEntitiesActions.loadCustomEntity
})(CustomEntitySummary);

exports.default = _default;