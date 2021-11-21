import React from 'react';
import styles from './submitButton.module.css';

const SubmitButton = ({ title, onClick }) => {
  return (
    <>
      <button className={styles.signIn} onClick={onClick}>
        {title}
      </button>
    </>
  );
};

export default SubmitButton;
