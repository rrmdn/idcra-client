// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom';
import cookie from 'js-cookie';
import logo from './logo.svg';
import './App.css';
import RegisterPage from './Pages/Register/RegisterPage';
import LoginPage from './Pages/Login/LoginPage';
import SchoolPage from './Pages/School/SchoolPage';
import SchoolCostPage from './Pages/School/SchoolCostPage';
import StudentPage from './Pages/Student/StudentPage';
import SurveyPage from './Pages/Survey/SurveyPage';
import SurveysPage from './Pages/Survey/SurveysPage';

const NavigationLink = (props: {
  to: string,
  exact?: boolean,
  children: (active: boolean) => React$Node,
}) => (
  <Route path={props.to} exact={props.exact}>
    {({location, match}) => <Link to={props.to}>{props.children(!!match)}</Link>}
  </Route>
);

const mainListItems = (
  <div>
    <NavigationLink to="/schools">
      {isActive => (
        <ListItem button selected={isActive}>
          <ListItemIcon>
            <Icon>school</Icon>
          </ListItemIcon>
          <ListItemText primary="Schools" />
        </ListItem>
      )}
    </NavigationLink>
    <NavigationLink to="/students">
      {isActive => (
        <ListItem button selected={isActive}>
          <ListItemIcon>
            <Icon>people</Icon>
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
      )}
    </NavigationLink>
    <NavigationLink to="/surveys">
      {isActive => (
        <ListItem button selected={isActive}>
          <ListItemIcon>
            <Icon>format_list_numbered</Icon>
          </ListItemIcon>
          <ListItemText primary="Surveys" />
        </ListItem>
      )}
    </NavigationLink>
    <NavigationLink to="/reports">
      {isActive => (
        <ListItem button selected={isActive}>
          <ListItemIcon>
            <Icon>bar_chart</Icon>
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      )}
    </NavigationLink>
  </div>
);

const Home = () => <p>Hello!</p>;

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      cookie.get('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      )
    }
  />
);

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

class Dashboard extends React.Component<{}, {open: boolean}> {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;

    return (
      <BrowserRouter>
        <React.Fragment>
          <CssBaseline />
          <div className={classes.root}>
            <AppBar
              position="absolute"
              className={classNames(
                classes.appBar,
                cookie.get('token') && this.state.open && classes.appBarShift
              )}
            >
              <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.menuButtonHidden
                  )}
                >
                  <Icon>menu</Icon>
                </IconButton>
                <Typography variant="title" color="inherit" noWrap className={classes.title}>
                  IDCRA
                </Typography>
                <IconButton color="inherit">
                  <Icon>notifications</Icon>
                </IconButton>
              </Toolbar>
            </AppBar>
            {cookie.get('token') ? (
              <Drawer
                variant="permanent"
                classes={{
                  paper: classNames(
                    classes.drawerPaper,
                    !this.state.open && classes.drawerPaperClose
                  ),
                }}
                open={this.state.open}
              >
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <Icon>chevron_left</Icon>
                  </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
              </Drawer>
            ) : null}
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute path="/schools" exact component={SchoolPage} />
                <PrivateRoute path="/schools/:schoolID/cost" exact component={SchoolCostPage} />
                <PrivateRoute path="/students" exact component={StudentPage} />
                <PrivateRoute path="/survey/:studentID" component={SurveyPage} />
                <PrivateRoute path="/surveys/:studentID" component={SurveysPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </Switch>
            </main>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(Dashboard);
