// @flow
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import type {
  diagnosisAndActions,
  diagnosisAndActionsVariables,
} from '../../../operation-result-types.flow';
import PageInfo from '../../Fragments/PageInfo';
import DiagnosisAndAction from '../../Fragments/DiagnosisAndAction';

export default class DiagnosisAndActionsQuery extends Query<
  diagnosisAndActions,
  diagnosisAndActionsVariables
> {
  static query = gql`
    query diagnosisAndActions($first: Int!, $after: String) {
      diagnosisAndActions(first: $first, after: $after) {
        totalCount
        edges {
          cursor
          node {
            ...DiagnosisAndAction
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
    ${DiagnosisAndAction}
    ${PageInfo}
  `;
}
