// @flow
import gql from 'graphql-tag';

export default gql`
  fragment DiagnosisAndAction on DiagnosisAndAction {
    id
    diagnosis
    action
    createdAt
  }
`;
