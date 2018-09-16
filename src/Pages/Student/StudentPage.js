// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment-timezone';
import debounce from 'debounce';
import SchoolsQuery from '../School/SchoolQuery';
import linkState from 'linkstate';
import StudentsQuery from './StudentsQuery';
import CreateStudentMutation from './CreateStudentMutation';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class StudentPage extends React.Component<
  {},
  {
    activeSchoolId: string,
    name: string,
    dateOfBirth: string,
    searchStudentName: string,
  }
> {
  state = {
    activeSchoolId: '',
    name: '',
    dateOfBirth: '',
    searchStudentName: '',
  };
  render = () => {
    // $FlowFixMe
    const {classes} = this.props;
    const isDateInputError =
      this.state.dateOfBirth.length &&
      !moment(this.state.dateOfBirth, 'DD-MM-YYYY', true).isValid();
    return (
      <SchoolsQuery query={SchoolsQuery.query} variables={{first: 30}}>
        {({data: schoolsData, loading: schoolsLoading, refetch: refetchSchools}) => (
          <StudentsQuery
            skip={!this.state.activeSchoolId}
            query={StudentsQuery.query}
            variables={{
              first: 30,
              schoolID: this.state.activeSchoolId,
              keyword: this.state.searchStudentName,
            }}
          >
            {({data: studentsData, refetch: refetchStudents}) => (
              <div>
                <CreateStudentMutation mutation={CreateStudentMutation.mutation}>
                  {(create, {loading: createStudentLoading}) => (
                    <Paper style={{padding: 15}}>
                      <Typography style={{margin: 10}} variant="title" id="tableTitle">
                        School
                      </Typography>
                      <FormControl style={{minWidth: 200, margin: 10}}>
                        <InputLabel htmlFor="school">School Name</InputLabel>
                        <Select
                          onChange={e => {
                            this.setState({activeSchoolId: e.target.value});
                          }}
                          value={this.state.activeSchoolId}
                          inputProps={{
                            name: 'school',
                            id: 'school',
                          }}
                        >
                          {schoolsLoading ? (
                            <MenuItem value="">
                              <em>Loading schools..</em>
                            </MenuItem>
                          ) : null}
                          {schoolsData && schoolsData.schools && schoolsData.schools.edges
                            ? schoolsData.schools.edges.map(edge => {
                                if (!edge || !edge.node) return null;
                                return (
                                  <MenuItem key={edge.node.id} value={edge.node.id}>
                                    {edge.node.name}
                                  </MenuItem>
                                );
                              })
                            : null}
                        </Select>
                      </FormControl>

                      <Typography style={{margin: 10}} variant="title" id="tableTitle">
                        New student at this School
                      </Typography>
                      <form display={{display: 'flex', flexWrap: 'wrap'}}>
                        <FormControl style={{margin: 10}} disabled={!this.state.activeSchoolId}>
                          <InputLabel htmlFor="student-name">Name</InputLabel>
                          <Input
                            value={this.state.name}
                            id="student-name"
                            onChange={linkState(this, 'name')}
                          />
                        </FormControl>
                        <FormControl
                          style={{margin: 10}}
                          error={isDateInputError}
                          disabled={!this.state.activeSchoolId}
                        >
                          <InputLabel htmlFor="student-dob">Date of Birth</InputLabel>
                          <Input
                            value={this.state.dateOfBirth}
                            id="student-dob"
                            onChange={linkState(this, 'dateOfBirth')}
                          />
                          <FormHelperText>DD-MM-YYYY</FormHelperText>
                        </FormControl>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{marginLeft: 20}}
                          disabled={
                            !this.state.activeSchoolId ||
                            !this.state.name ||
                            !this.state.dateOfBirth ||
                            isDateInputError
                          }
                          onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            create({
                              variables: {
                                name: this.state.name,
                                schoolID: this.state.activeSchoolId,
                                dateOfBirth: moment(this.state.dateOfBirth, 'DD-MM-YYYY').format(
                                  'YYYY-MM-DD'
                                ),
                              },
                            }).then(() => {
                              this.setState({name: '', dateOfBirth: ''});
                              refetchStudents();
                            });
                          }}
                        >
                          {createStudentLoading ? 'Creating...' : 'Create'}
                        </Button>
                      </form>
                    </Paper>
                  )}
                </CreateStudentMutation>

                <Paper className={classes.root}>
                  <Toolbar
                    style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                  >
                    <Typography variant="title" id="tableTitle">
                      Students
                    </Typography>
                    <FormControl disabled={!this.state.activeSchoolId}>
                      <InputLabel htmlFor="search-student-name">Search Student Name</InputLabel>
                      <Input
                        id="search-student-name"
                        onChange={debounce(linkState(this, 'searchStudentName'), 200, true)}
                      />
                    </FormControl>
                  </Toolbar>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(studentsData && studentsData.students && studentsData.students.edges
                        ? studentsData.students.edges
                        : []
                      ).map(edge => {
                        if (!edge || !edge.node) return null;
                        const {node} = edge;
                        return (
                          <TableRow key={edge.cursor}>
                            <TableCell component="th" scope="edge">
                              {node.name}
                            </TableCell>
                            <TableCell>{moment(node.dateOfBirth).format('D MMMM YYYY')}</TableCell>
                            <TableCell>{moment(node.createdAt).format('D MMMM YYYY')}</TableCell>
                            <TableCell>
                              <Link to={`/survey/${node.id}`}>
                                <Button variant="outlined" className={classes.button}>
                                  Survey
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            )}
          </StudentsQuery>
        )}
      </SchoolsQuery>
    );
  };
}

export default withStyles(styles)(StudentPage);
