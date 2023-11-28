// import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar(props) {
  const navigate = useNavigate();

//   const username = useContext(UserContext);
const {
  login
} = props;
const loggedIn = login;
const streak = 2;
const points = 300;
const username = 'testing';

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

  const clickedProfile = () => {
    navigate(`/profile/${username}`);
  };

  const clickedLogout = async () => {
    // await logoutUser();
    // clearUser();
  };

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
          <button className="textbutton" type="button" onClick={clickedProfile}>
              {'Profile'}
          </button>
          {loggedIn ? <div className="profile">
                <div>
                    <span className="user">Points: {points}</span>
                    <span className="user">Streak: {streak}</span>
                    <span className="user">{username}</span>
                </div>
                <button className="textbutton" type="button" onClick={clickedLogout}>
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