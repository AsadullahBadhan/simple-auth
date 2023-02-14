import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseConfig from './firebaseConfig.js';
import './App.css';
import logo from './images/logo2.png';
import { useState } from 'react';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

function App() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});

  function setFieldInfo(e) {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      let isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      if (!isEmailValid) {
        setMessage('Please give valid email address');
      }
      isFieldValid = isEmailValid;
    }
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      let isPasswordValid = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,20}$/.test(e.target.value);
      if (!isPasswordValid) {
        setMessage('Please give a strong password atleast 8 digit combinig atleast one letter and one number');
      }
      isFieldValid = isPasswordValid;
    }

    if (isFieldValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (user?.password === user?.confirmPassword) {
      if (user?.email) {
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then(userCred => {
            console.log(userCred.user)
          })
          .catch(error => {
            console.log(error)
          })
      }
    } else {
      setMessage('Password didn\'t match');
    }
  }

  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" onBlur={setFieldInfo} name="username" placeholder='Name' required />
        <br />
        <input type="email" onBlur={setFieldInfo} name="email" placeholder='Email address' required />
        <br />
        <input type="password" onBlur={setFieldInfo} name="password" placeholder='Password' required />
        <br />
        <input type="password" onBlur={setFieldInfo} name="confirmPassword" placeholder='Confirm Password' required />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <button>Sign In with Google</button>
      <button>Sign In with Facebook</button>
      <button>Sign In with Twitter</button>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
