import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';

const Toast = ({ message, duration = 3000, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return createPortal(
    <div className={`${styles.toast} ${show ? styles.show : ''}`}>
      <div className={styles.message}>{message}</div>
    </div>,
    document.body
  );
};

export default Toast;
