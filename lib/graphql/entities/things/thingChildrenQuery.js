"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query thingChildrenQuery($filterBy: [JSON]) {
  result: things(filterBy: $filterBy) {
    id
    active
    iconName
    iconColor
    parent {
      id
    }
    thingId
    name
    classes {
      id
      name
      uri
      color
    }
    createdBy {
        name
        id
        image
    }
    createdDate
    modifiedBy {
        name
        id
        image
    }
    modifiedDate
    children {
        id
        parent {
          id
        }
        thingId
        name
        classes {
          uri
        }
        createdBy {
            name
            id
            image
        }
        createdDate
        modifiedBy {
            name
            id
            image
        }
        modifiedDate
    }
  }
}
`;

exports.default = _default;