import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import axios from 'axios';

import styles from './styles.css';
import UploadZone from '../../components/UploadZone';
import UploadFiles from '../../components/UploadFiles';

class Public extends Component {
  constructor() {
    super();
    this.size = {
      min: 0,
      max: Infinity
    };
    this.types = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    this.state = {
      multiple: true,
      isUploading: false,
      isUploadCompleted: false,
      percentCompleted: 0,
      completed: 0,
      validFiles: [],
      invalidFiles: []
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

    const validFiles = [];
    const invalidFiles = [];

    files.map((file) => {
      if (this.types.includes(file.type)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });

    this.setState({
      validFiles,
      invalidFiles
    });

    if (validFiles.length > 0) {
      this.uploadFiles();
    }
  }

  updateProgress(e) {
    console.log(e.loaded, e.total);
    console.log(Math.round((e.loaded * 100) / e.total));
    this.setState({
      percentCompleted: Math.round((e.loaded * 100) / e.total)
    });
  }

  uploadFiles() {
    const { validFiles } = this.state;
    const data = new FormData();
    const config = {
      onUploadProgress: this.updateProgress
    };

    validFiles.map(file => data.append('file[]', file));
    this.setState({
      isUploading: true
    });
    axios.post('http://localhost:2712/upload', data, config)
      .then((res) => {
        console.log(res.status);
        this.setState({
          isUploading: false
        });
      })
      .catch(err => console.log(err));
  }

  toJsArray(array) {
    return Array.prototype.slice.call(array);
  }

  render() {
    const { multiple, validFiles, invalidFiles, isUploading, percentCompleted } = this.state;

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

export default Public;