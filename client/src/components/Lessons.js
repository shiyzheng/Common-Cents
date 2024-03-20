import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Lessons.css';
import { getUserProgress } from '../api/users';
import {Button} from "@mui/material";
import {theme} from "../App";
import {ThemeProvider} from "@mui/material/styles";

const Lessons = (props) => {
  const {
    login, username, setUsername, setLogin, logout
    } = props;
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { topic, subcategory } = useParams();
  const formattedTopic = topic.replace(/-/g, ' ').replace(/(?:-| |\b)(\w)/g, function(key) { return key.toUpperCase()});
  const formattedSubcategory = subcategory.replace(/-/g, ' ').replace(/(?:-| |\b)(\w)/g, function(key) { return key.toUpperCase()});
  const lessonList = [
    'Lesson 1',
    'Lesson 2',
    'Lesson 3',
  ];

  const lessonList2 = [
    'Lesson 1',
    'Lesson 2',
    'Lesson 3',
    'Lesson 4'];

    useEffect(() => {
      if (sessionStorage.getItem('app-token') === null) {
        navigate('/');
      }
    }, []);

    useEffect(() => {
      const getLevels = async () => {
        try {
          const output = await getUserProgress({lesson:formattedTopic});
          setProgress(output["level"]);
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      }
      getLevels();
    }, []);

  const renderLessonLinks = (level) => {
  const formattedLevel = level.toLowerCase().replace(/\s+/g, '-');
  return lessonList.map((lesson, index) => (
    <ThemeProvider theme={theme}>
      {(index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) == progress ?
      <li key={index}>
        <Button variant="contained" className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)}>
          {`${lesson}`}
        </Button>
      </li>

      : ((index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) < progress
      ?
      <li key={index}>
        <Button variant="contained" className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)} style={{ pointerEvents: 'none',  backgroundColor: 'blue' }}>
          {`${lesson}`}
        </Button>
      </li>
      :
      <li key={index}>
        <Button variant="contained" className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)} style={{ pointerEvents: 'none', opacity: 0.5 }}>
          {`${lesson}`}
        </Button>
      </li>)}
    </ThemeProvider>
  ));
};

  const renderLessonLinks2 = (level) => {
  const formattedLevel = level.toLowerCase().replace(/\s+/g, '-');
  return lessonList2.map((lesson, index) => (
    <ThemeProvider theme={theme}>
      {(index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) == progress ?
      <li key={index}>
        <Button variant="contained" className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)}>
          {`${lesson}`}
        </Button>
      </li>

      : ((index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) < progress
      ?
      <li key={index}>
        <Button variant="contained" className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)} style={{ pointerEvents: 'none',  backgroundColor: 'blue' }}>
          {`${lesson}`}
        </Button>
      </li>
      :
      <li key={index}>
        <Button variant="contained" className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)} style={{ pointerEvents: 'none', opacity: 0.5 }}>
          {`${lesson}`}
        </Button>
      </li>)}
    </ThemeProvider>
  ));
};

  return (
      <ThemeProvider theme={theme}>
    <>
      <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout}/><div>
          <div className="lessons-container">
          {formattedTopic}, {formattedSubcategory}
          <div style={{ marginBottom: '20px' }}>
            <Button variant="contained" onClick={() => navigate(`/study/${formattedTopic}`)}>
              Study Guide
            </Button>
          </div>
      <div className="lessons-wrapper">

      <div className="level-container">
        Level 1
        <ul>{renderLessonLinks('Level 1')}</ul>
      </div>
          
      <div className="level-container">
        Level 2
        <ul>{renderLessonLinks('Level 2')}</ul>
      </div>

      <div className="level-container">
        Level 3
        <ul>{renderLessonLinks2('Level 3')}</ul>
      </div>

      </div>
    </div>
      </div></>
      </ThemeProvider>
  );
};

export default Lessons;