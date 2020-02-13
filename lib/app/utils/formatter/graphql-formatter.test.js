"use strict";

var _graphqlFormatter = require("./graphql-formatter");

describe('GraphQL Formatter', () => {
  test('formatArray', () => {
    expect((0, _graphqlFormatter.formatArray)(null)).toEqual('[]');
    expect((0, _graphqlFormatter.formatArray)(undefined)).toEqual('[]');
    expect((0, _graphqlFormatter.formatArray)([])).toEqual('[]');
    expect((0, _graphqlFormatter.formatArray)([{
      name: 'endDate',
      op: 'is null'
    }])).toEqual('[{name: "endDate", op: "is null"}]');
    expect((0, _graphqlFormatter.formatArray)([{
      name: 'createDate',
      direction: 'desc'
    }])).toEqual('[{name: "createDate", direction: "desc"}]');
  });
});