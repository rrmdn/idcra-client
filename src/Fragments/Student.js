// @flow
import gql from 'graphql-tag';

export default gql`
  fragment Student on Student {
    id
    name
    dateOfBirth
    schoolId
    createdAt
  }
`;
