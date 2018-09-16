// @flow
import gql from 'graphql-tag';

export default gql`
  fragment Case on Case {
    id
    surveyId
    toothNumber
    diagnosisAndActionId
    createdAt
  }
`;
