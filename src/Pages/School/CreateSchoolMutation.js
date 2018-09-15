// @flow
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import type {createSchool, createSchoolVariables} from '../../../operation-result-types.flow';
import School from '../../Fragments/School';

export default class CreateSchoolMutation extends Mutation<createSchool, createSchoolVariables> {
  static mutation = gql`
    mutation createSchool($name: String!) {
      createSchool(name: $name) {
        ...School
      }
    }
    ${School}
  `;
}
