"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query organisationChildrenQuery($filterBy: [JSON]) {
  result: organisations(filterBy: $filterBy) {
    id
    active
    iconName
    iconColor
    parent {
      id
    }
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