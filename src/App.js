import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './pages/layout/Layout';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import { authCheck } from './utils/auth';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
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
