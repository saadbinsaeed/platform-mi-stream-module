"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query processesDefinitionsQuery {
  records: deployedProcessesDefinitions {
    description
    key
    deployedModel {
      id
      version
      name
      modelData(fields: ["icon", "iconColor"])
    }
    application {
      id
      name
      createDate
      createdBy {
        name
        login
        image
      }
      description
      version
      modifiedDate
      modifiedBy {
        name
        login
        image
        lastUpdatedDate
      }
      model(fields: ["icon", "iconColor"])
    }
  }
}
`;

exports.default = _default;