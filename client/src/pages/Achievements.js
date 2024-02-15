import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Achievements.css';
import { getCurrentUserAchievements, getAllAchievements } from '../api/users';

function Achievements(props) {
    // const { login, username } = props;
    const {
      login, username, setUsername, setLogin, logout
    } = props;
    const loggedIn = login;
    // const achievements = [
    //     { name: "Complete Introduction to a Topic", completed: true },
    //     { name: "Master a Topic", completed: false },
    //     { name: "Acquire a Perfect Score on a Quiz", completed: true },
    //     { name: "Complete all Topics", completed: false },
    //     { name: "Add a Friend", completed: true },
    //     { name: "Achieve 1000 Points", completed: false },
    //     { name: "Go on a 7 Day Streak", completed: true },
    //   ];
    //   const completedAchievements = achievements.filter(achievement => achievement.completed);
    //   const notCompletedAchievements = achievements.filter(achievement => !achievement.completed);

      const [completedAchievements, setCompletedAchievements] = useState([]);
      const [notCompletedAchievements, setNotCompleteAchievements] = useState([]);
    useEffect(() => {
      async function getAchievementsWrapper() {
        const response = await getCurrentUserAchievements();
        console.log(response);
        // if response.achievements is list of object
        const ach = response.achievements.map(a => a.name);
        // setCompletedAchievements(ach);
        // console.log(ach);
        setCompletedAchievements(ach);
      }
      getAchievementsWrapper();
    }, [completedAchievements.length]);

    useEffect(() => {
      async function getAllAchievementsWrapper() {
        const response = await getAllAchievements();
        const ach = Object.values(response).map(achievement => achievement.achievementName);
        const nonComplete = ach.filter(element => !completedAchievements.includes(element));
        setNotCompleteAchievements(nonComplete);
      }
      getAllAchievementsWrapper();
    }, [completedAchievements.length]);

      return (
        <>
        <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout}/>
      
      {login ? <div className="container">
        <h2>Completed Achievements</h2>
        <ul className="achievement-list">
          {completedAchievements.length > 0 && completedAchievements.map((achievement, index) => (
            <li key={index} className="achievement-box-complete">{achievement}</li>
          ))}
        </ul>

        <h2>Incomplete Achievements</h2>
        <ul className="achievement-list">
          {notCompletedAchievements.length > 0 && notCompletedAchievements.map((achievement, index) => (
            <li key={index} className="achievement-box-incomplete">{achievement}</li>
          ))}
        </ul></div> : <div className="container"> <h2>Login to see your Achievements!</h2></div>}
        </>
      )
}

export default Achievements;