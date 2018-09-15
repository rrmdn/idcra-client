// @flow
import gql from 'graphql-tag';

export default gql`
  fragment PageInfo on PageInfo {
    startCursor
    endCursor
    hasNextPage
  }
`;
