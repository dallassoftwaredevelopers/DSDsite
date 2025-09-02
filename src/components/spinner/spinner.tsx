import React from 'react';
import styles from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles['spinner-container']}>
      <div className={styles['spinner-overlay']}>
        <div className={styles['load-spinner']}></div>
      </div>
    </div>
  );
}
