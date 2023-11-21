import React from 'react';
import {
  Link, useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

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
      <form id="add" className="mx-auto" style={{ width: '800px' }}>
        <h2>Signup!</h2>
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
            createUser({ username, password });
            const form = document.getElementById('add');
            form.reset();
          }}
          type="submit"
        >
          Submit
        </button>
        <br />
        <p>
          {'Already have an account? '}
          <Link to="/login">Log in here!</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;