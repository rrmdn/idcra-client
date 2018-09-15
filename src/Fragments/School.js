// @flow
import gql from 'graphql-tag';
import Student from './Student';

export default gql`
  fragment School on School {
    id
    name
    students {
      ...Student
    }
    createdAt
  }
  ${Student}
`;
