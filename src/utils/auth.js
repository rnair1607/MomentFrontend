import axios from 'axios';

export const authCheck = async () => {
  if (!localStorage.getItem('userData')) {
    return false;
  }
  let res = await axios.get('http://localhost:8000/api/token/verify');
  // console.log(`Check token`, res.data);
  if (res.data.success) {
    return true;
  } else {
    return false;
  }
};
