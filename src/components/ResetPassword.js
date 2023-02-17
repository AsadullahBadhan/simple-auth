import { updatePassword } from 'firebase/auth';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../App';

const ResetPassword = () => {
  const passRef = useRef();
  const navigate = useNavigate();

  const user = auth.currentUser;
  console.log(user)
  const newPassword = passRef?.current?.value;

  function handleResetPassword(e) {
    e.preventDefault();
    updatePassword(user, newPassword)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        console.log('soorrry', err)
      })
  }
  return (
    <>
      <form onSubmit={handleResetPassword}>
        <input type="password" placeholder='New Password' ref={passRef} />
        <button type="submit">Reset</button>
      </form>
    </>
  );
};

export default ResetPassword;