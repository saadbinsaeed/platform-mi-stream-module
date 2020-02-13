"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
    mutation updateClassificationMutation($classification: ClassificationUpdateInput!) {
        result: updateClassification(record: $classification) {
            id
            uri
            name
            dataOwner {
                id
                name
                login
            }
            abstract
            active
            color
            applicableOn
            parents {
                id
                uri
            }
            createdBy {
                name
                image
                id
            }
            createdDate
            modifiedDate
            modifiedBy {
                name
                image
                id
            }
            formDefinitions
        }
    }
`;

exports.default = _default;