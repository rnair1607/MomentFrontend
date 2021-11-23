import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Route, Routes } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/sidebarLogo.svg';
import downArrow from '../../assets/downArrow.png';
import arrowDownDark from '../../assets/arrowDownDark.png';
import ellipsis from '../../assets/ellipsis.png';
import toggle from '../../assets/toggle.png';
import { authCheck } from '../../utils/auth';
import styles from './layout.module.css';
import AllMoments from '../../components/allMoments/AllMoments';
import AddMoment from '../../components/addMoment/AddMoment';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const Layout = ({}) => {
  let AUTH_TOKEN = JSON.parse(localStorage.getItem('userData'))?.token;
  axios.defaults.headers.common['auth-token'] = AUTH_TOKEN;

  const [active, setactive] = useState(true);
  const navigate = useNavigate();
  const [profileName, setprofileName] = useState();

  const isAuth = async () => {
    let isOk = await authCheck();
    if (!isOk) {
      navigate('/');
    } else {
      let [firstName, lastName] = JSON.parse(
        localStorage.getItem('userData')
      )?.name.split(' ');
      setprofileName(firstName[0] + lastName[0]);
    }
  };
  useEffect(() => {
    isAuth();
  }, []);

  const navigateTo = (path) => {
    if (path === '/protected/') {
      setactive(true);
    } else {
      setactive(false);
    }
    navigate(path);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={styles.container}>
        <div className={styles.sidemenu}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          <div className={styles.linkContainer}>
            <div className={styles.profileLink}>Profile</div>
            <div className={styles.momentsLink}>
              Moments
              <div>
                <img src={downArrow} alt="Down arrow" />
              </div>
            </div>
            <div className="mt-4">
              {active ? (
                <div className={styles.activeSelection}>
                  <img src={ellipsis} alt="ellipsis" /> Moment List
                </div>
              ) : (
                <div
                  className={styles.inactiveSelection}
                  onClick={() => navigateTo('/protected/')}
                >
                  Moment List
                </div>
              )}
              {!active ? (
                <div className={styles.activeSelection}>
                  <img src={ellipsis} alt="ellipsis" /> Add new moment
                </div>
              ) : (
                <div
                  className={styles.inactiveSelection}
                  onClick={() => navigateTo('/protected/add')}
                >
                  Add new moment
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.viewArea}>
          <div className={styles.topBar}>
            <div>
              <img src={toggle} alt="toggle" />
            </div>
            <div className={styles.profileOptions}>
              <div className={styles.profilePic} onClick={logout}>
                {profileName}
              </div>
              <img src={arrowDownDark} alt="downarrow" />
            </div>
          </div>
          <div className={styles.componentArea}>
            <Routes>
              <Route exact path="/" element={<AllMoments />} />
              <Route exact path="add" element={<AddMoment edit={false} />} />
              <Route
                exact
                path="edit/:id"
                element={<AddMoment edit={true} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
