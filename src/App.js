import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import firebaseConfig from './firebaseConfig.js';
import './App.css';
import logo from './images/logo2.png';
import { useEffect, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook, BsGithub } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const ghProvider = new GithubAuthProvider();

function App() {
  const formRef = useRef();
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const [newUser, setNewUser] = useState(true);
  const navigate = useNavigate();

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
    if (newUser) {
      //password confirmation
      if (user?.password === user?.confirmPassword) {
        //create new user with email and password
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then(userCred => {
            console.log(userCred.user)
            setMessage('user created successfully')
          })
          .catch(error => {
            console.log(error)
          })
        console.log('from sign up')
        formRef.current.reset();
      } else {
        setMessage('Password didn\'t match');
      }
    }
    if (!newUser) {
      //log in user
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then(userCred => {
          navigate('/dashboard')
        })
        .catch(error => {
          console.log(error)
        })
      console.log('from sign up')
      formRef.current.reset()
    }
  }

  function handleOAuthSignUp(provider) {
    signInWithPopup(auth, provider)
      .then(result => {
        console.log(result.user);
        navigate('/dashboard')
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setNewUser(false)
      }
    })
  }, [])

  return (
    <div className="App">
      <img src={logo} alt="logo" className='logo' />
      <form onSubmit={handleFormSubmit} ref={formRef}>
        {newUser && <input type="text" onBlur={setFieldInfo} name="username" placeholder='Name' required />}
        <br />
        <input type="email" onBlur={setFieldInfo} name="email" placeholder='Email address' required />
        <br />
        <input type="password" onBlur={setFieldInfo} name="password" placeholder='Password' required />
        <br />
        {newUser && <input type="password" onBlur={setFieldInfo} name="confirmPassword" placeholder='Confirm Password' required />}
        <br />
        {
          newUser
            ? <button type="submit" className='signup-btn'>Sign Up</button>
            : <button type="submit" className='signup-btn'>Log In</button>
        }
      </form>
      <div className='signup-option'>
        <button onClick={() => handleOAuthSignUp(googleProvider)}><FcGoogle /></button>
        <button onClick={() => handleOAuthSignUp(fbProvider)}><BsFacebook /></button>
        <button onClick={() => handleOAuthSignUp(ghProvider)}><BsGithub /></button>
      </div>
      <div>
        {
          newUser
            ? <p>Already have an account? <span className='login-btn' onClick={() => setNewUser(!newUser)}>Log In</span></p>
            : <p>Need an account? <span className='login-btn' onClick={() => setNewUser(!newUser)}>Sign Up</span></p>
        }
      </div>
    </div>
  );


}

export default App;
