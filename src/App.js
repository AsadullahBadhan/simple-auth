import './App.css';
import logo from './images/logo2.png';

function App() {
  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <form>
        <input type="text" name="username" id="" placeholder='Name' required />
        <br />
        <input type="email" name="email" id="" placeholder='Email address' required />
        <br />
        <input type="password" name="password" id="" placeholder='Password' required />
        <br />
        <input type="password" name="confirm-password" id="" placeholder='Confirm Password' required />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <button>Sign In with Google</button>
      <button>Sign In with Facebook</button>
      <button>Sign In with Twitter</button>
    </div>
  );
}

export default App;
