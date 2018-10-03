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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import moment from 'moment-timezone';
import {Value} from 'react-values';
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

type Output = {
  parent: {
    reminder: string[],
    guidance: string[],
    supervision: string[],
  },
  teacher: {
    reminder: string[],
    guidance: string[],
  },
  operator: {
    recurring: string,
    fluoride: string,
    diet: string,
    sealant: string,
    ART: string,
  },
};

const lowOutput: Output = {
  parent: {
    reminder: ['Orang tua mengingatkan agar kontrol ke dokter gigi setiap 6 bulan sekali'],
    guidance: [
      'Orang tua mengajarkan cara menyikat gigi yang benar',
      'Orang tua mengingatkan agar menyikat gigi 2x sehari dengan pasta gigi ber fluoride',
    ],
    supervision: [
      'Orang tua memberikan pengawasan terhadap makanan manis dan lengket yang dikonsumsi sehari - hari',
    ],
  },
  teacher: {
    reminder: ['Guru mengingatkan agar kontrol ke dokter gigi setiap 6 bulan sekali'],
    guidance: [
      'Guru mengajarkan cara menyikat gigi yang benar',
      'Guru mengingatkan agar menyikat gigi 2x sehari dengan pasta gigi ber fluoride',
    ],
  },
  operator: {
    recurring: 'setiap 6-12 bulan',
    fluoride: 'pasta gigi 2x sehari',
    diet: 'pemeliharaan asupan diet',
    sealant: 'fissure sealant dilakukan jika diperlukan',
    ART: 'pengawasan karies baru',
  },
};

const mediumOutput: Output = {
  parent: {
    reminder: ['Orang tua mengingatkan agar kontrol ke dokter gigi setiap 4-6 bulan sekali'],
    guidance: [
      'Orang tua mengajarkan cara menyikat gigi yang benar',
      'Orang tua mengingatkan agar menyikat gigi 2x sehari dengan pasta gigi ber fluoride',
      'Orang tua mengingatkan agar dilakukan perawatan topical aplikasi fluoride',
    ],
    supervision: [
      'Orang tua melakukan diet makanan manis dan lengket yang dikonsumsi sehari- hari',
    ],
  },
  teacher: {
    reminder: ['Guru mengingatkan agar kontrol ke dokter gigi setiap 4-6 bulan sekali'],
    guidance: [
      'Guru mengajarkan cara menyikat gigi yang benar',
      'Guru mengingatkan agar menyikat gigi 2x sehari dengan pasta gigi ber fluoride',
      'Guru mengingatkan agar dilakukan perawatan topical aplikasi fluoride',
    ],
  },
  operator: {
    recurring: 'setiap 4-6 bulan',
    fluoride: 'pasta gigi 2x sehari + Topikal aplikasi',
    diet: 'diet dengan pengawasan',
    sealant: 'fissure sealant dilakukan jika diperlukan',
    ART: 'pengawasan karies baru + restorasi dari kavitas baru',
  },
};

const highOutput: Output = {
  parent: {
    reminder: ['Orang tua mengingatkan agar kontrol ke dokter gigi setiap 3-4 bulan sekali'],
    guidance: [
      'Orang tua mengajarkan cara menyikat gigi yang benar',
      'Orang tua mengingatkan agar menyikat gigi 2x sehari dengan pasta gigi ber fluoride',
      'Orang tua mengingatkan agar dilakukan perawatan topical aplikasi fluoride',
    ],
    supervision: [
      'Orang tua melakukan diet makanan manis dan lengket yang dikonsumsi sehari- hari',
      'Orang tua mengganti konsumsi permen yang manis dengan permen xylitol',
    ],
  },
  teacher: {
    reminder: ['Guru mengingatkan agar kontrol ke dokter gigi setiap 3-4 bulan sekali'],
    guidance: [
      'Guru mengajarkan cara menyikat gigi yang benar',
      'Guru mengingatkan agar menyikat gigi 2x sehari dengan pasta gigi ber fluoride',
      'Guru mengingatkan agar dilakukan perawatan topical aplikasi fluoride',
    ],
  },
  operator: {
    recurring: 'setiap 3-4 bulan',
    fluoride: 'topikal aplikasi + pasta gigi 2x sehari',
    diet: 'diet dengan pengawasan + xylitol',
    sealant: 'direkomendasikan fissure sealant',
    ART: 'pengawasan karies baru + restorasi dari kavitas baru',
  },
};

const outputMap: Map<string, Output> = new Map([
  ['low', lowOutput],
  ['medium', mediumOutput],
  ['high', highOutput],
]);

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
                    let risk: 'low' | 'medium' | 'high' = 'low';
                    if (edge.node.subjectiveScore > 66) risk = 'high';
                    if (edge.node.subjectiveScore > 33 && edge.node.subjectiveScore <= 66)
                      risk = 'medium';
                    const output = outputMap.get(risk);
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
                              if (risk === 'low') return 'green';
                              if (risk === 'medium') return 'orange';
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
                        {output ? (
                          <div style={{padding: 24}}>
                            <Typography variant="headline">Operator's Suggestions</Typography>
                            <ul>
                              {Object.keys(output.operator).map(key => (
                                <li>
                                  <Typography>{key.toUpperCase()}: {output.operator[key]}</Typography>
                                </li>
                              ))}
                            </ul>
                            <Typography variant="headline">Parent's Suggestions</Typography>
                            <Value defaultValue={0}>
                              {({value, set}) => (
                                <div>
                                  <Tabs
                                    value={value}
                                    onChange={(_, index) => {
                                      set(index);
                                    }}
                                    centered
                                    indicatorColor="primary"
                                    textColor="primary"
                                  >
                                    <Tab label="reminder" />
                                    <Tab label="guidance" />
                                    <Tab label="supervision" />
                                  </Tabs>
                                  <div style={{display: 'flex', justifyContent: 'center'}}>
                                    {value === 0 ? (
                                      <ul>
                                        {output.parent.reminder.map(reminder => (
                                          <li key={reminder}>
                                            <Typography>{reminder}</Typography>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : null}
                                    {value === 1 ? (
                                      <ul>
                                        {output.parent.guidance.map(guidance => (
                                          <li key={guidance}>
                                            <Typography>{guidance}</Typography>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : null}
                                    {value === 2 ? (
                                      <ul>
                                        {output.parent.supervision.map(supervision => (
                                          <li key={supervision}>
                                            <Typography>{supervision}</Typography>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : null}
                                  </div>
                                </div>
                              )}
                            </Value>
                            <Typography variant="headline">Teacher's Suggestions</Typography>
                            <Value defaultValue={0}>
                              {({value, set}) => (
                                <div>
                                  <Tabs
                                    value={value}
                                    onChange={(_, index) => {
                                      set(index);
                                    }}
                                    centered
                                    indicatorColor="primary"
                                    textColor="primary"
                                  >
                                    <Tab label="reminder" />
                                    <Tab label="guidance" />
                                  </Tabs>
                                  <div style={{display: 'flex', justifyContent: 'center'}}>
                                    {value === 0 ? (
                                      <ul>
                                        {output.teacher.reminder.map(reminder => (
                                          <li key={reminder}>
                                            <Typography>{reminder}</Typography>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : null}
                                    {value === 1 ? (
                                      <ul>
                                        {output.teacher.guidance.map(guidance => (
                                          <li key={guidance}>
                                            <Typography>{guidance}</Typography>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : null}
                                  </div>
                                </div>
                              )}
                            </Value>
                          </div>
                        ) : null}
                      </Paper>
                    );
                  })
                : null}
              {surveysData && surveysData.surveys && surveysData.surveys.edges ? (
                <Paper>
                  <Toolbar>
                    <Typography variant="title">Caries Risk Progress</Typography>
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
