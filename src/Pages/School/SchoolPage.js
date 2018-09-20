// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
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
                        refetchSchools();
                      });
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
              <List>
                {schoolsData &&
                schoolsData.schools &&
                schoolsData.schools.edges &&
                schoolsData.schools.edges.length ? (
                  schoolsData.schools.edges.map(edge => {
                    if (!edge || !edge.node) return null;
                    const {node} = edge;
                    return (
                      <ListItem>
                        <ListItemText
                          primary={node.name}
                          secondary={moment(node.createdAt).format('D MMMM YYYY')}
                        />
                        <ListItemSecondaryAction>
                          <Link to={`/schools/${node.id}/cost`}>
                            <IconButton aria-label="Take Survey">
                              <Icon>monetization_on</Icon>
                            </IconButton>
                          </Link>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })
                ) : (
                  <ListItem>
                    <ListItemText primary={'There is no school'} />
                  </ListItem>
                )}
              </List>
            </Paper>
          </div>
        )}
      </SchoolsQuery>
    );
  };
}

export default withStyles(styles)(SchoolPage);
