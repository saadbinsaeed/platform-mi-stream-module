/* @flow */

import gql from 'graphql-tag';

export default gql`
query userAutocompleteQuery($page: Int, $pageSize: Int, $filterBy: [JSON], $orderBy: [JSON]) {
  result: users(page: $page, itemsPerPage: $pageSize, filterBy: $filterBy, orderBy: $orderBy) {
    id
    login
    name
    image
  }
}
`;
