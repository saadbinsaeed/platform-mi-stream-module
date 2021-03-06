"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.widgetOptions = exports.widgetGroups = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _theme = _interopRequireDefault(require("app/themes/theme.default"));

var _aboxConfig = require("app/config/aboxConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DATE_VALUES_MAP = {
  'Today': [(0, _moment.default)().startOf('day').toDate(), (0, _moment.default)().endOf('day').toDate()],
  'Yesterday': [(0, _moment.default)().subtract(1, 'days').startOf('day').toDate(), (0, _moment.default)().subtract(1, 'days').endOf('day').toDate()],
  'Last 30 days': [(0, _moment.default)().subtract(30, 'days').startOf('day').toDate(), (0, _moment.default)().endOf('day').toDate()],
  'Last 30+ days': [(0, _moment.default)().subtract(6, 'months').startOf('day').toDate(), (0, _moment.default)().subtract(1, 'months').endOf('day').toDate()],
  'Not set': null,
  'Overdue': [(0, _moment.default)().subtract(6, 'months').startOf('day').toDate(), (0, _moment.default)().subtract(1, 'days').endOf('day').toDate()],
  'Upcoming': [(0, _moment.default)().startOf('day').toDate(), (0, _moment.default)().add(6, 'months').endOf('day').toDate()],
  'Passed': [(0, _moment.default)().subtract(6, 'months').startOf('day').toDate(), (0, _moment.default)().subtract(1, 'days').endOf('day').toDate()]
};

const generateDateOptions = fieldVal => {
  return [{
    name: 'Today',
    label: 'today',
    field: `${fieldVal}`,
    value: DATE_VALUES_MAP['Today'],
    filter: [{
      field: fieldVal,
      op: 'between',
      value: DATE_VALUES_MAP['Today']
    }],
    itemStyle: {
      color: '#5aaf78'
    }
  }, {
    name: 'Yesterday',
    label: 'yesterday',
    field: `${fieldVal}`,
    value: DATE_VALUES_MAP['Yesterday'],
    filter: [{
      field: fieldVal,
      op: 'between',
      value: DATE_VALUES_MAP['Yesterday']
    }],
    itemStyle: {
      color: '#eeeeee'
    }
  }, {
    name: 'Last 30 days',
    label: 'lastThirtyDays',
    field: `${fieldVal}`,
    value: DATE_VALUES_MAP['Last 30 days'],
    filter: [{
      field: fieldVal,
      op: 'between',
      value: DATE_VALUES_MAP['Last 30 days']
    }],
    itemStyle: {
      color: '#1d8f8d'
    }
  }, {
    name: 'Last 30+ days',
    label: 'lastThirtyPlusDays',
    field: `${fieldVal}`,
    value: DATE_VALUES_MAP['Last 30+ days'],
    filter: [{
      field: fieldVal,
      op: 'between',
      value: DATE_VALUES_MAP['Last 30+ days']
    }],
    itemStyle: {
      color: '#ca8622'
    }
  }, {
    name: 'Not set',
    label: 'notSet',
    field: `${fieldVal}`,
    value: DATE_VALUES_MAP['Not set'],
    filter: [{
      field: fieldVal,
      op: 'is null'
    }],
    itemStyle: {
      color: '#bda29a'
    }
  }];
};

const widgetGroups = [{
  name: 'Status',
  field: 'status',
  options: [{
    name: 'Open',
    label: 'open',
    field: 'endDate',
    value: 'is null',
    filter: [{
      field: 'endDate',
      op: 'is null'
    }],
    itemStyle: {
      color: '#5aaf78'
    }
  }, {
    name: 'Closed',
    label: 'closed',
    field: 'endDate',
    value: 'is not null',
    filter: [{
      field: 'endDate',
      op: 'is not null'
    }],
    itemStyle: {
      color: '#666666'
    }
  }]
}, {
  name: 'Due Date',
  field: 'dueDate',
  options: [{
    name: 'Overdue',
    label: 'overdue',
    field: 'dueDate',
    value: DATE_VALUES_MAP['Overdue'],
    filter: [{
      field: 'dueDate',
      op: 'between',
      value: DATE_VALUES_MAP['Overdue']
    }],
    itemStyle: {
      color: '#5aaf78'
    }
  }, {
    name: 'Today',
    label: 'today',
    field: 'dueDate',
    value: DATE_VALUES_MAP['Today'],
    filter: [{
      field: 'dueDate',
      op: 'between',
      value: DATE_VALUES_MAP['Today']
    }],
    itemStyle: {
      color: '#1d8f8d'
    }
  }, {
    name: 'Upcoming',
    label: 'upcoming',
    field: 'dueDate',
    value: DATE_VALUES_MAP['Upcoming'],
    filter: [{
      field: 'dueDate',
      op: 'between',
      value: DATE_VALUES_MAP['Upcoming']
    }],
    itemStyle: {
      color: '#ca8622'
    }
  }, {
    name: 'Not set',
    label: 'notSet',
    field: 'dueDate',
    value: DATE_VALUES_MAP['Not set'],
    filter: [{
      field: 'dueDate',
      op: 'is null'
    }],
    itemStyle: {
      color: '#666666'
    }
  }]
}, {
  name: 'Start Date',
  field: 'bpmnVariablesStartDate',
  options: [{
    name: 'Passed',
    label: 'passed',
    field: 'bpmnVariables',
    value: DATE_VALUES_MAP['Passed'],
    filter: [{
      field: 'bpmnVariables.name',
      op: '=',
      value: 'startDate'
    }, {
      field: 'bpmnVariables.text',
      op: 'between',
      value: DATE_VALUES_MAP['Passed']
    }],
    itemStyle: {
      color: '#5aaf78'
    }
  }, {
    name: 'Today',
    label: 'today',
    field: 'bpmnVariables',
    value: DATE_VALUES_MAP['Today'],
    filter: [{
      field: 'bpmnVariables.name',
      op: '=',
      value: 'startDate'
    }, {
      field: 'bpmnVariables.text',
      op: 'between',
      value: DATE_VALUES_MAP['Today']
    }],
    itemStyle: {
      color: '#1d8f8d'
    }
  }, {
    name: 'Upcoming',
    label: 'upcoming',
    field: 'bpmnVariables',
    value: DATE_VALUES_MAP['Upcoming'],
    filter: [{
      field: 'bpmnVariables.name',
      op: '=',
      value: 'startDate'
    }, {
      field: 'bpmnVariables.text',
      op: 'between',
      value: DATE_VALUES_MAP['Upcoming']
    }],
    itemStyle: {
      color: '#ca8622'
    }
  }, {
    name: 'Not set',
    label: 'notSet',
    field: 'bpmnVariables',
    value: DATE_VALUES_MAP['Not set'],
    filter: [{
      field: 'bpmnVariables.name',
      op: '=',
      value: 'startDate'
    }, {
      field: 'bpmnVariables.text',
      op: 'is null'
    }],
    itemStyle: {
      color: '#666666'
    }
  }]
}, {
  name: 'Last Update Date',
  field: 'taskStatusLastUpdate',
  options: generateDateOptions('taskStatus.lastUpdate')
}, {
  name: 'Create Date',
  field: 'startDate',
  options: generateDateOptions('startDate')
}, {
  name: 'End Date',
  field: 'endDate',
  options: generateDateOptions('endDate')
}, {
  name: 'Priority',
  field: 'priority',
  group: [{
    field: 'priority',
    alias: 'priority'
  }, {
    field: 'priority',
    alias: 'count',
    aggregator: 'count'
  }],
  options: [..._aboxConfig.PRIORITY_OPTIONS.map(item => ({ ...item,
    name: item.label,
    field: 'priority',
    itemStyle: {
      color: _theme.default.priorityColors[(0, _aboxConfig.getPriorityColor)(item.value)]
    }
  }))]
}, {
  name: 'Involvement',
  field: 'involvement',
  options: [{
    name: 'Assignee',
    label: 'assignee',
    field: 'assignee.id',
    value: 'assignee',
    filter: [{
      field: 'assignee.activitiId',
      op: '=',
      value: null
    }],
    itemStyle: {
      color: '#1d8f8d'
    }
  }, {
    name: 'Owner',
    label: 'owner',
    field: 'owner.id',
    value: 'owner',
    filter: [{
      field: 'owner.activitiId',
      op: '=',
      value: null
    }],
    itemStyle: {
      color: '#ca8622'
    }
  }, {
    name: 'Team Member',
    label: 'teamMember',
    field: 'teamMember.user.id',
    value: 'teamMember',
    filter: [{
      field: 'teamMembers.user.activitiId',
      op: '=',
      value: null
    }],
    itemStyle: {
      color: '#bda29a'
    }
  }]
}, {
  name: 'Assignee',
  field: 'assigneeId',
  group: [{
    field: 'assignee.id',
    alias: 'id'
  }, {
    field: 'assignee.name',
    alias: 'name'
  }, {
    field: 'assignee.login',
    alias: 'login'
  }, {
    field: 'assignee.id',
    alias: 'count',
    aggregator: 'count'
  }],
  options: []
}, {
  name: 'Process Type',
  field: 'processDefinitionName',
  group: [{
    field: 'process.processDefinition.name',
    alias: 'processDefinitionName'
  }, {
    field: 'process.processDefinition.name',
    alias: 'count',
    aggregator: 'count'
  }],
  options: []
}];
exports.widgetGroups = widgetGroups;
const widgetOptions = {
  title: {
    top: 'middle',
    left: 'center',
    text: '',
    textStyle: {
      fontSize: 45
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  series: [{
    name: '',
    type: 'pie',
    radius: ['60%', '70%'],
    avoidLabelOverlap: false,
    label: {
      normal: {
        show: false,
        position: 'outside'
      },
      emphasis: {
        show: true,
        textStyle: {
          fontSize: '20',
          fontWeight: 'bold'
        }
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    data: []
  }]
};
exports.widgetOptions = widgetOptions;