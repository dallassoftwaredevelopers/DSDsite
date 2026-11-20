import { useEffect } from 'react';
import type { Message } from '@/types';
import styles from './toast.module.css';

interface ToastProps {
  message: string;
  type?: Message['type'];
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`${styles.toast} ${styles[type]}`}
    >
      <span>{message}</span>
      <button
        type='button'
        aria-label='Dismiss notification'
        onClick={onClose}
        className={styles.close}
      >
        &times;
      </button>
    </div>
  );
}
