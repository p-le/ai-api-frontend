import React from 'react';
// import PropTypes from 'prop-types';
import styles from './style.css';

const UploadZone = () => {
  let fileInput = null;

  const sayHi = (event) => {
    fileInput.click();
    console.log(event);
  };

  return (
    <div className={styles.upload} onClick={sayHi}>
      ファイルアップロードをドラッグ&ドロップ
      <input 
        type="file"
        className={styles.hidden}
        ref={(input) => { fileInput = input; }}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </div>
  );
};

// UploadZone.propTypes = {
//   name: PropTypes.string.isRequired
// };

export default UploadZone;