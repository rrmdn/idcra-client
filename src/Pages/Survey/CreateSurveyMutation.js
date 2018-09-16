// @flow
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import type {createSurvey, createSurveyVariables} from '../../../operation-result-types.flow';
import Survey from '../../Fragments/Survey';

export default class CreateSurveyMutation extends Mutation<createSurvey, createSurveyVariables> {
  static mutation = gql`
    mutation createSurvey($survey: SurveyInput!) {
      createSurvey(survey: $survey) {
        ...Survey
      }
    }
    ${Survey}
  `;
}
