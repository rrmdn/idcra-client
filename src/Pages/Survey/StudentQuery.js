// @flow
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import type {student, studentVariables} from '../../../operation-result-types.flow';
import Student from '../../Fragments/Student';

export default class StudentQuery extends Query<student, studentVariables> {
  static query = gql`
    query student($id: String!) {
      student(id: $id) {
        ...Student
      }
    }
    ${Student}
  `;
}
