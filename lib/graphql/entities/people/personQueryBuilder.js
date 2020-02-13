"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const personQueryBuilder = id => _graphqlTag.default`
query personQuery($id: Int) {
    person: person(id: $id ) {
        id
        name
        modifiedDate
        createdDate
        partyId
        iconName
        iconColor
        image
        dateOfBirth
        active
        enableGis
        description
        contactInfo
        locationInfo
        _summary
        _permissions
        user {
            id
        }
        dataOwner {
            id
            login
            name
        }
        createdBy {
            id
            name
            image
        }
        modifiedBy {
            id
            name
            image
        }
        classes {
            id
            uri
            name
            color
            formDefinitions
            children {
                id
                uri
                name
                color
                formDefinitions
            }
        }
        _structure
    }
    recentAttachments: filePersons(
        page: 1,
        itemsPerPage: 10,
        filterBy: [{ field: "person.id", op: "=", value: ${id}  }],
        orderBy: [ { field: "createdDate", direction: "asc" } ]
    ) {
        url
        name
    }
}
`;

var _default = personQueryBuilder;
exports.default = _default;