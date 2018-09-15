// @flow

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import linkState from 'linkstate';
import RegisterMutation from './RegisterMutation';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class RegisterPage extends Component<
  {
    classes: any,
  },
  {
    email: ?string,
    password: ?string,
  }
> {
  state = {
    email: null,
    password: null,
  };
  render = () => (
    <RegisterMutation mutation={RegisterMutation.mutation}>
      {(register, {data, loading}) => (
        <React.Fragment>
          <CssBaseline />
          <main className={this.props.classes.layout}>
            <Paper className={this.props.classes.paper}>
              <Avatar className={this.props.classes.avatar}>
                <Icon>lock</Icon>
              </Avatar>
              <Typography variant="headline">Register</Typography>
              <form className={this.props.classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input onChange={linkState(this, 'email')} id="email" name="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    onChange={linkState(this, 'password')}
                    name="password"
                    type="password"
                    id="password"
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="raised"
                  color="primary"
                  disabled={this.state.email === '' || this.state.password === ''}
                  className={this.props.classes.submit}
                  onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    if (this.state.email && this.state.password) {
                      register({
                        variables: {
                          email: this.state.email,
                          password: this.state.password,
                        },
                      }).then(() => {
                        this.props.history.push('/login');
                      });
                    }
                  }}
                >
                  {loading ? 'Registering..' : 'Register'}
                </Button>
              </form>
            </Paper>
          </main>
        </React.Fragment>
      )}
    </RegisterMutation>
  );
}
export default withRouter(withStyles(styles)(RegisterPage));
