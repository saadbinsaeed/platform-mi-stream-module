"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query userByReferenceQuery($reference: UserReferenceInput!) {
  result: userByReference(reference: $reference) {
    id
    login
    apps
    domain
    language
    partyId
    image
    uri
    role
    activitiId
    description
    createdDate
    name
    lastUpdatedDate
    active
    groups {
      id
      name
    }
    relations {
      id
    }
    createdBy {
      id
      name
    }
    person {
      id
    }
  }
}
`;

exports.default = _default;