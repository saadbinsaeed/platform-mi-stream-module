"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const thingQueryBuilder = id => _graphqlTag.default`
query thingQuery($id: Int) {
  thing:thing(id: $id) {
    id
    name
    image
    description
    dataOwner {
      id
      login
      name
    }
    classes{
      id
      uri
      name
      color
      formDefinitions
    }
    organisation {
      id
      name
    }
    parent {
      id
      name
    }
    locationInfo
    active
    enableGis
    createdBy {
      name
      image
      id
    }
    createdDate
    modifiedBy {
      name
      image
      id
    }
    modifiedDate
    thingId
    iconName
    iconColor
    _permissions
    _summary
    _structure
  }
  recentAttachments: fileThings(
    page: 1,
    itemsPerPage: 10,
    filterBy: [{ field: "thing.id", op: "=", value: ${id} }],
    orderBy: [ { field: "createdDate", direction: "asc" } ]
  ) {
    url
    name
  }
}
`;

var _default = thingQueryBuilder;
exports.default = _default;