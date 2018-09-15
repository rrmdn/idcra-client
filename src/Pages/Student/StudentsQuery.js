// @flow
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import type {students, studentsVariables} from '../../../operation-result-types.flow';
import User from '../../Fragments/User';
import PageInfo from '../../Fragments/PageInfo';
import Student from '../../Fragments/Student';

export default class StudentsQuery extends Query<students, studentsVariables> {
  static query = gql`
    query students($first: Int!, $after: String) {
      students(first: $first, after: $after) {
        totalCount
        edges {
          cursor
          node {
            ...Student
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
    ${Student}
    ${PageInfo}
  `;
}
