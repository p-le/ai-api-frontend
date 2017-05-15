import React, { Component } from 'react';
import { connect } from 'react-redux';

/*eslint-disable */
import Config from 'Config';
/*eslint-enable */

import LinearProgress from 'material-ui/LinearProgress';

import styles from './styles.css';
import UploadZone from '../../components/UploadZone';
import UploadFiles from '../../components/UploadFiles';
// import UploadResult from '../../components/UploadResult';
import { uploadFiles, checkValidFiles, checkInvalidFiles} from '../../actions/Api';


class Home extends Component {
  constructor() {
    super();
    this.size = {
      min: 0,
      max: Infinity
    };
    this.state = {
      multiple: false,
    };

    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
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
      doCheckValidFiles(validFiles);
      doUploadFiles(validFiles);
    }
    if (invalidFiles.length > 0) {
      doCheckInvalidFiles(invalidFiles);
    }
  }

  toJsArray(array) {
    return Array.prototype.slice.call(array);
  }

  render() {
    const { multiple } = this.state;
    const { isUploading, percentCompleted, validFiles, invalidFiles, origin, result } = this.props;
    console.log(origin, result);
    return (
      <div>
        <div className={styles.uploadList}>
          <UploadFiles validFiles={validFiles} invalidFiles={invalidFiles} />
        </div>
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
  origin: state.api.origin,
  result: state.api.result
});

const mapDispatchToProps = dispatch => ({
  doUploadFiles: files => dispatch(uploadFiles(files)),
  doCheckValidFiles: files => dispatch(checkValidFiles(files)),
  doCheckInvalidFiles: files => dispatch(checkInvalidFiles(files))
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);