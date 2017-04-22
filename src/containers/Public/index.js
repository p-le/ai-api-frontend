import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
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

    this.setState({
      validFiles: files.filter(file => this.types.includes(file.type)),
      invalidFiles: files.filter(file => !this.types.includes(file.type))
    });
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
        <div className={styles.uploadZone}>
          <UploadZone 
            multiple={multiple}
            onDrop={this.onDrop} 
            onDragOver={this.onDragOver}
          />
        </div>
        <UploadFiles validFiles={validFiles} invalidFiles={invalidFiles} />
        <FlatButton icon={<FileFileUpload />} onClick={this.uploadFiles} />
        
        {isUploading && 
          <div className={styles.uploadProgress}>
            <LinearProgress mode="determinate" value={percentCompleted} />
          </div>
        }
      </div>
    );
  }
}

export default Public;