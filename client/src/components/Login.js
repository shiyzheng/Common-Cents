import React from 'react';
import {
  Link, useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Login.css';
import { loginUser } from '../api/users';

function Login(props) {
  // signup page
  const {
    setLogin, login, setUsername, setPassword, username, password,
  } = props;

  const navigate = useNavigate();

  if (login) {
    navigate('/');
  }

  const loginUserOnClick = async (userObject) => {
    try {
      const responseToken = await loginUser(userObject);
      if (responseToken) {
        sessionStorage.setItem('app-token', responseToken);
        sessionStorage.setItem('username', userObject.username);
        setLogin(true);
      } else {
        alert('wrong username/password');
      }
    } catch (err) {
      console.log(err);
      alert('user authentication failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <form id="add" className="mx-auto" style={{ width: '800px' }}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="Username">
              <input size="40" type="text" placeholder="Email or username" className="form-control" id="Username" onChange={(e) => setUsername(e.target.value)} />
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
            className="button big-btn"
            data-testid="button"
            onClick={(e) => {
              e.preventDefault();
              loginUserOnClick({ username, password });
              const form = document.getElementById('add');
              form.reset();
            }}
            type="submit"
          >
            LOG IN
          </button>
          <br />
          <p>
            {'Don\'t have an account? '}
            <Link to="/signup">Signup here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;