"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stringTypes = ['task', 'process'];

var _default = ({
  type,
  id
}) => {
  const entityId = stringTypes.includes(type) ? JSON.stringify(String(id)) : Number(id); // Because tasks and processes require id to be in string and others require it to be in number

  return _graphqlTag.default`
        query entityDataQueryBuilder {
            result: ${type}(id: ${entityId}){
                id
            }
        }
    `;
};

exports.default = _default;