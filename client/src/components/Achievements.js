import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/Achievements.css';
import { getCurrentUserAchievements, getAllAchievements } from '../api/users';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "../App";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
        // console.log(response);
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
          <ThemeProvider theme={theme}>
        <>
        <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout}/>
      
      {login ? <div className="container">
          <Typography
              component="h1"
              variant="h1"
              sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontWeight: 1000,
                  fontSize: { xs: '1.45rem', sm: '1.7rem', md: '2.05rem' },
                  color: theme.palette.success.main,
                  mt: 3,
                  mb: 2,
              }}
          >
        Earned Achievements
              </Typography>
        <ul className="achievement-list">
            {completedAchievements.length > 0 && (
                <List>
                    {completedAchievements.map((achievement, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={achievement} className="achievement-box-complete" />
                        </ListItem>
                    ))}
                </List>
            )}
        </ul>

          <Typography
              component="h1"
              variant="h1"
              sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontWeight: 1000,
                  fontSize: { xs: '1.45rem', sm: '1.7rem', md: '2.05rem' },
                  color: theme.palette.error.main,
                  mt: 0,
                  mb: 2,
              }}
          >
              Incomplete Achievements
          </Typography>
        <ul className="achievement-list">
            {notCompletedAchievements.length > 0 && (
                <List>
                    {notCompletedAchievements.map((achievement, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={achievement} className="achievement-box-incomplete" />
                        </ListItem>
                    ))}
                </List>
            )}
        </ul></div> : <div className="container"> <h2>Login to see your Achievements!</h2></div>}
        </>
              </ThemeProvider>
      )
}

export default Achievements;