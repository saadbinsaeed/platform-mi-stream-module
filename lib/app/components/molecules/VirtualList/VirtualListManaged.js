"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _debouncePromise = _interopRequireDefault(require("debounce-promise"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Alert = _interopRequireDefault(require("app/components/molecules/Alert/Alert"));

var _VirtualList = _interopRequireDefault(require("app/components/molecules/VirtualList/VirtualList"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _Container = _interopRequireDefault(require("app/components/atoms/Container/Container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TitleContainer = (0, _styledComponents.default)(_Container.default).withConfig({
  displayName: "VirtualListManaged__TitleContainer",
  componentId: "sc-1qpwbd5-0"
})(["background:", ";position:relative;width:100%;margin-bottom:-1rem;z-index:1;font-size:.7rem;padding:.5rem 4.5rem;font-weight:500;"], ({
  theme
}) => theme.color.background);
/**
 *
 */

class VirtualListManaged extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      list: [],
      firstLoading: true,
      key: 0,
      forceUpdateKey: 0
    });

    _defineProperty(this, "requestedIndexes", new Set());

    _defineProperty(this, "unmounted", false);

    _defineProperty(this, "virtualListStyle", {
      paddingTop: '2rem'
    });

    _defineProperty(this, "prevStartIndex", -1);

    _defineProperty(this, "prevStopIndex", -1);

    _defineProperty(this, "resetView", stateConfiguration => {
      this.requestedIndexes = new Set();
      this.prevStartIndex = -1;
      this.prevStopIndex = -1;
      this.setState({ ...(stateConfiguration || {}),
        list: [],
        key: this.state.key + 1
      }, this.loadData);
    });

    _defineProperty(this, "loadMoreRows", ({
      startIndex,
      stopIndex
    }) => this.loadData({
      startIndex,
      stopIndex
    }));

    _defineProperty(this, "loadData", (0, _debouncePromise.default)(options => {
      const {
        filterBy,
        orderBy
      } = this.props;
      let {
        startIndex: start,
        stopIndex: stop
      } = options || {};
      start = start || 0;

      if (start >= 15) {
        // we need to preload the 'page before'
        start -= 15;
      }

      stop = stop || 30;

      if (stop - start < 30) {
        // we need to preload at least 30 elements
        stop = start + 30;
      }

      while (start < stop && this.requestedIndexes.has(start)) {
        ++start;
      }

      while (stop > start && this.requestedIndexes.has(stop)) {
        --stop;
      }

      if (start === stop) {
        return Promise.resolve();
      }

      if (this.prevStartIndex === start && this.prevStopIndex === stop) {
        return Promise.resolve();
      }

      const promise = this.props.loadData({
        startIndex: start,
        stopIndex: stop,
        filterBy,
        orderBy
      });
      const isPromise = promise instanceof Promise;

      if (!isPromise) {
        throw new Error('The loadData function MUST return a Promise.');
      }

      for (let i = start; i < stop; ++i) {
        this.requestedIndexes.add(i);
      }

      this.prevStartIndex = start;
      this.prevStopIndex = stop;
      return promise;
    }, 400));

    _defineProperty(this, "showNoResult", () => {
      const {
        isLoading,
        title,
        itemCount = 0
      } = this.props;
      return !this.state.firstLoading && !isLoading && !itemCount && !title && _react.default.createElement(_Alert.default, {
        type: "background",
        margin: 16
      }, "No results");
    });

    _defineProperty(this, "forceUpdate", () => this.setState({
      forceUpdateKey: this.state.forceUpdateKey + 1
    }));
  }

  componentDidMount() {
    this.loadData().finally(() => !this.unmounted && this.setState({
      firstLoading: false
    }));
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidUpdate(prevProps) {
    const {
      list,
      startIndex,
      orderBy,
      filterBy
    } = this.props;

    if (list && prevProps.list !== list) {
      this.addItems(startIndex, list);
    }

    if (orderBy !== prevProps.orderBy || filterBy !== prevProps.filterBy) {
      this.resetView({
        orderBy,
        filterBy
      });
    }
  }

  addItems(startIndex, list) {
    const next = [...this.state.list];
    (list || []).forEach((item, index) => next[(startIndex || 0) + index] = item);
    const uniqueList = next.filter(Boolean).filter((item, index, self) => self.findIndex(t => t.id === item.id) === index);
    this.setState({
      list: uniqueList,
      forceUpdateKey: this.state.forceUpdateKey + 1
    });
  }

  render() {
    const {
      itemSize,
      itemCount,
      isLoading,
      maxWidth,
      title,
      renderComponent
    } = this.props;
    const {
      list,
      key,
      forceUpdateKey
    } = this.state;
    const maxTitleWidth = Number(maxWidth) + 50;
    return _react.default.createElement(_react.Fragment, null, this.state.firstLoading && isLoading && _react.default.createElement(_Loader.default, {
      absolute: true
    }), this.showNoResult(), title && _react.default.createElement(TitleContainer, {
      width: String(maxTitleWidth)
    }, title), _react.default.createElement(_VirtualList.default, {
      key: key,
      forceupdate: forceUpdateKey,
      onItemsRendered: this.loadMoreRows,
      width: maxWidth,
      itemSize: itemSize,
      itemCount: itemCount,
      renderItem: ({
        index,
        style,
        resize
      }) => list[index] ? renderComponent({
        style,
        index,
        resize,
        data: list[index],
        itemSize
      }) : _react.default.createElement("div", {
        style: style,
        key: index
      }, _react.default.createElement(_Loader.default, {
        key: index
      })),
      style: this.virtualListStyle
    }));
  }

}

_defineProperty(VirtualListManaged, "propTypes", {
  renderComponent: _propTypes.default.func.isRequired,
  itemSize: _propTypes.default.number.isRequired,
  itemCount: _propTypes.default.number.isRequired,
  loadData: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool.isRequired,
  startIndex: _propTypes.default.number.isRequired,
  filterBy: _propTypes.default.arrayOf(_propTypes.default.object),
  orderBy: _propTypes.default.arrayOf(_propTypes.default.object),
  list: _propTypes.default.arrayOf(_propTypes.default.object),
  maxWidth: _propTypes.default.string,
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
});

;
var _default = VirtualListManaged;
exports.default = _default;