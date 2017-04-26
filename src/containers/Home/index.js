import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import io from 'socket.io-client';
/*eslint-disable */
import Config from 'Config';
/*eslint-enable */

import styles from './styles.css';
import UploadZone from '../../components/UploadZone';
import UploadFiles from '../../components/UploadFiles';
import { uploadFiles, checkValidFiles, checkInvalidFiles, processDone } from '../../actions/Api';


class Home extends Component {
  constructor() {
    super();
    this.size = {
      min: 0,
      max: Infinity
    };
    this.state = {
      multiple: true,
    };

    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
  }
  componentDidMount() {
    const { onProcessDone } = this.props;
    const socket = io(`${Config.backend.replace('http', 'ws')}`, {
      path: '/process'
    });
    socket.on('result', (data) => {
      console.log(data);
      onProcessDone(JSON.parse(data));
    });
  }
  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    const { doUploadFiles, doCheckInvalidFiles, doCheckValidFiles, allowedTypes } = this.props;
    e.preventDefault();

    let files = [];
    const validFiles = [];
    const invalidFiles = [];

    const { multiple } = this.state;

    if (e.dataTransfer) {
      files = (multiple) ? this.toJsArray(e.dataTransfer.files) : [e.dataTransfer.files[0]];
    } else {
      files = this.toJsArray(e.target.files);
    }

    files.map((file) => {
      if (allowedTypes.length === 0 || allowedTypes.includes(file.type)) {
        validFiles.push(file);
      } else {
       invalidFiles.push(file);
      }
    });
    
    if (validFiles.length > 0) {
      console.log(validFiles);
      doCheckValidFiles(validFiles);
      doUploadFiles(validFiles);
    }
    if (invalidFiles.length > 0) {
      doCheckInvalidFiles(invalidFiles);
    }
  }

  updateProgress(e) {
    this.setState({
      percentCompleted: Math.round((e.loaded * 100) / e.total)
    });
  }

  toJsArray(array) {
    return Array.prototype.slice.call(array);
  }

  render() {
    const { multiple } = this.state;
    const { isUploading, percentCompleted, validFiles, invalidFiles } = this.props;

    return (
      <div>
        <UploadFiles validFiles={validFiles} invalidFiles={invalidFiles} />
        {isUploading ? 
          <div className={styles.uploadProgress}>
            <LinearProgress mode="determinate" value={percentCompleted} />
          </div> :
          <div className={styles.uploadZone}>
            <UploadZone 
              multiple={multiple}
              onDrop={this.onDrop} 
              onDragOver={this.onDragOver}
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state =>  ({
  allowedTypes: state.api.allowedTypes,
  validFiles: state.api.validFiles,
  invalidFiles: state.api.invalidFiles,
  isUploading: state.api.isUploading,
  percentCompleted: state.api.percentCompleted,
  ws: state.api.ws
});

const mapDispatchToProps = dispatch => ({
  doUploadFiles: files => dispatch(uploadFiles(files)),
  doCheckValidFiles: files => dispatch(checkValidFiles(files)),
  doCheckInvalidFiles: files => dispatch(checkInvalidFiles(files)),
  onProcessDone: file => dispatch(processDone(file))
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);