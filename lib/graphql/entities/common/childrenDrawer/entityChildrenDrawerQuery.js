"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query entityChildrenDrawerQuery($id: Int, $filterBy: [JSON!]) {
    entity(id: $id) {
        id
        name
        image
        parent {
            id
        }
    }
    entities(filterBy: $filterBy) {
        id
        name
        image
        modifiedDate
        classes {
            id
            name
            uri
            color
        }
    }
}
`;

exports.default = _default;