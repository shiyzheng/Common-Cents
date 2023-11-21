// import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

//   const username = useContext(UserContext);

const loggedIn = false;
const streak = 2;
const points = 300;
const username = 'user1';

  const clickedHome = () => {
    navigate('/');
  };

  const clickedSignup = () => {
    // navigate('/signup');
  };

  const clickedLogin = () => {
    // navigate('/login');
  };

  const clickedLeaderboards = () => {
    navigate('/leaderboards');
  };

  const clickedAchievements = () => {
    navigate('/achievements');
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