// @flow
import React, {SyntheticEvent} from 'react';
import PropTypes from 'prop-types';
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
import moment from 'moment-timezone';
import SchoolsQuery from './SchoolQuery';
import linkState from 'linkstate';
import CreateSchoolMutation from './CreateSchoolMutation';

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

class SchoolPage extends React.Component<
  {},
  {
    newSchoolName: string,
  }
> {
  state = {
    newSchoolName: '',
  };
  render = () => {
    // $FlowFixMe
    const {classes} = this.props;
    return (
      <SchoolsQuery query={SchoolsQuery.query} variables={{first: 30}}>
        {({data: schoolsData, loading: schoolsLoading, refetch: refetchSchools}) => (
          <div>
            <CreateSchoolMutation mutation={CreateSchoolMutation.mutation}>
              {(create, {loading: creatingSchool}) => (
                <Paper style={{padding: 20}}>
                  <FormControl>
                    <InputLabel htmlFor="name-simple">New School Name</InputLabel>
                    <Input id="name-simple" onChange={linkState(this, 'newSchoolName')} />
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{marginLeft: 20}}
                    disabled={this.state.newSchoolName.length === 0}
                    onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      create({variables: {name: this.state.newSchoolName}}).then(() => {
                        this.setState({newSchoolName: ''});
                        refetchSchools()
                      })
                    }}
                  >
                    {creatingSchool ? 'Creating...' : 'Create'}
                  </Button>
                </Paper>
              )}
            </CreateSchoolMutation>

            <Paper className={classes.root}>
              <Toolbar>
                <Typography variant="title" id="tableTitle">
                  Schools
                </Typography>
              </Toolbar>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>School Name</TableCell>
                    <TableCell>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(schoolsData && schoolsData.schools && schoolsData.schools.edges
                    ? schoolsData.schools.edges
                    : []
                  ).map(edge => {
                    if (!edge || !edge.node) return null;
                    return (
                      <TableRow key={edge.cursor}>
                        <TableCell component="th" scope="edge">
                          {edge.node.name}
                        </TableCell>
                        <TableCell>{moment(edge.node.createdAt).format('D MMMM YYYY')}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        )}
      </SchoolsQuery>
    );
  };
}

export default withStyles(styles)(SchoolPage);
