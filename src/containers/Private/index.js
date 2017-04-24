import React from 'react';
import styles from './public.m.css';

const Private = ({ match }) => {
  console.log(match);

  return (
    <div className={styles.test}>Protected</div>
  );
};

export default Private;