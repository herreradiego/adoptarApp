import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchForm from './SearchForm'
import Search from './Search'

/*Components*/
import Home from './Home' 

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/SearchForm" component={SearchForm}/>
        <Route exact path="/search" component={Search}/>
      </Switch>
      </Router>
    );
  }
}

export default App;


