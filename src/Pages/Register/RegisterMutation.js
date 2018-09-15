// @flow
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import type {createUser, createUserVariables} from '../../../operation-result-types.flow';
import User from '../../Fragments/User';

export default class RegisterMutation extends Mutation<createUser, createUserVariables> {
  static mutation = gql`
    mutation createUser($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        ...User
      }
    }
    ${User}
  `;
}
