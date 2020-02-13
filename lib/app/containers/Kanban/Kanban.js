"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactTrello = _interopRequireDefault(require("react-trello"));

var _ContentArea = _interopRequireDefault(require("app/components/molecules/PageContent/ContentArea"));

var _PageTemplate = _interopRequireDefault(require("app/components/templates/PageTemplate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const data = {
  lanes: [{
    id: 'lane1',
    title: 'Planned Tasks',
    label: '2/2',
    cards: [{
      id: 'Card1',
      title: 'Write Blog',
      description: 'Can AI make memes',
      label: '30 mins'
    }, {
      id: 'Card2',
      title: 'Pay Rent',
      description: 'Transfer via NEFT',
      label: '5 mins',
      metadata: {
        sha: 'be312a1'
      }
    }]
  }, {
    id: 'lane2',
    title: 'Completed',
    label: '0/0',
    cards: []
  }]
};
/**
 * Sample kanban
 */

class Kanban extends _react.PureComponent {
  render() {
    return _react.default.createElement(_PageTemplate.default, {
      title: "Kanban"
    }, _react.default.createElement(_ContentArea.default, null, _react.default.createElement(_reactTrello.default, {
      data: data
    })));
  }

}

var _default = Kanban;
exports.default = _default;