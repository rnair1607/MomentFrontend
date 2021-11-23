import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import styles from './signIn.module.css';
import LandingPage from '../../components/landingPage/LandingPage';
import emailIcon from '../../assets/email.png';
import passwordIcon from '../../assets/privacy.png';
import showPasswordIcon from '../../assets/show.png';
import hidePasswordIcon from '../../assets/hide.png';
import InputContainer from '../../components/inputContainer/InputContainer';
import Heading from '../../components/landingPageHeading/Heading';
import SubmitButton from '../../components/button/SubmitButton';
import LinkText from '../../components/linkText/LinkText';

const SignIn = () => {
  const [emailError, setemailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const navigate = useNavigate();
  const [passwordType, setpasswordType] = useState('password');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordIconEnd, setpasswordIconEnd] = useState(hidePasswordIcon);

  const togglePasswordType = () => {
    if (passwordType === 'password') {
      setpasswordType('text');
      setpasswordIconEnd(showPasswordIcon);
    } else {
      setpasswordType('password');
      setpasswordIconEnd(hidePasswordIcon);
    }
  };

  const navigateToSignUp = () => {
    navigate('/signUp');
  };

  const login = async () => {
    setpasswordError(false);
    setemailError(false);

    if (!email || !password) {
      !email && setemailError(true);
      !password && setpasswordError(true);
      return;
    }

    try {
      let res = await axios.post('http://localhost:8000/api/user/login', {
        email,
        password,
      });
      console.log(res.data);
      localStorage.setItem('userData', JSON.stringify(res.data));
      navigate('/protected');
    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // console.log(error.response.data);
      // if (error.response.data.message === 'Password invalid') {
      //   setpasswordError(true);
      // }
      // if (error.response.data.message === 'User not found') {
      //   setemailError(true);
      // } else {
      //   setemailError(true);
      //   setpasswordError(true);
      // }
    }
  };

  return (
    <LandingPage>
      <Heading title="Sign In" subHeading="To start using the app" />
      <div className={styles.formContainer}>
        <InputContainer
          label="Enter email id"
          placeholder="ministry@government.in"
          icon={emailIcon}
          type="text"
          value={email}
          setValue={setEmail}
          error={emailError}
        />
        <InputContainer
          label="Enter Password"
          placeholder="Password"
          icon={passwordIcon}
          type={passwordType}
          showHideIcon={passwordIconEnd}
          toggle={togglePasswordType}
          value={password}
          setValue={setPassword}
          error={passwordError}
        />
        <SubmitButton title="Sign In" onClick={login} />
        <LinkText
          text="Not a member?"
          link="Sign Up"
          onNavigate={navigateToSignUp}
        />
      </div>
    </LandingPage>
  );
};

export default SignIn;
