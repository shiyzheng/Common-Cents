// import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import axios from 'axios';

function Navbar(props) {
  const navigate = useNavigate();

//   const username = useContext(UserContext);
const {
  login, setUsername, setLogin, logout
} = props;
const loggedIn = login;
// const streak = 2;
// const points = 300;

  const clickedHome = () => {
    navigate('/');
  };

  const clickedSignup = () => {
    navigate('/signup');
  };

  const clickedLogin = () => {
    navigate('/login');
  };

  const clickedLeaderboards = () => {
    navigate('/leaderboards');
  };

  const clickedAchievements = () => {
    navigate('/achievements');
  };

  const clickedAdminConsole = () => {
    navigate('/admin-console');
  };



  const clickedProfile = () => {
    navigate(`/profile/${sessionStorage.getItem('username')}`);
  };

  // const clickedLogout = async () => {
  //   await axios.post('http://localhost:3000/account/logout');
  //   setUsername('');
  //   setLogin(false);
  // };

  return (
    <><div className="Navbar">
          <div className="feature" />
          <button className="textbutton" type="button" onClick={clickedHome}>
              {'Common Cents'}
          </button>
          <button className="textbutton" type="button" onClick={clickedLeaderboards}>
              {'Leaderboards'}
          </button>
          <button className="textbutton" type="button" onClick={clickedAchievements}>
              {'Achievements'}
          </button>
          <button className="textbutton" type="button" onClick={clickedAdminConsole}>
            {'Admin Console'}
          </button>
          <button className="textbutton" type="button" onClick={clickedProfile}>
              {'Profile'}
          </button>
          {loggedIn ? <div className="profile">
                <div>
                    {/* <span className="user">Points: {points}</span>
                    <span className="user">Streak: {streak}</span> */}
                    <span className="user">{sessionStorage.getItem('username')}</span>
                </div>
                <button className="textbutton" type="button" onClick={() => logout()}>
                    {'Logout'}
                </button>
            </div>
                : <div className="profile">
                    <button className="textbutton" type="button" onClick={clickedSignup}>
                        {'Signup'}
                    </button>
                    <button className="textbutton" type="button" onClick={clickedLogin}>
                        {'Login'}
                    </button></div>}
        </div>
        </>
  );
}

export default Navbar;