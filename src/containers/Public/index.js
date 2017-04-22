import React, { Component } from 'react';
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
      validFiles: [],
      invalidFiles: []
    };
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
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

  toJsArray(array) {
    return Array.prototype.slice.call(array);
  }

  render() {
    const { multiple, validFiles, invalidFiles } = this.state;
    console.log(validFiles);
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
      </div>
    );
  }
}

export default Public;