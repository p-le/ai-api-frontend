import React, { Component } from 'react';
import styles from './style.css';

class UploadZone extends Component {
  constructor(props) {
    super(props);
    this.fileInput = null;
    this.onClick = this.onClick.bind(this);
  }

  // eslint-disable-next-line no-unused-vars
  onClick(event) {
    this.fileInput.click();
  }

  render() {
    const { multiple, onDrop, onDragOver} = this.props;
    
    return (
      <div 
        className={styles.upload} 
        onClick={this.onClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        File Upload
        <input 
          type="file"
          className={styles.hidden}
          ref={(input) => { this.fileInput = input; }}
          onChange={onDrop}
          multiple={multiple}
        />
      </div>
    );
  }
}

export default UploadZone;