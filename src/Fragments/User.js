// @flow
import gql from 'graphql-tag';

export default gql`
  fragment User on User {
    id
    email
    password
    ipAddress
    createdAt
    roles {
      id
      name
    }
  }
`;
