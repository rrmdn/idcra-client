// @flow
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import type {schools, schoolsVariables} from '../../../operation-result-types.flow';
import User from '../../Fragments/User';
import School from '../../Fragments/School';
import PageInfo from '../../Fragments/PageInfo';

export default class SchoolsQuery extends Query<schools, schoolsVariables> {
  static query = gql`
    query schools($first: Int!, $after: String) {
      schools(first: $first, after: $after) {
        totalCount
        edges {
          cursor
          node {
            ...School
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
    ${School}
    ${PageInfo}
  `;
}
