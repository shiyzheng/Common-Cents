import React from 'react';
import {
  Link, useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Signup.css';

function Signup(props) {
  // signup page
  const {
    setLogin, setUsername, setPassword, username, password, login,
  } = props;

  const navigate = useNavigate();

  if (login) {
    navigate('/');
  }

  const createUser = async (userObject) => {
    try {
      const response = await axios.post('/account/signup', {
        username: userObject.username,
        password: userObject.password,
      });
      // console.log(response);
      if (response.data === 'username taken' || response.data === 'error occured') {
        alert(`${response.data}`);
        setLogin(false);
      } else {
        setLogin(true);
        navigate('/');
      }
    } catch (err) {
      alert('user signup failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div class="form-container">
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