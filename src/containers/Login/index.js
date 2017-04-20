import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Config from 'Config';

import Popup from '../../utils/Popup';
import { updateEndpoint, getCode } from '../../actions/AuthActions/actions';



class Login extends Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
    this.waitForCredentials = this.waitForCredentials.bind(this);
  }

  handleOnClick() {
    const { updateEndpoint, getCode } = this.props;
    const endpoint = `https://github.com/login/oauth`;
    updateEndpoint(endpoint);

    const popup = window.open(
      `${endpoint}/authorize?client_id=${Config.oauth.github.clientId}`,
      '_blank',
      `${Popup.getFeatures()},${Popup.calcPos(1024, 768)}`);

      this.waitForCredentials(popup)
        .then(credentials => getCode(credentials.split('=')[1]))
        .catch(err => console.log(err));
  }

  waitForCredentials(popup) {
    const { getCode } = this.props;
    return new Promise((resolve, reject) => {
      let credentials;
      /* eslint-disable no-empty */
      try {
        credentials = popup.location.search;
      } catch (err) {}

      if (credentials && credentials.length > 0) {
        popup.close();
        resolve(credentials);
      } else if (popup.closed) {
        reject("Failed");
      } else {
        setTimeout(() => {
          this.waitForCredentials(popup)
            .then(credentials => getCode(credentials.split('=')[1]))
            .catch(err => console.log(err));
        }, 50);
      }
    });
  }

  render() {
    return (
      <div className="oauth_party">
        <i className="fa fa-github fa-3x" aria-hidden="true" onClick={this.handleOnClick} />
        <i className="fa fa-facebook-official fa-3x" aria-hidden="true"onClick={this.handleOnClick} />
        <i className="fa fa-google fa-3x" aria-hidden="true" onClick={this.handleOnClick} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { updateEndpoint, getCode },
  dispatch
);

export default connect(null, mapDispatchToProps)(Login);