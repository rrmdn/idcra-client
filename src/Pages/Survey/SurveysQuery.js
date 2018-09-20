// @flow
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import type {surveys, surveysVariables} from '../../../operation-result-types.flow';
import Survey from '../../Fragments/Survey';
import PageInfo from '../../Fragments/PageInfo';

export default class SurveysQuery extends Query<surveys, surveysVariables> {
  static query = gql`
    query surveys($studentID: String!) {
      surveys(first: 10, studentID: $studentID) {
        totalCount
        edges {
          cursor
          node {
            ...Survey
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
    ${Survey}
    ${PageInfo}
  `;
}
