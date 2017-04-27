import React, { Component } from 'react';
import { connect } from 'react-redux';

import FileList from '../../components/FileList';

import styles from './styles.css';
import { fetchHistory } from '../../actions/History';

class History extends Component {
  componentDidMount() {
    const { doFetchHistory } = this.props;
    doFetchHistory();
  }

  render() {
    const { files } = this.props;
    return (
      <div className={styles.history}>
        <FileList files={files} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  files: state.history.files
});

const mapDispatchToProps = dispatch => ({
  doFetchHistory: () => dispatch(fetchHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(History);