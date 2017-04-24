import React, { Component } from 'react';
import { Link, Route, Switch  } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import * as cookies from 'browser-cookies';

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Config from 'Config';

import Login from '../Login';
import Private from '../Private';
import Public from '../Public';
import AuthRoute from '../AuthRoute';
import NoMatch from '../NoMatch';

import { authenticate } from '../../actions/AuthActions/actions';

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
    const { isAuthenticated } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <DropDownMenu >
                <MenuItem value={1} primaryText="All Broadcasts" />
                <MenuItem value={2} primaryText="All Voice" />
                <MenuItem value={3} primaryText="All Text" />
                <MenuItem value={4} primaryText="Complete Voice" />
                <MenuItem value={5} primaryText="Complete Text" />
                <MenuItem value={6} primaryText="Active Voice" />
                <MenuItem value={7} primaryText="Active Text" />
              </DropDownMenu>
            </ToolbarGroup>
          </Toolbar>
          <List>
            <ListItem primaryText="Public" containerElement={<Link to="/public" />} />
            <ListItem primaryText="Private" containerElement={<Link to="/private" />} />
          </List>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/public" component={Public} />
            <AuthRoute path="/private" component={Private} isAuthenticated={isAuthenticated} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => bindActionCreators({ authenticate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
