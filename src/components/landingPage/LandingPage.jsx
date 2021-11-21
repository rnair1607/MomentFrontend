import React from 'react';

import { ReactComponent as Logo } from '../../assets/5DLogo.svg';
import backArrow from '../../assets/arrow-left.png';
import styles from './landingPage.module.css';

const LandingPage = ({ children }) => {
  const goBack = () => {
    // props.history.goBack();
  };
  return (
    <div className={styles.scaffold}>
      <div className={styles.topLogoBanner}>
        <div className={styles.mainContainer}>
          <div className={styles.backArrowContainer}>
            <img
              src={backArrow}
              className={styles.backArrow}
              onClick={goBack}
              alt="Go back"
            />
          </div>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.componentContainer}>
          <div className={styles.maininnerContainer}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
