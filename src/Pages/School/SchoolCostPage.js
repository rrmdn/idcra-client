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
import SchoolCostQuery from './SchoolCostQuery';

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
      <SchoolCostQuery
        query={SchoolCostQuery.query}
        // $FlowFixMe
        variables={{schoolID: this.props.match.params.schoolID}}
      >
        {({data: schoolCostData}) => (
          <Paper className={classes.root}>
            <Toolbar>
              <Typography variant="title" id="tableTitle">
                Cost Breakdown - {schoolCostData && schoolCostData.school ? schoolCostData.school.name : '...'}
              </Typography>
            </Toolbar>
            <List>
              {schoolCostData && schoolCostData.schoolCost ? (
                schoolCostData.schoolCost.map(cost => {
                  return (
                    <ListItem key={cost.description}>
                      <ListItemText primary={cost.description} secondary={cost.cost} />
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
        )}
      </SchoolCostQuery>
    );
  };
}

export default withStyles(styles)(SchoolPage);
