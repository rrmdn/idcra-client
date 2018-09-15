// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit" style={{flexGrow: 1}}>
          IDCRA
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
