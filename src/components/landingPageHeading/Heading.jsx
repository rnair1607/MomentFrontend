import React from 'react';
import styles from './heading.module.css';

const Heading = ({ title, subHeading }) => {
  return (
    <>
      <div className={styles.title}>{title}</div>
      <div className={styles.subHeading}>{subHeading}</div>
    </>
  );
};

export default Heading;
