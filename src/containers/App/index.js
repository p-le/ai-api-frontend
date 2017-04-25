import React, { Component } from 'react';
import { Route, Switch  } from 'react-router-dom';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as cookies from 'browser-cookies';

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Config from 'Config';

import Home from '../Home';
import History from '../History';
import Nav from '../../components/Nav';
import NoMatch from '../NoMatch';

class App extends Component {

  componentDidMount() {
    const auth = cookies.get('auth');
    const { authenticate } = this.props;
    console.log(Config);
    if(auth) {
      authenticate();
    }
  } 

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/history" component={History} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect()(App);
