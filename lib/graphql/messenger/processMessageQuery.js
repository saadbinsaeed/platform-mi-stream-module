"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
query processMessageQuery($id: String) {
    result: process(id: $id) {
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
       createdBy {
            id
            login
            image
            name
        }
        attachments {
            id
        }

    }
}`;

exports.default = _default;