"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _situationalAwarenessActions = require("store/actions/maps/situationalAwarenessActions");

var _situationalAwarenessDetailActions = require("store/actions/maps/situationalAwarenessDetailActions");

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

var _GeoMap = _interopRequireDefault(require("app/components/molecules/Map/GeoMap/GeoMap"));

var _ActionBar = _interopRequireDefault(require("app/components/molecules/ActionBar/ActionBar"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _Drawer = _interopRequireDefault(require("app/components/atoms/Drawer/Drawer"));

var _SituationalAwarenessFilters = _interopRequireDefault(require("./SituationalAwarenessFilters"));

var _InputText = _interopRequireDefault(require("app/components/atoms/Input/InputText"));

var _Flex = _interopRequireDefault(require("app/components/atoms/Flex/Flex"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SearchInput = (0, _styledComponents.default)(_InputText.default).withConfig({
  displayName: "SituationalAwareness__SearchInput",
  componentId: "sc-16abjat-0"
})(["display:inline-block;width:100%;"]);
/**
 * Renders the view to display the classification.
 */

class SituationalAwareness extends _react.Component {
  /**
   * Set our default state
   * @param props
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "queryParams", {
      page: 0,
      filter: '',
      order: 'asc',
      groupBy: 'date',
      view: ''
    });

    _defineProperty(this, "setState", void 0);

    _defineProperty(this, "toggleFilters", () => {
      this.setState({
        isFiltersOpen: !this.state.isFiltersOpen
      });
    });

    _defineProperty(this, "setFilter", e => {
      this.setState({
        queryParams: { ...this.state.queryParams,
          filter: e.value
        }
      });
    });

    _defineProperty(this, "setView", e => {
      this.setState({
        queryParams: { ...this.state.queryParams,
          view: e.view,
          group: e.group
        }
      });
    });

    _defineProperty(this, "clearAllQueryParams", () => {
      this.setState({
        queryParams: {}
      });
    });

    this.state = {
      queryParams: {},
      isFiltersOpen: false
    };
  }

  /**
   * @override
   */
  render() {
    // console.log('state', this.state);
    // We'll try and organise data object here until we sort everything with graphql
    const data = [];
    this.props.records && this.props.records.map(item => {
      /**
       * Make data objects in array slightly more sane.
       */
      const latitude = item.geometry.coordinates[0];
      const longitude = item.geometry.coordinates[1];
      const title = item.geometry_name;
      const properties = item.properties;
      return data.push({
        title,
        latitude: latitude || 0,
        longitude: longitude || 0,
        priority: properties.mttr_bucket_ || 0,
        properties
      });
    }); // console.log('State', this.state);

    return _react.default.createElement(_PageTemplate.default, {
      title: "Maps"
    }, _react.default.createElement(_ActionBar.default, {
      left: _react.default.createElement(SearchInput, {
        name: 'filter',
        placeholder: 'Filter',
        onChange: this.setFilter,
        value: this.state.queryParams.filter || ''
      }),
      right: _react.default.createElement(_ButtonIcon.default, {
        icon: 'filter-variant',
        onClick: this.toggleFilters
      })
    }), _react.default.createElement(_Drawer.default, {
      title: "Filter Data",
      isOpen: this.state.isFiltersOpen,
      isToggled: this.toggleFilters,
      footer: _react.default.createElement(_Flex.default, {
        spaceBetween: true,
        grow: true
      }, _react.default.createElement(_Button.default, {
        onClick: this.clearAllQueryParams
      }, "Clear all"), " ", _react.default.createElement(_Button.default, {
        color: "primary"
      }, "Apply Filter"))
    }, _react.default.createElement(_SituationalAwarenessFilters.default, {
      onChange: e => this.setView(e)
    })), _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_GeoMap.default, {
      locations: data || [],
      detail: this.props.detail || [],
      filters: this.state.filters,
      width: "100%",
      height: "100%",
      showMyLocation: true,
      currentUser: this.props.currentUser || {},
      loadData: params => this.props.loadSituationalAwareness(params),
      loadDetail: id => this.props.loadSituationalAwarenessDetail(id)
    })));
  }

}

const mapStateToProps = state => {
  return {
    isLoading: state.maps.situationalAwareness.isLoading,
    error: state.maps.situationalAwareness.error,
    records: state.maps.situationalAwareness.payload,
    detail: state.maps.situationalAwarenessDetail.payload,
    currentUser: state.user.profile
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadSituationalAwareness: _situationalAwarenessActions.loadSituationalAwareness,
  loadSituationalAwarenessDetail: _situationalAwarenessDetailActions.loadSituationalAwarenessDetail
})(SituationalAwareness);

exports.default = _default;