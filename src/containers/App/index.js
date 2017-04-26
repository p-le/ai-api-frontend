import React, { Component } from 'react';
import { Route, Switch  } from 'react-router-dom';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from '../Home';
import History from '../History';
import Nav from '../../components/Nav';
import NoMatch from '../NoMatch';

class App extends Component {

  componentDidMount() {
    console.log('');
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
