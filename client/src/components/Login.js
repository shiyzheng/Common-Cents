import React from 'react';
import {
  Link, useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function Login(props) {
  // signup page
  const {
    setLogin, login, setUsername, setPassword, username, password,
  } = props;

  const navigate = useNavigate();

  if (login) {
    navigate('/');
  }

  const loginUser = async (userObject) => {
    try {
      const response = await axios.post('/account/login', {
        username: userObject.username,
        password: userObject.password,
      });
      if (response.data === 'wrong password' || response.data === 'error occurred') {
        alert('wrong username/password');
      } else {
        setLogin(true);
        navigate('/');
      }
    } catch (err) {
      alert('user authentication failed');
    }
  };

  return (
    <div>
      <Navbar />
      <form id="add" className="mx-auto" style={{ width: '800px' }}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="Username">
            Username
            <input type="text" className="form-control" id="Username" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="Password">
            Password
            <input type="text" className="form-control" id="Password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
        </div>
        <button
          className="btn btn-primary"
          data-testid="button"
          onClick={(e) => {
            e.preventDefault();
            loginUser({ username, password });
            const form = document.getElementById('add');
            form.reset();
          }}
          type="submit"
        >
          Submit
        </button>
        <br />
        <p>
          {'Don\'t have an account? '}
          <Link to="/signup">Signup here!</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;