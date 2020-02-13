"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query designerFormListQuery($startIndex: Int, $stopIndex: Int, $filterBy: [JSON], $orderBy: [JSON]) {
    count: count(entity: "formDefinition", filterBy: $filterBy)
    records: formDefinitions(startIndex: $startIndex, stopIndex: $stopIndex, filterBy: $filterBy, orderBy: $orderBy) {
        id
        name
        description
        version
        modified
        created
        createdBy {
            id
            name
        }
        modifiedBy {
            id
            name
        }
        share {
            id
            permission
            user{
              id
              name
              login
            }
        }
  }
}
`;

exports.default = _default;