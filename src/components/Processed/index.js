import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionGetApp from 'material-ui/svg-icons/action/get-app';
import styles from './styles.css';

const Processed = ({ origin, result }) => (
  <div className={styles.processResult}>
    <RaisedButton label="Data" primary={true} href={origin} icon={<ActionGetApp />} className={styles.processDownload} />
    <RaisedButton label="Result" secondary={true} href={result} icon={<ActionGetApp />} className={styles.processDownload} />
  </div>
);

export default Processed;