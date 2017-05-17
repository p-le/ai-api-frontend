import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import styles from './styles.css';

const Uploading = ({ percentage }) =>  (
  <div className={styles.uploadProgress}>
    <LinearProgress mode="determinate" value={percentage} />
  </div> 
);

export default Uploading;