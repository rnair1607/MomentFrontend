import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import LandingPage from '../../components/landingPage/LandingPage';
import emailIcon from '../../assets/email.png';
import personIcon from '../../assets/person.png';
import passwordIcon from '../../assets/privacy.png';
import showPasswordIcon from '../../assets/show.png';
import hidePasswordIcon from '../../assets/hide.png';
import InputContainer from '../../components/inputContainer/InputContainer';
import Heading from '../../components/landingPageHeading/Heading';
import SubmitButton from '../../components/button/SubmitButton';
import LinkText from '../../components/linkText/LinkText';
import styles from './signUp.module.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [passwordType, setpasswordType] = useState('password');
  const [passwordIconEnd, setpasswordIconEnd] = useState(hidePasswordIcon);
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [mobileNo, setmobileNo] = useState();
  const [city, setcity] = useState();
  const [firstNameerror, setfirstNameerror] = useState(false);
  const [lastNameerror, setlastNameerror] = useState(false);
  const [emailerror, setemailerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);
  const [mobileNoerror, setmobileNoerror] = useState(false);
  const [cityerror, setcityerror] = useState(false);

  const togglePasswordType = () => {
    if (passwordType === 'password') {
      setpasswordType('text');
      setpasswordIconEnd(showPasswordIcon);
    } else {
      setpasswordType('password');
      setpasswordIconEnd(hidePasswordIcon);
    }
  };

  const navigateToSignIn = () => {
    navigate('/');
  };

  const signUp = async () => {
    console.log(isNaN(mobileNo));
    setfirstNameerror(false);
    setlastNameerror(false);
    setemailerror(false);
    setpassworderror(false);
    setmobileNoerror(false);
    setcityerror(false);
    if (!firstName || !lastName || !email || !password || !mobileNo || !city) {
      !firstName && setfirstNameerror(true);
      !lastName && setlastNameerror(true);
      !email && setemailerror(true);
      !password && setpassworderror(true);
      !mobileNo && setmobileNoerror(true);
      !city && setcityerror(true);
      isNaN(mobileNo) || (mobileNo.length < 10 && setmobileNoerror(true));
      return;
    }

    let codedMobileNo = '+91' + mobileNo;
    // setmobileNo(codedMobileNo);

    console.log(firstName, lastName, email, password, codedMobileNo, city);
    try {
      let res = await axios.post('http://localhost:8000/api/user/register', {
        firstName,
        lastName,
        email,
        password,
        mobileNo: codedMobileNo,
        city,
      });
      console.log(res.data);
      localStorage.setItem('userData', JSON.stringify(res.data));
      navigate('/protected');
    } catch (error) {
      // if (error.response.data.message === 'Email already exists') {
      //   setemailerror(true);
      // }
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <LandingPage>
      <Heading title="Sign Up" subHeading="To be a member" />
      <div className={styles.formContainer}>
        <div className="row w-100 d-flex justify-content-between">
          <div className="col">
            <InputContainer
              label="First Name"
              placeholder="John"
              icon={personIcon}
              type="text"
              value={firstName}
              setValue={setfirstName}
              error={firstNameerror}
            />
          </div>
          <div className="col">
            <InputContainer
              label="Last Name"
              placeholder="doe"
              icon={personIcon}
              type="text"
              value={lastName}
              setValue={setlastName}
              error={lastNameerror}
            />
          </div>
        </div>
        <div className="row w-100 d-flex justify-content-between">
          <div className="col">
            <InputContainer
              label="Mobile No."
              placeholder="01234546789"
              type="text"
              value={mobileNo}
              setValue={setmobileNo}
              error={mobileNoerror}
            />

            <div className={styles.inputContainer}>
              <div className={styles.label}>City</div>
              <input
                className={cityerror ? styles.inputerror : styles.input}
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <InputContainer
              label="Email-ID"
              placeholder="john.dow@jdf.com"
              icon={emailIcon}
              type="text"
              value={email}
              setValue={setemail}
              error={emailerror}
            />
            {/* <InputContainer
              label="Enter Password"
              placeholder="Password"
              icon={passwordIcon}
              type={passwordType}
              showHideIcon={passwordIconEnd}
              toggle={togglePasswordType}
            /> */}
            <div className={styles.inputContainer}>
              <div className={styles.label}>Enter Password</div>
              <div className={styles.inputWrapper}>
                <div className={styles.iconWrapper}>
                  <img src={passwordIcon} />
                </div>
                <input
                  className={
                    passworderror
                      ? styles.inputPasswordError
                      : styles.inputPassword
                  }
                  type={passwordType}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />

                <img
                  src={passwordIconEnd}
                  className={styles.showHideIcon}
                  onClick={togglePasswordType}
                />
              </div>
            </div>
          </div>
        </div>

        <SubmitButton title="Submit" onClick={signUp} />
        <LinkText
          text="Already a member?"
          link="Sign In"
          onNavigate={navigateToSignIn}
        />
      </div>
    </LandingPage>
  );
};

export default SignUp;
