import React from 'react';
import {
  Link, useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Signup.css';
import { signupUser, loginUser } from '../api/users';

function Signup(props) {
  // signup page
  const {
    setLogin, setUsername, setPassword, username, password, login, logout
  } = props;

  const navigate = useNavigate();

  if (login) {
    navigate('/');
  }

  const createUser = async (userObject) => {
    try {
      const response = await signupUser(userObject);
      if (response.data === 'username taken' || response.data === 'error occurred') {
        alert(`${response.data}`);
        setLogin(false);
      } else {
        const responseToken = await loginUser(userObject);
        if (responseToken) {
          sessionStorage.setItem('app-token', responseToken);
          sessionStorage.setItem('username', userObject.username);
          setLogin(true);
        }
      }
    } catch (err) {
      console.log(err);
      alert('user signup failed');
    }
  };

  return (
    <div>
      <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout} />
      <div className="form-container">
        <form id="add" className="mx-auto" style={{ width: '800px' }}>
          <h2>Create your profile</h2>
          <div className="form-group">
            <label htmlFor="Username">
              <input size="40" type="text" placeholder="Username" className="form-control" id="Username" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="Password">
              <input size="40" type="text" placeholder="Password" className="form-control" id="Password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
          </div>
          <button
            class="button big-btn"
            data-testid="button"
            onClick={(e) => {
              e.preventDefault();
              createUser({ username, password });
              const form = document.getElementById('add');
              form.reset();
            }}
            type="submit"
          >
            CREATE ACCOUNT
          </button>
          <br />
          <p>
            {'Already have an account? '}
            <Link to="/login">Log in here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;