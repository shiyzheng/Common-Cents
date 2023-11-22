import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Achievements.css';

function Achievements(props) {
    // const { login, username } = props;
    login = false;
    const achievements = [
        { name: "Complete Introduction to a Topic", completed: true },
        { name: "Master a Topic", completed: false },
        { name: "Acquire a Perfect Score on a Quiz", completed: true },
        { name: "Complete all Topics", completed: false },
        { name: "Add a Friend", completed: true },
        { name: "Achieve 1000 Points", completed: false },
        { name: "Go on a 7 Day Streak", completed: true },
      ];
      const completedAchievements = achievements.filter(achievement => achievement.completed);
      const notCompletedAchievements = achievements.filter(achievement => !achievement.completed);

      return (
        <>
        <Navbar />
      
      {login ? <div className="container">
        <h2>Completed Achievements</h2>
        <ul className="achievement-list">
          {completedAchievements.map((achievement, index) => (
            <li key={index} className="achievement-box-complete">{achievement.name}</li>
          ))}
        </ul>

        <h2>Incomplete Achievements</h2>
        <ul className="achievement-list">
          {notCompletedAchievements.map((achievement, index) => (
            <li key={index} className="achievement-box-incomplete">{achievement.name}</li>
          ))}
        </ul></div> : <div className="container"> <h2>Login to see your Achievements!</h2></div>}
        </>
      )
}

export default Achievements;