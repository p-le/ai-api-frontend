import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import axios from 'axios';
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Config from 'Config';

import styles from './styles.css';
import UploadZone from '../../components/UploadZone';
import UploadFiles from '../../components/UploadFiles';



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
    this.uploadFiles = this.uploadFiles.bind(this);
    this.updateProgress = this.updateProgress.bind(this);

  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    e.preventDefault();
    let files = [];
    const { multiple } = this.state;

    if (e.dataTransfer) {
      files = (multiple) ? this.toJsArray(e.dataTransfer.files) : [e.dataTransfer.files[0]];
    } else {
      files = this.toJsArray(e.target.files);
    }

    files.map((file) => {
      if (this.types.length === 0 || this.types.includes(file.type)) {
        this.validFiles.push(file);
      } else {
        this.invalidFiles.push(file);
      }
    });

    if (this.validFiles.length > 0) {
      this.uploadFiles();
    }
  }

  updateProgress(e) {
    this.setState({
      percentCompleted: Math.round((e.loaded * 100) / e.total)
    });
  }

  uploadFiles() {
    const data = new FormData();
    const config = {
      onUploadProgress: this.updateProgress
    };

    this.validFiles.map(file => data.append('file[]', file));
    console.log(this.validFiles);
    console.log(data);
    this.setState({
      isUploading: true
    });
    axios.post(`${Config.backend}/upload`, data, config)
      .then((res) => {
        console.log(res.status);
        this.setState({
          isUploading: false
        });
        this.validFiles = [];
        this.invalidFiles = [];
      })
      .catch(err => console.log(err));
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

export default Home;