import React from 'react';
import styles from './spinner.module.css'; // Import css modules stylesheet as styles

export default function Spinner() {
  return (
    <div className={styles['spinner-container']}>
      <div className={styles['load-spinner']}></div>
    </div>
  );
}
