"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query taskMessageQuery($id: String) {
    result: task(id: $id) {
        id
        name
        comments {
            id
            createDate
            message
            createdBy {
                id
                login
                image
                name
            }
       }
       teamMembers {
         id
         type
         createdDate
         user {
           id
           name
           login
           image
         }
         group {
           id
           name
           users {
             id
             name
             image
             login
             active
           }
         }
       }
       owner {
          id
          login
          name
          image
      }
      assignee {
          id
          login
          name
          image
      }
      _attachmentsCount
      _childrenCount
    }
}`;

exports.default = _default;