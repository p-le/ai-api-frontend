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
import { uploadFiles, openWs } from '../../actions/Api';


class Home extends Component {
  constructor() {
    super();
    this.size = {
      min: 0,
      max: Infinity
    };
    this.types = [
      // 'application/vnd.ms-excel',
      // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    this.validFiles = [];
    this.invalidFiles = [];
    this.state = {
      multiple: true,
      isUploading: false,
      isUploadCompleted: false,
      percentCompleted: 0,
      completed: 0
    };

    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
  }
  componentDidMount() {
    const socket = io(`${Config.backend.replace('http', 'ws')}`, {
      path: '/process'
    });
    socket.on('result', (msg) => {
      console.log(JSON.parse(msg));
    });
  }
  onDragOver(e) {
    e.preventDefault();
  }

  async onDrop(e) {
    const { doUploadFiles } = this.props;
    e.preventDefault();
    let files = [];
    const { multiple } = this.state;

    if (e.dataTransfer) {
      files = (multiple) ? await this.toJsArray(e.dataTransfer.files) : [e.dataTransfer.files[0]];
    } else {
      files = await this.toJsArray(e.target.files);
    }

    await files.map((file) => {
      if (this.types.length === 0 || this.types.includes(file.type)) {
        this.validFiles.push(file);
      } else {
        this.invalidFiles.push(file);
      }
    });
    
    if (this.validFiles.length > 0) {
      doUploadFiles(this.validFiles);
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
    const { multiple, isUploading, percentCompleted } = this.state;

    return (
      <div>

        <UploadFiles validFiles={this.validFiles} invalidFiles={this.invalidFiles} />
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
  validFiles: state.api.validFiles,
  invalidFiles: state.api.invalidFiles,
  ws: state.api.ws
});

const mapDispatchToProps = dispatch => ({
  doUploadFiles: files => dispatch(uploadFiles(files)),
  doOpenWs: ws => dispatch(openWs(ws))
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);