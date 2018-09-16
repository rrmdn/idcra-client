// @flow
import gql from 'graphql-tag';
import Case from './Case';

export default gql`
  fragment Survey on Survey {
    id
    studentId
    surveyorId
    date
    s1q1
    s1q2
    s1q3
    s1q4
    s1q5
    s1q6
    s1q7
    s2q1
    s2q2
    s2q3
    s2q4
    s2q5
    s2q6
    s2q7
    s2q8
    s2q9
    lowerD
    lowerE
    lowerF
    upperD
    upperM
    upperF
    subjectiveScore
    createdAt
    cases {
      ...Case
    }
  }
  ${Case}
`;
