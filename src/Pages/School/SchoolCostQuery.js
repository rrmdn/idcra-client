// @flow
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import type {schoolCost, schoolCostVariables} from '../../../operation-result-types.flow';

export default class SchoolCostQuery extends Query<schoolCost, schoolCostVariables> {
  static query = gql`
    query schoolCost($schoolID: String!) {
      schoolCost: costBreakdownBySchoolAndDateRange(
        schoolID: $schoolID
        startDate: "08-08-2018"
        endDate: "08-08-2019"
      ) {
        description
        cost
      }
      school(id: $schoolID) {
        id
        name
      }
    }
  `;
}
