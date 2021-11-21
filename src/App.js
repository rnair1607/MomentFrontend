import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './pages/layout/Layout';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import { authCheck } from './utils/auth';

function App() {
  const isAuth = async () => {
    let isOk = await authCheck();
    console.log(`isAuth`, isOk);
    return isOk;
  };

  let AUTH_TOKEN = JSON.parse(localStorage.getItem('userData'))?.token;
  axios.defaults.headers.common['auth-token'] = AUTH_TOKEN;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/protected/*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
