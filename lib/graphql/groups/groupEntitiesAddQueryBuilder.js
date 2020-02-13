"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  entity,
  countType
}) => {
  const isClasses = entity !== 'processDefinitionEntities' ? 'active classes { id name uri color }' : '';
  return _graphqlTag.default`
        query groupsEntitiesAddQuery($page: Int, $pageSize: Int, $where: [JSON], $excludeBy: [JSON], $orderBy: [JSON], $countMax: Int) {
            count: count(entity: "${countType}", filterBy: $where, max: $countMax)
            records: ${entity}(page: $page, itemsPerPage: $pageSize, filterBy: $where, excludeBy: $excludeBy, orderBy: $orderBy) {
                id
                name
                ${isClasses}
            }
        }
    `;
};

exports.default = _default;