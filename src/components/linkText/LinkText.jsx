import React from 'react';

import styles from './linkText.module.css';

const LinkText = ({ text, link, onNavigate }) => {
  return (
    <div className={styles.signUpText}>
      {text}{' '}
      <div className={styles.signUpLink} onClick={onNavigate}>
        {link}
      </div>
    </div>
  );
};

export default LinkText;
