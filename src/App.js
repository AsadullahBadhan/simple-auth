import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseConfig from './firebaseConfig.js';
import './App.css';
import logo from './images/logo2.png';
import { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook, BsGithub } from 'react-icons/bs'

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const ghProvider = new GithubAuthProvider();

function App() {
  const formRef = useRef();
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
            setMessage('user created successfully')
          })
          .catch(error => {
            console.log(error)
          })

        formRef.current.reset();
      }
    } else {
      setMessage('Password didn\'t match');
    }
  }

  function handleOAuthSignUp(provider) {
    signInWithPopup(auth, provider)
      .then(result => {
        console.log(result.user);
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <img src={logo} alt="logo" className='logo' />
      <form onSubmit={handleFormSubmit} ref={formRef}>
        <input type="text" onBlur={setFieldInfo} name="username" placeholder='Name' required />
        <br />
        <input type="email" onBlur={setFieldInfo} name="email" placeholder='Email address' required />
        <br />
        <input type="password" onBlur={setFieldInfo} name="password" placeholder='Password' required />
        <br />
        <input type="password" onBlur={setFieldInfo} name="confirmPassword" placeholder='Confirm Password' required />
        <br />
        <button type="submit" className='signup-btn'>Sign Up</button>
      </form>
      <div className='signup-option'>
        <button onClick={() => handleOAuthSignUp(googleProvider)}><FcGoogle /></button>
        <button onClick={() => handleOAuthSignUp(fbProvider)}><BsFacebook /></button>
        <button onClick={() => handleOAuthSignUp(ghProvider)}><BsGithub /></button>
      </div>
    </div>
  );
}

export default App;
