import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styles from './styles.css';

const Processing = () => (
  <div className={styles.processing} >
    <CircularProgress size={60} thickness={7} />
    <h4>Processing</h4>
  </div>
);

export default Processing;