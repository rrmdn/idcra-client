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
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LabelList,
  Label,
} from 'recharts';
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
              <Paper style={{marginBottom: 8}}>
                <Toolbar>
                  <Typography variant="title">
                    {studentData && studentData.student && studentData.student.name
                      ? studentData.student.name
                      : '...'}{' '}
                    surveys
                  </Typography>
                </Toolbar>
              </Paper>
              {surveysData && surveysData.surveys && surveysData.surveys.edges
                ? surveysData.surveys.edges.map(edge => {
                    if (!edge || !edge.node) return null;
                    return (
                      <Paper key={edge.cursor} style={{marginBottom: 8}}>
                        <Toolbar>
                          <Typography variant="title">
                            {moment(edge.node.createdAt).format('D MMMM YYYY')}
                          </Typography>
                        </Toolbar>
                        <BarChart
                          width={280}
                          height={280}
                          data={[
                            {
                              name: 'Risk',
                              value: edge.node.subjectiveScore,
                              label: `${edge.node.subjectiveScore}%`,
                            },
                          ]}
                        >
                          <XAxis dataKey="name">
                            <Label
                              value="Subjective Caries Assessment"
                              offset={-2}
                              position="insideBottom"
                            />
                          </XAxis>
                          <YAxis
                            type="number"
                            unit="%"
                            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                          />
                          <Tooltip />
                          <Bar
                            dataKey="value"
                            fill={(() => {
                              if (edge.node.subjectiveScore <= 33) return 'green';
                              if (edge.node.subjectiveScore > 33 && edge.node.subjectiveScore <= 66)
                                return 'orange';
                              return 'red';
                            })()}
                          >
                            <LabelList dataKey="label" position="top" />
                          </Bar>
                        </BarChart>
                        <br />
                        <BarChart
                          width={280}
                          height={280}
                          data={[
                            {
                              name: 'D',
                              value: edge.node.upperD,
                            },
                            {
                              name: 'M',
                              value: edge.node.upperM,
                            },
                            {
                              name: 'F',
                              value: edge.node.upperF,
                            },
                          ]}
                        >
                          <XAxis dataKey="name">
                            <Label
                              value="Objective Caries Assessment"
                              offset={-2}
                              position="insideBottom"
                            />
                          </XAxis>
                          <YAxis type="number" />
                          <Tooltip />
                          <Bar dataKey="value" fill="red">
                            <LabelList position="top" />
                          </Bar>
                        </BarChart>
                        <br />
                      </Paper>
                    );
                  })
                : null}
              {surveysData && surveysData.surveys && surveysData.surveys.edges ? (
                <Paper>
                  <Toolbar>
                    <Typography variant="title">
                      Caries Risk Progress
                    </Typography>
                  </Toolbar>
                  <LineChart
                    width={280}
                    height={280}
                    data={surveysData.surveys.edges.map(edge => ({
                      name: moment(edge.node.createdAt).format('D-MM-YYYY'),
                      value: edge.node.subjectiveScore,
                    }))}
                  >
                    <XAxis dataKey="name">
                      <Label value="Date" offset={-2} position="insideBottom" />
                    </XAxis>
                    <YAxis
                      type="number"
                      unit="%"
                      ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    />
                    <Tooltip />
                    <Line dataKey="value" fill="red">
                      <LabelList position="top" />
                    </Line>
                  </LineChart>
                  <br />
                </Paper>
              ) : null}
            </div>
          )}
        </SurveysQuery>
      )}
    </StudentQuery>
  );
}
