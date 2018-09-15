// @flow
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import type {createStudent, createStudentVariables} from '../../../operation-result-types.flow';
import Student from '../../Fragments/Student';

export default class CreateStudentMutation extends Mutation<createStudent, createStudentVariables> {
  static mutation = gql`
    mutation createStudent($name: String!, $schoolID: String!, $dateOfBirth: String!) {
      createStudent(name: $name, schoolID: $schoolID, dateOfBirth: $dateOfBirth) {
        ...Student
      }
    }
    ${Student}
  `;
}
