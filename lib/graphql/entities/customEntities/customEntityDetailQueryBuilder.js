"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = id => _graphqlTag.default`
query customEntityDetailQuery {
  customEntity: customEntity(id: ${id}) {
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
    iconName
    iconColor
    _permissions
    _summary
    _structure
  }
  recentAttachments: fileCustomEntities(
    page: 1,
    itemsPerPage: 10,
    filterBy: [{ field: "customEntity.id", op: "=", value: ${id}}],
    orderBy: [{ field: "createdDate", direction: "asc" }]
  ) {
    url
    name
  }
}
`;

exports.default = _default;