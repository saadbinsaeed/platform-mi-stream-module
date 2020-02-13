"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _echartsForReact = _interopRequireDefault(require("echarts-for-react"));

var _Widget = _interopRequireDefault(require("app/components/atoms/Widget/Widget"));

var _theme = _interopRequireDefault(require("app/themes/theme.default"));

var _avatar = require("app/utils/avatar/avatar");

var _client = require("graphql/client");

var _utils = require("app/utils/utils");

var _lo = require("app/utils/lo/lo");

var _widgetTasksStatusQuery = _interopRequireDefault(require("graphql/dashboard/widgetTasksStatusQuery"));

var _widgetTasksDueDateQuery = _interopRequireDefault(require("graphql/dashboard/widgetTasksDueDateQuery"));

var _widgetTasksStartDateQuery = _interopRequireDefault(require("graphql/dashboard/widgetTasksStartDateQuery"));

var _widgetTasksByCommonFilterQuery = _interopRequireDefault(require("graphql/dashboard/widgetTasksByCommonFilterQuery"));

var _widgetTasksInvolvementQuery = _interopRequireDefault(require("graphql/dashboard/widgetTasksInvolvementQuery"));

var _widgetTasksByGroupQuery = _interopRequireDefault(require("graphql/dashboard/widgetTasksByGroupQuery"));

var _componentActions = require("store/actions/component/componentActions");

var _DashboardBreadcrumbs = _interopRequireDefault(require("app/components/Dashboards_new/DashboardBreadcrumbs"));

var _DashboardTaskWidgetList = _interopRequireDefault(require("app/components/Dashboards_new/DashboardTaskWidgetList"));

var _dashboardWidgetConfig = require("app/config/dashboardWidgetConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DashboardTaskWidget extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "loadWidgetData", (0, _memoizeOne.default)(({
      breadcrumbs,
      selectedGroup
    }) => {
      const subFilters = !breadcrumbs ? [] : [].concat(...breadcrumbs.map(group => group.selectedOption.filter));
      let requestQueryParam;

      if (!(0, _utils.isEmpty)(selectedGroup.group)) {
        requestQueryParam = {
          filterBy: subFilters,
          groupBy: selectedGroup.group
        };
        this.fetchTasksCountGroupBy(requestQueryParam, _widgetTasksByGroupQuery.default).then(tasks => {
          this.setState({
            data: tasks,
            isLoading: false
          });
        });
      } else {
        const field = !(0, _utils.isEmpty)(selectedGroup.field) ? selectedGroup.field : '';

        switch (field) {
          // dispatch request (count tasks by status)
          case 'status':
            requestQueryParam = this.parseQueryParameter(selectedGroup, subFilters);
            this.fetchTasksFilterBy(requestQueryParam, _widgetTasksStatusQuery.default).then(tasks => {
              this.setState({
                data: tasks,
                isLoading: false
              });
            });
            break;
          // dispatch request (count tasks by due date)

          case 'dueDate':
            requestQueryParam = this.parseQueryParameter(selectedGroup, subFilters);
            this.fetchTasksFilterBy(requestQueryParam, _widgetTasksDueDateQuery.default).then(tasks => {
              this.setState({
                data: tasks,
                isLoading: false
              });
            });
            break;
          // dispatch request (count tasks by bpmn variables start date)

          case 'bpmnVariablesStartDate':
            requestQueryParam = this.parseQueryParameter(selectedGroup, subFilters);
            this.fetchTasksFilterBy(requestQueryParam, _widgetTasksStartDateQuery.default).then(tasks => {
              this.setState({
                data: tasks,
                isLoading: false
              });
            });
            break;
          // dispatch request (count tasks by status last update, start date & end date)

          case 'taskStatusLastUpdate':
          case 'startDate':
          case 'endDate':
            requestQueryParam = this.parseQueryParameter(selectedGroup, subFilters);
            this.fetchTasksFilterBy(requestQueryParam, _widgetTasksByCommonFilterQuery.default).then(tasks => {
              this.setState({
                data: tasks,
                isLoading: false
              });
            });
            break;
          // dispatch request (count tasks by involvement)

          case 'involvement':
            requestQueryParam = this.parseQueryParameter(selectedGroup, subFilters);
            this.fetchTasksFilterBy(requestQueryParam, _widgetTasksInvolvementQuery.default).then(tasks => {
              this.setState({
                data: tasks,
                isLoading: false
              });
            });
            break;

          default:
            break;
        }
      }
    }));

    _defineProperty(this, "parseQueryParameter", (selectedGroup, subFilters) => {
      const requestQuery = {};

      if (!(0, _utils.isEmpty)(selectedGroup.options)) {
        for (const option of selectedGroup.options) {
          const property = option.label;
          requestQuery[property] = !(0, _utils.isEmpty)(subFilters) && !(0, _utils.isEmpty)(option.filter) ? [...subFilters, ...option.filter] : option.filter;
        }
      }

      return requestQuery;
    });

    _defineProperty(this, "parseTasksData", (0, _memoizeOne.default)(data => {
      if (!(0, _utils.isEmpty)(data.message)) {
        throw new Error(`${data.message}, contact support.`);
      }

      const {
        selectedGroup
      } = this.state;
      const selectedGroupOptions = [];
      const seriesData = [];
      let totalCount = 0;

      if (data) {
        // data handling if request returns an array
        if (Array.isArray(data)) {
          // data handling if widget selected group is equal to priority
          if (selectedGroup.field === 'priority') {
            const priorityData = this.parsePriorityData(data);

            for (const priority of priorityData) {
              const option = selectedGroup.options && selectedGroup.options.find(option => option.value === priority.priority);
              totalCount = totalCount + priority.count;
              selectedGroupOptions.push({ ...option,
                count: priority.count,
                filter: [{
                  field: 'priority',
                  op: '=',
                  value: priority.priority
                }]
              });
              seriesData.push({
                name: option.name,
                value: priority.count,
                itemStyle: option && option.itemStyle ? option.itemStyle : {
                  color: (0, _avatar.generateColor)(Object.values(_theme.default.statusColors), option.name)
                }
              });
            }
          } else {
            // handles data result by assignee and processDefinitionName
            for (const result of data) {
              let name = '';
              let option;
              const value = Number(result.count);
              totalCount = totalCount + value;

              if (result.hasOwnProperty('name')) {
                name = !(0, _utils.isEmpty)(result.name) ? result.name : 'Unassigned';
                option = {
                  value: {
                    id: result.id,
                    name: result.name,
                    login: result.login
                  },
                  count: value,
                  filter: [{
                    field: 'assignee.id',
                    op: '=',
                    value: result.id
                  }]
                };
              } else {
                name = !(0, _utils.isEmpty)(result.processDefinitionName) ? result.processDefinitionName : 'Process Type N/A';
                option = {
                  value: result.processDefinitionName,
                  count: value,
                  filter: [{
                    field: 'process.processDefinition.name',
                    op: '=',
                    value: result.processDefinitionName
                  }]
                };
              }

              const seriesOption = {
                name,
                value,
                itemStyle: {
                  color: (0, _avatar.generateColor)(Object.values(_theme.default.statusColors), name)
                }
              };
              selectedGroupOptions.push({ ...seriesOption,
                ...option
              });
              seriesData.push(seriesOption);
            }
          }
        } else {
          // data handling if request returns an object
          for (const key in data) {
            const option = selectedGroup.options && selectedGroup.options.find(option => option.label === key);
            const value = Number(data[key]);
            totalCount = totalCount + value;

            if (!(0, _utils.isEmpty)(option)) {
              selectedGroupOptions.push({ ...option,
                count: value
              });
              seriesData.push({
                name: option.name,
                value,
                itemStyle: option && option.itemStyle ? option.itemStyle : {
                  color: (0, _avatar.generateColor)(Object.values(_theme.default.statusColors), key)
                }
              });
            }
          }
        }
      }

      return {
        seriesData,
        totalCount,
        selectedGroupOptions
      };
    }));

    _defineProperty(this, "parsePriorityData", data => {
      const priorityRange = [1, 2, 3, 4, 5];
      const priorityData = [];
      let notInRangeCount = 0;

      for (const item of data) {
        if (!priorityRange.includes(item.priority)) {
          notInRangeCount = notInRangeCount + Number(item.count);
        } else {
          const updatedItem = { ...item,
            count: Number(item.count)
          };
          priorityData.push(updatedItem);
        }
      }

      const index = priorityData.findIndex(i => i.priority === 3);
      priorityData[index].count = priorityData[index].count + notInRangeCount;
      return priorityData;
    });

    _defineProperty(this, "buildWidget", (0, _memoizeOne.default)((widgetOptions, seriesData, totalCount) => {
      const widgetSettings = { ...widgetOptions
      };
      widgetSettings.title.text = totalCount;
      widgetSettings.series[0].data = seriesData;
      return widgetSettings;
    }));

    _defineProperty(this, "onWidgetOptionSelect", option => {
      if (!option) {
        throw new Error(`${option} selection doesn't exists`);
      }

      const {
        widgetGroups
      } = this.props;
      const {
        breadcrumbs,
        selectedGroup
      } = this.state;
      const newBreadcrumbs = [...breadcrumbs, { ...selectedGroup,
        selectedOption: option
      }];
      const breadcrumbsGroupsNames = newBreadcrumbs.map(g => g.name);
      this.setState({
        breadcrumbs: newBreadcrumbs,
        selectedGroup: widgetGroups.filter(g => !breadcrumbsGroupsNames.includes(g.name))[0] // TODO: handle when filter removes all groups

      });
    });

    _defineProperty(this, "getPrevSelectedGroup", () => {
      const {
        breadcrumbs
      } = this.state;
      const breadcrumbsCopy = [...breadcrumbs];
      const selectedGroup = breadcrumbsCopy.length ? breadcrumbsCopy[breadcrumbsCopy.length - 1] : this.props.widgetGroups[0];
      breadcrumbsCopy.pop();
      this.setState({
        breadcrumbs: [...breadcrumbsCopy],
        selectedGroup
      });
    });

    _defineProperty(this, "getGroupsSequence", (0, _memoizeOne.default)((groups, breadcrumbs) => {
      if (!(0, _utils.isEmpty)(breadcrumbs)) {
        const breadcrumbsCopy = [...breadcrumbs];
        let groupsCopy = [...groups];
        const firstBc = breadcrumbsCopy.shift();
        const nextBc = breadcrumbsCopy;
        groupsCopy = groupsCopy.filter(group => group.name !== firstBc.name);
        return this.getGroupsSequence(groupsCopy, nextBc);
      }

      return groups;
    }));

    _defineProperty(this, "onWidgetGroupChange", (0, _memoizeOne.default)(group => {
      this.setState({
        selectedGroup: group
      });
    }));

    _defineProperty(this, "fetchTasksCountGroupBy", (queryParam, gqlQ) => {
      return _client.graphql.query({
        query: gqlQ,
        variables: queryParam,
        fetchPolicy: 'no-cache'
      }).then(response => {
        const tasks = (0, _lo.get)(response, 'data.result');
        return tasks || {
          message: 'Data not available'
        };
      });
    });

    _defineProperty(this, "fetchTasksFilterBy", (queryParam, gqlQ) => {
      return _client.graphql.query({
        query: gqlQ,
        variables: queryParam,
        fetchPolicy: 'no-cache'
      }).then(response => {
        const tasks = (0, _lo.get)(response, 'data');
        return tasks || {
          message: 'Data not available'
        };
      });
    });

    _defineProperty(this, "componentDidUpdate", (prevProps, prevState) => {
      const {
        toggleReset,
        widgetIndex,
        widgetGroups
      } = this.props;
      const {
        breadcrumbs,
        selectedGroup,
        isLoading
      } = this.state;

      if (!isLoading) {
        if (prevProps.toggleReset !== toggleReset) {
          this.setState({
            breadcrumbs: [],
            selectedGroup: widgetGroups[0]
          });
        }

        if (prevState.breadcrumbs !== breadcrumbs || prevState.selectedGroup !== selectedGroup) {
          this.setState({
            isLoading: true
          });
          this.loadWidgetData(this.state);
          this.props.onDashboardSettingsChange(this.state, widgetIndex);
        }
      }
    });

    const {
      onDashboardSettingsChange,
      widgetIndex: _widgetIndex
    } = this.props;
    const {
      breadcrumbs: _breadcrumbs,
      selectedGroup: _selectedGroup
    } = this.setDefaultWidgetSettings(props.preferences, props.widgetGroups);
    this.state = {
      breadcrumbs: _breadcrumbs,
      selectedGroup: _selectedGroup,
      isLoading: true,
      data: null
    };
    this.loadWidgetData(this.state);
    onDashboardSettingsChange(this.state, _widgetIndex);
  }

  setDefaultWidgetSettings(preferences, groups) {
    let breadcrumbs = [];
    let selectedGroup = groups[0];
    if ((0, _utils.isEmpty)(preferences.dashboard)) return {
      breadcrumbs,
      selectedGroup
    };
    const prefBreadcrumbs = preferences.dashboard[this.props.widgetIndex].breadcrumbs;
    const prefSelectedGroup = preferences.dashboard[this.props.widgetIndex].selectedGroup;
    breadcrumbs = prefBreadcrumbs.map(breadcrumb => {
      let updatedBreadcrumbs;

      for (const group of groups) {
        let newselectedGroup;
        let newSelectedOption;

        if (group.field === breadcrumb.field) {
          newselectedGroup = group;

          for (const option of group.options) {
            if (option.name === breadcrumb.selectedOption.name) {
              newSelectedOption = option;
              break;
            }

            ;
          }

          ;

          if (breadcrumb.field !== 'assigneeId' && breadcrumb.field !== 'processDefinitionName') {
            updatedBreadcrumbs = { ...newselectedGroup,
              selectedOption: newSelectedOption
            };
          } else {
            updatedBreadcrumbs = { ...newselectedGroup,
              selectedOption: breadcrumb.selectedOption
            };
          }

          break;
        }

        ;
      }

      return updatedBreadcrumbs;
    });
    selectedGroup = groups.find(g => {
      return g.field === prefSelectedGroup.field;
    });
    return {
      breadcrumbs,
      selectedGroup
    };
  }

  render() {
    const {
      widgetGroups,
      widgetOptions,
      saveComponentState
    } = this.props;
    const {
      breadcrumbs,
      selectedGroup,
      data,
      isLoading
    } = this.state; // should be set on componentDidUpdate or onOptionSelect

    if (isLoading) {
      return _react.default.createElement(_Loader.default, null);
    }

    const {
      seriesData,
      totalCount,
      selectedGroupOptions
    } = this.parseTasksData(data);
    const availableGroups = this.getGroupsSequence(widgetGroups, breadcrumbs);
    return _react.default.createElement(_Widget.default, {
      title: 'Tasks'
    }, _react.default.createElement(_echartsForReact.default, {
      option: this.buildWidget(widgetOptions, seriesData, totalCount),
      theme: 'dark'
    }), _react.default.createElement(_DashboardBreadcrumbs.default, {
      data: breadcrumbs
    }), _react.default.createElement(_DashboardTaskWidgetList.default, {
      breadcrumbs: breadcrumbs,
      selectedGroup: selectedGroup,
      availableGroups: availableGroups,
      saveComponentState: saveComponentState,
      selectedGroupOptions: selectedGroupOptions,
      onWidgetGroupChange: this.onWidgetGroupChange,
      onWidgetOptionSelect: this.onWidgetOptionSelect,
      getPrevSelectedGroup: this.getPrevSelectedGroup
    }));
  }

}

_defineProperty(DashboardTaskWidget, "propTypes", {
  preferences: _propTypes.default.object,
  widgetGroups: _propTypes.default.array
});

const mapStateToProps = state => {
  return {
    preferences: state.user.preferences,
    widgetGroups: _dashboardWidgetConfig.widgetGroups,
    widgetOptions: _dashboardWidgetConfig.widgetOptions
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  saveComponentState: _componentActions.saveComponentState
})(DashboardTaskWidget);

exports.default = _default;