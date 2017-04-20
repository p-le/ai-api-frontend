import React, { Component } from 'react';
import UploadZone from '../../components/UploadZone';

class Upload extends Component {
  constructor () {
    super();
    this.state = {
      isFileDialogActive: false
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    console.log(event);
  }

  render() {
    return (
      <UploadZone name="Phu" />
    );
  }
}

export default Upload;