import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../App';

const Dashboard = () => {
  const { displayName, photoURL, email } = auth.currentUser;
  const navigate = useNavigate();

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        navigate('/');
        console.log('successfully')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <h1>{displayName}</h1>
      <img src={photoURL} alt="" />
      <p>{email}</p>
      <Link to='/update-profile'>Update Profile</Link>
      <br />
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Dashboard;