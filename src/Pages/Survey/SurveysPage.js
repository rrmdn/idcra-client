// @flow
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment-timezone';
import SurveysQuery from './SurveysQuery';
import StudentQuery from './StudentQuery';

export default class SurveysPage extends React.Component<{}> {
  render = () => (
    <StudentQuery
      query={StudentQuery.query}
      // $FlowFixMe
      variables={{id: this.props.match.params.studentID}}
    >
      {({data: studentData, loading: studentLoading}) => (
        <SurveysQuery
          query={SurveysQuery.query}
          // $FlowFixMe
          variables={{studentID: this.props.match.params.studentID}}
        >
          {({data: surveysData, loading: surveysLoading}) => (
            <div>
              <Paper>
                <Toolbar>
                  <Typography variant="title">
                    {studentData && studentData.student && studentData.student.name
                      ? studentData.student.name
                      : '...'}{' '}
                    surveys
                  </Typography>
                </Toolbar>
              </Paper>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Created At</TableCell>
                      <TableCell>D</TableCell>
                      <TableCell>M</TableCell>
                      <TableCell>F</TableCell>
                      <TableCell>Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(surveysData && surveysData.surveys && surveysData.surveys.edges
                      ? surveysData.surveys.edges
                      : []
                    ).map(edge => {
                      if (!edge || !edge.node) return null;
                      return (
                        <TableRow key={edge.cursor}>
                          <TableCell>{moment(edge.node.createdAt).format('D MMMM YYYY')}</TableCell>
                          <TableCell>{edge.node.upperD}</TableCell>
                          <TableCell>{edge.node.upperM}</TableCell>
                          <TableCell>{edge.node.upperF}</TableCell>
                          <TableCell>{edge.node.subjectiveScore}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </div>
          )}
        </SurveysQuery>
      )}
    </StudentQuery>
  );
}
